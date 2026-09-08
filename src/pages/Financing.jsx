import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, CheckCircle, CreditCard } from 'lucide-react';

const Financing = () => {
  return (
    <div className="bg-dark text-white min-vh-100 py-5">
      <div className="container py-4">
        <div className="text-center max-w-xl mx-auto mb-5">
          <span className="text-danger fw-bold text-uppercase small">FAST & SECURE</span>
          <h1 className="fw-black text-uppercase display-5">AUTO FINANCING MADE SIMPLE</h1>
          <p className="text-secondary">Get pre-approved in minutes with competitive interest rates tailored to your credit profile.</p>
        </div>

        <div className="row g-4 justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="bg-black border border-secondary p-4 rounded-3 text-center h-100">
              <Calculator size={40} className="text-danger mb-3" />
              <h5 className="fw-bold text-uppercase">1. Apply Online</h5>
              <p className="text-secondary small">Fill out our secure 2-minute pre-approval application form.</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="bg-black border border-secondary p-4 rounded-3 text-center h-100">
              <CreditCard size={40} className="text-danger mb-3" />
              <h5 className="fw-bold text-uppercase">2. Choose Terms</h5>
              <p className="text-secondary small">Select your customized monthly payment plan and down payment amount.</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="bg-black border border-secondary p-4 rounded-3 text-center h-100">
              <CheckCircle size={40} className="text-danger mb-3" />
              <h5 className="fw-bold text-uppercase">3. Drive Home</h5>
              <p className="text-secondary small">Finalize your contract online and pick up your vehicle or schedule delivery.</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <Link to="/signup" className="btn btn-brand-red px-5 py-3 fw-bold text-uppercase">START PRE-APPROVAL</Link>
        </div>
      </div>
    </div>
  );
};

export default Financing;