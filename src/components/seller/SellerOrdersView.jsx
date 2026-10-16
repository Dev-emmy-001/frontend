import React, { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle, Clock, XCircle, Mail, Phone, Sparkles } from 'lucide-react';
import { getSellerOrders } from '../../services/orderService';

const DEFAULT_SELLER_ORDERS = [
  {
    id: 'ORD-8921',
    buyerName: 'Emily Clark',
    buyerEmail: 'emily.clark@example.com',
    buyerPhone: '(832) 555-0142',
    vehicle: '2023 Toyota RAV4 XLE',
    type: 'Purchase Offer',
    amount: 26490,
    status: 'Completed',
    date: 'May 23, 2025'
  },
  {
    id: 'ORD-8920',
    buyerName: 'Robert Martinez',
    buyerEmail: 'robert.m@example.com',
    buyerPhone: '(713) 555-0199',
    vehicle: '2022 Honda Accord EX',
    type: 'Test Drive Request',
    amount: 24990,
    status: 'Pending',
    date: 'May 22, 2025'
  },
  {
    id: 'ORD-8919',
    buyerName: 'David Lee',
    buyerEmail: 'david.lee@example.com',
    buyerPhone: '(281) 555-0177',
    vehicle: '2021 Ford F-150 XLT',
    type: 'Financing Pre-Approval',
    amount: 33990,
    status: 'Completed',
    date: 'May 15, 2025'
  }
];

const SellerOrdersView = () => {
  const [filter, setFilter] = useState('ALL');
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const local = await getSellerOrders();
      const formattedLocal = local.map(o => ({
        id: o.id || o.orderId,
        buyerName: o.buyerName || 'Verified Buyer',
        buyerEmail: o.buyerEmail || 'buyer@example.com',
        buyerPhone: o.buyerPhone || '(555) 123-4567',
        vehicle: o.vehicleName,
        type: 'Online Purchase',
        amount: o.price || 0,
        status: o.status || 'Processing',
        date: o.date,
        isNewOrder: o.isNewOrder
      }));

      // Combine formatted local orders with defaults, deduplicating by ID
      const seen = new Set();
      const combined = [];
      [...formattedLocal, ...DEFAULT_SELLER_ORDERS].forEach(item => {
        if (!seen.has(item.id)) {
          seen.add(item.id);
          combined.push(item);
        }
      });
      setOrders(combined);
    } catch (e) {
      setOrders(DEFAULT_SELLER_ORDERS);
    }
  };

  useEffect(() => {
    loadOrders();
    const handleUpdate = () => loadOrders();
    window.addEventListener('motors_order_placed', handleUpdate);
    return () => window.removeEventListener('motors_order_placed', handleUpdate);
  }, []);

  const filteredOrders = orders.filter(o => {
    if (filter === 'ALL') return true;
    return o.status.toUpperCase() === filter;
  });

  return (
    <div className="bg-white p-4 rounded-3 border border-light shadow-sm font-sans">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4 pb-2 border-bottom border-light">
        <div>
          <h5 className="fw-bold text-dark m-0">Buyer Inquiries & Orders</h5>
          <small className="text-muted">Review test drive bookings, purchase offers, and customer orders</small>
        </div>

        <div className="btn-group btn-group-sm">
          {['ALL', 'PENDING', 'PROCESSING', 'COMPLETED'].map(status => (
            <button
              key={status}
              type="button"
              onClick={() => setFilter(status)}
              className={`btn btn-sm ${filter === status ? 'btn-danger fw-bold' : 'btn-outline-light text-dark'}`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light small text-muted text-uppercase" style={{ fontSize: '11px' }}>
            <tr>
              <th>Order ID</th>
              <th>Buyer</th>
              <th>Vehicle</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody className="small">
            {filteredOrders.map(order => (
              <tr key={order.id} className={order.isNewOrder ? 'table-warning bg-opacity-25' : ''}>
                <td>
                  <div className="d-flex align-items-center gap-1">
                    <span className="fw-bold text-danger">{order.id}</span>
                    {order.isNewOrder && (
                      <span className="badge bg-danger text-white px-1 py-0.5" style={{ fontSize: '8px' }}>
                        NEW
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <strong className="text-dark d-block">{order.buyerName}</strong>
                  <span className="text-muted d-block" style={{ fontSize: '11px' }}>{order.buyerEmail}</span>
                </td>
                <td className="fw-semibold text-dark">{order.vehicle}</td>
                <td>
                  <span className={`badge ${order.type === 'Online Purchase' ? 'bg-danger bg-opacity-10 text-danger' : 'bg-light text-dark'} fw-semibold`}>
                    {order.type}
                  </span>
                </td>
                <td className="fw-bold text-dark">${Number(order.amount).toLocaleString()}</td>
                <td>
                  <span className={`badge px-2.5 py-1 ${
                    order.status === 'Completed' 
                      ? 'bg-success bg-opacity-10 text-success' 
                      : order.status === 'Processing'
                      ? 'bg-info bg-opacity-10 text-info'
                      : 'bg-warning bg-opacity-10 text-warning'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="text-muted">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerOrdersView;
