import React, { useEffect, useState, useRef } from 'react';
import { Terminal, ChevronRight } from 'lucide-react';

const LOG_MESSAGES = [
  'Initializing XDP pipeline...',
  'BGP Anycast route advertised to AS13335',
  'Scrubbing Center node-01: Health check PASSED',
  'New firewall rule applied: BLOCK UDP/53 from 185.x.x.x',
  'Anomaly detected in AS-24940 (PPS > 500k)',
  'Mitigation active: TCP SYN Cookie enabled',
  'WAF: Blocked SQLi attempt on /api/v1/users',
  'Global sync complete: 8 nodes updated',
  'Kernel: eBPF program loaded successfully',
  'SSL handshake optimized for region: SEA',
];

export function SystemLogs() {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const addLog = () => {
      const msg = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
      const timestamp = new Date().toLocaleTimeString();
      setLogs(prev => [...prev, `[${timestamp}] ${msg}`].slice(-50));
    };

    const interval = setInterval(addLog, 2000);
    addLog();
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-black/80 border border-slate-800 rounded-xl p-4 font-mono overflow-hidden h-[300px] flex flex-col">
      <div className="flex items-center gap-2 mb-3 text-[10px] font-bold text-emerald-500 uppercase tracking-widest border-b border-slate-800 pb-2">
        <Terminal className="w-3.5 h-3.5" />
        System Kernel Logs
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-1 scrollbar-hide"
      >
        {logs.map((log, i) => (
          <div key={i} className="text-[10px] flex items-start gap-2">
            <ChevronRight className="w-3 h-3 text-slate-700 mt-0.5 shrink-0" />
            <span className={log.includes('Anomaly') || log.includes('Blocked') ? 'text-rose-400' : 'text-slate-400'}>
              {log}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
