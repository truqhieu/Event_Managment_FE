import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, message } from "antd";
import axios from "axios";
import { decodeToken } from "../../utils/auth";

function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post("http://localhost:9999/api/auth/login", values);
      localStorage.setItem("token", response.data.token);
      
      const user = decodeToken();
      if (user.role === "admin") {
        message.success("Login successful!");
        navigate("/admin/dashboard");
      } else {
        message.success("Login successful!");
        navigate("/employee");
      }
    } catch (error) {
      message.error(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <Card style={{ width: "100%", maxWidth: "400px", margin: "100px auto" }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please input your username!" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>Login</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Login;
