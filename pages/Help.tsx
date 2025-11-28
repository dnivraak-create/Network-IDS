import React from 'react';
import { BookOpen, Cpu, Shield, AlertTriangle } from 'lucide-react';

const Help: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-slate-800">Project Documentation</h2>
        <p className="text-slate-500 text-lg">Network Intrusion Detection System (IDS) using Machine Learning</p>
      </header>

      <section className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-emerald-600" />
          <h3 className="text-xl font-bold text-slate-800">What is this project?</h3>
        </div>
        <p className="text-slate-600 leading-relaxed mb-4">
          This is an educational IDS designed to monitor network traffic in real-time. 
          It captures packets (simulated or real via Scapy) and uses a <strong>Random Forest Classifier</strong> (Machine Learning) 
          to identify malicious patterns.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <h4 className="font-semibold text-slate-800 mb-2">1. Data Capture</h4>
            <p className="text-sm text-slate-500">Extracts Source IP, Dest IP, Protocol, Length, and Port numbers.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <h4 className="font-semibold text-slate-800 mb-2">2. ML Analysis</h4>
            <p className="text-sm text-slate-500">A trained model classifies traffic as Normal, DoS, ARP Spoof, or Port Scan.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <h4 className="font-semibold text-slate-800 mb-2">3. Reporting</h4>
            <p className="text-sm text-slate-500">Visual dashboard alerts the admin immediately upon detection.</p>
          </div>
        </div>
      </section>

      <section className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-amber-500" />
          <h3 className="text-xl font-bold text-slate-800">Attack Types Detected</h3>
        </div>
        <div className="space-y-4">
          <div className="border-l-4 border-red-500 pl-4 py-1">
            <h4 className="font-bold text-slate-800">DoS (Denial of Service)</h4>
            <p className="text-slate-600 text-sm">Flooding a target with high traffic volume to exhaust resources. Detected by high packet frequency and small packet sizes.</p>
          </div>
          <div className="border-l-4 border-amber-500 pl-4 py-1">
            <h4 className="font-bold text-slate-800">ARP Spoofing</h4>
            <p className="text-slate-600 text-sm">Sending fake ARP messages to link the attacker's MAC address with a legitimate IP. Detected by ARP protocol anomalies.</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4 py-1">
            <h4 className="font-bold text-slate-800">Port Scanning</h4>
            <p className="text-slate-600 text-sm">Rapidly sending messages to different ports to find open vulnerabilities. Detected by sequential port access patterns.</p>
          </div>
        </div>
      </section>

      <section className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <Cpu className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-slate-800">How to Demonstrate (Viva Guide)</h3>
        </div>
        <ol className="list-decimal list-inside space-y-3 text-slate-600">
          <li>Start on the <strong>Dashboard</strong> to show the "Clean State".</li>
          <li>Navigate to <strong>Live Analysis</strong>.</li>
          <li>Click <strong>Start Capture</strong>. Select "DoS" or "Port Scan" from the dropdown to simulate attacks.</li>
          <li>Observe the real-time logs turning Red/Purple.</li>
          <li>Go to <strong>Visualizations</strong> to show the Pie Chart updating in real-time.</li>
          <li>Explain the ML Logic using this Help page.</li>
        </ol>
      </section>
    </div>
  );
};

export default Help;