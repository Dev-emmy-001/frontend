import React from 'react';
import SellerSidebar from '../../components/seller/SellerSidebar';
import SellerHeader from '../../components/seller/SellerHeader';
import SellerMessagesView from '../../components/seller/SellerMessagesView';

const SellerMessages = () => {
  return (
    <div className="dashboard-layout bg-light min-vh-100 d-flex font-sans">
      <SellerSidebar />
      <main className="dashboard-main flex-grow-1 p-4 p-md-5 overflow-auto" style={{ minWidth: 0 }}>
        <SellerHeader 
          title="Message Center" 
          subtitle="Communicate directly with interested car buyers and respond to inquiries"
          actionButton={true}
        />
        <SellerMessagesView />
      </main>
    </div>
  );
};

export default SellerMessages;
