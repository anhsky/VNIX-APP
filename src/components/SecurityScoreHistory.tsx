import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShieldCheck, TrendingUp } from 'lucide-react';

const data = [
  { day: 'Mon', score: 65 },
  { day: 'Tue', score: 68 },
  { day: 'Wed', score: 75 },
  { day: 'Thu', score: 82 },
  { day: 'Fri', score: 88 },
  { day: 'Sat', score: 92 },
  { day: 'Sun', score: 95 },
];

export function SecurityScoreHistory() {
  return (
    <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Security Posture History
        </h3>
        <div className="flex items-center gap-1 text-[10px] text-emerald-400 uppercase font-bold">
          <TrendingUp className="w-3 h-3" />
          +12% This Week
        </div>
      </div>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="day" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis hide domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', fontSize: '10px' }}
              itemStyle={{ color: '#cbd5e1' }}
            />
            <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2, fill: '#0f172a' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Current Posture</div>
        <div className="text-xl font-bold text-emerald-400">95/100</div>
      </div>
    </div>
  );
}
