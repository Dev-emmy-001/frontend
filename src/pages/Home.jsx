import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShieldCheck, Tag, DollarSign, CreditCard, Headphones, Gauge, ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import axios from 'axios';
import logoImg from '../assets/logo.png';

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ALL VEHICLES');
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const heroImages = [
    'https://di-uploads-pod23.dealerinspire.com/lexusoflasvegas/uploads/2023/06/2024_Lexus_GX_Overtrail_008-scaled-1.jpg', // Audi SUV
    'https://www.greencarguide.co.uk/wp-content/uploads/2026/02/Jaguar-GT.jpeg', // Porsche 911
    'https://cdn.sanity.io/images/xyy6okk0/production/c065822395d9bf8d0b6d891393dcc616bc000313-1400x934.webp', // BMW Sedan
    'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=80'  // Mercedes AMG
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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

  const filteredVehicles = displayVehicles.filter(car => {
    const tab = activeTab.toUpperCase();
    if (tab === 'ALL' || tab === 'ALL VEHICLES') return true;
    if (tab === 'SEDANS') return car.bodyStyle?.toUpperCase() === 'SEDAN' || car.model?.toUpperCase().includes('ACCORD') || car.make?.toUpperCase() === 'HONDA';
    if (tab === 'SUVS') return car.bodyStyle?.toUpperCase() === 'SUV' || car.model?.toUpperCase().includes('RAV4') || car.make?.toUpperCase() === 'TOYOTA';
    if (tab === 'TRUCKS') return car.bodyStyle?.toUpperCase() === 'TRUCK' || car.model?.toUpperCase().includes('F-150') || car.make?.toUpperCase() === 'FORD';
    if (tab === 'COUPES') return car.bodyStyle?.toUpperCase() === 'COUPE' || car.model?.toUpperCase().includes('CAMARO') || car.make?.toUpperCase() === 'CHEVROLET';
    if (tab === 'HYBRIDS') return car.bodyStyle?.toUpperCase() === 'HYBRID';
    return true;
  });

  return (
    <div className="bg-dark text-white min-vh-100 font-sans">
      
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

      {/* 3. HERO SECTION */}
      <section 
        className="position-relative py-5 px-3 d-flex align-items-center"
        style={{
          minHeight: '620px',
          overflow: 'hidden'
        }}
      >
        {/* Carousel Background Images with Fade Transition */}
        {heroImages.map((imgUrl, index) => (
          <div 
            key={index}
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(11,15,25,0.92) 6%, rgba(11,15,25,0.4)), url('${imgUrl}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentHeroIndex === index ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out',
              zIndex: 0
            }}
          />
        ))}

        <div className="container py-4 position-relative" style={{ zIndex: 1 }}>
          <div className="max-w-xl">
            <p className="text-danger fw-bold text-uppercase tracking-wider small m-0 animate-slide-right">
              EXCEPTIONAL CARS.
            </p>
            <p className="text-white fw-bold text-uppercase tracking-wider small mb-3 animate-slide-right delay-1">
              EXCEPTIONAL EXPERIENCE.
            </p>
            <h1 className="display-4 fw-black text-uppercase text-white mb-2 animate-slide-right delay-2" style={{ fontSize: '3rem', fontWeight: '900', lineHeight: '1.1' }}>
              FIND YOUR <br />
              <span className="text-danger">PERFECT MATCH</span>
            </h1>
            <p className="text-secondary mb-4 fs-6 animate-slide-right delay-3">
              Shop our wide selection of quality new and pre-owned vehicles.
            </p>
            <div className="d-flex gap-3 mb-5 animate-slide-right delay-4">
              <Link to="/inventory" className="btn btn-brand-red px-4 py-2.5 fw-bold text-uppercase animate-btn" style={{ backgroundColor: '#D91C24', border: 'none', borderRadius: '4px' }}>BROWSE INVENTORY</Link>
              <Link to="/signup" className="btn btn-outline-light px-4 py-2.5 fw-bold text-uppercase animate-btn" style={{ borderRadius: '4px' }}>GET PRE-APPROVED</Link>
            </div>
          </div>

          {/* Search Inventory Filter Box */}
          <div className="bg-black bg-opacity-90 border border-secondary p-4 rounded-3 shadow-lg mt-4" style={{ maxWidth: '100%' }}>
            <h6 className="fw-bold text-white text-uppercase small mb-3">SEARCH INVENTORY</h6>
            <div className="row g-3 align-items-end">
              <div className="col-lg col-md-6 col-12">
                <label className="form-label small text-secondary mb-1">Make</label>
                <select className="form-select bg-dark text-white border-secondary py-2 small">
                  <option value="">Any Make</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Honda">Honda</option>
                  <option value="Ford">Ford</option>
                </select>
              </div>
              <div className="col-lg col-md-6 col-12">
                <label className="form-label small text-secondary mb-1">Model</label>
                <select className="form-select bg-dark text-white border-secondary py-2 small">
                  <option value="">Any Model</option>
                </select>
              </div>
              <div className="col-lg col-md-6 col-12">
                <label className="form-label small text-secondary mb-1">Body Style</label>
                <select className="form-select bg-dark text-white border-secondary py-2 small">
                  <option value="">Any Body Style</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Truck">Truck</option>
                </select>
              </div>
              <div className="col-lg col-md-6 col-12">
                <label className="form-label small text-secondary mb-1">Max Price</label>
                <select className="form-select bg-dark text-white border-secondary py-2 small">
                  <option value="">Any Price</option>
                  <option value="20000">$20,000</option>
                  <option value="35000">$35,000</option>
                </select>
              </div>
              <div className="col-lg-2 col-12">
                <button className="btn btn-brand-red w-100 py-2 fw-bold text-uppercase small animate-btn" style={{ backgroundColor: '#D91C24', border: 'none', borderRadius: '4px' }}>SEARCH</button>
              </div>
            </div>
            <div className="d-flex justify-content-end mt-2">
              <a href="#advanced" className="text-secondary small text-decoration-none" style={{ fontSize: '12px' }}>
                Advanced Search <span className="small">∨</span>
              </a>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="position-absolute bottom-0 start-50 translate-middle-x d-flex gap-2 pb-4" style={{ zIndex: 2 }}>
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentHeroIndex(idx)}
              className="border-0 rounded-circle animate-btn"
              style={{
                width: '10px',
                height: '10px',
                backgroundColor: currentHeroIndex === idx ? '#D91C24' : 'rgba(255,255,255,0.4)',
                transition: 'background-color 0.3s ease',
                padding: 0,
                cursor: 'pointer'
              }}
            />
          ))}
        </div>
      </section>

      {/* 4. POPULAR PICKS INVENTORY SECTION */}
      <section className="bg-white text-dark py-5">
        <div className="container py-3">
          <div className="text-center mb-4">
            <span className="text-danger fw-bold small text-uppercase tracking-wider">SHOP OUR INVENTORY</span>
            <h2 className="fw-black text-uppercase display-6 m-0" style={{ fontWeight: '900' }}>POPULAR PICKS</h2>
            
            {/* Filter Category Tabs */}
            <div className="d-flex justify-content-center gap-4 mt-3 border-bottom border-light pb-2">
              {['ALL VEHICLES', 'SEDANS', 'SUVS', 'TRUCKS', 'COUPES', 'HYBRIDS'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`btn btn-link text-decoration-none fw-bold small p-0 ${activeTab === tab ? 'text-danger border-bottom border-danger border-2 pb-1' : 'text-secondary'}`}
                  style={{ textDecoration: 'none', fontSize: '13px' }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Car Listing Grid */}
          <div className="row g-4">
            {filteredVehicles.map((car) => (
              <div key={car._id} className="col-12 col-sm-6 col-lg-3">
                <div className="card h-100 border-light shadow-sm overflow-hidden" style={{ borderRadius: '8px' }}>
                  <div className="position-relative" style={{ height: '180px' }}>
                    {/* Image Tag for Vehicles */}
                    <img 
                      src={car.images && car.images[0] ? car.images[0] : 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80'} 
                      alt={`${car.year} ${car.make} ${car.model}`}
                      className="w-100 h-100 object-fit-cover"
                    />
                    <span className="position-absolute top-0 start-0 bg-dark text-white m-2 py-1 px-2 fw-bold" style={{ fontSize: '11px', borderRadius: '3px' }}>
                      {car.year}
                    </span>
                  </div>

                  <div className="card-body p-3 d-flex flex-column justify-content-between">
                    <div>
                      <h6 className="card-title fw-bold text-dark m-0" style={{ fontSize: '15px' }}>{car.year} {car.make} {car.model}</h6>
                      <div className="text-muted small d-flex align-items-center gap-2 my-2" style={{ fontSize: '12px' }}>
                        <Gauge size={13} className="text-danger" />
                        <span>{car.mileage?.toLocaleString()} mi</span>
                        <span>•</span>
                        {/* Custom Shifter/Gear Icon for Transmission */}
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-danger">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 8v8M8 12h8" />
                        </svg>
                        <span>{car.transmission}</span>
                      </div>
                      <h5 className="fw-black text-dark m-0" style={{ fontWeight: '900', fontSize: '18px' }}>${car.price?.toLocaleString()}</h5>
                    </div>

                    <div className="pt-3 mt-2 border-top border-light">
                      <Link to={`/vehicle/${car._id}`} className="text-danger fw-bold small text-decoration-none d-flex align-items-center gap-1" style={{ fontSize: '12px' }}>
                        <span>VIEW DETAILS</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5 pt-2">
            <Link to="/inventory" className="btn btn-outline-dark px-4 py-2.5 fw-bold text-uppercase" style={{ borderRadius: '4px', fontSize: '13px' }}>
              VIEW ALL INVENTORY
            </Link>
          </div>
        </div>
      </section>

      {/* 5. VALUE PROPOSITION BAR */}
      <section className="bg-black text-white py-5 border-top border-bottom border-secondary">
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
                  backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '260px',
                  borderRadius: '8px'
                }}
              >
                <span className="text-danger fw-bold text-uppercase small mb-1">EASY FINANCING</span>
                <h3 className="fw-black text-uppercase mb-2" style={{ fontWeight: '900' }}>DRIVE NOW, <br />PAY YOUR WAY</h3>
                <p className="text-secondary small mb-4" style={{ maxWidth: '300px' }}>Get pre-approved in minutes and choose a plan that works for you.</p>
                <Link to="/signup" className="btn btn-brand-red me-auto px-4 py-2.5 small fw-bold" style={{ backgroundColor: '#D91C24', border: 'none', borderRadius: '4px' }}>GET PRE-APPROVED</Link>
              </div>
            </div>

            <div className="col-md-6">
              <div 
                className="p-5 rounded-3 text-white position-relative overflow-hidden d-flex flex-column justify-content-center"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=800&q=80')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '260px',
                  borderRadius: '8px'
                }}
              >
                <span className="text-danger fw-bold text-uppercase small mb-1">VALUE YOUR TRADE</span>
                <h3 className="fw-black text-uppercase mb-2" style={{ fontWeight: '900' }}>WHAT'S YOUR <br />CAR WORTH?</h3>
                <p className="text-secondary small mb-4" style={{ maxWidth: '300px' }}>Get a fair market value for your vehicle in just a few clicks.</p>
                <Link to="/trade" className="btn btn-outline-light me-auto px-4 py-2.5 small fw-bold" style={{ borderRadius: '4px' }}>VALUE YOUR TRADE</Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. WE PROUDLY CARRY TOP BRANDS */}
      <section className="bg-white text-dark py-5">
        <div className="container">
          <div className="text-center mb-4">
            <span className="text-secondary fw-bold text-uppercase tracking-wider" style={{ fontSize: '12px' }}>WE PROUDLY CARRY TOP BRANDS</span>
          </div>
          <div className="d-flex justify-content-around align-items-center flex-wrap gap-4 text-center">
            {/* Toyota */}
            <div className="d-flex flex-column align-items-center" style={{ width: '80px' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-secondary mb-1">
                <path d="M12 2C6.48 2 2 4.69 2 8c0 3.31 4.48 6 10 6s10-2.69 10-6c0-3.31-4.48-6-10-6zm0 10.5c-4.42 0-8-2.01-8-4.5s3.58-4.5 8-4.5 8 2.01 8 4.5-3.58 4.5-8 4.5z" />
                <path d="M12 3.5c-2.21 0-4 2.01-4 4.5s1.79 4.5 4 4.5 4-2.01 4-4.5-1.79-4.5-4-4.5zm0 7.5c-1.1 0-2-1.34-2-3s.9-3 2-3 2 1.34 2 3-.9 3-2 3z" />
                <path d="M12 5.5c-3.31 0-6 1.12-6 2.5s2.69 2.5 6 2.5 6-1.12 6-2.5-2.69-2.5-6-2.5zm0 3.8c-2.21 0-4-.58-4-1.3s1.79-1.3 4-1.3 4 .58 4 1.3-1.79 1.3-4 1.3z" />
              </svg>
              <span className="fw-bold" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>TOYOTA</span>
            </div>
            {/* Honda */}
            <div className="d-flex flex-column align-items-center" style={{ width: '80px' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-secondary mb-1">
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <path d="M8 6v12M16 6v12M8 12h8" strokeLinecap="round" />
              </svg>
              <span className="fw-bold" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>HONDA</span>
            </div>
            {/* Ford */}
            <div className="d-flex flex-column align-items-center" style={{ width: '80px' }}>
              <svg width="50" height="40" viewBox="0 0 60 30" fill="currentColor" className="text-secondary mb-1">
                <ellipse cx="30" cy="15" rx="28" ry="14" fill="#0d47a1" />
                <ellipse cx="30" cy="15" rx="25" ry="11" fill="none" stroke="white" strokeWidth="1" />
                <text x="30" y="20" fill="white" fontSize="12" fontWeight="bold" fontStyle="italic" textAnchor="middle" fontFamily="Georgia, serif">Ford</text>
              </svg>
            </div>
            {/* Chevrolet */}
            <div className="d-flex flex-column align-items-center" style={{ width: '90px' }}>
              <svg width="45" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-secondary mb-1">
                <path d="M4 10h3.5l1.5-3.5h6l1.5 3.5H20v4h-3.5l-1.5 3.5h-6L7.5 14H4v-4z" />
              </svg>
              <span className="fw-bold" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>CHEVROLET</span>
            </div>
            {/* Nissan */}
            <div className="d-flex flex-column align-items-center" style={{ width: '80px' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary mb-1">
                <circle cx="12" cy="12" r="8" />
                <rect x="2" y="9.5" width="20" height="5" rx="1" fill="white" stroke="currentColor" strokeWidth="1.5" />
                <text x="12" y="13" fill="currentColor" fontSize="4.5" fontWeight="black" textAnchor="middle" letterSpacing="0.2">NISSAN</text>
              </svg>
            </div>
            {/* BMW */}
            <div className="d-flex flex-column align-items-center" style={{ width: '80px' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-secondary mb-1">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M12 5a7 7 0 0 1 7 7h-7z" fill="currentColor" />
                <path d="M12 19a7 7 0 0 1-7-7h7z" fill="currentColor" />
              </svg>
              <span className="fw-bold" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>BMW</span>
            </div>
            {/* Hyundai */}
            <div className="d-flex flex-column align-items-center" style={{ width: '80px' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary mb-1">
                <ellipse cx="12" cy="12" rx="10" ry="6" />
                <path d="M9 9l2 6M15 9l-2 6M9.5 12h5" strokeLinecap="round" />
              </svg>
              <span className="fw-bold" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>HYUNDAI</span>
            </div>
            {/* Kia */}
            <div className="d-flex flex-column align-items-center" style={{ width: '80px' }}>
              <svg width="50" height="40" viewBox="0 0 60 24" fill="currentColor" className="text-secondary mb-1">
                <path d="M5 2h4l5 10L19 2h4l-6 12 6 8h-4l-5-10-5 10H5l6-12zM32 2h4v20h-4zM43 2h12v4H47v4h6v4h-6v6h-4z" />
              </svg>
            </div>
            {/* Jeep */}
            <div className="d-flex flex-column align-items-center" style={{ width: '80px' }}>
              <svg width="50" height="40" viewBox="0 0 60 24" fill="currentColor" className="text-secondary mb-1">
                <text x="30" y="18" fill="currentColor" fontSize="18" fontWeight="900" textAnchor="middle" letterSpacing="-1">Jeep</text>
              </svg>
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

export default Home;