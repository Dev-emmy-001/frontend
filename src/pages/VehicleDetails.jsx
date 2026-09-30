import React from 'react';
import TopBar from '../components/common/TopBar';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import VehicleDetailsContent from '../components/buyer/VehicleDetails';

/**
 * VehicleDetails Page
 * Public facing vehicle details page with top navigation, breadcrumbs, specifications, modals, and footer.
 */
const VehicleDetails = () => {
  return (
    <div className="bg-light text-dark min-vh-100 font-sans d-flex flex-column justify-content-between">
      <div>
        {/* 1. Top Utility Marquee Bar */}
        <TopBar />

        {/* 2. Main Navigation Bar */}
        <Navbar />

        {/* 3. Main Vehicle Details Content */}
        <VehicleDetailsContent />
      </div>

      {/* 4. Footer */}
      <Footer theme="dark" />
    </div>
  );
};

export default VehicleDetails;
