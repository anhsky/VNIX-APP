import React, { useState, useEffect, useRef } from 'react';
import { Search, Binary } from 'lucide-react';
import { SystemState } from '../types';

export function PacketInspector({ systemState, lang }: { systemState: SystemState, lang: 'en' | 'vi' }) {
  const [packets, setPackets] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const generateHexDump = () => {
    const hexChars = '0123456789abcdef';
    let hex = '';
    let ascii = '';
    for (let i = 0; i < 16; i++) {
      const charCode = Math.floor(Math.random() * 256);
      const h = charCode.toString(16).padStart(2, '0');
      hex += h + ' ';
      ascii += (charCode >= 32 && charCode <= 126) ? String.fromCharCode(charCode) : '.';
    }
    const offset = Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0');
    return `${offset}: ${hex} |${ascii}|`;
  };

  useEffect(() => {
    const intervalTime = systemState === 'DDOS' ? 100 : systemState === 'DETECTING' ? 500 : 2000;

    const interval = setInterval(() => {
      if (systemState === 'NORMAL' && Math.random() > 0.3) return; // Less packets in normal state

      setPackets(prev => {
        const newPackets = [...prev, generateHexDump()];
        return newPackets.slice(-15); // Keep last 15 lines
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [systemState]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [packets]);

  return (
    <div className="glass-panel border border-slate-700/50 rounded-xl p-4 h-[300px] flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500/50 shadow-[0_0_10px_#6366f1]"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="flex items-center justify-between mb-3 border-b border-slate-700/50 pb-2 relative z-10">
        <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-slate-400 uppercase">
          <Binary className="w-4 h-4 text-indigo-400 drop-shadow-[0_0_5px_#818cf8]" />
          {lang === 'en' ? 'Deep Packet Inspection' : 'Phân Tích Gói Tin (DPI)'}
        </div>
        {systemState === 'DDOS' && (
          <span className="flex items-center gap-1 text-[10px] font-bold text-rose-400 bg-rose-500/20 border border-rose-500/30 px-2 py-0.5 rounded animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.2)]">
            <Search className="w-3 h-3" />
            MATCH: MALICIOUS
          </span>
        )}
      </div>
      
      <div 
        ref={scrollRef} 
        className="flex-grow overflow-y-auto font-mono text-[10px] space-y-1 pr-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent text-slate-400 relative z-10"
      >
        {packets.map((pkt, i) => (
          <div key={i} className={`hover:bg-slate-800/50 px-1 rounded transition-colors ${systemState === 'DDOS' && Math.random() > 0.8 ? 'text-rose-400 drop-shadow-[0_0_2px_#f43f5e]' : ''}`}>
            {pkt}
          </div>
        ))}
      </div>
    </div>
  );
}
