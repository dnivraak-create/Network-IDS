import { AttackType, PacketData } from '../types';

// Generators for realistic-looking IP addresses
const getRandomIP = () => `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
const LAN_IP_PREFIX = '192.168.1.';
const getLanIP = () => `${LAN_IP_PREFIX}${Math.floor(Math.random() * 200) + 2}`;

let packetCounter = 1;

export const generateSimulatedPacket = (scenario: 'mixed' | 'dos' | 'scan' = 'mixed'): PacketData => {
  const rand = Math.random();
  const now = new Date();
  const timestamp = now.toLocaleTimeString();

  let type = AttackType.Normal;
  let protocol: 'TCP' | 'UDP' | 'ICMP' | 'ARP' = 'TCP';
  let src = getRandomIP();
  let dst = getLanIP();
  let length = Math.floor(Math.random() * 1000) + 64;
  let confidence = 0.9 + (Math.random() * 0.09); // High confidence for simulation

  // Adjust probabilities based on scenario
  if (scenario === 'dos' && rand > 0.3) {
    type = AttackType.DoS;
  } else if (scenario === 'scan' && rand > 0.3) {
    type = AttackType.PortScan;
  } else if (scenario === 'mixed') {
    if (rand > 0.90) type = AttackType.DoS;
    else if (rand > 0.85) type = AttackType.ArpSpoof;
    else if (rand > 0.80) type = AttackType.PortScan;
  }

  // Feature Engineering Logic (Mocking the ML model)
  switch (type) {
    case AttackType.DoS:
      src = '10.0.0.55'; // Attacker IP
      dst = '192.168.1.100'; // Victim Server
      protocol = 'TCP';
      length = 64; // Small packets
      break;
    case AttackType.ArpSpoof:
      src = '192.168.1.105';
      dst = '192.168.1.1'; // Gateway
      protocol = 'ARP';
      length = 42;
      break;
    case AttackType.PortScan:
      src = '45.33.22.11';
      dst = '192.168.1.50';
      protocol = 'TCP';
      // Destination port would vary in real backend, here we just sim the packet
      break;
    case AttackType.Normal:
    default:
      if (Math.random() > 0.5) {
        src = getLanIP();
        dst = getRandomIP(); // Outbound traffic
      }
      protocol = Math.random() > 0.8 ? 'UDP' : 'TCP';
      confidence = 0.95 + (Math.random() * 0.04);
  }

  return {
    id: packetCounter++,
    timestamp,
    src_ip: src,
    dst_ip: dst,
    protocol,
    length,
    label: type,
    confidence
  };
};