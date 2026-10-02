import React from 'react';
import { AdminSidebar, AdminHeader, AdminRevenueView } from '../../components/admin';

const AdminRevenue = () => {
  return (
    <div className="dashboard-layout bg-light min-vh-100 d-flex font-sans">
      <AdminSidebar />
      <main className="dashboard-main flex-grow-1 p-4 p-md-5 overflow-auto" style={{ minWidth: 0 }}>
        <AdminHeader 
          title="Revenue & Platform Earnings" 
          subtitle="Commission fees, gross merchandise volume, and dealer disbursements"
        />
        <AdminRevenueView />
      </main>
    </div>
  );
};

export default AdminRevenue;
