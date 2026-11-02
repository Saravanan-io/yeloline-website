import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  PencilRuler, 
  Shovel, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  Clock
} from 'lucide-react';

export default function ConstructionProcess() {
  const [activeStep, setActiveStep] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const stages = [
    {
      step: '01',
      title: 'Architectural Blueprinting & Approvals',
      subtitle: 'Conceptual Design & Permitting',
      icon: PencilRuler,
      duration: 'Weeks 1 – 4',
      badge: 'PHASE 01 // CONCEPT',
      overview: 'Every project initiates with topographic site surveying, solar-radiation path modeling, and bespoke 3D CAD blueprints tailored to municipal sanction regulations.',
      deliverables: [
        'Photorealistic 3D Elevations & Virtual Walkthroughs',
        'Soil Core Bearing Capacity (SBC) Lab Testing',
        'Municipal Plan Sanctions & Regulatory Clearances',
        'Detailed Fixed-Price BOQ with Zero Hidden Clauses'
      ],
      qualityCheck: 'Structural Engineer Sign-off + Seismic Compliance Audit'
    },
    {
      step: '02',
      title: 'Substructure, Excavation & Foundation',
      subtitle: 'Earthwork & Footing Engineering',
      icon: Shovel,
      duration: 'Weeks 5 – 9',
      badge: 'PHASE 02 // SUBSTRUCTURE',
      overview: 'Precision mechanized earth excavation down to bedrock. Anti-termite subterranean chemical treatment and heavy reinforced concrete footings cast with M30 Grade concrete.',
      deliverables: [
        'Mechanized Deep Excavation & Dewatering System',
        'Anti-Termite Sub-Grade Soil Impregnation',
        'Raft / Isolated Footing with Fe550D High-Yield Rebar',
        'Plinth Beam Casting & Dual-Coat Bituminous Waterproofing'
      ],
      qualityCheck: '7-Day & 28-Day Concrete Cube Compressive Strength Lab Tests'
    },
    {
      step: '03',
      title: 'RCC Framework & Cantilever Slabs',
      subtitle: 'Superstructure Structural Skeleton',
      icon: Layers,
      duration: 'Weeks 10 – 20',
      badge: 'PHASE 03 // SUPERSTRUCTURE',
      overview: 'Erecting the structural skeleton with monolithic post-tensioned slabs, slender shear columns, and dramatic overhangs engineered for Zone-IV seismic resistance.',
      deliverables: [
        'Laser-Aligned Plywood Shuttering for Smooth Finishes',
        'Monolithic Pouring of Columns, Beams & Slabs',
        'Vibration Compaction to Eliminate Honeycombing',
        '21-Day Continuous Pond Curing with Curing Compound'
      ],
      qualityCheck: 'Ultrasonic Pulse Velocity (UPV) Non-Destructive Testing'
    },
    {
      step: '04',
      title: 'Masonry, Waterproofing & MEP Rough-Ins',
      subtitle: 'Enclosure, Utilities & Thermal Envelope',
      icon: ShieldCheck,
      duration: 'Weeks 21 – 30',
      badge: 'PHASE 04 // BUILDING ENVELOPE',
      overview: 'High-density AAC blockwork masonry for enhanced thermal and acoustic comfort. Multi-layer polyurethane waterproofing on terrace slabs, balconies, and wet areas.',
      deliverables: [
        'Autoclaved Aerated Concrete (AAC) Lightweight Masonry',
        'Multi-Layer Polymer-Modified Waterproofing with 15-Yr Warranty',
        'Concealed CPVC/UPVC Plumbing Lines Pressure Tested at 10 Bar',
        'Fire-Retardant Conduit Wiring & Smart Home Pre-Cabling'
      ],
      qualityCheck: '72-Hour Continuous Hydrostatic Ponding Test on All Slabs'
    },
    {
      step: '05',
      title: 'Architectural Finishes & Interior Craft',
      subtitle: 'Cladding, Flooring & Millwork',
      icon: Sparkles,
      duration: 'Weeks 31 – 40',
      badge: 'PHASE 05 // ARTISANAL FINISHING',
      overview: 'Transforming structural bare shell into luxurious living spaces. Precision laying of imported marble, seamless drywall plastering, and acoustic double-glazed glass facades.',
      deliverables: [
        'Italian Statuario Marble Flooring with Zero-Lippage Precision',
        'Low-E Acoustic Double-Glazed Aluminum Sliding Windows',
        'Concealed Architectural Cove Lighting & Custom Gypsum Ceilings',
        'Automated VRV Air Conditioning & Smart Lighting Integration'
      ],
      qualityCheck: 'Laser Level Tolerance Check (<1mm deviation per 3 meters)'
    },
    {
      step: '06',
      title: 'Final Commissioning & Turnkey Handover',
      subtitle: 'Audit, Certification & Lifetime Support',
      icon: CheckCircle2,
      duration: 'Weeks 41 – 44',
      badge: 'PHASE 06 // HANDOVER',
      overview: 'Comprehensive 150-point quality audit covering all mechanical, electrical, and structural systems. Formal client handover with complete as-built blueprints and warranty dossier.',
      deliverables: [
        'Complete 150-Point Pre-Delivery Quality Checklist',
        'As-Built MEP & Structural Architectural Blueprint Dossier',
        '15-Year Transferable Waterproofing & Structural Warranty',
        '24/7 Dedicated Concierge Maintenance Care Team'
      ],
      qualityCheck: 'Full NDT Verification & Client Certification Sign-Off'
    }
  ];

  const current = stages[activeStep];
  const CurrentIcon = current.icon;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, y: 0, 
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <section
      id="process"
      ref={ref}
      style={{
        backgroundColor: '#FFFFFF',
        padding: '110px 0',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* Background Watermark Typography */}
      <div
        className="watermark-bg select-none pointer-events-none"
        style={{ top: '15px', left: '2%' }}
      >
        PROCESS
      </div>

      {/* Subtle ambient gradient */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '60%',
          height: '50%',
          background: 'radial-gradient(ellipse at 20% 100%, rgba(249, 223, 4, 0.03) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating Geometric Accents */}
      <div
        className="geo-diamond"
        style={{
          position: 'absolute',
          top: '70px',
          right: '8%',
          width: '32px',
          height: '32px',
        }}
      />
      <div
        className="geo-triangle"
        style={{
          position: 'absolute',
          bottom: '120px',
          left: '3%',
          width: 0,
          height: 0,
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
        <motion.div variants={itemVariants} style={{ marginBottom: '44px' }}>
          <div className="badge-gold" style={{ marginBottom: '16px' }}>
            <Layers size={13} color="#92750a" />
            <span>04 // Systematic Methodology • How We Build</span>
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
                Construction Process
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
                A transparent, rigorous 6-stage engineering roadmap engineered for flawless precision,
                guaranteed timelines, and zero structural compromises.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Modern Stage Navigation Pills */}
        <motion.div
          variants={itemVariants}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '10px',
            backgroundColor: 'rgba(248, 250, 252, 0.8)',
            padding: '10px',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            marginBottom: '36px',
            backdropFilter: 'blur(10px)',
          }}
        >
          {stages.map((st, i) => {
            const isActive = activeStep === i;
            return (
              <motion.button
                key={i}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveStep(i)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: isActive ? '#0F172A' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#334155',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  textAlign: 'left',
                  boxShadow: isActive ? '0 4px 16px rgba(0, 0, 0, 0.15)' : 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    color: isActive ? '#F9DF04' : '#94A3B8',
                  }}
                >
                  {st.step}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.78rem',
                    fontWeight: isActive ? 700 : 600,
                    lineHeight: 1.2,
                    color: isActive ? '#FFFFFF' : '#0F172A',
                    textTransform: 'uppercase',
                  }}
                >
                  {st.subtitle}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Active Stage Showcase */}
        <motion.div variants={itemVariants} style={{ position: 'relative' }}>
          {/* Gradient Backdrop */}
          <div
            style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              width: '55%',
              height: '75%',
              background: 'linear-gradient(135deg, rgba(249, 223, 4, 0.6) 0%, rgba(249, 223, 4, 0.2) 100%)',
              borderRadius: 'var(--radius-xl)',
              zIndex: 0,
              filter: 'blur(1px)',
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 16, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.99 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                zIndex: 1,
                background: 'linear-gradient(145deg, #0F172A 0%, #1E293B 100%)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                padding: '42px 38px',
                boxShadow: '0 24px 50px -12px rgba(0, 0, 0, 0.25)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '40px',
                alignItems: 'center',
              }}
            >
              {/* Left Column: Stage Info & Deliverables */}
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'linear-gradient(135deg, #F9DF04 0%, #E5CC00 100%)',
                    color: '#000000',
                    padding: '7px 16px',
                    borderRadius: 'var(--radius-full)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.73rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    marginBottom: '20px',
                    boxShadow: '0 2px 10px rgba(249, 223, 4, 0.3)',
                  }}
                >
                  <span>{current.badge}</span>
                  <span>•</span>
                  <Clock size={12} />
                  <span>{current.duration}</span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.5rem, 2.2vw, 2rem)',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    marginBottom: '16px',
                  }}
                >
                  {current.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    lineHeight: 1.65,
                    color: '#94A3B8',
                    marginBottom: '28px',
                    fontWeight: 400,
                  }}
                >
                  {current.overview}
                </p>

                {/* Deliverables Checklist */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      color: '#F9DF04',
                      textTransform: 'uppercase',
                    }}
                  >
                    Key Stage Deliverables:
                  </div>
                  {current.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="ref-bullet" style={{ color: '#E2E8F0', fontSize: '0.88rem' }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: QA Certification Card & Stage Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderLeft: '3px solid #F9DF04',
                    padding: '26px 24px',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: 'var(--radius-md)',
                        background: 'linear-gradient(135deg, rgba(249, 223, 4, 0.2) 0%, rgba(249, 223, 4, 0.08) 100%)',
                        border: '1px solid rgba(249, 223, 4, 0.3)',
                        color: '#F9DF04',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <CurrentIcon size={22} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.72rem', fontWeight: 700, color: '#F9DF04', letterSpacing: '0.06em' }}>
                        QUALITY MANDATE
                      </div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, color: '#FFFFFF' }}>
                        Stage 0{activeStep + 1} Testing Protocol
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: 'var(--radius-md)',
                      padding: '14px 18px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.86rem',
                      fontWeight: 400,
                      color: '#E2E8F0',
                      lineHeight: 1.5,
                    }}
                  >
                    🛡️ {current.qualityCheck}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  {activeStep > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveStep(activeStep - 1)}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#FFFFFF',
                        padding: '10px 20px',
                        borderRadius: 'var(--radius-full)',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        transition: 'all 0.3s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <ArrowLeft size={14} />
                      Previous
                    </motion.button>
                  )}

                  {activeStep < stages.length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveStep(activeStep + 1)}
                      className="btn-yellow-ref"
                      style={{ padding: '10px 22px', fontSize: '0.82rem' }}
                    >
                      <span>Phase 0{activeStep + 2}</span>
                      <ArrowRight size={14} />
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}
