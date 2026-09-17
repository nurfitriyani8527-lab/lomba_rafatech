import React, { useState, useEffect, useCallback } from 'react';
import { usePage, Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { RefreshCw, Sparkles, Activity, Wifi, Settings, Sliders, CheckCircle2 } from 'lucide-react';
import DashboardLayout from '../Layouts/DashboardLayout';
import Overview from './Dashboard/Overview';
import CvAnalysis from './Dashboard/CvAnalysis';
import JobMatches from './Dashboard/JobMatches';
import CareerRoadmap from './Dashboard/CareerRoadmap';
import CvBuilder from './Dashboard/CvBuilder';
import SkeletonLoader from '../Components/SkeletonLoader';
import OnboardingModal from '../Components/OnboardingModal';
import FullscreenLoader from '../Components/FullscreenLoader';

export default function Dashboard(props) {
  const { url, props: pageProps } = usePage();
  const authUser = pageProps.auth?.user || props?.user || null;

  const [isLoading, setIsLoading] = useState(false);
  const [loadingSubmessage, setLoadingSubmessage] = useState('Menyiapkan fitur AI...');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString('id-ID'));
  const [latencyMs, setLatencyMs] = useState(18);

  // Onboarding Modal state (Manual trigger only from header button)
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // User state
  const [userState, setUserState] = useState({
    name: authUser?.name || 'Pengguna',
    email: authUser?.email || '',
    role: authUser?.target_role || 'Backend Developer',
    level: authUser?.experience_level || 'Junior Level',
    education: authUser?.education || 'Belum diisi',
    skills_list: authUser?.skills_list || '',
    avatar: authUser?.name ? authUser.name.substring(0, 2).toUpperCase() : 'AI',
    onboarding_completed: Boolean(authUser?.onboarding_completed),
  });

  // Live state for jobs and stats (No static dummy fallbacks for new users)
  const [jobsData, setJobsData] = useState(props?.jobs || []);
  const [statsData, setStatsData] = useState(props?.stats || {
    cvScore: null,
    careerMatch: 0,
    skillProgress: 0,
    recommendedJobs: props?.jobs ? props.jobs.length : 0,
    hasCv: false,
  });

  const TAB_SUBMESSAGES = {
    overview: 'Menyiapkan Gambaran Umum AI & Live Sync...',
    analysis: 'Menganalisis Dokumen CV & Skor ATS...',
    jobs: 'Mencari Lowongan Kerja Real-Time (Adzuna & Jooble API)...',
    roadmap: 'Menyusun Peta Jalan Karir AI...',
    'cv-builder': 'Menyiapkan Template Harvard ATS CV Builder...',
  };

  const determineInitialTab = () => {
    if (props?.initialTab) return props.initialTab;
    if (url.includes('/cv-builder')) return 'cv-builder';
    if (url.includes('tab=jobs')) return 'jobs';
    if (url.includes('tab=roadmap')) return 'roadmap';
    if (url.includes('tab=analysis')) return 'analysis';
    return 'overview';
  };

  const [activeTab, setActiveTab] = useState(() => determineInitialTab());

  // Tab switcher with FullscreenLoader animation transition
  const handleTabSwitch = (newTab) => {
    if (newTab === activeTab) return;
    const submsg = TAB_SUBMESSAGES[newTab] || 'Memuat fitur AI...';
    setLoadingSubmessage(submsg);
    setIsLoading(true);
    setActiveTab(newTab);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Real-Time Live Data Refresh
  const fetchLiveData = useCallback(async (silent = false) => {
    if (!silent) setIsRefreshing(true);
    const startTime = performance.now();
    try {
      const response = await axios.get('/api/dashboard/live-data', {
        params: { target_role: userState.role }
      });
      const endTime = performance.now();
      setLatencyMs(Math.round(endTime - startTime));

      if (response.data && response.data.success) {
        if (response.data.jobs) setJobsData(response.data.jobs);
        if (response.data.stats) setStatsData(response.data.stats);
        if (response.data.timestamp) setLastUpdated(response.data.timestamp);
      }
    } catch (err) {
      console.warn('Live API sync notice:', err);
    } finally {
      if (!silent) {
        setTimeout(() => setIsRefreshing(false), 500);
      }
    }
  }, [userState.role]);

  // Real-Time Polling Effect (Every 25 seconds)
  useEffect(() => {
    if (!autoSync) return;
    const interval = setInterval(() => {
      fetchLiveData(true);
    }, 25000);
    return () => clearInterval(interval);
  }, [autoSync, fetchLiveData]);

  // Handle Onboarding Completion
  const handleOnboardingComplete = (data) => {
    if (data.user) {
      setUserState(prev => ({
        ...prev,
        role: data.user.role,
        level: data.user.level,
        education: data.user.education,
        skills_list: data.user.skills_list,
        onboarding_completed: true,
      }));
    }
    if (data.jobs) setJobsData(data.jobs);
    if (data.stats) setStatsData(data.stats);
    setIsOnboardingOpen(false);
  };

  return (
    <DashboardLayout
      user={userState}
      activeTab={activeTab}
      setActiveTab={handleTabSwitch}
    >
      <Head title="Dashboard Real-Time" />
      
      {/* Fullscreen Loader on Tab Transitions */}
      <FullscreenLoader
        show={isLoading}
        message="Loading..."
        submessage={loadingSubmessage}
      />

      {/* Onboarding Modal Window */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        user={userState}
        onOnboardingComplete={handleOnboardingComplete}
      />

      {/* Real-Time Live Sync Status Header */}
      <div className="mb-6 p-4 rounded-2xl bg-[#070B1D]/90 border border-slate-800 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="relative w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-400" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                <Wifi size={13} className="text-teal-400" />
                LIVE API REAL-TIME CONNECTED
              </span>
              <span className="px-2 py-0.5 rounded-md bg-teal-500/15 border border-teal-500/30 text-[10px] font-extrabold text-teal-300">
                Adzuna & Jooble API
              </span>
              <span className="px-2 py-0.5 rounded-md bg-indigo-500/15 border border-indigo-500/30 text-[10px] font-bold text-indigo-300">
                Latency: {latencyMs}ms
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Terakhir sinkronisasi: <strong className="text-slate-200">{lastUpdated}</strong> • Total <strong className="text-teal-300">{jobsData.length} Lowongan Real-Time</strong> Tersedia
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {/* Onboarding Trigger Button */}
          <button
            onClick={() => setIsOnboardingOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-teal-300 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sliders size={14} className="text-teal-400" />
            <span>Onboarding / Edit Skill AI</span>
          </button>

          {/* Auto-Sync Toggle Button */}
          <button
            onClick={() => setAutoSync(v => !v)}
            className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              autoSync
                ? 'bg-teal-500/10 border-teal-500/30 text-teal-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            <Activity size={13} className={autoSync ? 'text-teal-400 animate-pulse' : ''} />
            <span>Auto Sync {autoSync ? 'ON (25s)' : 'OFF'}</span>
          </button>

          <Link
            href="/analyze-cv"
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-teal-500/20 to-indigo-500/20 border border-teal-500/30 hover:border-teal-500/60 text-teal-300 text-xs font-bold transition-all flex items-center gap-2"
          >
            <Sparkles size={14} className="text-teal-400" />
            <span>Analisis CV Dewa AI</span>
          </Link>

          <button
            onClick={() => fetchLiveData(false)}
            disabled={isRefreshing}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw size={14} className={`text-teal-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Sync Live...' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      {/* Skeleton Loading State or Active Tab Content */}
      {isLoading ? (
        <SkeletonLoader type={activeTab === 'jobs' ? 'jobs' : activeTab === 'analysis' ? 'analysis' : 'stats'} />
      ) : (
        <>
          {activeTab === 'overview' && (
            <Overview
              onNavigateTab={handleTabSwitch}
              jobs={jobsData}
              stats={statsData}
              user={userState}
              isRefreshing={isRefreshing}
            />
          )}
          {activeTab === 'analysis' && <CvAnalysis stats={statsData} user={userState} />}
          {activeTab === 'jobs' && <JobMatches jobs={jobsData} />}
          {activeTab === 'roadmap' && <CareerRoadmap stats={statsData} user={userState} jobs={jobsData} />}
          {activeTab === 'cv-builder' && <CvBuilder user={userState} stats={statsData} />}
        </>
      )}
    </DashboardLayout>
  );
}
