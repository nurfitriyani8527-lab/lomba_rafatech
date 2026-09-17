import React, { useState } from 'react';
import { Map, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

export default function CareerRoadmap() {
  const [selectedNode, setSelectedNode] = useState(null);

  const nodes = [
    { step: 1, title: 'Junior Backend Developer', status: 'YOU ARE HERE', current: true, desc: 'Menguasai sintaks PHP 8.x, struktur MVC Laravel, dan query relasional MySQL.' },
    { step: 2, title: 'Advanced Laravel & REST Testing', status: 'IN PROGRESS', current: false, desc: 'Mengimplementasikan Service Classes, FormRequests, Pest/PHPUnit tests, dan JWT authentication.' },
    { step: 3, title: 'Docker Containerization', status: 'NEXT STEP', current: false, desc: 'Membuat Dockerfile, docker-compose untuk mengisolasi service MySQL & Redis.' },
    { step: 4, title: 'Cloud Deployment & CI/CD', status: 'FUTURE GOAL', current: false, desc: 'Deploy ke VPS Nginx, setup SSL, GitHub Actions CI/CD pipeline, dan monitoring.' },
    { step: 5, title: 'Senior Backend Engineer', status: 'CAREER TARGET', current: false, desc: 'Merancang arsitektur microservices, message queue (RabbitMQ/BullMQ), dan database sharding.' },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex items-center gap-2 mb-2">
          <Map size={18} className="text-teal-400" />
          <h3 className="font-black text-xl text-slate-100">Peta Jalan Karir Personal (AI Roadmap)</h3>
        </div>
        <p className="text-xs text-slate-400 mb-8">
          Panduan tahapan terstruktur dari posisimu saat ini menuju Senior Backend Engineer.
        </p>

        {/* Visual Vertical Node Timeline */}
        <div className="relative pl-6 space-y-8 border-l-2 border-slate-800">
          {nodes.map((nd) => (
            <div
              key={nd.step}
              onClick={() => setSelectedNode(nd)}
              className="relative group cursor-pointer"
            >
              {/* Node Indicator Dot */}
              <div
                className={`absolute -left-[31px] top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  nd.current
                    ? 'bg-teal-400 border-teal-300 shadow-lg shadow-teal-400/50 scale-125'
                    : 'bg-slate-900 border-slate-700 group-hover:border-teal-400'
                }`}
              >
                {nd.current && <span className="w-1.5 h-1.5 bg-slate-950 rounded-full" />}
              </div>

              {/* Node Content Card */}
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  nd.current
                    ? 'bg-teal-500/10 border-teal-500/40 shadow-xl shadow-teal-500/10'
                    : 'bg-slate-900/60 border-slate-800 group-hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-md border ${
                    nd.current
                      ? 'bg-teal-400 text-slate-950 border-teal-300'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    STEP {nd.step} • {nd.status}
                  </span>
                  <ChevronRight size={16} className="text-slate-500 group-hover:text-teal-400 transition-colors" />
                </div>

                <h4 className="font-extrabold text-base text-slate-100 mb-1">{nd.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{nd.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Node Detail Modal */}
      {selectedNode && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full">
            <span className="text-xs font-bold text-teal-400">STEP {selectedNode.step} DETAILS</span>
            <h3 className="font-extrabold text-xl text-slate-100 my-2">{selectedNode.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">{selectedNode.desc}</p>
            <button
              onClick={() => setSelectedNode(null)}
              className="shimmer-btn-primary w-full justify-center py-2.5 text-xs font-bold cursor-pointer"
            >
              Tutup Modal Detail
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
