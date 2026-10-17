import React from 'react';
import { MapPin, Phone, Globe } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import CurrencySwitcher from './CurrencySwitcher';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '../../context/LanguageContext';

const TopBar = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-black text-white-50 py-1.5 border-bottom border-secondary small">
      <div className="container d-flex flex-wrap justify-content-between align-items-center gap-2">
        
        {/* Left: Global Contact / Locations */}
        <div className="d-flex align-items-center gap-3 text-white-50 small flex-wrap">
          <span className="d-inline-flex align-items-center gap-1">
            <MapPin size={13} className="text-danger" />
            <span className="text-truncate" style={{ maxWidth: '280px' }}>{siteConfig.contact.address}</span>
          </span>
          <span className="d-none d-lg-inline text-secondary">|</span>
          <span className="d-none d-md-inline-flex align-items-center gap-1">
            <Phone size={13} className="text-danger" /> {siteConfig.contact.phone}
          </span>
          <span className="d-none d-xl-inline text-white-50">
            • {t('topBar.shippingEscrow', 'Worldwide Port Shipping & Customs Escrow')}
          </span>
        </div>

        {/* Right: Currency Engine Switcher & Language Switcher */}
        <div className="d-flex align-items-center gap-2 ms-auto">
          <LanguageSwitcher isDark={true} />
          <CurrencySwitcher isDark={true} showCountry={true} />
        </div>

      </div>
    </div>
  );
};

export default TopBar;

