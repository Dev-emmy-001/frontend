import React from 'react';
import SellerProfile from './seller/SellerProfile';
import BuyerProfile from './buyer/BuyerProfile';

/**
 * Profile Page Switcher
 * Intelligently serves either the Seller or Buyer profile based on current logged-in user role.
 */
const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const isSeller = user.role === 'private_seller' || user.role === 'business_dealer' || user.role === 'admin';

  return isSeller ? <SellerProfile /> : <BuyerProfile />;
};

export default Profile;
