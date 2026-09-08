import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Car, ShieldCheck, Tag, Play, Star, MapPin, Phone, Mail, Send,  } from 'lucide-react';
import axios from 'axios';
import logoImg from '../assets/logo.png';

const About = () => {
  return (
    <div className="bg-light text-dark min-vh-100">

          {/* 1. TOP UTILITY BAR */}
              <div className="bg-black text-white-50 py-2 border-bottom border-secondary small marquee-container">
                <div className="marquee-content d-flex gap-5 align-items-center">
                  <span className="d-flex align-items-center gap-1 text-white-50">
                    <MapPin size={14} className="text-danger" /> 2500 West Loop South, Houston, TX 77027
                  </span>
                  <span className="d-flex align-items-center gap-1 text-white-50">
                    <Phone size={14} className="text-danger" /> (713) 555-0198
                  </span>
                  <span>Sales: Mon - Sat 9am - 7pm</span>
                  <span>|</span>
                  <span>Service: Mon - Sat 7am - 6pm</span>
                  <div className="d-flex gap-2 ms-2">
                    {/* Facebook */}
                    <a href="#facebook" className="text-white-50 hover-text-white">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                    </a>
                    {/* Instagram */}
                    <a href="#instagram" className="text-white-50 hover-text-white">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                    </a>
                    {/* Youtube */}
                    <a href="#youtube" className="text-white-50 hover-text-white">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>
                    </a>
                  </div>
                </div>
              </div>
        
              {/* 2. MAIN NAVBAR */}
              <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm ">
                <div className="container">
                  {/* Logo as Image Tag */}
                  <Link to="/" className="navbar-brand d-flex align-items-center me-4">
                    <img 
                      src={logoImg} 
                      alt="AUTONEXA"     
                      style={{ height: '50px', width: 'auto', objectFit: 'contain' }}
                    />
                  </Link>
        
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span className="navbar-toggler-icon"></span>
                  </button>
        
                  <div className="collapse navbar-collapse ms-5" id="navbarContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-bold small uppercase align-items-center gap-2">
                      <li className="nav-item">
                        <Link className="nav-link active text-danger px-2 border-bottom border-danger border-2 pb-1" to="/" style={{ color: '#D91C24' }}>HOME</Link>
                      </li>
                      <li className="nav-item"><Link className="nav-link text-dark px-2" to="/inventory">INVENTORY</Link></li>
                      <li className="nav-item dropdown">
                        <a className="nav-link text-dark px-2 dropdown-toggle" href="#shop-by-type" role="button" data-bs-toggle="dropdown">
                          SHOP BY TYPE
                        </a>
                      </li>
                      <li className="nav-item"><Link className="nav-link text-dark px-2" to="/financing">FINANCING</Link></li>
                      <li className="nav-item"><Link className="nav-link text-dark px-2" to="/about">ABOUT US</Link></li>
                      <li className="nav-item"><Link className="nav-link text-dark px-2" to="/contact">CONTACT</Link></li>
                    </ul>
        
                    <div className="d-flex align-items-center gap-3">
                      <Link to="/login" className="text-dark fw-bold text-decoration-none small text-uppercase hover-text-danger me-2" style={{ transition: 'color 0.2s' }}>
                        LOGIN
                      </Link>
                      <Link to="/signup" className="btn btn-brand-red btn-sm fw-bold px-4 py-2 text-uppercase text-white animate-btn" style={{ backgroundColor: '#D91C24', border: 'none', borderRadius: '4px' }}>
                        GET PRE-APPROVED
                      </Link>
                    </div>
                  </div>
                </div>
              </nav>
      
      {/* 1. HERO SECTION */}
      <section className="container py-5">
       

        <div className="row align-items-center g-5">
          {/* Hero Left Content */}
          <div className="col-lg-6">
            <h1 className="display-4 fw-black text-dark mb-3">
              ABOUT <span className="text-success" style={{ color: '#065F46' }}>SUMMIT</span> <br />
              <span className="text-success" style={{ color: '#065F46' }}>AUTO GROUP</span>
            </h1>
            <p className="text-secondary fs-6 leading-relaxed mb-0" style={{ maxWidth: '520px' }}>
              For over a decade, Summit Auto Group has been helping drivers find the perfect vehicle with honesty, transparency, and a commitment to exceptional service.
            </p>
          </div>

          {/* Hero Right Dealership Image */}
          <div className="col-lg-6">
            <div className="rounded-4 overflow-hidden shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80" 
                alt="Summit Auto Group Building" 
                className="w-100 object-fit-cover"
                style={{ maxHeight: '380px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. TOP 4 VALUE PROPOSITION CARDS */}
      <section className="container py-4">
        <div className="row g-4">
          
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="about-feature-card p-4 h-100">
              <div className="icon-box-green mb-3">
                <Award size={22} />
              </div>
              <h6 className="fw-bold text-dark mb-1">10+ Years of Experience</h6>
              <p className="text-secondary small m-0">Serving our community with quality vehicles since 2013.</p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="about-feature-card p-4 h-100">
              <div className="icon-box-green mb-3">
                <Car size={22} />
              </div>
              <h6 className="fw-bold text-dark mb-1">Thousands of Happy Customers</h6>
              <p className="text-secondary small m-0">Join thousands of satisfied customers who trust us.</p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="about-feature-card p-4 h-100">
              <div className="icon-box-green mb-3">
                <ShieldCheck size={22} />
              </div>
              <h6 className="fw-bold text-dark mb-1">Quality You Can Trust</h6>
              <p className="text-secondary small m-0">Every vehicle is thoroughly inspected for your peace of mind.</p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="about-feature-card p-4 h-100">
              <div className="icon-box-green mb-3">
                <Tag size={22} />
              </div>
              <h6 className="fw-bold text-dark mb-1">Best Price Guarantee</h6>
              <p className="text-secondary small m-0">We offer competitive prices and unbeatable value.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. OUR STORY SECTION */}
      <section className="container py-5">
        <div className="row align-items-center g-5">
          
          {/* Left Video Overlay Car Image */}
          <div className="col-lg-6">
            <div className="position-relative rounded-4 overflow-hidden shadow">
              <img 
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80" 
                alt="Car driving on road" 
                className="w-100 object-fit-cover"
                style={{ height: '360px' }}
              />
              
              {/* Watch Our Story Play Button Card */}
              <div className="position-absolute bottom-0 start-0 m-3 p-3 video-play-badge d-flex align-items-center gap-3">
                <button className="btn btn-success rounded-circle p-2.5 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#065F46', borderColor: '#065F46' }}>
                  <Play size={18} fill="#ffffff" />
                </button>
                <div>
                  <h6 className="fw-bold text-dark m-0 small">Watch Our Story</h6>
                  <span className="text-secondary" style={{ fontSize: '11px' }}>See how we're making a difference</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Text Content */}
          <div className="col-lg-6">
            <span className="text-success fw-bold text-uppercase tracking-wider small" style={{ color: '#065F46' }}>
              OUR STORY
            </span>
            <h2 className="display-6 fw-black text-dark mb-3">
              Driven by Excellence. <br />Focused on You.
            </h2>
            <p className="text-secondary small leading-relaxed mb-3">
              Summit Auto Group was founded with a simple mission: to provide a better car buying experience. We believe in building lasting relationships with our customers by offering a wide selection of reliable vehicles, flexible financing options, and unmatched customer service.
            </p>
            <p className="text-secondary small leading-relaxed mb-4">
              Whether you're buying your first car or upgrading to your dream vehicle, our team is here to guide you every step of the way.
            </p>

            <Link to="/inventory" className="btn btn-brand-green px-4 py-2.5 text-uppercase small">
              VIEW OUR INVENTORY
            </Link>
          </div>

        </div>
      </section>

      {/* 4. STATS COUNTER BAR */}
      <section className="container py-3 mb-5">
        <div className="stats-bar-wrapper p-4 text-center">
          <div className="row g-4">
            
            <div className="col-6 col-md-3">
              <Award size={24} className="text-success mb-2" style={{ color: '#065F46' }} />
              <h3 className="fw-black text-dark m-0">10+</h3>
              <span className="text-secondary small">Years in Business</span>
            </div>

            <div className="col-6 col-md-3">
              <Car size={24} className="text-success mb-2" style={{ color: '#065F46' }} />
              <h3 className="fw-black text-dark m-0">5,000+</h3>
              <span className="text-secondary small">Vehicles Sold</span>
            </div>

            <div className="col-6 col-md-3">
              <Star size={24} className="text-success mb-2" style={{ color: '#065F46' }} />
              <h3 className="fw-black text-dark m-0">4.8/5</h3>
              <span className="text-secondary small">Customer Rating</span>
            </div>

            <div className="col-6 col-md-3">
              <MapPin size={24} className="text-success mb-2" style={{ color: '#065F46' }} />
              <h3 className="fw-black text-dark m-0">3</h3>
              <span className="text-secondary small">Locations</span>
            </div>

          </div>
        </div>
      </section>

      {/* 5. NEWSLETTER BANNER */}
      <section className="py-4 text-white" style={{ backgroundColor: '#033B2B' }}>
        <div className="container">
          <div className="row align-items-center g-3">
            
            <div className="col-lg-6">
              <h6 className="fw-bold text-uppercase m-0">STAY UPDATED</h6>
              <small className="text-light opacity-75">Subscribe to get special offers, updates, and the latest inventory.</small>
            </div>

            <div className="col-lg-6">
              <div className="input-group">
                <input 
                  type="email" 
                  className="form-control bg-white text-dark border-0 px-3" 
                  placeholder="Enter your email address"
                />
                <button className="btn btn-success fw-bold px-4 text-uppercase" style={{ backgroundColor: '#065F46', borderColor: '#065F46' }}>
                  SUBSCRIBE
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
   {/* 8. FOOTER */}
      <footer className="bg-black text-white-50 pt-5 pb-3 border-top border-secondary">
        <div className="container">
          <div className="row g-4">
            
            {/* Footer Column 1 */}
            <div className="col-lg-3 col-md-6 col-12">
              <img src={logoImg} alt="SUMMIT AUTO GROUP" className="mb-3" style={{ height: '40px', width: 'auto' }} />
              <p className="small mb-4" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                We're more than a dealership. We're your automotive partner for life.
              </p>
              <div className="d-flex gap-2">
                {/* Social icons */}
                <a href="#fb" className="text-white-50 hover-text-white d-flex align-items-center justify-content-center border border-secondary rounded-circle" style={{ width: '32px', height: '32px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
                <a href="#ig" className="text-white-50 hover-text-white d-flex align-items-center justify-content-center border border-secondary rounded-circle" style={{ width: '32px', height: '32px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                </a>
                <a href="#yt" className="text-white-50 hover-text-white d-flex align-items-center justify-content-center border border-secondary rounded-circle" style={{ width: '32px', height: '32px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>
                </a>
                <a href="#tk" className="text-white-50 hover-text-white d-flex align-items-center justify-content-center border border-secondary rounded-circle" style={{ width: '32px', height: '32px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
                </a>
              </div>
            </div>

            {/* Footer Column 2 */}
            <div className="col-lg-3 col-md-6 col-12">
              <h6 className="text-white fw-bold text-uppercase small mb-3">QUICK LINKS</h6>
              <ul className="list-unstyled d-flex flex-column gap-2 small" style={{ fontSize: '13px' }}>
                <li><Link to="/inventory" className="text-white-50 text-decoration-none hover-text-white">Inventory</Link></li>
                <li><Link to="/inventory" className="text-white-50 text-decoration-none hover-text-white">Shop by Type</Link></li>
                <li><Link to="/financing" className="text-white-50 text-decoration-none hover-text-white">Financing</Link></li>
                <li><Link to="/specials" className="text-white-50 text-decoration-none hover-text-white">Specials</Link></li>
                <li><Link to="/service-parts" className="text-white-50 text-decoration-none hover-text-white">Service & Parts</Link></li>
                <li><Link to="/about" className="text-white-50 text-decoration-none hover-text-white">About Us</Link></li>
                <li><Link to="/contact" className="text-white-50 text-decoration-none hover-text-white">Contact Us</Link></li>
              </ul>
            </div>

            {/* Footer Column 3 */}
            <div className="col-lg-3 col-md-6 col-12">
              <h6 className="text-white fw-bold text-uppercase small mb-3">CUSTOMER CARE</h6>
              <ul className="list-unstyled d-flex flex-column gap-3 small text-white-50" style={{ fontSize: '13px' }}>
                <li className="d-flex align-items-start gap-2">
                  <Phone size={16} className="text-danger flex-shrink-0 mt-0.5" />
                  <span>(713) 555-0198</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <Mail size={16} className="text-danger flex-shrink-0 mt-0.5" />
                  <span className="text-break">info@summitautogroup.com</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <MapPin size={16} className="text-danger flex-shrink-0 mt-0.5" />
                  <span>2500 West Loop South<br />Houston, TX 77027</span>
                </li>
              </ul>
            </div>

            {/* Footer Column 4 */}
            <div className="col-lg-3 col-md-6 col-12">
              <h6 className="text-white fw-bold text-uppercase small mb-3">HOURS</h6>
              <div className="small text-white-50" style={{ fontSize: '13px' }}>
                <div className="mb-3">
                  <strong className="text-white d-block mb-1">Sales</strong>
                  <div className="d-flex justify-content-between">
                    <span>Mon - Sat</span>
                    <span>9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
                <div>
                  <strong className="text-white d-block mb-1">Service</strong>
                  <div className="d-flex justify-content-between">
                    <span>Mon - Sat</span>
                    <span>7:00 AM - 6:00 PM</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Copyright Bottom Bar */}
          <div className="border-top border-secondary mt-5 pt-3 d-flex justify-content-between align-items-center flex-wrap gap-2 small text-white-50" style={{ fontSize: '12px' }}>
            <span>© 2024 Summit Auto Group. All rights reserved.</span>
            <div className="d-flex gap-3">
              <a href="#privacy" className="text-white-50 text-decoration-none hover-text-white">Privacy Policy</a>
              <span>|</span>
              <a href="#terms" className="text-white-50 text-decoration-none hover-text-white">Terms of Use</a>
              <span>|</span>
              <a href="#sitemap" className="text-white-50 text-decoration-none hover-text-white">Sitemap</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default About;