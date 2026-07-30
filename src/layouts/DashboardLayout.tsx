import { Outlet, Link } from '@tanstack/react-router';
import { AppShell, Burger, Group } from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';

export function DashboardLayout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
          The burger icon is always visible
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Link to="/dashboard">Home</Link>
        <Link to="/dashboard/students">Students</Link>
        <Link to="/dashboard/teachers">Students</Link>
        <Link to="/dashboard/classes">Students</Link>
        <Link to="/dashboard/settings">Settings</Link>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}