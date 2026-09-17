import React, { useState, useEffect, useRef } from 'react';
import { 
  Map, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  Send, 
  MessageSquare, 
  Bot, 
  User, 
  RefreshCw, 
  Zap, 
  Target, 
  Clock, 
  ListTodo, 
  FolderGit2, 
  Award, 
  Sliders, 
  Activity, 
  FileText,
  AlertCircle,
  Edit3,
  Trash2,
  Plus,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Check,
  X
} from 'lucide-react';
import axios from 'axios';

export default function CareerRoadmap({ stats = {}, user = {}, jobs = [] }) {
  const activeCv = stats?.activeCv || null;
  const userName = user?.name || 'Kandidat';
  const targetRole = user?.role || activeCv?.detected_role || 'Backend Developer';
  const userLevel = user?.level || 'Junior Level';
  const atsScore = activeCv?.ats_score || stats?.cvScore || 84;
  const cvFilename = activeCv?.filename || 'NUR FITRI YANI cv ats 2026.pdf';

  // Active View Mode: 'roadmap' or 'chat'
  const [viewMode, setViewMode] = useState('roadmap');

  // Loading & Toast Notification States
  const [isConsulting, setIsConsulting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Selected Node Detail Modal State
  const [selectedNode, setSelectedNode] = useState(null);

  // Edit / Create Node Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingNodeIndex, setEditingNodeIndex] = useState(null); // null if adding new node
  const [nodeFormData, setNodeFormData] = useState({
    title: '',
    timeframe: '',
    status: 'IN PROGRESS',
    current: false,
    desc: '',
    action_items_text: '',
    recommended_projects_text: '',
    key_skills_text: ''
  });

  // Checklist state for action items
  const [completedItems, setCompletedItems] = useState({});

  // Chat Conversation State
  const [conversation, setConversation] = useState([
    {
      sender: 'ai',
      text: `Halo **${userName}**! 👋 Saya adalah **Senior Tech Career Consultant AI** (Claude Engine Persona).\n\nSaya telah menganalisis berkas CV Anda (\`${cvFilename}\` dengan Skor ATS **${atsScore}/100**) untuk target posisi **${targetRole}**.\n\nAnda dapat **curhat** secara bebas tentang target karir Anda, dan saya akan secara otomatis menyusun serta menyesuaikan peta jalan karir (*roadmap*) Anda. Setelah itu, Anda juga dapat **mengubah alur, meng-edit, menghapus, atau menambah tahap baru** secara manual sesuka Anda!`,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');

  // Quick Prompts / Interactive Chips
  const [quickPrompts, setQuickPrompts] = useState([
    "🎯 Saya ingin fokus naik ke level Senior Backend & Gaji 2x lipat",
    "💰 Tolong buatkan roadmap fokus belajar DevOps, Docker & Kubernetes",
    "🌐 Saya ingin karir roadmap untuk melamar Lowongan Remote Overseas",
    "🚀 Saya bingung menentukan spesialisasi: Microservices vs Data Engineering"
  ]);

  // Master Plan Summary Title
  const [masterPlanSummary, setMasterPlanSummary] = useState(
    `Peta Jalan Karir Real-Time ${targetRole} — Disesuaikan dengan ${cvFilename}`
  );

  // Default Initial Roadmap Nodes
  const defaultInitialNodes = [
    {
      step: 1,
      title: `Tahap 1: Penguatan Core ${targetRole} & Clean Code`,
      timeframe: "Bulan 1 - 2",
      status: "YOU ARE HERE",
      current: true,
      desc: `Menguasai sintaks utama, arsitektur MVC terpisah, Service-Repository Pattern, dan penguatan CV ATS.`,
      action_items: [
        "Refactor logika controller ke Service Layer terpisah",
        "Implementasikan FormRequest Validation & Standard API Response",
        "Optimasi ringkasan pengalaman dan keyword CV format Harvard ATS"
      ],
      recommended_projects: [
        "RESTful Monolith API Refactored to Clean Service Layer"
      ],
      key_skills: stats?.userSkills?.length > 0 ? stats.userSkills.slice(0, 4) : ["PHP", "Laravel", "MySQL", "REST API"]
    },
    {
      step: 2,
      title: "Tahap 2: Automated Testing & Caching Layer",
      timeframe: "Bulan 3 - 4",
      status: "IN PROGRESS",
      current: false,
      desc: "Mengimplementasikan Unit & Integration Testing serta strategi Redis Caching untuk performa tinggi.",
      action_items: [
        "Tulis Unit Test dengan Pest / PHPUnit (target 75%+ coverage)",
        "Terapkan Redis Caching untuk endpoint data yang sering diakses",
        "Integrasikan Dokumentasi API otomatis dengan Swagger"
      ],
      recommended_projects: [
        "High-Speed Cached API Engine with Pest Test Suite"
      ],
      key_skills: ["Redis", "Unit Testing", "Pest", "Swagger"]
    },
    {
      step: 3,
      title: "Tahap 3: Containerization & CI/CD Pipeline",
      timeframe: "Bulan 5 - 7",
      status: "NEXT GOAL",
      current: false,
      desc: "Mengisolasi service dengan Docker container dan membangun pipeline otomatisasi deployment.",
      action_items: [
        "Buat multi-stage Dockerfile & docker-compose untuk database isolasi",
        "Setup GitHub Actions CI/CD untuk otomatisasi test & build image",
        "Deploy aplikasi ke cloud VPS (Linux, Nginx, SSL)"
      ],
      recommended_projects: [
        "Dockerized API Micro-Service with Automated CI/CD Pipeline"
      ],
      key_skills: ["Docker", "Docker Compose", "GitHub Actions", "Linux"]
    },
    {
      step: 4,
      title: "Tahap 4: Message Queues & Event-Driven Architecture",
      timeframe: "Bulan 8 - 10",
      status: "FUTURE GOAL",
      current: false,
      desc: "Menangani pemrosesan background data besar menggunakan RabbitMQ / Redis Queues.",
      action_items: [
        "Implementasikan Queue Workers untuk asynchronous email & task processing",
        "Pasang APM monitoring (Sentry / Grafana) untuk error tracking",
        "Merancang database indexing & query optimization skala besar"
      ],
      recommended_projects: [
        "High-Traffic Event-Driven Queue Engine"
      ],
      key_skills: ["RabbitMQ", "Queue Workers", "Sentry", "Database Indexing"]
    },
    {
      step: 5,
      title: "Tahap 5: Senior Tech Lead & System Design Mastery",
      timeframe: "Bulan 11 - 12",
      status: "CAREER TARGET",
      current: false,
      desc: "Memimpin keputusan arsitektur sistem terdistribusi dan kesiapan wawancara level Senior/Lead.",
      action_items: [
        "Persiapan System Design Interview (Load Balancing, Rate Limiting, Sharding)",
        "Tulis artikel teknis atau kontribusi Open Source",
        "Melamar ke perusahaan tech unicorn / remote overseas"
      ],
      recommended_projects: [
        "Enterprise Distributed Architecture Portfolio"
      ],
      key_skills: ["System Design", "Tech Leadership", "Distributed Systems"]
    }
  ];

  // Load saved nodes from localStorage or use defaults
  const [nodes, setNodes] = useState(() => {
    try {
      const saved = localStorage.getItem('career_ai_custom_roadmap');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse saved roadmap from localStorage');
    }
    return defaultInitialNodes;
  });

  // Save nodes to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('career_ai_custom_roadmap', JSON.stringify(nodes));
    } catch (e) {
      console.warn('Failed to save roadmap to localStorage');
    }
  }, [nodes]);

  const chatEndRef = useRef(null);
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (viewMode === 'chat') {
      scrollToBottom();
    }
  }, [conversation, viewMode]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Handle AI Consultation & Chat (Curhat)
  const handleConsultAi = async (customText = null) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || isConsulting) return;

    const userMsg = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setConversation(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsConsulting(true);

    try {
      const response = await axios.post('/api/career-roadmap/consult', {
        message: textToSend,
        history: conversation.slice(-6)
      });

      if (response.data && response.data.success && response.data.data) {
        const resData = response.data.data;
        const aiMsg = {
          sender: 'ai',
          text: resData.ai_reply || 'Berikut rekomendasi penyesuaian roadmap karir untuk Anda.',
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        };
        setConversation(prev => [...prev, aiMsg]);

        if (resData.quick_prompts && resData.quick_prompts.length > 0) {
          setQuickPrompts(resData.quick_prompts);
        }

        if (resData.nodes && resData.nodes.length > 0) {
          // Re-index step numbers
          const newNodes = resData.nodes.map((nd, i) => ({
            ...nd,
            step: i + 1
          }));
          setNodes(newNodes);
          showToast("✨ AI telah menyusun Peta Jalan Karir baru berdasarkan curhat Anda!");
        }

        if (resData.master_plan_summary) {
          setMasterPlanSummary(resData.master_plan_summary);
        }
      } else {
        throw new Error('Respon server tidak valid');
      }
    } catch (err) {
      console.error('Error roadmap consultation:', err);
      const fallbackMsg = {
        sender: 'ai',
        text: `Terima kasih atas curhat Anda! Berdasarkan kualifikasi **${targetRole}**, saya telah menyusun strategi terbaik. Anda dapat meninjau dan meng-edit alur roadmap di tab Peta Jalan Visual.`,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };
      setConversation(prev => [...prev, fallbackMsg]);
    } finally {
      setIsConsulting(false);
    }
  };

  // Helper function to normalize steps (1, 2, 3...)
  const normalizeNodeSteps = (nodeList) => {
    return nodeList.map((nd, idx) => ({
      ...nd,
      step: idx + 1
    }));
  };

  // Move Node Up (Ubah Alur Roadmap)
  const handleMoveUp = (e, index) => {
    e.stopPropagation();
    if (index <= 0) return;
    const updated = [...nodes];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setNodes(normalizeNodeSteps(updated));
    showToast(`Urutan Tahap ${index + 1} dipindahkan ke Tahap ${index}.`);
  };

  // Move Node Down (Ubah Alur Roadmap)
  const handleMoveDown = (e, index) => {
    e.stopPropagation();
    if (index >= nodes.length - 1) return;
    const updated = [...nodes];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setNodes(normalizeNodeSteps(updated));
    showToast(`Urutan Tahap ${index + 1} dipindahkan ke Tahap ${index + 2}.`);
  };

  // Delete Node (Hapus Fitur Roadmap Step)
  const handleDeleteNode = (e, index) => {
    e.stopPropagation();
    const targetTitle = nodes[index]?.title || `Tahap ${index + 1}`;
    if (window.confirm(`Apakah Anda yakin ingin menghapus "${targetTitle}" dari alur roadmap?`)) {
      const updated = nodes.filter((_, i) => i !== index);
      setNodes(normalizeNodeSteps(updated));
      showToast(`Tahap "${targetTitle}" berhasil dihapus.`);
    }
  };

  // Open Edit Node Modal
  const handleOpenEditModal = (e, index) => {
    if (e) e.stopPropagation();
    const target = nodes[index];
    setEditingNodeIndex(index);
    setNodeFormData({
      title: target.title || '',
      timeframe: target.timeframe || '',
      status: target.status || 'IN PROGRESS',
      current: Boolean(target.current),
      desc: target.desc || '',
      action_items_text: Array.isArray(target.action_items) ? target.action_items.join('\n') : '',
      recommended_projects_text: Array.isArray(target.recommended_projects) ? target.recommended_projects.join('\n') : '',
      key_skills_text: Array.isArray(target.key_skills) ? target.key_skills.join(', ') : ''
    });
    setIsEditModalOpen(true);
  };

  // Open Create New Node Modal
  const handleOpenCreateModal = () => {
    setEditingNodeIndex(null);
    setNodeFormData({
      title: `Tahap ${nodes.length + 1}: Spesialisasi & Skill Baru`,
      timeframe: `Bulan ${nodes.length * 2 + 1} - ${nodes.length * 2 + 2}`,
      status: 'NEXT GOAL',
      current: false,
      desc: 'Deskripsikan tujuan dan target keahlian utama pada tahap baru ini.',
      action_items_text: 'Tugas aksi 1\nTugas aksi 2',
      recommended_projects_text: 'Nama Proyek Portofolio',
      key_skills_text: 'Skill1, Skill2'
    });
    setIsEditModalOpen(true);
  };

  // Save Node Changes (Edit or Add)
  const handleSaveNodeForm = (e) => {
    e.preventDefault();
    const actionItemsArr = nodeFormData.action_items_text
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const projectsArr = nodeFormData.recommended_projects_text
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const keySkillsArr = nodeFormData.key_skills_text
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const formattedNode = {
      step: editingNodeIndex !== null ? nodes[editingNodeIndex].step : nodes.length + 1,
      title: nodeFormData.title,
      timeframe: nodeFormData.timeframe,
      status: nodeFormData.status,
      current: nodeFormData.current,
      desc: nodeFormData.desc,
      action_items: actionItemsArr.length > 0 ? actionItemsArr : ['Refactor & Implementasi Kode'],
      recommended_projects: projectsArr.length > 0 ? projectsArr : ['Portofolio Proyek'],
      key_skills: keySkillsArr.length > 0 ? keySkillsArr : ['Technical Skill']
    };

    let updated = [...nodes];
    if (editingNodeIndex !== null) {
      updated[editingNodeIndex] = formattedNode;
      showToast(`Tahap "${formattedNode.title}" berhasil diperbarui!`);
    } else {
      updated.push(formattedNode);
      showToast(`Tahap baru "${formattedNode.title}" berhasil ditambahkan!`);
    }

    // If current set to true, reset other nodes current flag
    if (formattedNode.current) {
      updated = updated.map((nd, i) => ({
        ...nd,
        current: editingNodeIndex !== null ? i === editingNodeIndex : i === updated.length - 1
      }));
    }

    setNodes(normalizeNodeSteps(updated));
    setIsEditModalOpen(false);
  };

  // Reset to AI Initial Recommendations
  const handleResetToDefault = () => {
    if (window.confirm("Kembalikan alur roadmap ke rekomendasi awal dari AI? Semua pengeditan manual akan diganti.")) {
      setNodes(defaultInitialNodes);
      showToast("Peta Jalan Karir berhasil dikembalikan ke rekomendasi awal AI.");
    }
  };

  const toggleCheckItem = (stepNum, itemIdx) => {
    const key = `${stepNum}-${itemIdx}`;
    setCompletedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification Floating Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-[3000] bg-teal-500 text-slate-950 font-bold px-5 py-3 rounded-2xl shadow-2xl border border-teal-300 text-xs flex items-center gap-2 animate-bounce">
          <Sparkles size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner: Real-Time CV & AI Engine Profile */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-teal-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-bold">
                <Sparkles size={13} className="text-teal-400 animate-spin-slow" />
                DeepSeek &amp; Claude AI Real-time Engine
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-semibold">
                <Activity size={12} className="text-emerald-400 animate-pulse" />
                Dapat Di-edit &amp; Disesuaikan User
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
              Peta Jalan Karir &amp; Mentorship AI
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Disusun otomatis oleh AI saat Anda curhat, dan <strong className="text-teal-300">100% dapat di-edit, dihapus, atau diubah alurnya</strong> sesuai keinginan Anda.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* ATS Score Badge */}
            <div className="px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center font-black text-teal-300 text-sm">
                {atsScore}
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">Skor ATS CV</div>
                <div className="text-xs font-bold text-teal-300">TERVERIFIKASI ATS</div>
              </div>
            </div>

            {/* Quick Switch View Buttons */}
            <div className="bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 flex items-center gap-1 w-full sm:w-auto">
              <button
                onClick={() => setViewMode('roadmap')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  viewMode === 'roadmap'
                    ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Map size={14} />
                <span>Peta Jalan Visual</span>
              </button>
              <button
                onClick={() => setViewMode('chat')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  viewMode === 'chat'
                    ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <MessageSquare size={14} />
                <span>Curhat &amp; Consultation AI</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area based on View Mode */}
      {viewMode === 'roadmap' ? (
        /* ROADMAP VISUAL NODE VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Visual Vertical Node Timeline */}
          <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-black text-lg text-slate-100 flex items-center gap-2">
                  <Map size={18} className="text-teal-400" />
                  <span>{nodes.length} Tahap Peta Jalan Karir Interaktif</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{masterPlanSummary}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleOpenCreateModal}
                  className="px-3.5 py-2 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/40 text-teal-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Tambah Tahap</span>
                </button>

                <button
                  onClick={handleResetToDefault}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Reset ke Rekomendasi AI Awal"
                >
                  <RotateCcw size={13} />
                  <span>Reset AI</span>
                </button>
              </div>
            </div>

            {/* Notification Bar */}
            <div className="p-3.5 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-between gap-3 text-xs text-teal-300">
              <div className="flex items-center gap-2">
                <Sparkles size={15} className="shrink-0 text-teal-400" />
                <span>Klik kartu untuk detail • Gunakan tombol <strong className="text-slate-100 font-bold">Panah / Edit / Hapus</strong> di setiap kartu untuk mengubah alur roadmap.</span>
              </div>
            </div>

            {/* Vertical Nodes List */}
            <div className="relative pl-6 space-y-6 border-l-2 border-slate-800/80">
              {nodes.map((nd, index) => (
                <div
                  key={nd.step || index}
                  onClick={() => setSelectedNode(nd)}
                  className="relative group cursor-pointer"
                >
                  {/* Node Dot Indicator */}
                  <div
                    className={`absolute -left-[31px] top-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      nd.current
                        ? 'bg-teal-400 border-teal-300 shadow-lg shadow-teal-400/50 scale-125'
                        : nd.status === 'COMPLETED'
                        ? 'bg-emerald-500 border-emerald-400'
                        : 'bg-slate-900 border-slate-700 group-hover:border-teal-400'
                    }`}
                  >
                    {nd.current ? (
                      <span className="w-1.5 h-1.5 bg-slate-950 rounded-full" />
                    ) : nd.status === 'COMPLETED' ? (
                      <CheckCircle2 size={10} className="text-slate-950" />
                    ) : null}
                  </div>

                  {/* Card Content */}
                  <div
                    className={`p-5 rounded-2xl border transition-all ${
                      nd.current
                        ? 'bg-gradient-to-r from-teal-500/10 via-slate-900 to-slate-900 border-teal-500/40 shadow-xl shadow-teal-500/10'
                        : 'bg-slate-900/60 border-slate-800 group-hover:border-slate-700 group-hover:bg-slate-900/90'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-md border ${
                          nd.current
                            ? 'bg-teal-400 text-slate-950 border-teal-300'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}>
                          TAHAP {nd.step} • {nd.status}
                        </span>
                        <span className="text-[11px] font-bold text-teal-400/80 flex items-center gap-1">
                          <Clock size={11} />
                          {nd.timeframe}
                        </span>
                      </div>

                      {/* Interactive Node Action Controls (Move, Edit, Delete) */}
                      <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={(e) => handleMoveUp(e, index)}
                          disabled={index === 0}
                          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-teal-300 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                          title="Pindahkan Ke Atas (Ubah Alur)"
                        >
                          <ArrowUp size={13} />
                        </button>
                        <button
                          onClick={(e) => handleMoveDown(e, index)}
                          disabled={index === nodes.length - 1}
                          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-teal-300 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                          title="Pindahkan Ke Bawah (Ubah Alur)"
                        >
                          <ArrowDown size={13} />
                        </button>
                        <button
                          onClick={(e) => handleOpenEditModal(e, index)}
                          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-teal-300 transition-all"
                          title="Edit Tahap Ini"
                        >
                          <Edit3 size={13} />
                        </button>
                        <button
                          onClick={(e) => handleDeleteNode(e, index)}
                          className="p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-all"
                          title="Hapus Tahap Ini"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    <h4 className="font-extrabold text-base text-slate-100 mb-1.5 group-hover:text-teal-300 transition-colors">
                      {nd.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {nd.desc}
                    </p>

                    {/* Key Skills Tags */}
                    {nd.key_skills && nd.key_skills.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] text-slate-500 font-bold uppercase mr-1">Skills:</span>
                        {nd.key_skills.map((sk, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] font-semibold text-slate-300"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Add Step Launcher */}
            <button
              onClick={handleOpenCreateModal}
              className="w-full py-4 border-2 border-dashed border-slate-800 hover:border-teal-500/50 rounded-2xl text-xs font-bold text-slate-400 hover:text-teal-300 transition-all flex items-center justify-center gap-2 cursor-pointer bg-slate-950/40 hover:bg-slate-900/60"
            >
              <Plus size={16} />
              <span>Tambah Tahap Baru ke Roadmap</span>
            </button>
          </div>

          {/* Right Column: AI Mentorship Summary & Direct Consultation Launcher */}
          <div className="space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-5">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
                <Bot size={18} />
                <span>Curhat AI &amp; Auto-Roadmap</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 leading-relaxed space-y-3">
                <p>
                  <strong className="text-teal-300">Bagaimana Cara Kerjanya?</strong>
                </p>
                <p>
                  Setiap kali Anda <strong>curhat atau berdiskusi dengan AI</strong>, AI akan membuatkan dan memperbarui tahap roadmap di samping ini.
                </p>
                <p>
                  Setelah AI membuatkan roadmap, Anda bebas <strong className="text-slate-100">meng-edit judul, merubah alur panah, menambah tahap baru, atau menghapus tahap yang tidak dibutuhkan.</strong>
                </p>
              </div>

              <button
                onClick={() => setViewMode('chat')}
                className="shimmer-btn-primary w-full justify-center py-3 text-xs font-bold cursor-pointer"
              >
                <MessageSquare size={14} />
                <span>Mulai Curhat dengan AI</span>
              </button>
            </div>

            {/* Quick Consultation Suggestions Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-4">
              <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Zap size={14} className="text-amber-400" />
                <span>Curhat / Opsi Pilihan Cepat</span>
              </h4>

              <div className="space-y-2">
                {quickPrompts.map((qp, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setViewMode('chat');
                      handleConsultAi(qp);
                    }}
                    className="w-full text-left p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-teal-500/50 hover:bg-slate-800/40 text-xs text-slate-300 hover:text-teal-300 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span>{qp}</span>
                    <ChevronRight size={14} className="text-slate-500 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* INTERACTIVE CONSULTATION & CHAT VIEW */
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl flex flex-col h-[700px]">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-teal-500/20">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-100 flex items-center gap-2">
                  <span>CareerAI Senior Consultant</span>
                  <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-bold border border-teal-500/30">
                    REAL-TIME
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Curhat Karir • AI otomatis menyusun &amp; memperbarui roadmap Anda
                </p>
              </div>
            </div>

            <button
              onClick={() => setViewMode('roadmap')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Map size={14} className="text-teal-400" />
              <span>Lihat &amp; Edit Roadmap Visual</span>
            </button>
          </div>

          {/* Conversation Stream */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {conversation.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                    msg.sender === 'user'
                      ? 'bg-teal-500 text-slate-950'
                      : 'bg-slate-800 border border-slate-700 text-teal-300'
                  }`}
                >
                  {msg.sender === 'user' ? <User size={15} /> : <Bot size={15} />}
                </div>

                <div
                  className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-slate-950 font-semibold rounded-tr-none'
                      : 'bg-slate-950/80 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-line'
                  }`}
                >
                  <div>{msg.text}</div>
                  <div
                    className={`text-[10px] mt-2 text-right ${
                      msg.sender === 'user' ? 'text-slate-900/70 font-bold' : 'text-slate-500'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isConsulting && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 text-teal-300 flex items-center justify-center text-xs font-bold">
                  <Bot size={15} />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-teal-400 text-xs font-semibold flex items-center gap-2">
                  <Sparkles size={14} className="animate-spin text-teal-400" />
                  <span>AI sedang menganalisis curhat Anda &amp; merancang alur roadmap baru...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="pt-3 border-t border-slate-800/80 mt-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase mb-2">Jawaban / Curhat Cepat:</div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {quickPrompts.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleConsultAi(qp)}
                  disabled={isConsulting}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-teal-500/50 text-[11px] font-semibold text-slate-300 hover:text-teal-300 transition-all cursor-pointer disabled:opacity-50"
                >
                  {qp}
                </button>
              ))}
            </div>

            {/* Input & Send Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleConsultAi();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Curhat atau tanyakan target karirmu kepada AI..."
                className="flex-1 bg-slate-950 border border-slate-800 focus:border-teal-500/80 rounded-2xl px-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isConsulting}
                className="shimmer-btn-primary px-5 py-3 rounded-2xl text-xs font-bold cursor-pointer disabled:opacity-50 flex items-center gap-2 shrink-0"
              >
                <span>Kirim Curhat</span>
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Node Detail Modal */}
      {selectedNode && !isEditModalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-extrabold px-3 py-1 rounded-md bg-teal-500/20 text-teal-300 border border-teal-500/30">
                TAHAP {selectedNode.step} • {selectedNode.status}
              </span>
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                <Clock size={12} />
                {selectedNode.timeframe}
              </span>
            </div>

            <div>
              <h3 className="font-black text-xl text-slate-100 mb-2">{selectedNode.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedNode.desc}</p>
            </div>

            {/* Checklist Action Items */}
            {selectedNode.action_items && selectedNode.action_items.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <ListTodo size={14} className="text-teal-400" />
                  <span>Daftar Aksi Konkret (Checklist):</span>
                </div>
                <div className="space-y-1.5">
                  {selectedNode.action_items.map((item, idx) => {
                    const isChecked = Boolean(completedItems[`${selectedNode.step}-${idx}`]);
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleCheckItem(selectedNode.step, idx)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                          isChecked
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                          isChecked ? 'bg-emerald-400 border-emerald-300 text-slate-950' : 'border-slate-700'
                        }`}>
                          {isChecked && <CheckCircle2 size={12} />}
                        </div>
                        <span className={`text-xs ${isChecked ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Recommended Projects */}
            {selectedNode.recommended_projects && selectedNode.recommended_projects.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <FolderGit2 size={14} className="text-indigo-400" />
                  <span>Rekomendasi Portofolio Proyek Nyata:</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-teal-300 font-semibold">
                  🚀 {selectedNode.recommended_projects.join(', ')}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={(e) => {
                  const nodeIndex = nodes.findIndex(n => n.step === selectedNode.step);
                  setSelectedNode(null);
                  handleOpenEditModal(e, nodeIndex >= 0 ? nodeIndex : 0);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-teal-300 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <Edit3 size={14} />
                <span>Edit Tahap Ini</span>
              </button>

              <button
                onClick={() => setSelectedNode(null)}
                className="shimmer-btn-primary flex-1 justify-center py-2.5 text-xs font-bold cursor-pointer"
              >
                Tutup Detail
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT NODE MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[2500] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl relative my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-teal-400 font-extrabold text-base">
                <Edit3 size={18} />
                <span>{editingNodeIndex !== null ? `Edit Tahap ${editingNodeIndex + 1}` : 'Tambah Tahap Baru'}</span>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveNodeForm} className="space-y-4">
              {/* Judul Tahap */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Judul Tahap Roadmap</label>
                <input
                  type="text"
                  required
                  value={nodeFormData.title}
                  onChange={(e) => setNodeFormData({ ...nodeFormData, title: e.target.value })}
                  placeholder="Contoh: Tahap 2: Microservices & Docker Container"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100"
                />
              </div>

              {/* Grid 2 Column: Timeframe & Status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Jangka Waktu</label>
                  <input
                    type="text"
                    required
                    value={nodeFormData.timeframe}
                    onChange={(e) => setNodeFormData({ ...nodeFormData, timeframe: e.target.value })}
                    placeholder="Contoh: Bulan 3 - 4"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Status Tahap</label>
                  <select
                    value={nodeFormData.status}
                    onChange={(e) => setNodeFormData({ ...nodeFormData, status: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3 py-2.5 text-xs text-slate-100 cursor-pointer"
                  >
                    <option value="YOU ARE HERE">YOU ARE HERE</option>
                    <option value="IN PROGRESS">IN PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="NEXT GOAL">NEXT GOAL</option>
                    <option value="FUTURE TARGET">FUTURE TARGET</option>
                  </select>
                </div>
              </div>

              {/* Is Current Stage Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isCurrentCheck"
                  checked={nodeFormData.current}
                  onChange={(e) => setNodeFormData({ ...nodeFormData, current: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-700 text-teal-500 focus:ring-teal-500 bg-slate-950 cursor-pointer"
                />
                <label htmlFor="isCurrentCheck" className="text-xs font-semibold text-slate-300 cursor-pointer">
                  Tandai sebagai Posisi Saya Saat Ini (YOU ARE HERE)
                </label>
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Deskripsi Ringkas</label>
                <textarea
                  rows={2}
                  required
                  value={nodeFormData.desc}
                  onChange={(e) => setNodeFormData({ ...nodeFormData, desc: e.target.value })}
                  placeholder="Penjelasan fokus utama tahap ini..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3.5 py-2 text-xs text-slate-100"
                />
              </div>

              {/* Action Items (1 per line) */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Daftar Tugas Aksi (1 per baris)</label>
                <textarea
                  rows={3}
                  value={nodeFormData.action_items_text}
                  onChange={(e) => setNodeFormData({ ...nodeFormData, action_items_text: e.target.value })}
                  placeholder="Refactor controller ke service layer&#10;Tulis unit test Pest PHP"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3.5 py-2 text-xs text-slate-100"
                />
              </div>

              {/* Recommended Projects (1 per line) */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Rekomendasi Portofolio Proyek</label>
                <textarea
                  rows={2}
                  value={nodeFormData.recommended_projects_text}
                  onChange={(e) => setNodeFormData({ ...nodeFormData, recommended_projects_text: e.target.value })}
                  placeholder="Microservices E-Commerce API Engine"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3.5 py-2 text-xs text-slate-100"
                />
              </div>

              {/* Target Key Skills */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Target Key Skills (Dipisah Koma)</label>
                <input
                  type="text"
                  value={nodeFormData.key_skills_text}
                  onChange={(e) => setNodeFormData({ ...nodeFormData, key_skills_text: e.target.value })}
                  placeholder="Docker, Redis, Pest, Swagger"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100"
                />
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="shimmer-btn-primary px-6 py-2.5 text-xs font-bold cursor-pointer"
                >
                  <span>{editingNodeIndex !== null ? 'Simpan Perubahan' : 'Tambah Tahap'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
