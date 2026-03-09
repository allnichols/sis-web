import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { RootLayout } from './routes/__root'
import { OnboardingPage } from './routes/onboarding'
import { DashboardLayout } from './routes/dashboard/layout'
import { DashboardPage, validateDashboardSearch } from './routes/dashboard/dashboard'

const rootRoute = createRootRoute({ component: RootLayout })

const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: OnboardingPage,
})

// Parent route: dashboard-specific layout
const dashboardLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardLayout,
})

// Child route rendered inside <Outlet /> of DashboardLayout
const dashboardIndexRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/',
  validateSearch: validateDashboardSearch,
  component: DashboardRoute,
})

function DashboardRoute() {
  const { students } = dashboardIndexRoute.useSearch()
  return <DashboardPage students={students} />
}

const routeTree = rootRoute.addChildren([
  onboardingRoute,
  dashboardLayoutRoute.addChildren([dashboardIndexRoute]),
])

export const router = createRouter({ routeTree })