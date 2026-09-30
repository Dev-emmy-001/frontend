import React from 'react';
import SellerMessages from './seller/SellerMessages';
import BuyerMessages from './buyer/BuyerMessages';

/**
 * Messages Page Switcher
 * Intelligently serves either the Seller or Buyer messaging view based on current logged-in user role.
 */
const Messages = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const isSeller = user.role === 'private_seller' || user.role === 'business_dealer' || user.role === 'admin';

  return isSeller ? <SellerMessages /> : <BuyerMessages />;
};

export default Messages;
