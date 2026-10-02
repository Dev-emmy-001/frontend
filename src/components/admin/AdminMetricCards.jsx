import React from 'react';
import { Users, Car, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';

/**
 * AdminMetricCards Component
 * Displays 4 high-level KPI cards for total users, vehicles, orders, and platform revenue.
 */
const AdminMetricCards = ({ stats = {} }) => {
  const cards = [
    {
      title: 'Total Users',
      value: (stats.totalUsers || 2540).toLocaleString(),
      change: '+18% this month',
      icon: <Users size={20} className="text-primary" />,
      badgeBg: 'bg-primary bg-opacity-10 text-primary'
    },
    {
      title: 'Total Vehicles Listed',
      value: (stats.totalVehicles || 1320).toLocaleString(),
      change: '+24 new today',
      icon: <Car size={20} className="text-danger" />,
      badgeBg: 'bg-danger bg-opacity-10 text-danger'
    },
    {
      title: 'Total Orders',
      value: (stats.totalOrders || 860).toLocaleString(),
      change: '98.5% completion rate',
      icon: <ShoppingBag size={20} className="text-warning" />,
      badgeBg: 'bg-warning bg-opacity-10 text-warning'
    },
    {
      title: 'Platform Volume',
      value: `$${(stats.totalRevenue || 2450000).toLocaleString()}`,
      change: '+14.2% vs last month',
      icon: <DollarSign size={20} className="text-success" />,
      badgeBg: 'bg-success bg-opacity-10 text-success',
      isBoldDanger: true
    }
  ];

  return (
    <div className="row g-3 mb-4">
      {cards.map((card, idx) => (
        <div key={idx} className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-3.5 rounded-3 border border-light shadow-sm h-100 d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted small fw-semibold" style={{ fontSize: '12px' }}>
                {card.title}
              </span>
              <div className={`p-2 rounded-2 ${card.badgeBg}`}>
                {card.icon}
              </div>
            </div>

            <div>
              <h3 className={`fw-black m-0 mb-1 ${card.isBoldDanger ? 'text-danger' : 'text-dark'}`} style={{ fontWeight: '900' }}>
                {card.value}
              </h3>
              <div className="d-flex align-items-center gap-1 text-muted" style={{ fontSize: '11px' }}>
                <TrendingUp size={12} className="text-success" />
                <span>{card.change}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminMetricCards;
