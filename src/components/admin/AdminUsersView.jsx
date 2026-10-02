import React, { useState } from 'react';
import { Search, UserCheck, Shield, Filter, Mail, Phone, Trash2, CheckCircle2 } from 'lucide-react';

/**
 * AdminUsersView Component
 * Platform user management: list, filter, search, change roles and suspend/verify.
 */
const AdminUsersView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  const sampleUsers = [
    { id: 'USR-101', name: 'Alex Henderson', email: 'alex@example.com', phone: '(555) 234-5678', role: 'buyer', totalOrders: 3, joined: 'Jan 12, 2025', status: 'Active' },
    { id: 'USR-102', name: 'Premier Motors Group', email: 'sales@premiermotors.com', phone: '(555) 876-5432', role: 'business_dealer', totalOrders: 28, joined: 'Feb 04, 2025', status: 'Verified' },
    { id: 'USR-103', name: 'David Miller', email: 'david.m@example.com', phone: '(555) 345-6789', role: 'private_seller', totalOrders: 2, joined: 'Mar 18, 2025', status: 'Active' },
    { id: 'USR-104', name: 'Summit Admin Lead', email: 'admin@summitautogroup.com', phone: '(555) 000-1122', role: 'admin', totalOrders: 0, joined: 'Jan 01, 2025', status: 'Active' },
    { id: 'USR-105', name: 'Jessica Taylor', email: 'jessica.t@example.com', phone: '(555) 987-6543', role: 'buyer', totalOrders: 1, joined: 'Apr 20, 2025', status: 'Active' },
    { id: 'USR-106', name: 'Lone Star Auto Dealers', email: 'contact@lonestarauto.com', phone: '(555) 432-1098', role: 'business_dealer', totalOrders: 42, joined: 'Jan 15, 2025', status: 'Verified' }
  ];

  const filteredUsers = sampleUsers.filter(u => {
    if (roleFilter !== 'ALL' && u.role.toUpperCase() !== roleFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.id.toLowerCase().includes(q);
    }
    return true;
  });

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return <span className="badge bg-danger text-white">System Admin</span>;
      case 'business_dealer':
        return <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25">Business Dealer</span>;
      case 'private_seller':
        return <span className="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25">Private Seller</span>;
      default:
        return <span className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25">Buyer</span>;
    }
  };

  return (
    <div className="bg-white p-4 rounded-3 border border-light shadow-sm">
      {/* Search & Filter Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h5 className="fw-bold text-dark m-0">Platform Users Directory</h5>
          <small className="text-muted">Manage all registered buyers, sellers, and system administrators</small>
        </div>

        <div className="d-flex flex-wrap align-items-center gap-2">
          {/* Search Box */}
          <div className="input-group input-group-sm" style={{ maxWidth: '240px' }}>
            <span className="input-group-text bg-light border-end-0">
              <Search size={14} className="text-muted" />
            </span>
            <input 
              type="text" 
              className="form-control bg-light border-start-0 small"
              placeholder="Search user name/email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Role Filters */}
          <div className="btn-group btn-group-sm">
            {['ALL', 'BUYER', 'PRIVATE_SELLER', 'BUSINESS_DEALER', 'ADMIN'].map((r) => (
              <button 
                key={r}
                type="button" 
                onClick={() => setRoleFilter(r)}
                className={`btn btn-sm ${roleFilter === r ? 'btn-dark fw-bold' : 'btn-outline-light text-dark'}`}
                style={{ fontSize: '11px' }}
              >
                {r === 'ALL' ? 'All' : r === 'BUSINESS_DEALER' ? 'Dealers' : r === 'PRIVATE_SELLER' ? 'Sellers' : r.charAt(0) + r.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light small text-muted text-uppercase" style={{ fontSize: '11px' }}>
            <tr>
              <th>User ID</th>
              <th>Full Name</th>
              <th>Contact</th>
              <th>Account Role</th>
              <th>Total Orders</th>
              <th>Status</th>
              <th>Joined Date</th>
            </tr>
          </thead>
          <tbody className="small">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-muted">
                  No users found matching your search.
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td className="fw-bold text-dark">{u.id}</td>
                  <td>
                    <span className="fw-semibold text-dark d-block">{u.name}</span>
                  </td>
                  <td>
                    <div className="d-flex flex-column" style={{ fontSize: '11px' }}>
                      <span className="text-dark d-flex align-items-center gap-1">
                        <Mail size={11} className="text-danger" /> {u.email}
                      </span>
                      <span className="text-muted d-flex align-items-center gap-1">
                        <Phone size={11} /> {u.phone}
                      </span>
                    </div>
                  </td>
                  <td>{getRoleBadge(u.role)}</td>
                  <td>{u.totalOrders}</td>
                  <td>
                    <span className={`badge px-2.5 py-1 ${
                      u.status === 'Verified' ? 'bg-success bg-opacity-10 text-success' : 'bg-secondary bg-opacity-10 text-secondary'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="text-muted">{u.joined}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersView;
