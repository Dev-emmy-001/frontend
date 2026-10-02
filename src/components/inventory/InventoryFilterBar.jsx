import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { VEHICLE_CATEGORIES, VEHICLE_CONDITIONS } from '../../data/mockVehicles';

const InventoryFilterBar = ({
  searchTerm,
  setSearchTerm,
  selectedCondition = 'ALL',
  setSelectedCondition,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  totalResults
}) => {
  return (
    <div className="bg-black border border-secondary p-4 rounded-3 mb-4 shadow-lg">
      
      {/* Top Bar: Condition Selector (ALL, USED, NEW) + Search + Sort */}
      <div className="row g-3 align-items-center mb-3">
        
        {/* Condition Filter Button Group: ALL, USED, NEW */}
        <div className="col-12 col-lg-4">
          <div className="d-flex align-items-center gap-2">
            <span className="text-secondary small fw-bold text-uppercase d-flex align-items-center gap-1">
              <SlidersHorizontal size={14} className="text-danger" /> Condition:
            </span>
            <div className="btn-group w-100" role="group">
              {VEHICLE_CONDITIONS.map((cond) => {
                const isActive = (selectedCondition || 'ALL').toUpperCase() === cond.toUpperCase();
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
                    {cond === 'ALL' ? 'ALL' : cond === 'USED' ? 'USED' : 'NEW'}
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
              placeholder="Search make, model, or year..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Sort Select */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="d-flex align-items-center gap-2">
            <label className="text-secondary small text-nowrap m-0">Sort By:</label>
            <select 
              className="form-select bg-dark text-white border-secondary py-1.5 small"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="year-desc">Year: Newest First</option>
              <option value="mileage-asc">Mileage: Lowest First</option>
            </select>
          </div>
        </div>

      </div>

      {/* Category Filter Pills & Results Counter */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 pt-3 border-top border-secondary">
        <div className="d-flex flex-wrap gap-2">
          {VEHICLE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`btn btn-sm ${selectedCategory === cat ? 'btn-danger fw-bold' : 'btn-outline-secondary text-white-50'} rounded-pill px-3`}
              style={{ fontSize: '12px' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="text-secondary small">
          Showing <span className="text-white fw-bold">{totalResults}</span> {selectedCondition !== 'ALL' ? selectedCondition.toLowerCase() : ''} vehicles
        </div>
      </div>
    </div>
  );
};

export default InventoryFilterBar;
