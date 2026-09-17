import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatBubble from '../Components/ChatBubble';
import Footer from '../Components/Footer';
import {
  Sparkles,
  FileText,
  Briefcase,
  BarChart3,
  Zap,
  Map,
  Brain,
  Mic,
  LogOut,
  Menu,
  X,
  ChevronRight,
  User,
  ShieldCheck,
  Bell,
  Search,
} from 'lucide-react';

export default function DashboardLayout({ children, user, activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview AI', icon: Brain, category: 'UTAMA' },
    { id: 'analysis', label: 'Analisis CV', icon: BarChart3, category: 'UTAMA' },
    { id: 'jobs', label: 'Lowongan (24)', icon: Briefcase, category: 'KARIR' },
    { id: 'skills', label: 'Skill Gap', icon: Zap, category: 'KARIR' },
    { id: 'roadmap', label: 'Career Roadmap', icon: Map, category: 'KARIR' },
    { id: 'cv-builder', label: 'ATS CV Builder', icon: FileText, category: 'ALAT' },
    { id: 'interview', label: 'Simulasi Interview', icon: Mic, category: 'ALAT' },
  ];

  const handleLogout = () => {
    router.post('/logout');
  };

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100 flex flex-col justify-between relative selection:bg-cyan-500/30 selection:text-cyan-200 font-sans">
      
      {/* Ambient background blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[0%] left-[15%] w-[600px] h-[600px] bg-teal-500/10 rounded-full filter blur-[140px]" />
        <div className="absolute top-[40%] right-[5%] w-[550px] h-[550px] bg-indigo-500/10 rounded-full filter blur-[140px]" />
      </div>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* ── DESKTOP LEFT GLASS SIDEBAR (Fixed lg:flex) ── */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <aside className="hidden lg:flex flex-col w-72 fixed inset-y-0 left-0 z-50 bg-[#070B1A]/85 backdrop-blur-2xl border-r border-slate-800/80 p-5 justify-between">
        
        {/* Top Logo & Brand */}
        <div>
          <Link href="/" className="flex items-center gap-3 px-2 py-2 mb-8 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:scale-105 transition-all">
              <Sparkles size={20} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="shimmer-text font-black text-xl tracking-tight leading-none">
                CareerAI
              </span>
              <span className="text-[9px] font-bold text-teal-400 tracking-widest uppercase mt-1">
                Workspace AI
              </span>
            </div>
          </Link>

          {/* Navigation Links with Category Headers */}
          <nav className="space-y-6">
            {['UTAMA', 'KARIR', 'ALAT'].map((cat) => {
              const catTabs = tabs.filter((t) => t.category === cat);
              if (catTabs.length === 0) return null;
              return (
                <div key={cat} className="space-y-1.5">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-3 mb-2">
                    {cat}
                  </div>
                  {catTabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer relative group ${
                          isActive
                            ? 'bg-gradient-to-r from-teal-500/20 to-indigo-500/20 text-teal-300 border border-teal-500/40 shadow-lg shadow-teal-500/10'
                            : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={16} className={isActive ? 'text-teal-400' : 'text-slate-500 group-hover:text-slate-300'} />
                          <span>{tab.label}</span>
                        </div>
                        {isActive && (
                          <motion.div
                            layoutId="activeSidebarGlow"
                            className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-md shadow-teal-400"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Card in Sidebar */}
        <div className="pt-4 border-t border-slate-800/80">
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-teal-500 to-indigo-500 flex items-center justify-center font-extrabold text-xs text-white flex-shrink-0 shadow-md">
                {user?.avatar || 'RD'}
              </div>
              <div className="overflow-hidden">
                <div className="font-bold text-xs text-slate-100 truncate">{user?.name || 'Rizki Dev'}</div>
                <div className="text-[10px] text-teal-400 truncate">{user?.role || 'Junior Backend'}</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Keluar"
              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 transition-all cursor-pointer"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>

      </aside>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* ── TOP APP BAR (For Mobile & Desktop Content Offset) ── */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <header className="lg:pl-72 fixed top-0 left-0 right-0 z-40 bg-[#050816]/90 backdrop-blur-2xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Mobile Logo & Brand */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-500 to-indigo-500 flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="shimmer-text font-black text-lg">CareerAI</span>
            </Link>
          </div>

          {/* Desktop Title & Status */}
          <div className="hidden lg:flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400">Workspace /</span>
            <span className="text-xs font-extrabold text-teal-300 uppercase tracking-wider">
              {tabs.find((t) => t.id === activeTab)?.label}
            </span>
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse ml-2" />
            <span className="text-[11px] text-slate-500">AI Engine Active</span>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400">
              <ShieldCheck size={14} className="text-teal-400" />
              <span>Sistem Terenkripsi SSL</span>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Slide-Over Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed top-16 inset-x-0 z-40 bg-[#070B1A]/98 backdrop-blur-3xl border-b border-slate-800 p-6 space-y-4"
          >
            <div className="space-y-2">
              {tabs.map((t) => {
                const Icon = t.icon;
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setActiveTab(t.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold ${
                      isActive ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} />
                      <span>{t.label}</span>
                    </div>
                    <ChevronRight size={16} />
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="text-xs font-bold text-slate-200">{user?.name}</div>
              <button onClick={handleLogout} className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 text-xs font-bold">
                Keluar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* ── MAIN CONTENT AREA (Offset lg:pl-72 for Sidebar) ── */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <main className="lg:pl-72 flex-grow pt-24 pb-28 lg:pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* ══ WELCOME USER BANNER ══ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="relative p-[1px] rounded-3xl bg-gradient-to-r from-teal-500/40 via-indigo-500/40 to-purple-500/40 shadow-2xl">
              <div className="bg-slate-900/90 backdrop-blur-2xl rounded-[23px] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                
                <div className="flex items-center gap-5 w-full md:w-auto">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-teal-500 via-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-teal-500/30 flex-shrink-0">
                    {user?.avatar || 'RD'}
                    <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900" />
                  </div>

                  <div>
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <h1 className="font-extrabold text-2xl sm:text-3xl text-slate-100">
                        Selamat Datang, {user?.name || 'Rizki Dev'}
                      </h1>
                      <span className="px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-bold flex items-center gap-1.5">
                        <Sparkles size={12} /> {user?.role || 'Backend Developer'} • {user?.level || 'Junior Level'}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm">
                      Profil CV kamu dianalisis oleh AI. Ada <strong className="text-teal-400 font-bold">24 lowongan cocok</strong> ditemukan hari ini.
                    </p>
                  </div>
                </div>

                {/* Banner Actions */}
                <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
                  <button onClick={() => setActiveTab('cv-builder')} className="shimmer-btn-primary px-5 py-2.5 text-xs font-bold">
                    <FileText size={15} /> Edit CV ATS
                  </button>
                  <button onClick={() => setActiveTab('jobs')} className="shimmer-btn-outline px-5 py-2.5 text-xs font-semibold">
                    <Briefcase size={15} /> Lihat Lowongan
                  </button>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Active Tab View Component */}
          {children}

        </div>
      </main>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* ── MOBILE BOTTOM FLOATING GLASS DOCK (Fixed lg:hidden) ── */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden fixed bottom-4 inset-x-4 z-50">
        <div className="bg-[#070B1A]/95 border border-slate-700/80 backdrop-blur-3xl rounded-2xl p-2 shadow-2xl shadow-black/80 flex items-center justify-around">
          {[
            { id: 'overview', label: 'Overview', icon: Brain },
            { id: 'jobs', label: 'Lowongan', icon: Briefcase },
            { id: 'skills', label: 'Skill Gap', icon: Zap },
            { id: 'cv-builder', label: 'CV ATS', icon: FileText },
            { id: 'interview', label: 'Interview', icon: Mic },
          ].map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl transition-all cursor-pointer relative ${
                  isActive ? 'text-teal-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-teal-400' : 'text-slate-500'} />
                <span className="text-[10px]">{t.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveDock"
                    className="absolute -bottom-1 w-4 h-1 rounded-full bg-teal-400 shadow-md shadow-teal-400"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating AI Assistant Chatbot */}
      <ChatBubble />

      {/* Footer */}
      <div className="lg:pl-72">
        <Footer compact={true} />
      </div>

    </div>
  );
}
