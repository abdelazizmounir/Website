import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { companyInfo } from '../data/companyData';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Demande de Renseignement',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({ particleCount: 80, spread: 60 });
  };

  return (
    <div style={{ paddingTop: '2rem' }}>
      {/* Header */}
      <section style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary-forest))', color: 'white', padding: '4rem 0 5rem 0', textAlign: 'center' }}>
        <div className="container">
          <span className="badge-tag" style={{ background: 'rgba(255,255,255,0.15)', color: 'var(--bright-lime)' }}>
            <MessageSquare size={14} /> Réactivité & Proximité
          </span>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginTop: '0.75rem', marginBottom: '1rem' }}>
            Contactez AM GREEN ART
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.85)', maxWidth: '680px', margin: '0 auto' }}>
            Notre équipe est à votre disposition pour répondre à toutes vos questions, effectuer des visites de terrain et réaliser vos devis gratuits.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="section-padding" style={{ background: 'var(--cream-bg)', marginTop: '-3rem' }}>
        <div className="container">
          <div className="grid-2" style={{ gap: '3rem', alignItems: 'start' }}>
            {/* Contact Information Card */}
            <div>
              <div className="card-hover" style={{ padding: '2.5rem', background: 'white', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '1.5rem' }}>
                  Nos Coordonnées Directes
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--light-sage)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-forest)', flexShrink: 0 }}>
                      <Phone size={24} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>Téléphone / Service Commercial</strong>
                      <a href={`tel:${companyInfo.contact.phonePrimaryClean}`} style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-dark)', display: 'block' }}>
                        {companyInfo.contact.phonePrimary}
                      </a>
                      <a href={`tel:${companyInfo.contact.phoneSecondaryClean}`} style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-leaf)' }}>
                        {companyInfo.contact.phoneSecondary}
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--light-sage)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-forest)', flexShrink: 0 }}>
                      <Mail size={24} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>Adresse Email Officielles</strong>
                      <a href={`mailto:${companyInfo.contact.email}`} style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-dark)', display: 'block' }}>
                        {companyInfo.contact.email}
                      </a>
                      <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{companyInfo.contact.emailAlt}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--light-sage)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-forest)', flexShrink: 0 }}>
                      <MapPin size={24} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>Siège Social</strong>
                      <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-dark)', lineHeight: 1.5 }}>
                        {companyInfo.legal.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #E5E7EB', display: 'flex', gap: '1rem' }}>
                  <a 
                    href={`https://wa.me/${companyInfo.contact.whatsapp}?text=Bonjour%20AM%20GREEN%20ART`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                    style={{ background: '#25D366', flex: 1, justifyContent: 'center' }}
                  >
                    Envoyer un message WhatsApp
                  </a>
                </div>
              </div>

              {/* Map Placeholder Visual Card */}
              <div className="card-hover" style={{ padding: '1.5rem', background: 'white' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
                  Zone d'Intervention
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Intervention rapide sur l'ensemble de la préfecture de Fès, Meknès, Séfrou, Ifrane et région.
                </p>
                <div style={{
                  height: '180px', borderRadius: 'var(--radius-sm)', background: 'linear-gradient(135deg, var(--light-sage), #D1E7DD)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '1rem',
                  border: '1px stroke rgba(46,125,50,0.3)'
                }}>
                  <MapPin size={36} color="var(--primary-forest)" />
                  <strong style={{ color: 'var(--primary-dark)', marginTop: '0.5rem', fontSize: '1.1rem' }}>Fès & Région Centre-Nord, Maroc</strong>
                  <span style={{ fontSize: '0.82rem', color: 'var(--primary-leaf)', fontWeight: 600 }}>Siège: Allal Ben Abdallah, Lipodrom Fès</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card-hover" style={{ padding: '2.5rem', background: 'white' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
                Envoyez-nous un Message
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', marginBottom: '1.5rem' }}>
                Remplissez ce formulaire pour toute demande de devis, visite sur site ou conseil agronomique.
              </p>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <CheckCircle2 size={56} color="#2E7D32" style={{ margin: '0 auto 1rem auto' }} />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-dark)' }}>Message Envoyé avec Succès !</h3>
                  <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Merci <strong>{formData.name}</strong>. L'équipe AM GREEN ART vous répondra dans les plus brefs délais.
                  </p>
                  <button className="btn-primary" onClick={() => setSubmitted(false)} style={{ marginTop: '1.5rem' }}>
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Nom et Prénom *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Votre nom complet" 
                      className="form-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Numéro de Téléphone *</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="ex: 06 05 98 21 09" 
                      className="form-input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Adresse Email (Optionnel)</label>
                    <input 
                      type="email" 
                      placeholder="votre.email@exemple.com" 
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Sujet de la demande</label>
                    <select 
                      className="form-select"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="Demande de Devis Gratuit">Demande de Devis Gratuit</option>
                      <option value="Contrat de Maintenance Annuelle">Contrat de Maintenance Annuelle</option>
                      <option value="Installation Système Irrigation">Installation Système Irrigation</option>
                      <option value="Achat Végétaux Pépinière">Achat Végétaux Pépinière</option>
                      <option value="Élagage de Palmiers">Élagage de Palmiers</option>
                      <option value="Autre Demande">Autre Demande</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Votre Message / Détails du projet *</label>
                    <textarea 
                      rows="4" 
                      required 
                      placeholder="Décrivez votre besoin (surface du jardin, localisation...)" 
                      className="form-textarea"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', marginTop: '1rem' }}>
                    <Send size={18} />
                    Envoyer le Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
