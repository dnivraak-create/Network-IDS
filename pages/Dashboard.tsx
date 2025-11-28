import React from 'react';
import { IDSStats, PacketData, AttackType } from '../types';
import { ShieldAlert, Activity, CheckCircle, Database } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  stats: IDSStats;
  recentPackets: PacketData[];
}

const Dashboard: React.FC<DashboardProps> = ({ stats, recentPackets }) => {
  const chartData = [
    { name: 'Normal', value: stats.normalCount, color: '#10b981' },
    { name: 'DoS', value: stats.dosCount, color: '#ef4444' },
    { name: 'ARP Spoof', value: stats.arpCount, color: '#f59e0b' },
    { name: 'Port Scan', value: stats.scanCount, color: '#8b5cf6' },
  ];

  const getBadgeColor = (type: AttackType) => {
    switch (type) {
      case AttackType.Normal: return 'bg-emerald-100 text-emerald-800';
      case AttackType.DoS: return 'bg-red-100 text-red-800';
      case AttackType.ArpSpoof: return 'bg-amber-100 text-amber-800';
      case AttackType.PortScan: return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Security Dashboard</h2>
        <p className="text-slate-500">Real-time network traffic analysis and anomaly detection</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Total Packets</p>
            <p className="text-2xl font-bold text-slate-800">{stats.totalPackets}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-lg">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Threats Detected</p>
            <p className="text-2xl font-bold text-slate-800">{stats.totalAlerts}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Normal Traffic</p>
            <p className="text-2xl font-bold text-slate-800">
              {stats.totalPackets > 0 ? ((stats.normalCount / stats.totalPackets) * 100).toFixed(1) : 0}%
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500">System Load</p>
            <p className="text-2xl font-bold text-slate-800">Active</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 lg:col-span-1">
          <h3 className="font-semibold text-slate-800 mb-4">Traffic Classification</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                <Tooltip />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                   {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Alerts Table */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-slate-800">Recent Traffic Analysis</h3>
            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">Live Feed</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Time</th>
                  <th className="px-4 py-3 font-medium">Source</th>
                  <th className="px-4 py-3 font-medium">Destination</th>
                  <th className="px-4 py-3 font-medium">Protocol</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Conf.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentPackets.slice(0, 7).map((packet) => (
                  <tr key={packet.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-600">{packet.timestamp}</td>
                    <td className="px-4 py-3 font-mono text-xs">{packet.src_ip}</td>
                    <td className="px-4 py-3 font-mono text-xs">{packet.dst_ip}</td>
                    <td className="px-4 py-3">{packet.protocol}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(packet.label)}`}>
                        {packet.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {(packet.confidence * 100).toFixed(0)}%
                    </td>
                  </tr>
                ))}
                {recentPackets.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                      No packets analyzed yet. Start capture to begin.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;