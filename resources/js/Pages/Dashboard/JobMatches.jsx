import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  Search, MapPin, Briefcase, CheckCircle2, AlertCircle,
  ExternalLink, Sparkles, RefreshCw, Check, Filter,
  Building2, Globe, Clock, ShieldCheck, ArrowRight, X, ChevronDown, MessageSquare
} from 'lucide-react';

const COUNTRY_OPTIONS = [
  { code: 'id', label: '🇮🇩 Indonesia', name: 'Indonesia' },
  { code: 'sg', label: '🇸🇬 Singapura', name: 'Singapura' },
  { code: 'my', label: '🇲🇾 Malaysia', name: 'Malaysia' },
  { code: 'us', label: '🇺🇸 Amerika Serikat', name: 'USA' },
  { code: 'gb', label: '🇬🇧 Inggris (UK)', name: 'UK' },
  { code: 'au', label: '🇦🇺 Australia', name: 'Australia' },
  { code: 'ca', label: '🇨🇦 Kanada', name: 'Kanada' },
];

const JOB_TYPE_OPTIONS = [
  { id: 'all', label: 'Semua Jenis Pekerjaan' },
  { id: 'full_time', label: '⚡ Penuh Waktu (Full-Time)' },
  { id: 'part_time', label: '⏱ Paruh Waktu (Part-Time)' },
  { id: 'remote', label: '🌐 Kerja Remote (WFH)' },
  { id: 'internship', label: '🎓 Magang (Internship)' },
  { id: 'contract', label: '📄 Kontrak (Contract)' },
];

export default function JobMatches({ jobs: initialJobs = [], user }) {
  const [keyword, setKeyword] = useState(user?.role || 'Backend Developer');
  const [country, setCountry] = useState('id');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('all');
  const [jobList, setJobList] = useState(initialJobs);
  const [page, setPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedJobIds, setAppliedJobIds] = useState([]);

  // Sync initial jobs
  useEffect(() => {
    if (initialJobs && initialJobs.length > 0) {
      setJobList(initialJobs);
    }
  }, [initialJobs]);

  // Real-Time Job Search API
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setIsSearching(true);
    setPage(1);

    try {
      const response = await axios.get('/api/dashboard/live-data', {
        params: {
          target_role: keyword,
          location: location,
          country: country,
          job_type: jobType,
          page: 1,
        },
      });

      if (response.data && response.data.jobs) {
        setJobList(response.data.jobs);
        setHasMore(response.data.jobs.length >= 4);
      }
    } catch (err) {
      console.warn('Realtime job search notice:', err);
    } finally {
      setIsSearching(false);
    }
  };

  // Load Next Batch of Jobs (Pagination / Infinite Scroll)
  const loadNextBatch = async () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    const nextPage = page + 1;

    try {
      const response = await axios.get('/api/dashboard/live-data', {
        params: {
          target_role: keyword,
          location: location,
          country: country,
          job_type: jobType,
          page: nextPage,
        },
      });

      if (response.data && response.data.jobs && response.data.jobs.length > 0) {
        setJobList((prev) => [...prev, ...response.data.jobs]);
        setPage(nextPage);
        setHasMore(response.data.jobs.length >= 4);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.warn('Load more jobs error:', err);
      setHasMore(false);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Open external apply link
  const handleApplyRedirect = (job) => {
    if (!appliedJobIds.includes(job.id)) {
      setAppliedJobIds((prev) => [...prev, job.id]);
    }
    const targetUrl = job.apply_url || 'https://www.adzuna.id';
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  // Automatically trigger AI Assistant Chat Bubble with specific job context
  const handleAskAIAboutJob = (job) => {
    setSelectedJob(null);
    const countryName = COUNTRY_OPTIONS.find(c => c.code === country)?.name || 'Indonesia';
    const prompt = `Halo AI Assistant! Saya tertarik dengan lowongan "${job.title}" di "${job.company}" (${job.location || countryName}). Gaji: ${job.salary || 'Kompetitif'}. Tolong berikan analisis kualifikasi utama, tips interview teknis/HR, dan strategi melamar untuk posisi ini agar lolos seleksi!`;
    
    // Dispatch event to ChatBubble.jsx
    window.dispatchEvent(new CustomEvent('ask-career-ai', { detail: { prompt, job } }));
  };

  return (
    <div className="space-y-6">

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* ── SEARCH & MULTI-FILTER HEADER (Negara, Kota, Jenis Pekerjaan) ── */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <div className="bg-[#070B1D]/90 border border-slate-800 rounded-3xl p-5 sm:p-6 backdrop-blur-2xl shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                <Globe size={11} className="text-teal-400" /> Live Adzuna & Jooble API
              </span>
              <span className="text-[11px] text-slate-400 font-semibold">
                Total <strong className="text-teal-300">{jobList.length} Lowongan</strong> Terdeteksi
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-100">
              Pencarian Lowongan Kerja Real-Time Global
            </h3>
          </div>
        </div>

        {/* Search & Filter Form */}
        <form onSubmit={handleSearch} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            
            {/* Keyword / Posisi Input */}
            <div className="sm:col-span-4 relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Posisi / Keyword (contoh: Backend, React)..."
                className="w-full bg-slate-900 border border-slate-800 focus:border-teal-400 rounded-2xl py-3 pl-11 pr-4 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
              />
            </div>

            {/* Negara Select Dropdown */}
            <div className="sm:col-span-3 relative">
              <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none z-10" />
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 focus:border-teal-400 rounded-2xl py-3 pl-11 pr-8 text-xs text-slate-100 focus:outline-none transition-all appearance-none cursor-pointer"
              >
                {COUNTRY_OPTIONS.map((c) => (
                  <option key={c.code} value={c.code} className="bg-slate-900 text-slate-100">
                    {c.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>

            {/* Kota / Lokasi Input */}
            <div className="sm:col-span-3 relative">
              <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Kota (contoh: Jakarta, Surabaya, Remote)..."
                className="w-full bg-slate-900 border border-slate-800 focus:border-teal-400 rounded-2xl py-3 pl-11 pr-4 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
              />
            </div>

            {/* Search Action Button */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={isSearching}
                className="shimmer-btn-primary w-full h-full py-3 text-xs font-extrabold justify-center cursor-pointer disabled:opacity-50"
              >
                {isSearching ? (
                  <>
                    <RefreshCw size={14} className="animate-spin text-teal-300" />
                    <span>Cari...</span>
                  </>
                ) : (
                  <>
                    <Search size={14} />
                    <span>Cari Live</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Additional Filter Row (Jenis Pekerjaan & Quick Pill Location) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
            {/* Jenis Pekerjaan Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                <Briefcase size={12} className="text-teal-400" /> Jenis Kerja:
              </span>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="bg-slate-900/90 border border-slate-800 focus:border-teal-400 rounded-xl px-3 py-1.5 text-xs text-teal-300 font-semibold focus:outline-none cursor-pointer"
              >
                {JOB_TYPE_OPTIONS.map((jt) => (
                  <option key={jt.id} value={jt.id} className="bg-slate-900 text-slate-100">
                    {jt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Location Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Kota Populer:</span>
              {['Jakarta', 'Bandung', 'Surabaya', 'Remote', 'Singapore'].map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => { setLocation(city); handleSearch(); }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                    location.toLowerCase() === city.toLowerCase()
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700/50'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* ── JOB CARDS GRID ── */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {jobList.map((job, idx) => {
          const isApplied = appliedJobIds.includes(job.id);
          const matchPercentage = job.matchScore || job.match || 90;
          const matchedSkills = job.matched_skills || ['PHP', 'Laravel', 'MySQL'];
          const missingSkills = job.missing_skills || ['Docker'];

          return (
            <motion.div
              key={job.id || idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-slate-900/80 border border-slate-800 hover:border-teal-500/40 rounded-3xl p-5 backdrop-blur-xl flex flex-col justify-between transition-all group hover:shadow-2xl hover:shadow-teal-500/10"
            >
              <div>
                {/* Header Badge Row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-black flex items-center gap-1">
                    <Sparkles size={11} className="text-teal-400" />
                    {matchPercentage}% Match AI
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-400 text-[10px] font-bold">
                    {job.source || 'Live API'}
                  </span>
                </div>

                {/* Job Title & Company */}
                <h4 className="font-extrabold text-base sm:text-lg text-slate-100 group-hover:text-teal-300 transition-colors line-clamp-2">
                  {job.title}
                </h4>

                <div className="space-y-1 my-2 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-300">
                    <Building2 size={13} className="text-teal-400" />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-indigo-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-teal-400 font-bold">
                    <span>💰 {job.salary}</span>
                  </div>
                </div>

                {/* Description Snippet */}
                <p className="text-[11px] text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {job.description}
                </p>

                {/* Matched Skills Chips */}
                <div className="flex flex-wrap gap-1 mb-5">
                  {matchedSkills.slice(0, 3).map((sk) => (
                    <span key={sk} className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-semibold flex items-center gap-1">
                      <Check size={10} /> {sk}
                    </span>
                  ))}
                  {missingSkills.slice(0, 1).map((sk) => (
                    <span key={sk} className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] font-semibold">
                      ⚠ {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Actions */}
              <div className="pt-3 border-t border-slate-800/80 grid grid-cols-12 gap-2">
                {/* Detail Modal Trigger */}
                <button
                  type="button"
                  onClick={() => setSelectedJob(job)}
                  className="col-span-4 shimmer-btn-outline justify-center py-2 text-[11px] font-bold"
                >
                  Detail
                </button>

                {/* Ask AI Trigger Button */}
                <button
                  type="button"
                  onClick={() => handleAskAIAboutJob(job)}
                  className="col-span-4 bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-300 rounded-xl justify-center py-2 text-[11px] font-extrabold flex items-center gap-1 transition-all cursor-pointer"
                  title="Tanya AI Assistant tentang pekerjaan ini"
                >
                  <Sparkles size={12} className="text-yellow-400 animate-pulse" />
                  <span>Tanya AI</span>
                </button>

                {/* Apply Button */}
                <button
                  type="button"
                  onClick={() => handleApplyRedirect(job)}
                  className="col-span-4 shimmer-btn-primary justify-center py-2 text-[11px] font-extrabold cursor-pointer"
                >
                  <span>{isApplied ? 'Terkirim ✓' : 'Lamar'}</span>
                  <ExternalLink size={12} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* ── SKELETON LOADER BATCH (10 BY 10 SCROLL TRIGGER) ── */}
      {/* ════════════════════════════════════════════════════════════════ */}
      {isLoadingMore && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 animate-pulse space-y-3">
              <div className="h-4 bg-slate-800 rounded w-1/3" />
              <div className="h-6 bg-slate-800 rounded w-3/4" />
              <div className="h-4 bg-slate-800 rounded w-1/2" />
              <div className="h-12 bg-slate-800 rounded-xl w-full" />
            </div>
          ))}
        </div>
      )}

      {/* Load More Batch Button */}
      {hasMore && !isLoadingMore && (
        <div className="pt-6 text-center">
          <button
            type="button"
            onClick={loadNextBatch}
            className="shimmer-btn-outline px-8 py-3 text-xs font-extrabold justify-center cursor-pointer inline-flex items-center gap-2"
          >
            <span>Muat 10 Lowongan Kerja Lagi...</span>
            <ChevronDown size={15} />
          </button>
        </div>
      )}

      {!hasMore && jobList.length > 0 && (
        <div className="py-6 text-center text-slate-500 text-xs font-bold">
          ✓ Seluruh lowongan real-time yang cocok telah ditampilkan.
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* ── JOB DETAIL MODAL (WITH TANYA AI & REDIRECT APPLY BUTTON) ── */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#070B1D] border border-teal-500/30 rounded-3xl p-6 sm:p-8 max-w-xl w-full relative shadow-2xl text-slate-100"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Modal Content */}
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-black">
                    {selectedJob.matchScore || selectedJob.match || 90}% Match AI
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold">
                    Sumber: {selectedJob.source || 'Adzuna API'}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-xl sm:text-2xl text-slate-100">{selectedJob.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    🏢 <strong>{selectedJob.company}</strong> • 📍 {selectedJob.location}
                  </p>
                  <p className="text-xs text-teal-400 font-extrabold mt-1">
                    💰 Gaji: {selectedJob.salary}
                  </p>
                </div>

                {/* Job Description Box */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2 max-h-48 overflow-y-auto leading-relaxed">
                  <strong className="text-slate-100 block">Deskripsi & Kualifikasi Pekerjaan:</strong>
                  <p>{selectedJob.description}</p>
                </div>

                {/* Skills breakdown */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Kesesuaian Skill dengan Profil Kamu:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {(selectedJob.matched_skills || ['PHP', 'Laravel', 'MySQL']).map((sk) => (
                      <span key={sk} className="px-2.5 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1">
                        <Check size={12} /> {sk} (Terpenuhi)
                      </span>
                    ))}
                    {(selectedJob.missing_skills || ['Docker']).map((sk) => (
                      <span key={sk} className="px-2.5 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1">
                        ⚠ {sk} (Perlu Ditingkatkan)
                      </span>
                    ))}
                  </div>
                </div>

                {/* PROMINENT TANYA AI BUTTON */}
                <button
                  type="button"
                  onClick={() => handleAskAIAboutJob(selectedJob)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-teal-500 via-indigo-600 to-purple-600 hover:from-teal-400 hover:to-purple-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/25 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Sparkles size={17} className="text-yellow-300 animate-pulse" />
                  <span>🤖 Tanya AI Assistant tentang Pekerjaan Ini</span>
                </button>

                {/* Modal Footer Actions */}
                <div className="pt-3 flex items-center gap-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="px-5 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 cursor-pointer"
                  >
                    Tutup
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyRedirect(selectedJob)}
                    className="shimmer-btn-primary flex-1 py-3 text-xs font-extrabold justify-center cursor-pointer shadow-lg shadow-teal-500/30"
                  >
                    <span>Lamar Pekerjaan Sekarang</span>
                    <ExternalLink size={15} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
