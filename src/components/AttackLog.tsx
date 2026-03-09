import React, { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';
import { SystemState, BlockedIP } from '../types';

export function AttackLog({ systemState, blockedIPs }: { systemState: SystemState, blockedIPs: BlockedIP[] }) {
  const [logs, setLogs] = useState<{ id: number; time: string; msg: string; type: 'info' | 'warn' | 'error' | 'success' }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const logIdRef = useRef(0);

  useEffect(() => {
    // Initial boot sequence logs
    const now = new Date();
    const initialLogs = [
      { id: logIdRef.current++, time: now.toISOString().split('T')[1].slice(0, 8), msg: 'System initialized. VNIX peering established.', type: 'info' as const },
      { id: logIdRef.current++, time: now.toISOString().split('T')[1].slice(0, 8), msg: 'eBPF/XDP programs loaded on all 6 PoPs.', type: 'success' as const },
      { id: logIdRef.current++, time: now.toISOString().split('T')[1].slice(0, 8), msg: 'Listening for anomalous traffic patterns...', type: 'info' as const },
    ];
    setLogs(initialLogs);
  }, []);

  useEffect(() => {
    const intervalTime = systemState === 'DDOS' ? 150 : systemState === 'DETECTING' ? 800 : 2500;

    const interval = setInterval(() => {
      const now = new Date().toISOString().split('T')[1].slice(0, 8);
      let newLog = null;

      if (systemState === 'NORMAL') {
        if (blockedIPs.length > 0 && Math.random() > 0.8) {
          const randomBlock = blockedIPs[Math.floor(Math.random() * blockedIPs.length)];
          newLog = { id: logIdRef.current++, time: now, msg: `[FIREWALL] Dropped connection from ${randomBlock.ip} (${randomBlock.reason})`, type: 'success' as const };
        } else if (Math.random() > 0.6) {
          const msgs = [
            'Routine BGP table update completed.',
            'Syncing threat intelligence feeds...',
            'Heartbeat OK: All 6 PoPs operational.',
            'Clean traffic routed to origin server.',
          ];
          newLog = { id: logIdRef.current++, time: now, msg: msgs[Math.floor(Math.random() * msgs.length)], type: 'info' as const };
        }
      } else if (systemState === 'DETECTING') {
        const msgs = [
          `Anomaly: Traffic spike detected on VNIX port ${Math.floor(Math.random() * 100)}`,
          'Warning: High ratio of UDP to TCP traffic.',
          'Analyzing JA3/JA4 TLS fingerprints...',
          'Preparing BGP scrubbing routes (Standby).',
        ];
        newLog = { id: logIdRef.current++, time: now, msg: msgs[Math.floor(Math.random() * msgs.length)], type: 'warn' as const };
      } else {
        const ips = ['45.122.x.x', '185.22.x.x', '103.44.x.x', '118.69.x.x', '14.225.x.x'];
        const types = ['UDP Amplification', 'TCP SYN Flood', 'HTTP GET Flood', 'ICMP Smurf'];
        const actions = ['[XDP_DROP]', '[L3_BLOCK]', '[DPI_REJECT]'];
        
        if (blockedIPs.length > 0 && Math.random() > 0.7) {
          const randomBlock = blockedIPs[Math.floor(Math.random() * blockedIPs.length)];
          newLog = { id: logIdRef.current++, time: now, msg: `[FIREWALL] Blocked malicious traffic from ${randomBlock.ip}`, type: 'success' as const };
        } else {
          newLog = { 
            id: logIdRef.current++, 
            time: now, 
            msg: `${actions[Math.floor(Math.random() * actions.length)]} ${types[Math.floor(Math.random() * types.length)]} from ${ips[Math.floor(Math.random() * ips.length)]}`, 
            type: 'error' as const 
          };
        }
      }
      
      if (newLog) {
        setLogs(prev => {
          const updated = [...prev, newLog];
          return updated.slice(-50); // Keep last 50 logs
        });
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [systemState]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-[#0B101A] border border-slate-800 rounded-xl p-4 h-[300px] flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-800"></div>
      <div className="flex items-center gap-2 mb-3 text-xs font-bold tracking-widest text-slate-500 uppercase border-b border-slate-800/50 pb-2">
        <Terminal className="w-4 h-4" />
        Live Security Log
      </div>
      
      <div ref={scrollRef} className="flex-grow overflow-y-auto font-mono text-[10px] md:text-xs space-y-1 pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {logs.map((log) => (
          <div key={log.id} className="flex gap-3 hover:bg-slate-800/30 px-1 rounded">
            <span className="text-slate-500 shrink-0">[{log.time}]</span>
            <span className={`
              ${log.type === 'info' ? 'text-slate-300' : ''}
              ${log.type === 'warn' ? 'text-orange-400' : ''}
              ${log.type === 'error' ? 'text-rose-400' : ''}
              ${log.type === 'success' ? 'text-emerald-400' : ''}
            `}>
              {log.msg}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
