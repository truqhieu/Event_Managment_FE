import React from "react";
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import { decodeToken } from "./auth";

// Component bảo vệ route theo quyền
const PrivateRoute = ({ allowedRoles }) => {
  const user = decodeToken();
  const token = localStorage.getItem("token");
  const role = user ? user.role : null;

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};
PrivateRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PrivateRoute;
