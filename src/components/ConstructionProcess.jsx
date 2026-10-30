import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PencilRuler, 
  Shovel, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Clock
} from 'lucide-react';

export default function ConstructionProcess() {
  const [activeStep, setActiveStep] = useState(0);

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

  return (
    <section
      id="process"
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
        style={{ top: '15px', left: '2%' }}
      >
        PROCESS
      </div>

      {/* Floating Geometric Accents from Reference Style */}
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

      <div className="app-container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ marginBottom: '40px' }}>
          <div className="badge-gold" style={{ marginBottom: '14px' }}>
            <Layers size={13} color="#000000" />
            <span>05 // SYSTEMATIC METHODOLOGY • HOW WE BUILD</span>
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
                Construction Process
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
                A transparent, rigorous 6-stage engineering roadmap engineered for flawless precision,
                guaranteed timelines, and zero structural compromises.
              </p>
            </div>
          </div>
        </div>

        {/* Stage Navigation Pills styled like reference */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '8px',
            backgroundColor: '#F8FAFC',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #E2E8F0',
            marginBottom: '32px',
          }}
        >
          {stages.map((st, i) => {
            const isActive = activeStep === i;
            return (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  borderRadius: '3px',
                  backgroundColor: isActive ? '#000000' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#334155',
                  border: isActive ? '1px solid #000000' : '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.8rem',
                    fontWeight: 900,
                    color: isActive ? '#F9DF04' : '#94A3B8',
                  }}
                >
                  {st.step}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.8rem',
                    fontWeight: isActive ? 800 : 600,
                    lineHeight: 1.2,
                    color: isActive ? '#FFFFFF' : '#0F172A',
                    textTransform: 'uppercase',
                  }}
                >
                  {st.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Showcase with Offset Backdrop Block */}
        <div style={{ position: 'relative' }}>
          {/* Yellow Backdrop Offset Block (Signature Reference Element) */}
          <div
            style={{
              position: 'absolute',
              top: '-12px',
              right: '-12px',
              width: '60%',
              height: '80%',
              backgroundColor: '#F9DF04',
              borderRadius: '4px',
              zIndex: 0,
              opacity: 0.9,
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              style={{
                position: 'relative',
                zIndex: 1,
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                borderRadius: '4px',
                border: '2px solid #000000',
                padding: '38px 34px',
                boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.25)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '36px',
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
                    backgroundColor: '#F9DF04',
                    color: '#000000',
                    padding: '6px 12px',
                    borderRadius: '2px',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.74rem',
                    fontWeight: 900,
                    letterSpacing: '0.06em',
                    marginBottom: '16px',
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
                    fontWeight: 900,
                    color: '#FFFFFF',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.015em',
                    lineHeight: 1.2,
                    marginBottom: '14px',
                  }}
                >
                  {current.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.94rem',
                    lineHeight: 1.6,
                    color: '#94A3B8',
                    marginBottom: '24px',
                  }}
                >
                  {current.overview}
                </p>

                {/* Deliverables Checklist with Reference Dash Bullets */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.76rem',
                      fontWeight: 800,
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div
                  style={{
                    backgroundColor: '#1E293B',
                    borderRadius: '4px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderLeft: '4px solid #F9DF04',
                    padding: '24px 22px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
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
                      <CurrentIcon size={22} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.72rem', fontWeight: 800, color: '#F9DF04', letterSpacing: '0.06em' }}>
                        QUALITY MANDATE
                      </div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', textTransform: 'uppercase' }}>
                        Stage 0{activeStep + 1} Testing Protocol
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: '#0F172A',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '2px',
                      padding: '14px 16px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      color: '#E2E8F0',
                      lineHeight: 1.5,
                    }}
                  >
                    🛡️ {current.qualityCheck}
                  </div>
                </div>

                {/* Navigation Button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  {activeStep > 0 && (
                    <button
                      onClick={() => setActiveStep(activeStep - 1)}
                      style={{
                        backgroundColor: 'transparent',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        color: '#FFFFFF',
                        padding: '10px 18px',
                        borderRadius: '3px',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        transition: 'all 0.2s',
                      }}
                    >
                      Previous Phase
                    </button>
                  )}

                  {activeStep < stages.length - 1 && (
                    <button
                      onClick={() => setActiveStep(activeStep + 1)}
                      className="btn-yellow-ref"
                      style={{ padding: '10px 20px', fontSize: '0.82rem' }}
                    >
                      <span>Advance to Phase 0{activeStep + 2}</span>
                      <ArrowRight size={15} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
