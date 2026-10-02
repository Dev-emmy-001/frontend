import React, { useState } from 'react';
import { Search, ShoppingBag, Eye, CheckCircle, Clock, Truck, Download, DollarSign } from 'lucide-react';

/**
 * AdminOrdersView Component
 * Platform-wide order fulfillment, settlement, and customer transactions monitor.
 */
const AdminOrdersView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const sampleOrders = [
    { id: 'ORD-1025', buyer: 'John Doe', seller: 'Summit Auto Group', vehicle: '2023 Toyota RAV4 XLE', amount: 26490, escrowFee: 264.90, paymentMethod: 'Direct Wire / Escrow', status: 'Completed', date: 'May 24, 2025' },
    { id: 'ORD-1024', buyer: 'Sarah Smith', seller: 'Premier Motors Group', vehicle: '2022 Honda Accord EX', amount: 24990, escrowFee: 249.90, paymentMethod: 'Financing Escrow', status: 'Processing', date: 'May 23, 2025' },
    { id: 'ORD-1023', buyer: 'Mike Johnson', seller: 'Lone Star Auto Dealers', vehicle: '2021 Ford F-150 XLT', amount: 33990, escrowFee: 339.90, paymentMethod: 'Bank Transfer', status: 'Completed', date: 'May 22, 2025' },
    { id: 'ORD-1022', buyer: 'Emily Davis', seller: 'David Miller (Private)', vehicle: '2023 Camaro LT', amount: 28990, escrowFee: 289.90, paymentMethod: 'Deposit + Escrow', status: 'Pending', date: 'May 21, 2025' }
  ];

  const filtered = sampleOrders.filter(o => {
    if (statusFilter !== 'ALL' && o.status.toUpperCase() !== statusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      return o.id.toLowerCase().includes(q) || o.buyer.toLowerCase().includes(q) || o.vehicle.toLowerCase().includes(q);
    }
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-2.5 py-1">Completed</span>;
      case 'Processing':
        return <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-2.5 py-1">Processing</span>;
      default:
        return <span className="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25 px-2.5 py-1">Pending</span>;
    }
  };

  return (
    <div className="bg-white p-4 rounded-3 border border-light shadow-sm">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h5 className="fw-bold text-dark m-0">Platform Orders & Escrow Settlements</h5>
          <small className="text-muted">Oversee multi-party transactions, escrow disbursements, and vehicle handoffs</small>
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
              placeholder="Search order or buyer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Pills */}
          <div className="btn-group btn-group-sm">
            {['ALL', 'COMPLETED', 'PROCESSING', 'PENDING'].map((st) => (
              <button 
                key={st}
                type="button" 
                onClick={() => setStatusFilter(st)}
                className={`btn btn-sm ${statusFilter === st ? 'btn-dark fw-bold' : 'btn-outline-light text-dark'}`}
                style={{ fontSize: '11px' }}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light small text-muted text-uppercase" style={{ fontSize: '11px' }}>
            <tr>
              <th>Order ID</th>
              <th>Buyer</th>
              <th>Seller / Dealer</th>
              <th>Vehicle</th>
              <th>Total Amount</th>
              <th>Escrow Fee</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody className="small">
            {filtered.map((o) => (
              <tr key={o.id}>
                <td className="fw-bold text-dark">{o.id}</td>
                <td className="fw-semibold text-dark">{o.buyer}</td>
                <td className="text-muted">{o.seller}</td>
                <td>{o.vehicle}</td>
                <td className="fw-bold text-dark">${o.amount.toLocaleString()}</td>
                <td className="text-success fw-semibold">+${o.escrowFee.toFixed(2)}</td>
                <td>{getStatusBadge(o.status)}</td>
                <td className="text-muted">{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersView;
