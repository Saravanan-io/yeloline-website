import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building, 
  Briefcase, 
  PencilRuler, 
  Sparkles, 
  Hammer, 
  ClipboardCheck 
} from 'lucide-react';

export default function OurServices({ onSelectService }) {
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

  return (
    <section
      id="services"
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
        style={{ top: '10px', right: '3%' }}
      >
        SERVICES
      </div>

      {/* Floating Geometric Accents from Reference Style */}
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

      <div className="app-container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ marginBottom: '48px' }}>
          <div className="badge-gold" style={{ marginBottom: '14px' }}>
            <Building size={13} color="#000000" />
            <span>04 // COMPREHENSIVE EXPERTISE • OUR SERVICES</span>
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
                Disciplines & Services
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
                From visionary architectural blueprinting to turnkey structural delivery, our integrated engineering
                protocols eliminate subcontracting bloat and deliver guaranteed architectural excellence.
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid Layout with Reference Card Styling */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '26px',
          }}
        >
          {services.map((service, idx) => {
            const IconComp = service.icon;

            return (
              <motion.div
                key={service.id}
                whileHover={{ y: -4 }}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '4px',
                  border: '1px solid #E2E8F0',
                  borderTop: '3px solid #000000',
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 20px -4px rgba(0, 0, 0, 0.04)',
                  transition: 'all 0.25s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#000000';
                  e.currentTarget.style.borderTopColor = '#F9DF04';
                  e.currentTarget.style.boxShadow = '0 12px 30px -4px rgba(0, 0, 0, 0.09)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.borderTopColor = '#000000';
                  e.currentTarget.style.boxShadow = '0 4px 20px -4px rgba(0, 0, 0, 0.04)';
                }}
              >
                <div>
                  {/* Top Bar: Black/Yellow Icon & Index */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '20px',
                    }}
                  >
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '3px',
                        backgroundColor: '#000000',
                        color: '#F9DF04',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <IconComp size={22} />
                    </div>

                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.85rem',
                        fontWeight: 900,
                        color: '#CBD5E1',
                        letterSpacing: '0.05em',
                      }}
                    >
                      0{idx + 1}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.28rem',
                      fontWeight: 900,
                      color: '#000000',
                      textTransform: 'uppercase',
                      letterSpacing: '-0.01em',
                      marginBottom: '6px',
                    }}
                  >
                    {service.title}
                  </h3>

                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#B45309',
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase',
                      marginBottom: '12px',
                    }}
                  >
                    {service.tagline}
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      color: '#64748B',
                      lineHeight: 1.6,
                      marginBottom: '20px',
                    }}
                  >
                    {service.description}
                  </p>

                  {/* Features list with Reference yellow-dash prefix */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="ref-bullet" style={{ fontSize: '0.86rem', color: '#334155' }}>
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer spec bar & Action Button styled like Reference */}
                <div
                  style={{
                    paddingTop: '16px',
                    borderTop: '1px solid #F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#64748B',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {service.spec}
                  </span>

                  <button
                    onClick={() => onSelectService?.(service.title)}
                    className="btn-yellow-ref"
                    style={{ padding: '7px 14px', fontSize: '0.75rem' }}
                  >
                    <span>Inquire</span>
                    <span style={{ fontSize: '0.85rem' }}>↓</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
