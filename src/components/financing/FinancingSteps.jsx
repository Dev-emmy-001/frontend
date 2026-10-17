import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, CreditCard, CheckCircle } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';

const FinancingSteps = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: <Calculator size={40} className="text-danger mb-3" />,
      step: t('financing.step1Title', '1. Apply Online'),
      description: t('financing.step1Desc', 'Fill out our secure 2-minute pre-approval application form without impacting your credit score.')
    },
    {
      icon: <CreditCard size={40} className="text-danger mb-3" />,
      step: t('financing.step2Title', '2. Choose Terms'),
      description: t('financing.step2Desc', 'Select your customized monthly payment plan, interest rate, and down payment amount.')
    },
    {
      icon: <CheckCircle size={40} className="text-danger mb-3" />,
      step: t('financing.step3Title', '3. Drive Home'),
      description: t('financing.step3Desc', 'Finalize your contract seamlessly online and pick up your vehicle or schedule doorstep delivery.')
    }
  ];

  return (
    <div>
      <div className="row g-4 justify-content-center">
        {steps.map((item, idx) => (
          <div key={idx} className="col-md-6 col-lg-4">
            <div className="bg-black border border-secondary p-4 rounded-3 text-center h-100 d-flex flex-column justify-content-between">
              <div>
                {item.icon}
                <h5 className="fw-bold text-uppercase text-white mb-2">{item.step}</h5>
                <p className="text-secondary small m-0">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
        <Link 
          to="/signup" 
          className="btn btn-brand-red px-5 py-3 fw-bold text-uppercase animate-btn"
        >
          {t('hero.getPreApproved', 'START PRE-APPROVAL')}
        </Link>
      </div>
    </div>
  );
};

export default FinancingSteps;
