import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Menu,
  X,
  LogIn,
  UserPlus,
  ChevronRight,
  LogOut,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Zap,
  Award
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'Dashboard AI', to: '/dashboard', tab: 'overview' },
  { label: 'Buat CV (ATS)', to: '/cv-builder', tab: 'cv-builder' },
  { label: 'Analisis CV', to: '/dashboard', tab: 'overview' },
  { label: 'Lowongan (24)', to: '/dashboard', tab: 'jobs' },
  { label: 'Beranda', to: '/landing' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState(null); // 'login' | 'register' | null
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('careerai_user');
    return saved ? JSON.parse(saved) : { name: 'Rizki Dev', role: 'Backend Developer', score: 92, initial: 'RD' };
  });

  const [loginEmail, setLoginEmail] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const handleDemoLogin = () => {
    const user = { name: 'Rizki Dev', role: 'Backend Developer', score: 92, initial: 'RD' };
    setCurrentUser(user);
    localStorage.setItem('careerai_user', JSON.stringify(user));
    setAuthModal(null);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('careerai_user');
    setMenuOpen(false);
    navigate('/landing');
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}
      >
        <div style={{
          position: 'relative',
          background: scrolled ? 'rgba(5,8,22,0.94)' : 'rgba(5,8,22,0.68)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          boxShadow: scrolled
            ? '0 10px 40px rgba(0,0,0,0.6), 0 0 30px rgba(45,212,191,0.12)'
            : '0 4px 20px rgba(0,0,0,0.2)',
          transition: 'all 0.35s ease',
        }}>
          {/* Animated Top & Bottom Shimmer Border Line */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(45,212,191,0.5) 25%, rgba(79,124,255,0.7) 50%, rgba(139,92,246,0.6) 75%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmerText 4s linear infinite',
            }}
          />

          <div style={{
            maxWidth: '1200px', margin: '0 auto', padding: '0 24px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            height: '72px',
          }}>

            {/* ── Logo with Shimmer Glow ── */}
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '11px' }}>
              <div style={{
                position: 'relative', width: '38px', height: '38px', borderRadius: '11px',
                background: 'linear-gradient(135deg, #14B8A6 0%, #4F7CFF 50%, #8B5CF6 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 24px rgba(45,212,191,0.5), 0 0 10px rgba(79,124,255,0.4)',
              }}>
                <Sparkles size={19} color="#fff" />
                <div style={{
                  position: 'absolute', inset: -1, borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.3)', pointerEvents: 'none'
                }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="shimmer-text" style={{
                  fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                  fontWeight: 900, fontSize: '22px', letterSpacing: '-0.6px', lineHeight: 1.1,
                }}>
                  CareerAI
                </span>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '9px', fontWeight: 700, color: '#2DD4BF', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  Platform Karier AI
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav Glass Pill ── */}
            <nav className="desktop-nav" style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '99px', padding: '5px 8px',
              backdropFilter: 'blur(16px)',
            }}>
              {NAV_LINKS.map(link => (
                <Link key={link.label} to={link.to} state={link.tab ? { tab: link.tab } : undefined} style={{
                  fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '13.5px',
                  color: '#CBD5E1', textDecoration: 'none', padding: '8px 18px',
                  borderRadius: '99px', transition: 'all 0.25s ease',
                  position: 'relative',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#F8FAFC';
                    e.currentTarget.style.background = 'rgba(20,184,166,0.12)';
                    e.currentTarget.style.boxShadow = '0 0 16px rgba(45,212,191,0.2)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#CBD5E1';
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* ── Desktop Auth / User State ── */}
            <div className="desktop-auth" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {currentUser ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '6px 14px 6px 8px', borderRadius: '99px',
                    background: 'rgba(20,184,166,0.12)',
                    border: '1px solid rgba(45,212,191,0.4)',
                    boxShadow: '0 0 20px rgba(45,212,191,0.2)',
                  }}>
                    <div style={{
                      width: '30px', height: '30px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, #14B8A6, #4F7CFF)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: 800, color: '#fff',
                      boxShadow: '0 0 10px rgba(45,212,191,0.4)',
                    }}>
                      {currentUser.initial}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '13px', fontWeight: 700, color: '#F8FAFC', lineHeight: 1.1 }}>
                        {currentUser.name}
                      </span>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '10px', color: '#2DD4BF', fontWeight: 600 }}>
                        {currentUser.role} ({currentUser.score}%)
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    title="Keluar"
                    style={{
                      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '10px', padding: '9px 10px', color: '#94A3B8', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#F43F5E'; e.currentTarget.style.borderColor = 'rgba(244,63,94,0.4)'; e.currentTarget.style.background = 'rgba(244,63,94,0.1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                  >
                    <LogOut size={15} />
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setAuthModal('login')}
                    className="shimmer-btn-outline"
                    style={{ padding: '9px 20px', fontSize: '13.5px' }}
                  >
                    <LogIn size={15} />
                    Masuk
                  </button>

                  <button
                    onClick={() => setAuthModal('register')}
                    className="shimmer-btn-primary"
                    style={{ padding: '10px 22px', fontSize: '13.5px' }}
                  >
                    <UserPlus size={15} />
                    Daftar Gratis
                  </button>
                </>
              )}
            </div>

            {/* ── Mobile Hamburger Button ── */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
              style={{
                background: 'rgba(20,184,166,0.1)',
                border: '1px solid rgba(45,212,191,0.3)',
                borderRadius: '10px', width: '42px', height: '42px',
                display: 'none', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#2DD4BF',
                boxShadow: '0 0 16px rgba(45,212,191,0.2)',
                transition: 'all 0.2s ease',
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={menuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Drawer Dropdown ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              position: 'fixed', top: '80px', left: '14px', right: '14px', zIndex: 999,
              background: 'rgba(5,8,22,0.96)', backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(45,212,191,0.35)', borderRadius: '20px', padding: '16px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 30px rgba(45,212,191,0.2)',
            }}
            className="mobile-menu-dropdown"
          >
            {/* Shimmer accent line inside drawer */}
            <div style={{
              height: '2px', width: '100%', marginBottom: '14px', borderRadius: '99px',
              background: 'linear-gradient(90deg, #2DD4BF, #4F7CFF, #8B5CF6)',
            }} />

            {NAV_LINKS.map((link, i) => (
              <motion.div key={link.label} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                <Link to={link.to} state={link.tab ? { tab: link.tab } : undefined} onClick={() => setMenuOpen(false)} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '15px',
                  color: '#CBD5E1', textDecoration: 'none', padding: '12px 16px',
                  borderRadius: '12px', marginBottom: '6px',
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                  transition: 'all 0.2s ease',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#F8FAFC';
                    e.currentTarget.style.background = 'rgba(20,184,166,0.14)';
                    e.currentTarget.style.borderColor = 'rgba(45,212,191,0.3)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#CBD5E1';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  }}
                >
                  {link.label}
                  <ChevronRight size={16} color="#2DD4BF" />
                </Link>
              </motion.div>
            ))}

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '12px', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {currentUser ? (
                <button onClick={handleLogout} style={{
                  fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '15px',
                  color: '#F43F5E', border: '1px solid rgba(244,63,94,0.35)', background: 'rgba(244,63,94,0.12)',
                  padding: '13px 16px', borderRadius: '12px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}>
                  <LogOut size={16} /> Keluar ({currentUser.name})
                </button>
              ) : (
                <>
                  <button onClick={() => { setMenuOpen(false); setAuthModal('login'); }} className="shimmer-btn-outline" style={{ justifyContent: 'center', width: '100%', padding: '12px' }}>
                    <LogIn size={16} /> Masuk
                  </button>
                  <button onClick={() => { setMenuOpen(false); setAuthModal('register'); }} className="shimmer-btn-primary" style={{ justifyContent: 'center', width: '100%', padding: '13px' }}>
                    <UserPlus size={16} /> Daftar Gratis
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Glass Auth Modal ── */}
      <AnimatePresence>
        {authModal && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
            background: 'rgba(5, 8, 22, 0.8)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '100%', maxWidth: '420px',
                background: 'rgba(15, 23, 42, 0.94)',
                border: '1px solid rgba(45, 212, 191, 0.4)',
                borderRadius: '24px', padding: '32px',
                boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 40px rgba(45,212,191,0.2)',
                position: 'relative',
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setAuthModal(null)}
                style={{
                  position: 'absolute', top: '20px', right: '20px',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '50%', width: '34px', height: '34px',
                  color: '#94A3B8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <X size={16} />
              </button>

              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '16px', margin: '0 auto 14px',
                  background: 'linear-gradient(135deg, #14B8A6, #4F7CFF)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 28px rgba(45,212,191,0.45)',
                }}>
                  <Sparkles size={26} color="#fff" />
                </div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 900, fontSize: '22px', color: '#F8FAFC', margin: '0 0 6px' }}>
                  {authModal === 'login' ? 'Selamat Datang Kembali' : 'Buat Akun CareerAI'}
                </h3>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '13px', color: '#94A3B8', margin: 0 }}>
                  {authModal === 'login' ? 'Masuk untuk mengelola analisis CV & rekomendasi kariermu' : 'Daftar 100% gratis tanpa biaya tersembunyi'}
                </p>
              </div>

              {/* Instant Demo Sign-In */}
              <div style={{ marginBottom: '20px' }}>
                <button
                  onClick={handleDemoLogin}
                  style={{
                    width: '100%', padding: '13px 16px', borderRadius: '14px',
                    background: 'rgba(20,184,166,0.14)', border: '1px solid rgba(45,212,191,0.45)',
                    color: '#2DD4BF', fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: '14px',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    boxShadow: '0 0 24px rgba(45,212,191,0.25)', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(20,184,166,0.22)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(20,184,166,0.14)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <ShieldCheck size={17} /> Instant Demo Sign-In (Rizki Dev)
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0', color: '#64748B', fontSize: '12px' }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                <span>atau masukan email</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
              </div>

              <form onSubmit={e => { e.preventDefault(); handleDemoLogin(); }}>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontFamily: "'Inter',sans-serif", fontSize: '12px', fontWeight: 600, color: '#CBD5E1', marginBottom: '6px' }}>Email</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} color="#64748B" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="email"
                      required
                      placeholder="nama@email.com"
                      value={loginEmail}
                      onChange={e => setLoginEmail(e.target.value)}
                      style={{
                        width: '100%', boxSizing: 'border-box', padding: '12px 14px 12px 42px',
                        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '10px', color: '#F8FAFC', fontFamily: "'Inter',sans-serif", fontSize: '14px',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontFamily: "'Inter',sans-serif", fontSize: '12px', fontWeight: 600, color: '#CBD5E1', marginBottom: '6px' }}>Password</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={16} color="#64748B" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      style={{
                        width: '100%', boxSizing: 'border-box', padding: '12px 14px 12px 42px',
                        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '10px', color: '#F8FAFC', fontFamily: "'Inter',sans-serif", fontSize: '14px',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="shimmer-btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '13px' }}
                >
                  {authModal === 'login' ? 'Masuk Sekarang' : 'Daftar Akun Baru'} <ArrowRight size={16} />
                </button>
              </form>

              <div style={{ marginTop: '20px', textAlign: 'center', fontFamily: "'Inter',sans-serif", fontSize: '13px', color: '#94A3B8' }}>
                {authModal === 'login' ? (
                  <>Belum punya akun? <button onClick={() => setAuthModal('register')} style={{ background: 'none', border: 'none', color: '#2DD4BF', fontWeight: 700, cursor: 'pointer', padding: 0 }}>Daftar Gratis</button></>
                ) : (
                  <>Sudah punya akun? <button onClick={() => setAuthModal('login')} style={{ background: 'none', border: 'none', color: '#2DD4BF', fontWeight: 700, cursor: 'pointer', padding: 0 }}>Masuk</button></>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav  { display: none !important; }
          .desktop-auth { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-dropdown { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default Header;


