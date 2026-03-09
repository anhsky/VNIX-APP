import React, { useState, useEffect } from 'react';
import { Shield, Globe, Plus, Trash2, Edit2, CheckCircle2, XCircle, Cloud, CloudOff, Save, RefreshCw, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db, DnsRecord } from '../lib/db';

export function DnsProtection() {
  const [records, setRecords] = useState<DnsRecord[]>([]);
  const [securitySettings, setSecuritySettings] = useState({
    dnssec: true,
    cnameFlattening: false,
    alwaysHttps: true,
    hsts: false
  });

  useEffect(() => {
    setRecords(db.getDnsRecords());
    const savedSettings = localStorage.getItem('vnix_dns_security');
    if (savedSettings) {
      setSecuritySettings(JSON.parse(savedSettings));
    }
  }, []);

  const toggleSetting = (key: keyof typeof securitySettings) => {
    const updated = { ...securitySettings, [key]: !securitySettings[key] };
    setSecuritySettings(updated);
    localStorage.setItem('vnix_dns_security', JSON.stringify(updated));
  };

  const toggleProxy = (id: string) => {
    const updated = records.map(r => r.id === id ? { ...r, proxied: !r.proxied } : r);
    setRecords(updated);
    db.setDnsRecords(updated);
  };

  const removeRecord = (id: string) => {
    if (confirm('Are you sure you want to delete this DNS record?')) {
      const updated = records.filter(r => r.id !== id);
      setRecords(updated);
      db.setDnsRecords(updated);
    }
  };

  const handleAddRecord = () => {
    const type = prompt('Enter record type (A, AAAA, CNAME, MX, TXT):', 'A') as any;
    if (!['A', 'AAAA', 'CNAME', 'MX', 'TXT'].includes(type)) return;
    const name = prompt('Enter name (e.g., @ or www):', '@');
    if (!name) return;
    const content = prompt('Enter content (e.g., IP address or domain):');
    if (!content) return;

    const newRecord: DnsRecord = {
      id: Date.now().toString(),
      type,
      name,
      content,
      proxied: type !== 'MX' && type !== 'TXT', // Default proxy on for A/CNAME
      ttl: 'Auto'
    };

    const updated = [...records, newRecord];
    setRecords(updated);
    db.setDnsRecords(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-400" />
            DNS Management & Protection
          </h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Manage DNS records and VNIX Anycast Proxy</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-700 transition-colors">
            <RefreshCw className="w-3.5 h-3.5" />
            SCAN RECORDS
          </button>
          <button 
            onClick={handleAddRecord}
            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500 text-white rounded-lg text-xs font-bold hover:bg-indigo-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            ADD RECORD
          </button>
        </div>
      </div>

      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/50 border-b border-slate-800">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Type</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Name</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Content</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Proxy Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">TTL</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {records.map(record => (
              <tr key={record.id} className="hover:bg-slate-800/30 transition-colors group">
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded text-[10px] font-bold">
                    {record.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs font-bold text-slate-300">{record.name}</td>
                <td className="px-6 py-4 text-xs font-mono text-slate-400">{record.content}</td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => toggleProxy(record.id)}
                    className={`flex items-center gap-2 px-2 py-1 rounded-lg transition-all ${
                      record.proxied 
                        ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30' 
                        : 'bg-slate-800 text-slate-500 border border-slate-700'
                    }`}
                  >
                    {record.proxied ? <Cloud className="w-3.5 h-3.5" /> : <CloudOff className="w-3.5 h-3.5" />}
                    <span className="text-[10px] font-bold uppercase">{record.proxied ? 'Proxied' : 'DNS Only'}</span>
                  </button>
                </td>
                <td className="px-6 py-4 text-[10px] text-slate-500 font-bold">{record.ttl}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-slate-500 hover:text-indigo-400 transition-colors">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => removeRecord(record.id)} className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest">
            <Shield className="w-4 h-4" />
            DNS Security
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
              <div>
                <div className="text-xs font-bold text-slate-200">DNSSEC</div>
                <div className="text-[10px] text-slate-500">Protect against DNS spoofing</div>
              </div>
              <button 
                onClick={() => toggleSetting('dnssec')}
                className={`w-10 h-5 rounded-full relative transition-colors ${securitySettings.dnssec ? 'bg-indigo-500' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${securitySettings.dnssec ? 'right-1' : 'left-1'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
              <div>
                <div className="text-xs font-bold text-slate-200">CNAME Flattening</div>
                <div className="text-[10px] text-slate-500">Flatten CNAME at the root</div>
              </div>
              <button 
                onClick={() => toggleSetting('cnameFlattening')}
                className={`w-10 h-5 rounded-full relative transition-colors ${securitySettings.cnameFlattening ? 'bg-indigo-500' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${securitySettings.cnameFlattening ? 'right-1' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest">
            <Lock className="w-4 h-4" />
            SSL/TLS Edge
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
              <div>
                <div className="text-xs font-bold text-slate-200">Always Use HTTPS</div>
                <div className="text-[10px] text-slate-500">Redirect HTTP to HTTPS</div>
              </div>
              <button 
                onClick={() => toggleSetting('alwaysHttps')}
                className={`w-10 h-5 rounded-full relative transition-colors ${securitySettings.alwaysHttps ? 'bg-indigo-500' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${securitySettings.alwaysHttps ? 'right-1' : 'left-1'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
              <div>
                <div className="text-xs font-bold text-slate-200">HSTS</div>
                <div className="text-[10px] text-slate-500">Strict Transport Security</div>
              </div>
              <button 
                onClick={() => toggleSetting('hsts')}
                className={`w-10 h-5 rounded-full relative transition-colors ${securitySettings.hsts ? 'bg-indigo-500' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${securitySettings.hsts ? 'right-1' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
