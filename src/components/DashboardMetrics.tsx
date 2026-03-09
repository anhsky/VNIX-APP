import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SystemState } from '../types';
import { Activity, ShieldAlert, ShieldCheck, Zap, Clock, Globe, Bot, HardDrive, MapPin, ActivitySquare } from 'lucide-react';

export function DashboardMetrics({ systemState }: { systemState: SystemState }) {
  const isDdos = systemState === 'DDOS';
  const isDetecting = systemState === 'DETECTING';

  const [metrics, setMetrics] = useState({
    incoming: 1.5, dropped: 0, blocked: 0, clean: 1.5, latency: 2, bots: 1.2,
    popTraffic: [0.5, 0.4, 0.2, 0.1, 0.15, 0.15]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        if (systemState === 'NORMAL') {
          return {
            incoming: 1.5 + Math.random() * 0.2,
            dropped: 0,
            blocked: 0,
            clean: 1.5 + Math.random() * 0.2,
            latency: 2 + Math.floor(Math.random() * 2),
            bots: 1.2 + Math.random() * 0.1,
            popTraffic: [0.5, 0.4, 0.2, 0.1, 0.15, 0.15].map(v => v + Math.random() * 0.05)
          };
        } else if (systemState === 'DETECTING') {
          return {
            incoming: 42 + Math.random() * 5,
            dropped: 0,
            blocked: 0,
            clean: 42 + Math.random() * 5,
            latency: 12 + Math.floor(Math.random() * 5),
            bots: 15 + Math.random() * 5,
            popTraffic: [14, 10, 7, 4, 4, 3].map(v => v + Math.random() * 1)
          };
        } else {
          return {
            incoming: 480 + Math.random() * 20,
            dropped: 310 + Math.random() * 10,
            blocked: 168.5 + Math.random() * 5,
            clean: 1.5 + Math.random() * 0.2,
            latency: 14 + Math.floor(Math.random() * 4),
            bots: 1800 + Math.random() * 100,
            popTraffic: [165, 112, 78, 48, 42, 35].map(v => v + Math.random() * 5)
          };
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [systemState]);

  const topCards = [
    { label: 'INCOMING', value: `${metrics.incoming.toFixed(1)} Gbps`, icon: Activity, color: isDdos ? 'text-rose-500' : isDetecting ? 'text-orange-500' : 'text-emerald-500' },
    { label: 'XDP DROPPED', value: `${metrics.dropped.toFixed(1)} Gbps`, icon: Zap, color: isDdos ? 'text-yellow-500' : 'text-slate-500' },
    { label: 'L3-L7 BLOCKED', value: `${metrics.blocked.toFixed(1)} Gbps`, icon: ShieldAlert, color: isDdos ? 'text-rose-500' : 'text-slate-500' },
    { label: 'CLEAN→SERVER', value: `${metrics.clean.toFixed(1)} Gbps`, icon: ShieldCheck, color: 'text-emerald-500' },
    { label: 'LATENCY', value: `${metrics.latency}ms`, icon: Clock, color: isDdos ? 'text-orange-500' : 'text-emerald-500' },
    { label: 'VN ANYCAST', value: '6 PoPs', icon: Globe, color: 'text-blue-500' },
    { label: 'BOTS', value: isDdos ? `~${(metrics.bots / 1000).toFixed(1)}M` : `~${metrics.bots.toFixed(1)}K`, icon: Bot, color: isDdos ? 'text-rose-500' : 'text-slate-500' },
    { label: 'CAPACITY', value: '8 Tbps', icon: HardDrive, color: 'text-slate-300' },
  ];

  const pops = [
    { city: 'Hồ Chí Minh City', region: 'SOUTH', dc: 'Quận 7, Phú Mỹ Hưng DC', ix: 'VNIX South • AS131429 • Viettel IX', traffic: `${metrics.popTraffic[0].toFixed(1)} Gbps`, rtt: isDdos ? '3ms' : '2ms', status: isDdos ? 'SCRUBBING' : isDetecting ? 'ABSORBING' : 'OK' },
    { city: 'Hà Nội', region: 'NORTH', dc: 'Cầu Giấy, Hòa Lạc DC', ix: 'VNIX North • AS45903 • CMC IX', traffic: `${metrics.popTraffic[1].toFixed(1)} Gbps`, rtt: isDdos ? '32ms' : '28ms', status: isDdos ? 'SCRUBBING' : isDetecting ? 'ABSORBING' : 'OK' },
    { city: 'Đà Nẵng', region: 'CENTRAL', dc: 'Hải Châu, VNPT DC', ix: 'VNIX Central • AS7643 • FPT IX', traffic: `${metrics.popTraffic[2].toFixed(1)} Gbps`, rtt: isDdos ? '16ms' : '15ms', status: isDdos ? 'SCRUBBING' : isDetecting ? 'ABSORBING' : 'OK' },
    { city: 'Huế', region: 'CENTRAL', dc: 'Phú Hội, Edge PoP', ix: 'VNIX Edge • Peering via Đà Nẵng IX', traffic: `${metrics.popTraffic[3].toFixed(1)} Gbps`, rtt: isDdos ? '18ms' : '17ms', status: isDdos ? 'SCRUBBING' : isDetecting ? 'ABSORBING' : 'OK' },
    { city: 'Cần Thơ', region: 'MEKONG', dc: 'Ninh Kiều, Viettel Edge', ix: 'VNIX South Edge • Transit via HCM', traffic: `${metrics.popTraffic[4].toFixed(1)} Gbps`, rtt: isDdos ? '8ms' : '7ms', status: isDdos ? 'SCRUBBING' : isDetecting ? 'ABSORBING' : 'OK' },
    { city: 'Hải Phòng', region: 'NORTH', dc: 'Ngô Quyền, Submarine Cable PoP', ix: 'AAG/APG/AAE-1 Landing • Intl Transit', traffic: `${metrics.popTraffic[5].toFixed(1)} Gbps`, rtt: isDdos ? '34ms' : '32ms', status: isDdos ? 'SCRUBBING' : isDetecting ? 'ABSORBING' : 'OK' },
  ];

  const getStatusTextColor = (status: string) => {
    if (status === 'SCRUBBING') return 'text-emerald-400';
    if (status === 'ABSORBING') return 'text-orange-400';
    return 'text-emerald-500';
  };

  return (
    <div className="space-y-8">
      {/* Top Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {topCards.map((card, idx) => (
          <motion.div 
            key={idx}
            layout
            className="glass-panel rounded-xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-slate-600 transition-colors"
          >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-transparent to-${card.color.split('-')[1]}-500`}></div>
            <card.icon className={`w-6 h-6 mb-2 ${card.color} drop-shadow-[0_0_8px_currentColor]`} />
            <motion.div 
              key={card.value}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-xl font-bold ${card.color} drop-shadow-[0_0_2px_currentColor]`}
            >
              {card.value}
            </motion.div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">{card.label}</div>
          </motion.div>
        ))}
      </div>

      {/* ANYCAST POPS */}
      <div>
        <div className="flex items-center gap-2 mb-4 text-xs font-bold tracking-widest text-slate-400 uppercase">
          <span className="w-2 h-2 bg-slate-600 rounded-full shadow-[0_0_5px_#475569]"></span>
          Anycast PoPs — Vietnam Network
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {pops.map((pop, idx) => (
            <motion.div 
              key={idx}
              className={`glass-panel rounded-xl p-4 flex flex-col relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${
                pop.status === 'SCRUBBING' ? 'border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.15)]' :
                pop.status === 'ABSORBING' ? 'border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.15)]' :
                'border-slate-700/50 hover:border-emerald-500/30'
              }`}
            >
              {/* Top accent line */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${
                pop.status === 'SCRUBBING' ? 'bg-rose-500 shadow-[0_0_10px_#f43f5e]' :
                pop.status === 'ABSORBING' ? 'bg-orange-500 shadow-[0_0_10px_#f97316]' :
                'bg-emerald-500 shadow-[0_0_10px_#10b981]'
              }`}></div>

              {/* Background glow */}
              <div className={`absolute -bottom-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-20 pointer-events-none ${
                pop.status === 'SCRUBBING' ? 'bg-rose-500' :
                pop.status === 'ABSORBING' ? 'bg-orange-500' :
                'bg-emerald-500'
              }`}></div>

              <div className="flex items-center gap-2 mb-2 mt-1 relative z-10">
                <MapPin className="w-4 h-4 text-slate-400" />
                <h3 className="font-bold text-slate-200">{pop.city}</h3>
              </div>
              <div className="text-[10px] text-slate-400 mb-1 uppercase tracking-wider relative z-10">{pop.region} — {pop.dc}</div>
              <div className="text-[10px] text-indigo-400 mb-4 relative z-10">{pop.ix}</div>
              
              <div className="mt-auto grid grid-cols-3 gap-2 items-end relative z-10">
                <div>
                  <motion.div key={pop.traffic} initial={{opacity:0}} animate={{opacity:1}} className={`text-sm font-bold ${pop.status === 'SCRUBBING' ? 'text-rose-500 drop-shadow-[0_0_2px_#f43f5e]' : pop.status === 'ABSORBING' ? 'text-orange-500 drop-shadow-[0_0_2px_#f97316]' : 'text-emerald-500 drop-shadow-[0_0_2px_#10b981]'}`}>{pop.traffic}</motion.div>
                  <div className="text-[9px] text-slate-500 uppercase">Traffic</div>
                </div>
                <div>
                  <motion.div key={pop.rtt} initial={{opacity:0}} animate={{opacity:1}} className="text-sm font-bold text-slate-300">{pop.rtt}</motion.div>
                  <div className="text-[9px] text-slate-500 uppercase">RTT</div>
                </div>
                <div>
                  <motion.div key={pop.status} initial={{opacity:0}} animate={{opacity:1}} className={`text-xs font-bold ${getStatusTextColor(pop.status)} drop-shadow-[0_0_2px_currentColor]`}>{pop.status}</motion.div>
                  <div className="text-[9px] text-slate-500 uppercase">Status</div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-slate-800/50 rounded-full mt-3 overflow-hidden relative z-10 border border-slate-700/50">
                <motion.div 
                  className={`h-full ${pop.status === 'SCRUBBING' ? 'bg-rose-500 shadow-[0_0_5px_#f43f5e]' : pop.status === 'ABSORBING' ? 'bg-orange-500 shadow-[0_0_5px_#f97316]' : 'bg-emerald-500 shadow-[0_0_5px_#10b981]'}`}
                  initial={{ width: 0 }}
                  animate={{ width: pop.status === 'SCRUBBING' ? '80%' : pop.status === 'ABSORBING' ? '40%' : '10%' }}
                  transition={{ duration: 1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Peering & Transit */}
      <div className="glass-panel rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex items-center gap-2 mb-4 relative z-10">
          <ActivitySquare className="w-5 h-5 text-indigo-400 drop-shadow-[0_0_5px_#818cf8]" />
          <h3 className="font-bold text-slate-200">Vietnam Peering & Transit</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs text-slate-400 leading-relaxed relative z-10">
          <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-800/50 hover:border-indigo-500/30 transition-colors">
            <strong className="text-slate-200 block mb-2 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>VNIX</strong>
            Vietnam Internet Exchange, peering between <span className="text-purple-400 bg-purple-400/10 px-1 rounded border border-purple-400/20">Viettel</span> <span className="text-purple-400 bg-purple-400/10 px-1 rounded border border-purple-400/20">VNPT</span> <span className="text-purple-400 bg-purple-400/10 px-1 rounded border border-purple-400/20">FPT</span> <span className="text-purple-400 bg-purple-400/10 px-1 rounded border border-purple-400/20">CMC</span>. Anycast IP announced to all members.
          </div>
          <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-800/50 hover:border-indigo-500/30 transition-colors">
            <strong className="text-slate-200 block mb-2 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>Submarine Cables</strong>
            Hải Phòng PoP sits on <span className="text-indigo-400 bg-indigo-400/10 px-1 rounded border border-indigo-400/20">AAG</span> <span className="text-indigo-400 bg-indigo-400/10 px-1 rounded border border-indigo-400/20">APG</span> <span className="text-indigo-400 bg-indigo-400/10 px-1 rounded border border-indigo-400/20">AAE-1</span> landing station. International attack traffic filtered before entering VN backbone.
          </div>
          <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-800/50 hover:border-indigo-500/30 transition-colors">
            <strong className="text-slate-200 block mb-2 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>BGP Communities</strong>
            Each PoP uses BGP communities to signal scrubbing center activation: <span className="text-rose-400 font-mono bg-rose-400/10 px-1 rounded">131429:666</span> = blackhole, <span className="text-purple-400 font-mono bg-purple-400/10 px-1 rounded">131429:800</span> = scrub mode.
          </div>
          <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-800/50 hover:border-indigo-500/30 transition-colors">
            <strong className="text-slate-200 block mb-2 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>Anycast IP</strong>
            Same IP <span className="text-blue-400 font-mono bg-blue-400/10 px-1 rounded">103.xx.xx.1/24</span> announced from all 6 PoPs. Users auto-route to nearest via BGP shortest AS-path.
          </div>
        </div>
      </div>
    </div>
  );
}
