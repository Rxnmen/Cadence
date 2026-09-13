import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  SAMPLE_IMAGING_SCANS,
  COMMON_MEDICATIONS,
  KNOWN_INTERACTIONS,
} from '../../data/antigravityData';
import { ImagingScan, DrugInfo, DrugInteractionAlert } from '../../types/antigravity';
import { TiltCard } from '../common/TiltCard';
import {
  Bot,
  Scan,
  Pill,
  Sparkles,
  Send,
  User,
  Zap,
  Activity,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Clock,
  ShieldCheck,
  Upload,
  RefreshCw,
  Copy,
  Check,
  Layers,
  FileText,
  Search,
  ArrowRight,
  Eye,
  Brain,
} from 'lucide-react';

type AssistantTab = 'chat' | 'imaging' | 'interactions';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sources?: string[];
}

export const AiAssistantsView: React.FC = () => {
  const { theme, patients, selectedPatient } = useApp();
  const [activeTab, setActiveTab] = useState<AssistantTab>('chat');

  // ==========================================
  // 1. AI CLINICAL ASSISTANT (CHAT) STATE
  // ==========================================
  const suggestedPrompts = [
    "Summarize Devendra Patel's history (CAD-4412)",
    'Suggest treatment plan for Stage 2 Hypertension',
    'Evaluate SGLT2 inhibitor risks in CKD Stage 3',
    "Compare Sunita Deshmukh's current BP against 6mo baseline",
    "What alternative confounders explain Vikram Malhotra's glucose spike?",
  ];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: `Greetings, Dr. Sharma. I am the **Cadence Clinical Decision Copilot v3.0**. I continuously cross-reference real-time patient vitals, telemetry streams, pharmacy claims, and longitudinal EHR encounters.\n\nCurrently monitoring **${patients.length} active patients** across your clinical roster. How may I assist your diagnostic review today?`,
      timestamp: 'Just now',
      sources: ['Cadence Neural Core', 'EHR HL7 FHIR Stream'],
    },
  ]);

  const [inputQuery, setInputQuery] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const generateAnswer = (query: string): { text: string; sources: string[] } => {
    const q = query.toLowerCase();

    if (q.includes('patient #4') || q.includes('devendra') || q.includes('patel')) {
      const p4 = patients.find((p) => p.code === 'CAD-4412') || patients[3];
      return {
        text: `**Clinical Synthesis for ${p4.name} (${p4.code}):**\n\n• **Primary Condition:** ${p4.condition}\n• **Current Vitals:** BP ${p4.vitalSigns?.bp}, Heart Rate ${p4.vitalSigns?.heartRate} bpm, SpO2 ${p4.vitalSigns?.spo2}%\n• **Decompensation Risk:** **${p4.riskScore}/100 (${p4.riskLevel} Priority)**\n\n**Key Alerts & Longitudinal Findings:**\n1. **Severe Hypertensive Excursion:** Ambulatory tele-BP spiked to 162/102 mmHg over the past 48 hours (+18 mmHg over baseline).\n2. **Serum Potassium Warning:** Most recent lab reflects K+ at 5.4 mEq/L alongside rising creatinine (1.9 to 2.2 mg/dL).\n3. **Drug Interaction Flag:** Concurrent administration of Spironolactone 25mg with worsening renal filtration carries high risk of hyperkalemic dysrhythmia.\n\n**Recommendation:** Immediate in-person or urgent tele-nephrology evaluation; withhold potassium-sparing diuretics pending repeat electrolyte panel within 24 hours.`,
        sources: ['LabCorp Biomarkers', 'Ambulatory Tele-BP', 'EHR Medication Administration'],
      };
    }

    if (q.includes('hypertension') || q.includes('treatment plan') || q.includes('stage 2')) {
      return {
        text: `**Evidence-Based Treatment Strategy for Stage 2 Hypertension (ACC/AHA Guidelines):**\n\n1. **Initiate Dual First-Line Therapy:** When baseline SBP is >20 mmHg or DBP >10 mmHg above goal (e.g. BP > 140/90 mmHg):\n   - **Option A:** ACE Inhibitor (e.g., Lisinopril 20mg) + Dihydropyridine CCB (e.g., Amlodipine 5mg)\n   - **Option B:** ARB (e.g., Telmisartan 40mg) + Thiazide-like diuretic (Chlorthalidone 12.5–25mg)\n2. **Monitoring Protocol:** Schedule repeat tele-monitoring review at 14 days and serum basic metabolic panel (BMP) at 30 days to assess eGFR and potassium.\n3. **Non-Pharmacological Integration:** Dietary DASH protocol (<1500 mg sodium/day) and remote Bluetooth cuff calibration check.`,
        sources: ['ACC/AHA 2024 Guidelines', 'Cadence Protocol Engine'],
      };
    }

    if (q.includes('sglt2') || q.includes('ckd') || q.includes('kidney')) {
      return {
        text: `**SGLT2 Inhibitor (e.g., Empagliflozin / Dapagliflozin) Evaluation in CKD Stage 3:**\n\n• **Therapeutic Indication:** Proven cardio-renal protection (EMPA-KIDNEY & DAPA-CKD trials) for eGFR down to 20 mL/min/1.73m².\n• **Expected Hemodynamic Effect:** Transient initial eGFR dip (~2–4 mL/min) within the first 2–4 weeks is normal due to tubuloglomerular feedback and afferent arteriolar tone stabilization.\n• **Critical Precautions:**\n  - Ensure patient is euvolemic to prevent pre-renal dehydration.\n  - Counsel on mycotic genital hygiene and sick-day protocol (temporary hold during acute febrile illnesses to prevent euglycemic DKA).`,
        sources: ['KDIGO 2024 Clinical Practice Guideline', 'EMPA-KIDNEY Trial Data'],
      };
    }

    if (q.includes('sunita') || q.includes('deshmukh') || q.includes('baseline')) {
      const p1 = patients[0];
      return {
        text: `**Baseline Comparison for Sunita Deshmukh (${p1.code}):**\n\n• **Current Tele-BP:** ${p1.vitalSigns?.bp} (Personal 6-month baseline: 124/78 mmHg) ➔ **+18 mmHg SBP Excursion**\n• **Heart Rate:** ${p1.vitalSigns?.heartRate} bpm (Personal baseline: 72 bpm)\n• **Oxygenation:** ${p1.vitalSigns?.spo2}% on room air\n• **Refill Timing:** 42-day interval between Lisinopril dispenses (+12 day delay)\n• **Alternative Explanation:** Cardiology clinic trial reduction from 20mg to 10mg daily on April 20 explains why existing tablet supply lasted longer than typical 30-day window.`,
        sources: ['Pharmacy Claims Gateway', 'Home Telehealth Monitor', 'Cardiology Encounters'],
      };
    }

    if (q.includes('vikram') || q.includes('malhotra') || q.includes('glucose') || q.includes('spike')) {
      return {
        text: `**Confounder Analysis for Vikram Malhotra (CAD-2089):**\n\n• **Observed Anomaly:** Continuous glucose telemetry averaged **212 mg/dL** over the past 5 days (baseline: 138 mg/dL).\n• **Primary Confounder Detected:** Surescripts pharmacy claim for Empagliflozin 25mg was rejected due to **Insurance Prior Authorization Lapse** on April 18.\n• **Clinical Impact:** The glucose spike is caused by an administrative supply barrier rather than patient non-adherence. Care coordination team has already initiated automated prior-auth renewal.`,
        sources: ['Surescripts Claims Portal', 'Dexcom CGM Cloud Stream', 'Payer Eligibility API'],
      };
    }

    return {
      text: `Based on authorized telemetry across your cohort, **${patients.length} patients** are monitored with active real-time anomaly detection. 3 patients currently exhibit high-priority decompensation flags (Vikram Malhotra, Devendra Patel, and Kavita Sundaram).\n\nWould you like me to generate an automated care plan, cross-reference medication interactions, or review radiological scans for any of these patients?`,
      sources: ['Cadence Neural Telemetry', 'Clinical Cohort Hub'],
    };
  };

  const handleSendMessage = (customText?: string) => {
    const text = customText || inputQuery;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAnswer(text);
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: 'Just now',
        sources: response.sources,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // ==========================================
  // 2. AI IMAGING & DIAGNOSTICS STATE
  // ==========================================
  const [selectedScan, setSelectedScan] = useState<ImagingScan>(SAMPLE_IMAGING_SCANS[0]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [scanStepText, setScanStepText] = useState<string>('Ready for Analysis');
  const [showHeatmap, setShowHeatmap] = useState<boolean>(true);
  const [analysisResult, setAnalysisResult] = useState<ImagingScan['defaultFindings'] | null>(
    SAMPLE_IMAGING_SCANS[0].defaultFindings
  );

  const handleSelectScan = (scan: ImagingScan) => {
    setSelectedScan(scan);
    setAnalysisResult(scan.defaultFindings);
    setIsScanning(false);
  };

  const handleTriggerScan = () => {
    setIsScanning(true);
    setAnalysisResult(null);
    setScanProgress(15);
    setScanStepText('Normalizing 16-bit DICOM pixel matrices...');

    setTimeout(() => {
      setScanProgress(45);
      setScanStepText('Segmenting anatomical structures and tissue density...');
    }, 500);

    setTimeout(() => {
      setScanProgress(80);
      setScanStepText('Cross-referencing 1.2M radiological deep learning benchmarks...');
    }, 1100);

    setTimeout(() => {
      setScanProgress(100);
      setIsScanning(false);
      setAnalysisResult(selectedScan.defaultFindings);
      setScanStepText('Diagnostic Synthesis Complete');
    }, 1600);
  };

  // ==========================================
  // 3. AI DRUG INTERACTION CHECKER STATE
  // ==========================================
  const [selectedDrugNames, setSelectedDrugNames] = useState<string[]>([
    'Lisinopril',
    'Spironolactone',
  ]);
  const [isCheckingInteractions, setIsCheckingInteractions] = useState<boolean>(false);
  const [detectedInteractions, setDetectedInteractions] = useState<DrugInteractionAlert[]>([
    KNOWN_INTERACTIONS[0],
  ]);

  const toggleDrugSelection = (drugName: string) => {
    if (selectedDrugNames.includes(drugName)) {
      setSelectedDrugNames(selectedDrugNames.filter((d) => d !== drugName));
    } else {
      setSelectedDrugNames([...selectedDrugNames, drugName]);
    }
  };

  const runDrugInteractionCheck = () => {
    setIsCheckingInteractions(true);

    setTimeout(() => {
      const results: DrugInteractionAlert[] = [];

      // Check all pairs in selectedDrugNames against KNOWN_INTERACTIONS
      for (let i = 0; i < selectedDrugNames.length; i++) {
        for (let j = i + 1; j < selectedDrugNames.length; j++) {
          const d1 = selectedDrugNames[i];
          const d2 = selectedDrugNames[j];

          const match = KNOWN_INTERACTIONS.find(
            (item) =>
              (item.drugs.includes(d1) && item.drugs.includes(d2)) ||
              (item.drugs[0] === d1 && item.drugs[1] === d2) ||
              (item.drugs[0] === d2 && item.drugs[1] === d1)
          );

          if (match && !results.includes(match)) {
            results.push(match);
          }
        }
      }

      setDetectedInteractions(results);
      setIsCheckingInteractions(false);
    }, 500);
  };

  const loadPresetCombination = (drugs: string[]) => {
    setSelectedDrugNames(drugs);
    setIsCheckingInteractions(true);
    setTimeout(() => {
      const results = KNOWN_INTERACTIONS.filter(
        (item) => drugs.includes(item.drugs[0]) && drugs.includes(item.drugs[1])
      );
      setDetectedInteractions(results);
      setIsCheckingInteractions(false);
    }, 400);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header & Tab Navigation */}
      <div className={`p-6 rounded-3xl border backdrop-blur-md transition-colors ${
        theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-200'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                  Cadence AI Medical Assistants
                </h1>
                <p className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  Interactive clinical copilots: Neural Decision Chat, Radiological Imaging Analysis, and Pharmacological Safety Shield.
                </p>
              </div>
            </div>
          </div>

          {/* Segmented Switcher for the 3 AI Panels */}
          <div className={`p-1.5 rounded-2xl border flex items-center gap-1.5 self-start md:self-auto ${
            theme === 'dark' ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-white shadow-md shadow-cyan-500/20'
                  : theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Clinical Chat</span>
            </button>

            <button
              onClick={() => setActiveTab('imaging')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'imaging'
                  ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-white shadow-md shadow-cyan-500/20'
                  : theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Scan className="w-3.5 h-3.5" />
              <span>Imaging & Diagnostics</span>
            </button>

            <button
              onClick={() => setActiveTab('interactions')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'interactions'
                  ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-white shadow-md shadow-cyan-500/20'
                  : theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Pill className="w-3.5 h-3.5" />
              <span>Drug Interactions</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. AI CLINICAL ASSISTANT (CHAT INTERFACE) */}
      {/* ========================================================= */}
      {activeTab === 'chat' && (
        <div className={`rounded-3xl border flex flex-col h-[calc(100vh-210px)] min-h-[620px] overflow-hidden backdrop-blur-md transition-colors ${
          theme === 'dark' ? 'bg-[#0f172a]/95 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          {/* Chat Header */}
          <div className={`p-4 sm:p-5 border-b flex items-center justify-between ${
            theme === 'dark' ? 'border-slate-800 bg-slate-950/60' : 'border-slate-100 bg-slate-50/70'
          }`}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold tracking-tight">Cadence Clinical Copilot</h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                    Decision Support Core
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Real-time clinical reasoning across patient telemetry, vitals, claims, and biomarkers.
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>HL7 FHIR Clinical Verified</span>
            </div>
          </div>

          {/* Suggested Prompt Chips */}
          <div className={`px-4 py-2.5 border-b overflow-x-auto flex items-center gap-2 text-xs no-scrollbar ${
            theme === 'dark' ? 'border-slate-800/80 bg-slate-900/40' : 'border-slate-100 bg-slate-50/40'
          }`}>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" /> Suggested:
            </span>
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap border transition-all cursor-pointer shadow-2xs ${
                  theme === 'dark'
                    ? 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-cyan-300 border-slate-700'
                    : 'bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-900 border-slate-200'
                }`}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                      isUser
                        ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white'
                        : theme === 'dark'
                        ? 'bg-cyan-950/80 border border-cyan-800/60 text-cyan-400'
                        : 'bg-cyan-50 border border-cyan-200 text-cyan-700'
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`p-4 rounded-3xl text-xs space-y-2 leading-relaxed transition-all ${
                      isUser
                        ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white rounded-tr-none shadow-md'
                        : theme === 'dark'
                        ? 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm'
                        : 'bg-slate-50 border border-slate-200/90 text-slate-800 rounded-tl-none'
                    }`}
                  >
                    <div className="whitespace-pre-line font-normal text-xs sm:text-[13px] leading-relaxed">
                      {msg.text}
                    </div>

                    {!isUser && msg.sources && (
                      <div className="pt-2.5 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-400">
                          <span className="font-bold flex items-center gap-1 text-slate-300">
                            <Zap className="w-3 h-3 text-cyan-400" /> Correlated Signals:
                          </span>
                          {msg.sources.map((src, i) => (
                            <span
                              key={i}
                              className={`px-2 py-0.5 rounded-md border font-medium ${
                                theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-600'
                              }`}
                            >
                              {src}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="text-[11px] text-slate-400 hover:text-cyan-400 flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400 font-semibold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Note</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex gap-3 items-center text-xs text-slate-400 animate-pulse">
                <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className={`p-3 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="text-[11px] text-slate-400 ml-1 font-mono">Analyzing clinical parameters...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className={`p-3.5 border-t flex items-center gap-2 ${
              theme === 'dark' ? 'border-slate-800 bg-slate-950/70' : 'border-slate-100 bg-white'
            }`}
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask Cadence Copilot about patient history, treatment guidelines, or vitals..."
              className={`flex-1 px-4 py-3 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 border transition-all ${
                theme === 'dark'
                  ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500 focus:ring-cyan-500'
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-sky-500'
              }`}
            />

            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-40 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. AI IMAGING & DIAGNOSTICS PANEL */}
      {/* ========================================================= */}
      {activeTab === 'imaging' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Image Canvas & Upload Simulation */}
          <div className={`lg:col-span-7 p-6 rounded-3xl border backdrop-blur-md space-y-5 ${
            theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                  <Scan className="w-4 h-4 text-cyan-400" />
                  <span>Radiological Visual Workspace</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Interactive scan viewer with neural bounding boxes and structural density mapping.
                </p>
              </div>

              {/* Toggle Heatmap Overlay */}
              <button
                onClick={() => setShowHeatmap(!showHeatmap)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  showHeatmap
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showHeatmap ? 'AI Overlay: ON' : 'AI Overlay: OFF'}</span>
                </span>
              </button>
            </div>

            {/* Visual Scan Canvas Simulator */}
            <div className="relative aspect-4/3 w-full rounded-2xl bg-black border border-slate-800 overflow-hidden flex items-center justify-center group shadow-2xl">
              {/* Laser scan animation when analyzing */}
              {isScanning && (
                <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-lg shadow-cyan-400 animate-scan-laser z-30" />
              )}

              {/* Stylized Anatomical Graphic SVG Simulator */}
              <div className="w-full h-full p-8 flex items-center justify-center relative">
                {selectedScan.type === 'xray' && (
                  <svg viewBox="0 0 400 300" className="w-full h-full opacity-80 filter drop-shadow">
                    {/* Spine & Ribcage Silhouette */}
                    <path d="M200,20 L200,280" stroke="#475569" strokeWidth="10" strokeDasharray="6,4" />
                    {/* Clavicles */}
                    <path d="M120,50 Q200,70 280,50" stroke="#64748b" strokeWidth="6" fill="none" />
                    {/* Ribs left */}
                    <path d="M190,80 Q100,100 120,150" stroke="#475569" strokeWidth="4" fill="none" />
                    <path d="M190,110 Q90,135 115,180" stroke="#475569" strokeWidth="4" fill="none" />
                    <path d="M190,140 Q90,170 120,210" stroke="#475569" strokeWidth="4" fill="none" />
                    {/* Ribs right */}
                    <path d="M210,80 Q300,100 280,150" stroke="#475569" strokeWidth="4" fill="none" />
                    <path d="M210,110 Q310,135 285,180" stroke="#475569" strokeWidth="4" fill="none" />
                    <path d="M210,140 Q310,170 280,210" stroke="#475569" strokeWidth="4" fill="none" />
                    {/* Heart Silhouette */}
                    <path d="M170,140 C170,110 240,110 240,160 C240,210 180,230 170,140 Z" fill="#334155" opacity="0.6" />
                    {/* Lung Fields */}
                    <circle cx="140" cy="140" r="50" fill="#0f172a" opacity="0.8" />
                    <circle cx="260" cy="140" r="50" fill="#0f172a" opacity="0.8" />
                  </svg>
                )}

                {selectedScan.type === 'mri' && (
                  <svg viewBox="0 0 400 300" className="w-full h-full opacity-80">
                    <ellipse cx="200" cy="150" rx="110" ry="125" fill="#1e293b" stroke="#475569" strokeWidth="4" />
                    <path d="M200,35 L200,265" stroke="#334155" strokeWidth="2" strokeDasharray="4,4" />
                    {/* Cerebral Sulci and ventricles */}
                    <ellipse cx="185" cy="150" rx="15" ry="35" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
                    <ellipse cx="215" cy="150" rx="15" ry="35" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
                  </svg>
                )}

                {selectedScan.type === 'echo' && (
                  <svg viewBox="0 0 400 300" className="w-full h-full opacity-80">
                    {/* 4 Chamber Heart Echo Sector */}
                    <path d="M200,20 L80,270 L320,270 Z" fill="#1e293b" stroke="#334155" strokeWidth="3" />
                    {/* Ventricular Septum */}
                    <line x1="200" y1="80" x2="200" y2="270" stroke="#64748b" strokeWidth="4" />
                    {/* Atrioventricular Valvular Plane */}
                    <line x1="120" y1="180" x2="280" y2="180" stroke="#64748b" strokeWidth="3" />
                  </svg>
                )}

                {selectedScan.type === 'ct' && (
                  <svg viewBox="0 0 400 300" className="w-full h-full opacity-80">
                    <ellipse cx="200" cy="150" rx="130" ry="100" fill="#1e293b" stroke="#475569" strokeWidth="6" />
                    <circle cx="150" cy="150" r="45" fill="#090d16" />
                    <circle cx="250" cy="150" r="45" fill="#090d16" />
                    <ellipse cx="200" cy="130" rx="30" ry="25" fill="#334155" />
                  </svg>
                )}

                {/* Heatmap Bounding Boxes Overlay */}
                {showHeatmap && !isScanning && selectedScan.defaultFindings.boundingZones?.map((zone, idx) => (
                  <div
                    key={idx}
                    className="absolute border-2 border-dashed border-cyan-400 bg-cyan-500/15 rounded-xl flex items-start justify-end p-1 transition-all"
                    style={{
                      left: `${zone.x}%`,
                      top: `${zone.y}%`,
                      width: `${zone.width}%`,
                      height: `${zone.height}%`,
                    }}
                  >
                    <span className="bg-cyan-500 text-slate-950 font-bold text-[9px] px-1.5 py-0.5 rounded shadow">
                      {zone.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Overlay Metadata Tag */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] text-slate-300 font-mono">
                {selectedScan.title} • {selectedScan.bodyPart}
              </div>

              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-slate-950/80 text-[10px] text-cyan-400 font-mono border border-slate-800">
                Resolution: 2048x1536 (16-bit)
              </div>
            </div>

            {/* Selectable Sample Scans Selector */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Select Patient Diagnostic Scan to Inspect:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SAMPLE_IMAGING_SCANS.map((scan) => (
                  <button
                    key={scan.id}
                    onClick={() => handleSelectScan(scan)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedScan.id === scan.id
                        ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-950/40'
                        : theme === 'dark'
                        ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold text-cyan-400 block font-mono">
                      {scan.type.toUpperCase()}
                    </span>
                    <span className="font-bold text-xs block truncate">{scan.title.split(' ')[0]} {scan.title.split(' ')[1]}</span>
                    <span className="text-[10px] text-slate-400 block truncate">{scan.patientName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Trigger Button */}
            <button
              onClick={handleTriggerScan}
              disabled={isScanning}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              {isScanning ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{scanStepText} ({scanProgress}%)</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Trigger Cadence Deep Scan Analysis</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: AI Diagnostic Findings Report */}
          <div className={`lg:col-span-5 p-6 rounded-3xl border backdrop-blur-md flex flex-col justify-between space-y-4 ${
            theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-cyan-400" />
                  <span>Neural Radiological Report</span>
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60 font-bold">
                  v3.0 Scan
                </span>
              </div>

              {isScanning ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 mx-auto flex items-center justify-center animate-pulse">
                    <Scan className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-200">Neural Model Active</h4>
                  <p className="text-xs text-cyan-400 font-mono">{scanStepText}</p>
                </div>
              ) : analysisResult ? (
                <div className="space-y-4 animate-in fade-in">
                  {/* Confidence Score Pill */}
                  <div className="p-4 rounded-2xl bg-gradient-to-tr from-cyan-950/40 to-slate-900 border border-cyan-800/50 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Diagnostic Precision</span>
                      <span className="text-xs font-bold font-mono text-cyan-400">
                        {analysisResult.confidence}% Confidence
                      </span>
                    </div>
                    <div className="text-sm font-extrabold text-white">
                      {analysisResult.diagnosis}
                    </div>
                  </div>

                  {/* Observations List */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Key Radiological Observations:
                    </span>
                    <div className="space-y-1.5">
                      {analysisResult.observations.map((obs, i) => (
                        <div key={i} className="text-xs text-slate-300 flex items-start gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800/60">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{obs}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Follow-up Recommendations */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Clinical Recommendations:
                    </span>
                    <div className="space-y-1.5">
                      {analysisResult.recommendations.map((rec, i) => (
                        <div key={i} className="text-xs text-slate-300 flex items-start gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800/60">
                          <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>Patient: <strong className="text-slate-200">{selectedScan.patientName}</strong></span>
              <span>Acquisition Date: {selectedScan.date}</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. AI DRUG INTERACTION CHECKER */}
      {/* ========================================================= */}
      {activeTab === 'interactions' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Multi-select Medications Tool */}
          <div className={`lg:col-span-7 p-6 rounded-3xl border backdrop-blur-md space-y-5 ${
            theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                  <Pill className="w-4 h-4 text-cyan-400" />
                  <span>Pharmacological Regimen Multi-Selector</span>
                </h3>
                <span className="text-xs font-mono font-bold text-cyan-400">
                  {selectedDrugNames.length} Selected
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Select two or more medications to analyze pharmacokinetic and pharmacodynamic contraindications.
              </p>
            </div>

            {/* Quick Preset Buttons */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Quick Test Combinations:
              </span>
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <button
                  onClick={() => loadPresetCombination(['Warfarin', 'Amiodarone'])}
                  className="px-3 py-1 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 cursor-pointer font-medium"
                >
                  ⚡ Warfarin + Amiodarone (Bleed Risk)
                </button>
                <button
                  onClick={() => loadPresetCombination(['Lisinopril', 'Spironolactone'])}
                  className="px-3 py-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 cursor-pointer font-medium"
                >
                  ⚡ Lisinopril + Spironolactone (K+ Risk)
                </button>
                <button
                  onClick={() => loadPresetCombination(['Clopidogrel', 'Ibuprofen'])}
                  className="px-3 py-1 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 cursor-pointer font-medium"
                >
                  ⚡ Clopidogrel + Ibuprofen (GI Bleed)
                </button>
                <button
                  onClick={() => loadPresetCombination(['Metformin', 'Atorvastatin'])}
                  className="px-3 py-1 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-pointer font-medium"
                >
                  ✓ Safe Regimen
                </button>
              </div>
            </div>

            {/* Grid of Multi-Select Drug Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
              {COMMON_MEDICATIONS.map((drug) => {
                const isSelected = selectedDrugNames.includes(drug.name);
                return (
                  <button
                    key={drug.id}
                    onClick={() => toggleDrugSelection(drug.name)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-tr from-cyan-950/80 to-slate-900 border-cyan-400 text-white shadow-md shadow-cyan-950/40 ring-1 ring-cyan-400'
                        : theme === 'dark'
                        ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs">{drug.name}</span>
                        <span className={`w-3.5 h-3.5 rounded-md flex items-center justify-center border text-[9px] ${
                          isSelected ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold' : 'border-slate-600'
                        }`}>
                          {isSelected && '✓'}
                        </span>
                      </div>
                      <span className="text-[10px] text-cyan-400/80 font-mono block truncate">{drug.category}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-2 block truncate">{drug.indication}</span>
                  </button>
                );
              })}
            </div>

            {/* Run Analysis Button */}
            <button
              onClick={runDrugInteractionCheck}
              disabled={selectedDrugNames.length < 2 || isCheckingInteractions}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              {isCheckingInteractions ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Scanning Polypharmacy Matrix...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Analyze Selected Interactions ({selectedDrugNames.length} Drugs)</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Dynamic Warning Alerts & Pharmacology */}
          <div className={`lg:col-span-5 p-6 rounded-3xl border backdrop-blur-md space-y-4 ${
            theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Interaction Safety Warnings</span>
              </h3>
              <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                detectedInteractions.length > 0
                  ? 'bg-rose-950 text-rose-400 border border-rose-800'
                  : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
              }`}>
                {detectedInteractions.length} Flags Detected
              </span>
            </div>

            {isCheckingInteractions ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 mx-auto flex items-center justify-center animate-spin">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-200">Evaluating Enzyme Substrates</h4>
                <p className="text-xs text-cyan-400 font-mono">Cross-referencing CYP3A4, CYP2C9, and renal clearances...</p>
              </div>
            ) : detectedInteractions.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-200">No High-Risk Contraindications Found</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  The selected medication combination shows no documented major pharmacokinetic or pharmacodynamic antagonism.
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
                {detectedInteractions.map((alert, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border space-y-2.5 transition-all ${
                      alert.severity === 'Major'
                        ? 'bg-rose-950/20 border-rose-800/60'
                        : 'bg-amber-950/20 border-amber-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-slate-100">
                        <span>{alert.drugs[0]}</span>
                        <span className="text-rose-400 font-mono">⚡</span>
                        <span>{alert.drugs[1]}</span>
                      </div>

                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                        alert.severity === 'Major'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      }`}>
                        {alert.severity} Hazard
                      </span>
                    </div>

                    {/* Mechanism */}
                    <div className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-slate-100 block mb-0.5">Mechanism:</strong>
                      {alert.mechanism}
                    </div>

                    {/* Clinical Risk */}
                    <div className="text-[11px] text-rose-300/90 leading-relaxed bg-rose-950/30 p-2.5 rounded-xl border border-rose-900/40">
                      <strong>Clinical Risk:</strong> {alert.clinicalRisk}
                    </div>

                    {/* Management */}
                    <div className="text-[11px] text-cyan-300 leading-relaxed bg-cyan-950/30 p-2.5 rounded-xl border border-cyan-900/40">
                      <strong>Recommended Action:</strong> {alert.management}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
