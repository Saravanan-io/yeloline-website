import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import Navbar from './components/Navbar';
import ScrollConstructionHero from './components/ScrollConstructionHero';
import Hero from './components/Hero';
import LegacyHero from './components/LegacyHero';
import AboutUs from './components/AboutUs';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import SitePortfolio from './components/SitePortfolio';
import OurServices from './components/OurServices';
import Renovation from './components/Renovation';
import ContactUs from './components/ContactUs';
import ProjectDetailView from './components/ProjectDetailView';
import DownloadAppSection from './components/DownloadAppSection';
import Footer from './components/Footer';

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

            {/* 3. Disciplines & Services (3D Revolving Orbital Wheel) */}
            <OurServices onSelectService={() => navigateTo('contact')} />

            <div style={{ height: '1px', backgroundColor: 'rgba(0, 0, 0, 0.06)', width: '100%' }} />

            {/* 4. About Yeloline */}
            <AboutUs onStartProject={handleOpenQuote} />

            {/* 4. Interactive 3D Scroll Construction Experience */}
            <ScrollConstructionHero
              onExploreProjects={handleExploreProjects}
              onGetQuote={handleOpenQuote}
            />

            {/* 5. Why Choose Us */}
            <WhyChooseUs onStartProject={handleOpenQuote} />

            {/* 7. Testimonials */}
            <Testimonials />

            {/* 8. Download Our Mobile App Section */}
            <DownloadAppSection />
          </div>
        )}

        {activePage === 'portfolio' && (
          <div style={{ paddingTop: '20px' }}>
            {selectedProject ? (
              <ProjectDetailView
                project={selectedProject}
                onBackToProjects={() => {
                  setSelectedProject(null);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                onNavigateHome={() => {
                  setSelectedProject(null);
                  navigateTo('home');
                }}
                onConsult={() => {
                  navigateTo('contact');
                }}
              />
            ) : (
              <>
                <SitePortfolio
                  onSelectProject={(proj) => {
                    setSelectedProject(proj);
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                />
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
                        Book A Geotechnical Site Inspection &amp; Feasibility Study
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
              </>
            )}
          </div>
        )}

        {activePage === 'renovation' && (
          <div style={{ paddingTop: '30px' }}>
            <Renovation onGetQuote={() => navigateTo('contact')} />
          </div>
        )}

        {activePage === 'contact' && (
          <div style={{ paddingTop: '30px' }}>
            <ContactUs />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
