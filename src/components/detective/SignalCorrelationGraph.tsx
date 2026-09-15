import React, { useState } from 'react';
import { SignalStrength } from '../../types/patient';
import { useApp } from '../../context/AppContext';
import {
  Share2,
  Sparkles,
  CheckCircle2,
  Activity,
  HeartPulse,
  Pill,
  AlertTriangle,
  Zap,
} from 'lucide-react';

interface Node {
  id: string;
  step: number;
  label: string;
  category: string;
  strength: SignalStrength;
  description: string;
  connectedTo: string[];
  evidenceMetric: string;
}

export const SignalCorrelationGraph: React.FC = () => {
  const { theme } = useApp();
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-refill');

  const nodes: Node[] = [
    {
      id: 'node-pharmacy',
      step: 1,
      label: 'Pharmacy Dispense Stream',
      category: 'Data Feed',
      strength: 'Strong',
      description: 'Surescripts claims gateway confirms consecutive delays of 8 days (April) and 12 days (May).',
      evidenceMetric: 'Observed 42d cycle vs 30d baseline',
      connectedTo: ['node-refill'],
    },
    {
      id: 'node-refill',
      step: 2,
      label: 'Refill Interval Disruption',
      category: 'Pharmacy Signal',
      strength: 'Strong',
      description: 'Dispense interval elongated by +35% over historical 6-month norm.',
      evidenceMetric: '2 consecutive cycles with >8-day gap',
      connectedTo: ['node-pharmacy', 'node-availability'],
    },
    {
      id: 'node-availability',
      step: 3,
      label: 'Supply Depletion Window',
      category: 'Inferred State',
      strength: 'Moderate',
      description: 'Projected tablet availability exhausted prior to pickup, creating potential gap days.',
      evidenceMetric: 'Zero pills remaining at Day 30',
      connectedTo: ['node-refill', 'node-symptoms'],
    },
    {
      id: 'node-symptoms',
      step: 4,
      label: 'Symptom Spike (Post-Gap)',
      category: 'Patient Reported',
      strength: 'Moderate',
      description: 'Patient logged symptom intensity score of 7/10 precisely 48h after estimated supply exhaustion.',
      evidenceMetric: 'Occurs within 48h of refill gap',
      connectedTo: ['node-availability', 'node-vitals'],
    },
    {
      id: 'node-vitals',
      step: 5,
      label: 'Clinical Vitals Excursion',
      category: 'Telemetry Signal',
      strength: 'Strong',
      description: 'Cellular blood pressure cuff recorded 148/94 mmHg, matching the window of reported discomfort.',
      evidenceMetric: '+18 mmHg delta above personal baseline',
      connectedTo: ['node-symptoms', 'node-outcome'],
    },
    {
      id: 'node-outcome',
      step: 6,
      label: 'Actionable Clinical Support Window',
      category: 'Opportunity',
      strength: 'Moderate',
      description: 'Intervention prior to Day 14 prevents emergency department escalation or preventable readmission.',
      evidenceMetric: 'Supported intervention window active',
      connectedTo: ['node-vitals'],
    },
  ];

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[1];

  const isConnected = (nodeId: string) => {
    if (selectedNodeId === nodeId) return true;
    return selectedNode.connectedTo.includes(nodeId);
  };

  return (
    <div className={`rounded-3xl border p-5 sm:p-6 shadow-sm space-y-5 transition-all duration-300 ${
      theme === 'dark'
        ? 'bg-slate-900/85 border-slate-800 text-slate-100 shadow-black/20'
        : 'bg-white border-slate-200/85 text-slate-900 shadow-2xs'
    }`}>
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b ${
        theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shadow-2xs ${
              theme === 'dark' ? 'bg-cyan-950/60 border-cyan-800/60 text-cyan-400' : 'bg-sky-50 border-sky-200 text-sky-600'
            }`}>
              <Share2 className="w-4 h-4" />
            </div>
            <h3 className={`text-base font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Multi-Signal Correlation Topology
            </h3>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
              theme === 'dark' ? 'bg-teal-950/60 text-teal-300 border-teal-800/60' : 'bg-teal-50 text-teal-800 border-teal-200'
            }`}>
              Causal Graph
            </span>
          </div>
          <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Click any signal node to trace connected causality and observe how independent streams converge.
          </p>
        </div>

        {/* Legend */}
        <div className={`flex items-center gap-3 text-xs px-3 py-1.5 rounded-xl border self-start sm:self-auto font-medium ${
          theme === 'dark' ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200/80 text-slate-700'
        }`}>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]" /> Strong
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.6)]" /> Moderate
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-500" /> Weak
          </span>
        </div>
      </div>

      {/* Cyber-Biological Interactive Topology Canvas */}
      <div className="relative p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-2xl border border-slate-800 text-white overflow-hidden shadow-lg">
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-sky-500/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-teal-500/10 rounded-full filter blur-3xl pointer-events-none" />

        {/* Background Animated Signal Beam Lines */}
        <svg
          className="w-full h-24 hidden lg:block absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none px-6"
          viewBox="0 0 1000 80"
          fill="none"
        >
          {/* Base Connection Track */}
          <path
            d="M 50 40 L 220 40 L 400 40 L 590 40 L 780 40 L 950 40"
            stroke="rgba(51, 65, 85, 0.7)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Animated Flowing Packets */}
          <path
            d="M 50 40 L 220 40 L 400 40 L 590 40 L 780 40 L 950 40"
            stroke="url(#packetGradient)"
            strokeWidth="3"
            strokeDasharray="12 12"
            strokeLinecap="round"
            className="animate-signal-pulse"
          />

          <defs>
            <linearGradient id="packetGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
        </svg>

        {/* Interactive Node Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5 relative z-10">
          {nodes.map((node) => {
            const isSelected = selectedNodeId === node.id;
            const connected = isConnected(node.id);

            return (
              <div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`p-3.5 rounded-xl cursor-pointer transition-all border flex flex-col justify-between text-left relative ${
                  isSelected
                    ? 'bg-sky-600 text-white border-sky-400 shadow-[0_0_20px_rgba(2,132,199,0.5)] scale-105 z-20'
                    : connected
                    ? 'bg-slate-800/95 text-white border-sky-400/80 ring-2 ring-sky-400/30 shadow-md'
                    : 'bg-slate-800/60 text-slate-300 border-slate-700/70 hover:border-slate-500 hover:bg-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        isSelected
                          ? 'bg-sky-700 text-white'
                          : 'bg-slate-700/80 text-slate-300'
                      }`}
                    >
                      Step {node.step}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : node.strength === 'Strong'
                          ? 'bg-sky-950 text-sky-300 border border-sky-800'
                          : 'bg-teal-950 text-teal-300 border border-teal-800'
                      }`}
                    >
                      {node.strength}
                    </span>
                  </div>

                  <h4
                    className={`font-bold text-xs leading-snug ${
                      isSelected ? 'text-white' : 'text-slate-100'
                    }`}
                  >
                    {node.label}
                  </h4>
                </div>

                <div
                  className={`mt-2.5 pt-2 border-t text-[10px] truncate ${
                    isSelected ? 'border-sky-500 text-sky-100' : 'border-slate-700 text-slate-400'
                  }`}
                >
                  {node.category}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Telemetry Inspector */}
      {selectedNode && (
        <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-fadeIn ${
          theme === 'dark' ? 'bg-cyan-950/30 border-cyan-800/60 text-slate-200' : 'bg-sky-50/70 border-sky-200/90 text-slate-800'
        }`}>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-sky-950'}`}>
                Node {selectedNode.step}: {selectedNode.label}
              </span>
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                theme === 'dark' ? 'bg-cyan-900/60 text-cyan-300 border-cyan-700/60' : 'bg-sky-100 text-sky-800 border-sky-200'
              }`}>
                {selectedNode.category}
              </span>
            </div>
            <p className={`leading-relaxed font-normal ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
              {selectedNode.description}
            </p>
          </div>

          <div className={`flex flex-col items-end shrink-0 self-start sm:self-auto p-2.5 rounded-lg border shadow-2xs ${
            theme === 'dark' ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-sky-200/70 text-sky-900'
          }`}>
            <span className="text-[10px] font-mono text-slate-400">Verified Evidence:</span>
            <span className={`text-xs font-bold font-mono ${theme === 'dark' ? 'text-cyan-300' : 'text-sky-900'}`}>
              {selectedNode.evidenceMetric}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
