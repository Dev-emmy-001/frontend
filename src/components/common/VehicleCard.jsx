import React from 'react';
import { Link } from 'react-router-dom';
import { Gauge, ArrowRight, MapPin, Ship } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

const VehicleCard = ({ car, isDark = false, selectedPort = null }) => {
  const { formatPrice, currency } = useCurrency();
  const fallbackImage = 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80';
  const imageUrl = car?.images && car.images.length > 0 ? car.images[0] : fallbackImage;
  const isNew = (car?.condition || '').toUpperCase() === 'NEW';

  // Origin location details
  const location = car?.location || {
    country: 'USA',
    city: 'Houston, TX',
    portOfLoading: 'Port of Houston',
    flag: '🇺🇸'
  };

  const isNonUsd = currency !== 'USD';

  return (
    <div className={`card h-100 ${isDark ? 'bg-black text-white border-secondary' : 'bg-white text-dark border-light shadow-sm'} overflow-hidden transition-all`} style={{ borderRadius: '10px' }}>
      
      {/* Image, Badges & Origin Location */}
      <div className="position-relative" style={{ height: '185px' }}>
        <img 
          src={imageUrl} 
          alt={`${car.year || ''} ${car.make || ''} ${car.model || 'Vehicle'}`}
          className="w-100 h-100 object-fit-cover"
          loading="lazy"
        />
        
        {/* Origin Location Pill */}
        <span 
          className="position-absolute top-0 start-0 m-2 py-1 px-2 fw-bold text-white shadow-sm d-flex align-items-center gap-1"
          style={{ 
            fontSize: '11px', 
            borderRadius: '4px', 
            backgroundColor: 'rgba(0, 0, 0, 0.78)', 
            backdropFilter: 'blur(3px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
          title={`Vehicle Origin: ${location.city}, ${location.country}`}
        >
          <span>{location.flag || '🌍'}</span>
          <span>{location.country}</span>
        </span>

        {/* Condition Badge (NEW / USED) */}
        <span 
          className={`position-absolute top-0 end-0 m-2 py-1 px-2 fw-bold text-uppercase ${
            isNew 
              ? 'bg-danger text-white' 
              : 'bg-dark bg-opacity-75 text-white border border-secondary border-opacity-50'
          }`}
          style={{ fontSize: '10px', borderRadius: '4px', letterSpacing: '0.5px' }}
        >
          {isNew ? '✨ NEW' : 'USED'}
        </span>

        {/* Port / Terminal Footer Overlay */}
        <div 
          className="position-absolute bottom-0 start-0 w-100 py-1 px-2.5 text-white small d-flex justify-content-between align-items-center"
          style={{ 
            backgroundColor: 'rgba(10, 15, 25, 0.85)', 
            fontSize: '11px', 
            backdropFilter: 'blur(2px)' 
          }}
        >
          <span className="d-flex align-items-center gap-1 text-white-50">
            <MapPin size={11} className="text-danger" /> {location.city}
          </span>
          {selectedPort && selectedPort !== 'ALL' && (
            <span className="text-info fw-bold d-flex align-items-center gap-1">
              <Ship size={11} /> Ships to {selectedPort}
            </span>
          )}
        </div>
      </div>

      {/* Card Details */}
      <div className="card-body p-3 d-flex flex-column justify-content-between">
        <div>
          <h6 className={`card-title fw-bold m-0 text-truncate ${isDark ? 'text-white' : 'text-dark'}`} style={{ fontSize: '15px' }}>
            {car.year} {car.make} {car.model}
          </h6>
          
          <div className="text-muted small d-flex align-items-center gap-2 my-2" style={{ fontSize: '12px' }}>
            <Gauge size={13} className="text-danger" />
            <span>{car.mileage != null ? `${Number(car.mileage).toLocaleString()} mi` : 'N/A'}</span>
            <span>•</span>
            <span>{car.transmission || 'Automatic'}</span>
            <span>•</span>
            <span>{car.bodyStyle || car.bodyType || 'Sedan'}</span>
          </div>

          {/* Real-time Converted Price Display */}
          <div className="mt-2 pt-1">
            <div className="d-flex align-items-baseline gap-1.5 flex-wrap">
              <h5 className="fw-black text-danger m-0" style={{ fontWeight: '900', fontSize: '19px' }}>
                {formatPrice(car.price)}
              </h5>
              {isNonUsd && (
                <span className="text-muted small" style={{ fontSize: '11px' }}>
                  (≈ ${Number(car.price).toLocaleString()} USD)
                </span>
              )}
            </div>
            {isNonUsd && (
              <small className="text-secondary d-block" style={{ fontSize: '10px' }}>
                Auto-converted via live FX
              </small>
            )}
          </div>
        </div>

        <div className={`pt-3 mt-2 border-top d-flex justify-content-between align-items-center ${isDark ? 'border-secondary' : 'border-light'}`}>
          <span className="badge bg-light text-secondary border" style={{ fontSize: '10px' }}>
            {location.portOfLoading || 'Export Ready'}
          </span>
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
