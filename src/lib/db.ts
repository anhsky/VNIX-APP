import { User, Incident, ApiKey, BlockedIP } from '../types';

export interface DnsRecord {
  id: string;
  type: 'A' | 'AAAA' | 'CNAME' | 'MX' | 'TXT';
  name: string;
  content: string;
  proxied: boolean;
  ttl: string;
}

export interface SystemConfig {
  thresholds: {
    pps: number;
    bps: number;
    cps: number;
  };
  autoMitigation: boolean;
  xdpMode: 'STRICT' | 'BALANCED' | 'LEARNING';
  dataRetention: number;
  alertEmails: string;
}

const defaultUsers: User[] = [
  { id: '1', name: 'Admin', email: 'admin@vnix.site', role: 'Admin', lastLogin: '2024-03-07 10:00', status: 'Active' },
  { id: '2', name: 'Operator 1', email: 'op1@vnix.site', role: 'Operator', lastLogin: '2024-03-06 15:30', status: 'Active' },
];

const defaultDnsRecords: DnsRecord[] = [
  { id: '1', type: 'A', name: 'vnixanycast.site', content: '103.145.253.1', proxied: true, ttl: 'Auto' },
  { id: '2', type: 'CNAME', name: 'www', content: 'vnixanycast.site', proxied: true, ttl: 'Auto' },
  { id: '3', type: 'MX', name: 'vnixanycast.site', content: 'mail.vnixanycast.site', proxied: false, ttl: '1h' },
];

const defaultApiKeys: ApiKey[] = [
  { id: '1', name: 'Production API', key: 'vnix_live_xxxxxxxxxxxxxxxx', created: '2024-01-15', lastUsed: '2024-03-07 09:45', status: 'Active' },
  { id: '2', name: 'Development API', key: 'vnix_test_xxxxxxxxxxxxxxxx', created: '2024-02-20', lastUsed: '2024-03-01 14:20', status: 'Revoked' },
];

const defaultIncidents: Incident[] = [
  { id: 'INC-2024-001', title: 'UDP Flood on Node SG-1', severity: 'High', status: 'Resolved', timestamp: '2024-03-07 08:15', assignedTo: 'Admin' },
  { id: 'INC-2024-002', title: 'Unusual HTTP Traffic', severity: 'Medium', status: 'Investigating', timestamp: '2024-03-07 11:30', assignedTo: 'Operator 1' },
];

const defaultConfig: SystemConfig = {
  thresholds: { pps: 500000, bps: 10000, cps: 5000 },
  autoMitigation: true,
  xdpMode: 'BALANCED',
  dataRetention: 30,
  alertEmails: 'alerts@vnix.site'
};

const getStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setStorage = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error saving to local storage', e);
  }
};

export const db = {
  getUsers: () => getStorage<User[]>('vnix_users', defaultUsers),
  setUsers: (users: User[]) => setStorage('vnix_users', users),
  
  getDnsRecords: () => getStorage<DnsRecord[]>('vnix_dns_records', defaultDnsRecords),
  setDnsRecords: (records: DnsRecord[]) => setStorage('vnix_dns_records', records),
  
  getApiKeys: () => getStorage<ApiKey[]>('vnix_api_keys', defaultApiKeys),
  setApiKeys: (keys: ApiKey[]) => setStorage('vnix_api_keys', keys),
  
  getIncidents: () => getStorage<Incident[]>('vnix_incidents', defaultIncidents),
  setIncidents: (incidents: Incident[]) => setStorage('vnix_incidents', incidents),
  
  getConfig: () => getStorage<SystemConfig>('vnix_config', defaultConfig),
  setConfig: (config: SystemConfig) => setStorage('vnix_config', config),
};
