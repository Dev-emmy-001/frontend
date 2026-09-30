import React, { useState } from 'react';
import { X, Send, CheckCircle, Calendar, Phone, Mail, User, MessageSquare } from 'lucide-react';

/**
 * VehicleContactModal Component
 * Interactive modal allowing prospective buyers to message the seller or schedule a test drive.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {Function} props.onClose - Callback to close modal
 * @param {Object} props.car - Vehicle data
 */
const VehicleContactModal = ({ isOpen, onClose, car = {} }) => {
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const [form, setForm] = useState({
    name: user.fullName || '',
    email: user.email || '',
    phone: user.phone || '',
    inquiryType: 'general',
    preferredDate: '',
    message: `Hi, I am interested in the ${car.year || ''} ${car.make || ''} ${car.model || ''} listed for $${Number(car.price || 0).toLocaleString()}. Is this vehicle still available for a test drive?`
  });

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        onClose();
      }, 2500);
    }, 600);
  };

  return (
    <div 
      className="modal fade show d-block" 
      tabIndex="-1" 
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(3px)', zIndex: 1050 }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
          
          {/* Header */}
          <div className="modal-header bg-dark text-white p-4">
            <div>
              <span className="badge bg-danger text-uppercase mb-1" style={{ fontSize: '10px' }}>Inquiry</span>
              <h5 className="modal-title fw-bold m-0">Contact Seller</h5>
              <small className="text-white-50">
                Regarding {car.year} {car.make} {car.model}
              </small>
            </div>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={onClose}
              aria-label="Close"
            />
          </div>

          {/* Body */}
          <div className="modal-body p-4 p-md-4">
            {sent ? (
              <div className="text-center py-5">
                <div className="bg-success bg-opacity-10 text-success p-3 rounded-circle d-inline-flex mb-3">
                  <CheckCircle size={48} />
                </div>
                <h5 className="fw-bold text-dark">Message Sent Successfully!</h5>
                <p className="text-muted small">The seller will respond to your email and phone within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Inquiry Type */}
                  <div className="col-12">
                    <label className="form-label text-dark small fw-bold mb-1">Inquiry Purpose</label>
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, inquiryType: 'general' })}
                        className={`btn btn-sm flex-grow-1 fw-bold ${form.inquiryType === 'general' ? 'btn-danger' : 'btn-outline-secondary'}`}
                      >
                        Ask Question
                      </button>
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, inquiryType: 'test-drive' })}
                        className={`btn btn-sm flex-grow-1 fw-bold ${form.inquiryType === 'test-drive' ? 'btn-danger' : 'btn-outline-secondary'}`}
                      >
                        Schedule Test Drive
                      </button>
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, inquiryType: 'price' })}
                        className={`btn btn-sm flex-grow-1 fw-bold ${form.inquiryType === 'price' ? 'btn-danger' : 'btn-outline-secondary'}`}
                      >
                        Make an Offer
                      </button>
                    </div>
                  </div>

                  {/* Name */}
                  <div className="col-md-6">
                    <label className="form-label text-dark small fw-bold mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="col-md-6">
                    <label className="form-label text-dark small fw-bold mb-1">Your Email Address *</label>
                    <input
                      type="email"
                      className="form-control"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="col-md-6">
                    <label className="form-label text-dark small fw-bold mb-1">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="(555) 000-0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>

                  {/* Preferred Date if test drive */}
                  {form.inquiryType === 'test-drive' && (
                    <div className="col-md-6">
                      <label className="form-label text-dark small fw-bold mb-1">Preferred Test Drive Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={form.preferredDate}
                        onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                        required
                      />
                    </div>
                  )}

                  {/* Message */}
                  <div className="col-12">
                    <label className="form-label text-dark small fw-bold mb-1">Your Message</label>
                    <textarea
                      rows={3}
                      className="form-control"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Footer buttons */}
                <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
                  <button type="button" className="btn btn-light fw-bold" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" disabled={loading} className="btn btn-brand-red px-4 fw-bold d-flex align-items-center gap-2">
                    <Send size={15} />
                    <span>{loading ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default VehicleContactModal;
