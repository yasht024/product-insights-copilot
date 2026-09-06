import React from 'react';

export default function Analytics() {
  return (
    <>
      <aside className="fixed left-0 top-0 h-full w-sidebar-w bg-surface-container-lowest/90 backdrop-blur-xl z-50 flex flex-col justify-between py-space-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="flex flex-col gap-space-md"><div className="px-space-md flex items-center justify-between"><div className="flex items-center gap-space-xs"><div className="w-8 h-8 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container font-title-lg text-title-lg"><span className="material-symbols-outlined text-[18px]">psychology</span></div><div className="flex flex-col"><span className="font-title-md text-title-md font-semibold text-on-surface tracking-tight">Insights Copilot</span><span className="font-label-caps text-label-caps text-on-surface-variant">v2.4 Enterprise</span></div></div></div><div className="px-space-md"><button className="w-full flex items-center justify-between px-space-sm py-space-xs rounded-xl bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors"><div className="flex items-center gap-space-xs overflow-hidden"><span className="material-symbols-outlined text-[18px] text-tertiary">layers</span><span className="font-body-sm text-body-sm font-medium text-on-surface truncate">Acme Mobile App</span></div><span className="material-symbols-outlined text-[16px] text-on-surface-variant">unfold_more</span></button></div><nav className="flex flex-col gap-space-2xs px-space-sm" data-active-classes="bg-primary-container text-on-primary-container font-semibold rounded-xl"><a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="dashboard" href="#"><span className="material-symbols-outlined text-[20px]">grid_view</span><span className="font-body-md text-body-md">Dashboard</span></a><a aria-current="page" className="flex items-center justify-between px-space-sm py-space-xs transition-colors bg-primary-container text-on-primary-container font-semibold rounded-xl" data-path="reviews-inbox" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px]">inbox</span><span className="font-body-md text-body-md">Reviews Inbox</span></div><span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-mono-metric text-mono-metric">24</span></a><a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="analytics" href="#"><span className="material-symbols-outlined text-[20px]">monitoring</span><span className="font-body-md text-body-md">Analytics</span></a><a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="categories" href="#"><span className="material-symbols-outlined text-[20px]">category</span><span className="font-body-md text-body-md">Categories</span></a><a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="word-cloud" href="#"><span className="material-symbols-outlined text-[20px]">cloud</span><span className="font-body-md text-body-md">Word Cloud</span></a><a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="ideation" href="#"><span className="material-symbols-outlined text-[20px]">lightbulb</span><span className="font-body-md text-body-md">Ideation</span></a><a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="reporting" href="#"><span className="material-symbols-outlined text-[20px]">description</span><span className="font-body-md text-body-md">Reporting</span></a><a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="settings" href="#"><span className="material-symbols-outlined text-[20px]">settings</span><span className="font-body-md text-body-md">Settings</span></a></nav></div><div className="px-space-md pt-space-sm"><div className="p-space-xs rounded-xl bg-surface-container-low flex items-center justify-between"><div className="flex items-center gap-space-xs overflow-hidden"><div className="relative"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div><span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-tertiary-container ring-2 ring-surface-container-low"></span></div><div className="flex flex-col overflow-hidden"><span className="font-body-sm text-body-sm font-medium text-on-surface truncate">Dev Lead</span><span className="font-label-caps text-label-caps text-tertiary truncate">Online</span></div></div><button className="text-on-surface-variant hover:text-on-surface p-space-2xs"><span className="material-symbols-outlined text-[18px]">more_vert</span></button></div></div></aside><div className="pl-sidebar-w"><header className="fixed top-0 left-sidebar-w right-0 h-16 bg-surface-container-lowest/80 backdrop-blur-xl z-40 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 w-full px-space-lg flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-md"><div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant"><span className="material-symbols-outlined text-[16px]">home</span><span>/</span><span className="text-on-surface font-medium">Workspace</span></div><div className="h-4 w-px bg-surface-container-highest"></div><div className="flex items-center gap-space-2xs"><span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span><span className="font-mono-metric text-mono-metric text-on-surface-variant">Synced 4m ago</span></div></div><div className="flex items-center gap-space-sm"><div className="flex items-center bg-surface-container-low p-1 rounded-xl"><button className="px-space-xs py-1 rounded-lg bg-surface-container-high text-on-surface font-body-sm text-body-sm font-medium transition-colors">All Platforms</button><button className="px-space-xs py-1 rounded-lg text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm transition-colors">iOS</button><button className="px-space-xs py-1 rounded-lg text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm transition-colors">Android</button></div><div className="flex items-center bg-surface-container-low px-space-sm py-1.5 rounded-xl gap-space-xs text-on-surface-variant hover:text-on-surface cursor-pointer"><span className="material-symbols-outlined text-[16px]">calendar_today</span><span className="font-body-sm text-body-sm">Last 30 Days</span><span className="material-symbols-outlined text-[16px]">expand_more</span></div><button className="flex items-center gap-space-2xs px-space-sm py-1.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary-container font-body-sm text-body-sm font-semibold transition-all shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><span className="material-symbols-outlined text-[16px]">sync</span><span>Refresh Feeds</span></button><div className="h-4 w-px bg-surface-container-highest"></div><button className="p-space-2xs text-on-surface-variant hover:text-on-surface relative rounded-lg hover:bg-surface-container-high transition-colors"><span className="material-symbols-outlined text-[20px]">notifications</span><span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-tertiary-container"></span></button><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main className="w-full pt-16 bg-surface min-h-screen"><div className="flex flex-col w-full">
<!-- Ensure Sidebar Navigation highlights 'Analytics' -->

<div className="px-space-lg py-space-xl flex flex-col gap-space-xl max-w-[1720px] mx-auto w-full">
<!-- 1. Page Header & Control Bar -->
<div className="flex flex-col gap-space-md">
<!-- Breadcrumb row with telemetry status -->
<div className="flex flex-wrap items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
<span>Workspace</span>
<span className="text-outline-variant">/</span>
<span className="text-on-surface font-medium">Analytics &amp; Trends</span>
</div>
<div className="flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-high shadow-sm">
<span className="relative flex h-2 w-2">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
<span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
</span>
<span className="font-label-caps text-label-caps text-tertiary tracking-wider">TELEMETRY ACTIVE</span>
<span className="text-outline-variant mx-1">•</span>
<span className="font-mono-metric text-mono-metric text-on-surface-variant">Pipeline 99.98% Healthy</span>
</div>
</div>
<!-- Title & Deep Context -->
<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
<div className="flex flex-col gap-space-2xs max-w-4xl">
<h1 className="font-display-sm text-display-sm text-on-surface tracking-tight">Analytics &amp; Trends</h1>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Longitudinal review volume time-series, sentiment drift velocity, platform comparative momentum, and churn probability vectors.
          </p>
</div>
<!-- Controls Toolbar -->
<div className="flex flex-wrap items-center gap-space-xs bg-surface-container-low p-1.5 rounded-xl shadow-sm">
<!-- Granularity Segmented Pill -->
<div className="flex items-center bg-surface-container-lowest p-1 rounded-lg">
<button className="px-space-xs py-1 rounded font-label-caps text-label-caps text-on-surface-variant hover:text-on-surface transition-colors">DAILY</button>
<button className="px-space-xs py-1 rounded bg-primary-container text-on-primary-container font-label-caps text-label-caps transition-all">WEEKLY</button>
<button className="px-space-xs py-1 rounded font-label-caps text-label-caps text-on-surface-variant hover:text-on-surface transition-colors">MONTHLY</button>
<button className="px-space-xs py-1 rounded font-label-caps text-label-caps text-on-surface-variant hover:text-on-surface transition-colors">QUARTERLY</button>
</div>
<!-- Range Picker -->
<div className="flex items-center gap-space-2xs px-space-sm py-1.5 rounded-lg bg-surface-container-high text-on-surface cursor-pointer hover:bg-surface-bright transition-colors">
<span className="material-symbols-outlined text-[16px] text-tertiary">date_range</span>
<span className="font-body-sm text-body-sm font-medium">Last 90 Days</span>
<span className="material-symbols-outlined text-[16px] text-on-surface-variant">expand_more</span>
</div>
<!-- Platform Pill -->
<div className="flex items-center gap-space-2xs px-space-sm py-1.5 rounded-lg bg-surface-container-high text-on-surface cursor-pointer hover:bg-surface-bright transition-colors">
<span className="material-symbols-outlined text-[16px] text-secondary">devices</span>
<span className="font-body-sm text-body-sm font-medium">All Platforms (iOS + Android)</span>
<span className="material-symbols-outlined text-[16px] text-on-surface-variant">expand_more</span>
</div>
<!-- Visual Export Button -->
<button className="flex items-center gap-space-2xs px-space-sm py-1.5 rounded-lg bg-surface-container-highest text-on-surface hover:bg-surface-bright transition-all shadow-sm">
<span className="material-symbols-outlined text-[16px]">file_download</span>
<span className="font-body-sm text-body-sm font-medium">Export Report</span>
</button>
</div>
</div>
</div>
<!-- 2. Top KPI Metric Summary Bar -->
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">
<!-- Card 1: Review Velocity -->
<div className="bg-surface-container-low rounded-xl p-space-md shadow-md flex flex-col justify-between relative overflow-hidden group hover:bg-surface-container transition-colors">
<div className="flex items-start justify-between">
<div className="flex flex-col gap-space-2xs">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Review Ingestion Velocity</span>
<div className="flex items-baseline gap-space-xs">
<span className="font-display-sm text-display-sm text-on-surface font-bold tracking-tight">842</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">/day</span>
</div>
</div>
<div className="w-9 h-9 rounded-lg bg-primary-container/20 flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">speed</span>
</div>
</div>
<div className="mt-space-md flex items-center justify-between pt-space-xs">
<div className="flex items-center gap-1 font-mono-metric text-mono-metric text-tertiary">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
<span>+18.4%</span>
<span className="text-on-surface-variant ml-1 font-body-sm text-body-sm">vs prev 90d</span>
</div>
<!-- Upward Sparkline -->
<svg className="w-24 h-7 overflow-visible" fill="none" viewBox="0 0 100 28">
<path className="text-tertiary" d="M0 22 Q 15 24, 25 18 T 50 14 T 75 8 T 100 2" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
<path className="text-tertiary/10" d="M0 22 Q 15 24, 25 18 T 50 14 T 75 8 T 100 2 L 100 28 L 0 28 Z" fill="currentColor" />
<circle className="text-tertiary" cx="100" cy="2" fill="currentColor" r="3" />
</svg>
</div>
</div>
<!-- Card 2: Sentiment Drift Score -->
<div className="bg-surface-container-low rounded-xl p-space-md shadow-md flex flex-col justify-between relative overflow-hidden group hover:bg-surface-container transition-colors">
<div className="flex items-start justify-between">
<div className="flex flex-col gap-space-2xs">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Sentiment Drift Velocity</span>
<div className="flex items-baseline gap-space-xs">
<span className="font-display-sm text-display-sm text-on-surface font-bold tracking-tight">+0.38</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">pt</span>
</div>
</div>
<div className="w-9 h-9 rounded-lg bg-tertiary-container/20 flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined text-[20px]">insights</span>
</div>
</div>
<div className="mt-space-md flex items-center justify-between pt-space-xs">
<div className="flex items-center gap-1 font-mono-metric text-mono-metric text-tertiary">
<span className="px-space-xs py-0.5 rounded bg-tertiary-container/30 text-tertiary-fixed font-semibold">4.38 → 4.42</span>
</div>
<!-- Multi-step Trend Line -->
<svg className="w-24 h-7 overflow-visible" fill="none" viewBox="0 0 100 28">
<path className="text-tertiary" d="M0 20 L 20 18 L 40 22 L 60 12 L 80 14 L 100 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
<circle className="text-tertiary" cx="100" cy="4" fill="currentColor" r="3" />
</svg>
</div>
</div>
<!-- Card 3: Detractor Churn Exposure -->
<div className="bg-surface-container-low rounded-xl p-space-md shadow-md flex flex-col justify-between relative overflow-hidden group hover:bg-surface-container transition-colors">
<div className="flex items-start justify-between">
<div className="flex flex-col gap-space-2xs">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Detractor Churn Exposure</span>
<div className="flex items-baseline gap-space-xs">
<span className="font-display-sm text-display-sm text-on-surface font-bold tracking-tight">3.2%</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">risk volume</span>
</div>
</div>
<div className="w-9 h-9 rounded-lg bg-secondary-container/30 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[20px]">shield_with_heart</span>
</div>
</div>
<div className="mt-space-md flex items-center justify-between pt-space-xs">
<div className="flex items-center gap-1 font-mono-metric text-mono-metric text-secondary">
<span className="material-symbols-outlined text-[16px]">trending_down</span>
<span>-0.8%</span>
<span className="text-on-surface-variant ml-1 font-body-sm text-body-sm">drop in churn threat</span>
</div>
<!-- Risk sparkline -->
<svg className="w-24 h-7 overflow-visible" fill="none" viewBox="0 0 100 28">
<path className="text-secondary" d="M0 6 L 25 10 L 50 14 L 75 12 L 100 24" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
<circle className="text-secondary" cx="100" cy="24" fill="currentColor" r="3" />
</svg>
</div>
</div>
<!-- Card 4: SLA Velocity -->
<div className="bg-surface-container-low rounded-xl p-space-md shadow-md flex flex-col justify-between relative overflow-hidden group hover:bg-surface-container transition-colors">
<div className="flex items-start justify-between">
<div className="flex flex-col gap-space-2xs">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Resolution / SLA Velocity</span>
<div className="flex items-baseline gap-space-xs">
<span className="font-display-sm text-display-sm text-on-surface font-bold tracking-tight">3.4</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">hrs avg</span>
</div>
</div>
<div className="w-9 h-9 rounded-lg bg-primary-container/20 flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">timer</span>
</div>
</div>
<div className="mt-space-md flex items-center justify-between pt-space-xs">
<div className="flex items-center gap-1 font-mono-metric text-mono-metric text-primary">
<span className="material-symbols-outlined text-[16px]">check_circle</span>
<span>Target 4.0h</span>
<span className="text-on-surface-variant ml-1 font-body-sm text-body-sm">(Top Quartile)</span>
</div>
<!-- Gauge mini bar -->
<div className="w-20 bg-surface-container-highest h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{"width": "85%"}}></div>
</div>
</div>
</div>
</div>
<!-- 3. Primary Deep Visualizations -->
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
<!-- Chart 1: Review Volume & Platform Momentum -->
<div className="lg:col-span-7 bg-surface-container-low rounded-xl p-space-md shadow-lg flex flex-col justify-between gap-space-md">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
<div className="flex flex-col">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-[20px]">stacked_bar_chart</span>
<h2 className="font-title-lg text-title-lg text-on-surface">Review Volume &amp; Platform Momentum</h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Weekly cross-store ingestion comparison across 12-week release cycles</p>
</div>
<!-- Legends -->
<div className="flex items-center gap-space-sm">
<div className="flex items-center gap-1.5">
<span className="w-3 h-3 rounded-full bg-primary"></span>
<span className="font-body-sm text-body-sm text-on-surface">iOS App Store</span>
</div>
<div className="flex items-center gap-1.5">
<span className="w-3 h-3 rounded-full bg-secondary"></span>
<span className="font-body-sm text-body-sm text-on-surface">Google Play</span>
</div>
</div>
</div>
<!-- High Fidelity SVG Stacked Area Multi-line Graph -->
<div className="relative w-full h-72 bg-surface-container-lowest/70 rounded-xl p-space-sm flex flex-col justify-between overflow-hidden">
<!-- Background Grid Lines -->
<div className="absolute inset-0 px-space-md py-space-sm flex flex-col justify-between pointer-events-none opacity-20">
<div className="w-full h-px bg-surface-bright"></div>
<div className="w-full h-px bg-surface-bright"></div>
<div className="w-full h-px bg-surface-bright"></div>
<div className="w-full h-px bg-surface-bright"></div>
<div className="w-full h-px bg-surface-bright"></div>
</div>
<!-- Y Axis Labels -->
<div className="absolute left-2 top-2 bottom-6 flex flex-col justify-between font-mono-metric text-[10px] text-on-surface-variant pointer-events-none">
<span>3,500</span>
<span>2,625</span>
<span>1,750</span>
<span>875</span>
<span>0</span>
</div>
<!-- Chart Area -->
<div className="relative w-full h-full pl-8 pb-5 pt-2">
<svg className="w-full h-full" preserveaspectratio="none" viewBox="0 0 700 220">
<defs>
<!-- iOS Gradient Fill -->
<lineargradient id="iosGrad" x1="0" x2="0" y1="0" y2="1" />
<stop offset="0%" stop-color="#c0c1ff" stop-opacity="0.35"></stop>
<stop offset="100%" stop-color="#c0c1ff" stop-opacity="0.0"></stop>
</lineargradient>
<!-- Android Gradient Fill -->
<lineargradient id="androidGrad" x1="0" x2="0" y1="0" y2="1" />
<stop offset="0%" stop-color="#ddb7ff" stop-opacity="0.25"></stop>
<stop offset="100%" stop-color="#ddb7ff" stop-opacity="0.0"></stop>
</lineargradient>
</defs>
<!-- Android Area (lower stack) -->
<path d="M 10 180 Q 70 170, 130 165 T 250 155 T 370 140 T 490 125 T 610 120 T 690 110 L 690 210 L 10 210 Z" fill="url(#androidGrad)" />
<path d="M 10 180 Q 70 170, 130 165 T 250 155 T 370 140 T 490 125 T 610 120 T 690 110" fill="none" stroke="#ddb7ff" strokeWidth="2" />
<!-- iOS Area (high volume) -->
<path d="M 10 130 Q 70 115, 130 100 T 250 90 T 370 70 T 450 30 T 530 65 T 610 50 T 690 40 L 690 210 L 10 210 Z" fill="url(#iosGrad)" />
<path d="M 10 130 Q 70 115, 130 100 T 250 90 T 370 70 T 450 30 T 530 65 T 610 50 T 690 40" fill="none" stroke="#c0c1ff" strokeWidth="2.5" />
<!-- Milestone Marker W8 Spike -->
<line stroke="#4cd7f6" strokeDasharray="4 3" strokeWidth="1.5" x1="450" x2="450" y1="30" y2="210" />
<circle cx="450" cy="30" fill="#4cd7f6" r="5" stroke="#12131a" strokeWidth="2" />
</svg>
<!-- Interactive Marker Tooltip Callout -->
<div className="absolute left-[62%] top-3 -translate-x-1/2 bg-surface-container-high px-space-xs py-1 rounded shadow-lg flex items-center gap-space-2xs pointer-events-none">
<span className="w-2 h-2 rounded-full bg-tertiary"></span>
<span className="font-label-caps text-[10px] text-on-surface font-semibold">W8: v2.4.0 Release Spike (+2,840)</span>
</div>
</div>
<!-- X Axis Weeks -->
<div className="flex justify-between pl-8 pr-2 font-mono-metric text-[10px] text-on-surface-variant">
<span>W1</span><span>W2</span><span>W3</span><span>W4</span><span>W5</span><span>W6</span><span>W7</span><span className="text-tertiary font-bold">W8</span><span>W9</span><span>W10</span><span>W11</span><span>W12</span>
</div>
</div>
<!-- Breakdown Summary Strip -->
<div className="grid grid-cols-2 gap-space-sm pt-space-xs">
<div className="p-space-xs rounded-xl bg-surface-container-lowest flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<div className="w-3 h-3 rounded-full bg-primary"></div>
<div className="flex flex-col">
<span className="font-label-caps text-label-caps text-on-surface-variant">APPLE APP STORE TOTAL</span>
<span className="font-title-md text-title-md font-bold text-on-surface">18,420 <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">(74.7%)</span></span>
</div>
</div>
<span className="font-mono-metric text-mono-metric text-tertiary">+22.4% MoM</span>
</div>
<div className="p-space-xs rounded-xl bg-surface-container-lowest flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<div className="w-3 h-3 rounded-full bg-secondary"></div>
<div className="flex flex-col">
<span className="font-label-caps text-label-caps text-on-surface-variant">GOOGLE PLAY TOTAL</span>
<span className="font-title-md text-title-md font-bold text-on-surface">6,228 <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">(25.3%)</span></span>
</div>
</div>
<span className="font-mono-metric text-mono-metric text-tertiary">+8.1% MoM</span>
</div>
</div>
</div>
<!-- Chart 2: Sentiment Drift & Moving Average -->
<div className="lg:col-span-5 bg-surface-container-low rounded-xl p-space-md shadow-lg flex flex-col justify-between gap-space-md">
<div className="flex flex-col gap-space-2xs">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-tertiary text-[20px]">auto_graph</span>
<h2 className="font-title-lg text-title-lg text-on-surface">Sentiment Drift vs Releases</h2>
</div>
<span className="font-mono-metric text-mono-metric px-space-xs py-0.5 rounded bg-surface-container-high text-tertiary">EMA 14-Day</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Dual-axis smoothed rating score trajectory with version milestones</p>
</div>
<!-- Sentiment Milestone Graph -->
<div className="relative w-full h-72 bg-surface-container-lowest/70 rounded-xl p-space-sm flex flex-col justify-between overflow-hidden">
<!-- Background bars representing sentiment volume distribution -->
<div className="absolute inset-0 pl-10 pr-4 pt-4 pb-8 flex items-end justify-between gap-2 pointer-events-none opacity-25">
<div className="w-full bg-tertiary-container rounded-t h-[40%]"></div>
<div className="w-full bg-tertiary-container rounded-t h-[52%]"></div>
<div className="w-full bg-tertiary-container rounded-t h-[48%]"></div>
<div className="w-full bg-secondary rounded-t h-[68%]"></div>
<div className="w-full bg-secondary rounded-t h-[60%]"></div>
<div className="w-full bg-tertiary rounded-t h-[78%]"></div>
<div className="w-full bg-tertiary rounded-t h-[86%]"></div>
<div className="w-full bg-primary rounded-t h-[94%]"></div>
</div>
<!-- Y Axis -->
<div className="absolute left-2 top-2 bottom-6 flex flex-col justify-between font-mono-metric text-[10px] text-on-surface-variant pointer-events-none">
<span>5.0★</span>
<span>4.5★</span>
<span>4.0★</span>
<span>3.5★</span>
<span>3.0★</span>
</div>
<!-- Continuous Line SVG -->
<div className="relative w-full h-full pl-8 pb-5 pt-2">
<svg className="w-full h-full" preserveaspectratio="none" viewBox="0 0 500 220">
<!-- Smoothed rating trajectory -->
<path d="M 10 160 C 80 140, 120 170, 180 120 C 240 70, 280 110, 360 60 C 420 30, 460 35, 490 20" fill="none" stroke="#4cd7f6" strokeLinecap="round" strokeWidth="3" />
<!-- Milestone points -->
<circle cx="80" cy="145" fill="#12131a" r="4" stroke="#c0c1ff" strokeWidth="2" />
<circle cx="210" cy="100" fill="#12131a" r="4" stroke="#c0c1ff" strokeWidth="2" />
<circle cx="340" cy="70" fill="#12131a" r="4" stroke="#c0c1ff" strokeWidth="2" />
<circle cx="470" cy="24" fill="#4cd7f6" r="5" stroke="#ffffff" strokeWidth="2" />
</svg>
<!-- Release Version Anchors -->
<div className="absolute left-[14%] top-40 bg-surface-container-high px-1.5 py-0.5 rounded font-label-caps text-[9px] text-on-surface-variant">v2.2.0</div>
<div className="absolute left-[40%] top-28 bg-surface-container-high px-1.5 py-0.5 rounded font-label-caps text-[9px] text-on-surface-variant">v2.3.0</div>
<div className="absolute left-[65%] top-20 bg-surface-container-high px-1.5 py-0.5 rounded font-label-caps text-[9px] text-on-surface-variant">v2.3.5</div>
<div className="absolute right-2 top-2 bg-primary-container px-2 py-0.5 rounded font-label-caps text-[10px] text-on-primary-container font-bold">v2.4.0 (4.42★)</div>
</div>
<div className="flex justify-between pl-8 pr-2 font-mono-metric text-[10px] text-on-surface-variant">
<span>May</span><span>Jun</span><span>Jul</span><span>Aug (Current)</span>
</div>
</div>
<!-- Release Impact Summary -->
<div className="p-space-xs rounded-xl bg-surface-container-lowest flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-tertiary text-[18px]">verified</span>
<span className="font-body-sm text-body-sm text-on-surface">Release v2.4.0 generated the highest delta:</span>
</div>
<span className="font-mono-metric text-mono-metric text-tertiary font-bold">+0.42★ average boost</span>
</div>
</div>
</div>
<!-- 4. Deep Analytical Breakdown Grid (3 columns) -->
<div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md">
<!-- Card 1: Rating Breakdown Velocity -->
<div className="bg-surface-container-low rounded-xl p-space-md shadow-md flex flex-col justify-between gap-space-md">
<div className="flex flex-col gap-space-2xs">
<div className="flex items-center justify-between">
<h3 className="font-title-md text-title-md text-on-surface font-semibold">Rating Velocity Matrix</h3>
<span className="font-label-caps text-label-caps text-on-surface-variant">30D WINDOW DELTA</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Shift in star ratings relative to the previous 30-day baseline</p>
</div>
<!-- Velocity Bars -->
<div className="flex flex-col gap-space-sm">
<!-- 5 Stars -->
<div className="flex flex-col gap-1">
<div className="flex items-center justify-between font-body-sm text-body-sm">
<div className="flex items-center gap-1.5">
<span className="font-mono-metric text-mono-metric text-on-surface font-semibold">5 Stars</span>
<span className="text-on-surface-variant">(16,420)</span>
</div>
<span className="font-mono-metric text-mono-metric text-tertiary font-medium">+14.2%</span>
</div>
<div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden flex">
<div className="bg-tertiary h-full rounded-full" style={{"width": "68%"}}></div>
</div>
</div>
<!-- 4 Stars -->
<div className="flex flex-col gap-1">
<div className="flex items-center justify-between font-body-sm text-body-sm">
<div className="flex items-center gap-1.5">
<span className="font-mono-metric text-mono-metric text-on-surface font-semibold">4 Stars</span>
<span className="text-on-surface-variant">(4,190)</span>
</div>
<span className="font-mono-metric text-mono-metric text-tertiary font-medium">+4.8%</span>
</div>
<div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden flex">
<div className="bg-primary h-full rounded-full" style={{"width": "17%"}}></div>
</div>
</div>
<!-- 3 Stars -->
<div className="flex flex-col gap-1">
<div className="flex items-center justify-between font-body-sm text-body-sm">
<div className="flex items-center gap-1.5">
<span className="font-mono-metric text-mono-metric text-on-surface font-semibold">3 Stars</span>
<span className="text-on-surface-variant">(1,950)</span>
</div>
<span className="font-mono-metric text-mono-metric text-on-surface-variant">-1.2%</span>
</div>
<div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden flex">
<div className="bg-outline h-full rounded-full" style={{"width": "8%"}}></div>
</div>
</div>
<!-- 2 Stars -->
<div className="flex flex-col gap-1">
<div className="flex items-center justify-between font-body-sm text-body-sm">
<div className="flex items-center gap-1.5">
<span className="font-mono-metric text-mono-metric text-on-surface font-semibold">2 Stars</span>
<span className="text-on-surface-variant">(860)</span>
</div>
<span className="font-mono-metric text-mono-metric text-secondary font-medium">-3.4%</span>
</div>
<div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden flex">
<div className="bg-secondary h-full rounded-full" style={{"width": "4%"}}></div>
</div>
</div>
<!-- 1 Star -->
<div className="flex flex-col gap-1">
<div className="flex items-center justify-between font-body-sm text-body-sm">
<div className="flex items-center gap-1.5">
<span className="font-mono-metric text-mono-metric text-on-surface font-semibold">1 Star</span>
<span className="text-on-surface-variant">(1,228)</span>
</div>
<span className="font-mono-metric text-mono-metric text-secondary font-medium">-8.5% drop</span>
</div>
<div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden flex">
<div className="bg-error h-full rounded-full" style={{"width": "5%"}}></div>
</div>
</div>
</div>
<div className="p-space-xs rounded-lg bg-surface-container-lowest flex items-center justify-between font-body-sm text-body-sm">
<span className="text-on-surface-variant">Net Promoter Index</span>
<span className="font-mono-metric text-mono-metric text-tertiary font-bold">+62 NPS (↑ 7 pts)</span>
</div>
</div>
<!-- Card 2: Churn Risk & Negative Drivers -->
<div className="bg-surface-container-low rounded-xl p-space-md shadow-md flex flex-col justify-between gap-space-md">
<div className="flex flex-col gap-space-2xs">
<div className="flex items-center justify-between">
<h3 className="font-title-md text-title-md text-on-surface font-semibold">Negative Sentiment Drivers</h3>
<span className="font-label-caps text-label-caps text-error">CHURN VECTORS</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">AI-isolated clusters with estimated cancellation impact</p>
</div>
<!-- Issue Triggers List -->
<div className="flex flex-col gap-space-xs">
<!-- Item 1 -->
<div className="p-space-xs rounded-xl bg-surface-container-lowest flex flex-col gap-1">
<div className="flex items-center justify-between">
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-error"></span>
<span className="font-body-md text-body-md font-semibold text-on-surface">Billing &amp; Renewal Friction</span>
</div>
<span className="px-space-2xs py-0.5 rounded bg-error-container text-on-error-container font-label-caps text-[9px] uppercase">Under Investigation</span>
</div>
<div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant mt-0.5">
<span>218 mentions • Annual subscription flow</span>
<span className="font-mono-metric text-mono-metric text-error font-semibold">42% Churn Risk</span>
</div>
</div>
<!-- Item 2 -->
<div className="p-space-xs rounded-xl bg-surface-container-lowest flex flex-col gap-1">
<div className="flex items-center justify-between">
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-body-md text-body-md font-semibold text-on-surface">Camera Crash on Launch (v2.4.0)</span>
</div>
<span className="px-space-2xs py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-caps text-[9px] uppercase">Patch Deployed</span>
</div>
<div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant mt-0.5">
<span>342 mentions • iOS 17.4+ hardware access</span>
<span className="font-mono-metric text-mono-metric text-secondary font-semibold">38% Churn Risk</span>
</div>
</div>
<!-- Item 3 -->
<div className="p-space-xs rounded-xl bg-surface-container-lowest flex flex-col gap-1">
<div className="flex items-center justify-between">
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-outline"></span>
<span className="font-body-md text-body-md font-semibold text-on-surface">Navigation Reachability</span>
</div>
<span className="px-space-2xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-caps text-[9px] uppercase">Backlog</span>
</div>
<div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant mt-0.5">
<span>95 mentions • Reachability on foldables</span>
<span className="font-mono-metric text-mono-metric text-on-surface-variant font-semibold">12% Churn Risk</span>
</div>
</div>
</div>
<button className="w-full py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-body-sm text-body-sm font-medium transition-colors flex items-center justify-center gap-space-2xs">
<span>Inspect All 14 Driver Clusters</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
</div>
<!-- Card 3: Sentiment by Geographic Market -->
<div className="bg-surface-container-low rounded-xl p-space-md shadow-md flex flex-col justify-between gap-space-md">
<div className="flex flex-col gap-space-2xs">
<div className="flex items-center justify-between">
<h3 className="font-title-md text-title-md text-on-surface font-semibold">Market &amp; Locale Breakdown</h3>
<span className="font-label-caps text-label-caps text-on-surface-variant">TOP 5 TERRITORIES</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Cross-border satisfaction ratings and regional sample size</p>
</div>
<!-- Regional Table -->
<div className="flex flex-col gap-space-2xs">
<div className="flex items-center justify-between py-1.5 px-space-xs rounded-lg bg-surface-container-lowest">
<div className="flex items-center gap-space-xs">
<span className="font-mono-metric text-mono-metric text-primary font-bold">US</span>
<div className="flex flex-col">
<span className="font-body-sm text-body-sm font-semibold text-on-surface">United States</span>
<span className="font-label-caps text-[10px] text-on-surface-variant">12.4k reviews</span>
</div>
</div>
<div className="flex items-center gap-space-sm">
<span className="font-mono-metric text-mono-metric text-tertiary font-bold">4.6★</span>
<span className="font-mono-metric text-[11px] text-tertiary bg-tertiary-container/20 px-1 rounded">+8% NPS</span>
</div>
</div>
<div className="flex items-center justify-between py-1.5 px-space-xs rounded-lg bg-surface-container-lowest">
<div className="flex items-center gap-space-xs">
<span className="font-mono-metric text-mono-metric text-primary font-bold">UK</span>
<div className="flex flex-col">
<span className="font-body-sm text-body-sm font-semibold text-on-surface">United Kingdom</span>
<span className="font-label-caps text-[10px] text-on-surface-variant">4.1k reviews</span>
</div>
</div>
<div className="flex items-center gap-space-sm">
<span className="font-mono-metric text-mono-metric text-on-surface font-bold">4.3★</span>
<span className="font-mono-metric text-[11px] text-on-surface-variant bg-surface-container-high px-1 rounded">+2% NPS</span>
</div>
</div>
<div className="flex items-center justify-between py-1.5 px-space-xs rounded-lg bg-surface-container-lowest">
<div className="flex items-center gap-space-xs">
<span className="font-mono-metric text-mono-metric text-primary font-bold">DE</span>
<div className="flex flex-col">
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Germany</span>
<span className="font-label-caps text-[10px] text-on-surface-variant">2.8k reviews</span>
</div>
</div>
<div className="flex items-center gap-space-sm">
<span className="font-mono-metric text-mono-metric text-on-surface font-bold">4.2★</span>
<span className="font-mono-metric text-[11px] text-on-surface-variant bg-surface-container-high px-1 rounded">+4% NPS</span>
</div>
</div>
<div className="flex items-center justify-between py-1.5 px-space-xs rounded-lg bg-surface-container-lowest">
<div className="flex items-center gap-space-xs">
<span className="font-mono-metric text-mono-metric text-primary font-bold">JP</span>
<div className="flex flex-col">
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Japan</span>
<span className="font-label-caps text-[10px] text-on-surface-variant">1.9k reviews</span>
</div>
</div>
<div className="flex items-center gap-space-sm">
<span className="font-mono-metric text-mono-metric text-tertiary font-bold">4.5★</span>
<span className="font-mono-metric text-[11px] text-tertiary bg-tertiary-container/20 px-1 rounded">+6% NPS</span>
</div>
</div>
<div className="flex items-center justify-between py-1.5 px-space-xs rounded-lg bg-surface-container-lowest">
<div className="flex items-center gap-space-xs">
<span className="font-mono-metric text-mono-metric text-primary font-bold">CA</span>
<div className="flex flex-col">
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Canada</span>
<span className="font-label-caps text-[10px] text-on-surface-variant">1.6k reviews</span>
</div>
</div>
<div className="flex items-center gap-space-sm">
<span className="font-mono-metric text-mono-metric text-on-surface font-bold">4.1★</span>
<span className="font-mono-metric text-[11px] text-on-surface-variant bg-surface-container-high px-1 rounded">0% NPS</span>
</div>
</div>
</div>
<div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm pt-1">
<span>Localization Health: 94.2%</span>
<span className="text-tertiary font-medium">18 Locales Indexed</span>
</div>
</div>
</div>
<!-- 5. Cohort Analysis & Retention Correlation Section -->
<div className="bg-surface-container-low rounded-xl p-space-md shadow-lg flex flex-col gap-space-md">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
<div className="flex flex-col gap-space-2xs">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-[20px]">groups</span>
<h2 className="font-title-lg text-title-lg text-on-surface">Version Cohort Sentiment Trajectory</h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">User satisfaction retention over Day 1, Day 7, Day 14, and Day 30 windows post-update</p>
</div>
<div className="flex items-center gap-space-xs font-label-caps text-label-caps text-on-surface-variant">
<span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-tertiary"></span> &gt; 4.3★ Optimal</span>
<span className="flex items-center gap-1 ml-2"><span className="w-2 h-2 rounded-full bg-error"></span> &lt; 3.8★ Critical</span>
</div>
</div>
<!-- Cohort Heatmap Table -->
<div className="overflow-x-auto">
<table className="w-full text-left font-body-sm text-body-sm">
<thead>
<tr className="bg-surface-container-lowest text-on-surface-variant font-label-caps text-label-caps">
<th className="py-space-xs px-space-sm rounded-l-lg">RELEASE COHORT</th>
<th className="py-space-xs px-space-sm">ROLLOUT DATE</th>
<th className="py-space-xs px-space-sm">USERS INDEXED</th>
<th className="py-space-xs px-space-sm text-center">DAY 1 SENTIMENT</th>
<th className="py-space-xs px-space-sm text-center">DAY 7 RETENTION</th>
<th className="py-space-xs px-space-sm text-center">DAY 14 RETENTION</th>
<th className="py-space-xs px-space-sm text-center rounded-r-lg">DAY 30 STABILIZED</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-container-high">
<!-- Row 1: v2.4.0 -->
<tr className="hover:bg-surface-container transition-colors">
<td className="py-space-sm px-space-sm font-semibold text-on-surface flex items-center gap-space-xs">
<span className="w-2 h-2 rounded-full bg-tertiary"></span>
<span>v2.4.0 (Latest Release)</span>
</td>
<td className="py-space-sm px-space-sm font-mono-metric text-mono-metric text-on-surface-variant">Aug 14, 2024</td>
<td className="py-space-sm px-space-sm font-mono-metric text-mono-metric text-on-surface">148,200</td>
<td className="py-space-sm px-space-sm text-center">
<span className="inline-block px-space-sm py-1 rounded-lg bg-tertiary-container/30 text-tertiary font-mono-metric text-mono-metric font-bold">4.48★</span>
</td>
<td className="py-space-sm px-space-sm text-center">
<span className="inline-block px-space-sm py-1 rounded-lg bg-tertiary-container/30 text-tertiary font-mono-metric text-mono-metric font-bold">4.44★</span>
</td>
<td className="py-space-sm px-space-sm text-center">
<span className="inline-block px-space-sm py-1 rounded-lg bg-tertiary-container/30 text-tertiary font-mono-metric text-mono-metric font-bold">4.42★</span>
</td>
<td className="py-space-sm px-space-sm text-center">
<span className="inline-block px-space-sm py-1 rounded-lg bg-surface-container text-on-surface-variant font-mono-metric text-mono-metric">Tracking...</span>
</td>
</tr>
<!-- Row 2: v2.3.5 -->
<tr className="hover:bg-surface-container transition-colors">
<td className="py-space-sm px-space-sm font-semibold text-on-surface flex items-center gap-space-xs">
<span className="w-2 h-2 rounded-full bg-primary"></span>
<span>v2.3.5 (Maintenance)</span>
</td>
<td className="py-space-sm px-space-sm font-mono-metric text-mono-metric text-on-surface-variant">Jul 28, 2024</td>
<td className="py-space-sm px-space-sm font-mono-metric text-mono-metric text-on-surface">92,400</td>
<td className="py-space-sm px-space-sm text-center">
<span className="inline-block px-space-sm py-1 rounded-lg bg-surface-container-high text-on-surface font-mono-metric text-mono-metric font-medium">4.12★</span>
</td>
<td className="py-space-sm px-space-sm text-center">
<span className="inline-block px-space-sm py-1 rounded-lg bg-surface-container-high text-on-surface font-mono-metric text-mono-metric font-medium">4.18★</span>
</td>
<td className="py-space-sm px-space-sm text-center">
<span className="inline-block px-space-sm py-1 rounded-lg bg-tertiary-container/30 text-tertiary font-mono-metric text-mono-metric font-bold">4.26★</span>
</td>
<td className="py-space-sm px-space-sm text-center">
<span className="inline-block px-space-sm py-1 rounded-lg bg-tertiary-container/30 text-tertiary font-mono-metric text-mono-metric font-bold">4.31★</span>
</td>
</tr>
<!-- Row 3: v2.3.0 -->
<tr className="hover:bg-surface-container transition-colors">
<td className="py-space-sm px-space-sm font-semibold text-on-surface flex items-center gap-space-xs">
<span className="w-2 h-2 rounded-full bg-error"></span>
<span>v2.3.0 (Major Redesign)</span>
</td>
<td className="py-space-sm px-space-sm font-mono-metric text-mono-metric text-on-surface-variant">Jun 19, 2024</td>
<td className="py-space-sm px-space-sm font-mono-metric text-mono-metric text-on-surface">210,500</td>
<td className="py-space-sm px-space-sm text-center">
<span className="inline-block px-space-sm py-1 rounded-lg bg-error-container/40 text-error font-mono-metric text-mono-metric font-bold">3.72★</span>
</td>
<td className="py-space-sm px-space-sm text-center">
<span className="inline-block px-space-sm py-1 rounded-lg bg-error-container/30 text-error font-mono-metric text-mono-metric font-medium">3.88★</span>
</td>
<td className="py-space-sm px-space-sm text-center">
<span className="inline-block px-space-sm py-1 rounded-lg bg-surface-container-high text-on-surface font-mono-metric text-mono-metric font-medium">4.02★</span>
</td>
<td className="py-space-sm px-space-sm text-center">
<span className="inline-block px-space-sm py-1 rounded-lg bg-surface-container-high text-on-surface font-mono-metric text-mono-metric font-medium">4.15★</span>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Actionable AI Insights Summary Box -->
<div className="mt-space-xs bg-surface-container-lowest rounded-xl p-space-md shadow-inner flex flex-col gap-space-md">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
<div className="flex items-center gap-space-xs">
<div className="w-7 h-7 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container">
<span className="material-symbols-outlined text-[16px]">psychology</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md font-bold text-on-surface">AI Copilot Trend Synthesis</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Automated longitudinal intelligence summary generated 8 minutes ago</span>
</div>
</div>
<span className="font-label-caps text-label-caps px-space-xs py-1 rounded bg-surface-container-high text-primary font-semibold">HIGH CONFIDENCE (98.4%)</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
<!-- Finding 1 -->
<div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
<div className="flex items-center gap-space-xs text-tertiary">
<span className="material-symbols-outlined text-[18px]">check_circle</span>
<span className="font-label-caps text-label-caps font-bold">CAMERA PIPELINE STABILITY</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              v2.4.0 patch released 14 days ago stabilized the AVFoundation pipeline; 1-star crash mentions dropped <span className="text-tertiary font-semibold">72% week-over-week</span> across iPhone 15 devices.
            </p>
</div>
<!-- Finding 2 -->
<div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
<div className="flex items-center gap-space-xs text-secondary">
<span className="material-symbols-outlined text-[18px]">warning</span>
<span className="font-label-caps text-label-caps font-bold">ANNUAL RENEWAL CHURN</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Billing friction remains the top detractor across annual renewal cohorts; recommend adding <span className="text-secondary font-semibold">in-app invoice receipts</span> and transparent 7-day cancellation warnings.
            </p>
</div>
<!-- Finding 3 -->
<div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
<div className="flex items-center gap-space-xs text-primary">
<span className="material-symbols-outlined text-[18px]">storefront</span>
<span className="font-label-caps text-label-caps font-bold">PLAY STORE ORGANIC LIFT</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Android store organic conversion correlates with a 4.2+ threshold; current <span className="text-primary font-semibold">4.31 rating</span> provides strong organic algorithmic visibility and +11% download boost.
            </p>
</div>
</div>
<!-- Action triggers row -->
<div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
<div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px] text-tertiary">bolt</span>
<span>Recommended triage cadence: Next audit scheduled in 48 hours</span>
</div>
<div className="flex items-center gap-space-xs">
<button className="flex items-center gap-space-2xs px-space-sm py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-body-sm text-body-sm font-medium transition-colors">
<span className="material-symbols-outlined text-[16px]">schedule_send</span>
<span>Schedule Automated PDF Digest</span>
</button>
<button className="flex items-center gap-space-2xs px-space-sm py-1.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary-container font-body-sm text-body-sm font-semibold transition-all shadow-md">
<span className="material-symbols-outlined text-[16px]">share</span>
<span>Share Insights to Slack #product-team</span>
</button>
</div>
</div>
</div>
</div>
</div>
</div></main></div>
    </>
  );
}
