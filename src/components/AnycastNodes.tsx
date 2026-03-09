import React, { useState, useEffect } from 'react';
import { Server, Activity, ArrowUpRight, ArrowDownRight, Globe } from 'lucide-react';
import { SystemState } from '../types';

interface Node {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'mitigating' | 'offline';
  latency: number;
  load: number;
  bandwidth: number; // Gbps
}

export function AnycastNodes({ systemState, lang }: { systemState: SystemState, lang: 'en' | 'vi' }) {
  const [nodes, setNodes] = useState<Node[]>([
    { id: 'HAN', name: 'VNIX-HAN', location: 'Hanoi, VN', status: 'online', latency: 5, load: 12, bandwidth: 2.4 },
    { id: 'SGN', name: 'VNIX-SGN', location: 'Ho Chi Minh, VN', status: 'online', latency: 12, load: 18, bandwidth: 4.1 },
    { id: 'DAD', name: 'VNIX-DAD', location: 'Da Nang, VN', status: 'online', latency: 8, load: 9, bandwidth: 1.2 },
    { id: 'SIN', name: 'VNIX-SIN', location: 'Singapore', status: 'online', latency: 45, load: 25, bandwidth: 8.5 },
    { id: 'HKG', name: 'VNIX-HKG', location: 'Hong Kong', status: 'online', latency: 38, load: 22, bandwidth: 6.7 },
    { id: 'NRT', name: 'VNIX-NRT', location: 'Tokyo, JP', status: 'online', latency: 65, load: 15, bandwidth: 5.0 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => {
        let newStatus = node.status;
        let newLoad = node.load;
        let newBw = node.bandwidth;
        let newLatency = node.latency;

        if (systemState === 'DDOS') {
          // Simulate attack hitting international nodes harder first, then local
          if (['SIN', 'HKG', 'NRT'].includes(node.id)) {
            newStatus = 'mitigating';
            newLoad = Math.min(100, node.load + (Math.random() * 20));
            newBw = node.bandwidth + (Math.random() * 50);
            newLatency = node.latency + (Math.random() * 20);
          } else {
            newStatus = Math.random() > 0.5 ? 'mitigating' : 'online';
            newLoad = Math.min(100, node.load + (Math.random() * 10));
            newBw = node.bandwidth + (Math.random() * 10);
            newLatency = node.latency + (Math.random() * 5);
          }
        } else if (systemState === 'DETECTING') {
          newStatus = 'online';
          newLoad = Math.max(10, node.load + (Math.random() * 5 - 2));
          newBw = Math.max(1, node.bandwidth + (Math.random() * 2 - 1));
        } else {
          newStatus = 'online';
          newLoad = Math.max(5, node.load - (Math.random() * 5));
          newBw = Math.max(1, node.bandwidth - (Math.random() * 2));
          newLatency = Math.max(5, node.latency - (Math.random() * 2));
        }

        return {
          ...node,
          status: newStatus,
          load: newLoad,
          bandwidth: newBw,
          latency: newLatency
        };
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [systemState]);

  const t = {
    en: {
      title: 'Global Anycast Scrubbing Nodes',
      node: 'Node',
      status: 'Status',
      latency: 'Latency',
      load: 'Load',
      traffic: 'Traffic',
      online: 'Online',
      mitigating: 'Mitigating',
      offline: 'Offline'
    },
    vi: {
      title: 'Cụm Máy Chủ Lọc Anycast Toàn Cầu',
      node: 'Cụm',
      status: 'Trạng Thái',
      latency: 'Độ Trễ',
      load: 'Tải',
      traffic: 'Lưu Lượng',
      online: 'Trực Tuyến',
      mitigating: 'Đang Lọc',
      offline: 'Ngoại Tuyến'
    }
  }[lang];

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Globe className="w-5 h-5 text-indigo-400" />
        <h2 className="text-lg font-bold text-slate-200">{t.title}</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="text-xs text-slate-500 uppercase bg-slate-900/50 border-y border-slate-800">
            <tr>
              <th className="px-4 py-3 font-bold">{t.node}</th>
              <th className="px-4 py-3 font-bold">{t.status}</th>
              <th className="px-4 py-3 font-bold">{t.latency}</th>
              <th className="px-4 py-3 font-bold">{t.load}</th>
              <th className="px-4 py-3 font-bold">{t.traffic}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {nodes.map((node) => (
              <tr key={node.id} className="hover:bg-slate-800/20 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-800 rounded-lg">
                      <Server className="w-4 h-4 text-slate-300" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-200">{node.name}</div>
                      <div className="text-[10px] text-slate-500">{node.location}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                    node.status === 'online' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    node.status === 'mitigating' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20 animate-pulse' :
                    'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      node.status === 'online' ? 'bg-emerald-400' :
                      node.status === 'mitigating' ? 'bg-rose-400' :
                      'bg-slate-400'
                    }`}></span>
                    {t[node.status]}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono">
                  <div className="flex items-center gap-1">
                    {Math.round(node.latency)} ms
                    {node.latency > 50 && <ArrowUpRight className="w-3 h-3 text-rose-400" />}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${
                          node.load > 80 ? 'bg-rose-500' : node.load > 50 ? 'bg-orange-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.min(100, node.load)}%` }}
                      ></div>
                    </div>
                    <span className="font-mono text-xs">{Math.round(node.load)}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono font-bold text-slate-300">
                  {node.bandwidth.toFixed(1)} Gbps
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
