import { useState, type FormEvent } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Container, NumberInput, TextInput, Button, Box  } from '@mantine/core';
import { isEmail, hasLength, useForm } from '@mantine/form';

export function OnboardingPage() {
  const navigate = useNavigate({ from: '/' });
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      address: '',
      email: '',
      name: '',
      studentCount: 0,
    },
    validate: { 
      email: isEmail('Invalid email address'),
      address: (value) => (value.trim() ? null : 'Address is required'),
      name: hasLength({ min: 3 }, 'Name must be at least 3 characters long'),
      studentCount: (value) => (value > 0 ? null : 'Student count must be greater than 0'),
    }
  });
  

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(form.validate().hasErrors) {
      return;
    }
  }
  return (
    <Container size="sm" mt="xl">
      <Box bd={1}  style={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        borderRadius: '8px',
        padding: '2rem',
        backgroundColor: '#fff',
      }}>
      <form onSubmit={handleSubmit}>
        <TextInput 
          label="Institution Name"
          key={form.key('name')}
          {...form.getInputProps('name')}
          placeholder='Best School'
        />
        <TextInput 
          label="Email"
          key={form.key('email')}
          {...form.getInputProps('email')}
          placeholder='example@domain.com'
          type='email'
        />
        <TextInput
          label="Address"
          key={form.key('address')}
          {...form.getInputProps('address')}
          placeholder='123 Main St, City, State'
        />
        <NumberInput
          label="Number of Students"
          key={form.key('studentCount')}
          {...form.getInputProps('studentCount')}
          placeholder='1000'
          min={1}
        />
        <Button type="submit" mt="md">
          Submit
        </Button>
      </form>
      </Box>
    </Container>
  )
}
