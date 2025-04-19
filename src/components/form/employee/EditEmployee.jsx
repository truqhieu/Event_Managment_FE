import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Select, DatePicker, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { updateEmployee, getEmployeeById } from "../../../api/employeeApi";
import { getDepartments } from "../../../api/departmentApi";
import moment from "moment";
import locale from 'antd/lib/date-picker/locale/vi_VN';
const { Option } = Select;

const UpdateEmployee = ({ employeeId, isVisible, onCancel, onEmployeeUpdated }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [departments, setDepartments] = useState([]);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (employeeId && isVisible) {
      fetchDepartments();
      fetchEmployeeDetails();
    }
  }, [employeeId, isVisible]);

  const fetchDepartments = async () => {
    try {
      const data = await getDepartments();
      setDepartments(data);
    } catch (error) {
      message.error("Failed to fetch departments");
    }
  };

  const fetchEmployeeDetails = async () => {
    try {
      setLoading(true);
      const employeeData = await getEmployeeById(employeeId);

      // Chuyển đổi các trường ngày tháng sang đối tượng moment
      const formattedData = {
        ...employeeData,
        dob: employeeData.dob ? moment(employeeData.dob) : null,
        startDate: employeeData.startDate ? moment(employeeData.startDate) : null,
        departmentId: employeeData.departmentId?._id || employeeData.departmentId
      };

      form.setFieldsValue(formattedData);
      setAvatar(employeeData.avatar || "");
      console.log("Raw employee data:", employeeData);
      console.log("Department data type:", typeof employeeData.departmentId);
    } catch (error) {
      message.error("Failed to fetch employee details");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      // Chuyển đổi giá trị date picker thành string nếu cần
      const formattedValues = {
        ...values,
        dob: values.dob ? values.dob.format('YYYY-MM-DD') : undefined,
        startDate: values.startDate ? values.startDate.format('YYYY-MM-DD') : undefined,
        avatar: avatar,
        departmentId: values.departmentId?._id || values.departmentId
      };

      console.log("Formatted values:", formattedValues);

      const updatedEmployee = await updateEmployee(employeeId, formattedValues);
      message.success("Employee updated successfully!");
      onEmployeeUpdated();
      console.log("Updated employee:", updatedEmployee);
      handleCancel();
    } catch (error) {
      message.error("Failed to update employee: " + (error.message || error));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle avatar upload
  const handleAvatarChange = (info) => {
    if (info.file.status === "done") {
      setAvatar(info.file.response?.url || "");
    } else if (info.file.status === "error") {
      message.error("Avatar upload failed!");
    }
  };

  return (
    <Modal
      title="Update Employee"
      open={isVisible}
      onCancel={handleCancel}
      footer={null}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Enter full name" }]}
            style={{ width: "48%" }}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Enter email" }]}
            style={{ width: "48%" }}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={[{ required: true, message: "Enter date of birth" }]}
            style={{ width: "48%" }}
          >
            <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Select gender" }]}
            style={{ width: "48%" }}
          >
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Enter phone number" }]}
            style={{ width: "48%" }}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>
          <Form.Item
            label="Department"
            name="departmentId"
            rules={[{ required: true, message: "Select department" }]}
            style={{ width: "48%" }}
          >
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
          <Form.Item
            label="Position"
            name="position"
            rules={[{ required: true, message: "Enter position" }]}
            style={{ width: "31%" }}
          >
            <Input placeholder="Enter position" />
          </Form.Item>
          <Form.Item
            label="Salary"
            name="salary"
            rules={[{ required: true, message: "Enter salary" }]}
            style={{ width: "31%" }}
          >
            <Input type="number" placeholder="Enter salary" />
          </Form.Item>
          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: "Select start date" }]}
            style={{ width: "31%" }}
            
          >
            <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" locale={locale} />
          </Form.Item>
        </div>
        <Form.Item label="Avatar" name="avatar">
          <Upload
            action="http://localhost:9999/upload"
            listType="picture"
            maxCount={1}
            onChange={handleAvatarChange}
          >
            <Button icon={<PlusOutlined />}>Upload Avatar</Button>
          </Upload>
          {avatar && <img src={avatar} alt="Preview" style={{ maxWidth: "100px", marginTop: "10px" }} />}
        </Form.Item>
        {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Item 
            label="Username" 
            name="username" 
            rules={[{ required: true, message: "Enter username" }]}
            style={{ width: "48%" }}
          >
            <Input placeholder="Enter username" />
          </Form.Item>
          <Form.Item 
            label="Password" 
            name="password" 
            style={{ width: "48%" }}
            help="Leave blank to keep current password"
          >
            <Input.Password placeholder="Enter new password (optional)" />
          </Form.Item>
        </div> */}
        <Form.Item>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update Employee
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateEmployee;