import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  const loginTime = localStorage.getItem('loginTime');
  const SESSION_TIMEOUT = 3600000; // 1 ชั่วโมง

  // ตรวจสอบ session timeout
  if (loginTime && Date.now() - parseInt(loginTime) > SESSION_TIMEOUT) {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('loginTime');
    return <Navigate to="/admin-login" replace />;
  }

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProtectedRoute; 