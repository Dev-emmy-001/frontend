import React from 'react';
import { PieChart, Award } from 'lucide-react';

/**
 * AdminBrandDistribution Component
 * Shows market share and brand inventory concentration on the platform.
 */
const AdminBrandDistribution = () => {
  const brands = [
    { name: 'Toyota', share: 45, color: 'bg-danger', count: '594 units' },
    { name: 'Honda', share: 22, color: 'bg-dark', count: '290 units' },
    { name: 'Ford', share: 18, color: 'bg-secondary', count: '238 units' },
    { name: 'BMW & Luxury', share: 15, color: 'bg-warning', count: '198 units' }
  ];

  return (
    <div className="bg-white p-4 rounded-3 border border-light shadow-sm h-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold text-dark m-0">Top Inventory Brands</h6>
        <Award size={18} className="text-danger" />
      </div>

      {/* Progress Bars Breakdown */}
      <div className="d-flex flex-column gap-3 my-3">
        {brands.map((b, idx) => (
          <div key={idx}>
            <div className="d-flex justify-content-between align-items-center small mb-1">
              <span className="fw-semibold text-dark">{b.name}</span>
              <span className="text-muted" style={{ fontSize: '11px' }}>{b.count} ({b.share}%)</span>
            </div>
            <div className="progress" style={{ height: '7px' }}>
              <div 
                className={`progress-bar ${b.color}`} 
                role="progressbar" 
                style={{ width: `${b.share}%` }} 
                aria-valuenow={b.share} 
                aria-valuemin="0" 
                aria-valuemax="100" 
              />
            </div>
          </div>
        ))}
      </div>

      <div className="p-2.5 bg-light rounded-2 text-center text-muted mt-3" style={{ fontSize: '11px' }}>
        <strong>1,320 total active vehicles</strong> listed across all verified dealerships.
      </div>
    </div>
  );
};

export default AdminBrandDistribution;
