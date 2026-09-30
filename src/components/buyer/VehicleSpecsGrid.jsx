import React from 'react';
import { 
  Gauge, 
  Settings, 
  Fuel, 
  Compass, 
  Palette, 
  Layers, 
  Calendar, 
  Shield 
} from 'lucide-react';

/**
 * VehicleSpecsGrid Component
 * Displays a clean structured grid of technical specifications for a vehicle.
 * 
 * @param {Object} props
 * @param {Object} props.car - Vehicle data
 */
const VehicleSpecsGrid = ({ car = {} }) => {
  const specs = [
    {
      label: 'Mileage',
      value: car.mileage != null ? `${Number(car.mileage).toLocaleString()} miles` : 'N/A',
      icon: Gauge
    },
    {
      label: 'Engine',
      value: car.engine || '2.5L 4-Cylinder Turbo',
      icon: Settings
    },
    {
      label: 'Transmission',
      value: car.transmission || 'Automatic',
      icon: Layers
    },
    {
      label: 'Drive Type',
      value: car.driveType || 'All Wheel Drive (AWD)',
      icon: Compass
    },
    {
      label: 'Fuel Type',
      value: car.fuelType || 'Gasoline',
      icon: Fuel
    },
    {
      label: 'Body Style',
      value: car.bodyStyle || car.bodyType || 'SUV',
      icon: Layers
    },
    {
      label: 'Exterior Color',
      value: car.exteriorColor || 'Metallic Gray',
      icon: Palette
    },
    {
      label: 'Interior Color',
      value: car.interiorColor || 'Premium Black Leather',
      icon: Palette
    },
    {
      label: 'Year',
      value: car.year ? String(car.year) : '2023',
      icon: Calendar
    }
  ];

  return (
    <div className="bg-white p-4 rounded-4 border border-light shadow-sm mb-4">
      <h5 className="fw-bold text-dark mb-3">Vehicle Specifications</h5>

      <div className="row g-3">
        {specs.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="col-6 col-md-4">
              <div className="p-2.5 rounded-3 bg-light bg-opacity-75 border border-light">
                <div className="d-flex align-items-center gap-1.5 text-muted small mb-1">
                  <Icon size={14} className="text-danger" />
                  <span style={{ fontSize: '12px' }}>{item.label}</span>
                </div>
                <strong className="text-dark d-block text-truncate" style={{ fontSize: '14px' }}>
                  {item.value}
                </strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VehicleSpecsGrid;
