import React from 'react';
import { Medication } from '../../types/patient';
import {
  Pill,
  Clock,
  User,
  Calendar,
  AlertCircle,
  FileText,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

interface MedicationTabProps {
  medication: Medication;
}

export const MedicationTab: React.FC<MedicationTabProps> = ({ medication }) => {
  return (
    <div className="space-y-4">
      {/* Dosage Change Highlight Banner */}
      <div className="p-4 bg-amber-50/70 border border-amber-200/90 rounded-2xl flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-amber-950">
          <div className="font-bold flex items-center gap-2">
            <span>Prescription Change Detected</span>
            <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold">
              Potential Confounder
            </span>
          </div>
          <p className="text-amber-900 leading-relaxed">
            Dosage changed 3 weeks ago (Trial reduction from 20 mg to 10 mg daily). If the patient was instructed to divide remaining 20 mg tablets or reduce dosing frequency, existing pill counts would extend significantly beyond the normal 30-day window.
          </p>
        </div>
      </div>

      {/* Current Medication Specifications */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
        <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Pill className="w-4 h-4 text-sky-600" />
          <span>Active Primary Regimen</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Medication Name & Strength
            </span>
            <span className="text-sm font-bold text-slate-900 block">
              {medication.name}
            </span>
            <span className="text-slate-500 font-mono text-[11px]">
              Generic: {medication.genericName} ({medication.dosage})
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Dosing Schedule & Route
            </span>
            <span className="text-sm font-bold text-slate-900 block">
              {medication.frequency}
            </span>
            <span className="text-slate-500 text-[11px]">{medication.route}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Prescriber & Initial Date
            </span>
            <span className="text-sm font-bold text-slate-900 block truncate">
              {medication.prescribingProvider}
            </span>
            <span className="text-slate-500 text-[11px]">
              Initiated {medication.startDate}
            </span>
          </div>
        </div>
      </div>

      {/* Prescription History Timeline */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-600" />
              <span>Prescription History & Dosage Progression</span>
            </h4>
            <p className="text-xs text-slate-500">
              Longitudinal tracking of authorized dosage titrations.
            </p>
          </div>

          {/* Quick visual badge */}
          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
            20 mg ➔ 20 mg ➔ 10 mg
          </span>
        </div>

        <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {medication.history.map((hist, idx) => (
            <div key={idx} className="relative group text-xs">
              {/* Bullet node */}
              <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-white border-2 border-sky-600 group-hover:scale-110 transition-transform" />

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{hist.dosage}</span>
                  <span className="text-[11px] text-slate-400">{hist.date}</span>
                </div>
                <p className="text-slate-600 leading-snug">{hist.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
