import React, { useState } from 'react';
import { Search, Filter, Leaf, ShoppingBag, Sparkles, Check, ArrowRight, Phone } from 'lucide-react';
import { nurseryCategories, nurseryProducts } from '../data/nurseryData';
import { companyInfo } from '../data/companyData';

export const NurseryPage = ({ openDevisModal }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePlantModal, setActivePlantModal] = useState(null);

  const filteredProducts = nurseryProducts.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ paddingTop: '2rem' }}>
      {/* Hero Banner */}
      <section style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary-forest))', color: 'white', padding: '4rem 0 5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge-tag" style={{ background: 'rgba(255,255,255,0.15)', color: 'var(--bright-lime)' }}>
            <Leaf size={14} /> Pépinière & Vente en Gros & Détail
          </span>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginTop: '0.75rem', marginBottom: '1rem' }}>
            Vente de Plantes Ornementales, Arbres & Équipements
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.85)', maxWidth: '720px', margin: '0 auto' }}>
            Retrouvez notre sélection de végétaux d'exception cultivés et acclimatés au climat marocain, engrais bio, fertilisants et matériel d'arrosage.
          </p>
        </div>
      </section>

      {/* Main Catalog Container */}
      <section className="section-padding" style={{ background: 'var(--cream-bg)', marginTop: '-3rem' }}>
        <div className="container">
          {/* Search & Category Filter Bar */}
          <div className="glass-panel" style={{ borderRadius: 'var(--radius-lg)', padding: '1.5rem', marginBottom: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              {/* Search Bar */}
              <div style={{ position: 'relative', flex: '1 1 300px' }}>
                <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  placeholder="Rechercher une plante, un arbre, un engrais..." 
                  className="form-input"
                  style={{ paddingLeft: '2.75rem', borderRadius: 'var(--radius-full)' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
                {filteredProducts.length} article(s) trouvé(s)
              </div>
            </div>

            {/* Category Pills */}
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              {nurseryCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '0.55rem 1.25rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: selectedCategory === cat.id ? 'var(--primary-forest)' : '#F3F4F6',
                    color: selectedCategory === cat.id ? 'white' : 'var(--text-main)',
                    boxShadow: selectedCategory === cat.id ? '0 4px 12px rgba(27,77,46,0.25)' : 'none'
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div style={{ textAlignment: 'center', padding: '4rem 1rem', background: 'white', borderRadius: 'var(--radius-lg)' }}>
              <Leaf size={48} color="var(--primary-leaf)" style={{ margin: '0 auto 1rem auto', display: 'block' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-dark)' }}>Aucun article ne correspond à votre recherche</h3>
              <p style={{ color: 'var(--text-muted)' }}>Essayez un autre mot-clé ou réinitialisez les filtres.</p>
              <button className="btn-outline" onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }} style={{ marginTop: '1rem' }}>
                Réinitialiser la recherche
              </button>
            </div>
          ) : (
            <div className="grid-3">
              {filteredProducts.map(product => (
                <div 
                  key={product.id}
                  className="card-hover"
                  style={{ display: 'flex', flexDirection: 'column', background: 'white' }}
                >
                  <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span style={{
                      position: 'absolute', top: '1rem', right: '1rem',
                      background: 'var(--primary-dark)', color: 'var(--bright-lime)',
                      padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem', fontWeight: 800
                    }}>
                      {product.badge}
                    </span>
                  </div>

                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <span style={{ color: 'var(--primary-leaf)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase' }}>
                      {product.categoryLabel}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-dark)', margin: '0.3rem 0' }}>
                      {product.name}
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', flex: 1 }}>
                      {product.description}
                    </p>

                    {/* Specs chips */}
                    {product.specs && (
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                        {Object.entries(product.specs).map(([key, val]) => (
                          <span key={key} style={{ background: 'var(--light-sage)', color: 'var(--primary-forest)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                            {key}: {val}
                          </span>
                        ))}
                      </div>
                    )}

                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      paddingTop: '1rem', borderTop: '1px solid #F3F4F6', marginTop: 'auto'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'block' }}>Tarif estimé</span>
                        <strong style={{ fontSize: '1.05rem', color: 'var(--primary-forest)', fontWeight: 800 }}>{product.price}</strong>
                      </div>

                      <button 
                        className="btn-primary"
                        style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
                        onClick={() => openDevisModal(`Achat Pépinière : ${product.name}`)}
                      >
                        Commander / Devis
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Wholesale & Custom Order Banner */}
          <div style={{
            marginTop: '4rem', background: 'linear-gradient(135deg, white, var(--light-sage))',
            borderRadius: 'var(--radius-lg)', padding: '2.5rem', border: '1px solid rgba(46,125,50,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem'
          }}>
            <div>
              <span className="badge-tag">Service Professionnel & Gros</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
                Commandes Spéciales ou Quantités Importantes ?
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.25rem' }}>
                Nous fournissons les architectes paysagistes, promoteurs, résidences et collectivités avec des tarifs dégressifs.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn-primary" onClick={() => openDevisModal("Demande Tarif Pépinière en Gros")}>
                Demander un Devis Gros
              </button>
              <a href={`tel:${companyInfo.contact.phonePrimaryClean}`} className="btn-outline">
                <Phone size={16} /> Appeler la Pépinière
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
