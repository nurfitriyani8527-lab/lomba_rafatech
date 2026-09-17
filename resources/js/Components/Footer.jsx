import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Gift,
  Upload,
  ChevronRight,
} from 'lucide-react';

const FOOTER_LINKS = {
  'Fitur AI Workspace': [
    { label: 'Analisis CV AI', href: '/upload' },
    { label: 'Buat CV Harvard (ATS)', href: '/cv-builder' },
    { label: 'AI Job Matching', href: '/dashboard?tab=jobs' },
    { label: 'Deteksi Skill Gap', href: '/dashboard?tab=skills' },
    { label: 'Peta Jalan Karier (Roadmap)', href: '/dashboard?tab=roadmap' },
  ],
  'Menu Utama': [
    { label: 'Beranda', href: '/#hero' },
    { label: 'Alur Platform', href: '/#alur' },
    { label: 'Fitur Unggulan', href: '/#fitur' },
    { label: 'Teknologi AI', href: '/#ai-intelligence' },
    { label: 'Testimoni Pengguna', href: '/#testimoni' },
  ],
  'Legal & Keamanan': [
    { label: 'Kebijakan Privasi', href: '/' },
    { label: 'Syarat & Ketentuan', href: '/' },
    { label: 'Keamanan Data & Enkripsi', href: '/' },
  ],
};

const SOCIAL_LINKS = [
  {
    label: 'Twitter',
    href: '#',
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: '#',
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
];

const Footer = ({ compact = false }) => {
  if (compact) {
    return (
      <footer style={{ position: 'relative', background: 'rgba(7, 11, 26, 0.95)', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '16px 24px', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#2DD4BF', display: 'inline-block', boxShadow: '0 0 8px #2DD4BF' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: '#94A3B8' }}>
              CareerAI Platform v2.4 — Live Real-Time Connected
            </span>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#64748B', margin: 0 }}>
            © {new Date().getFullYear()} CareerAI • APEX AI Powered Experience
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer style={{ position: 'relative', background: 'rgba(5, 8, 22, 0.98)', overflow: 'hidden', zIndex: 10 }}>
      
      {/* Animated Top Shimmer Line */}
      <div
        style={{
          width: '100%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, #2DD4BF 25%, #4F7CFF 50%, #8B5CF6 75%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmerText 4s linear infinite',
        }}
      />

      {/* Glow Ambient Blobs */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '900px', height: '300px', background: 'radial-gradient(ellipse at top, rgba(45,212,191,0.07) 0%, rgba(79,124,255,0.05) 50%, transparent 70%)', filter: 'blur(70px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px 24px', position: 'relative', zIndex: 1 }}>

        {/* ══ FOOTER SHIMMER CTA BOX ══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '56px' }}
        >
          <div className="shimmer-border-card" style={{ borderRadius: '24px' }}>
            <div
              className="shimmer-border-card-inner"
              style={{
                padding: '40px 36px',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                flexWrap: 'wrap',
                gap: '24px',
                background: 'linear-gradient(135deg, rgba(5,8,22,0.96) 0%, rgba(15,23,42,0.96) 100%)',
              }}
            >
              <div>
                <span className="section-label" style={{ color: '#2DD4BF', marginBottom: '8px', display: 'inline-block' }}>
                  ✦ AI CAREER INTELLIGENCE PLATFORM
                </span>
                <h3 style={{
                  fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                  fontWeight: 900, fontSize: '28px', color: '#F8FAFC',
                  letterSpacing: '-0.8px', margin: '0 0 8px',
                }}>
                  Siap Memahami Arah Kariermu Bersama AI?
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#94A3B8', margin: 0, maxWidth: '540px' }}>
                  Upload CV kamu sekarang — gratis 100%, dapatkan skor ATS, pencocokan lowongan, dan peta jalan kariermu.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/upload" className="shimmer-btn-primary">
                  <Upload size={16} /> Upload & Analisis CV
                  <ArrowRight size={16} />
                </Link>
                <Link href="/cv-builder" className="shimmer-btn-outline">
                  Buat CV ATS (Harvard)
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ══ MAIN FOOTER GRID ══ */}
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: '48px', marginBottom: '48px' }}>

          {/* Brand Column */}
          <div className="footer-brand">
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '11px', marginBottom: '18px' }}>
              <div style={{
                position: 'relative', width: '38px', height: '38px', borderRadius: '11px',
                background: 'linear-gradient(135deg, #14B8A6 0%, #4F7CFF 50%, #8B5CF6 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 24px rgba(45,212,191,0.45)',
              }}>
                <Sparkles size={19} color="#fff" />
              </div>
              <span className="shimmer-text" style={{
                fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                fontWeight: 900, fontSize: '24px', letterSpacing: '-0.5px',
              }}>
                CareerAI
              </span>
            </Link>

            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#94A3B8', lineHeight: '1.7', marginBottom: '22px', maxWidth: '300px' }}>
              Platform kecerdasan buatan terdepan untuk mahasiswa, fresh graduate, dan profesional muda Indonesia.
            </p>

            {/* Trust Features */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
              {[
                { Icon: ShieldCheck, label: 'SSL 256-bit Aman' },
                { Icon: Zap, label: 'AI Engine v2.4' },
                { Icon: Gift, label: '100% Gratis' },
              ].map(({ Icon, label }) => (
                <div key={label} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '5px 12px', borderRadius: '8px',
                  background: 'rgba(20,184,166,0.08)', border: '1px solid rgba(45,212,191,0.22)',
                }}>
                  <Icon size={13} color="#2DD4BF" />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: '#CBD5E1' }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Social Media Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {SOCIAL_LINKS.map(({ label, href, svg }) => (
                <a key={label} href={href} aria-label={label} style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#94A3B8', textDecoration: 'none', transition: 'all 0.25s ease',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(20,184,166,0.15)';
                    e.currentTarget.style.borderColor = 'rgba(45,212,191,0.5)';
                    e.currentTarget.style.color = '#2DD4BF';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(45,212,191,0.3)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = '#94A3B8';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
                  }}
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className="footer-col">
              <h4 style={{
                fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontWeight: 800, fontSize: '13px',
                color: '#2DD4BF', letterSpacing: '0.12em', textTransform: 'uppercase',
                marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                <span className="badge-dot" style={{ width: '4px', height: '4px', background: '#2DD4BF' }} />
                {category}
              </h4>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} style={{
                      fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 500,
                      color: '#94A3B8', textDecoration: 'none', transition: 'all 0.2s ease',
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                    }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = '#2DD4BF';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = '#94A3B8';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <ChevronRight size={13} color="#2DD4BF" style={{ opacity: 0.6 }} />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ══ BOTTOM BAR ══ */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '16px',
        }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#64748B', margin: 0 }}>
            © {new Date().getFullYear()} CareerAI Platform — APEX AI Powered Experience for the Web. Hak cipta dilindungi.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2DD4BF', display: 'inline-block', boxShadow: '0 0 10px #2DD4BF' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: '#94A3B8' }}>
              Sistem AI Beroperasi Normal
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
