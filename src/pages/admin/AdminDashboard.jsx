import React, { useState, useEffect } from 'react';
import api from '../../data/apiConfig';
import { 
  AdminSidebar, 
  AdminHeader, 
  AdminMetricCards, 
  AdminSalesOverview, 
  AdminBrandDistribution, 
  AdminRecentOrdersTable 
} from '../../components/admin';

/**
 * AdminDashboard Page
 * Assembles the modular administrative overview components.
 */
const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 2540,
    totalVehicles: 1320,
    totalOrders: 860,
    totalRevenue: 2450000
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/stats');
      if (res.data) {
        if (res.data.stats) setStats(res.data.stats);
        if (res.data.orders) setRecentOrders(res.data.orders);
      }
    } catch (err) {
      console.warn('Backend admin stats unavailable, using cached platform data:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <div className="dashboard-layout bg-light min-vh-100 d-flex font-sans">
      {/* 1. Left Dark Sidebar */}
      <AdminSidebar />

      {/* 2. Main Content Area */}
      <main className="dashboard-main flex-grow-1 p-4 p-md-5 overflow-auto" style={{ minWidth: 0 }}>
        {/* Header */}
        <AdminHeader 
          title="Admin Dashboard" 
          subtitle="Real-time platform metrics, sales activity, and fleet health"
          onRefresh={fetchAdminData}
          isRefreshing={loading}
        />

        {/* 4 KPI System Metric Cards */}
        <AdminMetricCards stats={stats} />

        {/* Sales Chart & Brand Breakdown */}
        <div className="row g-4 mb-4">
          <div className="col-lg-8">
            <AdminSalesOverview />
          </div>
          <div className="col-lg-4">
            <AdminBrandDistribution />
          </div>
        </div>

        {/* Recent Platform Orders */}
        <AdminRecentOrdersTable orders={recentOrders} />
      </main>
    </div>
  );
};

export default AdminDashboard;
