import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
  Sparkles, Mail, Lock, User as UserIcon,
  Eye, EyeOff, ArrowRight, ShieldCheck,
  Zap, Star, Gift, Target, CheckCircle2, ShieldAlert,
  UserCheck, Briefcase, UserCircle,
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

    const COLS = ['#8B5CF6', '#4F7CFF', '#2DD4BF', '#EC4899', '#F59E0B'];
    const pts = Array.from({ length: 38 }, () => ({
      x: Math.random() * (canvas.width || 800),
      y: Math.random() * (canvas.height || 600),
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 0.6,
      c: COLS[Math.floor(Math.random() * COLS.length)],
      a: Math.random() * 0.4 + 0.12,
    }));

    const tick = () => {
      const W = canvas.width; const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
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
            ctx.strokeStyle = '#8B5CF6';
            ctx.globalAlpha = (1 - d / 110) * 0.1;
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
    <canvas ref={canvasRef} style={{
      position: 'absolute', inset: 0, width: '100%', height: '100%',
      pointerEvents: 'none', opacity: 0.6,
    }} />
  );
}

/* ── Password Strength Component ── */
function PasswordStrength({ password }) {
  if (!password) return null;
  const checks = [
    { label: 'Min. 8 karakter', ok: password.length >= 8 },
    { label: 'Huruf besar', ok: /[A-Z]/.test(password) },
    { label: 'Angka', ok: /\d/.test(password) },
  ];
  const score = checks.filter((c) => c.ok).length;
  const barColors = ['#EF4444', '#F59E0B', '#2DD4BF'];
  const labelText = ['Sandi Lemah', 'Sandi Sedang', 'Sandi Kuat'];

  return (
    <div style={{ marginTop: 9 }}>
      <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 99,
            background: i < score ? barColors[score - 1] : 'rgba(255,255,255,.08)',
            transition: 'background .3s',
          }} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          fontFamily: "'Inter',sans-serif", fontSize: 11,
          color: score > 0 ? barColors[score - 1] : '#475569', fontWeight: 600,
        }}>
          {score > 0 ? labelText[score - 1] : ''}
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          {checks.map((c) => (
            <span key={c.label} style={{
              fontFamily: "'Inter',sans-serif", fontSize: 10,
              color: c.ok ? '#2DD4BF' : '#475569',
              display: 'flex', alignItems: 'center', gap: 3,
            }}>
              <CheckCircle2 size={10} style={{ color: c.ok ? '#2DD4BF' : '#475569' }} />
              {c.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────── */
/*  REGISTER PAGE                                           */
/* ───────────────────────────────────────────────────────── */
export default function Register() {
  const [step, setStep] = useState(1);
  const [showPwd, setShowPwd] = useState(false);
  const [customSkill, setCustomSkill] = useState('');
  const [stepError, setStepError] = useState('');

  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    role: 'user',
    education: 'S1 Teknik Informatika',
    experience_level: 'Fresh Graduate',
    target_role: 'Backend Developer',
    skills_list: ['PHP', 'Laravel', 'MySQL', 'React', 'Git'],
  });

  const POPULAR_SKILLS = [
    'PHP', 'Laravel', 'MySQL', 'React', 'JavaScript', 'TypeScript',
    'Node.js', 'Python', 'Docker', 'Redis', 'Git', 'Tailwind CSS',
  ];

  const TARGET_ROLES = [
    { id: 'Backend Developer', title: 'Backend Dev', icon: '💻' },
    { id: 'Frontend Developer', title: 'Frontend Dev', icon: '🎨' },
    { id: 'Full Stack Developer', title: 'Full Stack Dev', icon: '⚡' },
    { id: 'Mobile App Developer', title: 'Mobile Dev', icon: '📱' },
    { id: 'UI/UX Designer', title: 'UI/UX Designer', icon: '✨' },
    { id: 'AI / Data Engineer', title: 'AI / Data Dev', icon: '🤖' },
  ];

  const toggleSkill = (skill) => {
    const current = Array.isArray(data.skills_list) ? data.skills_list : [];
    if (current.includes(skill)) {
      setData('skills_list', current.filter(s => s !== skill));
    } else {
      setData('skills_list', [...current, skill]);
    }
  };

  const handleAddCustomSkill = (e) => {
    e.preventDefault();
    const trimmed = customSkill.trim();
    const current = Array.isArray(data.skills_list) ? data.skills_list : [];
    if (trimmed && !current.includes(trimmed)) {
      setData('skills_list', [...current, trimmed]);
      setCustomSkill('');
    }
  };

  const handleNextStep1 = () => {
    setStepError('');
    if (!data.name || !data.email || !data.password) {
      setStepError('Silakan isi Nama, Email, dan Kata Sandi terlebih dahulu.');
      return;
    }
    if (data.password.length < 8) {
      setStepError('Kata sandi minimal 8 karakter.');
      return;
    }
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/register');
  };

  const BENEFITS = [
    { Icon: Zap,    rgb: '45,212,191', title: 'Analisis CV Instan & AI HRD', sub: 'Upload CV, AI analisis otomatis dalam hitungan detik' },
    { Icon: Target, rgb: '79,124,255', title: 'Pencocokan Lowongan Kerja',    sub: 'Dapatkan rekomendasi lowongan sesuai keahlianmu' },
    { Icon: Gift,   rgb: '139,92,246', title: 'Selamanya Gratis untuk User',   sub: 'Akses penuh ke semua fitur tanpa biaya tersembunyi' },
  ];

  const ROLES = [
    { id: 'user',      title: 'Pencari Kerja / User', desc: 'Akses analisis CV, simulasi & job matching' },
    { id: 'jobseeker', title: 'Fresh Graduate',       desc: 'Panduan karier & ATS CV builder gratis' },
    { id: 'hrd',       title: 'HRD / Recruiter',      desc: 'Posting & analisis kandidat otomatis' },
  ];

  return (
    <>
      <Head title="Daftar Akun Baru — CareerAI" />
      <FullscreenLoader show={processing} message="Loading..." submessage="Mendaftarkan akun ke database CareerAI..." />

      {/* Full Page Container */}
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg,#06091A 0%,#0D0B2E 30%,#080A1F 65%,#06091A 100%)',
        position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center',
      }}>

        {/* Blobs */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', top: '-14%', right: '-6%', width: 640, height: 640,
            background: 'radial-gradient(ellipse,rgba(139,92,246,.2) 0%,transparent 70%)',
            filter: 'blur(90px)', animation: 'regBlobA 22s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', bottom: '-10%', left: '-5%', width: 610, height: 610,
            background: 'radial-gradient(ellipse,rgba(79,124,255,.17) 0%,transparent 70%)',
            filter: 'blur(100px)', animation: 'regBlobB 26s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', top: '48%', right: '30%', width: 360, height: 360,
            background: 'radial-gradient(ellipse,rgba(45,212,191,.09) 0%,transparent 70%)',
            filter: 'blur(60px)', animation: 'regBlobC 16s ease-in-out infinite',
          }} />
        </div>

        <ParticleCanvas />

        {/* Layout Container */}
        <div className="reg-wrap" style={{
          position: 'relative', zIndex: 10, display: 'flex', width: '100%',
          maxWidth: 1100, margin: '0 auto', padding: '32px 24px', gap: 60,
          minHeight: '100vh', alignItems: 'center',
        }}>

          {/* LEFT SECTION */}
          <div className="reg-left" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

            {/* Logo */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }} style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 13, flexShrink: 0,
                background: 'linear-gradient(135deg,#8B5CF6 0%,#4F7CFF 50%,#14B8A6 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 26px rgba(139,92,246,.52)',
              }}>
                <Sparkles size={21} color="#fff" />
              </div>
              <div>
                <div className="reg-logo-shimmer" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 900, fontSize: 25, letterSpacing: '-0.5px' }}>
                  CareerAI
                </div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 700, color: '#8B5CF6', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  Platform Karier AI
                </div>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 38, fontWeight: 900, lineHeight: 1.15,
                letterSpacing: '-1.5px', color: '#F1F5F9', marginBottom: 14,
              }}>
              Daftar Akun Baru &<br />
              Raih Impian Kariermu<br />
              <span className="reg-logo-shimmer">Bersama CareerAI.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                fontFamily: "'Inter',sans-serif", fontSize: 14, color: '#64748B', lineHeight: 1.75,
                marginBottom: 28, maxWidth: 400,
              }}>
              Bergabung dengan 12.000+ pengguna dan buktikan keandalan AI analisis karier berbasis database realtime.
            </motion.p>

            {/* Benefits List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 410 }}>
              {BENEFITS.map(({ Icon, rgb, title, sub }, i) => (
                <motion.div key={title}
                  initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 14,
                    padding: '13px 15px', borderRadius: 13,
                    background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)',
                  }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: `rgba(${rgb},.15)`, border: `1px solid rgba(${rgb},.3)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={15} style={{ color: `rgb(${rgb})` }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 700, color: '#CBD5E1', marginBottom: 2 }}>
                      {title}
                    </div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#475569' }}>
                      {sub}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Rating */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              style={{ marginTop: 30, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ display: 'flex', gap: 3 }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#F59E0B" style={{ color: '#F59E0B' }} />
                ))}
              </div>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#475569' }}>
                <span style={{ color: '#CBD5E1', fontWeight: 600 }}>4.9/5</span> dari 3.200+ pengguna terverifikasi
              </span>
            </motion.div>
          </div>

          {/* RIGHT SECTION — Form Card */}
          <div className="reg-right" style={{ width: 440, flexShrink: 0 }}>
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>

              {/* Card Container */}
              <div style={{
                background: 'linear-gradient(135deg,rgba(139,92,246,.32),rgba(79,124,255,.28),rgba(45,212,191,.25))',
                borderRadius: 28, padding: 1,
                boxShadow: '0 30px 80px rgba(0,0,0,.5),0 0 60px rgba(139,92,246,.08)',
              }}>
                <div className="reg-card-inner" style={{
                  background: 'rgba(7,11,26,.94)',
                  backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
                  borderRadius: 27, padding: '26px 24px', position: 'relative', overflow: 'hidden',
                }}>

                  {/* STEP INDICATOR HEADER */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.08)',
                  }}>
                    <div style={{ display: 'flex', itemsCenter: 'center', gap: 8 }}>
                      <div style={{
                        width: 24, height: 24, borderRadius: 8,
                        background: 'linear-gradient(135deg,#8B5CF6,#14B8A6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, fontWeight: 900, color: '#fff',
                      }}>
                        {step}
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 900, color: '#8B5CF6', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                          LANGKAH {step} DARI 3 • REGISTRASI & AI
                        </div>
                        <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, fontWeight: 800, color: '#F1F5F9' }}>
                          {step === 1 && 'Akun & Peran Pengguna'}
                          {step === 2 && 'Pendidikan & Level Pengalaman'}
                          {step === 3 && 'Target Role & Keahlian (Skills)'}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 5 }}>
                      {[1, 2, 3].map((s) => (
                        <div key={s} style={{
                          width: 8, height: 8, borderRadius: 99,
                          background: s === step ? '#8B5CF6' : s < step ? '#14B8A6' : 'rgba(255,255,255,0.15)',
                          boxShadow: s === step ? '0 0 10px rgba(139,92,246,0.8)' : 'none',
                          transition: 'all .3s',
                        }} />
                      ))}
                    </div>
                  </div>

                  {/* PROMINENT ERROR ALERT BOX */}
                  {(errors.name || errors.email || errors.password || errors.general || stepError) && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                      style={{
                        padding: '10px 12px', borderRadius: 12, marginBottom: 14,
                        background: 'rgba(239,68,68,.12)', border: '1px solid rgba(239,68,68,.4)',
                        color: '#FCA5A5', fontSize: 12, fontFamily: "'Inter',sans-serif",
                        display: 'flex', alignItems: 'flex-start', gap: 8,
                      }}>
                      <ShieldAlert size={16} style={{ flexShrink: 0, color: '#EF4444', marginTop: 1 }} />
                      <div>
                        {errors.name || errors.email || errors.password || errors.general || stepError}
                      </div>
                    </motion.div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit}>

                    {/* ════════════════════════════════════════════════════ */}
                    {/* STEP 1: Akun & Role */}
                    {/* ════════════════════════════════════════════════════ */}
                    {step === 1 && (
                      <div>
                        {/* Role Selection */}
                        <div style={{ marginBottom: 12 }}>
                          <label style={{
                            display: 'block', fontFamily: "'Inter',sans-serif",
                            fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 6,
                            textTransform: 'uppercase', letterSpacing: '0.08em',
                          }}>
                            Pilih Peran / Role Akun
                          </label>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                            {ROLES.slice(0, 2).map((r) => (
                              <button
                                type="button" key={r.id}
                                onClick={() => setData('role', r.id)}
                                style={{
                                  padding: '9px 11px', borderRadius: 12, border: '1px solid',
                                  borderColor: data.role === r.id ? '#8B5CF6' : 'rgba(255,255,255,.08)',
                                  background: data.role === r.id ? 'rgba(139,92,246,.15)' : 'rgba(255,255,255,.03)',
                                  color: data.role === r.id ? '#C4B5FD' : '#94A3B8',
                                  cursor: 'pointer', textAlign: 'left', transition: 'all .2s',
                                  display: 'flex', alignItems: 'center', gap: 8,
                                }}>
                                <UserCheck size={14} style={{ color: data.role === r.id ? '#8B5CF6' : '#64748B' }} />
                                <div>
                                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 700 }}>
                                    {r.title}
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Name Input */}
                        <div style={{ marginBottom: 12 }}>
                          <label style={{
                            display: 'block', fontFamily: "'Inter',sans-serif",
                            fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 6,
                            textTransform: 'uppercase', letterSpacing: '0.08em',
                          }}>
                            Nama Lengkap
                          </label>
                          <div style={{ position: 'relative' }}>
                            <UserIcon size={14} style={{
                              position: 'absolute', left: 14, top: '50%',
                              transform: 'translateY(-50%)', color: '#475569', pointerEvents: 'none',
                            }} />
                            <input
                              id="reg-name" type="text" required autoComplete="name"
                              value={data.name}
                              onChange={(e) => setData('name', e.target.value)}
                              placeholder="Nama lengkap kamu"
                              className="reg-input"
                            />
                          </div>
                        </div>

                        {/* Email Input */}
                        <div style={{ marginBottom: 12 }}>
                          <label style={{
                            display: 'block', fontFamily: "'Inter',sans-serif",
                            fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 6,
                            textTransform: 'uppercase', letterSpacing: '0.08em',
                          }}>
                            Alamat Email
                          </label>
                          <div style={{ position: 'relative' }}>
                            <Mail size={14} style={{
                              position: 'absolute', left: 14, top: '50%',
                              transform: 'translateY(-50%)', color: '#475569', pointerEvents: 'none',
                            }} />
                            <input
                              id="reg-email" type="email" required autoComplete="email"
                              value={data.email}
                              onChange={(e) => setData('email', e.target.value)}
                              placeholder="contoh: nama@email.com"
                              className="reg-input"
                            />
                          </div>
                        </div>

                        {/* Password Input */}
                        <div style={{ marginBottom: 16 }}>
                          <label style={{
                            display: 'block', fontFamily: "'Inter',sans-serif",
                            fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 6,
                            textTransform: 'uppercase', letterSpacing: '0.08em',
                          }}>
                            Kata Sandi
                          </label>
                          <div style={{ position: 'relative' }}>
                            <Lock size={14} style={{
                              position: 'absolute', left: 14, top: '50%',
                              transform: 'translateY(-50%)', color: '#475569', pointerEvents: 'none',
                            }} />
                            <input
                              id="reg-password" type={showPwd ? 'text' : 'password'}
                              required minLength={8} autoComplete="new-password"
                              value={data.password}
                              onChange={(e) => setData('password', e.target.value)}
                              placeholder="Minimal 8 karakter"
                              className="reg-input"
                              style={{ paddingRight: 46 }}
                            />
                            <button type="button" onClick={() => setShowPwd(v => !v)}
                              style={{
                                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                                background: 'none', border: 'none', cursor: 'pointer', color: '#475569',
                                display: 'flex', alignItems: 'center', padding: 0,
                              }}>
                              {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                            </button>
                          </div>
                          <PasswordStrength password={data.password} />
                        </div>

                        {/* Step 1 Next Button */}
                        <button
                          type="button"
                          onClick={handleNextStep1}
                          className="btn-reg"
                          style={{ marginTop: 8 }}
                        >
                          <span>Lanjut ke Langkah 2 (Pendidikan)</span> <ArrowRight size={16} />
                        </button>
                      </div>
                    )}

                    {/* ════════════════════════════════════════════════════ */}
                    {/* STEP 2: Pendidikan & Level Karir */}
                    {/* ════════════════════════════════════════════════════ */}
                    {step === 2 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {/* Status / Level Karir */}
                        <div>
                          <label style={{
                            display: 'block', fontFamily: "'Inter',sans-serif",
                            fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 6,
                            textTransform: 'uppercase', letterSpacing: '0.08em',
                          }}>
                            Status / Level Karir Saat Ini
                          </label>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                            {['Fresh Graduate', 'Mahasiswa Active', 'Junior Level (0-2 Thn)', 'Mid-Level (2-5 Thn)', 'Senior Level (5+ Thn)'].map((lvl) => (
                              <button
                                key={lvl}
                                type="button"
                                onClick={() => setData('experience_level', lvl)}
                                style={{
                                  padding: '9px 10px', borderRadius: 12, border: '1px solid',
                                  borderColor: data.experience_level === lvl ? '#14B8A6' : 'rgba(255,255,255,.08)',
                                  background: data.experience_level === lvl ? 'rgba(20,184,166,.15)' : 'rgba(255,255,255,.03)',
                                  color: data.experience_level === lvl ? '#2DD4BF' : '#94A3B8',
                                  cursor: 'pointer', textAlign: 'left', fontSize: 11, fontWeight: 700,
                                  transition: 'all .2s',
                                }}
                              >
                                {lvl}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Pendidikan Terakhir */}
                        <div>
                          <label style={{
                            display: 'block', fontFamily: "'Inter',sans-serif",
                            fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 6,
                            textTransform: 'uppercase', letterSpacing: '0.08em',
                          }}>
                            Pendidikan Terakhir / Sedang Ditempuh
                          </label>
                          <select
                            value={data.education}
                            onChange={(e) => setData('education', e.target.value)}
                            style={{
                              width: '100%', padding: '11px 14px', borderRadius: 12,
                              background: '#0B1128', border: '1px solid rgba(255,255,255,.12)',
                              color: '#F8FAFC', fontSize: 12, fontWeight: 600, outline: 'none',
                            }}
                          >
                            <option value="S1 Teknik Informatika">S1 Teknik Informatika / Ilmu Komputer</option>
                            <option value="S1 Sistem Informasi">S1 Sistem Informasi / Teknologi Informasi</option>
                            <option value="D3 Teknik Komputer">D3 Teknik / Manajamen Komputer</option>
                            <option value="SMA / SMK Rekayasa Perangkat Lunak">SMA / SMK (RPL / TKJ / Umum)</option>
                            <option value="S1 Non-IT / Otodidak">S1 Non-IT / Belajar Otodidak</option>
                            <option value="S2 / Pascasarjana">S2 / Pascasarjana</option>
                          </select>
                        </div>

                        {/* Step 2 Controls */}
                        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            style={{
                              padding: '11px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.06)',
                              border: '1px solid rgba(255,255,255,0.1)', color: '#CBD5E1', fontSize: 12,
                              fontWeight: 700, cursor: 'pointer',
                            }}
                          >
                            ← Kembali
                          </button>
                          <button
                            type="button"
                            onClick={() => setStep(3)}
                            className="btn-reg"
                            style={{ flex: 1 }}
                          >
                            <span>Lanjut ke Langkah 3 (Skill)</span> <ArrowRight size={16} />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* ════════════════════════════════════════════════════ */}
                    {/* STEP 3: Target Role & Skills */}
                    {/* ════════════════════════════════════════════════════ */}
                    {step === 3 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {/* Target Role Selector */}
                        <div>
                          <label style={{
                            display: 'block', fontFamily: "'Inter',sans-serif",
                            fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 6,
                            textTransform: 'uppercase', letterSpacing: '0.08em',
                          }}>
                            Target Role / Posisi Impian
                          </label>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                            {TARGET_ROLES.map((r) => (
                              <button
                                key={r.id}
                                type="button"
                                onClick={() => setData('target_role', r.id)}
                                style={{
                                  padding: '8px 10px', borderRadius: 10, border: '1px solid',
                                  borderColor: data.target_role === r.id ? '#8B5CF6' : 'rgba(255,255,255,.08)',
                                  background: data.target_role === r.id ? 'rgba(139,92,246,.2)' : 'rgba(255,255,255,.03)',
                                  color: data.target_role === r.id ? '#C4B5FD' : '#94A3B8',
                                  cursor: 'pointer', textAlign: 'left', fontSize: 11, fontWeight: 700,
                                  display: 'flex', alignItems: 'center', gap: 6,
                                }}
                              >
                                <span>{r.icon}</span>
                                <span>{r.title}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Select Skills */}
                        <div>
                          <label style={{
                            display: 'block', fontFamily: "'Inter',sans-serif",
                            fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 6,
                            textTransform: 'uppercase', letterSpacing: '0.08em',
                          }}>
                            Keahlian / Skill ({Array.isArray(data.skills_list) ? data.skills_list.length : 0} Terpilih)
                          </label>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 8, maxHeight: 90, overflowY: 'auto' }}>
                            {POPULAR_SKILLS.map((sk) => {
                              const isSelected = Array.isArray(data.skills_list) && data.skills_list.includes(sk);
                              return (
                                <button
                                  key={sk}
                                  type="button"
                                  onClick={() => toggleSkill(sk)}
                                  style={{
                                    padding: '4px 9px', borderRadius: 8, border: '1px solid',
                                    borderColor: isSelected ? '#14B8A6' : 'rgba(255,255,255,.08)',
                                    background: isSelected ? 'rgba(20,184,166,.2)' : 'rgba(255,255,255,.03)',
                                    color: isSelected ? '#2DD4BF' : '#94A3B8',
                                    cursor: 'pointer', fontSize: 10, fontWeight: 700,
                                  }}
                                >
                                  {isSelected ? '✓ ' : '+ '}{sk}
                                </button>
                              );
                            })}
                          </div>

                          {/* Custom Skill Input */}
                          <div style={{ display: 'flex', gap: 6 }}>
                            <input
                              type="text"
                              value={customSkill}
                              onChange={(e) => setCustomSkill(e.target.value)}
                              placeholder="+ Tambah skill lain"
                              style={{
                                flex: 1, padding: '7px 10px', borderRadius: 8,
                                background: '#0B1128', border: '1px solid rgba(255,255,255,.12)',
                                color: '#F8FAFC', fontSize: 11, outline: 'none',
                              }}
                            />
                            <button
                              type="button"
                              onClick={handleAddCustomSkill}
                              style={{
                                padding: '7px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.08)',
                                border: '1px solid rgba(255,255,255,0.12)', color: '#F8FAFC',
                                fontSize: 11, fontWeight: 700, cursor: 'pointer',
                              }}
                            >
                              Tambah
                            </button>
                          </div>
                        </div>

                        {/* Step 3 Submit Buttons */}
                        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            style={{
                              padding: '11px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.06)',
                              border: '1px solid rgba(255,255,255,0.1)', color: '#CBD5E1', fontSize: 12,
                              fontWeight: 700, cursor: 'pointer',
                            }}
                          >
                            ← Kembali
                          </button>
                          <button
                            id="register-submit"
                            type="submit"
                            disabled={processing}
                            className="btn-reg"
                            style={{ flex: 1 }}
                          >
                            {processing
                              ? <><span className="reg-spin" /> <span>Menyimpan ke Database...</span></>
                              : <><span>Daftar Sekarang — Gratis!</span> <ArrowRight size={16} /></>
                            }
                          </button>
                        </div>
                      </div>
                    )}

                  </form>

                  {/* Switch to Login */}
                  <div style={{ textAlign: 'center', marginTop: 18 }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#475569' }}>
                      Sudah memiliki akun?{' '}
                    </span>
                    <Link href="/login" style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: 13, fontWeight: 700, color: '#8B5CF6', textDecoration: 'none',
                      borderBottom: '1px solid rgba(139,92,246,.3)', paddingBottom: 1,
                    }}>
                      Masuk Ke Akun →
                    </Link>
                  </div>

                  {/* Security Badge */}
                  <div style={{
                    marginTop: 14, padding: '9px 13px', borderRadius: 10,
                    background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.05)',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <ShieldCheck size={14} style={{ color: '#8B5CF6', flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#475569' }}>
                      Data onboarding & profil otomatis tersimpan di database.
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Back Home Link */}
            <div style={{ textAlign: 'center', marginTop: 16 }}>
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
