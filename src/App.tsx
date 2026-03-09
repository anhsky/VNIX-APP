/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Shield, Settings, LayoutDashboard, Globe, LogOut, Zap } from 'lucide-react';
import { SystemState, TargetInfo, AppNotification, BlockedIP } from './types';
import { NetworkGraph } from './components/NetworkGraph';
import { DashboardMetrics } from './components/DashboardMetrics';
import { XdpPipeline } from './components/XdpPipeline';
import { LiveTrafficChart } from './components/LiveTrafficChart';
import { TargetPanel } from './components/TargetPanel';
import { AttackLog } from './components/AttackLog';
import { ProtocolDistribution } from './components/ProtocolDistribution';
import { TopCountries } from './components/TopCountries';
import { SystemCapacity } from './components/SystemCapacity';
import { ThreatTicker } from './components/ThreatTicker';
import { PacketInspector } from './components/PacketInspector';
import { AnycastNodes } from './components/AnycastNodes';
import { BotnetSignatures } from './components/BotnetSignatures';
import { MitigationMatrix } from './components/MitigationMatrix';
import { ThreatRadar } from './components/ThreatRadar';
import { AnomalyScore } from './components/AnomalyScore';
import { WafRules } from './components/WafRules';
import { SecurityRules } from './components/SecurityRules';
import { PerformanceOptimization } from './components/PerformanceOptimization';
import { DnsProtection } from './components/DnsProtection';
import { NotificationBanner } from './components/NotificationBanner';
import { AIChat } from './components/AIChat';
import { GlobalNetwork } from './components/GlobalNetwork';
import { ThreatFeed } from './components/ThreatFeed';
import { SecurityAudit } from './components/SecurityAudit';
import { DarkWebMonitor } from './components/DarkWebMonitor';
import { SystemLogs } from './components/SystemLogs';
import { GeoMap } from './components/GeoMap';
import { BgpRouteViewer } from './components/BgpRouteViewer';
import { SslManager } from './components/SslManager';
import { ComplianceMonitor } from './components/ComplianceMonitor';
import { TrafficForecast } from './components/TrafficForecast';
import { DdosPlaybooks } from './components/DdosPlaybooks';
import { IpReputation } from './components/IpReputation';
import { SecurityScoreHistory } from './components/SecurityScoreHistory';
import { PacketCapture } from './components/PacketCapture';
import { NetworkTopology } from './components/NetworkTopology';
import { DomainIntelligence } from './components/DomainIntelligence';
import { DnsSecurityWidget } from './components/DnsSecurityWidget';
import { ApiSecurity } from './components/ApiSecurity';
import { IncidentTimeline } from './components/IncidentTimeline';
import { PayloadAnalyzer } from './components/PayloadAnalyzer';
import { CostSavings } from './components/CostSavings';
import { NodeStatus } from './types';

export default function App() {
  const [systemState, setSystemState] = useState<SystemState>('NORMAL');
  const [targetInfo, setTargetInfo] = useState<TargetInfo | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [view, setView] = useState<'dashboard' | 'security' | 'performance' | 'dns' | 'threat' | 'network'>('dashboard');
  const [lang, setLang] = useState<'en' | 'vi'>('en');
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [blockedIPs, setBlockedIPs] = useState<BlockedIP[]>([]);
  const [globalNodes, setGlobalNodes] = useState<NodeStatus[]>([
    { id: '1', name: 'VNIX-HAN-01', region: 'Hanoi, VN', status: 'ONLINE', load: 12, capacity: '2.5 Tbps', cpu: 15, ram: 22 },
    { id: '2', name: 'VNIX-SGN-01', region: 'HCMC, VN', status: 'ONLINE', load: 18, capacity: '2.5 Tbps', cpu: 18, ram: 25 },
    { id: '3', name: 'VNIX-SIN-01', region: 'Singapore', status: 'ONLINE', load: 45, capacity: '1.5 Tbps', cpu: 42, ram: 38 },
    { id: '4', name: 'VNIX-TYO-01', region: 'Tokyo, JP', status: 'ONLINE', load: 32, capacity: '1.5 Tbps', cpu: 30, ram: 35 },
    { id: '5', name: 'VNIX-HKG-01', region: 'Hong Kong', status: 'ONLINE', load: 28, capacity: '1.5 Tbps', cpu: 25, ram: 30 },
    { id: '6', name: 'VNIX-LAX-01', region: 'Los Angeles, US', status: 'ONLINE', load: 55, capacity: '1.0 Tbps', cpu: 58, ram: 62 },
    { id: '7', name: 'VNIX-FRA-01', region: 'Frankfurt, DE', status: 'ONLINE', load: 22, capacity: '1.0 Tbps', cpu: 20, ram: 28 },
    { id: '8', name: 'VNIX-LHR-01', region: 'London, UK', status: 'ONLINE', load: 15, capacity: '1.0 Tbps', cpu: 14, ram: 20 },
  ]);

  useEffect(() => {
    // Fetch initial state from DB
    fetch('/api/state').then(res => res.json()).then(data => {
      if (data.state) setSystemState(data.state);
    }).catch(err => console.error('Failed to fetch state:', err));

    fetch('/api/target').then(res => res.json()).then(data => {
      if (data && data.domain) setTargetInfo(data);
    }).catch(err => console.error('Failed to fetch target:', err));
  }, []);

  useEffect(() => {
    if (systemState === 'DDOS') {
      setGlobalNodes(prev => prev.map(node => ({
        ...node,
        load: Math.min(98, node.load + Math.floor(Math.random() * 40) + 20),
        cpu: Math.min(99, node.cpu + Math.floor(Math.random() * 30) + 10),
        ram: Math.min(95, node.ram + Math.floor(Math.random() * 10)),
        status: Math.random() > 0.8 ? 'DEGRADED' : 'ONLINE'
      })));
    } else {
      setGlobalNodes(prev => prev.map(node => ({
        ...node,
        load: Math.max(10, node.load - Math.floor(Math.random() * 5)),
        cpu: Math.max(5, node.cpu - Math.floor(Math.random() * 3)),
        ram: Math.max(15, node.ram - Math.floor(Math.random() * 2)),
        status: 'ONLINE'
      })));
    }
  }, [systemState]);

  // Wrappers to update React state locally and sync with DB
  const updateSystemState = async (newState: SystemState) => {
    setSystemState(newState);
    try {
      await fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: newState })
      });
    } catch (error) {
      console.error('Failed to update state in DB:', error);
    }
  };

  const addNotification = (notif: AppNotification) => {
    setNotifications(prev => [notif, ...prev]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const addBlockedIP = (ip: BlockedIP) => {
    setBlockedIPs(prev => [ip, ...prev]);
  };

  const removeBlockedIP = (id: string) => {
    setBlockedIPs(prev => prev.filter(i => i.id !== id));
  };

  const t = {
    en: {
      title: 'VNIX ANYCAST SCRUBBING CENTER',
      subtitle: 'Real-time DDoS Mitigation Dashboard',
      dashboard: 'Dashboard',
      security: 'Security & WAF',
      performance: 'Performance',
      dns: 'DNS & Proxy',
      threat: 'Threat Intel',
      network: 'Network',
    },
    vi: {
      title: 'TRUNG TÂM LỌC VNIX ANYCAST',
      subtitle: 'Hệ thống giám sát & giảm thiểu DDoS thời gian thực',
      dashboard: 'Bảng Điều Khiển',
      security: 'Bảo Mật & WAF',
      performance: 'Hiệu Suất',
      dns: 'DNS & Proxy',
      threat: 'Tình Báo Mối Đe Dọa',
      network: 'Mạng Lưới',
    }
  }[lang];

  const handleAnalyze = async (domain: string) => {
    setIsAnalyzing(true);
    updateSystemState('NORMAL');
    
    const cleanDomain = domain.replace(/^https?:\/\//, '').split('/')[0].toLowerCase();

    // Simple hash to ensure different domains show different metrics
    const getSeed = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
      }
      return Math.abs(hash);
    };
    const seed = getSeed(cleanDomain);

    try {
      // Use a single, reliable API
      const response = await fetch(`https://ipapi.co/${cleanDomain}/json/`);
      const data = await response.json();

      if (data && !data.error) {
        const newTarget: TargetInfo = {
          domain: cleanDomain,
          ip: data.ip || `103.${seed % 255}.${(seed * 7) % 255}.1`,
          location: `${data.city || 'Anycast'}, ${data.country_name || 'Global'}`,
          status: 'Protected',
          isp: data.org || 'VNIX Anycast Network',
          latency: (seed % 30) + 10,
          ssl: 'Valid',
          securityScore: 90 + (seed % 10)
        };
        setTargetInfo(newTarget);
        fetch('/api/target', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTarget)
        }).catch(console.error);
      } else {
        throw new Error('API Error');
      }
    } catch (error) {
      // Simple, predictable fallback that ensures variety
      const newTarget: TargetInfo = {
        domain: cleanDomain,
        ip: `103.141.${seed % 255}.${seed % 100}`,
        location: seed % 2 === 0 ? 'Hanoi, Vietnam' : 'Ho Chi Minh City, Vietnam',
        status: 'Protected',
        isp: 'VNIX Scrubbing Center',
        latency: (seed % 20) + 5,
        ssl: 'Valid',
        securityScore: 95 + (seed % 5)
      };
      setTargetInfo(newTarget);
      fetch('/api/target', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTarget)
      }).catch(console.error);
    } finally {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-slate-300 font-mono selection:bg-emerald-500/30 overflow-x-hidden relative">
      {/* Background patterns */}
      <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-[#0a0e17] via-transparent to-[#0a0e17] pointer-events-none"></div>
      
      {/* Scanline effect */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <div className="w-full h-8 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent animate-scanline"></div>
      </div>

      {/* Header / Controls */}
      <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/50 p-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Thay src bằng đường dẫn logo của bạn (ví dụ: /logo.png) */}
            <img 
              src="logo.png" 
              alt="Logo" 
              className="w-10 h-10 rounded-lg border border-slate-700/50"
              referrerPolicy="no-referrer"
            />
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                {t.title}
              </h1>
              <p className="text-xs text-slate-500 mt-1">{t.subtitle}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold bg-slate-900 border border-slate-700 hover:bg-slate-800 transition-colors"
            >
              <Globe className="w-4 h-4 text-indigo-400" />
              {lang === 'en' ? 'VIE' : 'ENG'}
            </button>

            {/* View Toggle */}
            <div className="flex items-center bg-slate-900/50 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setView('dashboard')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${
                  view === 'dashboard' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/50' : 'text-slate-500 hover:text-slate-300 border border-transparent'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                {t.dashboard}
              </button>
              <button
                onClick={() => setView('security')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${
                  view === 'security' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/50' : 'text-slate-500 hover:text-slate-300 border border-transparent'
                }`}
              >
                <Shield className="w-4 h-4" />
                {t.security}
              </button>
              <button
                onClick={() => setView('performance')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${
                  view === 'performance' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/50' : 'text-slate-500 hover:text-slate-300 border border-transparent'
                }`}
              >
                <Zap className="w-4 h-4" />
                {t.performance}
              </button>
              <button
                onClick={() => setView('dns')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${
                  view === 'dns' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/50' : 'text-slate-500 hover:text-slate-300 border border-transparent'
                }`}
              >
                <Globe className="w-4 h-4" />
                {t.dns}
              </button>
              <button
                onClick={() => setView('threat')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${
                  view === 'threat' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/50' : 'text-slate-500 hover:text-slate-300 border border-transparent'
                }`}
              >
                <Shield className="w-4 h-4" />
                {t.threat}
              </button>
              <button
                onClick={() => setView('network')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${
                  view === 'network' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/50' : 'text-slate-500 hover:text-slate-300 border border-transparent'
                }`}
              >
                <Globe className="w-4 h-4" />
                {t.network}
              </button>
            </div>

            {/* State Toggle (Only visible in dashboard) */}
            {view === 'dashboard' && (
              <div className="flex items-center gap-2 bg-slate-900/50 p-1 rounded-lg border border-slate-800">
                {(['NORMAL', 'DETECTING', 'DDOS'] as SystemState[]).map((state) => (
                  <button
                    key={state}
                    onClick={() => updateSystemState(state)}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold tracking-wider transition-all ${
                      systemState === state 
                        ? state === 'NORMAL' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                          : state === 'DETECTING' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/50'
                        : 'text-slate-500 hover:text-slate-300 border border-transparent'
                    }`}
                  >
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      state === 'NORMAL' ? 'bg-emerald-400' : state === 'DETECTING' ? 'bg-orange-400' : 'bg-rose-400'
                    } ${systemState === state ? 'animate-pulse' : 'opacity-50'}`}></span>
                    {state}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <ThreatTicker lang={lang} />

      <main className="max-w-[1600px] mx-auto p-4 md:p-6 space-y-8">
        {view === 'security' ? (
          <div className="space-y-8">
            <SecurityRules />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ApiSecurity systemState={systemState} />
              <PayloadAnalyzer systemState={systemState} />
            </div>
          </div>
        ) : view === 'performance' ? (
          <div className="space-y-8">
            <PerformanceOptimization />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CostSavings systemState={systemState} />
            </div>
          </div>
        ) : view === 'dns' ? (
          <DnsProtection />
        ) : view === 'threat' ? (
          <div className="space-y-8">
            <DomainIntelligence />
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <div className="xl:col-span-3">
                <ThreatFeed />
              </div>
              <div className="xl:col-span-1">
                <DarkWebMonitor />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <DdosPlaybooks />
              <IpReputation />
              <SecurityScoreHistory />
              <PacketCapture />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <BotnetSignatures systemState={systemState} lang={lang} />
              </div>
              <div className="lg:col-span-1">
                <MitigationMatrix systemState={systemState} lang={lang} />
              </div>
              <div className="lg:col-span-1">
                <IncidentTimeline systemState={systemState} />
              </div>
            </div>
            <div className="grid grid-cols-1">
              <ComplianceMonitor />
            </div>
          </div>
        ) : view === 'network' ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <div className="xl:col-span-3">
                <GlobalNetwork nodes={globalNodes} />
              </div>
              <div className="xl:col-span-1">
                <AnycastNodes systemState={systemState} lang={lang} />
              </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <GeoMap />
              </div>
              <div className="xl:col-span-1">
                <DnsSecurityWidget />
              </div>
            </div>
            <TrafficForecast />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <BgpRouteViewer />
              </div>
              <div className="xl:col-span-1 space-y-6">
                <SslManager />
              </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-1">
                <NetworkTopology />
              </div>
              <div className="xl:col-span-2">
                <section className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-2 md:p-6 relative overflow-hidden h-full">
                   <NetworkGraph systemState={systemState} targetInfo={targetInfo} />
                </section>
              </div>
            </div>
          </div>
        ) : (
          <>
            <NotificationBanner 
              notifications={notifications} 
              onDismiss={removeNotification} 
            />

            {/* Target Analysis Panel */}
            <TargetPanel 
              onAnalyze={handleAnalyze} 
              targetInfo={targetInfo} 
              isAnalyzing={isAnalyzing} 
              systemState={systemState}
              setSystemState={updateSystemState}
            />

            {/* Security Audit Section */}
            <SecurityAudit target={targetInfo} />

            {/* Live Chart Section & Protocol Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-2">
                <LiveTrafficChart systemState={systemState} />
              </div>
              <div className="lg:col-span-1">
                <ProtocolDistribution systemState={systemState} />
              </div>
              <div className="lg:col-span-1">
                <TopCountries systemState={systemState} />
              </div>
            </div>

            {/* Metrics Section */}
            <DashboardMetrics systemState={systemState} />

            {/* AI & Radar Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <AnomalyScore systemState={systemState} lang={lang} />
              </div>
              <div className="md:col-span-1">
                <ThreatRadar systemState={systemState} lang={lang} />
              </div>
              <div className="md:col-span-1">
                <WafRules systemState={systemState} lang={lang} />
              </div>
            </div>

            {/* XDP Pipeline & Attack Log */}
            <div className="space-y-8">
              <XdpPipeline systemState={systemState} />
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-2">
                  <AttackLog systemState={systemState} blockedIPs={blockedIPs} />
                </div>
                <div className="lg:col-span-1">
                  <PacketInspector systemState={systemState} lang={lang} />
                </div>
                <div className="lg:col-span-1">
                  <SystemCapacity systemState={systemState} />
                </div>
              </div>
            </div>

            {/* System Logs Section */}
            <SystemLogs />
          </>
        )}
      </main>
      <AIChat />
    </div>
  );
}
