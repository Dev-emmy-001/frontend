import React, { useState } from 'react';
import BuyerSidebar from '../../components/buyer/BuyerSidebar';
import BuyerHeader from '../../components/buyer/BuyerHeader';
import BuyerPaymentsView from '../../components/buyer/BuyerPaymentsView';

/**
 * BuyerPayments Page
 * Renders the buyer's transactions, payment methods, and escrow status.
 */
const BuyerPayments = () => {
  const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});

  return (
    <div className="dashboard-layout bg-light min-vh-100 d-flex font-sans">
      <BuyerSidebar />
      <main className="dashboard-main flex-grow-1 p-4 p-md-5 overflow-auto" style={{ minWidth: 0 }}>
        <BuyerHeader 
          title="Payments & Escrow" 
          subtitle="View transaction receipts, payment methods, and secured deposits"
          user={user}
          showUpgrade={false}
        />
        <BuyerPaymentsView />
      </main>
    </div>
  );
};

export default BuyerPayments;
