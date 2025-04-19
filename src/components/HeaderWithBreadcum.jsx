import { Breadcrumb, Layout } from "antd";
import { useLocation, Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { getDepartmentById } from "../api/departmentApi";

const { Header } = Layout;

// Map đường dẫn thành tên hiển thị
const breadcrumbNameMap = {
  "/admin": "Home",
  "/admin/dashboard": "Dashboard",
  "/dashboard": "User Dashboard",
  "/profile": "My Profile",
  "/admin/department": "Department",
  "/admin/employee": "Employee",
  "/employee": "Employee",
  "/employee/profile": "Profile",
};

function HeaderWithBreadcrumb() {
  const location = useLocation();
  const { id } = useParams(); 
  const [departmentName, setDepartmentName] = useState(""); // Lưu tên department
  const [loading, setLoading] = useState(true); // Kiểm tra trạng thái loading

  useEffect(() => {
    // Nếu có id, gọi API để lấy thông tin department
    if (id) {
      setLoading(true);
      getDepartmentById(id)
        .then((response) => {
          setDepartmentName(response.name); // Giả sử API trả về tên department trong response.data.name
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching department:", error);
          setLoading(false);
        });
    }
  }, [id]);

  const pathSnippets = location.pathname.split("/").filter((i) => i);

  // Tạo danh sách breadcrumb theo path hiện tại
  const breadcrumbItems = [
    ...pathSnippets.map((path, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      // Thay thế id bằng tên department nếu đường dẫn là /admin/department/:id và departmentName đã được lấy
      if (url.includes("/admin/department/") && departmentName) {
        return {
          title: loading ? "Loading..." : <Link to={url}>{departmentName}</Link>,
          key: url,
        };
      }

      return {
        title: breadcrumbNameMap[url] ? <Link to={url}>{breadcrumbNameMap[url]}</Link> : path,
        key: url,
      };
    }),
  ];

  return (
    <Header style={{ background: "#fff", padding: "5px", borderRadius: "5px", margin: "16px" }}>
      <Breadcrumb items={breadcrumbItems} style={{ margin: "16px" }} />
    </Header>
  );
}

export default HeaderWithBreadcrumb;
