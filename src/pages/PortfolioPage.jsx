import React, { useState } from 'react';
import { Eye, FileText, CheckCircle2, Sparkles, MapPin } from 'lucide-react';
import { companyInfo } from '../data/companyData';

export const PortfolioPage = ({ openDevisModal }) => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: "Aménagement Paysager d'une Villa de Luxe",
      location: "Quartier Lipodrom, Fès",
      category: "creation",
      image: "/img/Réalisation de projets et maintenance (1).jpg",
      desc: "Création complète d'un jardin privé avec pelouse dense, palmiers Washingtonia et système d'arrosage automatique.",
      tags: ["Irrigation 100% Automatique", "Plantations", "Pelouse"]
    },
    {
      id: 2,
      title: "Installation Réseau d'Arrosage Goutte-à-Goutte",
      location: "Route de Séfrou, Fès",
      category: "irrigation",
      image: "/img/Installation et maintenance des systèmes d'irrigation (2).jpg",
      desc: "Pose de 800 mètres de conduites enterrées et électrovannes connectées pour un verger & parc floral.",
      tags: ["Économie d'Eau 40%", "Automatisé"]
    },
    {
      id: 3,
      title: "Élagage & Entretien de 40 Palmiers",
      location: "Résidence Privée, Meknès",
      category: "elagage",
      image: "/img/Élagage des palmiers (2).jpg",
      desc: "Nettoyage en hauteur des stipes et traitement phytosanitaire préventif contre les ravageurs.",
      tags: ["Élagage Haute Sécurité", "Traitement"]
    },
    {
      id: 4,
      title: "Contrat de Maintenance Annuelle de Parc",
      location: "Complexe Résidentiel, Fès",
      category: "entretien",
      image: "/img/gazon (1).jpg",
      desc: "Tonte hebdomadaire, taille des haies de thuya et fertilisation saisonnière.",
      tags: ["Maintenance Hebdomadaire", "Contrat Annuel"]
    },
    {
      id: 5,
      title: "Restauration & Taille Topiaire d'Arbustes",
      location: "Domaine Privé, Fès",
      category: "entretien",
      image: "/img/La taille des arbustes (1).jpg",
      desc: "Taille de structure des haies de buis et ficus pour un effet géométrique impeccable.",
      tags: ["Taille Topiaire", "Esthétique"]
    },
    {
      id: 6,
      title: "Traitement Phytosanitaire & Regarnissage",
      location: "Jardin d'Hôtel, Fès",
      category: "entretien",
      image: "/img/Traitement phytosanitaires (4).jpg",
      desc: "Diagnostic de carences du sol, apport d'engrais organique bio et élimination des mauvaises herbes.",
      tags: ["Phytosanitaire", "Fertilisation Bio"]
    },
    {
      id: 7,
      title: "Projet d'Aménagement Paysager Contemporain",
      location: "Fès",
      category: "creation",
      image: "/img/conception paysagère (1).jpg",
      desc: "Conception et création d'espaces verts avec rocailles et arrangements floraux.",
      tags: ["Conception 3D", "Création"]
    },
    {
      id: 8,
      title: "Entretien d'Espace Vert Industriel & Commercial",
      location: "Zone Industrielle, Fès",
      category: "entretien",
      image: "/img/Réalisation de projets et maintenance (5).jpg",
      desc: "Maintenance globale des espaces extérieurs d'entreprise.",
      tags: ["Projet Professionnel", "Maintenance"]
    }
  ];

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <div style={{ paddingTop: '2rem' }}>
      {/* Header */}
      <section style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary-forest))', color: 'white', padding: '4rem 0 5rem 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginTop: '0.75rem', marginBottom: '1rem' }}>
            Nos Réalisations Paysagères dans la région Fès Meknès
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.85)', maxWidth: '700px', margin: '0 auto' }}>
            Découvrez un aperçu de nos projets d'aménagement, d'installation d'irrigation et de contrats d'entretien réussis.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="section-padding" style={{ background: 'var(--cream-bg)', marginTop: '-3rem' }}>
        <div className="container">
          {/* Filters */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {[
              { id: 'all', label: 'Toutes nos réalisations' },
              { id: 'creation', label: 'Création & Aménagement' },
              { id: 'irrigation', label: 'Systèmes d\'Irrigation' },
              { id: 'elagage', label: 'Élagage Palmiers' },
              { id: 'entretien', label: 'Entretien & Tonte' }
            ].map(btn => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id)}
                style={{
                  padding: '0.6rem 1.4rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  background: filter === btn.id ? 'var(--primary-forest)' : 'white',
                  color: filter === btn.id ? 'white' : 'var(--text-main)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div className="grid-3">
            {filteredProjects.map(proj => (
              <div key={proj.id} className="card-hover" style={{ background: 'white', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '230px', overflow: 'hidden' }}>
                  <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{
                    position: 'absolute', bottom: '1rem', left: '1rem',
                    background: 'rgba(15,51,29,0.85)', backdropFilter: 'blur(8px)',
                    color: 'white', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)',
                    fontSize: '0.78rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem'
                  }}>
                    <MapPin size={12} color="var(--bright-lime)" /> {proj.location}
                  </span>
                </div>

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
                    {proj.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.25rem', flex: 1 }}>
                    {proj.desc}
                  </p>

                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {proj.tags.map((t, idx) => (
                      <span key={idx} style={{ background: 'var(--light-sage)', color: 'var(--primary-forest)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.76rem', fontWeight: 700 }}>
                        ✓ {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <button className="btn-gold" onClick={() => openDevisModal()} style={{ padding: '0.85rem 2rem', fontSize: '1.05rem' }}>
              <FileText size={18} />
              Vous souhaitez un résultat similaire pour votre espace vert ?
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
