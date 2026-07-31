import { useNavigate } from "@tanstack/react-router";
import { Container, Button, Box, TextInput, Title, Divider, PasswordInput  } from "@mantine/core";
import { isEmail, hasLength, useForm } from "@mantine/form";
import { IconUserShield, IconBuilding } from "@tabler/icons-react";
import type { OnboardingFormValues } from "./types";

const textInputStyle = {
  marginBottom: "1rem",
  borderRadious: 10,
  flexGrow: 0.5,
};          

export function RegisterForm() {
  const navigate = useNavigate({ from: "/" });
  const form = useForm<OnboardingFormValues>({
    mode: "uncontrolled",
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      schoolAdress: "",
      schoolName: "",
      schoolState: "",
      schoolZipCode: "",
      schoolCity: "",
      schoolCountry: "",
    },
    validate: {
      email: isEmail('Please enter a valid email')
    },
  });

  const submitForm = () => {
    // Here you would typically send the form data to your backend API
    // For this example, we'll just navigate to the dashboard
    navigate({ to: "/dashboard" });
  };

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
          <form onSubmit={submitForm}>
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
                {...form.getInputProps("lastName")}
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
                  key={form.key("schoolZip")}
                  {...form.getInputProps("schoolZipCode")}
                  placeholder="12345"
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
              disabled={true}
              >
              Complete Registration
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
