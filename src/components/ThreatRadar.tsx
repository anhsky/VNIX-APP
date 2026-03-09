import React, { useState, useEffect } from 'react';
import { Radar } from 'lucide-react';
import { SystemState } from '../types';

export function ThreatRadar({ systemState, lang }: { systemState: SystemState, lang: 'en' | 'vi' }) {
  const [blips, setBlips] = useState<{ id: number, x: number, y: number, size: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const count = systemState === 'DDOS' ? 5 : systemState === 'DETECTING' ? 2 : 0.5;
      if (Math.random() < count) {
        setBlips(prev => {
          const newBlip = {
            id: Date.now() + Math.random(),
            x: Math.random() * 80 + 10, // 10% to 90%
            y: Math.random() * 80 + 10,
            size: Math.random() * 4 + 2,
          };
          return [...prev.slice(-15), newBlip]; // Keep max 15
        });
      }
    }, 300);
    return () => clearInterval(interval);
  }, [systemState]);

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-xl p-6 h-full flex flex-col items-center relative overflow-hidden">
      <div className="flex items-center gap-2 mb-4 w-full text-xs font-bold tracking-widest text-slate-500 uppercase">
        <Radar className="w-4 h-4 text-indigo-400" />
        {lang === 'en' ? 'Global Threat Radar' : 'Radar Mối Đe Dọa'}
      </div>
      
      <div className="flex-grow flex items-center justify-center w-full">
        <div className="relative w-48 h-48 rounded-full border border-indigo-500/30 bg-indigo-900/10 overflow-hidden flex items-center justify-center">
          {/* Grid lines */}
          <div className="absolute w-full h-full rounded-full border border-indigo-500/20 scale-50"></div>
          <div className="absolute w-full h-full rounded-full border border-indigo-500/20 scale-75"></div>
          <div className="absolute w-full h-[1px] bg-indigo-500/20"></div>
          <div className="absolute h-full w-[1px] bg-indigo-500/20"></div>
          
          {/* Sweep */}
          <div 
            className="absolute inset-0 rounded-full animate-spin-slow" 
            style={{ background: 'conic-gradient(from 0deg, transparent 70%, rgba(99, 102, 241, 0.1) 80%, rgba(99, 102, 241, 0.5) 100%)' }}
          ></div>
          
          {/* Blips */}
          {blips.map(blip => (
            <div 
              key={blip.id} 
              className="absolute rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)] animate-ping-short"
              style={{ left: `${blip.x}%`, top: `${blip.y}%`, width: blip.size, height: blip.size }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
