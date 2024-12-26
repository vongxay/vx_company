import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashNavbar.css';

const DashNavbar = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        if (window.confirm('ທ່ານຕ້ອງການອອກຈາກລະບົບຫຼືບໍ່?')) {
            navigate('/admin-logout');
        }
    };

    return (
        <nav className="dash-navbar">
            <div className="dash-navbar-left">
                <div className="dash-logo">
                    <img src="/images/company-logo.png" alt="VX Tech Logo" />
                    <span>VX Tech Admin</span>
                </div>
            </div>

            <div className="dash-navbar-right">
                <div className="dash-user-menu">
                    <button 
                        className="user-menu-btn"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <i className="fas fa-user-circle"></i>
                        <span className="user-greeting">Admin</span>
                    </button>
                    
                    {isDropdownOpen && (
                        <div className="user-dropdown">
                            <div className="dropdown-header">
                                <i className="fas fa-user-circle"></i>
                                <span>Admin</span>
                            </div>
                            <div className="dropdown-divider"></div>
                            <button className="dropdown-item" onClick={handleLogout}>
                                <i className="fas fa-sign-out-alt"></i>
                                <span>ອອກຈາກລະບົບ</span>
                            </button>
                            <button 
                                className="dropdown-item cancel"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                <i className="fas fa-times"></i>
                                <span>ຍົກເລີກ</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default DashNavbar;
