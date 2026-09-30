import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, CheckCircle2, DollarSign, ArrowUpRight } from 'lucide-react';

/**
 * BuyerMetricCards Component
 * Displays summary statistical metrics for the buyer dashboard.
 * 
 * @param {Object} props
 * @param {number} [props.ordersCount=3]
 * @param {number} [props.favoritesCount=8]
 * @param {number} [props.completedCount=2]
 * @param {number} [props.totalSpent=51480]
 */
const BuyerMetricCards = ({
  ordersCount = 3,
  favoritesCount = 8,
  completedCount = 2,
  totalSpent = 51480
}) => {
  const metrics = [
    {
      title: 'Active Orders',
      value: ordersCount,
      link: '/my-orders',
      icon: ShoppingBag,
      color: 'primary',
      bgLight: 'bg-primary',
      textColor: 'text-primary'
    },
    {
      title: 'Saved Favorites',
      value: favoritesCount,
      link: '/favorites',
      icon: Heart,
      color: 'danger',
      bgLight: 'bg-danger',
      textColor: 'text-danger'
    },
    {
      title: 'Completed Purchases',
      value: completedCount,
      link: '/my-orders?status=completed',
      icon: CheckCircle2,
      color: 'success',
      bgLight: 'bg-success',
      textColor: 'text-success'
    },
    {
      title: 'Total Spent',
      value: `$${Number(totalSpent).toLocaleString()}`,
      link: '/payments',
      icon: DollarSign,
      color: 'dark',
      bgLight: 'bg-dark',
      textColor: 'text-dark'
    }
  ];

  return (
    <div className="row g-3 mb-4">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div key={idx} className="col-12 col-sm-6 col-xl-3">
            <Link 
              to={m.link} 
              className="text-decoration-none d-block h-100"
            >
              <div 
                className="bg-white p-3.5 rounded-3 border border-light shadow-sm h-100 d-flex justify-content-between align-items-center transition-all hover-shadow"
                style={{ transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
              >
                <div>
                  <span className="text-muted small d-block mb-1 fw-medium">
                    {m.title}
                  </span>
                  <h3 className="fw-black text-dark m-0 fs-4">
                    {m.value}
                  </h3>
                </div>

                <div 
                  className={`${m.bgLight} bg-opacity-10 ${m.textColor} p-3 rounded-circle d-flex align-items-center justify-content-center`}
                  style={{ width: '48px', height: '48px' }}
                >
                  <Icon size={22} />
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default BuyerMetricCards;
