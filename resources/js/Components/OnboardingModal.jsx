import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  Sparkles, GraduationCap, Briefcase, Zap, CheckCircle2,
  ArrowRight, ArrowLeft, Check, ShieldCheck, Cpu, Star, Rocket,
} from 'lucide-react';

export default function OnboardingModal({ isOpen, onClose, user, onOnboardingComplete }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [education, setEducation] = useState(user?.education && user.education !== 'Belum diisi' ? user.education : 'S1 Teknik Informatika');
  const [level, setLevel] = useState(user?.level && user.level !== 'Belum diatur' ? user.level : 'Fresh Graduate');
  const [targetRole, setTargetRole] = useState(user?.role && user.role !== 'Belum diatur' ? user.role : 'Backend Developer');
  const [selectedSkills, setSelectedSkills] = useState(() => {
    if (user?.skills_list) {
      if (Array.isArray(user.skills_list)) return user.skills_list;
      if (typeof user.skills_list === 'string' && user.skills_list.trim() !== '') {
        return user.skills_list.split(',').map(s => s.trim()).filter(Boolean);
      }
    }
    return ['PHP', 'Laravel', 'MySQL', 'React', 'Git'];
  });
  const [customSkill, setCustomSkill] = useState('');

  const POPULAR_SKILLS = [
    'PHP', 'Laravel', 'MySQL', 'React', 'JavaScript', 'TypeScript',
    'Node.js', 'Python', 'Docker', 'Redis', 'Git', 'Tailwind CSS',
    'PostgreSQL', 'Flutter', 'Figma', 'REST API', 'Unit Testing',
  ];

  const TARGET_ROLES = [
    { id: 'Backend Developer', title: 'Backend Developer', icon: '💻', desc: 'Laravel, Node.js, Python, Database' },
    { id: 'Frontend Developer', title: 'Frontend Developer', icon: '🎨', desc: 'React, Vue, Tailwind, UI/UX' },
    { id: 'Full Stack Developer', title: 'Full Stack Developer', icon: '⚡', desc: 'End-to-end Web Applications' },
    { id: 'Mobile App Developer', title: 'Mobile App Developer', icon: '📱', desc: 'Flutter, React Native, Android' },
    { id: 'UI/UX Designer', title: 'UI/UX Designer', icon: '✨', desc: 'Figma, Wireframing, User Research' },
    { id: 'AI / Data Engineer', title: 'AI / Data Engineer', icon: '🤖', desc: 'Python, Machine Learning, SQL' },
    { id: 'DevOps Engineer', title: 'DevOps Engineer', icon: '☁️', desc: 'Docker, CI/CD, Cloud Infrastructure' },
    { id: 'HRD / Recruiter', title: 'HRD / Recruiter', icon: '👥', desc: 'Talent Acquisition & HR Systems' },
  ];

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleAddCustomSkill = (e) => {
    e.preventDefault();
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      setSelectedSkills([...selectedSkills, customSkill.trim()]);
      setCustomSkill('');
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const payload = {
        education,
        experience_level: level,
        target_role: targetRole,
        skills_list: selectedSkills,
      };

      const response = await axios.post('/api/onboarding/complete', payload);

      if (response.data && response.data.success) {
        setStep(3); // Step 3: Success & AI Analysis
        if (onOnboardingComplete) {
          onOnboardingComplete(response.data);
        }
      } else {
        setErrorMsg(response.data.message || 'Gagal menyimpan onboarding');
      }
    } catch (err) {
      console.error('Onboarding submit error:', err);
      setErrorMsg(err.response?.data?.message || 'Terjadi kesalahan sistem saat menyimpan');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-[#070B1D] border border-teal-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-slate-100"
      >
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full filter blur-3xl pointer-events-none" />

        {/* Step Progress Header */}
        <div className="relative z-10 mb-8 pb-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <div className="text-xs font-black text-teal-400 uppercase tracking-widest">
                LANGKAH {step} DARI 3 • AI ONBOARDING
              </div>
              <h3 className="font-extrabold text-lg text-slate-100">
                {step === 1 && 'Pendidikan & Level Pengalaman'}
                {step === 2 && 'Target Role Impian & Keahlian'}
                {step === 3 && 'Hasil Analisis Real-Time AI'}
              </h3>
            </div>
          </div>

          {/* Step Indicator Bullets */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-3 h-3 rounded-full transition-all ${
                  s === step
                    ? 'bg-teal-400 shadow-md shadow-teal-400 scale-110'
                    : s < step
                    ? 'bg-emerald-500'
                    : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-semibold">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* ── STEP 1: Pendidikan & Status ── */}
        {/* ════════════════════════════════════════════════════════════════ */}
        {step === 1 && (
          <div className="space-y-6 relative z-10">
            {/* Status / Level */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Status / Level Karir Saat Ini
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['Fresh Graduate', 'Mahasiswa Active', 'Junior Level (0-2 Thn)', 'Mid-Level (2-5 Thn)', 'Senior Level (5+ Thn)'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setLevel(lvl)}
                    className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all cursor-pointer ${
                      level === lvl
                        ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow-lg shadow-teal-500/10'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span>{lvl}</span>
                      {level === lvl && <CheckCircle2 size={14} className="text-teal-400" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pendidikan Terakhir */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Pendidikan Terakhir / Sedang Ditempuh
              </label>
              <select
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 focus:border-teal-400 rounded-2xl p-3.5 text-xs text-slate-100 font-semibold focus:outline-none"
              >
                <option value="S1 Teknik Informatika">S1 Teknik Informatika / Ilmu Komputer</option>
                <option value="S1 Sistem Informasi">S1 Sistem Informasi / Teknologi Informasi</option>
                <option value="D3 Teknik Komputer">D3 Teknik / Manajamen Komputer</option>
                <option value="SMA / SMK Rekayasa Perangkat Lunak">SMA / SMK (RPL / TKJ / Umum)</option>
                <option value="S1 Non-IT / Otodidak">S1 Non-IT / Belajar Otodidak</option>
                <option value="S2 / Pascasarjana">S2 / Pascasarjana</option>
              </select>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="shimmer-btn-primary px-6 py-3 text-xs font-extrabold cursor-pointer"
              >
                <span>Lanjut ke Langkah 2</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* ── STEP 2: Target Role & Skills ── */}
        {/* ════════════════════════════════════════════════════════════════ */}
        {step === 2 && (
          <div className="space-y-6 relative z-10 max-h-[60vh] overflow-y-auto pr-1">
            {/* Target Role Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Pilih Target Role / Posisi Impianmu
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TARGET_ROLES.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setTargetRole(r.id)}
                    className={`p-3.5 rounded-2xl border text-xs text-left transition-all cursor-pointer flex items-start gap-3 ${
                      targetRole === r.id
                        ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow-lg shadow-teal-500/10'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xl">{r.icon}</span>
                    <div className="flex-1">
                      <div className="font-extrabold text-slate-100">{r.title}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{r.desc}</div>
                    </div>
                    {targetRole === r.id && <CheckCircle2 size={16} className="text-teal-400 flex-shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Skills */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Pilih Skill / Keahlian Yang Sudah Kamu Kuasai ({selectedSkills.length} Terpilih)
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {POPULAR_SKILLS.map((sk) => {
                  const isSelected = selectedSkills.includes(sk);
                  return (
                    <button
                      key={sk}
                      type="button"
                      onClick={() => toggleSkill(sk)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow-md shadow-teal-500/10'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {isSelected ? <Check size={12} className="text-teal-400" /> : '+'}
                      <span>{sk}</span>
                    </button>
                  );
                })}
              </div>

              {/* Add Custom Skill */}
              <form onSubmit={handleAddCustomSkill} className="flex gap-2">
                <input
                  type="text"
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  placeholder="+ Tambah skill lainnya (contoh: PostgreSQL, Docker)"
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:border-teal-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Tambah
                </button>
              </form>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-800">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 cursor-pointer flex items-center gap-2"
              >
                <ArrowLeft size={14} /> Kembali
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="shimmer-btn-primary px-6 py-3 text-xs font-extrabold cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin text-teal-400">⏳</span> Memproses Analisis AI...
                  </>
                ) : (
                  <>
                    <span>Simpan & Jalankan Analisis AI</span>
                    <Sparkles size={15} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* ── STEP 3: AI Analysis Success ── */}
        {/* ════════════════════════════════════════════════════════════════ */}
        {step === 3 && (
          <div className="space-y-6 text-center relative z-10 py-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-500 to-indigo-500 flex items-center justify-center mx-auto shadow-xl shadow-teal-500/30"
            >
              <Rocket size={32} className="text-white" />
            </motion.div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-100">
                Analisis AI Real-Time Selesai! 🎉
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                Profilmu untuk posisi <strong className="text-teal-300">{targetRole}</strong> dengan skill ({selectedSkills.slice(0, 4).join(', ')}) telah dihubungkan ke API Adzuna & Jooble secara langsung.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold flex items-center justify-center gap-2">
              <ShieldCheck size={16} />
              <span>Skor Match, ATS, & Rekomendasi Lowongan Telah Diperbarui Real-Time</span>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={onClose}
                className="shimmer-btn-primary w-full py-3.5 text-xs font-extrabold justify-center cursor-pointer"
              >
                <span>Buka Dashboard Real-Time Baru</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
}
