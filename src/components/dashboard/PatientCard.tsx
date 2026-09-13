import React from 'react';
import { Patient } from '../../types/patient';
import { RiskBadge, ConfidenceBadge } from '../common/RiskBadge';
import {
  Search,
  Pill,
  Clock,
  Activity,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react';

interface PatientCardProps {
  patient: Patient;
  onInvestigate: (patientId: string) => void;
  onSelect: (patientId: string) => void;
}

export const PatientCard: React.FC<PatientCardProps> = ({
  patient,
  onInvestigate,
  onSelect,
}) => {
  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-rose-600 bg-rose-50 border-rose-200';
    if (s >= 65) return 'text-amber-600 bg-amber-50 border-amber-200';
    if (s >= 40) return 'text-sky-600 bg-sky-50 border-sky-200';
    return 'text-emerald-600 bg-emerald-50 border-emerald-200';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 hover:shadow-md transition-all hover:border-sky-300 flex flex-col justify-between group relative overflow-hidden">
      {/* Top Bar: Demographic & Risk Score */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          {/* Patient Details */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-sm text-slate-700 group-hover:bg-sky-50 group-hover:text-sky-700 transition-colors">
              {patient.initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900">{patient.name}</span>
                <span className="text-[11px] font-mono font-medium px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded">
                  {patient.code}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {patient.age} yrs • {patient.gender} • {patient.condition}
              </p>
            </div>
          </div>

          {/* Risk Score Pill */}
          <div className="flex flex-col items-end">
            <div
              className={`px-2.5 py-1 rounded-xl border flex items-baseline gap-1 font-bold text-sm ${getScoreColor(
                patient.riskScore
              )}`}
            >
              <span>{patient.riskScore}</span>
              <span className="text-[10px] font-medium opacity-70">/ 100</span>
            </div>
            <span className="text-[10px] font-medium text-slate-400 mt-0.5">
              Risk Index
            </span>
          </div>
        </div>

        {/* Primary Medication */}
        <div className="p-2.5 bg-slate-50/80 rounded-xl border border-slate-100 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <Pill className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <div>
              <span className="font-semibold text-slate-800">
                {patient.primaryMedication.name}
              </span>
              <span className="text-slate-500 ml-1">
                — {patient.primaryMedication.dosage} ({patient.primaryMedication.frequency})
              </span>
            </div>
          </div>
          <RiskBadge category={patient.riskCategory} size="sm" showIcon={false} />
        </div>

        {/* Contributing Signals Tags */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span>Main Contributing Signals</span>
            <span className="text-[10px] text-sky-600 font-normal">
              {patient.contributingSignals.length} signals correlated
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {patient.contributingSignals.slice(0, 3).map((sig) => (
              <span
                key={sig.id}
                className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 bg-white border border-slate-200 text-slate-700 rounded-md font-medium group-hover:border-slate-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                {sig.name}
              </span>
            ))}
            {patient.contributingSignals.length > 3 && (
              <span className="text-[11px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded-md font-medium">
                +{patient.contributingSignals.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions & Timestamp */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <Clock className="w-3 h-3" />
          <span>Reviewed {patient.lastReviewed}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelect(patient.id)}
            className="px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            Profile
          </button>

          <button
            onClick={() => onInvestigate(patient.id)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-sky-600 hover:bg-sky-700 text-white shadow-xs hover:shadow transition-all flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Investigate</span>
          </button>
        </div>
      </div>
    </div>
  );
};
