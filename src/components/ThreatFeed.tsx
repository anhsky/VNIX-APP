import React, { useEffect, useState } from 'react';
import { AlertTriangle, ShieldAlert, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Threat {
  id: number;
  type: string;
  target: string;
  origin: string;
  magnitude: string;
  time: string;
}

const THREAT_TYPES = ['TCP Flood', 'UDP Amplification', 'HTTP GET Flood', 'ICMP Reflection', 'DNS Amplification'];
const COUNTRIES = ['China', 'Russia', 'USA', 'Brazil', 'Vietnam', 'Germany', 'Netherlands', 'Ukraine'];

export function ThreatFeed() {
  const [threats, setThreats] = useState<Threat[]>([]);

  useEffect(() => {
    const generateThreat = () => {
      const newThreat = {
        id: Date.now(),
        type: THREAT_TYPES[Math.floor(Math.random() * THREAT_TYPES.length)],
        target: `node-${Math.floor(Math.random() * 100) + 10}.vnix.site`,
        origin: COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)],
        magnitude: `${(Math.random() * 50 + 5).toFixed(1)} Gbps`,
        time: new Date().toLocaleTimeString(),
      };
      setThreats(prev => [newThreat, ...prev].slice(0, 5));
    };

    const interval = setInterval(generateThreat, 4000);
    generateThreat();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900/30 border border-slate-800/50 rounded-xl p-4 overflow-hidden">
      <div className="flex items-center gap-2 mb-4 text-xs font-bold text-rose-400 uppercase tracking-widest">
        <ShieldAlert className="w-4 h-4 animate-pulse" />
        Live Threat Intelligence
      </div>
      
      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {threats.map((threat) => (
            <motion.div
              key={threat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center justify-between p-2.5 bg-slate-900/60 border-l-2 border-rose-500 rounded-r-lg text-[11px]"
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="text-slate-200 font-bold">{threat.type}</span>
                  <span className="text-slate-500 text-[9px]">Origin: {threat.origin}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-rose-400 font-mono font-bold">{threat.magnitude}</div>
                <div className="text-slate-600 text-[9px]">{threat.time}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="mt-4 pt-3 border-t border-slate-800/50 flex items-center justify-between text-[10px] text-slate-500">
        <span className="flex items-center gap-1">
          <Zap className="w-3 h-3 text-amber-500" />
          Active mitigations: 1,242
        </span>
        <span className="hover:text-indigo-400 cursor-pointer transition-colors">View Global Map →</span>
      </div>
    </div>
  );
}
