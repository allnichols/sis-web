import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
} from "@tanstack/react-router";

import RootLayout from "./layouts/RootLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";

import RegisterPage  from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

import DashboardHome from "./pages/dashboard/DashboardHome";
// import StudentsPage from "./pages/dashboard/StudentsPage";
// import TeachersPage from "./pages/dashboard/TeachersPage";
// import ClassesPage from "./pages/dashboard/ClassesPage";
// import SettingsPage from "./pages/dashboard/SettingsPage";

// import { getCurrentUser } from "./lib/auth";

const rootRoute = createRootRoute({
  component: RootLayout
});

// Redirect
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad() {
    throw redirect({
      to: "/register"
    });
  },
});

// Public routes
const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegisterPage
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

// Protected Dashboard Layout
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",

  // beforeLoad: async () => {
  //   const user = await getCurrentUser();

  //   if (!user) {
  //     throw redirect({
  //       to: "/login",
  //     });
  //   }
  // },

  component: DashboardLayout,
});

const dashboardIndexRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "/",
  component: DashboardHome,
});

// Build tree
const routeTree = rootRoute.addChildren([
  indexRoute, 
  registerRoute,
  loginRoute,

  dashboardRoute.addChildren([
    dashboardIndexRoute,
  ]),
])

export const router = createRouter({
  routeTree,
})