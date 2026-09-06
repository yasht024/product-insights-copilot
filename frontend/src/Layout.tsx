import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  const currentPath = location.pathname.substring(1) || 'dashboard';

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-sidebar-w bg-surface-container-lowest/90 backdrop-blur-xl z-50 flex flex-col justify-between py-space-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
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
          
          <div className="px-space-md">
            <button className="w-full flex items-center justify-between px-space-sm py-space-xs rounded-xl bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors">
              <div className="flex items-center gap-space-xs overflow-hidden">
                <span className="material-symbols-outlined text-[18px] text-tertiary">layers</span>
                <span className="font-body-sm text-body-sm font-medium text-on-surface truncate">Acme Mobile App</span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">unfold_more</span>
            </button>
          </div>
          
          <nav className="flex flex-col gap-space-2xs px-space-sm">
            {[
              { path: 'dashboard', icon: 'grid_view', label: 'Dashboard' },
              { path: 'reviews-inbox', icon: 'inbox', label: 'Reviews Inbox', badge: '24' },
              { path: 'analytics', icon: 'monitoring', label: 'Analytics' },
              { path: 'categories', icon: 'category', label: 'Categories' },
              { path: 'word-cloud', icon: 'cloud', label: 'Word Cloud' },
              { path: 'ideation', icon: 'lightbulb', label: 'Ideation' },
              { path: 'reporting', icon: 'description', label: 'Reporting' },
              { path: 'settings', icon: 'settings', label: 'Settings' },
            ].map(item => {
              const isActive = currentPath === item.path || (currentPath === '' && item.path === 'dashboard');
              return (
                <NavLink 
                  key={item.path}
                  to={"/" + item.path} 
                  className={({isActive}) => `flex items-center justify-between px-space-sm py-space-xs transition-colors rounded-xl ${isActive ? 'bg-primary-container text-on-primary-container font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}
                >
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                    <span className="font-body-md text-body-md">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-mono-metric text-mono-metric">{item.badge}</span>
                  )}
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
                <span className="font-body-sm text-body-sm font-medium text-on-surface truncate">Dev Lead</span>
                <span className="font-label-caps text-label-caps text-tertiary truncate">Online</span>
              </div>
            </div>
            <button className="text-on-surface-variant hover:text-on-surface p-space-2xs">
              <span className="material-symbols-outlined text-[18px]">more_vert</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 pl-sidebar-w flex flex-col min-h-screen">
        {/* Header */}
        <header className="fixed top-0 left-sidebar-w right-0 h-16 bg-surface-container-lowest/80 backdrop-blur-xl z-40 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
          <div className="h-16 w-full px-space-lg flex items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-md">
              <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">home</span>
                <span>/</span>
                <span className="text-on-surface font-medium capitalize">{currentPath}</span>
              </div>
              <div className="h-4 w-px bg-surface-container-highest"></div>
              <div className="flex items-center gap-space-2xs">
                <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
                <span className="font-mono-metric text-mono-metric text-on-surface-variant">Synced 4m ago</span>
              </div>
            </div>
            <div className="flex items-center gap-space-sm">
              <div className="flex items-center bg-surface-container-low p-1 rounded-xl">
                <button className="px-space-xs py-1 rounded-lg bg-surface-container-high text-on-surface font-body-sm text-body-sm font-medium transition-colors">All Platforms</button>
                <button className="px-space-xs py-1 rounded-lg text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm transition-colors">iOS</button>
                <button className="px-space-xs py-1 rounded-lg text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm transition-colors">Android</button>
              </div>
              <div className="flex items-center bg-surface-container-low px-space-sm py-1.5 rounded-xl gap-space-xs text-on-surface-variant hover:text-on-surface cursor-pointer">
                <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                <span className="font-body-sm text-body-sm">Last 30 Days</span>
                <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </div>
              <button className="flex items-center gap-space-2xs px-space-sm py-1.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary-container font-body-sm text-body-sm font-semibold transition-all shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
                <span className="material-symbols-outlined text-[16px]">sync</span>
                <span>Refresh Feeds</span>
              </button>
              <div className="h-4 w-px bg-surface-container-highest"></div>
              <button className="p-space-2xs text-on-surface-variant hover:text-on-surface relative rounded-lg hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-tertiary-container"></span>
              </button>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
              </div>
            </div>
          </div>
        </header>

        <main className="w-full pt-16 bg-surface min-h-screen">
          <div className="flex flex-col w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
