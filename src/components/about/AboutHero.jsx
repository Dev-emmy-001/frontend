import React from 'react';

const AboutHero = () => {
  return (
    <section className="container py-5">
      <div className="row align-items-center g-5">
        {/* Left Column: Heading & Description */}
        <div className="col-lg-6">
          <h1 className="display-4 fw-black text-dark mb-3">
            ABOUT <span className="text-success" style={{ color: '#065F46' }}>SUMMIT</span> <br />
            <span className="text-success" style={{ color: '#065F46' }}>AUTO GROUP</span>
          </h1>
          <p className="text-secondary fs-6 leading-relaxed mb-0" style={{ maxWidth: '520px' }}>
            For over a decade, Summit Auto Group has been helping drivers find the perfect vehicle with honesty, transparency, and a commitment to exceptional service.
          </p>
        </div>

        {/* Right Column: Dealership Facility Image */}
        <div className="col-lg-6">
          <div className="rounded-4 overflow-hidden shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80" 
              alt="Summit Auto Group Building" 
              className="w-100 object-fit-cover"
              style={{ maxHeight: '380px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
