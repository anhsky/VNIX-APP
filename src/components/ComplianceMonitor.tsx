import React from 'react';
import { ShieldCheck, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export function ComplianceMonitor() {
  const standards = [
    { name: 'PCI-DSS v4.0', status: 'COMPLIANT', score: 100 },
    { name: 'GDPR Article 32', status: 'COMPLIANT', score: 98 },
    { name: 'ISO 27001:2022', status: 'PARTIAL', score: 85 },
    { name: 'SOC2 Type II', status: 'COMPLIANT', score: 100 },
  ];

  return (
    <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          Regulatory Compliance
        </h3>
        <div className="text-xl font-black text-indigo-400">96%</div>
      </div>

      <div className="space-y-3">
        {standards.map((std, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
            <div className="flex items-center gap-3">
              {std.status === 'COMPLIANT' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-amber-400" />}
              <span className="text-xs font-bold text-slate-300">{std.name}</span>
            </div>
            <div className="text-[10px] font-mono text-slate-500">{std.score}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
