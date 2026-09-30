import React from 'react';
import { topBrands } from '../../data/brandsData';

const TopBrands = () => {
  return (
    <section className="bg-white text-dark py-5">
      <div className="container">
        <div className="text-center mb-4">
          <span className="text-secondary fw-bold text-uppercase tracking-wider" style={{ fontSize: '12px' }}>
            WE PROUDLY CARRY TOP BRANDS
          </span>
        </div>
        
        <div className="d-flex justify-content-around align-items-center flex-wrap gap-4 text-center">
          {topBrands.map((brand, idx) => (
            <div key={idx} className="d-flex flex-column align-items-center" style={{ width: brand.width || '80px' }}>
              {brand.renderIcon()}
              {brand.name && (
                <span className="fw-bold" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>
                  {brand.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopBrands;
