import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import api from '../../data/apiConfig';
import SocialAuthButtons from './SocialAuthButtons';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/auth/login', {
        email: formData.email.trim(),
        password: formData.password
      });

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
      if (res.data.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }

      const role = res.data.user?.role;
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else if (role === 'private_seller' || role === 'business_dealer') {
        navigate('/seller-dashboard');
      } else {
        navigate('/buyer-dashboard');
      }
    } catch (err) {
      console.error('Login failed:', err);
      const serverMessage = err.response?.data?.message || err.response?.data?.error;
      setError(serverMessage || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-lg-6 d-flex align-items-center justify-content-center p-4 p-md-5 bg-white">
      <div className="w-100" style={{ maxWidth: '380px' }}>
        
        <div className="text-center mb-4">
          <h3 className="fw-bold text-dark mb-1" style={{ fontSize: '1.65rem' }}>
            Welcome Back!
          </h3>
          <p className="text-muted small">Sign in to your account</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 px-3 text-center small mb-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-dark fw-bold small mb-1">
              Email Address
            </label>
            <input 
              type="email" 
              required 
              value={formData.email}
              className="form-control form-control-custom" 
              placeholder="Enter your email"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="mb-2">
            <label className="form-label text-dark fw-bold small mb-1">
              Password
            </label>
            <div className="position-relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                required 
                value={formData.password}
                className="form-control form-control-custom pe-5" 
                placeholder="Enter your password"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button 
                type="button" 
                className="position-absolute end-0 top-50 translate-middle-y text-muted border-0 bg-transparent p-3 d-flex align-items-center justify-content-center"
                style={{ cursor: 'pointer', zIndex: 10 }}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="text-end mb-4">
            <a href="#forgot" className="text-danger small fw-bold text-decoration-none hover-text-danger">
              Forgot Password?
            </a>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="btn btn-brand-red w-100 py-2.5 mb-4 animate-btn"
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
        <SocialAuthButtons />

        {/* Sign up Link */}
        <p className="text-center text-muted small mb-0">
          Don't have an account?{' '}
          <Link to="/signup" className="text-danger fw-bold text-decoration-none hover-text-danger">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LoginForm;
