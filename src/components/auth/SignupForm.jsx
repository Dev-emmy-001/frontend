import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import SocialAuthButtons from './SocialAuthButtons';

const SignupForm = () => {
  const [formData, setFormData] = useState({ 
    fullName: '', 
    email: '', 
    password: '', 
    confirmPassword: '', 
    role: 'buyer' 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      const role = res.data.user?.role;
      if (role === 'admin') navigate('/admin-dashboard');
      else if (role === 'private_seller' || role === 'business_dealer') navigate('/seller-dashboard');
      else navigate('/buyer-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-lg-6 d-flex align-items-center justify-content-center p-4 p-md-5 bg-white">
      <div className="w-100" style={{ maxWidth: '380px' }}>

        <div className="text-center mb-4">
          <h3 className="fw-bold text-dark mb-1" style={{ fontSize: '1.65rem' }}>
            Create Account
          </h3>
          <p className="text-muted small">Sign up to get started</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 text-center small mb-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-dark fw-bold small mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              className="form-control form-control-custom"
              placeholder="Enter your full name"
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

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

          <div className="mb-3">
            <label className="form-label text-dark fw-bold small mb-1">
              Password
            </label>
            <div className="position-relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                className="form-control form-control-custom pe-5"
                placeholder="Create a password"
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

          <div className="mb-4">
            <label className="form-label text-dark fw-bold small mb-1">
              Confirm Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.confirmPassword}
              className="form-control form-control-custom"
              placeholder="Confirm your password"
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-brand-red w-100 py-2.5 mb-4"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
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

        {/* Sign in Link */}
        <p className="text-center text-muted small mb-0">
          Already have an account?{' '}
          <Link to="/login" className="text-danger fw-bold text-decoration-none">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
};

export default SignupForm;
