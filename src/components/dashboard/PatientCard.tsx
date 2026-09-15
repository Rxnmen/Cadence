import React from 'react';
import { Patient } from '../../types/patient';
import { useApp } from '../../context/AppContext';
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
  const { theme } = useApp();

  const getScoreConfig = (s: number) => {
    if (s >= 80) return { text: 'text-rose-400', bg: 'bg-rose-500/15', border: 'border-rose-500/30', glow: 'shadow-[0_0_12px_rgba(244,63,94,0.2)]' };
    if (s >= 65) return { text: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/30', glow: 'shadow-[0_0_12px_rgba(245,158,11,0.2)]' };
    if (s >= 40) return { text: 'text-cyan-400', bg: 'bg-cyan-500/15', border: 'border-cyan-500/30', glow: 'shadow-[0_0_12px_rgba(6,182,212,0.2)]' };
    return { text: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30', glow: 'shadow-[0_0_12px_rgba(16,185,129,0.2)]' };
  };

  const scoreStyle = getScoreConfig(patient.riskScore);

  return (
    <TiltCard
      maxTilt={4}
      glareOpacity={0.12}
      className={`rounded-2xl border p-5 card-elevation-hover flex flex-col justify-between transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-slate-900/85 border-slate-800 hover:border-cyan-500/40 shadow-md shadow-black/20 hover:shadow-cyan-950/20 text-slate-100'
          : 'bg-white border-slate-200/85 shadow-2xs hover:border-sky-300 text-slate-900'
      }`}
    >
      <div>
        {/* Top Header: Demographics & Luminous Risk Score */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center font-bold text-xs shadow-2xs transition-all ${
              theme === 'dark'
                ? 'bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border-cyan-500/30 text-cyan-400'
                : 'bg-gradient-to-tr from-slate-100 to-slate-200 border-slate-300/80 text-slate-800'
            }`}>
              {patient.initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-bold text-sm transition-colors ${
                  theme === 'dark' ? 'text-white group-hover:text-cyan-400' : 'text-slate-900 group-hover:text-sky-900'
                }`}>
                  {patient.name}
                </span>
                <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded-md border ${
                  theme === 'dark'
                    ? 'bg-slate-800 text-slate-400 border-slate-700'
                    : 'bg-slate-100 text-slate-600 border-slate-200/70'
                }`}>
                  {patient.code}
                </span>
              </div>
              <p className={`text-xs font-medium mt-0.5 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
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
        <div className={`p-3 rounded-xl border mb-3.5 flex items-center justify-between shadow-2xs ${
          theme === 'dark'
            ? 'bg-slate-950/60 border-slate-800/80 text-slate-200'
            : 'bg-slate-50/90 border-slate-200/70 text-slate-900'
        }`}>
          <div className="flex items-center gap-2 text-xs">
            <Pill className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
            <div className="truncate">
              <span className={`font-bold ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
                {patient.primaryMedication.name}
              </span>
              <span className={`ml-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
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
            <span className="text-[10px] text-cyan-400 font-semibold flex items-center gap-1">
              <Activity className="w-3 h-3" />
              {patient.contributingSignals.length} signals correlated
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {patient.contributingSignals.slice(0, 3).map((sig) => (
              <span
                key={sig.id}
                className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-lg font-medium shadow-2xs border ${
                  theme === 'dark'
                    ? 'bg-slate-800/90 border-slate-700 text-slate-300'
                    : 'bg-white border-slate-200/90 text-slate-700'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    sig.strength === 'Strong'
                      ? 'bg-cyan-400'
                      : sig.strength === 'Moderate'
                      ? 'bg-teal-400'
                      : 'bg-slate-400'
                  }`}
                />
                <span className="truncate max-w-[130px]">{sig.name}</span>
              </span>
            ))}
            {patient.contributingSignals.length > 3 && (
              <span className={`text-[11px] px-2 py-1 rounded-lg font-semibold border ${
                theme === 'dark'
                  ? 'bg-slate-800 text-slate-400 border-slate-700'
                  : 'bg-slate-100/90 text-slate-600 border-slate-200/70'
              }`}>
                +{patient.contributingSignals.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Timestamp & Investigation Actions */}
      <div className={`pt-3 border-t flex items-center justify-between gap-2 ${
        theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
      }`}>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
          <Clock className="w-3.5 h-3.5" />
          <span>{patient.lastReviewed}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelect(patient.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer active:scale-95 ${
              theme === 'dark'
                ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Profile
          </button>

          <button
            onClick={() => onInvestigate(patient.id)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 btn-press-3d"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Investigate</span>
          </button>
        </div>
      </div>
    </TiltCard>
  );
};
