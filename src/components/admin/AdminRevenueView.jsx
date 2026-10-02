import React from 'react';
import { DollarSign, TrendingUp, CreditCard, PieChart, ShieldCheck, ArrowUpRight } from 'lucide-react';

/**
 * AdminRevenueView Component
 * Platform financial metrics: transaction volume, commission fees, seller payouts, and escrow reserves.
 */
const AdminRevenueView = () => {
  const financialCards = [
    { title: 'Gross Merchandise Volume', value: '$2,450,000', subtext: 'Total car transaction value', change: '+14.2%', icon: <DollarSign size={20} className="text-success" /> },
    { title: 'Platform Commissions (1.5%)', value: '$36,750', subtext: 'Net earnings collected', change: '+11.8%', icon: <TrendingUp size={20} className="text-primary" /> },
    { title: 'Pending Escrow Holds', value: '$84,470', subtext: '3 vehicles under verification', change: 'Secured in escrow', icon: <CreditCard size={20} className="text-warning" /> },
    { title: 'Completed Payouts', value: '$2,328,780', subtext: 'Disbursed to sellers & dealers', change: '100% on schedule', icon: <ShieldCheck size={20} className="text-dark" /> }
  ];

  const recentTransactions = [
    { id: 'TXN-991', desc: 'Escrow Settlement - 2023 Toyota RAV4', party: 'Premier Motors Group', gross: '$26,490', fee: '+$397.35', netPayout: '$26,092.65', status: 'Settled', date: 'May 24, 2025' },
    { id: 'TXN-990', desc: 'Escrow Settlement - 2022 Honda Accord', party: 'Lone Star Auto Dealers', gross: '$24,990', fee: '+$374.85', netPayout: '$24,615.15', status: 'Settled', date: 'May 23, 2025' },
    { id: 'TXN-989', desc: 'Escrow Deposit - 2023 Camaro LT', party: 'David Miller', gross: '$28,990', fee: '+$434.85', netPayout: 'In Escrow', status: 'Holding', date: 'May 21, 2025' }
  ];

  return (
    <div>
      {/* Top Metric Cards */}
      <div className="row g-3 mb-4">
        {financialCards.map((c, idx) => (
          <div key={idx} className="col-12 col-sm-6 col-xl-3">
            <div className="bg-white p-3.5 rounded-3 border border-light shadow-sm h-100">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small fw-semibold">{c.title}</span>
                <div className="p-2 rounded-2 bg-light">{c.icon}</div>
              </div>
              <h3 className="fw-black text-dark m-0 mb-1" style={{ fontWeight: '900' }}>{c.value}</h3>
              <small className="text-muted d-block">{c.subtext}</small>
            </div>
          </div>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="bg-white p-4 rounded-3 border border-light shadow-sm">
        <h6 className="fw-bold text-dark mb-3">Recent Platform Financial Transactions</h6>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light small text-muted text-uppercase" style={{ fontSize: '11px' }}>
              <tr>
                <th>Transaction ID</th>
                <th>Description</th>
                <th>Seller / Dealer</th>
                <th>Gross Volume</th>
                <th>Platform Fee</th>
                <th>Seller Net Payout</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody className="small">
              {recentTransactions.map((t) => (
                <tr key={t.id}>
                  <td className="fw-bold text-dark">{t.id}</td>
                  <td>{t.desc}</td>
                  <td className="text-muted">{t.party}</td>
                  <td className="fw-bold text-dark">{t.gross}</td>
                  <td className="text-success fw-bold">{t.fee}</td>
                  <td className="fw-semibold text-dark">{t.netPayout}</td>
                  <td>
                    <span className={`badge ${t.status === 'Settled' ? 'bg-success bg-opacity-10 text-success' : 'bg-warning bg-opacity-10 text-warning'}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="text-muted">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminRevenueView;
