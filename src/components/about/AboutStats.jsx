import React from 'react';
import { Award, Car, Star, MapPin } from 'lucide-react';

const AboutStats = () => {
  const stats = [
    {
      icon: <Award size={24} className="text-success mb-2" style={{ color: '#065F46' }} />,
      number: '10+',
      label: 'Years in Business'
    },
    {
      icon: <Car size={24} className="text-success mb-2" style={{ color: '#065F46' }} />,
      number: '5,000+',
      label: 'Vehicles Sold'
    },
    {
      icon: <Star size={24} className="text-success mb-2" style={{ color: '#065F46' }} />,
      number: '4.8/5',
      label: 'Customer Rating'
    },
    {
      icon: <MapPin size={24} className="text-success mb-2" style={{ color: '#065F46' }} />,
      number: '3',
      label: 'Locations'
    }
  ];

  return (
    <section className="container py-3 mb-5">
      <div className="stats-bar-wrapper p-4 text-center">
        <div className="row g-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="col-6 col-md-3">
              {stat.icon}
              <h3 className="fw-black text-dark m-0">{stat.number}</h3>
              <span className="text-secondary small">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
