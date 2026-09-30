import React from 'react';
import { MapPin, Compass, ParkingSquare, Car } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

const LocationMap = () => {
  return (
    <div className="col-lg-5">
      <h5 className="fw-bold text-dark mb-4">Visit Us</h5>

      {/* Map Illustration Box */}
      <div id="map" className="position-relative rounded-3 overflow-hidden border border-light mb-4" style={{ height: '220px', backgroundColor: '#E5E7EB' }}>
        <img 
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80" 
          alt="Houston Dealership Map View" 
          className="w-100 h-100 object-fit-cover opacity-75"
        />
        <div className="position-absolute top-50 start-50 translate-middle bg-white px-3 py-2 rounded-3 shadow-sm d-flex align-items-center gap-2">
          <div className="p-1.5 rounded-circle bg-success text-white" style={{ backgroundColor: '#065F46' }}>
            <MapPin size={16} />
          </div>
          <div>
            <h6 className="fw-bold m-0" style={{ fontSize: '11px' }}>2500 West Loop S</h6>
            <small className="text-secondary d-block" style={{ fontSize: '10px' }}>Houston, TX 77027</small>
          </div>
        </div>
      </div>

      {/* Visit Amenities */}
      <div className="d-flex flex-column gap-2">
        <div className="d-flex align-items-center gap-3 p-2">
          <div className="p-2.5 rounded-3 bg-success bg-opacity-10 text-success" style={{ color: '#065F46' }}>
            <Compass size={20} />
          </div>
          <div>
            <h6 className="fw-bold text-dark m-0 small">Easy Access</h6>
            <small className="text-secondary d-block" style={{ fontSize: '11px' }}>
              Conveniently located off the West Loop freeway
            </small>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3 p-2">
          <div className="p-2.5 rounded-3 bg-success bg-opacity-10 text-success" style={{ color: '#065F46' }}>
            <ParkingSquare size={20} />
          </div>
          <div>
            <h6 className="fw-bold text-dark m-0 small">Free Parking</h6>
            <small className="text-secondary d-block" style={{ fontSize: '11px' }}>
              Plenty of customer parking available on-site
            </small>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3 p-2">
          <div className="p-2.5 rounded-3 bg-success bg-opacity-10 text-success" style={{ color: '#065F46' }}>
            <Car size={20} />
          </div>
          <div>
            <h6 className="fw-bold text-dark m-0 small">Test Drive Today</h6>
            <small className="text-secondary d-block" style={{ fontSize: '11px' }}>
              Schedule a test drive and experience the difference
            </small>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LocationMap;
