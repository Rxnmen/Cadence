import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bot,
  Send,
  Sparkles,
  User,
  ShieldAlert,
  ArrowRight,
  Info,
  Clock,
  Layers,
  Search,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sources?: string[];
  patientCode?: string;
}

export const ChatAssistant: React.FC = () => {
  const { selectedPatient, patients, openDetective } = useApp();

  const suggestedPrompts = [
    'Why was this patient flagged?',
    'When did the adherence pattern change?',
    'What signals contributed most to the risk score?',
    'What alternative explanations should I consider?',
    "Compare this patient's current pattern with their baseline.",
    "Summarize this patient's last 30 days.",
    'Which patients require the most attention today?',
  ];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: `Hello Dr. Sharma. I am the Cadence Clinical Decision Assistant. I analyze routine multimodal signals (pharmacy claims, symptom logs, telemonitoring vitals, and wearables) across your authorized cohort to help connect subtle clinical clues.\n\nCurrently reviewing ${selectedPatient.name} (${selectedPatient.code}) — ${selectedPatient.primaryMedication.name}. How can I assist your clinical review?`,
      timestamp: 'Just now',
    },
  ]);

  const [inputQuery, setInputQuery] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const generateAnswer = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('why') && q.includes('flagged')) {
      return `${selectedPatient.name} (${selectedPatient.code}) was flagged due to a temporal convergence of multiple independent signals:\n\n1. **Pharmacy Refill Delay (30% weight):** Two consecutive refill intervals extended to 38 days (April) and 42 days (May), exceeding the 30-day baseline by 8–12 days.\n2. **Symptom Spikes (25% weight):** Patient reported exertional dyspnea and lower extremity tightness 4 days after the projected supply exhaustion date.\n3. **Clinical Measurement Shift (20% weight):** Ambulatory blood pressure rose to 146/92 mmHg (+18 mmHg over baseline).\n4. **Important Confounder:** A dosage modification from 20mg to 10mg was documented on April 20, which may partially explain why the tablet supply lasted longer.\n\nThis pattern warrants supportive clinical review rather than an assumption of missed doses.`;
    }

    if (q.includes('when') || q.includes('change')) {
      return `The deviation first emerged around **March 31, 2026**, when the expected 30-day refill window passed without an authorized claim. Dispense was delayed until **April 8** (8-day gap). Symptoms first elevated on **April 12**, followed by elevated systolic tele-BP readings on **April 15**. A second similar cycle repeated between May 2 and May 6.`;
    }

    if (q.includes('signals') || q.includes('risk score') || q.includes('contributed')) {
      return `The current risk index of **${selectedPatient.riskScore}/100** is driven by 5 weighted streams:\n\n• **Pharmacy Refill Pattern (30%):** Elongated dispense intervals\n• **Symptom Trend (25%):** Dyspnea severity rising to 4.3/10 (norm: 2.1)\n• **Treatment Response (20%):** Systolic BP exceeding target <130 mmHg\n• **Historical Recurrence (15%):** 86% correlation with a prior winter delay pattern\n• **Wearable Activity (10%):** 14% drop in ambulatory step count`;
    }

    if (q.includes('alternative') || q.includes('explain')) {
      return `Cadence detected a primary alternative explanation:\n\n**Recent Prescription / Dosage Modification (Weight: 68%):** On April 20, cardiology notes recorded a trial reduction from 20 mg to 10 mg daily. If ${selectedPatient.name} split existing tablets or took them on an altered cadence, existing supplies would naturally last 10–14 days longer.\n\nOther potential contributors include an unrecorded hospital observation starter supply and family caregiver travel schedules. Pharmacy stock-outs have been ruled unlikely based on distributor records.`;
    }

    if (q.includes('baseline') || q.includes('compare')) {
      return `Comparison against ${selectedPatient.name}'s verified 6-month personal baseline:\n\n• **Refill Interval:** Personal norm is 29–32 days ➔ Current is 42 days (+11 days gap)\n• **Symptom Score:** Personal norm is 2.1/10 ➔ Current is 4.3/10 (+2.2 pts)\n• **Ambulatory BP:** Personal norm is 120–128 mmHg ➔ Current is 146 mmHg\n• **Daily Steps:** Personal norm is 7,200 steps/day ➔ Current is 6,100 (-14%)`;
    }

    if (q.includes('30 days') || q.includes('summarize')) {
      return `**30-Day Synthesis for ${selectedPatient.name}:** Over the past month, the patient experienced an extended refill cycle (42 days), an increase in exertional dyspnea (peak 5.2/10), and home BP elevations up to 146/92 mmHg. Concurrently, a clinical dosage reduction trial occurred on April 20. Overall pattern suggests potential intermittent dosing complicated by regimen titration. Direct clinician check-in is recommended.`;
    }

    if (q.includes('attention') || q.includes('which patients') || q.includes('today')) {
      return `Based on current multi-signal convergence, **2 patients warrant immediate clinical focus today**:\n\n1. **M. Chen (PT-2089) — Risk 84/100 (High Priority):** 16-day refill gap with acute CGM glucose spike to 212 mg/dL; pharmacy prior authorization hold identified as primary barrier.\n2. **A. Rao (PT-1042) — Risk 72/100 (Moderate Concern):** Consecutive refill gaps and symptom spikes paired with April 20 dosage change confounder.\n\nWould you like to investigate either patient in Adherence Detective?`;
    }

    return `Based on authorized synthetic cohort data for ${selectedPatient.name} (${selectedPatient.code}), observational records reflect an active risk index of ${selectedPatient.riskScore}/100. Key elements include refill interval elongation (+11 days), symptom exacerbation, and a dosage adjustment confounder on April 20. Would you like to review the investigation timeline or inspect alternative hypotheses?`;
  };

  const handleSend = (queryText?: string) => {
    const text = queryText || inputQuery;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateAnswer(text);
      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: 'Just now',
        patientCode: selectedPatient.code,
        sources: ['Pharmacy Claims', 'Patient App', 'Home Telehealth'],
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col h-[calc(100vh-140px)] min-h-[560px] overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 shadow-2xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm md:text-base font-bold text-slate-900 flex items-center gap-2">
              <span>Cadence Clinical Assistant</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                Decision Support
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Ask questions about patterns in your authorized patient data.
            </p>
          </div>
        </div>

        <button
          onClick={() => openDetective(selectedPatient.id)}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Investigate {selectedPatient.code}</span>
        </button>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="px-4 py-2.5 bg-slate-100/70 border-b border-slate-200 overflow-x-auto flex items-center gap-2 text-xs">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-sky-500" /> Prompts:
        </span>
        {suggestedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-slate-700 hover:text-sky-800 font-medium whitespace-nowrap text-xs transition-all shadow-2xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                  isUser
                    ? 'bg-sky-600 text-white'
                    : 'bg-teal-50 border border-teal-200 text-teal-700'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`p-3.5 rounded-2xl text-xs space-y-2 leading-relaxed ${
                  isUser
                    ? 'bg-sky-600 text-white shadow-xs rounded-tr-none'
                    : 'bg-slate-50 border border-slate-200/90 text-slate-800 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line font-normal">{msg.text}</div>

                {/* Sources & Disclaimers */}
                {!isUser && msg.sources && (
                  <div className="pt-2 border-t border-slate-200/60 flex flex-wrap items-center gap-2 text-[10px] text-slate-500">
                    <span className="font-semibold text-slate-600">Verified Evidence:</span>
                    {msg.sources.map((s, i) => (
                      <span key={i} className="px-1.5 py-0.2 rounded bg-white border border-slate-200">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex gap-3 items-center text-xs text-slate-400 animate-pulse">
            <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
              <Bot className="w-4 h-4" />
            </div>
            <span>Evaluating multi-signal parameters...</span>
          </div>
        )}
      </div>

      {/* Mandatory Clinical Disclaimer */}
      <div className="px-4 py-1.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
        <Info className="w-3.5 h-3.5 text-sky-600 shrink-0" />
        <span>
          AI-generated insights are decision-support information and should be clinically reviewed.
        </span>
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={`Ask about ${selectedPatient.name}'s adherence patterns, baseline, or confounders...`}
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 placeholder-slate-400"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isTyping}
          className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white font-semibold text-xs flex items-center gap-1.5 shadow-2xs transition-all"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
