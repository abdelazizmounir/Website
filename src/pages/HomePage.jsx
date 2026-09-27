import React from 'react';
import { ArrowRight, FileText, Leaf, Phone, Sparkles } from 'lucide-react';
import { companyInfo } from '../data/companyData';
import { servicesData } from '../data/servicesData';
import { WhyChooseUs } from '../components/WhyChooseUs';

export const HomePage = ({ setActiveTab, onSelectService, openDevisModal }) => (
  <div className="home-redesign">
    <section className="landing-hero">
      <div className="container landing-hero-grid">
        <div className="landing-hero-copy animate-fade-in">
          <div className="eyebrow"><span className="eyebrow-mark" /> AM GREEN ART <span className="eyebrow-divider">/</span> FÈS–MEKNÈS</div>
          <h1>
            Création, aménagement <span className="hero-and">&</span><br />
            <span className="hero-highlight">entretien des espaces verts.</span>
          </h1>
          <p className="landing-hero-description">
            {companyInfo.slogan}
          </p>

          <div className="landing-hero-actions">
            <button type="button" className="btn-primary btn-large" onClick={() => openDevisModal('')}>
              <FileText size={18} /> Demander un devis gratuit <ArrowRight size={17} />
            </button>
            <a href={`tel:${companyInfo.contact.phonePrimaryClean}`} className="text-action">
              <Phone size={17} /> {companyInfo.contact.phonePrimary}
            </a>
          </div>

          <div className="hero-caption">
            <Leaf size={15} />
            <span>Conception, réalisation et suivi par une équipe dédiée</span>
          </div>
        </div>

        <div className="landing-hero-visual">
          <div className="hero-image-frame">
            <img src="/images/hero.jpg" alt="Jardin paysager réalisé par AM Green Art" />
          </div>
          <div className="hero-image-accent" />
          <div className="hero-floating-card">
            <span className="floating-icon"><Sparkles size={17} /></span>
            <div>
              <strong>{companyInfo.stats[0].value}</strong>
              <span>{companyInfo.stats[0].label}</span>
            </div>
            <ArrowRight size={17} className="floating-arrow" />
          </div>
          <div className="hero-visual-caption">{companyInfo.tagline}</div>
        </div>
      </div>
    </section>

    <section className="proof-band" aria-label="Quelques chiffres AM Green Art">
      <div className="container proof-band-inner">
        <p className="proof-label">L'expertise locale, du premier plan au dernier détail.</p>
        <div className="proof-stats">
          {companyInfo.stats.map((stat) => (
            <div className="proof-stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="services-section section-padding">
      <div className="container">
        <div className="section-heading-row">
          <div className="section-header">
            <span className="eyebrow"><span className="eyebrow-mark" /> NOS EXPERTISES</span>
            <h2 className="section-title">Tout ce qu'il faut pour faire grandir <span>vos espaces.</span></h2>
            <p className="section-subtitle">Chaque espace vert est unique. Découvrez nos solutions spécialisées pour particuliers, résidences et professionnels.</p>
          </div>
          <button className="text-action section-heading-link" onClick={() => setActiveTab('services')}>
            Voir tous les services <ArrowRight size={17} />
          </button>
        </div>

        <div className="service-grid">
          {servicesData.map((service, index) => (
            <button
              type="button"
              key={service.id}
              className={`service-card${index === 0 ? ' service-card-featured' : ''}`}
              onClick={() => onSelectService(service)}
            >
              <span className="service-card-image">
                <img src={service.image} alt="" loading="lazy" />
                <span className="service-card-number">0{index + 1}</span>
              </span>
              <span className="service-card-copy">
                <span className="service-card-meta">{service.category}</span>
                <span className="service-card-title">{service.title}</span>
                <span className="service-card-summary">{service.summary}</span>
                <span className="service-card-link">Explorer le service <ArrowRight size={16} /></span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>

    <section className="nursery-feature section-padding">
      <div className="container nursery-feature-grid">
        <div className="nursery-feature-visual scroll-reveal--side">
          <img src="/img/Vente des plantes (1).jpg" alt="Plantes et végétaux de la pépinière AM Green Art" loading="lazy" />
          <div className="nursery-photo-label"><Leaf size={16} /> La pépinière AM GREEN ART</div>
        </div>
        <div className="nursery-feature-copy">
          <span className="eyebrow"><span className="eyebrow-mark" /> PÉPINIÈRE & VENTE</span>
          <h2 className="section-title">La bonne plante change <span>tout le paysage.</span></h2>
          <p className="section-subtitle">
            En complément de nos services d'aménagement, AM GREEN ART commercialise une large sélection de plantes ornementales, d'arbres fruitiers, d'engrais spécialisés et de matériel de jardinage.
          </p>
          <div className="nursery-tags">
            <span>Plantes ornementales</span>
            <span>Arbres fruitiers</span>
            <span>Engrais & matériel</span>
          </div>
          <button className="btn-primary" onClick={() => setActiveTab('nursery')}>
            Découvrir la pépinière <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </section>

    <WhyChooseUs openDevisModal={openDevisModal} />

    <section className="closing-cta">
      <div className="closing-cta-pattern" />
      <div className="container closing-cta-inner">
        <div>
          <span className="eyebrow eyebrow-light"><span className="eyebrow-mark" /> PARLONS DE VOTRE PROJET</span>
          <h2>Un projet d'espace vert dans la région Fès Meknès ?</h2>
          <p>Contactez AM GREEN ART dès aujourd'hui pour bénéficier de devis gratuit, d'une intervention rapide et de conseils professionnels.</p>
        </div>
        <div className="closing-cta-actions">
          <button className="btn-gold btn-large" onClick={openDevisModal}>Demander un devis <ArrowRight size={17} /></button>
          <a href={`tel:${companyInfo.contact.phonePrimaryClean}`} className="text-action text-action-light"><Phone size={17} /> {companyInfo.contact.phonePrimary}</a>
        </div>
      </div>
    </section>
  </div>
);
