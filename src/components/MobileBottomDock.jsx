import React from 'react';
import { Home, Building2, FileText, Truck, Phone } from 'lucide-react';

export default function MobileBottomDock({ activePage, setActivePage, activeSection, setActiveSection, onOpenQuote }) {
  const currentActive = activePage || activeSection || 'home';
  const handlePageChange = (pageId) => {
    if (setActivePage) setActivePage(pageId);
    else if (setActiveSection) setActiveSection(pageId);
  };

  const dockItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'portfolio', label: 'Portfolio', icon: Building2 },
    { id: 'quote', label: 'Quote', icon: FileText, isAction: true },
    { id: 'renovation', label: 'Renovate', icon: Truck },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  return (
    <div
      className="mobile-bottom-dock"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid #E2E8F0',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.05)',
      }}
    >
      {dockItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentActive === item.id;

        return (
          <button
            key={item.id}
            onClick={() => {
              if (item.isAction) {
                if (onOpenQuote) onOpenQuote();
                else handlePageChange('contact');
              } else {
                handlePageChange(item.id);
              }
            }}
            className={`dock-item ${isActive ? 'active' : ''}`}
            style={{
              color: isActive ? '#0F172A' : '#64748B',
              fontWeight: isActive ? 700 : 500,
            }}
          >
            <div
              style={{
                backgroundColor: isActive ? '#000000' : 'transparent',
                borderRadius: '8px',
                padding: '4px 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
            >
              <Icon size={18} color={isActive ? '#F9DF04' : '#64748B'} />
            </div>
            <span style={{ marginTop: '2px', fontFamily: 'var(--font-heading)', fontSize: '0.72rem' }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
