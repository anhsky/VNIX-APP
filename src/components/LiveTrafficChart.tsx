import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SystemState } from '../types';

export function LiveTrafficChart({ systemState }: { systemState: SystemState }) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const initialData = Array.from({ length: 30 }).map((_, i) => ({
      time: i,
      incoming: 1.5 + Math.random() * 0.2,
      dropped: 0,
      clean: 1.5 + Math.random() * 0.2,
    }));
    setData(initialData);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        if (prev.length === 0) return prev;
        const newData = [...prev.slice(1)];
        const lastTime = newData[newData.length - 1]?.time || 0;
        
        let incoming = 1.5;
        let dropped = 0;
        let clean = 1.5;

        if (systemState === 'NORMAL') {
          incoming = 1.5 + Math.random() * 0.5;
          dropped = Math.random() * 0.1;
          clean = incoming - dropped;
        } else if (systemState === 'DETECTING') {
          incoming = 42 + Math.random() * 5;
          dropped = Math.random() * 2;
          clean = incoming - dropped;
        } else if (systemState === 'DDOS') {
          incoming = 480 + Math.random() * 50;
          dropped = incoming - 1.5 - Math.random() * 0.5;
          clean = incoming - dropped;
        }

        newData.push({
          time: lastTime + 1,
          incoming: Number(incoming.toFixed(1)),
          dropped: Number(dropped.toFixed(1)),
          clean: Number(clean.toFixed(1)),
        });

        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [systemState]);

  return (
    <div className="glass-panel rounded-xl p-4 h-[300px] flex flex-col relative overflow-hidden">
      {/* Glow effect based on state */}
      <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-1000 ${
        systemState === 'DDOS' ? 'bg-rose-500' : systemState === 'DETECTING' ? 'bg-orange-500' : 'bg-emerald-500'
      }`}></div>

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-slate-400 uppercase">
          <span className={`w-2 h-2 rounded-full animate-pulse ${
            systemState === 'DDOS' ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e]' : 
            systemState === 'DETECTING' ? 'bg-orange-500 shadow-[0_0_8px_#f97316]' : 
            'bg-emerald-500 shadow-[0_0_8px_#10b981]'
          }`}></span>
          Live Traffic Analysis (Gbps)
        </div>
        <div className="flex gap-4 text-[10px] font-bold">
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_5px_#f43f5e]"></span> INCOMING</div>
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_5px_#eab308]"></span> DROPPED</div>
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]"></span> CLEAN</div>
        </div>
      </div>
      <div className="flex-grow relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIncoming" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorDropped" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorClean" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.5} />
            <XAxis dataKey="time" hide />
            <YAxis stroke="#475569" fontSize={10} tickFormatter={(val) => `${val}G`} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px', backdropFilter: 'blur(4px)' }}
              itemStyle={{ fontWeight: 'bold' }}
            />
            <Area type="monotone" dataKey="incoming" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorIncoming)" isAnimationActive={false} />
            <Area type="monotone" dataKey="dropped" stroke="#eab308" strokeWidth={2} fillOpacity={1} fill="url(#colorDropped)" isAnimationActive={false} />
            <Area type="monotone" dataKey="clean" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorClean)" isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
