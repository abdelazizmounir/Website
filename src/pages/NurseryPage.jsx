import React, { useState, useEffect } from 'react';
import { Search, Filter, Leaf, ShoppingBag, Sparkles, Check, ArrowRight, Phone, RefreshCw } from 'lucide-react';
import { nurseryCategories, nurseryProducts as defaultProducts } from '../data/nurseryData';
import { companyInfo } from '../data/companyData';
import { supabase } from '../lib/supabase';

export const NurseryPage = ({ openDevisModal }) => {
  const [products, setProducts] = useState(defaultProducts);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchSupabaseProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('nursery_products')
          .select('*')
          .order('display_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Supabase fetch error:', error);
        } else if (data && data.length > 0) {
          // Normalize properties
          const formatted = data.map(item => ({
            ...item,
            categoryLabel: item.category_label || item.categoryLabel || 'Plantes Ornementales',
            isCustom: item.is_custom || item.isCustom || false
          }));
          setProducts(formatted);
        }
      } catch (err) {
        console.error('Error fetching plants:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSupabaseProducts();
  }, []);

  const filteredProducts = products.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ paddingTop: '2rem' }}>
      {/* Hero Banner */}
      <section style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary-forest))', color: 'white', padding: '4rem 0 5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
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
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'white',
                    border: product.isCustom ? '2px solid var(--gold)' : '1px solid rgba(0,0,0,0.05)',
                    boxShadow: product.isCustom ? '0 8px 24px rgba(212,175,55,0.2)' : 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span style={{
                      position: 'absolute', top: '1rem', right: '1rem',
                      background: product.isCustom ? 'var(--gold)' : 'var(--primary-dark)',
                      color: product.isCustom ? 'var(--primary-dark)' : 'var(--bright-lime)',
                      padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)',
                      fontSize: '0.78rem', fontWeight: 800
                    }}>
                      {product.badge}
                    </span>
                  </div>

                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <span style={{ color: product.isCustom ? 'var(--gold-hover)' : 'var(--primary-leaf)', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase' }}>
                      {product.categoryLabel}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-dark)', margin: '0.3rem 0' }}>
                      {product.name}
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem', flex: 1 }}>
                      {product.description}
                    </p>

                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      paddingTop: '1rem', borderTop: '1px solid #F3F4F6', marginTop: 'auto'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'block' }}>Tarification</span>
                        <strong style={{ fontSize: '1.05rem', color: 'var(--primary-forest)', fontWeight: 800 }}>{product.price}</strong>
                      </div>

                      <button 
                        className={product.isCustom ? "btn-gold" : "btn-primary"}
                        style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
                        onClick={() => openDevisModal(product.isCustom ? "Demande de Végétal au Choix / Sur-Mesure" : `Achat Pépinière : ${product.name}`)}
                      >
                        {product.isCustom ? "Demander ma Plante" : "Commander / Devis"}
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
