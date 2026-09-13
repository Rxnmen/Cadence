import React, { useState } from 'react';
import { SymptomRecord } from '../../types/patient';
import {
  Activity,
  Calendar,
  AlertTriangle,
  Info,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

interface SymptomsTabProps {
  symptoms: SymptomRecord[];
}

export const SymptomsTab: React.FC<SymptomsTabProps> = ({ symptoms }) => {
  const [selectedSymptom, setSelectedSymptom] = useState<SymptomRecord | null>(
    symptoms[symptoms.length - 1] || null
  );

  // Chart coordinates calculation (0 to 10 scale)
  const maxScore = 10;
  const chartHeight = 160;
  const chartWidth = 600;

  const points = symptoms.map((s, index) => {
    const x = (index / (symptoms.length - 1)) * chartWidth;
    const y = chartHeight - (s.severityScore / maxScore) * chartHeight;
    return { x, y, symptom: s };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  return (
    <div className="space-y-4">
      {/* Overview Banner */}
      <div className="p-4 bg-sky-50/70 border border-sky-200/80 rounded-2xl flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-sky-950">
          <div className="font-bold flex items-center gap-2">
            <span>Symptom Flare & Refill Gap Temporal Correlation</span>
            <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded font-semibold">
              Cadence Intelligence
            </span>
          </div>
          <p className="text-sky-900 leading-relaxed">
            Patient logs demonstrate that symptom severity scores rose above the 2.1 personal baseline exactly 4 to 6 days after the projected 30-day medication supply was exhausted.
          </p>
        </div>
      </div>

      {/* Interactive Line Chart Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-sky-600" />
              <span>Symptom Severity Score Trajectory (1 – 10 Scale)</span>
            </h4>
            <p className="text-xs text-slate-500">
              Dots with amber halos indicate symptoms recorded during a verified refill delay period.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-600" /> Recorded Score
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-amber-200" /> Refill Gap
            </span>
          </div>
        </div>

        {/* SVG Line Chart */}
        <div className="relative pt-6 pb-2 px-4 bg-slate-50/60 rounded-xl border border-slate-200/80 overflow-x-auto">
          <div className="min-w-[620px] h-48 relative flex items-center justify-center">
            <svg
              viewBox={`-20 -10 ${chartWidth + 40} ${chartHeight + 30}`}
              className="w-full h-full overflow-visible"
            >
              {/* Baseline Reference Band (≤ 2.5) */}
              <rect
                x="0"
                y={chartHeight - (2.5 / maxScore) * chartHeight}
                width={chartWidth}
                height={(2.5 / maxScore) * chartHeight}
                fill="#ecfdf5"
                opacity="0.8"
              />
              <line
                x1="0"
                y1={chartHeight - (2.1 / maxScore) * chartHeight}
                x2={chartWidth}
                y2={chartHeight - (2.1 / maxScore) * chartHeight}
                stroke="#10b981"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <text
                x="10"
                y={chartHeight - (2.1 / maxScore) * chartHeight - 4}
                className="text-[9px] fill-emerald-700 font-semibold"
              >
                Personal Baseline (2.1)
              </text>

              {/* Grid Lines */}
              {[2, 4, 6, 8, 10].map((val) => (
                <line
                  key={val}
                  x1="0"
                  y1={chartHeight - (val / maxScore) * chartHeight}
                  x2={chartWidth}
                  y2={chartHeight - (val / maxScore) * chartHeight}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
              ))}

              {/* Chart Line */}
              <path
                d={pathD}
                fill="none"
                stroke="#0284c7"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Interactive Data Points */}
              {points.map((pt, idx) => {
                const hasRefillEvent = !!pt.symptom.associatedRefillEvent;
                const isSelected = selectedSymptom?.date === pt.symptom.date;

                return (
                  <g
                    key={idx}
                    onClick={() => setSelectedSymptom(pt.symptom)}
                    className="cursor-pointer"
                  >
                    {hasRefillEvent && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="9"
                        className="fill-amber-300/40 animate-ping"
                      />
                    )}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isSelected ? '6' : '4.5'}
                      className={`transition-all ${
                        hasRefillEvent
                          ? 'fill-amber-500 stroke-white stroke-2'
                          : 'fill-sky-600 stroke-white stroke-2'
                      }`}
                    />
                    <text
                      x={pt.x}
                      y={chartHeight + 18}
                      textAnchor="middle"
                      className="text-[9px] fill-slate-500 font-mono"
                    >
                      {pt.symptom.date.slice(5)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Selected Symptom Detail Card */}
        {selectedSymptom && (
          <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">
                  {selectedSymptom.date} — {selectedSymptom.symptomName}
                </span>
                <span className="font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-900 text-[11px]">
                  Severity: {selectedSymptom.severityScore} / 10
                </span>
                {selectedSymptom.associatedRefillEvent && (
                  <span className="font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded text-[10px]">
                    ⚠️ {selectedSymptom.associatedRefillEvent}
                  </span>
                )}
              </div>
              <p className="text-slate-600 italic">
                “{selectedSymptom.patientNotes}”
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
