import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { updateDepartment, getDepartmentById } from "../../../api/departmentApi";

const UpdateDepartment = ({ departmentId, onDepartmentUpdated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Mở modal và load dữ liệu phòng ban
  const showModal = async () => {
    setIsModalOpen(true);
    try {
      const department = await getDepartmentById(departmentId);
      form.setFieldsValue(department); // Đổ dữ liệu vào form
    } catch (error) {
      message.error("Failed to load department data");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields(); // Reset form khi đóng modal
  };

  const handleUpdate = async (values) => {
    try {
      setLoading(true);
      await updateDepartment(departmentId, values);
      message.success("Department updated successfully!");
      onDepartmentUpdated();
      handleCancel();
    } catch (error) {
      message.error("Failed to update department");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button type="primary" style={{ marginRight: "10px" }} icon={<EditOutlined />} onClick={showModal}/>
      <Modal
        title="Update Department"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item
            label="Department Name"
            name="name"
            rules={[{ required: true, message: "Please enter department name!" }]}
          >
            <Input placeholder="Enter department name" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea placeholder="Enter department description" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Update Department
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateDepartment;
