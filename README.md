# Cadence — AI-Powered Medication Adherence Intelligence & Clinical Decision-Support

> **“Don't just look at one missed signal. Connect the clues.”**  
> *AI-powered medication adherence intelligence designed for doctors and authorized healthcare professionals.*

[![React 19](https://img.shields.io/badge/React-19.2-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF.svg)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Hackathon Prototype](https://img.shields.io/badge/Hackathon-Cadence_2026-teal.svg)](#)

---

## 📋 Table of Contents
1. [Executive Summary & Core Philosophy](#-executive-summary--core-philosophy)
2. [Hackathon Judges Quick Start Guide](#-hackathon-judges-quick-start-guide)
3. [Key Innovation: The Adherence Detective](#-key-innovation-the-adherence-detective)
4. [EHR-Grade 8-Tab Patient Profile](#-ehr-grade-8-tab-patient-profile)
5. [Cadence Clinical AI Assistant](#-cadence-clinical-ai-assistant)
6. [Clinical Practice Workspaces](#-clinical-practice-workspaces)
7. [Ethical Safeguards & Non-Punitive Medical Language](#-ethical-safeguards--non-punitive-medical-language)
8. [Codebase Directory Map for Judges](#-codebase-directory-map-for-judges)
9. [Local Development & Build Verification](#-local-development--build-verification)

---

## 🩺 Executive Summary & Core Philosophy

Medication adherence is one of modern healthcare's most persistent and expensive challenges. Traditional tools fail because they look at isolated events in a vacuum:
- A single pharmacy refill claim delayed by 8 days is treated as proof that a patient is "non-compliant."
- In reality, the patient may have had remaining supply, experienced a dosage reduction, encountered a pharmacy stock issue, or split their pills.
- Accusing patients erodes trust and damages the therapeutic alliance.

### The Cadence Solution
**Cadence** fundamentally shifts the paradigm:
- **It never accuses patients** of being non-compliant and never claims to "prove" a missed dose.
- It analyzes **Routinely Available Multimodal Signals (RAMS)**:
  $$\text{Prescriptions} \rightarrow \text{Pharmacy Claims} \rightarrow \text{Patient Symptoms} \rightarrow \text{Wearables} \rightarrow \text{Biomarkers} \rightarrow \text{AI Pattern Detection}$$
- It actively **searches for alternative clinical explanations** (such as recent dosage titrations or pharmacy shortages) to reduce premature alarm.
- Every prediction explicitly communicates uncertainty and reveals the evidence trail behind every flag.

---

## ⚡ Hackathon Judges Quick Start Guide

### Option 1: Live Local Server
Cadence is pre-configured and runs with zero friction:
```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
# ➜ Access at http://localhost:5173/

# 3. Verify clean production build
npm run build
```

### Option 2: One-Click Demo Mode
1. When launched, the login screen features an instant **“⚡ Enter Demo Mode (Instant Access)”** button.
2. Clicking this button immediately logs you into **Dr. Maya Sharma’s** clinical workspace with pre-seeded synthetic patients.
3. No credentials, tokens, or configuration required.

---

## 🔎 Key Innovation: The Adherence Detective

The signature flagship feature of Cadence is the **Adherence Detective Mode** (accessible directly from any patient card or the left navigation bar). Rather than a static chart, it is an investigative cockpit that connects clues across time:

| Detective Feature | Clinical Purpose | Interactive Capabilities |
| :--- | :--- | :--- |
| **1. Multimodal Timeline** | Plots longitudinal events from initial Rx through refill delays, symptom spikes, and tele-BP changes. | Click any of the 8 milestones to inspect expected values vs observed signals and clinical interpretations. |
| **2. “What Changed?” Card** | Directly compares current observational period against the patient's personal baseline. | Delta indicators for refill cycles (31d $\rightarrow$ 42d), symptoms (2.1 $\rightarrow$ 4.3), vitals (+18 mmHg), and steps (-14%). |
| **3. Personal Baseline Grid** | Calibrates against the patient's own historical 6-month norms rather than population medians. | Visual divergence meters showing individualized behavioral benchmarks. |
| **4. Multi-Signal Topology** | Maps causal links between independent data streams. | Animated signal pulse vectors; clicking any node highlights related causality links. |
| **5. Signal Comparison Widget** | Direct proof of Cadence's core thesis: isolated signals vs multimodal convergence. | Interactive toggles comparing *Refill alone (Mild)* vs *Refill + Symptoms (Moderate)* vs *Multimodal (Higher Concern)*. |
| **6. Alternative Explanation Engine** | Evaluates confounders before attributing patterns to medication irregularity. | Detects that an **April 20 dosage change (20mg $\rightarrow$ 10mg)** explains extended tablet supply; adjusts confidence accordingly. |
| **7. Uncertainty Panel** | Transparently quantifies confidence (64% / Moderate). | Detailed checklist of what would increase or reduce confidence. |
| **8. AI Clinical Summary** | Synthesizes an objective, nuanced clinical note with non-punitive wording. | Interactive *Regenerate*, *Copy to Clipboard*, and *Add to Report* actions. |

---

## 📑 EHR-Grade 8-Tab Patient Profile

Cadence includes a complete, electronic health record-grade patient dossier with 8 specialized tabs:

1. **Overview**: Executive timeline snapshot, risk score gauge, and active care recommendations.
2. **Medication**: Current active regimen, prescriber details, and longitudinal prescription titration history (20 mg $\rightarrow$ 20 mg $\rightarrow$ 10 mg) with dosage change alerts.
3. **Refills**: Custom interactive SVG bar chart displaying actual days between fills over months vs the 30-day baseline, highlighting delays, average interval (38 days), and longest gap (12 days).
4. **Symptoms**: Correlated severity line chart (1–10 scale) plotted directly against refill dates to visually demonstrate post-gap symptom surges.
5. **Clinical Data**: Telemonitoring blood pressure and lab biomarker records with patient-specific reference target zones.
6. **Wearables**: Continuous passive tracking of daily step counts, sleep duration, and resting heart rate deviation.
7. **Timeline**: Complete chronological longitudinal medical event log.
8. **AI Insights**: Instant launchpad into Adherence Detective analysis.

---

## 🤖 Cadence Clinical AI Assistant

The platform features a dedicated conversational AI assistant grounded strictly in authorized synthetic cohort records:
- **Pre-loaded prompt chips**:
  - *“Why was this patient flagged?”*
  - *“When did the adherence pattern change?”*
  - *“What signals contributed most to the risk score?”*
  - *“What alternative explanations should I consider?”*
  - *“Compare this patient's current pattern with their baseline.”*
  - *“Summarize this patient's last 30 days.”*
  - *“Which patients require the most attention today?”*
- **Clinical Citations**: Every response references verified data sources (e.g. Surescripts Claims, Patient Care App, Ambulatory BP).
- **Ethical Framing**: Automatic non-punitive tone enforcement with clear decision-support disclaimers.

---

## 🏥 Clinical Practice Workspaces

- **Main Doctor Dashboard**: Good evening Dr. Sharma banner, date range selector (*Today, 7d, 30d, Custom*), 5 KPI cards, filterable attention needed queue, and animated radial risk score.
- **Alerts Triage Queue**: Prioritized clinical alert stream with action buttons (*Schedule Check-in*, *Verify with Pharmacy*, *Acknowledge*).
- **Population Analytics**: Practice-wide persistence rates (84.6%), specialty drug class breakdowns (Cardiovascular, Endocrine, Pulmonology, Rheumatology), and signal prevalence.
- **Healthcare Signal Connectors**: Live health monitor for Surescripts, Epic/Cerner FHIR R4, Mobile Care PROs, Apple HealthKit, and LabCorp/Quest feeds.
- **Formal Clinical Dossier**: Printable, exportable summary report with institutional letterhead, patient profile, risk evaluation, and clinician signature block.
- **Platform Settings**: Adjustable risk sensitivity sliders (40–85), non-punitive language enforcement toggle, and session controls.

---

## 🛡️ Ethical Safeguards & Non-Punitive Medical Language

Cadence is designed from the ground up to prevent punitive biases:

| ❌ Unacceptable Language | ✅ Cadence Standard |
| :--- | :--- |
| *“Patient is non-compliant”* | *“Possible adherence concern”* |
| *“Patient missed medication”* | *“Potential medication-taking irregularity”* |
| *“Patient failed to refill”* | *“Pattern requiring clinical review”* |
| *“Definitive proof of skipped doses”* | *“Multiple routinely available signals show deviation from baseline”* |

- **Uncertainty is First-Class**: All predictions explicitly present confidence levels and sensitivity boundaries.
- **Confounder-First**: Before elevating a patient's risk index, Cadence verifies whether dosage modifications, pharmacy stock-outs, or clinical surplus explain the timeline.
- **100% Synthetic Data**: All patient names, medical records, and values are fictional and created specifically for safe hackathon evaluation.

---

## 📂 Codebase Directory Map for Judges

```
c:\OMEN\Cadence\
├── src\
│   ├── types\
│   │   └── patient.ts            # TypeScript interfaces (Patient, Medication, Signals, Timeline)
│   ├── data\
│   │   └── syntheticPatients.ts  # Pre-seeded realistic synthetic patient cohort (PT-1042 A. Rao, etc.)
│   ├── context\
│   │   └── AppContext.tsx        # Global state, authentication, alert triage, patient selection
│   ├── components\
│   │   ├── common\
│   │   │   ├── CadenceLogo.tsx   # Precision SVG logo (Cross + Pill + Network + AI motif)
│   │   │   ├── RiskBadge.tsx     # Non-punitive risk & confidence badges
│   │   │   ├── RadialScore.tsx   # Animated circular score & interactive signal weight breakdown
│   │   │   └── UncertaintyDisclaimer.tsx # Clinical decision-support safeguard notices
│   │   ├── layout\
│   │   │   ├── Sidebar.tsx       # Desktop persistent navigation & Dr. Maya Sharma profile
│   │   │   ├── Topbar.tsx        # Date selector, patient switcher, and live indicator
│   │   │   └── MobileNav.tsx     # Responsive mobile drawer navigation
│   │   ├── dashboard\
│   │   │   ├── KpiCards.tsx      # Top 5 KPI metric cards
│   │   │   └── PatientCard.tsx   # Attention-needed patient cards with Investigate trigger
│   │   ├── detective\
│   │   │   ├── InvestigationTimeline.tsx   # 8-milestone interactive timeline
│   │   │   ├── WhatChangedCard.tsx         # Personal baseline transformation visual
│   │   │   ├── PersonalBaselineGrid.tsx    # Individualized norm benchmarks
│   │   │   ├── SignalCorrelationGraph.tsx  # Interactive node causality network
│   │   │   ├── SignalComparisonWidget.tsx  # Single vs multimodal progression widget
│   │   │   ├── AlternativeExplanationEngine.tsx # Confounder & dosage change evaluator
│   │   │   ├── UncertaintyPanel.tsx        # Confidence meter & sensitivity checklist
│   │   │   └── AiSummaryCard.tsx           # Nuanced AI clinical note generator
│   │   ├── patient\
│   │   │   ├── MedicationTab.tsx   # Regimen & dosage change titration history
│   │   │   ├── RefillsTab.tsx      # Interactive refill intervals bar chart
│   │   │   ├── SymptomsTab.tsx     # Symptom severity line chart correlated with refills
│   │   │   ├── ClinicalDataTab.tsx # Vitals & biomarker targets table
│   │   │   └── WearablesTab.tsx    # Step counts & sleep deviation telemetry
│   │   ├── assistant\
│   │   │   └── ChatAssistant.tsx   # Conversational assistant with prompt chips & evidence citations
│   │   └── views\
│   │       ├── LoginView.tsx       # Signal pipeline diagram & one-click Demo Mode
│   │       ├── DashboardView.tsx   # Main clinical command center
│   │       ├── PatientsView.tsx    # 8-tab patient dossier & searchable directory
│   │       ├── InsightsView.tsx    # Adherence Detective cockpit
│   │       ├── AlertsView.tsx      # Prioritized triage queue
│   │       ├── AnalyticsView.tsx   # Population adherence & drug class insights
│   │       ├── AssistantView.tsx   # AI Assistant standalone workspace
│   │       ├── DataSourcesView.tsx # 5 connected healthcare signal feeds
│   │       ├── ReportsView.tsx     # Formal printable clinical summary report
│   │       └── SettingsView.tsx    # Sensitivity thresholds & ethical tone governance
│   ├── App.tsx                   # Routing & layout orchestration
│   ├── main.tsx                  # React 19 entrypoint
│   └── index.css                 # Tailwind CSS 4 styles & custom pulse animations
├── public\
│   └── favicon.svg               # Custom vector medical brand icon
├── package.json                  # Dependencies (React 19, Lucide, Tailwind 4, Vite 8)
├── tsconfig.json                 # TypeScript compiler configuration
└── vite.config.ts                # Vite build & Tailwind plugin setup
```

---

## 🚀 Local Development & Build Verification

```bash
# Clone the repository
git clone https://github.com/Rxnmen/Cadence.git
cd Cadence

# Install dependencies
npm install

# Start development server
npm run dev

# Run production build
npm run build
```

Built with ❤️ for the Cadence Hackathon.
