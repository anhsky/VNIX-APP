import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { SystemState } from '../types';
import { Activity } from 'lucide-react';

export function ProtocolDistribution({ systemState }: { systemState: SystemState }) {
  const [data, setData] = useState([
    { name: 'HTTPS', value: 70 },
    { name: 'TCP', value: 20 },
    { name: 'UDP', value: 5 },
    { name: 'ICMP', value: 5 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        if (systemState === 'NORMAL') {
          return [
            { name: 'HTTPS', value: 70 + Math.random() * 5 },
            { name: 'TCP', value: 20 + Math.random() * 2 },
            { name: 'UDP', value: 5 + Math.random() * 1 },
            { name: 'ICMP', value: 5 + Math.random() * 1 },
          ];
        } else if (systemState === 'DETECTING') {
          return [
            { name: 'HTTPS', value: 40 + Math.random() * 5 },
            { name: 'TCP', value: 30 + Math.random() * 5 },
            { name: 'UDP', value: 25 + Math.random() * 5 },
            { name: 'ICMP', value: 5 + Math.random() * 1 },
          ];
        } else {
          return [
            { name: 'HTTPS', value: 5 + Math.random() * 2 },
            { name: 'TCP', value: 15 + Math.random() * 5 },
            { name: 'UDP', value: 75 + Math.random() * 10 },
            { name: 'ICMP', value: 5 + Math.random() * 2 },
          ];
        }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [systemState]);

  const COLORS = ['#10b981', '#0ea5e9', '#f43f5e', '#eab308'];

  return (
    <div className="glass-panel rounded-xl p-4 h-[300px] flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="flex items-center gap-2 mb-4 text-xs font-bold tracking-widest text-slate-400 uppercase relative z-10">
        <Activity className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_5px_#22d3ee]" />
        Protocol Distribution
      </div>
      <div className="flex-grow relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              isAnimationActive={true}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} style={{ filter: `drop-shadow(0px 0px 5px ${COLORS[index % COLORS.length]}80)` }} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px', backdropFilter: 'blur(4px)' }}
              itemStyle={{ fontWeight: 'bold' }}
              formatter={(value: number) => `${value.toFixed(1)}%`}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', color: '#94a3b8' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
