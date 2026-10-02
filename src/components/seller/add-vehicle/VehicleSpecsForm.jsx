import React from 'react';
import { CURRENCY_OPTIONS, getCurrencySymbol } from '../../../data/mockVehicles';

const VehicleSpecsForm = ({ formData, setFormData }) => {
  const transmissions = ['Automatic', 'Manual', 'CVT', 'Dual-Clutch'];
  const driveTypes = ['FWD', 'AWD', 'RWD', '4WD'];
  const currentCurrency = formData.currency || 'USD';
  const currencySymbol = getCurrencySymbol(currentCurrency);

  return (
    <div className="mb-4">
      <h6 className="fw-bold text-dark text-uppercase small border-bottom pb-2 mb-3">
        2. Pricing & Mechanical Specifications
      </h6>

      <div className="row g-3 mb-3">
        {/* Currency Selection */}
        <div className="col-md-3">
          <label className="form-label small fw-bold text-secondary">Currency *</label>
          <select 
            className="form-select form-control-custom"
            value={currentCurrency}
            onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
            required
          >
            {CURRENCY_OPTIONS.map(c => (
              <option key={c.code} value={c.code}>
                {c.code} ({c.symbol}) - {c.name.split('- ')[1] || c.code}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="col-md-3">
          <label className="form-label small fw-bold text-secondary">
            Listing Price ({currentCurrency}) *
          </label>
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0 fw-bold text-danger">
              {currencySymbol}
            </span>
            <input 
              type="number" 
              required 
              min="0"
              placeholder="26490"
              className="form-control form-control-custom border-start-0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>
        </div>

        {/* Mileage */}
        <div className="col-md-3">
          <label className="form-label small fw-bold text-secondary">Mileage (mi) *</label>
          <div className="input-group">
            <input 
              type="number" 
              required 
              min="0"
              placeholder="28120"
              className="form-control form-control-custom border-end-0"
              value={formData.mileage}
              onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
            />
            <span className="input-group-text bg-light border-start-0 text-muted small">mi</span>
          </div>
        </div>

        {/* Transmission */}
        <div className="col-md-3">
          <label className="form-label small fw-bold text-secondary">Transmission *</label>
          <select 
            className="form-select form-control-custom"
            value={formData.transmission}
            onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
            required
          >
            {transmissions.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="row g-3">
        {/* Engine */}
        <div className="col-md-3">
          <label className="form-label small fw-bold text-secondary">Engine</label>
          <input 
            type="text" 
            placeholder="e.g. 2.5L 4-Cyl"
            className="form-control form-control-custom"
            value={formData.engine || ''}
            onChange={(e) => setFormData({ ...formData, engine: e.target.value })}
          />
        </div>

        {/* Drive Type */}
        <div className="col-md-3">
          <label className="form-label small fw-bold text-secondary">Drivetrain</label>
          <select 
            className="form-select form-control-custom"
            value={formData.driveType || 'FWD'}
            onChange={(e) => setFormData({ ...formData, driveType: e.target.value })}
          >
            {driveTypes.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        {/* Exterior Color */}
        <div className="col-md-3">
          <label className="form-label small fw-bold text-secondary">Exterior Color</label>
          <input 
            type="text" 
            placeholder="e.g. Midnight Black"
            className="form-control form-control-custom"
            value={formData.exteriorColor || ''}
            onChange={(e) => setFormData({ ...formData, exteriorColor: e.target.value })}
          />
        </div>

        {/* Interior Color */}
        <div className="col-md-3">
          <label className="form-label small fw-bold text-secondary">Interior Color</label>
          <input 
            type="text" 
            placeholder="e.g. Black Leather"
            className="form-control form-control-custom"
            value={formData.interiorColor || ''}
            onChange={(e) => setFormData({ ...formData, interiorColor: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleSpecsForm;
