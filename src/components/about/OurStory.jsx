import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

const OurStory = () => {
  return (
    <section className="container py-5">
      <div className="row align-items-center g-5">
        
        {/* Left Column: Image with Play badge */}
        <div className="col-lg-6">
          <div className="position-relative rounded-4 overflow-hidden shadow">
            <img 
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80" 
              alt="Car driving on road" 
              className="w-100 object-fit-cover"
              style={{ height: '360px' }}
            />
            
            {/* Watch Our Story Play Button Card */}
            <div className="position-absolute bottom-0 start-0 m-3 p-3 video-play-badge d-flex align-items-center gap-3">
              <button 
                type="button"
                className="btn btn-success rounded-circle p-2.5 d-flex align-items-center justify-content-center" 
                style={{ backgroundColor: '#065F46', borderColor: '#065F46' }}
                aria-label="Play Story Video"
              >
                <Play size={18} fill="#ffffff" />
              </button>
              <div>
                <h6 className="fw-bold text-dark m-0 small">Watch Our Story</h6>
                <span className="text-secondary" style={{ fontSize: '11px' }}>
                  See how we're making a difference
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Story Narrative */}
        <div className="col-lg-6">
          <span className="text-success fw-bold text-uppercase tracking-wider small" style={{ color: '#065F46' }}>
            OUR STORY
          </span>
          <h2 className="display-6 fw-black text-dark mb-3">
            Driven by Excellence. <br />Focused on You.
          </h2>
          <p className="text-secondary small leading-relaxed mb-3">
            Summit Auto Group was founded with a simple mission: to provide a better car buying experience. We believe in building lasting relationships with our customers by offering a wide selection of reliable vehicles, flexible financing options, and unmatched customer service.
          </p>
          <p className="text-secondary small leading-relaxed mb-4">
            Whether you're buying your first car or upgrading to your dream vehicle, our team is here to guide you every step of the way.
          </p>

          <Link to="/inventory" className="btn btn-brand-green px-4 py-2.5 text-uppercase small">
            VIEW OUR INVENTORY
          </Link>
        </div>

      </div>
    </section>
  );
};

export default OurStory;
