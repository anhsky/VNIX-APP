import React, { useState } from 'react';
import { Shield, Plus, Trash2, Search, AlertTriangle, Lock, Globe, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

interface WafRule {
  id: string;
  name: string;
  action: 'Block' | 'Challenge' | 'Log' | 'Allow';
  expression: string;
  status: 'Active' | 'Inactive';
  hits: number;
}

export function SecurityRules() {
  const [rules, setRules] = useState<WafRule[]>([
    { id: '1', name: 'Block Bad Bots', action: 'Block', expression: '(http.user_agent contains "badbot")', status: 'Active', hits: 1420 },
    { id: '2', name: 'Challenge High Risk Countries', action: 'Challenge', expression: '(ip.geoip.country in {"CN" "RU" "KP"})', status: 'Active', hits: 8530 },
    { id: '3', name: 'Rate Limit API', action: 'Log', expression: '(http.request.uri.path matches "^/api/")', status: 'Active', hits: 450 },
  ]);

  const [botManagement, setBotManagement] = useState(true);
  const [ddosProtection, setDdosProtection] = useState(true);

  const handleAddRule = () => {
    const name = prompt('Enter rule name:');
    if (!name) return;
    const action = prompt('Enter action (Block/Challenge/Log/Allow):', 'Block') as any;
    if (!['Block', 'Challenge', 'Log', 'Allow'].includes(action)) return;
    const expression = prompt('Enter expression (e.g., ip.src == "1.2.3.4"):');
    if (!expression) return;

    setRules([{
      id: Date.now().toString(),
      name,
      action,
      expression,
      status: 'Active',
      hits: 0
    }, ...rules]);
  };

  const handleDeleteRule = (id: string) => {
    if (confirm('Are you sure you want to delete this rule?')) {
      setRules(rules.filter(r => r.id !== id));
    }
  };

  const toggleStatus = (id: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, status: r.status === 'Active' ? 'Inactive' : 'Active' } : r));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest">
            <Shield className="w-4 h-4" />
            Core Security Features
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
              <div>
                <div className="text-sm font-bold text-slate-200">Bot Management</div>
                <div className="text-[10px] text-slate-500 mt-1">Automatically challenge known bad bots and scrapers</div>
              </div>
              <button 
                onClick={() => setBotManagement(!botManagement)}
                className={`w-12 h-6 rounded-full relative transition-colors ${botManagement ? 'bg-indigo-500' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${botManagement ? 'right-1' : 'left-1'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
              <div>
                <div className="text-sm font-bold text-slate-200">DDoS Protection (L7)</div>
                <div className="text-[10px] text-slate-500 mt-1">Mitigate HTTP flood attacks automatically</div>
              </div>
              <button 
                onClick={() => setDdosProtection(!ddosProtection)}
                className={`w-12 h-6 rounded-full relative transition-colors ${ddosProtection ? 'bg-indigo-500' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${ddosProtection ? 'right-1' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest">
            <Lock className="w-4 h-4" />
            Security Level
          </div>
          <div className="grid grid-cols-2 gap-3">
            {['Essentially Off', 'Low', 'Medium', 'High', 'Under Attack'].map((level, i) => (
              <button 
                key={level}
                className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                  i === 2 
                    ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400' 
                    : 'bg-slate-900/60 border-slate-800 text-slate-500 hover:bg-slate-800'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2">
              <Filter className="w-4 h-4 text-indigo-400" />
              Custom WAF Rules
            </h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Define custom firewall rules for incoming traffic</p>
          </div>
          <button 
            onClick={handleAddRule}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg text-xs font-bold hover:bg-indigo-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            CREATE RULE
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/50 border-b border-slate-800">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Rule Name</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Action</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Expression</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Hits (24h)</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Status / Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {rules.map(rule => (
                <tr key={rule.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4 text-xs font-bold text-slate-300">{rule.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold border ${
                      rule.action === 'Block' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                      rule.action === 'Challenge' ? 'bg-orange-500/10 text-orange-400 border-orange-500/30' :
                      rule.action === 'Allow' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                      'bg-slate-500/10 text-slate-400 border-slate-500/30'
                    }`}>
                      {rule.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[10px] font-mono text-slate-400 max-w-[200px] truncate" title={rule.expression}>
                    {rule.expression}
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-300">{rule.hits.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button 
                        onClick={() => toggleStatus(rule.id)}
                        className={`text-[10px] font-bold px-2 py-1 rounded-full transition-colors ${
                          rule.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {rule.status}
                      </button>
                      <button 
                        onClick={() => handleDeleteRule(rule.id)}
                        className="p-1.5 text-slate-600 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
