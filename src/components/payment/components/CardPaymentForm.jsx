import React from 'react';
import { CreditCard, Lock, Calendar, User } from 'lucide-react';
import { 
  formatCardNumber, 
  formatExpiry, 
  formatCvv, 
  detectCardBrand 
} from '../utils/cardFormatters';

/**
 * CardPaymentForm Component
 * Form inputs for Credit/Debit card with live formatting and network brand badges
 */
export const CardPaymentForm = ({ cardDetails = {}, onChangeField }) => {
  const cardBrand = detectCardBrand(cardDetails.cardNumber);

  const getBrandBadge = () => {
    switch (cardBrand) {
      case 'visa':
        return <span className="badge bg-primary text-white px-2 py-0.5 fw-bold" style={{ fontSize: '10px' }}>VISA</span>;
      case 'mastercard':
        return <span className="badge bg-warning text-dark px-2 py-0.5 fw-bold" style={{ fontSize: '10px' }}>MASTERCARD</span>;
      case 'amex':
        return <span className="badge bg-info text-white px-2 py-0.5 fw-bold" style={{ fontSize: '10px' }}>AMEX</span>;
      case 'discover':
        return <span className="badge bg-danger text-white px-2 py-0.5 fw-bold" style={{ fontSize: '10px' }}>DISCOVER</span>;
      default:
        return <CreditCard size={18} className="text-muted" />;
    }
  };

  return (
    <div className="space-y-3 pt-2">
      {/* Card Number */}
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <label className="form-label text-dark fw-bold small m-0">Card Number</label>
          <div className="d-flex align-items-center gap-1.5">{getBrandBadge()}</div>
        </div>
        <div className="position-relative">
          <input
            type="text"
            required
            maxLength="19"
            className="form-control form-control-custom"
            placeholder="4242 •••• •••• 4242"
            value={cardDetails.cardNumber}
            onChange={(e) => onChangeField('cardNumber', formatCardNumber(e.target.value))}
          />
        </div>
      </div>

      {/* Expiry & CVV */}
      <div className="row g-3 mb-3">
        <div className="col-6">
          <label className="form-label text-dark fw-bold small mb-1 d-flex align-items-center gap-1">
            <Calendar size={13} className="text-muted" />
            <span>Expiry Date</span>
          </label>
          <input
            type="text"
            required
            placeholder="MM/YY"
            maxLength="5"
            className="form-control form-control-custom"
            value={cardDetails.expiryDate}
            onChange={(e) => onChangeField('expiryDate', formatExpiry(e.target.value))}
          />
        </div>

        <div className="col-6">
          <label className="form-label text-dark fw-bold small mb-1 d-flex align-items-center gap-1">
            <Lock size={13} className="text-muted" />
            <span>CVV / CVC</span>
          </label>
          <input
            type="password"
            required
            placeholder="•••"
            maxLength="4"
            className="form-control form-control-custom"
            value={cardDetails.cvv}
            onChange={(e) => onChangeField('cvv', formatCvv(e.target.value))}
          />
        </div>
      </div>

      {/* Cardholder Name */}
      <div className="mb-4">
        <label className="form-label text-dark fw-bold small mb-1 d-flex align-items-center gap-1">
          <User size={13} className="text-muted" />
          <span>Cardholder Full Name</span>
        </label>
        <input
          type="text"
          required
          className="form-control form-control-custom"
          placeholder="e.g. Johnathan Doe"
          value={cardDetails.cardholderName}
          onChange={(e) => onChangeField('cardholderName', e.target.value)}
        />
      </div>
    </div>
  );
};

export default CardPaymentForm;
