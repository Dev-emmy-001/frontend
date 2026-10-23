import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, User as UserIcon, ArrowLeftRight } from 'lucide-react';
import { switchUserRole, getCurrentUser } from '../../utils/roleManager';

const SellerHeader = ({ 
  title = 'Seller Dashboard', 
  subtitle,
  actionButton = true,
  user
}) => {
  const [switching, setSwitching] = useState(false);
  const navigate = useNavigate();

  const currentUser = user || getCurrentUser() || {};
  const displayName = currentUser.fullName || currentUser.email?.split('@')[0] || 'Seller';
  const displaySubtitle = subtitle || `Welcome back, ${displayName}`;

  const handleSwitchToBuyer = async () => {
    setSwitching(true);
    try {
      await switchUserRole('buyer');
      navigate('/buyer-dashboard');
    } catch (err) {
      console.error('Failed to switch to buyer:', err);
      navigate('/buyer-dashboard');
    } finally {
      setSwitching(false);
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 pb-2 border-bottom border-light">
      <div>
        <h3 className="fw-bold text-dark m-0">{title}</h3>
        <p className="text-muted small m-0 mt-1">{displaySubtitle}</p>
      </div>

      <div className="d-flex align-items-center gap-2 flex-wrap">
        {/* Switch to Buyer Account Button */}
        <button 
          onClick={handleSwitchToBuyer} 
          disabled={switching}
          className="btn btn-outline-dark btn-sm fw-bold d-flex align-items-center gap-2 px-3 py-2 shadow-xs animate-btn"
          title="Switch back to Buyer account and open Buyer Dashboard"
        >
          <ArrowLeftRight size={15} className="text-danger" />
          <span>{switching ? 'Switching...' : 'Switch to Buyer'}</span>
        </button>

        {/* User Badge */}
        <div className="d-none d-sm-flex align-items-center gap-2 bg-white px-3 py-1.5 rounded-pill border border-light shadow-sm">
          <div className="rounded-circle bg-danger bg-opacity-10 text-danger p-1 d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px' }}>
            <UserIcon size={16} />
          </div>
          <span className="small fw-semibold text-dark">{displayName}</span>
          <span className="badge bg-danger bg-opacity-10 text-danger small px-2 py-0.5" style={{ fontSize: '10px' }}>
            {currentUser.role === 'business_dealer' ? 'Dealer' : 'Seller'}
          </span>
        </div>

        {/* Add New Vehicle CTA */}
        {actionButton && (
          <Link 
            to="/add-vehicle" 
            className="btn btn-brand-red px-3 py-2 d-flex align-items-center gap-2 text-nowrap animate-btn btn-sm fw-bold"
          >
            <PlusCircle size={16} />
            <span>Add New Vehicle</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SellerHeader;
