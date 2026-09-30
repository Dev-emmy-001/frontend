import React, { useState } from 'react';
import BuyerSidebar from '../../components/buyer/BuyerSidebar';
import BuyerHeader from '../../components/buyer/BuyerHeader';
import BuyerOrdersView from '../../components/buyer/BuyerOrdersView';

/**
 * BuyerOrders Page
 * Renders the buyer's orders, invoices, and delivery tracking.
 */
const BuyerOrders = () => {
  const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});

  return (
    <div className="dashboard-layout bg-light min-vh-100 d-flex font-sans">
      <BuyerSidebar />
      <main className="dashboard-main flex-grow-1 p-4 p-md-5 overflow-auto" style={{ minWidth: 0 }}>
        <BuyerHeader 
          title="My Orders & Reservations" 
          subtitle="Track your vehicle purchases, delivery statuses, and invoices"
          user={user}
          showUpgrade={false}
        />
        <BuyerOrdersView />
      </main>
    </div>
  );
};

export default BuyerOrders;
