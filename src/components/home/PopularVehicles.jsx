import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../data/apiConfig';
import VehicleCard from '../common/VehicleCard';
import { VEHICLE_CATEGORIES, sampleVehicles, filterVehiclesByTab } from '../../data/mockVehicles';

const PopularVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ALL VEHICLES');

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await api.get('/vehicles');
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setVehicles(res.data);
        } else {
          setVehicles(sampleVehicles);
        }
      } catch (err) {
        console.warn('API unavailable, using sample vehicles:', err.message);
        setVehicles(sampleVehicles);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const displayList = vehicles.length > 0 ? vehicles : sampleVehicles;
  const filteredVehicles = filterVehiclesByTab(displayList, activeTab);

  return (
    <section className="bg-white text-dark py-5">
      <div className="container py-3">
        
        {/* Section Heading & Category Tabs */}
        <div className="text-center mb-4">
          <span className="text-danger fw-bold small text-uppercase tracking-wider">
            SHOP OUR INVENTORY
          </span>
          <h2 className="fw-black text-uppercase display-6 m-0" style={{ fontWeight: '900' }}>
            POPULAR PICKS
          </h2>
          
          <div className="d-flex justify-content-center flex-wrap gap-3 gap-md-4 mt-3 border-bottom border-light pb-2">
            {VEHICLE_CATEGORIES.map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`btn btn-link text-decoration-none fw-bold small p-0 ${activeTab === tab ? 'text-danger border-bottom border-danger border-2 pb-1' : 'text-secondary'}`}
                style={{ textDecoration: 'none', fontSize: '13px' }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicles Grid */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading vehicles...</span>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {filteredVehicles.slice(0, 8).map((car) => (
              <div key={car._id || car.model} className="col-12 col-sm-6 col-lg-3">
                <VehicleCard car={car} isDark={false} />
              </div>
            ))}
          </div>
        )}

        {/* CTA Button */}
        <div className="text-center mt-5 pt-2">
          <Link 
            to="/inventory" 
            className="btn btn-outline-dark px-4 py-2.5 fw-bold text-uppercase" 
            style={{ borderRadius: '4px', fontSize: '13px' }}
          >
            VIEW ALL INVENTORY
          </Link>
        </div>

      </div>
    </section>
  );
};

export default PopularVehicles;
