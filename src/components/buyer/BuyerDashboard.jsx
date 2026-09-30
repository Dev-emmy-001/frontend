import React, { useState, useEffect } from 'react';
import BuyerSidebar from './BuyerSidebar';
import BuyerHeader from './BuyerHeader';
import BuyerMetricCards from './BuyerMetricCards';
import BuyerRecentOrders from './BuyerRecentOrders';
import BuyerRecommendedVehicles from './BuyerRecommendedVehicles';

/**
 * BuyerDashboard Component
 * Main hub for buyers to view their order status, saved vehicles, and recommendations.
 */
const BuyerDashboard = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});

  return (
    <div className="dashboard-layout bg-light min-vh-100 d-flex font-sans">
      {/* 1. Left Dark Sidebar Navigation */}
      <BuyerSidebar />

      {/* 2. Main Content Area */}
      <main className="dashboard-main flex-grow-1 p-4 p-md-5 overflow-auto" style={{ minWidth: 0 }}>
        
        {/* Top Header with greeting & role upgrade */}
        <BuyerHeader 
          title="Buyer Dashboard" 
          user={user}
          showUpgrade={true}
        />

        {/* 4 Summary Stat Metric Cards */}
        <BuyerMetricCards 
          ordersCount={3}
          favoritesCount={8}
          completedCount={2}
          totalSpent={51480}
        />

        {/* Recent Orders & Recommended Vehicles Section */}
        <div className="row g-4">
          <div className="col-lg-7">
            <BuyerRecentOrders />
          </div>

          <div className="col-lg-5">
            <BuyerRecommendedVehicles />
          </div>
        </div>

      </main>
    </div>
  );
};

export default BuyerDashboard;