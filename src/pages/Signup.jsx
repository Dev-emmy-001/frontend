import React from 'react';
import AuthHeroBanner from '../components/auth/AuthHeroBanner';
import SignupForm from '../components/auth/SignupForm';
import { Car, CreditCard, ShieldCheck } from 'lucide-react';

const Signup = () => {
  const signupFeatures = [
    { icon: <Car size={15} />, text: 'Buy or Sell Cars Easily' },
    { icon: <CreditCard size={15} />, text: 'Secure & Easy Transactions' },
    { icon: <ShieldCheck size={15} />, text: '24/7 Customer Support' }
  ];

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center p-3" style={{ backgroundColor: '#ffffff' }}>
      {/* Main Container Card */}
      <div className="login-card-wrapper bg-white">
        <div className="row g-0">
          {/* Left Column: Dark Hero Banner with Smaller Logo */}
          <AuthHeroBanner 
            title="Join Summit Auto Group"
            subtitle="Create an account to continue"
            features={signupFeatures}
            logoWidth="175px"
          />

          {/* Right Column: Sign Up Form */}
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;