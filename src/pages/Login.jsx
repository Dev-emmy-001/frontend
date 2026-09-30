import React from 'react';
import AuthHeroBanner from '../components/auth/AuthHeroBanner';
import LoginForm from '../components/auth/LoginForm';
import { Car, CreditCard, ShieldCheck } from 'lucide-react';

const Login = () => {
  const loginFeatures = [
    { icon: <Car size={15} />, text: 'Wide Selection of Vehicles' },
    { icon: <CreditCard size={15} />, text: 'Secure & Easy Transactions' },
    { icon: <ShieldCheck size={15} />, text: 'Trusted by Thousands' }
  ];

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center p-3" style={{ backgroundColor: '#ffffff' }}>
      {/* Main Container Card */}
      <div className="login-card-wrapper bg-white">
        <div className="row g-0">
          {/* Left Column: Dark Hero Banner with Smaller Logo */}
          <AuthHeroBanner 
            title="Find your perfect match"
            subtitle="Sign in to your account to continue"
            features={loginFeatures}
            logoWidth="175px"
          />

          {/* Right Column: Sign In Form */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;