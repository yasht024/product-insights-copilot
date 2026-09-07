import React, { useState } from 'react';
import CategorizeReviewsModal from './components/CategorizeReviewsModal';
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
    <>
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
        
        <CategorizeReviewsModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
    </>
  );
}

