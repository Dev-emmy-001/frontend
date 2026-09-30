import React from 'react';
import TopBar from '../components/common/TopBar';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HeroSection from '../components/home/HeroSection';
import PopularVehicles from '../components/home/PopularVehicles';
import ValueProps from '../components/home/ValueProps';
import PromoCards from '../components/home/PromoCards';
import TopBrands from '../components/home/TopBrands';

const Home = () => {
  return (
    <div className="bg-dark text-white min-vh-100 font-sans">
      {/* 1. Top Utility Marquee Bar */}
      <TopBar />

      {/* 2. Main Navigation Bar */}
      <Navbar />

      {/* 3. Hero Carousel & Quick Search */}
      <HeroSection />

      {/* 4. Popular Picks Inventory Grid */}
      <PopularVehicles />

      {/* 5. Value Proposition Bar */}
      <ValueProps />

      {/* 6. Promotional Banners */}
      <PromoCards />

      {/* 7. Brand Logos Carousel */}
      <TopBrands />

      {/* 8. Dealership Footer */}
      <Footer theme="dark" />
    </div>
  );
};

export default Home;