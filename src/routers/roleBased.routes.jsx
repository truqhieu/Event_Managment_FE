// src/routers/roleBased.routes.jsx
import React from "react";
import wrapWithLazy from "../utils/wrapWithLazy";

const HomePage = React.lazy(() => import("../pages/Guest/HomePage/HomePage"));
const DashboardStaff = React.lazy(() => import("../pages/Staff/DashboardStaff"));
const DashboardAdmin = React.lazy(() => import("../pages/Admin/AdminDashboard"));

const ROUTERS = {
  HOME: "",
  DASHBOARD_STAFF: "staff-dashboard",
  DASHBOARD_ADMIN: "admin-dashboard",
};

export { ROUTERS };

export const guestRoutes = [
  { path: ROUTERS.HOME, element: wrapWithLazy(HomePage) },
];

export const staffRoutes = [
  { path: ROUTERS.DASHBOARD_STAFF, element: wrapWithLazy(DashboardStaff) },
];

export const adminRoutes = [
  { path: ROUTERS.DASHBOARD_ADMIN, element: wrapWithLazy(DashboardAdmin) },
];
