import React from 'react';
import { BookOpen, Play, Shield, Zap, Target, RefreshCw } from 'lucide-react';

export function DdosPlaybooks() {
  const [executing, setExecuting] = React.useState<number | null>(null);
  const playbooks = [
    { name: 'UDP Amplification Defense', steps: 5, status: 'READY', icon: Zap },
    { name: 'Layer 7 Bot Mitigation', steps: 8, status: 'ACTIVE', icon: Target },
    { name: 'BGP Flowspec Automation', steps: 3, status: 'READY', icon: Shield },
  ];

  const handleExecute = (index: number) => {
    setExecuting(index);
    setTimeout(() => setExecuting(null), 3000);
  };

  return (
    <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-400" />
          Mitigation Playbooks
        </h3>
      </div>

      <div className="space-y-4">
        {playbooks.map((pb, i) => (
          <div key={i} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between group hover:border-indigo-500/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-indigo-500/10 transition-colors">
                <pb.icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-400" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-200">{pb.name}</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">{pb.steps} Automated Steps</div>
              </div>
            </div>
            <button 
              onClick={() => handleExecute(i)}
              disabled={executing !== null}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                executing === i 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500 hover:text-white'
              }`}
            >
              {executing === i ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  RUNNING
                </>
              ) : (
                <>
                  <Play className="w-3 h-3" />
                  EXECUTE
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
