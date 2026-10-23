import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, UserCheck, Sparkles, Search } from 'lucide-react';
import api from '../../data/apiConfig';

import { switchUserRole, getCurrentUser } from '../../utils/roleManager';

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

  const currentUser = user?.fullName ? user : (getCurrentUser() || {});

  const handleBecomeSeller = async () => {
    setUpgrading(true);
    try {
      await switchUserRole('private_seller');
      navigate('/seller-dashboard');
    } catch (err) {
      console.error('Failed to switch role to seller:', err);
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
            onClick={handleBecomeSeller} 
            disabled={upgrading}
            className="btn btn-dark btn-sm fw-bold d-flex align-items-center gap-2 px-3 py-2 shadow-xs animate-btn"
            title="Switch account to Seller and open Seller Dashboard"
          >
            <Sparkles size={15} className="text-warning" />
            <span>{upgrading ? 'Switching...' : 'Become a Seller'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default BuyerHeader;
