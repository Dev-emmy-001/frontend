import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Gauge, ArrowRight } from 'lucide-react';
import axios from 'axios';

const Inventory = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/vehicles')
      .then(res => setVehicles(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-dark text-white min-vh-100 py-5">
      <div className="container py-4">
        <h2 className="fw-black text-uppercase mb-4">VEHICLE INVENTORY</h2>
        <div className="row g-4">
          {vehicles.map((car) => (
            <div key={car._id} className="col-12 col-sm-6 col-lg-3">
              <div className="card h-100 border-secondary bg-black text-white overflow-hidden shadow-sm">
                <img src={car.images[0]} alt={car.model} className="w-100" style={{ height: '180px', objectFit: 'cover' }} />
                <div className="card-body p-3">
                  <h6 className="fw-bold">{car.year} {car.make} {car.model}</h6>
                  <p className="text-secondary small m-0"><Gauge size={12} className="text-danger me-1" />{car.mileage?.toLocaleString()} mi</p>
                  <h5 className="fw-black text-danger mt-2">${car.price?.toLocaleString()}</h5>
                  <Link to={`/vehicle/${car._id}`} className="btn btn-sm btn-outline-light w-100 mt-2">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;