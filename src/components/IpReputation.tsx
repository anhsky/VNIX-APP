import React, { useState } from 'react';
import { Search, ShieldAlert, ShieldCheck, Globe, Database } from 'lucide-react';

export function IpReputation() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any>(null);

  const checkIp = () => {
    if (!query) return;
    // Simulated result
    setResult({
      ip: query,
      riskScore: Math.floor(Math.random() * 100),
      isMalicious: Math.random() > 0.7,
      isp: 'Cloudflare, Inc.',
      location: 'San Francisco, US',
      lastSeen: '2 hours ago'
    });
  };

  return (
    <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6 text-xs font-bold text-indigo-400 uppercase tracking-widest">
        <Database className="w-4 h-4" />
        IP Reputation Intelligence
      </div>

      <div className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search IP reputation..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button 
          onClick={checkIp}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-xs font-bold hover:bg-indigo-600 transition-colors"
        >
          CHECK
        </button>
      </div>

      {result && (
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-4 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {result.isMalicious ? <ShieldAlert className="w-5 h-5 text-rose-400" /> : <ShieldCheck className="w-5 h-5 text-emerald-400" />}
              <div>
                <div className="text-sm font-bold text-slate-200">{result.ip}</div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">{result.isp}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Risk Score</div>
              <div className={`text-lg font-bold ${result.riskScore > 70 ? 'text-rose-400' : result.riskScore > 30 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {result.riskScore}/100
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <div>
              <div className="text-[9px] text-slate-500 uppercase font-bold mb-1 flex items-center gap-1">
                <Globe className="w-3 h-3" /> Location
              </div>
              <div className="text-xs text-slate-300">{result.location}</div>
            </div>
            <div className="text-right">
              <div className="text-[9px] text-slate-500 uppercase font-bold mb-1">Last Seen</div>
              <div className="text-xs text-slate-300">{result.lastSeen}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
