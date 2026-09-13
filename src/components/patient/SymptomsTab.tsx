import React, { useState } from 'react';
import { SymptomRecord } from '../../types/patient';
import {
  Activity,
  Sparkles,
  AlertTriangle,
  Info,
  Calendar,
} from 'lucide-react';

interface SymptomsTabProps {
  symptoms: SymptomRecord[];
}

export const SymptomsTab: React.FC<SymptomsTabProps> = ({ symptoms }) => {
  const [selectedSymptom, setSelectedSymptom] = useState<SymptomRecord | null>(
    symptoms[symptoms.length - 1] || null
  );

  const maxScore = 10;
  const chartHeight = 170;
  const chartWidth = 620;

  const points = symptoms.map((s, index) => {
    const x = (index / (symptoms.length - 1)) * chartWidth;
    const y = chartHeight - (s.severityScore / maxScore) * chartHeight;
    return { x, y, symptom: s };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;

  return (
    <div className="space-y-5">
      {/* Overview Banner */}
      <div className="p-4.5 bg-gradient-to-r from-sky-50/90 to-teal-50/70 border border-sky-200/80 rounded-2xl flex items-start gap-3.5 shadow-2xs">
        <div className="w-8 h-8 rounded-xl bg-white border border-sky-200 flex items-center justify-center text-sky-600 shrink-0 shadow-2xs">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="space-y-1 text-xs text-sky-950">
          <div className="font-extrabold flex items-center gap-2">
            <span>Symptom Flare & Refill Gap Temporal Correlation</span>
            <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full font-bold">
              Cadence Intelligence
            </span>
          </div>
          <p className="text-sky-900 leading-relaxed">
            Patient diary logs demonstrate that exertional dyspnea and lower extremity tightness rose above the 2.1 personal baseline exactly 4 to 6 days after the projected 30-day supply was depleted.
          </p>
        </div>
      </div>

      {/* Interactive Line Chart Card */}
      <div className="bg-white rounded-2xl border border-slate-200/85 p-5 sm:p-6 shadow-2xs card-elevation-2 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-2xs">
                <Activity className="w-4 h-4" />
              </div>
              <h4 className="text-base font-bold text-slate-900 tracking-tight">
                Symptom Severity Score Trajectory (1 – 10 Scale)
              </h4>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Dots with amber halos indicate symptom exacerbations logged during an active pharmacy refill delay period.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80 font-medium">
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-600 shadow-xs" /> Logged Score
            </span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-amber-200 shadow-xs" /> Refill Gap Coincidence
            </span>
          </div>
        </div>

        {/* SVG Line Chart with Gradient Area Fill */}
        <div className="relative pt-6 pb-4 px-4 bg-gradient-to-b from-slate-50/90 to-white rounded-2xl border border-slate-200/80 overflow-x-auto shadow-inner">
          <div className="min-w-[640px] h-52 relative flex items-center justify-center">
            <svg
              viewBox={`-20 -15 ${chartWidth + 40} ${chartHeight + 40}`}
              className="w-full h-full overflow-visible"
            >
              <defs>
                <linearGradient id="symptomAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Baseline Reference Band (≤ 2.5) */}
              <rect
                x="0"
                y={chartHeight - (2.5 / maxScore) * chartHeight}
                width={chartWidth}
                height={(2.5 / maxScore) * chartHeight}
                fill="#ecfdf5"
                opacity="0.8"
                rx="4"
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
                x="12"
                y={chartHeight - (2.1 / maxScore) * chartHeight - 5}
                className="text-[10px] fill-emerald-700 font-extrabold"
              >
                Personal Baseline (2.1 / 10)
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

              {/* Area Gradient Fill */}
              <path d={areaD} fill="url(#symptomAreaGrad)" />

              {/* Chart Glowing Line */}
              <path
                d={pathD}
                fill="none"
                stroke="#0284c7"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="filter drop-shadow-[0_2px_8px_rgba(2,132,199,0.35)]"
              />

              {/* Data Points */}
              {points.map((pt, idx) => {
                const hasRefillEvent = !!pt.symptom.associatedRefillEvent;
                const isSelected = selectedSymptom?.date === pt.symptom.date;

                return (
                  <g
                    key={idx}
                    onClick={() => setSelectedSymptom(pt.symptom)}
                    className="cursor-pointer group"
                  >
                    {hasRefillEvent && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="12"
                        className="fill-amber-400/30 animate-pulse"
                      />
                    )}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isSelected ? '7' : '5'}
                      className={`transition-all duration-200 ${
                        hasRefillEvent
                          ? 'fill-amber-500 stroke-white stroke-2'
                          : 'fill-sky-600 stroke-white stroke-2'
                      }`}
                    />
                    <text
                      x={pt.x}
                      y={chartHeight + 20}
                      textAnchor="middle"
                      className="text-[10px] fill-slate-500 font-mono font-bold"
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
          <div className="p-4 bg-slate-50/90 rounded-xl border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs animate-fadeIn">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-extrabold text-slate-900">
                  {selectedSymptom.date} — {selectedSymptom.symptomName}
                </span>
                <span className="font-extrabold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-900 text-[11px] font-mono">
                  Severity: {selectedSymptom.severityScore} / 10
                </span>
                {selectedSymptom.associatedRefillEvent && (
                  <span className="font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full text-[10px] border border-amber-200 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-amber-600" />
                    {selectedSymptom.associatedRefillEvent}
                  </span>
                )}
              </div>
              <p className="text-slate-700 italic font-medium">
                “{selectedSymptom.patientNotes}”
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
