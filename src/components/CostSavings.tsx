import { useState, useEffect } from 'react';
import { DollarSign, TrendingDown, ShieldCheck } from 'lucide-react';
import { SystemState } from '../types';

export function CostSavings({ systemState }: { systemState: SystemState }) {
  const [savings, setSavings] = useState(12450.00);
  const [bandwidthSaved, setBandwidthSaved] = useState(45.2); // TB

  useEffect(() => {
    if (systemState === 'DDOS') {
      const interval = setInterval(() => {
        setSavings(prev => prev + Math.random() * 10);
        setBandwidthSaved(prev => prev + Math.random() * 0.5);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [systemState]);

  return (
    <div className="bg-slate-900/50 border border-slate-800/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/20 rounded-lg">
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Cost Analysis</h3>
            <p className="text-xs text-slate-400">Bandwidth savings via scrubbing</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
          <div className="text-slate-400 text-sm mb-1 flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-emerald-400" />
            Estimated Savings
          </div>
          <div className="text-3xl font-bold text-white font-mono">
            ${savings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-emerald-400 mt-2">This month</div>
        </div>
        <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
          <div className="text-slate-400 text-sm mb-1 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            Bandwidth Scrubbed
          </div>
          <div className="text-3xl font-bold text-white font-mono">
            {bandwidthSaved.toFixed(1)} <span className="text-lg text-slate-500">TB</span>
          </div>
          <div className="text-xs text-indigo-400 mt-2">Malicious traffic dropped</div>
        </div>
      </div>
    </div>
  );
}
