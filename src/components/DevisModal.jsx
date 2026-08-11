import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { companyInfo } from '../data/companyData';
import { servicesData } from '../data/servicesData';

export const DevisModal = ({ isOpen, onClose, defaultService }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Fès',
    service: defaultService || servicesData[0].title,
    surface: '100-500 m²',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{
              width: '72px', height: '72px', background: '#E8F5E9', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto'
            }}>
              <CheckCircle2 size={42} color="#2E7D32" />
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
              Demande de Devis Envoyée !
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Merci <strong>{formData.fullName}</strong> ! Notre équipe technique AM GREEN ART a bien reçu votre demande pour <strong>{formData.service}</strong>. Nous vous recontacterons au <strong>{formData.phone}</strong> sous 24 heures pour convenir d'une étude ou visite gratuite.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button className="btn-primary" onClick={handleReset}>
                Fermer
              </button>
              <a
                href={`https://wa.me/${companyInfo.contact.whatsapp}?text=Bonjour%20AM%20GREEN%20ART,%20je%20viens%20de%20demander%20un%20devis%20gratuit%20pour%20${encodeURIComponent(formData.service)}`}
                target="_blank"
                rel="noreferrer"
                className="btn-gold"
              >
                Confirmer sur WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="badge-tag" style={{ background: '#FEF3C7', color: '#B45309' }}>
                <Sparkles size={14} /> 100% Gratuit & Sans Engagement
              </span>
            </div>

            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '0.4rem' }}>
              Demander un Devis Gratuit
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Remplissez ce rapide formulaire pour recevoir une étude budgétaire personnalisée sous 24h.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Nom Complet *</label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Mohamed Alami"
                    className="form-input"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Téléphone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="ex: 06 05 98 21 09"
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Service Souhaité *</label>
                  <select
                    className="form-select"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  >
                    {servicesData.map(s => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                    <option value="Achat Pépinière & Végétaux">Achat Pépinière & Végétaux</option>
                    <option value="Projet Complet Sur-Mesure">Projet Complet Sur-Mesure</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Ville / Localité</label>
                  <input
                    type="text"
                    placeholder="ex: Fès, Meknès, Séfrou..."
                    className="form-input"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Superficie Estimée de l'Espace Vert</label>
                <select
                  className="form-select"
                  value={formData.surface}
                  onChange={(e) => setFormData({ ...formData, surface: e.target.value })}
                >
                  <option value="Moins de 100 m²">Moins de 100 m² (Petit Jardin / Terrasse)</option>
                  <option value="100 - 500 m²">100 m² à 500 m² (Villa standard)</option>
                  <option value="500 - 2000 m²">500 m² à 2 000 m² (Grande propriété)</option>
                  <option value="Plus de 2000 m²">Plus de 2 000 m² (Résidence / Domaine / Usine)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Précisions sur votre projet (Optionnel)</label>
                <textarea
                  rows="3"
                  placeholder="Décrivez vos besoins (ex: installation système d'arrosage automatique + tonte régulière...)"
                  className="form-textarea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '0.85rem' }}>
                  <Send size={18} />
                  Envoyer ma Demande de Devis
                </button>
              </div>

              <p style={{ fontSize: '0.78rem', color: 'var(--text-light)', textAlign: 'center', marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                <ShieldCheck size={14} color="#2E7D32" /> Vos données restent strictement confidentielles. Intervention rapide garantie.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
