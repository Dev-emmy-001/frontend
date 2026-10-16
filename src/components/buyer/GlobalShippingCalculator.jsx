import React, { useState } from 'react';
import { Ship, Anchor, Clock, ShieldCheck, MapPin, ArrowRight, Info, Check } from 'lucide-react';
import { TARGET_DESTINATION_PORTS, calculateShippingEstimate } from '../../data/globalShippingData';
import { useCurrency } from '../../context/CurrencyContext';

/**
 * GlobalShippingCalculator Component
 * Interactive cross-border ocean freight & port landed CIF cost calculator.
 */
export const GlobalShippingCalculator = ({ car = {} }) => {
  const { formatPrice, currency, currencyInfo, convert } = useCurrency();

  const originCountry = car.location?.country || 'USA';
  const originCity = car.location?.city || 'Houston, TX';
  const portOfLoading = car.location?.portOfLoading || 'Port of Houston';
  const originFlag = car.location?.flag || '🇺🇸';

  const [destinationPort, setDestinationPort] = useState('LAGOS');
  const [shippingMethod, setShippingMethod] = useState('roro'); // 'roro' or 'container'

  const vehiclePriceUSD = Number(car.price) || 26490;
  const estimate = calculateShippingEstimate(originCountry, destinationPort, vehiclePriceUSD);

  const selectedFreightUSD = shippingMethod === 'roro' ? estimate.roRoFreight : estimate.containerFreight;
  const totalCifUSD = vehiclePriceUSD + selectedFreightUSD + estimate.insuranceAmount;

  return (
    <div className="bg-white p-4 rounded-4 border border-light shadow-sm mb-4 font-sans">
      
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 border-bottom border-light pb-3 mb-3">
        <div className="d-flex align-items-center gap-2">
          <div className="bg-danger bg-opacity-10 text-danger p-2 rounded-3">
            <Ship size={20} />
          </div>
          <div>
            <h6 className="fw-black text-dark m-0">Global Port Shipping & CIF Calculator</h6>
            <small className="text-muted">Direct Ro-Ro & Container freight estimates to international ports</small>
          </div>
        </div>

        <span className="badge bg-light text-secondary border fw-semibold small">
          Active Currency: {currencyInfo.code} ({currencyInfo.symbol})
        </span>
      </div>

      {/* Origin & Destination Selectors */}
      <div className="row g-3 mb-3">
        
        {/* Origin Location Display */}
        <div className="col-md-6 col-12">
          <label className="form-label text-dark fw-bold small mb-1 d-flex align-items-center gap-1">
            <MapPin size={13} className="text-danger" /> Current Vehicle Location
          </label>
          <div className="p-2.5 bg-light rounded-3 border border-light d-flex align-items-center gap-2">
            <span style={{ fontSize: '18px' }}>{originFlag}</span>
            <div>
              <strong className="text-dark d-block small">{originCity}, {originCountry}</strong>
              <small className="text-muted" style={{ fontSize: '11px' }}>Loading Terminal: {portOfLoading}</small>
            </div>
          </div>
        </div>

        {/* Target Destination Port Selector */}
        <div className="col-md-6 col-12">
          <label className="form-label text-dark fw-bold small mb-1 d-flex align-items-center gap-1">
            <Anchor size={13} className="text-info" /> Target Destination Port
          </label>
          <select 
            className="form-select bg-light text-dark border-light fw-bold py-2 small"
            value={destinationPort}
            onChange={(e) => setDestinationPort(e.target.value)}
          >
            {TARGET_DESTINATION_PORTS.filter(p => p.id !== 'ALL').map((port) => (
              <option key={port.id} value={port.id}>
                {port.flag} {port.name} — {port.country}
              </option>
            ))}
          </select>
          <small className="text-muted d-block mt-1" style={{ fontSize: '10px' }}>
            Terminal: {estimate.destinationPort?.terminal || 'General Commercial Terminal'}
          </small>
        </div>

      </div>

      {/* Shipping Method: Ro-Ro vs Container */}
      <div className="mb-3">
        <label className="form-label text-dark fw-bold small mb-2">Freight Option</label>
        <div className="row g-2">
          <div className="col-6">
            <div 
              onClick={() => setShippingMethod('roro')}
              className={`p-3 rounded-3 border cursor-pointer transition-all ${
                shippingMethod === 'roro' ? 'border-danger bg-danger bg-opacity-10' : 'border-light bg-light'
              }`}
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex justify-content-between align-items-center mb-1">
                <strong className="text-dark small">Ro-Ro Ocean Vessel</strong>
                <span className="badge bg-danger">{formatPrice(estimate.roRoFreight)}</span>
              </div>
              <small className="text-muted d-block" style={{ fontSize: '11px' }}>
                Roll-on/Roll-off carrier. Most economical and widely used.
              </small>
            </div>
          </div>

          <div className="col-6">
            <div 
              onClick={() => setShippingMethod('container')}
              className={`p-3 rounded-3 border cursor-pointer transition-all ${
                shippingMethod === 'container' ? 'border-danger bg-danger bg-opacity-10' : 'border-light bg-light'
              }`}
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex justify-content-between align-items-center mb-1">
                <strong className="text-dark small">Dedicated Container</strong>
                <span className="badge bg-dark">{formatPrice(estimate.containerFreight)}</span>
              </div>
              <small className="text-muted d-block" style={{ fontSize: '11px' }}>
                Full 20ft/40ft enclosed container. Extra cargo space permitted.
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Transit Time & Marine Insurance Guarantee */}
      <div className="row g-2 mb-3">
        <div className="col-sm-6">
          <div className="p-2.5 bg-light rounded-3 border border-light d-flex align-items-center gap-2">
            <Clock size={16} className="text-primary flex-shrink-0" />
            <div>
              <span className="text-muted d-block" style={{ fontSize: '10px' }}>ESTIMATED TRANSIT TIME</span>
              <strong className="text-dark small">{estimate.transitDays}</strong>
            </div>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="p-2.5 bg-light rounded-3 border border-light d-flex align-items-center gap-2">
            <ShieldCheck size={16} className="text-success flex-shrink-0" />
            <div>
              <span className="text-muted d-block" style={{ fontSize: '10px' }}>ALL-RISK MARINE INSURANCE</span>
              <strong className="text-dark small">{formatPrice(estimate.insuranceAmount)}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Landed CIF Cost Breakdown */}
      <div className="p-3 bg-dark text-white rounded-3">
        <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom border-secondary small">
          <span className="text-white-50">Base Vehicle Price:</span>
          <span className="fw-bold">{formatPrice(vehiclePriceUSD)}</span>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom border-secondary small">
          <span className="text-white-50">Ocean Freight ({shippingMethod.toUpperCase()}):</span>
          <span className="fw-bold">{formatPrice(selectedFreightUSD)}</span>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom border-secondary small">
          <span className="text-white-50">Marine Insurance (Port to Port):</span>
          <span className="fw-bold">{formatPrice(estimate.insuranceAmount)}</span>
        </div>

        {/* CIF Total */}
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <strong className="d-block fs-6 text-white">Estimated CIF Port Total</strong>
            <small className="text-white-50" style={{ fontSize: '11px' }}>
              Delivered to {estimate.destinationPort?.name}
            </small>
          </div>
          <div className="text-end">
            <h4 className="fw-black text-danger m-0" style={{ fontWeight: '900' }}>
              {formatPrice(totalCifUSD)}
            </h4>
            {currency !== 'USD' && (
              <small className="text-white-50 font-monospace" style={{ fontSize: '11px' }}>
                (≈ ${totalCifUSD.toLocaleString()} USD)
              </small>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default GlobalShippingCalculator;
