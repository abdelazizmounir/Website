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

              {/* Map Visual Card */}
              <div className="card-hover" style={{ padding: '1.5rem', background: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-dark)', margin: 0 }}>
                    Zone d'Intervention
                  </h3>
                  <span className="badge-tag" style={{ background: '#E8F5E9', color: '#1B5E20', margin: 0 }}>
                    <MapPin size={13} /> Région Fès Meknès
                  </span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Intervention rapide dans toute la région Fès Meknès.
                </p>
                <div style={{
                  height: '280px', borderRadius: 'var(--radius-md)', overflow: 'hidden',
                  border: '1px solid rgba(46,125,50,0.2)', boxShadow: 'var(--shadow-sm)'
                }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d211752.48797195632!2d-5.403257121351745!3d33.97628092230989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd9f8b484d445777%3A0x10e6aaaeedd802ef!2sFes!5e0!3m2!1sen!2sma!4v1786466045808!5m2!1sen!2sma"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="Carte Zone d'Intervention Fès"
                  ></iframe>
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

      {/* Big Interactive Map Section */}
      <section className="section-padding" style={{ background: 'white', borderTop: '1px solid #E5E7EB' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge-tag">
              <MapPin size={14} /> Carte Interactive Google Maps
            </span>
            <h2 className="section-title">
              Localisation & <span>Zone d'Intervention</span>
            </h2>
            <p className="section-subtitle">
              Retrouvez le périmètre d'intervention de la société AM GREEN ART dans la région Fès Meknès.
            </p>
          </div>

          <div style={{
            height: '480px',
            width: '100%',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            border: '2px solid var(--light-sage)'
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d211752.48797195632!2d-5.403257121351745!3d33.97628092230989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd9f8b484d445777%3A0x10e6aaaeedd802ef!2sFes!5e0!3m2!1sen!2sma!4v1786466045808!5m2!1sen!2sma"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Zone d'Intervention AM GREEN ART"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};
