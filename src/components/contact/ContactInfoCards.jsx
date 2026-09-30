import React from 'react';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

const ContactInfoCards = () => {
  return (
    <section className="container pb-4">
      <div className="floating-contact-card p-4">
        <div className="row g-4">
          
          {/* Phone Card */}
          <div className="col-12 col-sm-6 col-lg-3 border-end-lg border-light">
            <div className="d-flex align-items-start gap-3">
              <div className="p-2.5 rounded-3 bg-success bg-opacity-10 text-success" style={{ color: '#065F46' }}>
                <Phone size={22} />
              </div>
              <div>
                <h6 className="fw-bold text-dark m-0">Phone</h6>
                <p className="fw-bold text-dark small m-0 mt-1">
                  <a href={`tel:${siteConfig.contact.phoneRaw}`} className="text-decoration-none text-reset">
                    {siteConfig.contact.phone}
                  </a>
                </p>
                <small className="text-secondary d-block" style={{ fontSize: '11px' }}>
                  {siteConfig.contact.hours.sales.shortWeekday}
                </small>
                <small className="text-secondary d-block" style={{ fontSize: '11px' }}>
                  Sun: 11AM - 5PM
                </small>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="col-12 col-sm-6 col-lg-3 border-end-lg border-light">
            <div className="d-flex align-items-start gap-3">
              <div className="p-2.5 rounded-3 bg-success bg-opacity-10 text-success" style={{ color: '#065F46' }}>
                <Mail size={22} />
              </div>
              <div>
                <h6 className="fw-bold text-dark m-0">Email</h6>
                <p className="fw-bold text-dark small m-0 mt-1">
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-break text-decoration-none text-reset">
                    {siteConfig.contact.email}
                  </a>
                </p>
                <small className="text-secondary d-block" style={{ fontSize: '11px' }}>
                  We reply within 24 hours
                </small>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="col-12 col-sm-6 col-lg-3 border-end-lg border-light">
            <div className="d-flex align-items-start gap-3">
              <div className="p-2.5 rounded-3 bg-success bg-opacity-10 text-success" style={{ color: '#065F46' }}>
                <MapPin size={22} />
              </div>
              <div>
                <h6 className="fw-bold text-dark m-0">Location</h6>
                <p className="fw-bold text-dark small m-0 mt-1">
                  {siteConfig.contact.address}
                </p>
                <a href="#map" className="text-success fw-bold text-decoration-none d-inline-block mt-1" style={{ fontSize: '11px', color: '#065F46' }}>
                  Get Directions →
                </a>
              </div>
            </div>
          </div>

          {/* Live Chat Card */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="d-flex align-items-start gap-3">
              <div className="p-2.5 rounded-3 bg-success bg-opacity-10 text-success" style={{ color: '#065F46' }}>
                <MessageSquare size={22} />
              </div>
              <div>
                <h6 className="fw-bold text-dark m-0">Live Chat</h6>
                <p className="fw-bold text-dark small m-0 mt-1">Chat with our team</p>
                <small className="text-secondary d-block" style={{ fontSize: '11px' }}>
                  We're online now!
                </small>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactInfoCards;
