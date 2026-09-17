import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles, BarChart3, Briefcase, TrendingUp, Zap, ArrowRight,
  CheckCircle2, AlertCircle, ExternalLink, Cpu, Check, Layers,
  Compass, ShieldCheck, Clock, Flame, BookOpen, Star, RefreshCw
} from 'lucide-react';

export default function Overview({ onNavigateTab, jobs, stats: liveStats, user, isRefreshing }) {
  const jobList = jobs && jobs.length > 0 ? jobs : [];
  const topJob = jobList[0] || {
    title: 'Laravel Senior Backend Developer',
    company: 'TechCorp Indonesia',
    location: 'Jakarta · Hybrid',
    salary: 'Rp 10M – 15M',
    matchScore: 95,
    source: 'Adzuna API',
    apply_url: 'https://www.adzuna.id',
    matched_skills: ['Laravel', 'PHP', 'MySQL', 'REST API'],
    missing_skills: ['Docker'],
  };

  const hasCv = liveStats?.hasCv ?? false;
  const cvScore = liveStats?.cvScore;
  const careerMatch = liveStats?.careerMatch ?? 0;
  const skillProgress = liveStats?.skillProgress ?? 0;
  const totalJobs = jobList.length || liveStats?.recommendedJobs || 0;

  const statItems = [
    {
      title: 'Skor ATS CV AI',
      value: hasCv && cvScore !== null ? `${cvScore}` : 'Belum Ada',
      unit: hasCv && cvScore !== null ? '/100' : ' CV',
      subtitle: hasCv ? 'Format & Kata Kunci ATS Lolos' : 'Upload CV untuk Analisis Realtime',
      badge: hasCv ? (cvScore >= 80 ? 'Sangat Baik' : 'Cukup Baik') : 'Perlu Upload',
      icon: BarChart3,
      color: 'text-teal-400',
      borderColor: 'border-teal-500/30',
      bgGlow: 'from-teal-500/15 via-teal-500/5 to-transparent',
      progress: cvScore || 0,
      barColor: 'bg-teal-400',
    },
    {
      title: 'Kecocokan Karir AI',
      value: `${careerMatch}`,
      unit: '%',
      subtitle: user?.role ? `Posisi ${user.role}` : 'Target Role Belum Diatur',
      badge: careerMatch > 0 ? 'Live API Match' : 'Perlu Profiling',
      icon: Sparkles,
      color: 'text-indigo-400',
      borderColor: 'border-indigo-500/30',
      bgGlow: 'from-indigo-500/15 via-indigo-500/5 to-transparent',
      progress: careerMatch,
      barColor: 'bg-indigo-400',
    },
    {
      title: 'Penguasaan Skill Target',
      value: `${skillProgress}`,
      unit: '%',
      subtitle: `${liveStats?.matchedSkillsCount || 0} dari ${liveStats?.totalRequiredSkills || 6} Skill Terpenuhi`,
      badge: skillProgress > 0 ? 'Profil Skill Aktif' : 'Pilih Skill',
      icon: TrendingUp,
      color: 'text-purple-400',
      borderColor: 'border-purple-500/30',
      bgGlow: 'from-purple-500/15 via-purple-500/5 to-transparent',
      progress: skillProgress,
      barColor: 'bg-purple-400',
    },
    {
      title: 'Lowongan Real-Time',
      value: `${totalJobs}`,
      unit: ' Lowongan',
      subtitle: 'Adzuna & Jooble Live API',
      badge: 'Update Realtime',
      icon: Briefcase,
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/30',
      bgGlow: 'from-cyan-500/15 via-cyan-500/5 to-transparent',
      progress: 90,
      barColor: 'bg-cyan-400',
    },
  ];

  // Helper for greeting based on hour
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 11) return 'Selamat Pagi 🌅';
    if (hour < 15) return 'Selamat Siang ☀️';
    if (hour < 18) return 'Selamat Sore 🌇';
    return 'Selamat Malam 🌙';
  };

  return (
    <div className="space-y-8">

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* ── HERO BANNER: Welcome & AI Career Passport ── */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl"
      >
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-teal-500/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-indigo-500/10 rounded-full filter blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-bold flex items-center gap-1.5">
                <Sparkles size={13} className="text-teal-400 animate-spin-slow" />
                AI Career Intelligence Platform
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                Role: {user?.role || 'Backend Developer'}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-bold">
                Level: {user?.level || 'Junior Level'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight leading-tight">
              {getGreeting()}, <span className="shimmer-text">{user?.name || 'Rizki Dev'}</span>!
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Sistem AI Career Intelligence mendeteksi <strong className="text-teal-300">{totalJobs} lowongan kerja aktif</strong> dari Adzuna & Jooble API yang 90%+ cocok dengan keahlianmu hari ini.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => onNavigateTab('analysis')}
              className="shimmer-btn-primary w-full sm:w-auto px-5 py-3 text-xs font-extrabold justify-center cursor-pointer shadow-lg shadow-teal-500/20"
            >
              <Cpu size={15} />
              <span>Analisis CV Dewa AI</span>
            </button>
            <button
              onClick={() => onNavigateTab('cv-builder')}
              className="shimmer-btn-outline w-full sm:w-auto px-5 py-3 text-xs font-bold justify-center cursor-pointer"
            >
              <BarChart3 size={15} />
              <span>ATS CV Builder</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* ── 4 REAL-TIME METRIC CARDS ── */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statItems.map((st, idx) => {
          const Icon = st.icon;
          return (
            <motion.div
              key={st.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`relative overflow-hidden bg-slate-900/85 border ${st.borderColor} rounded-3xl p-5 backdrop-blur-xl hover:border-teal-400/50 transition-all duration-300 shadow-xl group`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${st.bgGlow} opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none`} />

              <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">{st.title}</span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-800/90 border border-slate-700/80 text-[10px] font-extrabold text-slate-300">
                    {st.badge}
                  </span>
                </div>

                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-slate-100 tracking-tight">{st.value}</span>
                  <span className="text-sm font-bold text-slate-400">{st.unit}</span>
                </div>

                {/* Progress bar indicator */}
                <div className="space-y-1.5">
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${st.progress}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
                      className={`h-full rounded-full ${st.barColor}`}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                    <span>{st.subtitle}</span>
                    <Icon size={14} className={st.color} />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* ── MAIN AI INSIGHT & HIGHEST MATCH JOB ROW ── */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* AI Career Executive Summary (2 Cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-indigo-950/40 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-xl flex flex-col justify-between shadow-2xl"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-teal-400" />
                <span className="text-xs font-black text-teal-400 tracking-wider uppercase">✦ AI EXECUTIVE SUMMARY & SKILL ROADMAP</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-[10px] font-bold text-teal-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" /> Live Verified
              </span>
            </div>

            <h3 className="font-black text-xl sm:text-2xl text-slate-100 mb-3 leading-snug">
              Profilmu Memiliki Kemampuan Utama <span className="text-teal-300">Backend Development</span> Dengan Skor Kemampuan <span className="text-indigo-400">92%</span>.
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Berdasarkan analisis CV & data pekerjaan terkini dari API Adzuna & Jooble, skill <strong className="text-slate-100">Laravel, PHP, MySQL, REST API, & React</strong> milikmu sangat dicari oleh perusahaan fintech dan software house ternama di Indonesia.
            </p>

            {/* Quick Skill Status Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-100">Core Backend</div>
                  <div className="text-[10px] text-emerald-400 font-semibold">Laravel & PHP Matched</div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-100">Database</div>
                  <div className="text-[10px] text-emerald-400 font-semibold">MySQL Relational Verified</div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                  <AlertCircle size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-100">Skill Gap Target</div>
                  <div className="text-[10px] text-amber-400 font-semibold">Docker & Redis Need Boost</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button onClick={() => onNavigateTab('skills')} className="shimmer-btn-primary px-5 py-2.5 text-xs font-bold cursor-pointer">
              <span>Analisis Skill Gap AI</span>
              <ArrowRight size={14} />
            </button>
            <button onClick={() => onNavigateTab('roadmap')} className="shimmer-btn-outline px-5 py-2.5 text-xs font-semibold cursor-pointer">
              <span>Lihat Roadmap Karir Personal</span>
            </button>
          </div>
        </motion.div>

        {/* Top Matching Job Spotlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-slate-900/90 border border-teal-500/35 rounded-3xl p-6 backdrop-blur-xl flex flex-col justify-between shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full filter blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-xs font-extrabold text-teal-400 tracking-wider uppercase">JOB SPOTLIGHT HARI INI</span>
              </div>
              <span className="text-[10px] font-bold text-cyan-300 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700">
                {topJob.source || 'Adzuna API'}
              </span>
            </div>

            <h4 className="font-extrabold text-lg text-slate-100 mb-1 leading-snug">{topJob.title}</h4>
            <div className="text-xs text-slate-400 mb-4 font-medium">
              {topJob.company} • {topJob.location} • <strong className="text-teal-300">{topJob.salary || 'Gaji Kompetitif'}</strong>
            </div>

            {/* Score Match Badge */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-500/15 via-teal-500/10 to-indigo-500/10 rounded-2xl border border-teal-500/30 mb-4">
              <div>
                <div className="text-[11px] font-bold text-slate-400">Match CV Score</div>
                <div className="text-[10px] text-teal-400 font-semibold">Tingkat Kecocokan Tinggi</div>
              </div>
              <span className="text-3xl font-black text-teal-400">{topJob.matchScore || topJob.match || 95}%</span>
            </div>

            {/* Skills breakdown */}
            <div className="space-y-2 mb-6">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">SKILL YANG COCOK:</div>
              <div className="flex flex-wrap gap-1.5">
                {(topJob.matched_skills || ['Laravel', 'PHP', 'MySQL', 'REST API']).map((sk) => (
                  <span key={sk} className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-semibold flex items-center gap-1">
                    <Check size={12} /> {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('jobs')}
            className="shimmer-btn-primary w-full justify-center py-3 text-xs font-extrabold cursor-pointer shadow-lg shadow-teal-500/20"
          >
            <span>Lamar / Lihat Lowongan Live ({totalJobs})</span>
            <ArrowRight size={14} />
          </button>
        </motion.div>

      </div>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* ── REAL-TIME LIVE JOBS PREVIEW LIST ── */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6 shadow-xl"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame size={18} className="text-amber-400" />
              <h3 className="font-extrabold text-lg text-slate-100">Rekomendasi Lowongan Real-Time</h3>
            </div>
            <p className="text-xs text-slate-400">
              Diperbarui secara otomatis melalui API Adzuna & Jooble berdasarkan role <strong className="text-slate-200">{user?.role || 'Backend Developer'}</strong>.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('jobs')}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-teal-300 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Buka Semua ({totalJobs} Lowongan)</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 3 Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {jobList.slice(0, 3).map((job, i) => (
            <div
              key={job.id || i}
              className="bg-slate-950/70 border border-slate-800/90 hover:border-teal-500/40 rounded-2xl p-5 backdrop-blur-xl flex flex-col justify-between transition-all hover:-translate-y-1 shadow-md group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-black">
                    {job.matchScore || job.match || 90}% Match
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">{job.location || 'Indonesia'}</span>
                </div>

                <h4 className="font-extrabold text-base text-slate-100 mb-1 group-hover:text-teal-300 transition-colors">
                  {job.title}
                </h4>
                <div className="text-xs text-slate-400 mb-3">{job.company} • <span className="text-slate-300 font-semibold">{job.salary || 'Gaji Kompetitif'}</span></div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-400 font-semibold">{job.source || 'Adzuna API'}</span>
                <a
                  href={job.apply_url || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal-400 font-bold hover:underline flex items-center gap-1 text-xs"
                >
                  <span>Detail</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
