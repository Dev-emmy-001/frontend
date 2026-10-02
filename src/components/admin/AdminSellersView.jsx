import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Star, Building, Check, X, Search } from 'lucide-react';

/**
 * AdminSellersView Component
 * Seller verification center for inspecting business documents and granting verified badges.
 */
const AdminSellersView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sellers, setSellers] = useState([
    { id: 'SLR-101', companyName: 'Premier Motors Group', type: 'business_dealer', regNumber: 'TX-DL-99482', contactPerson: 'Robert Vance', email: 'sales@premiermotors.com', activeListings: 48, rating: 4.9, isVerified: true },
    { id: 'SLR-102', companyName: 'Lone Star Auto Dealers', type: 'business_dealer', regNumber: 'TX-DL-11823', contactPerson: 'Marcus Cole', email: 'contact@lonestarauto.com', activeListings: 32, rating: 4.8, isVerified: true },
    { id: 'SLR-103', companyName: 'David Miller', type: 'private_seller', regNumber: 'N/A (Individual)', contactPerson: 'David Miller', email: 'david.m@example.com', activeListings: 1, rating: 5.0, isVerified: false },
    { id: 'SLR-104', companyName: 'Apex Exotic Imports', type: 'business_dealer', regNumber: 'CA-DL-55291', contactPerson: 'Elena Rostova', email: 'elena@apeximports.com', activeListings: 15, rating: 4.7, isVerified: false }
  ]);

  const toggleVerification = (id) => {
    setSellers(prev => prev.map(s => s.id === id ? { ...s, isVerified: !s.isVerified } : s));
  };

  const filtered = sellers.filter(s => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      return s.companyName.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.regNumber.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="bg-white p-4 rounded-3 border border-light shadow-sm">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h5 className="fw-bold text-dark m-0">Seller & Dealership Verification</h5>
          <small className="text-muted">Review dealer business licenses and manage official verification badges</small>
        </div>

        <div className="input-group input-group-sm" style={{ maxWidth: '240px' }}>
          <span className="input-group-text bg-light border-end-0">
            <Search size={14} className="text-muted" />
          </span>
          <input 
            type="text" 
            className="form-control bg-light border-start-0 small"
            placeholder="Search seller or license..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light small text-muted text-uppercase" style={{ fontSize: '11px' }}>
            <tr>
              <th>Seller Name</th>
              <th>Type</th>
              <th>Registration / License</th>
              <th>Active Inventory</th>
              <th>Rating</th>
              <th>Verification Status</th>
              <th className="text-end">Verification Action</th>
            </tr>
          </thead>
          <tbody className="small">
            {filtered.map((s) => (
              <tr key={s.id}>
                <td>
                  <strong className="text-dark d-block">{s.companyName}</strong>
                  <small className="text-muted">{s.email}</small>
                </td>
                <td>
                  <span className={`badge ${s.type === 'business_dealer' ? 'bg-primary bg-opacity-10 text-primary' : 'bg-warning bg-opacity-10 text-warning'}`}>
                    {s.type === 'business_dealer' ? 'Business Dealer' : 'Private Seller'}
                  </span>
                </td>
                <td className="text-muted">{s.regNumber}</td>
                <td className="fw-bold text-dark">{s.activeListings} vehicles</td>
                <td>
                  <div className="d-flex align-items-center gap-1 text-warning">
                    <Star size={13} fill="currentColor" />
                    <span className="fw-bold text-dark">{s.rating}</span>
                  </div>
                </td>
                <td>
                  {s.isVerified ? (
                    <span className="badge bg-success bg-opacity-10 text-success d-inline-flex align-items-center gap-1 px-2.5 py-1">
                      <ShieldCheck size={12} /> Verified Dealer
                    </span>
                  ) : (
                    <span className="badge bg-warning bg-opacity-10 text-warning d-inline-flex align-items-center gap-1 px-2.5 py-1">
                      <ShieldAlert size={12} /> Pending Review
                    </span>
                  )}
                </td>
                <td className="text-end">
                  <button
                    type="button"
                    onClick={() => toggleVerification(s.id)}
                    className={`btn btn-sm ${s.isVerified ? 'btn-outline-danger' : 'btn-success text-white'} fw-bold px-3`}
                    style={{ fontSize: '11px' }}
                  >
                    {s.isVerified ? 'Revoke Badge' : 'Approve & Verify'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSellersView;
