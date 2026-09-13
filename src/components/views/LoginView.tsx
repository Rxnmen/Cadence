import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Brain,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Lock,
  Mail,
  User,
  Zap,
  Activity,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Atom,
  Radio,
  Pill,
  Scan,
} from 'lucide-react';

export const LoginView: React.FC = () => {
  const { login, loginDemo, theme, toggleTheme } = useApp();

  const [doctorName, setDoctorName] = useState<string>('Dr. Sarah Jenkins');
  const [email, setEmail] = useState<string>('sarah.jenkins@antigravity-health.ai');
  const [password, setPassword] = useState<string>('clinicalSecret123!');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  const validate = (): boolean => {
    const errs: { name?: string; email?: string; password?: string } = {};

    if (!doctorName.trim()) {
      errs.name = "Doctor's name is required";
    } else if (doctorName.trim().length < 3) {
      errs.name = 'Name must be at least 3 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'Please enter a valid clinical email address';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      login(doctorName, email);
    }, 650);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      loginDemo();
    }, 400);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#090d16] text-slate-100' : 'bg-slate-50 text-slate-900'} flex flex-col lg:flex-row relative overflow-hidden transition-colors duration-300`}>
      {/* Background Ambient Glow Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/15 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-indigo-500/15 rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

      {/* Floating Theme Toggle Switch (Top Right) */}
      <div className="absolute top-5 right-6 z-50">
        <button
          onClick={toggleTheme}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md transition-all shadow-md cursor-pointer border ${
            theme === 'dark'
              ? 'bg-slate-900/80 text-amber-300 border-slate-700/80 hover:bg-slate-800'
              : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
          title="Toggle Light / Dark Theme"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-indigo-600" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>

      {/* Left Showcase Column */}
      <div className={`lg:w-7/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r relative z-10 ${
        theme === 'dark' ? 'border-slate-800/80 bg-slate-950/40' : 'border-slate-200/80 bg-white/40'
      }`}>
        <div className="space-y-8 max-w-2xl">
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25 animate-float-slow">
              <Atom className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400">
                  ANTI-GRAVITY
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                  theme === 'dark'
                    ? 'bg-cyan-950/80 text-cyan-300 border-cyan-800/80'
                    : 'bg-cyan-50 text-cyan-800 border-cyan-200'
                }`}>
                  v3.0 CLINICAL
                </span>
              </div>
              <span className={`text-xs font-semibold tracking-wider uppercase block ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                AI Health Platform for Doctors
              </span>
            </div>
          </div>

          {/* Hero Typography */}
          <div className="space-y-4 pt-2">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${
              theme === 'dark'
                ? 'bg-cyan-950/90 text-cyan-300 border-cyan-800/80'
                : 'bg-sky-50 text-sky-800 border-sky-200'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Next-Generation Clinical Decision Support</span>
            </div>

            <h1 className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Defy Clinical Blindspots with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
                Multi-Signal AI.
              </span>
            </h1>

            <p className={`text-sm sm:text-base leading-relaxed max-w-xl ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              An elevated intelligence platform engineered for authorized medical practitioners. Connects routinely collected patient vitals, longitudinal claims, symptom logs, and medical imaging without manual paperwork burdens.
            </p>
          </div>

          {/* Anti-Gravity Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
            <div className={`p-4 rounded-2xl border transition-all ${
              theme === 'dark' ? 'bg-slate-900/60 border-slate-800/90' : 'bg-white/80 border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center gap-2.5 text-cyan-400 mb-1">
                <Activity className="w-4 h-4" />
                <span className={`text-xs font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                  Zero-Gravity Telemetry
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Continuous vitals monitoring (BP, HR, SpO2) synchronized with personal historical baselines.
              </p>
            </div>

            <div className={`p-4 rounded-2xl border transition-all ${
              theme === 'dark' ? 'bg-slate-900/60 border-slate-800/90' : 'bg-white/80 border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center gap-2.5 text-teal-400 mb-1">
                <Brain className="w-4 h-4" />
                <span className={`text-xs font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                  Conversational Copilot
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Interactive clinical assistant pre-trained to answer queries and review patient trajectories.
              </p>
            </div>

            <div className={`p-4 rounded-2xl border transition-all ${
              theme === 'dark' ? 'bg-slate-900/60 border-slate-800/90' : 'bg-white/80 border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center gap-2.5 text-indigo-400 mb-1">
                <Scan className="w-4 h-4" />
                <span className={`text-xs font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                  Sub-Second Image AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Chest X-ray, Brain MRI, and Echo visual anomaly scanning with 98.4% diagnostic precision.
              </p>
            </div>

            <div className={`p-4 rounded-2xl border transition-all ${
              theme === 'dark' ? 'bg-slate-900/60 border-slate-800/90' : 'bg-white/80 border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center gap-2.5 text-amber-400 mb-1">
                <Pill className="w-4 h-4" />
                <span className={`text-xs font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                  Drug Interaction Shield
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Dynamic contraindication engine cross-matching polypharmacy combinations instantly.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Legal & Compliance Notice */}
        <div className="pt-8 flex items-center gap-3 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-cyan-500 shrink-0" />
          <span>
            HIPAA-Grade Synthetic Sandbox • HL7 FHIR R4 Ready • All patient data is synthetic for demonstration.
          </span>
        </div>
      </div>

      {/* Right Column: Interactive Doctor Authentication Form */}
      <div className="lg:w-5/12 p-8 sm:p-12 lg:p-16 flex items-center justify-center relative z-10">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className={`text-2xl font-bold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Doctor Authentication
            </h2>
            <p className={`text-xs leading-relaxed ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Sign in with your verified medical credentials to access your active patient queue and AI assistants.
            </p>
          </div>

          {/* Authentication Card */}
          <div className={`p-7 rounded-3xl border transition-all shadow-xl ${
            theme === 'dark'
              ? 'bg-slate-900/90 border-slate-800 shadow-cyan-950/20'
              : 'bg-white border-slate-200 shadow-slate-200/50'
          }`}>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Doctor's Full Name Input */}
              <div className="space-y-1.5">
                <label className={`block text-xs font-bold uppercase tracking-wider ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Doctor's Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={doctorName}
                    onChange={(e) => {
                      setDoctorName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder="e.g. Dr. Sarah Jenkins"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-semibold transition-all focus:outline-none focus:ring-2 ${
                      errors.name
                        ? 'border-rose-500 ring-rose-500/20 bg-rose-500/5'
                        : theme === 'dark'
                        ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-500 focus:ring-cyan-500 focus:border-cyan-500'
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-sky-500 focus:border-sky-500'
                    } border`}
                  />
                </div>
                {errors.name && (
                  <span className="text-[11px] text-rose-500 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </span>
                )}
              </div>

              {/* Email Address Input */}
              <div className="space-y-1.5">
                <label className={`block text-xs font-bold uppercase tracking-wider ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Clinical Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="sarah.jenkins@antigravity-health.ai"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-semibold transition-all focus:outline-none focus:ring-2 ${
                      errors.email
                        ? 'border-rose-500 ring-rose-500/20 bg-rose-500/5'
                        : theme === 'dark'
                        ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-500 focus:ring-cyan-500 focus:border-cyan-500'
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-sky-500 focus:border-sky-500'
                    } border`}
                  />
                </div>
                {errors.email && (
                  <span className="text-[11px] text-rose-500 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </span>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className={`block text-xs font-bold uppercase tracking-wider ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Clinical Access Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    placeholder="Enter at least 6 characters"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-xs font-semibold transition-all focus:outline-none focus:ring-2 ${
                      errors.password
                        ? 'border-rose-500 ring-rose-500/20 bg-rose-500/5'
                        : theme === 'dark'
                        ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-500 focus:ring-cyan-500 focus:border-cyan-500'
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-sky-500 focus:border-sky-500'
                    } border`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-300 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-[11px] text-rose-500 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.password}
                  </span>
                )}
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50 mt-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Accessing Anti-Gravity Dashboard...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In / Access Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`} />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider">
                <span className={`px-2 ${theme === 'dark' ? 'bg-slate-900 text-slate-500' : 'bg-white text-slate-400'}`}>
                  Or Instant Demo Access
                </span>
              </div>
            </div>

            {/* Quick Demo Login */}
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isLoading}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-800/80 hover:bg-slate-800 text-cyan-300 border-slate-700/80'
                  : 'bg-slate-50 hover:bg-slate-100 text-sky-700 border-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>⚡ One-Click Demo (Dr. Sarah Jenkins)</span>
            </button>
          </div>

          <div className="text-center text-[11px] text-slate-500">
            Protected by Anti-Gravity Biometric & MFA Protocol • 256-Bit TLS
          </div>
        </div>
      </div>
    </div>
  );
};
