import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, LogOut, LayoutDashboard, ShoppingBag, Heart, Shield } from 'lucide-react';
import logoImg from '../../assets/logo.png';
import { siteConfig } from '../../data/siteConfig';
import { useTranslation } from '../../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const { t, isRTL } = useTranslation();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (userStr && token) {
      try {
        setCurrentUser(JSON.parse(userStr));
      } catch {
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    navigate('/login');
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const isAdmin = currentUser?.role === 'admin';
  const isSeller = currentUser?.role === 'private_seller' || currentUser?.role === 'business_dealer';
  const dashboardLink = isAdmin ? '/admin-dashboard' : isSeller ? '/seller-dashboard' : '/buyer-dashboard';

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
                {t('nav.home', 'HOME')}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-2 ${isActive('/inventory') ? 'text-danger border-bottom border-danger border-2 pb-1 active' : 'text-dark'}`} 
                to="/inventory"
              >
                {t('nav.inventory', 'INVENTORY')}
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
                {t('nav.shopByType', 'SHOP BY TYPE')}
              </a>
              <ul className={`dropdown-menu shadow-sm border-0 ${isRTL ? 'dropdown-menu-start text-end' : ''}`}>
                <li><Link className="dropdown-item small" to="/inventory?type=sedan">{t('nav.sedans', 'Sedans')}</Link></li>
                <li><Link className="dropdown-item small" to="/inventory?type=suv">{t('nav.suvs', 'SUVs')}</Link></li>
                <li><Link className="dropdown-item small" to="/inventory?type=truck">{t('nav.trucks', 'Trucks')}</Link></li>
                <li><Link className="dropdown-item small" to="/inventory?type=coupe">{t('nav.coupes', 'Coupes')}</Link></li>
                <li><Link className="dropdown-item small" to="/inventory?type=hybrid">{t('nav.hybrids', 'Hybrids')}</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-2 ${isActive('/financing') ? 'text-danger border-bottom border-danger border-2 pb-1 active' : 'text-dark'}`} 
                to="/financing"
              >
                {t('nav.financing', 'FINANCING')}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-2 ${isActive('/about') ? 'text-danger border-bottom border-danger border-2 pb-1 active' : 'text-dark'}`} 
                to="/about"
              >
                {t('nav.about', 'ABOUT US')}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-2 ${isActive('/contact') ? 'text-danger border-bottom border-danger border-2 pb-1 active' : 'text-dark'}`} 
                to="/contact"
              >
                {t('nav.contact', 'CONTACT')}
              </Link>
            </li>
          </ul>

          {/* Mobile-only Language Switcher */}
          <div className="d-lg-none my-2 pt-2 border-top d-flex align-items-center justify-content-between">
            <span className="small text-muted fw-bold">{t('topBar.selectLanguage', 'Language')}:</span>
            <LanguageSwitcher isDark={false} compact={false} />
          </div>

          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            {currentUser ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-dark btn-sm fw-bold dropdown-toggle d-flex align-items-center gap-2 px-3 py-2"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <User size={16} className="text-danger" />
                  <span className="text-truncate" style={{ maxWidth: '140px' }}>
                    {currentUser.fullName || currentUser.email || t('nav.myAccount', 'My Account')}
                  </span>
                </button>
                <ul className={`dropdown-menu dropdown-menu-end shadow-sm border-0 p-2 ${isRTL ? 'text-end' : ''}`} style={{ minWidth: '200px' }}>
                  <li className="px-2 py-1 mb-1 border-bottom border-light">
                    <small className="text-muted d-block" style={{ fontSize: '11px' }}>{t('nav.signedInAs', 'Signed in as')}</small>
                    <strong className="text-dark small d-block text-truncate">{currentUser.email}</strong>
                    <span className={`badge ${isAdmin ? 'bg-danger text-white' : 'bg-danger bg-opacity-10 text-danger'} mt-1`} style={{ fontSize: '10px' }}>
                      {isAdmin ? '👑 System Admin' : isSeller ? 'Seller Account' : 'Buyer Account'}
                    </span>
                  </li>

                  <li>
                    <Link className="dropdown-item small d-flex align-items-center gap-2 py-2" to={dashboardLink}>
                      <LayoutDashboard size={15} />
                      <span>{isAdmin ? t('nav.adminDashboard', 'Admin Dashboard') : isSeller ? t('nav.sellerDashboard', 'Seller Dashboard') : t('nav.buyerDashboard', 'Buyer Dashboard')}</span>
                    </Link>
                  </li>

                  {isAdmin && (
                    <>
                      <li>
                        <Link className="dropdown-item small d-flex align-items-center gap-2 py-2" to="/admin/vehicles">
                          <Shield size={15} />
                          <span>{t('nav.moderateInventory', 'Moderate Inventory')}</span>
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item small d-flex align-items-center gap-2 py-2" to="/admin/orders">
                          <ShoppingBag size={15} />
                          <span>{t('nav.ordersEscrow', 'Orders & Escrow')}</span>
                        </Link>
                      </li>
                    </>
                  )}

                  {!isSeller && !isAdmin && (
                    <>
                      <li>
                        <Link className="dropdown-item small d-flex align-items-center gap-2 py-2" to="/my-orders">
                          <ShoppingBag size={15} />
                          <span>{t('nav.myOrders', 'My Orders')}</span>
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item small d-flex align-items-center gap-2 py-2" to="/favorites">
                          <Heart size={15} />
                          <span>{t('nav.favorites', 'Favorites')}</span>
                        </Link>
                      </li>
                    </>
                  )}

                  <li>
                    <Link className="dropdown-item small d-flex align-items-center gap-2 py-2" to="/profile">
                      <User size={15} />
                      <span>{t('nav.profileSettings', 'Profile Settings')}</span>
                    </Link>
                  </li>

                  <li><hr className="dropdown-divider my-1" /></li>

                  <li>
                    <button 
                      onClick={handleLogout} 
                      className="dropdown-item small text-danger d-flex align-items-center gap-2 py-2 w-100 text-start"
                    >
                      <LogOut size={15} />
                      <span>{t('nav.logout', 'Log Out')}</span>
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-dark fw-bold text-decoration-none small text-uppercase hover-text-danger me-2"
                  style={{ transition: 'color 0.2s' }}
                >
                  {t('nav.login', 'LOGIN')}
                </Link>
                <Link 
                  to="/signup" 
                  className="btn btn-brand-red btn-sm fw-bold px-4 py-2 text-uppercase text-white animate-btn"
                >
                  {t('nav.getPreApproved', 'GET PRE-APPROVED')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

