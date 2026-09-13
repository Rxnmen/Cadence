import React from 'react';
import { UserCheck, Sparkles, Sliders, ShieldCheck } from 'lucide-react';

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
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-700/60">
        <div>
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-teal-400" />
            <h4 className="text-sm font-bold text-white tracking-wide">
              Personal Baseline vs. Observed Behavior
            </h4>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            Cadence does not measure against generic population statistics. We establish an individualized 6-month behavioral and clinical baseline for {patientName}.
          </p>
        </div>

        <span className="text-[11px] font-medium text-teal-300 bg-teal-950/60 border border-teal-800 px-2.5 py-1 rounded-lg self-start md:self-auto">
          Personalized Norms Calibrated
        </span>
      </div>

      {/* Metric Visual Comparison Bars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {norms.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/70 space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300">{item.label}</span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  item.status === 'concern'
                    ? 'bg-amber-950/70 text-amber-300 border border-amber-800'
                    : 'bg-sky-950/70 text-sky-300 border border-sky-800'
                }`}
              >
                {item.variance}
              </span>
            </div>

            <div className="flex items-baseline justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Personal Norm</span>
                <span className="font-semibold text-slate-200">{item.baseline}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Current Observed</span>
                <span
                  className={`font-bold text-sm ${
                    item.status === 'concern' ? 'text-amber-400' : 'text-sky-400'
                  }`}
                >
                  {item.current}
                </span>
              </div>
            </div>

            {/* Visual divergence bar */}
            <div className="w-full bg-slate-700/60 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  item.status === 'concern' ? 'bg-amber-400' : 'bg-teal-400'
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
