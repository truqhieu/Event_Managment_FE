import { Layout, Menu } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  LogoutOutlined,
  DashboardOutlined,
  ApartmentOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../style/sidebar.css";
import Logo from "./logo/Logo";
import { decodeToken } from "../utils/auth";
const { Sider } = Layout;

function Sidebar({ collapsed }) {
  const navigate = useNavigate();
  const user = decodeToken();

  const handleMenuClick = (e) => {
    if (e.key === "logout") {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      navigate(e.key);
    }
  };

  return (
    <Sider className="sidebar" collapsed={collapsed} style={{ position: "fixed", left: 0 }}>
      <Logo />
      <Menu theme="dark" mode="inline" onClick={handleMenuClick} className="menu-bar">
        {user && user.role === "admin" && (
          <>
            <Menu.Item key="/admin/dashboard" icon={<DashboardOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="/admin/department" icon={<ApartmentOutlined />}>
              Department
            </Menu.Item>
            <Menu.Item key="/admin/employee" icon={<UserOutlined />}>
              Employee
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />} style={{ color: "red" }}>
              Logout
            </Menu.Item>
          </>
        )}
        {user && user.role === "employee" && (
          <>
            <Menu.Item key="/employee" icon={<DashboardOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="/employee/profile" icon={<UserOutlined />}>
              Profile
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />} style={{ color: "red" }}>
              Logout
            </Menu.Item>
          </>
        )}
      </Menu>
    </Sider>
  );
}

export default Sidebar;
