import React from 'react';
import { useApp } from '../../context/AppContext';
import { TiltCard } from '../common/TiltCard';
import {
  Users,
  AlertTriangle,
  AlertCircle,
  TrendingUp,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
  Activity,
} from 'lucide-react';

export const KpiCards: React.FC = () => {
  const { kpis, setActiveView } = useApp();

  const cards = [
    {
      id: 'monitored',
      title: 'Patients Monitored',
      value: kpis.patientsMonitored,
      delta: kpis.patientsMonitoredDelta,
      deltaType: 'neutral',
      icon: Users,
      iconColor: 'text-sky-600 bg-sky-50 border-sky-200/80',
      actionText: 'View full cohort',
      sparkline: [112, 115, 119, 122, 124, 128],
      sparklineColor: '#0284c7',
      onClick: () => setActiveView('patients'),
    },
    {
      id: 'review',
      title: 'Requiring Review',
      value: kpis.patientsRequiringReview,
      delta: kpis.patientsRequiringReviewDelta,
      deltaType: 'warning',
      icon: AlertCircle,
      iconColor: 'text-amber-600 bg-amber-50 border-amber-200/80',
      actionText: 'Filter triage queue',
      highlight: true,
      sparkline: [8, 10, 9, 12, 11, 14],
      sparklineColor: '#d97706',
      onClick: () => setActiveView('dashboard'),
    },
    {
      id: 'high-priority',
      title: 'High Priority',
      value: kpis.highPriorityCount,
      delta: 'Action required',
      deltaType: 'urgent',
      icon: AlertCircle,
      iconColor: 'text-rose-600 bg-rose-50 border-rose-200/80',
      actionText: 'Inspect urgent alerts',
      sparkline: [4, 6, 5, 4, 6, 5],
      sparklineColor: '#e11d48',
      onClick: () => setActiveView('alerts'),
    },
    {
      id: 'moderate',
      title: 'Moderate Concern',
      value: kpis.moderateConcernCount,
      delta: 'Multi-signal detected',
      deltaType: 'moderate',
      icon: AlertTriangle,
      iconColor: 'text-amber-600 bg-amber-50 border-amber-200/80',
      actionText: 'Inspect causality',
      sparkline: [7, 8, 10, 8, 9, 9],
      sparklineColor: '#f59e0b',
      onClick: () => setActiveView('dashboard'),
    },
    {
      id: 'improving',
      title: 'Improving Trend',
      value: kpis.improvingCount,
      delta: '+4 resolved this week',
      deltaType: 'positive',
      icon: TrendingUp,
      iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-200/80',
      actionText: 'View stabilized records',
      sparkline: [12, 14, 15, 16, 17, 18],
      sparklineColor: '#10b981',
      onClick: () => setActiveView('patients'),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const minVal = Math.min(...card.sparkline);
        const maxVal = Math.max(...card.sparkline);
        const range = maxVal - minVal || 1;

        // Generate SVG Sparkline Path
        const sparklinePoints = card.sparkline
          .map((v, i) => {
            const x = (i / (card.sparkline.length - 1)) * 64;
            const y = 24 - ((v - minVal) / range) * 18 - 3;
            return `${x},${y}`;
          })
          .join(' ');

        return (
          <TiltCard
            key={card.id}
            maxTilt={6}
            glareOpacity={0.15}
            onClick={card.onClick}
            className={`rounded-2xl p-4.5 bg-white border cursor-pointer transition-all card-elevation-hover ${
              card.highlight
                ? 'border-amber-300 ring-2 ring-amber-200/40 shadow-xs'
                : 'border-slate-200/85 shadow-2xs hover:border-sky-300'
            }`}
          >
            {/* Top row: Icon + Delta Badge */}
            <div className="flex items-center justify-between mb-3.5">
              <div
                className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-110 shadow-2xs ${card.iconColor}`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs ${
                  card.deltaType === 'positive'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                    : card.deltaType === 'urgent'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200/80'
                    : card.deltaType === 'warning'
                    ? 'bg-amber-50 text-amber-800 border border-amber-200/80'
                    : 'bg-slate-100 text-slate-700 border border-slate-200/80'
                }`}
              >
                {card.deltaType === 'positive' ? (
                  <TrendingUp className="w-3 h-3 text-emerald-600" />
                ) : card.deltaType === 'urgent' ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                ) : null}
                <span>{card.delta}</span>
              </span>
            </div>

            {/* Value & Sparkline Row */}
            <div className="flex items-end justify-between gap-2 mb-1">
              <div>
                <div className="text-2xl font-extrabold tracking-tight text-slate-900 leading-none">
                  {card.value}
                </div>
                <div className="text-xs font-semibold text-slate-500 mt-1">
                  {card.title}
                </div>
              </div>

              {/* Micro Sparkline Chart */}
              <div className="w-16 h-7 opacity-80 group-hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 64 24" className="w-full h-full overflow-visible">
                  <polyline
                    fill="none"
                    stroke={card.sparklineColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={sparklinePoints}
                  />
                  <circle
                    cx="64"
                    cy={24 - ((card.sparkline[card.sparkline.length - 1] - minVal) / range) * 18 - 3}
                    r="2.5"
                    fill={card.sparklineColor}
                  />
                </svg>
              </div>
            </div>

            {/* Bottom action link */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-sky-600 transition-colors font-medium">
              <span>{card.actionText}</span>
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </TiltCard>
        );
      })}
    </div>
  );
};
