import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Star, ArrowLeft, ArrowRight, Quote, CheckCircle2 } from 'lucide-react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      quote:
        "Building our 6,000 sq.ft cantilever villa in Surat seemed overwhelming with multiple contractors quoting arbitrary escalation clauses. Yeloline was an oasis of clarity. Their fixed BOQ didn't change by a single rupee, and the structural finishing is world-class.",
      author: 'Rajesh & Meera Patel',
      role: 'Owners, Palm Springs Villa',
      location: 'Surat, Gujarat',
      projectType: '5 BHK Turnkey Luxury Residence',
      rating: 5,
      year: 'Handover 2025',
    },
    {
      id: 2,
      quote:
        'The level of engineering discipline Yeloline brings is rare in residential construction. Every cube of concrete was tested, and the live WhatsApp daily photo log meant we never had to worry about what was happening on site while traveling abroad.',
      author: 'Dr. Anand Desai',
      role: 'Owner, Skyline Residency',
      location: 'Ahmedabad, Gujarat',
      projectType: 'Bespoke Contemporary Villa',
      rating: 5,
      year: 'Handover 2024',
    },
    {
      id: 3,
      quote:
        'Our existing home had severe waterproofing issues and outdated spatial layout. Yeloline completely metamorphosed the structure, added an entire cantilevered second floor, and delivered ahead of schedule with a 15-year warranty.',
      author: 'Vikram & Sonal Shah',
      role: 'Structural Metamorphosis Project',
      location: 'Vadodara, Gujarat',
      projectType: 'Complete Villa Renovation',
      rating: 5,
      year: 'Handover 2024',
    },
    {
      id: 4,
      quote:
        'From our initial sketch on a napkin to the day they handed over the keys, Yeloline treated our budget and dreams with the utmost respect. If you want structural safety and architectural beauty, look nowhere else.',
      author: 'Hiren Mehta',
      role: 'Managing Director, Horizon Global',
      location: 'Rajkot, Gujarat',
      projectType: '4 BHK Minimalist Bungalow',
      rating: 5,
      year: 'Handover 2025',
    },
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      style={{
        backgroundColor: '#FFFFFF',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Watermark Typography */}
      <div
        className="watermark-bg select-none pointer-events-none"
        style={{ top: '20px', left: '4%' }}
      >
        REVIEWS
      </div>

      {/* Floating Geometric Accents from Reference Style */}
      <div
        className="geo-diamond"
        style={{
          position: 'absolute',
          top: '80px',
          right: '5%',
          width: '32px',
          height: '32px',
        }}
      />
      <div
        className="geo-ring"
        style={{
          position: 'absolute',
          bottom: '90px',
          left: '3%',
          width: '40px',
          height: '40px',
        }}
      />

      <div className="app-container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ marginBottom: '46px' }}>
          <div className="badge-gold" style={{ marginBottom: '14px' }}>
            <MessageSquare size={13} color="#000000" />
            <span>09 // CLIENT VOICES • TESTIMONIALS</span>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '24px',
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                  fontWeight: 900,
                  color: '#000000',
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                Built On Trust &amp; Delivered Promises
              </h2>
              <p
                style={{
                  color: '#475569',
                  fontSize: '1rem',
                  maxWidth: '680px',
                  lineHeight: 1.6,
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                Hear directly from the families and visionary homeowners whose architectural dreams we’ve brought to life.
              </p>
            </div>

            {/* Carousel Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={handlePrev}
                aria-label="Previous Testimonial"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '3px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #000000',
                  color: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.color = '#F9DF04';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.color = '#000000';
                }}
              >
                <ArrowLeft size={16} />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next Testimonial"
                className="btn-yellow-ref"
                style={{ width: '40px', height: '40px', padding: 0, justifyContent: 'center' }}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Testimonial Canvas with Offset Yellow Backdrop */}
        <div style={{ position: 'relative' }}>
          {/* Yellow Offset Backdrop Block */}
          <div
            style={{
              position: 'absolute',
              top: '-12px',
              left: '-12px',
              width: '80%',
              height: '80%',
              backgroundColor: '#F9DF04',
              borderRadius: '4px',
              zIndex: 0,
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
              style={{
                position: 'relative',
                zIndex: 1,
                backgroundColor: '#FFFFFF',
                borderRadius: '4px',
                border: '2px solid #000000',
                padding: '40px 36px',
                boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '36px',
                alignItems: 'center',
              }}
            >
              {/* Left Column: Quote Statement */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#F9DF04" color="#000000" />
                  ))}
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.8rem',
                      fontWeight: 900,
                      color: '#000000',
                      marginLeft: '6px',
                      letterSpacing: '0.04em',
                    }}
                  >
                    5.0 VERIFIED RATING
                  </span>
                </div>

                <div
                  style={{
                    position: 'relative',
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.15rem, 1.8vw, 1.45rem)',
                    fontWeight: 700,
                    lineHeight: 1.55,
                    color: '#000000',
                    marginBottom: '24px',
                  }}
                >
                  <Quote
                    size={32}
                    color="#F9DF04"
                    style={{
                      position: 'absolute',
                      top: '-16px',
                      left: '-24px',
                      opacity: 0.5,
                      zIndex: 0,
                    }}
                  />
                  <span style={{ position: 'relative', zIndex: 1 }}>
                    "{current.quote}"
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#000000" />
                  <span
                    style={{
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      color: '#475569',
                      textTransform: 'uppercase',
                    }}
                  >
                    Verified Turnkey Build Handover • {current.year}
                  </span>
                </div>
              </div>

              {/* Right Column: Client Meta Card */}
              <div
                style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: '3px',
                  border: '1px solid #CBD5E1',
                  borderLeft: '4px solid #000000',
                  padding: '26px 24px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.72rem',
                    fontWeight: 900,
                    backgroundColor: '#F9DF04',
                    color: '#000000',
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: '2px',
                    marginBottom: '14px',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  VERIFIED CLIENT
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.35rem',
                    fontWeight: 900,
                    color: '#000000',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                  }}
                >
                  {current.author}
                </h3>

                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: '#B45309',
                    marginBottom: '16px',
                  }}
                >
                  {current.role}
                </div>

                <div
                  style={{
                    paddingTop: '14px',
                    borderTop: '1px solid #E2E8F0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                    <span style={{ color: '#64748B', fontWeight: 600 }}>Location:</span>
                    <strong style={{ color: '#000000', fontWeight: 700 }}>{current.location}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                    <span style={{ color: '#64748B', fontWeight: 600 }}>Project:</span>
                    <strong style={{ color: '#000000', fontWeight: 700 }}>{current.projectType}</strong>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Testimonial Selectors / Dots */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              marginTop: '26px',
            }}
          >
            {testimonials.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setActiveIndex(dotIdx)}
                aria-label={`Jump to Testimonial ${dotIdx + 1}`}
                style={{
                  width: activeIndex === dotIdx ? '28px' : '10px',
                  height: '8px',
                  borderRadius: '2px',
                  backgroundColor: activeIndex === dotIdx ? '#000000' : '#CBD5E1',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
