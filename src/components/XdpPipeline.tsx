import React from 'react';
import { motion } from 'motion/react';
import { SystemState } from '../types';
import { Cpu, Zap, Activity, ShieldCheck, Database, Search, ShieldAlert, BrainCircuit } from 'lucide-react';

export function XdpPipeline({ systemState }: { systemState: SystemState }) {
  const isDdos = systemState === 'DDOS';
  const isDetecting = systemState === 'DETECTING';

  const stages = [
    { stage: 'STAGE 0', title: 'NIC RX Queue', desc: 'Packet arrives at NIC (Mellanox CX-6) via VNIX peering', value: isDdos ? '480 Gbps' : isDetecting ? '42 Gbps' : '1.5 Gbps', icon: Database, color: 'text-slate-400', shadow: 'shadow-[0_0_5px_#94a3b8]' },
    { stage: 'STAGE 1', title: 'XDP_DROP', desc: 'eBPF runs on NIC driver. Drops known-bad BEFORE kernel. Zero-copy, zero CPU overhead', value: isDdos ? '310 Gbps' : isDetecting ? 'LOADING' : '0', icon: Zap, color: isDdos ? 'text-yellow-400' : 'text-emerald-400', shadow: isDdos ? 'shadow-[0_0_5px_#facc15]' : 'shadow-[0_0_5px_#34d399]' },
    { stage: 'STAGE 2', title: 'XDP_TX', desc: 'SYN cookie at NIC level. Reflect SYN-ACK without kernel state. 10M+ SYN/sec', value: isDdos ? '6.2M pps' : isDetecting ? 'STANDBY' : '0', icon: Activity, color: isDdos ? 'text-cyan-400' : 'text-slate-500', shadow: isDdos ? 'shadow-[0_0_5px_#22d3ee]' : '' },
    { stage: 'STAGE 3', title: 'XDP_PASS', desc: 'Surviving packets pass to kernel stack → AF_XDP socket for userspace DPI', value: isDdos ? '170 Gbps' : '-', icon: ShieldCheck, color: isDdos ? 'text-emerald-400' : 'text-slate-500', shadow: isDdos ? 'shadow-[0_0_5px_#34d399]' : '' },
    { stage: 'STAGE 4', title: 'Userspace DPI', desc: 'DPDK / AF_XDP zero-copy. L7 deep inspection, regex, ML inference on GPU', value: isDdos ? '1.5 Gbps' : '-', icon: Cpu, color: isDdos ? 'text-purple-400' : 'text-slate-500', shadow: isDdos ? 'shadow-[0_0_5px_#c084fc]' : '' },
  ];

  const layers = [
    { id: '01', title: 'Volumetric Filter', desc: 'ASIC hardware drops bulk floods — UDP amplification (DNS/NTP/memcached/SSDP), ICMP, IP fragments not caught by XDP.', status: isDdos ? 'DROPPING' : 'STANDBY', value: isDdos ? '160 Gbps' : '0', icon: ShieldAlert, color: 'text-rose-500', bg: 'bg-rose-500' },
    { id: '02', title: 'Protocol Validation', desc: 'TCP state machine, SYN proxy challenges, ACK/RST flood detection, malformed packet drop, connection tracking.', status: isDdos ? 'CHALLENGING' : 'STANDBY', value: isDdos ? '8.5 Gbps' : '0', icon: Search, color: 'text-yellow-500', bg: 'bg-yellow-500' },
    { id: '03', title: 'Deep Packet Inspection', desc: 'HTTP GET/POST flood, Slowloris, RUDY, API abuse, regex + ML signature matching on L7 payload.', status: isDdos ? 'FLAGGING' : 'STANDBY', value: isDdos ? '0.5 Gbps' : '0', icon: Database, color: 'text-cyan-500', bg: 'bg-cyan-500' },
    { id: '04', title: 'Behavior Analysis', desc: 'ML scoring — JA3/JA4 TLS fingerprint, request entropy, geo anomaly, browser automation markers. Score > 80 = bot.', status: isDdos ? 'BLOCKING' : 'SCANNING', value: isDdos ? '~1.8M Bots' : '0', icon: BrainCircuit, color: 'text-purple-500', bg: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-8">
      {/* XDP Pipeline */}
      <div>
        <div className="flex items-center gap-2 mb-4 text-xs font-bold tracking-widest text-slate-400 uppercase">
          <span className="w-2 h-2 bg-slate-600 rounded-full shadow-[0_0_5px_#475569]"></span>
          XDP (Express Data Path) — Kernel-Bypass Filtering
        </div>
        <div className="flex flex-col lg:flex-row gap-2">
          {stages.map((stage, idx) => (
            <React.Fragment key={idx}>
              <motion.div 
                className={`flex-1 glass-panel border ${isDdos && idx > 0 ? 'border-slate-600/50' : 'border-slate-700/30'} rounded-xl p-4 flex flex-col items-center text-center relative overflow-hidden group hover:-translate-y-1 transition-all duration-300`}
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-b from-transparent to-${stage.color.split('-')[1]}-500`}></div>
                <div className="text-[9px] text-slate-500 tracking-widest mb-3 relative z-10">{stage.stage}</div>
                <stage.icon className={`w-6 h-6 mb-3 ${stage.color} drop-shadow-[0_0_5px_currentColor] relative z-10`} />
                <h4 className="font-bold text-slate-200 text-sm mb-2 relative z-10">{stage.title}</h4>
                <p className="text-[10px] text-slate-400 leading-relaxed mb-4 flex-grow relative z-10">{stage.desc}</p>
                <motion.div 
                  key={stage.value}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-lg font-bold ${stage.color} drop-shadow-[0_0_2px_currentColor] relative z-10`}
                >
                  {stage.value}
                </motion.div>
              </motion.div>
              {idx < stages.length - 1 && (
                <div className="hidden lg:flex items-center justify-center text-slate-600">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_2px_currentColor]"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Scrubbing Layers */}
      <div>
        <div className="flex items-center gap-2 mb-4 text-xs font-bold tracking-widest text-slate-400 uppercase">
          <span className="w-2 h-2 bg-slate-600 rounded-full shadow-[0_0_5px_#475569]"></span>
          Scrubbing Layers (Post-XDP)
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {layers.map((layer, idx) => (
            <div key={idx} className="glass-panel border border-slate-700/50 rounded-xl p-5 relative overflow-hidden group hover:border-slate-500/50 transition-colors">
              <div className={`absolute top-0 left-0 w-1 h-full ${layer.bg} shadow-[0_0_10px_currentColor]`}></div>
              <div className={`absolute -bottom-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none ${layer.bg}`}></div>
              
              <div className="text-[9px] text-slate-500 tracking-widest mb-2 relative z-10">LAYER {layer.id}</div>
              <div className="flex items-center gap-2 mb-3 relative z-10">
                <layer.icon className={`w-4 h-4 ${layer.color} drop-shadow-[0_0_5px_currentColor]`} />
                <h4 className="font-bold text-slate-200 text-sm">{layer.title}</h4>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed mb-4 min-h-[60px] relative z-10">{layer.desc}</p>
              <div className="flex justify-between items-end relative z-10">
                <div>
                  <motion.div key={layer.value} initial={{opacity:0}} animate={{opacity:1}} className={`text-sm font-bold ${isDdos ? layer.color : 'text-slate-500'} drop-shadow-[0_0_2px_currentColor]`}>{layer.value}</motion.div>
                  <div className="text-[9px] text-slate-500 uppercase mt-1">Dropped</div>
                </div>
                <div className="text-right">
                  <motion.div key={layer.status} initial={{opacity:0}} animate={{opacity:1}} className={`text-[10px] font-bold tracking-wider ${isDdos ? layer.color : 'text-slate-500'} drop-shadow-[0_0_2px_currentColor]`}>{layer.status}</motion.div>
                  <div className="text-[9px] text-slate-500 uppercase mt-1">Status</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
