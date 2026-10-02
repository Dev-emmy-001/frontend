import React from 'react';
import { AdminSidebar, AdminHeader, AdminVehiclesView } from '../../components/admin';

const AdminVehicles = () => {
  return (
    <div className="dashboard-layout bg-light min-vh-100 d-flex font-sans">
      <AdminSidebar />
      <main className="dashboard-main flex-grow-1 p-4 p-md-5 overflow-auto" style={{ minWidth: 0 }}>
        <AdminHeader 
          title="Vehicle Inventory Moderation" 
          subtitle="Audit, approve, and moderate vehicle listings across all dealership fleets"
        />
        <AdminVehiclesView />
      </main>
    </div>
  );
};

export default AdminVehicles;
