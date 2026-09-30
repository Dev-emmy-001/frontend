import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  ExternalLink, 
  Download, 
  Eye, 
  CheckCircle, 
  Clock, 
  Truck, 
  FileText 
} from 'lucide-react';

/**
 * BuyerOrdersView Component
 * Provides a comprehensive order tracking and purchase history interface for buyers.
 */
const BuyerOrdersView = () => {
  const [filterTab, setFilterTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const allOrders = [
    {
      id: 'ORD-1025',
      vehicleId: '1',
      vehicleName: '2023 Toyota RAV4 XLE',
      vin: '4T3B1RFV5NU098124',
      date: 'May 14, 2026',
      price: 26490,
      status: 'Completed',
      paymentMethod: 'Direct Wire / Escrow',
      deliveryType: 'Home Delivery',
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
      paymentMethod: 'Financed (Summit Auto Capital)',
      deliveryType: 'Dealership Pickup',
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
      paymentMethod: 'Certified Bank Check',
      deliveryType: 'Home Delivery',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'ORD-1008',
      vehicleId: '4',
      vehicleName: '2023 Chevrolet Camaro LT',
      vin: '1G1FB1RX7N012849',
      date: 'Feb 15, 2026',
      price: 28990,
      status: 'In Transit',
      paymentMethod: 'Credit Card Deposit + Loan',
      deliveryType: 'Enclosed Carrier',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=300&q=80'
    }
  ];

  const filteredOrders = allOrders.filter((order) => {
    // Filter by tab
    if (filterTab === 'COMPLETED' && order.status !== 'Completed') return false;
    if (filterTab === 'ACTIVE' && order.status === 'Completed') return false;

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        order.vehicleName.toLowerCase().includes(q) ||
        order.id.toLowerCase().includes(q) ||
        order.vin.toLowerCase().includes(q)
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
        return <span className="badge bg-secondary bg-opacity-10 text-secondary px-2.5 py-1">{status}</span>;
    }
  };

  const handleDownloadInvoice = (orderId) => {
    alert(`Downloading receipt/invoice for Order #${orderId}...`);
  };

  return (
    <div className="bg-white p-4 rounded-3 border border-light shadow-sm">
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

        {/* Search Input */}
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
      </div>

      {/* Orders Table */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-5 border border-dashed rounded-3">
          <ShoppingBag size={42} className="text-muted opacity-50 mb-2" />
          <h6 className="fw-bold text-dark">No orders found</h6>
          <p className="text-muted small mb-3">You don't have any orders matching your criteria.</p>
          <Link to="/inventory" className="btn btn-brand-red btn-sm fw-bold px-3 py-2 text-uppercase">
            Browse Showroom
          </Link>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light text-muted small text-uppercase">
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
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  {/* Vehicle */}
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={order.image}
                        alt={order.vehicleName}
                        className="rounded object-fit-cover shadow-xs"
                        style={{ width: '60px', height: '42px' }}
                      />
                      <div>
                        <Link
                          to={`/vehicle/${order.vehicleId || ''}`}
                          className="fw-bold text-dark text-decoration-none hover-text-danger d-block small"
                        >
                          {order.vehicleName}
                        </Link>
                        <small className="text-muted" style={{ fontSize: '11px' }}>
                          VIN: {order.vin}
                        </small>
                      </div>
                    </div>
                  </td>

                  {/* Order Info */}
                  <td>
                    <span className="fw-bold text-dark d-block small">#{order.id}</span>
                    <small className="text-muted" style={{ fontSize: '11px' }}>{order.date}</small>
                  </td>

                  {/* Payment & Delivery */}
                  <td>
                    <span className="text-dark small d-block">{order.paymentMethod}</span>
                    <small className="text-muted" style={{ fontSize: '11px' }}>{order.deliveryType}</small>
                  </td>

                  {/* Total */}
                  <td>
                    <span className="fw-bold text-dark fs-6">${Number(order.price).toLocaleString()}</span>
                  </td>

                  {/* Status */}
                  <td>{getStatusBadge(order.status)}</td>

                  {/* Actions */}
                  <td className="text-end">
                    <div className="d-flex justify-content-end gap-1">
                      <Link
                        to={`/vehicle/${order.vehicleId || ''}`}
                        className="btn btn-outline-secondary btn-sm p-1.5"
                        title="View Vehicle"
                      >
                        <Eye size={15} />
                      </Link>
                      <button
                        onClick={() => handleDownloadInvoice(order.id)}
                        className="btn btn-outline-dark btn-sm p-1.5"
                        title="Download Invoice"
                      >
                        <Download size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BuyerOrdersView;
