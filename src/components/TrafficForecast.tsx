import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, BrainCircuit } from 'lucide-react';

const data = [
  { time: '00:00', actual: 400, predicted: 420 },
  { time: '04:00', actual: 300, predicted: 310 },
  { time: '08:00', actual: 600, predicted: 580 },
  { time: '12:00', actual: 800, predicted: 850 },
  { time: '16:00', actual: 700, predicted: 720 },
  { time: '20:00', actual: 900, predicted: 880 },
  { time: '23:59', actual: 500, predicted: 520 },
];

export function TrafficForecast() {
  return (
    <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2">
          <BrainCircuit className="w-4 h-4 text-indigo-400" />
          AI Traffic Forecasting
        </h3>
        <div className="flex items-center gap-1 text-[10px] text-indigo-400 uppercase font-bold">
          <TrendingUp className="w-3 h-3" />
          Predictive Analysis
        </div>
      </div>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', fontSize: '10px' }}
              itemStyle={{ color: '#cbd5e1' }}
            />
            <Area type="monotone" dataKey="actual" stroke="#6366f1" fillOpacity={1} fill="url(#colorActual)" strokeWidth={2} />
            <Area type="monotone" dataKey="predicted" stroke="#10b981" strokeDasharray="5 5" fillOpacity={1} fill="url(#colorPredicted)" strokeWidth={1} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-indigo-500" />
          <span className="text-[10px] text-slate-500 uppercase font-bold">Actual Traffic</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-emerald-500 border-t border-dashed" />
          <span className="text-[10px] text-slate-500 uppercase font-bold">AI Predicted</span>
        </div>
      </div>
    </div>
  );
}
