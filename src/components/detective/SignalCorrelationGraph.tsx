import React, { useState } from 'react';
import { SignalStrength } from '../../types/patient';
import {
  Network,
  Share2,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Pill,
  HeartPulse,
  Activity,
  Calendar,
} from 'lucide-react';

interface Node {
  id: string;
  label: string;
  category: string;
  strength: SignalStrength;
  description: string;
  connectedTo: string[];
}

export const SignalCorrelationGraph: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-refill');

  const nodes: Node[] = [
    {
      id: 'node-pharmacy',
      label: 'Pharmacy Dispense Stream',
      category: 'Source',
      strength: 'Strong',
      description: 'Surescripts claims link verifies delay of 8 days (April) and 12 days (May).',
      connectedTo: ['node-refill'],
    },
    {
      id: 'node-refill',
      label: 'Refill Delay Identified',
      category: 'Pharmacy Signal',
      strength: 'Strong',
      description: 'Dispense interval prolonged from 30 days to 42 days.',
      connectedTo: ['node-pharmacy', 'node-availability'],
    },
    {
      id: 'node-availability',
      label: 'Medication Availability Concern',
      category: 'Inferred State',
      strength: 'Moderate',
      description: 'Projected pill supply exhausted during 8-day and 12-day windows prior to pickup.',
      connectedTo: ['node-refill', 'node-symptoms'],
    },
    {
      id: 'node-symptoms',
      label: 'Symptoms Surge (Dyspnea/Fatigue)',
      category: 'Patient Reported',
      strength: 'Strong',
      description: 'Patient logged symptom flares exactly 4 days following projected depletion dates.',
      connectedTo: ['node-availability', 'node-clinical'],
    },
    {
      id: 'node-clinical',
      label: 'Clinical Marker Shift (BP Elevation)',
      category: 'Clinical Measurement',
      strength: 'Moderate',
      description: 'Ambulatory tele-BP elevated to 146/92 mmHg, matching symptom spike timeline.',
      connectedTo: ['node-symptoms', 'node-outcome'],
    },
    {
      id: 'node-outcome',
      label: 'Possible Adherence Irregularity',
      category: 'Clinical Decision Support',
      strength: 'Moderate',
      description: 'Temporal convergence of independent streams suggests intermittent medication taking.',
      connectedTo: ['node-clinical'],
    },
  ];

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[1];

  const isHighlighted = (nodeId: string) => {
    if (selectedNodeId === nodeId) return true;
    return selectedNode.connectedTo.includes(nodeId);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-sky-600" />
            <span>Multi-Signal Correlation Topology</span>
          </h3>
          <p className="text-xs text-slate-500">
            Click any signal node to trace connected causality and evaluate independent evidence links.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-[11px] self-start sm:self-auto">
          <span className="flex items-center gap-1 text-slate-600">
            <span className="w-2 h-2 rounded-full bg-sky-600" /> Strong
          </span>
          <span className="flex items-center gap-1 text-slate-600">
            <span className="w-2 h-2 rounded-full bg-teal-500" /> Moderate
          </span>
          <span className="flex items-center gap-1 text-slate-600">
            <span className="w-2 h-2 rounded-full bg-slate-400" /> Weak
          </span>
        </div>
      </div>

      {/* Interactive Node Network Visualization */}
      <div className="relative p-6 bg-slate-50/70 rounded-xl border border-slate-200/80 overflow-hidden">
        {/* Animated Background Vector Flow Lines */}
        <svg
          className="w-full h-24 hidden md:block absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none"
          viewBox="0 0 1000 80"
          fill="none"
        >
          <path
            d="M 50 40 L 220 40 L 400 40 L 600 40 L 780 40 L 950 40"
            stroke="#94a3b8"
            strokeWidth="3"
            strokeDasharray="6 6"
            className="animate-signal-pulse"
          />
        </svg>

        {/* Nodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
          {nodes.map((node, index) => {
            const active = selectedNodeId === node.id;
            const highlighted = isHighlighted(node.id);

            return (
              <div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`p-3 rounded-xl cursor-pointer transition-all border flex flex-col justify-between text-left ${
                  active
                    ? 'bg-sky-600 text-white border-sky-600 shadow-md scale-105'
                    : highlighted
                    ? 'bg-white text-slate-900 border-sky-400 ring-2 ring-sky-200/80 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded ${
                        active
                          ? 'bg-sky-700/80 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Step {index + 1}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                        active
                          ? 'bg-sky-500 text-white'
                          : node.strength === 'Strong'
                          ? 'bg-sky-50 text-sky-700 border border-sky-200'
                          : 'bg-teal-50 text-teal-700 border border-teal-200'
                      }`}
                    >
                      {node.strength}
                    </span>
                  </div>

                  <h5
                    className={`font-bold text-xs leading-snug ${
                      active ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {node.label}
                  </h5>
                </div>

                <div
                  className={`mt-2 pt-1.5 border-t text-[10px] ${
                    active ? 'border-sky-500/80 text-sky-100' : 'border-slate-100 text-slate-400'
                  }`}
                >
                  {node.category}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Details */}
      {selectedNode && (
        <div className="mt-4 p-3.5 bg-sky-50/60 rounded-xl border border-sky-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="font-semibold text-sky-950 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              Node: {selectedNode.label} ({selectedNode.category})
            </span>
            <p className="text-slate-700">{selectedNode.description}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <span className="text-[11px] text-slate-500">Signal Strength:</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-white text-sky-800 border border-sky-300">
              {selectedNode.strength} Signal
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
