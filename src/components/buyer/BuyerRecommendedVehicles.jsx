import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, Gauge } from 'lucide-react';
import { sampleVehicles } from '../../data/mockVehicles';

/**
 * BuyerRecommendedVehicles Component
 * Shows personalized recommended vehicles for the buyer with direct navigation to vehicle details.
 * 
 * @param {Object} props
 * @param {Array} [props.vehicles] - Optional list of recommended vehicles
 */
const BuyerRecommendedVehicles = ({ vehicles }) => {
  const displayList = vehicles && vehicles.length > 0 ? vehicles : sampleVehicles.slice(3, 6);

  return (
    <div className="bg-white p-4 rounded-3 border border-light shadow-sm h-100">
      {/* Header Bar */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-2">
          <Sparkles size={18} className="text-warning" />
          <h6 className="fw-bold text-dark m-0">Recommended for You</h6>
        </div>
        <Link to="/inventory" className="text-muted small fw-semibold text-decoration-none hover-text-danger">
          View All
        </Link>
      </div>

      {/* Vehicle Recommendation Cards */}
      <div className="d-flex flex-column gap-3">
        {displayList.map((car) => {
          const carId = car._id || car.id || '1';
          const carImg = car.images && car.images.length > 0 
            ? car.images[0] 
            : 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=300&q=80';

          return (
            <div 
              key={carId} 
              className="card border-light overflow-hidden shadow-xs hover-shadow transition-all"
              style={{ transition: 'all 0.2s ease' }}
            >
              <div className="row g-0 align-items-center">
                <div className="col-5 position-relative" style={{ height: '95px' }}>
                  <img 
                    src={carImg} 
                    alt={`${car.year} ${car.make} ${car.model}`} 
                    className="w-100 h-100 object-fit-cover"
                  />
                  {car.year && (
                    <span 
                      className="position-absolute top-0 start-0 bg-dark text-white m-1.5 py-0.5 px-1.5 fw-bold" 
                      style={{ fontSize: '9px', borderRadius: '2px' }}
                    >
                      {car.year}
                    </span>
                  )}
                </div>

                <div className="col-7 p-2.5 ps-3">
                  <h6 className="fw-bold text-dark m-0 small text-truncate">
                    {car.year} {car.make} {car.model}
                  </h6>
                  
                  <div className="d-flex align-items-center gap-1 text-muted small my-1" style={{ fontSize: '11px' }}>
                    <Gauge size={11} className="text-danger" />
                    <span>{car.mileage ? `${Number(car.mileage).toLocaleString()} mi` : 'Certified'}</span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-black text-danger small">
                      ${Number(car.price || 28990).toLocaleString()}
                    </span>

                    <Link 
                      to={`/vehicle/${carId}`} 
                      className="text-dark small fw-bold text-decoration-none d-flex align-items-center gap-1 hover-text-danger"
                      style={{ fontSize: '11px' }}
                    >
                      <span>Details</span>
                      <ArrowUpRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BuyerRecommendedVehicles;
