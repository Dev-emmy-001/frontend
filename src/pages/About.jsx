import React from 'react';
import TopBar from '../components/common/TopBar';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import NewsletterBanner from '../components/common/NewsletterBanner';
import AboutHero from '../components/about/AboutHero';
import AboutFeatures from '../components/about/AboutFeatures';
import OurStory from '../components/about/OurStory';
import AboutStats from '../components/about/AboutStats';

const About = () => {
  return (
    <div className="bg-light text-dark min-vh-100">
      {/* 1. Top Utility Marquee Bar */}
      <TopBar />

      {/* 2. Main Navigation Bar */}
      <Navbar />

      {/* 3. Hero Section */}
      <AboutHero />

      {/* 4. Four Core Feature Highlights */}
      <AboutFeatures />

      {/* 5. Our Story & Video Preview */}
      <OurStory />

      {/* 6. Company Statistics Bar */}
      <AboutStats />

      {/* 7. Newsletter Subscription Banner */}
      <NewsletterBanner 
        title="STAY UPDATED"
        subtitle="Subscribe to get special offers, updates, and the latest inventory."
        bgColor="#033B2B"
        btnColor="#065F46"
      />

      {/* 8. Dealership Footer */}
      <Footer theme="dark" />
    </div>
  );
};

export default About;