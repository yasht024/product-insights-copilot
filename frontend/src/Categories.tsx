import React from 'react';

export default function Categories() {
  return (
    <>
      <aside className="fixed left-0 top-0 h-full w-sidebar-w bg-surface-container-lowest/90 backdrop-blur-xl z-50 flex flex-col justify-between py-space-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="flex flex-col gap-space-md"><div className="px-space-md flex items-center justify-between"><div className="flex items-center gap-space-xs"><div className="w-8 h-8 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container font-title-lg text-title-lg"><span className="material-symbols-outlined text-[18px]">psychology</span></div><div className="flex flex-col"><span className="font-title-md text-title-md font-semibold text-on-surface tracking-tight">Insights Copilot</span><span className="font-label-caps text-label-caps text-on-surface-variant">v2.4 Enterprise</span></div></div></div><div className="px-space-md"><button className="w-full flex items-center justify-between px-space-sm py-space-xs rounded-xl bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors"><div className="flex items-center gap-space-xs overflow-hidden"><span className="material-symbols-outlined text-[18px] text-tertiary">layers</span><span className="font-body-sm text-body-sm font-medium text-on-surface truncate">Acme Mobile App</span></div><span className="material-symbols-outlined text-[16px] text-on-surface-variant">unfold_more</span></button></div><nav className="flex flex-col gap-space-2xs px-space-sm" data-active-classes="bg-primary-container text-on-primary-container font-semibold rounded-xl"><a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="dashboard" href="#"><span className="material-symbols-outlined text-[20px]">grid_view</span><span className="font-body-md text-body-md">Dashboard</span></a><a aria-current="page" className="flex items-center justify-between px-space-sm py-space-xs transition-colors bg-primary-container text-on-primary-container font-semibold rounded-xl" data-path="reviews-inbox" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px]">inbox</span><span className="font-body-md text-body-md">Reviews Inbox</span></div><span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-mono-metric text-mono-metric">24</span></a><a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="analytics" href="#"><span className="material-symbols-outlined text-[20px]">monitoring</span><span className="font-body-md text-body-md">Analytics</span></a><a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="categories" href="#"><span className="material-symbols-outlined text-[20px]">category</span><span className="font-body-md text-body-md">Categories</span></a><a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="word-cloud" href="#"><span className="material-symbols-outlined text-[20px]">cloud</span><span className="font-body-md text-body-md">Word Cloud</span></a><a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="ideation" href="#"><span className="material-symbols-outlined text-[20px]">lightbulb</span><span className="font-body-md text-body-md">Ideation</span></a><a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="reporting" href="#"><span className="material-symbols-outlined text-[20px]">description</span><span className="font-body-md text-body-md">Reporting</span></a><a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="settings" href="#"><span className="material-symbols-outlined text-[20px]">settings</span><span className="font-body-md text-body-md">Settings</span></a></nav></div><div className="px-space-md pt-space-sm"><div className="p-space-xs rounded-xl bg-surface-container-low flex items-center justify-between"><div className="flex items-center gap-space-xs overflow-hidden"><div className="relative"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div><span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-tertiary-container ring-2 ring-surface-container-low"></span></div><div className="flex flex-col overflow-hidden"><span className="font-body-sm text-body-sm font-medium text-on-surface truncate">Dev Lead</span><span className="font-label-caps text-label-caps text-tertiary truncate">Online</span></div></div><button className="text-on-surface-variant hover:text-on-surface p-space-2xs"><span className="material-symbols-outlined text-[18px]">more_vert</span></button></div></div></aside><div className="pl-sidebar-w"><header className="fixed top-0 left-sidebar-w right-0 h-16 bg-surface-container-lowest/80 backdrop-blur-xl z-40 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 w-full px-space-lg flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-md"><div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant"><span className="material-symbols-outlined text-[16px]">home</span><span>/</span><span className="text-on-surface font-medium">Workspace</span></div><div className="h-4 w-px bg-surface-container-highest"></div><div className="flex items-center gap-space-2xs"><span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span><span className="font-mono-metric text-mono-metric text-on-surface-variant">Synced 4m ago</span></div></div><div className="flex items-center gap-space-sm"><div className="flex items-center bg-surface-container-low p-1 rounded-xl"><button className="px-space-xs py-1 rounded-lg bg-surface-container-high text-on-surface font-body-sm text-body-sm font-medium transition-colors">All Platforms</button><button className="px-space-xs py-1 rounded-lg text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm transition-colors">iOS</button><button className="px-space-xs py-1 rounded-lg text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm transition-colors">Android</button></div><div className="flex items-center bg-surface-container-low px-space-sm py-1.5 rounded-xl gap-space-xs text-on-surface-variant hover:text-on-surface cursor-pointer"><span className="material-symbols-outlined text-[16px]">calendar_today</span><span className="font-body-sm text-body-sm">Last 30 Days</span><span className="material-symbols-outlined text-[16px]">expand_more</span></div><button className="flex items-center gap-space-2xs px-space-sm py-1.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary-container font-body-sm text-body-sm font-semibold transition-all shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><span className="material-symbols-outlined text-[16px]">sync</span><span>Refresh Feeds</span></button><div className="h-4 w-px bg-surface-container-highest"></div><button className="p-space-2xs text-on-surface-variant hover:text-on-surface relative rounded-lg hover:bg-surface-container-high transition-colors"><span className="material-symbols-outlined text-[20px]">notifications</span><span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-tertiary-container"></span></button><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main className="w-full pt-16 bg-surface min-h-screen"><div className="flex flex-col w-full">

<div className="w-full px-space-lg py-space-xl flex flex-col gap-space-xl max-w-[1680px] mx-auto">
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
<div className="flex flex-col gap-space-2xs">
<div className="flex items-center gap-space-xs font-label-caps text-label-caps text-on-surface-variant">
<span>TAXONOMY ENGINE RUNTIME</span>
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
<span className="text-tertiary">99.4% MULTI-LABEL PRECISION</span>
<span>•</span>
<span className="text-secondary">AUTO-SYNTHESIS v2.4.0</span>
</div>
<div className="flex items-center gap-space-md flex-wrap">
<h1 className="font-display-sm text-display-sm text-on-surface tracking-tight font-bold">Categories &amp; Taxonomy</h1>
<span className="px-space-xs py-0.5 rounded-full bg-surface-container-high text-tertiary font-mono-metric text-mono-metric">
            18 Clusters • 5 Domains
          </span>
</div>
</div>
<div className="flex items-center gap-space-xs flex-wrap">
<button className="flex items-center gap-space-2xs px-space-sm py-2 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-on-surface transition-colors shadow-sm">
<span className="material-symbols-outlined text-[18px] text-tertiary">model_training</span>
<span className="font-body-sm text-body-sm font-medium">Train Custom Classifier</span>
</button>
<button className="flex items-center gap-space-2xs px-space-sm py-2 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-on-surface transition-colors shadow-sm">
<span className="material-symbols-outlined text-[18px] text-on-surface-variant">hub</span>
<span className="font-body-sm text-body-sm font-medium">Cluster Settings</span>
</button>
<button className="flex items-center gap-space-2xs px-space-md py-2 rounded-xl bg-primary hover:bg-primary-fixed-dim text-on-primary font-body-sm text-body-sm font-semibold transition-all shadow-md">
<span className="material-symbols-outlined text-[18px]">add_circle</span>
<span>New Category</span>
</button>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">
<div className="bg-surface-container-low p-space-md rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:bg-surface-container transition-colors">
<div className="flex items-start justify-between">
<div className="flex flex-col gap-space-2xs">
<span className="font-label-caps text-label-caps text-on-surface-variant">TOTAL CATEGORIZED REVIEWS</span>
<div className="flex items-baseline gap-space-xs">
<span className="font-display-sm text-display-sm text-on-surface font-bold">21,890</span>
<span className="font-mono-metric text-mono-metric text-tertiary">+14.2%</span>
</div>
</div>
<div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined text-[22px]">fact_check</span>
</div>
</div>
<div className="mt-space-md flex flex-col gap-space-2xs">
<div className="flex justify-between items-center font-mono-metric text-mono-metric text-on-surface-variant">
<span>Coverage of ingested corpus</span>
<span className="text-on-surface font-medium">88.8%</span>
</div>
<div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-tertiary rounded-full" style={{"width": "88.8%"}}></div>
</div>
</div>
</div>
<div className="bg-surface-container-low p-space-md rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:bg-surface-container transition-colors">
<div className="flex items-start justify-between">
<div className="flex flex-col gap-space-2xs">
<span className="font-label-caps text-label-caps text-on-surface-variant">ACTIVE TAXONOMY CLUSTERS</span>
<div className="flex items-baseline gap-space-xs">
<span className="font-display-sm text-display-sm text-on-surface font-bold">18</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">across 5 Pillars</span>
</div>
</div>
<div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[22px]">account_tree</span>
</div>
</div>
<div className="mt-space-md flex items-center justify-between font-mono-metric text-mono-metric">
<span className="text-on-surface-variant">Semantic Depth</span>
<span className="text-secondary font-semibold">Tier 3 Embeddings</span>
</div>
</div>
<div className="bg-surface-container-low p-space-md rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:bg-surface-container transition-colors">
<div className="flex items-start justify-between">
<div className="flex flex-col gap-space-2xs">
<span className="font-label-caps text-label-caps text-on-surface-variant">AVG MODEL PRECISION</span>
<div className="flex items-baseline gap-space-xs">
<span className="font-display-sm text-display-sm text-on-surface font-bold">94.6%</span>
<span className="font-mono-metric text-mono-metric text-tertiary">F1 0.93</span>
</div>
</div>
<div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[22px]">verified</span>
</div>
</div>
<div className="mt-space-md flex items-center justify-between font-mono-metric text-mono-metric">
<span className="text-on-surface-variant">Anomaly Drift Queue</span>
<span className="text-on-surface font-medium">176 items (0.8%)</span>
</div>
</div>
<div className="bg-surface-container-low p-space-md rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:bg-surface-container transition-colors">
<div className="flex items-start justify-between">
<div className="flex flex-col gap-space-2xs">
<span className="font-label-caps text-label-caps text-error">URGENT FRICTION VECTOR</span>
<div className="flex items-baseline gap-space-xs">
<span className="font-display-sm text-display-sm text-on-surface font-bold">4</span>
<span className="font-body-sm text-body-sm text-error font-medium">Clusters Active</span>
</div>
</div>
<div className="w-10 h-10 rounded-xl bg-error-container/40 flex items-center justify-center text-error">
<span className="material-symbols-outlined text-[22px]">crisis_alert</span>
</div>
</div>
<div className="mt-space-md flex items-center gap-space-2xs flex-wrap">
<span className="px-space-2xs py-0.5 rounded bg-surface-container-highest text-error font-mono-metric text-mono-metric">Billing</span>
<span className="px-space-2xs py-0.5 rounded bg-surface-container-highest text-error font-mono-metric text-mono-metric">Camera</span>
<span className="px-space-2xs py-0.5 rounded bg-surface-container-highest text-error font-mono-metric text-mono-metric">Crash</span>
<span className="px-space-2xs py-0.5 rounded bg-surface-container-highest text-error font-mono-metric text-mono-metric">Auth</span>
</div>
</div>
</div>
<div className="grid grid-cols-1 xl:grid-cols-12 gap-space-md">
<div className="xl:col-span-8 bg-surface-container-low p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div className="flex flex-col">
<span className="font-title-lg text-title-lg font-bold text-on-surface">Taxonomy Volume &amp; Detractor Distribution</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Root-level allocation computed over 21,890 verified feedbacks</span>
</div>
<div className="flex items-center gap-space-xs font-mono-metric text-mono-metric text-on-surface-variant">
<span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-error"></span> Critical</span>
<span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-tertiary"></span> Positive</span>
<span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-primary"></span> Neutral</span>
</div>
</div>
<div className="flex flex-col gap-space-md mt-space-2xs">
<div className="flex flex-col gap-space-2xs">
<div className="flex justify-between items-center">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-[18px] text-error">bug_report</span>
<span className="font-body-md text-body-md font-semibold text-on-surface">1. Bugs &amp; Instability</span>
<span className="px-space-xs py-0.5 rounded bg-error-container/30 text-error font-mono-metric text-mono-metric">34% Critical</span>
</div>
<div className="flex items-center gap-space-sm font-mono-metric text-mono-metric">
<span className="text-on-surface font-semibold">7,420 reviews</span>
<span className="text-on-surface-variant">33.9%</span>
</div>
</div>
<div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden flex">
<div className="bg-error h-full" style={{"width": "34%"}}></div>
<div className="bg-primary-container h-full" style={{"width": "52%"}}></div>
<div className="bg-tertiary h-full" style={{"width": "14%"}}></div>
</div>
</div>
<div className="flex flex-col gap-space-2xs">
<div className="flex justify-between items-center">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-[18px] text-tertiary">auto_fix_high</span>
<span className="font-body-md text-body-md font-semibold text-on-surface">2. Feature Requests &amp; UX Polish</span>
<span className="px-space-xs py-0.5 rounded bg-tertiary-container/30 text-tertiary font-mono-metric text-mono-metric">82% NPS Sentiment</span>
</div>
<div className="flex items-center gap-space-sm font-mono-metric text-mono-metric">
<span className="text-on-surface font-semibold">6,150 reviews</span>
<span className="text-on-surface-variant">28.1%</span>
</div>
</div>
<div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden flex">
<div className="bg-tertiary h-full" style={{"width": "82%"}}></div>
<div className="bg-primary-container h-full" style={{"width": "12%"}}></div>
<div className="bg-error h-full" style={{"width": "6%"}}></div>
</div>
</div>
<div className="flex flex-col gap-space-2xs">
<div className="flex justify-between items-center">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-[18px] text-secondary">speed</span>
<span className="font-body-md text-body-md font-semibold text-on-surface">3. Performance &amp; Latency</span>
<span className="px-space-xs py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-mono-metric text-mono-metric">2.8★ Avg</span>
</div>
<div className="flex items-center gap-space-sm font-mono-metric text-mono-metric">
<span className="text-on-surface font-semibold">3,890 reviews</span>
<span className="text-on-surface-variant">17.8%</span>
</div>
</div>
<div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden flex">
<div className="bg-error h-full" style={{"width": "44%"}}></div>
<div className="bg-secondary h-full" style={{"width": "36%"}}></div>
<div className="bg-tertiary h-full" style={{"width": "20%"}}></div>
</div>
</div>
<div className="flex flex-col gap-space-2xs">
<div className="flex justify-between items-center">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-[18px] text-error">payments</span>
<span className="font-body-md text-body-md font-semibold text-on-surface">4. Billing &amp; Subscriptions</span>
<span className="px-space-xs py-0.5 rounded bg-error-container/30 text-error font-mono-metric text-mono-metric">42% Churn Risk</span>
</div>
<div className="flex items-center gap-space-sm font-mono-metric text-mono-metric">
<span className="text-on-surface font-semibold">2,410 reviews</span>
<span className="text-on-surface-variant">11.0%</span>
</div>
</div>
<div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden flex">
<div className="bg-error h-full" style={{"width": "71%"}}></div>
<div className="bg-primary-container h-full" style={{"width": "21%"}}></div>
<div className="bg-tertiary h-full" style={{"width": "8%"}}></div>
</div>
</div>
<div className="flex flex-col gap-space-2xs">
<div className="flex justify-between items-center">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-[18px] text-primary">lock_reset</span>
<span className="font-body-md text-body-md font-semibold text-on-surface">5. Account &amp; Authentication</span>
<span className="px-space-xs py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-mono-metric text-mono-metric">3.4★ Avg</span>
</div>
<div className="flex items-center gap-space-sm font-mono-metric text-mono-metric">
<span className="text-on-surface font-semibold">2,020 reviews</span>
<span className="text-on-surface-variant">9.2%</span>
</div>
</div>
<div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden flex">
<div className="bg-error h-full" style={{"width": "28%"}}></div>
<div className="bg-primary h-full" style={{"width": "48%"}}></div>
<div className="bg-tertiary h-full" style={{"width": "24%"}}></div>
</div>
</div>
</div>
</div>
<div className="xl:col-span-4 bg-surface-container-low p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
<div className="flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<span className="font-title-lg text-title-lg font-bold text-on-surface">Auto-Cluster Drift Status</span>
<span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-ping"></span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Continuous semantic validation against active production weights.</span>
<div className="flex flex-col gap-space-xs mt-space-xs">
<div className="p-space-xs rounded-xl bg-surface-container flex items-center justify-between">
<div className="flex flex-col">
<span className="font-body-md text-body-md font-medium text-on-surface">Stability Root Embeddings</span>
<span className="font-label-caps text-label-caps text-tertiary">STABLE • DRIFT 0.02</span>
</div>
<span className="font-mono-metric text-mono-metric text-on-surface-variant">Synced 4m ago</span>
</div>
<div className="p-space-xs rounded-xl bg-surface-container flex items-center justify-between">
<div className="flex flex-col">
<span className="font-body-md text-body-md font-medium text-on-surface">Camera Pipeline Vectors</span>
<span className="font-label-caps text-label-caps text-secondary">RETRAINING ACTIVE</span>
</div>
<span className="font-mono-metric text-mono-metric text-on-surface-variant">ETA 2m</span>
</div>
<div className="p-space-xs rounded-xl bg-surface-container flex items-center justify-between">
<div className="flex flex-col">
<span className="font-body-md text-body-md font-medium text-on-surface">Auth &amp; 2FA Tokens</span>
<span className="font-label-caps text-label-caps text-on-surface-variant">LOCKED • VERIFIED</span>
</div>
<span className="font-mono-metric text-mono-metric text-on-surface-variant">1h ago</span>
</div>
</div>
</div>
<div className="mt-space-md p-space-sm rounded-xl bg-surface-container-highest/40 flex flex-col gap-space-2xs">
<span className="font-label-caps text-label-caps text-on-surface-variant">EMBEDDING MODEL RUNTIME</span>
<div className="flex justify-between items-center font-mono-metric text-mono-metric text-on-surface">
<span>text-embedding-3-large</span>
<span className="text-tertiary">3072 dims</span>
</div>
</div>
</div>
</div>
<div className="bg-gradient-to-r from-surface-container-high via-surface-container-low to-surface-container-high p-space-lg rounded-xl shadow-lg relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md">
<div className="flex items-start gap-space-md">
<div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container shrink-0">
<span className="material-symbols-outlined text-[28px]">auto_awesome</span>
</div>
<div className="flex flex-col gap-space-2xs">
<div className="flex items-center gap-space-xs">
<span className="font-title-lg text-title-lg font-bold text-on-surface">Autonomous Micro-Cluster Emergence Detected</span>
<span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-mono-metric text-mono-metric">v2.4.0 Live Ingestion</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
            Copilot identified <span className="text-tertiary font-medium">3 unclassified micro-clusters</span> from 480 recent reviews in the past 48 hours: 
            <span className="text-on-surface font-semibold">HEIC photo buffer overflow</span> (310 revs), 
            <span className="text-on-surface font-semibold">Foldable screen aspect ratio distortion</span> (112 revs), and 
            <span className="text-on-surface font-semibold">Family sharing renewal mismatch</span> (58 revs).
          </p>
</div>
</div>
<div className="flex items-center gap-space-xs shrink-0 w-full lg:w-auto justify-end">
<button className="px-space-sm py-2 rounded-xl bg-surface-container-highest hover:bg-surface-bright text-on-surface font-body-sm text-body-sm font-medium transition-colors">
          Ignore Anomaly
        </button>
<button className="px-space-sm py-2 rounded-xl bg-primary-container hover:bg-primary text-on-primary-container font-body-sm text-body-sm font-semibold transition-colors">
          Merge into Stability
        </button>
<button className="px-space-sm py-2 rounded-xl bg-primary hover:bg-primary-fixed-dim text-on-primary font-body-sm text-body-sm font-semibold transition-all shadow-md">
          Promote to Standalone
        </button>
</div>
</div>
<div className="flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div>
<h2 className="font-title-lg text-title-lg font-bold text-on-surface">Cluster Drill-Down &amp; SLA Tracking</h2>
<span className="font-body-sm text-body-sm text-on-surface-variant">Deep telemetry, active open incidents, and automated integrations</span>
</div>
<div className="flex items-center gap-space-xs">
<button className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors">
<span className="material-symbols-outlined text-[18px]">filter_list</span>
</button>
<button className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors">
<span className="material-symbols-outlined text-[18px]">sort</span>
</button>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
<div className="bg-surface-container-low p-space-md rounded-xl shadow-sm flex flex-col justify-between gap-space-md hover:bg-surface-container transition-colors">
<div className="flex flex-col gap-space-sm">
<div className="flex items-start justify-between">
<div className="flex items-center gap-space-xs">
<span className="w-2.5 h-2.5 rounded-full bg-error"></span>
<span className="font-title-md text-title-md font-bold text-on-surface">Bugs &amp; Stability</span>
</div>
<span className="px-space-xs py-0.5 rounded bg-error-container/30 text-error font-mono-metric text-mono-metric">Critical Focus</span>
</div>
<div className="grid grid-cols-2 gap-space-xs p-space-xs rounded-xl bg-surface-container">
<div>
<span className="font-label-caps text-label-caps text-on-surface-variant">REVIEWS</span>
<div className="font-mono-metric text-mono-metric font-semibold text-on-surface">7,420 <span className="text-error">(1.8★)</span></div>
</div>
<div>
<span className="font-label-caps text-label-caps text-on-surface-variant">SLA P0/P1</span>
<div className="font-mono-metric text-mono-metric font-semibold text-error">2.1 hrs</div>
</div>
<div>
<span className="font-label-caps text-label-caps text-on-surface-variant">JIRA LINKED</span>
<div className="font-mono-metric text-mono-metric text-tertiary">84 Open Issues</div>
</div>
<div>
<span className="font-label-caps text-label-caps text-on-surface-variant">DRIFT SCORE</span>
<div className="font-mono-metric text-mono-metric text-on-surface">99.1% Acc</div>
</div>
</div>
<div className="flex flex-col gap-space-2xs">
<span className="font-label-caps text-label-caps text-on-surface-variant">PRIMARY DETRACTOR SUB-CATEGORIES</span>
<div className="flex flex-col gap-1 font-body-sm text-body-sm">
<div className="flex justify-between text-on-surface">
<span className="truncate">Camera Pipeline Crash (iOS 17.4)</span>
<span className="font-mono-metric text-mono-metric text-error">3,120</span>
</div>
<div className="flex justify-between text-on-surface">
<span className="truncate">Background Sync Deadlock</span>
<span className="font-mono-metric text-mono-metric text-error">2,410</span>
</div>
<div className="flex justify-between text-on-surface">
<span className="truncate">Memory Leak on RAW Export</span>
<span className="font-mono-metric text-mono-metric text-on-surface-variant">1,890</span>
</div>
</div>
</div>
</div>
<div className="flex items-center justify-between pt-space-xs">
<div className="flex items-center gap-space-2xs">
<span className="material-symbols-outlined text-[16px] text-tertiary">sync_alt</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Jira Synced</span>
</div>
<a className="font-body-sm text-body-sm font-semibold text-tertiary hover:underline flex items-center gap-1" href="#">
              View 7.4k Reviews
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>
<div className="bg-surface-container-low p-space-md rounded-xl shadow-sm flex flex-col justify-between gap-space-md hover:bg-surface-container transition-colors">
<div className="flex flex-col gap-space-sm">
<div className="flex items-start justify-between">
<div className="flex items-center gap-space-xs">
<span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
<span className="font-title-md text-title-md font-bold text-on-surface">Feature Requests &amp; UI Polish</span>
</div>
<span className="px-space-xs py-0.5 rounded bg-tertiary-container/30 text-tertiary font-mono-metric text-mono-metric">High Opportunity</span>
</div>
<div className="grid grid-cols-2 gap-space-xs p-space-xs rounded-xl bg-surface-container">
<div>
<span className="font-label-caps text-label-caps text-on-surface-variant">REVIEWS</span>
<div className="font-mono-metric text-mono-metric font-semibold text-on-surface">6,150 <span className="text-tertiary">(4.6★)</span></div>
</div>
<div>
<span className="font-label-caps text-label-caps text-on-surface-variant">ROADMAP UPVOTES</span>
<div className="font-mono-metric text-mono-metric font-semibold text-tertiary">142 Items</div>
</div>
<div>
<span className="font-label-caps text-label-caps text-on-surface-variant">NPS IMPACT</span>
<div className="font-mono-metric text-mono-metric text-tertiary">+64 Pts</div>
</div>
<div>
<span className="font-label-caps text-label-caps text-on-surface-variant">PRODUCT AREA</span>
<div className="font-mono-metric text-mono-metric text-on-surface">Mobile Core</div>
</div>
</div>
<div className="flex flex-col gap-space-2xs">
<span className="font-label-caps text-label-caps text-on-surface-variant">TOP REQUESTED SUB-THEMES</span>
<div className="flex flex-col gap-1 font-body-sm text-body-sm">
<div className="flex justify-between text-on-surface">
<span className="truncate">Tablet Landscape Canvas Support</span>
<span className="font-mono-metric text-mono-metric text-tertiary">2,150</span>
</div>
<div className="flex justify-between text-on-surface">
<span className="truncate">Bulk Export to Cloud PDF/RAW</span>
<span className="font-mono-metric text-mono-metric text-tertiary">1,820</span>
</div>
<div className="flex justify-between text-on-surface">
<span className="truncate">Custom Accent Themes / Dark Tint</span>
<span className="font-mono-metric text-mono-metric text-on-surface-variant">1,240</span>
</div>
</div>
</div>
</div>
<div className="flex items-center justify-between pt-space-xs">
<div className="flex items-center gap-space-2xs">
<span className="material-symbols-outlined text-[16px] text-tertiary">linear_scale</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Linear Roadmapped</span>
</div>
<a className="font-body-sm text-body-sm font-semibold text-tertiary hover:underline flex items-center gap-1" href="#">
              View 6.1k Reviews
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>
<div className="bg-surface-container-low p-space-md rounded-xl shadow-sm flex flex-col justify-between gap-space-md hover:bg-surface-container transition-colors">
<div className="flex flex-col gap-space-sm">
<div className="flex items-start justify-between">
<div className="flex items-center gap-space-xs">
<span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
<span className="font-title-md text-title-md font-bold text-on-surface">Performance &amp; Battery</span>
</div>
<span className="px-space-xs py-0.5 rounded bg-surface-container-highest text-secondary font-mono-metric text-mono-metric">Needs Optimization</span>
</div>
<div className="grid grid-cols-2 gap-space-xs p-space-xs rounded-xl bg-surface-container">
<div>
<span className="font-label-caps text-label-caps text-on-surface-variant">REVIEWS</span>
<div className="font-mono-metric text-mono-metric font-semibold text-on-surface">3,890 <span className="text-error">(2.8★)</span></div>
</div>
<div>
<span className="font-label-caps text-label-caps text-on-surface-variant">AVG DRAIN RATE</span>
<div className="font-mono-metric text-mono-metric font-semibold text-error">+22% / hr</div>
</div>
<div>
<span className="font-label-caps text-label-caps text-on-surface-variant">COLD BOOT</span>
<div className="font-mono-metric text-mono-metric text-secondary">2.8s (Target 1.2s)</div>
</div>
<div>
<span className="font-label-caps text-label-caps text-on-surface-variant">SLA P1</span>
<div className="font-mono-metric text-mono-metric text-on-surface">4.1 hrs</div>
</div>
</div>
<div className="flex flex-col gap-space-2xs">
<span className="font-label-caps text-label-caps text-on-surface-variant">CRITICAL LATENCY HOTSPOTS</span>
<div className="flex flex-col gap-1 font-body-sm text-body-sm">
<div className="flex justify-between text-on-surface">
<span className="truncate">Thermal Throttling on 4K Render</span>
<span className="font-mono-metric text-mono-metric text-error">1,940</span>
</div>
<div className="flex justify-between text-on-surface">
<span className="truncate">Startup Splash Cold Boot Hang</span>
<span className="font-mono-metric text-mono-metric text-error">1,120</span>
</div>
<div className="flex justify-between text-on-surface">
<span className="truncate">Frame Drop in Virtual Scroll List</span>
<span className="font-mono-metric text-mono-metric text-on-surface-variant">830</span>
</div>
</div>
</div>
</div>
<div className="flex items-center justify-between pt-space-xs">
<div className="flex items-center gap-space-2xs">
<span className="material-symbols-outlined text-[16px] text-on-surface-variant">speed</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Profiler Active</span>
</div>
<a className="font-body-sm text-body-sm font-semibold text-tertiary hover:underline flex items-center gap-1" href="#">
              View 3.8k Reviews
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>
<div className="bg-surface-container-low p-space-md rounded-xl shadow-sm flex flex-col justify-between gap-space-md hover:bg-surface-container transition-colors">
<div className="flex flex-col gap-space-sm">
<div className="flex items-start justify-between">
<div className="flex items-center gap-space-xs">
<span className="w-2.5 h-2.5 rounded-full bg-error"></span>
<span className="font-title-md text-title-md font-bold text-on-surface">Billing, Pricing &amp; Renewal</span>
</div>
<span className="px-space-xs py-0.5 rounded bg-error-container/30 text-error font-mono-metric text-mono-metric">High Churn Vector</span>
</div>
<div className="grid grid-cols-2 gap-space-xs p-space-xs rounded-xl bg-surface-container">
<div>
<span className="font-label-caps text-label-caps text-on-surface-variant">REVIEWS</span>
<div className="font-mono-metric text-mono-metric font-semibold text-on-surface">2,410 <span className="text-error">(1.4★)</span></div>
</div>
<div>
<span className="font-label-caps text-label-caps text-on-surface-variant">ESCALATION RATE</span>
<div className="font-mono-metric text-mono-metric font-semibold text-error">62% to Support</div>
</div>
<div>
<span className="font-label-caps text-label-caps text-on-surface-variant">REFUND INTENT</span>
<div className="font-mono-metric text-mono-metric text-error">1,120 Claims</div>
</div>
<div>
<span className="font-label-caps text-label-caps text-on-surface-variant">AUTO-TAG</span>
<div className="font-mono-metric text-mono-metric text-on-surface">Stripe/AppStore</div>
</div>
</div>
<div className="flex flex-col gap-space-2xs">
<span className="font-label-caps text-label-caps text-on-surface-variant">MAIN BILLING DETRACTORS</span>
<div className="flex flex-col gap-1 font-body-sm text-body-sm">
<div className="flex justify-between text-on-surface">
<span className="truncate">Annual Autorenewal Surprise Notification</span>
<span className="font-mono-metric text-mono-metric text-error">1,180</span>
</div>
<div className="flex justify-between text-on-surface">
<span className="truncate">In-app Purchase Restore Key Failure</span>
<span className="font-mono-metric text-mono-metric text-error">740</span>
</div>
<div className="flex justify-between text-on-surface">
<span className="truncate">Tier Switch Overcharge Dispute</span>
<span className="font-mono-metric text-mono-metric text-on-surface-variant">490</span>
</div>
</div>
</div>
</div>
<div className="flex items-center justify-between pt-space-xs">
<div className="flex items-center gap-space-2xs">
<span className="material-symbols-outlined text-[16px] text-error">warning</span>
<span className="font-body-sm text-body-sm text-error">Urgent CX Routing</span>
</div>
<a className="font-body-sm text-body-sm font-semibold text-tertiary hover:underline flex items-center gap-1" href="#">
              View 2.4k Reviews
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>
<div className="bg-surface-container-low p-space-md rounded-xl shadow-sm flex flex-col justify-between gap-space-md hover:bg-surface-container transition-colors">
<div className="flex flex-col gap-space-sm">
<div className="flex items-start justify-between">
<div className="flex items-center gap-space-xs">
<span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
<span className="font-title-md text-title-md font-bold text-on-surface">Onboarding &amp; Auth</span>
</div>
<span className="px-space-xs py-0.5 rounded bg-surface-container-highest text-tertiary font-mono-metric text-mono-metric">Stable Health</span>
</div>
<div className="grid grid-cols-2 gap-space-xs p-space-xs rounded-xl bg-surface-container">
<div>
<span className="font-label-caps text-label-caps text-on-surface-variant">REVIEWS</span>
<div className="font-mono-metric text-mono-metric font-semibold text-on-surface">2,020 <span className="text-tertiary">(3.9★)</span></div>
</div>
<div>
<span className="font-label-caps text-label-caps text-on-surface-variant">PASS RATE</span>
<div className="font-mono-metric text-mono-metric font-semibold text-tertiary">97.8%</div>
</div>
<div>
<span className="font-label-caps text-label-caps text-on-surface-variant">2FA LATENCY</span>
<div className="font-mono-metric text-mono-metric text-on-surface">14s Avg SMS</div>
</div>
<div>
<span className="font-label-caps text-label-caps text-on-surface-variant">SSO DRIFT</span>
<div className="font-mono-metric text-mono-metric text-tertiary">0.01% Low</div>
</div>
</div>
<div className="flex flex-col gap-space-2xs">
<span className="font-label-caps text-label-caps text-on-surface-variant">AUTH ISSUES BY VOLUME</span>
<div className="flex flex-col gap-1 font-body-sm text-body-sm">
<div className="flex justify-between text-on-surface">
<span className="truncate">SSO Google / Apple Auth Loop</span>
<span className="font-mono-metric text-mono-metric text-on-surface-variant">920</span>
</div>
<div className="flex justify-between text-on-surface">
<span className="truncate">2FA SMS Delivery Timeout on Roaming</span>
<span className="font-mono-metric text-mono-metric text-on-surface-variant">610</span>
</div>
<div className="flex justify-between text-on-surface">
<span className="truncate">Password Reset Token Expiry Rate</span>
<span className="font-mono-metric text-mono-metric text-on-surface-variant">490</span>
</div>
</div>
</div>
</div>
<div className="flex items-center justify-between pt-space-xs">
<div className="flex items-center gap-space-2xs">
<span className="material-symbols-outlined text-[16px] text-tertiary">verified_user</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">OAuth 2.1 Compliant</span>
</div>
<a className="font-body-sm text-body-sm font-semibold text-tertiary hover:underline flex items-center gap-1" href="#">
              View 2.0k Reviews
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>
<div className="bg-surface-container-low p-space-md rounded-xl shadow-sm flex flex-col justify-between items-center text-center p-space-lg hover:bg-surface-container transition-colors">
<div className="flex flex-col items-center gap-space-xs my-auto">
<div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined text-[24px]">add</span>
</div>
<span className="font-title-md text-title-md font-semibold text-on-surface">Expand Product Taxonomy</span>
<p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs">
              Create a custom root category, train semantic embedding weights, or import Linear issue labels.
            </p>
</div>
<button className="w-full py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface font-body-sm text-body-sm font-medium transition-colors">
            Configure New Root
          </button>
</div>
</div>
</div>
<div className="bg-surface-container-low rounded-xl shadow-sm overflow-hidden flex flex-col">
<div className="p-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div className="flex flex-col">
<span className="font-title-lg text-title-lg font-bold text-on-surface">Active Classifier Rules &amp; Health Matrix</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Live semantic trigger terms, model confidence, and target webhook routing</span>
</div>
<div className="flex items-center gap-space-xs">
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-on-surface-variant">search</span>
<input className="pl-9 pr-space-sm py-1.5 rounded-xl bg-surface-container text-on-surface font-body-sm text-body-sm placeholder:text-on-surface-variant focus:outline-none focus:ring-1 focus:ring-primary w-64" placeholder="Filter embeddings, domains, tags..." type="text"/>
</div>
<button className="px-space-sm py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-body-sm text-body-sm font-medium transition-colors">
            Export CSV
          </button>
</div>
</div>
<div className="w-full overflow-x-auto">
<table className="w-full text-left font-body-sm text-body-sm">
<thead className="bg-surface-container font-label-caps text-label-caps text-on-surface-variant">
<tr>
<th className="py-space-sm px-space-md font-semibold">CATEGORY &amp; ROOT DOMAIN</th>
<th className="py-space-sm px-space-md font-semibold">SEMANTIC TRIGGER CLUSTERS</th>
<th className="py-space-sm px-space-md font-semibold">INGESTION (30D)</th>
<th className="py-space-sm px-space-md font-semibold">PRECISION</th>
<th className="py-space-sm px-space-md font-semibold">SENTIMENT BIAS</th>
<th className="py-space-sm px-space-md font-semibold">LINKED DESTINATION</th>
<th className="py-space-sm px-space-md font-semibold">STATUS</th>
<th className="py-space-sm px-space-md text-right font-semibold">ACTIONS</th>
</tr>
</thead>
<tbody className="text-on-surface">
<tr className="hover:bg-surface-container/50 transition-colors">
<td className="py-space-sm px-space-md">
<div className="flex flex-col">
<span className="font-semibold text-on-surface">Camera Pipeline Freeze</span>
<span className="font-mono-metric text-mono-metric text-on-surface-variant">Root: Bugs &amp; Instability</span>
</div>
</td>
<td className="py-space-sm px-space-md">
<div className="flex items-center gap-1 flex-wrap max-w-xs">
<span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface font-mono-metric text-mono-metric">black screen</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface font-mono-metric text-mono-metric">shutter lag</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface font-mono-metric text-mono-metric">HEIC</span>
</div>
</td>
<td className="py-space-sm px-space-md font-mono-metric text-mono-metric">3,120 reviews</td>
<td className="py-space-sm px-space-md">
<div className="flex items-center gap-space-2xs font-mono-metric text-mono-metric text-tertiary">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> 98.4%
                </div>
</td>
<td className="py-space-sm px-space-md font-mono-metric text-mono-metric text-error">-0.88 Very Neg</td>
<td className="py-space-sm px-space-md">
<span className="px-space-xs py-0.5 rounded bg-surface-container text-tertiary font-mono-metric text-mono-metric">JIRA: IOS-CAM</span>
</td>
<td className="py-space-sm px-space-md">
<span className="px-space-xs py-0.5 rounded bg-error-container/40 text-error font-label-caps text-label-caps">RETRAINING</span>
</td>
<td className="py-space-sm px-space-md text-right">
<button className="text-on-surface-variant hover:text-on-surface p-1">
<span className="material-symbols-outlined text-[18px]">more_horiz</span>
</button>
</td>
</tr>
<tr className="hover:bg-surface-container/50 transition-colors">
<td className="py-space-sm px-space-md">
<div className="flex flex-col">
<span className="font-semibold text-on-surface">Annual Autorenewal Surprise</span>
<span className="font-mono-metric text-mono-metric text-on-surface-variant">Root: Billing &amp; Subscriptions</span>
</div>
</td>
<td className="py-space-sm px-space-md">
<div className="flex items-center gap-1 flex-wrap max-w-xs">
<span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface font-mono-metric text-mono-metric">charged again</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface font-mono-metric text-mono-metric">refund disputed</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface font-mono-metric text-mono-metric">scam</span>
</div>
</td>
<td className="py-space-sm px-space-md font-mono-metric text-mono-metric">1,180 reviews</td>
<td className="py-space-sm px-space-md">
<div className="flex items-center gap-space-2xs font-mono-metric text-mono-metric text-tertiary">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> 96.2%
                </div>
</td>
<td className="py-space-sm px-space-md font-mono-metric text-mono-metric text-error">-0.94 Critical</td>
<td className="py-space-sm px-space-md">
<span className="px-space-xs py-0.5 rounded bg-surface-container text-on-surface-variant font-mono-metric text-mono-metric">Zendesk: Billing</span>
</td>
<td className="py-space-sm px-space-md">
<span className="px-space-xs py-0.5 rounded bg-tertiary-container/30 text-tertiary font-label-caps text-label-caps">ACTIVE</span>
</td>
<td className="py-space-sm px-space-md text-right">
<button className="text-on-surface-variant hover:text-on-surface p-1">
<span className="material-symbols-outlined text-[18px]">more_horiz</span>
</button>
</td>
</tr>
<tr className="hover:bg-surface-container/50 transition-colors">
<td className="py-space-sm px-space-md">
<div className="flex flex-col">
<span className="font-semibold text-on-surface">Tablet Landscape Workspace</span>
<span className="font-mono-metric text-mono-metric text-on-surface-variant">Root: Feature Requests</span>
</div>
</td>
<td className="py-space-sm px-space-md">
<div className="flex items-center gap-1 flex-wrap max-w-xs">
<span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface font-mono-metric text-mono-metric">iPad rotate</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface font-mono-metric text-mono-metric">keyboard folio</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface font-mono-metric text-mono-metric">split screen</span>
</div>
</td>
<td className="py-space-sm px-space-md font-mono-metric text-mono-metric">2,150 reviews</td>
<td className="py-space-sm px-space-md">
<div className="flex items-center gap-space-2xs font-mono-metric text-mono-metric text-tertiary">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> 99.1%
                </div>
</td>
<td className="py-space-sm px-space-md font-mono-metric text-mono-metric text-tertiary">+0.74 Strong</td>
<td className="py-space-sm px-space-md">
<span className="px-space-xs py-0.5 rounded bg-surface-container text-secondary font-mono-metric text-mono-metric">Linear: DESK-92</span>
</td>
<td className="py-space-sm px-space-md">
<span className="px-space-xs py-0.5 rounded bg-tertiary-container/30 text-tertiary font-label-caps text-label-caps">ACTIVE</span>
</td>
<td className="py-space-sm px-space-md text-right">
<button className="text-on-surface-variant hover:text-on-surface p-1">
<span className="material-symbols-outlined text-[18px]">more_horiz</span>
</button>
</td>
</tr>
<tr className="hover:bg-surface-container/50 transition-colors">
<td className="py-space-sm px-space-md">
<div className="flex flex-col">
<span className="font-semibold text-on-surface">Thermal Throttling 4K</span>
<span className="font-mono-metric text-mono-metric text-on-surface-variant">Root: Performance</span>
</div>
</td>
<td className="py-space-sm px-space-md">
<div className="flex items-center gap-1 flex-wrap max-w-xs">
<span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface font-mono-metric text-mono-metric">phone burning</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface font-mono-metric text-mono-metric">battery drop 30%</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface font-mono-metric text-mono-metric">rendering</span>
</div>
</td>
<td className="py-space-sm px-space-md font-mono-metric text-mono-metric">1,940 reviews</td>
<td className="py-space-sm px-space-md">
<div className="flex items-center gap-space-2xs font-mono-metric text-mono-metric text-tertiary">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> 95.8%
                </div>
</td>
<td className="py-space-sm px-space-md font-mono-metric text-mono-metric text-error">-0.65 Negative</td>
<td className="py-space-sm px-space-md">
<span className="px-space-xs py-0.5 rounded bg-surface-container text-tertiary font-mono-metric text-mono-metric">JIRA: ENG-PERF</span>
</td>
<td className="py-space-sm px-space-md">
<span className="px-space-xs py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-caps text-label-caps">REVIEW NEEDED</span>
</td>
<td className="py-space-sm px-space-md text-right">
<button className="text-on-surface-variant hover:text-on-surface p-1">
<span className="material-symbols-outlined text-[18px]">more_horiz</span>
</button>
</td>
</tr>
<tr className="hover:bg-surface-container/50 transition-colors">
<td className="py-space-sm px-space-md">
<div className="flex flex-col">
<span className="font-semibold text-on-surface">Google / Apple SSO Auth Handshake</span>
<span className="font-mono-metric text-mono-metric text-on-surface-variant">Root: Account &amp; Auth</span>
</div>
</td>
<td className="py-space-sm px-space-md">
<div className="flex items-center gap-1 flex-wrap max-w-xs">
<span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface font-mono-metric text-mono-metric">sign-in canceled</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface font-mono-metric text-mono-metric">token loop</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface font-mono-metric text-mono-metric">oauth</span>
</div>
</td>
<td className="py-space-sm px-space-md font-mono-metric text-mono-metric">920 reviews</td>
<td className="py-space-sm px-space-md">
<div className="flex items-center gap-space-2xs font-mono-metric text-mono-metric text-tertiary">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> 99.4%
                </div>
</td>
<td className="py-space-sm px-space-md font-mono-metric text-mono-metric text-on-surface-variant">-0.12 Neutral</td>
<td className="py-space-sm px-space-md">
<span className="px-space-xs py-0.5 rounded bg-surface-container text-tertiary font-mono-metric text-mono-metric">JIRA: SEC-AUTH</span>
</td>
<td className="py-space-sm px-space-md">
<span className="px-space-xs py-0.5 rounded bg-tertiary-container/30 text-tertiary font-label-caps text-label-caps">ACTIVE</span>
</td>
<td className="py-space-sm px-space-md text-right">
<button className="text-on-surface-variant hover:text-on-surface p-1">
<span className="material-symbols-outlined text-[18px]">more_horiz</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
<div className="p-space-md bg-surface-container flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
<span>Showing 5 of 18 active taxonomy rules</span>
<div className="flex items-center gap-space-xs">
<button className="px-space-sm py-1 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-medium disabled:opacity-50" disabled="">Previous</button>
<span className="font-mono-metric text-mono-metric px-2">Page 1 of 4</span>
<button className="px-space-sm py-1 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-medium">Next</button>
</div>
</div>
</div>
</div>
</div></main></div>
    </>
  );
}
