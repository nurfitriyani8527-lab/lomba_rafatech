import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Mail, Lock, User as UserIcon,
  Eye, EyeOff, ArrowRight, ArrowLeft, ShieldCheck,
  Zap, Star, Gift, Target, CheckCircle2, ShieldAlert,
  Briefcase, Cpu, Check, Rocket,
  GraduationCap, Globe, Brain, MapPin, HeartHandshake,
  MessageSquare, Layers, Award, Terminal, Compass
} from 'lucide-react';
import FullscreenLoader from '../Components/FullscreenLoader';

/* ───────────────────────────────────────────────────────── */
/*  PARTICLE CANVAS BACKGROUND                               */
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
    const pts = Array.from({ length: 42 }, () => ({
      x: Math.random() * (canvas.width || 800),
      y: Math.random() * (canvas.height || 600),
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 2.2 + 0.6,
      c: COLS[Math.floor(Math.random() * COLS.length)],
      a: Math.random() * 0.4 + 0.15,
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
          if (d < 115) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = '#8B5CF6';
            ctx.globalAlpha = (1 - d / 115) * 0.12;
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

/* ───────────────────────────────────────────────────────── */
/*  PASSWORD STRENGTH METER                                  */
/* ───────────────────────────────────────────────────────── */
function PasswordStrength({ password }) {
  if (!password) return null;
  const checks = [
    { label: 'Min. 8 Karakter', ok: password.length >= 8 },
    { label: 'Huruf Besar', ok: /[A-Z]/.test(password) },
    { label: 'Angka/Simbol', ok: /[\d\W]/.test(password) },
  ];
  const score = checks.filter((c) => c.ok).length;
  const barColors = ['#EF4444', '#F59E0B', '#2DD4BF'];
  const labelText = ['Sandi Lemah', 'Sandi Sedang', 'Sandi Kuat & Aman'];

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: 'flex', gap: 4, marginBottom: 5 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 99,
            background: i < score ? barColors[score - 1] : 'rgba(255,255,255,.08)',
            transition: 'background .3s ease',
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
/*  MAIN STEP-BY-STEP REGISTER COMPONENT                     */
/* ───────────────────────────────────────────────────────── */
export default function Register() {
  const [step, setStep] = useState(1);
  const [showPwd, setShowPwd] = useState(false);
  const [customSkill, setCustomSkill] = useState('');
  const [stepError, setStepError] = useState('');
  const [cityLocation, setCityLocation] = useState('Jakarta, Indonesia');
  const [workMode, setWorkMode] = useState('Remote / Overseas');

  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    role: 'user',
    education: 'S1 Teknik Informatika / Ilmu Komputer',
    experience_level: 'Fresh Graduate',
    target_role: 'Backend Developer',
    skills_list: ['PHP', 'Laravel', 'MySQL', 'REST API', 'Git', 'React'],
    career_goal: 'Saya ingin fokus menjadi Backend Developer profesional, siap kerja remote, dan membangun portofolio berstandar ATS.',
    work_mode: 'Remote / Overseas',
  });

  const POPULAR_SKILLS = [
    'PHP', 'Laravel', 'MySQL', 'React', 'JavaScript', 'TypeScript',
    'Node.js', 'Python', 'Docker', 'Redis', 'Git', 'Tailwind CSS',
    'PostgreSQL', 'Flutter', 'Figma', 'REST API', 'Unit Testing', 'CI/CD'
  ];

  const TARGET_ROLES = [
    { id: 'Backend Developer', title: 'Backend Dev', icon: '💻', desc: 'Laravel, Node.js, Python, SQL' },
    { id: 'Frontend Developer', title: 'Frontend Dev', icon: '🎨', desc: 'React, Vue, Tailwind, JS/TS' },
    { id: 'Full Stack Developer', title: 'Full Stack Dev', icon: '⚡', desc: 'Laravel + React / Node.js' },
    { id: 'Mobile App Developer', title: 'Mobile Dev', icon: '📱', desc: 'Flutter, React Native, Dart' },
    { id: 'UI/UX Designer', title: 'UI/UX Designer', icon: '✨', desc: 'Figma, Wireframes, Prototyping' },
    { id: 'AI / Data Engineer', title: 'AI / Data Dev', icon: '🤖', desc: 'Python, ML, SQL, Pandas' },
    { id: 'DevOps Engineer', title: 'DevOps Dev', icon: '☁️', desc: 'Docker, CI/CD, Linux, AWS' },
  ];

  const CURHAT_PRESETS = [
    "Saya baru lulus (Fresh Graduate) dan ingin portofolio CV Harvard ATS agar cepat dapat kerja.",
    "Saya ingin switch career dari bidang Non-IT ke Software Developer dengan roadmap terarah.",
    "Saya ingin kejar lowongan Remote luar negeri (Overseas) dengan gaji USD / $2.000+ per bulan.",
    "Saya ingin meningkatkan skill ke level Senior / Tech Lead dalam waktu 6-12 bulan ke depan."
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

  /* Step Validations */
  const handleNextStep1 = () => {
    setStepError('');
    if (!data.name.trim()) {
      setStepError('Silakan isi Nama Lengkap Anda.');
      return;
    }
    if (!data.email.trim() || !data.email.includes('@')) {
      setStepError('Silakan isi alamat email yang valid.');
      return;
    }
    if (!data.password || data.password.length < 8) {
      setStepError('Kata sandi minimal 8 karakter.');
      return;
    }
    setStep(2);
  };

  const handleNextStep2 = () => {
    setStepError('');
    if (!data.education) {
      setStepError('Silakan pilih pendidikan terakhir Anda.');
      return;
    }
    setStep(3);
  };

  const handleNextStep3 = () => {
    setStepError('');
    if (!data.skills_list || data.skills_list.length === 0) {
      setStepError('Silakan pilih atau tambahkan minimal 1 keahlian teknis (skill).');
      return;
    }
    setStep(4);
  };

  const handleNextStep4 = () => {
    setStepError('');
    if (!data.career_goal || data.career_goal.trim().length < 10) {
      setStepError('Silakan tuliskan cerita/target impian karir Anda (minimal 10 karakter).');
      return;
    }
    setStep(5);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/register');
  };

  const totalSteps = 5;
  const progressPercent = Math.round((step / totalSteps) * 100);

  return (
    <>
      <Head title="Daftar Akun Baru (Step-by-Step AI Onboarding) — CareerAI" />
      <FullscreenLoader
        show={processing}
        message="Inisialisasi & Sinkronisasi Memori DeepSeek AI..."
        submessage="Menghubungkan konsep profil & cerita karir Anda ke memori AI secara otomatis..."
      />

      {/* Main Background */}
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg,#06091A 0%,#0D0B2E 30%,#080A1F 65%,#06091A 100%)',
        position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '30px 16px',
      }}>

        {/* Ambient Glows */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', top: '-14%', right: '-6%', width: 640, height: 640,
            background: 'radial-gradient(ellipse,rgba(139,92,246,.2) 0%,transparent 70%)',
            filter: 'blur(90px)',
          }} />
          <div style={{
            position: 'absolute', bottom: '-10%', left: '-5%', width: 610, height: 610,
            background: 'radial-gradient(ellipse,rgba(79,124,255,.17) 0%,transparent 70%)',
            filter: 'blur(100px)',
          }} />
          <div style={{
            position: 'absolute', top: '48%', right: '30%', width: 360, height: 360,
            background: 'radial-gradient(ellipse,rgba(45,212,191,.09) 0%,transparent 70%)',
            filter: 'blur(60px)',
          }} />
        </div>

        <ParticleCanvas />

        {/* Main Wrapper */}
        <div style={{
          position: 'relative', zIndex: 10, width: '100%', maxWidth: 1100,
          margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24,
        }}>

          {/* TOP NAVIGATION HEADER */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 24px', borderRadius: 20,
            background: 'rgba(15,23,42,0.75)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 12,
                background: 'linear-gradient(135deg,#8B5CF6,#14B8A6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 20px rgba(139,92,246,0.5)',
              }}>
                <Sparkles size={20} color="#fff" />
              </div>
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 900, fontSize: 20, color: '#F8FAFC' }}>
                  Career<span style={{ color: '#2DD4BF' }}>AI</span>
                </div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Interactive AI Memory Registration
                </div>
              </div>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#94A3B8' }}>
                Sudah punya akun?
              </span>
              <Link href="/login" style={{
                padding: '8px 16px', borderRadius: 10,
                background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.35)',
                color: '#C4B5FD', fontSize: 12, fontWeight: 700, textDecoration: 'none',
                transition: 'all 0.2s',
              }}>
                Masuk
              </Link>
            </div>
          </div>

          {/* MAIN TWO-COLUMN CONTENT GRID */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 24,
            alignItems: 'start',
          }}>

            {/* LEFT COLUMN: BRAND & LIVE CONCEPT VISUALIZER */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Title Card */}
              <div style={{
                padding: 24, borderRadius: 24,
                background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px',
                  borderRadius: 99, background: 'rgba(45,212,191,0.15)', border: '1px solid rgba(45,212,191,0.3)',
                  color: '#2DD4BF', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em',
                  marginBottom: 14,
                }}>
                  <Brain size={14} /> Step-by-Step AI Onboarding
                </div>
                <h1 style={{
                  fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 28, fontWeight: 900,
                  lineHeight: 1.2, color: '#F1F5F9', marginBottom: 12, letterSpacing: '-0.5px',
                }}>
                  Daftar Sekali,<br />
                  <span style={{
                    background: 'linear-gradient(90deg, #2DD4BF, #8B5CF6)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  }}>
                    AI Langsung Paham Konsep Profil Anda!
                  </span>
                </h1>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#94A3B8', lineHeight: 1.6, margin: 0 }}>
                  Data dan curhatan karir yang Anda isi di registrasi akan otomatis tersimpan dalam memori DeepSeek AI. Saat Anda masuk ke Dashboard, AI tidak perlu ditanya dari nol!
                </p>
              </div>

              {/* LIVE AI CONCEPT MEMORY CARD */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: 24, borderRadius: 24,
                  background: 'linear-gradient(135deg,rgba(139,92,246,0.15),rgba(45,212,191,0.12),rgba(15,23,42,0.85))',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(45,212,191,0.3)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                  position: 'relative', overflow: 'hidden',
                }}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: 99, background: '#2DD4BF',
                      boxShadow: '0 0 10px #2DD4BF', animation: 'pulse 1.8s infinite',
                    }} />
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 800, color: '#2DD4BF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Prinjau Memori AI Real-Time
                    </span>
                  </div>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: '#94A3B8', background: 'rgba(255,255,255,0.06)', padding: '4px 8px', borderRadius: 6 }}>
                    Sync: Active
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 12, background: 'rgba(139,92,246,0.2)',
                      border: '1px solid rgba(139,92,246,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 16, fontWeight: 900, color: '#C4B5FD', flexShrink: 0,
                    }}>
                      {data.name ? data.name.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 800, color: '#F1F5F9' }}>
                        {data.name || 'Nama Kandidat'}
                      </div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#94A3B8' }}>
                        {data.experience_level} • {data.education}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: 6,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                      <span style={{ color: '#64748B', fontWeight: 600 }}>Target Role:</span>
                      <span style={{ color: '#2DD4BF', fontWeight: 700 }}>{data.target_role}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                      <span style={{ color: '#64748B', fontWeight: 600 }}>Mode Kerja:</span>
                      <span style={{ color: '#C4B5FD', fontWeight: 700 }}>{workMode}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                      <span style={{ color: '#64748B', fontWeight: 600 }}>Keahlian Stack:</span>
                      <span style={{ color: '#F1F5F9', fontWeight: 700 }}>
                        {Array.isArray(data.skills_list) ? data.skills_list.slice(0, 4).join(', ') : data.skills_list}
                        {Array.isArray(data.skills_list) && data.skills_list.length > 4 ? ` (+${data.skills_list.length - 4} lain)` : ''}
                      </span>
                    </div>
                  </div>

                  <div style={{
                    padding: 12, borderRadius: 12, background: 'rgba(45,212,191,0.08)',
                    border: '1px solid rgba(45,212,191,0.2)', fontSize: 11, color: '#CBD5E1', lineHeight: 1.5,
                  }}>
                    <div style={{ fontWeight: 800, color: '#2DD4BF', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <MessageSquare size={13} /> Target & Curhat Karir untuk AI:
                    </div>
                    <p style={{ margin: 0, fontStyle: 'italic', color: '#94A3B8' }}>
                      "{data.career_goal}"
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* RIGHT COLUMN: ANIMATED STEP-BY-STEP FORM CARD */}
            <div style={{
              background: 'linear-gradient(135deg,rgba(139,92,246,.35),rgba(79,124,255,.3),rgba(45,212,191,.28))',
              borderRadius: 28, padding: 1,
              boxShadow: '0 30px 80px rgba(0,0,0,.6),0 0 60px rgba(139,92,246,.15)',
            }}>
              <div style={{
                background: 'rgba(7,11,26,.96)',
                backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
                borderRadius: 27, padding: '28px 24px', position: 'relative', overflow: 'hidden',
              }}>

                {/* ANIMATED PROGRESS TRACKER HEADER */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: 10,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: 9,
                        background: 'linear-gradient(135deg,#8B5CF6,#14B8A6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 13, fontWeight: 900, color: '#fff',
                        boxShadow: '0 0 14px rgba(45,212,191,0.6)'
                      }}>
                        {step}
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 900, color: '#2DD4BF', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                          LANGKAH {step} DARI {totalSteps} ({progressPercent}%)
                        </div>
                        <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 800, color: '#F1F5F9' }}>
                          {step === 1 && '1. Profil & Akses Akun'}
                          {step === 2 && '2. Pendidikan & Status Karir'}
                          {step === 3 && '3. Target Role & Keahlian (Skills)'}
                          {step === 4 && '4. Mode Kerja & Curhat Karir ke AI'}
                          {step === 5 && '5. Konfirmasi & Inisialisasi Memori AI'}
                        </div>
                      </div>
                    </div>

                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 800, color: '#2DD4BF' }}>
                      {progressPercent}%
                    </span>
                  </div>

                  {/* Progress Bar Track */}
                  <div style={{
                    width: '100%', height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.08)',
                    position: 'relative', overflow: 'hidden',
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      style={{
                        height: '100%', borderRadius: 99,
                        background: 'linear-gradient(90deg, #8B5CF6, #4F7CFF, #2DD4BF)',
                        boxShadow: '0 0 12px rgba(45,212,191,0.8)',
                      }}
                    />
                  </div>

                  {/* Step Pills */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                    {['Akun', 'Pendidikan', 'Skills', 'Curhat AI', 'Selesai'].map((lbl, idx) => {
                      const sNum = idx + 1;
                      const isActive = sNum === step;
                      const isDone = sNum < step;
                      return (
                        <button
                          key={lbl}
                          type="button"
                          onClick={() => { if (isDone) setStep(sNum); }}
                          style={{
                            background: 'none', border: 'none', padding: 0, cursor: isDone ? 'pointer' : 'default',
                            display: 'flex', alignItems: 'center', gap: 4,
                          }}>
                          <div style={{
                            width: 14, height: 14, borderRadius: 99,
                            background: isActive ? '#2DD4BF' : isDone ? '#8B5CF6' : 'rgba(255,255,255,0.1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 8, fontWeight: 900, color: '#fff',
                            boxShadow: isActive ? '0 0 8px #2DD4BF' : 'none',
                          }}>
                            {isDone ? '✓' : sNum}
                          </div>
                          <span style={{
                            fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: isActive ? 800 : 600,
                            color: isActive ? '#2DD4BF' : isDone ? '#C4B5FD' : '#475569',
                          }}>
                            {lbl}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ERROR ALERT BOX */}
                {(errors.name || errors.email || errors.password || errors.general || stepError) && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    style={{
                      padding: '10px 14px', borderRadius: 12, marginBottom: 16,
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

                {/* FORM WIZARD */}
                <form onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait">

                    {/* ════════════════════════════════════════════════════ */}
                    {/* STEP 1: Profil Akun & Kredensial */}
                    {/* ════════════════════════════════════════════════════ */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 25 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -25 }}
                        transition={{ duration: 0.3 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
                      >
                        {/* Nama Input */}
                        <div>
                          <label style={{
                            display: 'block', fontFamily: "'Inter',sans-serif",
                            fontSize: 11, fontWeight: 700, color: '#94A3B8', marginBottom: 6,
                            textTransform: 'uppercase', letterSpacing: '0.08em',
                          }}>
                            Nama Lengkap
                          </label>
                          <div style={{ position: 'relative' }}>
                            <UserIcon size={15} style={{
                              position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                              color: '#475569', pointerEvents: 'none',
                            }} />
                            <input
                              type="text" required autoComplete="name"
                              value={data.name}
                              onChange={(e) => setData('name', e.target.value)}
                              placeholder="Masukkan nama lengkap Anda"
                              style={{
                                width: '100%', padding: '12px 14px 12px 42px', borderRadius: 12,
                                background: '#0B1128', border: '1px solid rgba(255,255,255,.14)',
                                color: '#F8FAFC', fontSize: 13, outline: 'none',
                              }}
                            />
                          </div>
                        </div>

                        {/* Email Input */}
                        <div>
                          <label style={{
                            display: 'block', fontFamily: "'Inter',sans-serif",
                            fontSize: 11, fontWeight: 700, color: '#94A3B8', marginBottom: 6,
                            textTransform: 'uppercase', letterSpacing: '0.08em',
                          }}>
                            Alamat Email (Akses Akun)
                          </label>
                          <div style={{ position: 'relative' }}>
                            <Mail size={15} style={{
                              position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                              color: '#475569', pointerEvents: 'none',
                            }} />
                            <input
                              type="email" required autoComplete="email"
                              value={data.email}
                              onChange={(e) => setData('email', e.target.value)}
                              placeholder="contoh: nama@domain.com"
                              style={{
                                width: '100%', padding: '12px 14px 12px 42px', borderRadius: 12,
                                background: '#0B1128', border: '1px solid rgba(255,255,255,.14)',
                                color: '#F8FAFC', fontSize: 13, outline: 'none',
                              }}
                            />
                          </div>
                        </div>

                        {/* Password Input */}
                        <div>
                          <label style={{
                            display: 'block', fontFamily: "'Inter',sans-serif",
                            fontSize: 11, fontWeight: 700, color: '#94A3B8', marginBottom: 6,
                            textTransform: 'uppercase', letterSpacing: '0.08em',
                          }}>
                            Kata Sandi
                          </label>
                          <div style={{ position: 'relative' }}>
                            <Lock size={15} style={{
                              position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                              color: '#475569', pointerEvents: 'none',
                            }} />
                            <input
                              type={showPwd ? 'text' : 'password'}
                              required minLength={8} autoComplete="new-password"
                              value={data.password}
                              onChange={(e) => setData('password', e.target.value)}
                              placeholder="Minimal 8 karakter"
                              style={{
                                width: '100%', padding: '12px 46px 12px 42px', borderRadius: 12,
                                background: '#0B1128', border: '1px solid rgba(255,255,255,.14)',
                                color: '#F8FAFC', fontSize: 13, outline: 'none',
                              }}
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
                          <PasswordStrength password={data.password} />
                        </div>

                        {/* Lokasi / Domisili */}
                        <div>
                          <label style={{
                            display: 'block', fontFamily: "'Inter',sans-serif",
                            fontSize: 11, fontWeight: 700, color: '#94A3B8', marginBottom: 6,
                            textTransform: 'uppercase', letterSpacing: '0.08em',
                          }}>
                            Lokasi Domisili (Opsional)
                          </label>
                          <div style={{ position: 'relative' }}>
                            <MapPin size={15} style={{
                              position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                              color: '#475569', pointerEvents: 'none',
                            }} />
                            <input
                              type="text"
                              value={cityLocation}
                              onChange={(e) => setCityLocation(e.target.value)}
                              placeholder="contoh: Jakarta, Indonesia"
                              style={{
                                width: '100%', padding: '12px 14px 12px 42px', borderRadius: 12,
                                background: '#0B1128', border: '1px solid rgba(255,255,255,.14)',
                                color: '#F8FAFC', fontSize: 13, outline: 'none',
                              }}
                            />
                          </div>
                        </div>

                        {/* Step 1 Action */}
                        <button
                          type="button"
                          onClick={handleNextStep1}
                          style={{
                            marginTop: 10, width: '100%', padding: '13px 20px', borderRadius: 14,
                            background: 'linear-gradient(135deg, #8B5CF6, #4F7CFF)', border: 'none',
                            color: '#FFF', fontSize: 13, fontWeight: 800, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                            boxShadow: '0 8px 24px rgba(139,92,246,0.4)',
                          }}>
                          <span>Lanjut ke Langkah 2 (Pendidikan & Karir)</span> <ArrowRight size={16} />
                        </button>
                      </motion.div>
                    )}

                    {/* ════════════════════════════════════════════════════ */}
                    {/* STEP 2: Pendidikan & Level Karir */}
                    {/* ════════════════════════════════════════════════════ */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 25 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -25 }}
                        transition={{ duration: 0.3 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
                      >
                        {/* Pendidikan Terakhir */}
                        <div>
                          <label style={{
                            display: 'block', fontFamily: "'Inter',sans-serif",
                            fontSize: 11, fontWeight: 700, color: '#94A3B8', marginBottom: 6,
                            textTransform: 'uppercase', letterSpacing: '0.08em',
                          }}>
                            Pendidikan Terakhir / Sedang Ditempuh
                          </label>
                          <select
                            value={data.education}
                            onChange={(e) => setData('education', e.target.value)}
                            style={{
                              width: '100%', padding: '12px 14px', borderRadius: 12,
                              background: '#0B1128', border: '1px solid rgba(255,255,255,.14)',
                              color: '#F8FAFC', fontSize: 13, fontWeight: 600, outline: 'none',
                            }}
                          >
                            <option value="S1 Teknik Informatika / Ilmu Komputer">S1 Teknik Informatika / Ilmu Komputer</option>
                            <option value="S1 Sistem Informasi / Teknologi Informasi">S1 Sistem Informasi / Teknologi Informasi</option>
                            <option value="D3 Teknik Komputer / Manajamen Informatika">D3 Teknik / Manajamen Komputer</option>
                            <option value="SMA / SMK (RPL / TKJ / Umum)">SMA / SMK (RPL / TKJ / Umum)</option>
                            <option value="S1 Non-IT (Belajar Self-Taught)">S1 Non-IT / Belajar Otodidak</option>
                            <option value="S2 Pascasarjana">S2 / Pascasarjana</option>
                          </select>
                        </div>

                        {/* Level Pengalaman */}
                        <div>
                          <label style={{
                            display: 'block', fontFamily: "'Inter',sans-serif",
                            fontSize: 11, fontWeight: 700, color: '#94A3B8', marginBottom: 6,
                            textTransform: 'uppercase', letterSpacing: '0.08em',
                          }}>
                            Status & Level Karir Saat Ini
                          </label>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                            {[
                              { lvl: 'Fresh Graduate', desc: 'Baru Lulus (0 Thn)' },
                              { lvl: 'Mahasiswa Aktif', desc: 'Sedang Kuliah' },
                              { lvl: 'Junior Level (0-2 Thn)', desc: 'Pengalaman 0-2 Thn' },
                              { lvl: 'Mid-Level (2-5 Thn)', desc: 'Pengalaman 2-5 Thn' },
                              { lvl: 'Senior Level (5+ Thn)', desc: 'Pengalaman 5+ Thn' },
                              { lvl: 'Career Switcher', desc: 'Pindah Bidang/Profesi' },
                            ].map(({ lvl, desc }) => (
                              <button
                                key={lvl}
                                type="button"
                                onClick={() => setData('experience_level', lvl)}
                                style={{
                                  padding: '10px 12px', borderRadius: 12, border: '1px solid',
                                  borderColor: data.experience_level === lvl ? '#2DD4BF' : 'rgba(255,255,255,.08)',
                                  background: data.experience_level === lvl ? 'rgba(45,212,191,.15)' : 'rgba(255,255,255,.03)',
                                  color: data.experience_level === lvl ? '#2DD4BF' : '#94A3B8',
                                  cursor: 'pointer', textAlign: 'left', transition: 'all .2s',
                                }}
                              >
                                <div style={{ fontSize: 12, fontWeight: 800 }}>{lvl}</div>
                                <div style={{ fontSize: 10, color: '#64748B', marginTop: 2 }}>{desc}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            style={{
                              padding: '12px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.06)',
                              border: '1px solid rgba(255,255,255,0.1)', color: '#CBD5E1', fontSize: 13,
                              fontWeight: 700, cursor: 'pointer',
                            }}>
                            ← Kembali
                          </button>
                          <button
                            type="button"
                            onClick={handleNextStep2}
                            style={{
                              flex: 1, padding: '12px 20px', borderRadius: 12,
                              background: 'linear-gradient(135deg, #8B5CF6, #4F7CFF)', border: 'none',
                              color: '#FFF', fontSize: 13, fontWeight: 800, cursor: 'pointer',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                            }}>
                            <span>Lanjut ke Langkah 3 (Target Skill)</span> <ArrowRight size={16} />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* ════════════════════════════════════════════════════ */}
                    {/* STEP 3: Target Role & Skills */}
                    {/* ════════════════════════════════════════════════════ */}
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 25 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -25 }}
                        transition={{ duration: 0.3 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
                      >
                        {/* Target Role Selector */}
                        <div>
                          <label style={{
                            display: 'block', fontFamily: "'Inter',sans-serif",
                            fontSize: 11, fontWeight: 700, color: '#94A3B8', marginBottom: 6,
                            textTransform: 'uppercase', letterSpacing: '0.08em',
                          }}>
                            Target Posisi / Role Impian Anda
                          </label>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                            {TARGET_ROLES.map((r) => (
                              <button
                                key={r.id}
                                type="button"
                                onClick={() => setData('target_role', r.id)}
                                style={{
                                  padding: '9px 10px', borderRadius: 10, border: '1px solid',
                                  borderColor: data.target_role === r.id ? '#8B5CF6' : 'rgba(255,255,255,.08)',
                                  background: data.target_role === r.id ? 'rgba(139,92,246,.22)' : 'rgba(255,255,255,.03)',
                                  color: data.target_role === r.id ? '#C4B5FD' : '#94A3B8',
                                  cursor: 'pointer', textAlign: 'left', fontSize: 11, fontWeight: 700,
                                  display: 'flex', alignItems: 'center', gap: 6, transition: 'all .2s',
                                }}
                              >
                                <span>{r.icon}</span>
                                <div>
                                  <div>{r.title}</div>
                                  <div style={{ fontSize: 9, color: '#64748B', fontWeight: 500 }}>{r.desc}</div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Select Skills */}
                        <div>
                          <label style={{
                            display: 'block', fontFamily: "'Inter',sans-serif",
                            fontSize: 11, fontWeight: 700, color: '#94A3B8', marginBottom: 6,
                            textTransform: 'uppercase', letterSpacing: '0.08em',
                          }}>
                            Pilih Keahlian / Skill ({Array.isArray(data.skills_list) ? data.skills_list.length : 0} Terpilih)
                          </label>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 8, maxHeight: 100, overflowY: 'auto' }}>
                            {POPULAR_SKILLS.map((sk) => {
                              const isSelected = Array.isArray(data.skills_list) && data.skills_list.includes(sk);
                              return (
                                <button
                                  key={sk}
                                  type="button"
                                  onClick={() => toggleSkill(sk)}
                                  style={{
                                    padding: '4px 10px', borderRadius: 8, border: '1px solid',
                                    borderColor: isSelected ? '#2DD4BF' : 'rgba(255,255,255,.08)',
                                    background: isSelected ? 'rgba(45,212,191,.2)' : 'rgba(255,255,255,.03)',
                                    color: isSelected ? '#2DD4BF' : '#94A3B8',
                                    cursor: 'pointer', fontSize: 11, fontWeight: 700,
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
                              placeholder="+ Tambah skill kustom lainnya..."
                              style={{
                                flex: 1, padding: '8px 12px', borderRadius: 8,
                                background: '#0B1128', border: '1px solid rgba(255,255,255,.14)',
                                color: '#F8FAFC', fontSize: 12, outline: 'none',
                              }}
                            />
                            <button
                              type="button"
                              onClick={handleAddCustomSkill}
                              style={{
                                padding: '8px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.08)',
                                border: '1px solid rgba(255,255,255,0.12)', color: '#F8FAFC',
                                fontSize: 12, fontWeight: 700, cursor: 'pointer',
                              }}>
                              Tambah
                            </button>
                          </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            style={{
                              padding: '12px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.06)',
                              border: '1px solid rgba(255,255,255,0.1)', color: '#CBD5E1', fontSize: 13,
                              fontWeight: 700, cursor: 'pointer',
                            }}>
                            ← Kembali
                          </button>
                          <button
                            type="button"
                            onClick={handleNextStep3}
                            style={{
                              flex: 1, padding: '12px 20px', borderRadius: 12,
                              background: 'linear-gradient(135deg, #8B5CF6, #4F7CFF)', border: 'none',
                              color: '#FFF', fontSize: 13, fontWeight: 800, cursor: 'pointer',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                            }}>
                            <span>Lanjut ke Langkah 4 (Curhat AI)</span> <ArrowRight size={16} />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* ════════════════════════════════════════════════════ */}
                    {/* STEP 4: Mode Kerja & Curhat / AI Initial Memory */}
                    {/* ════════════════════════════════════════════════════ */}
                    {step === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 25 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -25 }}
                        transition={{ duration: 0.3 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
                      >
                        {/* Mode Kerja */}
                        <div>
                          <label style={{
                            display: 'block', fontFamily: "'Inter',sans-serif",
                            fontSize: 11, fontWeight: 700, color: '#94A3B8', marginBottom: 6,
                            textTransform: 'uppercase', letterSpacing: '0.08em',
                          }}>
                            Preferensi Sistem Kerja
                          </label>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                            {['Remote / Overseas', 'Hybrid Flexible', 'On-site Office', 'Freelance / Contract'].map((wm) => (
                              <button
                                key={wm}
                                type="button"
                                onClick={() => {
                                  setWorkMode(wm);
                                  setData('work_mode', wm);
                                }}
                                style={{
                                  padding: '9px 10px', borderRadius: 10, border: '1px solid',
                                  borderColor: workMode === wm ? '#2DD4BF' : 'rgba(255,255,255,.08)',
                                  background: workMode === wm ? 'rgba(45,212,191,.15)' : 'rgba(255,255,255,.03)',
                                  color: workMode === wm ? '#2DD4BF' : '#94A3B8',
                                  cursor: 'pointer', textAlign: 'left', fontSize: 11, fontWeight: 700,
                                }}
                              >
                                {wm}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Curhat / Ambisi Karir Utama untuk AI */}
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                            <label style={{
                              display: 'block', fontFamily: "'Inter',sans-serif",
                              fontSize: 11, fontWeight: 700, color: '#94A3B8',
                              textTransform: 'uppercase', letterSpacing: '0.08em',
                            }}>
                              Curhat / Target Karir Utama untuk DeepSeek AI
                            </label>
                            <span style={{ fontSize: 10, color: '#2DD4BF', fontWeight: 700 }}>
                              ★ Masuk Memori AI
                            </span>
                          </div>

                          <textarea
                            rows={3}
                            value={data.career_goal}
                            onChange={(e) => setData('career_goal', e.target.value)}
                            placeholder="Ceritakan target karir impian Anda, kendala yang sedang dihadapi, atau ekspektasi gaji/posisi..."
                            style={{
                              width: '100%', padding: '12px', borderRadius: 12,
                              background: '#0B1128', border: '1px solid rgba(255,255,255,.14)',
                              color: '#F8FAFC', fontSize: 12, outline: 'none', lineHeight: 1.5,
                              resize: 'none',
                            }}
                          />

                          {/* Preset Buttons */}
                          <div style={{ marginTop: 8 }}>
                            <div style={{ fontSize: 10, color: '#64748B', fontWeight: 600, marginBottom: 4 }}>
                              Atau pilih template curhat cepat:
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                              {CURHAT_PRESETS.map((p, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => setData('career_goal', p)}
                                  style={{
                                    padding: '6px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.06)', color: '#CBD5E1', fontSize: 10,
                                    cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                                  }}>
                                  "{p}"
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                          <button
                            type="button"
                            onClick={() => setStep(3)}
                            style={{
                              padding: '12px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.06)',
                              border: '1px solid rgba(255,255,255,0.1)', color: '#CBD5E1', fontSize: 13,
                              fontWeight: 700, cursor: 'pointer',
                            }}>
                            ← Kembali
                          </button>
                          <button
                            type="button"
                            onClick={handleNextStep4}
                            style={{
                              flex: 1, padding: '12px 20px', borderRadius: 12,
                              background: 'linear-gradient(135deg, #8B5CF6, #4F7CFF)', border: 'none',
                              color: '#FFF', fontSize: 13, fontWeight: 800, cursor: 'pointer',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                            }}>
                            <span>Lihat Hasil Sync Memori AI →</span>
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* ════════════════════════════════════════════════════ */}
                    {/* STEP 5: Konfirmasi Final & Inisialisasi Memori AI */}
                    {/* ════════════════════════════════════════════════════ */}
                    {step === 5 && (
                      <motion.div
                        key="step5"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
                      >
                        <div style={{
                          padding: 16, borderRadius: 16, background: 'rgba(45,212,191,0.1)',
                          border: '1px solid rgba(45,212,191,0.3)', display: 'flex', alignItems: 'center', gap: 12,
                        }}>
                          <div style={{
                            width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#2DD4BF,#8B5CF6)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          }}>
                            <CheckCircle2 size={20} color="#fff" />
                          </div>
                          <div>
                            <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, fontWeight: 800, color: '#F1F5F9' }}>
                              Konsep Onboarding Anda Siap Diinisialisasi!
                            </div>
                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#94A3B8' }}>
                              Akun Anda akan dibuat & memori DeepSeek AI langsung dikonfigurasi.
                            </div>
                          </div>
                        </div>

                        {/* Summary List */}
                        <div style={{
                          padding: 14, borderRadius: 14, background: 'rgba(0,0,0,0.4)',
                          border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: 8,
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                            <span style={{ color: '#64748B' }}>Nama Kandidat:</span>
                            <span style={{ color: '#F1F5F9', fontWeight: 700 }}>{data.name}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                            <span style={{ color: '#64748B' }}>Email:</span>
                            <span style={{ color: '#F1F5F9', fontWeight: 700 }}>{data.email}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                            <span style={{ color: '#64748B' }}>Pendidikan & Level:</span>
                            <span style={{ color: '#F1F5F9', fontWeight: 700 }}>{data.education} ({data.experience_level})</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                            <span style={{ color: '#64748B' }}>Target Posisi:</span>
                            <span style={{ color: '#2DD4BF', fontWeight: 800 }}>{data.target_role}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                            <span style={{ color: '#64748B' }}>Stack Keahlian:</span>
                            <span style={{ color: '#C4B5FD', fontWeight: 700 }}>
                              {Array.isArray(data.skills_list) ? data.skills_list.join(', ') : data.skills_list}
                            </span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                            <span style={{ color: '#64748B' }}>System Work Mode:</span>
                            <span style={{ color: '#2DD4BF', fontWeight: 700 }}>{workMode}</span>
                          </div>
                        </div>

                        {/* Submit Actions */}
                        <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                          <button
                            type="button"
                            onClick={() => setStep(4)}
                            style={{
                              padding: '12px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.06)',
                              border: '1px solid rgba(255,255,255,0.1)', color: '#CBD5E1', fontSize: 13,
                              fontWeight: 700, cursor: 'pointer',
                            }}>
                            ← Edit Data
                          </button>
                          <button
                            id="register-submit"
                            type="submit"
                            disabled={processing}
                            style={{
                              flex: 1, padding: '14px 20px', borderRadius: 14,
                              background: 'linear-gradient(135deg,#14B8A6 0%,#8B5CF6 100%)', border: 'none',
                              color: '#FFF', fontSize: 14, fontWeight: 900, cursor: 'pointer',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                              boxShadow: '0 0 30px rgba(45,212,191,0.5)',
                            }}>
                            {processing
                              ? <><span>Menyimpan ke Database...</span></>
                              : <><span>Daftar &amp; Masuk ke Dashboard</span> <Rocket size={18} /></>
                            }
                          </button>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </form>

                {/* Footer Security Badge */}
                <div style={{
                  marginTop: 18, padding: '10px 14px', borderRadius: 12,
                  background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.05)',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <ShieldCheck size={16} style={{ color: '#2DD4BF', flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#64748B' }}>
                    Data onboarding otomatis disinkronkan ke AI Memory saat akun dibuat.
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}
