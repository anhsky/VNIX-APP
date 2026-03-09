import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { SystemState } from '../types';

export function MitigationMatrix({ systemState, lang }: { systemState: SystemState, lang: 'en' | 'vi' }) {
  const [actions, setActions] = useState([
    { id: 'allow', name: 'Clean Traffic (Passed)', value: 98, color: 'bg-emerald-500' },
    { id: 'ratelimit', name: 'Rate Limited', value: 1, color: 'bg-blue-500' },
    { id: 'js', name: 'JS Challenge', value: 0.5, color: 'bg-yellow-500' },
    { id: 'captcha', name: 'Interactive Challenge', value: 0.3, color: 'bg-orange-500' },
    { id: 'block', name: 'Blocked (WAF/IP)', value: 0.2, color: 'bg-rose-500' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActions(prev => {
        let newActions = [...prev];
        if (systemState === 'DDOS') {
          newActions = [
            { id: 'allow', name: 'Clean Traffic (Passed)', value: 15 + Math.random() * 5, color: 'bg-emerald-500' },
            { id: 'ratelimit', name: 'Rate Limited', value: 25 + Math.random() * 10, color: 'bg-blue-500' },
            { id: 'js', name: 'JS Challenge', value: 30 + Math.random() * 10, color: 'bg-yellow-500' },
            { id: 'captcha', name: 'Interactive Challenge', value: 15 + Math.random() * 5, color: 'bg-orange-500' },
            { id: 'block', name: 'Blocked (WAF/IP)', value: 15 + Math.random() * 5, color: 'bg-rose-500' },
          ];
        } else if (systemState === 'DETECTING') {
          newActions = [
            { id: 'allow', name: 'Clean Traffic (Passed)', value: 60 + Math.random() * 10, color: 'bg-emerald-500' },
            { id: 'ratelimit', name: 'Rate Limited', value: 15 + Math.random() * 5, color: 'bg-blue-500' },
            { id: 'js', name: 'JS Challenge', value: 15 + Math.random() * 5, color: 'bg-yellow-500' },
            { id: 'captcha', name: 'Interactive Challenge', value: 5 + Math.random() * 2, color: 'bg-orange-500' },
            { id: 'block', name: 'Blocked (WAF/IP)', value: 5 + Math.random() * 2, color: 'bg-rose-500' },
          ];
        } else {
          newActions = [
            { id: 'allow', name: 'Clean Traffic (Passed)', value: 98 + Math.random() * 1, color: 'bg-emerald-500' },
            { id: 'ratelimit', name: 'Rate Limited', value: 0.5 + Math.random() * 0.5, color: 'bg-blue-500' },
            { id: 'js', name: 'JS Challenge', value: 0.5 + Math.random() * 0.5, color: 'bg-yellow-500' },
            { id: 'captcha', name: 'Interactive Challenge', value: 0.2 + Math.random() * 0.2, color: 'bg-orange-500' },
            { id: 'block', name: 'Blocked (WAF/IP)', value: 0.8 + Math.random() * 0.2, color: 'bg-rose-500' },
          ];
        }

        // Normalize to 100%
        const total = newActions.reduce((sum, a) => sum + a.value, 0);
        return newActions.map(a => ({ ...a, value: (a.value / total) * 100 }));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [systemState]);

  const t = {
    en: { title: 'Layer 7 Mitigation Matrix', allow: 'Clean Traffic', ratelimit: 'Rate Limited', js: 'JS Challenge', captcha: 'Interactive Challenge', block: 'Blocked (WAF/IP)' },
    vi: { title: 'Ma Trận Giảm Thiểu Lớp 7', allow: 'Lưu Lượng Sạch', ratelimit: 'Giới Hạn Tốc Độ', js: 'Thử Thách JS', captcha: 'Thử Thách Tương Tác', block: 'Đã Chặn (WAF/IP)' }
  }[lang];

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-xl p-6 h-full">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-indigo-400" />
        <h2 className="text-lg font-bold text-slate-200">{t.title}</h2>
      </div>
      <div className="space-y-5">
        {actions.map((action) => (
          <div key={action.id} className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-300">{t[action.id as keyof typeof t] || action.name}</span>
              <span className="text-slate-400 font-mono">{action.value.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full ${action.color} transition-all duration-1000 ease-in-out`}
                style={{ width: `${action.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
