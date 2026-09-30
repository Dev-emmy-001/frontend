import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../assets/logo.png';
import { siteConfig } from '../../data/siteConfig';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
      <div className="container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center me-4">
          <img 
            src={logoImg} 
            alt={siteConfig.name} 
            style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
          />
        </Link>

        {/* Mobile Toggle Button */}
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links & Actions */}
        <div className="collapse navbar-collapse ms-lg-4" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-bold small text-uppercase align-items-lg-center gap-1">
            <li className="nav-item">
              <Link 
                className={`nav-link px-2 ${isActive('/') ? 'text-danger border-bottom border-danger border-2 pb-1 active' : 'text-dark'}`} 
                to="/"
              >
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-2 ${isActive('/inventory') ? 'text-danger border-bottom border-danger border-2 pb-1 active' : 'text-dark'}`} 
                to="/inventory"
              >
                INVENTORY
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a 
                className="nav-link text-dark px-2 dropdown-toggle" 
                href="#shop-by-type" 
                role="button" 
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                SHOP BY TYPE
              </a>
              <ul className="dropdown-menu shadow-sm border-0">
                <li><Link className="dropdown-item small" to="/inventory?type=sedan">Sedans</Link></li>
                <li><Link className="dropdown-item small" to="/inventory?type=suv">SUVs</Link></li>
                <li><Link className="dropdown-item small" to="/inventory?type=truck">Trucks</Link></li>
                <li><Link className="dropdown-item small" to="/inventory?type=coupe">Coupes</Link></li>
                <li><Link className="dropdown-item small" to="/inventory?type=hybrid">Hybrids</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-2 ${isActive('/financing') ? 'text-danger border-bottom border-danger border-2 pb-1 active' : 'text-dark'}`} 
                to="/financing"
              >
                FINANCING
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-2 ${isActive('/about') ? 'text-danger border-bottom border-danger border-2 pb-1 active' : 'text-dark'}`} 
                to="/about"
              >
                ABOUT US
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-2 ${isActive('/contact') ? 'text-danger border-bottom border-danger border-2 pb-1 active' : 'text-dark'}`} 
                to="/contact"
              >
                CONTACT
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            <Link 
              to="/login" 
              className="text-dark fw-bold text-decoration-none small text-uppercase hover-text-danger me-2"
              style={{ transition: 'color 0.2s' }}
            >
              LOGIN
            </Link>
            <Link 
              to="/signup" 
              className="btn btn-brand-red btn-sm fw-bold px-4 py-2 text-uppercase text-white animate-btn"
            >
              GET PRE-APPROVED
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
