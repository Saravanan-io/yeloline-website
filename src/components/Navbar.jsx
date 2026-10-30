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
    { id: 'home', label: 'Home Page' },
    { id: 'portfolio', label: 'Site Portfolio' },
    { id: 'renovation', label: 'Renovation' },
    { id: 'contact', label: 'Contact Us' },
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
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.98)' : '#FFFFFF',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid #E2E8F0',
          boxShadow: scrolled ? '0 4px 16px rgba(0, 0, 0, 0.04)' : 'none',
        }}
      >
        <div
          className="app-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '70px',
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
            {/* Geometric Yellow Mark */}
            <div
              style={{
                width: '34px',
                height: '34px',
                backgroundColor: '#F9DF04',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(249, 223, 4, 0.3)',
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
                  fontSize: '1.2rem',
                  fontWeight: 900,
                  letterSpacing: '0.04em',
                  color: '#000000',
                  lineHeight: 1,
                }}
              >
                YELOLINE.
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.22em',
                  color: '#64748B',
                  fontWeight: 700,
                  marginTop: '2px',
                }}
              >
                CONSTRUCTION
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '4px',
              background: '#F8FAFC',
              padding: '4px 6px',
              borderRadius: '9999px',
              border: '1px solid #E2E8F0',
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
                    color: isActive ? '#000000' : '#475569',
                    backgroundColor: isActive ? '#F9DF04' : 'transparent',
                    borderRadius: '9999px',
                    padding: isActive ? '7px 18px' : '7px 14px',
                    textDecoration: 'none',
                    fontSize: '0.84rem',
                    fontWeight: isActive ? 800 : 600,
                    fontFamily: 'var(--font-heading)',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: isActive ? '0 2px 8px rgba(249, 223, 4, 0.35)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = '#EDF2F7';
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
                color: '#0F172A',
                textDecoration: 'none',
                fontSize: '0.84rem',
                fontWeight: 700,
                fontFamily: 'var(--font-heading)',
                transition: 'color 0.2s',
              }}
              className="desktop-phone"
            >
              <Phone size={14} color="#000000" />
              <span>+91 98765 43210</span>
            </a>

            <button
              onClick={onOpenQuote}
              className="btn-yellow-ref"
              id="cta-desktop"
              style={{
                display: 'none',
                padding: '8px 18px',
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
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: 'rgba(0, 0, 0, 0.06)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                color: '#000000',
                cursor: 'pointer',
              }}
              className="mobile-hamburger"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile slide-down menu */}
        {mobileMenuOpen && (
          <div
            style={{
              background: '#F9DF04',
              borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
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
                    color: isActive ? '#F9DF04' : '#000000',
                    backgroundColor: isActive ? '#000000' : 'rgba(0, 0, 0, 0.05)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: isActive ? 800 : 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '8px',
                  }}
                >
                  <span>{link.label}</span>
                  <ChevronRight size={16} color={isActive ? '#F9DF04' : '#000000'} />
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
