import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { calculatePricing } from '../utils/paymentCalculations';
import { validateCardDetails } from '../utils/cardFormatters';
import { placeOrder } from '../../../services/orderService';

/**
 * Fallback vehicle if direct navigation occurs without route state
 */
export const DEFAULT_CHECKOUT_VEHICLE = {
  _id: '64f1a2b3c4d5e6f7a8b9c0d1',
  make: 'Toyota',
  model: 'RAV4 XLE',
  year: 2023,
  price: 26490,
  currency: 'USD',
  images: ['https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80'],
  seller: {
    name: 'Summit Auto Group (Official)',
    email: 'sales@summitautogroup.com',
    phone: '(800) 555-AUTO'
  }
};

/**
 * Custom hook to encapsulate all checkout and payment processing logic
 */
export const useCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Resolve vehicle from navigation state or fallback
  const vehicle = location.state?.vehicle || DEFAULT_CHECKOUT_VEHICLE;

  // Pricing calculations
  const pricing = calculatePricing(vehicle.price || 26490);

  // Form states
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [deliveryType, setDeliveryType] = useState('Home Delivery');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [completedOrder, setCompletedOrder] = useState(null);

  /**
   * Update individual card field
   */
  const handleCardFieldChange = (field, value) => {
    setCardDetails(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  /**
   * Submit payment, place order, and notify seller
   */
  const handleProcessPayment = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setError('');

    // If card payment is selected, validate inputs
    if (paymentMethod === 'card') {
      const validation = validateCardDetails(cardDetails);
      if (!validation.isValid) {
        setError(validation.error);
        return;
      }
    }

    setLoading(true);

    try {
      // 1. Place order via orderService (handles backend sync + localStorage + seller direct notification)
      const order = await placeOrder({
        vehicle,
        pricing,
        paymentMethod,
        cardDetails,
        deliveryType
      });

      // 2. Set completed order for confirmation modal
      setCompletedOrder(order);
    } catch (err) {
      console.error('Checkout processing error:', err);
      setError('An error occurred processing your payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Navigate to orders page after completion
   */
  const handleViewOrders = () => {
    navigate('/my-orders');
  };

  return {
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
    handleProcessPayment,
    handleViewOrders
  };
};

export default useCheckout;
