import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, Sparkles, Sprout, ShoppingBag, Wrench } from 'lucide-react';
import confetti from 'canvas-confetti';
import { companyInfo } from '../data/companyData';
import { servicesData } from '../data/servicesData';
import { nurseryProducts } from '../data/nurseryData';

export const DevisModal = ({ isOpen, onClose, defaultService }) => {
  const [orderType, setOrderType] = useState('service'); // 'service' or 'plant'

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Fès',
    service: servicesData[0].title,
    surface: '100-500 m²',
    plantName: 'Bougainvillier Rose Éclatant',
    quantity: '1 à 5 Unités',
    plantSize: 'Taille Standard',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  // Sync modal state when defaultService changes or modal opens
  useEffect(() => {
    if (!isOpen) return;
    setSubmitted(false);

    const isPlant = defaultService && (
      defaultService.toLowerCase().includes('pépinière') ||
      defaultService.toLowerCase().includes('plante') ||
      defaultService.toLowerCase().includes('végétal')
    );

    if (isPlant) {
      setOrderType('plant');
      // Clean plant name from prefix if present
      let cleanPlant = defaultService.replace(/^Achat Pépinière\s*:\s*/i, '').trim();
      if (!cleanPlant) cleanPlant = "Plante au Choix";
      setFormData(prev => ({
        ...prev,
        plantName: cleanPlant,
        message: cleanPlant.includes('Choix') ? 'Je cherche la plante suivante : ' : ''
      }));
    } else {
      setOrderType('service');
      if (defaultService) {
        setFormData(prev => ({ ...prev, service: defaultService }));
      }
    }
  }, [defaultService, isOpen]);

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

  const whatsappMessage = orderType === 'plant'
    ? `Bonjour AM GREEN ART, je souhaite commander la plante : ${formData.plantName} (${formData.quantity}, Taille: ${formData.plantSize}). Ville: ${formData.city}. Mon nom: ${formData.fullName}`
    : `Bonjour AM GREEN ART, je souhaite un devis gratuit pour : ${formData.service}. Ville: ${formData.city}. Mon nom: ${formData.fullName}`;

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
              {orderType === 'plant' ? 'Demande de Plantes Envoyée !' : 'Demande de Devis Envoyée !'}
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Merci <strong>{formData.fullName}</strong> ! Notre équipe AM GREEN ART a bien reçu votre demande pour{' '}
              <strong>{orderType === 'plant' ? formData.plantName : formData.service}</strong>
              {orderType === 'plant' && ` (${formData.quantity})`}. Nous vous recontacterons au <strong>{formData.phone}</strong> sous 24h pour confirmer la disponibilité et la livraison.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={handleReset}>
                Fermer
              </button>
              <a
                href={`https://wa.me/${companyInfo.contact.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
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
            {/* Type Selector Header */}
            <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: 'var(--radius-sm)', padding: '0.25rem', marginBottom: '1.25rem' }}>
              <button
                type="button"
                style={{
                  flex: 1, padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: 'none',
                  fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s ease',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                  background: orderType === 'plant' ? 'var(--primary-forest)' : 'transparent',
                  color: orderType === 'plant' ? 'white' : 'var(--text-muted)'
                }}
                onClick={() => setOrderType('plant')}
              >
                <Sprout size={16} /> Achat & Devis Plantes
              </button>

              <button
                type="button"
                style={{
                  flex: 1, padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: 'none',
                  fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s ease',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                  background: orderType === 'service' ? 'var(--primary-forest)' : 'transparent',
                  color: orderType === 'service' ? 'white' : 'var(--text-muted)'
                }}
                onClick={() => setOrderType('service')}
              >
                <Wrench size={16} /> Services & Aménagement
              </button>
            </div>

            {orderType === 'plant' ? (
              /* ================= PLANT PURCHASE FORM ================= */
              <div>
                <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '0.3rem' }}>
                  Commander vos Plantes sur Devis
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                  Sélectionnez vos plantes et quantités pour recevoir une offre sous 24h avec possibilité de livraison à Fès & région.
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
                      <label className="form-label">Téléphone / WhatsApp *</label>
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
                      <label className="form-label">Plante / Végétal Désiré *</label>
                      <input
                        type="text"
                        required
                        placeholder="ex: Palmier, Thuya, Plante au choix..."
                        className="form-input"
                        value={formData.plantName}
                        onChange={(e) => setFormData({ ...formData, plantName: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Ville / Adresse de Livraison</label>
                      <input
                        type="text"
                        placeholder="ex: Fès, Meknès, Séfrou..."
                        className="form-input"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">Quantité Souhaitée</label>
                      <select
                        className="form-select"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      >
                        <option value="1 à 5 Unités">1 à 5 Unités (Petit jardin / Terrasse)</option>
                        <option value="5 à 20 Unités">5 à 20 Unités (Jardin moyen)</option>
                        <option value="20 à 50 Unités (Haie / Alignement)">20 à 50 Unités (Haie / Alignement)</option>
                        <option value="Plus de 50 Unités (Commande en gros)">Plus de 50 Unités (Commande en gros)</option>
                        <option value="Autre Quantité Sur-Mesure">Autre Quantité Sur-Mesure</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Taille / Hauteur Souhaitée</label>
                      <select
                        className="form-select"
                        value={formData.plantSize}
                        onChange={(e) => setFormData({ ...formData, plantSize: e.target.value })}
                      >
                        <option value="Taille Standard">Taille Standard / Jeune Plant</option>
                        <option value="Sujet Moyen (1m - 2m)">Sujet Moyen (1m à 2m)</option>
                        <option value="Grand Sujet (2m - 5m)">Grand Sujet (2m à 5m)</option>
                        <option value="Pas de préférence">Pas de préférence particulière</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Précisions ou Plante au Choix (Si non listée sur le site)</label>
                    <textarea
                      rows="3"
                      placeholder="Décrivez votre plante préférée, la couleur souhaitée, ou la variété exacte que vous recherchez..."
                      className="form-textarea"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.25rem' }}>
                    <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '0.85rem' }}>
                      <Send size={18} />
                      Demander Devis Pépinière
                    </button>
                  </div>

                  <p style={{ fontSize: '0.78rem', color: 'var(--text-light)', textAlign: 'center', marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                    <ShieldCheck size={14} color="#2E7D32" /> Végétaux sains sélectionnés avec soin par nos horticulteurs.
                  </p>
                </form>
              </div>
            ) : (
              /* ================= SERVICES QUOTE FORM ================= */
              <div>
                <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '0.3rem' }}>
                  Demander un Devis Gratuit
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
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

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.25rem' }}>
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
        )}
      </div>
    </div>
  );
};
