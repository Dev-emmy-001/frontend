import React, { useState } from 'react';
import BuyerSidebar from '../../components/buyer/BuyerSidebar';
import BuyerHeader from '../../components/buyer/BuyerHeader';
import BuyerProfileView from '../../components/buyer/BuyerProfileView';

/**
 * BuyerProfile Page
 * Renders the buyer's account settings and delivery address preferences.
 */
const BuyerProfile = () => {
  const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});

  return (
    <div className="dashboard-layout bg-light min-vh-100 d-flex font-sans">
      <BuyerSidebar />
      <main className="dashboard-main flex-grow-1 p-4 p-md-5 overflow-auto" style={{ minWidth: 0 }}>
        <BuyerHeader 
          title="Account Profile" 
          subtitle="Manage your contact information, delivery address, and security"
          user={user}
          showUpgrade={true}
        />
        <BuyerProfileView />
      </main>
    </div>
  );
};

export default BuyerProfile;
