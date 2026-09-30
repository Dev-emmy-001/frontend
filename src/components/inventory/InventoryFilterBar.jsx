import React from 'react';
import { Search } from 'lucide-react';
import { VEHICLE_CATEGORIES } from '../../data/mockVehicles';

const InventoryFilterBar = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  totalResults
}) => {
  return (
    <div className="bg-black border border-secondary p-4 rounded-3 mb-4">
      <div className="row g-3 align-items-center">
        
        {/* Search Input */}
        <div className="col-12 col-md-5">
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
        <div className="col-12 col-md-4">
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

        {/* Results Counter */}
        <div className="col-12 col-md-3 text-md-end text-secondary small">
          Showing <span className="text-white fw-bold">{totalResults}</span> vehicles
        </div>

      </div>

      {/* Category Filter Pills */}
      <div className="d-flex flex-wrap gap-2 mt-3 pt-3 border-top border-secondary">
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
    </div>
  );
};

export default InventoryFilterBar;
