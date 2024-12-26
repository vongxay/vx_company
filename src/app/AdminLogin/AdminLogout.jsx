import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogout.css';

const AdminLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin-login');
  }, [navigate]);

  return (
    <div className="logout-container">
      <div className="logout-content">
        <i className="fas fa-spinner fa-spin"></i>
        <p>กำลังออกจากระบบ...</p>
      </div>
    </div>
  );
};

export default AdminLogout;
