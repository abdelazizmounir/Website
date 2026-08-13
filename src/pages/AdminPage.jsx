import React, { useState, useEffect } from 'react';
import { 
  Lock, LogOut, Plus, Edit2, Trash2, Search, Leaf, 
  CheckCircle, AlertCircle, Eye, RefreshCw, X, Image as ImageIcon,
  Sparkles, Layers, Tag, DollarSign, LayoutGrid, List,
  ShieldCheck, Smartphone, Key, QrCode
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { nurseryCategories, nurseryProducts as defaultProducts } from '../data/nurseryData';
import { generateQRCodeDataUrl, verifyTOTPCode, ADMIN_TOTP_SECRET, ADMIN_EMAIL } from '../lib/totp';

export const AdminPage = ({ openDevisModal, setActiveTab }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginStep, setLoginStep] = useState(1); // 1 = Password, 2 = TOTP 2FA
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // QR Code & TOTP State
  const [isTotpConfigured, setIsTotpConfigured] = useState(() => {
    return localStorage.getItem('amgreenart_totp_configured') === 'true';
  });
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');

  // Products state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

  useEffect(() => {
    generateQRCodeDataUrl().then(url => {
      if (url) setQrCodeDataUrl(url);
    });
  }, []);

  // Edit / Add Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: 'plantes-ornementales',
    category_label: 'Plantes Ornementales',
    price: 'Sur Devis',
    image: '/img/Vente des plantes (1).jpg',
    description: '',
    badge: 'Populaire',
    is_custom: false
  });
  const [saveLoading, setSaveLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Drag & Drop Image Handlers
  const handleImageFile = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Veuillez sélectionner un fichier image valide (JPG, PNG, WEBP...).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      alert('L\'image dépasse 8 Mo. Veuillez choisir une image plus légère.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData(prev => ({ ...prev, image: e.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  // Delete Confirmation State
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Check auth on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('amgreenart_admin_session');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      fetchProducts();
    }
  }, []);

  // Fetch products from Supabase
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('nursery_products')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching nursery products:', error);
        showToast('Erreur lors du chargement des données. Utilisation des données locales.', 'error');
        setProducts(defaultProducts.map(p => ({
          ...p,
          category_label: p.categoryLabel,
          is_custom: p.isCustom || false
        })));
      } else if (data && data.length > 0) {
        setProducts(data);
      } else {
        setProducts(defaultProducts.map(p => ({
          ...p,
          category_label: p.categoryLabel,
          is_custom: p.isCustom || false
        })));
      }
    } catch (err) {
      console.error(err);
      setProducts(defaultProducts.map(p => ({
        ...p,
        category_label: p.categoryLabel,
        is_custom: p.isCustom || false
      })));
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Step 1: Password submit handler
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    setTimeout(() => {
      if (loginEmail.trim().toLowerCase() === 'amgreenart@gmail.com' && loginPassword === 'am123456') {
        setLoginStep(2);
        showToast('Mot de passe valide. Veuillez ouvrir Google Authenticator.');
      } else {
        setLoginError('Identifiants incorrects. Veuillez vérifier l\'adresse e-mail et le mot de passe.');
      }
      setLoginLoading(false);
    }, 400);
  };

  // Step 2: Google Authenticator TOTP submit handler
  const handleTotpSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const isValid = await verifyTOTPCode(totpCode);
      if (isValid) {
        localStorage.setItem('amgreenart_totp_configured', 'true');
        localStorage.setItem('amgreenart_admin_session', 'true');
        setIsTotpConfigured(true);
        setIsAuthenticated(true);
        fetchProducts();
        showToast('Authentification Google Authenticator réussie ! Bienvenue.');
      } else {
        setLoginError('Code Google Authenticator à 6 chiffres invalide ou expiré (30s). Veuillez vérifier votre application mobile.');
      }
    } catch (err) {
      console.error(err);
      setLoginError('Erreur de vérification.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Reset 2FA configuration
  const handleReset2FA = () => {
    const password = prompt('Pour réinitialiser et re-scanner le QR Code Google Authenticator, saisissez le mot de passe administrateur :');
    if (password === 'am123456') {
      localStorage.removeItem('amgreenart_totp_configured');
      setIsTotpConfigured(false);
      showToast('Configuration 2FA réinitialisée. Vous pourrez re-scanner le QR code au prochain login.');
    } else if (password !== null) {
      alert('Mot de passe administrateur incorrect.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('amgreenart_admin_session');
    setIsAuthenticated(false);
    setLoginStep(1);
    setTotpCode('');
    showToast('Déconnexion effectuée.');
  };

  // Open Modal for Create or Edit
  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      id: 'p-' + Date.now(),
      name: '',
      category: 'plantes-ornementales',
      category_label: 'Plantes Ornementales',
      price: 'Sur Devis',
      image: '/img/Vente des plantes (1).jpg',
      description: '',
      badge: 'Nouveau',
      is_custom: false
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      id: product.id,
      name: product.name || '',
      category: product.category || 'plantes-ornementales',
      category_label: product.category_label || product.categoryLabel || 'Plantes Ornementales',
      price: product.price || 'Sur Devis',
      image: product.image || '/img/Vente des plantes (1).jpg',
      description: product.description || '',
      badge: product.badge || '',
      is_custom: product.is_custom || product.isCustom || false
    });
    setIsModalOpen(true);
  };

  // Save (Insert or Update)
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Veuillez saisir le nom de la plante / article.');
      return;
    }

    setSaveLoading(true);
    try {
      const payload = {
        id: formData.id,
        name: formData.name.trim(),
        category: formData.category,
        category_label: formData.category_label,
        price: formData.price.trim() || 'Sur Devis',
        image: formData.image.trim(),
        description: formData.description.trim(),
        badge: formData.badge.trim(),
        is_custom: formData.is_custom
      };

      const { error } = await supabase
        .from('nursery_products')
        .upsert(payload, { onConflict: 'id' });

      if (error) {
        console.error('Supabase save error:', error);
        showToast('Erreur lors de l\'enregistrement dans Supabase.', 'error');
      } else {
        showToast(editingProduct ? 'Plante modifiée avec succès !' : 'Nouvelle plante ajoutée avec succès !');
        setIsModalOpen(false);
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
      showToast('Erreur inattendue.', 'error');
    } finally {
      setSaveLoading(false);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id) => {
    setDeleteLoading(true);
    try {
      const { error } = await supabase
        .from('nursery_products')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase delete error:', error);
        showToast('Erreur lors de la suppression.', 'error');
      } else {
        showToast('Article supprimé de la pépinière avec succès.');
        setDeleteConfirmId(null);
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
      showToast('Erreur lors de la suppression.', 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  const filteredProducts = products.filter(item => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // Preset images helper
  const presetImages = [
    '/img1/Agave.jpeg',
    '/img1/Engrais N.P.K.jpeg',
    '/img1/Faux Bananier.jpeg',
    '/img1/Ficus nitida.jpeg',
    '/img1/Produit phytosanitaires.jpeg',
    '/img1/Rosier multicolore.jpeg',
    '/img1/Terreau en sac.jpeg',
    '/img1/WhatsApp Image 2026-08-11 at 19.21.45 (1).jpeg',
    '/img1/cyprès italien.jpeg',
    '/img/Vente des plantes (1).jpg',
    '/img/Vente des plantes (2).jpg',
    '/img/Vente des plantes (3).jpg',
    '/img/Vente des plantes (4).jpg',
    '/img/Vente des plantes (5).jpg',
    '/img/Vente des plantes (6).jpg',
    '/img/Vente des plantes (7).jpg',
    '/img/Vente des plantes (8).jpg',
    '/img/Vente des plantes (9).jpg',
    '/images/pepiniere.jpg'
  ];

  // -------------------------------------------------------------
  // RENDER LOGIN SCREEN IF NOT AUTHENTICATED (WITH GOOGLE AUTH 2FA)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f2e1b 0%, #1b4d2e 50%, #112619 100%)',
        padding: '2rem 1rem'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '480px',
          background: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(16px)',
          borderRadius: '24px',
          padding: '2.5rem 2rem',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.2)',
          border: '1px solid rgba(255,255,255,0.3)'
        }}>
          {loginStep === 1 ? (
            /* STEP 1: PASSWORD LOGIN */
            <>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{
                  width: '68px', height: '68px', borderRadius: '20px',
                  background: 'linear-gradient(135deg, var(--primary-forest), var(--primary-dark))',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--gold)', boxShadow: '0 8px 20px rgba(27,77,46,0.3)', marginBottom: '1rem'
                }}>
                  <Lock size={32} />
                </div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '0.4rem' }}>
                  Espace Gestion Pépinière
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                  Étape 1 sur 2 : Connectez-vous avec vos identifiants administrateur.
                </p>
              </div>

              {loginError && (
                <div style={{
                  background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B',
                  padding: '0.85rem 1rem', borderRadius: '12px', fontSize: '0.88rem',
                  marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem'
                }}>
                  <AlertCircle size={18} style={{ flexShrink: 0 }} />
                  <div>{loginError}</div>
                </div>
              )}

              <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.4rem' }}>
                    Identifiant / Adresse E-mail
                  </label>
                  <input 
                    type="email" 
                    required
                    placeholder="amgreenart@gmail.com"
                    className="form-input"
                    style={{ width: '100%', borderRadius: '12px' }}
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.4rem' }}>
                    Mot de Passe
                  </label>
                  <input 
                    type="password" 
                    required
                    placeholder="••••••••"
                    className="form-input"
                    style={{ width: '100%', borderRadius: '12px' }}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={loginLoading}
                  style={{
                    width: '100%', padding: '0.9rem', fontSize: '1rem', fontWeight: 700,
                    borderRadius: '12px', marginTop: '0.5rem', justifyContent: 'center'
                  }}
                >
                  {loginLoading ? <RefreshCw size={20} className="spin" /> : 'Continuer vers 2FA Google Authenticator'}
                </button>
              </form>
            </>
          ) : (
            /* STEP 2: GOOGLE AUTHENTICATOR TOTP VERIFICATION */
            <>
              {!isTotpConfigured ? (
                /* INITIAL ONE-TIME SETUP CARD */
                <>
                  <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                    <div style={{
                      width: '60px', height: '60px', borderRadius: '18px',
                      background: 'linear-gradient(135deg, #1877F2, var(--primary-forest))',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', boxShadow: '0 8px 20px rgba(24,119,242,0.3)', marginBottom: '0.75rem'
                    }}>
                      <QrCode size={30} />
                    </div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '0.3rem' }}>
                      Configuration Initiale 2FA (Une seule fois)
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      Scannez ce QR Code avec l'application <strong>Google Authenticator</strong> sur votre téléphone mobile pour lier votre compte.
                    </p>
                  </div>

                  {/* QR Code Display */}
                  <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '16px', border: '1px solid #E2E8F0', textAlign: 'center', marginBottom: '1.25rem' }}>
                    {qrCodeDataUrl ? (
                      <img 
                        src={qrCodeDataUrl} 
                        alt="QR Code Google Authenticator" 
                        style={{ width: '180px', height: '180px', margin: '0 auto 0.5rem auto', display: 'block', borderRadius: '12px', border: '1px solid #CBD5E1' }}
                      />
                    ) : (
                      <div style={{ padding: '1.5rem' }}><RefreshCw size={24} className="spin" /></div>
                    )}
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>Clé secrète manuelle :</span>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--primary-forest)', letterSpacing: '1px' }}>
                      {ADMIN_TOTP_SECRET}
                    </strong>
                  </div>

                  {loginError && (
                    <div style={{
                      background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B',
                      padding: '0.75rem 1rem', borderRadius: '12px', fontSize: '0.85rem',
                      marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}>
                      <AlertCircle size={16} style={{ flexShrink: 0 }} />
                      <div>{loginError}</div>
                    </div>
                  )}

                  <form onSubmit={handleTotpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.3rem', textAlign: 'center' }}>
                        Entrez le code à 6 chiffres de votre téléphone :
                      </label>
                      <input 
                        type="text" 
                        required
                        maxLength={6}
                        autoFocus
                        placeholder="000 000"
                        className="form-input"
                        style={{
                          width: '100%', borderRadius: '12px', fontSize: '1.6rem', fontWeight: 900,
                          letterSpacing: '6px', textAlign: 'center', color: 'var(--primary-forest)',
                          border: '2px solid var(--primary-forest)'
                        }}
                        value={totpCode}
                        onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ''))}
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn-gold"
                      disabled={loginLoading || totpCode.length < 6}
                      style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', fontWeight: 800, borderRadius: '12px', justifyContent: 'center' }}
                    >
                      {loginLoading ? <RefreshCw size={18} className="spin" /> : 'Activer 2FA & Accéder à la Gestion'}
                    </button>
                  </form>

                  <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <button 
                      onClick={() => setLoginStep(1)} 
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
                    >
                      ← Annuler et retour au mot de passe
                    </button>
                  </div>
                </>
              ) : (
                /* NORMAL CONFIGURED 2FA LOGIN (NO QR CODE SHOWN) */
                <>
                  <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                    <div style={{
                      width: '68px', height: '68px', borderRadius: '20px',
                      background: 'linear-gradient(135deg, #1877F2, var(--primary-forest))',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', boxShadow: '0 8px 20px rgba(24,119,242,0.3)', marginBottom: '1rem'
                    }}>
                      <Smartphone size={32} />
                    </div>
                    <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '0.4rem' }}>
                      Verification Google Authenticator
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      Ouvrez <strong>Google Authenticator</strong> sur votre téléphone mobile et saisissez le code à 6 chiffres.
                    </p>
                  </div>

                  {loginError && (
                    <div style={{
                      background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B',
                      padding: '0.85rem 1rem', borderRadius: '12px', fontSize: '0.88rem',
                      marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem'
                    }}>
                      <AlertCircle size={18} style={{ flexShrink: 0 }} />
                      <div>{loginError}</div>
                    </div>
                  )}

                  <form onSubmit={handleTotpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.4rem', textAlign: 'center' }}>
                        Code à 6 Chiffres (OTP)
                      </label>
                      <input 
                        type="text" 
                        required
                        maxLength={6}
                        autoFocus
                        placeholder="000 000"
                        className="form-input"
                        style={{
                          width: '100%', borderRadius: '14px', fontSize: '1.8rem', fontWeight: 900,
                          letterSpacing: '8px', textAlign: 'center', color: 'var(--primary-forest)',
                          border: '2px solid var(--primary-forest)'
                        }}
                        value={totpCode}
                        onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ''))}
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn-gold"
                      disabled={loginLoading || totpCode.length < 6}
                      style={{
                        width: '100%', padding: '0.9rem', fontSize: '1rem', fontWeight: 800,
                        borderRadius: '12px', justifyContent: 'center'
                      }}
                    >
                      {loginLoading ? <RefreshCw size={20} className="spin" /> : 'Valider & Accéder à la Gestion'}
                    </button>
                  </form>

                  <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #E5E7EB', textAlign: 'center' }}>
                    <button 
                      onClick={() => setLoginStep(1)} 
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
                    >
                      ← Retour au mot de passe
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>
              Sécurité AMGreenArt • Protégé par Google Authenticator TOTP
            </span>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER ADMIN DASHBOARD (LOGGED IN)
  // -------------------------------------------------------------
  return (
    <div style={{ padding: '2rem 0 4rem 0', background: '#F8FAFC', minHeight: '90vh' }}>
      <div className="container">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div style={{
            position: 'fixed',
            top: '2rem',
            right: '2rem',
            zIndex: 9999,
            background: toastMessage.type === 'error' ? '#991B1B' : 'var(--primary-dark)',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '14px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.95rem',
            fontWeight: 600,
            animation: 'fadeIn 0.3s ease'
          }}>
            {toastMessage.type === 'error' ? <AlertCircle size={20} color="#FCA5A5" /> : <CheckCircle size={20} color="var(--bright-lime)" />}
            <span>{toastMessage.message}</span>
          </div>
        )}

        {/* Dashboard Top Header Bar */}
        <div style={{
          background: 'linear-gradient(135deg, var(--primary-dark), var(--primary-forest))',
          borderRadius: '20px',
          padding: '2rem',
          color: 'white',
          boxShadow: '0 10px 30px rgba(27,77,46,0.2)',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
                Connecté: <strong>amgreenart@gmail.com</strong>
              </span>
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0 }}>
              Gestion de la Pépinière
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.85)', margin: '0.3rem 0 0 0', fontSize: '0.95rem' }}>
              Gérez les végétaux, tarifs, badges, photos et descriptions affichés en temps réel sur le site.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button 
              onClick={handleReset2FA} 
              className="btn-outline" 
              style={{ background: 'rgba(255,255,255,0.1)', color: 'white', borderColor: 'rgba(255,255,255,0.3)', padding: '0.65rem 1rem' }}
              title="Réinitialiser la clé Google Authenticator"
            >
              <QrCode size={16} /> Réinitialiser 2FA
            </button>
            <button 
              onClick={() => setActiveTab && setActiveTab('nursery')} 
              className="btn-outline" 
              style={{ background: 'rgba(255,255,255,0.1)', color: 'white', borderColor: 'rgba(255,255,255,0.3)', padding: '0.65rem 1.25rem' }}
            >
              <Eye size={16} /> Voir la Pépinière Publique
            </button>
            <button 
              onClick={openAddModal} 
              className="btn-gold" 
              style={{ padding: '0.65rem 1.4rem', fontWeight: 800 }}
            >
              <Plus size={18} /> Ajouter une Plante
            </button>
            <button 
              onClick={handleLogout} 
              style={{
                background: 'rgba(239,68,68,0.2)',
                color: '#FCA5A5',
                border: '1px solid rgba(239,68,68,0.4)',
                padding: '0.65rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s ease'
              }}
            >
              <LogOut size={16} /> Déconnexion
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          <div style={{ background: 'white', padding: '1.25rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>Total Articles</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-dark)', marginTop: '0.2rem' }}>
              {products.length}
            </div>
          </div>
          <div style={{ background: 'white', padding: '1.25rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>Articles Personnalisés (Sur-Mesure)</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gold-hover)', marginTop: '0.2rem' }}>
              {products.filter(p => p.is_custom || p.isCustom).length}
            </div>
          </div>
          <div style={{ background: 'white', padding: '1.25rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>Statut Base de Données</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-leaf)', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle size={18} color="var(--primary-leaf)" /> Supabase Synchro
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div style={{
          background: 'white',
          padding: '1.25rem',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ position: 'relative', flex: '1 1 300px' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="Filtrer ou rechercher par nom ou description..."
              className="form-input"
              style={{ paddingLeft: '2.75rem', borderRadius: '12px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button 
              onClick={fetchProducts}
              title="Rafraîchir les données"
              style={{
                padding: '0.6rem 0.9rem',
                borderRadius: '10px',
                border: '1px solid #CBD5E1',
                background: '#F8FAFC',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              <RefreshCw size={16} className={loading ? "spin" : ""} /> Rafraîchir
            </button>

            <div style={{ display: 'flex', background: '#F1F5F9', padding: '4px', borderRadius: '10px' }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '0.45rem 0.75rem',
                  border: 'none',
                  borderRadius: '8px',
                  background: viewMode === 'grid' ? 'white' : 'transparent',
                  boxShadow: viewMode === 'grid' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}
              >
                <LayoutGrid size={16} /> Grille
              </button>
              <button
                onClick={() => setViewMode('table')}
                style={{
                  padding: '0.45rem 0.75rem',
                  border: 'none',
                  borderRadius: '8px',
                  background: viewMode === 'table' ? 'white' : 'transparent',
                  boxShadow: viewMode === 'table' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}
              >
                <List size={16} /> Tableau
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'white', borderRadius: '16px' }}>
            <RefreshCw size={36} color="var(--primary-forest)" className="spin" style={{ margin: '0 auto 1rem auto', display: 'block' }} />
            <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Chargement du catalogue depuis Supabase...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'white', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <Leaf size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto', display: 'block' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-dark)' }}>Aucun article trouvé</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Modifiez vos mots-clés ou ajoutez une nouvelle plante.</p>
            <button className="btn-gold" onClick={openAddModal} style={{ marginTop: '1rem' }}>
              <Plus size={16} /> Ajouter une Plante
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* GRID VIEW */
          <div className="grid-3">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  border: product.is_custom || product.isCustom ? '2px solid var(--gold)' : '1px solid #E2E8F0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                <div style={{ position: 'relative', height: '200px', background: '#F1F5F9' }}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = '/images/pepiniere.jpg'; }}
                  />
                  {product.badge && (
                    <span style={{
                      position: 'absolute', top: '0.75rem', right: '0.75rem',
                      background: product.is_custom || product.isCustom ? 'var(--gold)' : 'var(--primary-dark)',
                      color: product.is_custom || product.isCustom ? 'var(--primary-dark)' : 'var(--bright-lime)',
                      padding: '0.3rem 0.75rem', borderRadius: '20px',
                      fontSize: '0.75rem', fontWeight: 800
                    }}>
                      {product.badge}
                    </span>
                  )}
                </div>

                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{ color: 'var(--primary-leaf)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
                    {product.category_label || product.categoryLabel}
                  </span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-dark)', margin: '0.25rem 0 0.5rem 0' }}>
                    {product.name}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1rem', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {product.description}
                  </p>

                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: '0.85rem', borderTop: '1px solid #F1F5F9', marginTop: 'auto'
                  }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', display: 'block' }}>Tarif</span>
                      <strong style={{ fontSize: '0.98rem', color: 'var(--primary-forest)', fontWeight: 800 }}>{product.price}</strong>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => openEditModal(product)}
                        style={{
                          background: '#F1F5F9',
                          color: 'var(--primary-dark)',
                          border: 'none',
                          padding: '0.5rem 0.85rem',
                          borderRadius: '8px',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          transition: 'background 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#E2E8F0'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#F1F5F9'}
                      >
                        <Edit2 size={14} /> Éditer
                      </button>
                      <button 
                        onClick={() => setDeleteConfirmId(product.id)}
                        style={{
                          background: '#FEF2F2',
                          color: '#DC2626',
                          border: 'none',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '8px',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#FEE2E2'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#FEF2F2'}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* TABLE VIEW */
          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: 'var(--primary-dark)', fontWeight: 800 }}>
                  <th style={{ padding: '1rem' }}>Visuel</th>
                  <th style={{ padding: '1rem' }}>Nom de l'article</th>
                  <th style={{ padding: '1rem' }}>Prix</th>
                  <th style={{ padding: '1rem' }}>Badge</th>
                  <th style={{ padding: '1rem' }}>Description</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        style={{ width: '54px', height: '54px', borderRadius: '8px', objectFit: 'cover' }}
                        onError={(e) => { e.target.src = '/images/pepiniere.jpg'; }}
                      />
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--primary-dark)' }}>
                      {product.name}
                      {product.is_custom && <span style={{ marginLeft: '0.4rem', color: 'var(--gold-hover)', fontSize: '0.75rem' }}>(Sur-Mesure)</span>}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--primary-forest)', fontWeight: 700 }}>
                      {product.price}
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span style={{ background: '#F1F5F9', padding: '0.25rem 0.6rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 }}>
                        {product.badge || '—'}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {product.description}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <button 
                          onClick={() => openEditModal(product)} 
                          className="btn-outline" 
                          style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
                        >
                          <Edit2 size={14} /> Modifier
                        </button>
                        <button 
                          onClick={() => setDeleteConfirmId(product.id)} 
                          style={{
                            background: '#FEF2F2', color: '#DC2626', border: 'none',
                            padding: '0.4rem 0.75rem', borderRadius: '8px', cursor: 'pointer'
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* EDIT / CREATE MODAL WITH HIGH-QUALITY DESIGN & LIVE PREVIEW   */}
        {/* ------------------------------------------------------------- */}
        {isModalOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(15, 46, 27, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}>
            <div style={{
              background: 'white',
              width: '100%',
              maxWidth: '920px',
              maxHeight: '90vh',
              borderRadius: '24px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Modal Header */}
              <div style={{
                background: 'linear-gradient(135deg, var(--primary-dark), var(--primary-forest))',
                padding: '1.5rem 2rem',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '12px',
                    background: 'rgba(255,255,255,0.15)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', color: 'var(--gold)'
                  }}>
                    {editingProduct ? <Edit2 size={22} /> : <Plus size={22} />}
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>
                      {editingProduct ? `Édition : ${editingProduct.name}` : 'Ajouter un Nouveau Végétal'}
                    </h2>
                    <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)' }}>
                      Renseignez les détails ci-dessous. Les modifications seront enregistrées sur Supabase.
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none',
                    width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body: Split Form & Live Preview */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 340px',
                overflowY: 'auto',
                flex: 1
              }}>
                {/* Left Side: Form Fields */}
                <form id="productForm" onSubmit={handleSaveProduct} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.35rem' }}>
                      Nom de la Plante / Végétal / Article <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: Bougainvillier Rose Éclatant"
                      className="form-input"
                      style={{ width: '100%', borderRadius: '10px' }}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.35rem' }}>
                        Tarif / Prix
                      </label>
                      <input 
                        type="text" 
                        placeholder="Ex: Sur Devis ou 250 DH"
                        className="form-input"
                        style={{ width: '100%', borderRadius: '10px' }}
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.35rem' }}>
                        Badge Promotionnel / Tag
                      </label>
                      <input 
                        type="text" 
                        placeholder="Ex: Populaire, Haute Qualité, Bio"
                        className="form-input"
                        style={{ width: '100%', borderRadius: '10px' }}
                        value={formData.badge}
                        onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.35rem' }}>
                      Description du Produit
                    </label>
                    <textarea 
                      rows={4}
                      placeholder="Indiquez les caractéristiques du végétal, son entretien, exposition conseillée..."
                      className="form-input"
                      style={{ width: '100%', borderRadius: '10px', resize: 'vertical' }}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.35rem' }}>
                      Image du Végétal / Article <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    
                    {/* Drag & Drop Zone */}
                    <div 
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => document.getElementById('fileInput').click()}
                      style={{
                        border: isDragging ? '2px dashed var(--gold)' : '2px dashed #CBD5E1',
                        borderRadius: '16px',
                        padding: '1.25rem 1rem',
                        textAlign: 'center',
                        background: isDragging ? 'rgba(212, 175, 55, 0.08)' : '#F8FAFC',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        marginBottom: '0.8rem',
                        position: 'relative'
                      }}
                    >
                      <input 
                        type="file" 
                        id="fileInput"
                        accept="image/*" 
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageFile(e.target.files[0]);
                          }
                        }}
                      />

                      {formData.image ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                          <img 
                            src={formData.image} 
                            alt="Aperçu chargé" 
                            style={{ width: '110px', height: '110px', borderRadius: '12px', objectFit: 'cover', border: '2px solid var(--primary-forest)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            onError={(e) => { e.target.src = '/images/pepiniere.jpg'; }}
                          />
                          <span style={{ fontSize: '0.82rem', color: 'var(--primary-dark)', fontWeight: 700 }}>
                            📷 Image chargée • Déposez ou cliquez pour remplacer
                          </span>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', padding: '0.5rem' }}>
                          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--light-sage)', color: 'var(--primary-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ImageIcon size={24} />
                          </div>
                          <strong style={{ fontSize: '0.92rem', color: 'var(--primary-dark)', display: 'block' }}>
                            Glissez & déposez une image ici (Drop Zone)
                          </strong>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            ou cliquez pour choisir un fichier (JPG, PNG, WEBP...)
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Preset Image Chooser */}
                    <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.4rem', fontWeight: 600 }}>
                      Ou choisir parmi la galerie d'images du site :
                    </span>
                    <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.4rem' }}>
                      {presetImages.map((imgPath, idx) => (
                        <img 
                          key={idx}
                          src={imgPath}
                          alt="preset"
                          onClick={() => setFormData({ ...formData, image: imgPath })}
                          style={{
                            width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover',
                            cursor: 'pointer',
                            flexShrink: 0,
                            border: formData.image === imgPath ? '2px solid var(--gold)' : '2px solid transparent',
                            opacity: formData.image === imgPath ? 1 : 0.65
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.5rem', background: '#F8FAFC', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <input 
                      type="checkbox" 
                      id="is_custom"
                      checked={formData.is_custom}
                      onChange={(e) => setFormData({ ...formData, is_custom: e.target.checked })}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--gold)' }}
                    />
                    <label htmlFor="is_custom" style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary-dark)', cursor: 'pointer' }}>
                      Marquer comme commande sur-mesure / option personnalisée (Bordure Dorée)
                    </label>
                  </div>
                </form>

                {/* Right Side: Real-time Live Preview */}
                <div style={{
                  background: 'var(--cream-bg)',
                  padding: '1.75rem 1.5rem',
                  borderLeft: '1px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-dark)', fontWeight: 800, fontSize: '0.88rem', marginBottom: '1rem' }}>
                    <Sparkles size={16} color="var(--gold-hover)" /> Aperçu en direct sur le site
                  </div>

                  {/* Mock Card Preview */}
                  <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    border: formData.is_custom ? '2px solid var(--gold)' : '1px solid rgba(0,0,0,0.08)',
                    boxShadow: formData.is_custom ? '0 8px 24px rgba(212,175,55,0.2)' : 'var(--shadow-sm)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div style={{ position: 'relative', height: '170px', overflow: 'hidden', background: '#E2E8F0' }}>
                      <img 
                        src={formData.image || '/images/pepiniere.jpg'} 
                        alt="Aperçu" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.target.src = '/images/pepiniere.jpg'; }}
                      />
                      {formData.badge && (
                        <span style={{
                          position: 'absolute', top: '0.6rem', right: '0.6rem',
                          background: formData.is_custom ? 'var(--gold)' : 'var(--primary-dark)',
                          color: formData.is_custom ? 'var(--primary-dark)' : 'var(--bright-lime)',
                          padding: '0.25rem 0.65rem', borderRadius: '20px',
                          fontSize: '0.72rem', fontWeight: 800
                        }}>
                          {formData.badge}
                        </span>
                      )}
                    </div>

                    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column' }}>
                      <span style={{ color: 'var(--primary-leaf)', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase' }}>
                        {formData.category_label}
                      </span>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary-dark)', margin: '0.2rem 0' }}>
                        {formData.name || 'Nom de la plante...'}
                      </h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '0.85rem' }}>
                        {formData.description || 'Description du végétal...'}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.65rem', borderTop: '1px solid #F3F4F6' }}>
                        <strong style={{ fontSize: '0.9rem', color: 'var(--primary-forest)', fontWeight: 800 }}>
                          {formData.price || 'Sur Devis'}
                        </strong>
                        <span style={{ fontSize: '0.75rem', background: 'var(--primary-forest)', color: 'white', padding: '0.35rem 0.65rem', borderRadius: '20px', fontWeight: 700 }}>
                          Devis
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div style={{
                padding: '1.25rem 2rem',
                borderTop: '1px solid #E2E8F0',
                background: '#F8FAFC',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '1rem'
              }}>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="btn-outline"
                  style={{ padding: '0.65rem 1.25rem' }}
                >
                  Annuler
                </button>
                <button 
                  form="productForm"
                  type="submit" 
                  className="btn-gold"
                  disabled={saveLoading}
                  style={{ padding: '0.65rem 1.6rem', fontWeight: 800 }}
                >
                  {saveLoading ? <RefreshCw size={18} className="spin" /> : editingProduct ? 'Enregistrer les Modifications' : 'Créer la Plante'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* DELETE CONFIRMATION MODAL                                    */}
        {/* ------------------------------------------------------------- */}
        {deleteConfirmId && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
          }}>
            <div style={{ background: 'white', borderRadius: '20px', padding: '2rem', maxWidth: '440px', width: '100%', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.25)' }}>
              <div style={{ width: '56px', height: '56px', background: '#FEF2F2', color: '#DC2626', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Trash2 size={28} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
                Confirmer la suppression ?
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Êtes-vous sûr de vouloir supprimer cette plante de la pépinière ? Cette action est irréversible.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button 
                  onClick={() => setDeleteConfirmId(null)}
                  className="btn-outline"
                  style={{ flex: 1 }}
                >
                  Annuler
                </button>
                <button 
                  onClick={() => handleDeleteProduct(deleteConfirmId)}
                  disabled={deleteLoading}
                  style={{
                    flex: 1, background: '#DC2626', color: 'white', border: 'none',
                    borderRadius: 'var(--radius-full)', padding: '0.7rem', fontWeight: 700, cursor: 'pointer'
                  }}
                >
                  {deleteLoading ? <RefreshCw size={18} className="spin" /> : 'Supprimer'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
