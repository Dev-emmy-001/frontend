import React from 'react';
import SellerSidebar from '../../components/seller/SellerSidebar';
import SellerHeader from '../../components/seller/SellerHeader';
import SellerEarningsView from '../../components/seller/SellerEarningsView';

const SellerEarnings = () => {
  return (
    <div className="dashboard-layout bg-light min-vh-100 d-flex font-sans">
      <SellerSidebar />
      <main className="dashboard-main flex-grow-1 p-4 p-md-5 overflow-auto" style={{ minWidth: 0 }}>
        <SellerHeader 
          title="Earnings & Payouts" 
          subtitle="Track your gross revenue, transaction fees, and payout history"
          actionButton={true}
        />
        <SellerEarningsView />
      </main>
    </div>
  );
};

export default SellerEarnings;
