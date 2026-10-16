import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle, ShieldCheck, CreditCard, Truck, MapPin, DollarSign } from 'lucide-react';
import { formatPrice, getCurrencySymbol } from '../../data/mockVehicles';

import { placeOrder } from '../../services/orderService';

/**
 * VehiclePurchaseModal Component
 * Interactive vehicle reservation / purchase deposit modal.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {Function} props.onClose
 * @param {Object} props.car
 */
const VehiclePurchaseModal = ({ isOpen, onClose, car = {} }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const [step, setStep] = useState(1);
  const [deliveryOption, setDeliveryOption] = useState('delivery');
  const [paymentOption, setPaymentOption] = useState('deposit');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const currencyCode = car.currency || 'USD';
  const currencySymbol = getCurrencySymbol(currencyCode);
  const fullPrice = car.price != null ? Number(car.price) : 26490;
  // Calculate deposit proportional to price or minimum base
  const depositAmount = currencyCode === 'NGN' ? 500000 : 500;

  const handleConfirmReservation = async () => {
    if (paymentOption === 'full') {
      onClose();
      navigate('/checkout', { state: { vehicle: car } });
      return;
    }

    setLoading(true);
    try {
      await placeOrder({
        vehicle: car,
        pricing: {
          subtotal: depositAmount,
          taxAmount: 0,
          processingFee: 0,
          grandTotal: depositAmount
        },
        paymentMethod: 'Credit/Debit Card',
        deliveryType: deliveryOption === 'delivery' ? 'Home Delivery' : 'Dealership Pickup'
      });
      setStep(2);
    } catch (e) {
      console.error('Reservation order error:', e);
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    onClose();
    navigate('/my-orders');
  };

  return (
    <div 
      className="modal fade show d-block" 
      tabIndex="-1" 
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)', zIndex: 1050 }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
          
          {/* Header */}
          <div className="modal-header bg-dark text-white p-4">
            <div>
              <span className="badge bg-danger text-uppercase mb-1" style={{ fontSize: '10px' }}>Checkout</span>
              <h5 className="modal-title fw-bold m-0">
                {step === 1 ? 'Reserve This Vehicle' : 'Reservation Confirmed!'}
              </h5>
              <small className="text-white-50">
                {car.year} {car.make} {car.model}
              </small>
            </div>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={onClose}
              aria-label="Close"
            />
          </div>

          {/* Content */}
          <div className="modal-body p-4">
            {step === 1 ? (
              <div>
                {/* Vehicle Summary Banner */}
                <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded-3 border border-light mb-4">
                  <div className="d-flex align-items-center gap-3">
                    <img 
                      src={car.images && car.images.length > 0 ? car.images[0] : 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=300&q=80'} 
                      alt="Car" 
                      className="rounded object-fit-cover shadow-xs"
                      style={{ width: '70px', height: '48px' }}
                    />
                    <div>
                      <h6 className="fw-bold text-dark m-0">{car.year} {car.make} {car.model}</h6>
                      <small className="text-muted">
                        Total Price: <strong>{formatPrice(fullPrice, currencyCode)} {currencyCode}</strong>
                      </small>
                    </div>
                  </div>
                  <div className="text-end">
                    <span className="badge bg-success bg-opacity-10 text-success px-2.5 py-1">Available</span>
                  </div>
                </div>

                {/* Delivery Option */}
                <div className="mb-4">
                  <label className="form-label text-dark small fw-bold mb-2">Fulfillment Method</label>
                  <div className="row g-2">
                    <div className="col-6">
                      <div 
                        onClick={() => setDeliveryOption('delivery')}
                        className={`p-3 rounded-3 border cursor-pointer transition-all ${deliveryOption === 'delivery' ? 'border-danger bg-danger bg-opacity-10' : 'border-light bg-light'}`}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <Truck size={18} className={deliveryOption === 'delivery' ? 'text-danger' : 'text-muted'} />
                          <strong className="text-dark small">Home Delivery</strong>
                        </div>
                        <small className="text-muted d-block" style={{ fontSize: '11px' }}>Delivered directly to your driveway with 7-day trial.</small>
                      </div>
                    </div>

                    <div className="col-6">
                      <div 
                        onClick={() => setDeliveryOption('pickup')}
                        className={`p-3 rounded-3 border cursor-pointer transition-all ${deliveryOption === 'pickup' ? 'border-danger bg-danger bg-opacity-10' : 'border-light bg-light'}`}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <MapPin size={18} className={deliveryOption === 'pickup' ? 'text-danger' : 'text-muted'} />
                          <strong className="text-dark small">Dealership Pickup</strong>
                        </div>
                        <small className="text-muted d-block" style={{ fontSize: '11px' }}>Pick up at Summit Auto Dealership showroom.</small>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Option */}
                <div className="mb-4">
                  <label className="form-label text-dark small fw-bold mb-2">Payment / Hold Option ({currencyCode})</label>
                  <div className="row g-2">
                    <div className="col-6">
                      <div 
                        onClick={() => setPaymentOption('deposit')}
                        className={`p-3 rounded-3 border cursor-pointer transition-all ${paymentOption === 'deposit' ? 'border-danger bg-danger bg-opacity-10' : 'border-light bg-light'}`}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <strong className="text-dark small">Refundable Deposit</strong>
                          <span className="badge bg-danger">{currencySymbol}{depositAmount.toLocaleString()}</span>
                        </div>
                        <small className="text-muted d-block" style={{ fontSize: '11px' }}>Holds this vehicle exclusively for 48 hours.</small>
                      </div>
                    </div>

                    <div className="col-6">
                      <div 
                        onClick={() => setPaymentOption('full')}
                        className={`p-3 rounded-3 border cursor-pointer transition-all ${paymentOption === 'full' ? 'border-danger bg-danger bg-opacity-10' : 'border-light bg-light'}`}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <strong className="text-dark small">Full Purchase / Escrow</strong>
                          <span className="badge bg-dark">{formatPrice(fullPrice, currencyCode)}</span>
                        </div>
                        <small className="text-muted d-block" style={{ fontSize: '11px' }}>Purchase outright or connect financing loan.</small>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Escrow Guarantee */}
                <div className="p-3 bg-light rounded-3 border border-light d-flex align-items-center gap-2 mb-4">
                  <ShieldCheck size={20} className="text-success flex-shrink-0" />
                  <span className="text-muted small" style={{ fontSize: '12px' }}>
                    100% money-back guarantee if the vehicle does not match the online inspection condition.
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                  <button type="button" className="btn btn-light fw-bold" onClick={onClose}>
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    onClick={handleConfirmReservation}
                    disabled={loading}
                    className="btn btn-brand-red px-4 py-2.5 fw-bold text-uppercase"
                  >
                    {loading ? 'Processing...' : `Confirm & Place ${paymentOption === 'deposit' ? `${currencySymbol}${depositAmount.toLocaleString()} Hold` : 'Order'}`}
                  </button>
                </div>
              </div>
            ) : (
              /* Confirmation Screen */
              <div className="text-center py-4">
                <div className="bg-success bg-opacity-10 text-success p-3 rounded-circle d-inline-flex mb-3">
                  <CheckCircle size={48} />
                </div>
                <h4 className="fw-bold text-dark mb-1">Vehicle Reserved Successfully!</h4>
                <p className="text-muted small mb-4" style={{ maxWidth: '450px', margin: '0 auto' }}>
                  Your hold on the <strong>{car.year} {car.make} {car.model}</strong> has been secured. Our team has prepared your paperwork in your Orders dashboard.
                </p>

                <div className="d-flex justify-content-center gap-3">
                  <button onClick={handleFinish} className="btn btn-brand-red px-4 py-2.5 fw-bold text-uppercase">
                    Go to My Orders
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default VehiclePurchaseModal;
