import { Container, Group } from '@mantine/core';
import { Outlet } from '@tanstack/react-router';
// import {} from '@mantine/core';

export function AuthLayout() {
    return (
        <>
        <Container size="sm" px="xs">
            <Outlet />
        </Container>
        <Container size="xl" px="md">
            <Group>
                Footer content goes here. You can add links, copyright information, or any other relevant details. 
            </Group>
        </Container>
        </>
    )
}