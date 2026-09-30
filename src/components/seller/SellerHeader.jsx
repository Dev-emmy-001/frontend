import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Bell, User as UserIcon } from 'lucide-react';

const SellerHeader = ({ 
  title = 'Seller Dashboard', 
  subtitle,
  actionButton = true,
  user
}) => {
  const currentUser = user || JSON.parse(localStorage.getItem('user')) || {};
  const displayName = currentUser.fullName || currentUser.email?.split('@')[0] || 'Seller';
  const displaySubtitle = subtitle || `Welcome back, ${displayName}`;

  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 pb-2 border-bottom border-light">
      <div>
        <h3 className="fw-bold text-dark m-0">{title}</h3>
        <p className="text-muted small m-0 mt-1">{displaySubtitle}</p>
      </div>

      <div className="d-flex align-items-center gap-3">
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
            className="btn btn-brand-red px-4 py-2 d-flex align-items-center gap-2 text-nowrap animate-btn"
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
