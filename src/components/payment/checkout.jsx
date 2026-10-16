import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, Truck, MapPin } from 'lucide-react';

// Custom Hooks & Utilities
import { useCheckout } from './hooks/useCheckout';
import { formatAmount } from './utils/paymentCalculations';

// Modular Presentation Components
import { OrderSummary } from './components/OrderSummary';
import { PaymentMethodSelector } from './components/PaymentMethodSelector';
import { CardPaymentForm } from './components/CardPaymentForm';
import { BankTransferDetails } from './components/BankTransferDetails';
import { PayPalDetails } from './components/PayPalDetails';
import { SecurityBadges } from './components/SecurityBadges';
import { OrderSuccessModal } from './components/OrderSuccessModal';

/**
 * Checkout Page Component
 * Main coordinator component for vehicle checkout, escrow reservation,
 * and automated seller direct messaging.
 */
export const Checkout = () => {
  const {
    vehicle,
    pricing,
    paymentMethod,
    setPaymentMethod,
    deliveryType,
    setDeliveryType,
    cardDetails,
    handleCardFieldChange,
    loading,
    error,
    completedOrder,
    handleProcessPayment
  } = useCheckout();

  const currencyCode = vehicle.currency || 'USD';
  const payButtonLabel = loading 
    ? 'Processing Escrow Payment...' 
    : paymentMethod === 'paypal'
    ? `Pay with PayPal (${formatAmount(pricing.grandTotal, currencyCode)})`
    : `Pay ${formatAmount(pricing.grandTotal, currencyCode)}`;

  return (
    <div className="bg-light min-vh-100 py-5 font-sans">
      <div className="container" style={{ maxWidth: '980px' }}>
        
        {/* Top Breadcrumb Navigation */}
        <Link 
          to={`/vehicle/${vehicle._id || vehicle.id || '1'}`} 
          className="text-secondary text-decoration-none small fw-bold d-inline-flex align-items-center gap-1.5 mb-4 hover-text-danger"
        >
          <ArrowLeft size={16} />
          <span>Back to Vehicle Details</span>
        </Link>

        {/* Page Header */}
        <div className="mb-4">
          <h2 className="fw-black text-dark m-0" style={{ fontWeight: '900' }}>Vehicle Checkout</h2>
          <p className="text-muted small mt-1">
            Complete your verified purchase. Funds are escrow-held and the seller will be directly notified.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="alert alert-danger py-2.5 px-3 rounded-3 small mb-4 d-flex align-items-center justify-content-between">
            <span>{error}</span>
          </div>
        )}

        <div className="row g-4">
          
          {/* LEFT COLUMN: ORDER SUMMARY & VEHICLE PREVIEW */}
          <div className="col-lg-5 order-lg-2">
            <OrderSummary 
              vehicle={vehicle} 
              pricing={pricing} 
              deliveryType={deliveryType} 
            />
          </div>

          {/* RIGHT COLUMN: FULFILLMENT & PAYMENT SELECTION */}
          <div className="col-lg-7 order-lg-1">
            <div className="bg-white p-4 p-md-5 rounded-4 border border-light shadow-sm">
              
              {/* Step 1: Fulfillment Option */}
              <div className="mb-4 pb-3 border-bottom border-light">
                <label className="form-label text-dark fw-bold small mb-2 text-uppercase" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                  1. Fulfillment Method
                </label>
                <div className="row g-2">
                  <div className="col-6">
                    <div 
                      onClick={() => setDeliveryType('Home Delivery')}
                      className={`p-3 rounded-3 border cursor-pointer transition-all ${deliveryType === 'Home Delivery' ? 'border-danger bg-danger bg-opacity-10' : 'border-light bg-light'}`}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <Truck size={16} className={deliveryType === 'Home Delivery' ? 'text-danger' : 'text-muted'} />
                        <strong className="text-dark small">Home Delivery</strong>
                      </div>
                      <small className="text-muted d-block" style={{ fontSize: '11px' }}>Direct to driveway with 7-day trial</small>
                    </div>
                  </div>

                  <div className="col-6">
                    <div 
                      onClick={() => setDeliveryType('Dealership Pickup')}
                      className={`p-3 rounded-3 border cursor-pointer transition-all ${deliveryType === 'Dealership Pickup' ? 'border-danger bg-danger bg-opacity-10' : 'border-light bg-light'}`}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <MapPin size={16} className={deliveryType === 'Dealership Pickup' ? 'text-danger' : 'text-muted'} />
                        <strong className="text-dark small">Dealership Pickup</strong>
                      </div>
                      <small className="text-muted d-block" style={{ fontSize: '11px' }}>Pick up at seller's local showroom</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Payment Method */}
              <h5 className="fw-bold text-dark mb-3 small text-uppercase" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                2. Select Payment Method
              </h5>

              <form onSubmit={handleProcessPayment}>
                {/* Method Selector Tabs */}
                <PaymentMethodSelector 
                  selectedMethod={paymentMethod}
                  onSelectMethod={setPaymentMethod}
                />

                {/* Sub-form: Credit/Debit Card */}
                {paymentMethod === 'card' && (
                  <CardPaymentForm 
                    cardDetails={cardDetails}
                    onChangeField={handleCardFieldChange}
                  />
                )}

                {/* Sub-form: Bank Wire / Transfer */}
                {paymentMethod === 'bank' && (
                  <BankTransferDetails referenceId={`REF-${Math.floor(100000 + Math.random() * 900000)}`} />
                )}

                {/* Sub-form: PayPal */}
                {paymentMethod === 'paypal' && (
                  <PayPalDetails />
                )}

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-brand-red w-100 py-3 fw-bold text-uppercase d-flex align-items-center justify-content-center gap-2 shadow-sm animate-btn mt-3"
                  style={{ letterSpacing: '0.5px' }}
                >
                  <Lock size={16} />
                  <span>{payButtonLabel}</span>
                </button>

                {/* Trust Badges */}
                <SecurityBadges />
              </form>

            </div>
          </div>

        </div>

      </div>

      {/* Confirmation Modal upon Successful Order */}
      <OrderSuccessModal 
        order={completedOrder} 
        onClose={() => {}} 
      />
    </div>
  );
};

export default Checkout;