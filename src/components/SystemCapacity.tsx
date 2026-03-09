import React, { useState, useEffect } from 'react';
import { Cpu, HardDrive, Activity } from 'lucide-react';
import { SystemState } from '../types';

const Gauge = ({ value, label, icon: Icon, color }: any) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const colorMap: Record<string, string> = {
    emerald: 'stroke-emerald-500 text-emerald-400 drop-shadow-[0_0_5px_#10b981]',
    orange: 'stroke-orange-500 text-orange-400 drop-shadow-[0_0_5px_#f97316]',
    rose: 'stroke-rose-500 text-rose-400 drop-shadow-[0_0_5px_#f43f5e]'
  };

  return (
    <div className="flex flex-col items-center gap-2 group">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle cx="48" cy="48" r={radius} className="stroke-slate-800/50" strokeWidth="6" fill="none" />
          <circle
            cx="48" cy="48" r={radius}
            className={`${colorMap[color].split(' ')[0]} transition-all duration-1000 ease-out`}
            strokeWidth="6" fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 4px ${colorMap[color].split(' ')[0].replace('stroke-', '')})` }}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <Icon className={`w-4 h-4 ${colorMap[color].split(' ').slice(1).join(' ')} mb-1 group-hover:scale-110 transition-transform`} />
          <span className="text-sm font-bold text-slate-200 drop-shadow-[0_0_2px_currentColor]">{Math.round(value)}%</span>
        </div>
      </div>
      <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase group-hover:text-slate-300 transition-colors">{label}</span>
    </div>
  );
};

export function SystemCapacity({ systemState }: { systemState: SystemState }) {
  const [metrics, setMetrics] = useState({ cpu: 15, ram: 32, net: 5 });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        const target = systemState === 'DDOS' ? { cpu: 92, ram: 88, net: 95 }
                     : systemState === 'DETECTING' ? { cpu: 45, ram: 55, net: 30 }
                     : { cpu: 15, ram: 32, net: 5 };

        return {
          cpu: Math.min(100, Math.max(0, target.cpu + (Math.random() * 6 - 3))),
          ram: Math.min(100, Math.max(0, target.ram + (Math.random() * 4 - 2))),
          net: Math.min(100, Math.max(0, target.net + (Math.random() * 8 - 4))),
        };
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [systemState]);

  return (
    <div className="glass-panel rounded-xl p-4 h-[300px] flex flex-col relative overflow-hidden">
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="flex items-center gap-2 mb-6 text-xs font-bold tracking-widest text-slate-400 uppercase relative z-10">
        <Activity className="w-4 h-4 text-emerald-400 drop-shadow-[0_0_5px_#34d399]" />
        Scrubbing Center Load
      </div>
      <div className="flex-grow flex items-center justify-around relative z-10">
        <Gauge value={metrics.cpu} label="CPU Cores" icon={Cpu} color={metrics.cpu > 80 ? 'rose' : metrics.cpu > 40 ? 'orange' : 'emerald'} />
        <Gauge value={metrics.ram} label="Memory" icon={HardDrive} color={metrics.ram > 80 ? 'rose' : metrics.ram > 40 ? 'orange' : 'emerald'} />
        <Gauge value={metrics.net} label="Filter Cap" icon={Activity} color={metrics.net > 80 ? 'rose' : metrics.net > 40 ? 'orange' : 'emerald'} />
      </div>
    </div>
  );
}
