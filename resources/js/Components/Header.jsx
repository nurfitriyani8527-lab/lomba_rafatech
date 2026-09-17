import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthModal from './AuthModal';
import {
  Sparkles,
  Menu,
  X,
  LogIn,
  UserPlus,
  ChevronRight,
  LogOut,
  User,
  Zap,
  Upload,
  Briefcase,
  FileText,
  Brain,
  Map,
  BarChart3,
} from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [activeHash, setActiveHash] = useState('');

  const { url, props } = usePage();

  const isDashboard = url.startsWith('/dashboard') || url.startsWith('/cv-builder') || url.startsWith('/upload');
  const user = props.auth?.user || props.user || null;

  // Guest Landing Links (Matching exact Landing page sections)
  const GUEST_LINKS = [
    { label: 'Beranda', href: '/#hero' },
    { label: 'Alur Platform', href: '/#alur' },
    { label: 'Fitur Unggulan', href: '/#fitur' },
    { label: 'Teknologi AI', href: '/#ai-intelligence' },
    { label: 'Testimoni', href: '/#testimoni' },
  ];

  // Dashboard App Links
  const DASHBOARD_LINKS = [
    { label: 'Overview AI', href: '/dashboard?tab=overview', icon: Brain },
    { label: 'Analisis CV Dewa', href: '/analyze-cv', icon: BarChart3 },
    { label: 'Lowongan (24)', href: '/dashboard?tab=jobs', icon: Briefcase },
    { label: 'Roadmap Karir', href: '/dashboard?tab=roadmap', icon: Map },
    { label: 'ATS CV Builder', href: '/cv-builder', icon: FileText },
  ];

  const activeLinks = isDashboard ? DASHBOARD_LINKS : GUEST_LINKS;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash || '#hero');
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [url]);

  const handleNavClick = (e, href) => {
    if (!isDashboard && href.includes('#')) {
      const targetId = href.substring(href.indexOf('#'));
      const el = document.querySelector(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', targetId);
        setActiveHash(targetId);
      }
    }
  };

  const checkIsActive = (linkHref) => {
    if (isDashboard) {
      return url === linkHref;
    }
    if (linkHref === '/#hero' || linkHref === '/') {
      return !activeHash || activeHash === '#hero';
    }
    const hashPart = linkHref.substring(linkHref.indexOf('#'));
    return activeHash === hashPart;
  };

  const openLoginModal = () => {
    setAuthMode('login');
    setAuthModalOpen(true);
  };

  const openRegisterModal = () => {
    setAuthMode('register');
    setAuthModalOpen(true);
  };

  const handleLogout = () => {
    router.post('/logout');
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
          background: scrolled ? 'rgba(5,8,22,0.95)' : 'rgba(5,8,22,0.75)',
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
            <Link href={user ? "/dashboard" : "/"} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '11px' }}>
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
                  {isDashboard ? 'Workspace AI' : 'Platform Karier AI'}
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav Glass Pill ── */}
            <style>{`
              @keyframes shimmerSweepNav {
                0%   { transform: translateX(-120%) skewX(-15deg); }
                100% { transform: translateX(220%) skewX(-15deg); }
              }
              @keyframes shimmerDotGlow {
                0%, 100% { opacity: 0.6; transform: scale(1); box-shadow: 0 0 6px #2DD4BF; }
                50%      { opacity: 1; transform: scale(1.3); box-shadow: 0 0 12px #2DD4BF, 0 0 20px #4F7CFF; }
              }
              .nav-link-item {
                transition: all 0.25s ease;
                position: relative;
                overflow: hidden;
              }
              .nav-link-item:hover {
                box-shadow: 0 0 18px rgba(45,212,191,0.25) !important;
                border-color: rgba(45,212,191,0.4) !important;
                color: #2DD4BF !important;
              }
            `}</style>

            <nav className="desktop-nav" style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '99px', padding: '5px 8px',
              backdropFilter: 'blur(16px)',
            }}>
              {activeLinks.map(link => {
                const isActive = checkIsActive(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="nav-link-item"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '13px',
                      color: isActive ? '#2DD4BF' : '#CBD5E1',
                      textDecoration: 'none',
                      padding: '7px 16px',
                      borderRadius: '99px',
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(20,184,166,0.22) 0%, rgba(79,124,255,0.22) 50%, rgba(139,92,246,0.22) 100%)'
                        : 'transparent',
                      border: isActive ? '1px solid rgba(45,212,191,0.5)' : '1px solid transparent',
                      boxShadow: isActive ? '0 0 16px rgba(45,212,191,0.3), inset 0 0 12px rgba(45,212,191,0.15)' : 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px',
                    }}
                  >
                    {/* Active Shimmer Light Sweep */}
                    {isActive && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '99px',
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                          animation: 'shimmerSweepNav 2.8s ease-in-out infinite',
                          pointerEvents: 'none',
                        }}
                      />
                    )}

                    {/* Glowing Shimmer Dot */}
                    {isActive && (
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: '#2DD4BF',
                          animation: 'shimmerDotGlow 2s ease-in-out infinite',
                          display: 'inline-block',
                          flexShrink: 0,
                        }}
                      />
                    )}

                    {link.icon && <link.icon size={14} color={isActive ? '#2DD4BF' : '#94A3B8'} />}
                    <span className={isActive ? "shimmer-text" : ""}>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* ── Right Actions ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {user ? (
                /* Authenticated User Profile Pill (Clickable link to /dashboard) */
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Link href="/dashboard" style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(45,212,191,0.3)',
                    borderRadius: '99px', padding: '4px 14px 4px 6px',
                    textDecoration: 'none', cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: '0 0 15px rgba(45,212,191,0.15)'
                  }} title="Buka Dashboard Workspace">
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, #4F7CFF 0%, #14B8A6 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, fontSize: '12px', color: '#fff',
                    }}>
                      {user.name ? user.name.substring(0, 2).toUpperCase() : 'RD'}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '12px', color: '#F8FAFC' }}>
                        {user.name}
                      </span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '10px', color: '#2DD4BF' }}>
                        Dashboard Hub →
                      </span>
                    </div>
                  </Link>


                  <button
                    onClick={handleLogout}
                    title="Keluar"
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.25)',
                      borderRadius: '10px', padding: '8px', color: '#F87171',
                      cursor: 'pointer', transition: 'all 0.2s ease',
                    }}
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                /* Guest Mode Buttons */
                <>
                  <Link
                    href="/login"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '7px',
                      fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '13px',
                      color: '#CBD5E1', textDecoration: 'none',
                      padding: '8px 18px', borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.12)',
                      background: 'rgba(255,255,255,0.04)',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <LogIn size={15} /> Masuk
                  </Link>

                  <Link
                    href="/register"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '7px',
                      fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '13px',
                      color: '#fff', textDecoration: 'none',
                      padding: '9px 20px', borderRadius: '12px',
                      background: 'linear-gradient(135deg, #14B8A6 0%, #4F7CFF 100%)',
                      boxShadow: '0 0 20px rgba(45,212,191,0.35)',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <UserPlus size={15} /> Daftar Gratis
                  </Link>
                </>
              )}

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="mobile-menu-btn"
                style={{
                  display: 'none', background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px',
                  padding: '8px', color: '#F8FAFC', cursor: 'pointer',
                }}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              position: 'fixed', top: '72px', left: 0, right: 0, zIndex: 999,
              background: 'rgba(5, 8, 22, 0.98)', backdropFilter: 'blur(30px)',
              borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '20px 24px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activeLinks.map(link => {
                const isActive = checkIsActive(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      handleNavClick(e, link.href);
                      setMenuOpen(false);
                    }}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: isActive ? 700 : 600,
                      fontSize: '15px',
                      color: isActive ? '#2DD4BF' : '#CBD5E1',
                      textDecoration: 'none',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(20,184,166,0.2) 0%, rgba(79,124,255,0.2) 100%)'
                        : 'rgba(255,255,255,0.03)',
                      border: isActive ? '1px solid rgba(45,212,191,0.4)' : '1px solid rgba(255,255,255,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'space-between',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {isActive && (
                        <span
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: '#2DD4BF',
                            animation: 'shimmerDotGlow 2s ease-in-out infinite',
                            display: 'inline-block',
                          }}
                        />
                      )}
                      <span className={isActive ? "shimmer-text" : ""}>{link.label}</span>
                    </span>
                    <ChevronRight size={16} color="#2DD4BF" />
                  </Link>
                );
              })}
              {!user && (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '15px',
                      color: '#CBD5E1', textDecoration: 'none', padding: '12px',
                      borderRadius: '12px', background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <LogIn size={16} color="#94A3B8" /> Masuk
                    </span>
                    <ChevronRight size={16} color="#2DD4BF" />
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '15px',
                      color: '#fff', textDecoration: 'none', padding: '13px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #14B8A6 0%, #4F7CFF 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <UserPlus size={16} /> Daftar Gratis
                    </span>
                    <ChevronRight size={16} color="rgba(255,255,255,0.6)" />
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
