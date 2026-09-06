import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Inbox,
  LineChart,
  Tags,
  Cloud,
  Lightbulb,
  FileText,
  Settings as SettingsIcon,
  Bell,
  RefreshCw,
  ChevronDown,
  Play
} from 'lucide-react';

export default function Layout() {
  const location = useLocation();
  const currentPath = location.pathname.substring(1) || 'dashboard';

  // Capitalize for Breadcrumbs
  const pathName = currentPath.charAt(0).toUpperCase() + currentPath.slice(1);

  return (
    <div className="bg-[#090a0f] text-zinc-100 min-h-screen antialiased flex font-sans">
      {/* Fixed Left Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-zinc-900/80 border-r border-zinc-800/80 backdrop-blur-xl z-50 flex flex-col justify-between p-4 select-none">
        <div className="flex flex-col gap-6">
          {/* Logo Header */}
          <div className="flex items-center justify-between px-2 pt-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
                <Play className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-tight text-zinc-100">Insights Copilot</span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 font-semibold">Intelligence OS</span>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700/60 font-medium">v2.4</span>
          </div>
          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 text-sm font-medium">
            <NavLink to="/dashboard" className={({ isActive }) => `flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-indigo-500/10 text-indigo-400 border-l-2 border-indigo-500 font-medium' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'}`}>
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </div>
            </NavLink>
            <NavLink to="/inbox" className={({ isActive }) => `flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-indigo-500/10 text-indigo-400 border-l-2 border-indigo-500 font-medium' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'}`}>
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4" />
                <span>Reviews Inbox</span>
              </div>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">24</span>
            </NavLink>
            <NavLink to="/analytics" className={({ isActive }) => `flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-indigo-500/10 text-indigo-400 border-l-2 border-indigo-500 font-medium' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'}`}>
              <div className="flex items-center gap-3">
                <LineChart className="w-4 h-4" />
                <span>Analytics</span>
              </div>
            </NavLink>
            <NavLink to="/categories" className={({ isActive }) => `flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-indigo-500/10 text-indigo-400 border-l-2 border-indigo-500 font-medium' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'}`}>
              <div className="flex items-center gap-3">
                <Tags className="w-4 h-4" />
                <span>Categories</span>
              </div>
            </NavLink>
            <NavLink to="/wordcloud" className={({ isActive }) => `flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-indigo-500/10 text-indigo-400 border-l-2 border-indigo-500 font-medium' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'}`}>
              <div className="flex items-center gap-3">
                <Cloud className="w-4 h-4" />
                <span>Word Cloud</span>
              </div>
            </NavLink>
            <NavLink to="/ideation" className={({ isActive }) => `flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-indigo-500/10 text-indigo-400 border-l-2 border-indigo-500 font-medium' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'}`}>
              <div className="flex items-center gap-3">
                <Lightbulb className="w-4 h-4" />
                <span>Ideation</span>
              </div>
            </NavLink>
            <NavLink to="/reporting" className={({ isActive }) => `flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-indigo-500/10 text-indigo-400 border-l-2 border-indigo-500 font-medium' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'}`}>
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>Reporting</span>
              </div>
            </NavLink>
          </nav>
        </div>
        {/* Bottom User Section */}
        <div className="flex flex-col gap-2 pt-4 border-t border-zinc-800/80">
          <NavLink to="/settings" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-indigo-500/10 text-indigo-400 border-l-2 border-indigo-500 font-medium' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'}`}>
            <SettingsIcon className="w-4 h-4" />
            <span>Settings</span>
          </NavLink>
          <div className="bg-zinc-800/50 p-2.5 rounded-xl border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative flex-shrink-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xs text-white shadow-inner">
                  DL
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-zinc-900"></span>
              </div>
              <div className="flex flex-col truncate">
                <span className="text-xs font-medium text-zinc-200 truncate">Dev Lead</span>
                <span className="text-[10px] text-zinc-400 font-mono truncate">Online • Copilot Active</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen bg-[#090a0f]">
        {/* Top Sticky Header Bar */}
        <header className="sticky top-0 z-40 h-16 bg-zinc-950/70 backdrop-blur-xl border-b border-zinc-800/80 px-8 flex items-center justify-between">
          {/* Breadcrumbs & Status */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer">Platform</span>
              <span className="text-zinc-600">&gt;</span>
              <span className="text-zinc-100 font-medium">{pathName}</span>
            </div>
            <div className="h-4 w-px bg-zinc-800"></div>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Synced 4m ago</span>
            </div>
          </div>
          {/* Header Controls / Filters */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs font-medium text-zinc-400">
              <button className="px-3 py-1 rounded-lg bg-zinc-800 text-zinc-100 font-semibold shadow-sm transition-all">All Platforms</button>
              <button className="px-3 py-1 rounded-lg hover:text-zinc-200 transition-colors">iOS</button>
              <button className="px-3 py-1 rounded-lg hover:text-zinc-200 transition-colors">Android</button>
            </div>
            <div className="relative">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-xs font-medium text-zinc-200 transition-all">
                <span>Last 30 Days</span>
                <ChevronDown className="w-3 h-3 text-zinc-500" />
              </button>
            </div>
            <button className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-200 hover:text-white transition-all group shadow-sm">
              <RefreshCw className="w-3.5 h-3.5 text-indigo-400 group-hover:rotate-180 transition-transform duration-500" />
              <span>Refresh Feeds</span>
            </button>
            <div className="h-4 w-px bg-zinc-800"></div>
            <button aria-label="Notifications" className="relative p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-zinc-950"></span>
            </button>
          </div>
        </header>

        {/* Main Content Area via Outlet */}
        <Outlet />
      </div>
    </div>
  );
}
