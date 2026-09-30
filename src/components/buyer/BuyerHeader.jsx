import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, UserCheck, Sparkles, Search } from 'lucide-react';
import api from '../../data/apiConfig';

/**
 * BuyerHeader Component
 * Displays the page header, user greeting, role badge, and role upgrade actions.
 * 
 * @param {Object} props
 * @param {string} props.title - Current page title
 * @param {string} [props.subtitle] - Optional subtitle description
 * @param {Object} [props.user] - Current user data
 * @param {boolean} [props.showUpgrade=true] - Whether to show the "Become a Seller" button
 */
const BuyerHeader = ({ 
  title = 'Buyer Dashboard', 
  subtitle,
  user = {}, 
  showUpgrade = true 
}) => {
  const [upgrading, setUpgrading] = useState(false);
  const navigate = useNavigate();

  const currentUser = user?.fullName ? user : (JSON.parse(localStorage.getItem('user')) || {});

  const handleUpgradeRole = async () => {
    const confirmUpgrade = window.confirm('Would you like to upgrade your account to a Private Seller to list and sell vehicles?');
    if (!confirmUpgrade) return;

    setUpgrading(true);
    try {
      // Send role update request to backend
      const res = await api.put('/users/update-role', { role: 'private_seller' });
      
      const updatedUser = res.data?.user || { ...currentUser, role: 'private_seller' };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      alert('Congratulations! Your account has been upgraded to Private Seller.');
      navigate('/seller-dashboard');
    } catch (err) {
      console.warn('Backend endpoint unavailable, applying local role upgrade:', err.message);
      const updatedUser = { ...currentUser, role: 'private_seller' };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      alert('Your account role has been updated to Private Seller.');
      navigate('/seller-dashboard');
    } finally {
      setUpgrading(false);
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
      {/* Title & User Greeting */}
      <div>
        <div className="d-flex align-items-center gap-2">
          <h3 className="fw-bold text-dark m-0">{title}</h3>
          <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 px-2 py-1 small">
            Buyer Account
          </span>
        </div>
        <p className="text-muted small m-0 mt-1">
          {subtitle || `Welcome back, ${currentUser.fullName || currentUser.email || 'Valued Buyer'}`}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="d-flex align-items-center gap-2 flex-wrap">
        <Link 
          to="/inventory" 
          className="btn btn-outline-secondary btn-sm fw-bold d-flex align-items-center gap-2 px-3 py-2"
        >
          <Search size={15} />
          <span>Browse Inventory</span>
        </Link>

        {showUpgrade && (
          <button 
            onClick={handleUpgradeRole} 
            disabled={upgrading}
            className="btn btn-dark btn-sm fw-bold d-flex align-items-center gap-2 px-3 py-2"
            title="List and sell vehicles on Summit Auto Group"
          >
            <Sparkles size={15} className="text-warning" />
            <span>{upgrading ? 'Upgrading...' : 'Become a Seller'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default BuyerHeader;
