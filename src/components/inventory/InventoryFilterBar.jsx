import React from 'react';
import { Search, SlidersHorizontal, MapPin, Ship, X, Globe, DollarSign } from 'lucide-react';
import { VEHICLE_CATEGORIES, VEHICLE_CONDITIONS } from '../../data/mockVehicles';
import { VEHICLE_ORIGIN_LOCATIONS, TARGET_DESTINATION_PORTS } from '../../data/globalShippingData';
import { useCurrency } from '../../context/CurrencyContext';
import { useTranslation } from '../../context/LanguageContext';

const InventoryFilterBar = ({
  searchTerm,
  setSearchTerm,
  selectedCondition = 'ALL',
  setSelectedCondition,
  selectedCategory,
  setSelectedCategory,
  selectedOrigin = 'ALL',
  setSelectedOrigin,
  selectedPort = 'ALL',
  setSelectedPort,
  sortBy,
  setSortBy,
  totalResults,
  onResetFilters
}) => {
  const { currency, currencyInfo } = useCurrency();
  const { t } = useTranslation();

  const hasActiveFilters = 
    searchTerm || 
    (selectedCondition && selectedCondition !== 'ALL') || 
    (selectedCategory && selectedCategory !== 'ALL VEHICLES') ||
    (selectedOrigin && selectedOrigin !== 'ALL') ||
    (selectedPort && selectedPort !== 'ALL');

  return (
    <div className="bg-black border border-secondary p-4 rounded-3 mb-4 shadow-lg font-sans">
      
      {/* Row 1: Condition Buttons + Keyword Search + Sort */}
      <div className="row g-3 align-items-center mb-3">
        
        {/* Condition Filter Button Group: ALL, USED, NEW */}
        <div className="col-12 col-lg-4">
          <div className="d-flex align-items-center gap-2">
            <span className="text-secondary small fw-bold text-uppercase d-flex align-items-center gap-1">
              <SlidersHorizontal size={14} className="text-danger" /> {t('inventory.conditionFilter', 'Condition:')}
            </span>
            <div className="btn-group w-100" role="group">
              {VEHICLE_CONDITIONS.map((cond) => {
                const isActive = (selectedCondition || 'ALL').toUpperCase() === cond.toUpperCase();
                const condLabel = cond === 'ALL' 
                  ? t('searchBox.allConditions', 'ALL') 
                  : cond === 'USED' 
                    ? t('vehicleCard.usedBadge', 'USED') 
                    : t('vehicleCard.newBadge', 'NEW');

                return (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => setSelectedCondition(cond)}
                    className={`btn btn-sm py-2 px-3 fw-bold transition-all ${
                      isActive 
                        ? 'btn-danger text-white shadow-sm' 
                        : 'btn-dark text-white-50 border-secondary hover-text-white'
                    }`}
                    style={{ fontSize: '12px', letterSpacing: '0.5px' }}
                  >
                    {condLabel}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="col-12 col-md-6 col-lg-5">
          <div className="input-group">
            <span className="input-group-text bg-dark border-secondary text-secondary">
              <Search size={16} />
            </span>
            <input 
              type="text" 
              className="form-control bg-dark text-white border-secondary small" 
              placeholder={t('inventory.searchPlaceholder', 'Search make, model, or year...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Sort Select */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="d-flex align-items-center gap-2">
            <label className="text-secondary small text-nowrap m-0">{t('inventory.sortByLabel', 'Sort By:')}</label>
            <select 
              className="form-select bg-dark text-white border-secondary py-1.5 small"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">{t('inventory.sortFeatured', 'Featured')}</option>
              <option value="price-asc">{t('inventory.sortPriceAsc', 'Price: Low to High')}</option>
              <option value="price-desc">{t('inventory.sortPriceDesc', 'Price: High to Low')}</option>
              <option value="year-desc">{t('inventory.sortYearDesc', 'Year: Newest First')}</option>
              <option value="mileage-asc">{t('inventory.sortMileageAsc', 'Mileage: Lowest First')}</option>
            </select>
          </div>
        </div>

      </div>

      {/* Row 2: SMART GLOBAL SEARCH & FILTERING (Vehicle Location + Destination Port) */}
      <div className="p-3 bg-dark bg-opacity-75 rounded-3 border border-secondary mb-3">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <span className="text-white small fw-bold text-uppercase d-flex align-items-center gap-1.5">
            <Globe size={15} className="text-danger" /> Smart Global Logistics & Port Filtering
          </span>
          <span className="badge bg-danger bg-opacity-25 text-danger border border-danger border-opacity-50 small">
            Live Cross-Border Delivery
          </span>
        </div>

        <div className="row g-2">
          {/* Current Vehicle Location (Origin Country) */}
          <div className="col-12 col-md-6">
            <label className="form-label text-secondary small mb-1 d-flex align-items-center gap-1">
              <MapPin size={13} className="text-danger" /> Current Vehicle Location
            </label>
            <select
              className="form-select bg-black text-white border-secondary small py-2"
              value={selectedOrigin}
              onChange={(e) => setSelectedOrigin(e.target.value)}
            >
              {VEHICLE_ORIGIN_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.flag} {loc.label} {loc.id !== 'ALL' ? `(${loc.name})` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Target Destination Port */}
          <div className="col-12 col-md-6">
            <label className="form-label text-secondary small mb-1 d-flex align-items-center gap-1">
              <Ship size={13} className="text-info" /> Target Destination Port
            </label>
            <select
              className="form-select bg-black text-white border-secondary small py-2"
              value={selectedPort}
              onChange={(e) => setSelectedPort(e.target.value)}
            >
              {TARGET_DESTINATION_PORTS.map((port) => (
                <option key={port.id} value={port.id}>
                  {port.flag} {port.name} {port.country !== 'Global' ? `— ${port.country}` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Port Routing Advisory Pill */}
        {selectedPort && selectedPort !== 'ALL' && (
          <div className="mt-2.5 pt-2 border-top border-secondary text-info small d-flex align-items-center justify-content-between flex-wrap gap-2" style={{ fontSize: '11px' }}>
            <span>
              🚢 Showing vehicles eligible for Ro-Ro & Container shipment to <strong>{selectedPort}</strong>.
            </span>
            <span className="text-white-50">
              Prices converted live in <strong>{currencyInfo.code} ({currencyInfo.symbol})</strong>
            </span>
          </div>
        )}
      </div>

      {/* Row 3: Category Filter Pills, Active Chips & Results Counter */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 pt-2 border-top border-secondary">
        <div className="d-flex flex-wrap align-items-center gap-2">
          {VEHICLE_CATEGORIES.map((cat) => {
            const catLabel = cat === 'ALL VEHICLES' ? t('searchBox.allConditions', 'ALL VEHICLES')
              : cat === 'SEDANS' ? t('nav.sedans', 'SEDANS')
              : cat === 'SUVS' ? t('nav.suvs', 'SUVS')
              : cat === 'TRUCKS' ? t('nav.trucks', 'TRUCKS')
              : cat === 'COUPES' ? t('nav.coupes', 'COUPES')
              : cat === 'HYBRIDS' ? t('nav.hybrids', 'HYBRIDS')
              : cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`btn btn-sm ${selectedCategory === cat ? 'btn-danger fw-bold shadow-xs' : 'btn-outline-secondary text-white-50'} rounded-pill px-3`}
                style={{ fontSize: '12px' }}
              >
                {catLabel}
              </button>
            );
          })}

          {/* Reset Filters button if any active */}
          {hasActiveFilters && onResetFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="btn btn-sm btn-outline-danger d-inline-flex align-items-center gap-1 rounded-pill px-2.5 py-1"
              style={{ fontSize: '11px' }}
              title="Reset all search and location filters"
            >
              <X size={12} /> {t('inventory.clearAll', 'Clear Filters')}
            </button>
          )}
        </div>

        {/* Results Counter */}
        <div className="text-secondary small">
          <span className="text-white fw-bold">{totalResults}</span> {t('inventory.vehiclesFound', 'vehicles found')}
          {selectedOrigin !== 'ALL' && <span className="text-danger ms-1">• {selectedOrigin}</span>}
        </div>
      </div>
    </div>
  );
};

export default InventoryFilterBar;
