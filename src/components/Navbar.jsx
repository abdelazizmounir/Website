import React, { useState } from 'react';
import { Phone, FileText, Menu, X, Leaf, ShoppingBag, Lock } from 'lucide-react';
import { companyInfo } from '../data/companyData';

export const Navbar = ({ activeTab, setActiveTab, openDevisModal }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="header-sticky glass-panel">
      <div className="navbar-container">
        {/* Logo */}
        <div
          className="logo-wrapper"
          onClick={() => handleNavClick('home')}
          style={{ cursor: 'pointer' }}
        >
          <img
            src="/images/logo.png"
            alt="AM Green ART Logo"
            className="logo-img"
          />
        </div>

        {/* Desktop Navigation */}
        <nav>
          <ul className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
            <li>
              <button
                className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                Accueil
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${activeTab === 'services' || activeTab.startsWith('service-') ? 'active' : ''}`}
                onClick={() => handleNavClick('services')}
              >
                Nos Services
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${activeTab === 'nursery' ? 'active' : ''}`}
                onClick={() => handleNavClick('nursery')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
              >
                <Leaf size={16} color="#2E7D32" />
                Pépinière & Vente
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${activeTab === 'portfolio' ? 'active' : ''}`}
                onClick={() => handleNavClick('portfolio')}
              >
                Réalisations
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
                onClick={() => handleNavClick('about')}
              >
                À Propos
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
                onClick={() => handleNavClick('contact')}
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>

        {/* CTA Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => handleNavClick('admin')}
            title="Espace Gestion Pépinière (Admin)"
            className={`btn-outline ${activeTab === 'admin' ? 'active' : ''}`}
            style={{
              padding: '0.55rem',
              borderRadius: 'var(--radius-full)',
              background: activeTab === 'admin' ? 'var(--gold)' : 'rgba(255,255,255,0.8)',
              color: activeTab === 'admin' ? 'var(--primary-dark)' : 'var(--primary-dark)',
              borderColor: 'rgba(0,0,0,0.1)'
            }}
          >
            <Lock size={16} />
          </button>

          <a
            href={`tel:${companyInfo.contact.phonePrimaryClean}`}
            className="btn-outline"
            style={{ padding: '0.55rem 1rem', fontSize: '0.88rem' }}
          >
            <Phone size={16} />
            <span className="phone-desktop-only">{companyInfo.contact.phonePrimary}</span>
          </a>

          <button
            className="btn-primary"
            onClick={openDevisModal}
            style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}
          >
            <FileText size={16} />
            Devis Gratuit
          </button>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </header>
  );
};
