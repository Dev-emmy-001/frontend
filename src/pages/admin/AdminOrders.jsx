import React from 'react';
import { AdminSidebar, AdminHeader, AdminOrdersView } from '../../components/admin';

const AdminOrders = () => {
  return (
    <div className="dashboard-layout bg-light min-vh-100 d-flex font-sans">
      <AdminSidebar />
      <main className="dashboard-main flex-grow-1 p-4 p-md-5 overflow-auto" style={{ minWidth: 0 }}>
        <AdminHeader 
          title="Platform Orders & Settlements" 
          subtitle="Real-time multi-party escrow holds, vehicle deposits, and order fulfillments"
        />
        <AdminOrdersView />
      </main>
    </div>
  );
};

export default AdminOrders;
