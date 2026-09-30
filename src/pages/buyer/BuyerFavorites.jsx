import React, { useState } from 'react';
import BuyerSidebar from '../../components/buyer/BuyerSidebar';
import BuyerHeader from '../../components/buyer/BuyerHeader';
import BuyerFavoritesView from '../../components/buyer/BuyerFavoritesView';

/**
 * BuyerFavorites Page
 * Renders the buyer's saved favorite vehicles.
 */
const BuyerFavorites = () => {
  const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});

  return (
    <div className="dashboard-layout bg-light min-vh-100 d-flex font-sans">
      <BuyerSidebar />
      <main className="dashboard-main flex-grow-1 p-4 p-md-5 overflow-auto" style={{ minWidth: 0 }}>
        <BuyerHeader 
          title="Saved Favorites" 
          subtitle="Quickly compare and access vehicles you've saved"
          user={user}
          showUpgrade={false}
        />
        <BuyerFavoritesView />
      </main>
    </div>
  );
};

export default BuyerFavorites;
