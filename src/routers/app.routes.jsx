// src/routers/AppRouter.jsx
import { Navigate, Route, Routes } from "react-router-dom";
import GuestLayout from "../layout/GuestLayout";
import {
  guestRoutes,
  staffRoutes,
  adminRoutes,
} from "./roleBased.routes";
import { useAuth } from "../context/AuthContext";

const AppRouter = () => {
  const { user } = useAuth();

  const isGuest = !user || user.role === "Cusomter";

  return (
    <Routes>
      {isGuest && (
        <Route path="/*" element={<GuestLayout />}>
          {guestRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Route>
      )}

      {user?.role === "staff" && (
        <Route path="/staff/*" element={<StaffLayout />}>
          {staffRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
      )}

      {user?.role === "admin" && (
        <Route path="/admin/*" element={<StaffLayout />}>
          {adminRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
      )}
    </Routes>
  );
};

export default AppRouter;
