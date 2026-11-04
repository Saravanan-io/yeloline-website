import React from 'react';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  const phoneNumber = '919786867009';
  const displayPhone = '+91 97868 67009';
  const message = 'Hello Yeloline Construction! I would like to inquire about your architectural and construction services.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '26px',
        right: '26px',
        zIndex: 9998,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* The Floating WhatsApp Icon Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with Yeloline on WhatsApp: ${displayPhone}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="whatsapp-floating-btn"
        style={{
          position: 'relative',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          textDecoration: 'none',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.42), 0 2px 8px rgba(0, 0, 0, 0.12)',
          transition: 'background-color 0.25s ease, box-shadow 0.25s ease',
        }}
      >
        {/* Soft Pulse Ripple Ring */}
        <span className="whatsapp-pulse-ring" />

        {/* Official WhatsApp SVG Logo */}
        <svg
          viewBox="0 0 32 32"
          width="34"
          height="34"
          fill="currentColor"
          style={{ position: 'relative', zIndex: 1 }}
        >
          <path d="M16 2C8.28 2 2 8.28 2 16c0 2.72.78 5.26 2.13 7.42L2.05 30l6.77-2.03A13.9 13.9 0 0016 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.56c-2.38 0-4.62-.68-6.52-1.86l-.47-.29-4.32 1.3 1.32-4.2-.31-.49A11.53 11.53 0 014.44 16c0-6.37 5.19-11.56 11.56-11.56 6.37 0 11.56 5.19 11.56 11.56s-5.19 11.56-11.56 11.56zm6.33-8.67c-.35-.17-2.06-1.02-2.38-1.13-.32-.12-.55-.17-.78.18-.23.35-.9 1.13-1.1 1.36-.2.23-.41.26-.76.09-.35-.18-1.47-.54-2.8-1.73-1.03-.92-1.73-2.06-1.93-2.41-.2-.35-.02-.54.15-.71.16-.16.35-.41.52-.61.18-.2.23-.35.35-.58.12-.23.06-.44-.03-.61-.09-.18-.78-1.89-1.07-2.58-.28-.68-.57-.59-.78-.6h-.67c-.23 0-.61.09-.93.44-.32.35-1.22 1.2-1.22 2.92 0 1.72 1.25 3.38 1.43 3.61.17.23 2.46 3.76 5.96 5.27.83.36 1.48.58 1.99.74.84.27 1.6.23 2.2.14.67-.1 2.06-.84 2.35-1.66.29-.81.29-1.51.2-1.66-.08-.14-.32-.23-.67-.41z" />
        </svg>
      </motion.a>

      <style>{`
        .whatsapp-floating-btn:hover {
          background-color: #20BD5A !important;
          box-shadow: 0 12px 28px rgba(37, 211, 102, 0.55), 0 4px 12px rgba(0, 0, 0, 0.16) !important;
        }
        .whatsapp-pulse-ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid rgba(37, 211, 102, 0.65);
          animation: wa-pulse 2.4s infinite cubic-bezier(0.25, 1, 0.5, 1);
          pointer-events: none;
        }
        @keyframes wa-pulse {
          0% {
            transform: scale(0.95);
            opacity: 0.85;
          }
          65% {
            transform: scale(1.35);
            opacity: 0;
          }
          100% {
            transform: scale(1.35);
            opacity: 0;
          }
        }
        @media (max-width: 640px) {
          .whatsapp-floating-btn {
            width: 54px !important;
            height: 54px !important;
          }
          .whatsapp-floating-btn svg {
            width: 30px !important;
            height: 30px !important;
          }
        }
      `}</style>
    </div>
  );
}
