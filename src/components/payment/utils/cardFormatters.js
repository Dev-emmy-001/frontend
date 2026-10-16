/**
 * Card Formatting and Validation Utilities
 */

/**
 * Formats a card input string with spaces every 4 digits (e.g. 1234 5678 9012 3456)
 * @param {string} value
 * @returns {string} Formatted card number
 */
export const formatCardNumber = (value = '') => {
  const digitsOnly = value.replace(/\D/g, '').slice(0, 16);
  const groups = digitsOnly.match(/.{1,4}/g);
  return groups ? groups.join(' ') : digitsOnly;
};

/**
 * Formats an expiry date string to MM/YY
 * @param {string} value
 * @returns {string} Formatted expiry
 */
export const formatExpiry = (value = '') => {
  const digitsOnly = value.replace(/\D/g, '').slice(0, 4);
  if (digitsOnly.length > 2) {
    return `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2)}`;
  }
  return digitsOnly;
};

/**
 * Restricts CVV input to 3 or 4 digits
 * @param {string} value
 * @returns {string} Digits only up to 4 characters
 */
export const formatCvv = (value = '') => {
  return value.replace(/\D/g, '').slice(0, 4);
};

/**
 * Detects payment card network based on prefix
 * @param {string} cardNumber
 * @returns {'visa'|'mastercard'|'amex'|'discover'|'generic'}
 */
export const detectCardBrand = (cardNumber = '') => {
  const clean = cardNumber.replace(/\D/g, '');
  if (/^4/.test(clean)) return 'visa';
  if (/^(5[1-5]|2[2-7])/.test(clean)) return 'mastercard';
  if (/^3[47]/.test(clean)) return 'amex';
  if (/^(6011|65)/.test(clean)) return 'discover';
  return 'generic';
};

/**
 * Basic validation check for card details
 * @param {Object} details
 * @returns {{isValid: boolean, error: string|null}}
 */
export const validateCardDetails = (details = {}) => {
  const cleanNumber = (details.cardNumber || '').replace(/\D/g, '');
  if (cleanNumber.length < 15) {
    return { isValid: false, error: 'Please enter a valid 16-digit card number' };
  }

  const expiry = (details.expiryDate || '').trim();
  if (!/^\d{2}\/\d{2}$/.test(expiry)) {
    return { isValid: false, error: 'Please enter expiry in MM/YY format' };
  }

  const [month, year] = expiry.split('/').map(Number);
  if (month < 1 || month > 12) {
    return { isValid: false, error: 'Expiry month must be between 01 and 12' };
  }

  const cleanCvv = (details.cvv || '').replace(/\D/g, '');
  if (cleanCvv.length < 3) {
    return { isValid: false, error: 'Please enter a valid 3 or 4 digit CVV' };
  }

  if (!details.cardholderName || details.cardholderName.trim().length < 2) {
    return { isValid: false, error: 'Please enter the name on the card' };
  }

  return { isValid: true, error: null };
};
