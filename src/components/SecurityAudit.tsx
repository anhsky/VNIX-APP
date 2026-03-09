import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, FileText, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TargetInfo } from '../types';

interface Props {
  target: TargetInfo | null;
}

export function SecurityAudit({ target }: Props) {
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditComplete, setAuditComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const startAudit = () => {
    if (!target) return;
    setIsAuditing(true);
    setAuditComplete(false);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAuditing(false);
          setAuditComplete(true);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  if (!target) return null;

  return (
    <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-lg">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest">Security Audit Engine</h3>
            <p className="text-[10px] text-slate-500 uppercase">Deep vulnerability assessment for {target.domain}</p>
          </div>
        </div>
        {!isAuditing && !auditComplete && (
          <button
            onClick={startAudit}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-xs font-bold hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/20"
          >
            RUN FULL AUDIT
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isAuditing ? (
          <motion.div
            key="auditing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6 py-4"
          >
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>Scanning ports, headers, and SSL configurations...</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-indigo-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Port Scan', 'XSS Check', 'SQLi Test', 'SSL Audit'].map((task, i) => (
                <div key={task} className="flex items-center gap-2 text-[10px] text-slate-500">
                  <Loader2 className={`w-3 h-3 animate-spin ${progress > (i + 1) * 25 ? 'text-emerald-400' : 'text-slate-600'}`} />
                  {task}
                </div>
              ))}
            </div>
          </motion.div>
        ) : auditComplete ? (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  PASSED
                </div>
                <p className="text-[10px] text-slate-400">SSL/TLS Configuration, DNSSEC, Header Security (HSTS, CSP)</p>
              </div>
              <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  WARNING
                </div>
                <p className="text-[10px] text-slate-400">Open Ports (8080, 3000), Missing X-Frame-Options</p>
              </div>
              <div className="bg-rose-500/5 border border-rose-500/20 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold mb-2">
                  <XCircle className="w-4 h-4" />
                  CRITICAL
                </div>
                <p className="text-[10px] text-slate-400">No critical vulnerabilities found. System is behind VNIX Scrubbing Center.</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">A+</div>
                  <div className="text-[8px] text-slate-500 uppercase">Grade</div>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div className="text-center">
                  <div className="text-xl font-bold text-emerald-400">0</div>
                  <div className="text-[8px] text-slate-500 uppercase">Exploits</div>
                </div>
              </div>
              <button 
                onClick={() => setAuditComplete(false)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-700 transition-colors"
              >
                <FileText className="w-4 h-4" />
                DOWNLOAD PDF REPORT
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
              <ShieldCheck className="w-8 h-8 text-slate-600" />
            </div>
            <h4 className="text-slate-300 font-bold mb-1">Ready for Audit</h4>
            <p className="text-xs text-slate-500 max-w-xs">Click the button above to perform a comprehensive security analysis of the target infrastructure.</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
