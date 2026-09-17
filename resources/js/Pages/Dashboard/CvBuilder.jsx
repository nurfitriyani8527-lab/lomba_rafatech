import React, { useState } from 'react';
import { FileText, Download, Sparkles, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export default function CvBuilder({ user }) {
  const [form, setForm] = useState({
    fullName: user?.name || 'Rizki Dev',
    targetRole: 'Junior Backend Developer',
    email: user?.email || 'rizki.dev@email.com',
    phone: '+62 812-3456-7890',
    location: 'Jakarta, Indonesia',
    summary: 'Junior Backend Developer berdedikasi tinggi dengan pengalaman merancang REST API berkinerja tinggi menggunakan Laravel & MySQL. Terbiasa mengoptimalkan query database dan mengimplementasikan autentikasi JWT.',
    skills: ['Laravel 10', 'PHP 8.2', 'RESTful API', 'MySQL', 'Git & GitHub', 'Postman'],
  });

  const [aiEnhancing, setAiEnhancing] = useState(false);

  const handleEnhanceSummary = () => {
    setAiEnhancing(true);
    setTimeout(() => {
      setForm(prev => ({
        ...prev,
        summary: 'Hasil Optimasi AI: Full-Stack & Backend Engineer terampil dengan spesialisasi dalam arsitektur microservices Laravel, optimasi database MySQL (eager loading/indexing), dan pembuatan API terenkripsi JWT yang melayani 10,000+ pengguna aktif.',
      }));
      setAiEnhancing(false);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
        <div>
          <h3 className="font-black text-xl text-slate-100">Generator CV Format Harvard (ATS Friendly)</h3>
          <p className="text-xs text-slate-400 mt-1">
            Didesain khusus untuk lolos verifikasi pindaian ATS perusahaan dan menarik minat HR.
          </p>
        </div>

        <button onClick={handlePrint} className="shimmer-btn-primary px-6 py-3 text-xs font-bold flex-shrink-0 cursor-pointer">
          <Download size={16} /> Cetak / Unduh PDF Harvard
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Form Editor Column */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="font-extrabold text-base text-slate-100">Formulir Data CV</h4>
            <button
              onClick={handleEnhanceSummary}
              disabled={aiEnhancing}
              className="text-xs text-teal-400 font-bold hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles size={14} /> {aiEnhancing ? 'Mengoptimalkan AI...' : 'Tingkatkan Deskripsi dengan AI'}
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Lengkap</label>
            <input
              type="text"
              value={form.fullName}
              onChange={e => setForm({ ...form, fullName: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Target Posisi Pekerjaan</label>
            <input
              type="text"
              value={form.targetRole}
              onChange={e => setForm({ ...form, targetRole: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Ringkasan Profesional (Summary)</label>
            <textarea
              rows={4}
              value={form.summary}
              onChange={e => setForm({ ...form, summary: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 leading-relaxed"
            />
          </div>
        </div>

        {/* Live Printable Preview Column */}
        <div className="bg-white text-slate-900 rounded-3xl p-8 shadow-2xl space-y-4 font-sans text-xs" id="printable-cv">
          <div className="text-center border-b border-slate-300 pb-4">
            <h2 className="text-2xl font-bold uppercase tracking-wider text-slate-950 mb-1">{form.fullName}</h2>
            <div className="text-slate-600 font-semibold">{form.targetRole}</div>
            <div className="text-[11px] text-slate-500 mt-1">
              {form.email} • {form.phone} • {form.location}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1 mb-2">
              PROFESSIONAL SUMMARY
            </h4>
            <p className="text-slate-700 leading-relaxed text-[11px]">{form.summary}</p>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1 mb-2">
              CORE TECHNICAL SKILLS
            </h4>
            <div className="flex flex-wrap gap-2">
              {form.skills.map(sk => (
                <span key={sk} className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded font-semibold text-[10px] border border-slate-300">
                  {sk}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
