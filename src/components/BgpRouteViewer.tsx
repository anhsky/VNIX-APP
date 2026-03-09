import React, { useState, useEffect } from 'react';
import { Network, Share2, Activity, Globe, ChevronRight } from 'lucide-react';

export function BgpRouteViewer() {
  const [routes, setRoutes] = useState([
    { as: 'AS13335', path: '172.67.x.x', latency: '12ms', status: 'STABLE', region: 'US-WEST' },
    { as: 'AS15169', path: '8.8.8.8', latency: '8ms', status: 'STABLE', region: 'GLOBAL' },
    { as: 'AS20473', path: '1.1.1.1', latency: '15ms', status: 'STABLE', region: 'EU-CENTRAL' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoutes(prev => prev.map(r => ({
        ...r,
        latency: `${Math.floor(Math.random() * 20) + 5}ms`
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2">
          <Share2 className="w-4 h-4 text-indigo-400" />
          BGP Anycast Route Propagation
        </h3>
        <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase">
          <Activity className="w-3 h-3" />
          Real-time Feed
        </div>
      </div>

      <div className="space-y-3">
        {routes.map((route, i) => (
          <div key={i} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between group hover:border-indigo-500/30 transition-all">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold uppercase mb-1">Autonomous System</span>
                <span className="text-sm font-mono font-bold text-slate-200">{route.as}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold uppercase mb-1">Anycast IP</span>
                <span className="text-sm font-mono text-slate-400">{route.path}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold uppercase mb-1">Region</span>
                <span className="text-xs text-slate-400">{route.region}</span>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Latency</div>
                <div className="text-sm font-mono font-bold text-emerald-400">{route.latency}</div>
              </div>
              <div className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded text-[9px] font-black text-emerald-400">
                {route.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
