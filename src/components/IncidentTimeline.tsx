import { useState, useEffect } from 'react';
import { Clock, ShieldAlert, CheckCircle, Zap, AlertTriangle } from 'lucide-react';
import { SystemState } from '../types';

export function IncidentTimeline({ systemState }: { systemState: SystemState }) {
  const [events, setEvents] = useState([
    { time: '10:45:12', type: 'info', message: 'System healthy. Baseline traffic normal.' },
    { time: '10:30:05', type: 'success', message: 'WAF rules updated successfully.' },
    { time: '09:15:00', type: 'warning', message: 'Minor anomaly detected on node SG-1.' },
  ]);

  useEffect(() => {
    if (systemState === 'DETECTING') {
      setEvents(prev => [{ time: new Date().toLocaleTimeString(), type: 'warning', message: 'Traffic spike detected. Analyzing signatures...' }, ...prev].slice(0, 5));
    } else if (systemState === 'DDOS') {
      setEvents(prev => [{ time: new Date().toLocaleTimeString(), type: 'error', message: 'DDoS attack confirmed. Mitigation active.' }, ...prev].slice(0, 5));
    } else {
      setEvents(prev => [{ time: new Date().toLocaleTimeString(), type: 'success', message: 'Attack mitigated. Traffic normalized.' }, ...prev].slice(0, 5));
    }
  }, [systemState]);

  return (
    <div className="bg-slate-900/50 border border-slate-800/50 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-500/20 rounded-lg">
          <Clock className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Incident Timeline</h3>
          <p className="text-xs text-slate-400">Recent security events</p>
        </div>
      </div>

      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
        {events.map((event, idx) => (
          <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-800 bg-slate-900 group-[.is-active]:bg-slate-800 text-slate-500 group-[.is-active]:text-emerald-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              {event.type === 'info' && <Clock className="w-4 h-4 text-blue-400" />}
              {event.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400" />}
              {event.type === 'warning' && <AlertTriangle className="w-4 h-4 text-orange-400" />}
              {event.type === 'error' && <ShieldAlert className="w-4 h-4 text-rose-400" />}
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg border border-slate-800 bg-slate-900/50 shadow">
              <div className="flex items-center justify-between mb-1">
                <div className="font-bold text-slate-300 text-sm">{event.type.toUpperCase()}</div>
                <time className="font-mono text-xs text-slate-500">{event.time}</time>
              </div>
              <div className="text-slate-400 text-sm">{event.message}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
