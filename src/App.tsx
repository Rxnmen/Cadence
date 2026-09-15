import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { MobileNav } from './components/layout/MobileNav';
import { LoginView } from './components/views/LoginView';
import { DashboardView } from './components/views/DashboardView';
import { PatientsView } from './components/views/PatientsView';
import { InsightsView } from './components/views/InsightsView';
import { AlertsView } from './components/views/AlertsView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { AiAssistantsView } from './components/views/AiAssistantsView';
import { DataSourcesView } from './components/views/DataSourcesView';
import { ReportsView } from './components/views/ReportsView';
import { SettingsView } from './components/views/SettingsView';

const MainLayout: React.FC = () => {
  const { isAuthenticated, activeView, theme } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  if (!isAuthenticated) {
    return <LoginView />;
  }

  return (
    <div className={`relative flex min-h-screen transition-colors duration-300 overflow-x-hidden ${
      theme === 'dark' ? 'bg-[#090d16] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Dynamic Ambient Background Mesh Glows */}
      <div className="pointer-events-none fixed top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full ambient-glow-cyan opacity-40 dark:opacity-30 blur-3xl z-0" />
      <div className="pointer-events-none fixed bottom-[-10%] left-[15%] w-[500px] h-[500px] rounded-full ambient-glow-indigo opacity-30 dark:opacity-20 blur-3xl z-0" />

      {/* Desktop Persistent Sidebar */}
      <Sidebar className="hidden md:flex relative z-20" />

      {/* Mobile Drawer Navigation */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto relative z-10">
        {/* Topbar with Date Filter, Live Indicator, and Patient Search */}
        <Topbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Dynamic View Container with View Transition Animation */}
        <main
          key={activeView}
          className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto animate-view-enter"
        >
          {activeView === 'dashboard' && <DashboardView />}
          {activeView === 'patients' && <PatientsView />}
          {activeView === 'ai-assistants' && <AiAssistantsView />}
          {activeView === 'assistant' && <AiAssistantsView />}
          {activeView === 'analytics' && <AnalyticsView />}
          {activeView === 'settings' && <SettingsView />}
          {activeView === 'insights' && <InsightsView />}
          {activeView === 'alerts' && <AlertsView />}
          {activeView === 'data-sources' && <DataSourcesView />}
          {activeView === 'reports' && <ReportsView />}
        </main>
      </div>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
