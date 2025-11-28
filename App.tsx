import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import LiveAnalysis from './pages/LiveAnalysis';
import Visualizations from './pages/Visualizations';
import Help from './pages/Help';
import { IDSStats, PacketData, AttackType } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isCapturing, setIsCapturing] = useState(false);
  const [packets, setPackets] = useState<PacketData[]>([]);
  
  // State for stats
  const [stats, setStats] = useState<IDSStats>({
    totalPackets: 0,
    totalAlerts: 0,
    normalCount: 0,
    dosCount: 0,
    arpCount: 0,
    scanCount: 0
  });

  const handlePacketReceived = (packet: PacketData) => {
    setPackets(prev => {
      const updated = [...prev, packet];
      return updated.slice(-100); // Keep last 100 in memory
    });

    setStats(prev => ({
      totalPackets: prev.totalPackets + 1,
      totalAlerts: packet.label !== AttackType.Normal ? prev.totalAlerts + 1 : prev.totalAlerts,
      normalCount: packet.label === AttackType.Normal ? prev.normalCount + 1 : prev.normalCount,
      dosCount: packet.label === AttackType.DoS ? prev.dosCount + 1 : prev.dosCount,
      arpCount: packet.label === AttackType.ArpSpoof ? prev.arpCount + 1 : prev.arpCount,
      scanCount: packet.label === AttackType.PortScan ? prev.scanCount + 1 : prev.scanCount,
    }));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard stats={stats} recentPackets={packets.slice().reverse()} />;
      case 'live':
        return (
          <LiveAnalysis 
            isCapturing={isCapturing} 
            setIsCapturing={setIsCapturing} 
            onPacketReceived={handlePacketReceived}
            packets={packets}
          />
        );
      case 'visualizations':
        return <Visualizations stats={stats} packets={packets} />;
      case 'reports':
        return <div className="p-10 text-center text-slate-500">Report Generation Module (Export CSV implemented in backend)</div>;
      case 'help':
        return <Help />;
      default:
        return <Dashboard stats={stats} recentPackets={packets} />;
    }
  };

  return (
    <HashRouter>
      <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
        <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {renderPage()}
          </div>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;