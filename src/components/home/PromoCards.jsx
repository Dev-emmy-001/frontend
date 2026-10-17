import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../context/LanguageContext';

const PromoCards = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-dark py-5">
      <div className="container">
        <div className="row g-4">
          
          {/* Card 1: Easy Financing */}
          <div className="col-md-6">
            <div 
              className="p-5 rounded-3 text-white position-relative overflow-hidden d-flex flex-column justify-content-center h-100"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '260px',
                borderRadius: '8px'
              }}
            >
              <span className="text-danger fw-bold text-uppercase small mb-1">
                {t('promos.financingBadge', 'EASY FINANCING')}
              </span>
              <h3 className="fw-black text-uppercase mb-2" style={{ fontWeight: '900' }}>
                {t('promos.financingTitle', 'DRIVE NOW, PAY YOUR WAY')}
              </h3>
              <p className="text-secondary small mb-4" style={{ maxWidth: '300px' }}>
                {t('promos.financingDesc', 'Get pre-approved in minutes and choose a plan that works for you.')}
              </p>
              <Link 
                to="/signup" 
                className="btn btn-brand-red me-auto px-4 py-2.5 small fw-bold"
              >
                {t('promos.financingBtn', 'GET PRE-APPROVED')}
              </Link>
            </div>
          </div>

          {/* Card 2: Value Your Trade */}
          <div className="col-md-6">
            <div 
              className="p-5 rounded-3 text-white position-relative overflow-hidden d-flex flex-column justify-content-center h-100"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=800&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '260px',
                borderRadius: '8px'
              }}
            >
              <span className="text-danger fw-bold text-uppercase small mb-1">
                {t('promos.tradeBadge', 'VALUE YOUR TRADE')}
              </span>
              <h3 className="fw-black text-uppercase mb-2" style={{ fontWeight: '900' }}>
                {t('promos.tradeTitle', "WHAT'S YOUR CAR WORTH?")}
              </h3>
              <p className="text-secondary small mb-4" style={{ maxWidth: '300px' }}>
                {t('promos.tradeDesc', 'Get a fair market value for your vehicle in just a few clicks.')}
              </p>
              <Link 
                to="/contact" 
                className="btn btn-outline-light me-auto px-4 py-2.5 small fw-bold" 
                style={{ borderRadius: '4px' }}
              >
                {t('promos.tradeBtn', 'VALUE YOUR TRADE')}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PromoCards;
