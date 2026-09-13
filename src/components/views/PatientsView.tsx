import React from 'react';
import { useApp } from '../../context/AppContext';
import { TiltCard } from '../common/TiltCard';
import { PatientDetailsModal } from '../patients/PatientDetailsModal';
import { AiAssessmentModal } from '../patients/AiAssessmentModal';
import {
  Users,
  Search,
  Filter,
  Heart,
  Activity,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Eye,
  X,
  TrendingUp,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const PatientsView: React.FC = () => {
  const {
    filteredPatients,
    patients,
    searchQuery,
    setSearchQuery,
    riskFilter,
    setRiskFilter,
    detailsModalPatient,
    openPatientDetails,
    closePatientDetails,
    assessmentModal,
    runAiAssessment,
    closeAssessmentModal,
    theme,
  } = useApp();

  const totalCount = patients.length;
  const highCount = patients.filter((p) => p.riskLevel === 'High' || p.riskCategory === 'High Priority').length;
  const modCount = patients.filter((p) => p.riskLevel === 'Moderate' || p.riskCategory === 'Moderate Concern').length;
  const lowCount = patients.filter((p) => p.riskLevel === 'Low' || p.riskCategory === 'Stable / Low Concern' || p.riskCategory === 'Improving').length;

  return (
    <div className="space-y-6 pb-16">
      {/* Modals */}
      {detailsModalPatient && (
        <PatientDetailsModal
          patient={detailsModalPatient}
          onClose={closePatientDetails}
          onRunAssessment={runAiAssessment}
        />
      )}

      {assessmentModal && (
        <AiAssessmentModal
          assessmentState={assessmentModal}
          onClose={closeAssessmentModal}
        />
      )}

      {/* Header Banner */}
      <div className={`relative overflow-hidden p-6 rounded-3xl border backdrop-blur-md transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-slate-900/80 border-slate-800/90 text-slate-100 shadow-xl shadow-cyan-950/20'
          : 'bg-white/90 border-slate-200/90 text-slate-900 shadow-sm'
      }`}>
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/25">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                  Patient Management & Clinical Roster
                </h1>
                <p className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  Real-time ambulatory telemetry, decompensation risk stratification, and AI decision-support for authorized patients.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <div className={`px-3 py-1.5 rounded-xl border font-semibold flex items-center gap-1.5 ${
              theme === 'dark' ? 'bg-slate-800/80 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span><strong>{totalCount}</strong> Enrolled</span>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              <span><strong>{highCount}</strong> High Priority</span>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold flex items-center gap-1.5">
              <span><strong>{modCount}</strong> Moderate</span>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold flex items-center gap-1.5">
              <span><strong>{lowCount}</strong> Stable</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls: Search Bar & Risk Filter Buttons */}
      <div className={`p-4 rounded-2xl border backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-3 transition-colors ${
        theme === 'dark' ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white/80 border-slate-200/90'
      }`}>
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by patient name, ID (e.g. AG-1042), or condition..."
            className={`w-full pl-10 pr-9 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 border transition-all ${
              theme === 'dark'
                ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-500 focus:ring-cyan-500'
                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-sky-500'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Risk Filter Buttons */}
        <div className="flex items-center gap-1.5 text-xs flex-wrap">
          <span className={`text-[10px] font-bold uppercase tracking-wider mr-1 ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Filter:
          </span>

          <button
            onClick={() => setRiskFilter('all')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
              riskFilter === 'all'
                ? theme === 'dark'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                  : 'bg-slate-900 text-white font-bold'
                : theme === 'dark'
                ? 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-700'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            All Patients ({totalCount})
          </button>

          <button
            onClick={() => setRiskFilter('high')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              riskFilter === 'high'
                ? 'bg-rose-600 text-white font-bold shadow-sm shadow-rose-500/20'
                : 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span>High Risk ({highCount})</span>
          </button>

          <button
            onClick={() => setRiskFilter('moderate')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              riskFilter === 'moderate'
                ? 'bg-amber-600 text-white font-bold shadow-sm shadow-amber-500/20'
                : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20'
            }`}
          >
            <span>Moderate ({modCount})</span>
          </button>

          <button
            onClick={() => setRiskFilter('low')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              riskFilter === 'low'
                ? 'bg-emerald-600 text-white font-bold shadow-sm shadow-emerald-500/20'
                : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20'
            }`}
          >
            <span>Low Risk ({lowCount})</span>
          </button>
        </div>
      </div>

      {/* Patient Cards Grid */}
      {filteredPatients.length === 0 ? (
        <div className={`p-12 rounded-3xl border text-center space-y-3 ${
          theme === 'dark' ? 'bg-slate-900/40 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
        }`}>
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 mx-auto flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold">No Patients Match Criteria</h3>
          <p className="text-xs">
            Try adjusting your search query or reset the risk filter to 'All Patients'.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setRiskFilter('all');
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md transition-all"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {filteredPatients.map((patient) => {
            const isHigh = patient.riskLevel === 'High' || patient.riskCategory === 'High Priority';
            const isModerate = patient.riskLevel === 'Moderate' || patient.riskCategory === 'Moderate Concern';

            const riskBadgeClass = isHigh
              ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
              : isModerate
              ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
              : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';

            return (
              <TiltCard
                key={patient.id}
                className={`p-5 rounded-3xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden group ${
                  theme === 'dark'
                    ? 'bg-slate-900/85 border-slate-800 hover:border-cyan-500/40 shadow-lg shadow-black/20 hover:shadow-cyan-950/20'
                    : 'bg-white border-slate-200/90 hover:border-sky-300 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Visual Status Indicator Top Strip */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 ${
                    isHigh ? 'bg-rose-500' : isModerate ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                />

                <div className="space-y-4">
                  {/* Top Row: Patient Name, ID & Risk Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                        {patient.initials || patient.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className={`font-bold text-sm sm:text-base tracking-tight leading-snug group-hover:text-cyan-400 transition-colors ${
                          theme === 'dark' ? 'text-white' : 'text-slate-900'
                        }`}>
                          {patient.name}
                        </h3>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                          <span className="font-mono font-bold text-cyan-400">
                            {patient.patientId || patient.code}
                          </span>
                          <span>•</span>
                          <span>{patient.age} yrs • {patient.gender}</span>
                        </div>
                      </div>
                    </div>

                    {/* Risk Level Badge */}
                    <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shrink-0 flex items-center gap-1 ${riskBadgeClass}`}>
                      {isHigh ? (
                        <AlertCircle className="w-3 h-3 text-rose-500" />
                      ) : isModerate ? (
                        <AlertTriangle className="w-3 h-3 text-amber-500" />
                      ) : (
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      )}
                      <span>{patient.riskLevel || 'Moderate'}</span>
                    </div>
                  </div>

                  {/* Primary Disease / Condition */}
                  <div className={`p-3 rounded-2xl border text-xs ${
                    theme === 'dark' ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-50 border-slate-200/80'
                  }`}>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                      Primary Diagnosis
                    </span>
                    <span className={`font-semibold line-clamp-1 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                      {patient.condition}
                    </span>
                  </div>

                  {/* Vital Signs Grid (BP, Heart Rate, SpO2) */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    {/* BP */}
                    <div className={`p-2.5 rounded-xl border ${
                      theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">BP</span>
                      <span className="font-mono font-bold text-cyan-400 text-xs truncate block">
                        {patient.vitalSigns?.bp.split(' ')[0] || '138/88'}
                      </span>
                    </div>

                    {/* Heart Rate */}
                    <div className={`p-2.5 rounded-xl border ${
                      theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Pulse</span>
                      <span className="font-mono font-bold text-rose-400 text-xs flex items-center justify-center gap-1">
                        <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500" />
                        <span>{patient.vitalSigns?.heartRate || 76}</span>
                      </span>
                    </div>

                    {/* SpO2 */}
                    <div className={`p-2.5 rounded-xl border ${
                      theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">SpO2</span>
                      <span className="font-mono font-bold text-teal-400 text-xs">
                        {patient.vitalSigns?.spo2 || 97}%
                      </span>
                    </div>
                  </div>

                  {/* Last Visit Date */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>Last Clinical Visit:</span>
                    </span>
                    <strong className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                      {patient.lastVisitDate || 'May 2026'}
                    </strong>
                  </div>
                </div>

                {/* Card Action Buttons: "View Details" & "Run AI Assessment" (Requirement) */}
                <div className={`mt-5 pt-4 border-t flex items-center gap-2 ${
                  theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
                }`}>
                  <button
                    onClick={() => openPatientDetails(patient)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
                      theme === 'dark'
                        ? 'bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border-slate-700 hover:border-slate-600'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    <span>View Details</span>
                  </button>

                  <button
                    onClick={() => runAiAssessment(patient)}
                    className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Run AI Assessment</span>
                  </button>
                </div>
              </TiltCard>
            );
          })}
        </div>
      )}
    </div>
  );
};
