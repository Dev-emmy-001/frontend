import React from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, vehicleTitle, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
      <div className="bg-white rounded-4 shadow-lg p-4 w-100" style={{ maxWidth: '440px' }}>
        
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-2 text-danger">
            <AlertTriangle size={22} />
            <h6 className="fw-bold m-0 text-dark">Confirm Deletion</h6>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="btn-close" 
            aria-label="Close"
          />
        </div>

        <p className="text-secondary small mb-4">
          Are you sure you want to delete <strong className="text-dark">{vehicleTitle || 'this vehicle listing'}</strong>? This action cannot be undone and will remove the car from the public marketplace.
        </p>

        <div className="d-flex justify-content-end gap-2">
          <button 
            type="button" 
            onClick={onClose} 
            disabled={loading}
            className="btn btn-light px-4 py-2 small fw-semibold"
          >
            Cancel
          </button>
          <button 
            type="button" 
            onClick={onConfirm} 
            disabled={loading}
            className="btn btn-danger px-4 py-2 small fw-bold d-flex align-items-center gap-1.5"
          >
            <Trash2 size={16} />
            <span>{loading ? 'Deleting...' : 'Delete Listing'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteConfirmModal;
