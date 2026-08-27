import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShieldCheck, Tag, DollarSign, CreditCard, Headphones, Gauge, ArrowRight, MapPin, Phone, Facebook, Instagram, Youtube } from 'lucide-react';
import axios from 'axios';

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ALL');

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/vehicles');
        setVehicles(res.data);
      } catch (err) {
        console.error('Error fetching vehicles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const sampleVehicles = [
    {
      _id: '1',
      make: 'Toyota',
      model: 'RAV4 XLE',
      year: 2023,
      price: 26490,
      mileage: 28120,
      transmission: 'Automatic',
      images: ['https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80']
    },
    {
      _id: '2',
      make: 'Honda',
      model: 'Accord EX',
      year: 2022,
      price: 24990,
      mileage: 31540,
      transmission: 'Automatic',
      images: ['https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80']
    },
    {
      _id: '3',
      make: 'Ford',
      model: 'F-150 XLT',
      year: 2021,
      price: 33990,
      mileage: 45300,
      transmission: 'Automatic',
      images: ['https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80']
    },
    {
      _id: '4',
      make: 'Chevrolet',
      model: 'Camaro LT',
      year: 2023,
      price: 28990,
      mileage: 10860,
      transmission: 'Automatic',
      images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80']
    }
  ];

  const displayVehicles = vehicles.length > 0 ? vehicles : sampleVehicles;

  return (
    <div className="bg-dark text-white min-vh-100 font-sans">
      
      {/* 1. TOP UTILITY BAR */}
      <div className="bg-black text-secondary py-2 border-bottom border-secondary small">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex gap-4">
            <span className="d-flex align-items-center gap-1">
              <MapPin size={14} className="text-danger" /> 2500 West Loop South, Houston, TX 77027
            </span>
            <span className="d-flex align-items-center gap-1">
              <Phone size={14} className="text-danger" /> (713) 555-0198
            </span>
          </div>
          <div className="d-flex gap-3 align-items-center">
            <span>Sales: Mon - Sat 9am - 7pm</span>
            <span>|</span>
            <span>Service: Mon - Sat 7am - 6pm</span>
            <div className="d-flex gap-2 ms-2">
              <Facebook size={14} className="text-secondary" />
              <Instagram size={14} className="text-secondary" />
              <Youtube size={14} className="text-secondary" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top border-bottom border-secondary py-3">
        <div className="container">
          
          {/* Logo as Image Tag */}
          <Link to="/" className="navbar-brand d-flex align-items-center me-4">
            <img 
              src="/assets/logo.png" 
              alt="SUMMIT AUTO GROUP"     
              style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
              onError={(e) => {
                // Fallback text if logo image is not found in public folder yet
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <span style={{ display: 'none' }} className="fw-black text-white text-uppercase fs-4 m-0">
              SUMMIT <span className="text-danger">AUTO GROUP</span>
            </span>
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-bold small uppercase">
              <li className="nav-item"><Link className="nav-link active text-danger" to="/">HOME</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/inventory">INVENTORY</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/inventory">SHOP BY TYPE</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/financing">FINANCING</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/specials">SPECIALS</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/about">ABOUT US</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/contact">CONTACT</Link></li>
            </ul>

            <div className="d-flex gap-2">
              <Link to="/login" className="btn btn-outline-light btn-sm fw-bold px-3 py-2">
                SIGN IN
              </Link>
              <Link to="/signup" className="btn btn-brand-red btn-sm fw-bold px-3 py-2 text-uppercase">
                GET PRE-APPROVED
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 3. HERO SECTION */}
      <section 
        className="position-relative py-5 px-3 d-flex align-items-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(11,15,25,0.95) 30%, rgba(11,15,25,0.4)), url('https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '560px'
        }}
      >
        <div className="container py-4">
          <div className="max-w-xl">
            <p className="text-danger fw-bold text-uppercase tracking-widest small mb-1">
              EXCEPTIONAL CARS. EXCEPTIONAL EXPERIENCE.
            </p>
            <h1 className="display-3 fw-black text-uppercase text-white mb-3" style={{ lineHeight: '1.1' }}>
              FIND YOUR <br />
              <span className="text-danger">PERFECT MATCH</span>
            </h1>
            <p className="text-secondary mb-4 fs-6">
              Shop our wide selection of quality new and pre-owned vehicles.
            </p>
            <div className="d-flex gap-3 mb-5">
              <Link to="/inventory" className="btn btn-brand-red px-4 py-2.5">BROWSE INVENTORY</Link>
              <Link to="/signup" className="btn btn-outline-light px-4 py-2.5">GET PRE-APPROVED</Link>
            </div>
          </div>

          {/* Search Inventory Filter Box */}
          <div className="bg-black bg-opacity-90 border border-secondary p-4 rounded-3 shadow-lg mt-4">
            <h6 className="fw-bold text-uppercase small mb-3 text-secondary">SEARCH INVENTORY</h6>
            <div className="row g-3">
              <div className="col-md-3">
                <label className="form-label small text-secondary mb-1">Make</label>
                <select className="form-select bg-dark text-white border-secondary py-2">
                  <option value="">Any Make</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Honda">Honda</option>
                  <option value="Ford">Ford</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label small text-secondary mb-1">Model</label>
                <select className="form-select bg-dark text-white border-secondary py-2">
                  <option value="">Any Model</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label small text-secondary mb-1">Body Style</label>
                <select className="form-select bg-dark text-white border-secondary py-2">
                  <option value="">Any Body Style</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Truck">Truck</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label small text-secondary mb-1">Max Price</label>
                <select className="form-select bg-dark text-white border-secondary py-2">
                  <option value="">Any Price</option>
                  <option value="20000">$20,000</option>
                  <option value="35000">$35,000</option>
                </select>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <a href="#advanced" className="text-secondary small text-decoration-none">Advanced Search ∨</a>
              <button className="btn btn-brand-red px-5 py-2 fw-bold text-uppercase">SEARCH</button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. POPULAR PICKS INVENTORY SECTION */}
      <section className="bg-white text-dark py-5">
        <div className="container py-3">
          <div className="text-center mb-4">
            <span className="text-danger fw-bold small text-uppercase tracking-wider">SHOP OUR INVENTORY</span>
            <h2 className="fw-black text-uppercase display-6 m-0">POPULAR PICKS</h2>
            
            {/* Filter Category Tabs */}
            <div className="d-flex justify-content-center gap-4 mt-3 border-bottom border-light pb-2">
              {['ALL VEHICLES', 'SEDANS', 'SUVS', 'TRUCKS', 'COUPES', 'HYBRIDS'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`btn btn-link text-decoration-none fw-bold small p-0 ${activeTab === tab ? 'text-danger border-bottom border-danger border-2 pb-1' : 'text-secondary'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Car Listing Grid */}
          <div className="row g-4">
            {displayVehicles.map((car) => (
              <div key={car._id} className="col-12 col-sm-6 col-lg-3">
                <div className="card h-100 border-light shadow-sm overflow-hidden">
                  <div className="position-relative" style={{ height: '180px' }}>
                    
                    {/* Image Tag for Vehicles */}
                    <img 
                      src={car.images && car.images[0] ? car.images[0] : 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80'} 
                      alt={`${car.year} ${car.make} ${car.model}`}
                      className="w-100 h-100 object-fit-cover"
                    />

                    <span className="position-absolute top-0 start-0 bg-dark text-white badge m-2 p-1.5 px-2">
                      {car.year}
                    </span>
                  </div>

                  <div className="card-body p-3 d-flex flex-column justify-content-between">
                    <div>
                      <h6 className="card-title fw-bold text-dark m-0">{car.year} {car.make} {car.model}</h6>
                      <div className="text-muted small d-flex align-items-center gap-2 my-2">
                        <Gauge size={13} className="text-danger" />
                        <span>{car.mileage?.toLocaleString()} mi</span>
                        <span>•</span>
                        <span>{car.transmission}</span>
                      </div>
                      <h5 className="fw-black text-dark m-0">${car.price?.toLocaleString()}</h5>
                    </div>

                    <div className="pt-3 mt-2 border-top border-light">
                      <Link to={`/vehicle/${car._id}`} className="text-danger fw-bold small text-decoration-none d-flex align-items-center gap-1">
                        <span>VIEW DETAILS</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4 pt-3">
            <Link to="/inventory" className="btn btn-outline-dark px-4 py-2 fw-bold text-uppercase">
              VIEW ALL INVENTORY
            </Link>
          </div>
        </div>
      </section>

      {/* 5. VALUE PROPOSITION BAR */}
      <section className="bg-black text-white py-4 border-top border-bottom border-secondary">
        <div className="container">
          <div className="row g-4 text-center text-md-start">
            <div className="col-md-3 d-flex align-items-center gap-3">
              <ShieldCheck size={32} className="text-danger flex-shrink-0" />
              <div>
                <h6 className="fw-bold text-uppercase small m-0">QUALITY YOU CAN TRUST</h6>
                <small className="text-secondary" style={{ fontSize: '11px' }}>All vehicles are thoroughly inspected for your peace of mind.</small>
              </div>
            </div>
            <div className="col-md-3 d-flex align-items-center gap-3">
              <Tag size={32} className="text-danger flex-shrink-0" />
              <div>
                <h6 className="fw-bold text-uppercase small m-0">BEST PRICE GUARANTEE</h6>
                <small className="text-secondary" style={{ fontSize: '11px' }}>We offer competitive pricing and best value on every vehicle.</small>
              </div>
            </div>
            <div className="col-md-3 d-flex align-items-center gap-3">
              <DollarSign size={32} className="text-danger flex-shrink-0" />
              <div>
                <h6 className="fw-bold text-uppercase small m-0">FLEXIBLE FINANCING</h6>
                <small className="text-secondary" style={{ fontSize: '11px' }}>Multiple financing options available to fit your budget.</small>
              </div>
            </div>
            <div className="col-md-3 d-flex align-items-center gap-3">
              <Headphones size={32} className="text-danger flex-shrink-0" />
              <div>
                <h6 className="fw-bold text-uppercase small m-0">EXPERT SUPPORT</h6>
                <small className="text-secondary" style={{ fontSize: '11px' }}>Our team is here to help you every step of the way.</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROMO CARDS */}
      <section className="bg-dark py-5">
        <div className="container">
          <div className="row g-4">
            
            <div className="col-md-6">
              <div 
                className="p-5 rounded-3 text-white position-relative overflow-hidden d-flex flex-column justify-content-center"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80')`,
                  backgroundSize: 'cover',
                  minHeight: '220px'
                }}
              >
                <span className="text-danger font-bold text-uppercase small">EASY FINANCING</span>
                <h3 className="fw-black text-uppercase">DRIVE NOW, <br />PAY YOUR WAY</h3>
                <p className="text-secondary small">Get pre-approved in minutes and choose a plan that works for you.</p>
                <Link to="/signup" className="btn btn-brand-red me-auto px-4 py-2 small fw-bold">GET PRE-APPROVED</Link>
              </div>
            </div>

            <div className="col-md-6">
              <div 
                className="p-5 rounded-3 text-white position-relative overflow-hidden d-flex flex-column justify-content-center"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80')`,
                  backgroundSize: 'cover',
                  minHeight: '220px'
                }}
              >
                <span className="text-danger font-bold text-uppercase small">VALUE YOUR TRADE</span>
                <h3 className="fw-black text-uppercase">WHAT'S YOUR <br />CAR WORTH?</h3>
                <p className="text-secondary small">Get a fair market value for your vehicle in just a few clicks.</p>
                <Link to="/trade" className="btn btn-outline-light me-auto px-4 py-2 small fw-bold">VALUE YOUR TRADE</Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;