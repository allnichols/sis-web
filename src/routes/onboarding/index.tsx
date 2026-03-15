import { useNavigate } from '@tanstack/react-router'
import { Container, Button, Box, TextInput  } from '@mantine/core';
import { isEmail, hasLength, useForm, } from '@mantine/form';
import type { OnboardingFormValues } from '../../features/onboarding/components/types';

export function OnboardingPage() {
  const navigate = useNavigate({ from: '/' });
  const form = useForm<OnboardingFormValues>({
    mode: 'uncontrolled',
    initialValues: {
      institution_address: '',
      institution_email: '',
      institution_phone_number: '',
      institution_name: '',
      admin_name: '',
      admin_email: '',
    },
    validate: { 
      institution_email: isEmail('Invalid email address'),
      institution_address: (value) => (value.trim() ? null : 'Address is required'),
      institution_phone_number: (value) => (value.trim() ? null : 'Phone number is required'),
      institution_name: hasLength({ min: 3 }, 'Name must be at least 3 characters long'),
      admin_name: hasLength({ min: 3 }, 'Admin name must be at least 3 characters long'),
      admin_email: isEmail('Invalid admin email address'),
    }
  });

  const isNextDisabled = form.getValues().institution_name.trim() === '' || 
        form.getValues().institution_email.trim() === '' || 
        form.getValues().institution_address.trim() === '' || 
        form.getValues().institution_phone_number.trim() === '';

  const submitForm = () => {
    // Here you would typically send the form data to your backend API
    // For this example, we'll just navigate to the dashboard
    navigate({ to: '/dashboard' });
  };

  return (
    <Container size="md" mt="xl">
      <Box bd={1}  style={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        borderRadius: '8px',
        padding: '2rem',
        backgroundColor: '#fff',
      }}>
      <form onSubmit={submitForm}>
        <TextInput 
          label="Institution Name"
          key={form.key('institution_name')}
          {...form.getInputProps('institution_name')}
          placeholder='Best School'
        />
        <TextInput 
          label="Email"
          key={form.key('institution_email')}
          {...form.getInputProps('institution_email')}
          placeholder='example@domain.com'
          type='email'
        />
        <TextInput
          label="Address"
          key={form.key('institution_address')}
          {...form.getInputProps('institution_address')}
          placeholder='123 Main St, City, State'
        />
        <TextInput 
          label="Phone Number"
          key={form.key('institution_phone_number')}
          {...form.getInputProps('institution_phone_number')}
          placeholder='(123) 456-7890'
          type='tel'
        />

        <TextInput 
          label="Admin Name"
          key={form.key('admin_name')}
          {...form.getInputProps('admin_name')}
          description="The primary administrator for this institution"
          placeholder='John Doe'
        />
        <TextInput 
          label="Admin Email"
          key={form.key('admin_email')}
          {...form.getInputProps('admin_email')}
          description="The email address for the primary administrator"
          placeholder='admin@example.com'
          type='email'
        />
      <Button 
        type="submit" 
        mt="md" 
        disabled={isNextDisabled}
      >
        Submit
      </Button>
      </form>
      </Box>
    </Container>
  )
}
