import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/**
 * VehicleBreadcrumb Component
 * Renders semantic, valid breadcrumbs for vehicle navigation.
 * 
 * @param {Object} props
 * @param {Object} props.car - Vehicle data
 */
const VehicleBreadcrumb = ({ car }) => {
  const year = car?.year || '';
  const make = car?.make || '';
  const model = car?.model || '';
  const bodyStyle = car?.bodyStyle || car?.bodyType || 'Vehicles';

  return (
    <nav aria-label="breadcrumb" className="mb-3">
      <ol className="breadcrumb small align-items-center m-0">
        <li className="breadcrumb-item">
          <Link to="/" className="text-secondary text-decoration-none hover-text-danger">
            Home
          </Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/inventory" className="text-secondary text-decoration-none hover-text-danger">
            Inventory
          </Link>
        </li>
        <li className="breadcrumb-item">
          <Link 
            to={`/inventory?type=${bodyStyle.toLowerCase()}`} 
            className="text-secondary text-decoration-none hover-text-danger"
          >
            {bodyStyle}
          </Link>
        </li>
        <li className="breadcrumb-item active text-dark fw-semibold" aria-current="page">
          {year} {make} {model}
        </li>
      </ol>
    </nav>
  );
};

export default VehicleBreadcrumb;
