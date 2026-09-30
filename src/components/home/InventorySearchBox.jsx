import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InventorySearchBox = () => {
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    bodyStyle: '',
    maxPrice: ''
  });
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (filters.make) queryParams.set('make', filters.make);
    if (filters.bodyStyle) queryParams.set('type', filters.bodyStyle.toLowerCase());
    if (filters.maxPrice) queryParams.set('maxPrice', filters.maxPrice);

    const queryString = queryParams.toString();
    navigate(queryString ? `/inventory?${queryString}` : '/inventory');
  };

  return (
    <div className="bg-black bg-opacity-90 border border-secondary p-4 rounded-3 shadow-lg mt-4" style={{ maxWidth: '100%' }}>
      <h6 className="fw-bold text-white text-uppercase small mb-3">SEARCH INVENTORY</h6>
      <form onSubmit={handleSearch}>
        <div className="row g-3 align-items-end">
          <div className="col-lg col-md-6 col-12">
            <label className="form-label small text-secondary mb-1">Make</label>
            <select 
              className="form-select bg-dark text-white border-secondary py-2 small"
              value={filters.make}
              onChange={(e) => setFilters({ ...filters, make: e.target.value })}
            >
              <option value="">Any Make</option>
              <option value="Toyota">Toyota</option>
              <option value="Honda">Honda</option>
              <option value="Ford">Ford</option>
              <option value="Chevrolet">Chevrolet</option>
              <option value="BMW">BMW</option>
              <option value="Jeep">Jeep</option>
            </select>
          </div>

          <div className="col-lg col-md-6 col-12">
            <label className="form-label small text-secondary mb-1">Model</label>
            <select 
              className="form-select bg-dark text-white border-secondary py-2 small"
              value={filters.model}
              onChange={(e) => setFilters({ ...filters, model: e.target.value })}
            >
              <option value="">Any Model</option>
              <option value="RAV4">RAV4</option>
              <option value="Accord">Accord</option>
              <option value="F-150">F-150</option>
              <option value="Camaro">Camaro</option>
            </select>
          </div>

          <div className="col-lg col-md-6 col-12">
            <label className="form-label small text-secondary mb-1">Body Style</label>
            <select 
              className="form-select bg-dark text-white border-secondary py-2 small"
              value={filters.bodyStyle}
              onChange={(e) => setFilters({ ...filters, bodyStyle: e.target.value })}
            >
              <option value="">Any Body Style</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Truck">Truck</option>
              <option value="Coupe">Coupe</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="col-lg col-md-6 col-12">
            <label className="form-label small text-secondary mb-1">Max Price</label>
            <select 
              className="form-select bg-dark text-white border-secondary py-2 small"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            >
              <option value="">Any Price</option>
              <option value="20000">$20,000</option>
              <option value="30000">$30,000</option>
              <option value="40000">$40,000</option>
              <option value="50000">$50,000</option>
            </select>
          </div>

          <div className="col-lg-2 col-12">
            <button 
              type="submit" 
              className="btn btn-brand-red w-100 py-2 fw-bold text-uppercase small animate-btn"
            >
              SEARCH
            </button>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-2">
          <a href="/inventory" className="text-secondary small text-decoration-none hover-text-white" style={{ fontSize: '12px' }}>
            Advanced Search <span className="small">∨</span>
          </a>
        </div>
      </form>
    </div>
  );
};

export default InventorySearchBox;
