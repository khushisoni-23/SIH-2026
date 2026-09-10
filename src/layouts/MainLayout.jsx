import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { TopNavbar } from '../components/common/TopNavbar';
import { useLanguage } from '../context/LanguageContext';

export const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div
      className="min-h-screen flex flex-col antialiased"
      style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}
    >
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        toggleSidebar={() => setIsCollapsed(!isCollapsed)}
        isMobileOpen={isMobileOpen}
        closeMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isCollapsed ? 'lg:pl-[72px]' : 'lg:pl-60'
        }`}
      >
        <TopNavbar onOpenMobile={() => setIsMobileOpen(true)} />

        <main className="flex-1 p-4 lg:p-5 space-y-5 max-w-[1560px] w-full mx-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <footer
          className="py-3 px-5 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{
            borderTop: '1px solid var(--color-border)',
            background: 'var(--color-bg-surface)',
            color: 'var(--color-text-muted)',
          }}
        >
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="font-semibold" style={{ color: 'var(--color-text-tertiary)' }}>
              {t('landing.trustedBy')}
            </span>
            <span>SAIL</span>
            <span>•</span>
            <span>Ministry of Steel</span>
            <span>•</span>
            <span>Major Port Authorities</span>
          </div>
          <div className="flex items-center gap-4">
            <span>
              System: <strong style={{ color: 'var(--color-positive)' }}>ONLINE</strong>
            </span>
            <span>SIH 2026 Enterprise Prototype</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
