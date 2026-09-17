import React from 'react';
import { Zap, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SkillGap() {
  const capabilities = [
    { name: 'Laravel Framework', level: 100, status: 'Mastered' },
    { name: 'PHP 8.x', level: 100, status: 'Mastered' },
    { name: 'MySQL Database', level: 90, status: 'Strong' },
    { name: 'RESTful API Design', level: 90, status: 'Strong' },
    { name: 'React.js Basics', level: 60, status: 'Intermediate' },
    { name: 'TypeScript', level: 30, status: 'Learning' },
    { name: 'Docker & Containers', level: 20, status: 'Priority Gap' },
  ];

  const priorities = [
    { title: 'Docker & Containerization', priority: 'HIGH PRIORITY', desc: 'Sangat sering diminta untuk posisi Backend Developer agar aplikasi siap di-deploy secara terisolasi.', badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
    { title: 'TypeScript', priority: 'MEDIUM PRIORITY', desc: 'Meningkatkan pemahaman type safety saat berkolaborasi dengan frontend developer.', badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    { title: 'Cloud Deployment (AWS/DigitalOcean)', priority: 'LOW PRIORITY', desc: 'Memberikan nilai tambah besar saat melamar posisi Mid-Level Backend Engineer.', badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  ];

  return (
    <div className="space-y-8">
      {/* Skill Gap Visualization */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex items-center gap-2 mb-2">
          <Zap size={18} className="text-amber-400" />
          <h3 className="font-black text-xl text-slate-100">Visualisasi Kemampuan vs Target Karir</h3>
        </div>
        <p className="text-xs text-slate-400 mb-6">
          Peta perbandingan skill yang kamu kuasai saat ini dengan kualifikasi standar pasar.
        </p>

        <div className="space-y-4">
          {capabilities.map((sk) => (
            <div key={sk.name} className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-200">
                <span>{sk.name}</span>
                <span className={sk.level < 40 ? 'text-amber-400 font-extrabold' : 'text-teal-400'}>
                  {sk.level}% ({sk.status})
                </span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    sk.level < 40 ? 'bg-amber-400' : 'bg-gradient-to-r from-teal-500 to-indigo-500'
                  }`}
                  style={{ width: `${sk.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Priority Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {priorities.map((item) => (
          <div key={item.title} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-extrabold border ${item.badgeColor} mb-3`}>
                {item.priority}
              </span>
              <h4 className="font-extrabold text-base text-slate-100 mb-2">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">{item.desc}</p>
            </div>
            <button className="shimmer-btn-outline w-full justify-center py-2 text-xs font-bold">
              Pelajari Skill Ini <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
