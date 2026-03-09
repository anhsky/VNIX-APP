export type SystemState = 'NORMAL' | 'DETECTING' | 'DDOS';

export interface NodeStatus {
  id: string;
  name: string;
  region: string;
  status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
  load: number;
  capacity: string;
  cpu: number;
  ram: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Operator';
  lastLogin: string;
  status: 'Active' | 'Inactive';
}

export interface Incident {
  id: string;
  title: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'Investigating' | 'Resolved';
  timestamp: string;
  assignedTo: string;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  status: 'Active' | 'Revoked';
}

export interface ProtocolData {
  name: string;
  value: number;
  color: string;
}

export interface TargetInfo {
  domain: string;
  ip: string;
  location: string;
  status: string;
  isp?: string;
  latency?: number;
  ssl?: 'Valid' | 'Invalid' | 'N/A';
  securityScore?: number;
}

export interface AppNotification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'critical';
  timestamp: number;
}

export interface BlockedIP {
  id: string;
  ip: string;
  reason: string;
  timestamp: number;
}
