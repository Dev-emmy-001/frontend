import React, { useState, useEffect } from 'react';
import api from '../../data/apiConfig';
import SellerSidebar from '../../components/seller/SellerSidebar';
import SellerHeader from '../../components/seller/SellerHeader';
import SellerMetricCards from '../../components/seller/SellerMetricCards';
import SellerPerformanceChart from '../../components/seller/SellerPerformanceChart';
import SellerRecentSales from '../../components/seller/SellerRecentSales';
import SellerListingsTable from '../../components/seller/SellerListingsTable';

const SellerDashboard = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Seller's Specific Listings
  const fetchListings = async () => {
    try {
      const res = await api.get('/vehicles/my-listings');
      if (res.data && Array.isArray(res.data)) {
        setListings(res.data);
      }
    } catch (err) {
      console.warn('Backend API note: using local listings state', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  // Handle Listing Deletion
  const handleDeleteListing = async (vehicleId) => {
    try {
      await api.delete(`/vehicles/${vehicleId}`);
      setListings(prev => prev.filter(item => item._id !== vehicleId));
    } catch (err) {
      console.error('Failed to delete listing:', err);
      // Optimistic local state removal
      setListings(prev => prev.filter(item => item._id !== vehicleId));
    }
  };

  return (
    <div className="dashboard-layout bg-light min-vh-100 d-flex font-sans">
      {/* 1. Left Dark Sidebar */}
      <SellerSidebar />

      {/* 2. Main Dashboard Content Area */}
      <main className="dashboard-main flex-grow-1 p-4 p-md-5 overflow-auto" style={{ minWidth: 0 }}>
        
        {/* Top Header */}
        <SellerHeader 
          title="Seller Dashboard" 
          user={user}
          actionButton={true}
        />

        {/* 4 Top Metric Cards */}
        <SellerMetricCards listings={listings} />

        {/* Performance Chart & Recent Sales Row */}
        <div className="row g-4 mb-4">
          <SellerPerformanceChart />
          <SellerRecentSales />
        </div>

        {/* My Listings Interactive Table */}
        <SellerListingsTable 
          listings={listings} 
          onDeleteListing={handleDeleteListing}
          loading={loading}
        />

      </main>
    </div>
  );
};

export default SellerDashboard;
