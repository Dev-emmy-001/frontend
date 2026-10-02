import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock, Truck, ExternalLink } from 'lucide-react';

/**
 * AdminRecentOrdersTable Component
 * Shows recent vehicle orders and quick settlement status.
 */
const AdminRecentOrdersTable = ({ orders = [] }) => {
  const sampleOrders = [
    { _id: 'ORD-1025', customer: 'John Doe', customerEmail: 'john@example.com', vehicle: '2023 Toyota RAV4 XLE', amount: 26490, status: 'Completed', date: 'May 24, 2025' },
    { _id: 'ORD-1024', customer: 'Sarah Smith', customerEmail: 'sarah@example.com', vehicle: '2022 Honda Accord EX', amount: 24990, status: 'Processing', date: 'May 23, 2025' },
    { _id: 'ORD-1023', customer: 'Mike Johnson', customerEmail: 'mike@example.com', vehicle: '2021 Ford F-150 XLT', amount: 33990, status: 'Completed', date: 'May 22, 2025' },
    { _id: 'ORD-1022', customer: 'Emily Davis', customerEmail: 'emily@example.com', vehicle: '2023 Camaro LT', amount: 28990, status: 'Pending', date: 'May 21, 2025' }
  ];

  const displayOrders = orders.length > 0 ? orders : sampleOrders;

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-2.5 py-1">Completed</span>;
      case 'processing':
        return <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-2.5 py-1">Processing</span>;
      case 'pending':
        return <span className="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25 px-2.5 py-1">Pending</span>;
      default:
        return <span className="badge bg-secondary bg-opacity-10 text-secondary px-2.5 py-1">{status}</span>;
    }
  };

  return (
    <div className="bg-white p-4 rounded-3 border border-light shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h6 className="fw-bold text-dark m-0">Recent Vehicle Orders</h6>
          <small className="text-muted">Platform-wide orders requiring escrow fulfillment</small>
        </div>
        <Link to="/admin/orders" className="text-danger fw-bold small text-decoration-none d-flex align-items-center gap-1 hover-text-danger">
          <span>View All Orders</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light small text-muted text-uppercase" style={{ fontSize: '11px' }}>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Vehicle</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody className="small">
            {displayOrders.map((order) => (
              <tr key={order._id}>
                <td className="fw-bold text-dark">{order._id}</td>
                <td>
                  <span className="fw-semibold text-dark d-block">{order.customer}</span>
                  {order.customerEmail && (
                    <small className="text-muted" style={{ fontSize: '11px' }}>{order.customerEmail}</small>
                  )}
                </td>
                <td>{order.vehicle}</td>
                <td className="fw-bold text-dark">${order.amount?.toLocaleString()}</td>
                <td>{getStatusBadge(order.status)}</td>
                <td className="text-muted">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRecentOrdersTable;
