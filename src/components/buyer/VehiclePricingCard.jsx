import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShieldCheck, Calculator, MessageSquare, MapPin, Globe } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

/**
 * VehiclePricingCard Component
 * Right-side sticky card displaying pricing, real-time FX conversion, 
 * vehicle location, purchase actions, and seller details.
 */
const VehiclePricingCard = ({ car = {}, onBuyNow, onContactSeller }) => {
  const { formatPrice, currency, currencyInfo } = useCurrency();
  const [isFavorited, setIsFavorited] = useState(false);

  const priceUSD = car.price != null ? Number(car.price) : 26490;
  const isNew = (car.condition || '').toUpperCase() === 'NEW';
  const isNonUsd = currency !== 'USD';

  // Estimate monthly financing based on 60mo @ 5.9% with 10% down in USD base
  const estimatedMonthlyUSD = Math.round((priceUSD * 0.9 * 1.15) / 60);

  const location = car.location || {
    country: 'USA',
    city: 'Houston, TX',
    flag: '🇺🇸',
    portOfLoading: 'Port of Houston'
  };

  const seller = car.seller || {
    name: 'Summit Auto Group (Official)',
    isVerified: true,
    rating: 4.9,
    reviewsCount: 148,
    phone: '(800) 555-AUTO',
    email: 'sales@summitautogroup.com'
  };

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="bg-white p-4 rounded-4 border border-light shadow-sm sticky-top font-sans" style={{ top: '90px' }}>
      
      {/* Title & Price */}
      <div className="mb-3">
        <div className="d-flex align-items-center gap-2 mb-1.5 flex-wrap">
          <span className={`badge ${isNew ? 'bg-danger text-white' : 'bg-danger bg-opacity-10 text-danger'} fw-bold`} style={{ fontSize: '11px' }}>
            {isNew ? '✨ New Car' : 'Used Car (Certified)'}
          </span>
          <span className="badge bg-dark text-white border fw-semibold d-inline-flex align-items-center gap-1" style={{ fontSize: '11px' }}>
            <span>{location.flag}</span>
            <span>{location.country} ({location.city})</span>
          </span>
        </div>

        <h3 className="fw-black text-dark mb-1 fs-4" style={{ fontWeight: '900' }}>
          {car.year} {car.make} {car.model}
        </h3>
        
        {/* Price in Converted Local Currency */}
        <div className="mt-2">
          <div className="d-flex align-items-baseline gap-2 flex-wrap">
            <h2 className="display-6 fw-black text-danger m-0" style={{ fontWeight: '900' }}>
              {formatPrice(priceUSD)}
            </h2>
            {isNonUsd && (
              <span className="text-muted small fw-semibold">
                (≈ ${priceUSD.toLocaleString()} USD)
              </span>
            )}
          </div>
          {isNonUsd && (
            <small className="text-secondary d-block mt-0.5" style={{ fontSize: '10px' }}>
              Live FX conversion ({currencyInfo.code})
            </small>
          )}
        </div>

        {/* Financing Estimation in active currency */}
        <div className="d-flex align-items-center gap-1 text-muted small mt-2">
          <Calculator size={14} className="text-danger" />
          <span>Est. <strong>{formatPrice(estimatedMonthlyUSD)}/mo</strong> for 60 mos</span>
          <Link to="/financing" className="text-danger fw-bold ms-1 text-decoration-none hover-text-danger" style={{ fontSize: '11px' }}>
            Calculate
          </Link>
        </div>
      </div>

      {/* Badges */}
      <div className="d-flex flex-wrap gap-1.5 mb-4">
        <span className="badge bg-light text-dark border px-2 py-1">{isNew ? 'New' : 'Used'}</span>
        <span className="badge bg-light text-dark border px-2 py-1">{car.year}</span>
        <span className="badge bg-light text-dark border px-2 py-1">{car.transmission || 'Automatic'}</span>
        <span className="badge bg-light text-dark border px-2 py-1">{car.bodyStyle || car.bodyType || 'SUV'}</span>
        <span className="badge bg-light text-dark border px-2 py-1">{car.fuelType || 'Gasoline'}</span>
      </div>

      {/* Primary Action Buttons */}
      <div className="d-grid gap-2 mb-4">
        <button 
          onClick={onBuyNow}
          className="btn btn-brand-red py-3 fw-bold text-uppercase text-white animate-btn shadow-sm"
          style={{ letterSpacing: '0.5px' }}
        >
          Buy / Reserve Vehicle
        </button>

        <button 
          onClick={handleFavoriteClick}
          className={`btn py-2.5 fw-bold d-flex align-items-center justify-content-center gap-2 transition-all ${
            isFavorited 
              ? 'btn-danger text-white' 
              : 'btn-outline-secondary text-dark'
          }`}
        >
          <Heart size={16} fill={isFavorited ? 'currentColor' : 'none'} className={isFavorited ? 'text-white' : 'text-danger'} />
          <span>{isFavorited ? 'Saved to Favorites' : 'Add to Favorites'}</span>
        </button>
      </div>

      {/* Origin & Port Shipping Notice */}
      <div className="p-2.5 bg-light rounded-3 border border-light mb-3 text-start small">
        <div className="d-flex align-items-center gap-1.5 text-dark fw-bold mb-0.5" style={{ fontSize: '11px' }}>
          <Globe size={13} className="text-danger" /> Global Vehicle Logistics
        </div>
        <span className="text-muted d-block" style={{ fontSize: '11px' }}>
          Loaded at <strong>{location.portOfLoading}</strong>. Direct ocean freight available to Lagos, Mombasa, Tema, Durban, and major global ports.
        </span>
      </div>

      {/* Seller Information Box */}
      <div className="border-top pt-3">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className="text-muted small fw-semibold" style={{ fontSize: '11px' }}>SELLER INFORMATION</span>
          {seller.isVerified && (
            <span className="badge bg-success bg-opacity-10 text-success d-flex align-items-center gap-1 px-2 py-0.5" style={{ fontSize: '10px' }}>
              <ShieldCheck size={11} /> Verified Seller
            </span>
          )}
        </div>

        <h6 className="fw-bold text-dark m-0">{seller.name || 'Summit Auto Dealer'}</h6>

        <div className="d-flex align-items-center gap-1.5 text-warning my-1.5">
          <div className="d-flex text-warning">
            <Star size={13} fill="currentColor" />
            <Star size={13} fill="currentColor" />
            <Star size={13} fill="currentColor" />
            <Star size={13} fill="currentColor" />
            <Star size={13} fill="currentColor" />
          </div>
          <span className="fw-bold text-dark small">{seller.rating || 4.9}</span>
          <span className="text-muted small" style={{ fontSize: '11px' }}>({seller.reviewsCount || 140} reviews)</span>
        </div>

        <button 
          onClick={onContactSeller}
          className="btn btn-dark w-100 py-2.5 mt-2 fw-bold small d-flex align-items-center justify-content-center gap-2 text-uppercase"
          style={{ fontSize: '12px' }}
        >
          <MessageSquare size={15} />
          <span>Contact Seller</span>
        </button>
      </div>

    </div>
  );
};

export default VehiclePricingCard;
