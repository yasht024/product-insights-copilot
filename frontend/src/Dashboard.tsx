import React, { useState } from 'react';
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
  Play,
  Star,
  Activity,
  X
} from 'lucide-react';

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <a className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border-l-2 border-indigo-500 font-medium transition-colors" href="#">
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4 text-indigo-400" />
                <span>Dashboard</span>
              </div>
            </a>
            <a className="flex items-center justify-between px-3 py-2.5 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors" href="#">
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4" />
                <span>Reviews Inbox</span>
              </div>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">24</span>
            </a>
            <a className="flex items-center justify-between px-3 py-2.5 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors" href="#">
              <div className="flex items-center gap-3">
                <LineChart className="w-4 h-4" />
                <span>Analytics</span>
              </div>
            </a>
            <a className="flex items-center justify-between px-3 py-2.5 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors" href="#">
              <div className="flex items-center gap-3">
                <Tags className="w-4 h-4" />
                <span>Categories</span>
              </div>
            </a>
            <a className="flex items-center justify-between px-3 py-2.5 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors" href="#">
              <div className="flex items-center gap-3">
                <Cloud className="w-4 h-4" />
                <span>Word Cloud</span>
              </div>
            </a>
            <a className="flex items-center justify-between px-3 py-2.5 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors" href="#">
              <div className="flex items-center gap-3">
                <Lightbulb className="w-4 h-4" />
                <span>Ideation</span>
              </div>
            </a>
            <a className="flex items-center justify-between px-3 py-2.5 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors" href="#">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>Reporting</span>
              </div>
            </a>
          </nav>
        </div>
        {/* Bottom User Section */}
        <div className="flex flex-col gap-2 pt-4 border-t border-zinc-800/80">
          <a className="flex items-center gap-3 px-3 py-2 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors text-sm font-medium" href="#">
            <SettingsIcon className="w-4 h-4" />
            <span>Settings</span>
          </a>
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
              <span className="text-zinc-100 font-medium">Dashboard</span>
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

        {/* Main Content Area */}
        <main className="p-8 max-w-7xl w-full mx-auto flex flex-col gap-6">
          {/* Page Title & Scope Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Live Telemetry</span>
                <span className="text-zinc-600 text-xs">•</span>
                <span className="text-zinc-400 text-xs font-mono">App Store & Google Play Production</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-zinc-100">Executive Dashboard</h1>
              <p className="text-sm text-zinc-400 mt-0.5">Continuous cross-platform review sentiment, triage velocity & classification telemetry.</p>
            </div>
          </div>

          {/* Top Row: 3 Balanced KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* KPI 1: Total Reviews */}
            <div className="bg-zinc-900/70 border border-zinc-800/80 shadow-xl rounded-2xl backdrop-blur-md p-6 flex flex-col justify-between relative overflow-hidden group hover:border-zinc-700/80 transition-all">
              <div className="absolute -right-6 -top-6 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">Aggregate Volume</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Activity className="w-3 h-3" />
                    +12.4%
                  </span>
                </div>
                <div className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-100 mt-3 font-mono">24,648</div>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-800/60 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs text-zinc-400 font-mono">
                  <span>Platform Ratio</span>
                  <span className="text-zinc-200">18,420 iOS · 6,228 Android</span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden flex gap-0.5">
                  <div className="h-full bg-indigo-500 rounded-l-full" style={{ width: '74.7%' }} title="iOS (74.7%)"></div>
                  <div className="h-full bg-purple-500 rounded-r-full" style={{ width: '25.3%' }} title="Android (25.3%)"></div>
                </div>
              </div>
            </div>

            {/* KPI 2: Average Rating */}
            <div className="bg-zinc-900/70 border border-zinc-800/80 shadow-xl rounded-2xl backdrop-blur-md p-6 flex flex-col justify-between relative overflow-hidden group hover:border-zinc-700/80 transition-all">
              <div className="absolute -right-6 -top-6 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">Customer Sentiment</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Activity className="w-3 h-3" />
                    +0.3 pts
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mt-3">
                  <span className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-100 font-mono">4.4</span>
                  <span className="text-sm font-medium text-zinc-500">/ 5.0</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 text-amber-400/40" />
                </div>
                <span className="text-xs font-mono text-zinc-400">Weighted median 4.5</span>
              </div>
            </div>

            {/* KPI 3: NPS Score */}
            <div className="bg-zinc-900/70 border border-zinc-800/80 shadow-xl rounded-2xl backdrop-blur-md p-6 flex flex-col justify-between relative overflow-hidden group hover:border-zinc-700/80 transition-all">
              <div className="absolute -right-6 -top-6 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">Net Promoter Score</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold uppercase tracking-wide">
                    Tier: Excellent
                  </span>
                </div>
                <div className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-100 mt-3 font-mono">+74</div>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-800/60 flex flex-col gap-2">
                <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden flex gap-0.5">
                  <div className="h-full bg-emerald-500 rounded-l-full" style={{ width: '82%' }}></div>
                  <div className="h-full bg-amber-500" style={{ width: '10%' }}></div>
                  <div className="h-full bg-rose-500 rounded-r-full" style={{ width: '8%' }}></div>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-0.5">
                  <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>82% Promoters</span>
                  <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>10% Passives</span>
                  <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>8% Detractors</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Categorization Pipeline Control Center Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950/40 via-zinc-900/60 to-purple-950/40 border border-indigo-500/30 shadow-xl backdrop-blur-md p-6">
            <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex flex-col gap-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
                    <Play className="w-4 h-4" />
                  </div>
                  <h2 className="text-base font-semibold text-zinc-100">AI Review Categorization Pipeline</h2>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/25">Active Model: GPT-4o Insights v3</span>
                </div>
                <p className="text-xs lg:text-sm text-zinc-400">Synthesizes incoming user reviews across taxonomy clusters, bug reports, and UX friction points at microsecond velocity.</p>
                <div className="mt-2 flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-200 font-medium">21,890 Categorized <span className="text-indigo-400">(88.8%)</span></span>
                    <span className="text-zinc-400">2,758 Pending Evaluation</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-zinc-950/80 p-0.5 border border-zinc-800/80 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_12px_rgba(99,102,241,0.5)] transition-all duration-1000" style={{ width: '88.8%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center flex-shrink-0">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  <Play className="w-4 h-4 animate-pulse" />
                  <span>Categorize Reviews</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Categorization Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md transition-opacity duration-200">
          <div className="relative w-full max-w-lg mx-4 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-6 flex flex-col gap-6">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
                    <Play className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-100">Run AI Categorization</h3>
                </div>
                <p className="text-xs text-zinc-400">Configure review batch processing & classification parameters.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-300">Review Date Range</label>
                <div className="relative">
                  <select defaultValue="this_month" className="w-full px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer">
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="this_week">This Week</option>
                    <option value="this_month">This Month (Default)</option>
                    <option value="custom">Custom Range...</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-2.5 text-zinc-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-300">Review Processing Batch Cap</label>
                <div className="relative">
                  <select defaultValue="500" className="w-full px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer">
                    <option value="50">Top 50 Reviews</option>
                    <option value="100">Top 100 Reviews</option>
                    <option value="500">Top 500 Reviews (Recommended)</option>
                    <option value="all">All Pending Reviews (2,758)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-2.5 text-zinc-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-300">Prioritize By</label>
                <div className="relative">
                  <select defaultValue="lowest_rated" className="w-full px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer">
                    <option value="lowest_rated">Lowest Rated First (Escalate Issues)</option>
                    <option value="newest">Newest First</option>
                    <option value="highest_impact">High Impact / Lengthy Feedback</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-2.5 text-zinc-400 pointer-events-none" />
                </div>
              </div>

              <div className="mt-2 flex justify-end gap-3 pt-4 border-t border-zinc-800/80">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2">
                  <Play className="w-3.5 h-3.5" /> Start Processing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

