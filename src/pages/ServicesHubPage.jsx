import React from 'react';
import { ArrowRight, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import { ImageCarousel } from '../components/ImageCarousel';
import { servicesData } from '../data/servicesData';

export const ServicesHubPage = ({ onSelectService, openDevisModal }) => {
  return (
    <div style={{ paddingTop: '2rem' }}>
      {/* Header */}
      <section style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary-forest))', color: 'white', padding: '4rem 0 5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginTop: '0.75rem', marginBottom: '1rem' }}>
            Nos 7 Services Paysagers & Entretien
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.85)', maxWidth: '700px', margin: '0 auto' }}>
            Chaque service bénéficie d'une équipe dédiée et d'équipements de pointe. Cliquez sur un service pour consulter sa page détaillée.
          </p>
        </div>
      </section>

      {/* Grid of 7 Services */}
      <section className="section-padding" style={{ background: 'var(--cream-bg)', marginTop: '-2.5rem' }}>
        <div className="container">
          <div className="grid-3">
            {servicesData.map((service, index) => (
              <div 
                key={service.id}
                className="card-hover animate-fade-in"
                style={{
                  display: 'flex', flexDirection: 'column', background: 'white',
                  cursor: 'pointer', animationDelay: `${index * 0.1}s`
                }}
                onClick={() => onSelectService(service)}
              >
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <ImageCarousel 
                    images={service.images || [service.image]} 
                    alt={service.title} 
                    height="240px" 
                  />
                  <div style={{
                    position: 'absolute', top: '1rem', left: '1rem',
                    background: 'var(--primary-dark)', color: 'white',
                    width: '36px', height: '36px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: '0.9rem'
                  }}>
                    0{index + 1}
                  </div>
                  <span style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    background: 'rgba(255,255,255,0.92)', color: 'var(--primary-forest)',
                    padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem', fontWeight: 800
                  }}>
                    {service.badge}
                  </span>
                </div>

                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{ color: 'var(--primary-leaf)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {service.category}
                  </span>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-dark)', margin: '0.4rem 0 0.75rem 0' }}>
                    {service.title}
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', marginBottom: '1.5rem', flex: 1, lineHeight: 1.6 }}>
                    {service.summary}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.5rem' }}>
                    {service.features.slice(0, 3).map((ft, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.86rem', color: 'var(--text-main)' }}>
                        <CheckCircle2 size={16} color="#2E7D32" style={{ flexShrink: 0 }} />
                        <span>{ft}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: '1rem', borderTop: '1px solid #F3F4F6', color: 'var(--primary-forest)',
                    fontWeight: 700, fontSize: '0.92rem'
                  }}>
                    <span>Consulter la Fiche Détaillée</span>
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <button className="btn-gold" onClick={openDevisModal} style={{ padding: '0.85rem 2rem', fontSize: '1.05rem' }}>
              <FileText size={18} />
              Demander un Devis Gratuit pour mon Projet
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
