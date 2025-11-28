import React, { useState, useEffect } from 'react';
import { Play, Square, Upload, Wifi } from 'lucide-react';
import { generateSimulatedPacket } from '../services/simulation';
import { PacketData } from '../types';

interface LiveAnalysisProps {
  isCapturing: boolean;
  setIsCapturing: (val: boolean) => void;
  onPacketReceived: (packet: PacketData) => void;
  packets: PacketData[];
}

const LiveAnalysis: React.FC<LiveAnalysisProps> = ({ 
  isCapturing, 
  setIsCapturing, 
  onPacketReceived,
  packets 
}) => {
  const [simulationMode, setSimulationMode] = useState<'mixed' | 'dos' | 'scan'>('mixed');

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isCapturing) {
      interval = setInterval(() => {
        // In a real app, this would fetch from http://localhost:8000/stats or similar
        // For this demo/viva, we use the client-side generator to ensure stability
        const newPacket = generateSimulatedPacket(simulationMode);
        onPacketReceived(newPacket);
      }, 800); // New packet every 800ms
    }
    return () => clearInterval(interval);
  }, [isCapturing, simulationMode, onPacketReceived]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Basic mockup for file upload - in real backend, POST this file
    if (e.target.files && e.target.files[0]) {
      alert(`File ${e.target.files[0].name} ready for analysis. (Check README for backend integration)`);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Traffic Analysis</h2>
        <p className="text-slate-500">Capture live traffic or upload PCAP files for ML inspection</p>
      </header>

      {/* Control Panel */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex gap-4">
            {!isCapturing ? (
              <button
                onClick={() => setIsCapturing(true)}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                <Play className="w-4 h-4" /> Start Live Capture
              </button>
            ) : (
              <button
                onClick={() => setIsCapturing(false)}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                <Square className="w-4 h-4 fill-current" /> Stop Capture
              </button>
            )}
            
            <div className="relative">
              <input 
                type="file" 
                id="pcap-upload" 
                className="hidden" 
                accept=".csv,.pcap"
                onChange={handleFileUpload}
              />
              <label 
                htmlFor="pcap-upload"
                className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <Upload className="w-4 h-4" /> Upload PCAP/CSV
              </label>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">Simulation Scenario:</span>
            <select 
              value={simulationMode}
              onChange={(e) => setSimulationMode(e.target.value as any)}
              className="bg-slate-100 border-none text-sm rounded-md px-3 py-2 text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="mixed">Mixed Traffic</option>
              <option value="dos">DoS Attack</option>
              <option value="scan">Port Scan</option>
            </select>
          </div>
        </div>

        {isCapturing && (
          <div className="mt-4 flex items-center gap-2 text-emerald-600 animate-pulse text-sm">
            <Wifi className="w-4 h-4" />
            <span>Capturing network packets... Analysis Model (Random Forest) Active</span>
          </div>
        )}
      </div>

      {/* Live Feed */}
      <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800">
        <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex justify-between items-center">
          <h3 className="text-slate-200 font-mono text-sm">Terminal Output / Log</h3>
          <span className="text-xs text-slate-400">Showing last 15 packets</span>
        </div>
        <div className="p-4 font-mono text-sm h-96 overflow-y-auto space-y-1">
          {packets.length === 0 && (
             <div className="text-slate-500 italic">Waiting for capture to start...</div>
          )}
          {[...packets].reverse().map((pkt) => (
            <div key={pkt.id} className="flex gap-4 border-b border-slate-800/50 pb-1 mb-1">
              <span className="text-slate-500 w-24 shrink-0">[{pkt.timestamp}]</span>
              <span className="text-blue-400 w-16 shrink-0">{pkt.protocol}</span>
              <span className="text-slate-300 w-64 shrink-0">{pkt.src_ip} &rarr; {pkt.dst_ip}</span>
              <span className="text-slate-400 w-20 shrink-0">len:{pkt.length}</span>
              <span className={`font-bold ${
                pkt.label === 'Normal' ? 'text-emerald-500' : 
                pkt.label === 'DoS' ? 'text-red-500' :
                pkt.label === 'ARP Spoof' ? 'text-amber-500' : 'text-purple-500'
              }`}>
                {pkt.label === 'Normal' ? '✓ NORMAL' : `⚠ ${pkt.label.toUpperCase()}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveAnalysis;