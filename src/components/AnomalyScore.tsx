import React, { useState, useEffect } from 'react';
import { BrainCircuit } from 'lucide-react';
import { SystemState } from '../types';

export function AnomalyScore({ systemState, lang }: { systemState: SystemState, lang: 'en' | 'vi' }) {
  const [score, setScore] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setScore(prev => {
        let target = systemState === 'DDOS' ? 98 : systemState === 'DETECTING' ? 65 : 12;
        let diff = target - prev;
        return prev + diff * 0.2 + (Math.random() * 4 - 2);
      });
    }, 500);
    return () => clearInterval(interval);
  }, [systemState]);

  const displayScore = Math.min(100, Math.max(0, score)).toFixed(1);
  const color = score > 80 ? 'text-rose-500' : score > 50 ? 'text-orange-500' : 'text-emerald-500';
  const glow = score > 80 ? 'drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]' : score > 50 ? 'drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]';

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-xl p-6 h-full flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-6 left-6 flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 uppercase">
        <BrainCircuit className="w-4 h-4 text-indigo-400" />
        {lang === 'en' ? 'AI Anomaly Score' : 'Chỉ Số Bất Thường (AI)'}
      </div>
      
      <div className="flex-grow flex flex-col items-center justify-center mt-8">
        <div className={`text-6xl md:text-7xl font-black font-mono tracking-tighter ${color} ${glow} transition-colors duration-500`}>
          {displayScore}
        </div>
        <div className="text-xs text-slate-500 mt-4 font-mono uppercase tracking-widest text-center">
          {score > 80 ? (lang === 'en' ? 'Critical Threat' : 'Mối Đe Dọa Nghiêm Trọng') : 
           score > 50 ? (lang === 'en' ? 'Suspicious Activity' : 'Hoạt Động Đáng Ngờ') : 
           (lang === 'en' ? 'Normal Baseline' : 'Mức Cơ Bản Bình Thường')}
        </div>
      </div>
    </div>
  );
}
