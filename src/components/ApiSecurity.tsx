import { useState, useEffect } from 'react';
import { Shield, Activity, Lock, AlertTriangle } from 'lucide-react';
import { SystemState } from '../types';

export function ApiSecurity({ systemState }: { systemState: SystemState }) {
  const [endpoints, setEndpoints] = useState([
    { path: '/api/v1/auth/login', calls: 12450, blocked: 340, status: 'Healthy' },
    { path: '/api/v1/users/profile', calls: 45200, blocked: 12, status: 'Healthy' },
    { path: '/api/v1/payments/process', calls: 3200, blocked: 850, status: 'Under Attack' },
    { path: '/api/v2/data/export', calls: 890, blocked: 45, status: 'Warning' },
  ]);

  useEffect(() => {
    if (systemState === 'DDOS') {
      setEndpoints(prev => prev.map(ep => ({
        ...ep,
        calls: ep.calls + Math.floor(Math.random() * 5000),
        blocked: ep.blocked + Math.floor(Math.random() * 1000),
        status: ep.path.includes('payments') || ep.path.includes('auth') ? 'Under Attack' : 'Warning'
      })));
    }
  }, [systemState]);

  return (
    <div className="bg-slate-900/50 border border-slate-800/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <Lock className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">API Security Gateway</h3>
            <p className="text-xs text-slate-400">Endpoint protection & rate limiting</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">
            <Shield className="w-3 h-3" /> Active
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {endpoints.map((ep, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg border border-slate-700/30">
            <div className="flex items-center gap-3">
              <Activity className={`w-4 h-4 ${ep.status === 'Healthy' ? 'text-emerald-400' : ep.status === 'Warning' ? 'text-orange-400' : 'text-rose-400'}`} />
              <div>
                <div className="text-sm font-mono text-slate-300">{ep.path}</div>
                <div className="text-xs text-slate-500">Status: <span className={ep.status === 'Healthy' ? 'text-emerald-400' : ep.status === 'Warning' ? 'text-orange-400' : 'text-rose-400'}>{ep.status}</span></div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-white">{ep.calls.toLocaleString()} <span className="text-xs font-normal text-slate-500">reqs</span></div>
              <div className="text-xs text-rose-400 font-mono">{ep.blocked.toLocaleString()} blocked</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
