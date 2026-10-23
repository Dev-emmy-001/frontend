import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  ShoppingBag, 
  Heart, 
  MessageSquare, 
  CreditCard, 
  User, 
  LogOut,
  Car,
  Sparkles
} from 'lucide-react';
import { switchUserRole } from '../../utils/roleManager';

/**
 * BuyerSidebar Component
 * Provides clean navigation across all buyer portal views and quick links back to public inventory.
 */
const BuyerSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper to determine if a route is currently active
  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/buyer-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/inventory', label: 'Browse Cars', icon: Search },
    { path: '/my-orders', label: 'My Orders', icon: ShoppingBag },
    { path: '/favorites', label: 'Favorites', icon: Heart },
    { path: '/messages', label: 'Messages', icon: MessageSquare },
    { path: '/payments', label: 'Payments', icon: CreditCard },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const [upgrading, setUpgrading] = React.useState(false);

  const handleBecomeSeller = async () => {
    setUpgrading(true);
    try {
      await switchUserRole('private_seller');
      navigate('/seller-dashboard');
    } catch (err) {
      console.error('Failed to switch to seller:', err);
      navigate('/seller-dashboard');
    } finally {
      setUpgrading(false);
    }
  };

  return (
    <aside 
      className="dashboard-sidebar text-white p-3 d-flex flex-column justify-content-between"
      style={{ minWidth: '240px', backgroundColor: '#111315', minHeight: '100vh' }}
    >
      <div>
        {/* Summit Auto Group Brand Header */}
        <Link to="/" className="d-flex align-items-center gap-2 text-white text-decoration-none mb-4 px-2 pt-2">
          <div className="bg-danger text-white rounded p-1.5 d-flex align-items-center justify-content-center">
            <Car size={20} />
          </div>
          <div>
            <span className="fw-black text-uppercase tracking-wider fs-6 d-block lh-1">
              SUMMIT <span className="text-danger">AUTO</span>
            </span>
            <small className="text-white-50" style={{ fontSize: '10px', letterSpacing: '1px' }}>
              BUYER PORTAL
            </small>
          </div>
        </Link>

        {/* Navigation Link List */}
        <div className="nav flex-column nav-pills gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link fw-semibold d-flex align-items-center gap-3 py-2.5 px-3 rounded-2 transition-all ${
                  active 
                    ? 'bg-danger text-white shadow-sm' 
                    : 'text-white-50 hover-text-white hover-bg-dark'
                }`}
                style={{
                  transition: 'all 0.2s ease',
                  backgroundColor: active ? '#dc3545' : 'transparent',
                  color: active ? '#fff' : '#9ca3af'
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Switch to Seller & Logout Footer */}
      <div className="pt-3 border-top border-secondary border-opacity-25">
        <button 
          onClick={handleBecomeSeller} 
          disabled={upgrading}
          className="btn w-100 bg-white bg-opacity-10 text-white hover-bg-danger d-flex align-items-center justify-content-center gap-2 border-0 px-3 py-2 rounded-2 mb-2 fw-semibold small transition-all"
          title="Switch account to Seller and open Seller Dashboard"
        >
          <Sparkles size={15} className="text-warning" />
          <span>{upgrading ? 'Switching...' : 'Become a Seller'}</span>
        </button>

        <button 
          onClick={handleLogout} 
          className="btn w-100 text-white-50 hover-text-white d-flex align-items-center gap-3 border-0 px-3 py-2 rounded-2 text-start"
          style={{ transition: 'all 0.2s ease' }}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default BuyerSidebar;
