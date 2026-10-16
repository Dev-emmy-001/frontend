/**
 * Motors Payment Module - Barrel Export
 * Central exports for all checkout components, hooks, and calculations.
 */

export { default as Checkout } from './Checkout';
export { default as useCheckout } from './hooks/useCheckout';

// Subcomponents
export { OrderSummary } from './components/OrderSummary';
export { PaymentMethodSelector } from './components/PaymentMethodSelector';
export { CardPaymentForm } from './components/CardPaymentForm';
export { BankTransferDetails } from './components/BankTransferDetails';
export { PayPalDetails } from './components/PayPalDetails';
export { SecurityBadges } from './components/SecurityBadges';
export { OrderSuccessModal } from './components/OrderSuccessModal';

// Utilities
export * from './utils/paymentCalculations';
export * from './utils/cardFormatters';

export default Checkout;
