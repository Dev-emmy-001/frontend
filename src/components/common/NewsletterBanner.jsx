import React, { useState } from 'react';

const NewsletterBanner = ({ 
  title = 'STAY UPDATED', 
  subtitle = 'Subscribe to get special offers, updates, and the latest inventory.',
  bgColor = '#033B2B',
  btnColor = '#065F46'
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <section className="py-4 text-white" style={{ backgroundColor: bgColor }}>
      <div className="container">
        <div className="row align-items-center g-3">
          
          <div className="col-lg-6">
            <h6 className="fw-bold text-uppercase m-0">{title}</h6>
            <small className="text-light opacity-75">{subtitle}</small>
          </div>

          <div className="col-lg-6">
            {subscribed ? (
              <div className="alert alert-success py-2 px-3 m-0 small fw-bold">
                ✓ Thank you for subscribing to our newsletter!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="input-group">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control bg-white text-dark border-0 px-3" 
                  placeholder="Enter your email address"
                  aria-label="Email Address"
                />
                <button 
                  type="submit" 
                  className="btn btn-success fw-bold px-4 text-uppercase" 
                  style={{ backgroundColor: btnColor, borderColor: btnColor }}
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default NewsletterBanner;
