import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  Download, 
  Eye, 
  CheckCircle, 
  Clock, 
  Truck, 
  MessageSquare,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { getBuyerOrders } from '../../services/orderService';

/**
 * BuyerOrdersView Component
 * Comprehensive order tracking, vehicle status, invoice downloads,
 * and direct seller messaging for car buyers.
 */
const BuyerOrdersView = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTab, setFilterTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch orders on mount and listen for real-time order creation events
  const loadOrders = async () => {
    try {
      const data = await getBuyerOrders();
      setOrders(data);
    } catch (err) {
      console.error('Error loading buyer orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();

    const handleOrderEvent = (event) => {
      if (event.detail) {
        setOrders(prev => [event.detail, ...prev.filter(o => o.id !== event.detail.id)]);
      } else {
        loadOrders();
      }
    };

    window.addEventListener('motors_order_placed', handleOrderEvent);
    return () => {
      window.removeEventListener('motors_order_placed', handleOrderEvent);
    };
  }, []);

  const filteredOrders = orders.filter((order) => {
    // Filter by tab
    if (filterTab === 'COMPLETED' && order.status?.toLowerCase() !== 'completed') return false;
    if (filterTab === 'ACTIVE' && order.status?.toLowerCase() === 'completed') return false;

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        (order.vehicleName || '').toLowerCase().includes(q) ||
        (order.id || '').toLowerCase().includes(q) ||
        (order.vin || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return (
          <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-2.5 py-1">
            <CheckCircle size={12} className="me-1 inline-block" /> Completed
          </span>
        );
      case 'processing':
        return (
          <span className="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25 px-2.5 py-1">
            <Clock size={12} className="me-1 inline-block" /> Processing
          </span>
        );
      case 'in transit':
        return (
          <span className="badge bg-info bg-opacity-10 text-info border border-info border-opacity-25 px-2.5 py-1">
            <Truck size={12} className="me-1 inline-block" /> In Transit
          </span>
        );
      default:
        return <span className="badge bg-secondary bg-opacity-10 text-secondary px-2.5 py-1">{status || 'Pending'}</span>;
    }
  };

  const handleDownloadInvoice = (order) => {
    alert(`Downloading Official Sales Invoice & Escrow Receipt for Order #${order.id || order.orderId}\nVehicle: ${order.vehicleName}\nTotal Paid: $${Number(order.price).toLocaleString()}`);
  };

  return (
    <div className="bg-white p-4 rounded-3 border border-light shadow-sm font-sans">
      
      {/* Top Filter and Search Bar */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        
        {/* Status Filter Tabs */}
        <div className="btn-group p-1 bg-light rounded-3 border border-light" role="group">
          {['ALL', 'ACTIVE', 'COMPLETED'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilterTab(tab)}
              className={`btn btn-sm px-3 fw-bold rounded-2 transition-all ${
                filterTab === tab ? 'bg-danger text-white shadow-xs' : 'text-muted hover-text-dark'
              }`}
              style={{ fontSize: '12px' }}
            >
              {tab === 'ALL' ? 'All Orders' : tab.charAt(0) + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Right Search Input & Refresh Button */}
        <div className="d-flex align-items-center gap-2">
          <div className="position-relative" style={{ maxWidth: '300px', width: '100%' }}>
            <Search size={16} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
            <input
              type="text"
              className="form-control form-control-sm ps-5 bg-light border-light"
              placeholder="Search by model, ID or VIN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button 
            type="button"
            onClick={loadOrders}
            className="btn btn-outline-secondary btn-sm p-1.5"
            title="Refresh Orders"
          >
            <RefreshCw size={15} />
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-danger spinner-border-sm" role="status">
            <span className="visually-hidden">Loading orders...</span>
          </div>
          <span className="ms-2 text-muted small">Loading order history...</span>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-5 border border-dashed rounded-3">
          <ShoppingBag size={42} className="text-muted opacity-50 mb-2" />
          <h6 className="fw-bold text-dark">No orders found</h6>
          <p className="text-muted small mb-3">You don't have any vehicle purchases matching your criteria.</p>
          <Link to="/inventory" className="btn btn-brand-red btn-sm fw-bold px-3 py-2 text-uppercase">
            Browse Showroom
          </Link>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light text-muted small text-uppercase" style={{ fontSize: '11px' }}>
              <tr>
                <th scope="col" className="py-3">Vehicle Details</th>
                <th scope="col" className="py-3">Order # & Date</th>
                <th scope="col" className="py-3">Payment & Delivery</th>
                <th scope="col" className="py-3">Total Amount</th>
                <th scope="col" className="py-3">Status</th>
                <th scope="col" className="py-3 text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const isJustPlaced = order.isNewOrder;
                return (
                  <tr key={order.id || order.orderId} className={isJustPlaced ? 'table-warning bg-opacity-25' : ''}>
                    
                    {/* Vehicle Details */}
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={order.image || 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=300&q=80'}
                          alt={order.vehicleName}
                          className="rounded object-fit-cover shadow-xs border"
                          style={{ width: '64px', height: '44px' }}
                        />
                        <div>
                          <div className="d-flex align-items-center gap-1.5">
                            <Link
                              to={`/vehicle/${order.vehicleId || '1'}`}
                              className="fw-bold text-dark text-decoration-none hover-text-danger small"
                            >
                              {order.vehicleName}
                            </Link>
                            {isJustPlaced && (
                              <span className="badge bg-danger text-white px-1.5 py-0.5 fw-bold d-inline-flex align-items-center gap-0.5" style={{ fontSize: '9px' }}>
                                <Sparkles size={10} /> Just Ordered
                              </span>
                            )}
                          </div>
                          <small className="text-muted d-block" style={{ fontSize: '11px' }}>
                            VIN: {order.vin}
                          </small>
                          {order.sellerName && (
                            <small className="text-secondary" style={{ fontSize: '10px' }}>
                              Seller: {order.sellerName}
                            </small>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Order ID & Date */}
                    <td>
                      <span className="fw-bold text-dark d-block small">#{order.id || order.orderId}</span>
                      <small className="text-muted" style={{ fontSize: '11px' }}>{order.date}</small>
                    </td>

                    {/* Payment & Delivery */}
                    <td>
                      <span className="text-dark small d-block">{order.paymentMethod}</span>
                      <small className="text-muted" style={{ fontSize: '11px' }}>{order.deliveryType || 'Home Delivery'}</small>
                    </td>

                    {/* Total Amount */}
                    <td>
                      <span className="fw-black text-danger fs-6">${Number(order.price).toLocaleString()}</span>
                    </td>

                    {/* Status */}
                    <td>{getStatusBadge(order.status)}</td>

                    {/* Actions */}
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-1.5">
                        <Link
                          to={`/vehicle/${order.vehicleId || '1'}`}
                          className="btn btn-outline-secondary btn-sm p-1.5"
                          title="View Vehicle Details"
                        >
                          <Eye size={15} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => navigate('/buyer/messages')}
                          className="btn btn-outline-danger btn-sm p-1.5"
                          title="Chat with Seller"
                        >
                          <MessageSquare size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDownloadInvoice(order)}
                          className="btn btn-outline-dark btn-sm p-1.5"
                          title="Download Invoice"
                        >
                          <Download size={15} />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BuyerOrdersView;
