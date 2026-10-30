import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Users, 
  CircleDollarSign, 
  Clock, 
  Sparkles, 
  HeartHandshake, 
  CheckCircle2 
} from 'lucide-react';

export default function WhyChooseUs({ onStartProject }) {
  const reasons = [
    {
      icon: ShieldCheck,
      title: 'Premium Engineering Quality',
      desc: 'NDT core-tested M30+ concrete and primary Fe550D rebar designed for Seismic Zone-IV stability.',
      stat: '100% Tested'
    },
    {
      icon: Users,
      title: 'Experienced Professionals',
      desc: 'Chartered structural engineers, master masons, and licensed architectural planners.',
      stat: '10+ Yrs Exp.'
    },
    {
      icon: CircleDollarSign,
      title: '100% Transparent Pricing',
      desc: 'Contractually fixed line-item BOQ with zero mid-build price surprises or hidden variation costs.',
      stat: '0% Escalation'
    },
    {
      icon: Clock,
      title: 'Guaranteed On-Time Delivery',
      desc: 'Milestone-linked scheduling enforced with penalty-backed contractual handover timelines.',
      stat: '98.4% On Time'
    },
    {
      icon: Sparkles,
      title: 'Certified Grade-A Materials',
      desc: 'Direct-from-manufacturer sourcing of UltraTech, Tata Tiscon, Saint-Gobain, and Kohler.',
      stat: 'ISO 9001'
    },
    {
      icon: HeartHandshake,
      title: 'Lifelong Peace of Mind',
      desc: '15-year transferable structural warranty backed by 24/7 dedicated maintenance support.',
      stat: '15 Yrs Support'
    }
  ];

  return (
    <section
      id="why-choose-us"
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
        style={{ top: '20px', right: '4%' }}
      >
        ADVANTAGES
      </div>

      {/* Floating Geometric Accents from Reference Style */}
      <div
        className="geo-ring"
        style={{
          position: 'absolute',
          top: '90px',
          left: '3%',
          width: '38px',
          height: '38px',
        }}
      />
      <div
        className="geo-diamond"
        style={{
          position: 'absolute',
          bottom: '80px',
          right: '5%',
          width: '28px',
          height: '28px',
        }}
      />

      <div className="app-container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ marginBottom: '46px' }}>
          <div className="badge-gold" style={{ marginBottom: '14px' }}>
            <ShieldCheck size={13} color="#000000" />
            <span>06 // UNCOMPROMISING ADVANTAGES • WHY CHOOSE YELOLINE</span>
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
                Why Choose Yeloline
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
                We have eliminated the uncertainty, delays, and hidden costs typical of conventional construction.
                Here is why discerning homeowners across Gujarat trust Yeloline.
              </p>
            </div>
          </div>
        </div>

        {/* Split Screen Layout with Offset Backdrop Block */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '42px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Visual Showcase with Offset Solid Yellow Backdrop */}
          <div style={{ position: 'relative', padding: '16px 16px 0 0' }}>
            {/* Signature Reference Element: Offset Solid Yellow Block */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '92%',
                height: '92%',
                backgroundColor: '#F9DF04',
                borderRadius: '4px',
                zIndex: 0,
              }}
            />

            <div
              style={{
                position: 'relative',
                zIndex: 1,
                borderRadius: '4px',
                overflow: 'hidden',
                border: '2px solid #000000',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.2)',
                backgroundColor: '#000000',
                marginTop: '16px',
                marginLeft: '16px',
              }}
            >
              <img
                src="/images/precision_craft.jpg"
                alt="Yeloline Construction Precision & Craftsmanship"
                style={{
                  width: '100%',
                  height: '460px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* Floating Trust Card */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  backgroundColor: 'rgba(0, 0, 0, 0.95)',
                  backdropFilter: 'blur(12px)',
                  color: '#FFFFFF',
                  padding: '18px 20px',
                  borderRadius: '3px',
                  border: '1px solid #F9DF04',
                  boxShadow: '0 12px 28px rgba(0,0,0,0.3)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.72rem',
                    fontWeight: 900,
                    color: '#F9DF04',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                  }}
                >
                  ENGINEERING PROTOCOL GUARANTEE
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1rem',
                    fontWeight: 800,
                    marginBottom: '8px',
                    color: '#FFFFFF',
                  }}
                >
                  "Zero Excuses. Zero Escalations. Complete Perfection."
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} color="#F9DF04" />
                  <span style={{ fontSize: '0.82rem', color: '#E2E8F0', fontWeight: 600 }}>
                    Contractually Guaranteed Handover Dates
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 6 Compact Feature Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
            }}
          >
            {reasons.map((r, idx) => {
              const IconComponent = r.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3 }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '3px',
                    border: '1px solid #E2E8F0',
                    borderLeft: '4px solid #000000',
                    padding: '20px 18px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#000000';
                    e.currentTarget.style.borderLeftColor = '#F9DF04';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.09)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.borderLeftColor = '#000000';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.04)';
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '12px',
                      }}
                    >
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '3px',
                          backgroundColor: '#000000',
                          color: '#F9DF04',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <IconComponent size={19} />
                      </div>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.72rem',
                          fontWeight: 900,
                          backgroundColor: '#F9DF04',
                          color: '#000000',
                          padding: '3px 8px',
                          borderRadius: '2px',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {r.stat}
                      </span>
                    </div>

                    <h4
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1rem',
                        fontWeight: 900,
                        color: '#000000',
                        textTransform: 'uppercase',
                        marginBottom: '6px',
                        lineHeight: 1.25,
                      }}
                    >
                      {r.title}
                    </h4>

                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.84rem',
                        color: '#64748B',
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {r.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Action Prompt */}
        <div
          style={{
            marginTop: '42px',
            padding: '24px 28px',
            backgroundColor: '#000000',
            borderRadius: '4px',
            borderLeft: '5px solid #F9DF04',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '18px',
            boxShadow: '0 16px 32px rgba(0,0,0,0.18)',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                fontWeight: 900,
                color: '#FFFFFF',
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
              }}
            >
              Ready to experience transparent, stress-free construction?
            </div>
            <div style={{ color: '#94A3B8', fontSize: '0.86rem', marginTop: '4px' }}>
              Schedule a 1-on-1 blueprint consultation with our lead structural engineers.
            </div>
          </div>

          <button
            onClick={onStartProject}
            className="btn-yellow-ref"
            id="why-choose-cta"
            style={{ padding: '11px 22px', fontSize: '0.84rem' }}
          >
            <span>Book Free Consultation</span>
            <span style={{ fontSize: '0.9rem' }}>↓</span>
          </button>
        </div>
      </div>
    </section>
  );
}
