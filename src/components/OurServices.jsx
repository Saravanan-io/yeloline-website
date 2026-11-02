import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Building, 
  Briefcase, 
  PencilRuler, 
  Sparkles, 
  Hammer, 
  ClipboardCheck 
} from 'lucide-react';

export default function OurServices({ onSelectService }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const services = [
    {
      id: 'residential',
      icon: Building,
      title: 'Residential Construction',
      tagline: 'Custom Luxury Villas & Modern Bungalows',
      description: 'Bespoke turnkey residential construction. We construct private villas, cantilevered homes, and multi-storey residences with earthquake-resistant RCC engineering.',
      features: [
        'End-to-End Turnkey Execution',
        'Seismic Zone-IV RCC Engineering',
        'Thermal Insulation & Double Glazing',
      ],
      spec: '100% Guaranteed Handover'
    },
    {
      id: 'commercial',
      icon: Briefcase,
      title: 'Commercial Construction',
      tagline: 'Corporate Landmarks & Commercial Showrooms',
      description: 'High-performance commercial developments engineered for durability and business prestige, featuring post-tensioned column-free spans.',
      features: [
        'Post-Tensioned Long Spans',
        'HVAC & VRV Energy Integration',
        'Complete Fire Safety Compliance',
      ],
      spec: 'Grade A Commercial Standards'
    },
    {
      id: 'architectural',
      icon: PencilRuler,
      title: 'Architectural Design',
      tagline: 'Bespoke 3D Elevations & Spatial Blueprinting',
      description: 'Visionary conceptual design tailored to site topography and daylight geometry, including photorealistic 3D elevations and structural analysis models.',
      features: [
        'Photorealistic 3D Elevations',
        'Bioclimatic Sun & Wind Analysis',
        'Municipal Permitting Blueprints',
      ],
      spec: 'BIM 3D Modeling Precision'
    },
    {
      id: 'interior',
      icon: Sparkles,
      title: 'Interior Architecture',
      tagline: 'Turnkey Finishes, Custom Millwork & Automation',
      description: 'Interior spaces crafted with artisanal craftsmanship: Italian marble laying, bespoke hardwood joinery, and concealed architectural lighting.',
      features: [
        'Artisanal Italian Marble & Slate Craft',
        'Concealed Architectural Cove Lighting',
        'Integrated Smart Climate Automation',
      ],
      spec: 'Bespoke Material Palette'
    },
    {
      id: 'renovation',
      icon: Hammer,
      title: 'Structural Renovation',
      tagline: 'Complete Metamorphosis & Facade Modernization',
      description: 'Transforming aging structures into modern, energy-efficient masterpieces with structural retrofitting, cantilever extensions, and facade overhauls.',
      features: [
        'Carbon-Fiber Structural Retrofitting',
        'Facade Modernization & Stone Cladding',
        'Cantilever & Terrace Additions',
      ],
      spec: '15-Year Structural Warranty'
    },
    {
      id: 'pmc',
      icon: ClipboardCheck,
      title: 'Project Management (PMC)',
      tagline: 'Zero-Escalation BOQ & Quality Supervision',
      description: 'Rigorous engineering oversight and transparent management with non-destructive testing (NDT) and milestone-based progress tracking.',
      features: [
        'Transparent Line-Item Fixed BOQ',
        'Independent NDT Concrete Testing',
        'Weekly Digital Milestone Tracking',
      ],
      spec: '0% Price Escalation Guarantee'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: { 
      opacity: 1, y: 0, scale: 1, 
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <section
      id="services"
      ref={ref}
      style={{
        backgroundColor: '#FFFFFF',
        padding: '110px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Watermark Typography */}
      <div
        className="watermark-bg select-none pointer-events-none"
        style={{ top: '10px', right: '3%' }}
      >
        SERVICES
      </div>

      {/* Ambient gradient */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: 0,
          width: '40%',
          height: '50%',
          background: 'radial-gradient(ellipse at 20% 30%, rgba(249, 223, 4, 0.04) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating Geometric Accents */}
      <div
        className="geo-ring"
        style={{
          position: 'absolute',
          top: '90px',
          right: '5%',
          width: '40px',
          height: '40px',
        }}
      />
      <div
        className="geo-diamond"
        style={{
          position: 'absolute',
          bottom: '80px',
          left: '4%',
          width: '26px',
          height: '26px',
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
        <motion.div variants={itemVariants} style={{ marginBottom: '52px' }}>
          <div className="badge-gold" style={{ marginBottom: '16px' }}>
            <Building size={13} color="#92750a" />
            <span>04 // Comprehensive Expertise • Our Services</span>
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
                  fontWeight: 800,
                  color: '#0F172A',
                  letterSpacing: '-0.03em',
                  marginBottom: '12px',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                Disciplines & Services
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
                From visionary architectural blueprinting to turnkey structural delivery, our integrated engineering
                protocols eliminate subcontracting bloat and deliver guaranteed architectural excellence.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Services Grid Layout - Modern Rounded Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px',
          }}
        >
          {services.map((service, idx) => {
            const IconComp = service.icon;

            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  padding: '30px 26px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 24px -4px rgba(0, 0, 0, 0.04)',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.12)';
                  e.currentTarget.style.boxShadow = '0 16px 40px -8px rgba(0, 0, 0, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.boxShadow = '0 4px 24px -4px rgba(0, 0, 0, 0.04)';
                }}
              >
                {/* Subtle gradient background on hover */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '50%',
                    height: '50%',
                    background: 'radial-gradient(ellipse at 100% 0%, rgba(249, 223, 4, 0.04) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Top Bar: Icon & Index */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '22px',
                    }}
                  >
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: 'var(--radius-md)',
                        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
                        color: '#F9DF04',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <IconComp size={22} />
                    </div>

                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        color: '#E2E8F0',
                        letterSpacing: '0.04em',
                      }}
                    >
                      0{idx + 1}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: '#0F172A',
                      letterSpacing: '-0.02em',
                      marginBottom: '6px',
                    }}
                  >
                    {service.title}
                  </h3>

                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#92750a',
                      letterSpacing: '0.02em',
                      marginBottom: '14px',
                    }}
                  >
                    {service.tagline}
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      color: '#64748B',
                      lineHeight: 1.65,
                      marginBottom: '22px',
                      fontWeight: 400,
                    }}
                  >
                    {service.description}
                  </p>

                  {/* Features list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '26px' }}>
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="ref-bullet" style={{ fontSize: '0.86rem', color: '#334155' }}>
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer spec bar & Action Button */}
                <div
                  style={{
                    paddingTop: '18px',
                    borderTop: '1px solid rgba(0, 0, 0, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: '#94A3B8',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {service.spec}
                  </span>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelectService?.(service.title)}
                    className="btn-yellow-ref"
                    style={{ padding: '8px 16px', fontSize: '0.75rem' }}
                  >
                    <span>Inquire</span>
                    <span style={{ fontSize: '0.85rem' }}>→</span>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
