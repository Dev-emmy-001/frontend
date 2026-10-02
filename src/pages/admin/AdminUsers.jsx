import React from 'react';
import { AdminSidebar, AdminHeader, AdminUsersView } from '../../components/admin';

const AdminUsers = () => {
  return (
    <div className="dashboard-layout bg-light min-vh-100 d-flex font-sans">
      <AdminSidebar />
      <main className="dashboard-main flex-grow-1 p-4 p-md-5 overflow-auto" style={{ minWidth: 0 }}>
        <AdminHeader 
          title="Users Management" 
          subtitle="Directory of all registered buyers, sellers, and system staff"
        />
        <AdminUsersView />
      </main>
    </div>
  );
};

export default AdminUsers;
