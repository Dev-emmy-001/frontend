import React from 'react';
import { Car, ShieldCheck, CreditCard } from 'lucide-react';
import logoImg from '../../assets/logo.png';

const AuthHeroBanner = ({
  title = 'Find your perfect match',
  subtitle = 'Sign in to your account to continue',
  features = [
    { icon: <Car size={15} />, text: 'Wide Selection of Vehicles' },
    { icon: <CreditCard size={15} />, text: 'Secure & Easy Transactions' },
    { icon: <ShieldCheck size={15} />, text: 'Trusted by Thousands' }
  ],
  logoWidth = '175px'
}) => {
  return (
    <div className="col-lg-6 hero-left-section d-flex flex-column justify-content-between p-4 p-md-5 text-white">
      <div className="hero-left-overlay"></div>

      {/* Logo Header with smaller, refined size */}
      <div className="hero-content">
        <img 
          src={logoImg} 
          alt="Summit Auto Group Logo" 
          style={{ 
            width: logoWidth, 
            maxWidth: '100%', 
            height: 'auto', 
            display: 'block' 
          }} 
        />
      </div>

      {/* Content Body */}
      <div className="hero-content my-auto py-4">
        <h2 className="fw-bold text-white mb-2" style={{ fontSize: '1.85rem' }}>
          {title}
        </h2>
        <p className="text-white-50 small mb-4" style={{ fontSize: '0.85rem' }}>
          {subtitle}
        </p>

        <div className="d-flex flex-column gap-3">
          {features.map((feature, idx) => (
            <div key={idx} className="d-flex align-items-center">
              <div className="feature-icon-badge me-3">
                {feature.icon}
              </div>
              <span className="fw-semibold text-white small" style={{ fontSize: '0.85rem' }}>
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Empty footer area to align content */}
      <div className="hero-content"></div>
    </div>
  );
};

export default AuthHeroBanner;
