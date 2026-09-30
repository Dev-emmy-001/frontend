import React, { useState } from 'react';
import { UploadCloud, X, Plus, Image as ImageIcon } from 'lucide-react';

const VehicleImageUploader = ({ images, setImages }) => {
  const [urlInput, setUrlInput] = useState('');

  // Handle local file uploads
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...urls]);
  };

  // Handle URL additions
  const handleAddUrl = (e) => {
    e.preventDefault();
    if (urlInput.trim()) {
      setImages(prev => [...prev, urlInput.trim()]);
      setUrlInput('');
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-4">
      <h6 className="fw-bold text-dark text-uppercase small border-bottom pb-2 mb-3">
        4. Vehicle Photos ({images.length} added)
      </h6>

      {/* Drag & Drop Upload Zone */}
      <label className="d-block border border-2 border-dashed rounded-3 p-4 text-center cursor-pointer bg-light hover-bg-white transition-all mb-3">
        <UploadCloud size={36} className="text-danger mb-2" />
        <p className="small text-dark m-0 fw-bold">
          Upload vehicle images from your computer
        </p>
        <small className="text-muted d-block mt-1">
          Supports PNG, JPG, WEBP. First image will be used as the primary thumbnail.
        </small>
        <input 
          type="file" 
          multiple 
          accept="image/*"
          className="d-none" 
          onChange={handleFileUpload}
        />
      </label>

      {/* Quick Image URL Input */}
      <div className="input-group input-group-sm mb-3">
        <span className="input-group-text bg-light">
          <ImageIcon size={14} className="text-muted" />
        </span>
        <input 
          type="url" 
          className="form-control small"
          placeholder="Or paste an image web URL (https://...)"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />
        <button 
          type="button"
          onClick={handleAddUrl}
          className="btn btn-outline-dark fw-semibold"
        >
          <Plus size={14} className="me-1" /> Add URL
        </button>
      </div>

      {/* Thumbnail Previews */}
      {images.length > 0 && (
        <div className="d-flex flex-wrap gap-2 p-2 bg-light rounded-3">
          {images.map((url, index) => (
            <div 
              key={index} 
              className="position-relative rounded-2 overflow-hidden border border-secondary border-opacity-25 shadow-xs" 
              style={{ width: '100px', height: '75px' }}
            >
              <img 
                src={url} 
                alt={`Vehicle Upload ${index + 1}`} 
                className="w-100 h-100 object-fit-cover" 
              />
              
              {index === 0 && (
                <span className="position-absolute bottom-0 start-0 bg-dark text-white px-1.5 py-0.5" style={{ fontSize: '9px', fontWeight: 'bold' }}>
                  Cover
                </span>
              )}

              <button 
                type="button" 
                onClick={() => removeImage(index)}
                className="btn btn-danger p-0 position-absolute top-0 end-0 rounded-circle m-1 d-flex align-items-center justify-content-center"
                style={{ width: '18px', height: '18px' }}
                title="Remove photo"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleImageUploader;
