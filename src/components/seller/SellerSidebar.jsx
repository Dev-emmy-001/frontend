import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Car, PlusCircle, ShoppingBag, DollarSign, 
  MessageSquare, User, LogOut, ArrowLeft
} from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

const SellerSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/seller-dashboard', icon: <LayoutDashboard size={18} /> },
    { label: 'My Listings', path: '/seller-dashboard/listings', icon: <Car size={18} /> },
    { label: 'Add Vehicle', path: '/add-vehicle', icon: <PlusCircle size={18} /> },
    { label: 'Orders', path: '/seller-orders', icon: <ShoppingBag size={18} /> },
    { label: 'Earnings', path: '/seller-earnings', icon: <DollarSign size={18} /> },
    { label: 'Messages', path: '/messages', icon: <MessageSquare size={18} /> },
    { label: 'Profile', path: '/profile', icon: <User size={18} /> }
  ];

  const isActive = (path) => {
    if (path === '/seller-dashboard' && location.pathname === '/seller-dashboard') return true;
    if (path !== '/seller-dashboard' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <aside className="dashboard-sidebar bg-dark text-white p-3 d-flex flex-column justify-content-between" style={{ width: '260px', minHeight: '100vh', flexShrink: 0 }}>
      <div>
        {/* Logo & Brand Header */}
        <div className="mb-4 px-2 pt-2">
          <Link to="/" className="d-flex align-items-center text-white text-decoration-none mb-1">
            <Car className="text-danger me-2" size={26} />
            <span className="fw-black text-uppercase tracking-wider fs-5">
              SUMMIT <span className="text-danger">AUTO</span>
            </span>
          </Link>
          <span className="badge bg-secondary bg-opacity-25 text-white-50 small" style={{ fontSize: '10px' }}>
            SELLER PORTAL
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="nav flex-column nav-pills gap-1">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link 
                key={item.path}
                to={item.path} 
                className={`nav-link d-flex align-items-center gap-3 py-2.5 px-3 rounded-3 transition-all ${
                  active 
                    ? 'bg-danger text-white fw-bold shadow-sm' 
                    : 'text-white-50 fw-semibold hover-bg-dark hover-text-white'
                }`}
                style={{ textDecoration: 'none' }}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout and Back to Main Site */}
      <div className="pt-4 border-top border-secondary border-opacity-25 d-flex flex-column gap-1">
        <Link 
          to="/" 
          className="btn text-white-50 d-flex align-items-center gap-2 border-0 px-3 py-2 text-start small hover-text-white"
        >
          <ArrowLeft size={16} />
          <span>Back to Main Website</span>
        </Link>
        
        <button 
          onClick={handleLogout} 
          className="btn text-white-50 d-flex align-items-center gap-2 border-0 px-3 py-2 text-start small hover-text-danger"
          aria-label="Logout"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default SellerSidebar;
