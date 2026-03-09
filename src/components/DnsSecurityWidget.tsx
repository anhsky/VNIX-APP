import React from 'react';
import { Shield, Lock, Globe, Zap, CheckCircle2 } from 'lucide-react';

export function DnsSecurityWidget() {
  return (
    <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest">
          <Shield className="w-4 h-4" />
          DNS Protection Status
        </div>
        <div className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded text-[10px] font-bold">
          ACTIVE
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-lg space-y-2">
          <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase">
            <Lock className="w-3 h-3" /> DNSSEC
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="text-xs text-slate-300 font-bold">Enabled</span>
          </div>
        </div>
        <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-lg space-y-2">
          <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase">
            <Zap className="w-3 h-3" /> Anycast
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="text-xs text-slate-300 font-bold">Global</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase">
          <span className="text-slate-500">Query Resolution Time</span>
          <span className="text-indigo-400">12ms Avg</span>
        </div>
        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500 w-[92%]" />
        </div>
      </div>

      <div className="pt-2 border-t border-slate-800/50">
        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase">
          <Globe className="w-3 h-3" /> Protected Domains: <span className="text-slate-300 ml-auto">1,242</span>
        </div>
      </div>
    </div>
  );
}
