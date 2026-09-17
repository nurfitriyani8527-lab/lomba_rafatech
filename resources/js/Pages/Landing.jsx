import React, { useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ChatBubble from '../Components/ChatBubble';
import userAvatarPng from '../assets/user-avatar.png';
import testiUser1 from '../assets/testi-user-1.png';
import testiUser2 from '../assets/testi-user-2.png';
import testiUser3 from '../assets/testi-user-3.png';
import {
  Upload,
  Brain,
  BarChart3,
  Rocket,
  Search,
  Briefcase,
  TrendingUp,
  Map,
  FileText,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ArrowRight,
  Star,
  Shield,
  ShieldCheck,
  Zap,
  Gift,
  Users,
  Target,
  ScanSearch,
  Route,
  Award,
  BadgeCheck,
  UserPlus,
  Bot,
} from 'lucide-react';
/* ─────────────────────────────────────────
   GLOBAL STYLES + SHIMMER KEYFRAMES
───────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @keyframes shimmerText {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes shimmerBorder {
      0%,100% { background-position: 0% 50%; }
      50%      { background-position: 100% 50%; }
    }
    @keyframes shimmerSweep {
      0%   { transform: translateX(-100%) skewX(-15deg); }
      100% { transform: translateX(250%) skewX(-15deg); }
    }
    @keyframes dashOffset {
      0%   { stroke-dashoffset: 52; }
      100% { stroke-dashoffset: 0; }
    }
    @keyframes connectorPulse {
      0%, 100% { filter: drop-shadow(0 0 4px rgba(45, 212, 191, 0.4)); transform: scale(1); }
      50%      { filter: drop-shadow(0 0 14px rgba(79, 124, 255, 0.95)); transform: scale(1.25); }
    }
    @keyframes shimmerPulse {
      0%,100% { opacity: 0.4; }
      50%      { opacity: 1; }
    }
    @keyframes float1 {
      0%,100% { transform: translateY(0px) rotate(0deg); }
      50%      { transform: translateY(-16px) rotate(0.6deg); }
    }
    @keyframes float2 {
      0%,100% { transform: translateY(0px) rotate(0deg); }
      50%      { transform: translateY(-10px) rotate(-0.6deg); }
    }
    @keyframes float3 {
      0%,100% { transform: translateY(0px); }
      50%      { transform: translateY(-8px); }
    }
    @keyframes blobDrift1 {
      0%,100% { transform: translate(0,0) scale(1); }
      33%      { transform: translate(50px,-40px) scale(1.06); }
      66%      { transform: translate(-30px,50px) scale(0.94); }
    }
    @keyframes blobDrift2 {
      0%,100% { transform: translate(0,0) scale(1); }
      40%      { transform: translate(-60px,30px) scale(1.1); }
      70%      { transform: translate(40px,-60px) scale(0.9); }
    }
    @keyframes blobDrift3 {
      0%,100% { transform: translate(0,0) scale(1); }
      50%      { transform: translate(30px,70px) scale(1.04); }
    }

    /* ── Shimmer text ── */
    .shimmer-text {
      background: linear-gradient(90deg, #4F7CFF 0%, #14B8A6 25%, #8B5CF6 50%, #2DD4BF 75%, #4F7CFF 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmerText 3s linear infinite;
    }

    /* ── Shimmer border card ── */
    .shimmer-border-card {
      position: relative; border-radius: 20px; padding: 1px;
      background: linear-gradient(120deg, rgba(79,124,255,0.45) 0%, rgba(20,184,166,0.45) 25%, rgba(139,92,246,0.45) 50%, rgba(45,212,191,0.45) 75%, rgba(79,124,255,0.45) 100%);
      background-size: 300% 300%;
      animation: shimmerBorder 4s ease infinite;
    }
    .shimmer-border-card-inner {
      background: rgba(5,8,22,0.96);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 19px; width: 100%; height: 100%;
    }

    /* ── Sweep shimmer ── */
    .sweep-parent { position: relative; overflow: hidden; }
    .sweep-parent::after {
      content: '';
      position: absolute; top: 0; left: 0;
      width: 50px; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
      animation: shimmerSweep 3.5s ease-in-out infinite;
    }

    /* ── Glass base ── */
    .glass-card {
      background: rgba(255,255,255,0.04);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.09);
      border-radius: 20px;
    }

    /* ── Buttons ── */
    .btn-primary {
      position: relative; overflow: hidden;
      display: inline-flex; align-items: center; gap: 8px;
      font-family: 'Inter',sans-serif; font-weight: 700; font-size: 15px;
      color: #fff; text-decoration: none;
      padding: 14px 28px; border-radius: 12px; border: none; cursor: pointer;
      background: linear-gradient(135deg, #4F7CFF 0%, #14B8A6 50%, #8B5CF6 100%);
      box-shadow: 0 0 30px rgba(20,184,166,0.35), 0 4px 20px rgba(0,0,0,0.3);
      transition: all 0.3s ease;
    }
    .btn-primary::before {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
      transform: translateX(-100%) skewX(-15deg);
      transition: transform 0.5s ease;
    }
    .btn-primary:hover { box-shadow: 0 0 56px rgba(45,212,191,0.6), 0 8px 30px rgba(0,0,0,0.4); transform: translateY(-2px); }
    .btn-primary:hover::before { transform: translateX(250%) skewX(-15deg); }

    .btn-outline {
      display: inline-flex; align-items: center; gap: 8px;
      font-family: 'Inter',sans-serif; font-weight: 600; font-size: 15px;
      color: #CBD5E1; text-decoration: none;
      padding: 13px 26px; border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.15);
      background: rgba(255,255,255,0.04); backdrop-filter: blur(10px);
      transition: all 0.25s ease;
    }
    .btn-outline:hover {
      color: #F8FAFC; border-color: rgba(45,212,191,0.5);
      background: rgba(20,184,166,0.08);
      box-shadow: 0 0 24px rgba(45,212,191,0.2); transform: translateY(-2px);
    }

    /* ── Section label ── */
    .section-label {
      display: inline-block;
      font-family: 'Inter',sans-serif; font-size: 11px; font-weight: 700;
      letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 16px;
    }

    /* ── Badge dot ── */
    .badge-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: #2DD4BF; box-shadow: 0 0 10px #2DD4BF;
      animation: shimmerPulse 2s ease-in-out infinite;
    }

    /* ── Skill tag ── */
    .skill-tag {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 4px 10px; border-radius: 6px;
      font-family: 'Inter',sans-serif; font-size: 12px; font-weight: 500;
    }
    .skill-tosca   { background: rgba(20,184,166,0.12); border: 1px solid rgba(45,212,191,0.35); color: #2DD4BF; }
    .skill-matched { background: rgba(34,211,238,0.08); border: 1px solid rgba(34,211,238,0.22); color: #22D3EE; }
    .skill-missing  { background: rgba(251,191,36,0.08);  border: 1px solid rgba(251,191,36,0.22);  color: #F59E0B; }
    .skill-neutral  { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);  color: #94A3B8; }

    /* ── Responsive ── */
    @media (max-width: 900px) {
      .hero-grid   { flex-direction: column !important; }
      .hero-cards  { width: 100% !important; margin-top: 40px; min-height: 340px !important; }
      .ai-exp-grid { flex-direction: column !important; }
    }
    @media (max-width: 768px) {
      .steps-grid    { grid-template-columns: 1fr 1fr !important; }
      .features-grid { grid-template-columns: 1fr 1fr !important; }
      .stats-grid    { grid-template-columns: 1fr 1fr !important; }
      .flow-connector { display: none !important; }
      .testi-grid  { grid-template-columns: 1fr !important; }
    }
    @media (max-width: 520px) {
      .hero-cta      { flex-direction: column !important; align-items: stretch !important; }
      .steps-grid    { grid-template-columns: 1fr !important; }
      .features-grid { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

/* ─────────────────────────────────────────
   UTILS
───────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1, ease: 'easeOut' } }),
};

const AnimatedNumber = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { setCount(target); clearInterval(t); } else setCount(cur);
    }, 20);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const ProgressBar = ({ label, value, color = '#4F7CFF', delay = 0 }) => (
  <div style={{ marginBottom: '10px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '12px', color: '#64748B' }}>{label}</span>
      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '12px', color: '#CBD5E1', fontWeight: 600 }}>{value}%</span>
    </div>
    <div style={{ height: '5px', borderRadius: '99px', background: 'rgba(255,255,255,0.07)', overflow: 'hidden', position: 'relative' }}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay, ease: 'easeOut' }}
        style={{ height: '100%', borderRadius: '99px', background: `linear-gradient(90deg,${color},#8B5CF6)`, position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '40px', height: '100%', background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)', animation: 'shimmerSweep 2s ease-in-out infinite' }} />
      </motion.div>
    </div>
  </div>
);
/* ─────────────────────────────────────────
   SHIMMER BROKEN LINE CONNECTOR COMPONENT
───────────────────────────────────────── */
const ShimmerBrokenConnector = ({ color = '#4F7CFF', active = false, stepIndex = 0 }) => {
  const cleanColor = color.replace('#', '');
  return (
    <div className="flow-connector" style={{ flex: '0 0 54px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '48px', position: 'relative' }}>
      <svg width="54" height="32" viewBox="0 0 54 32" fill="none" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id={`gradShimmer-${cleanColor}-${stepIndex}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="50%" stopColor="#2DD4BF" stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* Outer subtle glow line */}
        <path
          d="M 0 16 H 12 L 18 8 H 30 L 36 24 H 44 L 54 16"
          stroke={color}
          strokeWidth="3"
          strokeOpacity="0.15"
          fill="none"
        />

        {/* Base Broken / Dashed Line (Tanda patah-patah) */}
        <path
          d="M 0 16 H 12 L 18 8 H 30 L 36 24 H 44 L 54 16"
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Animated Shimmer Laser Dash along the broken path */}
        <path
          d="M 0 16 H 12 L 18 8 H 30 L 36 24 H 44 L 54 16"
          stroke={`url(#gradShimmer-${cleanColor}-${stepIndex})`}
          strokeWidth="2.5"
          strokeDasharray="10 16"
          strokeLinecap="round"
          fill="none"
          style={{
            animation: 'dashOffset 1.6s linear infinite',
            filter: `drop-shadow(0 0 6px ${color})`,
          }}
        />

        {/* Central glowing pulse node */}
        <g style={{ animation: 'connectorPulse 2s ease-in-out infinite' }}>
          <polygon
            points="24,11 28,16 24,21 20,16"
            fill={color}
          />
          <circle cx="24" cy="16" r="2" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
};

const HeroConstellationCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const parent = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId;

    let width = (canvas.width = parent.offsetWidth || window.innerWidth || 1200);
    let height = (canvas.height = parent.offsetHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const p = canvas.parentElement;
      width = canvas.width = p.offsetWidth || window.innerWidth || 1200;
      height = canvas.height = p.offsetHeight || 600;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(45, Math.floor((width * height) / 15000) || 30);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 2 + 1,
      color: ['#2DD4BF', '#4F7CFF', '#8B5CF6', '#22D3EE'][Math.floor(Math.random() * 4)],
      alpha: Math.random() * 0.6 + 0.3,
    }));

    let animPhase = 0;
    const draw = () => {
      try {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);
        animPhase += 0.5;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 130) {
              ctx.beginPath();
              // Dashed broken lines with shimmer
              ctx.setLineDash([5, 4]);
              ctx.lineDashOffset = -animPhase * 0.4;

              const midX = (p.x + p2.x) / 2 + (i % 2 === 0 ? 4 : -4);
              const midY = (p.y + p2.y) / 2 + (j % 2 === 0 ? -4 : 4);

              ctx.moveTo(p.x, p.y);
              ctx.lineTo(midX, midY);
              ctx.lineTo(p2.x, p2.y);

              const lineAlpha = (1 - dist / 130) * 0.32;
              ctx.strokeStyle = p.color;
              ctx.globalAlpha = lineAlpha;
              ctx.lineWidth = 1;
              ctx.stroke();
              ctx.setLineDash([]); // Reset line dash
            }
          }
        }
      } catch (e) {
        console.warn('Canvas render caught:', e);
      }
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.85,
      }}
    />
  );
};

/* ─────────────────────────────────────────
   LANDING PAGE
───────────────────────────────────────── */
const DEMO_ROLES = [
  {
    role: 'Digital Marketing',
    level: 'Level Specialist',
    score: 94,
    jobs: 38,
    skills: [
      { l: 'SEO & Content', matched: true },
      { l: 'Google Ads', matched: true },
      { l: 'Social Media Strategy', matched: true },
      { l: 'Copywriting', matched: true },
      { l: 'Data Analytics', matched: false },
    ],
  },
  {
    role: 'UI/UX Designer',
    level: 'Level Mid-Junior',
    score: 95,
    jobs: 31,
    skills: [
      { l: 'Figma', matched: true },
      { l: 'User Research', matched: true },
      { l: 'Wireframing', matched: true },
      { l: 'Prototyping', matched: true },
      { l: 'Design System', matched: false },
    ],
  },
  {
    role: 'Business Analyst',
    level: 'Level Junior',
    score: 89,
    jobs: 22,
    skills: [
      { l: 'Financial Modeling', matched: true },
      { l: 'Excel / Spreadsheet', matched: true },
      { l: 'Data Visualization', matched: true },
      { l: 'Market Research', matched: true },
      { l: 'PowerBI', matched: false },
    ],
  },
  {
    role: 'Software Engineer',
    level: 'Level Junior',
    score: 92,
    jobs: 26,
    skills: [
      { l: 'Laravel / PHP', matched: true },
      { l: 'REST API', matched: true },
      { l: 'Database SQL', matched: true },
      { l: 'Git Control', matched: true },
      { l: 'Docker & Cloud', matched: false },
    ],
  },
];

const Landing = () => {
  const [activeFlow, setActiveFlow] = useState(0);
  const [selectedRoleIdx, setSelectedRoleIdx] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const t = setInterval(() => setActiveFlow(v => (v + 1) % 4), 2600);
    return () => clearInterval(t);
  }, []);

  const currentDemo = DEMO_ROLES[selectedRoleIdx];

  const FLOW_STEPS = [
    { step: '01', Icon: Upload,    color: '#4F7CFF', cRgb: '79,124,255',   title: 'Upload CV Kamu', desc: 'Upload CV dalam format PDF atau DOCX. AI langsung membaca dan menganalisis kualifikasimu.', detail: 'Belum punya CV? Kamu bisa membuat CV dari awal dengan panduan AI kami.' },
    { step: '02', Icon: Brain,     color: '#8B5CF6', cRgb: '139,92,246',   title: 'AI Memahami Potensi', desc: 'AI menganalisis pengalaman, keahlian, pendidikan, dan arah kariermu dari berbagai industri.', detail: 'Bukan sekadar scan kata kunci biasa — AI memahami konteks lengkap kariermu.' },
    { step: '03', Icon: BarChart3, color: '#22D3EE', cRgb: '34,211,238',   title: 'Dapatkan Insight', desc: 'Profil karier lengkap, skor ATS, rekomendasi lowongan cocok, dan saran pengembangan karir.', detail: 'Disajikan dalam tampilan yang rapi, modern, dan langsung bisa kamu gunakan.' },
    { step: '04', Icon: Rocket,    color: '#6366F1', cRgb: '99,102,241',   title: 'Siap Melamar Kerja', desc: 'Buat & optimalkan CV format Harvard ATS, lalu siap melamar pekerjaan impianmu.', detail: 'Kamu tidak hanya tahu posisi yang cocok — tapi siap meraih karir tersebut.' },
  ];

  const FEATURES = [
    { Icon: Search,     color: '#4F7CFF', cRgb: '79,124,255',   title: 'Analisis CV Cerdas',   desc: 'AI menganalisis CV secara mendalam — skor ATS, kekuatan, kelemahan, dan poin perbaikan konkret.' },
    { Icon: Briefcase,  color: '#6366F1', cRgb: '99,102,241',   title: 'Job Matching Otomatis', desc: 'AI mencocokkan profilmu dengan lowongan kerja nyata dari berbagai industri beserta % kecocokannya.' },
    { Icon: TrendingUp, color: '#8B5CF6', cRgb: '139,92,246',   title: 'Rekomendasi Karir AI', desc: 'Dapatkan saran dan arahan pengembangan karier yang terstruktur sesuai profilmu.' },
    { Icon: Map,        color: '#22D3EE', cRgb: '34,211,238',   title: 'Peta Jalan Karier',     desc: 'Panduan langkah demi langkah yang terstruktur dari posisimu sekarang menuju target kariermu.' },
    { Icon: FileText,   color: '#EC4899', cRgb: '236,72,153',   title: 'Buat CV Standar Harvard', desc: 'Buat CV profesional format Harvard ATS-friendly yang disukai rekruiter dan HR di berbagai industri.' },
    { Icon: ShieldCheck,color: '#F59E0B', cRgb: '245,158,11',   title: 'Skor ATS Rekruiter',   desc: 'Penilaian skor kelayakan CV berdasarkan kriteria otomatis standar rekruiter modern.' },
  ];

  const AI_FEATURES = [
    { Icon: Target,     color: '#4F7CFF', cRgb: '79,124,255',  title: 'Analisis Arah Karier', desc: 'Pahami peran dan bidang mana yang paling cocok berdasarkan latar belakang & pengalamanmu.' },
    { Icon: ScanSearch, color: '#8B5CF6', cRgb: '139,92,246',  title: 'Simulator Wawancara AI', desc: 'Latihan interview kerja interaktif dengan feedback real-time AI.' },
    { Icon: Route,      color: '#22D3EE', cRgb: '34,211,238',  title: 'Roadmap Personal',     desc: 'Langkah konkret dari posisimu sekarang menuju tujuan karier yang kamu impikan.' },
  ];

  const TESTIMONIALS = [
    { name: 'Rizki D.', role: 'Fresh Graduate → Marketing Executive', avatar: testiUser1, color: '#4F7CFF', cRgb: '79,124,255', stars: 5, quote: 'Saya gak nyangka AI bisa memberikan masukan CV yang sangat relevan. Setelah optimasi format Harvard ATS, dalam seminggu langsung dipanggil interview kerja.' },
    { name: 'Alya S.',  role: 'Mahasiswa Tingkat Akhir → Junior Designer', avatar: testiUser2, color: '#8B5CF6', cRgb: '139,92,246', stars: 5, quote: 'Roadmap karier dari AI bener-bener spesifik sesuai latar belakang dan jurusan saya. Sangat membantu menyusun langkah nyata menuju dunia kerja.' },
    { name: 'Fajar I.', role: 'Career Switcher → Business Analyst', avatar: testiUser3, color: '#22D3EE', cRgb: '34,211,238', stars: 5, quote: 'Fitur rekomendasi karier dan roadmap AI-nya juara banget. Saya jadi tahu langkah pasti untuk bidang baru yang saya incar dan cara belajarnya.' },
  ];

  return (
    <main style={{ background: '#050816', minHeight: '100vh', overflowX: 'hidden', fontFamily: "'Inter',sans-serif" }}>
      <GlobalStyles />
      <Header />

      {/* BACKGROUND BLOBS */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '0%',  left: '5%',  width: '700px', height: '700px', background: 'radial-gradient(ellipse,rgba(79,124,255,0.16) 0%,transparent 70%)',  filter: 'blur(110px)', animation: 'blobDrift1 20s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '25%', right: '0%', width: '550px', height: '550px', background: 'radial-gradient(ellipse,rgba(139,92,246,0.13) 0%,transparent 70%)', filter: 'blur(130px)', animation: 'blobDrift2 25s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '5%', left: '25%', width: '450px', height: '450px', background: 'radial-gradient(ellipse,rgba(34,211,238,0.09) 0%,transparent 70%)',  filter: 'blur(110px)', animation: 'blobDrift3 30s ease-in-out infinite' }} />
      </div>

      <div style={{ paddingTop: '88px', position: 'relative', zIndex: 1 }}>

        {/* ══ HERO (FULL SCREEN DESKTOP) ══ */}
        <section id="hero" style={{ position: 'relative', overflow: 'hidden', minHeight: 'calc(100vh - 88px)', display: 'flex', alignItems: 'center', padding: '40px 0' }}>
          {/* Interactive Neural Constellation Background (Hero Only) */}
          <HeroConstellationCanvas />

          <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
            <div className="hero-grid" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '56px' }}>

            {/* Left Column */}
            <div style={{ flex: 1, maxWidth: '580px' }}>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
              </motion.div>

              <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
                style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: '58px', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-2.5px', margin: '0 0 22px' }}>
                <span style={{ color: '#F8FAFC' }}>Karier kamu,</span><br />
                <span className="shimmer-text">dipahami AI.</span>
              </motion.h1>

              <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
                style={{ fontFamily: "'Inter',sans-serif", fontSize: '17px', color: '#94A3B8', lineHeight: 1.75, marginBottom: '16px', maxWidth: '520px' }}>
                Upload CV kamu. CareerAI memahami pengalaman, skill, dan arah kariermu — lalu tunjukkan pekerjaan yang tepat, gap yang perlu diisi, dan jalan untuk berkembang.
              </motion.p>

              <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2.5}
                style={{ fontFamily: "'Inter',sans-serif", fontSize: '14px', color: '#64748B', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Award size={15} color="#2DD4BF" />
                Cocok untuk mahasiswa, fresh graduate, junior, hingga mid-level.
              </motion.p>

              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="hero-cta" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '36px' }}>
                <Link to="/upload" className="btn-primary">
                  <Upload size={16} /> Analisis CV Sekarang
                  <ArrowRight size={15} />
                </Link>
                <Link to="/cv-builder" className="btn-outline">
                  <FileText size={16} /> Buat CV dengan AI
                </Link>
              </motion.div>

              {/* Trust row */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4} style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex' }}>
                    {['#14B8A6', '#4F7CFF', '#8B5CF6', '#22D3EE', '#EC4899'].map((c, i) => (
                      <div key={i} style={{ width: '32px', height: '32px', borderRadius: '50%', background: `linear-gradient(135deg,${c},rgba(5,8,22,0.9))`, border: '2px solid #050816', marginLeft: i === 0 ? 0 : '-10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#F8FAFC', boxShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                        {['RD', 'AL', 'SY', 'IM', 'FT'][i]}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ display: 'flex', gap: '2px', marginBottom: '2px' }}>
                      {[...Array(5)].map((_, i) => <Star key={i} size={12} color="#F59E0B" fill="#F59E0B" />)}
                    </div>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '12px', color: '#64748B' }}>Dipercaya <strong style={{ color: '#F8FAFC' }}>2.400+</strong> pencari kerja</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '14px' }}>
                  {[{ Icon: Gift, label: 'Gratis' }, { Icon: Shield, label: 'Data Aman' }, { Icon: Zap, label: 'Instan' }].map(({ Icon, label }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Icon size={13} color="#2DD4BF" />
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '12px', color: '#64748B' }}>{label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column: Neat Floating AI Cards */}
            <div className="hero-cards" style={{ flex: '0 0 440px', maxWidth: '440px', position: 'relative', paddingTop: '10px', paddingBottom: '36px' }}>

              {/* Main AI Card */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'relative', zIndex: 3, animation: 'float1 7s ease-in-out infinite' }}
              >
                <div className="shimmer-border-card">
                  <div className="shimmer-border-card-inner" style={{ padding: '24px 26px' }}>
                    
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '10px',
                          background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.25) 0%, rgba(79, 124, 255, 0.25) 100%)',
                          border: '1px solid rgba(45, 212, 191, 0.45)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          boxShadow: '0 0 16px rgba(45, 212, 191, 0.35)',
                          position: 'relative'
                        }}>
                          <Bot size={18} color="#2DD4BF" style={{ filter: 'drop-shadow(0 0 6px rgba(45, 212, 191, 0.9))' }} />
                          <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '7px', height: '7px', borderRadius: '50%', background: '#2DD4BF', boxShadow: '0 0 8px #2DD4BF' }} />
                        </div>
                        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '12px', fontWeight: 800, color: '#2DD4BF', letterSpacing: '0.12em' }}>ANALISIS AI</span>
                      </div>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {DEMO_ROLES.map((r, idx) => (
                          <button
                            key={r.role}
                            onClick={() => setSelectedRoleIdx(idx)}
                            style={{
                              border: 'none', borderRadius: '6px', padding: '3px 8px', fontSize: '10px',
                              fontFamily: "'Inter',sans-serif", fontWeight: 600, cursor: 'pointer',
                              background: selectedRoleIdx === idx ? 'rgba(45,212,191,0.2)' : 'rgba(255,255,255,0.04)',
                              color: selectedRoleIdx === idx ? '#2DD4BF' : '#64748B',
                              transition: 'all 0.2s',
                            }}
                          >
                            {r.role.split(' ')[0]}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Role & Score */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentDemo.role}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                          <div>
                            <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: '19px', color: '#F8FAFC', marginBottom: '4px' }}>
                              {currentDemo.role}
                            </div>
                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: '13px', color: '#64748B' }}>
                              {currentDemo.level}
                            </div>
                          </div>

                          {/* Animated Score Gauge */}
                          <div style={{ position: 'relative', width: '64px', height: '64px', flexShrink: 0 }}>
                            <svg width="64" height="64" viewBox="0 0 64 64" style={{ transform: 'rotate(-90deg)' }}>
                              <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                              <motion.circle
                                cx="32" cy="32" r="26" fill="none" stroke="url(#heroScoreGrad)" strokeWidth="4.5" strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 26}`}
                                initial={{ strokeDashoffset: 2 * Math.PI * 26 }}
                                animate={{ strokeDashoffset: 2 * Math.PI * 26 * (1 - currentDemo.score / 100) }}
                                transition={{ duration: 1.2, ease: 'easeOut' }}
                              />
                              <defs>
                                <linearGradient id="heroScoreGrad" x1="0" y1="0" x2="1" y2="0">
                                  <stop offset="0%" stopColor="#2DD4BF" />
                                  <stop offset="50%" stopColor="#4F7CFF" />
                                  <stop offset="100%" stopColor="#8B5CF6" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: '15px', color: '#F8FAFC' }}>
                                {currentDemo.score}%
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Detected Skills */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                          {currentDemo.skills.map(sk => (
                            <span key={sk.l} className={`skill-tag ${sk.matched ? 'skill-tosca' : 'skill-missing'}`}>
                              {sk.matched ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                              {sk.l}
                            </span>
                          ))}
                        </div>

                        {/* Match Action Banner */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '12px', background: 'rgba(20,184,166,0.08)', border: '1px solid rgba(45,212,191,0.22)', transition: 'all 0.2s' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Briefcase size={15} color="#2DD4BF" />
                            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '13px', color: '#2DD4BF', fontWeight: 600 }}>
                              {currentDemo.jobs} lowongan cocok ditemukan
                            </span>
                          </div>
                          <ChevronRight size={15} color="#2DD4BF" />
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* Bottom Left Floating Mini Card: Job Match */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.75, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  bottom: '-10px',
                  left: '-14px',
                  zIndex: 4,
                  background: 'rgba(15, 23, 42, 0.92)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(79, 124, 255, 0.35)',
                  borderRadius: '16px',
                  padding: '14px 20px',
                  boxShadow: '0 12px 36px rgba(0,0,0,0.6), 0 0 24px rgba(79,124,255,0.25)',
                  animation: 'float2 8s ease-in-out infinite 1s',
                  minWidth: '140px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <BadgeCheck size={14} color="#4F7CFF" />
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '10px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.08em' }}>KECOCOKAN KERJA</span>
                </div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 900, fontSize: '32px', color: '#F8FAFC', lineHeight: 1 }}>
                  <AnimatedNumber target={currentDemo.score + 2} suffix="%" />
                </div>
              </motion.div>

              {/* Bottom Right Floating Mini Card: Skills Count */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.95, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  bottom: '-24px',
                  right: '-14px',
                  zIndex: 4,
                  background: 'rgba(15, 23, 42, 0.92)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(45, 212, 191, 0.35)',
                  borderRadius: '16px',
                  padding: '14px 20px',
                  boxShadow: '0 12px 36px rgba(0,0,0,0.6), 0 0 24px rgba(20,184,166,0.25)',
                  animation: 'float3 9s ease-in-out infinite 0.5s',
                  minWidth: '140px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <TrendingUp size={14} color="#2DD4BF" />
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '10px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.08em' }}>SKILL TERDETEKSI</span>
                </div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 900, fontSize: '32px', color: '#F8FAFC', lineHeight: 1 }}>+12</div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

        {/* ══ STATS BAR ══ */}
        <section style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.018)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px', textAlign: 'center' }}>
              {[
                { Icon: Users,    num: 2400,  suffix: '+', label: 'Pengguna Aktif' },
                { Icon: Target,   num: 94,    suffix: '%', label: 'Rata-rata Kecocokan' },
                { Icon: FileText, num: 12000, suffix: '+', label: 'CV Dianalisis' },
                { Icon: Star,     num: 98,    suffix: '%', label: 'Kepuasan Pengguna' },
              ].map(({ Icon, num, suffix, label }, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                    <Icon size={20} color="#4F7CFF" />
                  </div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 900, fontSize: '36px', letterSpacing: '-1.5px' }}>
                    <span className="shimmer-text"><AnimatedNumber target={num} suffix={suffix} /></span>
                  </div>
                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: '13px', color: '#475569', marginTop: '4px' }}>{label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ ALUR / FLOW ══ */}
        <section id="alur" style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 24px' }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span className="section-label" style={{ color: '#4F7CFF' }}>ALUR PLATFORM</span>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontWeight: 900, fontSize: '42px', color: '#F8FAFC', letterSpacing: '-1.5px', margin: '0 0 14px' }}>
              Dari CV ke Karier Impian
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '16px', color: '#64748B', maxWidth: '440px', margin: '0 auto', lineHeight: 1.7 }}>
              Empat langkah sederhana. Satu platform AI yang benar-benar memahami kariermu.
            </p>
          </motion.div>

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexWrap: 'wrap', gap: '0' }}>
            {FLOW_STEPS.map((s, i) => (
              <React.Fragment key={i}>
                <motion.div
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                  onClick={() => setActiveFlow(i)}
                  style={{
                    flex: '0 0 210px', maxWidth: '210px', cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                    padding: '24px 16px', borderRadius: '20px',
                    background: activeFlow === i ? `rgba(${s.cRgb},0.1)` : 'transparent',
                    border: activeFlow === i ? `1px solid rgba(${s.cRgb},0.3)` : '1px solid transparent',
                    boxShadow: activeFlow === i ? `0 0 40px rgba(${s.cRgb},0.12)` : 'none',
                    transition: 'all 0.35s ease', position: 'relative', overflow: 'hidden',
                  }}
                >
                  {activeFlow === i && (
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '20px', background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent)', animation: 'shimmerSweep 2.5s ease-in-out infinite', pointerEvents: 'none' }} />
                  )}
                  <div style={{ width: '64px', height: '64px', borderRadius: '18px', marginBottom: '16px', background: `rgba(${s.cRgb},0.12)`, border: `1px solid rgba(${s.cRgb},0.25)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: activeFlow === i ? `0 0 24px rgba(${s.cRgb},0.3)` : 'none', transition: 'box-shadow 0.3s ease' }}>
                    <s.Icon size={26} color={s.color} />
                  </div>
                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: '11px', fontWeight: 700, color: s.color, letterSpacing: '0.1em', marginBottom: '8px' }}>{s.step}</div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '15px', color: '#F8FAFC', margin: '0 0 8px' }}>{s.title}</h3>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '13px', color: '#64748B', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                  <AnimatePresence>
                    {activeFlow === i && (
                      <motion.p initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 10 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} transition={{ duration: 0.3 }}
                        style={{ fontFamily: "'Inter',sans-serif", fontSize: '12px', color: s.color, lineHeight: 1.55, overflow: 'hidden' }}>
                        {s.detail}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {i < 3 && (
                  <ShimmerBrokenConnector color={s.color} active={activeFlow === i || activeFlow === i + 1} stepIndex={i} />
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* ══ FEATURES ══ */}
        <section id="fitur" style={{ background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 24px' }}>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '60px' }}>
              <span className="section-label" style={{ color: '#8B5CF6' }}>FITUR UNGGULAN</span>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontWeight: 900, fontSize: '42px', color: '#F8FAFC', letterSpacing: '-1.5px', margin: '0 0 14px' }}>Semua yang kamu butuhkan</h2>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '16px', color: '#64748B', maxWidth: '440px', margin: '0 auto', lineHeight: 1.7 }}>CareerAI bukan sekadar CV builder — platform lengkap untuk memahami dan mengembangkan karier.</p>
            </motion.div>

            <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
              {FEATURES.map((f, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i % 3}
                  whileHover={{ y: -5 }}
                  className="glass-card sweep-parent"
                  style={{ padding: '28px', transition: 'all 0.25s ease', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `rgba(${f.cRgb},0.25)`; e.currentTarget.style.boxShadow = `0 0 40px rgba(${f.cRgb},0.1)`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', marginBottom: '18px', background: `rgba(${f.cRgb},0.1)`, border: `1px solid rgba(${f.cRgb},0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <f.Icon size={22} color={f.color} />
                  </div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontWeight: 700, fontSize: '15px', color: '#F8FAFC', margin: '0 0 10px' }}>{f.title}</h3>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '13px', color: '#64748B', lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ AI EXPERIENCE ══ */}
        <section id="ai-intelligence" style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 24px' }}>
          <div className="ai-exp-grid" style={{ display: 'flex', alignItems: 'center', gap: '64px' }}>
            {/* Left */}
            <div style={{ flex: 1 }}>
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <span className="section-label" style={{ color: '#8B5CF6' }}>AI INTELLIGENCE</span>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontWeight: 900, fontSize: '38px', color: '#F8FAFC', letterSpacing: '-1.2px', margin: '0 0 18px', lineHeight: 1.15 }}>
                  AI tidak hanya membaca CV kamu.<br />
                  <span className="shimmer-text">Dia memahami kariermu.</span>
                </h2>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '15px', color: '#64748B', lineHeight: 1.75, marginBottom: '32px' }}>
                  CareerAI melampaui pencocokan kata kunci biasa. Dia membaca lintasan kariermu, kekuatanmu, potensimu — dan memberikan gambaran lengkap tentang di mana kamu berada dan ke mana kamu bisa pergi.
                </p>
              </motion.div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {AI_FEATURES.map((f, i) => (
                  <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                    className="glass-card sweep-parent"
                    style={{ display: 'flex', gap: '14px', padding: '16px', transition: 'all 0.2s ease', cursor: 'default' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `rgba(${f.cRgb},0.25)`; e.currentTarget.style.background = `rgba(${f.cRgb},0.04)`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                  >
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `rgba(${f.cRgb},0.1)`, border: `1px solid rgba(${f.cRgb},0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <f.Icon size={18} color={f.color} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: '14px', color: '#F8FAFC', marginBottom: '4px' }}>{f.title}</div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: '13px', color: '#64748B' }}>{f.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Career Profile Card */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              style={{ flex: '0 0 360px', maxWidth: '360px' }}>
              <div className="shimmer-border-card">
                <div className="shimmer-border-card-inner" style={{ padding: '30px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                    <span className="badge-dot" style={{ background: '#2DD4BF', boxShadow: '0 0 10px #2DD4BF' }} />
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '11px', fontWeight: 700, color: '#2DD4BF', letterSpacing: '0.1em' }}>PROFIL KARIER</span>
                  </div>

                  <div style={{ textAlign: 'center', marginBottom: '22px' }}>
                    <div style={{ position: 'relative', width: '76px', height: '76px', margin: '0 auto 12px' }}>
                      <div style={{
                        width: '76px',
                        height: '76px',
                        borderRadius: '50%',
                        padding: '3px',
                        background: 'linear-gradient(135deg, #14B8A6 0%, #4F7CFF 50%, #8B5CF6 100%)',
                        boxShadow: '0 0 25px rgba(45, 212, 191, 0.5), 0 0 15px rgba(79, 124, 255, 0.4)',
                        overflow: 'hidden'
                      }}>
                        <img
                          src={userAvatarPng}
                          alt="Profil Pengguna"
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '2px',
                          right: '2px',
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          background: '#2DD4BF',
                          border: '2.5px solid #050816',
                          boxShadow: '0 0 10px #2DD4BF',
                        }}
                      />
                    </div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '17px', color: '#F8FAFC' }}>Digital Marketing Specialist</div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: '12px', color: '#94A3B8', marginTop: '3px' }}>Level Specialist</div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '10px', padding: '4px 12px', borderRadius: '99px', background: 'rgba(20, 184, 166, 0.12)', border: '1px solid rgba(45, 212, 191, 0.3)' }}>
                      <span className="shimmer-text" style={{ fontFamily: "'Inter',sans-serif", fontSize: '13px', fontWeight: 700 }}>94%</span>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '11px', color: '#2DD4BF' }}>Confidence</span>
                    </div>
                  </div>

                  <div style={{ marginBottom: '18px' }}>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: '10px', color: '#64748B', marginBottom: '8px', letterSpacing: '0.08em' }}>SKILL UTAMA</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {['SEO & Content', 'Google Ads', 'Social Media', 'Copywriting', 'Analytics', 'CRM'].map((sk, idx) => (
                        <span key={sk} className={`skill-tag ${idx % 2 === 0 ? 'skill-tosca' : 'skill-matched'}`}>{sk}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '18px' }}>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: '10px', color: '#64748B', marginBottom: '10px', letterSpacing: '0.08em' }}>SKOR PROFIL</div>
                    <ProgressBar label="Skill Teknis" value={88} color="#2DD4BF" delay={0.2} />
                    <ProgressBar label="Pengalaman"   value={74} color="#4F7CFF" delay={0.35} />
                    <ProgressBar label="Pendidikan"   value={95} color="#8B5CF6" delay={0.5} />
                  </div>

                  <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'rgba(20, 184, 166, 0.08)', border: '1px solid rgba(45, 212, 191, 0.22)', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                      <Brain size={12} color="#2DD4BF" />
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '11px', color: '#2DD4BF', fontWeight: 600 }}>Insight AI</span>
                    </div>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '13px', color: '#CBD5E1', lineHeight: 1.55, margin: 0 }}>Fondasi backend yang kuat dengan kemampuan full-stack berkembang. Fokus ke Docker dan cloud selanjutnya.</p>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '12px', color: '#475569' }}>Arah Karier: </span>
                    <span className="shimmer-text" style={{ fontFamily: "'Inter',sans-serif", fontSize: '12px', fontWeight: 700 }}>Backend → Full Stack</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ TESTIMONIALS ══ */}
        <section id="testimoni" style={{ background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 24px' }}>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <span className="section-label" style={{ color: '#22D3EE' }}>KATA PENGGUNA</span>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontWeight: 900, fontSize: '38px', color: '#F8FAFC', letterSpacing: '-1.2px', margin: '0 0 12px' }}>
                Ribuan karier sudah dimulai di sini
              </h2>
            </motion.div>

            <div className="testi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
              {TESTIMONIALS.map((t, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                  className="glass-card" style={{ padding: '28px' }}>
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
                    {[...Array(t.stars)].map((_, j) => <Star key={j} size={13} color="#F59E0B" fill="#F59E0B" />)}
                  </div>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '14px', color: '#94A3B8', lineHeight: 1.7, margin: '0 0 20px' }}>"{t.quote}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '18px' }}>
                    <div style={{ position: 'relative', width: '46px', height: '46px', borderRadius: '50%', flexShrink: 0, padding: '2px', background: `linear-gradient(135deg, rgba(${t.cRgb},0.8), rgba(5,8,22,0.6))`, boxShadow: `0 0 14px rgba(${t.cRgb},0.4)`, overflow: 'hidden' }}>
                      <img
                        src={t.avatar}
                        alt={t.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: '14px', color: '#F8FAFC' }}>{t.name}</div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: '12px', color: '#475569' }}>{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA FINAL ══ */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px 48px' }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ textAlign: 'center', padding: '80px 40px', borderRadius: '28px', position: 'relative', overflow: 'hidden' }}>
            {/* shimmer border frame */}
            <div style={{ position: 'absolute', inset: 0, borderRadius: '28px', padding: '1px', background: 'linear-gradient(120deg,rgba(79,124,255,0.5),rgba(139,92,246,0.5),rgba(34,211,238,0.5),rgba(139,92,246,0.5),rgba(79,124,255,0.5))', backgroundSize: '300% 300%', animation: 'shimmerBorder 4s ease infinite', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
            <div style={{ position: 'absolute', inset: 0, borderRadius: '28px', background: 'rgba(5,8,22,0.93)', backdropFilter: 'blur(20px)' }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '250px', background: 'radial-gradient(ellipse,rgba(79,124,255,0.1) 0%,transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <span className="section-label" style={{ color: '#4F7CFF' }}>MULAI SEKARANG</span>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontWeight: 900, fontSize: '46px', color: '#F8FAFC', letterSpacing: '-2px', margin: '0 0 16px', lineHeight: 1.1 }}>
                Siap memahami<br /><span className="shimmer-text">karier kamu?</span>
              </h2>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '16px', color: '#94A3B8', maxWidth: '450px', margin: '0 auto 40px', lineHeight: 1.7 }}>
                Bergabunglah dengan ribuan pengguna yang sudah menemukan arah kariernya. Upload CV sekarang — gratis, tanpa kartu kredit.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
                <Link to="/upload" className="btn-primary">
                  <Upload size={15} /> Analisis CV Sekarang
                  <ArrowRight size={15} />
                </Link>
                <Link to="/register" className="btn-outline">
                  <UserPlus size={15} /> Daftar Gratis
                </Link>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                {[{ Icon: Gift, label: 'Gratis selamanya' }, { Icon: Shield, label: 'Data terenkripsi' }, { Icon: Zap, label: 'Hasil dalam detik' }].map(({ Icon, label }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Icon size={14} color="#4F7CFF" />
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '13px', color: '#94A3B8' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

      </div>
      <ChatBubble />
      <Footer />
    </main>
  );
};

export default Landing;


