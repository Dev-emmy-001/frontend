import React from 'react';
import { Landmark, Copy, Check, Info } from 'lucide-react';

/**
 * BankTransferDetails Component
 * Displays verified escrow wire transfer instructions and reference details
 */
export const BankTransferDetails = ({ referenceId = 'ORD-WIRE-HOLD' }) => {
  const [copied, setCopied] = React.useState(false);

  const wireDetails = {
    bankName: 'JPMorgan Chase Bank, N.A.',
    accountName: 'Motors Escrow Fiduciary Services LLC',
    accountNumber: '8942-0192-3841',
    routingNumber: '021000021',
    swiftBic: 'CHASUS33XXX',
    reference: referenceId
  };

  const handleCopyReference = () => {
    navigator.clipboard.writeText(wireDetails.reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-light p-3.5 rounded-3 border border-light mb-4 text-start">
      <div className="d-flex align-items-center gap-2 mb-2">
        <Landmark size={18} className="text-danger flex-shrink-0" />
        <strong className="text-dark small">Escrow Bank Wire Instructions</strong>
      </div>

      <p className="text-muted small mb-3" style={{ fontSize: '12px' }}>
        Initiate a domestic wire or ACH transfer to our escrow account. Funds will be held in escrow until vehicle inspection is complete.
      </p>

      <div className="bg-white p-3 rounded-2 border border-light mb-3 space-y-2 small">
        <div className="d-flex justify-content-between py-1 border-bottom border-light">
          <span className="text-muted">Bank Name:</span>
          <strong className="text-dark">{wireDetails.bankName}</strong>
        </div>
        <div className="d-flex justify-content-between py-1 border-bottom border-light">
          <span className="text-muted">Beneficiary:</span>
          <strong className="text-dark">{wireDetails.accountName}</strong>
        </div>
        <div className="d-flex justify-content-between py-1 border-bottom border-light">
          <span className="text-muted">Account Number:</span>
          <strong className="text-dark font-monospace">{wireDetails.accountNumber}</strong>
        </div>
        <div className="d-flex justify-content-between py-1 border-bottom border-light">
          <span className="text-muted">Routing / ABA:</span>
          <strong className="text-dark font-monospace">{wireDetails.routingNumber}</strong>
        </div>
        <div className="d-flex justify-content-between py-1">
          <span className="text-muted">Payment Reference:</span>
          <div className="d-flex align-items-center gap-1.5">
            <strong className="text-danger font-monospace">{wireDetails.reference}</strong>
            <button
              type="button"
              onClick={handleCopyReference}
              className="btn btn-sm btn-outline-secondary p-0 px-1 border-0"
              title="Copy Reference"
            >
              {copied ? <Check size={12} className="text-success" /> : <Copy size={12} />}
            </button>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center gap-1.5 text-muted small" style={{ fontSize: '11px' }}>
        <Info size={14} className="text-primary flex-shrink-0" />
        <span>Please include your reference code in the wire memo for automatic order matching.</span>
      </div>
    </div>
  );
};

export default BankTransferDetails;
