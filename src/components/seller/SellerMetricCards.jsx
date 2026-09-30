import React from 'react';
import { Car, CheckCircle2, TrendingUp, DollarSign } from 'lucide-react';

const SellerMetricCards = ({ listings = [] }) => {
  // Calculate dynamic metrics if listings array is provided
  const totalVehicles = listings.length || 25;
  const activeListings = listings.filter(l => l.status === 'Active' || l.status === 'available').length || 18;
  const soldVehicles = listings.filter(l => l.status === 'Sold' || l.status === 'sold').length || 7;
  
  const totalEarningsAmount = listings
    .filter(l => l.status === 'Sold' || l.status === 'sold')
    .reduce((sum, item) => sum + (Number(item.price) || 0), 0) || 189500;

  const cards = [
    {
      title: 'Total Vehicles',
      value: totalVehicles,
      icon: <Car size={20} className="text-danger" />,
      subtext: 'In your garage',
      bgColor: 'bg-danger bg-opacity-10'
    },
    {
      title: 'Active Listings',
      value: activeListings,
      icon: <CheckCircle2 size={20} className="text-primary" />,
      subtext: 'Live on marketplace',
      bgColor: 'bg-primary bg-opacity-10'
    },
    {
      title: 'Sold Vehicles',
      value: soldVehicles,
      icon: <TrendingUp size={20} className="text-warning" />,
      subtext: 'Completed sales',
      bgColor: 'bg-warning bg-opacity-10'
    },
    {
      title: 'Total Earnings',
      value: `$${totalEarningsAmount.toLocaleString()}`,
      icon: <DollarSign size={20} className="text-success" />,
      subtext: 'Gross vehicle revenue',
      bgColor: 'bg-success bg-opacity-10',
      highlight: true
    }
  ];

  return (
    <div className="row g-3 mb-4">
      {cards.map((card, idx) => (
        <div key={idx} className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-3.5 rounded-3 border border-light shadow-sm h-100 d-flex flex-column justify-content-between">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted small fw-semibold">{card.title}</span>
              <div className={`p-2 rounded-2 ${card.bgColor} d-flex align-items-center justify-content-center`}>
                {card.icon}
              </div>
            </div>
            <div>
              <h3 className={`fw-black m-0 ${card.highlight ? 'text-success' : 'text-dark'}`} style={{ fontWeight: '900' }}>
                {card.value}
              </h3>
              <small className="text-muted" style={{ fontSize: '11px' }}>{card.subtext}</small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SellerMetricCards;
