import React, { useState, useEffect } from 'react';
import { ChevronRight, Menu, X } from 'lucide-react';

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
    { id: 'about', label: 'About Yeloline' },
    { id: 'portfolio', label: 'Site Portfolio' },
    { id: 'renovation', label: 'Renovan' },
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
          {/* Logo - Official Yeloline Construction Brand */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange('home');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <img
              src="/images/yeloline_logo.png"
              alt="YELOLINE CONSTRUCTION"
              style={{
                height: '42px',
                width: 'auto',
                display: 'block',
                objectFit: 'contain',
              }}
            />
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

          {/* Right Controls: Consultation CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Google Play Button (Desktop) */}
            <button
              onClick={() => {
                alert('Redirecting to Google Play Store: Yeloline Construction (com.yeloline.construction)');
              }}
              id="cta-desktop"
              aria-label="Get it on Google Play"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '10px',
                padding: '6px 16px',
                borderRadius: '12px',
                backgroundColor: '#000000',
                color: '#FFFFFF',
                border: '1.5px solid rgba(254, 198, 3, 0.5)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), 0 0 10px rgba(254, 198, 3, 0.15)',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1.5px)';
                e.currentTarget.style.borderColor = '#F9DF04';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.28), 0 0 18px rgba(249, 223, 4, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(254, 198, 3, 0.5)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2), 0 0 10px rgba(254, 198, 3, 0.15)';
              }}
            >
              {/* Official Google Play 4-Color Logo */}
              <svg width="20" height="22" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.3 1.2C1.1 1.6 1 2.2 1 2.9V27.1C1 27.8 1.1 28.4 1.3 28.8L1.4 28.9L15.3 15V14.8L1.4 1.1L1.3 1.2Z" fill="url(#navGpBlue)" />
                <path d="M19.9 19.6L15.3 15V14.8L19.9 10.2L20 10.3L25.4 13.4C27 14.3 27 15.7 25.4 16.6L20 19.6L19.9 19.6Z" fill="url(#navGpYellow)" />
                <path d="M20 19.6L15.3 15L1.3 28.9C1.8 29.5 2.7 29.5 3.8 28.9L20 19.6Z" fill="url(#navGpRed)" />
                <path d="M20 10.4L3.8 1.1C2.7 0.5 1.8 0.5 1.3 1.1L15.3 15L20 10.4Z" fill="url(#navGpGreen)" />
                <defs>
                  <linearGradient id="navGpBlue" x1="13.9" y1="2.7" x2="-2.4" y2="19" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00A0FF" />
                    <stop offset="0.007" stopColor="#00A1FF" />
                    <stop offset="0.26" stopColor="#00BEFF" />
                    <stop offset="0.512" stopColor="#00D2FF" />
                    <stop offset="0.76" stopColor="#00DFFF" />
                    <stop offset="1" stopColor="#00E3FF" />
                  </linearGradient>
                  <linearGradient id="navGpYellow" x1="27.4" y1="15" x2="0.6" y2="15" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFE000" />
                    <stop offset="0.409" stopColor="#FFBD00" />
                    <stop offset="0.775" stopColor="#FFA500" />
                    <stop offset="1" stopColor="#FF9C00" />
                  </linearGradient>
                  <linearGradient id="navGpRed" x1="17.6" y1="17.3" x2="2.7" y2="32.2" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF3A44" />
                    <stop offset="1" stopColor="#C31162" />
                  </linearGradient>
                  <linearGradient id="navGpGreen" x1="2.7" y1="-2.2" x2="17.6" y2="12.7" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#32A071" />
                    <stop offset="0.069" stopColor="#2DA771" />
                    <stop offset="0.476" stopColor="#15CF74" />
                    <stop offset="0.801" stopColor="#06E775" />
                    <stop offset="1" stopColor="#00F076" />
                  </linearGradient>
                </defs>
              </svg>

              <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
                <div
                  style={{
                    fontSize: '0.54rem',
                    letterSpacing: '0.12em',
                    color: '#94A3B8',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                  }}
                >
                  GET IT ON
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.96rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Google Play
                </div>
              </div>
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
                alert('Redirecting to Google Play Store: Yeloline Construction (com.yeloline.construction)');
              }}
              style={{
                width: '100%',
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                padding: '11px 20px',
                borderRadius: '14px',
                backgroundColor: '#000000',
                color: '#FFFFFF',
                border: '1.5px solid rgba(254, 198, 3, 0.5)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                cursor: 'pointer',
              }}
            >
              <svg width="22" height="24" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.3 1.2C1.1 1.6 1 2.2 1 2.9V27.1C1 27.8 1.1 28.4 1.3 28.8L1.4 28.9L15.3 15V14.8L1.4 1.1L1.3 1.2Z" fill="url(#navGpBlue)" />
                <path d="M19.9 19.6L15.3 15V14.8L19.9 10.2L20 10.3L25.4 13.4C27 14.3 27 15.7 25.4 16.6L20 19.6L19.9 19.6Z" fill="url(#navGpYellow)" />
                <path d="M20 19.6L15.3 15L1.3 28.9C1.8 29.5 2.7 29.5 3.8 28.9L20 19.6Z" fill="url(#navGpRed)" />
                <path d="M20 10.4L3.8 1.1C2.7 0.5 1.8 0.5 1.3 1.1L15.3 15L20 10.4Z" fill="url(#navGpGreen)" />
              </svg>
              <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
                <div style={{ fontSize: '0.56rem', letterSpacing: '0.12em', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>
                  GET IT ON
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                  Google Play
                </div>
              </div>
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
          .mobile-hamburger {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
