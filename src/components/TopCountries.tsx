import React, { useState, useEffect } from 'react';
import { Globe2 } from 'lucide-react';
import { SystemState } from '../types';

export function TopCountries({ systemState }: { systemState: SystemState }) {
  const [countries, setCountries] = useState([
    { code: 'CN', name: 'China', value: 45, color: 'bg-rose-500', shadow: 'shadow-[0_0_8px_#f43f5e]' },
    { code: 'RU', name: 'Russia', value: 25, color: 'bg-orange-500', shadow: 'shadow-[0_0_8px_#f97316]' },
    { code: 'US', name: 'United States', value: 15, color: 'bg-amber-500', shadow: 'shadow-[0_0_8px_#f59e0b]' },
    { code: 'BR', name: 'Brazil', value: 10, color: 'bg-yellow-500', shadow: 'shadow-[0_0_8px_#eab308]' },
    { code: 'IN', name: 'India', value: 5, color: 'bg-blue-500', shadow: 'shadow-[0_0_8px_#3b82f6]' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountries(prev => {
        const newCountries = prev.map(c => {
          let newValue = c.value;
          if (systemState === 'DDOS') {
            newValue = Math.min(100, Math.max(0, c.value + (Math.random() * 10 - 3)));
          } else if (systemState === 'DETECTING') {
            newValue = Math.min(100, Math.max(0, c.value + (Math.random() * 5 - 2)));
          } else {
            newValue = Math.min(100, Math.max(2, c.value + (Math.random() * 4 - 2)));
          }
          return { ...c, value: newValue };
        });
        
        // Normalize to 100%
        const total = newCountries.reduce((sum, c) => sum + c.value, 0);
        return newCountries.map(c => ({ ...c, value: (c.value / total) * 100 })).sort((a, b) => b.value - a.value);
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [systemState]);

  return (
    <div className="glass-panel rounded-xl p-4 h-[300px] flex flex-col relative overflow-hidden">
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="flex items-center gap-2 mb-4 text-xs font-bold tracking-widest text-slate-400 uppercase relative z-10">
        <Globe2 className="w-4 h-4 text-rose-400 drop-shadow-[0_0_5px_#fb7185]" />
        Top Attack Origins
      </div>
      <div className="flex-grow flex flex-col justify-center space-y-4 relative z-10">
        {countries.map((country) => (
          <div key={country.code} className="flex flex-col gap-1.5 group">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-300 group-hover:text-white transition-colors">{country.name}</span>
              <span className="text-slate-400 group-hover:text-slate-200 transition-colors">{country.value.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-800/50 rounded-full h-1.5 overflow-hidden border border-slate-700/50">
              <div 
                className={`h-full ${country.color} ${country.shadow} transition-all duration-1000 ease-in-out`}
                style={{ width: `${Math.max(0, Math.min(100, country.value))}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
