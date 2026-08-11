import React from 'react';
import { ArrowLeft, CheckCircle2, FileText, Phone, ShieldCheck, Sparkles, Clock, Calendar } from 'lucide-react';
import { companyInfo } from '../data/companyData';
import { servicesData } from '../data/servicesData';
import { ImageCarousel } from '../components/ImageCarousel';

export const ServiceDetailPage = ({ service, onBack, openDevisModal, onSelectService }) => {
  if (!service) return null;

  const relatedServices = servicesData.filter(s => s.id !== service.id).slice(0, 3);
  const serviceImages = service.images || service.gallery || [service.image];
  const safeBgImage = service.image ? encodeURI(service.image).replace(/'/g, '%27') : '';

  return (
    <div style={{ paddingTop: '1rem' }}>
      {/* Top Navigation Back */}
      <div className="container" style={{ marginBottom: '1rem' }}>
        <button 
          onClick={onBack}
          style={{
            background: 'none', border: 'none', display: 'inline-flex', alignItems: 'center',
            gap: '0.5rem', color: 'var(--primary-forest)', fontWeight: 700, fontSize: '0.95rem',
            cursor: 'pointer', padding: '0.5rem 0'
          }}
        >
          <ArrowLeft size={18} />
          Retour à tous les services
        </button>
      </div>

      {/* Hero Banner - Redesigned Option A */}
      <section style={{
        position: 'relative',
        minHeight: '480px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--primary-dark)',
        background: safeBgImage 
          ? `radial-gradient(circle at 80% 20%, rgba(46, 125, 50, 0.35) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(15, 51, 29, 0.95) 0%, transparent 60%), linear-gradient(to right, rgba(15, 51, 29, 0.94), rgba(27, 77, 46, 0.84)), url("${safeBgImage}") center/cover no-repeat`
          : 'radial-gradient(circle at 80% 20%, rgba(102, 187, 106, 0.25) 0%, transparent 50%), linear-gradient(135deg, var(--primary-dark), var(--primary-forest))',
        color: 'white',
        padding: '4rem 0',
        overflow: 'hidden'
      }}>
        {/* Ambient Decorative Light Orbs */}
        <div style={{
          position: 'absolute', top: '-100px', right: '-100px', width: '350px', height: '350px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(102, 187, 106, 0.2) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: '-50px', left: '-50px', width: '300px', height: '300px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(46, 125, 50, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="grid-2" style={{ gap: '3rem', alignItems: 'center' }}>
            {/* Left Column: Headlines, Highlights & Actions */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                <span className="badge-tag" style={{
                  background: 'rgba(15, 51, 29, 0.85)', color: 'var(--bright-lime)',
                  border: '1px solid rgba(102, 187, 106, 0.4)', backdropFilter: 'blur(8px)',
                  padding: '0.45rem 1.1rem', fontSize: '0.85rem', boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                  margin: 0
                }}>
                  <Sparkles size={14} color="var(--bright-lime)" /> {service.category}
                </span>
                <span style={{
                  background: 'rgba(212, 175, 55, 0.2)', color: 'var(--gold)',
                  border: '1px solid rgba(212, 175, 55, 0.4)', borderRadius: 'var(--radius-full)',
                  padding: '0.35rem 0.9rem', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase'
                }}>
                  {service.badge}
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                fontWeight: 800,
                lineHeight: 1.18,
                marginBottom: '1rem',
                letterSpacing: '-0.5px'
              }}>
                {service.title}
              </h1>

              <p style={{
                fontSize: '1.12rem',
                color: 'rgba(255,255,255,0.92)',
                lineHeight: 1.65,
                marginBottom: '1.75rem',
                maxWidth: '640px'
              }}>
                {service.summary}
              </p>

              {/* Quick Feature Pills */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                {service.features.slice(0, 3).map((feature, idx) => (
                  <span 
                    key={idx} 
                    style={{
                      background: 'rgba(255, 255, 255, 0.12)',
                      border: '1px solid rgba(255, 255, 255, 0.22)',
                      backdropFilter: 'blur(6px)',
                      padding: '0.4rem 0.9rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.82rem',
                      color: 'rgba(255, 255, 255, 0.95)',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <CheckCircle2 size={15} color="var(--bright-lime)" />
                    {feature}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <button 
                  className="btn-gold" 
                  onClick={() => openDevisModal(service.title)}
                  style={{ padding: '0.85rem 1.85rem', fontSize: '1rem', boxShadow: '0 8px 24px rgba(212, 175, 55, 0.35)' }}
                >
                  <FileText size={18} />
                  Devis Gratuit pour ce Service
                </button>

                <a 
                  href={`tel:${companyInfo.contact.phonePrimaryClean}`}
                  className="btn-outline-white"
                  style={{ padding: '0.85rem 1.6rem', fontSize: '1rem' }}
                >
                  <Phone size={18} />
                  {companyInfo.contact.phonePrimary}
                </a>
              </div>

              {/* Trust Badges */}
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.15)', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)' }}>
                  <ShieldCheck size={16} color="var(--bright-lime)" />
                  <span>Devis Gratuit sous 24h</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)' }}>
                  <Clock size={16} color="var(--bright-lime)" />
                  <span>Intervention Fès & Région</span>
                </div>
              </div>
            </div>

            {/* Right Column: Glassmorphism Visual Showcase Card */}
            <div style={{ position: 'relative' }}>
              <div className="glass-dark" style={{
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.15)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', padding: '0 0.25rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--bright-lime)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                    📸 Aperçu & Galerie Réelle
                  </span>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.15)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)' }}>
                    {serviceImages.length} Visuels
                  </span>
                </div>

                <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '300px', position: 'relative' }}>
                  <ImageCarousel 
                    images={serviceImages} 
                    alt={service.title} 
                    height="300px" 
                  />
                  <div style={{
                    position: 'absolute', bottom: '0.75rem', left: '0.75rem', zIndex: 4,
                    background: 'rgba(15, 51, 29, 0.85)', backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.2)', padding: '0.4rem 0.8rem',
                    borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '0.5rem',
                    fontSize: '0.8rem', fontWeight: 700, color: 'white'
                  }}>
                    <CheckCircle2 size={14} color="var(--bright-lime)" />
                    <span>Réalisations Certifiées AM GREEN ART</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
          <div className="grid-2" style={{ gap: '3.5rem', alignItems: 'start' }}>
            {/* Left: Description & Features */}
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '1.25rem' }}>
                Description & Expertise AM GREEN ART
              </h2>
              
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem', whitespace: 'pre-line' }}>
                {service.fullDescription}
              </p>

              <div style={{ background: 'var(--cream-bg)', borderRadius: 'var(--radius-md)', padding: '2rem', marginBottom: '2.5rem', border: '1px solid #E5E7EB' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-forest)', marginBottom: '1.25rem' }}>
                  Inclus dans notre prestation :
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.85rem' }}>
                  {service.features.map((ft, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <CheckCircle2 size={20} color="#2E7D32" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.98rem' }}>{ft}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Process */}
              {service.process && (
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '1.5rem' }}>
                    Notre Processus d'Intervention
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                    {service.process.map((p, idx) => (
                      <div key={idx} style={{ background: 'var(--light-sage)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--primary-leaf)' }}>
                        <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--primary-forest)' }}>{p.step}</span>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0.3rem 0 0.25rem 0', color: 'var(--primary-dark)' }}>{p.title}</h4>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{p.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Sidebar & Gallery */}
            <div>
              {/* Gallery */}
              <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '1rem' }}>
                  Visuels & Équipements
                </h3>
                <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
                  <ImageCarousel 
                    images={serviceImages} 
                    alt={service.title} 
                    height="320px" 
                  />
                </div>
              </div>

              {/* Sidebar Devis Box */}
              <div className="glass-dark" style={{ borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-lg)' }}>
                <Sparkles color="var(--gold)" size={32} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '0.75rem', marginBottom: '0.5rem' }}>
                  Besoin de {service.shortTitle} ?
                </h3>
                <p style={{ fontSize: '0.94rem', color: 'rgba(255,255,255,0.85)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Nos équipes qualifiées interviennent rapidement à Fès et dans toute la région avec garantie de qualité et respect des délais.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <button 
                    className="btn-gold"
                    onClick={() => openDevisModal(service.title)}
                    style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
                  >
                    Demander mon Devis Gratuit
                  </button>

                  <a 
                    href={`https://wa.me/${companyInfo.contact.whatsapp}?text=Bonjour,%20je%20souhaite%20un%20devis%20pour%20:${encodeURIComponent(service.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline-white"
                    style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
                  >
                    Discuter sur WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="section-padding" style={{ background: 'var(--cream-bg)' }}>
        <div className="container">
          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '2rem', textAlign: 'center' }}>
            Découvrez nos Autres Services Paysagers
          </h3>

          <div className="grid-3">
            {relatedServices.map(rel => (
              <div 
                key={rel.id}
                className="card-hover"
                style={{ cursor: 'pointer', background: 'white', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                onClick={() => { onSelectService(rel); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                <img src={rel.image} alt={rel.title} style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                <span style={{ color: 'var(--primary-leaf)', fontSize: '0.75rem', fontWeight: 700 }}>{rel.category}</span>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-dark)' }}>{rel.title}</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{rel.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
