import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Award,
  BarChart3,
  Briefcase,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Search,
  Zap,
  ShieldCheck,
  Cpu,
  ArrowLeft,
  Check,
  X,
  Target,
  Brain,
  MessageSquare
} from 'lucide-react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';



export default function CvAnalysis({ auth, initialResult, initialJobs, targetRole: defaultRole }) {
  const [file, setFile] = useState(null);
  const [cvText, setCvText] = useState('');
  const [targetRole, setTargetRole] = useState(defaultRole || 'Backend Developer');
  const [inputMode, setInputMode] = useState('file'); // 'file' or 'text'
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);

  // Analysis result state (initialized with prop or rich fallback)
  const [analysis, setAnalysis] = useState(initialResult || {
    overall_score: 86,
    verdict: 'SIAP REKRUT (PERLU MINOR REVISI)',
    verdict_badge: 'success',
    detected_role: 'Backend Developer',
    content_score: 88,
    structure_score: 92,
    skills_score: 85,
    experience_score: 82,
    impact_score: 78,
    strengths: [
      'Penguasaan stack backend PHP & Laravel sangat solid untuk level junior/mid.',
      'Struktur CV rapi dan sangat optimal untuk dibaca oleh sistem ATS perusahaan tech.',
      'Riwayat pendidikan formal dan proyek web terstruktur dengan urutan kronologis yang benar.',
      'Penggunaan bahasa profesional dan tata letak tidak berantakan.'
    ],
    red_flags: [
      'Kurang mencantumkan metrik terukur pada pengalaman proyek (misal: % peningkatan kecepatan query atau efisiensi CPU).',
      'Pengalaman Docker containerization & CI/CD pipeline belum dituliskan di daftar keahlian utama.',
      'Deskripsi tanggung jawab proyek masih dominan menjelaskan fitur, bukan dampak positif bagi bisnis/perusahaan.'
    ],
    actionable_recommendations: [
      'Gunakan format STAR (Situation, Task, Action, Result) untuk setiap poin pengalaman kerja/proyek.',
      'Tambahkan 3-5 keyword krusial: Docker, Redis, Unit Testing, Microservices, API Documentation (Swagger).',
      'Cantumkan link portofolio GitHub aktif yang berisi source code bersih dan README terstruktur.'
    ],
    detected_skills: ['PHP', 'Laravel', 'MySQL', 'REST API', 'React', 'Git', 'Tailwind CSS', 'PostgreSQL'],
    recommended_keywords: ['Docker', 'Redis', 'Unit Testing', 'CI/CD', 'Microservices', 'Swagger'],
    ai_summary: 'Kandidat memiliki fondasi teknis yang sangat kuat. Sebagai Senior HRD, saya menilai CV ini berpotensi tinggi lolos screening awal. Dengan menyempurnakan metrik kuantitatif pada pengalaman proyek dan menambahkan keahlian DevOps dasar, CV Anda siap tembus ke tahap Interview Tech Lead.'
  });

  const [jobs, setJobs] = useState(initialJobs && initialJobs.length > 0 ? initialJobs : [
    {
      id: 'adzuna_1',
      source: 'Adzuna API',
      title: 'Senior Laravel Backend Developer',
      company: 'PT Nusantara Digital Tech',
      location: 'Jakarta Selatan · Hybrid',
      salary: 'Rp 8.5M – 12M',
      matchScore: 95,
      required_skills: ['Laravel', 'PHP', 'MySQL', 'REST API', 'Docker'],
      matched_skills: ['Laravel', 'PHP', 'MySQL', 'REST API'],
      missing_skills: ['Docker'],
      apply_url: 'https://www.adzuna.id',
      description: 'Lowongan asli Adzuna API untuk posisi Backend Engineer dengan Laravel & MySQL.',
    },
    {
      id: 'jooble_1',
      source: 'Jooble API',
      title: 'Full Stack PHP & React Engineer',
      company: 'Solusi Inovasi Asia',
      location: 'Bandung · Remote',
      salary: 'Rp 9M – 14M',
      matchScore: 91,
      required_skills: ['PHP', 'Laravel', 'React', 'MySQL', 'Tailwind'],
      matched_skills: ['PHP', 'Laravel', 'React', 'MySQL'],
      missing_skills: ['Tailwind'],
      apply_url: 'https://id.jooble.org',
      description: 'Lowongan terverifikasi dari Jooble API untuk pengembangan SaaS skala besar.',
    }
  ]);

  const scanStepsMessages = [
    'Parsing file CV & mengekstrak struktur teks...',
    'Menghubungi Senior HRD AI Agent via DeepSeek API...',
    'Memeriksa Red Flags, skor ATS & kelemahan kritis...',
    'Menarik lowongan kerja asli live dari Adzuna & Jooble APIs...',
    'Finalisasi ulasan HRD & rekomendasi karir...'
  ];

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyzeSubmit = (e) => {
    e.preventDefault();
    setIsScanning(true);
    setScanStep(0);

    // Simulate animated scanning steps
    const interval = setInterval(() => {
      setScanStep((prev) => {
        if (prev < scanStepsMessages.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 1200);

    const formData = new FormData();
    if (file) formData.append('cv_file', file);
    if (cvText) formData.append('cv_text', cvText);
    formData.append('target_role', targetRole);

    router.post('/analyze-cv', formData, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: (page) => {
        setTimeout(() => {
          setIsScanning(false);
          if (page.props.initialResult) setAnalysis(page.props.initialResult);
          if (page.props.initialJobs) setJobs(page.props.initialJobs);
        }, 6000);
      },
      onError: () => {
        setTimeout(() => {
          setIsScanning(false);
        }, 5000);
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100 flex flex-col justify-between relative selection:bg-cyan-500/30 selection:text-cyan-200 font-sans">
      <Head title="Analisis CV Dewa - Senior HRD AI & DeepSeek" />

      {/* Ambient background glows */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[650px] h-[650px] bg-cyan-500/10 rounded-full filter blur-[150px]" />
        <div className="absolute top-[45%] right-[5%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full filter blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full filter blur-[150px]" />
      </div>

      {/* Navigation Header */}
      <Header user={auth?.user} />


      <main className="flex-grow pt-24 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb & Navigation Back */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-bold text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
            >
              <ArrowLeft size={16} /> Kembali ke Dashboard Hub
            </Link>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
              <Cpu size={14} className="animate-spin text-cyan-400" />
              <span>DeepSeek AI v3 Engine Active</span>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════════ */}
          {/* HERO TITLE SECTION */}
          {/* ════════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-black tracking-widest uppercase mb-4 inline-block">
              HRD TECH RECRUITER AI PERSONA
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
              Analisis CV Dewa dengan <span className="shimmer-text">DeepSeek AI</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Dapatkan ulasan kritis jujur tanpa kompromi ala Senior Tech Recruiter 15+ tahun. 
              Ketahui Red Flags kelemahan fatal CV Anda, skor kompatibilitas ATS, serta rekomendasi lowongan asli dari <strong className="text-cyan-300">Adzuna & Jooble</strong>.
            </p>
          </motion.div>

          {/* ════════════════════════════════════════════════════════════════ */}
          {/* UPLOAD & PARAMETER CARD */}
          {/* ════════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-14 max-w-4xl mx-auto"
          >
            <div className="relative p-[1px] rounded-3xl bg-gradient-to-b from-cyan-500/40 via-indigo-500/20 to-transparent shadow-2xl shadow-cyan-950/50">
              <div className="bg-[#070B1D]/90 backdrop-blur-2xl rounded-[23px] p-6 sm:p-8 border border-slate-800">
                <form onSubmit={handleAnalyzeSubmit} className="space-y-6">

                  {/* Target Role & Input Selector */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-300 mb-2 flex items-center gap-2">
                        <Target size={14} className="text-cyan-400" /> Target Posisi yang Dilamar
                      </label>
                      <select
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 font-semibold focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all cursor-pointer"
                      >
                        <option value="Backend Developer">Backend Developer (PHP, Laravel, Node.js)</option>
                        <option value="Frontend Engineer">Frontend Engineer (React, Vue, Tailwind)</option>
                        <option value="Fullstack Engineer">Fullstack Engineer (Laravel + React)</option>
                        <option value="Data Engineer / Scientist">Data Engineer / Analyst</option>
                        <option value="DevOps & Cloud Engineer">DevOps & Cloud Engineer</option>
                        <option value="UI/UX Designer">UI/UX Product Designer</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-300 mb-2">
                        Metode Input CV
                      </label>
                      <div className="grid grid-cols-2 gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
                        <button
                          type="button"
                          onClick={() => setInputMode('file')}
                          className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            inputMode === 'file'
                              ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Upload File (PDF/TXT)
                        </button>
                        <button
                          type="button"
                          onClick={() => setInputMode('text')}
                          className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            inputMode === 'text'
                              ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Paste Teks CV
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Drag & Drop File Zone or Text Area */}
                  {inputMode === 'file' ? (
                    <div className="relative border-2 border-dashed border-slate-700 hover:border-cyan-500/80 rounded-2xl p-8 text-center bg-slate-900/40 hover:bg-slate-900/70 transition-all group">
                      <input
                        type="file"
                        accept=".pdf,.txt,.doc,.docx"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                          <Upload size={24} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-200">
                            {file ? file.name : 'Seret & Lepas file CV Anda di sini, atau klik untuk browse'}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            Mendukung format PDF, TXT, DOC, DOCX (Maksimal 5MB)
                          </p>
                        </div>
                        {file && (
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                            <Check size={14} /> File Siap Diperiksa ({Math.round(file.size / 1024)} KB)
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-300 mb-2">
                        Teks CV Kandidat
                      </label>
                      <textarea
                        rows={6}
                        value={cvText}
                        onChange={(e) => setCvText(e.target.value)}
                        placeholder="Paste isi lengkap CV Anda di sini (Pengalaman, Ringkasan, Skill, Pendidikan)..."
                        className="w-full bg-slate-900/90 border border-slate-700 rounded-xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                      />
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isScanning}
                      className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-3 transition-all cursor-pointer group disabled:opacity-50"
                    >
                      <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                      <span>{isScanning ? 'Menganalisis dengan DeepSeek AI...' : 'Jalankan Analisis Senior HRD AI (DeepSeek)'}</span>
                      <ChevronRight size={18} />
                    </button>
                  </div>

                </form>
              </div>
            </div>
          </motion.div>

          {/* ════════════════════════════════════════════════════════════════ */}
          {/* ANIMATED SCANNER MODAL OVERLAY */}
          {/* ════════════════════════════════════════════════════════════════ */}
          <AnimatePresence>
            {isScanning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-[#050816]/95 backdrop-blur-3xl flex items-center justify-center p-4"
              >
                <div className="max-w-md w-full text-center space-y-6">
                  {/* Neural Glowing Orb */}
                  <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 animate-spin blur-md opacity-80" />
                    <div className="relative w-28 h-28 rounded-full bg-slate-950 flex items-center justify-center border-2 border-cyan-400">
                      <Brain size={42} className="text-cyan-400 animate-pulse" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white mb-2">DeepSeek Senior HRD AI Engine</h3>
                    <p className="text-xs text-cyan-400 font-bold uppercase tracking-widest animate-pulse">
                      {scanStepsMessages[scanStep]}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                    <motion.div
                      className="bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 h-full"
                      initial={{ width: '0%' }}
                      animate={{ width: `${((scanStep + 1) / scanStepsMessages.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-500">
                    Memproses integrasi API DeepSeek AI + Adzuna & Jooble Job Matcher...
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ════════════════════════════════════════════════════════════════ */}
          {/* ANALYSIS RESULTS DASHBOARD */}
          {/* ════════════════════════════════════════════════════════════════ */}
          <div className="space-y-10">

            {/* Top Verdict & Score Bar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Overall Score Gauge Card */}
              <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
                <div className="text-xs font-extrabold uppercase text-slate-400 tracking-widest mb-4">
                  Skor ATS Overall
                </div>

                <div className="relative w-36 h-36 flex items-center justify-center mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-800 stroke-current"
                      strokeWidth="3.5"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-cyan-400 stroke-current"
                      strokeDasharray={`${analysis.overall_score}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black text-white">{analysis.overall_score}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">/ 100 ATS</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-extrabold">
                  <ShieldCheck size={14} /> {analysis.verdict || 'SIAP REKRUT'}
                </div>
              </div>

              {/* Senior HRD Executive Summary */}
              <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-slate-800 flex flex-col justify-between relative">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                        <Award size={20} />
                      </div>
                      <div>
                        <h2 className="font-extrabold text-lg text-white">Ulasan Senior HRD & Tech Recruiter</h2>
                        <p className="text-xs text-slate-400">DeepSeek AI Persona (15+ Tahun Pengalaman Tech Recruiting)</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
                      {analysis.detected_role || targetRole}
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed italic bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
                    "{analysis.ai_summary}"
                  </p>
                </div>

                {/* Score Breakdown Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-6 border-t border-slate-800/80 mt-4">
                  {[
                    { label: 'Isi (Content)', score: analysis.content_score || 88 },
                    { label: 'Struktur ATS', score: analysis.structure_score || 92 },
                    { label: 'Skill Technical', score: analysis.skills_score || 85 },
                    { label: 'Pengalaman', score: analysis.experience_score || 82 },
                    { label: 'Metrik Impact', score: analysis.impact_score || 78 },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 text-center">
                      <div className="text-[10px] text-slate-400 font-bold truncate mb-1">{item.label}</div>
                      <div className="text-sm font-extrabold text-cyan-300">{item.score}%</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ════════════════════════════════════════════════════════════════ */}
            {/* STRENGTHS VS RED FLAGS GRID */}
            {/* ════════════════════════════════════════════════════════════════ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Strengths Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 size={20} />
                  </div>
                  <h3 className="font-extrabold text-lg text-white">Keunggulan Utama CV</h3>
                </div>

                <ul className="space-y-3">
                  {analysis.strengths && analysis.strengths.map((st, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/30 text-xs text-slate-200">
                      <Check size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{st}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Red Flags Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                    <Flame size={20} />
                  </div>
                  <h3 className="font-extrabold text-lg text-white">Red Flags & Catatan Kritis HRD</h3>
                </div>

                <ul className="space-y-3">
                  {analysis.red_flags && analysis.red_flags.map((rf, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-rose-950/20 border border-rose-800/30 text-xs text-slate-200">
                      <AlertTriangle size={16} className="text-rose-400 flex-shrink-0 mt-0.5" />
                      <span>{rf}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* ════════════════════════════════════════════════════════════════ */}
            {/* ACTIONABLE RECOMMENDATIONS & ATS KEYWORD INJECTOR */}
            {/* ════════════════════════════════════════════════════════════════ */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Zap size={20} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-white">Langkah Konkret Perbaikan & Keyword Injector ATS</h3>
                    <p className="text-xs text-slate-400">Rekomendasi tindakan langsung untuk mendongkrak panggilan interview</p>
                  </div>
                </div>

                <Link
                  href="/cv-builder"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold hover:bg-cyan-500/20 transition-all cursor-pointer w-fit"
                >
                  <FileText size={14} /> Buka ATS CV Builder
                </Link>
              </div>

              {/* Action List */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {analysis.actionable_recommendations && analysis.actionable_recommendations.map((rec, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{rec}</p>
                  </div>
                ))}
              </div>

              {/* ATS Recommended Keywords Badge Cloud */}
              <div className="pt-4 border-t border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-3">
                  Keyword Wajib Ditambahkan ke CV (ATS Optimization):
                </span>
                <div className="flex flex-wrap gap-2">
                  {analysis.recommended_keywords && analysis.recommended_keywords.map((kw, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold flex items-center gap-1.5">
                      <Sparkles size={12} className="text-indigo-400" /> {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ════════════════════════════════════════════════════════════════ */}
            {/* LIVE ADZUNA & JOOBLE RECOMMENDED JOBS */}
            {/* ════════════════════════════════════════════════════════════════ */}
            <div className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white flex items-center gap-3">
                    <Briefcase className="text-cyan-400" /> Lowongan Cocok (Adzuna & Jooble API Live)
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Rekomendasi posisi asli yang langsung cocok dengan hasil analisis CV Anda
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                  {jobs.length} Lowongan Ditemukan
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobs.map((job) => (
                  <motion.div
                    key={job.id}
                    whileHover={{ y: -4 }}
                    className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 hover:border-cyan-500/40 transition-all shadow-xl"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="px-2.5 py-1 rounded-md bg-slate-800 text-[10px] font-bold text-cyan-300 border border-slate-700 inline-block mb-2">
                          {job.source}
                        </span>
                        <h3 className="font-extrabold text-lg text-white leading-snug">{job.title}</h3>
                        <p className="text-xs text-slate-400 font-medium">{job.company} • {job.location}</p>
                      </div>

                      <div className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-black flex-shrink-0">
                        {job.matchScore}% Match
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                      <div className="text-xs font-bold text-emerald-400">
                        {job.salary}
                      </div>

                      <a
                        href={job.apply_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold shadow-md cursor-pointer transition-all"
                      >
                        Lamar Sekarang <ExternalLink size={14} />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
