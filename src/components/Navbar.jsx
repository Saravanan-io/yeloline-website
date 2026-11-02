import React, { useState, useEffect } from 'react';
import { ChevronRight, Menu, X, ArrowUpRight, Phone } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, activeSection, setActiveSection, onOpenQuote }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentActive = activePage || activeSection || 'home';
  const handlePageChange = (pageId) => {
    if (setActivePage) setActivePage(pageId);
    else if (setActiveSection) setActiveSection(pageId);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'renovation', label: 'Renovation' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.06)' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.04)' : 'none',
        }}
      >
        <div
          className="app-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px',
          }}
        >
          {/* Logo - Modern Architectural Brand */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange('home');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
            }}
          >
            {/* Geometric Yellow Mark - Rounded */}
            <div
              style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, #F9DF04 0%, #E5CC00 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 3px 12px rgba(249, 223, 4, 0.3)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: '#000000',
                  fontWeight: 900,
                  fontSize: '1.2rem',
                  lineHeight: 1,
                }}
              >
                Y
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.18rem',
                  fontWeight: 800,
                  letterSpacing: '0.02em',
                  color: '#0F172A',
                  lineHeight: 1,
                }}
              >
                YELOLINE.
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.22em',
                  color: '#94A3B8',
                  fontWeight: 600,
                  marginTop: '2px',
                  textTransform: 'uppercase',
                }}
              >
                CONSTRUCTION
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links - Modern Pill Style */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(248, 250, 252, 0.8)',
              padding: '5px 6px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              backdropFilter: 'blur(10px)',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const isActive = currentActive === link.id;

              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(link.id);
                  }}
                  style={{
                    color: isActive ? '#000000' : '#64748B',
                    backgroundColor: isActive ? '#F9DF04' : 'transparent',
                    borderRadius: 'var(--radius-full)',
                    padding: isActive ? '8px 20px' : '8px 16px',
                    textDecoration: 'none',
                    fontSize: '0.84rem',
                    fontWeight: isActive ? 700 : 500,
                    fontFamily: 'var(--font-body)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: isActive ? '0 2px 12px rgba(249, 223, 4, 0.3)' : 'none',
                    letterSpacing: '0.01em',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.04)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Controls: Direct Phone & Consultation CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <a
              href="tel:+919876543210"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '6px',
                color: '#475569',
                textDecoration: 'none',
                fontSize: '0.84rem',
                fontWeight: 600,
                fontFamily: 'var(--font-body)',
                transition: 'color 0.2s',
              }}
              className="desktop-phone"
            >
              <Phone size={14} color="#64748B" />
              <span>+91 98765 43210</span>
            </a>

            <button
              onClick={onOpenQuote}
              className="btn-yellow-ref"
              id="cta-desktop"
              style={{
                display: 'none',
                padding: '9px 20px',
                fontSize: '0.82rem',
              }}
            >
              <span>Get Free Quote</span>
              <ArrowUpRight size={15} />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                color: '#0F172A',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              className="mobile-hamburger"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile slide-down menu - Modern */}
        {mobileMenuOpen && (
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
            }}
          >
            {navLinks.map((link) => {
              const isActive = currentActive === link.id;

              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(link.id);
                    setMobileMenuOpen(false);
                  }}
                  style={{
                    color: isActive ? '#000000' : '#475569',
                    backgroundColor: isActive ? '#F9DF04' : 'rgba(0, 0, 0, 0.03)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: isActive ? 700 : 500,
                    fontFamily: 'var(--font-body)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    transition: 'all 0.2s',
                  }}
                >
                  <span>{link.label}</span>
                  <ChevronRight size={16} color={isActive ? '#000000' : '#94A3B8'} />
                </a>
              );
            })}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="btn-gold"
              style={{ width: '100%', marginTop: '8px', justifyContent: 'center' }}
            >
              Get Free Consultation
            </button>
          </div>
        )}
      </header>

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          #cta-desktop {
            display: inline-flex !important;
          }
          .desktop-phone {
            display: inline-flex !important;
          }
          .mobile-hamburger {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
