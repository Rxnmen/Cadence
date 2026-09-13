import React, { useState } from 'react';
import { ContributingSignal, RiskCategory } from '../../types/patient';
import { Sparkles, Info, ArrowUpRight, Activity } from 'lucide-react';

interface RadialScoreProps {
  score: number; // 0 - 100
  category: RiskCategory;
  contributingSignals: ContributingSignal[];
  size?: 'sm' | 'md' | 'lg';
  interactiveBreakdown?: boolean;
}

export const RadialScore: React.FC<RadialScoreProps> = ({
  score,
  category,
  contributingSignals,
  size = 'md',
  interactiveBreakdown = true,
}) => {
  const [selectedSignal, setSelectedSignal] = useState<ContributingSignal | null>(null);

  const dimensions = {
    sm: { size: 96, stroke: 8, text: 'text-2xl', label: 'text-[10px]' },
    md: { size: 148, stroke: 11, text: 'text-4xl', label: 'text-xs' },
    lg: { size: 188, stroke: 13, text: 'text-5xl', label: 'text-xs' },
  }[size];

  const radius = (dimensions.size - dimensions.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColorConfig = (s: number) => {
    if (s >= 80) return { gradientStart: '#f43f5e', gradientEnd: '#e11d48', glow: 'rgba(244, 63, 94, 0.45)', badge: 'bg-rose-50 text-rose-700 border-rose-200' };
    if (s >= 65) return { gradientStart: '#fbbf24', gradientEnd: '#d97706', glow: 'rgba(217, 119, 6, 0.4)', badge: 'bg-amber-50 text-amber-800 border-amber-200' };
    if (s >= 40) return { gradientStart: '#38bdf8', gradientEnd: '#0284c7', glow: 'rgba(2, 132, 199, 0.35)', badge: 'bg-sky-50 text-sky-800 border-sky-200' };
    return { gradientStart: '#34d399', gradientEnd: '#059669', glow: 'rgba(5, 150, 105, 0.35)', badge: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
  };

  const colors = getColorConfig(score);
  const gradientId = `radial-grad-${score}-${size}`;

  return (
    <div className="flex flex-col items-center">
      {/* Multi-layered Luminous Radial Gauge */}
      <div className="relative flex items-center justify-center">
        <svg
          width={dimensions.size}
          height={dimensions.size}
          className="transform -rotate-90 transition-all duration-1000 ease-out overflow-visible"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.gradientStart} />
              <stop offset="100%" stopColor={colors.gradientEnd} />
            </linearGradient>
            <filter id={`glow-${gradientId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={colors.glow} />
            </filter>
          </defs>

          {/* Faint Outer Orbital Guide */}
          <circle
            cx={dimensions.size / 2}
            cy={dimensions.size / 2}
            r={radius + 6}
            stroke="#e2e8f0"
            strokeWidth="1"
            strokeDasharray="2 4"
            fill="transparent"
            className="opacity-60"
          />

          {/* Background Track */}
          <circle
            cx={dimensions.size / 2}
            cy={dimensions.size / 2}
            r={radius}
            stroke="#f1f5f9"
            strokeWidth={dimensions.stroke}
            fill="transparent"
          />

          {/* Active Glowing Score Arc */}
          <circle
            cx={dimensions.size / 2}
            cy={dimensions.size / 2}
            r={radius}
            stroke={`url(#${gradientId})`}
            strokeWidth={dimensions.stroke}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            filter={`url(#glow-${gradientId})`}
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
          <span className={`font-black tracking-tight text-slate-900 font-mono ${dimensions.text}`}>
            {score}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
            / 100
          </span>
          {size !== 'sm' && (
            <span className="text-[11px] font-semibold text-slate-500 mt-1">
              Risk Index
            </span>
          )}
        </div>
      </div>

      {/* Category Subtitle */}
      <div className="mt-3 text-center">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-bold border shadow-2xs ${colors.badge}`}
        >
          {category}
        </span>
        <p className="text-[11px] text-slate-500 mt-1.5 flex items-center justify-center gap-1 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-sky-500" />
          <span>Calibrated across {contributingSignals.length} contributing streams</span>
        </p>
      </div>

      {/* Interactive Signal Weights Breakdown */}
      {interactiveBreakdown && (
        <div className="w-full mt-4 space-y-2 border-t border-slate-100 pt-3.5">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-medium">
            <span className="font-bold text-slate-700">Signal Contribution Weights</span>
            <span className="text-[10px] text-sky-600 font-semibold">Click to inspect</span>
          </div>

          <div className="space-y-2">
            {contributingSignals.map((signal) => {
              const isSelected = selectedSignal?.id === signal.id;
              return (
                <div
                  key={signal.id}
                  onClick={() => setSelectedSignal(isSelected ? null : signal)}
                  className={`p-2.5 rounded-xl cursor-pointer transition-all border text-left ${
                    isSelected
                      ? 'bg-sky-50/90 border-sky-300 ring-2 ring-sky-200/60 shadow-xs'
                      : 'bg-white hover:bg-slate-50/90 border-slate-200/80 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          signal.strength === 'Strong'
                            ? 'bg-sky-500'
                            : signal.strength === 'Moderate'
                            ? 'bg-teal-500'
                            : 'bg-slate-400'
                        }`}
                      />
                      <span className="font-bold text-slate-800 text-[11px]">
                        {signal.name}
                      </span>
                    </div>
                    <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md text-[11px]">
                      {signal.weightPercentage}%
                    </span>
                  </div>

                  {/* Visual Weight Meter */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        signal.strength === 'Strong'
                          ? 'bg-gradient-to-r from-sky-500 to-sky-600'
                          : signal.strength === 'Moderate'
                          ? 'bg-gradient-to-r from-teal-400 to-teal-600'
                          : 'bg-slate-400'
                      }`}
                      style={{ width: `${signal.weightPercentage * 2.5}%` }}
                    />
                  </div>

                  {/* Expanded Inspector on Click */}
                  {isSelected && (
                    <div className="mt-2.5 text-[11px] text-slate-600 bg-white p-3 rounded-lg border border-sky-200/80 space-y-1.5 shadow-2xs animate-fadeIn">
                      <div className="flex items-center justify-between font-bold text-sky-950">
                        <span>Category: {signal.category}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                          Strength: {signal.strength}
                        </span>
                      </div>
                      <p className="text-slate-700 leading-relaxed font-normal">
                        {signal.description}
                      </p>
                      <div className="text-[10px] text-slate-500 pt-1.5 border-t border-slate-100 font-mono">
                        Clinical Evidence: {signal.valueDescription}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
