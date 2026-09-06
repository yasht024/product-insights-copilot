import React, { useState } from 'react';
import ReportGeneratorModal from './components/ReportGeneratorModal';

export default function Reporting() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
<div className="w-full pt-20 pb-12 px-6 flex flex-col gap-6 max-w-[1720px] mx-auto">
{/* 1. Hero Title & Context Strip */}
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-surface-container-low border border-card-border p-5 rounded-2xl shadow-sm">
<div className="flex flex-col gap-1.5 max-w-3xl">
<div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant">
<span className="px-2 py-0.5 rounded-full bg-primary-container/20 text-primary border border-primary/25 font-semibold text-[11px]">Sprint 24.4 Synthesis</span>
<span className="text-card-border">•</span>
<span className="text-tertiary">Executive Dispatch Engine Online</span>
<span className="text-card-border">•</span>
<span>12,480 telemetry events synthesized</span>
</div>
<h1 className="text-2xl font-bold tracking-tight text-on-surface">
            Executive Dossiers &amp; Automated Exports
          </h1>
<p className="text-xs text-on-surface-variant leading-relaxed">
            Cross-platform intelligence syntheses delivered automatically to C-suite, Product, and Engineering stakeholders.
          </p>
</div>
{/* View Mode Filter Bar matching Screen 7 */}
<div className="flex items-center gap-1 bg-surface-container-lowest p-1 rounded-xl border border-card-border/60 self-start lg:self-center overflow-x-auto">
<button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-bright text-white text-xs font-semibold shadow-sm transition-all">
<span className="material-symbols-outlined text-[16px] text-tertiary">summarize</span>
<span>All Deliverables (18)</span>
</button>
<button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface text-xs font-medium transition-colors">
<span className="material-symbols-outlined text-[16px]">slideshow</span>
<span>Board Briefings</span>
</button>
<button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface text-xs font-medium transition-colors">
<span className="material-symbols-outlined text-[16px]">dynamic_feed</span>
<span>Cadence Digests</span>
</button>
<button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface text-xs font-medium transition-colors">
<span className="material-symbols-outlined text-[16px]">crisis_alert</span>
<span>Post-Mortems</span>
</button>
</div>
</div>
{/* 2. Top Telemetry KPI Cards (Exact 4-card styling matching SCREEN_7) */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
{/* KPI 1: Synthesized Executive Briefs */}
<div className="bg-surface-container-low border border-card-border p-4 rounded-xl flex flex-col justify-between relative overflow-hidden group hover:border-card-border/90 transition-all">
<div className="flex items-center justify-between">
<span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant font-semibold">Synthesized Executive Briefs</span>
<div className="w-8 h-8 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">description</span>
</div>
</div>
<div className="my-2 flex items-baseline gap-2">
<span className="text-3xl font-bold font-mono text-on-surface">18</span>
<span className="px-1.5 py-0.5 rounded bg-primary-container/20 text-primary text-[11px] font-mono font-medium">+4 this cycle</span>
</div>
<div className="flex items-center justify-between text-xs text-on-surface-variant pt-2 border-t border-card-border/60">
<span>From 12,480 user reviews</span>
<span className="text-tertiary font-mono font-medium">100% AI Synthesized</span>
</div>
</div>
{/* KPI 2: Stakeholder Reach */}
<div className="bg-surface-container-low border border-card-border p-4 rounded-xl flex flex-col justify-between relative overflow-hidden group hover:border-card-border/90 transition-all">
<div className="flex items-center justify-between">
<span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant font-semibold">Stakeholder Reach</span>
<div className="w-8 h-8 rounded-lg bg-tertiary/20 text-tertiary flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">diversity_3</span>
</div>
</div>
<div className="my-2">
<div className="flex items-baseline gap-2">
<span className="text-3xl font-bold font-mono text-on-surface">142</span>
<span className="text-xs text-on-surface-variant font-mono">Cross-functional</span>
</div>
<div className="flex items-center gap-2 mt-1">
<span className="px-1.5 py-0.2 rounded bg-tertiary/20 text-tertiary text-[10px] font-mono font-bold">96% OPEN RATE</span>
<span className="text-xs text-on-surface-variant font-mono">4.2m avg engagement</span>
</div>
</div>
<div className="flex items-center justify-between text-xs text-on-surface-variant pt-2 border-t border-card-border/60">
<span>Product • Eng • CX • Executive</span>
<span className="text-emerald-accent font-mono font-semibold">Active Sync</span>
</div>
</div>
{/* KPI 3: Automated Time Saved */}
<div className="bg-surface-container-low border border-card-border p-4 rounded-xl flex flex-col justify-between relative overflow-hidden group hover:border-card-border/90 transition-all">
<div className="flex items-center justify-between">
<span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant font-semibold">Automated Time Saved</span>
<div className="w-8 h-8 rounded-lg bg-secondary/20 text-secondary flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">bolt</span>
</div>
</div>
<div className="my-2 flex items-baseline gap-2">
<span className="text-3xl font-bold font-mono text-secondary">~46.5</span>
<span className="text-xs text-on-surface-variant font-mono">hrs / mo</span>
<span className="px-1.5 py-0.5 rounded bg-secondary/20 text-secondary text-[11px] font-mono font-medium ml-auto">+14.2% vs Q2</span>
</div>
<div className="flex items-center justify-between text-xs text-on-surface-variant pt-2 border-t border-card-border/60">
<span>Avg 11.6h saved / week per PM</span>
<span className="text-on-surface font-mono font-medium">8 Sprints equiv</span>
</div>
</div>
{/* KPI 4: Synthesized Sentiment */}
<div className="bg-surface-container-low border border-card-border p-4 rounded-xl flex flex-col justify-between relative overflow-hidden group hover:border-card-border/90 transition-all">
<div className="flex items-center justify-between">
<span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant font-semibold">Synthesized Sentiment</span>
<div className="w-8 h-8 rounded-lg bg-emerald-accent/20 text-emerald-accent flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">verified</span>
</div>
</div>
<div className="my-2 flex items-center gap-3">
<span className="text-3xl font-bold font-mono text-on-surface">4.42</span>
<span className="text-xs text-on-surface-variant font-mono">/ 5.0</span>
<div className="flex-1 bg-surface-container-lowest h-2 rounded-full overflow-hidden border border-card-border/50 ml-1">
<div className="bg-gradient-to-r from-primary-container to-tertiary h-full rounded-full" style={{"width": "88.4%"}}></div>
</div>
</div>
<div className="flex items-center justify-between text-xs text-on-surface-variant pt-2 border-t border-card-border/60">
<span className="text-emerald-accent font-mono font-medium">+0.38 pt net lift</span>
<span className="text-on-surface-variant font-mono">18.4k reviews analyzed</span>
</div>
</div>
</div>
{/* 3. Two-Column Feature Spotlight Section (65% Deliverables Canvas + 35% Top AI Recommendation) */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
{/* Left Column: 2x2 Grid of Deliverables (8 cols / ~66%) */}
<div className="lg:col-span-8 bg-surface-container-low border border-card-border p-5 rounded-2xl shadow-sm flex flex-col gap-4">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-card-border/50">
<div className="flex items-center gap-2.5">
<div className="w-7 h-7 rounded-lg bg-surface-container text-tertiary flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">auto_stories</span>
</div>
<div>
<h2 className="text-sm font-semibold text-on-surface">Executive Deliverables &amp; AI Briefs</h2>
<p className="text-[11px] text-on-surface-variant">Live syntheses generated from cross-channel voice of customer telemetry</p>
</div>
</div>
{/* Legend Status Pills */}
<div className="flex items-center gap-3 text-[11px] font-mono">
<span className="flex items-center gap-1 text-primary">
<span className="w-2 h-2 rounded-full bg-primary-container"></span> Board Ready
              </span>
<span className="flex items-center gap-1 text-tertiary">
<span className="w-2 h-2 rounded-full bg-tertiary"></span> Weekly Cadence
              </span>
<span className="flex items-center gap-1 text-crimson-accent">
<span className="w-2 h-2 rounded-full bg-crimson-accent"></span> Incident
              </span>
</div>
</div>
{/* 2x2 Grid of Rich Deliverable Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
{/* Card A: Board Ready */}
<div className="bg-surface-container-lowest border border-card-border/70 hover:border-primary-container/60 p-4 rounded-xl flex flex-col justify-between group transition-all shadow-sm">
<div className="flex flex-col gap-2.5">
<div className="flex items-center justify-between">
<span className="px-2 py-0.5 rounded-md bg-primary-container/20 text-primary border border-primary-container/30 font-mono text-[10px] font-bold inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[12px]">stars</span> BOARD READY
                  </span>
<span className="text-[11px] font-mono text-on-surface-variant">18 Pages • Keynote &amp; PDF</span>
</div>
<h3 className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors leading-snug">
                  Q3 Product Health &amp; Voice of Customer Brief
                </h3>
<p className="text-xs text-on-surface-variant leading-relaxed">
                  Executive synthesis across 12,480 telemetry events. Details churn risk clusters, enterprise retention triggers, and ARR impact metrics.
                </p>
</div>
<div className="mt-4 pt-3 border-t border-card-border/60 flex items-center justify-between">
<div className="flex items-center gap-1.5 font-mono text-xs">
<span className="w-2 h-2 rounded-full bg-crimson-accent"></span>
<span className="text-on-surface-variant">ARR Risk:</span>
<span className="text-crimson-accent font-semibold">-$142k</span>
</div>
<div className="flex items-center gap-1 text-on-surface-variant">
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high hover:text-on-surface border border-card-border/60 transition-colors" title="Download PDF">
<span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
</button>
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high hover:text-on-surface border border-card-border/60 transition-colors" title="Keynote Deck">
<span className="material-symbols-outlined text-[16px]">slideshow</span>
</button>
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high hover:text-on-surface border border-card-border/60 transition-colors" title="Share Dispatch">
<span className="material-symbols-outlined text-[16px]">share</span>
</button>
</div>
</div>
</div>
{/* Card B: Weekly Cadence */}
<div className="bg-surface-container-lowest border border-card-border/70 hover:border-tertiary/60 p-4 rounded-xl flex flex-col justify-between group transition-all shadow-sm">
<div className="flex flex-col gap-2.5">
<div className="flex items-center justify-between">
<span className="px-2 py-0.5 rounded-md bg-tertiary/15 text-tertiary border border-tertiary/30 font-mono text-[10px] font-bold inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[12px]">schedule</span> WEEKLY CADENCE
                  </span>
<span className="text-[11px] font-mono text-tertiary font-medium">Dispatched Mon 9:00 AM</span>
</div>
<h3 className="text-sm font-semibold text-on-surface group-hover:text-tertiary transition-colors leading-snug">
                  Weekly Sentiment Drift &amp; App Store Digest
                </h3>
<p className="text-xs text-on-surface-variant leading-relaxed">
                  Dispatched weekly to #product-leadership and 28 executive stakeholders. Analyzes iOS 17.5 &amp; Android 14 review divergence.
                </p>
</div>
<div className="mt-4 pt-3 border-t border-card-border/60 flex items-center justify-between">
<div className="flex items-center gap-1.5 font-mono text-xs text-on-surface-variant">
<span className="material-symbols-outlined text-[15px] text-tertiary">group</span>
<span>28 Stakeholders in #leadership</span>
</div>
<div className="flex items-center gap-1 text-on-surface-variant">
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high hover:text-on-surface border border-card-border/60 transition-colors" title="Slack BlockKit">
<span className="material-symbols-outlined text-[16px]">send</span>
</button>
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high hover:text-on-surface border border-card-border/60 transition-colors" title="Download Digest">
<span className="material-symbols-outlined text-[16px]">download</span>
</button>
</div>
</div>
</div>
{/* Card C: Incident Post-Mortem */}
<div className="bg-surface-container-lowest border border-card-border/70 hover:border-crimson-accent/60 p-4 rounded-xl flex flex-col justify-between group transition-all shadow-sm">
<div className="flex flex-col gap-2.5">
<div className="flex items-center justify-between">
<span className="px-2 py-0.5 rounded-md bg-crimson-accent/20 text-crimson-accent border border-crimson-accent/30 font-mono text-[10px] font-bold inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[12px]">warning</span> INCIDENT POST-MORTEM
                  </span>
<span className="text-[11px] font-mono text-crimson-accent font-semibold">v2.4.0 Hotfix</span>
</div>
<h3 className="text-sm font-semibold text-on-surface group-hover:text-crimson-accent transition-colors leading-snug">
                  v2.4.0 Negative Surge &amp; Incident Recovery
                </h3>
<p className="text-xs text-on-surface-variant leading-relaxed">
                  Deep dive into camera crash anomalies, 1-star review spikes, emergency patch deployment telemetry, and sentiment restoration.
                </p>
</div>
<div className="mt-4 pt-3 border-t border-card-border/60 flex items-center justify-between">
<div className="flex items-center gap-1.5 font-mono text-xs text-emerald-accent">
<span className="w-2 h-2 rounded-full bg-emerald-accent"></span>
<span>Recovery: +94.2%</span>
</div>
<div className="flex items-center gap-1 text-on-surface-variant">
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high hover:text-on-surface border border-card-border/60 transition-colors" title="Copy Incident Report">
<span className="material-symbols-outlined text-[16px]">content_copy</span>
</button>
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high hover:text-on-surface border border-card-border/60 transition-colors" title="Download PDF">
<span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
</button>
</div>
</div>
</div>
{/* Card D: Dev Attribution */}
<div className="bg-surface-container-lowest border border-card-border/70 hover:border-amber-accent/60 p-4 rounded-xl flex flex-col justify-between group transition-all shadow-sm">
<div className="flex flex-col gap-2.5">
<div className="flex items-center justify-between">
<span className="px-2 py-0.5 rounded-md bg-amber-accent/15 text-amber-accent border border-amber-accent/30 font-mono text-[10px] font-bold inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[12px]">alt_route</span> DEV ATTRIBUTION
                  </span>
<span className="text-[11px] font-mono text-on-surface-variant">Linear • Jira</span>
</div>
<h3 className="text-sm font-semibold text-on-surface group-hover:text-amber-accent transition-colors leading-snug">
                  Linear &amp; Jira Issue Attribution Report
                </h3>
<p className="text-xs text-on-surface-variant leading-relaxed">
                  Cross-references 4,120 review mentions directly to engineering backlog items and verifies sprint cycle velocity vs user sentiment lift.
                </p>
</div>
<div className="mt-4 pt-3 border-t border-card-border/60 flex items-center justify-between">
<div className="flex items-center gap-1.5 font-mono text-xs text-on-surface-variant">
<span className="material-symbols-outlined text-[15px] text-amber-accent">commit</span>
<span className="text-amber-accent font-semibold">87 Linked PRs</span>
</div>
<div className="flex items-center gap-1 text-on-surface-variant">
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high hover:text-on-surface border border-card-border/60 transition-colors" title="Export CSV">
<span className="material-symbols-outlined text-[16px]">table_chart</span>
</button>
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high hover:text-on-surface border border-card-border/60 transition-colors" title="Sync Linear">
<span className="material-symbols-outlined text-[16px]">sync_alt</span>
</button>
</div>
</div>
</div>
</div>
{/* Footer Synthesis Formula Bar */}
<div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-on-surface-variant font-mono gap-2 pt-1 border-t border-card-border/50">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-tertiary">functions</span>
<span>Automated Digest Cadence: Every Monday 09:00 AM UTC • Multi-Platform Synthesis</span>
</div>
<span className="text-primary hover:underline cursor-pointer">Configure Schedules →</span>
</div>
</div>
{/* Right Column: Top Executive Recommendation Spotlight (4 cols / ~34%) */}
<div className="lg:col-span-4 bg-surface-container-low border border-card-border p-5 rounded-2xl shadow-sm flex flex-col justify-between relative overflow-hidden h-full">
<div className="flex flex-col gap-3">
<div className="flex items-center justify-between">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-primary text-[18px]">auto_awesome</span>
<span className="text-[11px] font-mono uppercase font-bold text-primary tracking-wider">Top Executive Recommendation</span>
</div>
<span className="px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary font-mono text-xs font-bold border border-tertiary/30">ROI: 4.8x</span>
</div>
<div>
<h3 className="text-base font-bold text-on-surface leading-snug">
                Automated VOC Board Brief &amp; Executive Summary
              </h3>
<p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                Synthesized across 12,480 reviews: immediate board briefing on revenue churn risk &amp; customer sentiment turnaround.
              </p>
</div>
{/* Key metrics box matching SCREEN_7 */}
<div className="flex flex-col gap-2 bg-surface-container-lowest border border-card-border/60 p-3 rounded-xl">
<div className="flex items-center justify-between text-xs">
<span className="text-on-surface-variant">Annualized Churn Risk Mitigated:</span>
<span className="font-mono text-tertiary font-bold">$142,000 ARR</span>
</div>
<div className="flex items-center justify-between text-xs">
<span className="text-on-surface-variant">Executive Read Time:</span>
<span className="font-mono text-on-surface font-semibold">3.5 Mins (Dense)</span>
</div>
<div className="flex items-center justify-between text-xs">
<span className="text-on-surface-variant">Customer Confidence Index:</span>
<span className="font-mono text-secondary font-bold">98.4%</span>
</div>
</div>
{/* Sparkline Trajectory Chart */}
<div className="rounded-xl bg-surface-container-lowest border border-card-border/60 p-3 flex flex-col gap-1">
<div className="flex items-center justify-between text-[11px] font-mono">
<span className="text-on-surface-variant uppercase text-[10px]">Sentiment Trajectory</span>
<span className="text-tertiary font-semibold">+18.4% Net Lift</span>
</div>
<div className="w-full h-16 pt-1">
<svg className="w-full h-full" fill="none" preserveaspectratio="none" viewBox="0 0 320 50">
<defs>
<linearGradient id="recGrad" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stop-color="#4cd7f6" stop-opacity="0.35"></stop>
<stop offset="100%" stop-color="#4cd7f6" stop-opacity="0.0"></stop>
</linearGradient>
</defs>
<path d="M0,38 Q40,36 80,30 T160,22 T240,12 T300,16 T320,5 L320,50 L0,50 Z" fill="url(#recGrad)" />
<path d="M0,38 Q40,36 80,30 T160,22 T240,12 T300,16 T320,5" stroke="#4cd7f6" strokeLinecap="round" strokeWidth="2" />
<circle className="fill-primary" cx="160" cy="22" r="3" />
<circle className="fill-tertiary" cx="320" cy="5" r="3.5" />
</svg>
</div>
<div className="flex items-center justify-between text-on-surface-variant font-mono text-[9px] pt-1">
<span>W26 • Jul 1</span>
<span>W32 • Hotfix v2.4</span>
<span>W38 • Current (+18.4%)</span>
</div>
</div>
</div>
{/* Card Actions */}
<div className="pt-4 mt-4 border-t border-card-border/50 flex flex-col gap-2">
<button className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-primary-container hover:bg-indigo-500 text-white font-medium text-xs shadow-md shadow-primary-container/25 transition-all">
<span className="material-symbols-outlined text-[17px]">send</span>
<span>Draft Executive Memo &amp; Push to Board</span>
</button>
<div className="flex items-center justify-between text-xs text-on-surface-variant px-1 font-mono">
<span>Encrypted PDF • Keynote</span>
<span className="text-primary hover:underline cursor-pointer">Inspect Citations (412) →</span>
</div>
</div>
</div>
</div>
{/* 4. Spotlight Interactive Deep Dive / Preview (matching SCREEN_7's PRD preview SPEC-2024-884) */}
<div className="bg-surface-container-low border border-card-border p-5 rounded-2xl shadow-sm flex flex-col gap-4">
{/* Drawer Header */}
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-card-border/60">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-container to-secondary flex items-center justify-center text-white shadow-md">
<span className="material-symbols-outlined text-[20px]">terminal</span>
</div>
<div>
<div className="flex items-center gap-2 text-xs font-mono">
<span className="px-2 py-0.2 rounded bg-primary-container/20 text-primary font-bold">AI REPORT BLUEPRINT READY</span>
<span className="text-on-surface-variant">REP-2024-Q3</span>
</div>
<h2 className="text-base font-bold text-on-surface">Confidential Executive Sheet: Q3 VOC &amp; Retention Telemetry</h2>
</div>
</div>
<div className="flex items-center gap-2 text-xs font-mono">
<span className="px-2.5 py-1 rounded-lg bg-surface-container border border-card-border text-tertiary">
              98.4% Executive Alignment
            </span>
<span className="px-2.5 py-1 rounded-lg bg-surface-container border border-card-border text-on-surface-variant">
              12,480 Reviews Synthesized
            </span>
</div>
</div>
{/* Problem Definition & Friction Breakdown */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
{/* Problem Definition (5 cols) */}
<div className="lg:col-span-5 flex flex-col gap-3">
<div>
<span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant font-semibold">Synthesized Problem &amp; Findings Statement</span>
<p className="text-xs text-on-surface mt-1.5 bg-surface-container-lowest border border-card-border/60 p-3 rounded-xl leading-relaxed">
                Enterprise cohort retention dropped by <strong className="text-crimson-accent">3.4% during July</strong> due to camera crash anomalies on Android 14 and SAML timeout loops. The emergency hotfix stabilized 94.2% of detractor sentiment, but remaining billing UX issues jeopardize <strong className="text-amber-accent">$142,000 in recurring ARR</strong> across 42 high-value accounts.
              </p>
</div>
<div className="flex flex-col gap-1.5">
<span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant font-semibold">Telemetry &amp; Evidence Sources</span>
<div className="flex items-center gap-2 flex-wrap">
<span className="px-2.5 py-1 rounded-lg bg-surface-container border border-card-border text-xs text-on-surface font-mono flex items-center gap-1.5">
<span className="material-symbols-outlined text-[14px] text-tertiary">file_download</span> App Store (8,140)
                </span>
<span className="px-2.5 py-1 rounded-lg bg-surface-container border border-card-border text-xs text-on-surface font-mono flex items-center gap-1.5">
<span className="material-symbols-outlined text-[14px] text-secondary">forum</span> Google Play (4,340)
                </span>
<span className="px-2.5 py-1 rounded-lg bg-surface-container border border-card-border text-xs text-on-surface font-mono flex items-center gap-1.5">
<span className="material-symbols-outlined text-[14px] text-crimson-accent">bug_report</span> Zendesk &amp; Sentry (412)
                </span>
</div>
</div>
</div>
{/* Friction Vectors & Impact Stories (7 cols) */}
<div className="lg:col-span-7 flex flex-col gap-2.5">
<div className="flex items-center justify-between">
<span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant font-semibold">Executive Telemetry &amp; ARR Friction Vectors</span>
<span className="text-xs text-primary hover:underline cursor-pointer">Regenerate with Claude 3.5 →</span>
</div>
{/* Vector 1 */}
<div className="p-3 rounded-xl bg-surface-container-lowest border border-card-border/60 flex items-start gap-3">
<span className="font-mono text-xs font-bold text-crimson-accent bg-crimson-accent/20 px-2 py-0.5 rounded border border-crimson-accent/20 whitespace-nowrap">HIGH RISK</span>
<div className="flex-1">
<div className="flex items-center justify-between">
<p className="text-xs font-semibold text-on-surface">Camera Permissions &amp; SDK Latency</p>
<span className="font-mono text-xs text-crimson-accent font-bold">$68,400 ARR</span>
</div>
<p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                  40 enterprise warehouse scanners blocked during initial v2.4 migration. Emergency v2.4.2 patch restored optical capture.
                </p>
<div className="flex items-center gap-3 mt-1.5 text-[11px] font-mono text-tertiary">
<span className="flex items-center gap-1">✓ 94.2% Sentiment Recovery</span>
<span className="flex items-center gap-1">✓ Zero WebGL buffer drop</span>
</div>
</div>
</div>
{/* Vector 2 */}
<div className="p-3 rounded-xl bg-surface-container-lowest border border-card-border/60 flex items-start gap-3">
<span className="font-mono text-xs font-bold text-amber-accent bg-amber-accent/20 px-2 py-0.5 rounded border border-amber-accent/20 whitespace-nowrap">AUTH LOOP</span>
<div className="flex-1">
<div className="flex items-center justify-between">
<p className="text-xs font-semibold text-on-surface">SAML SSO Session Timeout Loop</p>
<span className="font-mono text-xs text-amber-accent font-bold">$44,100 ARR</span>
</div>
<p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                  Floor supervisors forced to re-authenticate every 2 hours via Okta, causing friction and negative app reviews.
                </p>
<div className="flex items-center gap-3 mt-1.5 text-[11px] font-mono text-tertiary">
<span className="flex items-center gap-1">✓ PR #412 Drafted in Linear</span>
<span className="flex items-center gap-1">✓ 8h refresh token lifecycle</span>
</div>
</div>
</div>
{/* Vector 3 */}
<div className="p-3 rounded-xl bg-surface-container-lowest border border-card-border/60 flex items-start gap-3">
<span className="font-mono text-xs font-bold text-primary bg-primary-container/20 px-2 py-0.5 rounded border border-primary/20 whitespace-nowrap">BILLING UX</span>
<div className="flex-1">
<div className="flex items-center justify-between">
<p className="text-xs font-semibold text-on-surface">CSV Billing Export Truncation</p>
<span className="font-mono text-xs text-secondary font-bold">$29,500 ARR</span>
</div>
<p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                  Finance teams unable to export invoices with more than 500 line items directly from mobile view.
                </p>
<div className="flex items-center gap-3 mt-1.5 text-[11px] font-mono text-tertiary">
<span className="flex items-center gap-1">✓ S3 Streaming Fix Queued</span>
</div>
</div>
</div>
{/* PRD Bottom Actions */}
<div className="flex items-center justify-end gap-2.5 mt-2 pt-2 border-t border-card-border/50">
<button className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-card-border text-on-surface text-xs font-medium transition-all flex items-center gap-1.5">
<span className="material-symbols-outlined text-[15px]">visibility</span>
<span>View 412 Source Citations</span>
</button>
<button className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-card-border text-on-surface text-xs font-medium transition-all flex items-center gap-1.5">
<span className="material-symbols-outlined text-[15px]">description</span>
<span>Push to Notion / Confluence</span>
</button>
<button onClick={() => setIsModalOpen(true)} className="px-3.5 py-1.5 rounded-lg bg-primary-container hover:bg-indigo-500 text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm">
<span className="material-symbols-outlined text-[15px]">download</span>
<span>Generate Report Image</span>
</button>
</div>
</div>
</div>
</div>
<ReportGeneratorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
{/* 5. Scheduled Automated Deliveries & Distribution Pipeline (matching SCREEN_7's crisp enterprise data table) */}
<div className="bg-surface-container-low border border-card-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
{/* Table Filter / Search Header */}
<div className="p-4 border-b border-card-border/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
<div>
<h2 className="text-sm font-semibold text-on-surface">Scheduled Automated Deliveries &amp; Distribution Pipelines</h2>
<p className="text-[11px] text-on-surface-variant">Recurring cross-platform pipelines delivering intelligence directly to decision-makers</p>
</div>
<div className="flex items-center gap-2">
<div className="relative">
<input className="bg-surface-container-lowest border border-card-border pl-8 pr-3 py-1.5 rounded-xl text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary w-64" placeholder="Filter distribution channels..." type="text"/>
<span className="material-symbols-outlined text-[16px] text-outline absolute left-2.5 top-2">search</span>
</div>
<button className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary-container/20 border border-primary/30 text-primary hover:bg-primary-container/30 font-medium text-xs transition-colors">
<span className="material-symbols-outlined text-[15px]">add</span>
<span>+ New Schedule</span>
</button>
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
<th className="py-2.5 px-4 font-semibold">Channel &amp; Stakeholder</th>
<th className="py-2.5 px-3 font-semibold">Report Type</th>
<th className="py-2.5 px-3 font-semibold">Cadence</th>
<th className="py-2.5 px-3 font-semibold">Destination &amp; Format</th>
<th className="py-2.5 px-3 font-semibold">Last Delivered</th>
<th className="py-2.5 px-3 font-semibold">Next Run</th>
<th className="py-2.5 px-3 font-semibold">Status</th>
<th className="py-2.5 px-4 text-right font-semibold">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-card-border/40">
{/* Row 1: Slack Webhook */}
<tr className="hover:bg-surface-container/50 transition-colors group">
<td className="py-3 px-4">
<div className="flex items-center gap-2.5">
<div className="w-8 h-8 rounded-lg bg-primary-container/20 border border-primary-container/30 text-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[18px]">forum</span>
</div>
<div>
<div className="font-semibold text-on-surface group-hover:text-primary transition-colors cursor-pointer">
                        #exec-product-sync
                      </div>
<div className="flex items-center gap-1.5 text-[10px] font-mono text-on-surface-variant mt-0.5">
<span className="px-1.5 py-0.2 rounded bg-surface-container">Slack Webhook</span>
<span>•</span>
<span className="text-tertiary">44 members</span>
</div>
</div>
</div>
</td>
<td className="py-3 px-3 font-medium text-on-surface">Weekly Sentiment Drift</td>
<td className="py-3 px-3">
<span className="px-2 py-0.5 rounded-full bg-tertiary/15 border border-tertiary/30 text-tertiary font-mono text-[10px] inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[12px]">schedule</span> Weekly • Mon 9:00 AM
                  </span>
</td>
<td className="py-3 px-3">
<div className="flex items-center gap-1.5">
<span className="px-2 py-0.5 rounded bg-surface-container border border-card-border font-mono text-[10px] text-on-surface">PDF + Keynote</span>
<span className="px-2 py-0.5 rounded bg-surface-container border border-card-border font-mono text-[10px] text-on-surface-variant">Slack BlockKit</span>
</div>
</td>
<td className="py-3 px-3 font-mono text-on-surface-variant">Mon, Oct 7 • 09:00</td>
<td className="py-3 px-3 font-mono">
<div className="text-primary font-semibold flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span> In 3d 14h
                  </div>
</td>
<td className="py-3 px-3">
<span className="px-2 py-0.5 rounded-full bg-emerald-accent/15 text-emerald-accent border border-emerald-accent/20 font-mono text-[10px] inline-flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-emerald-accent"></span> Active
                  </span>
</td>
<td className="py-3 px-4 text-right">
<div className="flex items-center justify-end gap-1 text-on-surface-variant">
<button className="p-1 rounded hover:bg-surface-container hover:text-on-surface" title="Run Now"><span className="material-symbols-outlined text-[17px]">play_arrow</span></button>
<button className="p-1 rounded hover:bg-surface-container hover:text-on-surface" title="Pause Schedule"><span className="material-symbols-outlined text-[17px]">pause</span></button>
<button className="p-1 rounded hover:bg-surface-container hover:text-on-surface" title="Edit Pipeline"><span className="material-symbols-outlined text-[17px]">edit</span></button>
</div>
</td>
</tr>
{/* Row 2: Board Audit Distribution List */}
<tr className="hover:bg-surface-container/50 transition-colors group">
<td className="py-3 px-4">
<div className="flex items-center gap-2.5">
<div className="w-8 h-8 rounded-lg bg-secondary/15 border border-secondary/20 text-secondary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[18px]">mail</span>
</div>
<div>
<div className="font-semibold text-on-surface group-hover:text-secondary transition-colors cursor-pointer">
                        Board Audit Distribution List
                      </div>
<div className="flex items-center gap-1.5 text-[10px] font-mono text-on-surface-variant mt-0.5">
<span className="px-1.5 py-0.2 rounded bg-surface-container">board-briefs@company.internal</span>
</div>
</div>
</div>
</td>
<td className="py-3 px-3 font-medium text-on-surface">Quarterly Health &amp; ARR Brief</td>
<td className="py-3 px-3">
<span className="px-2 py-0.5 rounded-full bg-secondary/15 border border-secondary/30 text-secondary font-mono text-[10px] inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[12px]">calendar_month</span> Quarterly • 1st of Qtr
                  </span>
</td>
<td className="py-3 px-3">
<div className="flex items-center gap-1.5">
<span className="px-2 py-0.5 rounded bg-surface-container border border-card-border font-mono text-[10px] text-on-surface">Executive PDF</span>
<span className="px-2 py-0.5 rounded bg-surface-container border border-card-border font-mono text-[10px] text-on-surface-variant">Encrypted Keynote</span>
</div>
</td>
<td className="py-3 px-3 font-mono text-on-surface-variant">Oct 1 • 06:00</td>
<td className="py-3 px-3 font-mono text-on-surface-variant">In 82 days</td>
<td className="py-3 px-3">
<span className="px-2 py-0.5 rounded-full bg-emerald-accent/15 text-emerald-accent border border-emerald-accent/20 font-mono text-[10px] inline-flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-emerald-accent"></span> Active
                  </span>
</td>
<td className="py-3 px-4 text-right">
<div className="flex items-center justify-end gap-1 text-on-surface-variant">
<button className="p-1 rounded hover:bg-surface-container hover:text-on-surface" title="Run Now"><span className="material-symbols-outlined text-[17px]">play_arrow</span></button>
<button className="p-1 rounded hover:bg-surface-container hover:text-on-surface" title="Pause Schedule"><span className="material-symbols-outlined text-[17px]">pause</span></button>
<button className="p-1 rounded hover:bg-surface-container hover:text-on-surface" title="Edit Pipeline"><span className="material-symbols-outlined text-[17px]">edit</span></button>
</div>
</td>
</tr>
{/* Row 3: Linear Triage Sync */}
<tr className="hover:bg-surface-container/50 transition-colors group">
<td className="py-3 px-4">
<div className="flex items-center gap-2.5">
<div className="w-8 h-8 rounded-lg bg-tertiary/15 border border-tertiary/20 text-tertiary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[18px]">terminal</span>
</div>
<div>
<div className="font-semibold text-on-surface group-hover:text-tertiary transition-colors cursor-pointer">
                        Linear Triage Automation
                      </div>
<div className="flex items-center gap-1.5 text-[10px] font-mono text-on-surface-variant mt-0.5">
<span className="px-1.5 py-0.2 rounded bg-surface-container">API Integration</span>
<span>•</span>
<span className="text-on-surface-variant">#eng-mobile</span>
</div>
</div>
</div>
</td>
<td className="py-3 px-3 font-medium text-on-surface">Daily Bug &amp; Crash Surge Attribution</td>
<td className="py-3 px-3">
<span className="px-2 py-0.5 rounded-full bg-tertiary/15 border border-tertiary/30 text-tertiary font-mono text-[10px] inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[12px]">schedule</span> Daily • 00:00 UTC
                  </span>
</td>
<td className="py-3 px-3">
<div className="flex items-center gap-1.5">
<span className="px-2 py-0.5 rounded bg-surface-container border border-card-border font-mono text-[10px] text-on-surface">Linear Tickets</span>
<span className="px-2 py-0.5 rounded bg-surface-container border border-card-border font-mono text-[10px] text-on-surface-variant">CSV Sync</span>
</div>
</td>
<td className="py-3 px-3 font-mono text-on-surface-variant">Today • 00:00</td>
<td className="py-3 px-3 font-mono">
<div className="text-tertiary font-semibold flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span> In 4h 22m
                  </div>
</td>
<td className="py-3 px-3">
<span className="px-2 py-0.5 rounded-full bg-emerald-accent/15 text-emerald-accent border border-emerald-accent/20 font-mono text-[10px] inline-flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-emerald-accent"></span> Active
                  </span>
</td>
<td className="py-3 px-4 text-right">
<div className="flex items-center justify-end gap-1 text-on-surface-variant">
<button className="p-1 rounded hover:bg-surface-container hover:text-on-surface" title="Run Now"><span className="material-symbols-outlined text-[17px]">play_arrow</span></button>
<button className="p-1 rounded hover:bg-surface-container hover:text-on-surface" title="Pause Schedule"><span className="material-symbols-outlined text-[17px]">pause</span></button>
<button className="p-1 rounded hover:bg-surface-container hover:text-on-surface" title="Edit Pipeline"><span className="material-symbols-outlined text-[17px]">edit</span></button>
</div>
</td>
</tr>
{/* Row 4: S3 Raw Data Lake */}
<tr className="hover:bg-surface-container/50 transition-colors group">
<td className="py-3 px-4">
<div className="flex items-center gap-2.5">
<div className="w-8 h-8 rounded-lg bg-surface-container border border-card-border text-outline flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[18px]">database</span>
</div>
<div>
<div className="font-semibold text-on-surface group-hover:text-primary transition-colors cursor-pointer">
                        Data Warehouse S3 Raw Bucket
                      </div>
<div className="flex items-center gap-1.5 text-[10px] font-mono text-outline mt-0.5">
<span>s3://insights-copilot-raw-exports</span>
</div>
</div>
</div>
</td>
<td className="py-3 px-3 font-medium text-on-surface">All Review Transcripts &amp; Vector Embeddings</td>
<td className="py-3 px-3">
<span className="px-2 py-0.5 rounded-full bg-surface-container border border-card-border font-mono text-[10px] text-on-surface-variant inline-flex items-center gap-1">
                    Hourly Batch
                  </span>
</td>
<td className="py-3 px-3">
<div className="flex items-center gap-1.5">
<span className="px-2 py-0.5 rounded bg-surface-container border border-card-border font-mono text-[10px] text-on-surface">Parquet / JSONL</span>
</div>
</td>
<td className="py-3 px-3 font-mono text-on-surface-variant">42 mins ago</td>
<td className="py-3 px-3 font-mono text-on-surface-variant">In 18 mins</td>
<td className="py-3 px-3">
<span className="px-2 py-0.5 rounded-full bg-emerald-accent/15 text-emerald-accent border border-emerald-accent/20 font-mono text-[10px] inline-flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-emerald-accent"></span> Streaming
                  </span>
</td>
<td className="py-3 px-4 text-right">
<div className="flex items-center justify-end gap-1 text-on-surface-variant">
<button className="p-1 rounded hover:bg-surface-container hover:text-on-surface" title="Run Now"><span className="material-symbols-outlined text-[17px]">play_arrow</span></button>
<button className="p-1 rounded hover:bg-surface-container hover:text-on-surface" title="Pause Schedule"><span className="material-symbols-outlined text-[17px]">pause</span></button>
<button className="p-1 rounded hover:bg-surface-container hover:text-on-surface" title="Edit Pipeline"><span className="material-symbols-outlined text-[17px]">edit</span></button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
{/* Table Pagination & Count Strip */}
<div className="p-3 bg-surface-container-lowest border-t border-card-border/60 flex items-center justify-between text-xs text-on-surface-variant font-mono">
<span>Showing 4 active automated pipelines across 142 stakeholders</span>
<div className="flex items-center gap-1.5">
<button className="px-2 py-1 rounded-lg bg-surface-container border border-card-border text-on-surface-variant hover:text-on-surface disabled:opacity-40" disabled="">Previous</button>
<button className="px-2.5 py-1 rounded-lg bg-primary-container text-white font-bold">1</button>
<button className="px-2.5 py-1 rounded-lg bg-surface-container border border-card-border hover:bg-surface-container-high text-on-surface">2</button>
<button className="px-2 py-1 rounded-lg bg-surface-container border border-card-border hover:bg-surface-container-high text-on-surface">Next</button>
</div>
</div>
</div>
{/* 6. Grounded Evidence Verbatims Wall (matching SCREEN_7's bottom 3 customer verbatims) */}
<div className="flex flex-col gap-3">
<div className="flex items-center justify-between">
<div>
<h2 className="text-sm font-semibold text-on-surface">Grounded Evidence Verbatims Wall</h2>
<p className="text-[11px] text-on-surface-variant">Raw evidence and natural language signals feeding executive synthesis models</p>
</div>
<span className="px-2.5 py-1 rounded-full bg-primary-container/15 text-primary border border-primary/20 text-xs font-mono flex items-center gap-1.5">
<span className="material-symbols-outlined text-[15px]">psychology</span>
<span>Entity Recognition Active</span>
</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
{/* Verbatim Card 1: Camera Crash / Optical Scan */}
<div className="bg-surface-container-low border border-card-border p-4 rounded-xl shadow-sm flex flex-col justify-between hover:border-card-border/90 transition-colors">
<div className="flex flex-col gap-2">
<div className="flex items-center justify-between text-xs">
<div className="flex items-center gap-1.5 text-on-surface font-semibold">
<span className="material-symbols-outlined text-[15px] text-tertiary">phone_iphone</span>
<span>App Store (US)</span>
</div>
<span className="text-[10px] font-mono text-crimson-accent font-bold px-1.5 py-0.2 rounded bg-crimson-accent/15">1 Star • v2.4.0</span>
</div>
<p className="text-xs text-on-surface leading-relaxed mt-1">
                “After the v2.4 update our warehouse barcode scanning failed on 40 devices due to a <mark className="bg-amber-400/25 text-amber-200 px-1 py-0.5 rounded font-medium">camera crash</mark> anomaly. The emergency hotfix restored trust, but session timeouts still interrupt floor workers.”
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
{/* Verbatim Card 2: In-app Invoicing & Billing */}
<div className="bg-surface-container-low border border-card-border p-4 rounded-xl shadow-sm flex flex-col justify-between hover:border-card-border/90 transition-colors">
<div className="flex flex-col gap-2">
<div className="flex items-center justify-between text-xs">
<div className="flex items-center gap-1.5 text-on-surface font-semibold">
<span className="material-symbols-outlined text-[15px] text-secondary">android</span>
<span>Google Play</span>
</div>
<span className="text-[10px] font-mono text-crimson-accent font-bold px-1.5 py-0.2 rounded bg-crimson-accent/15">2 Star • v2.4.1</span>
</div>
<p className="text-xs text-on-surface leading-relaxed mt-1">
                “Finance team cannot reconcile monthly seat additions. Exporting CSV cuts off halfway and there is no <mark className="bg-amber-400/25 text-amber-200 px-1 py-0.5 rounded font-medium">in-app invoice</mark> download for enterprise accounts. Fix this before renewal!”
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
{/* Verbatim Card 3: Stage Manager / Multitask Reset */}
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
                “Our executive team relies on iPad presentations during weekly reviews. When resizing windows in <mark className="bg-amber-400/25 text-amber-200 px-1 py-0.5 rounded font-medium">stage manager</mark>, the KPI graph resets and loses filters. Needs persistent state.”
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

