import React from 'react';

const VehicleDescription = ({ description, setDescription }) => {
  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <h6 className="fw-bold text-dark text-uppercase small border-bottom pb-2 mb-0 flex-grow-1">
          5. Vehicle Description
        </h6>
        <small className="text-muted" style={{ fontSize: '11px' }}>
          {description.length} characters
        </small>
      </div>

      <div className="mt-3">
        <label className="form-label small fw-bold text-secondary">
          Detailed Vehicle Description *
        </label>
        <textarea 
          rows="5" 
          required
          className="form-control form-control-custom"
          placeholder="Highlight key features, condition, maintenance history, clean title, tire condition, packages, or upgrade options..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <small className="text-muted d-block mt-1" style={{ fontSize: '11px' }}>
          A detailed and transparent description helps vehicles sell up to 40% faster.
        </small>
      </div>
    </div>
  );
};

export default VehicleDescription;
