import React from 'react';
import { AdminSidebar, AdminHeader, AdminSellersView } from '../../components/admin';

const AdminSellers = () => {
  return (
    <div className="dashboard-layout bg-light min-vh-100 d-flex font-sans">
      <AdminSidebar />
      <main className="dashboard-main flex-grow-1 p-4 p-md-5 overflow-auto" style={{ minWidth: 0 }}>
        <AdminHeader 
          title="Sellers & Dealerships" 
          subtitle="Verification requests, active business licenses, and trust scores"
        />
        <AdminSellersView />
      </main>
    </div>
  );
};

export default AdminSellers;
