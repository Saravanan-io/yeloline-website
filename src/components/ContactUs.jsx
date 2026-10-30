import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Sparkles, Ruler } from 'lucide-react';

export default function ContactUs() {
  // Configurator state
  const [projectType, setProjectType] = useState('New Luxury Villa');
  const [areaSize, setAreaSize] = useState(4500);
  const [stylePreference, setStylePreference] = useState('Contemporary Glass & Cantilever');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consultationId, setConsultationId] = useState(8492);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setConsultationId(Math.floor(1000 + Math.random() * 9000));
      setSubmitted(true);
    }, 700);
  };

  const projectTypes = [
    'New Luxury Villa',
    'High-End Renovation',
    'Boutique Bungalow',
    'Commercial Landmark'
  ];

  const architecturalStyles = [
    'Contemporary Glass & Cantilever',
    'Perforated Stone Jali & Slate',
    'Minimalist Tropical Biophilic',
    'Modern Heritage Fusion'
  ];

  return (
    <section
      id="contact"
      className="section-wrapper"
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        padding: '100px 0',
      }}
    >
      {/* Background Watermark Typography */}
      <div
        className="watermark-bg select-none pointer-events-none"
        style={{ top: '20px', right: '4%' }}
      >
        CONTACT
      </div>

      {/* Floating Geometric Accents from Reference Style */}
      <div
        className="geo-diamond"
        style={{
          position: 'absolute',
          top: '70px',
          left: '3%',
          width: '32px',
          height: '32px',
        }}
      />
      <div
        className="geo-ring"
        style={{
          position: 'absolute',
          bottom: '80px',
          right: '5%',
          width: '42px',
          height: '42px',
        }}
      />
      <div
        className="geo-triangle"
        style={{
          position: 'absolute',
          bottom: '140px',
          left: '4%',
          width: 0,
          height: 0,
        }}
      />

      <div className="app-container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ marginBottom: '46px' }}>
          <div className="badge-gold" style={{ marginBottom: '14px' }}>
            <Sparkles size={13} color="#000000" />
            <span>10 // PROJECT INCEPTION • CONTACT &amp; FREE QUOTE</span>
          </div>

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
            Start Your Dream Construction
          </h2>
          <p
            style={{
              color: '#475569',
              fontSize: '1rem',
              maxWidth: '700px',
              lineHeight: 1.6,
              margin: 0,
              fontWeight: 500,
            }}
          >
            You have worked hard to realize this vision. Building it should be a seamless, joyful journey. Connect directly with our lead architectural team.
          </p>
        </div>

        {/* Modern Consultation Console with Offset Yellow Backdrop */}
        <div style={{ position: 'relative' }}>
          {/* Yellow Offset Backdrop Block */}
          <div
            style={{
              position: 'absolute',
              top: '-12px',
              right: '-12px',
              width: '85%',
              height: '85%',
              backgroundColor: '#F9DF04',
              borderRadius: '4px',
              zIndex: 0,
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 1,
              background: '#FFFFFF',
              border: '2px solid #000000',
              borderRadius: '4px',
              boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
              overflow: 'hidden',
            }}
          >
            {/* Top Console Navigation Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 24px',
                borderBottom: '2px solid #000000',
                backgroundColor: '#000000',
                color: '#FFFFFF',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#F9DF04', borderRadius: '1px' }} />
                <span style={{ fontSize: '0.84rem', fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
                  YELOLINE ARCHITECTURAL CONSULTATION DESK
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#F9DF04', fontWeight: 700 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F9DF04' }} />
                <span>Studio Architects Available</span>
              </div>
            </div>

            {/* Main 2-Column Split Console */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '0',
              }}
            >
              {/* Left Console: Project Configuration */}
              <div
                style={{
                  padding: '32px 28px',
                  borderRight: '1px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  backgroundColor: '#F8FAFC',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    STEP 01 • PROJECT SCOPE
                  </span>
                  <h3 style={{ fontSize: '1.25rem', color: '#000000', marginTop: '4px', fontWeight: 900, textTransform: 'uppercase' }}>
                    Select Construction Type
                  </h3>
                </div>

                {/* Scope Selector Chips */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  {projectTypes.map((type) => {
                    const selected = projectType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setProjectType(type)}
                        style={{
                          padding: '11px 14px',
                          borderRadius: '3px',
                          border: '1px solid',
                          borderColor: selected ? '#000000' : '#CBD5E1',
                          backgroundColor: selected ? '#F9DF04' : '#FFFFFF',
                          color: '#000000',
                          fontSize: '0.82rem',
                          fontWeight: selected ? 800 : 600,
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          textTransform: 'uppercase',
                        }}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>

                {/* Area Dimension Range Slider */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Ruler size={16} color="#000000" />
                      <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#000000', textTransform: 'uppercase' }}>
                        Target Built-Up Area
                      </span>
                    </div>
                    <span style={{ fontSize: '1.05rem', fontWeight: 900, color: '#000000' }}>
                      {areaSize.toLocaleString()} sq.ft.
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2000"
                    max="15000"
                    step="250"
                    value={areaSize}
                    onChange={(e) => setAreaSize(Number(e.target.value))}
                    style={{
                      width: '100%',
                      accentColor: '#000000',
                      cursor: 'pointer',
                    }}
                  />
                </div>

                {/* Architectural Style Preferences */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#475569', marginBottom: '8px', fontWeight: 700, textTransform: 'uppercase' }}>
                    Architectural Style Preference
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {architecturalStyles.map((style) => {
                      const selected = stylePreference === style;
                      return (
                        <button
                          key={style}
                          type="button"
                          onClick={() => setStylePreference(style)}
                          style={{
                            padding: '10px 14px',
                            borderRadius: '3px',
                            border: '1px solid',
                            borderColor: selected ? '#000000' : '#E2E8F0',
                            backgroundColor: selected ? '#000000' : '#FFFFFF',
                            color: selected ? '#F9DF04' : '#334155',
                            fontSize: '0.82rem',
                            fontWeight: selected ? 800 : 600,
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {style}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Console: Contact Form */}
              <div
                style={{
                  padding: '32px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: '#FFFFFF',
                }}
              >
                {submitted ? (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      minHeight: '360px',
                      textAlign: 'center',
                      padding: '24px',
                    }}
                  >
                    <div
                      style={{
                        width: '58px',
                        height: '58px',
                        borderRadius: '3px',
                        backgroundColor: '#F9DF04',
                        color: '#000000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '18px',
                      }}
                    >
                      <Sparkles size={28} />
                    </div>

                    <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#000000', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Consultation Registered!
                    </h3>

                    <p style={{ color: '#64748B', fontSize: '0.94rem', maxWidth: '420px', lineHeight: 1.55, marginBottom: '18px' }}>
                      Our principal architect will review your project parameters ({areaSize.toLocaleString()} sq.ft {projectType}) and connect with you within 2 business hours.
                    </p>

                    <div
                      style={{
                        backgroundColor: '#F8FAFC',
                        border: '2px solid #000000',
                        padding: '10px 18px',
                        borderRadius: '3px',
                        fontSize: '0.84rem',
                        color: '#000000',
                        fontWeight: 700,
                      }}
                    >
                      Priority ID: <span style={{ color: '#000000', fontWeight: 900 }}>#YELO-{consultationId}</span>
                    </div>

                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', phone: '', email: '', city: '', notes: '' });
                      }}
                      className="btn-yellow-ref"
                      style={{ marginTop: '20px', padding: '10px 20px', fontSize: '0.84rem' }}
                    >
                      <span>Submit Another Inquiry</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        STEP 02 • DIRECT CONTACT DETAILS
                      </span>
                      <h3 style={{ fontSize: '1.25rem', color: '#000000', marginTop: '4px', fontWeight: 900, textTransform: 'uppercase' }}>
                        Connect With Lead Architect
                      </h3>
                    </div>

                    {/* Input 1: Full Name */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: '#475569', marginBottom: '6px', fontWeight: 700, textTransform: 'uppercase' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rajesh Patel"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          borderRadius: '3px',
                          background: '#F8FAFC',
                          border: '1px solid #CBD5E1',
                          color: '#0F172A',
                          fontSize: '0.9rem',
                          outline: 'none',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#000000')}
                        onBlur={(e) => (e.target.style.borderColor = '#CBD5E1')}
                      />
                    </div>

                    {/* Grid 2: Phone & Email */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', color: '#475569', marginBottom: '6px', fontWeight: 700, textTransform: 'uppercase' }}>
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            borderRadius: '3px',
                            background: '#F8FAFC',
                            border: '1px solid #CBD5E1',
                            color: '#0F172A',
                            fontSize: '0.9rem',
                            outline: 'none',
                          }}
                          onFocus={(e) => (e.target.style.borderColor = '#000000')}
                          onBlur={(e) => (e.target.style.borderColor = '#CBD5E1')}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', color: '#475569', marginBottom: '6px', fontWeight: 700, textTransform: 'uppercase' }}>
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="client@domain.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            borderRadius: '3px',
                            background: '#F8FAFC',
                            border: '1px solid #CBD5E1',
                            color: '#0F172A',
                            fontSize: '0.9rem',
                            outline: 'none',
                          }}
                          onFocus={(e) => (e.target.style.borderColor = '#000000')}
                          onBlur={(e) => (e.target.style.borderColor = '#CBD5E1')}
                        />
                      </div>
                    </div>

                    {/* Input 3: City */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: '#475569', marginBottom: '6px', fontWeight: 700, textTransform: 'uppercase' }}>
                        Site Location / City
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ahmedabad / Surat / Vadodara / Pan-India"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          borderRadius: '3px',
                          background: '#F8FAFC',
                          border: '1px solid #CBD5E1',
                          color: '#0F172A',
                          fontSize: '0.9rem',
                          outline: 'none',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#000000')}
                        onBlur={(e) => (e.target.style.borderColor = '#CBD5E1')}
                      />
                    </div>

                    {/* Input 4: Notes */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: '#475569', marginBottom: '6px', fontWeight: 700, textTransform: 'uppercase' }}>
                        Share Your Vision &amp; Requirements
                      </label>
                      <textarea
                        rows="2"
                        placeholder="Tell us about your plot size, architectural preferences, or expected handover year..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          borderRadius: '3px',
                          background: '#F8FAFC',
                          border: '1px solid #CBD5E1',
                          color: '#0F172A',
                          fontSize: '0.9rem',
                          outline: 'none',
                          resize: 'none',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#000000')}
                        onBlur={(e) => (e.target.style.borderColor = '#CBD5E1')}
                      />
                    </div>

                    {/* Submit Button styled as .btn-yellow-ref */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-yellow-ref"
                      style={{
                        width: '100%',
                        padding: '13px',
                        fontSize: '0.88rem',
                        marginTop: '6px',
                        justifyContent: 'center',
                      }}
                    >
                      {isSubmitting ? (
                        <span>Scheduling Review...</span>
                      ) : (
                        <>
                          <span>Submit Project For Review</span>
                          <span style={{ fontSize: '0.95rem' }}>↓</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Bottom Direct Connect Studio Bar */}
            <div
              style={{
                padding: '18px 26px',
                borderTop: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '22px', flexWrap: 'wrap' }}>
                <a
                  href="https://wa.me/919876543210?text=Hello%20Yeloline%20Construction,%20I%20would%20like%20to%20discuss%20my%20dream%20project."
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#000000',
                    textDecoration: 'none',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                  }}
                >
                  <MessageSquare size={16} color="#000000" />
                  <span>Chat on WhatsApp (+91 98765 43210)</span>
                </a>

                <a
                  href="tel:+919876543210"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#000000',
                    textDecoration: 'none',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                  }}
                >
                  <Phone size={15} color="#000000" />
                  <span>Call Studio Direct</span>
                </a>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '0.84rem' }}>
                  <MapPin size={15} color="#000000" />
                  <span>Main Studio: SG Highway, Ahmedabad</span>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>
                Confidentiality Guaranteed • NDA on Demand
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
