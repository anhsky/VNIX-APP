import React, { useEffect, useState } from 'react';
import { Eye, Ghost, ShieldAlert, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Leak {
  id: number;
  source: string;
  data: string;
  severity: 'Low' | 'Medium' | 'High';
  date: string;
}

const SOURCES = ['RaidForums', 'Breached.vc', 'Darknet Market', 'Pastebin', 'Telegram Channel'];
const DATA_TYPES = ['User Credentials', 'Database Dump', 'API Keys', 'Source Code', 'Customer PII'];

export function DarkWebMonitor() {
  const [leaks, setLeaks] = useState<Leak[]>([]);

  useEffect(() => {
    const generateLeak = () => {
      const newLeak = {
        id: Date.now(),
        source: SOURCES[Math.floor(Math.random() * SOURCES.length)],
        data: DATA_TYPES[Math.floor(Math.random() * DATA_TYPES.length)],
        severity: (['Low', 'Medium', 'High'] as const)[Math.floor(Math.random() * 3)],
        date: new Date().toLocaleDateString(),
      };
      setLeaks(prev => [newLeak, ...prev].slice(0, 4));
    };

    const interval = setInterval(generateLeak, 6000);
    generateLeak();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
          <Ghost className="w-4 h-4" />
          Dark Web Monitoring
        </h3>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
          <span className="text-[9px] text-slate-500 font-bold uppercase">Live Scan</span>
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {leaks.map((leak) => (
            <motion.div
              key={leak.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded ${
                  leak.severity === 'High' ? 'bg-rose-500/10 text-rose-400' :
                  leak.severity === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                  'bg-indigo-500/10 text-indigo-400'
                }`}>
                  <ShieldAlert className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-200">{leak.data}</div>
                  <div className="text-[9px] text-slate-500">Source: {leak.source}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-[9px] font-bold uppercase ${
                  leak.severity === 'High' ? 'text-rose-400' :
                  leak.severity === 'Medium' ? 'text-amber-400' :
                  'text-indigo-400'
                }`}>{leak.severity}</div>
                <div className="text-[8px] text-slate-600">{leak.date}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <button className="w-full mt-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-[10px] font-bold text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-all flex items-center justify-center gap-2">
        <Terminal className="w-3 h-3" />
        ACCESS FULL DATABASE
      </button>
    </div>
  );
}
