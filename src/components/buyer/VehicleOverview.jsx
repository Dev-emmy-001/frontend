import React from 'react';
import { CheckCircle2, ShieldCheck, Award } from 'lucide-react';

/**
 * VehicleOverview Component
 * Displays the description narrative and key vehicle features / equipment.
 * 
 * @param {Object} props
 * @param {Object} props.car - Vehicle data
 */
const VehicleOverview = ({ car = {} }) => {
  const defaultFeatures = [
    'Apple CarPlay & Android Auto',
    'Blind Spot Detection & Rear Cross Traffic Alert',
    'Heated Front Seats & Steering Wheel',
    'Rearview Backup Camera with Dynamic Gridlines',
    'Adaptive Cruise Control with Lane Keep Assist',
    'Power Panoramic Sunroof / Moonroof',
    'Keyless Entry & Push-Button Start',
    'Premium Multi-Speaker Audio Sound System'
  ];

  const features = car?.dealerOptions && Array.isArray(car.dealerOptions) && car.dealerOptions.length > 0
    ? car.dealerOptions
    : defaultFeatures;

  const defaultDescription = `The ${car.year || '2023'} ${car.make || 'Toyota'} ${car.model || 'Vehicle'} represents the perfect combination of performance, luxury, and modern safety engineering. Thoroughly inspected through our comprehensive 160-point mechanical inspection process. Fully clean title, accident-free history, and ready for immediate delivery.`;

  return (
    <div className="bg-white p-4 rounded-4 border border-light shadow-sm mb-4">
      <h5 className="fw-bold text-dark mb-3">Vehicle Overview</h5>
      
      {/* Description text */}
      <p className="text-secondary small leading-relaxed mb-4">
        {car.description || defaultDescription}
      </p>

      {/* Key Features & Options */}
      <h6 className="fw-bold text-dark mb-3">Key Features & Options</h6>
      <div className="row g-2 mb-4">
        {features.map((feat, idx) => (
          <div key={idx} className="col-12 col-sm-6">
            <div className="d-flex align-items-center gap-2 text-dark small py-1">
              <CheckCircle2 size={16} className="text-success flex-shrink-0" />
              <span>{typeof feat === 'object' ? feat.name || JSON.stringify(feat) : feat}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Summit Quality Guarantee */}
      <div className="p-3 bg-light rounded-3 border border-light d-flex align-items-center gap-3">
        <Award size={26} className="text-danger flex-shrink-0" />
        <div>
          <strong className="text-dark small d-block">Summit Certified Assurance</strong>
          <small className="text-muted" style={{ fontSize: '11px' }}>
            Includes 12-Month / 12,000-Mile Powertrain Warranty and 24/7 Roadside Assistance.
          </small>
        </div>
      </div>
    </div>
  );
};

export default VehicleOverview;
