import React from 'react';
import { NodeStatus } from '../types';
import { motion } from 'motion/react';
import { Activity, Globe, Zap } from 'lucide-react';

interface Props {
  nodes: NodeStatus[];
}

export function GlobalNetwork({ nodes }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Globe className="w-4 h-4 text-indigo-400" />
          Global Anycast Nodes
        </h3>
        <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-wider">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            {nodes.filter(n => n.status === 'ONLINE').length} Online
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-500">Total Capacity: 12.5 Tbps</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-4 hover:border-indigo-500/30 transition-all group"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">{node.name}</h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-tight">{node.region}</p>
              </div>
              <div className={`px-2 py-0.5 rounded text-[9px] font-black tracking-tighter ${
                node.status === 'ONLINE' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                node.status === 'DEGRADED' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}>
                {node.status}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-slate-500 uppercase">Load Factor</span>
                  <span className={node.load > 80 ? 'text-rose-400' : 'text-slate-300'}>{node.load}%</span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${node.load}%` }}
                    className={`h-full ${
                      node.load > 80 ? 'bg-rose-500' : 
                      node.load > 50 ? 'bg-amber-500' : 
                      'bg-indigo-500'
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span className="text-[10px] font-mono text-slate-400">{node.capacity}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-indigo-400" />
                  <span className="text-[10px] font-mono text-slate-400">{(node.load * 12.4).toFixed(1)} Gbps</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
