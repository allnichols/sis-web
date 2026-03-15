import { Box, Container, TextInput, PasswordInput, Button, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from '@tanstack/react-router';
import { isEmail, hasLength, useForm } from '@mantine/form';

export default function SignupPage() {
  const navigate = useNavigate({ from: '/' });
  const [visible, { toggle }] = useDisclosure(false);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
        password: '',
        confirm_password: '',
    },
    validate: {
        email: isEmail('Invalid email address'),    
        password: hasLength({ min: 6 }, 'Password must be at least 6 characters long'),
        confirm_password: (value, values) => value === values.password ? null : 'Passwords do not match',
    }
  });


  return (
    <Container size="sm" mt="xl">
        <Box bd={1}  style={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        borderRadius: '8px',
        padding: '2rem',
        backgroundColor: '#fff',
      }}>
            <form>
                <Stack>
                <TextInput 
                    label="Email"
                    key={form.key('email')}
                    {...form.getInputProps('email')}
                />
                <PasswordInput
                    label="Password"
                    key={form.key('password')}
                    {...form.getInputProps('password')}
                    visible={visible}
                    onVisibilityChange={toggle}
                />
                <PasswordInput
                    label="Confirm Password"
                    key={form.key('confirm_password')}
                    {...form.getInputProps('confirm_password')}
                    visible={visible}
                    onVisibilityChange={toggle}
                />
                <Button fullWidth mt="md" onClick={() => navigate({ to: '/onboarding' })}>
                    Sign Up
                </Button>
                </Stack>
            </form>
        </Box>
    </Container>
  );
}