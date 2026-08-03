import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { Container, Button, Box, TextInput, Title, Divider, PasswordInput } from "@mantine/core";
import { isEmail, hasLength, useForm } from "@mantine/form";
import { IconUserShield, IconBuilding } from "@tabler/icons-react";
import type { OnboardingFormValues } from "./types";

const textInputStyle = {
  marginBottom: "1rem",
  borderRadius: 10,
  flexGrow: 0.5,
};          

export function RegisterForm() {
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
      email: isEmail('Please enter a valid email'),
      password: hasLength({ min: 8 }, 'Password must be at least 8 characters long'),
      firstName: hasLength({ min: 2 }, 'First name must be at least 2 characters long'),
      lastName: hasLength({ min: 2 }, 'Last name must be at least 2 characters long'),
      schoolAddress: hasLength({ min: 5 }, 'School address must be at least 5 characters long'),
      schoolName: hasLength({ min: 2 }, 'School name must be at least 2 characters long'),
      schoolState: hasLength({ min: 2 }, 'School state must be at least 2 characters long'),
      schoolZipCode: hasLength({ min: 5 }, 'School zip code must be at least 5 characters long'),
      schoolCity: hasLength({ min: 2 }, 'School city must be at least 2 characters long'),
      schoolCountry: hasLength({ min: 2 }, 'School country must be at least 2 characters long'),
    },
  });

  const { mutate, isPending } = useMutation({
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

      if(!response.ok) {
        throw new Error("Failed to submit form");
      }
      console.log("Form submitted with values:", payload);
    },
    onSuccess: () => {
      setTimeout(() => {
        navigate({ to: "/dashboard" });
      }, 2000);
    },
    onError: (error) => {
      // Handle form submission error
      console.error("Form submission error:", error);
    }

  }); 

  const submitForm = () => mutate(form.values);

  return (
    <>
      <header
        style={{
          height: 56,
          marginBottom: 120,
          borderBottom: "1px solid lightgrey",
        }}
      >
        <Container size="md"></Container>
      </header>
      <Container size="sm" mt="xl">
        <Box bd={1}>
          <form onSubmit={(e) => { e.preventDefault(); submitForm(); }}>
            <fieldset style={{ border: "none" }}>
              <legend
                style={{
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconUserShield stroke={2} size={30} color="blue" />
                <Title order={3} styles={{ root: { marginLeft: 8 } }}>
                  Adminstrative Lead
                </Title>
              </legend>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 40,
                  marginTop: 16,
                }}
              >
                <TextInput
                  label="First Name"
                  key={form.key("firstName")}
                  {...form.getInputProps("firstName")}
                  placeholder="John"
                  style={textInputStyle}
                  size="md"
                  radius="sm"
                />
                <TextInput
                  label="Last Name"
                  key={form.key("lastName")}
                  {...form.getInputProps("lastName")}
                  placeholder="Doe"
                  style={textInputStyle}
                  size="md"
                  radius="sm"
                />
              </Box>

              <TextInput
                label="Email"
                key={form.key("email")}
                {...form.getInputProps("email")}
                placeholder="johndoe@mail.com"
                size="md"
                radius="sm"
              />

              <PasswordInput 
                label="Password"
                key={form.key("password")}
                {...form.getInputProps("password")}
                placeholder="Enter password"
                size="md"
                radius="sm"
                style={{ marginTop: 16}}
              />
            </fieldset>

           <Divider style={{ 
              marginTop: 32, 
              width: '50%', 
              marginInline: 'auto'
            }}/>

            <fieldset style={{ border: "none", marginTop: 40 }}>
              <legend
                style={{
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconBuilding size={30} stroke={2} color="blue" />
                <Title order={3} styles={{ root: { marginLeft: 8 } }}>
                  School Information
                </Title>
              </legend>

              <TextInput
                label="School Name"
                key={form.key("schoolName")}
                {...form.getInputProps("schoolName")}
                placeholder="Your Schools Name"
                size="md"
                radius="sm"
                style={{
                  marginTop: 16
                }}
              />

              <TextInput
                label="Street Address"
                key={form.key("schoolAddress")}
                {...form.getInputProps("schoolAddress")}
                placeholder="123 West Street"
                size="md"
                radius="sm"
                style={{
                  marginTop: 24
                }}
              />

              

              <Box style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <TextInput
                  label="City"
                  key={form.key("schoolCity")}
                  {...form.getInputProps("schoolCity")}
                  placeholder="Houston"
                  size="md"
                  radius="sm"
                  style={{ marginTop: 16 }}
                />

                <TextInput
                  label="State"
                  key={form.key("schoolState")}
                  {...form.getInputProps("schoolState")}
                  placeholder="Texas"
                  size="md"
                  radius="sm"
                  style={{ marginTop: 16 }}
                />

        
                <TextInput 
                  label="Zip Code"
                  key={form.key("schoolZipCode")}
                  {...form.getInputProps("schoolZipCode")}
                  placeholder="12345"
                  size="md"
                  radius="sm"
                  style={{ marginTop: 16 }}
                />

                <TextInput
                  label="Country"
                  key={form.key("schoolCountry")}
                  {...form.getInputProps("schoolCountry")}
                  placeholder="United States"
                  size="md"
                  radius="sm"
                  style={{ marginTop: 16 }}
                />
              </Box>

              
            </fieldset>

            <Button 
              type="submit" 
              mt="lg" 
              color="#1A5AD7" 
              radius="sm"
              size="md"
              style={{ marginInline: 'auto', marginTop: 16, fontWeight: 'bold', display: 'block' }}
              disabled={!form.isValid() || isPending}
              >
                {isPending ? "Submitting..." : "Complete Registration"}
             
            </Button>
          </form>
        </Box>
      </Container>
              <Divider style={{ marginTop: 32, marginBottom: 16, width: '50%', marginInline: 'auto'}}/>
      <footer 
        style={{
          marginTop: 128
        }}>

      </footer>
    </>
  );
}
