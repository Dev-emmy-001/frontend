import React from 'react';
import { Calendar, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';

/**
 * AdminHeader Component
 * Standardizes title, greeting, and system date badge across all admin views.
 */
const AdminHeader = ({ title, subtitle, onRefresh, isRefreshing = false }) => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const adminName = user.fullName || 'System Administrator';

  const todayStr = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
      <div>
        <div className="d-flex align-items-center gap-2 mb-1">
          <h3 className="fw-black text-dark m-0">{title}</h3>
          <span className="badge bg-danger text-white small" style={{ fontSize: '10px' }}>
            ADMIN
          </span>
        </div>
        <p className="text-muted small m-0">
          {subtitle || `Welcome back, ${adminName} • System status operational`}
        </p>
      </div>

      <div className="d-flex align-items-center gap-2">
        {onRefresh && (
          <button 
            type="button" 
            onClick={onRefresh}
            disabled={isRefreshing}
            className="btn btn-white bg-white border border-light shadow-xs btn-sm d-flex align-items-center gap-1.5 px-3 py-2 fw-semibold text-secondary"
            title="Refresh Data"
          >
            <RefreshCw size={14} className={isRefreshing ? 'spinner-border spinner-border-sm' : 'text-danger'} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        )}

        <div className="badge bg-white text-dark border px-3 py-2 small fw-semibold shadow-xs d-flex align-items-center gap-1.5">
          <Calendar size={14} className="text-danger" />
          <span>{todayStr}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
