import React from 'react';
import TopBar from '../components/common/TopBar';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import FinancingHero from '../components/financing/FinancingHero';
import FinancingSteps from '../components/financing/FinancingSteps';

const Financing = () => {
  return (
    <div className="bg-dark text-white min-vh-100 font-sans">
      {/* 1. Top Utility Marquee Bar */}
      <TopBar />

      {/* 2. Main Navigation Bar */}
      <Navbar />

      {/* 3. Financing Hero and Steps */}
      <div className="py-5">
        <div className="container py-4">
          <FinancingHero />
          <FinancingSteps />
        </div>
      </div>

      {/* 4. Dealership Footer */}
      <Footer theme="dark" />
    </div>
  );
};

export default Financing;