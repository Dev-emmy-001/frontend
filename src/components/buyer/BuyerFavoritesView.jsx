import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, Gauge, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { sampleVehicles } from '../../data/mockVehicles';

/**
 * BuyerFavoritesView Component
 * Displays vehicles saved to the buyer's wishlist/favorites.
 */
const BuyerFavoritesView = () => {
  const [favorites, setFavorites] = useState(sampleVehicles.slice(0, 4));

  const handleRemoveFavorite = (id) => {
    setFavorites(prev => prev.filter(v => (v._id || v.id) !== id));
  };

  return (
    <div className="bg-white p-4 rounded-3 border border-light shadow-sm">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="fw-bold text-dark m-0">Saved Favorites ({favorites.length})</h5>
          <p className="text-muted small m-0">Cars you have bookmarked for quick comparison and purchase.</p>
        </div>

        <Link to="/inventory" className="btn btn-outline-danger btn-sm fw-bold">
          + Add More Cars
        </Link>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-5 border border-dashed rounded-3">
          <Heart size={44} className="text-muted opacity-50 mb-2" />
          <h6 className="fw-bold text-dark">Your favorites list is empty</h6>
          <p className="text-muted small mb-3">Browse our inventory and click the heart icon on any vehicle to save it here.</p>
          <Link to="/inventory" className="btn btn-brand-red btn-sm fw-bold px-4 py-2 text-uppercase">
            Browse Inventory
          </Link>
        </div>
      ) : (
        <div className="row g-3">
          {favorites.map((car) => {
            const carId = car._id || car.id || '1';
            const carImg = car.images && car.images.length > 0
              ? car.images[0]
              : 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80';

            return (
              <div key={carId} className="col-12 col-md-6 col-xl-4">
                <div className="card h-100 border-light shadow-sm rounded-3 overflow-hidden position-relative">
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveFavorite(carId)}
                    className="btn btn-light btn-sm position-absolute top-0 end-0 m-2 rounded-circle p-1.5 shadow-xs text-danger"
                    title="Remove from favorites"
                    style={{ zIndex: 10 }}
                  >
                    <Trash2 size={15} />
                  </button>

                  {/* Image */}
                  <div style={{ height: '180px' }} className="position-relative">
                    <img
                      src={carImg}
                      alt={`${car.year} ${car.make} ${car.model}`}
                      className="w-100 h-100 object-fit-cover"
                    />
                    <span 
                      className="position-absolute bottom-0 start-0 bg-dark text-white m-2 py-0.5 px-2 fw-bold"
                      style={{ fontSize: '11px', borderRadius: '3px' }}
                    >
                      {car.year}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="card-body p-3 d-flex flex-column justify-content-between">
                    <div>
                      <h6 className="fw-bold text-dark m-0 fs-6">
                        {car.year} {car.make} {car.model}
                      </h6>

                      <div className="text-muted small d-flex align-items-center gap-2 my-2" style={{ fontSize: '12px' }}>
                        <Gauge size={13} className="text-danger" />
                        <span>{car.mileage ? `${Number(car.mileage).toLocaleString()} mi` : 'N/A'}</span>
                        <span>•</span>
                        <span>{car.transmission || 'Automatic'}</span>
                        <span>•</span>
                        <span>{car.bodyStyle || 'SUV'}</span>
                      </div>

                      <h5 className="fw-black text-danger m-0 mb-3" style={{ fontWeight: '900' }}>
                        ${Number(car.price || 25000).toLocaleString()}
                      </h5>
                    </div>

                    <div className="d-flex gap-2 pt-2 border-top border-light">
                      <Link
                        to={`/vehicle/${carId}`}
                        className="btn btn-outline-dark btn-sm flex-grow-1 fw-bold text-uppercase d-flex align-items-center justify-content-center gap-1"
                        style={{ fontSize: '11px' }}
                      >
                        <span>View Details</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BuyerFavoritesView;
