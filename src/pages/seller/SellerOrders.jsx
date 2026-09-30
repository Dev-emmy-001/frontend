import React from 'react';
import SellerSidebar from '../../components/seller/SellerSidebar';
import SellerHeader from '../../components/seller/SellerHeader';
import SellerOrdersView from '../../components/seller/SellerOrdersView';

const SellerOrders = () => {
  return (
    <div className="dashboard-layout bg-light min-vh-100 d-flex font-sans">
      <SellerSidebar />
      <main className="dashboard-main flex-grow-1 p-4 p-md-5 overflow-auto" style={{ minWidth: 0 }}>
        <SellerHeader 
          title="Customer Orders & Offers" 
          subtitle="View and manage buyer offers, purchase contracts, and test drive reservations"
          actionButton={true}
        />
        <SellerOrdersView />
      </main>
    </div>
  );
};

export default SellerOrders;
