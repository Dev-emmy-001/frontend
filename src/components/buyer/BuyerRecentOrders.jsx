import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Clock, CheckCircle, Truck } from 'lucide-react';

/**
 * BuyerRecentOrders Component
 * Displays recent vehicle purchase/order activities for the buyer.
 * 
 * @param {Object} props
 * @param {Array} [props.orders] - List of order objects
 */
const BuyerRecentOrders = ({ orders }) => {
  const defaultOrders = [
    {
      id: 'ORD-1025',
      vehicleId: '1',
      vehicleName: '2023 Toyota RAV4 XLE',
      vin: '4T3B1RFV5NU098124',
      date: 'May 14, 2026',
      price: 26490,
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'ORD-1024',
      vehicleId: '2',
      vehicleName: '2022 Honda Accord EX',
      vin: '1HGCV1F32NA112984',
      date: 'Apr 28, 2026',
      price: 24990,
      status: 'Processing',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'ORD-1019',
      vehicleId: '3',
      vehicleName: '2021 Ford F-150 XLT',
      vin: '1FTFW1E84MKD34901',
      date: 'Mar 10, 2026',
      price: 33990,
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=300&q=80'
    }
  ];

  const orderList = orders && orders.length > 0 ? orders : defaultOrders;

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return <span className="badge bg-success bg-opacity-10 text-success px-2.5 py-1 fw-semibold">Completed</span>;
      case 'processing':
        return <span className="badge bg-warning bg-opacity-10 text-warning px-2.5 py-1 fw-semibold">Processing</span>;
      case 'in transit':
      case 'shipped':
        return <span className="badge bg-info bg-opacity-10 text-info px-2.5 py-1 fw-semibold">In Transit</span>;
      default:
        return <span className="badge bg-secondary bg-opacity-10 text-secondary px-2.5 py-1 fw-semibold">{status || 'Pending'}</span>;
    }
  };

  return (
    <div className="bg-white p-4 rounded-3 border border-light shadow-sm h-100">
      {/* Header Bar */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-2">
          <ShoppingBag size={18} className="text-danger" />
          <h6 className="fw-bold text-dark m-0">Recent Orders</h6>
        </div>
        <Link to="/my-orders" className="text-danger small fw-bold text-decoration-none hover-text-danger d-flex align-items-center gap-1">
          <span>View All</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* Orders List */}
      <div className="d-flex flex-column gap-3">
        {orderList.slice(0, 3).map((order) => (
          <div 
            key={order.id} 
            className="d-flex align-items-center justify-content-between p-3 rounded-3 bg-light border border-light transition-all"
          >
            <div className="d-flex align-items-center gap-3">
              <Link to={`/vehicle/${order.vehicleId || ''}`}>
                <img 
                  src={order.image} 
                  alt={order.vehicleName} 
                  className="rounded object-fit-cover shadow-xs"
                  style={{ width: '64px', height: '46px' }}
                />
              </Link>
              <div>
                <Link 
                  to={`/vehicle/${order.vehicleId || ''}`}
                  className="fw-bold small text-dark text-decoration-none hover-text-danger d-block lh-sm"
                >
                  {order.vehicleName}
                </Link>
                <div className="d-flex align-items-center gap-2 mt-1">
                  <small className="text-muted" style={{ fontSize: '11px' }}>
                    Order #{order.id}
                  </small>
                  <small className="text-muted" style={{ fontSize: '11px' }}>•</small>
                  <small className="text-muted" style={{ fontSize: '11px' }}>
                    {order.date}
                  </small>
                </div>
              </div>
            </div>

            <div className="text-end">
              <span className="fw-bold text-dark d-block small mb-1">
                ${Number(order.price).toLocaleString()}
              </span>
              {getStatusBadge(order.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerRecentOrders;
