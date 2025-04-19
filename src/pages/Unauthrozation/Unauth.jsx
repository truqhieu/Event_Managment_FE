
import { Button, Result } from 'antd';
import { decodeToken } from '../../utils/auth';
const UnauthorizedPage = () => {
  const user = decodeToken();
  const role = user ? user.role : null;
  const handleBack = () => {
    if (role === "admin") {
      window.location.href = "/admin/dashboard";
    } else {
      window.location.href = "/employee";
    }
  }
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<Button type="primary" onClick={handleBack}>
      Back login</Button>}
    />
  );
};
export default UnauthorizedPage;