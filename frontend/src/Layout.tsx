import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { NavLink, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { apiClient } from './api/client';
import { useAccess } from './components/access';
import ScrapeReviewsModal from './components/ScrapeReviewsModal';

function relativeScrapeTime(value: string | null | undefined): string {
  if (!value) return 'Scrape time not recorded';
  const normalized = /(?:Z|[+-]\d\d:\d\d)$/.test(value) ? value : `${value}Z`;
  const elapsedSeconds = Math.max(0, Math.floor((Date.now() - new Date(normalized).getTime()) / 1000));
  if (elapsedSeconds < 60) return 'Scraped just now';
  const minutes = Math.floor(elapsedSeconds / 60);
  if (minutes < 60) return `Scraped ${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Scraped ${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `Scraped ${days}d ago`;
}

export default function Layout() {
  const { status: accessStatus, canWrite, openAccess } = useAccess();
  const location = useLocation();
  const currentPath = location.pathname.substring(1) || 'dashboard';
  const [searchParams, setSearchParams] = useSearchParams();

  // URL-driven platform filter
  const activePlatform = searchParams.get('platform') || 'All Platforms';

  const setActivePlatform = (platform: string) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('platform', platform);
      return next;
    });
  };

  // Interactive states
  const [isSidebarOpen, setIsSidebarOpen] = useState(() =>
    typeof window === 'undefined' ? true : window.matchMedia('(min-width: 1024px)').matches
  );
  const [isScrapeModalOpen, setIsScrapeModalOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAppSelector, setShowAppSelector] = useState(false);
  const openScrapeReviews = () => {
    if (canWrite) setIsScrapeModalOpen(true);
    else openAccess();
  };
  const { data: syncStatus, isError: isSyncError, isPending: isSyncPending } = useQuery({
    queryKey: ['syncStatus', 'ws_1'],
    queryFn: () => apiClient.getSyncStatus('ws_1'),
    refetchInterval: 60_000,
  });
  const { data: inboxSummary, isError: isSummaryError } = useQuery({
    queryKey: ['reviewSummary', 'ws_1', 'sidebar-all'],
    queryFn: () => apiClient.getReviewSummary('ws_1', new URLSearchParams({ min_words: '0' })),
    refetchInterval: 30_000,
  });
  const syncTimestamp = syncStatus?.last_synced_at
    ? new Date(/(?:Z|[+-]\d\d:\d\d)$/.test(syncStatus.last_synced_at) ? syncStatus.last_synced_at : `${syncStatus.last_synced_at}Z`)
    : null;

  return (
    <div className="flex min-h-screen bg-surface overflow-x-hidden">
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] lg:hidden"
        />
      )}
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-sidebar-w bg-surface-container-lowest/90 backdrop-blur-xl z-50 flex flex-col justify-between py-space-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col gap-space-md">
          <div className="px-space-md flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <div className="w-8 h-8 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container font-title-lg text-title-lg">
                <span className="material-symbols-outlined text-[18px]">psychology</span>
              </div>
              <div className="flex flex-col">
                <span className="font-title-md text-title-md font-semibold text-on-surface tracking-tight">Insights Copilot</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">v2.4 Enterprise</span>
              </div>
            </div>
          </div>
          
          <div className="px-space-md relative">
            <button 
              onClick={() => setShowAppSelector(!showAppSelector)}
              className="w-full flex items-center justify-between px-space-sm py-space-xs rounded-xl bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors">
              <div className="flex items-center gap-space-xs overflow-hidden">
                <span className="material-symbols-outlined text-[18px] text-tertiary">layers</span>
                <span className="font-body-sm text-body-sm font-medium text-on-surface truncate">Groww Mobile App</span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">{showAppSelector ? 'expand_less' : 'unfold_more'}</span>
            </button>
            {showAppSelector && (
              <div className="absolute top-full left-space-md right-space-md mt-1 bg-surface-container-highest border border-outline-variant rounded-xl shadow-lg z-50 overflow-hidden flex flex-col">
                <button className="px-3 py-2 text-left text-sm text-on-surface hover:bg-surface-container transition-colors">Groww Mobile App</button>
              </div>
            )}
          </div>
          
          <nav className="flex flex-col gap-space-2xs px-space-sm">
            {[
              { path: 'dashboard', icon: 'grid_view', label: 'Dashboard' },
              { path: 'reviews-inbox', icon: 'inbox', label: 'Reviews Inbox', badge: inboxSummary?.unread.toLocaleString() ?? (isSummaryError ? '—' : '…') },
              { path: 'analytics', icon: 'monitoring', label: 'Analytics' },
              { path: 'word-cloud', icon: 'cloud', label: 'Word Cloud' },
              { path: 'ideation', icon: 'lightbulb', label: 'Ideation', premium: true },
              { path: 'reporting', icon: 'description', label: 'Reporting' },
              { path: 'settings', icon: 'settings', label: 'Settings', premium: true },
            ].map(item => {
              return (
                <NavLink 
                  key={item.path}
                  to={"/" + item.path} 
                  onClick={() => {
                    if (window.matchMedia('(max-width: 1023px)').matches) setIsSidebarOpen(false);
                  }}
                  className={({isActive}) => `flex items-center justify-between px-space-sm py-space-xs transition-colors rounded-xl ${isActive ? 'bg-primary-container text-on-primary-container font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}
                >
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                    <span className="font-body-md text-body-md">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container tabular-nums text-mono-metric">{item.badge}</span>
                  )}
                  {item.premium && accessStatus.role !== 'owner' && <span className="material-symbols-outlined text-[16px] text-indigo-300" title="Pro access required">lock</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>
        
        <div className="px-space-md pt-space-sm">
          <div className="p-space-xs rounded-xl bg-surface-container-low flex items-center justify-between">
            <div className="flex items-center gap-space-xs overflow-hidden">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-tertiary-container ring-2 ring-surface-container-low"></span>
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="font-body-sm text-body-sm font-medium text-on-surface truncate">{accessStatus.role === 'owner' ? 'Workspace Owner' : 'Public Viewer'}</span>
                <span className="font-label-caps text-label-caps text-tertiary truncate">{accessStatus.role === 'owner' ? 'Pro access' : 'Read only'}</span>
              </div>
            </div>
            <button type="button" onClick={openAccess} aria-label="Manage workspace access" className="text-on-surface-variant hover:text-on-surface p-space-2xs">
              <span className="material-symbols-outlined text-[18px]">{accessStatus.role === 'owner' ? 'verified_user' : 'lock'}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 min-w-0 ${isSidebarOpen ? 'lg:pl-sidebar-w' : 'pl-0'}`}>
        {/* Header */}
        <header className={`fixed top-0 right-0 left-0 h-16 bg-surface-container-lowest/80 backdrop-blur-xl z-30 shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-all duration-300 ${isSidebarOpen ? 'lg:left-sidebar-w' : 'left-0'}`}>
          <div className="h-16 w-full px-space-sm sm:px-space-lg flex items-center justify-between gap-space-xs sm:gap-space-md">
            <div className="flex items-center gap-space-xs sm:gap-space-md min-w-0">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                title={isSidebarOpen ? "Hide sidebar" : "Show sidebar"}
                className="p-2 text-on-surface hover:text-primary bg-surface-container hover:bg-surface-container-high rounded-lg transition-colors flex items-center justify-center border border-outline-variant shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">{isSidebarOpen ? 'menu_open' : 'menu'}</span>
              </button>
              <div className="hidden sm:flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant min-w-0">
                <span className="material-symbols-outlined text-[16px]">home</span>
                <span>/</span>
                <span className="text-on-surface font-medium capitalize">{currentPath}</span>
              </div>
              <div className="hidden md:block h-4 w-px bg-surface-container-highest"></div>
              <div className="hidden md:flex items-center gap-space-2xs">
                <span className={`h-2 w-2 rounded-full ${isSyncError ? 'bg-rose-500' : syncStatus?.status === 'success' ? 'bg-emerald-500' : syncStatus?.status === 'partial' ? 'bg-amber-500' : 'bg-zinc-500'}`}></span>
                <span
                  className="tabular-nums text-mono-metric text-on-surface-variant"
                  title={syncTimestamp ? `${syncStatus?.status === 'partial' ? 'Partial scrape' : 'Successful scrape'} at ${syncTimestamp.toLocaleString()}` : 'Run a scrape to start tracking its status.'}
                >
                  {isSyncError ? 'Review service offline' : isSyncPending ? 'Connecting to review service…' : relativeScrapeTime(syncStatus?.last_synced_at)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-space-sm relative">
              <div className="hidden xl:flex items-center bg-surface-container-low p-1 rounded-xl">
                {['All Platforms', 'iOS', 'Android'].map((platform) => (
                  <button 
                    key={platform}
                    onClick={() => setActivePlatform(platform)}
                    className={`px-space-xs py-1 rounded-lg font-body-sm text-body-sm transition-colors ${activePlatform === platform ? 'bg-surface-container-high text-on-surface font-medium' : 'text-on-surface-variant hover:text-on-surface'}`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
              <button 
                onClick={openScrapeReviews}
                className="flex items-center gap-space-2xs px-space-sm py-1.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary-container font-body-sm text-body-sm font-semibold transition-all shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
                <span className="material-symbols-outlined text-[16px]">{canWrite ? 'database' : 'lock'}</span>
                <span className="hidden sm:inline">Scrape Reviews</span>
              </button>
              <div className="hidden sm:block h-4 w-px bg-surface-container-highest"></div>
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-space-2xs text-on-surface-variant hover:text-on-surface relative rounded-lg hover:bg-surface-container-high transition-colors">
                  <span className="material-symbols-outlined text-[20px]">notifications</span>
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-tertiary-container"></span>
                </button>
                {showNotifications && (
                  <div className="absolute top-full right-0 mt-1 w-64 bg-surface-container-highest border border-outline-variant rounded-xl shadow-lg z-50 overflow-hidden flex flex-col">
                    <div className="px-3 py-2 border-b border-outline-variant font-medium text-sm text-on-surface">Notifications</div>
                    <div className="p-4 text-center text-sm text-on-surface-variant">No new notifications</div>
                  </div>
                )}
              </div>
              <button type="button" onClick={openAccess} aria-label="Open access controls" className="hidden sm:flex w-8 h-8 rounded-full bg-primary items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
              </button>
            </div>
          </div>
        </header>

        <main className="w-full pt-16 bg-surface flex-1 flex flex-col min-w-0">
          <div className="flex flex-col w-full flex-1 min-w-0">
            <Outlet context={{ openScrapeReviews }} />
          </div>
        </main>
      </div>
      {canWrite && <ScrapeReviewsModal isOpen={isScrapeModalOpen} onClose={() => setIsScrapeModalOpen(false)} />}
    </div>
  );
}
