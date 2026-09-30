import React from 'react';
import TopBar from '../components/common/TopBar';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import NewsletterBanner from '../components/common/NewsletterBanner';
import ContactHero from '../components/contact/ContactHero';
import ContactInfoCards from '../components/contact/ContactInfoCards';
import ContactForm from '../components/contact/ContactForm';
import LocationMap from '../components/contact/LocationMap';
import ContactCallout from '../components/contact/ContactCallout';

const Contact = () => {
  return (
    <div className="bg-light text-dark min-vh-100">
      {/* 1. Top Utility Marquee Bar */}
      <TopBar />

      {/* 2. Main Navigation Bar */}
      <Navbar />

      {/* 3. Hero Header with Car Visual */}
      <ContactHero />

      {/* 4. Floating Communication Channel Cards */}
      <ContactInfoCards />

      {/* 5. Message Form and Location Map */}
      <section className="container py-4 mb-4">
        <div className="bg-white rounded-4 p-4 p-md-5 shadow-sm border border-light">
          <div className="row g-5">
            <ContactForm />
            <LocationMap />
          </div>
          <ContactCallout />
        </div>
      </section>

      {/* 6. Newsletter Subscription Banner */}
      <NewsletterBanner 
        title="STAY CONNECTED"
        subtitle="Subscribe to get updates on new arrivals and special offers."
        bgColor="#033B2B"
        btnColor="#065F46"
      />

      {/* 7. Dealership Footer */}
      <Footer theme="dark" />
    </div>
  );
};

export default Contact;