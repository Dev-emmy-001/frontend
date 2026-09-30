import React from 'react';
import { Link } from 'react-router-dom';

const ContactHero = () => {
  return (
    <section className="container pt-5 pb-4">
      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb small">
          <li className="breadcrumb-item">
            <Link to="/" className="text-secondary text-decoration-none">Home</Link>
          </li>
          <li className="breadcrumb-item active text-dark fw-semibold" aria-current="page">
            Contact Us
          </li>
        </ol>
      </nav>

      <div className="row align-items-center g-4">
        <div className="col-lg-6">
          <h1 className="display-4 fw-black text-dark mb-2">
            CONTACT <span className="text-success" style={{ color: '#065F46' }}>US</span>
          </h1>
          <p className="text-secondary fs-6 leading-relaxed m-0" style={{ maxWidth: '480px' }}>
            We're here to help! Reach out to us with any questions or visit us at our location.
          </p>
        </div>

        <div className="col-lg-6 text-center">
          <img 
            src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80" 
            alt="Dealership Contact Vehicle" 
            className="img-fluid object-fit-contain"
            style={{ maxHeight: '280px' }}
          />
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
