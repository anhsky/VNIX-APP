import React, { useState, useEffect } from 'react';
import { Fingerprint, AlertTriangle } from 'lucide-react';
import { SystemState } from '../types';

export function BotnetSignatures({ systemState, lang }: { systemState: SystemState, lang: 'en' | 'vi' }) {
  const [signatures, setSignatures] = useState([
    { hash: 'cd08e31494f9531f560d64c695473da9', family: 'Mirai Variant', confidence: 12, trend: 'down' },
    { hash: 'e7d705a3286e19ea42f587b344ee6865', family: 'Meris Botnet', confidence: 8, trend: 'down' },
    { hash: '3b5074b1b5d032e5620f69f9f700ff0e', family: 'Killnet Tool', confidence: 5, trend: 'flat' },
    { hash: '0c7221438965f725656c072551e18c5c', family: 'Unknown/Custom', confidence: 2, trend: 'flat' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSignatures(prev => prev.map(sig => {
        let newConf = sig.confidence;
        let newTrend = sig.trend;
        
        if (systemState === 'DDOS') {
          newConf = Math.min(99, sig.confidence + Math.random() * 15);
          newTrend = 'up';
        } else if (systemState === 'DETECTING') {
          newConf = Math.min(85, sig.confidence + Math.random() * 5);
          newTrend = 'up';
        } else {
          newConf = Math.max(2, sig.confidence - Math.random() * 5);
          newTrend = newConf < 15 ? 'down' : 'flat';
        }

        return { ...sig, confidence: newConf, trend: newTrend };
      }).sort((a, b) => b.confidence - a.confidence));
    }, 2000);
    return () => clearInterval(interval);
  }, [systemState]);

  const t = {
    en: { title: 'JA3/JA4 Botnet Fingerprints', hash: 'TLS Fingerprint', family: 'Threat Family', conf: 'Confidence' },
    vi: { title: 'Nhận Diện Botnet (JA3/JA4)', hash: 'Dấu Vân Tay TLS', family: 'Dòng Mã Độc', conf: 'Độ Tin Cậy' }
  }[lang];

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-xl p-6 h-full">
      <div className="flex items-center gap-2 mb-6">
        <Fingerprint className="w-5 h-5 text-indigo-400" />
        <h2 className="text-lg font-bold text-slate-200">{t.title}</h2>
      </div>
      <div className="space-y-4">
        {signatures.map((sig, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-slate-900/50 border border-slate-800 rounded-lg">
            <div>
              <div className="font-mono text-xs text-slate-300">{sig.hash.substring(0, 16)}...</div>
              <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                {sig.confidence > 80 && <AlertTriangle className="w-3 h-3 text-rose-500" />}
                {sig.family}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${sig.confidence > 80 ? 'bg-rose-500' : sig.confidence > 50 ? 'bg-orange-500' : 'bg-emerald-500'}`}
                  style={{ width: `${sig.confidence}%` }}
                ></div>
              </div>
              <span className="font-mono text-xs font-bold w-10 text-right text-slate-300">{Math.round(sig.confidence)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
