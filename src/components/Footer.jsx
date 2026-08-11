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
                src="/images/logo.jpg" 
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
              L'expert reconnu à Fès et sa région pour l'aménagement, l'entretien des espaces verts, l'installation de systèmes d'irrigation et la vente en pépinière.
            </p>
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
            <span>Fès - Meknès - Maroc</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
