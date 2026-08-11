import React from 'react';
import { ShieldCheck, Award, Users, CheckCircle2, Clock, MapPin, Building2, FileText, Phone } from 'lucide-react';
import { companyInfo } from '../data/companyData';
import { WhyChooseUs } from '../components/WhyChooseUs';

export const AboutPage = ({ openDevisModal }) => {
  return (
    <div style={{ paddingTop: '2rem' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary-forest))', color: 'white', padding: '4rem 0 5rem 0', textAlign: 'center' }}>
        <div className="container">
          <span className="badge-tag" style={{ background: 'rgba(255,255,255,0.15)', color: 'var(--bright-lime)' }}>
            À Propos de la Société AM GREEN ART
          </span>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginTop: '0.75rem', marginBottom: '1rem' }}>
            L'Expertise Paysagère au Service de Vos Espaces Verts
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.85)', maxWidth: '720px', margin: '0 auto' }}>
            Implantée à Fès, AM GREEN ART SARL AU est spécialisée dans l'étude, l'aménagement, l'entretien des espaces verts et la commercialisation de végétaux et matériels d'arrosage.
          </p>
        </div>
      </section>

      {/* Story & Company Info */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '3.5rem' }}>
            <div>
              <span className="badge-tag">Notre Identité</span>
              <h2 className="section-title">
                Une Passion Botanique & <span>Un Rigueur Technique</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Fondée avec la volonté d'offrir un service d'excellence paysagère à Fès et dans la région, AM GREEN ART regroupe des spécialistes de l'horticulture, de l'irrigation et de l'aménagement extérieur.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                Que vous soyez un particulier souhaitant sublimer le jardin de votre villa, ou un gestionnaire de résidence / complexe industriel à la recherche d'un contrat de maintenance annuel rigoureux, nous apportons des solutions sur-mesure et écologiques.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ padding: '1.25rem', background: 'var(--cream-bg)', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--primary-forest)' }}>
                  <h4 style={{ fontWeight: 800, color: 'var(--primary-dark)', fontSize: '1.1rem' }}>Savoir-Faire Global</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>De la conception 3D à la plantation et l'entretien annuel.</p>
                </div>

                <div style={{ padding: '1.25rem', background: 'var(--cream-bg)', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--gold)' }}>
                  <h4 style={{ fontWeight: 800, color: 'var(--primary-dark)', fontSize: '1.1rem' }}>Gestion Économe de l'Eau</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Irrigation intelligente programmée et matériel professionnel.</p>
                </div>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <img src="/images/conception.jpg" alt="Conception AM Green ART" style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }} />

              {/* Legal Info Card */}
              <div className="glass-panel" style={{ borderRadius: 'var(--radius-md)', padding: '1.5rem', marginTop: '1.5rem', border: '1px solid rgba(46,125,50,0.2)' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Building2 size={20} color="var(--primary-forest)" /> Mentions Légales & Fiche Société
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-main)' }}>
                  <div><strong>Raison sociale:</strong> AM GREEN ART</div>
                  <div><strong>Forme:</strong> {companyInfo.legal.form}</div>
                  <div><strong>Capital Social:</strong> {companyInfo.legal.capital}</div>
                  <div><strong>Registre Commerce:</strong> {companyInfo.legal.rc}</div>
                  <div><strong>Identifiant Fiscal:</strong> {companyInfo.legal.if}</div>
                  <div><strong>ICE:</strong> {companyInfo.legal.ice}</div>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={16} color="var(--primary-leaf)" /> Siège Social: {companyInfo.legal.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs openDevisModal={openDevisModal} />
    </div>
  );
};
