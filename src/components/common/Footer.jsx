import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import logoImg from '../../assets/logo.png';
import { siteConfig } from '../../data/siteConfig';
import { useTranslation } from '../../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Footer = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';
  const { t } = useTranslation();

  return (
    <footer className={`${isDark ? 'bg-black text-white-50 border-secondary' : 'bg-white text-secondary border-light'} pt-5 pb-3 border-top`}>
      <div className="container">
        <div className="row g-4">
          
          {/* Column 1: Brand & Bio */}
          <div className="col-lg-3 col-md-6 col-12">
            <Link to="/" className="d-inline-block mb-3">
              <img 
                src={logoImg} 
                alt={siteConfig.name} 
                style={{ height: '40px', width: 'auto' }} 
              />
            </Link>
            <p className="small mb-4" style={{ fontSize: '13px', lineHeight: '1.6' }}>
              {siteConfig.description}
            </p>
            <div className="d-flex gap-2">
              <a 
                href={siteConfig.socialLinks.facebook} 
                className={`${isDark ? 'text-white-50 hover-text-white border-secondary' : 'text-muted border-light'} d-flex align-items-center justify-content-center border rounded-circle`} 
                style={{ width: '32px', height: '32px' }}
                aria-label="Facebook"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a 
                href={siteConfig.socialLinks.instagram} 
                className={`${isDark ? 'text-white-50 hover-text-white border-secondary' : 'text-muted border-light'} d-flex align-items-center justify-content-center border rounded-circle`} 
                style={{ width: '32px', height: '32px' }}
                aria-label="Instagram"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
              <a 
                href={siteConfig.socialLinks.youtube} 
                className={`${isDark ? 'text-white-50 hover-text-white border-secondary' : 'text-muted border-light'} d-flex align-items-center justify-content-center border rounded-circle`} 
                style={{ width: '32px', height: '32px' }}
                aria-label="YouTube"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>
              </a>
              <a 
                href={siteConfig.socialLinks.tiktok} 
                className={`${isDark ? 'text-white-50 hover-text-white border-secondary' : 'text-muted border-light'} d-flex align-items-center justify-content-center border rounded-circle`} 
                style={{ width: '32px', height: '32px' }}
                aria-label="TikTok"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-lg-3 col-md-6 col-12">
            <h6 className={`${isDark ? 'text-white' : 'text-dark'} fw-bold text-uppercase small mb-3`}>{t('footer.quickLinks', 'QUICK LINKS')}</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small" style={{ fontSize: '13px' }}>
              <li><Link to="/inventory" className={`${isDark ? 'text-white-50 hover-text-white' : 'text-secondary hover-text-dark'} text-decoration-none`}>{t('nav.inventory', 'Inventory')}</Link></li>
              <li><Link to="/inventory" className={`${isDark ? 'text-white-50 hover-text-white' : 'text-secondary hover-text-dark'} text-decoration-none`}>{t('nav.shopByType', 'Shop by Type')}</Link></li>
              <li><Link to="/financing" className={`${isDark ? 'text-white-50 hover-text-white' : 'text-secondary hover-text-dark'} text-decoration-none`}>{t('nav.financing', 'Financing')}</Link></li>
              <li><Link to="/inventory" className={`${isDark ? 'text-white-50 hover-text-white' : 'text-secondary hover-text-dark'} text-decoration-none`}>{t('popularPicks.title', 'Specials')}</Link></li>
              <li><Link to="/about" className={`${isDark ? 'text-white-50 hover-text-white' : 'text-secondary hover-text-dark'} text-decoration-none`}>{t('nav.about', 'About Us')}</Link></li>
              <li><Link to="/contact" className={`${isDark ? 'text-white-50 hover-text-white' : 'text-secondary hover-text-dark'} text-decoration-none`}>{t('nav.contact', 'Contact Us')}</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="col-lg-3 col-md-6 col-12">
            <h6 className={`${isDark ? 'text-white' : 'text-dark'} fw-bold text-uppercase small mb-3`}>{t('footer.customerCare', 'CUSTOMER CARE')}</h6>
            <ul className={`list-unstyled d-flex flex-column gap-3 small ${isDark ? 'text-white-50' : 'text-secondary'}`} style={{ fontSize: '13px' }}>
              <li className="d-flex align-items-start gap-2">
                <Phone size={16} className="text-danger flex-shrink-0 mt-0.5" />
                <a href={`tel:${siteConfig.contact.phoneRaw}`} className="text-decoration-none text-reset">{siteConfig.contact.phone}</a>
              </li>
              <li className="d-flex align-items-start gap-2">
                <Mail size={16} className="text-danger flex-shrink-0 mt-0.5" />
                <a href={`mailto:${siteConfig.contact.email}`} className="text-break text-decoration-none text-reset">{siteConfig.contact.email}</a>
              </li>
              <li className="d-flex align-items-start gap-2">
                <MapPin size={16} className="text-danger flex-shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours */}
          <div className="col-lg-3 col-md-6 col-12">
            <h6 className={`${isDark ? 'text-white' : 'text-dark'} fw-bold text-uppercase small mb-3`}>{t('footer.hours', 'HOURS')}</h6>
            <div className={`small ${isDark ? 'text-white-50' : 'text-secondary'}`} style={{ fontSize: '13px' }}>
              <div className="mb-3">
                <strong className={`${isDark ? 'text-white' : 'text-dark'} d-block mb-1`}>{t('footer.sales', 'Sales')}</strong>
                <div className="d-flex justify-content-between">
                  <span>{t('footer.monSat', 'Mon - Sat')}</span>
                  <span>9:00 AM - 7:00 PM</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>{t('footer.sunday', 'Sunday')}</span>
                  <span className="text-danger">{t('footer.closed', 'Closed')}</span>
                </div>
              </div>
              <div>
                <strong className={`${isDark ? 'text-white' : 'text-dark'} d-block mb-1`}>{t('footer.service', 'Service')}</strong>
                <div className="d-flex justify-content-between">
                  <span>{t('footer.monSat', 'Mon - Sat')}</span>
                  <span>7:00 AM - 6:00 PM</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>{t('footer.sunday', 'Sunday')}</span>
                  <span className="text-danger">{t('footer.closed', 'Closed')}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright Bottom Bar */}
        <div className={`border-top ${isDark ? 'border-secondary' : 'border-light'} mt-5 pt-3 d-flex justify-content-between align-items-center flex-wrap gap-3 small ${isDark ? 'text-white-50' : 'text-muted'}`} style={{ fontSize: '12px' }}>
          <span>© {new Date().getFullYear()} {siteConfig.name}. {t('footer.allRightsReserved', 'All rights reserved.')}</span>
          
          <div className="d-flex align-items-center gap-3">
            <LanguageSwitcher isDark={isDark} compact={true} showLabel={true} />
            <span className="opacity-25">|</span>
            <a href="#privacy" className="text-decoration-none text-reset hover-text-white">{t('footer.privacyPolicy', 'Privacy Policy')}</a>
            <span>|</span>
            <a href="#terms" className="text-decoration-none text-reset hover-text-white">{t('footer.termsOfUse', 'Terms of Use')}</a>
            <span>|</span>
            <a href="#sitemap" className="text-decoration-none text-reset hover-text-white">{t('footer.sitemap', 'Sitemap')}</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
