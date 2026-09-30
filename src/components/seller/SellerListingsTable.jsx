import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Trash2, Search, PlusCircle, ExternalLink } from 'lucide-react';
import DeleteConfirmModal from './DeleteConfirmModal';

const SellerListingsTable = ({ listings = [], onDeleteListing, loading = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  
  // Deletion Modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const sampleListings = [
    { _id: '1', year: 2023, make: 'Toyota', model: 'RAV4 XLE', price: 26490, mileage: 28120, views: 320, status: 'Active', createdAt: '2025-05-20', images: ['https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=150&q=80'] },
    { _id: '2', year: 2022, make: 'Honda', model: 'Accord EX', price: 24990, mileage: 31540, views: 280, status: 'Active', createdAt: '2025-05-18', images: ['https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=150&q=80'] },
    { _id: '3', year: 2021, make: 'Ford', model: 'F-150 XLT', price: 33990, mileage: 45300, views: 150, status: 'Sold', createdAt: '2025-05-15', images: ['https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=150&q=80'] },
    { _id: '4', year: 2023, make: 'Chevrolet', model: 'Camaro LT', price: 28990, mileage: 10860, views: 410, status: 'Active', createdAt: '2025-05-10', images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=150&q=80'] }
  ];

  const sourceListings = listings.length > 0 ? listings : sampleListings;

  const filtered = sourceListings.filter(item => {
    // Status Filter
    const itemStatus = (item.status || 'Active').toUpperCase();
    if (statusFilter !== 'ALL' && itemStatus !== statusFilter) return false;

    // Search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      const matchMake = item.make?.toLowerCase().includes(q);
      const matchModel = item.model?.toLowerCase().includes(q);
      const matchYear = item.year?.toString().includes(q);
      return matchMake || matchModel || matchYear;
    }

    return true;
  });

  const promptDelete = (item) => {
    setSelectedVehicle(item);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedVehicle) return;
    setDeleting(true);
    if (onDeleteListing) {
      await onDeleteListing(selectedVehicle._id);
    }
    setDeleting(false);
    setDeleteModalOpen(false);
    setSelectedVehicle(null);
  };

  return (
    <div className="bg-white p-4 rounded-3 border border-light shadow-sm">
      
      {/* Table Header & Controls */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3">
        <div>
          <h6 className="fw-bold text-dark m-0">My Vehicle Listings</h6>
          <small className="text-muted">Manage, edit, or remove your listed inventory</small>
        </div>

        <div className="d-flex flex-wrap align-items-center gap-2">
          {/* Search Box */}
          <div className="input-group input-group-sm" style={{ maxWidth: '220px' }}>
            <span className="input-group-text bg-light border-end-0">
              <Search size={14} className="text-muted" />
            </span>
            <input 
              type="text" 
              className="form-control bg-light border-start-0 small"
              placeholder="Search listings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Pills */}
          <div className="btn-group btn-group-sm">
            {['ALL', 'ACTIVE', 'SOLD'].map((status) => (
              <button 
                key={status}
                type="button" 
                onClick={() => setStatusFilter(status)}
                className={`btn btn-sm ${statusFilter === status ? 'btn-dark fw-bold' : 'btn-outline-light text-dark'}`}
                style={{ fontSize: '11px' }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light small text-muted text-uppercase" style={{ fontSize: '11px' }}>
            <tr>
              <th>Vehicle</th>
              <th>Price</th>
              <th>Mileage</th>
              <th>Views</th>
              <th>Status</th>
              <th>Date Added</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody className="small">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-muted">
                  No vehicle listings found matching your search.
                </td>
              </tr>
            ) : (
              filtered.map((item) => {
                const imgUrl = item.images && item.images.length > 0 
                  ? item.images[0] 
                  : 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=150&q=80';
                const isAvailable = (item.status === 'Active' || item.status === 'available');

                return (
                  <tr key={item._id}>
                    <td>
                      <div className="d-flex align-items-center gap-2.5">
                        <img 
                          src={imgUrl} 
                          alt={item.model} 
                          className="rounded object-fit-cover"
                          style={{ width: '44px', height: '32px' }}
                        />
                        <div>
                          <span className="fw-bold text-dark d-block">
                            {item.year} {item.make} {item.model} {item.trim || ''}
                          </span>
                          <small className="text-muted" style={{ fontSize: '10px' }}>
                            ID: {item._id?.slice(-6) || '10294'}
                          </small>
                        </div>
                      </div>
                    </td>

                    <td className="fw-bold text-dark">
                      ${Number(item.price || 0).toLocaleString()}
                    </td>

                    <td className="text-muted">
                      {item.mileage != null ? `${Number(item.mileage).toLocaleString()} mi` : 'N/A'}
                    </td>

                    <td>
                      <span className="badge bg-light text-dark fw-semibold">
                        {item.viewsCount || item.views || 180}
                      </span>
                    </td>

                    <td>
                      <span className={`badge px-2.5 py-1 ${
                        isAvailable 
                          ? 'bg-success bg-opacity-10 text-success' 
                          : 'bg-secondary bg-opacity-10 text-secondary'
                      }`}>
                        {item.status || 'Active'}
                      </span>
                    </td>

                    <td className="text-muted" style={{ fontSize: '12px' }}>
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'May 20, 2025'}
                    </td>

                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-1">
                        <Link 
                          to={`/vehicle/${item._id}`} 
                          className="btn btn-sm btn-light p-1.5 text-muted hover-text-dark"
                          title="View on site"
                        >
                          <ExternalLink size={15} />
                        </Link>
                        <button 
                          type="button" 
                          onClick={() => promptDelete(item)}
                          className="btn btn-sm btn-light p-1.5 text-danger hover-bg-danger"
                          title="Delete listing"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal 
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        vehicleTitle={selectedVehicle ? `${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}` : ''}
        loading={deleting}
      />

    </div>
  );
};

export default SellerListingsTable;
