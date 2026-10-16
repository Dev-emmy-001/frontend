import React from 'react';
import { Lock, ShieldCheck, Award } from 'lucide-react';

/**
 * SecurityBadges Component
 * Trust signals reinforcing customer confidence during checkout
 */
export const SecurityBadges = () => {
  return (
    <div className="d-flex flex-wrap justify-content-center align-items-center gap-4 pt-3 text-muted small">
      <div className="d-flex align-items-center gap-1.5" style={{ fontSize: '11px' }}>
        <Lock size={14} className="text-success" />
        <span>256-Bit SSL Encryption</span>
      </div>
      <div className="d-flex align-items-center gap-1.5" style={{ fontSize: '11px' }}>
        <ShieldCheck size={14} className="text-primary" />
        <span>100% Escrow Protection</span>
      </div>
      <div className="d-flex align-items-center gap-1.5" style={{ fontSize: '11px' }}>
        <Award size={14} className="text-danger" />
        <span>Certified Vehicle Guarantee</span>
      </div>
    </div>
  );
};

export default SecurityBadges;
