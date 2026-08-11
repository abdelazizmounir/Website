import React from 'react';
import { ShieldCheck, Clock, Users, FileText, Zap, CalendarCheck, CheckCircle2 } from 'lucide-react';
import { companyInfo } from '../data/companyData';

const iconMap = {
  ShieldCheck: ShieldCheck,
  Clock: Clock,
  Users: Users,
  FileText: FileText,
  Zap: Zap,
  CalendarCheck: CalendarCheck
};

export const WhyChooseUs = ({ openDevisModal }) => {
  return (
    <section className="section-padding" style={{ background: 'white' }}>
      <div className="container">
        <div className="section-header">
          <span className="badge-tag">
            <CheckCircle2 size={14} /> Notre Engagement Qualité
          </span>
          <h2 className="section-title">
            Pourquoi Choisir <span>AM GREEN ART</span> ?
          </h2>
          <p className="section-subtitle">
            Nous combinons expertise agronomique, équipements modernes et amour de la nature pour transformer et sublimer tous vos espaces verts.
          </p>
        </div>

        <div className="grid-3">
          {companyInfo.whyChooseUs.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || ShieldCheck;
            return (
              <div 
                key={item.id} 
                className="card-hover" 
                style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '4px solid var(--primary-leaf)' }}
              >
                <div style={{
                  width: '56px', height: '56px', borderRadius: '16px', background: 'var(--light-sage)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-forest)'
                }}>
                  <IconComponent size={28} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div style={{
          marginTop: '3.5rem', background: 'linear-gradient(135deg, var(--primary-dark), var(--primary-forest))',
          borderRadius: 'var(--radius-lg)', padding: '2.5rem', color: 'white', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div>
            <span style={{ color: 'var(--bright-lime)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Service Proximité Fès & Région
            </span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.25rem' }}>
              Besoin d'une Intervention ou d'un Contrat d'Entretien ?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', marginTop: '0.25rem' }}>
              Bénéficiez d'une étude technique offerte et de conseils personnalisés par nos paysagistes.
            </p>
          </div>

          <button className="btn-gold" onClick={openDevisModal}>
            Obtenir mon Devis Offert
          </button>
        </div>
      </div>
    </section>
  );
};
