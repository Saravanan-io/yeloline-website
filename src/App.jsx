import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import Navbar from './components/Navbar';
import ScrollConstructionHero from './components/ScrollConstructionHero';
import Hero from './components/Hero';
import LegacyHero from './components/LegacyHero';
import AboutUs from './components/AboutUs';
import ConstructionProcess from './components/ConstructionProcess';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import SitePortfolio from './components/SitePortfolio';
import OurServices from './components/OurServices';
import Renovation from './components/Renovation';
import ContactUs from './components/ContactUs';
import ProjectModal from './components/ProjectModal';
import Footer from './components/Footer';
import MobileBottomDock from './components/MobileBottomDock';

export default function App() {
  const [activePage, setActivePage] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'portfolio', 'renovation', 'contact', 'preview-why'].includes(hash)) {
        return hash;
      }
    }
    return 'home';
  });

  const [selectedProject, setSelectedProject] = useState(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'portfolio', 'renovation', 'contact', 'preview-why'].includes(hash)) {
        setActivePage(hash);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page) => {
    setActivePage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleOpenQuote = () => {
    navigateTo('contact');
  };

  const handleExploreProjects = () => {
    navigateTo('portfolio');
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      {/* Scroll Progress Bar */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #F9DF04 0%, #E5CC00 50%, #F9DF04 100%)',
          boxShadow: '0 0 12px rgba(249, 223, 4, 0.6)',
          transformOrigin: '0%',
          zIndex: 9999,
        }}
      />

      {/* Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={navigateTo}
        onOpenQuote={handleOpenQuote}
      />

      {/* Main Content */}
      <main>
        {activePage === 'preview-why' && (
          <div style={{ backgroundColor: '#F8F9FA' }}>
            <WhyChooseUs onStartProject={handleOpenQuote} />
          </div>
        )}
        {activePage === 'home' && (
          <div>
            {/* 1. Hero Video Section */}
            <Hero
              onExploreProjects={handleExploreProjects}
              onGetQuote={handleOpenQuote}
            />

            {/* 2. Architectural Excellence (Building Dreams with 3D Floating Island) */}
            <LegacyHero
              onExploreProjects={handleExploreProjects}
              onGetQuote={handleOpenQuote}
            />

            <div style={{ height: '1px', backgroundColor: 'rgba(0, 0, 0, 0.06)', width: '100%' }} />

            {/* 3. About Yeloline */}
            <AboutUs onStartProject={handleOpenQuote} />

            <div style={{ height: '1px', backgroundColor: 'rgba(0, 0, 0, 0.08)', width: '100%' }} />

            {/* 3. Construction Process */}
            <ConstructionProcess />

            {/* 4. Interactive 3D Scroll Construction Experience */}
            <ScrollConstructionHero
              onExploreProjects={handleExploreProjects}
              onGetQuote={handleOpenQuote}
            />

            {/* 5. Why Choose Us */}
            <WhyChooseUs onStartProject={handleOpenQuote} />

            {/* 7. Testimonials */}
            <Testimonials />

            {/* Discovery / Specialties Section */}
            <section
              style={{
                background: 'linear-gradient(180deg, #FAFBFC 0%, #F1F5F9 100%)',
                padding: '90px 0',
                borderTop: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <div className="app-container">
                <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 44px' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.14em',
                      color: '#94A3B8',
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Discover Dedicated Sections
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.7rem, 3vw, 2.2rem)',
                      fontWeight: 800,
                      marginTop: '10px',
                      color: '#0F172A',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Explore Yeloline By Specialty
                  </h3>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '20px',
                  }}
                >
                  <div
                    onClick={() => navigateTo('portfolio')}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 'var(--radius-xl)',
                      padding: '32px',
                      border: '1px solid rgba(0,0,0,0.06)',
                      cursor: 'pointer',
                      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)';
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#000000',
                        background: 'linear-gradient(135deg, #F9DF04, #E5CC00)',
                        padding: '5px 14px',
                        borderRadius: 'var(--radius-full)',
                        fontFamily: 'var(--font-heading)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      SITE PORTFOLIO
                    </span>
                    <h4
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.2rem',
                        fontWeight: 800,
                        marginTop: '16px',
                        marginBottom: '8px',
                        color: '#0F172A',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      Architectural Builds →
                    </h4>
                    <p style={{ fontSize: '0.87rem', color: '#64748B', lineHeight: 1.6, fontFamily: 'var(--font-body)', fontWeight: 400 }}>
                      Browse our complete catalog of luxury villas, modern residences, and commercial landmark blueprints.
                    </p>
                  </div>

                  <div
                    onClick={() => navigateTo('renovation')}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 'var(--radius-xl)',
                      padding: '32px',
                      border: '1px solid rgba(0,0,0,0.06)',
                      cursor: 'pointer',
                      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)';
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        background: 'linear-gradient(135deg, #0F172A, #1E293B)',
                        padding: '5px 14px',
                        borderRadius: 'var(--radius-full)',
                        fontFamily: 'var(--font-heading)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      RENOVATION
                    </span>
                    <h4
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.2rem',
                        fontWeight: 800,
                        marginTop: '16px',
                        marginBottom: '8px',
                        color: '#0F172A',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      Before & After Transformations →
                    </h4>
                    <p style={{ fontSize: '0.87rem', color: '#64748B', lineHeight: 1.6, fontFamily: 'var(--font-body)', fontWeight: 400 }}>
                      Interactive before/after engineering comparisons, structural retrofitting, and seismic reinforcement.
                    </p>
                  </div>

                  <div
                    onClick={() => navigateTo('contact')}
                    style={{
                      background: 'linear-gradient(135deg, #F9DF04 0%, #E5CC00 100%)',
                      borderRadius: 'var(--radius-xl)',
                      padding: '32px',
                      border: '1px solid rgba(249,223,4,0.3)',
                      cursor: 'pointer',
                      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: '0 8px 28px rgba(249, 223, 4, 0.25)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 16px 40px rgba(249, 223, 4, 0.35)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 28px rgba(249, 223, 4, 0.25)';
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        background: 'linear-gradient(135deg, #0F172A, #1E293B)',
                        padding: '5px 14px',
                        borderRadius: 'var(--radius-full)',
                        fontFamily: 'var(--font-heading)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      FREE CONSULTATION
                    </span>
                    <h4
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.2rem',
                        fontWeight: 800,
                        marginTop: '16px',
                        marginBottom: '8px',
                        color: '#000000',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      Get A Free Quote →
                    </h4>
                    <p style={{ fontSize: '0.87rem', color: '#1E293B', lineHeight: 1.6, fontFamily: 'var(--font-body)', fontWeight: 400 }}>
                      Receive a comprehensive 100% fixed-price line-item BOQ and book an on-site geotechnical inspection.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activePage === 'portfolio' && (
          <div style={{ paddingTop: '30px' }}>
            <SitePortfolio onSelectProject={(proj) => setSelectedProject(proj)} />
            <div style={{ height: '1px', backgroundColor: 'rgba(0, 0, 0, 0.05)', width: '100%' }} />
            <OurServices onSelectService={() => navigateTo('contact')} />
            <section style={{ background: 'linear-gradient(145deg, #0B0F17 0%, #0F172A 100%)', color: '#FFFFFF', padding: '72px 0' }}>
              <div
                className="app-container"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '28px',
                }}
              >
                <div>
                  <span
                    style={{
                      color: '#F9DF04',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Ready to Build Your Landmark?
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                      fontWeight: 800,
                      marginTop: '8px',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Book A Geotechnical Site Inspection & Feasibility Study
                  </h3>
                  <p style={{ color: '#64748B', fontSize: '0.94rem', maxWidth: '620px', marginTop: '8px', fontWeight: 400, lineHeight: 1.65 }}>
                    Speak directly with our chief structural engineers to evaluate plot suitability, soil load-bearing capacity, and receive an itemized architectural estimate.
                  </p>
                </div>
                <button
                  onClick={() => navigateTo('contact')}
                  className="btn-yellow-ref"
                  style={{ padding: '13px 26px', fontSize: '0.9rem' }}
                >
                  <span>Request Free Quote</span>
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </section>
          </div>
        )}

        {activePage === 'renovation' && (
          <div style={{ paddingTop: '30px' }}>
            <Renovation onGetQuote={() => navigateTo('contact')} />
            <section style={{ background: 'linear-gradient(135deg, #F9DF04 0%, #E5CC00 100%)', color: '#000000', padding: '72px 0' }}>
              <div
                className="app-container"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '28px',
                }}
              >
                <div>
                  <span
                    style={{
                      color: 'rgba(0,0,0,0.6)',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Non-Destructive Testing & Retrofitting
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                      fontWeight: 800,
                      marginTop: '8px',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Schedule A Structural Audit For Your Property
                  </h3>
                  <p style={{ color: 'rgba(0,0,0,0.65)', fontSize: '0.94rem', maxWidth: '620px', marginTop: '8px', fontWeight: 400, lineHeight: 1.65 }}>
                    Rebound hammer tests, ultrasonic pulse velocity, core extraction, and carbonation depth analysis by licensed structural engineers.
                  </p>
                </div>
                <button
                  onClick={() => navigateTo('contact')}
                  className="btn-black-ref"
                  style={{ padding: '13px 26px', fontSize: '0.9rem' }}
                >
                  <span>Book Structural Audit</span>
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </section>
          </div>
        )}

        {activePage === 'contact' && (
          <div style={{ paddingTop: '30px' }}>
            <ContactUs />
          </div>
        )}
      </main>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onConsultProject={() => {
          setSelectedProject(null);
          navigateTo('contact');
        }}
      />

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Mobile Sticky Navigation Dock */}
      <MobileBottomDock
        activePage={activePage}
        setActivePage={navigateTo}
        onOpenQuote={handleOpenQuote}
      />
    </div>
  );
}
