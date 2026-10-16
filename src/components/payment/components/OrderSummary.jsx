import React from 'react';
import { ShieldCheck, Truck, MapPin } from 'lucide-react';
import { formatAmount } from '../utils/paymentCalculations';

/**
 * OrderSummary Component
 * Displays itemized cost breakdown, vehicle preview, and fulfillment badge
 */
export const OrderSummary = ({ vehicle = {}, pricing = {}, deliveryType = 'Home Delivery' }) => {
  const { subtotal = 0, taxAmount = 0, processingFee = 0, grandTotal = 0 } = pricing;
  const vehicleTitle = `${vehicle.year || ''} ${vehicle.make || ''} ${vehicle.model || 'Vehicle'}`.trim();
  const vehicleImage = vehicle.images?.[0] || 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=400&q=80';
  const currencyCode = vehicle.currency || 'USD';

  return (
    <div className="bg-white p-4 rounded-4 border border-light shadow-sm sticky-top" style={{ top: '90px' }}>
      <h5 className="fw-bold text-dark border-bottom pb-3 mb-3 d-flex justify-content-between align-items-center">
        <span>Order Summary</span>
        <span className="badge bg-light text-secondary border fw-semibold" style={{ fontSize: '11px' }}>
          {currencyCode}
        </span>
      </h5>

      {/* Vehicle Preview Card */}
      <div className="d-flex gap-3 align-items-center mb-3">
        <img 
          src={vehicleImage} 
          alt={vehicleTitle} 
          className="rounded-3 object-fit-cover border shadow-xs"
          style={{ width: '100px', height: '70px' }}
        />
        <div className="overflow-hidden">
          <h6 className="fw-bold text-dark m-0 small text-truncate">{vehicleTitle}</h6>
          <span className="fw-black text-danger d-block mt-1">
            {formatAmount(subtotal, currencyCode)}
          </span>
          <small className="text-muted d-flex align-items-center gap-1 mt-1" style={{ fontSize: '11px' }}>
            {deliveryType === 'Home Delivery' ? <Truck size={12} className="text-danger" /> : <MapPin size={12} className="text-primary" />}
            <span>{deliveryType}</span>
          </small>
        </div>
      </div>

      {/* Seller Note */}
      {vehicle.seller?.name && (
        <div className="p-2 mb-3 bg-light rounded-2 text-muted small" style={{ fontSize: '11px' }}>
          Sold & Fulfilled by: <strong className="text-dark">{vehicle.seller.name}</strong>
        </div>
      )}

      {/* Cost Breakdown */}
      <div className="space-y-2 border-top border-bottom py-3 my-3 small text-secondary">
        <div className="d-flex justify-content-between mb-2">
          <span>Vehicle Price</span>
          <span className="fw-bold text-dark">{formatAmount(subtotal, currencyCode)}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Sales Tax (8.25%)</span>
          <span className="fw-bold text-dark">{formatAmount(taxAmount, currencyCode)}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Escrow & Processing Fee</span>
          <span className="fw-bold text-dark">{formatAmount(processingFee, currencyCode)}</span>
        </div>
      </div>

      {/* Total Price */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <span className="fw-bold text-dark d-block">Grand Total</span>
          <small className="text-muted" style={{ fontSize: '11px' }}>Includes escrow hold guarantee</small>
        </div>
        <span className="display-6 fw-black text-danger fs-3">
          {formatAmount(grandTotal, currencyCode)}
        </span>
      </div>

      {/* Security Assurance */}
      <div className="p-3 bg-light rounded-3 border border-light d-flex align-items-start gap-2 text-muted small">
        <ShieldCheck size={18} className="text-success flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-dark d-block mb-0.5">Escrow-Backed Checkout</strong>
          <span style={{ fontSize: '11px' }}>
            Funds are securely held in escrow until vehicle delivery and physical inspection are confirmed.
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
