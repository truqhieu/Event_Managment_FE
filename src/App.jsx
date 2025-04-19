import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "antd";
import Login from "./pages/auth/Login";
import AdminPage from "./pages/admin/AdminPage";
import Department from "./pages/admin/department/Department";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Employee from "./pages/admin/employee/Employee";
import PrivateRoute from "./utils/PrivateRoute";
import EmployeeDashboard from "./pages/employee/EmployeePage";
import EmployeePage from "./pages/employee/EmployeePage";
import UnauthorizedPage from "./pages/Unauthrozation/Unauth";
import DepartmentDetail from "./pages/admin/department/departmentDetail/DepartmentDetail";
import EmployeeProfile from "./pages/employee/profile/EmployeeProfile";
import EmployeeAttendance from "./pages/employee/attendance/EmployeeAttendance.jsx";
// import { decodeToken } from "./utils/auth";
// const { Header, Content, Footer } = Layout;
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminPage />} >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/department" element={<Department />} />
            <Route path="/admin/department/:id" element={<DepartmentDetail />} />
            <Route path="/admin/employee" element={<Employee />} />
          </Route>
        </Route>
        <Route element={<PrivateRoute allowedRoles={["employee"]} />}>
          <Route path="/employee" element={<EmployeePage />} >
            <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
            <Route path="/employee/profile" element={<EmployeeProfile />} />
            <Route path="/employee/attendance" element={<EmployeeAttendance />} />
          </Route>
        </Route>

        <Route path="/unauthorized" element={<UnauthorizedPage />}></Route>
      </Routes>

    </Layout>
  );
}

export default App;
