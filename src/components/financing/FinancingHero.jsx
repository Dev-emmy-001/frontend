import React from 'react';
import { useTranslation } from '../../context/LanguageContext';

const FinancingHero = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center max-w-xl mx-auto mb-5" style={{ maxWidth: '680px' }}>
      <span className="text-danger fw-bold text-uppercase small">FAST & SECURE</span>
      <h1 className="fw-black text-uppercase display-5 mb-3" style={{ fontWeight: '900' }}>
        {t('financing.title', 'AUTO FINANCING MADE SIMPLE')}
      </h1>
      <p className="text-secondary fs-6 leading-relaxed">
        {t('financing.subtitle', 'Get pre-approved in minutes with competitive interest rates tailored to your unique credit profile. Transparent terms and no hidden fees.')}
      </p>
    </div>
  );
};

export default FinancingHero;
