import React from 'react';
import { Phone } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

const ContactCallout = () => {
  return (
    <div className="mt-5 p-4 rounded-3 bg-light border border-light d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
      <div className="d-flex align-items-center gap-3">
        <img 
          src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=400&q=80" 
          alt="Contact Support Vehicle" 
          className="rounded-2 object-fit-cover d-none d-sm-block"
          style={{ width: '110px', height: '60px' }}
        />
        <div>
          <h6 className="fw-bold text-dark m-0">Have Questions? Call Us Now!</h6>
          <small className="text-secondary">Our friendly customer care team is ready to assist you.</small>
        </div>
      </div>

      <a 
        href={`tel:${siteConfig.contact.phoneRaw}`} 
        className="btn btn-brand-green px-4 py-2.5 fw-bold d-flex align-items-center gap-2"
      >
        <Phone size={16} />
        <span>{siteConfig.contact.phone}</span>
      </a>
    </div>
  );
};

export default ContactCallout;
