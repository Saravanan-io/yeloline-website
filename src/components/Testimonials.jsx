import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { MessageSquare, Star, ArrowLeft, ArrowRight, Quote, CheckCircle2 } from 'lucide-react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, y: 0, 
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <section
      id="testimonials"
      ref={ref}
      style={{
        backgroundColor: '#FAFBFC',
        padding: '110px 0',
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

      {/* Ambient gradient */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: 0,
          width: '40%',
          height: '60%',
          background: 'radial-gradient(ellipse at 80% 50%, rgba(249, 223, 4, 0.04) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating Geometric Accents */}
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

      <motion.div 
        className="app-container" 
        style={{ position: 'relative', zIndex: 10 }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} style={{ marginBottom: '48px' }}>
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
                  fontWeight: 800,
                  color: '#0F172A',
                  letterSpacing: '-0.03em',
                  marginBottom: '12px',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                Built On Trust & Delivered Promises
              </h2>
              <p
                style={{
                  color: '#64748B',
                  fontSize: '1rem',
                  maxWidth: '680px',
                  lineHeight: 1.7,
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                Hear directly from the families and visionary homeowners whose architectural dreams we've brought to life.
              </p>
            </div>

            {/* Carousel Controls - Modern Rounded */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrev}
                aria-label="Previous Testimonial"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  color: '#0F172A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                }}
              >
                <ArrowLeft size={16} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                aria-label="Next Testimonial"
                className="btn-yellow-ref"
                style={{ width: '44px', height: '44px', padding: 0, justifyContent: 'center' }}
              >
                <ArrowRight size={16} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div variants={itemVariants} style={{ position: 'relative' }}>
          {/* Gradient Backdrop */}
          <div
            style={{
              position: 'absolute',
              top: '-10px',
              left: '-10px',
              width: '70%',
              height: '70%',
              background: 'linear-gradient(135deg, rgba(249, 223, 4, 0.5) 0%, rgba(249, 223, 4, 0.15) 100%)',
              borderRadius: 'var(--radius-xl)',
              zIndex: 0,
              filter: 'blur(1px)',
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20, scale: 0.99 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.99 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                zIndex: 1,
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                padding: '44px 40px',
                boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.1)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '40px',
                alignItems: 'center',
              }}
            >
              {/* Left Column: Quote Statement */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '22px' }}>
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#F9DF04" color="#E5CC00" />
                  ))}
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#64748B',
                      marginLeft: '8px',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    5.0 Verified
                  </span>
                </div>

                <div
                  style={{
                    position: 'relative',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)',
                    fontWeight: 500,
                    lineHeight: 1.65,
                    color: '#1E293B',
                    marginBottom: '28px',
                  }}
                >
                  <Quote
                    size={36}
                    color="#F9DF04"
                    style={{
                      position: 'absolute',
                      top: '-18px',
                      left: '-26px',
                      opacity: 0.35,
                      zIndex: 0,
                    }}
                  />
                  <span style={{ position: 'relative', zIndex: 1 }}>
                    "{current.quote}"
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#10B981" />
                  <span
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#64748B',
                      letterSpacing: '0.03em',
                    }}
                  >
                    Verified Turnkey Build • {current.year}
                  </span>
                </div>
              </div>

              {/* Right Column: Client Meta Card */}
              <div
                style={{
                  background: 'linear-gradient(145deg, #F8FAFC 0%, #F1F5F9 100%)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  borderLeft: '3px solid #0F172A',
                  padding: '28px 26px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #F9DF04, #E5CC00)',
                    color: '#000000',
                    display: 'inline-block',
                    padding: '5px 14px',
                    borderRadius: 'var(--radius-full)',
                    marginBottom: '16px',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  VERIFIED CLIENT
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.3rem',
                    fontWeight: 800,
                    color: '#0F172A',
                    marginBottom: '5px',
                  }}
                >
                  {current.author}
                </h3>

                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    color: '#92750a',
                    marginBottom: '18px',
                  }}
                >
                  {current.role}
                </div>

                <div
                  style={{
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                    <span style={{ color: '#64748B', fontWeight: 500 }}>Location:</span>
                    <strong style={{ color: '#0F172A', fontWeight: 700 }}>{current.location}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                    <span style={{ color: '#64748B', fontWeight: 500 }}>Project:</span>
                    <strong style={{ color: '#0F172A', fontWeight: 700 }}>{current.projectType}</strong>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Testimonial Selectors / Dots - Modern */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              marginTop: '28px',
            }}
          >
            {testimonials.map((_, dotIdx) => (
              <motion.button
                key={dotIdx}
                whileHover={{ scale: 1.2 }}
                onClick={() => setActiveIndex(dotIdx)}
                aria-label={`Jump to Testimonial ${dotIdx + 1}`}
                style={{
                  width: activeIndex === dotIdx ? '28px' : '10px',
                  height: '8px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: activeIndex === dotIdx ? '#0F172A' : '#CBD5E1',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
