import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Select, DatePicker, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { addEmployee } from "../../../api/employeeApi";
import { getDepartments } from "../../../api/departmentApi";  // Giả sử bạn đã có API lấy danh sách phòng ban
import { toast } from "react-toastify";

const { Option } = Select;

const AddEmployee = ({ onEmployeeAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [departments, setDepartments] = useState([]);
  const [avatar, setAvatar] = useState(""); // State for avatar

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const data = await getDepartments();
      setDepartments(data);
    } catch (error) {
      message.error("Failed to fetch departments");
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields(); // Reset form when modal is closed
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      values.avatar = avatar;
      const response = await addEmployee(values); // Add employee via API
      onEmployeeAdded(response.employee);
      handleCancel();
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle avatar upload
  const handleAvatarChange = (info) => {
    if (info.file.status === "done") {
      const url = info.file.response?.url;
      if (url) {
        setAvatar(url);
        toast.success("Avatar uploaded successfully!");
      }
    } else if (info.file.status === "error") {
      toast.error("Avatar upload failed!");
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        <PlusOutlined /> Add Employee
      </Button>
      <Modal
        title="Add Employee"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item label="Full Name" name="fullName" rules={[{ required: true, message: "Enter full name" }]} style={{ width: "48%" }}>
              <Input placeholder="Enter full name" />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: "Enter email" }]} style={{ width: "48%" }}>
              <Input placeholder="Enter email" />
            </Form.Item>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item label="Date of Birth" name="dob" rules={[{ required: true, message: "Enter date of birth" }]} style={{ width: "48%" }}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Gender" name="gender" rules={[{ required: true, message: "Select gender" }]} style={{ width: "48%" }}>
              <Select placeholder="Select gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </div>
          <Form.Item label="Address" name="address">
            <Input.TextArea placeholder="Enter address" />
          </Form.Item>
          <div style={{ display: "flex", justifyContent: "space-between" }} >
            <Form.Item label="Phone" name="phone" rules={[{ required: true, message: "Enter phone number" }] } style={{ width: "48%" }}>
              <Input placeholder="Enter phone number" />
            </Form.Item>
            <Form.Item label="Department" name="departmentId" rules={[{ required: true, message: "Select department" }]} style={{ width: "48%" }}>
              <Select placeholder="Select department">
                {departments.map((dept) => (
                  <Option key={dept._id} value={dept._id}>
                    {dept.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item label="Position" name="position" rules={[{ required: true, message: "Enter position" }]} style={{ width: "31%" }}>
              <Input placeholder="Enter position" />
            </Form.Item>
            <Form.Item label="Salary" name="salary" rules={[{ required: true, message: "Enter salary" }]} style={{ width: "31%" }}>
              <Input type="number" placeholder="Enter salary" />
            </Form.Item>
            <Form.Item label="Start Date" name="startDate" rules={[{ required: true, message: "Select start date" }]} style={{ width: "31%" }}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </div>
          <Form.Item label="Avatar" name="avatar">
            <Upload
              name="file" // tên field đúng như multer mong đợi
              action="http://localhost:9999/upload"
              listType="picture"
              maxCount={1}
              showUploadList={true}
              onChange={handleAvatarChange}
            >
              <Button icon={<PlusOutlined />}>Upload Avatar</Button>
            </Upload>
          </Form.Item>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item label="Username" name="username" rules={[{ required: true, message: "Enter username" }]} style={{ width: "48%" }}>
              <Input placeholder="Enter username" />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true, message: "Enter password" }]} style={{ width: "48%" }}>
              <Input placeholder="Enter password" />
            </Form.Item>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Add Employee
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddEmployee;
