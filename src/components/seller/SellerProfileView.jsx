import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Building, ShieldCheck } from 'lucide-react';

const SellerProfileView = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {
    fullName: 'Summit Seller',
    email: 'seller@summitautogroup.com',
    phone: '(713) 555-0198',
    role: 'business_dealer'
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(user));
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <div className="bg-white p-4 p-md-5 rounded-3 border border-light shadow-sm" style={{ maxWidth: '780px' }}>
      <div className="mb-4 pb-2 border-bottom border-light">
        <h5 className="fw-bold text-dark m-0">Seller Profile Settings</h5>
        <small className="text-muted">Manage your business contact details and dealership profile</small>
      </div>

      {saved && (
        <div className="alert alert-success py-2 px-3 mb-4 small fw-semibold">
          ✓ Profile settings updated successfully!
        </div>
      )}

      <form onSubmit={handleSave}>
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label small fw-bold text-secondary">Full / Business Name</label>
            <div className="input-group">
              <span className="input-group-text bg-light"><User size={16} className="text-muted" /></span>
              <input 
                type="text" 
                required 
                className="form-control form-control-custom"
                value={user.fullName || ''}
                onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              />
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold text-secondary">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-light"><Mail size={16} className="text-muted" /></span>
              <input 
                type="email" 
                required 
                className="form-control form-control-custom"
                value={user.email || ''}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label small fw-bold text-secondary">Phone Number</label>
            <div className="input-group">
              <span className="input-group-text bg-light"><Phone size={16} className="text-muted" /></span>
              <input 
                type="tel" 
                className="form-control form-control-custom"
                value={user.phone || '(713) 555-0198'}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold text-secondary">Seller Account Type</label>
            <div className="input-group">
              <span className="input-group-text bg-light"><Building size={16} className="text-muted" /></span>
              <input 
                type="text" 
                disabled 
                className="form-control form-control-custom bg-light"
                value={user.role === 'business_dealer' ? 'Certified Business Dealer' : 'Verified Private Seller'}
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label small fw-bold text-secondary">Dealership Location</label>
          <div className="input-group">
            <span className="input-group-text bg-light"><MapPin size={16} className="text-muted" /></span>
            <input 
              type="text" 
              className="form-control form-control-custom"
              value={user.address || '2500 West Loop South, Houston, TX 77027'}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
            />
          </div>
        </div>

        <div className="text-end pt-3 border-top border-light">
          <button type="submit" className="btn btn-brand-red px-4 py-2 fw-bold text-uppercase">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellerProfileView;
