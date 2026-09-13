import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  AlertTriangle,
  AlertCircle,
  TrendingUp,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
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
      iconColor: 'text-sky-600 bg-sky-50 border-sky-200',
      actionText: 'View cohort directory',
      onClick: () => setActiveView('patients'),
    },
    {
      id: 'review',
      title: 'Patients Requiring Review',
      value: kpis.patientsRequiringReview,
      delta: kpis.patientsRequiringReviewDelta,
      deltaType: 'warning',
      icon: AlertCircle,
      iconColor: 'text-amber-600 bg-amber-50 border-amber-200',
      actionText: 'Filter attention list',
      highlight: true,
      onClick: () => setActiveView('dashboard'),
    },
    {
      id: 'high-priority',
      title: 'High Priority',
      value: kpis.highPriorityCount,
      delta: 'Requires prompt evaluation',
      deltaType: 'urgent',
      icon: AlertCircle,
      iconColor: 'text-rose-600 bg-rose-50 border-rose-200',
      actionText: 'View urgent alerts',
      onClick: () => setActiveView('alerts'),
    },
    {
      id: 'moderate',
      title: 'Moderate Concern',
      value: kpis.moderateConcernCount,
      delta: 'Multi-signal correlation',
      deltaType: 'moderate',
      icon: AlertTriangle,
      iconColor: 'text-amber-600 bg-amber-50 border-amber-200',
      actionText: 'Inspect signals',
      onClick: () => setActiveView('dashboard'),
    },
    {
      id: 'improving',
      title: 'Improving',
      value: kpis.improvingCount,
      delta: '+4 resolved this week',
      deltaType: 'positive',
      icon: TrendingUp,
      iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      actionText: 'View stabilized trends',
      onClick: () => setActiveView('patients'),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            onClick={card.onClick}
            className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden group ${
              card.highlight
                ? 'border-amber-300 shadow-xs ring-1 ring-amber-200/50'
                : 'border-slate-200/80 shadow-2xs'
            }`}
          >
            {/* Top row: Icon + Delta */}
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105 ${card.iconColor}`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-0.5 ${
                  card.deltaType === 'positive'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : card.deltaType === 'urgent'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : card.deltaType === 'warning'
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {card.deltaType === 'positive' && <TrendingUp className="w-3 h-3" />}
                {card.delta}
              </span>
            </div>

            {/* Value & Title */}
            <div className="space-y-0.5">
              <div className="text-2xl font-bold tracking-tight text-slate-900 flex items-baseline gap-1.5">
                <span>{card.value}</span>
                {card.id === 'monitored' && (
                  <span className="text-xs font-normal text-slate-400">active</span>
                )}
              </div>
              <div className="text-xs font-medium text-slate-500">
                {card.title}
              </div>
            </div>

            {/* Bottom mini link */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-sky-600 transition-colors">
              <span>{card.actionText}</span>
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
