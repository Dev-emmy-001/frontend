import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, ShieldCheck,  CreditCard,  Users, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import autonexaLogo from '../assets/autonexa_logo.png';


const Signup = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', ConfirmPassword: '', password: '', role: 'buyer' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (formData.password != formData.confirmPassword) {
      return setError('Passwords do not match')
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      const role = res.data.user.role;
      if (role === 'admin') navigate('/admin-dashboard');
      else if (role === 'private_seller' || role === 'business_dealer') navigate('/seller-dashboard');
      else navigate('/buyer-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center p-3" style={{ backgroundColor: '#9ca3af' }}>



      {/* Main Container Card */}
      <div className="login-card-wrapper bg-white">
        <div className="row g-0">

          {/* Left Column: Dark Angled Hero Banner */}
          <div className="col-lg-6 hero-left-section d-flex flex-column justify-content-between p-4 p-md-5 text-white">
            <div className="hero-left-overlay"></div>

            {/* Logo Header */}
            <div className="hero-content">
              <img
                src={autonexaLogo}
                alt="AutoNexa Logo"
                style={{ width: '230px', height: 'auto', display: 'block' }}
              />
            </div>

            {/* Content Body */}
            <div className="hero-content my-auto py-4">
              <h2 className="fw-bold text-white mb-2" style={{ fontSize: '1.85rem' }}>  Join AutoNexa Marketplace </h2>
              <p className="text-white-50 small mb-4" style={{ fontSize: '0.85rem' }}>Create an account to continue</p>

              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center">
                  <div className="feature-icon-badge me-3">
                    <Car size={15} />
                  </div>
                  <span className="fw-semibold text-white small" style={{ fontSize: '0.85rem' }}>Buy or Sell Cars Easily</span>
                </div>

                <div className="d-flex align-items-center">
                  <div className="feature-icon-badge me-3">
                    <CreditCard size={15} />
                  </div>
                  <span className="fw-semibold text-white small" style={{ fontSize: '0.85rem' }}>Secure & Easy Transactions</span>
                </div>

                <div className="d-flex align-items-center">
                  <div className="feature-icon-badge me-3">
                    <ShieldCheck size={15} />
                  </div>
                  <span className="fw-semibold text-white small" style={{ fontSize: '0.85rem' }}>24/7 Customer Support</span>
                </div>
              </div>
            </div>

            {/* Empty footer area to align content */}
            <div className="hero-content"></div>
          </div>

          {/* Right Column: Clean White Form */}
          <div className="col-lg-6 d-flex align-items-center justify-content-center p-4 p-md-5 bg-white">
            <div className="w-100" style={{ maxWidth: '380px' }}>

              <div className="text-center mb-4">
                <h3 className="fw-bold text-dark mb-1" style={{ fontSize: '1.65rem' }}>Create Account</h3>
                <p className="text-muted small">Sign up to get started</p>
              </div>

              {error && <div className="alert alert-danger py-2 text-center small mb-3">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label text-dark fw-bold small mb-1">Full Name</label>
                  <input
                    type="email"
                    required
                    className="form-control form-control-custom"
                    placeholder="Enter your email"
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-dark fw-bold small mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    className="form-control form-control-custom"
                    placeholder="Enter your email"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label text-dark fw-bold small mb-1">Password</label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      className="form-control form-control-custom pe-5"
                      placeholder="Enter your password"
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>
                  </div>
                    <div className="mb-3">
                      <label className="form-label text-dark fw-bold small mb-1">Confirm Password</label>
                      <input
                        type="email"
                        required
                        className="form-control form-control-custom"
                        placeholder="Enter your email"
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      />
                    </div>

             
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-brand-red w-100 py-2.5 mb-4"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>

              {/* Or Divider */}
              <div className="position-relative text-center mb-4">
                <hr className="text-muted opacity-25" />
                <span className="position-absolute top-50 start-50 translate-middle bg-white px-2 text-muted small">
                  or
                </span>
              </div>

              {/* Social Login Buttons */}
              <div className="row g-2 mb-4">
                <div className="col">
                  <button type="button" className="btn social-btn w-100 d-flex align-items-center justify-content-center">
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                  </button>
                </div>

                <div className="col">
                  <button type="button" className="btn social-btn w-100 d-flex align-items-center justify-content-center">
                    <svg width="18" height="18" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                </div>

                <div className="col">
                  <button type="button" className="btn social-btn w-100 d-flex align-items-center justify-content-center">
                    <svg width="18" height="18" fill="#000000" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.1-.97.04-2.17.65-2.85 1.45-.61.71-1.15 1.87-.99 2.99 1.09.08 2.2-.52 2.85-1.34z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Sign up Link */}
              <p className="text-center text-muted small mb-0">
                Don't have an account?{' '}
                <Link to="/signup" className="text-danger fw-bold text-decoration-none">
                  Sign up
                </Link>
              </p>

            </div>
          </div>

        </div>
      </div>


    </div>
  );
};

export default Signup;