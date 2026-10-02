import React from 'react';

const VehicleBasicInfo = ({ formData, setFormData }) => {
  const makes = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Nissan', 'Hyundai', 'Jeep', 'Mercedes-Benz', 'Audi', 'Tesla', 'Lexus'];
  const bodyTypes = ['SUV', 'Sedan', 'Truck', 'Coupe', 'Hatchback', 'Convertible', 'Wagon', 'Hybrid'];
  const fuelTypes = ['Gasoline', 'Hybrid', 'Plug-in Hybrid', 'Electric', 'Diesel'];

  return (
    <div className="mb-4">
      <h6 className="fw-bold text-dark text-uppercase small border-bottom pb-2 mb-3">
        1. Basic Vehicle Information
      </h6>

      <div className="row g-3">
        {/* Make */}
        <div className="col-md-4">
          <label className="form-label small fw-bold text-secondary">Make *</label>
          <select 
            className="form-select form-control-custom"
            value={formData.make}
            onChange={(e) => setFormData({ ...formData, make: e.target.value })}
            required
          >
            {makes.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        {/* Model */}
        <div className="col-md-4">
          <label className="form-label small fw-bold text-secondary">Model *</label>
          <input 
            type="text" 
            required 
            placeholder="e.g. RAV4, Accord, F-150"
            className="form-control form-control-custom"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
          />
        </div>

        {/* Year */}
        <div className="col-md-4">
          <label className="form-label small fw-bold text-secondary">Year *</label>
          <input 
            type="number" 
            required 
            min="1990" 
            max={new Date().getFullYear() + 1}
            placeholder="2023"
            className="form-control form-control-custom"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          />
        </div>

        {/* Trim */}
        <div className="col-md-4">
          <label className="form-label small fw-bold text-secondary">Trim Level</label>
          <input 
            type="text" 
            placeholder="e.g. XLE, Limited, GT"
            className="form-control form-control-custom"
            value={formData.trim}
            onChange={(e) => setFormData({ ...formData, trim: e.target.value })}
          />
        </div>

        {/* Body Type */}
        <div className="col-md-4">
          <label className="form-label small fw-bold text-secondary">Body Type *</label>
          <select 
            className="form-select form-control-custom"
            value={formData.bodyType}
            onChange={(e) => setFormData({ ...formData, bodyType: e.target.value })}
            required
          >
            {bodyTypes.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        {/* Condition (Used / New) */}
        <div className="col-md-4">
          <label className="form-label small fw-bold text-secondary">Vehicle Condition *</label>
          <select 
            className="form-select form-control-custom"
            value={formData.condition || 'Used'}
            onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
            required
          >
            <option value="Used">Used (Used car)</option>
            <option value="New">New (New car)</option>
          </select>
        </div>

        {/* Fuel Type */}
        <div className="col-md-4">
          <label className="form-label small fw-bold text-secondary">Fuel Type *</label>
          <select 
            className="form-select form-control-custom"
            value={formData.fuelType}
            onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
            required
          >
            {fuelTypes.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};

export default VehicleBasicInfo;
