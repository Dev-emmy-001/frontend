import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const SellerRecentSales = () => {
  const sales = [
    {
      id: '1',
      title: '2023 Toyota RAV4 XLE',
      date: 'Sold on May 23',
      price: 26490,
      buyer: 'Michael S.',
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: '2',
      title: '2022 Honda Accord EX',
      date: 'Sold on May 22',
      price: 24990,
      buyer: 'Sarah W.',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: '3',
      title: '2021 Ford F-150 XLT',
      date: 'Sold on May 15',
      price: 33990,
      buyer: 'David K.',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=150&q=80'
    }
  ];

  return (
    <div className="col-lg-4">
      <div className="bg-white p-4 rounded-3 border border-light shadow-sm h-100 d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-bold text-dark m-0">Recent Sales</h6>
            <Link to="/seller-orders" className="text-danger small fw-bold text-decoration-none">
              View All
            </Link>
          </div>
          
          <div className="d-flex flex-column gap-3">
            {sales.map((sale) => (
              <div key={sale.id} className="d-flex align-items-center justify-content-between p-2.5 rounded-3 bg-light hover-bg-white border border-transparent hover-border-light transition-all">
                <div className="d-flex align-items-center gap-3">
                  <img 
                    src={sale.image} 
                    alt={sale.title} 
                    className="rounded object-fit-cover shadow-xs"
                    style={{ width: '48px', height: '36px' }}
                  />
                  <div>
                    <h6 className="fw-bold small text-dark m-0" style={{ fontSize: '13px' }}>
                      {sale.title}
                    </h6>
                    <span className="text-muted d-block" style={{ fontSize: '11px' }}>
                      {sale.date} • {sale.buyer}
                    </span>
                  </div>
                </div>
                <div className="text-end">
                  <span className="fw-black text-dark small d-block" style={{ fontWeight: '900' }}>
                    ${sale.price.toLocaleString()}
                  </span>
                  <span className="badge bg-success bg-opacity-10 text-success p-0" style={{ fontSize: '10px' }}>
                    Paid
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 pt-3 border-top border-light text-center">
          <Link to="/seller-earnings" className="text-secondary small text-decoration-none fw-semibold d-inline-flex align-items-center gap-1 hover-text-danger">
            <span>View detailed earnings report</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SellerRecentSales;
