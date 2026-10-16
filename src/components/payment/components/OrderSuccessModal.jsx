import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, MessageSquare, ShoppingBag, ArrowRight } from 'lucide-react';
import { formatAmount } from '../utils/paymentCalculations';

/**
 * OrderSuccessModal Component
 * Interactive celebration modal shown upon successful payment and order creation.
 * Clarifies both buyer orders page addition and direct seller notification.
 */
export const OrderSuccessModal = ({ order = null, onClose }) => {
  const navigate = useNavigate();
  if (!order) return null;

  const orderId = order.id || order.orderId || 'ORD-NEW';
  const vehicleName = order.vehicleName || 'Vehicle';
  const amount = order.price || order.totalAmount || 0;
  const sellerName = order.sellerName || 'Summit Auto Group (Official)';

  return (
    <div 
      className="modal fade show d-block" 
      tabIndex="-1" 
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(5px)', zIndex: 1060 }}
    >
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '520px' }}>
        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
          
          {/* Modal Header Banner */}
          <div className="bg-success text-white p-4 text-center">
            <div className="bg-white text-success p-3 rounded-circle d-inline-flex mb-2 shadow-sm">
              <CheckCircle size={44} />
            </div>
            <h4 className="fw-black text-white m-0">Payment Successful!</h4>
            <small className="text-white-50">Order #{orderId} has been confirmed</small>
          </div>

          {/* Modal Body */}
          <div className="modal-body p-4 text-center">
            
            {/* Vehicle & Amount Snapshot */}
            <div className="p-3 bg-light rounded-3 border border-light mb-3 text-start">
              <div className="d-flex align-items-center gap-3">
                <img 
                  src={order.image || 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=200&q=80'} 
                  alt={vehicleName}
                  className="rounded object-fit-cover border"
                  style={{ width: '65px', height: '48px' }}
                />
                <div>
                  <h6 className="fw-bold text-dark m-0 small">{vehicleName}</h6>
                  <strong className="text-danger small">{formatAmount(amount)}</strong>
                </div>
              </div>
            </div>

            {/* Notification Confirmations */}
            <div className="space-y-2 mb-4 text-start">
              <div className="d-flex align-items-start gap-2.5 p-2 rounded-2 bg-success bg-opacity-10 text-success small">
                <ShoppingBag size={18} className="flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="d-block text-dark" style={{ fontSize: '12px' }}>Added to Your Orders Page</strong>
                  <span className="text-muted" style={{ fontSize: '11px' }}>
                    This vehicle is now active under your Orders with invoice tracking and fulfillment status.
                  </span>
                </div>
              </div>

              <div className="d-flex align-items-start gap-2.5 p-2 rounded-2 bg-primary bg-opacity-10 text-primary small">
                <MessageSquare size={18} className="flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="d-block text-dark" style={{ fontSize: '12px' }}>Seller Notified Via Direct Message</strong>
                  <span className="text-muted" style={{ fontSize: '11px' }}>
                    A direct message with your purchase receipt has been sent to <strong>{sellerName}</strong> to initiate handover.
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-grid gap-2">
              <button 
                onClick={() => navigate('/my-orders')}
                className="btn btn-brand-red py-2.5 fw-bold text-uppercase d-flex align-items-center justify-content-center gap-2"
              >
                <ShoppingBag size={16} />
                <span>View in My Orders</span>
              </button>

              <button 
                onClick={() => navigate('/buyer/messages')}
                className="btn btn-outline-dark py-2.5 fw-bold small d-flex align-items-center justify-content-center gap-2"
              >
                <MessageSquare size={16} />
                <span>Open Chat with Seller</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
