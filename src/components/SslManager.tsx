import React from 'react';
import { ShieldCheck, Calendar, AlertCircle, ExternalLink } from 'lucide-react';

export function SslManager() {
  const [renewing, setRenewing] = React.useState<number | null>(null);
  const [certs, setCerts] = React.useState([
    { domain: 'vnixanycast.site', issuer: 'Let\'s Encrypt', expiry: '2024-06-15', status: 'VALID' },
    { domain: 'api.vnix.site', issuer: 'DigiCert', expiry: '2024-04-01', status: 'EXPIRING' },
  ]);

  const handleRenew = (index: number) => {
    setRenewing(index);
    setTimeout(() => {
      setRenewing(null);
      setCerts(prev => prev.map((c, i) => i === index ? { ...c, status: 'VALID', expiry: '2025-03-07' } : c));
    }, 2000);
  };

  return (
    <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          SSL/TLS Certificates
        </h3>
      </div>

      <div className="space-y-4">
        {certs.map((cert, i) => (
          <div key={i} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-bold text-slate-200">{cert.domain}</div>
              <div className={`px-2 py-0.5 rounded text-[9px] font-black ${cert.status === 'VALID' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'}`}>
                {cert.status}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[9px] text-slate-500 uppercase font-bold mb-1">Issuer</div>
                <div className="text-xs text-slate-400">{cert.issuer}</div>
              </div>
              <div className="text-right">
                <div className="text-[9px] text-slate-500 uppercase font-bold mb-1">Expires</div>
                <div className="text-xs text-slate-400 flex items-center justify-end gap-1">
                  <Calendar className="w-3 h-3" /> {cert.expiry}
                </div>
              </div>
            </div>
            <button 
              onClick={() => handleRenew(i)}
              disabled={renewing !== null}
              className={`w-full py-1.5 rounded text-[10px] font-bold uppercase transition-all ${
                renewing === i 
                  ? 'bg-indigo-500 text-white' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200 border border-slate-700'
              }`}
            >
              {renewing === i ? 'Renewing...' : 'Renew Certificate'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
