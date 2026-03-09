import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { SystemState, TargetInfo } from '../types';
import { Globe, Server, Users, Shield, Zap, AlertTriangle, Lock, Activity, Cpu, HardDrive, Network, Database } from 'lucide-react';

export function NetworkGraph({ systemState, targetInfo }: { systemState: SystemState, targetInfo: TargetInfo | null }) {
  const isDdos = systemState === 'DDOS';
  const isDetecting = systemState === 'DETECTING';

  // Generate random particles for the connections
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => {
        // Keep only recent particles, add new ones
        const newParticles = prev.filter(p => p.progress < 100).map(p => ({
          ...p,
          progress: p.progress + (isDdos ? 3 : isDetecting ? 2 : 1)
        }));
        
        // Add new particle
        if (Math.random() > (isDdos ? 0.2 : 0.5)) {
          newParticles.push({
            id: Math.random().toString(),
            pathId: Math.floor(Math.random() * 14), // 14 main paths
            progress: 0,
            type: isDdos && Math.random() > 0.3 ? 'malicious' : 'clean'
          });
        }
        return newParticles;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isDdos, isDetecting]);

  return (
    <div className="w-full h-[600px] md:h-[800px] bg-[#0a0e17] rounded-xl border border-slate-800 relative overflow-hidden flex flex-col">
      
      {/* Top Legend */}
      <div className="flex justify-center gap-4 py-3 bg-slate-900/50 border-b border-slate-800 z-20 text-[10px] font-mono">
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-emerald-500"></span> <span className="text-slate-400">Sạch</span></div>
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-rose-500"></span> <span className="text-slate-400">DDoS</span></div>
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-yellow-500"></span> <span className="text-slate-400">XDP</span></div>
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-orange-500"></span> <span className="text-slate-400">Đang lọc</span></div>
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-cyan-500"></span> <span className="text-slate-400">GRE</span></div>
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-blue-500"></span> <span className="text-slate-400">Public IP</span></div>
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-purple-500"></span> <span className="text-slate-400">P2P</span></div>
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-indigo-500"></span> <span className="text-slate-400">MC Proxy</span></div>
      </div>

      {/* Main Graph Area */}
      <div className="flex-1 relative w-full flex items-center justify-between px-4 md:px-12 z-10">
        
        {/* Layer 1: Source */}
        <div className="flex flex-col justify-center h-full w-[10%]">
          <Node icon={Users} label="NGƯỜI CHƠI" color="slate" />
        </div>

        {/* Layer 2: Entry Point */}
        <div className="flex flex-col justify-center h-full w-[10%]">
          <Node icon={Globe} label="VNIX" color="blue" active={true} />
        </div>

        {/* Layer 3 & 4: PoPs (Grouped by Region/ISP) */}
        <div className="flex flex-col justify-around h-[80%] w-[30%] relative">
          {/* Column Headers */}
          <div className="absolute -top-6 left-[15%] text-[10px] text-slate-500 font-mono tracking-widest">HCM</div>
          <div className="absolute -top-6 left-[45%] text-[10px] text-slate-500 font-mono tracking-widest">HÀ NỘI</div>
          <div className="absolute -top-6 left-[75%] text-[10px] text-slate-500 font-mono tracking-widest">ĐÀ NẴNG</div>
          
          {/* Row 1: Viettel */}
          <div className="flex justify-between w-full">
            <Node icon={Server} label="HCM VI" color="rose" badge="x2" />
            <Node icon={Server} label="HN VI" color="rose" badge="x2" />
            <Node icon={Server} label="DN VI" color="rose" badge="x2" />
          </div>
          {/* Row 2: VNPT */}
          <div className="flex justify-between w-full">
            <Node icon={Server} label="HCM VN" color="blue" badge="x2" />
            <Node icon={Server} label="HN VN" color="blue" badge="x2" />
            <Node icon={Server} label="DN VN" color="blue" badge="x2" />
          </div>
          {/* Row 3: FPT */}
          <div className="flex justify-between w-full">
            <Node icon={Server} label="HCM FP" color="orange" badge="x2" />
            <Node icon={Server} label="HN FP" color="orange" badge="x2" />
            <Node icon={Server} label="DN FP" color="orange" badge="x2" />
          </div>
          {/* Row 4: Mobi */}
          <div className="flex justify-between w-full">
            <Node icon={Server} label="HCM MO" color="emerald" badge="x2" />
            <Node icon={Server} label="HN MO" color="emerald" badge="x2" />
            <Node icon={Server} label="DN MO" color="emerald" badge="x2" />
          </div>
          {/* Row 5: CMC */}
          <div className="flex justify-between w-full">
            <Node icon={Server} label="HCM CM" color="purple" badge="x2" />
            <Node icon={Server} label="HN CM" color="purple" badge="x2" />
            <Node icon={Server} label="DN CM" color="purple" badge="x2" />
          </div>
        </div>

        {/* Layer 5: Proxy */}
        <div className="flex flex-col justify-center h-full w-[15%] items-center">
          <Node icon={Network} label="MC PROXY" color="emerald" />
        </div>

        {/* Layer 6: Tunnels/IPs */}
        <div className="flex flex-col justify-around h-[60%] w-[15%] items-center border border-slate-800/50 rounded-xl bg-slate-900/20 relative p-4">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] text-slate-500 bg-[#0a0e17] px-2 tracking-widest">BACKEND</div>
          <Node icon={Globe} label="PUBLIC IP" color="cyan" />
          <Node icon={Lock} label="GRE TUNNEL" color="purple" />
          <Node icon={Network} label="P2P MESH" color="rose" />
        </div>

        {/* Layer 7: Destination */}
        <div className="flex flex-col justify-center h-full w-[10%] items-end">
          <Node icon={Database} label="BACKEND" color="emerald" />
        </div>

        {/* SVG Lines */}
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
          
          {/* Users to VNIX */}
          <Connection start={[5, 50]} end={[15, 50]} active={true} color="emerald" thickness={4} />
          
          {/* VNIX to PoPs (Fan out) */}
          <Connection start={[15, 50]} end={[30, 15]} active={true} color="slate" opacity={0.3} />
          <Connection start={[15, 50]} end={[30, 32]} active={true} color="slate" opacity={0.3} />
          <Connection start={[15, 50]} end={[30, 50]} active={true} color="slate" opacity={0.3} />
          <Connection start={[15, 50]} end={[30, 68]} active={true} color="slate" opacity={0.3} />
          <Connection start={[15, 50]} end={[30, 85]} active={true} color="slate" opacity={0.3} />

          {/* PoPs Horizontal Connections */}
          <Connection start={[30, 15]} end={[45, 15]} active={true} color="slate" opacity={0.2} />
          <Connection start={[45, 15]} end={[60, 15]} active={true} color="slate" opacity={0.2} />
          
          <Connection start={[30, 32]} end={[45, 32]} active={true} color="slate" opacity={0.2} />
          <Connection start={[45, 32]} end={[60, 32]} active={true} color="slate" opacity={0.2} />
          
          <Connection start={[30, 50]} end={[45, 50]} active={true} color="slate" opacity={0.2} />
          <Connection start={[45, 50]} end={[60, 50]} active={true} color="slate" opacity={0.2} />
          
          <Connection start={[30, 68]} end={[45, 68]} active={true} color="slate" opacity={0.2} />
          <Connection start={[45, 68]} end={[60, 68]} active={true} color="slate" opacity={0.2} />
          
          <Connection start={[30, 85]} end={[45, 85]} active={true} color="slate" opacity={0.2} />
          <Connection start={[45, 85]} end={[60, 85]} active={true} color="slate" opacity={0.2} />

          {/* PoPs to Proxy (Fan in) */}
          <Connection start={[60, 15]} end={[75, 50]} active={true} color="slate" opacity={0.3} />
          <Connection start={[60, 32]} end={[75, 50]} active={true} color="slate" opacity={0.3} />
          <Connection start={[60, 50]} end={[75, 50]} active={true} color="slate" opacity={0.3} />
          <Connection start={[60, 68]} end={[75, 50]} active={true} color="slate" opacity={0.3} />
          <Connection start={[60, 85]} end={[75, 50]} active={true} color="slate" opacity={0.3} />

          {/* Proxy to Tunnels */}
          <Connection start={[75, 50]} end={[85, 25]} active={true} color="cyan" opacity={0.5} dasharray="4 4" />
          <Connection start={[75, 50]} end={[85, 50]} active={true} color="purple" opacity={0.5} dasharray="4 4" />
          <Connection start={[75, 50]} end={[85, 75]} active={true} color="rose" opacity={0.5} dasharray="4 4" />

          {/* Tunnels to Backend */}
          <Connection start={[85, 25]} end={[95, 50]} active={true} color="emerald" opacity={0.5} />
          <Connection start={[85, 50]} end={[95, 50]} active={true} color="emerald" opacity={0.5} />
          <Connection start={[85, 75]} end={[95, 50]} active={true} color="emerald" opacity={0.5} />
          
          {/* Render Particles (Simulated traffic) */}
          {/* In a real app, these would be calculated along the SVG paths */}
        </svg>

      </div>

      {/* Bottom Stats Bar */}
      <div className="grid grid-cols-6 gap-px bg-slate-800 border-t border-slate-800">
        <StatBox icon={Activity} label="TỔNG VÀO" value={isDdos ? "480 Gbps" : "2.8 Gbps"} color="blue" />
        <StatBox icon={Zap} label="XDP CHẶN" value={isDdos ? "310 Gbps" : "0"} color="yellow" />
        <StatBox icon={Shield} label="L3-L7 CHẶN" value={isDdos ? "168 Gbps" : "0"} color="rose" />
        <StatBox icon={Globe} label="SẠCH->PROXY" value="2.8 Gbps" color="emerald" />
        <StatBox icon={Users} label="NGƯỜI CHƠI" value="14.2K" color="slate" />
        <StatBox icon={Server} label="MÁY CHỦ" value="40 PoP" color="slate" />
      </div>
    </div>
  );
}

function Node({ icon: Icon, label, color, active = false, badge }: any) {
  const colorClasses = {
    rose: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
    emerald: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    orange: 'text-orange-400 border-orange-500/30 bg-orange-500/10',
    blue: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    yellow: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
    purple: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    cyan: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    slate: 'text-slate-400 border-slate-700/50 bg-slate-800/30',
  };

  return (
    <div className="flex flex-col items-center gap-2 z-10 group relative">
      {badge && (
        <div className={`absolute -top-2 -right-2 text-[8px] font-bold px-1.5 py-0.5 rounded border ${colorClasses[color as keyof typeof colorClasses]}`}>
          {badge}
        </div>
      )}
      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg border flex items-center justify-center transition-all duration-500 backdrop-blur-md group-hover:scale-110 ${colorClasses[color as keyof typeof colorClasses]}`}>
        <Icon className="w-5 h-5 drop-shadow-[0_0_5px_currentColor]" />
      </div>
      <div className="text-[8px] md:text-[9px] font-mono tracking-widest text-slate-500 group-hover:text-slate-300 transition-colors uppercase">{label}</div>
    </div>
  );
}

function Connection({ start, end, active, color, opacity = 0.8, thickness = 1, dasharray }: any) {
  const colorMap = {
    rose: '#f43f5e',
    emerald: '#10b981',
    orange: '#f97316',
    cyan: '#06b6d4',
    blue: '#3b82f6',
    purple: '#a855f7',
    slate: '#475569',
  };
  
  const strokeColor = colorMap[color as keyof typeof colorMap] || '#334155';

  if (!active) return null;

  return (
    <line 
      x1={`${start[0]}%`} y1={`${start[1]}%`} 
      x2={`${end[0]}%`} y2={`${end[1]}%`} 
      stroke={strokeColor} 
      strokeWidth={thickness} 
      strokeOpacity={opacity}
      strokeDasharray={dasharray}
      filter="url(#glow)"
    />
  );
}

function StatBox({ icon: Icon, label, value, color }: any) {
  const colorClasses = {
    rose: 'text-rose-400',
    emerald: 'text-emerald-400',
    blue: 'text-blue-400',
    yellow: 'text-yellow-400',
    slate: 'text-slate-300',
  };

  return (
    <div className="bg-[#0a0e17] p-4 flex flex-col items-center justify-center gap-1">
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${colorClasses[color as keyof typeof colorClasses]}`} />
        <span className={`font-bold text-lg ${colorClasses[color as keyof typeof colorClasses]}`}>{value}</span>
      </div>
      <span className="text-[9px] font-mono text-slate-500 tracking-widest uppercase">{label}</span>
    </div>
  );
}
