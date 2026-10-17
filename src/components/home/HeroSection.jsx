import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InventorySearchBox from './InventorySearchBox';
import { useTranslation } from '../../context/LanguageContext';

const HeroSection = () => {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const { t } = useTranslation();

  const heroImages = [
    'https://di-uploads-pod23.dealerinspire.com/lexusoflasvegas/uploads/2023/06/2024_Lexus_GX_Overtrail_008-scaled-1.jpg',
    'https://www.greencarguide.co.uk/wp-content/uploads/2026/02/Jaguar-GT.jpeg',
    'https://cdn.sanity.io/images/xyy6okk0/production/c065822395d9bf8d0b6d891393dcc616bc000313-1400x934.webp',
    'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=80'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
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
        <div className="max-w-xl" style={{ maxWidth: '600px' }}>
          <p className="text-danger fw-bold text-uppercase tracking-wider small m-0 animate-slide-right">
            {t('hero.tagline1', 'EXCEPTIONAL CARS.')}
          </p>
          <p className="text-white fw-bold text-uppercase tracking-wider small mb-3 animate-slide-right delay-1">
            {t('hero.tagline2', 'EXCEPTIONAL EXPERIENCE.')}
          </p>
          <h1 className="display-4 fw-black text-uppercase text-white mb-2 animate-slide-right delay-2" style={{ fontSize: '3rem', fontWeight: '900', lineHeight: '1.1' }}>
            {t('hero.titlePrefix', 'FIND YOUR')} <br />
            <span className="text-danger">{t('hero.titleHighlight', 'PERFECT MATCH')}</span>
          </h1>
          <p className="text-secondary mb-4 fs-6 animate-slide-right delay-3">
            {t('hero.subtitle', 'Shop our wide selection of quality new and pre-owned vehicles.')}
          </p>
          <div className="d-flex gap-3 mb-5 animate-slide-right delay-4 flex-wrap">
            <Link 
              to="/inventory" 
              className="btn btn-brand-red px-4 py-2.5 fw-bold text-uppercase animate-btn"
            >
              {t('hero.browseInventory', 'BROWSE INVENTORY')}
            </Link>
            <Link 
              to="/signup" 
              className="btn btn-outline-light px-4 py-2.5 fw-bold text-uppercase animate-btn" 
              style={{ borderRadius: '4px' }}
            >
              {t('hero.getPreApproved', 'GET PRE-APPROVED')}
            </Link>
          </div>
        </div>

        {/* Search Inventory Filter Box Component */}
        <InventorySearchBox />
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
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
