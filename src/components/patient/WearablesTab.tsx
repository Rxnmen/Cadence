import React from 'react';
import { WearableMetric } from '../../types/patient';
import { Watch, Activity, Moon, Heart, TrendingDown } from 'lucide-react';

interface WearablesTabProps {
  wearables: WearableMetric[];
}

export const WearablesTab: React.FC<WearablesTabProps> = ({ wearables }) => {
  return (
    <div className="space-y-4">
      {/* Activity Deviation Banner */}
      <div className="p-4 bg-slate-100/80 border border-slate-200 rounded-2xl flex items-start gap-3">
        <Watch className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-slate-800">
          <div className="font-bold flex items-center gap-2">
            <span>Continuous Biosensing Stream (Smartwatch / Fitness Sensor)</span>
            <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-semibold">
              Synced Today
            </span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Passive activity tracking shows an average 14% drop in daily walking steps alongside slight reductions in sleep efficiency during the refill delay window.
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
        <h4 className="text-sm font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
          <Activity className="w-4 h-4 text-sky-600" />
          <span>Daily Step Counts & Rest Parameters</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          {wearables.map((w, idx) => (
            <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-2">
              <span className="font-bold text-slate-900 block text-center border-b border-slate-200/60 pb-1">
                {w.date}
              </span>

              <div className="space-y-1 text-slate-600">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Activity className="w-3 h-3 text-sky-600" /> Steps
                  </span>
                  <span className="font-bold text-slate-900">{w.steps.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Moon className="w-3 h-3 text-indigo-500" /> Sleep
                  </span>
                  <span className="font-semibold text-slate-800">{w.sleepHours} hrs</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Heart className="w-3 h-3 text-rose-500" /> Resting HR
                  </span>
                  <span className="font-semibold text-slate-800">{w.restingHeartRate} bpm</span>
                </div>
              </div>

              <div className="pt-1.5 border-t border-slate-200/60 text-center">
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                    w.activityDeviationPercent < 0
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}
                >
                  {w.activityDeviationPercent > 0 ? `+${w.activityDeviationPercent}%` : `${w.activityDeviationPercent}%`} vs baseline
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
