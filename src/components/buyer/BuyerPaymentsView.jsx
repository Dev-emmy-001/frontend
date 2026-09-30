import React from 'react';
import { CreditCard, DollarSign, Download, CheckCircle, Clock, ShieldCheck, Plus, ArrowUpRight } from 'lucide-react';

/**
 * BuyerPaymentsView Component
 * Displays the buyer's payment history, escrow milestones, and saved payment methods.
 */
const BuyerPaymentsView = () => {
  const transactions = [
    {
      id: 'TXN-9841',
      vehicle: '2023 Toyota RAV4 XLE',
      amount: 26490,
      method: 'Wire Transfer •••• 9102',
      date: 'May 14, 2026',
      status: 'Paid',
      receiptUrl: '#'
    },
    {
      id: 'TXN-9730',
      vehicle: '2022 Honda Accord EX (Deposit)',
      amount: 2500,
      method: 'Visa •••• 4242',
      date: 'Apr 28, 2026',
      status: 'In Escrow',
      receiptUrl: '#'
    },
    {
      id: 'TXN-9611',
      vehicle: '2021 Ford F-150 XLT',
      amount: 33990,
      method: 'Summit Auto Capital Loan',
      date: 'Mar 10, 2026',
      status: 'Paid',
      receiptUrl: '#'
    }
  ];

  return (
    <div className="d-flex flex-column gap-4">
      {/* Top Stats & Payment Methods Row */}
      <div className="row g-4">
        {/* Balance & Total Paid */}
        <div className="col-lg-5">
          <div className="bg-white p-4 rounded-3 border border-light shadow-sm h-100 d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted small fw-semibold">Total Payments Made</span>
                <span className="badge bg-success bg-opacity-10 text-success">Verified Escrow</span>
              </div>
              <h2 className="fw-black text-dark m-0 display-6" style={{ fontWeight: '900' }}>
                $62,980.00
              </h2>
              <p className="text-muted small mt-1">Across 3 vehicle purchases and escrow reservations.</p>
            </div>

            <div className="p-3 bg-light rounded-3 border border-light d-flex align-items-center gap-3 mt-3">
              <ShieldCheck size={28} className="text-success flex-shrink-0" />
              <div>
                <strong className="text-dark small d-block">Summit Escrow Protection</strong>
                <small className="text-muted" style={{ fontSize: '11px' }}>
                  All high-value vehicle funds are held securely until physical delivery and inspection sign-off.
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Saved Payment Methods */}
        <div className="col-lg-7">
          <div className="bg-white p-4 rounded-3 border border-light shadow-sm h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold text-dark m-0">Payment Methods</h6>
              <button 
                onClick={() => alert('Add payment method modal')} 
                className="btn btn-outline-dark btn-sm fw-bold d-flex align-items-center gap-1"
              >
                <Plus size={14} />
                <span>Add Method</span>
              </button>
            </div>

            <div className="row g-2">
              <div className="col-12 col-md-6">
                <div className="p-3 rounded-3 border border-danger border-opacity-50 bg-light bg-opacity-50 position-relative">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-danger text-white" style={{ fontSize: '10px' }}>PRIMARY</span>
                    <CreditCard size={18} className="text-danger" />
                  </div>
                  <strong className="text-dark d-block">Chase Premier Checking</strong>
                  <span className="text-muted small d-block">•••• 9102 • Routing 111000614</span>
                  <small className="text-success fw-bold mt-1 d-block" style={{ fontSize: '11px' }}>✓ Verified for Wire & ACH</small>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="p-3 rounded-3 border border-light bg-light position-relative">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-secondary" style={{ fontSize: '10px' }}>SECONDARY</span>
                    <CreditCard size={18} className="text-secondary" />
                  </div>
                  <strong className="text-dark d-block">Visa Signature Card</strong>
                  <span className="text-muted small d-block">•••• 4242 • Exp 08/28</span>
                  <small className="text-muted mt-1 d-block" style={{ fontSize: '11px' }}>Used for reservation deposits</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="bg-white p-4 rounded-3 border border-light shadow-sm">
        <h6 className="fw-bold text-dark mb-3">Transaction History</h6>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light text-muted small text-uppercase">
              <tr>
                <th scope="col" className="py-3">Transaction ID</th>
                <th scope="col" className="py-3">Vehicle / Purpose</th>
                <th scope="col" className="py-3">Payment Channel</th>
                <th scope="col" className="py-3">Date</th>
                <th scope="col" className="py-3">Amount</th>
                <th scope="col" className="py-3">Status</th>
                <th scope="col" className="py-3 text-end">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id}>
                  <td><span className="fw-bold text-dark small">#{txn.id}</span></td>
                  <td><span className="text-dark fw-semibold small">{txn.vehicle}</span></td>
                  <td><span className="text-muted small">{txn.method}</span></td>
                  <td><span className="text-muted small">{txn.date}</span></td>
                  <td><strong className="text-dark">${Number(txn.amount).toLocaleString()}</strong></td>
                  <td>
                    {txn.status === 'Paid' ? (
                      <span className="badge bg-success bg-opacity-10 text-success px-2 py-1">
                        <CheckCircle size={11} className="me-1 inline-block" /> Paid
                      </span>
                    ) : (
                      <span className="badge bg-warning bg-opacity-10 text-warning px-2 py-1">
                        <Clock size={11} className="me-1 inline-block" /> In Escrow
                      </span>
                    )}
                  </td>
                  <td className="text-end">
                    <button 
                      onClick={() => alert(`Downloading official PDF receipt for ${txn.id}`)}
                      className="btn btn-outline-secondary btn-sm p-1.5" 
                      title="Download receipt"
                    >
                      <Download size={14} />
                    </button>
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

export default BuyerPaymentsView;
