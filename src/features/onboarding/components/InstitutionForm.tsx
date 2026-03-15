import { Box, Container, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { OnboardingFormValues } from "./types";

type InstitutionFormProps = {
    form: UseFormReturnType<OnboardingFormValues>;
}

export default function InstitutionForm({ form }: InstitutionFormProps) {
    const isNextDisabled = form.getValues().institution_name.trim() === '' || 
        form.getValues().institution_email.trim() === '' || 
        form.getValues().institution_address.trim() === '' || 
        form.getValues().institution_phone_number.trim() === '';
    
    
    const handleNext = () => {
        if (!isNextDisabled) {
            // Proceed to the next step
        } else {
            // Handle validation errors (e.g., show error messages)
        }
    }
    
    return (
        <Container size="md" mt="xl" content="center">
         
        </Container>
    )
}