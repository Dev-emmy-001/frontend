import React from 'react';
import { TrendingUp, BarChart2 } from 'lucide-react';

/**
 * AdminSalesOverview Component
 * Renders weekly gross volume bars and growth statistics.
 */
const AdminSalesOverview = () => {
  const weeklyData = [
    { day: 'Mon', amount: '$320K', height: '65%' },
    { day: 'Tue', amount: '$410K', height: '80%' },
    { day: 'Wed', amount: '$290K', height: '55%' },
    { day: 'Thu', amount: '$540K', height: '95%' },
    { day: 'Fri', amount: '$480K', height: '85%' },
    { day: 'Sat', amount: '$360K', height: '70%' },
    { day: 'Sun', amount: '$210K', height: '45%' }
  ];

  return (
    <div className="bg-white p-4 rounded-3 border border-light shadow-sm h-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h6 className="fw-bold text-dark m-0">Weekly Sales & Volume Overview</h6>
          <small className="text-muted">Platform vehicle turnover over the past 7 days</small>
        </div>
        <span className="badge bg-success bg-opacity-10 text-success fw-bold d-flex align-items-center gap-1">
          <TrendingUp size={12} /> +12.4%
        </span>
      </div>

      {/* Chart Bars */}
      <div className="d-flex align-items-end justify-content-between pt-4 pb-2 px-2" style={{ height: '200px' }}>
        {weeklyData.map((item, idx) => (
          <div key={idx} className="d-flex flex-column align-items-center gap-2" style={{ width: '12%' }}>
            <small className="text-muted" style={{ fontSize: '10px' }}>{item.amount}</small>
            <div 
              className="w-100 rounded-2 transition-all hover-opacity"
              style={{ 
                height: item.height, 
                backgroundColor: idx === 3 ? '#D91C24' : '#212529',
                transition: 'height 0.3s ease'
              }}
              title={`${item.day}: ${item.amount}`}
            />
            <strong className="text-dark small" style={{ fontSize: '11px' }}>{item.day}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSalesOverview;
