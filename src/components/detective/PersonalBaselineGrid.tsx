import React from 'react';
import { UserCheck, Sparkles, ShieldCheck } from 'lucide-react';

interface PersonalBaselineGridProps {
  patientName: string;
}

export const PersonalBaselineGrid: React.FC<PersonalBaselineGridProps> = ({ patientName }) => {
  const norms = [
    {
      label: 'Normal Refill Interval',
      baseline: '29 – 32 days',
      current: '43 days',
      variance: '+11 days gap',
      status: 'concern',
      progressPercent: 78,
    },
    {
      label: 'Normal Symptom Score',
      baseline: '2.1 / 10',
      current: '4.3 / 10',
      variance: '+2.2 pts elevation',
      status: 'concern',
      progressPercent: 65,
    },
    {
      label: 'Normal Daily Activity',
      baseline: '7,200 steps/day',
      current: '6,100 steps/day',
      variance: '-14% reduction',
      status: 'borderline',
      progressPercent: 45,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 relative overflow-hidden">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-teal-500/10 rounded-full filter blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-teal-400" />
            <h4 className="text-sm font-bold text-white tracking-wide">
              Personalized Baseline vs. Observed Behavior
            </h4>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Cadence evaluates against an individualized 6-month behavioral and clinical baseline for {patientName}, preventing false alerts triggered by generic population thresholds.
          </p>
        </div>

        <span className="text-[11px] font-bold text-teal-300 bg-teal-950/80 border border-teal-800/80 px-3 py-1.5 rounded-xl self-start md:self-auto shadow-inner">
          Personalized Norms Active
        </span>
      </div>

      {/* Metric Visual Comparison Bars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
        {norms.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-3 hover:border-slate-600 transition-colors shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">{item.label}</span>
              <span
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                  item.status === 'concern'
                    ? 'bg-amber-950/80 text-amber-400 border border-amber-800'
                    : 'bg-sky-950/80 text-sky-400 border border-sky-800'
                }`}
              >
                {item.variance}
              </span>
            </div>

            <div className="flex items-baseline justify-between text-xs pt-1">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Personal Norm</span>
                <span className="font-semibold text-slate-200">{item.baseline}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Current Observed</span>
                <span
                  className={`font-black text-sm font-mono ${
                    item.status === 'concern' ? 'text-amber-400' : 'text-sky-400'
                  }`}
                >
                  {item.current}
                </span>
              </div>
            </div>

            {/* Visual divergence bar */}
            <div className="w-full bg-slate-700/60 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  item.status === 'concern'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400'
                    : 'bg-gradient-to-r from-teal-500 to-teal-400'
                }`}
                style={{ width: `${item.progressPercent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
