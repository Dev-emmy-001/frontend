import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';

const ContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <div className="col-lg-7">
      <h5 className="fw-bold text-dark mb-4">{t('contact.sendMessage', 'Send Us a Message')}</h5>

      {submitted && (
        <div className="alert alert-success py-3 px-4 mb-4 small fw-semibold">
          ✓ Thank you! Your message has been sent successfully. Our team will contact you shortly.
        </div>
      )}

      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-12">
          <label className="form-label small fw-bold text-dark m-0 mb-1">
            {t('contact.fullName', 'Full Name')} *
          </label>
          <input 
            type="text" 
            required
            value={formData.fullName}
            className="form-control form-input-light" 
            placeholder={t('contact.fullName', 'Enter your full name')}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>

        <div className="col-12">
          <label className="form-label small fw-bold text-dark m-0 mb-1">
            {t('contact.emailAddress', 'Email Address')} *
          </label>
          <input 
            type="email" 
            required
            value={formData.email}
            className="form-control form-input-light" 
            placeholder={t('contact.emailAddress', 'Enter your email')}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="col-12">
          <label className="form-label small fw-bold text-dark m-0 mb-1">
            {t('contact.phone', 'Phone Number')}
          </label>
          <input 
            type="tel" 
            value={formData.phone}
            className="form-control form-input-light" 
            placeholder={t('contact.phone', 'Enter your phone number')}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="col-12">
          <label className="form-label small fw-bold text-dark m-0 mb-1">
            {t('contact.subject', 'Subject')} *
          </label>
          <select 
            required 
            value={formData.subject}
            className="form-select form-input-light"
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          >
            <option value="">Select a subject</option>
            <option value="Inquiry">General Inquiry</option>
            <option value="Financing">Financing Question</option>
            <option value="Test Drive">Schedule Test Drive</option>
            <option value="Trade-In">Trade-In Appraisal</option>
            <option value="Service">Service & Maintenance</option>
          </select>
        </div>

        <div className="col-12">
          <label className="form-label small fw-bold text-dark m-0 mb-1">
            {t('contact.message', 'Message')} *
          </label>
          <textarea 
            rows="4" 
            required
            value={formData.message}
            className="form-control form-input-light" 
            placeholder="Type your message here..."
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          ></textarea>
        </div>

        <div className="col-12 mt-4">
          <button 
            type="submit" 
            className="btn btn-brand-green w-100 py-3 fw-bold text-uppercase d-flex align-items-center justify-content-center gap-2"
          >
            <span>{t('contact.submit', 'SEND MESSAGE')}</span>
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
