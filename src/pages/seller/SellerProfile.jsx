import React from 'react';
import SellerSidebar from '../../components/seller/SellerSidebar';
import SellerHeader from '../../components/seller/SellerHeader';
import SellerProfileView from '../../components/seller/SellerProfileView';

const SellerProfile = () => {
  return (
    <div className="dashboard-layout bg-light min-vh-100 d-flex font-sans">
      <SellerSidebar />
      <main className="dashboard-main flex-grow-1 p-4 p-md-5 overflow-auto" style={{ minWidth: 0 }}>
        <SellerHeader 
          title="Profile & Account Settings" 
          subtitle="Update your dealership details, contact channels, and preferences"
          actionButton={false}
        />
        <SellerProfileView />
      </main>
    </div>
  );
};

export default SellerProfile;
