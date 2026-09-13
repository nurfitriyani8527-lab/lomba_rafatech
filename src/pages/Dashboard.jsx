import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  BarChart3,
  Briefcase,
  TrendingUp,
  Map,
  FileText,
  Mic,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ArrowRight,
  Star,
  Award,
  Upload,
  Download,
  Search,
  Filter,
  Brain,
  Zap,
  ShieldCheck,
  Check,
  Plus,
  RefreshCw,
  Eye,
  ExternalLink,
  Target,
  Clock,
  Layers,
  BookOpen,
  Send,
  MessageSquare,
  Copy,
  Printer,
  Wand2,
  Trash2,
  User,
  GraduationCap,
  Scan,
  FileCheck,
  FileUp,
  X,
  Bookmark,
  MapPin,
  Building2,
  DollarSign,
  SlidersHorizontal
} from 'lucide-react';

/* ── MOCK DASHBOARD DATA ── */
const MOCK_USER = {
  name: 'Rizki Dev',
  role: 'Backend Developer',
  level: 'Level Junior',
  atsScore: 92,
  jobMatchRate: 94,
  detectedSkillsCount: 14,
  interviewPreparedness: 88,
  avatar: 'RD',
};

const DETECTED_SKILLS = [
  { name: 'Laravel', status: 'matched', level: 'Lanjutan', category: 'Backend' },
  { name: 'PHP', status: 'matched', level: 'Lanjutan', category: 'Language' },
  { name: 'MySQL', status: 'matched', level: 'Menengah', category: 'Database' },
  { name: 'REST API', status: 'matched', level: 'Lanjutan', category: 'API' },
  { name: 'Git & GitHub', status: 'matched', level: 'Menengah', category: 'Tools' },
  { name: 'Postman', status: 'matched', level: 'Menengah', category: 'Tools' },
  { name: 'Docker', status: 'missing', level: 'Perlu Dipelajari', category: 'DevOps' },
  { name: 'Redis', status: 'missing', level: 'Perlu Dipelajari', category: 'Database' },
  { name: 'PHPUnit', status: 'missing', level: 'Perlu Dipelajari', category: 'Testing' },
  { name: 'CI/CD Pipelines', status: 'missing', level: 'Perlu Dipelajari', category: 'DevOps' },
];

const MATCHED_JOBS = [
  {
    id: 1,
    title: 'Junior Backend Developer (Laravel)',
    company: 'TechNusa Solution',
    location: 'Jakarta Selatan (Hybrid)',
    workMode: 'Hybrid',
    category: 'Backend',
    salary: 'Rp 7.500.000 - Rp 10.500.000/bln',
    matchScore: 96,
    type: 'Full-time',
    posted: '2 jam yang lalu',
    description: 'Mengembangkan dan mengelola RESTful API berbasis Laravel 10 untuk platform enterprise. Bertanggung jawab atas integrasi database MySQL, migrasi data, serta pembuatan dokumentasi API.',
    requirements: ['Menguasai PHP 8+ & Framework Laravel', 'Pengalaman REST API & JSON', 'Memahami Query Optimization MySQL', 'Familiar dengan Git workflow'],
    reasons: ['Skill Laravel & REST API cocok 100%', 'Pengalaman proyek sesuai kriteria', 'Lokasi sesuai domisili'],
    missing: ['Docker (Nilai tambah)'],
  },
  {
    id: 2,
    title: 'API & PHP Engineer',
    company: 'Fintech Utama Indonesia',
    location: 'Bandung (Remote)',
    workMode: 'Remote',
    category: 'Backend',
    salary: 'Rp 8.000.000 - Rp 12.000.000/bln',
    matchScore: 94,
    type: 'Full-time',
    posted: '1 hari yang lalu',
    description: 'Membangun arsitektur API transaksi tinggi untuk sistem pembayaran fintech terakreditasi OJK. Menangani sistem autentikasi OAuth2 dan keamanan data sensitif.',
    requirements: ['PHP & Laravel / Symfony', 'Pemahaman mendalam MySQL & Redis', 'Familiar dengan microservices & queue jobs', 'Pengalaman CI/CD'],
    reasons: ['Penguasaan MySQL & REST API tinggi', 'Terbiasa dengan Git workflow', 'Kecocokan latar belakang Fintech'],
    missing: ['Redis Caching'],
  },
  {
    id: 3,
    title: 'Web Backend Specialist',
    company: 'Mitra Digital Kreatif',
    location: 'Surabaya (On-site)',
    workMode: 'On-site',
    category: 'Backend',
    salary: 'Rp 6.800.000 - Rp 9.500.000/bln',
    matchScore: 91,
    type: 'Full-time',
    posted: '3 hari yang lalu',
    description: 'Bertanggung jawab dalam merancang backend portal e-commerce dan dashboard internal mitra usaha. Berkolaborasi dengan tim Frontend React.',
    requirements: ['Laravel / Node.js', 'Skema DB Relasional MySQL/PostgreSQL', 'Basic Testing dengan PHPUnit / Jest'],
    reasons: ['Kesesuaian stack PHP 5/5', 'Struktur CV ATS-friendly', 'Sertifikasi Laravel terverifikasi'],
    missing: ['Unit Testing'],
  },
  {
    id: 4,
    title: 'Junior Fullstack Web Developer (Laravel + React)',
    company: 'Tokopedia Merchant Tech',
    location: 'Jakarta Barat (Hybrid)',
    workMode: 'Hybrid',
    category: 'Fullstack',
    salary: 'Rp 8.500.000 - Rp 13.000.000/bln',
    matchScore: 92,
    type: 'Full-time',
    posted: '5 jam yang lalu',
    description: 'Mengembangkan fitur-fitur baru pada dashboard merchant seller. Menghubungkan API backend Laravel dengan antarmuka dinamis React & Tailwind CSS.',
    requirements: ['Laravel & React.js', 'Tailwind CSS & State Management', 'PostgreSQL / MySQL', 'Rest API Integration'],
    reasons: ['Menguasai stack gabungan Backend + Frontend', 'Portfolio proyek lengkap', 'Format CV ATS valid'],
    missing: ['Next.js (Optional)'],
  },
  {
    id: 5,
    title: 'Junior Node.js & Microservices Engineer',
    company: 'Gojek Ecosystem Partner',
    location: 'Jakarta Selatan (Remote)',
    workMode: 'Remote',
    category: 'Backend',
    salary: 'Rp 9.000.000 - Rp 14.000.000/bln',
    matchScore: 89,
    type: 'Full-time',
    posted: '4 jam yang lalu',
    description: 'Terlibat dalam pengembangan microservices berkinerja tinggi untuk pengolahan pesanan real-time skala besar.',
    requirements: ['Node.js Express / NestJS', 'Message Broker RabbitMQ / Kafka', 'Redis & MongoDB', 'Docker Container'],
    reasons: ['Pemahaman logika backend tinggi', 'Pernah membangun REST API terenkripsi'],
    missing: ['NestJS Framework', 'Kafka Setup'],
  },
  {
    id: 6,
    title: 'Frontend React & Tailwind Developer',
    company: 'Halodoc Health Tech',
    location: 'Jakarta Pusat (Hybrid)',
    workMode: 'Hybrid',
    category: 'Frontend',
    salary: 'Rp 7.800.000 - Rp 11.000.000/bln',
    matchScore: 88,
    type: 'Full-time',
    posted: '6 jam yang lalu',
    description: 'Merancang UI/UX yang responsif dan interaktif untuk portal konsultasi dokter dan layanan kesehatan digital.',
    requirements: ['React.js / Next.js', 'Tailwind CSS & Framer Motion', 'REST API Integration', 'Responsive Design'],
    reasons: ['Sangat memahami UI modern', 'Kemampuan integrasi API cepat'],
    missing: ['TypeScript Advanced'],
  },
  {
    id: 7,
    title: 'Junior DevOps & Cloud Infrastructure',
    company: 'Traveloka Core API Team',
    location: 'Tangerang (Hybrid)',
    workMode: 'Hybrid',
    category: 'DevOps',
    salary: 'Rp 8.500.000 - Rp 13.500.000/bln',
    matchScore: 85,
    type: 'Full-time',
    posted: '1 hari yang lalu',
    description: 'Membantu otomatisasi deployment server staging & production menggunakan Docker, CI/CD GitHub Actions, dan AWS EC2.',
    requirements: ['Linux Server Admin', 'Docker & Docker Compose', 'CI/CD Pipeline', 'Basic AWS / GCP'],
    reasons: ['Latar belakang Informatika kuat', 'Mengetahui skema deployment dasar'],
    missing: ['Kubernetes', 'Terraform'],
  },
  {
    id: 8,
    title: 'Junior Flutter Mobile Developer',
    company: 'Akulaku Financial Tech',
    location: 'Jakarta Barat (On-site)',
    workMode: 'On-site',
    category: 'Mobile',
    salary: 'Rp 7.500.000 - Rp 11.500.000/bln',
    matchScore: 87,
    type: 'Full-time',
    posted: '2 hari yang lalu',
    description: 'Mengembangkan aplikasi mobile cross-platform menggunakan Flutter & Dart untuk layanan keuangan digital.',
    requirements: ['Flutter & Dart', 'State Management (Bloc / Provider)', 'REST API Client', 'Firebase Integration'],
    reasons: ['Pernah membuat aplikasi Android sederhana', 'Logika pemograman solid'],
    missing: ['Clean Architecture Flutter'],
  },
  {
    id: 9,
    title: 'Junior Data & SQL Analytics Engineer',
    company: 'Bukalapak Logistics Team',
    location: 'Jakarta Selatan (Remote)',
    workMode: 'Remote',
    category: 'Backend',
    salary: 'Rp 7.000.000 - Rp 10.000.000/bln',
    matchScore: 90,
    type: 'Full-time',
    posted: '12 jam yang lalu',
    description: 'Menulis query kompleks MySQL/PostgreSQL untuk keperluan laporan logistik dan otomatisasi pipelines data harian.',
    requirements: ['Expert SQL Query & Indexing', 'Python Data Processing', 'Data Visualization (Metabase/PowerBI)', 'ETL Pipeline Basics'],
    reasons: ['Skor SQL & DB MySQL 95%', 'Pengalaman optimasi query di CV'],
    missing: ['BigQuery / SnowFlake'],
  },
  {
    id: 10,
    title: 'Laravel & Vue.js Web Engineer',
    company: 'PrivyID Security Systems',
    location: 'Yogyakarta (Remote)',
    workMode: 'Remote',
    category: 'Fullstack',
    salary: 'Rp 7.200.000 - Rp 10.800.000/bln',
    matchScore: 93,
    type: 'Full-time',
    posted: '1 hari yang lalu',
    description: 'Membangun fitur tanda tangan digital terenkripsi dengan backend Laravel dan komponen frontend Vue.js 3.',
    requirements: ['Laravel 10', 'Vue 3 / Options & Composition API', 'Web Security Basics', 'MySQL & Redis'],
    reasons: ['Kecocokan Laravel sempurna', 'Kemampuan manajemen API tinggi'],
    missing: ['Vue 3 (Perlu penyesuaian dari React)'],
  },
  {
    id: 11,
    title: 'Golang Microservices Developer',
    company: 'Xendit Payments Tech',
    location: 'Jakarta Selatan (Hybrid)',
    workMode: 'Hybrid',
    category: 'Backend',
    salary: 'Rp 9.500.000 - Rp 15.000.000/bln',
    matchScore: 82,
    type: 'Full-time',
    posted: '2 hari yang lalu',
    description: 'Mengembangkan payment gateway berkecepatan mikrodetik dengan bahasa pemrograman Go (Golang) dan gRPC.',
    requirements: ['Golang Syntax & Concurrency', 'gRPC & Protocol Buffers', 'PostgreSQL', 'Docker & Kubernetes'],
    reasons: ['Pemampuan arsitektur backend diakui', 'Pemahaman algoritma kuat'],
    missing: ['Golang Production Experience'],
  },
  {
    id: 12,
    title: 'QA & Automated API Testing Junior',
    company: 'Kredivo Risk Tech',
    location: 'Jakarta Pusat (Hybrid)',
    workMode: 'Hybrid',
    category: 'Backend',
    salary: 'Rp 6.800.000 - Rp 9.800.000/bln',
    matchScore: 89,
    type: 'Full-time',
    posted: '3 hari yang lalu',
    description: 'Melakukan testing otomatis untuk REST API menggunakan Postman Collections, Newman, dan skrip PHPUnit.',
    requirements: ['Postman & Newman Automated Testing', 'PHP / Python scripting', 'Jira / Confluence', 'Bug Reporting'],
    reasons: ['Penguasaan Postman & REST API 100%', 'Latar belakang QA testing baik'],
    missing: ['Cypress / Playwright'],
  },
  {
    id: 13,
    title: 'Junior Python & Django Engineer',
    company: 'Stockbit Financial Systems',
    location: 'Jakarta Selatan (Remote)',
    workMode: 'Remote',
    category: 'Backend',
    salary: 'Rp 8.000.000 - Rp 12.000.000/bln',
    matchScore: 84,
    type: 'Full-time',
    posted: '1 hari yang lalu',
    description: 'Membangun pipeline data statistik saham dan pasar modal menggunakan Django REST Framework dan Celery task worker.',
    requirements: ['Python 3 & Django Framework', 'Celery & Redis', 'PostgreSQL', 'RESTful API'],
    reasons: ['Logika Backend cocok', 'Pengalaman integrasi API luar'],
    missing: ['Django Framework'],
  },
  {
    id: 14,
    title: 'Junior SaaS Backend Developer',
    company: 'Paper.id Invoicing Tech',
    location: 'Jakarta Barat (Hybrid)',
    workMode: 'Hybrid',
    category: 'Backend',
    salary: 'Rp 7.500.000 - Rp 10.500.000/bln',
    matchScore: 95,
    type: 'Full-time',
    posted: '4 jam yang lalu',
    description: 'Merancang backend invoicing B2B dengan modul cetak invoice PDF otomatis dan kalkulasi pajak terpadu.',
    requirements: ['PHP Laravel', 'MySQL Relational Database', 'PDF Generation (Dompdf/Snappy)', 'REST API'],
    reasons: ['Sangat sesuai dengan spesialisasi Laravel', 'Pengalaman proyek invoicing', 'Skor CV 92+'],
    missing: ['Payment Gateway Integration'],
  },
  {
    id: 15,
    title: 'Fullstack E-Commerce Specialist',
    company: 'Sirclo E-Commerce Systems',
    location: 'Tangerang (On-site)',
    workMode: 'On-site',
    category: 'Fullstack',
    salary: 'Rp 8.000.000 - Rp 11.500.000/bln',
    matchScore: 91,
    type: 'Full-time',
    posted: '2 hari yang lalu',
    description: 'Membangun toko online multitenant menggunakan Laravel backend dan Tailwind CSS frontend.',
    requirements: ['Laravel 10', 'Tailwind CSS', 'Alpine.js / React', 'MySQL'],
    reasons: ['Stack 100% cocok dengan profil', 'Struktur CV lengkap'],
    missing: ['Multi-tenant DB Architecture'],
  },
  {
    id: 16,
    title: 'Junior Security & Auth Developer',
    company: 'Dana Indonesia Services',
    location: 'Jakarta Selatan (Hybrid)',
    workMode: 'Hybrid',
    category: 'Backend',
    salary: 'Rp 8.500.000 - Rp 13.000.000/bln',
    matchScore: 87,
    type: 'Full-time',
    posted: '1 hari yang lalu',
    description: 'Fokus pada keamanan otentikasi JWT, hashing kata sandi, dan proteksi serangan OWASP Top 10.',
    requirements: ['PHP / Node.js', 'JWT Auth & OAuth2', 'OWASP Security Standards', 'MySQL'],
    reasons: ['Terbukti paham autentikasi JWT di proyek', 'Konfigurasi .htaccess aman'],
    missing: ['Penetration Testing'],
  },
  {
    id: 17,
    title: 'Junior System Administrator & Backend Support',
    company: 'LinkAja Digital Systems',
    location: 'Jakarta Pusat (On-site)',
    workMode: 'On-site',
    category: 'DevOps',
    salary: 'Rp 7.000.000 - Rp 9.800.000/bln',
    matchScore: 86,
    type: 'Full-time',
    posted: '3 hari yang lalu',
    description: 'Memelihara server Linux Nginx, mengonfigurasi virtual host, SSL, dan monitoring kesehatan server backend.',
    requirements: ['Linux Ubuntu Server', 'Nginx & Apache Web Server', 'Bash Scripting', 'MySQL Maintenance'],
    reasons: ['Pengalaman konfigurasi web server', 'Familiar dengan Git & server management'],
    missing: ['Ansible Automation'],
  },
  {
    id: 18,
    title: 'POS Systems Backend Developer',
    company: 'Majoo POS Systems',
    location: 'Malang (Remote)',
    workMode: 'Remote',
    category: 'Backend',
    salary: 'Rp 6.800.000 - Rp 9.500.000/bln',
    matchScore: 94,
    type: 'Full-time',
    posted: '5 jam yang lalu',
    description: 'Mengembangkan API transaksi offline-first untuk kasir pintar usaha UMKM.',
    requirements: ['PHP Laravel', 'SQLite & MySQL Sync', 'REST API', 'Git'],
    reasons: ['Pengalaman membuat REST API handal', 'Cocok dengan kriteria kerja Remote'],
    missing: ['Offline Syncing Algorithm'],
  },
  {
    id: 19,
    title: 'WealthTech Backend Engineer',
    company: 'Bibit Wealth Tech',
    location: 'Jakarta Selatan (Hybrid)',
    workMode: 'Hybrid',
    category: 'Backend',
    salary: 'Rp 9.000.000 - Rp 14.000.000/bln',
    matchScore: 90,
    type: 'Full-time',
    posted: '1 hari yang lalu',
    description: 'Mengolah perhitungan portofolio reksa dana dan obligasi secara otomatis dengan kalkulasi presisi tinggi.',
    requirements: ['Laravel / Node.js', 'PostgreSQL High Performance', 'Financial Calculations', 'Unit Testing'],
    reasons: ['Skor matrik algoritma tinggi', 'Struktur data rapi'],
    missing: ['PostgreSQL Advanced Partitioning'],
  },
  {
    id: 20,
    title: 'Junior EdTech Backend Engineer',
    company: 'Ruangguru Learning Tech',
    location: 'Jakarta Selatan (Hybrid)',
    workMode: 'Hybrid',
    category: 'Backend',
    salary: 'Rp 7.800.000 - Rp 11.000.000/bln',
    matchScore: 92,
    type: 'Full-time',
    posted: '2 hari yang lalu',
    description: 'Membuat API pengiriman materi video, tryout online, dan sertifikasi digital siswa.',
    requirements: ['PHP / Go', 'MySQL / MongoDB', 'Redis Caching', 'Cloud Object Storage (S3)'],
    reasons: ['Stack Laravel & API terdaftar di CV', 'Portfolio lengkap'],
    missing: ['AWS S3 SDK'],
  },
  {
    id: 21,
    title: 'Digital Banking Support Engineer',
    company: 'Astra Digital Labs',
    location: 'Jakarta Pusat (Hybrid)',
    workMode: 'Hybrid',
    category: 'Backend',
    salary: 'Rp 8.500.000 - Rp 12.500.000/bln',
    matchScore: 88,
    type: 'Full-time',
    posted: '1 hari yang lalu',
    description: 'Memberikan dukungan teknis backend API, diagnosa bug logs, dan patching aplikasi perbankan digital.',
    requirements: ['PHP / Java', 'Log Analyzer (ELK Stack)', 'SQL Querying', 'REST API'],
    reasons: ['Kemampuan analisa bug tinggi', 'Pengalaman Git terbiasa'],
    missing: ['ELK Logstash'],
  },
  {
    id: 22,
    title: 'Smart City API Engineer',
    company: 'Telkom Digital Services',
    location: 'Bandung (On-site)',
    workMode: 'On-site',
    category: 'Backend',
    salary: 'Rp 7.500.000 - Rp 10.500.000/bln',
    matchScore: 91,
    type: 'Full-time',
    posted: '3 hari yang lalu',
    description: 'Merancang API pemantauan lalu lintas dan sensor IoT kota pintar berbasis Laravel & WebSockets.',
    requirements: ['Laravel', 'WebSockets / Socket.io', 'MySQL Spatial Data', 'REST API'],
    reasons: ['Dominan Laravel 100%', 'Hasil analisis ATS 92%'],
    missing: ['WebSockets Live Streaming'],
  },
  {
    id: 23,
    title: 'Payment Integration Specialist',
    company: 'Midtrans Tech Solutions',
    location: 'Jakarta Selatan (Remote)',
    workMode: 'Remote',
    category: 'Backend',
    salary: 'Rp 8.200.000 - Rp 12.000.000/bln',
    matchScore: 94,
    type: 'Full-time',
    posted: '6 jam yang lalu',
    description: 'Membuat SDK dan plugin payment gateway untuk merchant e-commerce.',
    requirements: ['PHP / Node.js SDK', 'Webhook Listener & Security', 'REST API', 'Git'],
    reasons: ['Spesialisasi API cocok', 'Struktur kode rapi & sesuai standar'],
    missing: ['Webhook Signature HMAC'],
  },
  {
    id: 24,
    title: 'Junior Cloud Application Developer',
    company: 'Blibli E-Commerce Tech',
    location: 'Jakarta Barat (Hybrid)',
    workMode: 'Hybrid',
    category: 'Fullstack',
    salary: 'Rp 8.000.000 - Rp 11.800.000/bln',
    matchScore: 89,
    type: 'Full-time',
    posted: '4 jam yang lalu',
    description: 'Mengembangkan aplikasi cloud native skala besar untuk event promo bulanan.',
    requirements: ['Laravel / Spring Boot', 'React.js', 'GCP / AWS Basics', 'Docker'],
    reasons: ['Fleksibilitas Fullstack tinggi', 'Skor CV ATS di atas 90'],
    missing: ['GCP Cloud Run'],
  }
];

const ROADMAP_STEPS = [
  {
    step: 1,
    title: 'Mastering Docker & Containerization',
    duration: '1-2 Minggu',
    status: 'in-progress',
    desc: 'Pelajari konsep containerization, Dockerfile, dan Docker Compose untuk aplikasi Laravel + MySQL.',
    skills: ['Docker', 'Docker Compose', 'Environment Setup'],
  },
  {
    step: 2,
    title: 'High-Performance Caching dengan Redis',
    duration: '1 Minggu',
    status: 'up-next',
    desc: 'Implementasi caching query database & session storage menggunakan Redis di Laravel.',
    skills: ['Redis', 'Cache Management', 'Query Optimization'],
  },
  {
    step: 3,
    title: 'Automated Testing dengan PHPUnit',
    duration: '2 Minggu',
    status: 'locked',
    desc: 'Menulis Unit Test dan Integration Test untuk endpoint REST API agar bebas dari bug.',
    skills: ['PHPUnit', 'TDD', 'Feature Testing'],
  },
  {
    step: 4,
    title: 'CI/CD Pipelines dengan GitHub Actions',
    duration: '1 Minggu',
    status: 'locked',
    desc: 'Otomatisasi pengujian dan deployment aplikasi Laravel ke server staging & produksi.',
    skills: ['GitHub Actions', 'Deployment', 'Automated Build'],
  },
];

/* ── DASHBOARD COMPONENT ── */
const Dashboard = () => {
  const location = useLocation();

  const determineInitialTab = (loc) => {
    if (loc.pathname === '/cv-builder' || loc.state?.tab === 'cv-builder') return 'cv-builder';
    if (loc.pathname === '/jobs' || loc.state?.tab === 'jobs') return 'jobs';
    if (loc.pathname === '/roadmap' || loc.state?.tab === 'roadmap') return 'roadmap';
    if (loc.state?.tab) return loc.state.tab;
    return 'overview';
  };

  const [activeTab, setActiveTab] = useState(() => determineInitialTab(location)); // 'overview' | 'jobs' | 'roadmap' | 'cv-builder'
  const [appliedJobs, setAppliedJobs] = useState([]);

  // ── CV BUILDER STATE ──
  const [cvForm, setCvForm] = useState({
    fullName: 'Rizki Dev',
    targetRole: 'Junior Backend Developer',
    email: 'rizki.dev@email.com',
    phone: '+62 812-3456-7890',
    location: 'Jakarta Selatan, Indonesia',
    linkedin: 'linkedin.com/in/rizkidev',
    github: 'github.com/rizkidev',
    summary: 'Junior Backend Developer berdedikasi tinggi dengan pengalaman merancang REST API berkinerja tinggi menggunakan Laravel & MySQL. Terbiasa mengoptimalkan query database dan mengimplementasikan autentikasi JWT.',
    skills: ['Laravel 10', 'PHP 8.2', 'RESTful API', 'MySQL', 'Git & GitHub', 'Postman', 'Docker Basics'],
    experiences: [
      {
        id: 1,
        company: 'TechNusa Solution',
        role: 'Backend Developer Intern',
        period: 'Jan 2025 - Jul 2025',
        location: 'Jakarta (Hybrid)',
        bullets: [
          'Mengembangkan 15+ REST API endpoint terenkripsi JWT untuk sistem transaksi e-commerce.',
          'Mengoptimalkan query MySQL dengan teknik eager loading, mempercepat respon API hingga 65%.',
          'Bekerja dalam tim Agile 5 orang dengan Git flow terstruktur dan dokumentasi API di Postman.'
        ]
      }
    ],
    educations: [
      {
        id: 1,
        institution: 'Universitas Komputer Indonesia',
        degree: 'S1 Teknik Informatika',
        period: '2021 - 2025',
        gpa: '3.78 / 4.00'
      }
    ],
    certifications: [
      'Laravel Certified Developer - 2025',
      'Google Cloud Digital Leader - 2024'
    ]
  });

  const [builderStep, setBuilderStep] = useState(1);
  const [mobileCvTab, setMobileCvTab] = useState('editor'); // 'editor' | 'preview'
  const [newSkillInput, setNewSkillInput] = useState('');
  const [newCertInput, setNewCertInput] = useState('');
  const [copiedText, setCopiedText] = useState(false);
  const [aiSummaryLoading, setAiSummaryLoading] = useState(false);

  // ── AI CV SCANNER & ANALYSIS STATE ──
  const [isScanningCv, setIsScanningCv] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [scanStepText, setScanStepText] = useState('');
  const [scannedFileName, setScannedFileName] = useState('CV_Rizki_Dev_Backend.pdf');

  const handleStartCvScan = (fileName) => {
    if (fileName) setScannedFileName(fileName);
    setIsScanningCv(true);
    setScanProgress(15);
    setScanStepText('Membaca Format & Struktur Margin Header...');

    setTimeout(() => {
      setScanProgress(45);
      setScanStepText('Analisis Kata Kunci & Relevansi Position Target Backend...');
    }, 600);

    setTimeout(() => {
      setScanProgress(80);
      setScanStepText('Mengekstrak Metrik Kuantitatif & Poin Dampak Proyek...');
    }, 1200);

    setTimeout(() => {
      setScanProgress(100);
      setIsScanningCv(false);
    }, 1800);
  };

  // ── JOBS SEARCH, FILTER, AND AUTO-LOAD STATE ──
  const [jobSearchQuery, setJobSearchQuery] = useState('');
  const [jobMatchFilter, setJobMatchFilter] = useState('all'); // 'all' | '90' | '80' | '75'
  const [jobWorkModeFilter, setJobWorkModeFilter] = useState('all'); // 'all' | 'Remote' | 'Hybrid' | 'On-site'
  const [jobCategoryFilter, setJobCategoryFilter] = useState('all'); // 'all' | 'Backend' | 'Frontend' | 'Fullstack' | 'DevOps' | 'Mobile'
  const [visibleJobsCount, setVisibleJobsCount] = useState(6);
  const [isLoadingMoreJobs, setIsLoadingMoreJobs] = useState(false);
  const [selectedJobModal, setSelectedJobModal] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);

  // Auto-Load on Scroll Listener
  useEffect(() => {
    if (activeTab !== 'jobs') return;

    const handleScroll = () => {
      const isNearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 450;
      if (isNearBottom && !isLoadingMoreJobs) {
        setIsLoadingMoreJobs(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab, isLoadingMoreJobs]);

  useEffect(() => {
    if (isLoadingMoreJobs) {
      const timer = setTimeout(() => {
        setVisibleJobsCount(prev => prev + 4);
        setIsLoadingMoreJobs(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isLoadingMoreJobs]);

  const handleToggleSaveJob = (jobId) => {
    setSavedJobs(prev =>
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const handleResetJobFilters = () => {
    setJobSearchQuery('');
    setJobMatchFilter('all');
    setJobWorkModeFilter('all');
    setJobCategoryFilter('all');
    setVisibleJobsCount(6);
  };

  const filteredJobs = MATCHED_JOBS.filter(job => {
    const query = jobSearchQuery.toLowerCase().trim();
    const matchesQuery = !query || 
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      job.category.toLowerCase().includes(query) ||
      job.reasons.some(r => r.toLowerCase().includes(query)) ||
      job.missing.some(m => m.toLowerCase().includes(query));

    let matchesScore = true;
    if (jobMatchFilter === '90') matchesScore = job.matchScore >= 90;
    else if (jobMatchFilter === '80') matchesScore = job.matchScore >= 80;
    else if (jobMatchFilter === '75') matchesScore = job.matchScore >= 75;

    let matchesWorkMode = true;
    if (jobWorkModeFilter !== 'all') {
      matchesWorkMode = job.workMode === jobWorkModeFilter || job.location.toLowerCase().includes(jobWorkModeFilter.toLowerCase());
    }

    let matchesCategory = true;
    if (jobCategoryFilter !== 'all') {
      matchesCategory = job.category === jobCategoryFilter;
    }

    return matchesQuery && matchesScore && matchesWorkMode && matchesCategory;
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setActiveTab(determineInitialTab(location));
  }, [location.pathname, location.state]);

  const handleApplyJob = (jobId) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs([...appliedJobs, jobId]);
    }
  };

  const handleAutoFillDemo = () => {
    setCvForm({
      fullName: 'Rizki Dev',
      targetRole: 'Junior Backend Developer',
      email: 'rizki.dev@email.com',
      phone: '+62 812-3456-7890',
      location: 'Jakarta Selatan, Indonesia',
      linkedin: 'linkedin.com/in/rizkidev',
      github: 'github.com/rizkidev',
      summary: 'Junior Backend Developer berdedikasi tinggi dengan pengalaman merancang REST API berkinerja tinggi menggunakan Laravel & MySQL. Terbiasa mengoptimalkan query database dan mengimplementasikan autentikasi JWT.',
      skills: ['Laravel 10', 'PHP 8.2', 'RESTful API', 'MySQL', 'Git & GitHub', 'Postman', 'Docker Basics', 'Redis', 'Unit Testing'],
      experiences: [
        {
          id: 1,
          company: 'TechNusa Solution',
          role: 'Backend Developer Intern',
          period: 'Jan 2025 - Jul 2025',
          location: 'Jakarta (Hybrid)',
          bullets: [
            'Mengembangkan 15+ REST API endpoint terenkripsi JWT untuk sistem transaksi e-commerce.',
            'Mengoptimalkan query MySQL dengan teknik eager loading, mempercepat respon API hingga 65%.',
            'Bekerja dalam tim Agile 5 orang dengan Git flow terstruktur dan dokumentasi API di Postman.'
          ]
        }
      ],
      educations: [
        {
          id: 1,
          institution: 'Universitas Komputer Indonesia',
          degree: 'S1 Teknik Informatika',
          period: '2021 - 2025',
          gpa: '3.78 / 4.00'
        }
      ],
      certifications: [
        'Laravel Certified Developer - 2025',
        'Google Cloud Digital Leader - 2024'
      ]
    });
  };

  const handleGenerateAiSummary = () => {
    setAiSummaryLoading(true);
    setTimeout(() => {
      setAiSummaryLoading(false);
      setCvForm(prev => ({
        ...prev,
        summary: `Profesional ${prev.targetRole || 'Software Engineer'} yang siap berkontribusi dengan pengalaman praktis mengimplementasikan arsitektur bersih, integrasi API tercepat, dan manajemen database terefisiensi sesuai standar Harvard ATS.`
      }));
    }, 600);
  };

  const handleAddSkill = (skill) => {
    const name = skill || newSkillInput.trim();
    if (!name) return;
    if (!cvForm.skills.includes(name)) {
      setCvForm(prev => ({ ...prev, skills: [...prev.skills, name] }));
    }
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setCvForm(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skillToRemove) }));
  };

  const handleAddCert = () => {
    if (!newCertInput.trim()) return;
    setCvForm(prev => ({ ...prev, certifications: [...prev.certifications, newCertInput.trim()] }));
    setNewCertInput('');
  };

  const handleRemoveCert = (idx) => {
    setCvForm(prev => ({ ...prev, certifications: prev.certifications.filter((_, i) => i !== idx) }));
  };

  const handleAddBullet = (expIdx, bulletText) => {
    const text = bulletText || 'Meningkatkan efisiensi sistem sebesar 35% melalui otomatisasi workflow.';
    setCvForm(prev => {
      const updatedExps = [...prev.experiences];
      updatedExps[expIdx].bullets.push(text);
      return { ...prev, experiences: updatedExps };
    });
  };

  const handleRemoveBullet = (expIdx, bulletIdx) => {
    setCvForm(prev => {
      const updatedExps = [...prev.experiences];
      updatedExps[expIdx].bullets = updatedExps[expIdx].bullets.filter((_, i) => i !== bulletIdx);
      return { ...prev, experiences: updatedExps };
    });
  };

  const handlePrintCv = () => {
    window.print();
  };

  const handleCopyPlainText = () => {
    const text = `
${cvForm.fullName.toUpperCase()}
${cvForm.location} | ${cvForm.phone} | ${cvForm.email}
LinkedIn: ${cvForm.linkedin} | GitHub: ${cvForm.github}

RINGKASAN PROFIL
${cvForm.summary}

KETERAMPILAN UTAMA
${cvForm.skills.join(' • ')}

PENGALAMAN KERJA & PROJEK
${cvForm.experiences.map(e => `
${e.role.toUpperCase()} - ${e.company} (${e.period})
${e.bullets.map(b => `- ${b}`).join('\n')}
`).join('\n')}

PENDIDIKAN
${cvForm.educations.map(ed => `${ed.degree} - ${ed.institution} (${ed.period}) | IPK: ${ed.gpa}`).join('\n')}

SERTIFIKASI
${cvForm.certifications.join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleSimulateInterview = () => {
    if (!userAnswer.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAiFeedback({
        score: 90,
        strengths: ['Jawaban terstruktur dengan baik', 'Memahami konsep dasar dengan baik'],
        suggestions: ['Tambahkan contoh konkret dari proyek nyata yang pernah kamu kerjakan untuk nilai plus.'],
      });
    }, 1400);
  };

  return (
    <main className="bg-[#050816] min-h-screen pt-24 pb-20 text-slate-100 font-sans relative overflow-x-hidden">
      
      {/* Ambient background blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[5%] left-[10%] w-[600px] h-[600px] bg-teal-500/10 rounded-full filter blur-[120px]" />
        <div className="absolute top-[40%] right-[5%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full filter blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ══ WELCOME PROFILE HEADER BANNER ══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative p-[1px] rounded-3xl bg-gradient-to-r from-teal-500/40 via-indigo-500/40 to-teal-500/40 shadow-2xl">
            <div className="bg-slate-900/90 backdrop-blur-2xl rounded-[23px] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              
              <div className="flex items-center gap-5 w-full md:w-auto">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-teal-500 via-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-teal-500/30 flex-shrink-0">
                  {MOCK_USER.avatar}
                  <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900" />
                </div>

                <div>
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <h1 className="font-extrabold text-2xl sm:text-3xl text-slate-100">
                      Selamat Datang, {MOCK_USER.name}
                    </h1>
                    <span className="px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-bold flex items-center gap-1.5">
                      <Sparkles size={12} /> {MOCK_USER.role} • {MOCK_USER.level}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">
                    Profil CV kamu dianalisis oleh AI. Ada <strong className="text-teal-400 font-bold">24 lowongan cocok</strong> ditemukan hari ini.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
                <button onClick={() => setActiveTab('cv-builder')} className="shimmer-btn-primary px-5 py-3 text-sm font-bold">
                  <FileText size={16} /> Edit CV AI
                </button>
                <button onClick={() => setActiveTab('jobs')} className="shimmer-btn-outline px-5 py-3 text-sm font-semibold">
                  <Briefcase size={16} /> Lihat Lowongan
                </button>
              </div>

            </div>
          </div>
        </motion.div>

        {/* ══ TOP METRICS STATS GRID (4 CARDS) ══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          {/* Card 1: ATS Score */}
          <div className="bg-slate-900/80 border border-teal-500/30 rounded-2xl p-5 backdrop-blur-xl shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Skor ATS CV</span>
              <div className="w-9 h-9 rounded-xl bg-teal-500/15 flex items-center justify-center">
                <Award size={18} className="text-teal-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-extrabold text-3xl text-slate-100">{MOCK_USER.atsScore}%</span>
              <span className="text-xs font-bold text-emerald-400">+4% Sangat Layak</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-teal-400 to-indigo-500 rounded-full w-[92%]" />
            </div>
          </div>

          {/* Card 2: Job Match Rate */}
          <div className="bg-slate-900/80 border border-indigo-500/30 rounded-2xl p-5 backdrop-blur-xl shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Kecocokan Kerja</span>
              <div className="w-9 h-9 rounded-xl bg-indigo-500/15 flex items-center justify-center">
                <Briefcase size={18} className="text-indigo-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-extrabold text-3xl text-slate-100">{MOCK_USER.jobMatchRate}%</span>
              <span className="text-xs text-slate-400">24 Lowongan</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-[94%]" />
            </div>
          </div>

          {/* Card 3: Detected Skills */}
          <div className="bg-slate-900/80 border border-purple-500/30 rounded-2xl p-5 backdrop-blur-xl shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Skill Terdeteksi</span>
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center">
                <TrendingUp size={18} className="text-purple-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-extrabold text-3xl text-slate-100">+{MOCK_USER.detectedSkillsCount}</span>
              <span className="text-xs text-amber-400 font-semibold">4 Perlu Ditambah</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-[70%]" />
            </div>
          </div>

          {/* Card 4: Roadmap Progress */}
          <div className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-5 backdrop-blur-xl shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Target Roadmap</span>
              <div className="w-9 h-9 rounded-xl bg-cyan-500/15 flex items-center justify-center">
                <Map size={18} className="text-cyan-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-extrabold text-3xl text-slate-100">75%</span>
              <span className="text-xs font-bold text-emerald-400">On Track</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full w-[75%]" />
            </div>
          </div>

        </div>

        {/* ══ DASHBOARD FEATURE NAVIGATION TABS ══ */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-slate-800 scrollbar-none">
          {[
            { id: 'overview', label: 'Analisis & Skor CV', icon: BarChart3 },
            { id: 'jobs', label: `Rekomendasi Lowongan (${MATCHED_JOBS.length})`, icon: Briefcase },
            { id: 'roadmap', label: 'Roadmap & Skill Gap', icon: Map },
            { id: 'cv-builder', label: 'AI CV Builder', icon: FileText },
          ].map(t => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-teal-500/20 to-indigo-500/20 text-teal-300 border border-teal-500/40 shadow-lg shadow-teal-500/10'
                    : 'bg-slate-900/40 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon size={16} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* ══ TAB CONTENT ══ */}
        <AnimatePresence mode="wait">
          
          {/* TAB 1: OVERVIEW & AI CV ANALYSIS STUDIO */}
          {activeTab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
              
              {/* 🚀 AI DEEP SCAN UPLOAD & SCANNER HERO BOX */}
              <div className="bg-slate-900/90 border border-teal-500/30 rounded-2xl p-6 mb-6 backdrop-blur-xl relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                  
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/30 flex-shrink-0">
                      <Scan size={28} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                        <h3 className="font-extrabold text-xl text-slate-100">
                          Studio Analisis CV AI & ATS Engine
                        </h3>
                      </div>
                      <p className="text-slate-400 text-xs sm:text-sm">
                        File Aktif: <strong className="text-teal-300 font-semibold">{scannedFileName}</strong> • Status: <span className="text-emerald-400 font-bold">Ter-analisis AI</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
                    <label className="shimmer-btn-outline cursor-pointer text-xs font-semibold py-2.5 px-4">
                      <Upload size={15} className="text-teal-400" />
                      <span>Upload CV Baru</span>
                      <input
                        type="file"
                        accept=".pdf,.docx"
                        className="hidden"
                        onChange={e => e.target.files?.[0] && handleStartCvScan(e.target.files[0].name)}
                      />
                    </label>

                    <button
                      onClick={() => handleStartCvScan()}
                      disabled={isScanningCv}
                      className="shimmer-btn-primary text-xs font-bold py-2.5 px-5"
                    >
                      {isScanningCv ? <RefreshCw className="animate-spin" size={15} /> : <Sparkles size={15} />}
                      {isScanningCv ? 'Sedang Memindai...' : 'Jalankan Deep Scan AI'}
                    </button>
                  </div>
                </div>

                {/* Live Scan Progress Animation Bar */}
                {isScanningCv && (
                  <div className="mt-5 pt-4 border-t border-slate-800">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-teal-300 font-bold flex items-center gap-2">
                        <Sparkles size={14} className="animate-spin" /> {scanStepText}
                      </span>
                      <span className="text-slate-400 font-bold">{scanProgress}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 transition-all duration-300 rounded-full"
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* ── LEFT COLUMN: ATS SCORE BREAKDOWN & CHECKLISTS (8 Cols) ── */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                  
                  {/* ATS 4-Pillar Metric Breakdown */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-teal-400 shadow-sm shadow-teal-400" />
                        <h3 className="font-extrabold text-lg text-slate-100">
                          Analisis Skor 4 Pilar ATS
                        </h3>
                      </div>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-md">
                        Skor Total: 92/100 (Sangat Layak)
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                      <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800">
                        <div className="text-xs text-slate-400 mb-1">Struktur & Margin</div>
                        <div className="text-2xl font-black text-emerald-400">96/100</div>
                        <div className="text-[10px] text-slate-500 mt-1">Format Harvard Compatible</div>
                      </div>
                      <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800">
                        <div className="text-xs text-slate-400 mb-1">Kata Kunci Utama</div>
                        <div className="text-2xl font-black text-teal-400">94/100</div>
                        <div className="text-[10px] text-slate-500 mt-1">Relevansi Backend High</div>
                      </div>
                      <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800">
                        <div className="text-xs text-slate-400 mb-1">Metrik Kuantitatif</div>
                        <div className="text-2xl font-black text-indigo-400">88/100</div>
                        <div className="text-[10px] text-slate-500 mt-1">Ada Poin Persentase</div>
                      </div>
                      <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800">
                        <div className="text-xs text-slate-400 mb-1">Parsing Bot AI</div>
                        <div className="text-2xl font-black text-purple-400">90/100</div>
                        <div className="text-[10px] text-slate-500 mt-1">Bebas Tabel Rumit</div>
                      </div>
                    </div>

                    {/* Checklists: Keunggulan vs Rekomendasi Perbaikan */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Keunggulan CV */}
                      <div className="bg-emerald-500/10 border border-emerald-500/25 p-4 rounded-xl">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2.5">
                          <CheckCircle2 size={15} /> Kekuatan Utama CV
                        </div>
                        <ul className="text-xs text-slate-300 space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-emerald-400 font-bold">•</span> Format hirarki judul & font mudah dibaca oleh parser rekruiter.
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-emerald-400 font-bold">•</span> Kata kunci teknis (Laravel, REST API, MySQL) teridentifikasi sempurna.
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-emerald-400 font-bold">•</span> Riwayat pendidikan & informasi kontak terstruktur tanpa error parsing.
                          </li>
                        </ul>
                      </div>

                      {/* Saran Perbaikan AI */}
                      <div className="bg-amber-500/10 border border-amber-500/25 p-4 rounded-xl">
                        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2.5">
                          <AlertCircle size={15} /> Rekomendasi Perbaikan AI
                        </div>
                        <ul className="text-xs text-slate-300 space-y-2 mb-3">
                          <li className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold">•</span> Tambahkan angka persentase di poin proyek (contoh: *"Mempercepat API 65%"*).
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold">•</span> Sertakan repositori GitHub aktif untuk memvalidasi skill Git.
                          </li>
                        </ul>
                        
                        {/* Direct Link to CV Builder */}
                        <button
                          onClick={() => setActiveTab('cv-builder')}
                          className="w-full text-xs font-bold text-teal-300 hover:text-white bg-slate-900/80 border border-teal-500/40 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                        >
                          <FileText size={13} /> Perbaiki Otomatis di CV Builder <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Skill Matrix Dashboard (Matched vs Missing) */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-extrabold text-lg text-slate-100">
                        Hasil Analisis Matriks Skill ({DETECTED_SKILLS.length})
                      </h3>
                      <button
                        onClick={() => setActiveTab('roadmap')}
                        className="text-xs font-bold text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Map size={13} /> Lihat Roadmap Skill Gap <ChevronRight size={13} />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {DETECTED_SKILLS.map(sk => (
                        <div
                          key={sk.name}
                          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                            sk.status === 'matched'
                              ? 'bg-teal-500/10 border-teal-500/30 text-teal-300'
                              : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                          }`}
                        >
                          {sk.status === 'matched' ? <CheckCircle2 size={14} className="text-teal-400" /> : <AlertCircle size={14} className="text-amber-400" />}
                          <span>{sk.name}</span>
                          <span className="bg-slate-800/80 text-slate-400 px-1.5 py-0.5 rounded text-[10px]">{sk.level}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* ── RIGHT COLUMN: NYAMBUNG ACTION CARDS (4 Cols) ── */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  
                  {/* Top Match Job Card (Nyambung ke Lowongan) */}
                  <div className="bg-slate-900/80 border border-teal-500/30 rounded-2xl p-6 backdrop-blur-xl">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                      <span className="text-xs font-bold text-teal-400 tracking-wider">LOWONGAN REKOMENDASI TERINGGI</span>
                    </div>

                    <h4 className="font-extrabold text-lg text-slate-100 mb-1">
                      {MATCHED_JOBS[0].title}
                    </h4>
                    <div className="text-xs text-slate-400 mb-4">
                      {MATCHED_JOBS[0].company} • {MATCHED_JOBS[0].location}
                    </div>

                    <div className="flex items-center justify-between p-3.5 bg-teal-500/10 rounded-xl border border-teal-500/20 mb-4">
                      <span className="text-xs font-bold text-teal-300">Tingkat Match CV</span>
                      <span className="text-2xl font-black text-teal-400">{MATCHED_JOBS[0].matchScore}%</span>
                    </div>

                    <button onClick={() => setActiveTab('jobs')} className="shimmer-btn-primary w-full justify-center py-3 text-sm">
                      Lamar Lowongan Ini <ArrowRight size={15} />
                    </button>
                  </div>

                  {/* Integrated Quick Action Center */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl">
                    <h4 className="font-extrabold text-base text-slate-100 mb-3">
                      Aksi Cepat Terintegrasi
                    </h4>
                    <div className="space-y-2.5">
                      <button
                        onClick={() => setActiveTab('cv-builder')}
                        className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-800 hover:text-white transition-all text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <FileText size={16} className="text-teal-400" />
                          <span>Edit CV Format Harvard ATS</span>
                        </div>
                        <ChevronRight size={16} className="text-teal-400" />
                      </button>

                      <button
                        onClick={() => setActiveTab('roadmap')}
                        className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-800 hover:text-white transition-all text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <Map size={16} className="text-teal-400" />
                          <span>Tutup Skill Gap Di Roadmap</span>
                        </div>
                        <ChevronRight size={16} className="text-teal-400" />
                      </button>

                      <button
                        onClick={handlePrintCv}
                        className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-800 hover:text-white transition-all text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <Printer size={16} className="text-teal-400" />
                          <span>Cetak Laporan Audit CV</span>
                        </div>
                        <ChevronRight size={16} className="text-teal-400" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 2: REKOMENDASI LOWONGAN KERJA (SEARCH, FILTER & INFINITE AUTO-LOAD) */}
          {activeTab === 'jobs' && (
            <motion.div key="jobs" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
              
              {/* Header Hero Banner & Search Input */}
              <div className="bg-slate-900/90 border border-teal-500/30 rounded-2xl p-6 mb-6 backdrop-blur-xl">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
                      <h3 className="font-extrabold text-xl sm:text-2xl text-slate-100">
                        Pencarian & Rekomendasi Lowongan Kerja AI
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400">
                      Sistem mencocokkan profil CV & skill kamu secara otomatis dengan <strong className="text-teal-300 font-semibold">{MATCHED_JOBS.length} lowongan kerja aktif</strong>.
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2 rounded-xl">
                    <CheckCircle2 size={16} /> Skor Match Rata-rata: 92%
                  </div>
                </div>

                {/* Real-time Search Bar Box */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-teal-400">
                    <Search size={18} />
                  </div>
                  <input
                    type="text"
                    value={jobSearchQuery}
                    onChange={(e) => {
                      setJobSearchQuery(e.target.value);
                      setVisibleJobsCount(6);
                    }}
                    placeholder="Cari posisi, nama perusahaan, kota, atau skill (contoh: Laravel, React, Remote, Jakarta)..."
                    className="w-full pl-11 pr-10 py-3.5 bg-slate-950/80 border border-teal-500/40 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all shadow-inner"
                  />
                  {jobSearchQuery && (
                    <button
                      onClick={() => {
                        setJobSearchQuery('');
                        setVisibleJobsCount(6);
                      }}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                {/* Filter Controls Bar & Quick Chips */}
                <div className="mt-5 pt-5 border-t border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2.5 text-xs">
                    <span className="font-bold text-slate-400 flex items-center gap-1.5 mr-1">
                      <Filter size={14} className="text-teal-400" /> Filter:
                    </span>

                    {/* Match Score Filter */}
                    <div className="flex items-center bg-slate-950/70 p-1 rounded-xl border border-slate-800">
                      {[
                        { id: 'all', label: 'Semua Match' },
                        { id: '90', label: '90%+ Super' },
                        { id: '80', label: '80%+ High' },
                        { id: '75', label: '75%+ Good' },
                      ].map(f => (
                        <button
                          key={f.id}
                          onClick={() => {
                            setJobMatchFilter(f.id);
                            setVisibleJobsCount(6);
                          }}
                          className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                            jobMatchFilter === f.id
                              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>

                    {/* Work Mode Filter */}
                    <div className="flex items-center bg-slate-950/70 p-1 rounded-xl border border-slate-800">
                      {[
                        { id: 'all', label: 'Semua Mode' },
                        { id: 'Remote', label: 'Remote' },
                        { id: 'Hybrid', label: 'Hybrid' },
                        { id: 'On-site', label: 'On-site' },
                      ].map(m => (
                        <button
                          key={m.id}
                          onClick={() => {
                            setJobWorkModeFilter(m.id);
                            setVisibleJobsCount(6);
                          }}
                          className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                            jobWorkModeFilter === m.id
                              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>

                    {/* Category Filter */}
                    <div className="flex items-center bg-slate-950/70 p-1 rounded-xl border border-slate-800">
                      {[
                        { id: 'all', label: 'Semua Role' },
                        { id: 'Backend', label: 'Backend' },
                        { id: 'Fullstack', label: 'Fullstack' },
                        { id: 'Frontend', label: 'Frontend' },
                        { id: 'DevOps', label: 'DevOps' },
                      ].map(c => (
                        <button
                          key={c.id}
                          onClick={() => {
                            setJobCategoryFilter(c.id);
                            setVisibleJobsCount(6);
                          }}
                          className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                            jobCategoryFilter === c.id
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reset Filters Button */}
                  {(jobSearchQuery || jobMatchFilter !== 'all' || jobWorkModeFilter !== 'all' || jobCategoryFilter !== 'all') && (
                    <button
                      onClick={handleResetJobFilters}
                      className="text-xs font-bold text-slate-400 hover:text-teal-300 flex items-center gap-1.5 transition-colors cursor-pointer self-end lg:self-auto"
                    >
                      <RefreshCw size={13} /> Reset Filter
                    </button>
                  )}
                </div>
              </div>

              {/* Live Status Counter Banner */}
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="text-xs font-bold text-slate-400">
                  Menampilkan <span className="text-teal-300 font-extrabold">{Math.min(visibleJobsCount, filteredJobs.length)}</span> dari <span className="text-slate-200 font-extrabold">{filteredJobs.length}</span> lowongan ditemukan
                </div>
                {savedJobs.length > 0 && (
                  <div className="text-xs font-bold text-amber-400 flex items-center gap-1">
                    <Bookmark size={13} /> {savedJobs.length} Lowongan Tersimpan
                  </div>
                )}
              </div>

              {/* Job Listings Cards List */}
              {filteredJobs.length > 0 ? (
                <div className="space-y-4 mb-6">
                  {filteredJobs.slice(0, visibleJobsCount).map(job => (
                    <div
                      key={job.id}
                      className="bg-slate-900/80 border border-teal-500/25 hover:border-teal-500/50 rounded-2xl p-6 backdrop-blur-xl transition-all duration-200 hover:shadow-xl hover:shadow-teal-500/5 flex flex-col lg:flex-row items-start justify-between gap-6 relative overflow-hidden group"
                    >
                      {/* Left Job Info Column */}
                      <div className="flex-1 w-full">
                        <div className="flex items-center gap-2.5 flex-wrap mb-2">
                          <span className={`px-3 py-1 rounded-lg text-xs font-black tracking-wide ${
                            job.matchScore >= 92
                              ? 'bg-gradient-to-r from-teal-500/20 to-emerald-500/20 text-teal-300 border border-teal-500/40 shadow-sm shadow-teal-500/20'
                              : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          }`}>
                            {job.matchScore}% MATCH
                          </span>

                          <span className="text-[11px] font-bold text-slate-300 bg-slate-800/80 px-2.5 py-0.5 rounded-md border border-slate-700">
                            {job.workMode}
                          </span>

                          <span className="text-[11px] font-bold text-purple-300 bg-purple-500/10 px-2.5 py-0.5 rounded-md border border-purple-500/20">
                            {job.category}
                          </span>

                          <span className="text-xs text-slate-500 ml-auto lg:ml-0 flex items-center gap-1">
                            <Clock size={12} /> {job.posted}
                          </span>
                        </div>

                        <h4 className="font-extrabold text-xl text-slate-100 group-hover:text-teal-300 transition-colors mb-1.5">
                          {job.title}
                        </h4>

                        <div className="flex items-center gap-3 text-xs font-semibold text-slate-300 mb-3 flex-wrap">
                          <span className="flex items-center gap-1.5 text-slate-200">
                            <Building2 size={14} className="text-teal-400" /> {job.company}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span className="flex items-center gap-1 text-slate-400">
                            <MapPin size={14} className="text-slate-400" /> {job.location}
                          </span>
                        </div>

                        <div className="inline-flex items-center gap-1.5 text-sm font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 rounded-xl mb-4">
                          <DollarSign size={15} /> {job.salary}
                        </div>

                        {/* Matching Reasons Checklist */}
                        <div className="space-y-1.5 mb-2">
                          {job.reasons.map((r, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                              <CheckCircle2 size={13} className="text-teal-400 flex-shrink-0" />
                              <span>{r}</span>
                            </div>
                          ))}
                        </div>

                        {/* Missing Skills Warning Tag */}
                        {job.missing && job.missing.length > 0 && (
                          <div className="flex items-center gap-2 text-xs text-amber-400/90 mt-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg w-fit">
                            <AlertCircle size={13} className="text-amber-400 flex-shrink-0" />
                            <span>Gap Skill: <strong>{job.missing.join(', ')}</strong></span>
                          </div>
                        )}
                      </div>

                      {/* Right Quick Action Buttons */}
                      <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-48 flex-shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                        <button
                          onClick={() => handleApplyJob(job.id)}
                          className="shimmer-btn-primary justify-center w-full py-2.5 text-xs font-bold cursor-pointer"
                        >
                          {appliedJobs.includes(job.id) ? (
                            <span className="flex items-center gap-1.5 text-teal-300">
                              <CheckCircle2 size={14} /> Terlamar Instan
                            </span>
                          ) : 'Lamar Instan'}
                        </button>

                        <button
                          onClick={() => setSelectedJobModal(job)}
                          className="shimmer-btn-outline justify-center w-full py-2 text-xs font-semibold cursor-pointer"
                        >
                          <Eye size={14} className="text-teal-400" /> Detail & Syarat
                        </button>

                        <button
                          onClick={() => handleToggleSaveJob(job.id)}
                          className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                            savedJobs.includes(job.id)
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800/50'
                          }`}
                        >
                          <Bookmark size={13} className={savedJobs.includes(job.id) ? 'fill-amber-400 text-amber-400' : ''} />
                          {savedJobs.includes(job.id) ? 'Tersimpan' : 'Simpan'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty State when zero results match filter */
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-10 backdrop-blur-xl text-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 mx-auto mb-3">
                    <Search size={24} />
                  </div>
                  <h4 className="font-extrabold text-lg text-slate-200 mb-1">
                    Tidak Ada Lowongan Yang Cocok
                  </h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto mb-5">
                    Tidak ada pekerjaan yang memenuhi kata kunci <strong className="text-teal-300">"{jobSearchQuery}"</strong> atau kombinasi filter aktif saat ini.
                  </p>
                  <button
                    onClick={handleResetJobFilters}
                    className="shimmer-btn-primary text-xs font-bold py-2.5 px-5 mx-auto"
                  >
                    <RefreshCw size={14} /> Reset Semua Filter
                  </button>
                </div>
              )}

              {/* ══ INFINITE SCROLL AUTO-LOAD INDICATOR FOOTER ══ */}
              {filteredJobs.length > 0 && (
                <div className="mt-8 pt-4 pb-6 flex flex-col items-center justify-center text-center">
                  {visibleJobsCount < filteredJobs.length ? (
                    <div className="bg-slate-900/90 border border-teal-500/30 px-6 py-4 rounded-2xl backdrop-blur-xl flex items-center gap-3 shadow-lg shadow-teal-500/10">
                      {isLoadingMoreJobs ? (
                        <>
                          <RefreshCw size={18} className="animate-spin text-teal-400" />
                          <span className="text-xs font-bold text-slate-200">
                            Memuat 4 lowongan kerja tambahan otomatis...
                          </span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={18} className="text-teal-400 animate-pulse" />
                          <span className="text-xs font-bold text-slate-300">
                            Scroll ke bawah untuk memuat lowongan otomatis ({visibleJobsCount} dari {filteredJobs.length} dimuat)
                          </span>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="bg-slate-900/60 border border-emerald-500/30 px-6 py-3 rounded-2xl text-xs font-bold text-emerald-400 flex items-center gap-2">
                      <CheckCircle2 size={16} /> Semua {filteredJobs.length} lowongan kerja terpilih telah berhasil dimuat.
                    </div>
                  )}
                </div>
              )}

            </motion.div>
          )}

          {/* TAB 3: ROADMAP & SKILL GAP */}
          {activeTab === 'roadmap' && (
            <motion.div key="roadmap" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
              <div className="mb-6">
                <h3 className="font-extrabold text-xl text-slate-100 mb-1">
                  Roadmap Pertumbuhan Karir AI
                </h3>
                <p className="text-xs text-slate-400">
                  Langkah konkret untuk menaikkan skor CV dari Junior (92%) ke Mid-Level Backend Developer.
                </p>
              </div>

              <div className="space-y-4">
                {ROADMAP_STEPS.map(st => (
                  <div
                    key={st.step}
                    className={`bg-slate-900/80 border rounded-2xl p-6 backdrop-blur-xl flex items-start gap-5 ${
                      st.status === 'in-progress' ? 'border-teal-500/40 shadow-lg shadow-teal-500/10' : 'border-slate-800'
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-lg flex-shrink-0 ${
                      st.status === 'in-progress' ? 'bg-gradient-to-br from-teal-500 to-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      0{st.step}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap mb-1.5">
                        <h4 className="font-extrabold text-lg text-slate-100">
                          {st.title}
                        </h4>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                          st.status === 'in-progress' ? 'bg-teal-500/15 text-teal-300' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {st.duration}
                        </span>
                      </div>

                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-3">
                        {st.desc}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {st.skills.map(sk => (
                          <span key={sk} className="text-xs font-semibold text-teal-300 bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded-md">
                            + {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 4: AI CV BUILDER (HARVARD ATS) */}
          {activeTab === 'cv-builder' && (
            <motion.div key="cv-builder" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
              
              {/* Header Bar & Quick Actions for Laymen */}
              <div className="bg-slate-900/90 border border-teal-500/30 rounded-2xl p-5 mb-6 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="text-teal-400" size={20} />
                    <h2 className="font-extrabold text-xl text-slate-100">
                      Pembuat CV Format Harvard (ATS Compatible)
                    </h2>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    Dirancang sangat mudah untuk pemula. Cukup isi form atau gunakan tombol otomatis di bawah.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
                  <button
                    onClick={handleAutoFillDemo}
                    className="shimmer-btn-outline text-xs font-semibold py-2.5 px-4"
                    title="Klik untuk mengisi data contoh otomatis"
                  >
                    <Wand2 size={15} className="text-teal-400" /> Isi Data Contoh
                  </button>
                  <button
                    onClick={handlePrintCv}
                    className="shimmer-btn-primary text-xs font-bold py-2.5 px-5"
                  >
                    <Printer size={15} /> Cetak / Unduh PDF
                  </button>
                </div>
              </div>

              {/* Mobile View Toggle Buttons */}
              <div className="flex md:hidden bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 mb-6">
                <button
                  onClick={() => setMobileCvTab('editor')}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${
                    mobileCvTab === 'editor' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' : 'text-slate-400'
                  }`}
                >
                  1. Edit Form CV
                </button>
                <button
                  onClick={() => setMobileCvTab('preview')}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${
                    mobileCvTab === 'preview' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' : 'text-slate-400'
                  }`}
                >
                  2. Lihat Pratinjau Harvard
                </button>
              </div>

              {/* Main Grid Editor + Live Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* ── LEFT COLUMN: STEP-BY-STEP FORM BUILDER (7 Cols) ── */}
                <div className={`lg:col-span-7 flex flex-col gap-6 ${mobileCvTab === 'preview' ? 'hidden md:flex' : 'flex'}`}>
                  
                  {/* Step Stepper Header */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur-xl">
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { step: 1, label: 'Data Diri', icon: User },
                        { step: 2, label: 'Keterampilan', icon: Sparkles },
                        { step: 3, label: 'Pengalaman', icon: Briefcase },
                        { step: 4, label: 'Pendidikan', icon: GraduationCap },
                      ].map(s => {
                        const StepIcon = s.icon;
                        const active = builderStep === s.step;
                        return (
                          <button
                            key={s.step}
                            onClick={() => setBuilderStep(s.step)}
                            className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all text-center cursor-pointer ${
                              active
                                ? 'bg-teal-500/15 border-teal-500/40 text-teal-300 shadow-md'
                                : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            <StepIcon size={16} className={active ? 'text-teal-400 mb-1' : 'mb-1'} />
                            <span className="text-[11px] font-bold tracking-tight">{s.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Form Step Body */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl">
                    
                    {/* STEP 1: DATA DIRI */}
                    {builderStep === 1 && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <h3 className="font-extrabold text-base text-slate-100 flex items-center gap-2">
                            <User size={18} className="text-teal-400" /> Informasi Data Diri
                          </h3>
                          <span className="text-xs text-slate-400">Langkah 1 dari 4</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nama Lengkap</label>
                            <input
                              type="text"
                              value={cvForm.fullName}
                              onChange={e => setCvForm({ ...cvForm, fullName: e.target.value })}
                              placeholder="cth: Rizki Dev"
                              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-slate-100 text-xs sm:text-sm focus:border-teal-500 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Judul Posisi Target</label>
                            <input
                              type="text"
                              value={cvForm.targetRole}
                              onChange={e => setCvForm({ ...cvForm, targetRole: e.target.value })}
                              placeholder="cth: Junior Backend Developer"
                              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-slate-100 text-xs sm:text-sm focus:border-teal-500 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Kontak</label>
                            <input
                              type="email"
                              value={cvForm.email}
                              onChange={e => setCvForm({ ...cvForm, email: e.target.value })}
                              placeholder="rizki@email.com"
                              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-slate-100 text-xs sm:text-sm focus:border-teal-500 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nomor Telepon / WhatsApp</label>
                            <input
                              type="text"
                              value={cvForm.phone}
                              onChange={e => setCvForm({ ...cvForm, phone: e.target.value })}
                              placeholder="+62 812-xxxx-xxxx"
                              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-slate-100 text-xs sm:text-sm focus:border-teal-500 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Lokasi Domisili</label>
                            <input
                              type="text"
                              value={cvForm.location}
                              onChange={e => setCvForm({ ...cvForm, location: e.target.value })}
                              placeholder="Jakarta, Indonesia"
                              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-slate-100 text-xs sm:text-sm focus:border-teal-500 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">LinkedIn Profile</label>
                            <input
                              type="text"
                              value={cvForm.linkedin}
                              onChange={e => setCvForm({ ...cvForm, linkedin: e.target.value })}
                              placeholder="linkedin.com/in/nama"
                              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-slate-100 text-xs sm:text-sm focus:border-teal-500 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">GitHub / Portfolio</label>
                            <input
                              type="text"
                              value={cvForm.github}
                              onChange={e => setCvForm({ ...cvForm, github: e.target.value })}
                              placeholder="github.com/nama"
                              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-slate-100 text-xs sm:text-sm focus:border-teal-500 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-semibold text-slate-300">Ringkasan Profil Ringkas</label>
                            <button
                              onClick={handleGenerateAiSummary}
                              disabled={aiSummaryLoading}
                              className="text-xs text-teal-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <Sparkles size={12} /> {aiSummaryLoading ? 'AI Menulis...' : 'Tuliskan via AI'}
                            </button>
                          </div>
                          <textarea
                            rows={3}
                            value={cvForm.summary}
                            onChange={e => setCvForm({ ...cvForm, summary: e.target.value })}
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-slate-100 text-xs sm:text-sm focus:border-teal-500 focus:outline-none leading-relaxed"
                          />
                        </div>
                      </div>
                    )}

                    {/* STEP 2: KETERAMPILAN & SKILL */}
                    {builderStep === 2 && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <h3 className="font-extrabold text-base text-slate-100 flex items-center gap-2">
                            <Sparkles size={18} className="text-teal-400" /> Keterampilan & Skill Utama
                          </h3>
                          <span className="text-xs text-slate-400">Langkah 2 dari 4</span>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Pilih Rekomendasi Cepat (1-Klik Tambah)</label>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {['Laravel', 'PHP', 'React', 'MySQL', 'REST API', 'Git', 'Docker', 'Postman', 'Tailwind CSS', 'Node.js', 'Troubleshooting'].map(sk => (
                              <button
                                key={sk}
                                onClick={() => handleAddSkill(sk)}
                                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-300 hover:bg-teal-500/20 transition-all cursor-pointer flex items-center gap-1"
                              >
                                <Plus size={12} /> {sk}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tambah Custom Skill</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={newSkillInput}
                              onChange={e => setNewSkillInput(e.target.value)}
                              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                              placeholder="Ketik nama skill lalu tekan Enter..."
                              className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-slate-100 text-xs sm:text-sm focus:border-teal-500 focus:outline-none"
                            />
                            <button
                              onClick={() => handleAddSkill()}
                              className="shimmer-btn-primary px-5 text-xs font-bold"
                            >
                              <Plus size={16} /> Tambah
                            </button>
                          </div>
                        </div>

                        <div className="pt-2">
                          <label className="block text-xs font-semibold text-slate-300 mb-2">Daftar Skill di CV Kamu ({cvForm.skills.length})</label>
                          <div className="flex flex-wrap gap-2 p-3 bg-slate-800/30 border border-slate-800 rounded-xl min-h-[60px]">
                            {cvForm.skills.map(sk => (
                              <span
                                key={sk}
                                className="text-xs font-bold bg-slate-800 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm"
                              >
                                {sk}
                                <button
                                  onClick={() => handleRemoveSkill(sk)}
                                  className="text-slate-400 hover:text-rose-400 cursor-pointer"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: PENGALAMAN KERJA & PROJEK */}
                    {builderStep === 3 && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <h3 className="font-extrabold text-base text-slate-100 flex items-center gap-2">
                            <Briefcase size={18} className="text-teal-400" /> Pengalaman Kerja & Projek
                          </h3>
                          <span className="text-xs text-slate-400">Langkah 3 dari 4</span>
                        </div>

                        {cvForm.experiences.map((exp, expIdx) => (
                          <div key={exp.id || expIdx} className="bg-slate-800/40 border border-slate-800 p-4 rounded-xl space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Perusahaan / Projek</label>
                                <input
                                  type="text"
                                  value={exp.company}
                                  onChange={e => {
                                    const val = e.target.value;
                                    setCvForm(prev => {
                                      const u = [...prev.experiences];
                                      u[expIdx].company = val;
                                      return { ...prev, experiences: u };
                                    });
                                  }}
                                  className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-2.5 text-slate-100 text-xs focus:border-teal-500 outline-none"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Posisi / Jabatan</label>
                                <input
                                  type="text"
                                  value={exp.role}
                                  onChange={e => {
                                    const val = e.target.value;
                                    setCvForm(prev => {
                                      const u = [...prev.experiences];
                                      u[expIdx].role = val;
                                      return { ...prev, experiences: u };
                                    });
                                  }}
                                  className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-2.5 text-slate-100 text-xs focus:border-teal-500 outline-none"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Periode (Tahun)</label>
                                <input
                                  type="text"
                                  value={exp.period}
                                  onChange={e => {
                                    const val = e.target.value;
                                    setCvForm(prev => {
                                      const u = [...prev.experiences];
                                      u[expIdx].period = val;
                                      return { ...prev, experiences: u };
                                    });
                                  }}
                                  className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-2.5 text-slate-100 text-xs focus:border-teal-500 outline-none"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Lokasi</label>
                                <input
                                  type="text"
                                  value={exp.location}
                                  onChange={e => {
                                    const val = e.target.value;
                                    setCvForm(prev => {
                                      const u = [...prev.experiences];
                                      u[expIdx].location = val;
                                      return { ...prev, experiences: u };
                                    });
                                  }}
                                  className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-2.5 text-slate-100 text-xs focus:border-teal-500 outline-none"
                                />
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <label className="block text-xs font-semibold text-slate-300">Pencapaian Kuantitatif (Poin ATS Harvard)</label>
                                <button
                                  onClick={() => handleAddBullet(expIdx)}
                                  className="text-xs font-bold text-teal-400 hover:underline cursor-pointer flex items-center gap-1"
                                >
                                  <Plus size={12} /> Tambah Bullet
                                </button>
                              </div>

                              <div className="space-y-2">
                                {exp.bullets.map((b, bIdx) => (
                                  <div key={bIdx} className="flex gap-2 items-center">
                                    <input
                                      type="text"
                                      value={b}
                                      onChange={e => {
                                        const val = e.target.value;
                                        setCvForm(prev => {
                                          const u = [...prev.experiences];
                                          u[expIdx].bullets[bIdx] = val;
                                          return { ...prev, experiences: u };
                                        });
                                      }}
                                      className="flex-1 bg-slate-900/80 border border-slate-700 rounded-lg p-2 text-slate-100 text-xs focus:border-teal-500 outline-none"
                                    />
                                    <button
                                      onClick={() => handleRemoveBullet(expIdx, bIdx)}
                                      className="p-2 text-slate-400 hover:text-rose-400 cursor-pointer"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* STEP 4: PENDIDIKAN & SERTIFIKASI */}
                    {builderStep === 4 && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <h3 className="font-extrabold text-base text-slate-100 flex items-center gap-2">
                            <GraduationCap size={18} className="text-teal-400" /> Pendidikan & Sertifikasi
                          </h3>
                          <span className="text-xs text-slate-400">Langkah 4 dari 4</span>
                        </div>

                        {cvForm.educations.map((ed, edIdx) => (
                          <div key={ed.id || edIdx} className="bg-slate-800/40 border border-slate-800 p-4 rounded-xl space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Institusi / Universitas</label>
                                <input
                                  type="text"
                                  value={ed.institution}
                                  onChange={e => {
                                    const val = e.target.value;
                                    setCvForm(prev => {
                                      const u = [...prev.educations];
                                      u[edIdx].institution = val;
                                      return { ...prev, educations: u };
                                    });
                                  }}
                                  className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-2.5 text-slate-100 text-xs focus:border-teal-500 outline-none"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Gelar / Jurusan</label>
                                <input
                                  type="text"
                                  value={ed.degree}
                                  onChange={e => {
                                    const val = e.target.value;
                                    setCvForm(prev => {
                                      const u = [...prev.educations];
                                      u[edIdx].degree = val;
                                      return { ...prev, educations: u };
                                    });
                                  }}
                                  className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-2.5 text-slate-100 text-xs focus:border-teal-500 outline-none"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Tahun Lulus</label>
                                <input
                                  type="text"
                                  value={ed.period}
                                  onChange={e => {
                                    const val = e.target.value;
                                    setCvForm(prev => {
                                      const u = [...prev.educations];
                                      u[edIdx].period = val;
                                      return { ...prev, educations: u };
                                    });
                                  }}
                                  className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-2.5 text-slate-100 text-xs focus:border-teal-500 outline-none"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">IPK / Nilai (opsional)</label>
                                <input
                                  type="text"
                                  value={ed.gpa}
                                  onChange={e => {
                                    const val = e.target.value;
                                    setCvForm(prev => {
                                      const u = [...prev.educations];
                                      u[edIdx].gpa = val;
                                      return { ...prev, educations: u };
                                    });
                                  }}
                                  className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-2.5 text-slate-100 text-xs focus:border-teal-500 outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="pt-2">
                          <label className="block text-xs font-semibold text-slate-300 mb-2">Sertifikasi & Pelatihan</label>
                          <div className="flex gap-2 mb-3">
                            <input
                              type="text"
                              value={newCertInput}
                              onChange={e => setNewCertInput(e.target.value)}
                              placeholder="cth: Laravel Certified Developer 2025"
                              className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl p-2.5 text-slate-100 text-xs focus:border-teal-500 outline-none"
                            />
                            <button
                              onClick={handleAddCert}
                              className="shimmer-btn-primary px-4 text-xs font-bold"
                            >
                              <Plus size={14} /> Tambah
                            </button>
                          </div>

                          <div className="space-y-1.5">
                            {cvForm.certifications.map((c, cIdx) => (
                              <div key={cIdx} className="flex items-center justify-between p-2.5 bg-slate-800/30 border border-slate-800 rounded-lg text-xs text-slate-200">
                                <span>{c}</span>
                                <button onClick={() => handleRemoveCert(cIdx)} className="text-slate-400 hover:text-rose-400 cursor-pointer">
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Stepper Footer Controls */}
                    <div className="flex items-center justify-between border-t border-slate-800 pt-5 mt-6">
                      <button
                        onClick={() => setBuilderStep(prev => Math.max(1, prev - 1))}
                        disabled={builderStep === 1}
                        className={`shimmer-btn-outline text-xs font-bold py-2.5 px-4 ${builderStep === 1 ? 'opacity-40 cursor-not-allowed' : ''}`}
                      >
                        Kembali
                      </button>

                      {builderStep < 4 ? (
                        <button
                          onClick={() => setBuilderStep(prev => Math.min(4, prev + 1))}
                          className="shimmer-btn-primary text-xs font-bold py-2.5 px-6"
                        >
                          Lanjut Ke Langkah {builderStep + 1} <ChevronRight size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={handlePrintCv}
                          className="shimmer-btn-primary text-xs font-bold py-2.5 px-6"
                        >
                          <Printer size={15} /> Cetak CV Harvard (PDF)
                        </button>
                      )}
                    </div>

                  </div>

                </div>

                {/* ── RIGHT COLUMN: LIVE HARVARD ATS PREVIEW (5 Cols) ── */}
                <div className={`lg:col-span-5 flex flex-col gap-4 ${mobileCvTab === 'editor' ? 'hidden md:flex' : 'flex'}`}>
                  
                  {/* ATS Compatibility Badge */}
                  <div className="bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-4 backdrop-blur-xl flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                        <CheckCircle2 size={18} className="text-emerald-400" />
                      </div>
                      <div>
                        <span className="text-xs font-extrabold text-slate-100 block">96% Harvard ATS Compatible</span>
                        <span className="text-[11px] text-slate-400">Siap Lolos Scanner Recruiter</span>
                      </div>
                    </div>

                    <button
                      onClick={handleCopyPlainText}
                      className="text-xs font-bold text-teal-300 hover:text-white transition-all flex items-center gap-1 cursor-pointer bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700"
                    >
                      <Copy size={13} /> {copiedText ? 'Tersalin!' : 'Salin Teks'}
                    </button>
                  </div>

                  {/* 📜 PRINTABLE HARVARD CV SHEET */}
                  <div
                    id="printable-cv"
                    className="bg-white text-slate-950 rounded-2xl p-8 shadow-2xl font-serif border border-slate-200 transition-all text-left"
                    style={{ minHeight: '620px' }}
                  >
                    {/* Header: Centered Full Name & Contacts */}
                    <div className="text-center border-b-2 border-slate-950 pb-3 mb-4">
                      <h1 className="text-xl sm:text-2xl font-bold tracking-wider text-slate-950 uppercase mb-1">
                        {cvForm.fullName || 'NAMA LENGKAP'}
                      </h1>
                      <div className="text-[11px] text-slate-700 flex flex-wrap items-center justify-center gap-2 font-sans font-medium">
                        {cvForm.location && <span>{cvForm.location}</span>}
                        {cvForm.phone && <span>• {cvForm.phone}</span>}
                        {cvForm.email && <span>• {cvForm.email}</span>}
                        {cvForm.linkedin && <span>• {cvForm.linkedin}</span>}
                        {cvForm.github && <span>• {cvForm.github}</span>}
                      </div>
                    </div>

                    {/* Section 1: Ringkasan Profil */}
                    {cvForm.summary && (
                      <div className="mb-4">
                        <h2 className="text-[12px] font-bold text-slate-950 uppercase tracking-widest border-b border-slate-400 pb-0.5 mb-1.5 font-sans">
                          RINGKASAN PROFIL
                        </h2>
                        <p className="text-[11.5px] text-slate-800 leading-relaxed font-sans text-justify">
                          {cvForm.summary}
                        </p>
                      </div>
                    )}

                    {/* Section 2: Keterampilan Utama */}
                    {cvForm.skills.length > 0 && (
                      <div className="mb-4">
                        <h2 className="text-[12px] font-bold text-slate-950 uppercase tracking-widest border-b border-slate-400 pb-0.5 mb-1.5 font-sans">
                          KETERAMPILAN UTAMA
                        </h2>
                        <div className="text-[11.5px] text-slate-800 font-sans leading-relaxed">
                          <strong>Keahlian Teknis:</strong> {cvForm.skills.join(' • ')}
                        </div>
                      </div>
                    )}

                    {/* Section 3: Pengalaman Kerja & Projek */}
                    {cvForm.experiences.length > 0 && (
                      <div className="mb-4">
                        <h2 className="text-[12px] font-bold text-slate-950 uppercase tracking-widest border-b border-slate-400 pb-0.5 mb-1.5 font-sans">
                          PENGALAMAN KERJA & PROJEK
                        </h2>
                        <div className="space-y-3 font-sans">
                          {cvForm.experiences.map((exp, idx) => (
                            <div key={idx}>
                              <div className="flex justify-between items-baseline font-bold text-[12px] text-slate-950">
                                <span>{exp.company} — {exp.role}</span>
                                <span className="text-[11px] font-normal text-slate-700">{exp.period}</span>
                              </div>
                              {exp.location && (
                                <div className="text-[11px] italic text-slate-600 mb-1">{exp.location}</div>
                              )}
                              <ul className="list-disc list-outside ml-4 text-[11px] text-slate-800 space-y-0.5 leading-relaxed">
                                {exp.bullets.map((b, bIdx) => (
                                  <li key={bIdx}>{b}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Section 4: Pendidikan */}
                    {cvForm.educations.length > 0 && (
                      <div className="mb-4">
                        <h2 className="text-[12px] font-bold text-slate-950 uppercase tracking-widest border-b border-slate-400 pb-0.5 mb-1.5 font-sans">
                          PENDIDIKAN
                        </h2>
                        <div className="space-y-2 font-sans">
                          {cvForm.educations.map((ed, idx) => (
                            <div key={idx} className="flex justify-between items-baseline text-[11.5px]">
                              <div>
                                <strong className="text-slate-950">{ed.institution}</strong> — {ed.degree}
                                {ed.gpa && <span className="text-slate-700 italic"> (IPK: {ed.gpa})</span>}
                              </div>
                              <span className="text-[11px] text-slate-700">{ed.period}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Section 5: Sertifikasi */}
                    {cvForm.certifications.length > 0 && (
                      <div>
                        <h2 className="text-[12px] font-bold text-slate-950 uppercase tracking-widest border-b border-slate-400 pb-0.5 mb-1.5 font-sans">
                          SERTIFIKASI & PELATIHAN
                        </h2>
                        <ul className="list-disc list-outside ml-4 text-[11px] text-slate-800 space-y-0.5 font-sans">
                          {cvForm.certifications.map((cert, idx) => (
                            <li key={idx}>{cert}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Quick Export Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handlePrintCv}
                      className="shimmer-btn-primary justify-center py-3 text-xs font-bold"
                    >
                      <Printer size={15} /> Cetak / Download PDF
                    </button>
                    <button
                      onClick={handleCopyPlainText}
                      className="shimmer-btn-outline justify-center py-3 text-xs font-bold"
                    >
                      <Copy size={15} /> {copiedText ? 'Teks Tersalin!' : 'Salin Teks ATS'}
                    </button>
                  </div>

                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* ══ INTERACTIVE JOB DETAILS POPUP MODAL ══ */}
        <AnimatePresence>
          {selectedJobModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
              onClick={() => setSelectedJobModal(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-900 border border-teal-500/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-teal-500/10 text-slate-100 relative"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedJobModal(null)}
                  className="absolute top-5 right-5 text-slate-400 hover:text-white bg-slate-800 p-2 rounded-xl border border-slate-700 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>

                {/* Modal Header */}
                <div className="flex items-center gap-3 mb-3 pr-10">
                  <span className="px-3 py-1 rounded-lg bg-teal-500/20 border border-teal-500/40 text-teal-300 font-extrabold text-xs">
                    {selectedJobModal.matchScore}% MATCH ATS
                  </span>
                  <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-md">
                    {selectedJobModal.workMode}
                  </span>
                  <span className="text-xs text-slate-500">{selectedJobModal.posted}</span>
                </div>

                <h3 className="font-black text-2xl text-slate-100 mb-2">
                  {selectedJobModal.title}
                </h3>

                <div className="flex items-center gap-2 text-sm text-slate-300 mb-4 font-semibold">
                  <Building2 size={16} className="text-teal-400" />
                  <span>{selectedJobModal.company}</span>
                  <span className="text-slate-600">•</span>
                  <MapPin size={16} className="text-slate-400" />
                  <span className="text-slate-400">{selectedJobModal.location}</span>
                </div>

                <div className="inline-flex items-center gap-2 text-base font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-xl mb-6">
                  <DollarSign size={18} /> {selectedJobModal.salary}
                </div>

                {/* Modal Content Sections */}
                <div className="space-y-6 text-xs sm:text-sm border-t border-slate-800 pt-5">
                  {/* Deskripsi Pekerjaan */}
                  <div>
                    <h4 className="font-extrabold text-slate-200 text-sm mb-2 flex items-center gap-2">
                      <FileText size={16} className="text-teal-400" /> Deskripsi Pekerjaan
                    </h4>
                    <p className="text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                      {selectedJobModal.description}
                    </p>
                  </div>

                  {/* Kualifikasi & Persyaratan */}
                  <div>
                    <h4 className="font-extrabold text-slate-200 text-sm mb-2.5 flex items-center gap-2">
                      <ShieldCheck size={16} className="text-teal-400" /> Syarat & Kualifikasi Utama
                    </h4>
                    <ul className="space-y-2">
                      {selectedJobModal.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-slate-300 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60">
                          <Check size={15} className="text-teal-400 mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Alasan Kesesuaian Profil */}
                  <div className="bg-teal-500/10 border border-teal-500/25 p-4 rounded-2xl">
                    <h4 className="font-extrabold text-teal-300 text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                      <CheckCircle2 size={16} /> Kenapa CV Kamu Sangat Cocok:
                    </h4>
                    <ul className="space-y-1.5 text-slate-200">
                      {selectedJobModal.reasons.map((r, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-teal-400 font-bold">•</span> {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="mt-8 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => {
                      handleApplyJob(selectedJobModal.id);
                    }}
                    className="shimmer-btn-primary justify-center w-full sm:flex-1 py-3 text-xs font-bold cursor-pointer"
                  >
                    {appliedJobs.includes(selectedJobModal.id) ? (
                      <span className="flex items-center gap-2 text-teal-300">
                        <CheckCircle2 size={16} /> Lamaran Telah Terkirim
                      </span>
                    ) : 'Lamar Instan Sekarang'}
                  </button>

                  <button
                    onClick={() => handleToggleSaveJob(selectedJobModal.id)}
                    className={`w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                      savedJobs.includes(selectedJobModal.id)
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                    }`}
                  >
                    <Bookmark size={15} className={savedJobs.includes(selectedJobModal.id) ? 'fill-amber-400 text-amber-400' : ''} />
                    {savedJobs.includes(selectedJobModal.id) ? 'Tersimpan' : 'Simpan'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
};

export default Dashboard;
