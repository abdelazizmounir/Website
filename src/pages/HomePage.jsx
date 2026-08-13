import React from 'react';
import { ArrowRight, Leaf, ShieldCheck, CheckCircle2, Droplets, Scissors, Sparkles, Phone, FileText, Star, Award, Clock } from 'lucide-react';
import { companyInfo } from '../data/companyData';
import { servicesData } from '../data/servicesData';
import { nurseryProducts } from '../data/nurseryData';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ImageCarousel } from '../components/ImageCarousel';

export const HomePage = ({ setActiveTab, onSelectService, openDevisModal }) => {
  const heroShowcaseImages = [
    "/images/hero.jpg",
    "/img/conception paysagère (1).jpg",
    encodeURI("/img/Installation et maintenance des systèmes d'irrigation (2).jpg").replace(/'/g, '%27'),
    "/img/gazon (1).jpg",
    encodeURI("/img/Élagage des palmiers (2).jpg").replace(/'/g, '%27'),
    "/img/Vente des plantes (1).jpg"
  ];

  return (
    <div>
      {/* Hero Section - Clean Diagonal Split Layout */}
      <section className="hero-wrapper" style={{ minHeight: '88vh', position: 'relative', display: 'flex', alignItems: 'center' }}>
        {/* Ambient Decorative Orbs */}
        <div style={{
          position: 'absolute', top: '-120px', right: '-100px', width: '450px', height: '450px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(102, 187, 106, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 1
        }} />
        <div style={{
          position: 'absolute', bottom: '-80px', left: '-80px', width: '380px', height: '380px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(46, 125, 50, 0.3) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 3, width: '100%' }}>
          
          {/* Prominent Hero Top Logo (Horizontally Centered) */}
          <div style={{ textAlign: 'center', width: '100%', marginBottom: '1.75rem' }}>
            <img 
              src="/images/logo.png" 
              alt="AM Green ART Logo" 
              style={{
                height: '115px',
                width: 'auto',
                objectFit: 'contain',
                background: 'rgba(255, 255, 255, 0.96)',
                padding: '8px 20px',
                borderRadius: '20px',
                boxShadow: '0 12px 35px rgba(0, 0, 0, 0.4), 0 0 0 2px rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(10px)',
                display: 'inline-block',
                transition: 'transform 0.3s ease'
              }}
            />
          </div>

          <div className="hero-content animate-fade-in" style={{ maxWidth: '780px' }}>
            <h1 className="hero-title" style={{ 
              fontSize: 'clamp(2.8rem, 5.8vw, 4.2rem)', 
              fontWeight: 900, 
              lineHeight: 1.12, 
              marginBottom: '2rem', 
              color: '#FFFFFF',
              textShadow: '0 4px 20px rgba(0,0,0,0.6)',
              letterSpacing: '-0.5px'
            }}>
              Création, Aménagement & <span style={{ color: 'var(--bright-lime)', display: 'block', textShadow: '0 0 30px rgba(102,187,106,0.6)' }}>Entretien des Espaces Verts</span>
            </h1>

            {/* Quick Interactive Service Selector Pills */}
            <div style={{ marginBottom: '2rem' }}>
              <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, display: 'block', marginBottom: '0.6rem' }}>
                Nos Prestations Phares :
              </span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {servicesData.slice(0, 4).map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => onSelectService(srv)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.12)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      backdropFilter: 'blur(8px)',
                      color: 'white',
                      padding: '0.4rem 0.95rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--primary-leaf)';
                      e.currentTarget.style.borderColor = 'var(--bright-lime)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                    }}
                  >
                    <span>{srv.shortTitle}</span>
                    <ArrowRight size={13} color="var(--bright-lime)" />
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="hero-cta-group" style={{ marginBottom: '2.5rem' }}>
              <button className="btn-gold" onClick={openDevisModal} style={{ padding: '0.85rem 2rem', fontSize: '1.02rem', boxShadow: '0 8px 24px rgba(212, 175, 55, 0.4)' }}>
                <FileText size={19} />
                Demander un Devis Gratuit
              </button>

              <a href={`tel:${companyInfo.contact.phonePrimaryClean}`} className="btn-outline-white" style={{ padding: '0.85rem 1.75rem', fontSize: '1.02rem' }}>
                <Phone size={19} />
                Contact Direct : {companyInfo.contact.phonePrimary}
              </a>
            </div>

            {/* Stats Row */}
            <div className="hero-stats-row" style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem',
              padding: '1.25rem', borderRadius: 'var(--radius-md)',
              background: 'rgba(15, 51, 29, 0.75)', backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.18)', boxShadow: '0 12px 32px rgba(0,0,0,0.3)'
            }}>
              {companyInfo.stats.map((st, i) => (
                <div key={i} className="stat-item">
                  <div className="stat-value" style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--bright-lime)' }}>{st.value}</div>
                  <div className="stat-label" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>{st.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUs openDevisModal={openDevisModal} />

      {/* Services Showcase Section */}
      <section className="section-padding" style={{ background: 'var(--cream-bg)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              7 Services Paysagers <span>Sur-Mesure</span>
            </h2>
            <p className="section-subtitle">
              Chaque espace vert est unique. Découvrez nos solutions spécialisées pour particuliers, résidences et professionnels.
            </p>
          </div>

          <div className="grid-3">
            {servicesData.map((service) => (
              <div 
                key={service.id} 
                className="card-hover"
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                onClick={() => onSelectService(service)}
              >
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <ImageCarousel 
                    images={service.images || [service.image]} 
                    alt={service.title} 
                    height="220px" 
                  />
                  <span style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    background: 'var(--primary-dark)', color: 'var(--bright-lime)',
                    padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-full)',
                    fontSize: '0.78rem', fontWeight: 700, zIndex: 4
                  }}>
                    {service.badge}
                  </span>
                </div>

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{ color: 'var(--primary-leaf)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
                    {service.category}
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-dark)', margin: '0.4rem 0' }}>
                    {service.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.25rem', flex: 1 }}>
                    {service.summary}
                  </p>

                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: '1rem', borderTop: '1px solid #E5E7EB', color: 'var(--primary-forest)',
                    fontWeight: 700, fontSize: '0.9rem'
                  }}>
                    <span>Découvrir la page dédiée</span>
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button className="btn-outline" onClick={() => setActiveTab('services')}>
              Voir tous les détails de nos services
            </button>
          </div>
        </div>
      </section>

      {/* Nursery / Pépinière Spotlight */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <img 
                src="/img/Vente des plantes (1).jpg" 
                alt="Pépinière AM Green ART" 
                style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}
              />
              <div style={{
                position: 'absolute', bottom: '-1.5rem', right: '-1.5rem',
                background: 'var(--primary-dark)', color: 'white', padding: '1.5rem',
                borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', maxWidth: '240px'
              }}>
                <Sparkles color="var(--gold)" size={28} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '0.5rem' }}>Vente Directe Pépinière</h4>
                <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)' }}>Plantes ornementales, fruitiers, engrais & outils.</p>
              </div>
            </div>

            <div>
              <h2 className="section-title">
                Fourniture & Vente de <span>Végétaux d'Exception</span>
              </h2>
              <p className="section-subtitle" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                En complément de nos services d'aménagement, AM GREEN ART commercialise une large sélection de plantes ornementales, d'arbres fruitiers, d'engrais spécialisés et de matériel de jardinage.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ padding: '1rem', background: 'var(--light-sage)', borderRadius: 'var(--radius-sm)' }}>
                  <strong style={{ color: 'var(--primary-dark)', display: 'block', marginBottom: '0.2rem' }}>🌴 Plantes Ornementales</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Bougainvilliers, palmiers, thuyas, jasmin...</span>
                </div>
                <div style={{ padding: '1rem', background: 'var(--light-sage)', borderRadius: 'var(--radius-sm)' }}>
                  <strong style={{ color: 'var(--primary-dark)', display: 'block', marginBottom: '0.2rem' }}>🌱 Engrais & Fertilisants</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Produits phytosanitaires & fertilisants certifiés</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button className="btn-primary" onClick={() => setActiveTab('nursery')}>
                  Consulter la Pépinière
                  <ArrowRight size={18} />
                </button>
                <button className="btn-outline" onClick={openDevisModal}>
                  Demander un Tarif Gros / Détail
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section style={{ background: 'linear-gradient(135deg, var(--primary-forest), var(--primary-dark))', color: 'white', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '1rem' }}>
            Un Projet d'Espace Vert dans la région Fès Meknès ?
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.85)', maxWidth: '680px', margin: '0 auto 2rem auto' }}>
            Contactez AM GREEN ART dès aujourd'hui pour bénéficier de devis gratuit, d'une intervention rapide et de conseils professionnels.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-gold" onClick={openDevisModal} style={{ padding: '0.85rem 2rem', fontSize: '1.05rem' }}>
              Demander Mon Devis Gratuit
            </button>
            <a href={`tel:${companyInfo.contact.phonePrimaryClean}`} className="btn-outline-white" style={{ padding: '0.85rem 2rem', fontSize: '1.05rem' }}>
              <Phone size={18} />
              {companyInfo.contact.phonePrimary}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
