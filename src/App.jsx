import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import Navbar from './components/Navbar';
import ScrollConstructionHero from './components/ScrollConstructionHero';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import ConstructionProcess from './components/ConstructionProcess';
import WhyChooseUs from './components/WhyChooseUs';
import Achievements from './components/Achievements';
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
      if (['home', 'portfolio', 'renovation', 'contact'].includes(hash)) {
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
      if (['home', 'portfolio', 'renovation', 'contact'].includes(hash)) {
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
          backgroundColor: '#000000',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
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
        {activePage === 'home' && (
          <div>
            {/* 1. Hero Section */}
            <Hero
              onExploreProjects={handleExploreProjects}
              onGetQuote={handleOpenQuote}
            />

            {/* 2. About Yeloline */}
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

            {/* 6. Achievements */}
            <Achievements />

            {/* 7. Testimonials */}
            <Testimonials />

            {/* Discovery / Specialties Section */}
            <section
              style={{
                backgroundColor: '#F8FAFC',
                padding: '75px 0',
                borderTop: '1px solid #E2E8F0',
              }}
            >
              <div className="app-container">
                <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px' }}>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 900,
                      letterSpacing: '0.14em',
                      color: '#64748B',
                      textTransform: 'uppercase',
                    }}
                  >
                    // DISCOVER DEDICATED SECTIONS
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.6rem, 3vw, 2.1rem)',
                      fontWeight: 900,
                      marginTop: '8px',
                    }}
                  >
                    EXPLORE YELOLINE BY SPECIALTY
                  </h3>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '22px',
                  }}
                >
                  <div
                    onClick={() => navigateTo('portfolio')}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      padding: '30px',
                      border: '1px solid #E2E8F0',
                      cursor: 'pointer',
                      transition: 'all 0.25s',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#000000';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#E2E8F0';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        color: '#000000',
                        backgroundColor: '#F9DF04',
                        padding: '4px 10px',
                        borderRadius: '4px',
                      }}
                    >
                      SITE PORTFOLIO
                    </span>
                    <h4
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.25rem',
                        fontWeight: 900,
                        marginTop: '14px',
                        marginBottom: '8px',
                      }}
                    >
                      Architectural Builds →
                    </h4>
                    <p style={{ fontSize: '0.86rem', color: '#64748B', lineHeight: 1.55 }}>
                      Browse our complete catalog of luxury villas, modern residences, and commercial landmark blueprints.
                    </p>
                  </div>

                  <div
                    onClick={() => navigateTo('renovation')}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      padding: '30px',
                      border: '1px solid #E2E8F0',
                      cursor: 'pointer',
                      transition: 'all 0.25s',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#000000';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#E2E8F0';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        color: '#FFFFFF',
                        backgroundColor: '#000000',
                        padding: '4px 10px',
                        borderRadius: '4px',
                      }}
                    >
                      RENOVATION
                    </span>
                    <h4
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.25rem',
                        fontWeight: 900,
                        marginTop: '14px',
                        marginBottom: '8px',
                      }}
                    >
                      Before & After Transformations →
                    </h4>
                    <p style={{ fontSize: '0.86rem', color: '#64748B', lineHeight: 1.55 }}>
                      Interactive before/after engineering comparisons, structural retrofitting, and seismic reinforcement.
                    </p>
                  </div>

                  <div
                    onClick={() => navigateTo('contact')}
                    style={{
                      backgroundColor: '#F9DF04',
                      borderRadius: '16px',
                      padding: '30px',
                      border: '1px solid #E2E8F0',
                      cursor: 'pointer',
                      transition: 'all 0.25s',
                      boxShadow: '0 6px 22px rgba(249, 223, 4, 0.3)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        color: '#FFFFFF',
                        backgroundColor: '#000000',
                        padding: '4px 10px',
                        borderRadius: '4px',
                      }}
                    >
                      FREE CONSULTATION
                    </span>
                    <h4
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.25rem',
                        fontWeight: 900,
                        marginTop: '14px',
                        marginBottom: '8px',
                        color: '#000000',
                      }}
                    >
                      Get A Free Quote →
                    </h4>
                    <p style={{ fontSize: '0.86rem', color: '#1E293B', lineHeight: 1.55 }}>
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
            <div style={{ height: '1px', backgroundColor: 'rgba(0, 0, 0, 0.08)', width: '100%' }} />
            <OurServices onSelectService={() => navigateTo('contact')} />
            <section style={{ backgroundColor: '#000000', color: '#FFFFFF', padding: '60px 0' }}>
              <div
                className="app-container"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '24px',
                }}
              >
                <div>
                  <span
                    style={{
                      color: '#F9DF04',
                      fontSize: '0.78rem',
                      fontWeight: 900,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}
                  >
                    // READY TO BUILD YOUR LANDMARK?
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                      fontWeight: 900,
                      marginTop: '6px',
                    }}
                  >
                    Book A Geotechnical Site Inspection & Feasibility Study
                  </h3>
                  <p style={{ color: '#94A3B8', fontSize: '0.92rem', maxWidth: '620px', marginTop: '6px' }}>
                    Speak directly with our chief structural engineers to evaluate plot suitability, soil load-bearing capacity, and receive an itemized architectural estimate.
                  </p>
                </div>
                <button
                  onClick={() => navigateTo('contact')}
                  className="btn-yellow-ref"
                  style={{ padding: '12px 24px', fontSize: '0.9rem' }}
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
            <section style={{ backgroundColor: '#F9DF04', color: '#000000', padding: '60px 0' }}>
              <div
                className="app-container"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '24px',
                }}
              >
                <div>
                  <span
                    style={{
                      color: '#000000',
                      fontSize: '0.78rem',
                      fontWeight: 900,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}
                  >
                    // NON-DESTRUCTIVE TESTING & RETROFITTING
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                      fontWeight: 900,
                      marginTop: '6px',
                    }}
                  >
                    Schedule A Structural Audit For Your Property
                  </h3>
                  <p style={{ color: '#334155', fontSize: '0.92rem', maxWidth: '620px', marginTop: '6px' }}>
                    Rebound hammer tests, ultrasonic pulse velocity, core extraction, and carbonation depth analysis by licensed structural engineers.
                  </p>
                </div>
                <button
                  onClick={() => navigateTo('contact')}
                  className="btn-black-ref"
                  style={{ padding: '12px 24px', fontSize: '0.9rem' }}
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
