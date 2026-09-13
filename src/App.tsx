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
import { AssistantView } from './components/views/AssistantView';
import { DataSourcesView } from './components/views/DataSourcesView';
import { ReportsView } from './components/views/ReportsView';
import { SettingsView } from './components/views/SettingsView';

const MainLayout: React.FC = () => {
  const { isAuthenticated, activeView } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  if (!isAuthenticated) {
    return <LoginView />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Desktop Persistent Sidebar */}
      <Sidebar className="hidden md:flex" />

      {/* Mobile Drawer Navigation */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Topbar with Date Filter, Live Indicator, and Patient Search */}
        <Topbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Dynamic View Container */}
        <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto">
          {activeView === 'dashboard' && <DashboardView />}
          {activeView === 'patients' && <PatientsView />}
          {activeView === 'insights' && <InsightsView />}
          {activeView === 'alerts' && <AlertsView />}
          {activeView === 'analytics' && <AnalyticsView />}
          {activeView === 'assistant' && <AssistantView />}
          {activeView === 'data-sources' && <DataSourcesView />}
          {activeView === 'reports' && <ReportsView />}
          {activeView === 'settings' && <SettingsView />}
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
