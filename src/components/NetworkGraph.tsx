import React from 'react';
import { motion } from 'motion/react';
import { SystemState, TargetInfo } from '../types';
import { Globe, Server, Users, Shield, Zap, AlertTriangle, Lock } from 'lucide-react';

export function NetworkGraph({ systemState, targetInfo }: { systemState: SystemState, targetInfo: TargetInfo | null }) {
  const isDdos = systemState === 'DDOS';
  const isDetecting = systemState === 'DETECTING';

  return (
    <div className="w-full h-[400px] md:h-[500px] glass-panel rounded-xl border border-slate-700/50 relative overflow-hidden flex items-center justify-center">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Status Banner */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 w-[90%] md:w-auto text-center">
        <motion.div 
          key={systemState}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`px-4 py-2 rounded-full border text-[10px] md:text-xs font-bold tracking-wider inline-flex items-center justify-center gap-2 backdrop-blur-md ${
            isDdos ? 'bg-rose-500/20 border-rose-500/50 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.3)]' :
            isDetecting ? 'bg-orange-500/20 border-orange-500/50 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.3)]' :
            'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
          }`}
        >
          <span className={`w-2 h-2 rounded-full flex-shrink-0 shadow-[0_0_5px_currentColor] ${isDdos ? 'bg-rose-500 animate-pulse' : isDetecting ? 'bg-orange-500 animate-pulse' : 'bg-emerald-500'}`}></span>
          {isDdos ? '⚠ 480 Gbps DDoS — Anycast splits across 6 VN PoPs, XDP drops 310 Gbps' :
           isDetecting ? '⚠ Anomaly detected — 42 Gbps spike across VNIX, international cable traffic suspicious' :
           'All systems nominal — Anycast routing active across 6 Vietnam PoPs'}
        </motion.div>
      </div>

      {/* Legend */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 flex flex-wrap justify-center gap-3 md:gap-4 text-[9px] md:text-[10px] text-slate-400 font-medium bg-slate-900/50 px-4 py-1.5 rounded-full border border-slate-700/50 backdrop-blur-sm">
        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]"></span> Clean</div>
        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_5px_#f43f5e]"></span> DDoS</div>
        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_5px_#06b6d4]"></span> Scrubbed</div>
        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_5px_#f97316]"></span> Suspicious</div>
      </div>

      {/* Graph Container */}
      <div className="relative w-full max-w-5xl h-full flex items-center justify-between px-4 md:px-16 z-10">
        
        {/* Left Column: Sources */}
        <div className="flex flex-col justify-around h-full py-12 md:py-24">
          <Node icon={AlertTriangle} label="BOTNET" color={isDdos ? 'rose' : 'slate'} active={isDdos} />
          <Node icon={Users} label="USERS" color="emerald" active={true} />
        </div>

        {/* Middle Left: VNIX */}
        <div className="flex flex-col justify-center h-full">
          <Node icon={Globe} label="VNIX" color="blue" active={true} />
        </div>

        {/* Middle: PoPs (Grouped) */}
        <div className="flex flex-col justify-around h-3/4 border border-slate-700/50 rounded-xl p-2 md:p-4 bg-slate-900/40 relative backdrop-blur-sm shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[8px] md:text-[9px] text-slate-400 bg-[#0B101A] px-3 py-0.5 rounded-full border border-slate-700/50 tracking-widest whitespace-nowrap shadow-[0_0_10px_rgba(0,0,0,0.5)]">ANYCAST NETWORK</div>
          <Node icon={Server} label="HCM" color={isDdos ? 'rose' : isDetecting ? 'orange' : 'emerald'} size="sm" />
          <Node icon={Server} label="HN" color={isDdos ? 'rose' : isDetecting ? 'orange' : 'emerald'} size="sm" />
          <Node icon={Server} label="DN" color={isDdos ? 'rose' : isDetecting ? 'orange' : 'emerald'} size="sm" />
        </div>

        {/* Middle Right: Scrubbing Center */}
        <div className="flex flex-col justify-center h-1/2 md:h-2/3 border border-slate-700/50 rounded-xl p-2 md:p-4 bg-slate-900/40 relative backdrop-blur-sm shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[8px] md:text-[9px] text-slate-400 bg-[#0B101A] px-3 py-0.5 rounded-full border border-slate-700/50 tracking-widest whitespace-nowrap shadow-[0_0_10px_rgba(0,0,0,0.5)]">SCRUBBING CENTER</div>
          <div className="flex flex-col gap-6">
            <Node icon={Zap} label="XDP/eBPF" color={isDdos ? 'yellow' : 'emerald'} size="sm" />
            <Node icon={Shield} label="DPI/ML" color={isDdos ? 'purple' : 'emerald'} size="sm" />
          </div>
        </div>

        {/* Right: Destination */}
        <div className="flex flex-col justify-center h-full">
          <Node icon={Lock} label={targetInfo ? targetInfo.ip : "SERVER"} color="emerald" active={true} />
        </div>

        {/* SVG Lines & Particles */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Botnet to VNIX */}
          <Connection start={[10, 25]} end={[30, 50]} active={isDdos} color="rose" systemState={systemState} />
          {/* Users to VNIX */}
          <Connection start={[10, 75]} end={[30, 50]} active={true} color="emerald" systemState={systemState} />
          
          {/* VNIX to PoPs */}
          <Connection start={[30, 50]} end={[50, 25]} active={true} color={isDdos ? 'rose' : isDetecting ? 'orange' : 'emerald'} systemState={systemState} />
          <Connection start={[30, 50]} end={[50, 50]} active={true} color={isDdos ? 'rose' : isDetecting ? 'orange' : 'emerald'} systemState={systemState} />
          <Connection start={[30, 50]} end={[50, 75]} active={true} color={isDdos ? 'rose' : isDetecting ? 'orange' : 'emerald'} systemState={systemState} />

          {/* PoPs to Scrubbing */}
          <Connection start={[50, 25]} end={[70, 40]} active={true} color={isDdos ? 'rose' : isDetecting ? 'orange' : 'emerald'} systemState={systemState} />
          <Connection start={[50, 50]} end={[70, 40]} active={true} color={isDdos ? 'rose' : isDetecting ? 'orange' : 'emerald'} systemState={systemState} />
          <Connection start={[50, 75]} end={[70, 60]} active={true} color={isDdos ? 'rose' : isDetecting ? 'orange' : 'emerald'} systemState={systemState} />

          {/* Scrubbing to Server */}
          <Connection start={[70, 40]} end={[90, 50]} active={true} color="cyan" systemState={systemState} />
          <Connection start={[70, 60]} end={[90, 50]} active={true} color="cyan" systemState={systemState} />
        </svg>

      </div>
    </div>
  );
}

function Node({ icon: Icon, label, color, active = false, size = 'md' }: any) {
  const colorClasses = {
    rose: 'text-rose-400 border-rose-500/50 bg-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.3)]',
    emerald: 'text-emerald-400 border-emerald-500/50 bg-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.3)]',
    orange: 'text-orange-400 border-orange-500/50 bg-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.3)]',
    blue: 'text-blue-400 border-blue-500/50 bg-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.3)]',
    yellow: 'text-yellow-400 border-yellow-500/50 bg-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.3)]',
    purple: 'text-purple-400 border-purple-500/50 bg-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.3)]',
    cyan: 'text-cyan-400 border-cyan-500/50 bg-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.3)]',
    slate: 'text-slate-400 border-slate-700/50 bg-slate-800/50 shadow-[0_0_10px_rgba(148,163,184,0.1)]',
  };

  const sizeClasses = {
    sm: 'w-8 h-8 md:w-10 md:h-10',
    md: 'w-10 h-10 md:w-14 md:h-14',
  };

  return (
    <div className="flex flex-col items-center gap-1 md:gap-2 z-10 group">
      <div className={`rounded-xl border flex items-center justify-center transition-all duration-500 backdrop-blur-md group-hover:scale-110 ${colorClasses[color as keyof typeof colorClasses]} ${sizeClasses[size as keyof typeof sizeClasses]}`}>
        <Icon className={`${size === 'sm' ? 'w-4 h-4 md:w-5 md:h-5' : 'w-5 h-5 md:w-7 md:h-7'} drop-shadow-[0_0_5px_currentColor]`} />
      </div>
      <div className="text-[8px] md:text-[9px] font-bold tracking-widest text-slate-400 group-hover:text-slate-300 transition-colors drop-shadow-[0_0_2px_currentColor]">{label}</div>
    </div>
  );
}

function Connection({ start, end, active, color, systemState }: { start: [number, number], end: [number, number], active: boolean, color: string, systemState: SystemState }) {
  const colorMap = {
    rose: '#f43f5e',
    emerald: '#10b981',
    orange: '#f97316',
    cyan: '#06b6d4',
  };
  
  const strokeColor = colorMap[color as keyof typeof colorMap] || '#334155';

  if (!active) return null;

  const speedClass = systemState === 'DDOS' ? 'animate-dash-fast' : systemState === 'DETECTING' ? 'animate-dash-med' : 'animate-dash-slow';

  return (
    <line 
      x1={`${start[0]}%`} y1={`${start[1]}%`} 
      x2={`${end[0]}%`} y2={`${end[1]}%`} 
      stroke={strokeColor} 
      strokeWidth="2" 
      strokeOpacity="0.8"
      strokeDasharray="4 8"
      className={speedClass}
      filter="url(#glow)"
    />
  );
}
