import React from 'react';
import { ArrowUp, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (e, pageId) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(pageId);
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#0B0F17',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: '64px',
        paddingBottom: '80px',
        position: 'relative',
        zIndex: 10,
        color: '#F8FAFC',
      }}
    >
      <div className="app-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '36px',
            marginBottom: '44px',
          }}
        >
          {/* Brand Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: '#F9DF04',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-heading)',
                  color: '#000000',
                  fontWeight: 900,
                  fontSize: '1.25rem',
                }}
              >
                Y
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
                  YELOLINE.
                </span>
                <span style={{ fontSize: '0.62rem', letterSpacing: '0.22em', color: '#F9DF04', fontWeight: 800 }}>
                  CONSTRUCTION
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.84rem', color: '#94A3B8', lineHeight: 1.65 }}>
              “A building is more than bricks and concrete… it’s a lifelong dream shaped by dedication and perseverance. Realizing it with total peace of mind is our commitment.”
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#F9DF04', fontSize: '0.8rem', fontWeight: 700 }}>
              <ShieldCheck size={15} />
              <span>Registered Architectural Practice • Est. 2014</span>
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.04em' }}>
              Navigation Pages
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { label: 'Home Page', page: 'home' },
                { label: 'Site Portfolio', page: 'portfolio' },
                { label: 'Renovation Transformations', page: 'renovation' },
                { label: 'Contact Us & Free Quote', page: 'contact' },
              ].map((link, i) => (
                <a
                  key={i}
                  href={`#${link.page}`}
                  onClick={(e) => handleNav(e, link.page)}
                  style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.84rem', fontWeight: 500, transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.target.style.color = '#F9DF04')}
                  onMouseLeave={(e) => (e.target.style.color = '#94A3B8')}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Regional Studios */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.04em' }}>
              Regional Studios
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem', color: '#94A3B8' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={15} color="#F9DF04" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>Ahmedabad Studio: SG Highway Financial Corridor, Gujarat</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={15} color="#F9DF04" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>Surat Studio: VIP Road, Vesu Waterfront, Gujarat</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={15} color="#F9DF04" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>Vadodara Studio: Alkapuri High Street, Gujarat</span>
              </div>
            </div>
          </div>

          {/* Direct Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.04em' }}>
              Direct Architectural Line
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href="tel:+919876543210"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#E2E8F0',
                  textDecoration: 'none',
                  fontSize: '0.84rem',
                }}
              >
                <Phone size={15} color="#F9DF04" />
                <span>+91 98765 43210 (Consultation Line)</span>
              </a>

              <a
                href="mailto:projects@yelolineconstruction.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#E2E8F0',
                  textDecoration: 'none',
                  fontSize: '0.84rem',
                }}
              >
                <Mail size={15} color="#F9DF04" />
                <span>projects@yelolineconstruction.com</span>
              </a>

              <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px' }}>
                Studio Hours: Monday – Saturday (9:00 AM – 8:00 PM IST)
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
            © 2026 YELOLINE CONSTRUCTION. All rights reserved. Registered Architectural Practice.
          </div>

          <button
            onClick={scrollToTop}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#FFFFFF',
              fontSize: '0.78rem',
              fontWeight: 600,
              fontFamily: 'var(--font-heading)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F9DF04';
              e.currentTarget.style.borderColor = '#F9DF04';
              e.currentTarget.style.color = '#000000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
          >
            <span>Back to Top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
