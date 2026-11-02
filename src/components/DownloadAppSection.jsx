import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, QrCode, Smartphone, X, Check, Apple, Play } from 'lucide-react';

export default function DownloadAppSection() {
  const [showModal, setShowModal] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadClick = () => {
    setShowModal(true);
  };

  const handleDirectDownload = (e) => {
    e.stopPropagation();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  return (
    <>
      <section
        id="download-app-section"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '540px',
          backgroundColor: '#FFFFFF',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          userSelect: 'none',
        }}
      >
        {/* ================= BACKGROUND GRAPHICS & CURVES ================= */}

        {/* 1. Subtle Architectural Building in Top Right */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '52%',
            height: '100%',
            backgroundImage: 'url(/images/about_architecture.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'right 20% top',
            opacity: 0.16,
            filter: 'grayscale(100%) contrast(110%) brightness(115%)',
            maskImage: 'linear-gradient(to left, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 85%)',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 85%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* 2. Top-Left Yellow Curved Arc */}
        <svg
          viewBox="0 0 400 400"
          style={{
            position: 'absolute',
            top: '-60px',
            left: '-60px',
            width: '320px',
            height: '320px',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          {/* Outer yellow swoosh curve */}
          <path
            d="M 60,60 C 20,180 80,320 220,380 C 120,340 60,240 80,120 Z"
            fill="#FEC603"
            opacity="0.95"
          />
        </svg>

        {/* 3. Left Yellow Circle Backdrop behind the Phone */}
        <div
          style={{
            position: 'absolute',
            left: '3%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(360px, 42vw, 540px)',
            height: 'clamp(360px, 42vw, 540px)',
            borderRadius: '50%',
            backgroundColor: '#FFC700',
            boxShadow: '0 0 60px rgba(254, 198, 3, 0.35)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* 4. Bottom Fluid Dark Wave with Yellow Ribbon */}
        <svg
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 'clamp(110px, 16vw, 175px)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          {/* Yellow Wave Ribbon Contour */}
          <path
            d="M 0,165 C 160,110 320,80 480,125 C 680,180 860,185 1100,120 C 1240,82 1360,68 1440,78 L 1440,102 C 1360,92 1240,105 1100,142 C 860,208 680,202 480,148 C 320,102 160,132 0,186 Z"
            fill="#FEC603"
          />

          {/* Bottom Dark Obsidian Wave Area */}
          <path
            d="M 0,180 C 160,125 320,95 480,140 C 680,195 860,200 1100,135 C 1240,97 1360,82 1440,92 L 1440,220 L 0,220 Z"
            fill="#18181B"
          />

          {/* Bottom Right Golden Accent Swoosh */}
          <path
            d="M 1260,220 C 1320,180 1390,160 1440,150 L 1440,220 Z"
            fill="#FFC700"
            opacity="0.9"
          />
        </svg>

        {/* ================= CONTENT CONTAINER ================= */}
        <div
          className="app-container"
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1.15fr',
            alignItems: 'center',
            minHeight: '520px',
            paddingTop: '20px',
            paddingBottom: '20px',
          }}
        >
          {/* LEFT COLUMN: Hand Holding Phone Cutout Image */}
          <div
            style={{
              position: 'relative',
              height: '100%',
              minHeight: '440px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                display: 'inline-block',
                width: '100%',
                maxWidth: '460px',
              }}
            >
              <motion.img
                src="/images/yeloline_app_hand_phone.png"
                alt="Yeloline Mobile App on Smartphone"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: 'clamp(400px, 48vw, 560px)',
                  objectFit: 'contain',
                  objectPosition: 'bottom left',
                  display: 'block',
                  filter: 'drop-shadow(0 20px 35px rgba(0, 0, 0, 0.22))',
                }}
              />
            </motion.div>
          </div>

          {/* RIGHT COLUMN: DOWNLOAD OUR MOBILE APP LOCKUP */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '24px 10px',
              position: 'relative',
            }}
          >
            {/* 1. Golden Download Icon Button with Spark Burst Rays */}
            <div
              style={{
                position: 'relative',
                marginBottom: '18px',
                display: 'inline-block',
              }}
            >
              {/* Radiating Yellow Spark Rays (Top-Right of Button) */}
              <div
                style={{
                  position: 'absolute',
                  top: '-16px',
                  right: '-24px',
                  width: '40px',
                  height: '40px',
                  pointerEvents: 'none',
                }}
              >
                {/* Spark Ray 1 */}
                <span
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '12px',
                    width: '4.5px',
                    height: '14px',
                    backgroundColor: '#FFC700',
                    borderRadius: '9999px',
                    transform: 'rotate(25deg)',
                    display: 'block',
                  }}
                />
                {/* Spark Ray 2 */}
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '0px',
                    width: '4.5px',
                    height: '14px',
                    backgroundColor: '#FFC700',
                    borderRadius: '9999px',
                    transform: 'rotate(65deg)',
                    display: 'block',
                  }}
                />
                {/* Spark Ray 3 */}
                <span
                  style={{
                    position: 'absolute',
                    top: '0px',
                    right: '2px',
                    width: '4px',
                    height: '9px',
                    backgroundColor: '#FFC700',
                    borderRadius: '9999px',
                    transform: 'rotate(45deg)',
                    display: 'block',
                  }}
                />
              </div>

              {/* The Rounded Golden Download Button */}
              <motion.button
                onClick={handleDownloadClick}
                whileHover={{ scale: 1.08, rotate: 2 }}
                whileTap={{ scale: 0.94 }}
                aria-label="Download Yeloline Mobile App"
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '22px',
                  backgroundColor: '#FEC603',
                  background: 'linear-gradient(145deg, #FFDE00 0%, #FFB600 100%)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 12px 28px rgba(254, 198, 3, 0.45)',
                  outline: 'none',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Download Tray & Down Arrow Icon */}
                <svg
                  viewBox="0 0 24 24"
                  width="36"
                  height="36"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3v12" />
                  <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />
                  <path d="M4 17.5v1.5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1.5" />
                </svg>
              </motion.button>
            </div>

            {/* 2. Top Heading: DOWNLOAD OUR */}
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.1rem, 4.4vw, 3.4rem)',
                fontWeight: 900,
                color: '#000000',
                letterSpacing: '-0.025em',
                lineHeight: 1.08,
                margin: '0 0 10px 0',
                textTransform: 'uppercase',
              }}
            >
              DOWNLOAD OUR
            </h2>

            {/* 3. Skewed Yellow Banner: MOBILE APP */}
            <motion.div
              onClick={handleDownloadClick}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'inline-block',
                cursor: 'pointer',
                transform: 'skewX(-11deg)',
                backgroundColor: '#FEC603',
                background: 'linear-gradient(90deg, #FFD100 0%, #FFC100 100%)',
                padding: '10px 42px',
                borderRadius: '8px',
                boxShadow: '0 10px 30px rgba(254, 198, 3, 0.42)',
                margin: '4px 0 22px 0',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.5rem, 5.2vw, 4.2rem)',
                  fontWeight: 950,
                  fontStyle: 'italic',
                  color: '#000000',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  textTransform: 'uppercase',
                  WebkitTextStroke: '0.5px #000000',
                }}
              >
                MOBILE APP
              </span>
            </motion.div>

            {/* 4. Hashtag Pill: # GET THE YELOLINE APP with spark rays */}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <motion.div
                onClick={handleDownloadClick}
                whileHover={{ scale: 1.04, borderColor: '#000000' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#FFFFFF',
                  border: '2.5px solid #FEC603',
                  borderRadius: '9999px',
                  padding: '9px 28px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                  transition: 'border-color 0.2s ease',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1rem, 1.8vw, 1.4rem)',
                    fontWeight: 900,
                    letterSpacing: '0.02em',
                    lineHeight: 1,
                  }}
                >
                  <span style={{ color: '#000000' }}># GET THE</span>
                  <span style={{ color: '#FFB800', marginLeft: '4px', marginRight: '4px' }}>
                    YELOLINE
                  </span>
                  <span style={{ color: '#000000' }}>APP</span>
                </span>
              </motion.div>

              {/* Bottom Right Radiating Sparks */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-14px',
                  right: '-20px',
                  width: '30px',
                  height: '30px',
                  pointerEvents: 'none',
                }}
              >
                {/* Spark Ray 1 */}
                <span
                  style={{
                    position: 'absolute',
                    top: '8px',
                    left: '6px',
                    width: '4px',
                    height: '14px',
                    backgroundColor: '#FFC700',
                    borderRadius: '9999px',
                    transform: 'rotate(-45deg)',
                    display: 'block',
                  }}
                />
                {/* Spark Ray 2 */}
                <span
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    width: '4px',
                    height: '11px',
                    backgroundColor: '#FFC700',
                    borderRadius: '9999px',
                    transform: 'rotate(-20deg)',
                    display: 'block',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE APP DOWNLOAD MODAL ================= */}
      <AnimatePresence>
        {showModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(15, 23, 42, 0.72)',
                backdropFilter: 'blur(8px)',
              }}
            />

            {/* Modal Content Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '520px',
                backgroundColor: '#FFFFFF',
                borderRadius: '28px',
                padding: '36px 32px',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(254, 198, 3, 0.3)',
                zIndex: 10,
                textAlign: 'center',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(0,0,0,0.08)',
                  backgroundColor: '#F8FAFC',
                  color: '#0F172A',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s',
                }}
              >
                <X size={18} />
              </button>

              {/* Yeloline App Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 16px',
                  borderRadius: '9999px',
                  backgroundColor: '#FEF9C3',
                  border: '1px solid #FEC603',
                  color: '#000000',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-heading)',
                  marginBottom: '14px',
                }}
              >
                <Smartphone size={15} color="#000000" />
                YELOLINE OFFICIAL APPLICATION
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.75rem',
                  fontWeight: 900,
                  color: '#0F172A',
                  margin: '0 0 8px 0',
                  letterSpacing: '-0.02em',
                }}
              >
                Get The Yeloline App
              </h3>
              <p
                style={{
                  fontSize: '0.92rem',
                  color: '#64748B',
                  lineHeight: 1.55,
                  margin: '0 auto 24px auto',
                  maxWidth: '380px',
                }}
              >
                Track on-site construction progress in real-time, inspect 3D engineering blueprints, and view live BOQ updates.
              </p>

              {/* QR Code Container */}
              <div
                style={{
                  display: 'inline-flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '16px',
                  borderRadius: '20px',
                  backgroundColor: '#FFFDF0',
                  border: '2px dashed #FEC603',
                  marginBottom: '24px',
                }}
              >
                <img
                  src="/images/yeloline_qr_code.png"
                  alt="Scan QR code to download Yeloline App"
                  style={{
                    width: '130px',
                    height: '130px',
                    borderRadius: '12px',
                    display: 'block',
                  }}
                />
                <span
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#0F172A',
                    marginTop: '10px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  Scan with Camera to Install
                </span>
              </div>

              {/* App Store / Google Play Buttons */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  marginBottom: '16px',
                }}
              >
                <button
                  onClick={handleDirectDownload}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    backgroundColor: '#0F172A',
                    color: '#FFFFFF',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <Apple size={20} />
                  <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                    <div style={{ fontSize: '0.62rem', opacity: 0.8 }}>Download on</div>
                    <div>App Store</div>
                  </div>
                </button>

                <button
                  onClick={handleDirectDownload}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    backgroundColor: '#0F172A',
                    color: '#FFFFFF',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <Play size={18} fill="#FFFFFF" />
                  <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                    <div style={{ fontSize: '0.62rem', opacity: 0.8 }}>GET IT ON</div>
                    <div>Google Play</div>
                  </div>
                </button>
              </div>

              {/* Direct APK Download feedback */}
              {downloadSuccess ? (
                <div
                  style={{
                    backgroundColor: '#DCFCE7',
                    color: '#166534',
                    padding: '10px',
                    borderRadius: '10px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <Check size={16} /> APK Download initiated successfully!
                </div>
              ) : (
                <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                  Compatible with iOS 15+ and Android 10+ devices
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Responsive Styles for the App Section */}
      <style>{`
        @media (max-width: 900px) {
          #download-app-section .app-container {
            grid-template-columns: 1fr !important;
            padding-top: 40px !important;
            padding-bottom: 70px !important;
            text-align: center;
          }
          #download-app-section .app-container > div:first-child {
            order: 2;
            min-height: 300px !important;
            justify-content: center !important;
          }
          #download-app-section .app-container > div:last-child {
            order: 1;
            margin-bottom: 20px;
          }
        }
      `}</style>
    </>
  );
}
