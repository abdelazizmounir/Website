import React from 'react';
import { ArrowRight, CalendarCheck, Clock, FileText, ShieldCheck, Users, Zap } from 'lucide-react';
import { companyInfo } from '../data/companyData';

const iconMap = {
  ShieldCheck,
  Clock,
  Users,
  FileText,
  Zap,
  CalendarCheck
};

export const WhyChooseUs = ({ openDevisModal }) => {
  const satisfaction = companyInfo.stats.find((stat) => stat.label === 'Satisfaction Client');

  return (
    <section className="why-choose-section section-padding">
      <div className="container why-choose-layout">
        <div className="why-choose-visual">
          <img src="/images/conception.jpg" alt="Espace paysager conçu par AM Green Art" loading="lazy" />
          <div className="why-visual-overlay" />
          <div className="why-visual-content">
            <span className="eyebrow eyebrow-light"><span className="eyebrow-mark" /> NOTRE ENGAGEMENT</span>
            <h2>Pourquoi choisir <span>AM GREEN ART</span> ?</h2>
            <p>{companyInfo.tagline}</p>
            {satisfaction && (
              <div className="why-satisfaction">
                <strong>{satisfaction.value}</strong>
                <span>{satisfaction.label}</span>
              </div>
            )}
          </div>
        </div>

        <div className="why-choose-details">
          <div className="why-choose-intro">
            <span className="eyebrow"><span className="eyebrow-mark" /> POUR VOS ESPACES VERTS</span>
            <p>Nous combinons expertise agronomique, équipements modernes et amour de la nature pour transformer et sublimer tous vos espaces verts.</p>
          </div>

          <div className="why-benefit-list">
            {companyInfo.whyChooseUs.map((item, index) => {
              const Icon = iconMap[item.icon] || ShieldCheck;
              return (
                <article className="why-benefit" key={item.id}>
                  <span className="why-benefit-icon"><Icon size={19} strokeWidth={1.8} /></span>
                  <div className="why-benefit-copy">
                    <div className="why-benefit-title-row">
                      <h3>{item.title}</h3>
                      <span>0{index + 1}</span>
                    </div>
                    <p>{item.desc}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <button type="button" className="btn-primary why-choose-cta" onClick={() => openDevisModal()}>
            Demander un devis gratuit <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
};
