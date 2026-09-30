import React, { useState } from 'react';
import { TrendingUp, Eye, MessageSquare, Calendar } from 'lucide-react';

const SellerPerformanceChart = () => {
  const [timeframe, setTimeframe] = useState('7d');

  const performanceData = {
    '7d': [
      { day: 'Mon', views: 45, inquiries: 4 },
      { day: 'Tue', views: 62, inquiries: 7 },
      { day: 'Wed', views: 58, inquiries: 5 },
      { day: 'Thu', views: 79, inquiries: 9 },
      { day: 'Fri', views: 95, inquiries: 12 },
      { day: 'Sat', views: 120, inquiries: 16 },
      { day: 'Sun', views: 88, inquiries: 10 }
    ],
    '30d': [
      { day: 'Week 1', views: 320, inquiries: 35 },
      { day: 'Week 2', views: 410, inquiries: 48 },
      { day: 'Week 3', views: 390, inquiries: 42 },
      { day: 'Week 4', views: 480, inquiries: 55 }
    ],
    '90d': [
      { day: 'Month 1', views: 1450, inquiries: 160 },
      { day: 'Month 2', views: 1680, inquiries: 195 },
      { day: 'Month 3', views: 1920, inquiries: 230 }
    ]
  };

  const activePoints = performanceData[timeframe] || performanceData['7d'];
  const maxViews = Math.max(...activePoints.map(p => p.views));

  return (
    <div className="col-lg-8">
      <div className="bg-white p-4 rounded-3 border border-light shadow-sm h-100">
        
        {/* Header */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-4">
          <div>
            <h6 className="fw-bold text-dark m-0">Vehicle Performance & Traffic</h6>
            <small className="text-muted">Listing impressions and buyer engagements</small>
          </div>

          <div className="btn-group btn-group-sm">
            <button 
              type="button"
              onClick={() => setTimeframe('7d')}
              className={`btn btn-sm ${timeframe === '7d' ? 'btn-danger fw-bold' : 'btn-outline-secondary'}`}
            >
              7 Days
            </button>
            <button 
              type="button"
              onClick={() => setTimeframe('30d')}
              className={`btn btn-sm ${timeframe === '30d' ? 'btn-danger fw-bold' : 'btn-outline-secondary'}`}
            >
              30 Days
            </button>
            <button 
              type="button"
              onClick={() => setTimeframe('90d')}
              className={`btn btn-sm ${timeframe === '90d' ? 'btn-danger fw-bold' : 'btn-outline-secondary'}`}
            >
              90 Days
            </button>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="p-3 bg-light rounded-3">
          <div className="d-flex align-items-end justify-content-between gap-2" style={{ height: '170px' }}>
            {activePoints.map((item, index) => {
              const heightPercent = Math.max(15, Math.round((item.views / maxViews) * 100));
              return (
                <div key={index} className="d-flex flex-column align-items-center flex-grow-1 h-100 justify-content-end">
                  <span className="text-muted mb-1" style={{ fontSize: '10px' }}>
                    {item.views}
                  </span>
                  <div 
                    className="w-100 rounded-top bg-danger bg-opacity-75 transition-all"
                    style={{ 
                      height: `${heightPercent}%`, 
                      maxWidth: '42px',
                      backgroundColor: '#D91C24'
                    }}
                    title={`${item.views} views, ${item.inquiries} inquiries`}
                  />
                  <span className="text-muted fw-semibold mt-2" style={{ fontSize: '11px' }}>
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Quick Analytics Indicators */}
        <div className="row g-2 mt-3 pt-3 border-top border-light text-center text-sm-start">
          <div className="col-4 d-flex align-items-center gap-2">
            <div className="p-1.5 rounded bg-danger bg-opacity-10 text-danger">
              <Eye size={16} />
            </div>
            <div>
              <span className="d-block fw-bold text-dark small">547</span>
              <small className="text-muted" style={{ fontSize: '11px' }}>Total Views</small>
            </div>
          </div>

          <div className="col-4 d-flex align-items-center gap-2">
            <div className="p-1.5 rounded bg-primary bg-opacity-10 text-primary">
              <MessageSquare size={16} />
            </div>
            <div>
              <span className="d-block fw-bold text-dark small">65</span>
              <small className="text-muted" style={{ fontSize: '11px' }}>Inquiries</small>
            </div>
          </div>

          <div className="col-4 d-flex align-items-center gap-2">
            <div className="p-1.5 rounded bg-success bg-opacity-10 text-success">
              <TrendingUp size={16} />
            </div>
            <div>
              <span className="d-block fw-bold text-dark small">+18.4%</span>
              <small className="text-muted" style={{ fontSize: '11px' }}>Growth</small>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SellerPerformanceChart;
