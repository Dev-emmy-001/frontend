import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';

/**
 * PayPalDetails Component
 * Displays instructions and buyer protection guarantees for PayPal payments
 */
export const PayPalDetails = () => {
  return (
    <div className="bg-light p-4 rounded-3 border border-light mb-4 text-center">
      <div className="d-inline-flex p-2 bg-white rounded-circle shadow-xs mb-2">
        <span className="fw-black italic text-primary fs-5">PayPal</span>
      </div>
      <h6 className="fw-bold text-dark mb-1">Fast & Secure Checkout with PayPal</h6>
      <p className="text-muted small mb-3" style={{ fontSize: '12px', maxWidth: '380px', margin: '0 auto' }}>
        Clicking 'Pay with PayPal' will connect to PayPal's secure gateway to authorize your vehicle escrow deposit.
      </p>

      <div className="p-2.5 bg-white rounded-2 border border-light d-inline-flex align-items-center gap-2 text-muted small text-start">
        <ShieldCheck size={16} className="text-success flex-shrink-0" />
        <span style={{ fontSize: '11px' }}>Eligible for PayPal Buyer Purchase Protection</span>
      </div>
    </div>
  );
};

export default PayPalDetails;
