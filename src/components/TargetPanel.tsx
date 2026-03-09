import React, { useState } from 'react';
import { Search, Globe, MapPin, Server, ShieldCheck, Crosshair, Loader2, Wifi, Lock, Activity } from 'lucide-react';
import { TargetInfo, SystemState } from '../types';
import { motion } from 'motion/react';

interface Props {
  onAnalyze: (domain: string) => void;
  targetInfo: TargetInfo | null;
  isAnalyzing: boolean;
  systemState: SystemState;
  setSystemState: (state: SystemState) => void;
}

export function TargetPanel({ onAnalyze, targetInfo, isAnalyzing, systemState, setSystemState }: Props) {
  const [input, setInput] = useState('');

  const [attackType, setAttackType] = useState('TCP Flood');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) onAnalyze(input.trim());
  };

  const ATTACK_TYPES = ['TCP Flood', 'UDP Amplification', 'HTTP Layer 7', 'ICMP Reflection', 'DNS Flood'];

  return (
    <div className="glass-panel rounded-xl p-4 md:p-6 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 shadow-[0_0_10px_#6366f1]"></div>
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col gap-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* Input Section */}
          <div className="w-full md:w-1/3">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold tracking-widest text-slate-400 uppercase">
              <span className="w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_5px_#6366f1] animate-pulse"></span>
              Target Analysis
            </div>
            <form onSubmit={handleSubmit} className="relative flex items-center group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-20 py-2.5 border border-slate-700/50 rounded-lg leading-5 bg-slate-900/50 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all backdrop-blur-sm"
                placeholder="Enter domain (e.g., example.com)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isAnalyzing}
              />
              <button
                type="submit"
                disabled={isAnalyzing || !input.trim()}
                className="absolute inset-y-1.5 right-1.5 px-3 bg-indigo-500/20 text-indigo-400 border border-indigo-500/50 rounded-md text-xs font-bold hover:bg-indigo-500/30 hover:shadow-[0_0_10px_rgba(99,102,241,0.2)] transition-all disabled:opacity-50 flex items-center justify-center min-w-[60px]"
              >
                {isAnalyzing ? <Loader2 className="w-3 h-3 animate-spin" /> : 'SCAN'}
              </button>
            </form>
          </div>

          {/* Results Section */}
          {targetInfo && !isAnalyzing && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full border-t md:border-t-0 md:border-l border-slate-700/50 pt-4 md:pt-0 md:pl-6"
            >
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-indigo-400"/> Domain
                </span>
                <span className="text-sm font-bold text-slate-200 truncate" title={targetInfo.domain}>{targetInfo.domain}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Server className="w-3 h-3 text-cyan-400"/> Resolved IP
                </span>
                <span className="text-sm font-mono text-cyan-400 drop-shadow-[0_0_2px_#22d3ee]">{targetInfo.ip}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-400"/> Location
                </span>
                <span className="text-sm font-bold text-slate-300 truncate" title={targetInfo.location}>{targetInfo.location}</span>
              </div>
              <div className="flex flex-col gap-2">
                {systemState === 'NORMAL' ? (
                  <>
                    <select 
                      value={attackType}
                      onChange={(e) => setAttackType(e.target.value)}
                      className="bg-slate-900/80 border border-slate-700/50 text-[10px] text-slate-300 rounded px-2 py-1.5 focus:outline-none focus:border-rose-500/50 backdrop-blur-sm"
                    >
                      {ATTACK_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <button 
                      onClick={() => setSystemState('DDOS')}
                      className="flex items-center justify-center gap-2 w-full py-2 bg-rose-500/20 text-rose-400 border border-rose-500/50 rounded-lg text-xs font-bold hover:bg-rose-500/30 transition-all shadow-[0_0_15px_rgba(244,63,94,0.1)] hover:shadow-[0_0_20px_rgba(244,63,94,0.2)]"
                    >
                      <Crosshair className="w-4 h-4" />
                      LAUNCH {attackType.split(' ')[0]}
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => setSystemState('NORMAL')}
                    className="flex items-center justify-center gap-2 w-full h-full py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 rounded-lg text-xs font-bold hover:bg-emerald-500/30 transition-all shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    STOP ATTACK
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Extra Details Section */}
        {targetInfo && !isAnalyzing && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-700/50"
          >
            <div className="flex items-center gap-3 bg-slate-900/40 p-3 rounded-lg border border-slate-700/50 hover:border-indigo-500/30 transition-colors">
              <div className="p-2 bg-indigo-500/10 rounded-md border border-indigo-500/20">
                <Wifi className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">ISP / Provider</span>
                <span className="text-xs font-medium text-slate-300 truncate max-w-[120px]">{targetInfo.isp}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-900/40 p-3 rounded-lg border border-slate-700/50 hover:border-cyan-500/30 transition-colors">
              <div className="p-2 bg-cyan-500/10 rounded-md border border-cyan-500/20">
                <Activity className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Latency</span>
                <span className="text-xs font-medium text-slate-300">{targetInfo.latency}ms</span>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-900/40 p-3 rounded-lg border border-slate-700/50 hover:border-emerald-500/30 transition-colors">
              <div className="p-2 bg-emerald-500/10 rounded-md border border-emerald-500/20">
                <Lock className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">SSL Status</span>
                <span className="text-xs font-medium text-emerald-400 drop-shadow-[0_0_2px_#10b981]">{targetInfo.ssl}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-900/40 p-3 rounded-lg border border-slate-700/50 hover:border-amber-500/30 transition-colors">
              <div className="p-2 bg-amber-500/10 rounded-md border border-amber-500/20">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </div>
              <div className="flex flex-col w-full">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Security Score</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-300">{targetInfo.securityScore}/100</span>
                  <div className="flex-1 h-1.5 bg-slate-800/50 rounded-full overflow-hidden border border-slate-700/50">
                    <div 
                      className="h-full bg-emerald-500 shadow-[0_0_5px_#10b981]" 
                      style={{ width: `${targetInfo.securityScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
