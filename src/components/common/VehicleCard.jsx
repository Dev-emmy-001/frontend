import React from 'react';
import { Link } from 'react-router-dom';
import { Gauge, ArrowRight, Sparkles } from 'lucide-react';
import { formatPrice } from '../../data/mockVehicles';

const VehicleCard = ({ car, isDark = false }) => {
  const fallbackImage = 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80';
  const imageUrl = car?.images && car.images.length > 0 ? car.images[0] : fallbackImage;
  const isNew = (car?.condition || '').toUpperCase() === 'NEW';

  return (
    <div className={`card h-100 ${isDark ? 'bg-black text-white border-secondary' : 'bg-white text-dark border-light shadow-sm'} overflow-hidden`} style={{ borderRadius: '8px' }}>
      {/* Image, Year & Condition Badge */}
      <div className="position-relative" style={{ height: '180px' }}>
        <img 
          src={imageUrl} 
          alt={`${car.year || ''} ${car.make || ''} ${car.model || 'Vehicle'}`}
          className="w-100 h-100 object-fit-cover"
          loading="lazy"
        />
        {car.year && (
          <span 
            className="position-absolute top-0 start-0 bg-dark text-white m-2 py-1 px-2 fw-bold" 
            style={{ fontSize: '11px', borderRadius: '3px' }}
          >
            {car.year}
          </span>
        )}

        {/* Condition Badge (NEW / USED) */}
        <span 
          className={`position-absolute top-0 end-0 m-2 py-1 px-2 fw-bold text-uppercase ${
            isNew 
              ? 'bg-danger text-white' 
              : 'bg-black bg-opacity-75 text-white border border-secondary border-opacity-50'
          }`}
          style={{ fontSize: '10px', borderRadius: '3px', letterSpacing: '0.5px' }}
        >
          {isNew ? '✨ NEW CAR' : 'USED CAR'}
        </span>
      </div>

      {/* Card Details */}
      <div className="card-body p-3 d-flex flex-column justify-content-between">
        <div>
          <h6 className={`card-title fw-bold m-0 ${isDark ? 'text-white' : 'text-dark'}`} style={{ fontSize: '15px' }}>
            {car.year} {car.make} {car.model}
          </h6>
          
          <div className="text-muted small d-flex align-items-center gap-2 my-2" style={{ fontSize: '12px' }}>
            <Gauge size={13} className="text-danger" />
            <span>{car.mileage != null ? `${Number(car.mileage).toLocaleString()} mi` : 'N/A'}</span>
            <span>•</span>
            {/* Custom Gear/Transmission Icon */}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-danger">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8M8 12h8" />
            </svg>
            <span>{car.transmission || 'Automatic'}</span>
          </div>

          <div className="d-flex align-items-baseline justify-content-between">
            <h5 className={`fw-black m-0 ${isDark ? 'text-danger' : 'text-dark'}`} style={{ fontWeight: '900', fontSize: '18px' }}>
              {formatPrice(car.price, car.currency)}
            </h5>
            {car.currency && car.currency !== 'USD' && (
              <span className="badge bg-secondary bg-opacity-10 text-secondary small" style={{ fontSize: '10px' }}>
                {car.currency}
              </span>
            )}
          </div>
        </div>

        <div className={`pt-3 mt-2 border-top ${isDark ? 'border-secondary' : 'border-light'}`}>
          <Link 
            to={`/vehicle/${car?._id || car?.id || '1'}`} 
            className="text-danger fw-bold small text-decoration-none d-flex align-items-center gap-1 hover-text-danger" 
            style={{ fontSize: '12px' }}
          >
            <span>VIEW DETAILS</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
