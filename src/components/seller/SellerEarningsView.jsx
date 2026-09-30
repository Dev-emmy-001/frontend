import React from 'react';
import { DollarSign, TrendingUp, CreditCard, ArrowUpRight, Download } from 'lucide-react';

const SellerEarningsView = () => {
  const earningsSummary = [
    { title: 'Gross Vehicle Sales', value: '$189,500', change: '+14.2%', icon: <DollarSign size={20} className="text-success" /> },
    { title: 'Available Balance', value: '$45,200', change: 'Ready for payout', icon: <CreditCard size={20} className="text-primary" /> },
    { title: 'Pending Settlement', value: '$26,490', change: '2 escrow transactions', icon: <TrendingUp size={20} className="text-warning" /> }
  ];

  const transactions = [
    { id: 'TX-901', vehicle: '2023 Toyota RAV4 XLE', date: 'May 23, 2025', gross: 26490, fee: 390, net: 26100, status: 'Completed' },
    { id: 'TX-900', vehicle: '2022 Honda Accord EX', date: 'May 22, 2025', gross: 24990, fee: 350, net: 24640, status: 'Completed' },
    { id: 'TX-899', vehicle: '2021 Ford F-150 XLT', date: 'May 15, 2025', gross: 33990, fee: 490, net: 33500, status: 'Completed' },
    { id: 'TX-898', vehicle: '2020 BMW 330i Sedan', date: 'May 02, 2025', gross: 29500, fee: 400, net: 29100, status: 'Completed' }
  ];

  return (
    <div>
      {/* 3 Metric Cards */}
      <div className="row g-3 mb-4">
        {earningsSummary.map((item, idx) => (
          <div key={idx} className="col-12 col-md-4">
            <div className="bg-white p-4 rounded-3 border border-light shadow-sm h-100">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small fw-semibold">{item.title}</span>
                <div className="p-2 rounded bg-light">{item.icon}</div>
              </div>
              <h3 className="fw-black text-dark m-0" style={{ fontWeight: '900' }}>{item.value}</h3>
              <small className="text-muted" style={{ fontSize: '11px' }}>{item.change}</small>
            </div>
          </div>
        ))}
      </div>

      {/* Payout & Transactions Table */}
      <div className="bg-white p-4 rounded-3 border border-light shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h6 className="fw-bold text-dark m-0">Transaction Settlement History</h6>
            <small className="text-muted">Breakdown of gross car sales, marketplace processing fees, and net payouts</small>
          </div>
          <button className="btn btn-outline-dark btn-sm d-flex align-items-center gap-1">
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light small text-muted text-uppercase" style={{ fontSize: '11px' }}>
              <tr>
                <th>Tx ID</th>
                <th>Vehicle Sold</th>
                <th>Date</th>
                <th>Gross Price</th>
                <th>Fee</th>
                <th>Net Payout</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="small">
              {transactions.map(tx => (
                <tr key={tx.id}>
                  <td className="fw-bold text-danger">{tx.id}</td>
                  <td className="fw-semibold text-dark">{tx.vehicle}</td>
                  <td className="text-muted">{tx.date}</td>
                  <td className="fw-bold text-dark">${tx.gross.toLocaleString()}</td>
                  <td className="text-muted">-${tx.fee}</td>
                  <td className="fw-black text-success" style={{ fontWeight: '900' }}>${tx.net.toLocaleString()}</td>
                  <td>
                    <span className="badge bg-success bg-opacity-10 text-success">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerEarningsView;
