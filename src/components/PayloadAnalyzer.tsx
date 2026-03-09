import { useState, useEffect } from 'react';
import { Terminal, FileCode, AlertOctagon } from 'lucide-react';
import { SystemState } from '../types';

export function PayloadAnalyzer({ systemState }: { systemState: SystemState }) {
  const [payloads, setPayloads] = useState([
    { id: 'pkt-1', hex: '47 45 54 20 2f 20 48 54 54 50 2f 31 2e 31 0d 0a 48 6f 73 74 3a 20 65 78 61 6d 70 6c 65 2e 63 6f 6d', ascii: 'GET / HTTP/1.1..Host: example.com', threat: 'Low' },
    { id: 'pkt-2', hex: '50 4f 53 54 20 2f 61 70 69 2f 6c 6f 67 69 6e 20 48 54 54 50 2f 31 2e 31 0d 0a 43 6f 6e 74 65 6e 74', ascii: 'POST /api/login HTTP/1.1..Content', threat: 'Low' },
  ]);

  useEffect(() => {
    if (systemState === 'DDOS') {
      setPayloads([
        { id: 'pkt-3', hex: '53 59 4e 20 46 4c 4f 4f 44 20 50 41 59 4c 4f 41 44 20 44 45 54 45 43 54 45 44 20 21 21 21 21 21 21', ascii: 'SYN FLOOD PAYLOAD DETECTED !!!!!!', threat: 'Critical' },
        { id: 'pkt-4', hex: '55 44 50 20 41 4d 50 4c 49 46 49 43 41 54 49 4f 4e 20 50 41 43 4b 45 54 20 44 52 4f 50 50 45 44', ascii: 'UDP AMPLIFICATION PACKET DROPPED', threat: 'High' },
        ...payloads.slice(0, 2)
      ]);
    }
  }, [systemState]);

  return (
    <div className="bg-slate-900/50 border border-slate-800/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <Terminal className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Deep Packet Inspection</h3>
            <p className="text-xs text-slate-400">Hex dump & payload analysis</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {payloads.map((pkt, idx) => (
          <div key={idx} className="p-4 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-indigo-400 font-bold">{pkt.id}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                pkt.threat === 'Critical' ? 'bg-rose-500/20 text-rose-400' :
                pkt.threat === 'High' ? 'bg-orange-500/20 text-orange-400' :
                'bg-emerald-500/20 text-emerald-400'
              }`}>
                {pkt.threat}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-slate-500 mb-1">HEX DUMP</div>
                <div className="text-slate-300 break-all leading-relaxed">{pkt.hex}</div>
              </div>
              <div>
                <div className="text-slate-500 mb-1">ASCII</div>
                <div className="text-emerald-400/80 break-all leading-relaxed">{pkt.ascii}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
