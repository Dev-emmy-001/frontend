import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import api from '../../data/apiConfig';
import SocialAuthButtons from './SocialAuthButtons';

const SignupForm = () => {
  const [formData, setFormData] = useState({ 
    fullName: '', 
    email: '', 
    phone: '',
    password: '', 
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match. Please re-enter.');
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters long.');
    }

    setLoading(true);

    try {
      const res = await api.post('/auth/register', {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        role: 'buyer'
      });

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
      if (res.data.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }

      navigate('/buyer-dashboard');
    } catch (err) {
      console.error('Registration failed:', err);
      const serverMessage = err.response?.data?.message || err.response?.data?.error;
      setError(serverMessage || 'Registration failed. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-lg-6 d-flex align-items-center justify-content-center p-4 p-md-5 bg-white">
      <div className="w-100" style={{ maxWidth: '420px' }}>

        <div className="text-center mb-3">
          <h3 className="fw-bold text-dark mb-1" style={{ fontSize: '1.65rem' }}>
            Create Account
          </h3>
          <p className="text-muted small">Join Summit Auto Group to explore and buy vehicles</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 px-3 text-center small mb-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-2.5">
            <label className="form-label text-dark fw-bold small mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              className="form-control form-control-custom"
              placeholder="e.g. Emmanuel Saka"
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          {/* Email Address */}
          <div className="mb-2.5">
            <label className="form-label text-dark fw-bold small mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              className="form-control form-control-custom"
              placeholder="e.g. name@example.com"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Phone Number (Optional) */}
          <div className="mb-2.5">
            <label className="form-label text-dark fw-bold small mb-1">
              Phone Number <span className="text-muted fw-normal">(Optional)</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              className="form-control form-control-custom"
              placeholder="e.g. (713) 555-0198"
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          {/* Password */}
          <div className="mb-2.5">
            <label className="form-label text-dark fw-bold small mb-1">
              Password *
            </label>
            <div className="position-relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                className="form-control form-control-custom pe-5"
                placeholder="Minimum 6 characters"
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

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label text-dark fw-bold small mb-1">
              Confirm Password *
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.confirmPassword}
              className="form-control form-control-custom"
              placeholder="Re-enter password"
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-brand-red w-100 py-2.5 mb-3 animate-btn"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {/* Or Divider */}
        <div className="position-relative text-center mb-3">
          <hr className="text-muted opacity-25 m-0" />
          <span className="position-absolute top-50 start-50 translate-middle bg-white px-2 text-muted small">
            or
          </span>
        </div>

        {/* Social Login Buttons */}
        <SocialAuthButtons />

        {/* Sign in Link */}
        <p className="text-center text-muted small mb-0">
          Already have an account?{' '}
          <Link to="/login" className="text-danger fw-bold text-decoration-none hover-text-danger">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
};

export default SignupForm;
