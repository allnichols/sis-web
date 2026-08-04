import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import {
  Container,
  Button,
  Group,
  Stack,
  Text,
  Divider,
  Popover,
  TextInput,
  PasswordInput,
} from "@mantine/core";
import { isEmail, hasLength, useForm } from "@mantine/form";
import type { OnboardingFormValues } from "./types";

const textInputStyle = {
  marginBottom: "1rem",
  borderRadius: 10,
  flexGrow: 0.5,
};

export function RegisterForm() {
  type OverlayStatus = "loading" | "error" | "success";

  const [overlay, setOverlay] = useState<{
    visible: boolean;
    status: OverlayStatus;
    message: string;
  }>({
    visible: false,
    status: "loading",
    message: "Submitting registration...",
  });
  const navigate = useNavigate({ from: "/" });
  const form = useForm<OnboardingFormValues>({
    mode: "controlled",
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      schoolAddress: "",
      schoolName: "",
      schoolState: "",
      schoolZipCode: "",
      schoolCity: "",
      schoolCountry: "",
    },
    validate: {
      email: isEmail("Please enter a valid email"),
      password: hasLength(
        { min: 8 },
        "Password must be at least 8 characters long",
      ),
      firstName: hasLength(
        { min: 2 },
        "First name must be at least 2 characters long",
      ),
      lastName: hasLength(
        { min: 2 },
        "Last name must be at least 2 characters long",
      ),
      schoolAddress: hasLength(
        { min: 5 },
        "School address must be at least 5 characters long",
      ),
      schoolName: hasLength(
        { min: 2 },
        "School name must be at least 2 characters long",
      ),
      schoolState: hasLength(
        { min: 2 },
        "School state must be at least 2 characters long",
      ),
      schoolZipCode: hasLength(
        { min: 5 },
        "School zip code must be at least 5 characters long",
      ),
      schoolCity: hasLength(
        { min: 2 },
        "School city must be at least 2 characters long",
      ),
      schoolCountry: hasLength(
        { min: 2 },
        "School country must be at least 2 characters long",
      ),
    },
  });

  const { mutate, isPending } = useMutation({
    onMutate: () => {
      setOverlay({
        visible: false,
        status: "loading",
        message: "Submitting registration...",
      });
    },
    mutationFn: async (values: OnboardingFormValues) => {
      const url = `${import.meta.env.VITE_API_URL_BASE}/onboarding/register`;
      const payload = {
        adminFirstName: values.firstName,
        adminLastName: values.lastName,
        adminEmail: values.email,
        adminPassword: values.password,
        schoolInfo: {
          name: values.schoolName,
          streetAddress: values.schoolAddress,
          city: values.schoolCity,
          state: values.schoolState,
          zipCode: values.schoolZipCode,
          country: values.schoolCountry,
        },
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMessage =
          data?.error || data?.message || "Failed to submit form";

        throw new Error(errorMessage);
      }
    },
    onSuccess: () => {
      setOverlay({
        visible: false,
        status: "success",
        message: "Registration successful. Redirecting to dashboard...",
      });
      setTimeout(() => {
        navigate({ to: "/dashboard" });
      }, 3000);
    },
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";
      setOverlay({
        visible: true,
        status: "error",
        message,
      });
      console.error("Error submitting form:", message);
    },
  });

  const submitForm = () => mutate(form.values);
  const isFormComplete = Object.values(form.values).every(
    (value) => value.trim().length > 0,
  );

  return (
    <Container size="sm" mt="xl">
      <Stack gap="lg">
        <div>
          <Text fw={600} size="lg" mb="xs">
            Admin info
          </Text>
          <Text c="dimmed" size="sm" mb="md">
            Create an admin account
          </Text>

          <Group mt="xl" grow>
            <TextInput
              label="First Name"
              placeholder="John"
              {...form.getInputProps("firstName")}
              style={textInputStyle}
            />
            <TextInput
              label="Last Name"
              placeholder="Doe"
              {...form.getInputProps("lastName")}
              style={textInputStyle}
            />
          </Group>
          <TextInput
            label="Email"
            placeholder="mail@gmail.com"
            {...form.getInputProps("email")}
            style={textInputStyle}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            {...form.getInputProps("password")}
            style={textInputStyle}
          />
        </div>

        <Divider />

        <div>
          <Text fw={600} size="lg" mb="xs">
            School info
          </Text>
          <Text c="dimmed" size="sm" mb="md">
            Provide school details
          </Text>

          <TextInput
            label="School Name"
            placeholder="Springfield High School"
            {...form.getInputProps("schoolName")}
            style={textInputStyle}
          />
          <TextInput
            label="School Address"
            placeholder="123 Main St"
            {...form.getInputProps("schoolAddress")}
            style={textInputStyle}
          />
          <Group grow>
            <TextInput
              label="City"
              placeholder="Springfield"
              {...form.getInputProps("schoolCity")}
              style={textInputStyle}
            />
            <TextInput
              label="State"
              placeholder="IL"
              {...form.getInputProps("schoolState")}
              style={textInputStyle}
            />
          </Group>
          <Group grow>
            <TextInput
              label="Zip Code"
              placeholder="62701"
              {...form.getInputProps("schoolZipCode")}
              style={textInputStyle}
            />
            <TextInput
              label="Country"
              placeholder="USA"
              {...form.getInputProps("schoolCountry")}
              style={textInputStyle}
            />
          </Group>
        </div>

        <Group justify="center" mt="xl">
          <Popover
            opened={overlay.visible && overlay.status === "error"}
            onChange={(opened) => {
              if (!opened) {
                setOverlay((current) => ({ ...current, visible: false }));
              }
            }}
            width={300}
            position="top"
            withArrow
            shadow="md"
          >
            <Popover.Target>
              <Button
                onClick={submitForm}
                loading={isPending}
                disabled={!isFormComplete || isPending}
              >
                Register
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <Text size="sm" c="red">
                {overlay.message}
              </Text>
            </Popover.Dropdown>
          </Popover>
        </Group>
      </Stack>
    </Container>
  );
}
