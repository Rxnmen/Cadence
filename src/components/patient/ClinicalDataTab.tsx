import React from 'react';
import { ClinicalMeasurement } from '../../types/patient';
import { HeartPulse, CheckCircle2, AlertTriangle, TrendingUp, HelpCircle } from 'lucide-react';

interface ClinicalDataTabProps {
  measurements: ClinicalMeasurement[];
}

export const ClinicalDataTab: React.FC<ClinicalDataTabProps> = ({ measurements }) => {
  return (
    <div className="space-y-4">
      {/* Vitals Table & Status */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-sky-600" />
              <span>Biomarker & Telemonitoring Progression</span>
            </h4>
            <p className="text-xs text-slate-500">
              Longitudinal biometric values compared against patient-specific clinical target boundaries.
            </p>
          </div>

          <span className="text-[11px] font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 self-start sm:self-auto">
            Source: Connected Home Telehealth Device
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 text-[10px] uppercase font-bold">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Biomarker Metric</th>
                <th className="py-2.5 px-3">Observed Value</th>
                <th className="py-2.5 px-3">Target Range</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Clinical Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {measurements.map((m, idx) => {
                const isAbove = m.status === 'above-baseline';
                return (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-900">{m.date}</td>
                    <td className="py-3 px-3 font-medium text-slate-800">{m.metric}</td>
                    <td className="py-3 px-3 font-bold text-slate-900">
                      <span className={isAbove ? 'text-amber-700' : 'text-emerald-700'}>
                        {m.value} {m.unit}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-500">
                      {m.baselineMin} – {m.baselineMax} {m.unit}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isAbove
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {isAbove ? 'Above Target' : 'Within Target Range'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 max-w-xs">{m.interpretation}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
