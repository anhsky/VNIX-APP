import React, { useState, useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';
import { SystemState } from '../types';

export function WafRules({ systemState, lang }: { systemState: SystemState, lang: 'en' | 'vi' }) {
  const [rules, setRules] = useState([
    { id: '1001', name: 'HTTP Flood (L7)', hits: 1420 },
    { id: '1002', name: 'SQL Injection', hits: 345 },
    { id: '1003', name: 'XSS Payload', hits: 128 },
    { id: '1004', name: 'Bad Bot UA', hits: 890 },
    { id: '1005', name: 'Path Traversal', hits: 56 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRules(prev => prev.map(rule => {
        let increment = 0;
        if (systemState === 'DDOS') {
          increment = rule.id === '1001' ? Math.floor(Math.random() * 5000) :
                      rule.id === '1004' ? Math.floor(Math.random() * 1000) :
                      Math.floor(Math.random() * 50);
        } else if (systemState === 'DETECTING') {
          increment = Math.floor(Math.random() * 50);
        } else {
          increment = Math.floor(Math.random() * 5);
        }
        return { ...rule, hits: rule.hits + increment };
      }).sort((a, b) => b.hits - a.hits));
    }, 1000);
    return () => clearInterval(interval);
  }, [systemState]);

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-xl p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6 text-xs font-bold tracking-widest text-slate-500 uppercase">
        <ShieldAlert className="w-4 h-4 text-indigo-400" />
        {lang === 'en' ? 'Top WAF Rules Triggered' : 'Luật WAF Kích Hoạt Nhiều Nhất'}
      </div>
      <div className="space-y-4 flex-grow flex flex-col justify-center">
        {rules.slice(0, 4).map(rule => (
          <div key={rule.id} className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-slate-300">{rule.name}</div>
              <div className="text-[10px] text-slate-500 font-mono">RULE_ID: {rule.id}</div>
            </div>
            <div className="text-sm font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-1 rounded">
              {rule.hits.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
