import React from 'react';
import { CreditCard, Landmark } from 'lucide-react';

/**
 * PaymentMethodSelector Component
 * Allows buyer to choose between Credit/Debit Card, Wire Transfer, and PayPal
 */
export const PaymentMethodSelector = ({ selectedMethod = 'card', onSelectMethod }) => {
  const methods = [
    {
      id: 'card',
      label: 'Credit / Debit Card',
      sublabel: 'Instant processing • Visa, Mastercard, Amex',
      icon: <CreditCard size={20} className={selectedMethod === 'card' ? 'text-danger' : 'text-muted'} />
    },
    {
      id: 'bank',
      label: 'Bank Wire / Transfer',
      sublabel: 'Direct wire via secure Motors Escrow account',
      icon: <Landmark size={20} className={selectedMethod === 'bank' ? 'text-danger' : 'text-muted'} />
    },
    {
      id: 'paypal',
      label: 'PayPal Express',
      sublabel: 'Safe online payments with buyer purchase protection',
      badge: <span className="fw-black italic text-primary" style={{ fontSize: '13px' }}>PayPal</span>
    }
  ];

  return (
    <div className="d-flex flex-column gap-2.5 mb-4">
      {methods.map((method) => {
        const isSelected = selectedMethod === method.id;
        return (
          <div
            key={method.id}
            onClick={() => onSelectMethod(method.id)}
            className={`p-3 rounded-3 border cursor-pointer transition-all d-flex align-items-center justify-content-between ${
              isSelected 
                ? 'border-danger bg-danger bg-opacity-10 shadow-xs' 
                : 'border-light bg-light hover-bg-light'
            }`}
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex align-items-center gap-3">
              <input
                type="radio"
                name="paymentMethodOption"
                checked={isSelected}
                onChange={() => onSelectMethod(method.id)}
                className="form-check-input mt-0"
              />
              <div>
                <span className="fw-bold text-dark small d-block">{method.label}</span>
                <small className="text-muted" style={{ fontSize: '11px' }}>{method.sublabel}</small>
              </div>
            </div>

            <div className="d-flex align-items-center gap-1">
              {method.icon}
              {method.badge}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PaymentMethodSelector;
