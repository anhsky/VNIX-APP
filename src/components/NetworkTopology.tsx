import React from 'react';
import { Network, Server, Globe, ShieldCheck } from 'lucide-react';

export function NetworkTopology() {
  return (
    <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2">
          <Network className="w-4 h-4 text-indigo-400" />
          Infrastructure Topology
        </h3>
      </div>

      <div className="relative flex flex-col items-center gap-12 py-4">
        {/* Global Layer */}
        <div className="flex flex-col items-center gap-2">
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-full">
            <Globe className="w-6 h-6 text-indigo-400" />
          </div>
          <span className="text-[10px] text-slate-500 font-bold uppercase">Public Internet</span>
        </div>

        {/* Connection Line */}
        <div className="absolute top-16 bottom-16 w-px bg-gradient-to-b from-indigo-500/50 via-emerald-500/50 to-indigo-500/50" />

        {/* Scrubbing Layer */}
        <div className="flex items-center gap-12 relative">
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="text-[10px] text-slate-500 font-bold uppercase">VNIX Scrubbing</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="text-[10px] text-slate-500 font-bold uppercase">Anycast Edge</span>
          </div>
        </div>

        {/* Origin Layer */}
        <div className="flex flex-col items-center gap-2">
          <div className="p-3 bg-slate-800 border border-slate-700 rounded-xl">
            <Server className="w-6 h-6 text-slate-400" />
          </div>
          <span className="text-[10px] text-slate-500 font-bold uppercase">Customer Origin</span>
        </div>
      </div>
    </div>
  );
}
