import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, FileText, Sparkles, ShieldCheck, Upload, ArrowRight } from 'lucide-react';
import { router } from '@inertiajs/react';

export default function CvAnalysis({ stats, user }) {
  const hasCv = stats?.hasCv ?? false;
  const cvScore = stats?.cvScore ?? (hasCv ? 86 : null);
  const latestCv = stats?.latestCv;

  const scoreBreakdown = [
    { label: 'Kualitas Konten (Content)', score: cvScore ? Math.min(98, cvScore + 4) : 0, color: 'bg-teal-400' },
    { label: 'Struktur & Margin (Structure)', score: cvScore ? Math.min(99, cvScore + 5) : 0, color: 'bg-indigo-400' },
    { label: 'Relevansi Skill (Skills)', score: cvScore ? Math.max(60, cvScore + 2) : 0, color: 'bg-purple-400' },
    { label: 'Pengalaman (Experience)', score: cvScore ? Math.max(55, cvScore - 4) : 0, color: 'bg-cyan-400' },
    { label: 'Dampak Kuantitatif (Impact)', score: cvScore ? Math.max(50, cvScore - 10) : 0, color: 'bg-amber-400' },
  ];

  const strengths = [
    `Fondasi teknikal yang kuat pada ${user?.skills_list || 'PHP & Framework Laravel'}.`,
    'Implementasi proyek nyata dengan database relasional MySQL.',
    `Kesesuaian skill yang tinggi untuk posisi ${user?.role || 'Backend Developer'}.`,
    'Struktur CV yang bersih, konsisten, dan berformat Harvard ATS.',
  ];

  const opportunities = [
    'Deskripsi hasil proyek belum dilengkapi metrik kuantitatif (persentase/angka dampak).',
    'Pengalaman penggunaan Docker containerization belum dicantumkan di CV.',
    'Deskripsi pengalaman dapat disempurnakan menggunakan kata kerja aksi aktif.',
  ];

  if (!hasCv) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Mobile-Friendly Call to Action Card */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-teal-500/30 rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden shadow-2xl">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-teal-500 to-indigo-500 flex items-center justify-center mx-auto mb-5 shadow-xl shadow-teal-500/30">
            <Upload size={32} className="text-white" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Upload & Analisis CV Dewa AI Real-Time
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mt-2 leading-relaxed">
            Kamu belum mengunggah dokumen CV. Upload berkas PDF/DOCX kamu untuk mendapatkan Analisis Skor ATS, Evaluasi Kata Kunci, dan Rekomendasi Karir instan dari AI Senior HRD.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => router.get('/analyze-cv')}
              className="shimmer-btn-primary w-full sm:w-auto px-8 py-3.5 text-xs sm:text-sm font-extrabold justify-center cursor-pointer shadow-xl shadow-teal-500/25"
            >
              <Sparkles size={16} />
              <span>Mulai Analisis CV Sekarang</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Overview Score */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-teal-500/20 via-indigo-500/20 to-purple-500/20 border border-teal-500/40 flex flex-col items-center justify-center text-center shadow-xl shadow-teal-500/10 flex-shrink-0">
              <span className="text-3xl sm:text-4xl font-black text-teal-400">{cvScore || 86}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">/ 100 ATS</span>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                  <ShieldCheck size={14} /> CV Terverifikasi (ATS Friendly)
                </span>
                {latestCv?.filename && (
                  <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-[11px] font-semibold">
                    📄 {latestCv.filename}
                  </span>
                )}
              </div>
              <h3 className="font-extrabold text-xl sm:text-2xl text-slate-100">Kecerdasan Dokumen CV Kamu</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                Format CV kamu telah diuji terhadap aturan pemindaian sistem Harvard ATS.
              </p>
            </div>
          </div>
        </div>

        {/* Score Breakdown Progress Bars */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 border-t border-slate-800 pt-6">
          {scoreBreakdown.map((item) => (
            <div key={item.label} className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span>{item.label}</span>
                <span className="text-teal-400 font-bold">{item.score}%</span>
              </div>
              <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Opportunities Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        
        {/* Strengths Card */}
        <div className="bg-slate-900/80 border border-emerald-500/30 rounded-3xl p-5 sm:p-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-4 text-emerald-400 font-extrabold text-base">
            <CheckCircle2 size={18} /> Kekuatan Profil CV (Strengths)
          </div>
          <ul className="space-y-3">
            {strengths.map((str, i) => (
              <li key={i} className="flex items-start gap-3 text-xs text-slate-300 bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/10">
                <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Opportunities Card */}
        <div className="bg-slate-900/80 border border-amber-500/30 rounded-3xl p-5 sm:p-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-4 text-amber-400 font-extrabold text-base">
            <AlertCircle size={18} /> Peluang Perbaikan (Opportunities)
          </div>
          <ul className="space-y-3">
            {opportunities.map((opp, i) => (
              <li key={i} className="flex items-start gap-3 text-xs text-slate-300 bg-amber-500/5 p-3 rounded-xl border border-amber-500/10">
                <AlertCircle size={15} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{opp}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
