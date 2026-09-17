import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
  Sparkles, Mail, Lock, Eye, EyeOff,
  ArrowRight, AlertCircle, Zap, ShieldCheck,
  Brain, BarChart3, Briefcase, UserCheck, ShieldAlert,
} from 'lucide-react';
import FullscreenLoader from '../Components/FullscreenLoader';

/* ───────────────────────────────────────────────────────── */
/*  PARTICLE CANVAS                                          */
/* ───────────────────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth || window.innerWidth;
      canvas.height = canvas.offsetHeight || window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const COLORS = ['#2DD4BF', '#4F7CFF', '#8B5CF6', '#22D3EE'];
    const pts = Array.from({ length: 35 }, () => ({
      x: Math.random() * (canvas.width || 800),
      y: Math.random() * (canvas.height || 600),
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 0.6,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
      a: Math.random() * 0.4 + 0.15,
    }));

    const tick = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c; ctx.globalAlpha = p.a;
        ctx.fill(); ctx.globalAlpha = 1;
      });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = '#4F7CFF';
            ctx.globalAlpha = (1 - d / 110) * 0.12;
            ctx.lineWidth = 0.7;
            ctx.stroke(); ctx.globalAlpha = 1;
          }
        }
      }
      animId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', opacity: 0.6,
      }}
    />
  );
}

/* ───────────────────────────────────────────────────────── */
/*  LOGIN PAGE                                              */
/* ───────────────────────────────────────────────────────── */
export default function Login() {
  const [showPwd, setShowPwd] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/login');
  };

  const handleDemo = () => {
    setDemoLoading(true);
    router.post('/auth/demo', {}, {
      onFinish: () => setDemoLoading(false),
    });
  };

  const FEATURES = [
    { Icon: Brain,     color: '79,124,255',  label: 'Analisis CV dengan AI Senior HRD' },
    { Icon: BarChart3, color: '45,212,191',  label: 'Skor ATS & Rekomendasi Realtime' },
    { Icon: Briefcase, color: '139,92,246',  label: 'Job Matching 10.000+ Perusahaan' },
  ];

  return (
    <>
      <Head title="Masuk Akun — CareerAI" />
      <FullscreenLoader show={processing || demoLoading} message="Loading..." submessage="Menyiapkan akses akun CareerAI..." />

      {/* Full Page Container */}
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg,#060A1A 0%,#0A0D2E 35%,#090B1F 65%,#07091A 100%)',
        position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center',
      }}>

        {/* Ambient Blobs */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', top: '-12%', left: '-6%', width: 620, height: 620,
            background: 'radial-gradient(ellipse,rgba(79,124,255,.2) 0%,transparent 70%)',
            filter: 'blur(85px)', animation: 'loginBlobA 20s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', bottom: '-10%', right: '-5%', width: 680, height: 680,
            background: 'radial-gradient(ellipse,rgba(139,92,246,.18) 0%,transparent 70%)',
            filter: 'blur(100px)', animation: 'loginBlobB 25s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', top: '40%', left: '38%', width: 380, height: 380,
            background: 'radial-gradient(ellipse,rgba(45,212,191,.1) 0%,transparent 70%)',
            filter: 'blur(65px)', animation: 'loginBlobC 15s ease-in-out infinite',
          }} />
        </div>

        <ParticleCanvas />

        {/* Main Content Layout */}
        <div className="login-wrap" style={{
          position: 'relative', zIndex: 10, display: 'flex', width: '100%',
          maxWidth: 1100, margin: '0 auto', padding: '32px 24px', gap: 60,
          minHeight: '100vh', alignItems: 'center',
        }}>

          {/* LEFT SECTION — Brand Info */}
          <div className="login-left" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

            {/* Logo */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }} style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                background: 'linear-gradient(135deg,#14B8A6 0%,#4F7CFF 50%,#8B5CF6 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 28px rgba(45,212,191,.5)',
              }}>
                <Sparkles size={22} color="#fff" />
              </div>
              <div>
                <div className="logo-shimmer" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 900, fontSize: 26, letterSpacing: '-0.5px' }}>
                  CareerAI
                </div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 700, color: '#2DD4BF', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  Platform AI Intelligence Karier
                </div>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 40, fontWeight: 900, lineHeight: 1.15,
                letterSpacing: '-1.5px', color: '#F1F5F9', marginBottom: 14,
              }}>
              Karier Kamu,<br />
              <span className="logo-shimmer">Dianalisis Pintar oleh AI.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                fontFamily: "'Inter',sans-serif", fontSize: 15, color: '#64748B', lineHeight: 1.75,
                marginBottom: 32, maxWidth: 420,
              }}>
              Masuk ke akunmu untuk mengakses fitur analisis CV, simulasi wawancara, dan pencocokan lowongan kerja otomatis secara realtime.
            </motion.p>

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420 }}>
              {FEATURES.map(({ Icon, color, label }, i) => (
                <motion.div key={label}
                  initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.45 + i * 0.1 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '12px 16px', borderRadius: 14,
                    background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)',
                  }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: `rgba(${color},.15)`, border: `1px solid rgba(${color},.3)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={15} style={{ color: `rgb(${color})` }} />
                  </div>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500, color: '#CBD5E1' }}>
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* User Stat Badge */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
              style={{
                marginTop: 32, display: 'inline-flex', alignItems: 'center', gap: 10,
                background: 'rgba(45,212,191,.08)', border: '1px solid rgba(45,212,191,.22)',
                borderRadius: 99, padding: '10px 20px', width: 'fit-content',
              }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%', background: '#2DD4BF',
                boxShadow: '0 0 10px #2DD4BF', animation: 'loginPulse 2s ease-in-out infinite',
              }} />
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500, color: '#94A3B8' }}>
                <span style={{ color: '#2DD4BF', fontWeight: 700 }}>12.400+</span> Pengguna Aktif & Terkoneksi Database
              </span>
            </motion.div>
          </div>

          {/* RIGHT SECTION — Form Card */}
          <div className="login-right" style={{ width: 440, flexShrink: 0 }}>
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>

              {/* Shimmer Border Wrapper */}
              <div style={{
                background: 'linear-gradient(135deg,rgba(45,212,191,.35),rgba(79,124,255,.28),rgba(139,92,246,.32))',
                borderRadius: 28, padding: 1,
                boxShadow: '0 30px 80px rgba(0,0,0,.5),0 0 60px rgba(45,212,191,.08)',
              }}>
                <div className="login-card-inner" style={{
                  background: 'rgba(7,11,26,.94)',
                  backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
                  borderRadius: 27, padding: '34px 30px', position: 'relative', overflow: 'hidden',
                }}>

                  {/* Header */}
                  <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
                      style={{
                        width: 52, height: 52, borderRadius: 16, margin: '0 auto 12px',
                        background: 'linear-gradient(135deg,#14B8A6 0%,#4F7CFF 50%,#8B5CF6 100%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 28px rgba(45,212,191,.4)',
                      }}>
                      <UserCheck size={24} color="#fff" />
                    </motion.div>
                    <h2 style={{
                      fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 22, fontWeight: 900,
                      color: '#F1F5F9', marginBottom: 4, letterSpacing: '-0.4px',
                    }}>
                      Masuk ke Akun
                    </h2>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#64748B' }}>
                      Silakan masukkan kredensial akunmu di bawah ini
                    </p>
                  </div>

                  {/* 1-Click Demo Login */}
                  <div style={{ marginBottom: 18 }}>
                    <button type="button" onClick={handleDemo}
                      disabled={demoLoading || processing}
                      className="btn-demo-login">
                      {demoLoading
                        ? <span className="spin-demo" />
                        : <Zap size={14} />
                      }
                      <span>1-Click Instant Demo Login (Akses Juri)</span>
                    </button>
                  </div>

                  {/* Divider */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                    <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.07)' }} />
                    <span style={{
                      fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600,
                      color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em',
                    }}>
                      atau masuk via email
                    </span>
                    <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.07)' }} />
                  </div>

                  {/* PROMINENT ERROR ALERT BOX */}
                  {(errors.email || errors.password || errors.general) && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                      style={{
                        padding: '12px 14px', borderRadius: 12, marginBottom: 16,
                        background: 'rgba(239,68,68,.12)', border: '1px solid rgba(239,68,68,.4)',
                        color: '#FCA5A5', fontSize: 13, fontFamily: "'Inter',sans-serif",
                        display: 'flex', alignItems: 'flex-start', gap: 10,
                      }}>
                      <ShieldAlert size={18} style={{ flexShrink: 0, color: '#EF4444', marginTop: 1 }} />
                      <div>
                        <strong style={{ display: 'block', color: '#F87171', fontWeight: 700, marginBottom: 2 }}>
                          Gagal Masuk:
                        </strong>
                        {errors.email || errors.password || errors.general}
                      </div>
                    </motion.div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit}>

                    {/* Email Input */}
                    <div style={{ marginBottom: 14 }}>
                      <label style={{
                        display: 'block', fontFamily: "'Inter',sans-serif",
                        fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 6,
                        textTransform: 'uppercase', letterSpacing: '0.08em',
                      }}>
                        Alamat Email
                      </label>
                      <div style={{ position: 'relative' }}>
                        <Mail size={15} style={{
                          position: 'absolute', left: 14, top: '50%',
                          transform: 'translateY(-50%)', color: '#475569', pointerEvents: 'none',
                        }} />
                        <input
                          id="login-email"
                          type="email" required autoComplete="email"
                          value={data.email}
                          onChange={(e) => setData('email', e.target.value)}
                          placeholder="contoh: nama@email.com"
                          className="auth-input"
                        />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div style={{ marginBottom: 18 }}>
                      <label style={{
                        display: 'block', fontFamily: "'Inter',sans-serif",
                        fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 6,
                        textTransform: 'uppercase', letterSpacing: '0.08em',
                      }}>
                        Kata Sandi
                      </label>
                      <div style={{ position: 'relative' }}>
                        <Lock size={15} style={{
                          position: 'absolute', left: 14, top: '50%',
                          transform: 'translateY(-50%)', color: '#475569', pointerEvents: 'none',
                        }} />
                        <input
                          id="login-password"
                          type={showPwd ? 'text' : 'password'} required
                          autoComplete="current-password"
                          value={data.password}
                          onChange={(e) => setData('password', e.target.value)}
                          placeholder="••••••••"
                          className="auth-input pr-12"
                        />
                        <button type="button" onClick={() => setShowPwd(v => !v)}
                          style={{
                            position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                            background: 'none', border: 'none', cursor: 'pointer', color: '#475569',
                            display: 'flex', alignItems: 'center', padding: 0,
                          }}>
                          {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button id="login-submit" type="submit"
                      disabled={processing} className="btn-main-login">
                      {processing
                        ? <><span className="spin-ico" /> <span>Memeriksa Data...</span></>
                        : <><span>Masuk Sekarang</span> <ArrowRight size={16} /></>
                      }
                    </button>
                  </form>

                  {/* Register Switch */}
                  <div style={{ textAlign: 'center', marginTop: 20 }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#475569' }}>
                      Belum memiliki akun?{' '}
                    </span>
                    <Link href="/register" style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: 13, fontWeight: 700, color: '#2DD4BF', textDecoration: 'none',
                      borderBottom: '1px solid rgba(45,212,191,.3)', paddingBottom: 1,
                    }}>
                      Daftar Akun Baru →
                    </Link>
                  </div>

                  {/* SSL Protection Badge */}
                  <div style={{
                    marginTop: 16, padding: '9px 13px', borderRadius: 10,
                    background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.05)',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <ShieldCheck size={14} style={{ color: '#2DD4BF', flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#475569' }}>
                      Koneksi terenkripsi & terhubung langsung ke Database Laravel.
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Back to Home */}
            <div style={{ textAlign: 'center', marginTop: 18 }}>
              <Link href="/" style={{
                fontFamily: "'Inter',sans-serif", fontSize: 13,
                color: '#334155', textDecoration: 'none',
              }}>
                ← Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
