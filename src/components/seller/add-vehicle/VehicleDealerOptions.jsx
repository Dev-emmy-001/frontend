import React from 'react';
import { ShieldCheck, CreditCard, Key } from 'lucide-react';

const VehicleDealerOptions = ({ dealerOptions = {}, setDealerOptions }) => {
  const handleChange = (key, val) => {
    setDealerOptions({
      ...dealerOptions,
      [key]: val
    });
  };

  return (
    <div className="mb-4">
      <h6 className="fw-bold text-dark text-uppercase small border-bottom pb-2 mb-3">
        3. Dealer & Buyer Perks
      </h6>

      <div className="row g-3">
        {/* Warranty */}
        <div className="col-md-4">
          <div className="p-3 rounded-3 border border-light bg-light d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2.5">
              <ShieldCheck size={20} className="text-danger" />
              <div>
                <span className="fw-bold text-dark small d-block">Warranty Included</span>
                <small className="text-muted" style={{ fontSize: '11px' }}>Dealer or factory warranty</small>
              </div>
            </div>
            <input 
              type="checkbox" 
              className="form-check-input mt-0"
              checked={!!dealerOptions.warrantyOffered}
              onChange={(e) => handleChange('warrantyOffered', e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
          </div>
        </div>

        {/* Financing */}
        <div className="col-md-4">
          <div className="p-3 rounded-3 border border-light bg-light d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2.5">
              <CreditCard size={20} className="text-danger" />
              <div>
                <span className="fw-bold text-dark small d-block">Financing Available</span>
                <small className="text-muted" style={{ fontSize: '11px' }}>Support buyer loan options</small>
              </div>
            </div>
            <input 
              type="checkbox" 
              className="form-check-input mt-0"
              checked={!!dealerOptions.financingAvailable}
              onChange={(e) => handleChange('financingAvailable', e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
          </div>
        </div>

        {/* Test Drive */}
        <div className="col-md-4">
          <div className="p-3 rounded-3 border border-light bg-light d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2.5">
              <Key size={20} className="text-danger" />
              <div>
                <span className="fw-bold text-dark small d-block">Test Drive Ready</span>
                <small className="text-muted" style={{ fontSize: '11px' }}>Allow test drive booking</small>
              </div>
            </div>
            <input 
              type="checkbox" 
              className="form-check-input mt-0"
              checked={dealerOptions.testDriveAvailable !== false}
              onChange={(e) => handleChange('testDriveAvailable', e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDealerOptions;
