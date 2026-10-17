import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../context/LanguageContext';

const ContactHero = () => {
  const { t } = useTranslation();

  return (
    <section className="container pt-5 pb-4">
      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb small">
          <li className="breadcrumb-item">
            <Link to="/" className="text-secondary text-decoration-none">{t('nav.home', 'Home')}</Link>
          </li>
          <li className="breadcrumb-item active text-dark fw-semibold" aria-current="page">
            {t('nav.contact', 'Contact Us')}
          </li>
        </ol>
      </nav>

      <div className="row align-items-center g-4">
        <div className="col-lg-6">
          <h1 className="display-4 fw-black text-dark mb-2">
            {t('contact.title', 'CONTACT US')}
          </h1>
          <p className="text-secondary fs-6 leading-relaxed m-0" style={{ maxWidth: '480px' }}>
            {t('contact.subtitle', "We're here to help! Reach out to us with any questions or visit us at our location.")}
          </p>
        </div>

        <div className="col-lg-6 text-center">
          <img 
            src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80" 
            alt="Dealership Contact Vehicle" 
            className="img-fluid object-fit-contain"
            style={{ maxHeight: '280px' }}
          />
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
