import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageSquare, Send, Car, ParkingSquare, Compass,  } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been sent successfully.');
  };

  return (
    <div className="bg-light text-dark min-vh-100">
      
      {/* 1. HERO SECTION WITH SUV CAR IMAGE */}
      <section className="container pt-5 pb-4">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item"><Link to="/" className="text-secondary text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item active text-dark fw-semibold" aria-current="page">Contact Us</li>
          </ol>
        </nav>

        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            <h1 className="display-4 fw-black text-dark mb-2">
              CONTACT <span className="text-success" style={{ color: '#065F46' }}>US</span>
            </h1>
            <p className="text-secondary fs-6 leading-relaxed m-0" style={{ maxWidth: '480px' }}>
              We're here to help! Reach out to us with any questions or visit us at our location.
            </p>
          </div>

          <div className="col-lg-6 text-center">
            <img 
              src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80" 
              alt="BMW Green SUV" 
              className="img-fluid object-fit-contain"
              style={{ maxHeight: '280px' }}
            />
          </div>
        </div>

        {/* 4 Floating Contact Channel Cards */}
        <div className="floating-contact-card p-4 mt-4">
          <div className="row g-4">
            
            <div className="col-12 col-sm-6 col-lg-3 border-end border-light">
              <div className="d-flex align-items-start gap-3">
                <div className="p-2.5 rounded-3 bg-success bg-opacity-10 text-success" style={{ color: '#065F46' }}>
                  <Phone size={22} />
                </div>
                <div>
                  <h6 className="fw-bold text-dark m-0">Phone</h6>
                  <p className="fw-bold text-dark small m-0 mt-1">(713) 555-0198</p>
                  <small className="text-secondary d-block" style={{ fontSize: '11px' }}>Mon - Sat: 9AM - 7PM</small>
                  <small className="text-secondary d-block" style={{ fontSize: '11px' }}>Sun: 11AM - 5PM</small>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3 border-end border-light">
              <div className="d-flex align-items-start gap-3">
                <div className="p-2.5 rounded-3 bg-success bg-opacity-10 text-success" style={{ color: '#065F46' }}>
                  <Mail size={22} />
                </div>
                <div>
                  <h6 className="fw-bold text-dark m-0">Email</h6>
                  <p className="fw-bold text-dark small m-0 mt-1">info@summitautogroup.com</p>
                  <small className="text-secondary d-block" style={{ fontSize: '11px' }}>We reply within 24 hours</small>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3 border-end border-light">
              <div className="d-flex align-items-start gap-3">
                <div className="p-2.5 rounded-3 bg-success bg-opacity-10 text-success" style={{ color: '#065F46' }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <h6 className="fw-bold text-dark m-0">Location</h6>
                  <p className="fw-bold text-dark small m-0 mt-1">2500 West Loop South, Houston, TX 77027</p>
                  <a href="#map" className="text-success fw-bold text-decoration-none d-inline-block mt-1" style={{ fontSize: '11px', color: '#065F46' }}>
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="d-flex align-items-start gap-3">
                <div className="p-2.5 rounded-3 bg-success bg-opacity-10 text-success" style={{ color: '#065F46' }}>
                  <MessageSquare size={22} />
                </div>
                <div>
                  <h6 className="fw-bold text-dark m-0">Live Chat</h6>
                  <p className="fw-bold text-dark small m-0 mt-1">Chat with our team</p>
                  <small className="text-secondary d-block" style={{ fontSize: '11px' }}>We're online now!</small>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 2. FORM & MAP CONTAINER */}
      <section className="container py-4 mb-4">
        <div className="bg-white rounded-4 p-4 p-md-5 shadow-sm border border-light">
          <div className="row g-5">
            
            {/* Left Column: Form */}
            <div className="col-lg-7">
              <h5 className="fw-bold text-dark mb-4">Send Us a Message</h5>

              <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-12">
                  <label className="form-label small fw-bold text-dark m-0 mb-1">Full Name *</label>
                  <input 
                    type="text" required
                    className="form-control form-input-light" 
                    placeholder="Enter your full name"
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small fw-bold text-dark m-0 mb-1">Email Address *</label>
                  <input 
                    type="email" required
                    className="form-control form-input-light" 
                    placeholder="Enter your email"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small fw-bold text-dark m-0 mb-1">Phone Number</label>
                  <input 
                    type="text" 
                    className="form-control form-input-light" 
                    placeholder="Enter your phone number"
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small fw-bold text-dark m-0 mb-1">Subject *</label>
                  <select 
                    required 
                    className="form-select form-input-light"
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="">Select a subject</option>
                    <option value="Inquiry">General Inquiry</option>
                    <option value="Financing">Financing Question</option>
                    <option value="Test Drive">Schedule Test Drive</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label small fw-bold text-dark m-0 mb-1">Message *</label>
                  <textarea 
                    rows="4" required
                    className="form-control form-input-light" 
                    placeholder="Type your message here..."
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <div className="col-12 mt-4">
                  <button type="submit" className="btn btn-brand-green w-100 py-3 fw-bold text-uppercase d-flex align-items-center justify-content-center gap-2">
                    <span>SEND MESSAGE</span>
                    <Send size={16} />
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Visit Us & Map */}
            <div className="col-lg-5">
              <h5 className="fw-bold text-dark mb-4">Visit Us</h5>

              {/* Map Illustration Box */}
              <div id="map" className="position-relative rounded-3 overflow-hidden border border-light mb-4" style={{ height: '220px', backgroundColor: '#E5E7EB' }}>
                <img 
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80" 
                  alt="Houston Map View" 
                  className="w-100 h-100 object-fit-cover opacity-75"
                />
                <div className="position-absolute top-50 start-50 translate-middle bg-white px-3 py-2 rounded-3 shadow-sm d-flex align-items-center gap-2">
                  <div className="p-1.5 rounded-circle bg-success text-white" style={{ backgroundColor: '#065F46' }}>
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h6 className="fw-bold m-0" style={{ fontSize: '11px' }}>2500 West Loop S</h6>
                    <small className="text-secondary d-block" style={{ fontSize: '10px' }}>Houston, TX 77027</small>
                  </div>
                </div>
              </div>

              {/* Visit Amenities */}
              <div className="space-y-3">
                <div className="d-flex align-items-center gap-3 p-2">
                  <div className="p-2.5 rounded-3 bg-success bg-opacity-10 text-success" style={{ color: '#065F46' }}>
                    <Compass size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark m-0 small">Easy Access</h6>
                    <small className="text-secondary d-block" style={{ fontSize: '11px' }}>Conveniently located off the West Loop</small>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3 p-2">
                  <div className="p-2.5 rounded-3 bg-success bg-opacity-10 text-success" style={{ color: '#065F46' }}>
                    <ParkingSquare size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark m-0 small">Free Parking</h6>
                    <small className="text-secondary d-block" style={{ fontSize: '11px' }}>Plenty of parking available on-site</small>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3 p-2">
                  <div className="p-2.5 rounded-3 bg-success bg-opacity-10 text-success" style={{ color: '#065F46' }}>
                    <Car size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark m-0 small">Test Drive Today</h6>
                    <small className="text-secondary d-block" style={{ fontSize: '11px' }}>Schedule a test drive and experience the difference</small>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Callout Banner */}
          <div className="mt-5 p-4 rounded-3 bg-light border border-light d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
            <div className="d-flex align-items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=400&q=80" 
                alt="White Sedan" 
                className="rounded-2 object-fit-cover d-none d-sm-block"
                style={{ width: '110px', height: '60px' }}
              />
              <div>
                <h6 className="fw-bold text-dark m-0">Have Questions? Call Us Now!</h6>
                <small className="text-secondary">Our friendly team is ready to assist you.</small>
              </div>
            </div>

            <a href="tel:7135550198" className="btn btn-brand-green px-4 py-2.5 fw-bold d-flex align-items-center gap-2">
              <Phone size={16} />
              <span>(713) 555-0198</span>
            </a>
          </div>

        </div>
      </section>

      {/* 3. STAY CONNECTED NEWSLETTER */}
      <section className="py-4 text-white" style={{ backgroundColor: '#033B2B' }}>
        <div className="container">
          <div className="row align-items-center g-3">
            <div className="col-lg-6">
              <h6 className="fw-bold text-uppercase m-0">STAY CONNECTED</h6>
              <small className="text-light opacity-75">Subscribe to get updates on new arrivals and special offers.</small>
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

      {/* 4. FOOTER */}
      <footer className="bg-white text-dark border-top py-5">
        <div className="container py-3">
          <div className="row g-4">
            
            <div className="col-lg-3">
              <Link to="/" className="d-block mb-3">
                <img 
                  src="/assets/logo.png" 
                  alt="SUMMIT AUTO GROUP" 
                  style={{ height: '36px', width: 'auto' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span style={{ display: 'none' }} className="fw-black text-dark text-uppercase fs-5 m-0">
                  SUMMIT <span className="text-success" style={{ color: '#065F46' }}>AUTO GROUP</span>
                </span>
              </Link>
              <p className="text-secondary small mb-3">
                Quality vehicles. Honest service. <br />The Summit difference.
              </p>
              <div className="d-flex gap-3 text-secondary">
                <Facebook size={16} />
                <Instagram size={16} />
                <Youtube size={16} />
              </div>
            </div>

            <div className="col-6 col-md-3 col-lg-2">
              <h6 className="fw-bold text-uppercase small mb-3">QUICK LINKS</h6>
              <ul className="list-unstyled small space-y-2">
                <li className="mb-1.5"><Link to="/inventory" className="text-secondary text-decoration-none">Inventory</Link></li>
                <li className="mb-1.5"><Link to="/inventory" className="text-secondary text-decoration-none">Shop by Type</Link></li>
                <li className="mb-1.5"><Link to="/financing" className="text-secondary text-decoration-none">Financing</Link></li>
                <li className="mb-1.5"><Link to="/specials" className="text-secondary text-decoration-none">Specials</Link></li>
                <li className="mb-1.5"><Link to="/about" className="text-secondary text-decoration-none">About Us</Link></li>
                <li className="mb-1.5"><Link to="/contact" className="text-secondary text-decoration-none">Contact Us</Link></li>
              </ul>
            </div>

            <div className="col-6 col-md-3 col-lg-2">
              <h6 className="fw-bold text-uppercase small mb-3">SHOP</h6>
              <ul className="list-unstyled small space-y-2">
                <li className="mb-1.5"><Link to="/inventory" className="text-secondary text-decoration-none">All Vehicles</Link></li>
                <li className="mb-1.5"><Link to="/inventory?type=sedan" className="text-secondary text-decoration-none">Sedans</Link></li>
                <li className="mb-1.5"><Link to="/inventory?type=suv" className="text-secondary text-decoration-none">SUVs</Link></li>
                <li className="mb-1.5"><Link to="/inventory?type=truck" className="text-secondary text-decoration-none">Trucks</Link></li>
                <li className="mb-1.5"><Link to="/inventory?type=coupe" className="text-secondary text-decoration-none">Coupes</Link></li>
                <li className="mb-1.5"><Link to="/inventory?type=hybrid" className="text-secondary text-decoration-none">Hybrids</Link></li>
              </ul>
            </div>

            <div className="col-md-3 col-lg-3">
              <h6 className="fw-bold text-uppercase small mb-3">CUSTOMER CARE</h6>
              <ul className="list-unstyled small text-secondary space-y-2">
                <li className="mb-2 d-flex align-items-center gap-2">
                  <Phone size={14} className="text-success" style={{ color: '#065F46' }} /> (713) 555-0198
                </li>
                <li className="mb-2 d-flex align-items-center gap-2">
                  <Mail size={14} className="text-success" style={{ color: '#065F46' }} /> info@summitautogroup.com
                </li>
                <li className="d-flex align-items-start gap-2">
                  <MapPin size={14} className="text-success mt-1 flex-shrink-0" style={{ color: '#065F46' }} />
                  <span>2500 West Loop South, Houston, TX 77027</span>
                </li>
              </ul>
            </div>

            <div className="col-md-3 col-lg-2">
              <h6 className="fw-bold text-uppercase small mb-3">HOURS</h6>
              <div className="small text-secondary">
                <div className="d-flex justify-content-between mb-1">
                  <span>Mon - Sat</span>
                  <span>9:00 AM - 7:00 PM</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Sunday</span>
                  <span>11:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
};

export default Contact;