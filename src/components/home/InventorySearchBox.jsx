import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Ship, Globe, Search } from 'lucide-react';
import { VEHICLE_ORIGIN_LOCATIONS, TARGET_DESTINATION_PORTS } from '../../data/globalShippingData';
import { useTranslation } from '../../context/LanguageContext';

const InventorySearchBox = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    condition: 'ALL',
    origin: 'ALL',
    port: 'ALL',
    make: '',
    bodyStyle: '',
    maxPrice: ''
  });
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (filters.condition && filters.condition !== 'ALL') queryParams.set('condition', filters.condition.toLowerCase());
    if (filters.origin && filters.origin !== 'ALL') queryParams.set('origin', filters.origin);
    if (filters.port && filters.port !== 'ALL') queryParams.set('port', filters.port);
    if (filters.make) queryParams.set('make', filters.make);
    if (filters.bodyStyle) queryParams.set('type', filters.bodyStyle.toLowerCase());
    if (filters.maxPrice) queryParams.set('maxPrice', filters.maxPrice);

    const queryString = queryParams.toString();
    navigate(queryString ? `/inventory?${queryString}` : '/inventory');
  };

  return (
    <div className="bg-black bg-opacity-90 border border-secondary p-4 rounded-3 shadow-lg mt-4 font-sans" style={{ maxWidth: '100%' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold text-white text-uppercase small m-0 d-flex align-items-center gap-1.5">
          <Globe size={16} className="text-danger" /> {t('searchBox.title', 'SMART GLOBAL SEARCH & INVENTORY')}
        </h6>
        <span className="badge bg-danger bg-opacity-25 text-danger border border-danger border-opacity-50 small d-none d-sm-inline-block">
          {t('searchBox.badge', 'Worldwide Port Shipping')}
        </span>
      </div>

      <form onSubmit={handleSearch}>
        {/* Row 1: Global Location & Port Targeting */}
        <div className="row g-2 mb-3 p-2.5 bg-dark rounded-2 border border-secondary">
          {/* Current Vehicle Location */}
          <div className="col-md-6 col-12">
            <label className="form-label small text-secondary mb-1 d-flex align-items-center gap-1">
              <MapPin size={13} className="text-danger" /> {t('searchBox.originLabel', 'Current Vehicle Location (Origin)')}
            </label>
            <select
              className="form-select bg-black text-white border-secondary py-1.5 small"
              value={filters.origin}
              onChange={(e) => setFilters({ ...filters, origin: e.target.value })}
            >
              {VEHICLE_ORIGIN_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.flag} {loc.label} {loc.id !== 'ALL' ? `(${loc.name})` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Target Destination Port */}
          <div className="col-md-6 col-12">
            <label className="form-label small text-secondary mb-1 d-flex align-items-center gap-1">
              <Ship size={13} className="text-info" /> {t('searchBox.portLabel', 'Target Destination Port')}
            </label>
            <select
              className="form-select bg-black text-white border-secondary py-1.5 small"
              value={filters.port}
              onChange={(e) => setFilters({ ...filters, port: e.target.value })}
            >
              {TARGET_DESTINATION_PORTS.map((port) => (
                <option key={port.id} value={port.id}>
                  {port.flag} {port.name} {port.country !== 'Global' ? `— ${port.country}` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Condition, Make, Body Style, Max Price, Submit */}
        <div className="row g-3 align-items-end">
          {/* Condition: ALL, USED, NEW */}
          <div className="col-lg col-md-6 col-12">
            <label className="form-label small text-secondary mb-1">{t('searchBox.condition', 'Condition')}</label>
            <select 
              className="form-select bg-dark text-white border-secondary py-2 small"
              value={filters.condition}
              onChange={(e) => setFilters({ ...filters, condition: e.target.value })}
            >
              <option value="ALL">{t('searchBox.allConditions', 'All Conditions (ALL)')}</option>
              <option value="USED">{t('searchBox.usedCars', 'Used Cars (USED)')}</option>
              <option value="NEW">{t('searchBox.newCars', 'New Cars (NEW)')}</option>
            </select>
          </div>

          <div className="col-lg col-md-6 col-12">
            <label className="form-label small text-secondary mb-1">{t('searchBox.make', 'Make')}</label>
            <select 
              className="form-select bg-dark text-white border-secondary py-2 small"
              value={filters.make}
              onChange={(e) => setFilters({ ...filters, make: e.target.value })}
            >
              <option value="">{t('searchBox.allMakes', 'All Makes')}</option>
              <option value="Toyota">Toyota</option>
              <option value="Honda">Honda</option>
              <option value="Ford">Ford</option>
              <option value="Chevrolet">Chevrolet</option>
              <option value="BMW">BMW</option>
              <option value="Jeep">Jeep</option>
              <option value="Lexus">Lexus</option>
              <option value="Mercedes-Benz">Mercedes-Benz</option>
              <option value="Nissan">Nissan</option>
              <option value="Land Rover">Land Rover</option>
            </select>
          </div>

          <div className="col-lg col-md-6 col-12">
            <label className="form-label small text-secondary mb-1">{t('searchBox.bodyStyle', 'Body Style')}</label>
            <select 
              className="form-select bg-dark text-white border-secondary py-2 small"
              value={filters.bodyStyle}
              onChange={(e) => setFilters({ ...filters, bodyStyle: e.target.value })}
            >
              <option value="">{t('searchBox.allBodyStyles', 'All Body Styles')}</option>
              <option value="Sedan">{t('nav.sedans', 'Sedan')}</option>
              <option value="SUV">{t('nav.suvs', 'SUV')}</option>
              <option value="Truck">{t('nav.trucks', 'Truck')}</option>
              <option value="Coupe">{t('nav.coupes', 'Coupe')}</option>
              <option value="Hybrid">{t('nav.hybrids', 'Hybrid')}</option>
            </select>
          </div>

          <div className="col-lg col-md-6 col-12">
            <label className="form-label small text-secondary mb-1">{t('searchBox.maxPrice', 'Max Price')}</label>
            <select 
              className="form-select bg-dark text-white border-secondary py-2 small"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            >
              <option value="">{t('searchBox.allPrices', 'Any Price')}</option>
              <option value="25000">$25,000</option>
              <option value="35000">$35,000</option>
              <option value="50000">$50,000</option>
              <option value="75000">$75,000</option>
            </select>
          </div>

          <div className="col-lg-2 col-12">
            <button 
              type="submit" 
              className="btn btn-brand-red w-100 py-2.5 fw-bold text-uppercase small animate-btn d-flex align-items-center justify-content-center gap-1.5"
            >
              <Search size={15} />
              <span>{t('searchBox.searchButton', 'SEARCH')}</span>
            </button>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-2">
          <a href="/inventory" className="text-secondary small text-decoration-none hover-text-white" style={{ fontSize: '12px' }}>
            Advanced Showroom Search <span className="small">∨</span>
          </a>
        </div>
      </form>
    </div>
  );
};

export default InventorySearchBox;
