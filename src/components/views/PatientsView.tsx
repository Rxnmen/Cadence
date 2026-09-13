import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MedicationTab } from '../patient/MedicationTab';
import { RefillsTab } from '../patient/RefillsTab';
import { SymptomsTab } from '../patient/SymptomsTab';
import { ClinicalDataTab } from '../patient/ClinicalDataTab';
import { WearablesTab } from '../patient/WearablesTab';
import { InvestigationTimeline } from '../detective/InvestigationTimeline';
import { AiSummaryCard } from '../detective/AiSummaryCard';
import { RadialScore } from '../common/RadialScore';
import { RiskBadge, ConfidenceBadge } from '../common/RiskBadge';
import { UncertaintyDisclaimer } from '../common/UncertaintyDisclaimer';
import {
  Users,
  Search,
  Pill,
  Calendar,
  Activity,
  HeartPulse,
  Watch,
  Layers,
  Sparkles,
  Clock,
  ArrowRight,
  Filter,
} from 'lucide-react';

type PatientTab =
  | 'overview'
  | 'medication'
  | 'refills'
  | 'symptoms'
  | 'clinical'
  | 'wearables'
  | 'timeline'
  | 'insights';

export const PatientsView: React.FC = () => {
  const { patients, selectedPatient, setSelectedPatientId, openDetective } = useApp();
  const [activeTab, setActiveTab] = useState<PatientTab>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCohort = patients.filter((p) => {
    if (!searchQuery) return true;
    return (
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.primaryMedication.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const tabs: { id: PatientTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'overview', label: 'Overview', icon: Layers },
    { id: 'medication', label: 'Medication', icon: Pill },
    { id: 'refills', label: 'Refills', icon: Calendar },
    { id: 'symptoms', label: 'Symptoms', icon: Activity },
    { id: 'clinical', label: 'Clinical Data', icon: HeartPulse },
    { id: 'wearables', label: 'Wearables', icon: Watch },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'insights', label: 'AI Insights', icon: Sparkles },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Search & Patient Cohort Quick Selector Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-sky-600" />
          <h2 className="text-base font-bold text-slate-900">
            Patient Medical Records & Adherence Dossier
          </h2>
        </div>

        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, ID (e.g. PT-1042), condition, or drug..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>
      </div>

      {/* Cohort Carousel Selector */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2">
        {filteredCohort.map((p) => {
          const isSelected = p.id === selectedPatient.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPatientId(p.id)}
              className={`p-3 rounded-xl border shrink-0 text-left transition-all min-w-[200px] ${
                isSelected
                  ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs">{p.name}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isSelected ? 'bg-sky-700 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {p.code}
                </span>
              </div>
              <div
                className={`text-[11px] truncate ${
                  isSelected ? 'text-sky-100' : 'text-slate-500'
                }`}
              >
                {p.condition}
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className="font-semibold">Risk: {p.riskScore}/100</span>
                <span
                  className={`text-[10px] font-medium px-1.5 py-0.2 rounded ${
                    isSelected
                      ? 'bg-sky-500 text-white'
                      : p.riskCategory === 'High Priority'
                      ? 'text-rose-700 bg-rose-50'
                      : p.riskCategory === 'Moderate Concern'
                      ? 'text-amber-800 bg-amber-50'
                      : 'text-emerald-700 bg-emerald-50'
                  }`}
                >
                  {p.riskCategory}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Persistent Patient Profile Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-600 to-teal-500 text-white font-bold text-lg flex items-center justify-center shadow-xs shrink-0">
              {selectedPatient.initials}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl font-bold text-slate-900">
                  {selectedPatient.name}
                </h3>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-600">
                  {selectedPatient.code}
                </span>
                <span className="text-xs text-slate-500">
                  {selectedPatient.age} yrs • {selectedPatient.gender}
                </span>
                <RiskBadge category={selectedPatient.riskCategory} size="sm" />
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-600 mt-1.5 flex-wrap">
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  <Pill className="w-3.5 h-3.5 text-sky-600" />
                  {selectedPatient.primaryMedication.name} ({selectedPatient.primaryMedication.dosage})
                </span>
                <span>• Indication: {selectedPatient.condition}</span>
                <span className="text-slate-400">
                  Last reviewed: {selectedPatient.lastReviewed}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end lg:self-auto">
            <button
              onClick={() => openDetective(selectedPatient.id)}
              className="px-3.5 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs rounded-xl shadow-2xs transition-colors flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Launch Adherence Detective</span>
            </button>
          </div>
        </div>

        {/* 8 Navigation Tabs */}
        <div className="flex items-center gap-1 border-b border-slate-200 overflow-x-auto pt-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-sky-600 text-sky-600 bg-sky-50/50 rounded-t-lg'
                    : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Panes */}
      <div>
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <InvestigationTimeline timeline={selectedPatient.timeline.slice(0, 4)} />
              <AiSummaryCard
                initialSummary={selectedPatient.aiSummary}
                patientName={selectedPatient.name}
              />
            </div>

            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  Adherence Risk Score
                </h4>
                <RadialScore
                  score={selectedPatient.riskScore}
                  category={selectedPatient.riskCategory}
                  contributingSignals={selectedPatient.contributingSignals}
                  size="md"
                />
              </div>

              <UncertaintyDisclaimer compact={true} />
            </div>
          </div>
        )}

        {activeTab === 'medication' && (
          <MedicationTab medication={selectedPatient.primaryMedication} />
        )}

        {activeTab === 'refills' && (
          <RefillsTab refills={selectedPatient.refillHistory} />
        )}

        {activeTab === 'symptoms' && (
          <SymptomsTab symptoms={selectedPatient.symptomHistory} />
        )}

        {activeTab === 'clinical' && (
          <ClinicalDataTab measurements={selectedPatient.clinicalMeasurements} />
        )}

        {activeTab === 'wearables' && (
          <WearablesTab wearables={selectedPatient.wearablesData} />
        )}

        {activeTab === 'timeline' && (
          <InvestigationTimeline timeline={selectedPatient.timeline} />
        )}

        {activeTab === 'insights' && (
          <div className="space-y-6">
            <AiSummaryCard
              initialSummary={selectedPatient.aiSummary}
              patientName={selectedPatient.name}
            />
            <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 text-xs text-sky-950 flex items-center justify-between">
              <span>
                Want to investigate full multi-signal correlation and alternative hypotheses?
              </span>
              <button
                onClick={() => openDetective(selectedPatient.id)}
                className="px-3 py-1.5 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700"
              >
                Open Full Detective Mode
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
