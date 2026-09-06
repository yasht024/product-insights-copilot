import React from 'react';

export default function WordCloud() {
  return (
    <>
      <aside className="fixed left-0 top-0 h-full w-sidebar-w bg-surface-container-lowest/90 backdrop-blur-xl z-50 flex flex-col justify-between py-space-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="flex flex-col gap-space-md"><div className="px-space-md flex items-center justify-between"><div className="flex items-center gap-space-xs"><div className="w-8 h-8 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container font-title-lg text-title-lg"><span className="material-symbols-outlined text-[18px]">psychology</span></div><div className="flex flex-col"><span className="font-title-md text-title-md font-semibold text-on-surface tracking-tight">Insights Copilot</span><span className="font-label-caps text-label-caps text-on-surface-variant">v2.4 Enterprise</span></div></div></div><div className="px-space-md"><button className="w-full flex items-center justify-between px-space-sm py-space-xs rounded-xl bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors"><div className="flex items-center gap-space-xs overflow-hidden"><span className="material-symbols-outlined text-[18px] text-tertiary">layers</span><span className="font-body-sm text-body-sm font-medium text-on-surface truncate">Acme Mobile App</span></div><span className="material-symbols-outlined text-[16px] text-on-surface-variant">unfold_more</span></button></div><nav className="flex flex-col gap-space-2xs px-space-sm" data-active-classes="bg-primary-container text-on-primary-container font-semibold rounded-xl"><a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="dashboard" href="#"><span className="material-symbols-outlined text-[20px]">grid_view</span><span className="font-body-md text-body-md">Dashboard</span></a><a aria-current="page" className="flex items-center justify-between px-space-sm py-space-xs transition-colors bg-primary-container text-on-primary-container font-semibold rounded-xl" data-path="reviews-inbox" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px]">inbox</span><span className="font-body-md text-body-md">Reviews Inbox</span></div><span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-mono-metric text-mono-metric">24</span></a><a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="analytics" href="#"><span className="material-symbols-outlined text-[20px]">monitoring</span><span className="font-body-md text-body-md">Analytics</span></a><a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="categories" href="#"><span className="material-symbols-outlined text-[20px]">category</span><span className="font-body-md text-body-md">Categories</span></a><a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="word-cloud" href="#"><span className="material-symbols-outlined text-[20px]">cloud</span><span className="font-body-md text-body-md">Word Cloud</span></a><a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="ideation" href="#"><span className="material-symbols-outlined text-[20px]">lightbulb</span><span className="font-body-md text-body-md">Ideation</span></a><a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="reporting" href="#"><span className="material-symbols-outlined text-[20px]">description</span><span className="font-body-md text-body-md">Reporting</span></a><a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="settings" href="#"><span className="material-symbols-outlined text-[20px]">settings</span><span className="font-body-md text-body-md">Settings</span></a></nav></div><div className="px-space-md pt-space-sm"><div className="p-space-xs rounded-xl bg-surface-container-low flex items-center justify-between"><div className="flex items-center gap-space-xs overflow-hidden"><div className="relative"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div><span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-tertiary-container ring-2 ring-surface-container-low"></span></div><div className="flex flex-col overflow-hidden"><span className="font-body-sm text-body-sm font-medium text-on-surface truncate">Dev Lead</span><span className="font-label-caps text-label-caps text-tertiary truncate">Online</span></div></div><button className="text-on-surface-variant hover:text-on-surface p-space-2xs"><span className="material-symbols-outlined text-[18px]">more_vert</span></button></div></div></aside><div className="pl-sidebar-w"><header className="fixed top-0 left-sidebar-w right-0 h-16 bg-surface-container-lowest/80 backdrop-blur-xl z-40 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 w-full px-space-lg flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-md"><div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant"><span className="material-symbols-outlined text-[16px]">home</span><span>/</span><span className="text-on-surface font-medium">Workspace</span></div><div className="h-4 w-px bg-surface-container-highest"></div><div className="flex items-center gap-space-2xs"><span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span><span className="font-mono-metric text-mono-metric text-on-surface-variant">Synced 4m ago</span></div></div><div className="flex items-center gap-space-sm"><div className="flex items-center bg-surface-container-low p-1 rounded-xl"><button className="px-space-xs py-1 rounded-lg bg-surface-container-high text-on-surface font-body-sm text-body-sm font-medium transition-colors">All Platforms</button><button className="px-space-xs py-1 rounded-lg text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm transition-colors">iOS</button><button className="px-space-xs py-1 rounded-lg text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm transition-colors">Android</button></div><div className="flex items-center bg-surface-container-low px-space-sm py-1.5 rounded-xl gap-space-xs text-on-surface-variant hover:text-on-surface cursor-pointer"><span className="material-symbols-outlined text-[16px]">calendar_today</span><span className="font-body-sm text-body-sm">Last 30 Days</span><span className="material-symbols-outlined text-[16px]">expand_more</span></div><button className="flex items-center gap-space-2xs px-space-sm py-1.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary-container font-body-sm text-body-sm font-semibold transition-all shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><span className="material-symbols-outlined text-[16px]">sync</span><span>Refresh Feeds</span></button><div className="h-4 w-px bg-surface-container-highest"></div><button className="p-space-2xs text-on-surface-variant hover:text-on-surface relative rounded-lg hover:bg-surface-container-high transition-colors"><span className="material-symbols-outlined text-[20px]">notifications</span><span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-tertiary-container"></span></button><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main className="w-full pt-16 bg-surface min-h-screen"><div className="flex flex-col w-full">
<!-- Interactive Script for Filtering and Active States -->

<!-- Main Content Space -->
<div className="w-full px-space-lg py-space-lg flex flex-col gap-space-xl max-w-[1600px] mx-auto">
<!-- Hero / Header Action Zone -->
<div className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-md bg-surface-container-low p-space-lg rounded-xl shadow-md">
<div className="flex flex-col gap-space-xs max-w-3xl">
<div className="flex items-center gap-space-xs text-on-surface-variant">
<span className="material-symbols-outlined text-tertiary text-[18px]">neurology</span>
<span className="font-label-caps text-label-caps uppercase tracking-wider text-tertiary">Semantic Intelligence Engine</span>
<span className="text-outline-variant">•</span>
<span className="font-mono-metric text-mono-metric text-on-surface-variant">Model: Titan-NER-v4.2</span>
</div>
<h1 className="font-display-sm text-display-sm text-on-surface font-semibold tracking-tight">
          Word Cloud &amp; Semantic Topics
        </h1>
<p className="font-body-md text-body-md text-on-surface-variant">
          Neural n-gram extraction, sentiment vector clustering, and surging discussion topics synthesised across <span className="text-on-surface font-mono-metric font-medium">24,648</span> customer reviews.
        </p>
</div>
<!-- Action & Filter Bar -->
<div className="flex flex-wrap items-center gap-space-xs">
<div className="flex items-center bg-surface-container-high px-space-sm py-1.5 rounded-xl gap-space-xs shadow-sm">
<span className="material-symbols-outlined text-[16px] text-tertiary">filter_alt</span>
<select className="bg-transparent text-on-surface font-body-sm text-body-sm focus:outline-none cursor-pointer">
<option className="bg-surface-container-high text-on-surface">All Sentiments</option>
<option className="bg-surface-container-high text-on-surface">Critical Detractors (≤ -0.4)</option>
<option className="bg-surface-container-high text-on-surface">High Praise (≥ +0.5)</option>
<option className="bg-surface-container-high text-on-surface">Neutral / Friction</option>
</select>
</div>
<div className="flex items-center bg-surface-container-high px-space-sm py-1.5 rounded-xl gap-space-xs shadow-sm">
<span className="material-symbols-outlined text-[16px] text-on-surface-variant">tune</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Freq:</span>
<span className="font-mono-metric text-mono-metric text-on-surface font-medium">≥ 50</span>
</div>
<button className="flex items-center gap-space-2xs px-space-sm py-1.5 rounded-xl bg-surface-container-highest hover:bg-surface-bright text-on-surface font-body-sm text-body-sm font-medium transition-all shadow-sm">
<span className="material-symbols-outlined text-[16px] text-primary">download</span>
<span>Export Lexicon</span>
</button>
<button className="flex items-center gap-space-2xs px-space-md py-1.5 rounded-xl bg-primary text-on-primary font-body-sm text-body-sm font-semibold hover:opacity-95 transition-all shadow-md">
<span className="material-symbols-outlined text-[16px]">psychology</span>
<span>Extract New N-Grams</span>
</button>
</div>
</div>
<!-- 4-Column High Density Stat Cards -->
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
<!-- Metric 1: Total Keywords -->
<div className="bg-surface-container p-space-md rounded-xl flex flex-col justify-between shadow-sm relative overflow-hidden group hover:bg-surface-container-high transition-colors">
<div className="flex items-center justify-between">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Total Distinct Keywords</span>
<span className="p-1 rounded-lg bg-surface-container-highest text-primary material-symbols-outlined text-[18px]">key</span>
</div>
<div className="flex items-baseline gap-space-xs my-space-xs">
<span className="font-mono-metric text-[1.75rem] font-semibold text-on-surface leading-tight">1,428</span>
<span className="font-body-sm text-body-sm text-tertiary flex items-center font-mono-metric">
<span className="material-symbols-outlined text-[14px]">arrow_upward</span>+84
          </span>
</div>
<div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
<span>In active lexicon</span>
<span className="font-mono-metric text-mono-metric text-tertiary">v2.4.0 index</span>
</div>
</div>
<!-- Metric 2: Highest Sentiment -->
<div className="bg-surface-container p-space-md rounded-xl flex flex-col justify-between shadow-sm relative overflow-hidden group hover:bg-surface-container-high transition-colors">
<div className="flex items-center justify-between">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Highest Sentiment Term</span>
<span className="p-1 rounded-lg bg-tertiary-container/30 text-tertiary material-symbols-outlined text-[18px]">sentiment_very_satisfied</span>
</div>
<div className="flex items-baseline gap-space-xs my-space-xs">
<span className="font-title-lg text-title-lg font-semibold text-on-surface truncate">"export feature"</span>
</div>
<div className="flex items-center justify-between font-mono-metric text-mono-metric">
<span className="text-tertiary flex items-center gap-1 font-semibold">+0.94 Polarity</span>
<span className="text-on-surface-variant">1,820 mentions</span>
</div>
</div>
<!-- Metric 3: Top Detractor Vector -->
<div className="bg-surface-container p-space-md rounded-xl flex flex-col justify-between shadow-sm relative overflow-hidden group hover:bg-surface-container-high transition-colors">
<div className="flex items-center justify-between">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Top Detractor Vector</span>
<span className="p-1 rounded-lg bg-error-container/40 text-error material-symbols-outlined text-[18px]">report_problem</span>
</div>
<div className="flex items-baseline gap-space-xs my-space-xs">
<span className="font-title-lg text-title-lg font-semibold text-error truncate">"camera crash"</span>
</div>
<div className="flex items-center justify-between font-mono-metric text-mono-metric">
<span className="text-error flex items-center gap-1 font-semibold">-0.88 Polarity</span>
<span className="text-on-surface-variant">3,120 mentions</span>
</div>
</div>
<!-- Metric 4: Emerging Velocity -->
<div className="bg-surface-container p-space-md rounded-xl flex flex-col justify-between shadow-sm relative overflow-hidden group hover:bg-surface-container-high transition-colors">
<div className="flex items-center justify-between">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Emerging Phrase Velocity</span>
<span className="p-1 rounded-lg bg-secondary-container/30 text-secondary material-symbols-outlined text-[18px]">bolt</span>
</div>
<div className="flex items-baseline gap-space-xs my-space-xs">
<span className="font-mono-metric text-[1.75rem] font-semibold text-secondary leading-tight">+312%</span>
<span className="font-body-sm text-body-sm text-on-surface-variant truncate">WoW surge</span>
</div>
<div className="flex items-center justify-between font-body-sm text-body-sm">
<span className="font-mono-metric text-mono-metric text-on-surface font-medium truncate">"raw photo lag"</span>
<span className="px-space-2xs py-0.5 rounded bg-surface-container-highest text-secondary font-label-caps text-label-caps">Surge Alert</span>
</div>
</div>
</div>
<!-- Main Hero: Interactive Semantic Word Cloud & Cluster Canvas -->
<div className="bg-surface-container p-space-lg rounded-xl shadow-md flex flex-col gap-space-md relative overflow-hidden">
<!-- Top Cluster Segment Filtering -->
<div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-[20px]">bubble_chart</span>
<h2 className="font-title-lg text-title-lg text-on-surface font-medium">Neural Semantic Cloud</h2>
<span className="font-mono-metric text-mono-metric text-on-surface-variant bg-surface-container-high px-space-xs py-0.5 rounded">3D Multi-Variate Space</span>
</div>
<div className="flex flex-wrap items-center gap-space-2xs bg-surface-container-lowest p-1 rounded-xl">
<button className="cluster-filter-btn px-space-sm py-1 rounded-lg bg-surface-bright text-on-surface font-body-sm text-body-sm font-medium transition-colors shadow-sm">
            All Clusters (1,428)
          </button>
<button className="cluster-filter-btn px-space-sm py-1 rounded-lg text-on-surface-variant hover:text-on-surface bg-surface-container-low font-body-sm text-body-sm font-medium transition-colors">
            Critical Detractors (312)
          </button>
<button className="cluster-filter-btn px-space-sm py-1 rounded-lg text-on-surface-variant hover:text-on-surface bg-surface-container-low font-body-sm text-body-sm font-medium transition-colors">
            High Praise (540)
          </button>
<button className="cluster-filter-btn px-space-sm py-1 rounded-lg text-on-surface-variant hover:text-on-surface bg-surface-container-low font-body-sm text-body-sm font-medium transition-colors">
            Feature Wishlist (410)
          </button>
<button className="cluster-filter-btn px-space-sm py-1 rounded-lg text-on-surface-variant hover:text-on-surface bg-surface-container-low font-body-sm text-body-sm font-medium transition-colors">
            Surging Trajectory (66)
          </button>
</div>
</div>
<!-- Canvas Area for Semantic Map -->
<div className="relative w-full min-h-[460px] bg-surface-container-lowest rounded-xl p-space-xl flex flex-wrap items-center justify-center content-center gap-x-space-lg gap-y-space-md select-none overflow-hidden">
<!-- Faint dynamic coordinate grid lines in background -->
<div className="absolute inset-0 pointer-events-none opacity-20 flex flex-col justify-between p-space-md">
<div className="flex justify-between font-mono-metric text-label-caps text-outline">
<span>CLUSTER_QUAD_NEG (-1.0)</span>
<span>POLARITY_NEUTRAL (0.0)</span>
<span>CLUSTER_QUAD_POS (+1.0)</span>
</div>
<div className="w-full h-px bg-surface-container-highest"></div>
<div className="w-full h-px bg-surface-container-highest"></div>
<div className="flex justify-between font-mono-metric text-label-caps text-outline">
<span>VOLUME_DENSITY_HIGH</span>
<span>TF-IDF FREQUENCY PROJECTION</span>
<span>VECTOR_SURGE_RADIAL</span>
</div>
</div>
<!-- Huge Red Pill: camera crash -->
<div className="cursor-pointer group relative flex items-center gap-space-xs px-space-lg py-space-sm rounded-full bg-error-container/25 hover:bg-error-container/40 text-error transition-all hover:scale-105 shadow-md" data-pol="-0.88 Detractor" data-tag-target="" data-term="camera crash" data-vol="3,120">
<span className="w-2.5 h-2.5 rounded-full bg-error animate-pulse"></span>
<span className="font-title-lg text-title-lg font-bold tracking-tight">camera crash</span>
<span className="font-mono-metric text-mono-metric bg-surface-container-lowest/80 px-space-xs py-0.5 rounded-full text-on-surface">3,120</span>
<div className="hidden group-hover:flex absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-container-highest text-on-surface text-label-caps font-mono-metric px-2 py-1 rounded shadow-lg whitespace-nowrap z-20">
            Net Polarity: -0.88 • 35% crash reviews
          </div>
</div>
<!-- Large Emerald Pill: export feature -->
<div className="cursor-pointer group relative flex items-center gap-space-xs px-space-md py-space-sm rounded-full bg-tertiary-container/30 hover:bg-tertiary-container/50 text-tertiary transition-all hover:scale-105 shadow-sm" data-pol="+0.94 Praise" data-tag-target="" data-term="export feature" data-vol="1,820">
<span className="w-2 h-2 rounded-full bg-tertiary"></span>
<span className="font-title-md text-title-md font-semibold">export feature</span>
<span className="font-mono-metric text-mono-metric bg-surface-container-lowest/80 px-space-xs py-0.5 rounded-full text-on-surface">1,820</span>
<div className="hidden group-hover:flex absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-container-highest text-on-surface text-label-caps font-mono-metric px-2 py-1 rounded shadow-lg whitespace-nowrap z-20">
            Net Polarity: +0.94 • Loved workflow
          </div>
</div>
<!-- Large Amber Pill: raw files -->
<div className="cursor-pointer group relative flex items-center gap-space-xs px-space-md py-space-sm rounded-full bg-secondary-container/40 hover:bg-secondary-container/60 text-secondary transition-all hover:scale-105 shadow-sm" data-pol="-0.65 Friction" data-tag-target="" data-term="raw files" data-vol="1,890">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-title-md text-title-md font-medium">raw files</span>
<span className="font-mono-metric text-mono-metric bg-surface-container-lowest/80 px-space-xs py-0.5 rounded-full text-on-surface">1,890</span>
</div>
<!-- Medium Cyan Pill: dark mode -->
<div className="cursor-pointer group relative flex items-center gap-space-xs px-space-sm py-1.5 rounded-full bg-surface-container-high hover:bg-surface-bright text-tertiary-fixed transition-all hover:scale-105 shadow-sm" data-pol="+0.82 Praise" data-tag-target="" data-term="dark mode" data-vol="1,240">
<span className="material-symbols-outlined text-[16px] text-tertiary">dark_mode</span>
<span className="font-body-lg text-body-lg font-medium">dark mode</span>
<span className="font-mono-metric text-mono-metric bg-surface-container-lowest px-1.5 py-0.5 rounded-full text-on-surface-variant">1,240</span>
</div>
<!-- Medium Rose Pill: battery drain -->
<div className="cursor-pointer group relative flex items-center gap-space-xs px-space-sm py-1.5 rounded-full bg-error-container/20 hover:bg-error-container/35 text-error transition-all hover:scale-105 shadow-sm" data-pol="-0.74 Friction" data-tag-target="" data-term="battery drain" data-vol="940">
<span className="material-symbols-outlined text-[16px]">battery_alert</span>
<span className="font-body-lg text-body-lg font-medium">battery drain</span>
<span className="font-mono-metric text-mono-metric bg-surface-container-lowest px-1.5 py-0.5 rounded-full text-on-surface-variant">940</span>
</div>
<!-- Medium Amber Pill: annual renewal -->
<div className="cursor-pointer group relative flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high hover:bg-surface-bright text-secondary-fixed transition-all hover:scale-105 shadow-sm" data-pol="-0.92 Billing Friction" data-tag-target="" data-term="annual renewal" data-vol="1,180">
<span className="material-symbols-outlined text-[16px] text-secondary">credit_card_off</span>
<span className="font-body-lg text-body-lg font-semibold">annual renewal</span>
<span className="font-mono-metric text-mono-metric bg-surface-container-lowest px-1.5 py-0.5 rounded-full text-on-surface">1,180</span>
</div>
<!-- Medium Purple Pill: keyboard shortcuts -->
<div className="cursor-pointer group relative flex items-center gap-space-xs px-space-sm py-1.5 rounded-full bg-primary-container/20 hover:bg-primary-container/40 text-primary transition-all hover:scale-105 shadow-sm" data-pol="+0.71 Feature Request" data-tag-target="" data-term="keyboard shortcuts" data-vol="890">
<span className="material-symbols-outlined text-[16px]">keyboard</span>
<span className="font-body-md text-body-md font-medium">keyboard shortcuts</span>
<span className="font-mono-metric text-mono-metric bg-surface-container-lowest px-1.5 py-0.5 rounded-full text-on-surface-variant">890</span>
</div>
<!-- Medium Blue/Indigo Pill: ipad landscape -->
<div className="cursor-pointer group relative flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-high hover:bg-surface-bright text-primary-fixed transition-all hover:scale-105 shadow-sm" data-pol="+0.65 UI Support" data-tag-target="" data-term="ipad landscape" data-vol="1,450">
<span className="material-symbols-outlined text-[16px]">tablet_mac</span>
<span className="font-body-lg text-body-lg font-medium">ipad landscape</span>
<span className="font-mono-metric text-mono-metric bg-surface-container-lowest px-1.5 py-0.5 rounded-full text-on-surface">1,450</span>
</div>
<!-- Small Glowing Violet Pill with NEW tag: heic buffer -->
<div className="cursor-pointer group relative flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-secondary-container text-on-secondary-container transition-all hover:scale-105 shadow-md ring-1 ring-secondary/40" data-pol="-0.81 Memory Bug" data-tag-target="" data-term="heic buffer" data-vol="310">
<span className="px-1 py-0.2 rounded bg-surface-container-lowest text-secondary font-label-caps text-[10px] font-bold">NEW</span>
<span className="font-body-md text-body-md font-medium">heic buffer</span>
<span className="font-mono-metric text-mono-metric bg-surface-container-lowest px-1 py-0.5 rounded text-on-surface">310</span>
</div>
<!-- Small Neutral Pill: cloud sync -->
<div className="cursor-pointer group relative flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant transition-all hover:scale-105" data-pol="+0.12 Neutral" data-tag-target="" data-term="cloud sync" data-vol="620">
<span className="material-symbols-outlined text-[14px]">cloud_sync</span>
<span className="font-body-sm text-body-sm">cloud sync</span>
<span className="font-mono-metric text-mono-metric text-outline">620</span>
</div>
<!-- Small Amber Pill: subscription price -->
<div className="cursor-pointer group relative flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-high hover:bg-surface-bright text-secondary-fixed-dim transition-all hover:scale-105" data-pol="-0.48 Pricing" data-tag-target="" data-term="subscription price" data-vol="740">
<span className="material-symbols-outlined text-[14px]">payments</span>
<span className="font-body-sm text-body-sm font-medium">subscription price</span>
<span className="font-mono-metric text-mono-metric bg-surface-container-lowest px-1 rounded">740</span>
</div>
<!-- Small Emerald Pill: customer support -->
<div className="cursor-pointer group relative flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-tertiary-container/20 hover:bg-tertiary-container/30 text-tertiary transition-all hover:scale-105" data-pol="+0.89 Praise" data-tag-target="" data-term="customer support" data-vol="530">
<span className="material-symbols-outlined text-[14px]">support_agent</span>
<span className="font-body-sm text-body-sm font-medium">customer support</span>
<span className="font-mono-metric text-mono-metric bg-surface-container-lowest px-1 rounded">530</span>
</div>
<!-- Additional contextual ambient tags -->
<div className="cursor-pointer group relative flex items-center gap-1 px-space-xs py-0.5 rounded-full bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-all" data-pol="+0.77 Delight" data-tag-target="" data-term="haptic feedback" data-vol="410">
<span className="font-body-sm text-body-sm">haptic feedback</span>
<span className="font-mono-metric text-label-caps text-outline">410</span>
</div>
<div className="cursor-pointer group relative flex items-center gap-1 px-space-xs py-0.5 rounded-full bg-error-container/15 text-error hover:bg-error-container/25 transition-all" data-pol="-0.68 Auth Bug" data-tag-target="" data-term="face id loop" data-vol="490">
<span className="font-body-sm text-body-sm">face id loop</span>
<span className="font-mono-metric text-label-caps text-error">490</span>
</div>
<div className="cursor-pointer group relative flex items-center gap-1 px-space-xs py-0.5 rounded-full bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-all" data-pol="+0.52 Feature" data-tag-target="" data-term="audio scrubbing" data-vol="380">
<span className="font-body-sm text-body-sm">audio scrubbing</span>
<span className="font-mono-metric text-label-caps text-outline">380</span>
</div>
</div>
<!-- Quick Dynamic Inspector Floating Banner -->
<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm bg-surface-container-high px-space-md py-space-sm rounded-xl">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-lg bg-surface-bright flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">high_res</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-space-xs">
<span className="font-body-sm text-body-sm text-on-surface-variant">Selected Inspection:</span>
<span className="font-title-md text-title-md font-semibold text-on-surface" id="selected-term-name">"camera crash"</span>
<span className="font-mono-metric text-mono-metric bg-surface-container-lowest px-space-xs py-0.5 rounded text-tertiary" id="selected-term-mentions">3,120 mentions</span>
<span className="font-mono-metric text-mono-metric text-error font-semibold" id="selected-term-polarity">-0.88 Detractor</span>
</div>
</div>
</div>
<div className="flex items-center gap-space-xs">
<button className="px-space-sm py-1 rounded-lg bg-surface-container-lowest hover:bg-surface-bright text-on-surface font-body-sm text-body-sm transition-colors flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">inbox</span>
<span>Review Inbox Stream</span>
</button>
<button className="px-space-sm py-1 rounded-lg bg-primary-container text-on-primary-container font-body-sm text-body-sm font-semibold transition-colors flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">add_task</span>
<span>Create Auto-Triage Rule</span>
</button>
</div>
</div>
</div>
<!-- Semantic Drift & Trajectory Matrix (Two Column Split) -->
<div className="grid grid-cols-1 lg:grid-cols-2 gap-space-md">
<!-- Left Column: Surging Discussion Phrases (Trailing 14 Days) -->
<div className="bg-surface-container p-space-lg rounded-xl flex flex-col gap-space-md shadow-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="p-1 rounded-lg bg-error-container/30 text-error material-symbols-outlined text-[18px]">trending_up</span>
<div>
<h3 className="font-title-lg text-title-lg text-on-surface font-semibold">Surging Discussion Phrases</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Rapid positive/negative acceleration over trailing 14 days</p>
</div>
</div>
<span className="font-label-caps text-label-caps text-error bg-error-container/20 px-space-xs py-1 rounded-md uppercase font-mono-metric">Anomaly Alert</span>
</div>
<!-- Velocity List -->
<div className="flex flex-col gap-space-xs">
<!-- Surge 1 -->
<div className="p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors flex items-center justify-between gap-space-md group">
<div className="flex items-center gap-space-sm min-w-0">
<div className="w-8 h-8 rounded-lg bg-error-container/30 text-error flex items-center justify-center font-mono-metric font-semibold text-body-sm">
                01
              </div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs truncate">
<span className="font-title-md text-title-md font-medium text-on-surface truncate">"HEIC photo buffer"</span>
<span className="px-space-2xs py-0.5 rounded bg-error-container/30 text-error font-label-caps text-label-caps uppercase">Critical Bug</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant font-mono-metric">310 mentions • iOS 17.4+</span>
</div>
</div>
<div className="flex items-center gap-space-md shrink-0">
<!-- SVG Sparkline -->
<svg className="w-20 h-6 text-error overflow-visible" fill="none" viewBox="0 0 100 30">
<path d="M0 25 L20 22 L40 24 L60 14 L80 16 L100 2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
<circle cx="100" cy="2" fill="currentColor" r="3" />
</svg>
<div className="flex flex-col items-end">
<span className="font-mono-metric text-mono-metric font-bold text-error">+480%</span>
<span className="font-label-caps text-[10px] text-on-surface-variant uppercase">WoW Drift</span>
</div>
<a className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-on-surface-variant hover:text-primary" href="#">
<span className="material-symbols-outlined text-[20px]">open_in_new</span>
</a>
</div>
</div>
<!-- Surge 2 -->
<div className="p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors flex items-center justify-between gap-space-md group">
<div className="flex items-center gap-space-sm min-w-0">
<div className="w-8 h-8 rounded-lg bg-error-container/30 text-error flex items-center justify-center font-mono-metric font-semibold text-body-sm">
                02
              </div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs truncate">
<span className="font-title-md text-title-md font-medium text-on-surface truncate">"Raw export freeze"</span>
<span className="px-space-2xs py-0.5 rounded bg-error-container/30 text-error font-label-caps text-label-caps uppercase">Crash Report</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant font-mono-metric">1,890 mentions • Memory Spike</span>
</div>
</div>
<div className="flex items-center gap-space-md shrink-0">
<svg className="w-20 h-6 text-error overflow-visible" fill="none" viewBox="0 0 100 30">
<path d="M0 26 L25 24 L50 18 L75 12 L100 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
<circle cx="100" cy="4" fill="currentColor" r="3" />
</svg>
<div className="flex flex-col items-end">
<span className="font-mono-metric text-mono-metric font-bold text-error">+210%</span>
<span className="font-label-caps text-[10px] text-on-surface-variant uppercase">WoW Drift</span>
</div>
<a className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-on-surface-variant hover:text-primary" href="#">
<span className="material-symbols-outlined text-[20px]">open_in_new</span>
</a>
</div>
</div>
<!-- Surge 3 -->
<div className="p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors flex items-center justify-between gap-space-md group">
<div className="flex items-center gap-space-sm min-w-0">
<div className="w-8 h-8 rounded-lg bg-surface-container-highest text-primary flex items-center justify-center font-mono-metric font-semibold text-body-sm">
                03
              </div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs truncate">
<span className="font-title-md text-title-md font-medium text-on-surface truncate">"Split screen multitasking"</span>
<span className="px-space-2xs py-0.5 rounded bg-primary-container/20 text-primary font-label-caps text-label-caps uppercase">Wishlist</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant font-mono-metric">1,450 mentions • iPadOS Power Users</span>
</div>
</div>
<div className="flex items-center gap-space-md shrink-0">
<svg className="w-20 h-6 text-primary overflow-visible" fill="none" viewBox="0 0 100 30">
<path d="M0 24 L20 20 L45 22 L70 12 L100 8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
<circle cx="100" cy="8" fill="currentColor" r="3" />
</svg>
<div className="flex flex-col items-end">
<span className="font-mono-metric text-mono-metric font-bold text-primary">+95%</span>
<span className="font-label-caps text-[10px] text-on-surface-variant uppercase">WoW Drift</span>
</div>
<a className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-on-surface-variant hover:text-primary" href="#">
<span className="material-symbols-outlined text-[20px]">open_in_new</span>
</a>
</div>
</div>
<!-- Surge 4 -->
<div className="p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors flex items-center justify-between gap-space-md group">
<div className="flex items-center gap-space-sm min-w-0">
<div className="w-8 h-8 rounded-lg bg-secondary-container/30 text-secondary flex items-center justify-center font-mono-metric font-semibold text-body-sm">
                04
              </div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs truncate">
<span className="font-title-md text-title-md font-medium text-on-surface truncate">"Annual auto-renew fee"</span>
<span className="px-space-2xs py-0.5 rounded bg-secondary-container/30 text-secondary font-label-caps text-label-caps uppercase">Billing Friction</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant font-mono-metric">1,180 mentions • Notification lack</span>
</div>
</div>
<div className="flex items-center gap-space-md shrink-0">
<svg className="w-20 h-6 text-secondary overflow-visible" fill="none" viewBox="0 0 100 30">
<path d="M0 22 L30 18 L55 20 L80 14 L100 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
<circle cx="100" cy="9" fill="currentColor" r="3" />
</svg>
<div className="flex flex-col items-end">
<span className="font-mono-metric text-mono-metric font-bold text-secondary">+64%</span>
<span className="font-label-caps text-[10px] text-on-surface-variant uppercase">WoW Drift</span>
</div>
<a className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-on-surface-variant hover:text-primary" href="#">
<span className="material-symbols-outlined text-[20px]">open_in_new</span>
</a>
</div>
</div>
<!-- Surge 5 -->
<div className="p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors flex items-center justify-between gap-space-md group">
<div className="flex items-center gap-space-sm min-w-0">
<div className="w-8 h-8 rounded-lg bg-tertiary-container/30 text-tertiary flex items-center justify-center font-mono-metric font-semibold text-body-sm">
                05
              </div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs truncate">
<span className="font-title-md text-title-md font-medium text-on-surface truncate">"Fast search indexing"</span>
<span className="px-space-2xs py-0.5 rounded bg-tertiary-container/30 text-tertiary font-label-caps text-label-caps uppercase">Delight</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant font-mono-metric">820 mentions • SQLite FTS5 update</span>
</div>
</div>
<div className="flex items-center gap-space-md shrink-0">
<svg className="w-20 h-6 text-tertiary overflow-visible" fill="none" viewBox="0 0 100 30">
<path d="M0 26 L25 22 L55 19 L80 15 L100 11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
<circle cx="100" cy="11" fill="currentColor" r="3" />
</svg>
<div className="flex flex-col items-end">
<span className="font-mono-metric text-mono-metric font-bold text-tertiary">+42%</span>
<span className="font-label-caps text-[10px] text-on-surface-variant uppercase">WoW Drift</span>
</div>
<a className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-on-surface-variant hover:text-primary" href="#">
<span className="material-symbols-outlined text-[20px]">open_in_new</span>
</a>
</div>
</div>
</div>
</div>
<!-- Right Column: Declining / Resolved Discussion Topics -->
<div className="bg-surface-container p-space-lg rounded-xl flex flex-col gap-space-md shadow-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="p-1 rounded-lg bg-tertiary-container/30 text-tertiary material-symbols-outlined text-[18px]">task_alt</span>
<div>
<h3 className="font-title-lg text-title-lg text-on-surface font-semibold">Resolved &amp; Declining Topics</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Validated churn mitigations following recent build hotfixes</p>
</div>
</div>
<span className="font-label-caps text-label-caps text-tertiary bg-tertiary-container/20 px-space-xs py-1 rounded-md uppercase font-mono-metric">Health Restored</span>
</div>
<!-- Declining Topic Cards -->
<div className="flex flex-col gap-space-xs">
<!-- Decline 1 -->
<div className="p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors flex items-center justify-between gap-space-md">
<div className="flex items-center gap-space-sm min-w-0">
<div className="w-8 h-8 rounded-lg bg-surface-bright text-tertiary flex items-center justify-center font-mono-metric font-semibold text-body-sm">
<span className="material-symbols-outlined text-[18px]">verified</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-title-md text-title-md font-medium text-on-surface truncate">"v2.3 startup lag"</span>
<span className="font-body-sm text-body-sm text-on-surface-variant font-mono-metric">Resolved via Cold Boot cache revamp (v2.3.4)</span>
</div>
</div>
<div className="flex items-center gap-space-md shrink-0">
<svg className="w-20 h-6 text-tertiary overflow-visible" fill="none" viewBox="0 0 100 30">
<path d="M0 2 L25 5 L50 14 L75 22 L100 28" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
<circle cx="100" cy="28" fill="currentColor" r="3" />
</svg>
<div className="flex flex-col items-end">
<span className="font-mono-metric text-mono-metric font-bold text-tertiary">-88%</span>
<span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Mentions Dropped</span>
</div>
</div>
</div>
<!-- Decline 2 -->
<div className="p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors flex items-center justify-between gap-space-md">
<div className="flex items-center gap-space-sm min-w-0">
<div className="w-8 h-8 rounded-lg bg-surface-bright text-tertiary flex items-center justify-center font-mono-metric font-semibold text-body-sm">
<span className="material-symbols-outlined text-[18px]">bluetooth_connected</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-title-md text-title-md font-medium text-on-surface truncate">"bluetooth sync disconnect"</span>
<span className="font-body-sm text-body-sm text-on-surface-variant font-mono-metric">Fixed CoreBluetooth background state timeout</span>
</div>
</div>
<div className="flex items-center gap-space-md shrink-0">
<svg className="w-20 h-6 text-tertiary overflow-visible" fill="none" viewBox="0 0 100 30">
<path d="M0 4 L30 8 L60 19 L85 24 L100 27" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
<circle cx="100" cy="27" fill="currentColor" r="3" />
</svg>
<div className="flex flex-col items-end">
<span className="font-mono-metric text-mono-metric font-bold text-tertiary">-74%</span>
<span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Mentions Dropped</span>
</div>
</div>
</div>
<!-- Decline 3 -->
<div className="p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors flex items-center justify-between gap-space-md">
<div className="flex items-center gap-space-sm min-w-0">
<div className="w-8 h-8 rounded-lg bg-surface-bright text-tertiary flex items-center justify-center font-mono-metric font-semibold text-body-sm">
<span className="material-symbols-outlined text-[18px]">key</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-title-md text-title-md font-medium text-on-surface truncate">"login token expiration"</span>
<span className="font-body-sm text-body-sm text-on-surface-variant font-mono-metric">Silent JWT refresh workflow in release v2.3.8</span>
</div>
</div>
<div className="flex items-center gap-space-md shrink-0">
<svg className="w-20 h-6 text-tertiary overflow-visible" fill="none" viewBox="0 0 100 30">
<path d="M0 6 L30 11 L55 18 L80 24 L100 26" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
<circle cx="100" cy="26" fill="currentColor" r="3" />
</svg>
<div className="flex flex-col items-end">
<span className="font-mono-metric text-mono-metric font-bold text-tertiary">-65%</span>
<span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Mentions Dropped</span>
</div>
</div>
</div>
<!-- Decline 4 -->
<div className="p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors flex items-center justify-between gap-space-md">
<div className="flex items-center gap-space-sm min-w-0">
<div className="w-8 h-8 rounded-lg bg-surface-bright text-tertiary flex items-center justify-center font-mono-metric font-semibold text-body-sm">
<span className="material-symbols-outlined text-[18px]">undo</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-title-md text-title-md font-medium text-on-surface truncate">"missing undo button"</span>
<span className="font-body-sm text-body-sm text-on-surface-variant font-mono-metric">Introduced floating action gesture controller</span>
</div>
</div>
<div className="flex items-center gap-space-md shrink-0">
<svg className="w-20 h-6 text-tertiary overflow-visible" fill="none" viewBox="0 0 100 30">
<path d="M0 8 L35 14 L65 20 L85 23 L100 25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
<circle cx="100" cy="25" fill="currentColor" r="3" />
</svg>
<div className="flex flex-col items-end">
<span className="font-mono-metric text-mono-metric font-bold text-tertiary">-52%</span>
<span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Mentions Dropped</span>
</div>
</div>
</div>
</div>
</div>
</div>
<!-- N-Gram Co-Occurrence & Association Graph Section -->
<div className="bg-surface-container p-space-lg rounded-xl flex flex-col gap-space-md shadow-md">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-xs">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-[20px]">hub</span>
<h2 className="font-title-lg text-title-lg text-on-surface font-medium">N-Gram Co-Occurrence &amp; Vector Association Graph</h2>
</div>
<div className="flex items-center gap-space-xs">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Min Correlation Threshold:</span>
<span className="font-mono-metric text-mono-metric bg-surface-container-high px-space-xs py-0.5 rounded text-on-surface">r ≥ 0.65</span>
</div>
</div>
<!-- 3 Primary Cluster Nodes Layout -->
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-xs">
<!-- Graph Node 1: "camera" -->
<div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-sm shadow-sm relative">
<div className="flex items-center justify-between pb-space-xs">
<div className="flex items-center gap-space-xs">
<span className="w-3 h-3 rounded-full bg-error"></span>
<span className="font-title-md text-title-md font-bold text-on-surface">"camera"</span>
</div>
<span className="font-mono-metric text-mono-metric text-error font-semibold">Hub Root (4.8k)</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
            Primary co-occurrence vectors identified in negative reviews:
          </p>
<div className="flex flex-col gap-1.5 pt-1">
<div className="flex items-center justify-between p-1.5 rounded-lg bg-surface-container-high">
<span className="font-body-sm text-body-sm text-on-surface">crash</span>
<div className="flex items-center gap-space-xs font-mono-metric text-mono-metric">
<span className="text-error font-medium">r = 0.89</span>
<span className="text-on-surface-variant text-[11px]">(3,120)</span>
</div>
</div>
<div className="flex items-center justify-between p-1.5 rounded-lg bg-surface-container-high">
<span className="font-body-sm text-body-sm text-on-surface">black screen</span>
<div className="flex items-center gap-space-xs font-mono-metric text-mono-metric">
<span className="text-error font-medium">r = 0.78</span>
<span className="text-on-surface-variant text-[11px]">(980)</span>
</div>
</div>
<div className="flex items-center justify-between p-1.5 rounded-lg bg-surface-container-high">
<span className="font-body-sm text-body-sm text-on-surface">HEIC</span>
<div className="flex items-center gap-space-xs font-mono-metric text-mono-metric">
<span className="text-secondary font-medium">r = 0.74</span>
<span className="text-on-surface-variant text-[11px]">(840)</span>
</div>
</div>
<div className="flex items-center justify-between p-1.5 rounded-lg bg-surface-container-high">
<span className="font-body-sm text-body-sm text-on-surface">iOS 17.4</span>
<div className="flex items-center gap-space-xs font-mono-metric text-mono-metric">
<span className="text-primary font-medium">r = 0.71</span>
<span className="text-on-surface-variant text-[11px]">(1,410)</span>
</div>
</div>
<div className="flex items-center justify-between p-1.5 rounded-lg bg-surface-container-high">
<span className="font-body-sm text-body-sm text-on-surface">shutter lag</span>
<div className="flex items-center gap-space-xs font-mono-metric text-mono-metric">
<span className="text-secondary-fixed font-medium">r = 0.67</span>
<span className="text-on-surface-variant text-[11px]">(620)</span>
</div>
</div>
</div>
<button className="mt-space-xs w-full py-1.5 rounded-lg bg-surface-container-highest hover:bg-surface-bright text-on-surface font-body-sm text-body-sm font-medium transition-colors flex items-center justify-center gap-1">
<span className="material-symbols-outlined text-[16px] text-error">rule</span>
<span>Create Taxonomy Rule</span>
</button>
</div>
<!-- Graph Node 2: "subscription" -->
<div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-sm shadow-sm relative">
<div className="flex items-center justify-between pb-space-xs">
<div className="flex items-center gap-space-xs">
<span className="w-3 h-3 rounded-full bg-secondary"></span>
<span className="font-title-md text-title-md font-bold text-on-surface">"subscription"</span>
</div>
<span className="font-mono-metric text-mono-metric text-secondary font-semibold">Hub Root (2.9k)</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
            Associated friction terms leading to App Store billing churn:
          </p>
<div className="flex flex-col gap-1.5 pt-1">
<div className="flex items-center justify-between p-1.5 rounded-lg bg-surface-container-high">
<span className="font-body-sm text-body-sm text-on-surface">renewal surprise</span>
<div className="flex items-center gap-space-xs font-mono-metric text-mono-metric">
<span className="text-secondary font-medium">r = 0.91</span>
<span className="text-on-surface-variant text-[11px]">(1,180)</span>
</div>
</div>
<div className="flex items-center justify-between p-1.5 rounded-lg bg-surface-container-high">
<span className="font-body-sm text-body-sm text-on-surface">refund</span>
<div className="flex items-center gap-space-xs font-mono-metric text-mono-metric">
<span className="text-error font-medium">r = 0.84</span>
<span className="text-on-surface-variant text-[11px]">(890)</span>
</div>
</div>
<div className="flex items-center justify-between p-1.5 rounded-lg bg-surface-container-high">
<span className="font-body-sm text-body-sm text-on-surface">tier switch</span>
<div className="flex items-center gap-space-xs font-mono-metric text-mono-metric">
<span className="text-primary font-medium">r = 0.72</span>
<span className="text-on-surface-variant text-[11px]">(510)</span>
</div>
</div>
<div className="flex items-center justify-between p-1.5 rounded-lg bg-surface-container-high">
<span className="font-body-sm text-body-sm text-on-surface">App Store invoice</span>
<div className="flex items-center gap-space-xs font-mono-metric text-mono-metric">
<span className="text-secondary-fixed font-medium">r = 0.69</span>
<span className="text-on-surface-variant text-[11px]">(470)</span>
</div>
</div>
<div className="flex items-center justify-between p-1.5 rounded-lg bg-surface-container-high">
<span className="font-body-sm text-body-sm text-on-surface">cancel link</span>
<div className="flex items-center gap-space-xs font-mono-metric text-mono-metric">
<span className="text-error font-medium">r = 0.66</span>
<span className="text-on-surface-variant text-[11px]">(390)</span>
</div>
</div>
</div>
<button className="mt-space-xs w-full py-1.5 rounded-lg bg-surface-container-highest hover:bg-surface-bright text-on-surface font-body-sm text-body-sm font-medium transition-colors flex items-center justify-center gap-1">
<span className="material-symbols-outlined text-[16px] text-secondary">rule</span>
<span>Create Taxonomy Rule</span>
</button>
</div>
<!-- Graph Node 3: "export" -->
<div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-sm shadow-sm relative">
<div className="flex items-center justify-between pb-space-xs">
<div className="flex items-center gap-space-xs">
<span className="w-3 h-3 rounded-full bg-tertiary"></span>
<span className="font-title-md text-title-md font-bold text-on-surface">"export"</span>
</div>
<span className="font-mono-metric text-mono-metric text-tertiary font-semibold">Hub Root (3.4k)</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
            Primary co-occurrence vectors across high-satisfaction promoters:
          </p>
<div className="flex flex-col gap-1.5 pt-1">
<div className="flex items-center justify-between p-1.5 rounded-lg bg-surface-container-high">
<span className="font-body-sm text-body-sm text-on-surface">flawless</span>
<div className="flex items-center gap-space-xs font-mono-metric text-mono-metric">
<span className="text-tertiary font-medium">r = 0.93</span>
<span className="text-on-surface-variant text-[11px]">(1,820)</span>
</div>
</div>
<div className="flex items-center justify-between p-1.5 rounded-lg bg-surface-container-high">
<span className="font-body-sm text-body-sm text-on-surface">PDF / CSV</span>
<div className="flex items-center gap-space-xs font-mono-metric text-mono-metric">
<span className="text-tertiary font-medium">r = 0.88</span>
<span className="text-on-surface-variant text-[11px]">(1,430)</span>
</div>
</div>
<div className="flex items-center justify-between p-1.5 rounded-lg bg-surface-container-high">
<span className="font-body-sm text-body-sm text-on-surface">speed</span>
<div className="flex items-center gap-space-xs font-mono-metric text-mono-metric">
<span className="text-tertiary font-medium">r = 0.81</span>
<span className="text-on-surface-variant text-[11px]">(990)</span>
</div>
</div>
<div className="flex items-center justify-between p-1.5 rounded-lg bg-surface-container-high">
<span className="font-body-sm text-body-sm text-on-surface">bulk download</span>
<div className="flex items-center gap-space-xs font-mono-metric text-mono-metric">
<span className="text-primary font-medium">r = 0.75</span>
<span className="text-on-surface-variant text-[11px]">(780)</span>
</div>
</div>
<div className="flex items-center justify-between p-1.5 rounded-lg bg-surface-container-high">
<span className="font-body-sm text-body-sm text-on-surface">airdrop integration</span>
<div className="flex items-center gap-space-xs font-mono-metric text-mono-metric">
<span className="text-tertiary-fixed font-medium">r = 0.68</span>
<span className="text-on-surface-variant text-[11px]">(510)</span>
</div>
</div>
</div>
<button className="mt-space-xs w-full py-1.5 rounded-lg bg-surface-container-highest hover:bg-surface-bright text-on-surface font-body-sm text-body-sm font-medium transition-colors flex items-center justify-center gap-1">
<span className="material-symbols-outlined text-[16px] text-tertiary">rule</span>
<span>Create Taxonomy Rule</span>
</button>
</div>
</div>
</div>
<!-- Deep Dive Topic Lexicon Table (Full Enterprise Data Table) -->
<div className="bg-surface-container p-space-lg rounded-xl flex flex-col gap-space-md shadow-md">
<!-- Table Header Bar -->
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
<div>
<h2 className="font-title-lg text-title-lg text-on-surface font-semibold">Indexed Topic Lexicon &amp; N-Gram Registry</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Raw TF-IDF metrics, semantic sentiment ranges, and verbatim quotes</p>
</div>
<div className="flex items-center gap-space-xs">
<!-- Search input -->
<div className="flex items-center bg-surface-container-lowest px-space-sm py-1.5 rounded-xl gap-space-xs">
<span className="material-symbols-outlined text-[18px] text-on-surface-variant">search</span>
<input className="bg-transparent text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none w-48 lg:w-64" placeholder="Search n-gram or taxonomy..." type="text"/>
</div>
<button className="p-1.5 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface transition-colors">
<span className="material-symbols-outlined text-[20px]">view_column</span>
</button>
</div>
</div>
<!-- Data Table Container -->
<div className="w-full overflow-x-auto rounded-xl bg-surface-container-lowest shadow-inner">
<table className="w-full text-left font-body-sm text-body-sm">
<thead className="bg-surface-container-high text-on-surface-variant font-label-caps text-label-caps uppercase">
<tr>
<th className="py-space-sm px-space-md">Term / N-Gram</th>
<th className="py-space-sm px-space-md">Length</th>
<th className="py-space-sm px-space-md">Volume (30D)</th>
<th className="py-space-sm px-space-md">Net Sentiment</th>
<th className="py-space-sm px-space-md">Taxonomy Cluster</th>
<th className="py-space-sm px-space-md">Trajectory</th>
<th className="py-space-sm px-space-md min-w-[280px]">Sample Verbatim Review</th>
<th className="py-space-sm px-space-md text-right">Quick Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-container-high font-body-md text-body-md">
<!-- Row 1: camera crash -->
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="py-space-sm px-space-md font-semibold text-error flex items-center gap-space-2xs">
<span className="material-symbols-outlined text-[16px]">bug_report</span>
<span>camera crash</span>
</td>
<td className="py-space-sm px-space-md font-mono-metric text-mono-metric text-on-surface-variant">Bi-Gram</td>
<td className="py-space-sm px-space-md font-mono-metric text-mono-metric text-on-surface font-semibold">3,120</td>
<td className="py-space-sm px-space-md">
<div className="flex items-center gap-space-xs">
<div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
<div className="bg-error h-full" style={{"width": "88%"}}></div>
</div>
<span className="font-mono-metric text-mono-metric text-error font-medium">-0.88</span>
</div>
</td>
<td className="py-space-sm px-space-md">
<span className="px-space-xs py-0.5 rounded-full bg-error-container/30 text-error font-label-caps text-label-caps uppercase">Stability &amp; Capture</span>
</td>
<td className="py-space-sm px-space-md font-mono-metric text-mono-metric text-error font-semibold">+14.2%</td>
<td className="py-space-sm px-space-md text-on-surface-variant font-body-sm text-body-sm italic truncate max-w-xs">
                "Every time I flip to ultrawide, the entire camera crashes and loses my frame."
              </td>
<td className="py-space-sm px-space-md text-right">
<div className="flex items-center justify-end gap-space-2xs">
<button className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors" title="View 3,120 Reviews">
<span className="material-symbols-outlined text-[18px]">inbox</span>
</button>
<button className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-tertiary transition-colors" title="Add to Taxonomy">
<span className="material-symbols-outlined text-[18px]">bookmark_add</span>
</button>
<button className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-error transition-colors" title="Mute Term">
<span className="material-symbols-outlined text-[18px]">notifications_off</span>
</button>
</div>
</td>
</tr>
<!-- Row 2: export feature -->
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="py-space-sm px-space-md font-semibold text-tertiary flex items-center gap-space-2xs">
<span className="material-symbols-outlined text-[16px]">thumb_up</span>
<span>export feature</span>
</td>
<td className="py-space-sm px-space-md font-mono-metric text-mono-metric text-on-surface-variant">Bi-Gram</td>
<td className="py-space-sm px-space-md font-mono-metric text-mono-metric text-on-surface font-semibold">1,820</td>
<td className="py-space-sm px-space-md">
<div className="flex items-center gap-space-xs">
<div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
<div className="bg-tertiary h-full" style={{"width": "94%"}}></div>
</div>
<span className="font-mono-metric text-mono-metric text-tertiary font-medium">+0.94</span>
</div>
</td>
<td className="py-space-sm px-space-md">
<span className="px-space-xs py-0.5 rounded-full bg-tertiary-container/30 text-tertiary font-label-caps text-label-caps uppercase">Workflow Productivity</span>
</td>
<td className="py-space-sm px-space-md font-mono-metric text-mono-metric text-tertiary font-semibold">+8.4%</td>
<td className="py-space-sm px-space-md text-on-surface-variant font-body-sm text-body-sm italic truncate max-w-xs">
                "The new bulk export feature cut our editorial team turnaround in half."
              </td>
<td className="py-space-sm px-space-md text-right">
<div className="flex items-center justify-end gap-space-2xs">
<button className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors" title="View Reviews">
<span className="material-symbols-outlined text-[18px]">inbox</span>
</button>
<button className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-tertiary transition-colors" title="Add to Taxonomy">
<span className="material-symbols-outlined text-[18px]">bookmark_add</span>
</button>
<button className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-error transition-colors" title="Mute Term">
<span className="material-symbols-outlined text-[18px]">notifications_off</span>
</button>
</div>
</td>
</tr>
<!-- Row 3: raw export freeze -->
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="py-space-sm px-space-md font-semibold text-secondary flex items-center gap-space-2xs">
<span className="material-symbols-outlined text-[16px]">hourglass_disabled</span>
<span>raw export freeze</span>
</td>
<td className="py-space-sm px-space-md font-mono-metric text-mono-metric text-on-surface-variant">Tri-Gram</td>
<td className="py-space-sm px-space-md font-mono-metric text-mono-metric text-on-surface font-semibold">1,890</td>
<td className="py-space-sm px-space-md">
<div className="flex items-center gap-space-xs">
<div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
<div className="bg-secondary h-full" style={{"width": "65%"}}></div>
</div>
<span className="font-mono-metric text-mono-metric text-secondary font-medium">-0.65</span>
</div>
</td>
<td className="py-space-sm px-space-md">
<span className="px-space-xs py-0.5 rounded-full bg-secondary-container/30 text-secondary font-label-caps text-label-caps uppercase">Memory &amp; Graphics</span>
</td>
<td className="py-space-sm px-space-md font-mono-metric text-mono-metric text-error font-semibold">+210.0%</td>
<td className="py-space-sm px-space-md text-on-surface-variant font-body-sm text-body-sm italic truncate max-w-xs">
                "Exporting 48MP raw files locks the progress wheel at 99%."
              </td>
<td className="py-space-sm px-space-md text-right">
<div className="flex items-center justify-end gap-space-2xs">
<button className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors" title="View Reviews">
<span className="material-symbols-outlined text-[18px]">inbox</span>
</button>
<button className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-tertiary transition-colors" title="Add to Taxonomy">
<span className="material-symbols-outlined text-[18px]">bookmark_add</span>
</button>
<button className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-error transition-colors" title="Mute Term">
<span className="material-symbols-outlined text-[18px]">notifications_off</span>
</button>
</div>
</td>
</tr>
<!-- Row 4: ipad landscape support -->
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="py-space-sm px-space-md font-semibold text-primary flex items-center gap-space-2xs">
<span className="material-symbols-outlined text-[16px]">tablet</span>
<span>ipad landscape support</span>
</td>
<td className="py-space-sm px-space-md font-mono-metric text-mono-metric text-on-surface-variant">Tri-Gram</td>
<td className="py-space-sm px-space-md font-mono-metric text-mono-metric text-on-surface font-semibold">1,450</td>
<td className="py-space-sm px-space-md">
<div className="flex items-center gap-space-xs">
<div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
<div className="bg-primary h-full" style={{"width": "65%"}}></div>
</div>
<span className="font-mono-metric text-mono-metric text-primary font-medium">+0.65</span>
</div>
</td>
<td className="py-space-sm px-space-md">
<span className="px-space-xs py-0.5 rounded-full bg-primary-container/20 text-primary font-label-caps text-label-caps uppercase">Hardware Form Factor</span>
</td>
<td className="py-space-sm px-space-md font-mono-metric text-mono-metric text-primary font-semibold">+95.0%</td>
<td className="py-space-sm px-space-md text-on-surface-variant font-body-sm text-body-sm italic truncate max-w-xs">
                "Please add true split view in landscape mode for iPad Pro keyboard users."
              </td>
<td className="py-space-sm px-space-md text-right">
<div className="flex items-center justify-end gap-space-2xs">
<button className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors" title="View Reviews">
<span className="material-symbols-outlined text-[18px]">inbox</span>
</button>
<button className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-tertiary transition-colors" title="Add to Taxonomy">
<span className="material-symbols-outlined text-[18px]">bookmark_add</span>
</button>
<button className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-error transition-colors" title="Mute Term">
<span className="material-symbols-outlined text-[18px]">notifications_off</span>
</button>
</div>
</td>
</tr>
<!-- Row 5: annual auto-renew fee -->
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="py-space-sm px-space-md font-semibold text-secondary-fixed flex items-center gap-space-2xs">
<span className="material-symbols-outlined text-[16px]">price_change</span>
<span>annual auto-renew fee</span>
</td>
<td className="py-space-sm px-space-md font-mono-metric text-mono-metric text-on-surface-variant">Tri-Gram</td>
<td className="py-space-sm px-space-md font-mono-metric text-mono-metric text-on-surface font-semibold">1,180</td>
<td className="py-space-sm px-space-md">
<div className="flex items-center gap-space-xs">
<div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
<div className="bg-error h-full" style={{"width": "92%"}}></div>
</div>
<span className="font-mono-metric text-mono-metric text-error font-medium">-0.92</span>
</div>
</td>
<td className="py-space-sm px-space-md">
<span className="px-space-xs py-0.5 rounded-full bg-secondary-container/20 text-secondary font-label-caps text-label-caps uppercase">Monetization &amp; Plans</span>
</td>
<td className="py-space-sm px-space-md font-mono-metric text-mono-metric text-error font-semibold">+64.0%</td>
<td className="py-space-sm px-space-md text-on-surface-variant font-body-sm text-body-sm italic truncate max-w-xs">
                "Charged $89 without a 3-day notification warning before trial expired."
              </td>
<td className="py-space-sm px-space-md text-right">
<div className="flex items-center justify-end gap-space-2xs">
<button className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors" title="View Reviews">
<span className="material-symbols-outlined text-[18px]">inbox</span>
</button>
<button className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-tertiary transition-colors" title="Add to Taxonomy">
<span className="material-symbols-outlined text-[18px]">bookmark_add</span>
</button>
<button className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-error transition-colors" title="Mute Term">
<span className="material-symbols-outlined text-[18px]">notifications_off</span>
</button>
</div>
</td>
</tr>
<!-- Row 6: HEIC photo buffer -->
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="py-space-sm px-space-md font-semibold text-secondary-fixed-dim flex items-center gap-space-2xs">
<span className="material-symbols-outlined text-[16px] text-secondary">memory</span>
<span>HEIC photo buffer</span>
</td>
<td className="py-space-sm px-space-md font-mono-metric text-mono-metric text-on-surface-variant">Tri-Gram</td>
<td className="py-space-sm px-space-md font-mono-metric text-mono-metric text-on-surface font-semibold">310</td>
<td className="py-space-sm px-space-md">
<div className="flex items-center gap-space-xs">
<div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
<div className="bg-error h-full" style={{"width": "81%"}}></div>
</div>
<span className="font-mono-metric text-mono-metric text-error font-medium">-0.81</span>
</div>
</td>
<td className="py-space-sm px-space-md">
<span className="px-space-xs py-0.5 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-caps text-label-caps uppercase">Crash Telemetry</span>
</td>
<td className="py-space-sm px-space-md font-mono-metric text-mono-metric text-error font-semibold">+480.0%</td>
<td className="py-space-sm px-space-md text-on-surface-variant font-body-sm text-body-sm italic truncate max-w-xs">
                "App dumps memory with HEIC burst shots on iPhone 15 Pro Max."
              </td>
<td className="py-space-sm px-space-md text-right">
<div className="flex items-center justify-end gap-space-2xs">
<button className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors" title="View Reviews">
<span className="material-symbols-outlined text-[18px]">inbox</span>
</button>
<button className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-tertiary transition-colors" title="Add to Taxonomy">
<span className="material-symbols-outlined text-[18px]">bookmark_add</span>
</button>
<button className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-error transition-colors" title="Mute Term">
<span className="material-symbols-outlined text-[18px]">notifications_off</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Pagination & Lexicon Meta Footer -->
<div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm pt-space-xs text-on-surface-variant font-body-sm text-body-sm">
<div className="flex items-center gap-space-xs font-mono-metric text-mono-metric">
<span>Showing 1-6 of 1,428 extracted terms</span>
<span>•</span>
<span className="text-tertiary">Threshold: Frequency ≥ 50</span>
</div>
<div className="flex items-center gap-space-2xs">
<button className="px-space-sm py-1 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-mono-metric text-mono-metric transition-colors disabled:opacity-40" disabled="">
            ← Prev
          </button>
<span className="px-space-sm py-1 rounded-lg bg-primary-container text-on-primary-container font-mono-metric text-mono-metric font-semibold">
            1
          </span>
<button className="px-space-sm py-1 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-mono-metric text-mono-metric transition-colors">
            2
          </button>
<button className="px-space-sm py-1 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-mono-metric text-mono-metric transition-colors">
            3
          </button>
<span className="px-1 text-outline">...</span>
<button className="px-space-sm py-1 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-mono-metric text-mono-metric transition-colors">
            142
          </button>
<button className="px-space-sm py-1 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-mono-metric text-mono-metric transition-colors">
            Next →
          </button>
</div>
</div>
</div>
</div>
</div></main></div>
    </>
  );
}
