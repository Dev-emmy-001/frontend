import React, { useState, useEffect } from 'react';
import api from '../../data/apiConfig';
import SellerSidebar from '../../components/seller/SellerSidebar';
import SellerHeader from '../../components/seller/SellerHeader';
import SellerListingsTable from '../../components/seller/SellerListingsTable';

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = async () => {
    try {
      const res = await api.get('/vehicles/my-listings');
      if (res.data && Array.isArray(res.data)) {
        setListings(res.data);
      }
    } catch (err) {
      console.warn('Using local listings cache:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleDeleteListing = async (vehicleId) => {
    try {
      await api.delete(`/vehicles/${vehicleId}`);
      setListings(prev => prev.filter(item => item._id !== vehicleId));
    } catch (err) {
      setListings(prev => prev.filter(item => item._id !== vehicleId));
    }
  };

  return (
    <div className="dashboard-layout bg-light min-vh-100 d-flex font-sans">
      <SellerSidebar />
      <main className="dashboard-main flex-grow-1 p-4 p-md-5 overflow-auto" style={{ minWidth: 0 }}>
        <SellerHeader 
          title="My Listings Inventory" 
          subtitle="Manage, monitor, and update your published inventory"
          actionButton={true}
        />
        <SellerListingsTable 
          listings={listings} 
          onDeleteListing={handleDeleteListing}
          loading={loading}
        />
      </main>
    </div>
  );
};

export default MyListings;
