import React from 'react';
import { IDSStats, PacketData, AttackType } from '../types';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface VisualizationsProps {
  stats: IDSStats;
  packets: PacketData[];
}

const Visualizations: React.FC<VisualizationsProps> = ({ stats, packets }) => {
  // Prepare data for Pie Chart
  const pieData = [
    { name: 'Normal', value: stats.normalCount, color: '#10b981' },
    { name: 'DoS', value: stats.dosCount, color: '#ef4444' },
    { name: 'ARP Spoof', value: stats.arpCount, color: '#f59e0b' },
    { name: 'Port Scan', value: stats.scanCount, color: '#8b5cf6' },
  ].filter(d => d.value > 0);

  // Prepare data for Time Series
  // Group packets by minute (mock logic for demo)
  const timeData = packets.reduce((acc: any[], curr) => {
    const timeLabel = curr.timestamp;
    const existing = acc.find(item => item.time === timeLabel);
    if (existing) {
      existing.traffic += 1;
      if (curr.label !== AttackType.Normal) existing.alerts += 1;
    } else {
      acc.push({ 
        time: timeLabel, 
        traffic: 1, 
        alerts: curr.label !== AttackType.Normal ? 1 : 0 
      });
    }
    return acc;
  }, []).slice(-20); // Last 20 data points

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Visual Analytics</h2>
        <p className="text-slate-500">Deep dive into traffic patterns and attack vectors</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Attack Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-6">Attack Distribution</h3>
          <div className="h-80">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400">
                No data available yet
              </div>
            )}
          </div>
        </div>

        {/* Traffic Volume */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-6">Traffic Volume vs. Alerts</h3>
          <div className="h-80">
             {timeData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeData}>
                  <defs>
                    <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="traffic" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTraffic)" name="Total Packets" />
                  <Area type="monotone" dataKey="alerts" stroke="#ef4444" fillOpacity={1} fill="url(#colorAlerts)" name="Attacks" />
                </AreaChart>
              </ResponsiveContainer>
             ) : (
               <div className="h-full flex items-center justify-center text-slate-400">
                Waiting for traffic...
              </div>
             )}
          </div>
        </div>
        
      </div>

      {/* Top Talkers (Simplified) */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="font-semibold text-slate-800 mb-4">Top Suspicious Sources</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-2">Source IP</th>
                <th className="px-4 py-2">Activity Count</th>
                <th className="px-4 py-2">Primary Detection</th>
                <th className="px-4 py-2">Last Seen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {packets.filter(p => p.label !== AttackType.Normal).slice(-5).map(p => (
                 <tr key={p.id + 'sus'}>
                   <td className="px-4 py-2 font-mono text-red-600 font-medium">{p.src_ip}</td>
                   <td className="px-4 py-2">1</td>
                   <td className="px-4 py-2">{p.label}</td>
                   <td className="px-4 py-2 text-slate-500">{p.timestamp}</td>
                 </tr>
               ))}
               {packets.filter(p => p.label !== AttackType.Normal).length === 0 && (
                 <tr><td colSpan={4} className="p-4 text-center text-slate-400">No suspicious sources detected yet.</td></tr>
               )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Visualizations;