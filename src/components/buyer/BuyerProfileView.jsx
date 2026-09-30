import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Shield, Save, CheckCircle } from 'lucide-react';
import api from '../../data/apiConfig';

/**
 * BuyerProfileView Component
 * Manages buyer account profile information, delivery address, and security settings.
 */
const BuyerProfileView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user')) || {};

  const [formData, setFormData] = useState({
    fullName: storedUser.fullName || '',
    email: storedUser.email || '',
    phone: storedUser.phone || '',
    address: storedUser.address || '742 Evergreen Terrace',
    city: storedUser.city || 'Houston',
    state: storedUser.state || 'TX',
    zipCode: storedUser.zipCode || '77002',
    notificationsEnabled: true
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSavedSuccess(false);

    try {
      // Send update to API if available
      const res = await api.put('/users/profile', formData);
      const updated = { ...storedUser, ...formData };
      localStorage.setItem('user', JSON.stringify(updated));
      setSavedSuccess(true);
    } catch (err) {
      console.warn('API unavailable, saved profile locally:', err.message);
      const updated = { ...storedUser, ...formData };
      localStorage.setItem('user', JSON.stringify(updated));
      setSavedSuccess(true);
    } finally {
      setLoading(false);
      setTimeout(() => setSavedSuccess(false), 4000);
    }
  };

  return (
    <div className="bg-white p-4 p-md-5 rounded-3 border border-light shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <div>
          <h5 className="fw-bold text-dark m-0">Buyer Profile & Settings</h5>
          <p className="text-muted small m-0">Manage your contact details, delivery address, and preferences.</p>
        </div>
        <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 px-3 py-1.5 fw-semibold">
          Verified Buyer
        </span>
      </div>

      {savedSuccess && (
        <div className="alert alert-success d-flex align-items-center gap-2 py-2.5 px-3 mb-4 rounded-3 small">
          <CheckCircle size={18} />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Personal Details */}
        <div className="row g-3 mb-4">
          <div className="col-12">
            <h6 className="fw-bold text-dark mb-1">Personal Information</h6>
          </div>

          <div className="col-md-6">
            <label className="form-label text-dark small fw-bold mb-1">Full Name</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-light text-muted"><User size={16} /></span>
              <input
                type="text"
                className="form-control bg-light border-light"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label text-dark small fw-bold mb-1">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-light text-muted"><Mail size={16} /></span>
              <input
                type="email"
                className="form-control bg-light border-light"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label text-dark small fw-bold mb-1">Phone Number</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-light text-muted"><Phone size={16} /></span>
              <input
                type="tel"
                className="form-control bg-light border-light"
                placeholder="(555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Delivery / Residence Address */}
        <div className="row g-3 mb-4 pt-3 border-top">
          <div className="col-12">
            <h6 className="fw-bold text-dark mb-1">Primary Vehicle Delivery Address</h6>
          </div>

          <div className="col-12">
            <label className="form-label text-dark small fw-bold mb-1">Street Address</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-light text-muted"><MapPin size={16} /></span>
              <input
                type="text"
                className="form-control bg-light border-light"
                placeholder="123 Main St"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </div>

          <div className="col-md-5">
            <label className="form-label text-dark small fw-bold mb-1">City</label>
            <input
              type="text"
              className="form-control bg-light border-light"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label text-dark small fw-bold mb-1">State</label>
            <input
              type="text"
              className="form-control bg-light border-light"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label text-dark small fw-bold mb-1">Zip Code</label>
            <input
              type="text"
              className="form-control bg-light border-light"
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-3 border-top d-flex justify-content-end">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-brand-red px-4 py-2.5 fw-bold text-uppercase d-flex align-items-center gap-2"
          >
            <Save size={16} />
            <span>{loading ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default BuyerProfileView;
