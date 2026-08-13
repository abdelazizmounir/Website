import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Clock, Award, ArrowUpRight } from 'lucide-react';
import { companyInfo } from '../data/companyData';
import { servicesData } from '../data/servicesData';

export const Footer = ({ setActiveTab, openDevisModal, onSelectService }) => {
  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img
                src="/images/logo.png"
                alt="AM Green ART Logo"
                style={{ height: '56px', borderRadius: '8px', background: 'white', padding: '4px' }}
              />
              <div>
                <h3 className="footer-logo-title">{companyInfo.name}</h3>
                <p style={{ color: 'var(--bright-lime)', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '1px' }}>
                  {companyInfo.subtitle}
                </p>
              </div>
            </div>
            <p className="footer-desc">
              L'expert reconnu dans la région Fès Meknès pour l'aménagement, l'entretien des espaces verts, l'installation de systèmes d'irrigation et la vente en pépinière.
            </p>

            {/* Social Media Buttons */}
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.75rem', marginBottom: '0.75rem' }}>
              <a
                href={companyInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram AM GREEN ART"
                style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.25s ease', border: '1px solid rgba(255,255,255,0.2)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#E1306C'; e.currentTarget.style.borderColor = '#E1306C'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href={companyInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook AM GREEN ART"
                style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.25s ease', border: '1px solid rgba(255,255,255,0.2)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#1877F2'; e.currentTarget.style.borderColor = '#1877F2'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button className="btn-gold" onClick={openDevisModal}>
                Demander un Devis Gratuit
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links">
              <li><a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>Accueil</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>Tous les Services</a></li>
              <li><a href="#nursery" onClick={(e) => { e.preventDefault(); handleNavClick('nursery'); }}>Pépinière & Vente Végétaux</a></li>
              <li><a href="#portfolio" onClick={(e) => { e.preventDefault(); handleNavClick('portfolio'); }}>Nos Réalisations</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>À Propos de Nous</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>Contact & Accès</a></li>
              <li><a href="#admin" onClick={(e) => { e.preventDefault(); handleNavClick('admin'); }} style={{ color: 'var(--bright-lime)', fontWeight: 700 }}>Espace Gestion (Admin)</a></li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="footer-heading">Nos 7 Services</h4>
            <ul className="footer-links">
              {servicesData.map(service => (
                <li key={service.id}>
                  <a
                    href={`#service-${service.id}`}
                    onClick={(e) => { e.preventDefault(); onSelectService(service); }}
                  >
                    {service.shortTitle}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="footer-heading">Coordonnées & Siège</h4>
            <ul className="footer-links" style={{ marginBottom: '1.25rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <MapPin size={18} color="var(--bright-lime)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>{companyInfo.legal.address}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={18} color="var(--bright-lime)" style={{ flexShrink: 0 }} />
                <a href={`tel:${companyInfo.contact.phonePrimaryClean}`}>{companyInfo.contact.phonePrimary} / {companyInfo.contact.phoneSecondary}</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={18} color="var(--bright-lime)" style={{ flexShrink: 0 }} />
                <a href={`mailto:${companyInfo.contact.email}`}>{companyInfo.contact.email}</a>
              </li>
            </ul>

            <div className="footer-legal-box">
              <strong style={{ color: 'white', display: 'block', marginBottom: '0.25rem' }}>Informations Légales :</strong>
              AM GREEN ART {companyInfo.legal.form}<br />
              Capital : {companyInfo.legal.capital}<br />
              RC : {companyInfo.legal.rc} | IF : {companyInfo.legal.if}<br />
              ICE : {companyInfo.legal.ice}
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {companyInfo.name}. Tous droits réservés. Qualité & Engagement Paysager.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Région Fès Meknès - Maroc</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
