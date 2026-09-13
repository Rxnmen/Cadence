import React, { useState } from 'react';
import { ContributingSignal, RiskCategory } from '../../types/patient';
import { Info, Sparkles, HelpCircle } from 'lucide-react';

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

  // SVG dimensions
  const dimensions = {
    sm: { size: 90, stroke: 7, text: 'text-xl', label: 'text-[10px]' },
    md: { size: 140, stroke: 10, text: 'text-3xl', label: 'text-xs' },
    lg: { size: 180, stroke: 12, text: 'text-4xl', label: 'text-sm' },
  }[size];

  const radius = (dimensions.size - dimensions.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Color selection
  const getColor = (s: number) => {
    if (s >= 80) return { stroke: '#e11d48', bg: '#ffe4e6', text: 'text-rose-600', badge: 'bg-rose-50 text-rose-700 border-rose-200' };
    if (s >= 65) return { stroke: '#d97706', bg: '#fef3c7', text: 'text-amber-600', badge: 'bg-amber-50 text-amber-800 border-amber-200' };
    if (s >= 40) return { stroke: '#0284c7', bg: '#e0f2fe', text: 'text-sky-600', badge: 'bg-sky-50 text-sky-800 border-sky-200' };
    return { stroke: '#059669', bg: '#d1fae5', text: 'text-emerald-600', badge: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
  };

  const colorConfig = getColor(score);

  return (
    <div className="flex flex-col items-center">
      {/* Radial Gauge */}
      <div className="relative flex items-center justify-center">
        <svg
          width={dimensions.size}
          height={dimensions.size}
          className="transform -rotate-90 transition-all duration-700 ease-out"
        >
          {/* Background Track */}
          <circle
            cx={dimensions.size / 2}
            cy={dimensions.size / 2}
            r={radius}
            stroke="#e2e8f0"
            strokeWidth={dimensions.stroke}
            fill="transparent"
          />
          {/* Active Animated Gauge */}
          <circle
            cx={dimensions.size / 2}
            cy={dimensions.size / 2}
            r={radius}
            stroke={colorConfig.stroke}
            strokeWidth={dimensions.stroke}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Score Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`font-bold tracking-tight text-slate-900 ${dimensions.text}`}>
            {score}
          </span>
          <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 -mt-0.5">
            / 100
          </span>
          {size !== 'sm' && (
            <span className="text-[11px] font-medium text-slate-600 mt-0.5">
              Risk Index
            </span>
          )}
        </div>
      </div>

      {/* Category Subtitle */}
      <div className="mt-2 text-center">
        <span
          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colorConfig.badge}`}
        >
          {category}
        </span>
        <p className="text-[11px] text-slate-500 mt-1 flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 text-sky-500" />
          Based on {contributingSignals.length} contributing signals
        </p>
      </div>

      {/* Interactive Signal Weights Breakdown */}
      {interactiveBreakdown && (
        <div className="w-full mt-4 space-y-2 border-t border-slate-100 pt-3">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-medium">
            <span>Signal Contribution Breakdown</span>
            <span className="text-[10px] text-sky-600 font-normal">Click for clinical rationale</span>
          </div>

          <div className="space-y-1.5">
            {contributingSignals.map((signal) => {
              const isSelected = selectedSignal?.id === signal.id;
              return (
                <div
                  key={signal.id}
                  onClick={() => setSelectedSignal(isSelected ? null : signal)}
                  className={`group p-2 rounded-lg cursor-pointer transition-all border text-left ${
                    isSelected
                      ? 'bg-sky-50/80 border-sky-300 shadow-sm'
                      : 'bg-white hover:bg-slate-50 border-slate-200/70'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
                      <span className="font-medium text-slate-800 group-hover:text-sky-700">
                        {signal.name}
                      </span>
                    </div>
                    <span className="font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.2 rounded text-[11px]">
                      {signal.weightPercentage}%
                    </span>
                  </div>

                  {/* Visual Weight Bar */}
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        signal.strength === 'Strong'
                          ? 'bg-sky-600'
                          : signal.strength === 'Moderate'
                          ? 'bg-teal-500'
                          : 'bg-slate-400'
                      }`}
                      style={{ width: `${signal.weightPercentage * 2.5}%` }}
                    />
                  </div>

                  {/* Expanded Explanation on Click */}
                  {isSelected && (
                    <div className="mt-2 text-[11px] text-slate-600 bg-white p-2.5 rounded border border-sky-200/60 animate-fadeIn space-y-1">
                      <div className="flex items-center justify-between font-medium text-sky-950">
                        <span>Signal Category: {signal.category}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-100 text-sky-800">
                          Strength: {signal.strength}
                        </span>
                      </div>
                      <p className="text-slate-600 leading-snug">{signal.description}</p>
                      <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-100 font-mono">
                        Evidence: {signal.valueDescription}
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
