import React from 'react';
import { Award, Car, ShieldCheck, Tag } from 'lucide-react';

const AboutFeatures = () => {
  const features = [
    {
      icon: <Award size={22} />,
      title: '10+ Years of Experience',
      description: 'Serving our community with quality vehicles since 2013.'
    },
    {
      icon: <Car size={22} />,
      title: 'Thousands of Happy Customers',
      description: 'Join thousands of satisfied customers who trust us.'
    },
    {
      icon: <ShieldCheck size={22} />,
      title: 'Quality You Can Trust',
      description: 'Every vehicle is thoroughly inspected for your peace of mind.'
    },
    {
      icon: <Tag size={22} />,
      title: 'Best Price Guarantee',
      description: 'We offer competitive prices and unbeatable value.'
    }
  ];

  return (
    <section className="container py-4">
      <div className="row g-4">
        {features.map((feature, idx) => (
          <div key={idx} className="col-12 col-sm-6 col-lg-3">
            <div className="about-feature-card p-4 h-100">
              <div className="icon-box-green mb-3">
                {feature.icon}
              </div>
              <h6 className="fw-bold text-dark mb-1">{feature.title}</h6>
              <p className="text-secondary small m-0">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutFeatures;
