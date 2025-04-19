import { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { addDepartment } from "../../../api/departmentApi";
const AddDepartment = ({ onDepartmentAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields(); // Reset form khi đóng modal
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await addDepartment(values);
      message.success("Department added successfully!");
      onDepartmentAdded(response.department);
      handleCancel();
    } catch (error) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        <PlusOutlined /> Add Department
      </Button>
      <Modal
        title="Add Department"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
              Add Department
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddDepartment;
