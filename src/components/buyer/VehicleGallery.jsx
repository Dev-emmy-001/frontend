import React, { useState } from 'react';
import { Camera, Eye } from 'lucide-react';

/**
 * VehicleGallery Component
 * Displays the main high-resolution vehicle photo and interactive thumbnail carousel.
 * 
 * @param {Object} props
 * @param {Array<string>} props.images - Array of image URLs
 * @param {string} props.vehicleTitle - Title of the vehicle for alt text
 */
const VehicleGallery = ({ images = [], vehicleTitle = 'Vehicle' }) => {
  const fallbackImage = 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80';
  const validImages = images && images.length > 0 ? images : [fallbackImage];

  const [activeImage, setActiveImage] = useState(validImages[0]);

  return (
    <div className="vehicle-gallery mb-4">
      {/* Main Large Image Container */}
      <div 
        className="bg-white rounded-4 overflow-hidden border border-light shadow-sm mb-3 position-relative"
        style={{ height: '420px' }}
      >
        <img
          src={activeImage || validImages[0]}
          alt={vehicleTitle}
          className="w-100 h-100 object-fit-cover transition-all"
          style={{ transition: 'opacity 0.3s ease-in-out' }}
        />

        {/* Photo Count Badge */}
        <span 
          className="position-absolute bottom-0 end-0 m-3 bg-dark bg-opacity-75 text-white px-2.5 py-1 rounded-2 small fw-semibold d-flex align-items-center gap-1.5"
          style={{ backdropFilter: 'blur(4px)', fontSize: '11px' }}
        >
          <Camera size={13} />
          <span>{validImages.length} Photos</span>
        </span>
      </div>

      {/* Thumbnails Row */}
      {validImages.length > 1 && (
        <div className="d-flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {validImages.map((img, idx) => {
            const isSelected = (activeImage || validImages[0]) === img;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(img)}
                className={`btn p-0 rounded-3 overflow-hidden border-2 transition-all ${
                  isSelected ? 'border-danger shadow-xs scale-95' : 'border-transparent opacity-75 hover-opacity-100'
                }`}
                style={{
                  width: '100px',
                  height: '70px',
                  flexShrink: 0,
                  outline: 'none',
                  border: isSelected ? '2px solid #dc3545' : '2px solid transparent'
                }}
                aria-label={`View photo ${idx + 1}`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-100 h-100 object-fit-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VehicleGallery;
