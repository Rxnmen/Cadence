import React from 'react';
import { Patient } from '../../types/patient';
import { RiskBadge } from '../common/RiskBadge';
import { TiltCard } from '../common/TiltCard';
import {
  Search,
  Pill,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Activity,
  AlertTriangle,
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
  const getScoreConfig = (s: number) => {
    if (s >= 80) return { text: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200/90', glow: 'shadow-[0_0_12px_rgba(225,29,72,0.15)]' };
    if (s >= 65) return { text: 'text-amber-800', bg: 'bg-amber-50', border: 'border-amber-200/90', glow: 'shadow-[0_0_12px_rgba(217,119,6,0.15)]' };
    if (s >= 40) return { text: 'text-sky-700', bg: 'bg-sky-50', border: 'border-sky-200/90', glow: 'shadow-[0_0_12px_rgba(2,132,199,0.15)]' };
    return { text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200/90', glow: 'shadow-[0_0_12px_rgba(16,185,129,0.15)]' };
  };

  const scoreStyle = getScoreConfig(patient.riskScore);

  return (
    <TiltCard
      maxTilt={4}
      glareOpacity={0.12}
      className="bg-white rounded-2xl border border-slate-200/85 p-5 card-elevation-hover flex flex-col justify-between"
    >
      <div>
        {/* Top Header: Demographics & Luminous Risk Score */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-slate-100 to-slate-200 border border-slate-300/80 flex items-center justify-center font-bold text-xs text-slate-800 shadow-2xs group-hover:from-sky-50 group-hover:to-teal-50 group-hover:text-sky-700 transition-all">
              {patient.initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900 group-hover:text-sky-900 transition-colors">
                  {patient.name}
                </span>
                <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded-md border border-slate-200/70">
                  {patient.code}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {patient.age} yrs • {patient.gender} • {patient.condition}
              </p>
            </div>
          </div>

          {/* Luminous Risk Index Gauge */}
          <div className="flex flex-col items-end">
            <div
              className={`px-3 py-1 rounded-xl border flex items-baseline gap-1 font-extrabold text-sm ${scoreStyle.bg} ${scoreStyle.text} ${scoreStyle.border} ${scoreStyle.glow} transition-all`}
            >
              <span>{patient.riskScore}</span>
              <span className="text-[10px] font-semibold opacity-70">/ 100</span>
            </div>
            <span className="text-[10px] font-semibold text-slate-400 mt-0.5">
              Risk Index
            </span>
          </div>
        </div>

        {/* Primary Medication Banner */}
        <div className="p-3 bg-slate-50/90 rounded-xl border border-slate-200/70 mb-3.5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2 text-xs">
            <Pill className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <div className="truncate">
              <span className="font-bold text-slate-900">
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
            <span className="text-[10px] text-sky-600 font-semibold flex items-center gap-1">
              <Activity className="w-3 h-3" />
              {patient.contributingSignals.length} signals correlated
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {patient.contributingSignals.slice(0, 3).map((sig) => (
              <span
                key={sig.id}
                className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 bg-white border border-slate-200/90 text-slate-700 rounded-lg font-medium shadow-2xs group-hover:border-slate-300"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    sig.strength === 'Strong'
                      ? 'bg-sky-500'
                      : sig.strength === 'Moderate'
                      ? 'bg-teal-500'
                      : 'bg-slate-400'
                  }`}
                />
                <span className="truncate max-w-[130px]">{sig.name}</span>
              </span>
            ))}
            {patient.contributingSignals.length > 3 && (
              <span className="text-[11px] px-2 py-1 bg-slate-100/90 text-slate-600 rounded-lg font-semibold border border-slate-200/70">
                +{patient.contributingSignals.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Timestamp & Investigation Actions */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
          <Clock className="w-3.5 h-3.5" />
          <span>{patient.lastReviewed}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelect(patient.id)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Profile
          </button>

          <button
            onClick={() => onInvestigate(patient.id)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Investigate</span>
          </button>
        </div>
      </div>
    </TiltCard>
  );
};
