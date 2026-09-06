import React from 'react';

export default function Ideation() {
  return (
<div className="w-full pt-20 pb-12 px-6 flex flex-col gap-6 max-w-[1720px] mx-auto">
{/* 1. Hero Title & Context Strip */}
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-surface-container-low border border-card-border p-5 rounded-2xl shadow-sm">
<div className="flex flex-col gap-1.5 max-w-3xl">
<div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant">
<span className="px-2 py-0.5 rounded-full bg-primary-container/20 text-primary border border-primary/25 font-semibold text-[11px]">AI Sprint 24.4</span>
<span className="text-card-border">•</span>
<span className="text-tertiary">Opportunity Engine Online</span>
<span className="text-card-border">•</span>
<span>412 new review signals synthesized</span>
</div>
<h1 className="text-2xl font-bold tracking-tight text-on-surface">
            Ideation &amp; Feature Requests — Product Backlog &amp; AI Roadmapping
          </h1>
<p className="text-xs text-on-surface-variant leading-relaxed">
            Customer review signal synthesis, opportunity scoring, automated user demand clustering, and linear roadmap exports.
          </p>
</div>
{/* Matrix / Kanban / Backlog View Mode Selector */}
<div className="flex items-center gap-1 bg-surface-container-lowest p-1 rounded-xl border border-card-border/60 self-start lg:self-center overflow-x-auto">
<button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-bright text-white text-xs font-semibold shadow-sm transition-all">
<span className="material-symbols-outlined text-[16px] text-tertiary">scatter_plot</span>
<span>Impact vs Effort 2x2</span>
</button>
<button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface text-xs font-medium transition-colors">
<span className="material-symbols-outlined text-[16px]">table_chart</span>
<span>Backlog Matrix</span>
</button>
<button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface text-xs font-medium transition-colors">
<span className="material-symbols-outlined text-[16px]">view_kanban</span>
<span>Roadmap Kanban</span>
</button>
<button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface text-xs font-medium transition-colors">
<span className="material-symbols-outlined text-[16px]">bubble_chart</span>
<span>Demand Clusters</span>
</button>
</div>
</div>
{/* 2. Top Metric KPI Strip (4 Stat Cards matching Screen 5 & 7) */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
{/* KPI 1: Synthesized Opportunities */}
<div className="bg-surface-container-low border border-card-border p-4 rounded-xl flex flex-col justify-between relative overflow-hidden group hover:border-card-border/90 transition-all">
<div className="flex items-center justify-between">
<span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant font-semibold">Synthesized Opportunities</span>
<div className="w-8 h-8 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">lightbulb</span>
</div>
</div>
<div className="my-2 flex items-baseline gap-2">
<span className="text-3xl font-bold font-mono text-on-surface">34</span>
<span className="px-1.5 py-0.5 rounded bg-primary-container/20 text-primary text-[11px] font-mono font-medium">+8 this cycle</span>
</div>
<div className="flex items-center justify-between text-xs text-on-surface-variant pt-2 border-t border-card-border/60">
<span>From 9,420 user quotes</span>
<span className="text-tertiary font-mono font-medium">94% classified</span>
</div>
</div>
{/* KPI 2: Top Customer Friction */}
<div className="bg-surface-container-low border border-card-border p-4 rounded-xl flex flex-col justify-between relative overflow-hidden group hover:border-card-border/90 transition-all">
<div className="flex items-center justify-between">
<span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant font-semibold">Top Customer Friction</span>
<div className="w-8 h-8 rounded-lg bg-crimson-accent/20 text-crimson-accent flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">warning</span>
</div>
</div>
<div className="my-2">
<div className="text-sm font-semibold text-on-surface truncate" title="Batch Photo Export &amp; RAW Editing">Batch RAW Photo Export</div>
<div className="flex items-center gap-2 mt-1">
<span className="px-1.5 py-0.2 rounded bg-crimson-accent/20 text-crimson-accent text-[10px] font-mono font-bold">Friction 96/100</span>
<span className="text-xs text-on-surface-variant font-mono">3,420 mentions</span>
</div>
</div>
<div className="flex items-center justify-between text-xs text-on-surface-variant pt-2 border-t border-card-border/60">
<span>Detractor Churn Risk</span>
<span className="text-crimson-accent font-mono font-semibold">68% Churn Threat</span>
</div>
</div>
{/* KPI 3: Projected NPS Lift */}
<div className="bg-surface-container-low border border-card-border p-4 rounded-xl flex flex-col justify-between relative overflow-hidden group hover:border-card-border/90 transition-all">
<div className="flex items-center justify-between">
<span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant font-semibold">Projected NPS Lift</span>
<div className="w-8 h-8 rounded-lg bg-tertiary/20 text-tertiary flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">trending_up</span>
</div>
</div>
<div className="my-2 flex items-baseline gap-2">
<span className="text-3xl font-bold font-mono text-tertiary">+14.2</span>
<span className="text-xs text-on-surface-variant">pts estimated</span>
</div>
<div className="flex items-center justify-between text-xs text-on-surface-variant pt-2 border-t border-card-border/60">
<span>Across Top 5 Backlog Items</span>
<span className="text-on-surface font-mono font-medium">Target: NPS 58</span>
</div>
</div>
{/* KPI 4: Dev Readiness Index */}
<div className="bg-surface-container-low border border-card-border p-4 rounded-xl flex flex-col justify-between relative overflow-hidden group hover:border-card-border/90 transition-all">
<div className="flex items-center justify-between">
<span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant font-semibold">Dev Readiness Index</span>
<div className="w-8 h-8 rounded-lg bg-emerald-accent/20 text-emerald-accent flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">verified</span>
</div>
</div>
<div className="my-2 flex items-center gap-3">
<span className="text-3xl font-bold font-mono text-on-surface">78%</span>
<div className="flex-1 bg-surface-container-lowest h-2 rounded-full overflow-hidden border border-card-border/50">
<div className="bg-gradient-to-r from-primary-container to-tertiary h-full rounded-full" style={{"width": "78%"}}></div>
</div>
</div>
<div className="flex items-center justify-between text-xs text-on-surface-variant pt-2 border-t border-card-border/60">
<span>12 AI Specs Complete</span>
<span className="text-emerald-accent font-mono font-medium">Acceptance Criteria Ready</span>
</div>
</div>
</div>
{/* 3. Opportunity Prioritization Matrix: 2x2 Canvas (65%) + Top AI Recommendation (35%) */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
{/* Left Side: Interactive-looking 2x2 Opportunity Prioritization Matrix (8 cols / ~66%) */}
<div className="lg:col-span-8 bg-surface-container-low border border-card-border p-5 rounded-2xl shadow-sm flex flex-col gap-4">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-card-border/50">
<div className="flex items-center gap-2.5">
<div className="w-7 h-7 rounded-lg bg-surface-container text-tertiary flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">scatter_plot</span>
</div>
<div>
<h2 className="text-sm font-semibold text-on-surface">Impact vs Dev Effort 2x2 Matrix</h2>
<p className="text-[11px] text-on-surface-variant">RICE Opportunity dynamic positioning based on live App Store review spikes</p>
</div>
</div>
{/* Legend Pills */}
<div className="flex items-center gap-3 text-[11px] font-mono">
<span className="flex items-center gap-1 text-crimson-accent">
<span className="w-2 h-2 rounded-full bg-crimson-accent"></span> Critical Pain
              </span>
<span className="flex items-center gap-1 text-tertiary">
<span className="w-2 h-2 rounded-full bg-tertiary"></span> Quick Win
              </span>
<span className="flex items-center gap-1 text-secondary">
<span className="w-2 h-2 rounded-full bg-secondary"></span> Strategic Bet
              </span>
</div>
</div>
{/* 2x2 Matrix Canvas */}
<div className="relative w-full h-[410px] bg-surface-container-lowest rounded-xl border border-card-border/70 p-4 overflow-hidden select-none">
{/* Axis Dividers */}
<div className="absolute inset-x-0 top-1/2 h-px bg-card-border/70 pointer-events-none"></div>
<div className="absolute inset-y-0 left-1/2 w-px bg-card-border/70 pointer-events-none"></div>
{/* Quadrant Labels / Watermarks */}
<div className="absolute top-3 left-4 text-[11px] font-mono text-tertiary/90 font-semibold tracking-wide flex items-center gap-1 uppercase">
<span className="material-symbols-outlined text-[15px]">bolt</span> Quick Wins (High Impact • Low Effort)
            </div>
<div className="absolute top-3 right-4 text-[11px] font-mono text-secondary/90 font-semibold tracking-wide flex items-center gap-1 uppercase">
<span className="material-symbols-outlined text-[15px]">diamond</span> Strategic Bets (High Impact • High Effort)
            </div>
<div className="absolute bottom-3 left-4 text-[11px] font-mono text-on-surface-variant/60 font-semibold tracking-wide uppercase">
              Incremental Refinements (Low Effort)
            </div>
<div className="absolute bottom-3 right-4 text-[11px] font-mono text-on-surface-variant/50 font-semibold tracking-wide uppercase">
              Time Sinks (High Effort • Low Return)
            </div>
{/* Axis Direction Arrows */}
<div className="absolute left-2.5 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[10px] font-mono text-outline uppercase tracking-widest pointer-events-none">
              ← Impact / Customer Reach ↑
            </div>
<div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-outline uppercase tracking-widest pointer-events-none">
              Dev Effort / Complexity →
            </div>
{/* PLOTTED FEATURE NODES */}
{/* 1. HEIC Buffer Auto-Purge (Quick Win: High Impact, Low Effort) */}
<div className="absolute top-[22%] left-[24%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10">
<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high/90 hover:bg-surface-bright border border-tertiary/40 shadow-lg backdrop-blur-md transition-all group-hover:scale-105">
<span className="w-2 h-2 rounded-full bg-crimson-accent animate-pulse"></span>
<span className="text-xs font-semibold text-on-surface">HEIC Buffer Auto-Purge</span>
<span className="px-1.5 py-0.2 rounded bg-tertiary/20 text-tertiary font-mono text-[10px] font-bold">RICE 96</span>
</div>
{/* Tooltip on hover */}
<div className="hidden group-hover:flex flex-col absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2.5 rounded-lg bg-surface-container-highest border border-card-border text-on-surface shadow-2xl z-30 pointer-events-none">
<span className="text-xs font-bold text-crimson-accent flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">warning</span> Critical Crash Fix
                </span>
<span className="text-[11px] text-on-surface-variant mt-1 leading-snug">3,120 mentions. Eliminates memory exhaustion during raw batch imports.</span>
</div>
</div>
{/* 2. Sub Pause & Receipt Log (Quick Win) */}
<div className="absolute top-[32%] left-[36%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10">
<div className="flex items-center gap-1.5 px-2.5 py-1.2 rounded-lg bg-surface-container-high/80 hover:bg-surface-bright border border-card-border shadow-md backdrop-blur-md transition-all group-hover:scale-105">
<span className="w-2 h-2 rounded-full bg-tertiary"></span>
<span className="text-xs text-on-surface">Sub Pause &amp; Receipt Log</span>
<span className="px-1.5 py-0.2 rounded bg-surface-container text-tertiary font-mono text-[10px]">RICE 92</span>
</div>
</div>
{/* 3. iPad Stage Manager Canvas (Strategic Bet: High Impact, High Effort) */}
<div className="absolute top-[16%] left-[78%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10">
<div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high/90 hover:bg-surface-bright border border-secondary/50 shadow-[0_0_15px_rgba(221,183,255,0.25)] backdrop-blur-md transition-all group-hover:scale-105">
<span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
<span className="text-xs font-semibold text-secondary">iPad Stage Manager Canvas</span>
<span className="px-1.5 py-0.2 rounded bg-secondary/20 text-secondary font-mono text-[10px] font-bold">RICE 98</span>
</div>
<div className="hidden group-hover:flex flex-col absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 p-2.5 rounded-lg bg-surface-container-highest border border-card-border text-on-surface shadow-2xl z-30 pointer-events-none">
<span className="text-xs font-bold text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">stars</span> Top Revenue Opportunity
                </span>
<span className="text-[11px] text-on-surface-variant mt-1 leading-snug">4,120 review mentions. Prevents canvas resets on iPadOS window resizing.</span>
</div>
</div>
{/* 4. E2EE Background Cloud Sync (Strategic Bet) */}
<div className="absolute top-[35%] left-[66%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10">
<div className="flex items-center gap-1.5 px-2.5 py-1.2 rounded-lg bg-surface-container-high/80 hover:bg-surface-bright border border-card-border shadow-md backdrop-blur-md transition-all group-hover:scale-105">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="text-xs text-on-surface">E2EE Background Cloud Sync</span>
<span className="px-1.5 py-0.2 rounded bg-surface-container text-secondary font-mono text-[10px]">RICE 91</span>
</div>
</div>
{/* 5. Pure Black OLED #000000 (Incremental Refinement: Low Effort) */}
<div className="absolute top-[68%] left-[26%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10">
<div className="flex items-center gap-1.5 px-2.5 py-1.2 rounded-lg bg-surface-container-high/70 hover:bg-surface-bright border border-card-border shadow-sm backdrop-blur-md transition-all group-hover:scale-105">
<span className="w-2 h-2 rounded-full bg-primary"></span>
<span className="text-xs text-on-surface">Pure Black OLED #000000</span>
<span className="px-1.5 py-0.2 rounded bg-surface-container text-on-surface-variant font-mono text-[10px]">RICE 79</span>
</div>
</div>
{/* 6. Custom Palette Hex Support (Time Sink / Lower Return) */}
<div className="absolute top-[76%] left-[72%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10 opacity-75 hover:opacity-100 transition-opacity">
<div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-surface-container/60 hover:bg-surface-container-high border border-card-border/60 shadow-sm backdrop-blur-md transition-all">
<span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
<span className="text-[11px] text-on-surface-variant">Custom Palette Hex Support</span>
<span className="px-1.5 py-0.2 rounded bg-surface-container-lowest text-outline font-mono text-[9px]">RICE 68</span>
</div>
</div>
</div>
{/* Footer Formula Bar */}
<div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-on-surface-variant font-mono gap-2 pt-1">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-tertiary">functions</span>
<span>RICE Weighting Formula: (Reach × Sentiment Drop × Confidence) / Dev Sprints</span>
</div>
<span className="text-primary hover:underline cursor-pointer">Configure Weights →</span>
</div>
</div>
{/* Right Side: Polished "Top AI Recommendation" card (4 cols / ~34%) */}
<div className="lg:col-span-4 bg-surface-container-low border border-card-border p-5 rounded-2xl shadow-sm flex flex-col justify-between relative overflow-hidden h-full">
<div className="flex flex-col gap-3">
<div className="flex items-center justify-between">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-primary text-[18px]">auto_awesome</span>
<span className="text-[11px] font-mono uppercase font-bold text-primary tracking-wider">Top Recommendation</span>
</div>
<span className="px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary font-mono text-xs font-bold border border-tertiary/30">ROI: 3.4x</span>
</div>
<div>
<h3 className="text-base font-bold text-on-surface leading-snug">
                Automated Renewal Grace Period &amp; In-App Invoicing
              </h3>
<p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                Synthesized from 2,410 negative reviews regarding abrupt account cutoffs during payment card expiration cycles.
              </p>
</div>
{/* Key metrics box */}
<div className="flex flex-col gap-2 bg-surface-container-lowest border border-card-border/60 p-3 rounded-xl">
<div className="flex items-center justify-between text-xs">
<span className="text-on-surface-variant">Annualized Churn Risk Mitigated:</span>
<span className="font-mono text-tertiary font-bold">$142,000 ARR</span>
</div>
<div className="flex items-center justify-between text-xs">
<span className="text-on-surface-variant">Estimated Dev Effort:</span>
<span className="font-mono text-on-surface">1.5 Sprints (Low)</span>
</div>
<div className="flex items-center justify-between text-xs">
<span className="text-on-surface-variant">Customer Confidence Index:</span>
<span className="font-mono text-secondary font-bold">98.2%</span>
</div>
</div>
{/* Sentiment Shift Bar */}
<div className="flex flex-col gap-1.5 mt-1">
<div className="flex justify-between text-[11px] font-mono text-on-surface-variant">
<span>Sentiment Shift: <span className="text-crimson-accent font-semibold">-0.92</span></span>
<span className="text-emerald-accent font-semibold">→ Projected +0.45</span>
</div>
<div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden flex border border-card-border/50">
<div className="bg-crimson-accent h-full" style={{"width": "68%"}}></div>
<div className="bg-emerald-accent h-full" style={{"width": "32%"}}></div>
</div>
</div>
</div>
{/* Card Actions */}
<div className="pt-4 mt-4 border-t border-card-border/50 flex flex-col gap-2">
<button className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-primary-container hover:bg-indigo-500 text-white font-medium text-xs shadow-md transition-all">
<span className="material-symbols-outlined text-[17px]">auto_stories</span>
<span>Draft PRD &amp; Acceptance Stories</span>
</button>
<div className="flex items-center justify-between text-xs text-on-surface-variant px-1 font-mono">
<span>Linked: Zendesk #8910</span>
<span className="text-primary hover:underline cursor-pointer">Inspect Citations (312) →</span>
</div>
</div>
</div>
</div>
{/* 4. AI Spec Generation Spotlight (Ready-to-Ship PRD card) */}
<div className="bg-surface-container-low border border-card-border p-5 rounded-2xl shadow-sm flex flex-col gap-4">
{/* Drawer Header */}
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-card-border/60">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-container to-secondary flex items-center justify-center text-white shadow-md">
<span className="material-symbols-outlined text-[20px]">terminal</span>
</div>
<div>
<div className="flex items-center gap-2 text-xs font-mono">
<span className="px-2 py-0.2 rounded bg-primary-container/20 text-primary font-bold">AI SPEC READY</span>
<span className="text-on-surface-variant">SPEC-2024-884</span>
</div>
<h2 className="text-base font-bold text-on-surface">Native Stage Manager &amp; Split-View Canvas Viewport Support</h2>
</div>
</div>
<div className="flex items-center gap-2 text-xs font-mono">
<span className="px-2.5 py-1 rounded-lg bg-surface-container border border-card-border text-tertiary">
              98.4% Customer Match
            </span>
<span className="px-2.5 py-1 rounded-lg bg-surface-container border border-card-border text-on-surface-variant">
              4,120 Reviews Synthesized
            </span>
</div>
</div>
{/* Problem & Story Details */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
{/* Problem Definition (5 cols) */}
<div className="lg:col-span-5 flex flex-col gap-3">
<div>
<span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant font-semibold">Synthesized Problem Statement</span>
<p className="text-xs text-on-surface mt-1.5 bg-surface-container-lowest border border-card-border/60 p-3 rounded-xl leading-relaxed">
                Professional iPad creators migrating from desktop are heavily blocked when multitasking: <strong className="text-crimson-accent">82% of 2-star reviews</strong> in v2.4 mention canvas reset or dropped WebGL buffers when iPadOS Stage Manager resizes the viewport to 1/2 or 2/3 width.
              </p>
</div>
<div className="flex flex-col gap-1.5">
<span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant font-semibold">Telemetry &amp; Evidence Sources</span>
<div className="flex items-center gap-2 flex-wrap">
<span className="px-2.5 py-1 rounded-lg bg-surface-container border border-card-border text-xs text-on-surface font-mono flex items-center gap-1.5">
<span className="material-symbols-outlined text-[14px] text-tertiary">file_download</span> App Store (3,840)
                </span>
<span className="px-2.5 py-1 rounded-lg bg-surface-container border border-card-border text-xs text-on-surface font-mono flex items-center gap-1.5">
<span className="material-symbols-outlined text-[14px] text-secondary">forum</span> Discord #ipad-creators (240)
                </span>
<span className="px-2.5 py-1 rounded-lg bg-surface-container border border-card-border text-xs text-on-surface font-mono flex items-center gap-1.5">
<span className="material-symbols-outlined text-[14px] text-crimson-accent">bug_report</span> Sentry Cluster #302
                </span>
</div>
</div>
</div>
{/* User Stories & Acceptance Criteria (7 cols) */}
<div className="lg:col-span-7 flex flex-col gap-2.5">
<div className="flex items-center justify-between">
<span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant font-semibold">Generated User Stories &amp; Acceptance Criteria</span>
<span className="text-xs text-primary hover:underline cursor-pointer">Regenerate with Claude 3.5 →</span>
</div>
{/* Story 1 */}
<div className="p-3 rounded-xl bg-surface-container-lowest border border-card-border/60 flex items-start gap-3">
<span className="font-mono text-xs font-bold text-primary bg-primary-container/20 px-2 py-0.5 rounded border border-primary/20">US-1</span>
<div className="flex-1">
<p className="text-xs text-on-surface leading-relaxed">
<strong>As an iPad power user</strong>, I want the canvas viewport to persist its active zoom and pan state when snapped to 1/2 or 2/3 width without reloading WebGL textures.
                </p>
<div className="flex items-center gap-3 mt-1.5 text-[11px] font-mono text-tertiary">
<span className="flex items-center gap-1">✓ Zero buffer reload</span>
<span className="flex items-center gap-1">✓ 60fps continuous gesture response</span>
</div>
</div>
</div>
{/* Story 2 */}
<div className="p-3 rounded-xl bg-surface-container-lowest border border-card-border/60 flex items-start gap-3">
<span className="font-mono text-xs font-bold text-primary bg-primary-container/20 px-2 py-0.5 rounded border border-primary/20">US-2</span>
<div className="flex-1">
<p className="text-xs text-on-surface leading-relaxed">
<strong>As a creative lead</strong>, I want multi-window Drag &amp; Drop for RAW photo layers directly from Apple Files and Lightroom into separate workspace tabs.
                </p>
<div className="flex items-center gap-3 mt-1.5 text-[11px] font-mono text-tertiary">
<span className="flex items-center gap-1">✓ Support .DNG, .CR3, .ARW formats</span>
<span className="flex items-center gap-1">✓ Background thumbnail parsing</span>
</div>
</div>
</div>
{/* PRD Bottom Actions */}
<div className="flex items-center justify-end gap-2.5 mt-2 pt-2 border-t border-card-border/50">
<button className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-card-border text-on-surface text-xs font-medium transition-all flex items-center gap-1.5">
<span className="material-symbols-outlined text-[15px]">visibility</span>
<span>View 412 Source Reviews</span>
</button>
<button className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-card-border text-on-surface text-xs font-medium transition-all flex items-center gap-1.5">
<span className="material-symbols-outlined text-[15px]">description</span>
<span>Review Full PRD Draft</span>
</button>
<button className="px-3.5 py-1.5 rounded-lg bg-primary-container hover:bg-indigo-500 text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm">
<span className="material-symbols-outlined text-[15px]">arrow_outward</span>
<span>Push to Linear Backlog</span>
</button>
</div>
</div>
</div>
</div>
{/* 5. High-Density Synthesized Feature Backlog Table */}
<div className="bg-surface-container-low border border-card-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
{/* Table Filter / Search Header */}
<div className="p-4 border-b border-card-border/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
<div>
<h2 className="text-sm font-semibold text-on-surface">Synthesized Feature Backlog</h2>
<p className="text-[11px] text-on-surface-variant">Ranked automatically using RICE score × Customer Velocity Drift</p>
</div>
<div className="flex items-center gap-2">
<div className="relative">
<input className="bg-surface-container-lowest border border-card-border pl-8 pr-3 py-1.5 rounded-xl text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary w-64" placeholder="Search backlog items, tags..." type="text"/>
<span className="material-symbols-outlined text-[16px] text-outline absolute left-2.5 top-2">search</span>
</div>
<button className="p-1.5 rounded-xl bg-surface-container border border-card-border text-on-surface-variant hover:text-on-surface transition-colors">
<span className="material-symbols-outlined text-[18px]">tune</span>
</button>
</div>
</div>
{/* Table Viewport */}
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse text-xs">
<thead>
<tr className="bg-surface-container-lowest text-on-surface-variant font-mono uppercase tracking-wider text-[10px] border-b border-card-border/60">
<th className="py-2.5 px-4 font-semibold">Feature / Opportunity</th>
<th className="py-2.5 px-3 font-semibold">Mentions &amp; Velocity</th>
<th className="py-2.5 px-3 font-semibold">Sentiment</th>
<th className="py-2.5 px-3 font-semibold">RICE Score</th>
<th className="py-2.5 px-3 font-semibold">ARR / Churn Risk</th>
<th className="py-2.5 px-3 font-semibold">Target Release</th>
<th className="py-2.5 px-3 font-semibold">Status</th>
<th className="py-2.5 px-4 text-right font-semibold">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-card-border/40">
{/* Row 1: Stage Manager (RICE 98) */}
<tr className="hover:bg-surface-container/50 transition-colors group">
<td className="py-3 px-4">
<div className="flex items-center gap-2.5">
<div className="w-8 h-8 rounded-lg bg-secondary/10 border border-secondary/20 text-secondary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[18px]">tablet_mac</span>
</div>
<div>
<div className="font-semibold text-on-surface group-hover:text-primary transition-colors cursor-pointer">
                        iPad Pro Landscape Canvas &amp; Stage Manager
                      </div>
<div className="flex items-center gap-1.5 text-[10px] font-mono text-on-surface-variant mt-0.5">
<span className="px-1.5 py-0.2 rounded bg-surface-container">Core Engine</span>
<span>•</span>
<span className="text-tertiary">High Detractor Volume</span>
</div>
</div>
</div>
</td>
<td className="py-3 px-3 font-mono">
<div className="font-bold text-on-surface">4,120</div>
<div className="text-[10px] text-crimson-accent flex items-center gap-0.5">
<span className="material-symbols-outlined text-[12px]">trending_up</span> +95% spike
                  </div>
</td>
<td className="py-3 px-3">
<span className="px-2 py-0.5 rounded-full bg-crimson-accent/15 text-crimson-accent font-mono font-bold text-[10px]">
                    -0.65 Negative
                  </span>
</td>
<td className="py-3 px-3">
<span className="px-2 py-0.5 rounded-md bg-secondary/15 border border-secondary/30 text-secondary font-mono font-bold text-[11px] inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">stars</span> 98
                  </span>
</td>
<td className="py-3 px-3 font-mono">
<div className="text-crimson-accent font-bold">$320k ARR</div>
<div className="text-[10px] text-on-surface-variant">42 Enterprise accounts</div>
</td>
<td className="py-3 px-3 font-mono">
<span className="px-2 py-0.5 rounded bg-surface-container border border-card-border text-on-surface text-[10px]">v2.5.0</span>
</td>
<td className="py-3 px-3">
<span className="px-2 py-0.5 rounded-full bg-primary-container/20 text-primary border border-primary/20 font-mono text-[10px] inline-flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Spec Drafted
                  </span>
</td>
<td className="py-3 px-4 text-right">
<div className="flex items-center justify-end gap-1 text-on-surface-variant">
<button className="p-1 rounded hover:bg-surface-container hover:text-on-surface" title="Sync Linear"><span className="material-symbols-outlined text-[17px]">sync_alt</span></button>
<button className="p-1 rounded hover:bg-surface-container hover:text-on-surface" title="View Citations"><span className="material-symbols-outlined text-[17px]">chat</span></button>
</div>
</td>
</tr>
{/* Row 2: HEIC Buffer (RICE 96) */}
<tr className="hover:bg-surface-container/50 transition-colors group">
<td className="py-3 px-4">
<div className="flex items-center gap-2.5">
<div className="w-8 h-8 rounded-lg bg-crimson-accent/10 border border-crimson-accent/20 text-crimson-accent flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[18px]">memory</span>
</div>
<div>
<div className="font-semibold text-on-surface group-hover:text-primary transition-colors cursor-pointer">
                        HEIC Buffer Auto-Garbage Collection
                      </div>
<div className="flex items-center gap-1.5 text-[10px] font-mono text-on-surface-variant mt-0.5">
<span className="px-1.5 py-0.2 rounded bg-surface-container">Memory • Crash</span>
<span>•</span>
<span className="text-crimson-accent font-semibold">P0 Blocker</span>
</div>
</div>
</div>
</td>
<td className="py-3 px-3 font-mono">
<div className="font-bold text-on-surface">3,120</div>
<div className="text-[10px] text-crimson-accent flex items-center gap-0.5">
<span className="material-symbols-outlined text-[12px]">trending_up</span> +480% surge
                  </div>
</td>
<td className="py-3 px-3">
<span className="px-2 py-0.5 rounded-full bg-crimson-accent/20 text-crimson-accent font-mono font-bold text-[10px]">
                    -0.88 Crash
                  </span>
</td>
<td className="py-3 px-3">
<span className="px-2 py-0.5 rounded-md bg-tertiary/15 border border-tertiary/30 text-tertiary font-mono font-bold text-[11px] inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">bolt</span> 96
                  </span>
</td>
<td className="py-3 px-3 font-mono">
<div className="text-crimson-accent font-bold">$195k ARR</div>
<div className="text-[10px] text-on-surface-variant">Immediate Churn</div>
</td>
<td className="py-3 px-3 font-mono">
<span className="px-2 py-0.5 rounded bg-crimson-accent/20 text-crimson-accent text-[10px] font-semibold">v2.4.2 Hotfix</span>
</td>
<td className="py-3 px-3">
<span className="px-2 py-0.5 rounded-full bg-crimson-accent/15 text-crimson-accent border border-crimson-accent/20 font-mono text-[10px] inline-flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-crimson-accent animate-pulse"></span> In Dev Sprints
                  </span>
</td>
<td className="py-3 px-4 text-right">
<div className="flex items-center justify-end gap-1 text-on-surface-variant">
<button className="p-1 rounded hover:bg-surface-container hover:text-on-surface" title="Sync Linear"><span className="material-symbols-outlined text-[17px]">sync_alt</span></button>
<button className="p-1 rounded hover:bg-surface-container hover:text-on-surface" title="View Citations"><span className="material-symbols-outlined text-[17px]">chat</span></button>
</div>
</td>
</tr>
{/* Row 3: Sub Pause (RICE 92) */}
<tr className="hover:bg-surface-container/50 transition-colors group">
<td className="py-3 px-4">
<div className="flex items-center gap-2.5">
<div className="w-8 h-8 rounded-lg bg-tertiary/10 border border-tertiary/20 text-tertiary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[18px]">receipt_long</span>
</div>
<div>
<div className="font-semibold text-on-surface group-hover:text-primary transition-colors cursor-pointer">
                        In-App Subscription Transparency &amp; Receipt History
                      </div>
<div className="flex items-center gap-1.5 text-[10px] font-mono text-on-surface-variant mt-0.5">
<span className="px-1.5 py-0.2 rounded bg-surface-container">Billing &amp; Auth</span>
<span>•</span>
<span className="text-tertiary font-semibold">Fast Implementation</span>
</div>
</div>
</div>
</td>
<td className="py-3 px-3 font-mono">
<div className="font-bold text-on-surface">2,410</div>
<div className="text-[10px] text-tertiary flex items-center gap-0.5">
<span className="material-symbols-outlined text-[12px]">trending_up</span> +64% drift
                  </div>
</td>
<td className="py-3 px-3">
<span className="px-2 py-0.5 rounded-full bg-crimson-accent/15 text-crimson-accent font-mono font-bold text-[10px]">
                    -0.92 Severe
                  </span>
</td>
<td className="py-3 px-3">
<span className="px-2 py-0.5 rounded-md bg-tertiary/15 border border-tertiary/30 text-tertiary font-mono font-bold text-[11px] inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">bolt</span> 92
                  </span>
</td>
<td className="py-3 px-3 font-mono">
<div className="text-crimson-accent font-bold">$180k ARR</div>
<div className="text-[10px] text-on-surface-variant">Card chargeback risk</div>
</td>
<td className="py-3 px-3 font-mono">
<span className="px-2 py-0.5 rounded bg-surface-container border border-card-border text-on-surface text-[10px]">v2.5.0</span>
</td>
<td className="py-3 px-3">
<span className="px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary border border-tertiary/20 font-mono text-[10px] inline-flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Ready for RFC
                  </span>
</td>
<td className="py-3 px-4 text-right">
<div className="flex items-center justify-end gap-1 text-on-surface-variant">
<button className="p-1 rounded hover:bg-surface-container hover:text-on-surface"><span className="material-symbols-outlined text-[17px]">sync_alt</span></button>
<button className="p-1 rounded hover:bg-surface-container hover:text-on-surface"><span className="material-symbols-outlined text-[17px]">chat</span></button>
</div>
</td>
</tr>
{/* Row 4: Background Export Queue (RICE 89) */}
<tr className="hover:bg-surface-container/50 transition-colors group">
<td className="py-3 px-4">
<div className="flex items-center gap-2.5">
<div className="w-8 h-8 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[18px]">download_for_offline</span>
</div>
<div>
<div className="font-semibold text-on-surface group-hover:text-primary transition-colors cursor-pointer">
                        Bulk Background Export Queue &amp; Push Notification
                      </div>
<div className="flex items-center gap-1.5 text-[10px] font-mono text-on-surface-variant mt-0.5">
<span className="px-1.5 py-0.2 rounded bg-surface-container">Exports</span>
<span>•</span>
<span className="text-on-surface-variant">Photographer Workflow</span>
</div>
</div>
</div>
</td>
<td className="py-3 px-3 font-mono">
<div className="font-bold text-on-surface">1,890</div>
<div className="text-[10px] text-crimson-accent flex items-center gap-0.5">
<span className="material-symbols-outlined text-[12px]">trending_up</span> +210% surge
                  </div>
</td>
<td className="py-3 px-3">
<span className="px-2 py-0.5 rounded-full bg-crimson-accent/15 text-crimson-accent font-mono font-bold text-[10px]">
                    -0.60 Friction
                  </span>
</td>
<td className="py-3 px-3">
<span className="px-2 py-0.5 rounded-md bg-surface-container border border-card-border font-mono font-bold text-on-surface text-[11px]">
                    89
                  </span>
</td>
<td className="py-3 px-3 font-mono">
<div className="text-on-surface font-bold">$85k ARR</div>
<div className="text-[10px] text-on-surface-variant">Pro churn correlation</div>
</td>
<td className="py-3 px-3 font-mono">
<span className="px-2 py-0.5 rounded bg-surface-container border border-card-border text-on-surface text-[10px]">v2.5.1</span>
</td>
<td className="py-3 px-3">
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-mono text-[10px] inline-flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-outline"></span> In Backlog
                  </span>
</td>
<td className="py-3 px-4 text-right">
<div className="flex items-center justify-end gap-1 text-on-surface-variant">
<button className="p-1 rounded hover:bg-surface-container hover:text-on-surface"><span className="material-symbols-outlined text-[17px]">sync_alt</span></button>
<button className="p-1 rounded hover:bg-surface-container hover:text-on-surface"><span className="material-symbols-outlined text-[17px]">chat</span></button>
</div>
</td>
</tr>
{/* Row 5: OLED Theme (RICE 79) */}
<tr className="hover:bg-surface-container/50 transition-colors group">
<td className="py-3 px-4">
<div className="flex items-center gap-2.5">
<div className="w-8 h-8 rounded-lg bg-surface-container border border-card-border text-on-surface flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[18px]">dark_mode</span>
</div>
<div>
<div className="font-semibold text-on-surface group-hover:text-primary transition-colors cursor-pointer">
                        Granular Dark Mode Palette (Pure AMOLED #000000)
                      </div>
<div className="flex items-center gap-1.5 text-[10px] font-mono text-on-surface-variant mt-0.5">
<span className="px-1.5 py-0.2 rounded bg-surface-container">Theme / UI</span>
<span>•</span>
<span className="text-emerald-accent">Battery Saving Feature</span>
</div>
</div>
</div>
</td>
<td className="py-3 px-3 font-mono">
<div className="font-bold text-on-surface">1,450</div>
<div className="text-[10px] text-tertiary flex items-center gap-0.5">
<span className="material-symbols-outlined text-[12px]">trending_flat</span> +42% steady
                  </div>
</td>
<td className="py-3 px-3">
<span className="px-2 py-0.5 rounded-full bg-emerald-accent/15 text-emerald-accent font-mono font-bold text-[10px]">
                    +0.72 Delight
                  </span>
</td>
<td className="py-3 px-3">
<span className="px-2 py-0.5 rounded-md bg-surface-container border border-card-border font-mono font-bold text-on-surface-variant text-[11px]">
                    79
                  </span>
</td>
<td className="py-3 px-3 font-mono">
<div className="text-on-surface-variant font-medium">N/A</div>
<div className="text-[10px] text-on-surface-variant">NPS Lift Driver</div>
</td>
<td className="py-3 px-3 font-mono">
<span className="px-2 py-0.5 rounded bg-surface-container border border-card-border text-on-surface text-[10px]">v2.6.0</span>
</td>
<td className="py-3 px-3">
<span className="px-2 py-0.5 rounded-full bg-primary-container/20 text-primary border border-primary/20 font-mono text-[10px] inline-flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Synced Linear
                  </span>
</td>
<td className="py-3 px-4 text-right">
<div className="flex items-center justify-end gap-1 text-on-surface-variant">
<button className="p-1 rounded hover:bg-surface-container hover:text-on-surface"><span className="material-symbols-outlined text-[17px]">sync_alt</span></button>
<button className="p-1 rounded hover:bg-surface-container hover:text-on-surface"><span className="material-symbols-outlined text-[17px]">chat</span></button>
</div>
</td>
</tr>
{/* Row 6: Apple Pencil Pro Barrel Roll (RICE 76) */}
<tr className="hover:bg-surface-container/50 transition-colors group">
<td className="py-3 px-4">
<div className="flex items-center gap-2.5">
<div className="w-8 h-8 rounded-lg bg-secondary/15 border border-secondary/20 text-secondary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[18px]">edit</span>
</div>
<div>
<div className="font-semibold text-on-surface group-hover:text-primary transition-colors cursor-pointer">
                        Apple Pencil Pro Barrel Roll &amp; Haptic Squeeze
                      </div>
<div className="flex items-center gap-1.5 text-[10px] font-mono text-on-surface-variant mt-0.5">
<span className="px-1.5 py-0.2 rounded bg-surface-container">Hardware API</span>
<span>•</span>
<span className="text-secondary">Keynote Feature</span>
</div>
</div>
</div>
</td>
<td className="py-3 px-3 font-mono">
<div className="font-bold text-on-surface">980</div>
<div className="text-[10px] text-secondary flex items-center gap-0.5">
<span className="material-symbols-outlined text-[12px]">trending_up</span> +112% new
                  </div>
</td>
<td className="py-3 px-3">
<span className="px-2 py-0.5 rounded-full bg-secondary/15 text-secondary font-mono font-bold text-[10px]">
                    +0.88 Delight
                  </span>
</td>
<td className="py-3 px-3">
<span className="px-2 py-0.5 rounded-md bg-surface-container border border-card-border font-mono font-bold text-on-surface-variant text-[11px]">
                    76
                  </span>
</td>
<td className="py-3 px-3 font-mono">
<div className="text-secondary font-semibold">App Store Feature</div>
<div className="text-[10px] text-on-surface-variant">Editorial Spotlight</div>
</td>
<td className="py-3 px-3 font-mono">
<span className="px-2 py-0.5 rounded bg-surface-container border border-card-border text-on-surface text-[10px]">v2.6.0</span>
</td>
<td className="py-3 px-3">
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-mono text-[10px] inline-flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-outline"></span> Product Review
                  </span>
</td>
<td className="py-3 px-4 text-right">
<div className="flex items-center justify-end gap-1 text-on-surface-variant">
<button className="p-1 rounded hover:bg-surface-container hover:text-on-surface"><span className="material-symbols-outlined text-[17px]">sync_alt</span></button>
<button className="p-1 rounded hover:bg-surface-container hover:text-on-surface"><span className="material-symbols-outlined text-[17px]">chat</span></button>
</div>
</td>
</tr>
{/* Row 7: Custom Palette Hex Support (RICE 68) */}
<tr className="hover:bg-surface-container/50 transition-colors group">
<td className="py-3 px-4">
<div className="flex items-center gap-2.5">
<div className="w-8 h-8 rounded-lg bg-surface-container border border-card-border text-outline flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[18px]">palette</span>
</div>
<div>
<div className="font-semibold text-on-surface-variant group-hover:text-primary transition-colors cursor-pointer">
                        Custom Accent Theme Tokens &amp; Hex Code Support
                      </div>
<div className="flex items-center gap-1.5 text-[10px] font-mono text-outline mt-0.5">
<span className="px-1.5 py-0.2 rounded bg-surface-container">Design System</span>
<span>•</span>
<span>Longtail Request</span>
</div>
</div>
</div>
</td>
<td className="py-3 px-3 font-mono">
<div className="font-medium text-on-surface-variant">720</div>
<div className="text-[10px] text-on-surface-variant flex items-center gap-0.5">
<span className="material-symbols-outlined text-[12px]">trending_flat</span> +18% steady
                  </div>
</td>
<td className="py-3 px-3">
<span className="px-2 py-0.5 rounded-full bg-surface-container text-tertiary font-mono font-bold text-[10px]">
                    +0.65 Positive
                  </span>
</td>
<td className="py-3 px-3">
<span className="px-2 py-0.5 rounded-md bg-surface-container border border-card-border font-mono font-bold text-outline text-[11px]">
                    68
                  </span>
</td>
<td className="py-3 px-3 font-mono">
<div className="text-outline">&lt;$10k ARR</div>
<div className="text-[10px] text-outline">Low risk factor</div>
</td>
<td className="py-3 px-3 font-mono">
<span className="px-2 py-0.5 rounded bg-surface-container text-outline text-[10px]">Backlog</span>
</td>
<td className="py-3 px-3">
<span className="px-2 py-0.5 rounded-full bg-surface-container text-outline font-mono text-[10px] inline-flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-outline"></span> Icebox
                  </span>
</td>
<td className="py-3 px-4 text-right">
<div className="flex items-center justify-end gap-1 text-on-surface-variant">
<button className="p-1 rounded hover:bg-surface-container hover:text-on-surface"><span className="material-symbols-outlined text-[17px]">sync_alt</span></button>
<button className="p-1 rounded hover:bg-surface-container hover:text-on-surface"><span className="material-symbols-outlined text-[17px]">chat</span></button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
{/* Table Pagination & Count Strip */}
<div className="p-3 bg-surface-container-lowest border-t border-card-border/60 flex items-center justify-between text-xs text-on-surface-variant font-mono">
<span>Showing 7 of 34 opportunity clusters (filtered from 9,420 quotes)</span>
<div className="flex items-center gap-1.5">
<button className="px-2 py-1 rounded-lg bg-surface-container border border-card-border text-on-surface-variant hover:text-on-surface disabled:opacity-40" disabled="">Previous</button>
<button className="px-2.5 py-1 rounded-lg bg-primary-container text-white font-bold">1</button>
<button className="px-2.5 py-1 rounded-lg bg-surface-container border border-card-border hover:bg-surface-container-high text-on-surface">2</button>
<button className="px-2.5 py-1 rounded-lg bg-surface-container border border-card-border hover:bg-surface-container-high text-on-surface">3</button>
<button className="px-2 py-1 rounded-lg bg-surface-container border border-card-border hover:bg-surface-container-high text-on-surface">Next</button>
</div>
</div>
</div>
{/* 6. Synthesized Customer Verbatims Wall (3-Column Direct Evidence Cards) */}
<div className="flex flex-col gap-3">
<div className="flex items-center justify-between">
<div>
<h2 className="text-sm font-semibold text-on-surface">Synthesized Customer Verbatims</h2>
<p className="text-[11px] text-on-surface-variant">Raw evidence and natural language signals feeding the feature synthesis engine</p>
</div>
<span className="px-2.5 py-1 rounded-full bg-primary-container/15 text-primary border border-primary/20 text-xs font-mono flex items-center gap-1.5">
<span className="material-symbols-outlined text-[15px]">psychology</span>
<span>Entity Recognition Active</span>
</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
{/* Verbatim Card 1: iPad Stage Manager Block */}
<div className="bg-surface-container-low border border-card-border p-4 rounded-xl shadow-sm flex flex-col justify-between hover:border-card-border/90 transition-colors">
<div className="flex flex-col gap-2">
<div className="flex items-center justify-between text-xs">
<div className="flex items-center gap-1.5 text-on-surface font-semibold">
<span className="material-symbols-outlined text-[15px] text-tertiary">phone_iphone</span>
<span>App Store (US)</span>
</div>
<span className="text-[10px] font-mono text-crimson-accent font-bold px-1.5 py-0.2 rounded bg-crimson-accent/15">1 Star • v2.4.1</span>
</div>
<p className="text-xs text-on-surface leading-relaxed mt-1">
                “I literally cannot use this on my iPad Pro M2 anymore. The second I turn on <mark className="bg-amber-400/25 text-amber-200 px-1 py-0.5 rounded font-medium">Stage Manager</mark> to bring up reference photos, the entire <mark className="bg-amber-400/25 text-amber-200 px-1 py-0.5 rounded font-medium">canvas resets and reloads</mark>, losing all my unsaved layer adjustments. Total workflow killer for paid subscribers.”
              </p>
</div>
<div className="pt-3 mt-3 border-t border-card-border/60 flex items-center justify-between text-[11px] text-on-surface-variant font-mono">
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-crimson-accent"></span>
<span className="text-on-surface">@studio_marcus</span>
</div>
<span>2 days ago</span>
</div>
</div>
{/* Verbatim Card 2: HEIC Crash / Garbage Collection */}
<div className="bg-surface-container-low border border-card-border p-4 rounded-xl shadow-sm flex flex-col justify-between hover:border-card-border/90 transition-colors">
<div className="flex flex-col gap-2">
<div className="flex items-center justify-between text-xs">
<div className="flex items-center gap-1.5 text-on-surface font-semibold">
<span className="material-symbols-outlined text-[15px] text-secondary">android</span>
<span>Google Play</span>
</div>
<span className="text-[10px] font-mono text-crimson-accent font-bold px-1.5 py-0.2 rounded bg-crimson-accent/15">1 Star • v2.4.0</span>
</div>
<p className="text-xs text-on-surface leading-relaxed mt-1">
                “Exporting more than 15 <mark className="bg-amber-400/25 text-amber-200 px-1 py-0.5 rounded font-medium">HEIC images</mark> simultaneously causes a direct <mark className="bg-amber-400/25 text-amber-200 px-1 py-0.5 rounded font-medium">out-of-memory crash</mark> on Galaxy S24 Ultra. The memory buffer never clears itself out until you hard force close the app.”
              </p>
</div>
<div className="pt-3 mt-3 border-t border-card-border/60 flex items-center justify-between text-[11px] text-on-surface-variant font-mono">
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-crimson-accent"></span>
<span className="text-on-surface">@alex_creative</span>
</div>
<span>3 days ago</span>
</div>
</div>
{/* Verbatim Card 3: Subscription & Billing Transparency */}
<div className="bg-surface-container-low border border-card-border p-4 rounded-xl shadow-sm flex flex-col justify-between hover:border-card-border/90 transition-colors">
<div className="flex flex-col gap-2">
<div className="flex items-center justify-between text-xs">
<div className="flex items-center gap-1.5 text-on-surface font-semibold">
<span className="material-symbols-outlined text-[15px] text-tertiary">support_agent</span>
<span>Zendesk Ticket #9481</span>
</div>
<span className="text-[10px] font-mono text-tertiary font-bold px-1.5 py-0.2 rounded bg-tertiary/15">Detractor CSAT</span>
</div>
<p className="text-xs text-on-surface leading-relaxed mt-1">
                “My card expired while I was traveling on a shoot. Instead of a simple grace period, your app locked all my local project files until I went to desktop web. Please add <mark className="bg-amber-400/25 text-amber-200 px-1 py-0.5 rounded font-medium">in-app invoice &amp; renewal grace</mark>!”
              </p>
</div>
<div className="pt-3 mt-3 border-t border-card-border/60 flex items-center justify-between text-[11px] text-on-surface-variant font-mono">
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="text-on-surface">Enterprise Lead (14 seats)</span>
</div>
<span>5 days ago</span>
</div>
</div>
</div>
</div>
</div>
);
}

