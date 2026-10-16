/**
 * Payment Calculation Utilities
 * Standardized fee calculations, tax rates, and currency formatters.
 */

export const DEFAULT_TAX_RATE = 0.0825; // 8.25% standard tax
export const DEFAULT_PROCESSING_FEE = 200.00; // $200 processing & escrow documentation fee

/**
 * Calculates itemized costs from a base vehicle subtotal
 * @param {number} subtotal - Base price of vehicle
 * @param {number} [taxRate=0.0825] - Applicable tax rate
 * @param {number} [processingFee=200.00] - Flat escrow/processing fee
 * @returns {Object} Calculated pricing breakdown
 */
export const calculatePricing = (
  subtotal = 26490, 
  taxRate = DEFAULT_TAX_RATE, 
  processingFee = DEFAULT_PROCESSING_FEE
) => {
  const numericSubtotal = Math.max(0, Number(subtotal) || 0);
  const taxAmount = Math.round(numericSubtotal * taxRate * 100) / 100;
  const grandTotal = numericSubtotal + taxAmount + processingFee;

  return {
    subtotal: numericSubtotal,
    taxRate,
    taxPercentage: (taxRate * 100).toFixed(2),
    taxAmount,
    processingFee,
    grandTotal
  };
};

/**
 * Formats a numeric price into a currency string
 * @param {number} amount - Numeric value
 * @param {string} [currency='USD'] - Currency code
 * @returns {string} Formatted currency string
 */
export const formatAmount = (amount = 0, currency = 'USD') => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  } catch (err) {
    return `$${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  }
};
