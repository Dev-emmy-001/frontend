import React from 'react';
import { ShieldCheck, Tag, DollarSign, Headphones } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';

const ValueProps = () => {
  const { t } = useTranslation();

  const propsList = [
    {
      icon: <ShieldCheck size={32} className="text-danger flex-shrink-0" />,
      title: t('valueProps.trustTitle', 'QUALITY YOU CAN TRUST'),
      description: t('valueProps.trustDesc', 'All vehicles are thoroughly inspected for your peace of mind.')
    },
    {
      icon: <Tag size={32} className="text-danger flex-shrink-0" />,
      title: t('valueProps.priceTitle', 'BEST PRICE GUARANTEE'),
      description: t('valueProps.priceDesc', 'We offer competitive pricing and best value on every vehicle.')
    },
    {
      icon: <DollarSign size={32} className="text-danger flex-shrink-0" />,
      title: t('valueProps.financeTitle', 'FLEXIBLE FINANCING'),
      description: t('valueProps.financeDesc', 'Multiple financing options available to fit your budget.')
    },
    {
      icon: <Headphones size={32} className="text-danger flex-shrink-0" />,
      title: t('valueProps.supportTitle', 'EXPERT SUPPORT'),
      description: t('valueProps.supportDesc', 'Our team is here to help you every step of the way.')
    }
  ];

  return (
    <section className="bg-black text-white py-5 border-top border-bottom border-secondary">
      <div className="container">
        <div className="row g-4 text-center text-md-start">
          {propsList.map((prop, idx) => (
            <div key={idx} className="col-md-3 d-flex align-items-center gap-3">
              {prop.icon}
              <div>
                <h6 className="fw-bold text-uppercase small m-0">{prop.title}</h6>
                <small className="text-secondary" style={{ fontSize: '11px' }}>
                  {prop.description}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
