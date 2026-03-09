import React, { useState } from 'react';
import { Search, Globe, Shield, Server, Activity, Lock, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export function DomainIntelligence() {
  const [domain, setDomain] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) return;

    setIsChecking(true);
    // Simulate deep domain check & WHOIS
    await new Promise(resolve => setTimeout(resolve, 1500));

    const isRegistered = domain.includes('.') && domain.length > 4; // Simple mock logic
    const seed = domain.length;
    
    setResult({
      domain,
      isRegistered,
      registrar: isRegistered ? 'NameCheap, Inc.' : null,
      creationDate: isRegistered ? '2020-01-15' : null,
      expiryDate: isRegistered ? '2025-01-15' : null,
      status: isRegistered ? 'Active' : 'Available',
      dns: isRegistered ? [
        { type: 'A', value: '103.141.22.1', proxy: true },
        { type: 'AAAA', value: '2400:6180:0:d0::1f:1', proxy: true },
        { type: 'MX', value: 'mail.' + domain, priority: 10 },
        { type: 'TXT', value: 'v=spf1 include:_spf.google.com ~all' }
      ] : [],
      security: isRegistered ? {
        waf: 'Enabled',
        ddos: 'Mitigation Active',
        ssl: 'Auto-renewing (Let\'s Encrypt)',
        dnssec: seed % 2 === 0 ? 'Enabled' : 'Disabled'
      } : null,
      performance: isRegistered ? {
        ttfb: '24ms',
        uptime: '99.99%',
        cache: '84% Hit Rate'
      } : null
    });
    setIsChecking(false);
  };

  return (
    <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <Globe className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest">Domain Intelligence & WHOIS</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase">Check registration status & protect digital assets</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleCheck} className="relative">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Enter domain to check (e.g. example.com)..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 pl-12 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-all"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <button
          type="submit"
          disabled={isChecking}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-indigo-500 text-white rounded-lg text-xs font-bold hover:bg-indigo-600 transition-all disabled:opacity-50"
        >
          {isChecking ? 'SCANNING...' : 'CHECK'}
        </button>
      </form>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* WHOIS / Registration Status */}
          <div className={`p-4 border rounded-xl flex items-center justify-between ${result.isRegistered ? 'bg-slate-900/60 border-slate-800' : 'bg-emerald-500/10 border-emerald-500/30'}`}>
            <div className="flex items-center gap-3">
              {result.isRegistered ? <Info className="w-5 h-5 text-indigo-400" /> : <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              <div>
                <div className="text-sm font-bold text-slate-200">{result.domain}</div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">
                  {result.isRegistered ? `Registered via ${result.registrar}` : 'Domain is available for registration!'}
                </div>
              </div>
            </div>
            {result.isRegistered && (
              <div className="text-right flex gap-4">
                <div>
                  <div className="text-[9px] text-slate-500 uppercase font-bold">Created</div>
                  <div className="text-xs text-slate-300">{result.creationDate}</div>
                </div>
                <div>
                  <div className="text-[9px] text-slate-500 uppercase font-bold">Expires</div>
                  <div className="text-xs text-amber-400">{result.expiryDate}</div>
                </div>
              </div>
            )}
          </div>

          {/* Security & Performance (Only if registered) */}
          {result.isRegistered && result.security && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
                  <Shield className="w-3 h-3" /> Security Status
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">WAF</span>
                    <span className="text-emerald-400 font-bold">{result.security.waf}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">DDoS</span>
                    <span className="text-emerald-400 font-bold">{result.security.ddos}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">DNSSEC</span>
                    <span className={result.security.dnssec === 'Enabled' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {result.security.dnssec}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
                  <Activity className="w-3 h-3" /> Performance
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">TTFB</span>
                    <span className="text-indigo-400 font-bold">{result.performance.ttfb}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Uptime</span>
                    <span className="text-emerald-400 font-bold">{result.performance.uptime}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Cache</span>
                    <span className="text-indigo-400 font-bold">{result.performance.cache}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
                  <Server className="w-3 h-3" /> DNS Records
                </div>
                <div className="space-y-1 overflow-y-auto max-h-[60px] scrollbar-hide">
                  {result.dns.map((record: any, i: number) => (
                    <div key={i} className="flex justify-between text-[10px]">
                      <span className="text-slate-500 font-bold">{record.type}</span>
                      <span className="text-slate-300 truncate ml-2">{record.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
