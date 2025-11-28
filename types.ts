export enum AttackType {
  Normal = 'Normal',
  DoS = 'DoS',
  ArpSpoof = 'ARP Spoof',
  PortScan = 'Port Scan'
}

export interface PacketData {
  id: number;
  timestamp: string;
  src_ip: string;
  dst_ip: string;
  protocol: 'TCP' | 'UDP' | 'ICMP' | 'ARP';
  length: number;
  label: AttackType;
  confidence: number;
}

export interface IDSStats {
  totalPackets: number;
  totalAlerts: number;
  normalCount: number;
  dosCount: number;
  arpCount: number;
  scanCount: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface TimeSeriesPoint {
  time: string;
  packets: number;
  alerts: number;
}