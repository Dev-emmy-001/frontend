import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ExternalLink, Trash2, Eye, ShieldCheck } from 'lucide-react';
import { sampleVehicles, formatPrice } from '../../data/mockVehicles';
import api from '../../data/apiConfig';

/**
 * AdminVehiclesView Component
 * Complete vehicle inventory moderation across all sellers with search, condition tags, and direct controls.
 */
const AdminVehiclesView = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [conditionFilter, setConditionFilter] = useState('ALL');

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
        setVehicles(sampleVehicles);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this vehicle from the marketplace?')) return;
    try {
      await api.delete(`/vehicles/${id}`);
      setVehicles(prev => prev.filter(v => (v._id || v.id) !== id));
    } catch {
      setVehicles(prev => prev.filter(v => (v._id || v.id) !== id));
    }
  };

  const filteredVehicles = vehicles.filter(v => {
    if (conditionFilter !== 'ALL' && (v.condition || 'Used').toUpperCase() !== conditionFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      return (
        v.make?.toLowerCase().includes(q) ||
        v.model?.toLowerCase().includes(q) ||
        v.year?.toString().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="bg-white p-4 rounded-3 border border-light shadow-sm">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h5 className="fw-bold text-dark m-0">Platform Vehicle Moderation</h5>
          <small className="text-muted">Inspect, moderate, and monitor all vehicles listed across the platform</small>
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
              placeholder="Search make or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Condition Pills */}
          <div className="btn-group btn-group-sm">
            {['ALL', 'USED', 'NEW'].map((c) => (
              <button 
                key={c}
                type="button" 
                onClick={() => setConditionFilter(c)}
                className={`btn btn-sm ${conditionFilter === c ? 'btn-dark fw-bold' : 'btn-outline-light text-dark'}`}
                style={{ fontSize: '11px' }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light small text-muted text-uppercase" style={{ fontSize: '11px' }}>
            <tr>
              <th>Vehicle</th>
              <th>Condition</th>
              <th>Price</th>
              <th>Mileage</th>
              <th>Body Type</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody className="small">
            {filteredVehicles.map((v) => {
              const carId = v._id || v.id || '1';
              const imgUrl = v.images && v.images.length > 0 ? v.images[0] : 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=100&q=80';
              const isNew = (v.condition || '').toUpperCase() === 'NEW';

              return (
                <tr key={carId}>
                  <td>
                    <div className="d-flex align-items-center gap-2.5">
                      <img src={imgUrl} alt={v.model} className="rounded object-fit-cover shadow-xs" style={{ width: '45px', height: '32px' }} />
                      <div>
                        <strong className="text-dark d-block">{v.year} {v.make} {v.model}</strong>
                        <small className="text-muted" style={{ fontSize: '10px' }}>ID: {carId.slice(-6)}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${isNew ? 'bg-danger text-white' : 'bg-light text-dark border'}`}>
                      {isNew ? 'NEW' : 'USED'}
                    </span>
                  </td>
                  <td className="fw-bold text-dark">
                    {formatPrice(v.price, v.currency)}
                  </td>
                  <td className="text-muted">
                    {v.mileage != null ? `${Number(v.mileage).toLocaleString()} mi` : 'N/A'}
                  </td>
                  <td>
                    <span className="badge bg-light text-dark">{v.bodyStyle || v.bodyType || 'SUV'}</span>
                  </td>
                  <td>
                    <span className="badge bg-success bg-opacity-10 text-success px-2.5 py-1">Available</span>
                  </td>
                  <td className="text-end">
                    <div className="d-flex justify-content-end gap-1">
                      <Link to={`/vehicle/${carId}`} className="btn btn-sm btn-light p-1.5 text-muted hover-text-dark" title="View Listing">
                        <ExternalLink size={15} />
                      </Link>
                      <button type="button" onClick={() => handleDelete(carId)} className="btn btn-sm btn-light p-1.5 text-danger hover-bg-danger" title="Remove Listing">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminVehiclesView;
