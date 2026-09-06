import React from 'react';

export default function ReviewsInbox() {
  return (
    <>
      <aside className="fixed left-0 top-0 h-full w-sidebar-w bg-surface-container-lowest/90 backdrop-blur-xl z-50 flex flex-col justify-between py-space-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="flex flex-col gap-space-md"><div className="px-space-md flex items-center justify-between"><div className="flex items-center gap-space-xs"><div className="w-8 h-8 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container font-title-lg text-title-lg"><span className="material-symbols-outlined text-[18px]">psychology</span></div><div className="flex flex-col"><span className="font-title-md text-title-md font-semibold text-on-surface tracking-tight">Insights Copilot</span><span className="font-label-caps text-label-caps text-on-surface-variant">v2.4 Enterprise</span></div></div></div><div className="px-space-md"><button className="w-full flex items-center justify-between px-space-sm py-space-xs rounded-xl bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors"><div className="flex items-center gap-space-xs overflow-hidden"><span className="material-symbols-outlined text-[18px] text-tertiary">layers</span><span className="font-body-sm text-body-sm font-medium text-on-surface truncate">Acme Mobile App</span></div><span className="material-symbols-outlined text-[16px] text-on-surface-variant">unfold_more</span></button></div><nav className="flex flex-col gap-space-2xs px-space-sm" data-active-classes="bg-primary-container text-on-primary-container font-semibold rounded-xl"><a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="dashboard" href="#"><span className="material-symbols-outlined text-[20px]">grid_view</span><span className="font-body-md text-body-md">Dashboard</span></a><a aria-current="page" className="flex items-center justify-between px-space-sm py-space-xs transition-colors bg-primary-container text-on-primary-container font-semibold rounded-xl" data-path="reviews-inbox" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px]">inbox</span><span className="font-body-md text-body-md">Reviews Inbox</span></div><span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-mono-metric text-mono-metric">24</span></a><a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="analytics" href="#"><span className="material-symbols-outlined text-[20px]">monitoring</span><span className="font-body-md text-body-md">Analytics</span></a><a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="categories" href="#"><span className="material-symbols-outlined text-[20px]">category</span><span className="font-body-md text-body-md">Categories</span></a><a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="word-cloud" href="#"><span className="material-symbols-outlined text-[20px]">cloud</span><span className="font-body-md text-body-md">Word Cloud</span></a><a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="ideation" href="#"><span className="material-symbols-outlined text-[20px]">lightbulb</span><span className="font-body-md text-body-md">Ideation</span></a><a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="reporting" href="#"><span className="material-symbols-outlined text-[20px]">description</span><span className="font-body-md text-body-md">Reporting</span></a><a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="settings" href="#"><span className="material-symbols-outlined text-[20px]">settings</span><span className="font-body-md text-body-md">Settings</span></a></nav></div><div className="px-space-md pt-space-sm"><div className="p-space-xs rounded-xl bg-surface-container-low flex items-center justify-between"><div className="flex items-center gap-space-xs overflow-hidden"><div className="relative"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div><span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-tertiary-container ring-2 ring-surface-container-low"></span></div><div className="flex flex-col overflow-hidden"><span className="font-body-sm text-body-sm font-medium text-on-surface truncate">Dev Lead</span><span className="font-label-caps text-label-caps text-tertiary truncate">Online</span></div></div><button className="text-on-surface-variant hover:text-on-surface p-space-2xs"><span className="material-symbols-outlined text-[18px]">more_vert</span></button></div></div></aside><div className="pl-sidebar-w"><header className="fixed top-0 left-sidebar-w right-0 h-16 bg-surface-container-lowest/80 backdrop-blur-xl z-40 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 w-full px-space-lg flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-md"><div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant"><span className="material-symbols-outlined text-[16px]">home</span><span>/</span><span className="text-on-surface font-medium">Workspace</span></div><div className="h-4 w-px bg-surface-container-highest"></div><div className="flex items-center gap-space-2xs"><span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span><span className="font-mono-metric text-mono-metric text-on-surface-variant">Synced 4m ago</span></div></div><div className="flex items-center gap-space-sm"><div className="flex items-center bg-surface-container-low p-1 rounded-xl"><button className="px-space-xs py-1 rounded-lg bg-surface-container-high text-on-surface font-body-sm text-body-sm font-medium transition-colors">All Platforms</button><button className="px-space-xs py-1 rounded-lg text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm transition-colors">iOS</button><button className="px-space-xs py-1 rounded-lg text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm transition-colors">Android</button></div><div className="flex items-center bg-surface-container-low px-space-sm py-1.5 rounded-xl gap-space-xs text-on-surface-variant hover:text-on-surface cursor-pointer"><span className="material-symbols-outlined text-[16px]">calendar_today</span><span className="font-body-sm text-body-sm">Last 30 Days</span><span className="material-symbols-outlined text-[16px]">expand_more</span></div><button className="flex items-center gap-space-2xs px-space-sm py-1.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary-container font-body-sm text-body-sm font-semibold transition-all shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><span className="material-symbols-outlined text-[16px]">sync</span><span>Refresh Feeds</span></button><div className="h-4 w-px bg-surface-container-highest"></div><button className="p-space-2xs text-on-surface-variant hover:text-on-surface relative rounded-lg hover:bg-surface-container-high transition-colors"><span className="material-symbols-outlined text-[20px]">notifications</span><span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-tertiary-container"></span></button><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main className="w-full pt-16 bg-surface min-h-screen"><div className="flex flex-col w-full">
{/* Top Ambient Glow Field */}
<div className="relative w-full overflow-hidden">
<div className="absolute -top-24 left-1/4 w-[36rem] h-48 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
<div className="absolute -top-28 right-1/4 w-[28rem] h-44 bg-tertiary-container/10 rounded-full blur-3xl pointer-events-none"></div>
{/* Page Header & Metrics Strip */}
<div className="px-space-lg py-space-md flex flex-col gap-space-md">
{/* Title Row */}
<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-sm">
<div className="flex flex-col gap-space-2xs">
<div className="flex items-center gap-space-xs">
<span className="font-display-sm text-display-sm text-on-surface tracking-tight font-semibold">Reviews Inbox</span>
<span className="px-space-xs py-0.5 rounded-full bg-surface-container-high text-tertiary font-mono-metric text-mono-metric uppercase tracking-widest flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
              Live Feed
            </span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
            Live multi-platform customer feedback stream with automated neural triage, cluster taxonomy, and instant response synthesizing.
          </p>
</div>
<div className="flex items-center gap-space-xs shrink-0 flex-wrap">
<button className="flex items-center gap-space-xs px-space-sm py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-body-sm text-body-sm transition-all shadow-sm" id="btn-bulk-classify">
<span className="material-symbols-outlined text-[16px] text-tertiary">auto_fix_high</span>
<span>Bulk AI Classify</span>
</button>
<button className="flex items-center gap-space-xs px-space-sm py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-body-sm text-body-sm transition-all shadow-sm">
<span className="material-symbols-outlined text-[16px] text-on-surface-variant">download</span>
<span>Export CSV</span>
</button>
<button className="flex items-center gap-space-xs px-space-sm py-2 rounded-xl bg-primary-container text-on-primary-container font-body-sm text-body-sm font-semibold hover:bg-primary transition-all shadow-md">
<span className="material-symbols-outlined text-[16px]">tune</span>
<span>Filter Presets</span>
</button>
</div>
</div>
{/* KPI Stats Banner */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm">
{/* KPI 1 */}
<div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between shadow-sm">
<div className="flex flex-col gap-0.5">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Total Synced</span>
<span className="font-mono-metric text-title-lg text-on-surface font-bold">24,648</span>
<span className="font-body-sm text-body-sm text-tertiary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">arrow_upward</span>+1,240 this week
            </span>
</div>
<div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">sync_alt</span>
</div>
</div>
{/* KPI 2 */}
<div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between shadow-sm">
<div className="flex flex-col gap-0.5">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Unread / Pending</span>
<span className="font-mono-metric text-title-lg text-secondary-fixed-dim font-bold">142</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">32 waiting on drafts</span>
</div>
<div className="w-10 h-10 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[20px]">mark_email_unread</span>
</div>
</div>
{/* KPI 3 */}
<div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between shadow-sm">
<div className="flex flex-col gap-0.5">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Critical Alerts (1★)</span>
<span className="font-mono-metric text-title-lg text-error font-bold">18</span>
<span className="font-body-sm text-body-sm text-error flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">priority_high</span>Requires triage &lt; 2h
            </span>
</div>
<div className="w-10 h-10 rounded-xl bg-error-container/40 flex items-center justify-center text-error">
<span className="material-symbols-outlined text-[20px]">warning</span>
</div>
</div>
{/* KPI 4 */}
<div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between shadow-sm">
<div className="flex flex-col gap-0.5">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Avg Response Time</span>
<span className="font-mono-metric text-title-lg text-on-surface font-bold">4.2 hrs</span>
<span className="font-body-sm text-body-sm text-tertiary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">trending_down</span>-1.8 hrs vs SLA
            </span>
</div>
<div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined text-[20px]">speed</span>
</div>
</div>
</div>
</div>
</div>
{/* Search & Filter Ribbon */}
<div className="px-space-lg pb-space-xs flex flex-col gap-space-xs">
<div className="p-space-xs rounded-xl bg-surface-container-low flex flex-col xl:flex-row gap-space-xs items-stretch xl:items-center shadow-sm">
{/* Search Box */}
<div className="relative flex-1">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant">search</span>
<input className="w-full pl-9 pr-14 py-2 bg-surface-container rounded-lg text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm outline-none transition-all" id="reviews-search-input" placeholder="Search by keyword, user ID, or review text..." type="text"/>
<kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-mono-metric text-[10px]">⌘K</kbd>
</div>
{/* Filters Row */}
<div className="flex items-center gap-space-2xs flex-wrap">
{/* Platform */}
<div className="relative">
<select className="appearance-none bg-surface-container hover:bg-surface-container-high text-on-surface font-body-sm text-body-sm pl-2.5 pr-7 py-2 rounded-lg outline-none cursor-pointer">
<option>All Platforms</option>
<option>Apple App Store</option>
<option>Google Play Store</option>
</select>
<span className="material-symbols-outlined pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[16px] text-on-surface-variant">expand_more</span>
</div>
{/* Version */}
<div className="relative">
<select className="appearance-none bg-surface-container hover:bg-surface-container-high text-on-surface font-body-sm text-body-sm pl-2.5 pr-7 py-2 rounded-lg outline-none cursor-pointer">
<option>v2.4.0 (Latest)</option>
<option>v2.3.9</option>
<option>v2.3.8</option>
<option>All Versions</option>
</select>
<span className="material-symbols-outlined pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[16px] text-on-surface-variant">expand_more</span>
</div>
{/* Sentiment */}
<div className="relative">
<select className="appearance-none bg-surface-container hover:bg-surface-container-high text-on-surface font-body-sm text-body-sm pl-2.5 pr-7 py-2 rounded-lg outline-none cursor-pointer">
<option>All Sentiments</option>
<option>Positive</option>
<option>Neutral</option>
<option>Negative</option>
<option>Mixed</option>
</select>
<span className="material-symbols-outlined pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[16px] text-on-surface-variant">expand_more</span>
</div>
{/* Star Rating */}
<div className="relative">
<select className="appearance-none bg-surface-container hover:bg-surface-container-high text-on-surface font-body-sm text-body-sm pl-2.5 pr-7 py-2 rounded-lg outline-none cursor-pointer">
<option>All Stars</option>
<option>5 Stars</option>
<option>4 Stars</option>
<option>3 Stars</option>
<option>2 Stars</option>
<option>1 Star</option>
</select>
<span className="material-symbols-outlined pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[16px] text-on-surface-variant">expand_more</span>
</div>
{/* Tags */}
<div className="relative">
<select className="appearance-none bg-surface-container hover:bg-surface-container-high text-on-surface font-body-sm text-body-sm pl-2.5 pr-7 py-2 rounded-lg outline-none cursor-pointer">
<option>All Tags</option>
<option>Crash / Bug</option>
<option>Feature Request</option>
<option>Billing &amp; Subscriptions</option>
<option>UX &amp; Usability</option>
<option>Performance</option>
</select>
<span className="material-symbols-outlined pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[16px] text-on-surface-variant">expand_more</span>
</div>
{/* Status */}
<div className="relative">
<select className="appearance-none bg-surface-container hover:bg-surface-container-high text-on-surface font-body-sm text-body-sm pl-2.5 pr-7 py-2 rounded-lg outline-none cursor-pointer">
<option>Status: Unread</option>
<option>Status: Replied</option>
<option>Status: Flagged</option>
<option>Status: Archived</option>
</select>
<span className="material-symbols-outlined pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[16px] text-on-surface-variant">expand_more</span>
</div>
<button className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors" title="Reset Filters">
<span className="material-symbols-outlined text-[18px]">restart_alt</span>
</button>
</div>
</div>
{/* Active Selection & Bulk Action Bar */}
<div className="px-space-md py-space-xs rounded-xl bg-surface-container-high flex flex-wrap items-center justify-between gap-space-sm shadow-md transition-all" id="bulk-action-bar">
<div className="flex items-center gap-space-sm">
<label className="inline-flex items-center gap-space-xs cursor-pointer">
<input className="w-4 h-4 rounded bg-surface-container-lowest text-primary accent-primary" id="check-select-all" type="checkbox"/>
<span className="font-label-caps text-label-caps text-on-surface font-bold">142 reviews selected</span>
</label>
<span className="text-on-surface-variant font-mono-metric text-[12px] hidden sm:inline">| Applied scope: Filtered View</span>
</div>
<div className="flex items-center gap-space-2xs flex-wrap">
<button className="flex items-center gap-1.5 px-space-xs py-1 rounded-lg bg-surface-container hover:bg-surface-bright text-on-surface font-body-sm text-body-sm transition-colors">
<span className="material-symbols-outlined text-[16px] text-tertiary">done_all</span>
<span>Mark as Reviewed</span>
</button>
<button className="flex items-center gap-1.5 px-space-xs py-1 rounded-lg bg-primary-container hover:bg-primary text-on-primary-container font-body-sm text-body-sm font-semibold transition-colors">
<span className="material-symbols-outlined text-[16px]">smart_toy</span>
<span>Assign AI Response Draft</span>
</button>
<button className="flex items-center gap-1.5 px-space-xs py-1 rounded-lg bg-surface-container hover:bg-surface-bright text-on-surface font-body-sm text-body-sm transition-colors">
<span className="material-symbols-outlined text-[16px] text-secondary">label</span>
<span>Add Tag</span>
</button>
<button className="flex items-center gap-1.5 px-space-xs py-1 rounded-lg bg-surface-container hover:bg-surface-bright text-on-surface font-body-sm text-body-sm transition-colors">
<span className="material-symbols-outlined text-[16px] text-primary">bug_report</span>
<span>Escalate to Jira</span>
</button>
<button className="p-1 rounded-lg bg-surface-container hover:bg-error/20 text-on-surface-variant hover:text-error transition-colors" title="Delete or Flag as Spam">
<span className="material-symbols-outlined text-[18px]">delete</span>
</button>
</div>
</div>
</div>
{/* Main Data Table Container */}
<div className="px-space-lg py-space-xs">
<div className="w-full rounded-xl bg-surface-container-lowest overflow-hidden shadow-lg flex flex-col">
{/* Table Header */}
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low text-on-surface-variant font-label-caps text-label-caps uppercase tracking-wider">
<th className="py-3 px-space-sm w-10 text-center">
<input className="w-3.5 h-3.5 rounded bg-surface-container-lowest accent-primary" type="checkbox"/>
</th>
<th className="py-3 px-space-sm min-w-[180px]">Reviewer &amp; Platform</th>
<th className="py-3 px-space-sm min-w-[140px]">Rating / Sentiment</th>
<th className="py-3 px-space-sm min-w-[360px]">Feedback &amp; Content Insights</th>
<th className="py-3 px-space-sm min-w-[120px]">Version / Date</th>
<th className="py-3 px-space-sm min-w-[170px]">AI Taxonomy &amp; Cluster</th>
<th className="py-3 px-space-sm min-w-[130px]">Triage Status</th>
<th className="py-3 px-space-sm text-right min-w-[130px]">Quick Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-container font-body-sm text-body-sm text-on-surface">
{/* ROW 1: Alex K. (Critical Crash) - ACTIVE / SELECTED ITEM */}
<tr className="bg-surface-container-high/40 hover:bg-surface-container-high transition-colors group cursor-pointer" onclick="openCopilotDrawer('Alex K.', 'Crash on RAW upload', 'Frequent crashes on iOS 17.4 when uploading large raw files. Please patch ASAP.', 'iOS 17.4', 'v2.4.0')">
<td className="py-3.5 px-space-sm text-center" onclick="event.stopPropagation()">
<input checked="" className="w-3.5 h-3.5 rounded bg-surface-container-lowest accent-primary" type="checkbox"/>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex items-center gap-space-xs">
<div className="w-7 h-7 rounded-full bg-error-container text-error flex items-center justify-center font-bold text-body-sm">
                    AK
                  </div>
<div className="flex flex-col">
<span className="font-medium text-on-surface">Alex K.</span>
<span className="font-label-caps text-[10px] text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[13px] text-on-surface">phone_iphone</span>
                      App Store · US
                    </span>
</div>
</div>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex flex-col gap-1">
<div className="flex text-error" title="1 out of 5 stars">
<span className="material-symbols-outlined text-[15px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[15px] opacity-20">star</span>
<span className="material-symbols-outlined text-[15px] opacity-20">star</span>
<span className="material-symbols-outlined text-[15px] opacity-20">star</span>
<span className="material-symbols-outlined text-[15px] opacity-20">star</span>
</div>
<span className="inline-flex items-center gap-1 font-label-caps text-[10px] text-error font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
                    Severe Negative
                  </span>
</div>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex flex-col gap-0.5 max-w-xl">
<span className="font-title-md text-[13px] font-semibold text-on-surface">
                    App crash loop with RAW camera assets
                  </span>
<p className="text-on-surface-variant line-clamp-2">
                    "Frequent crashes on <mark className="bg-error/20 text-error px-1 rounded">iOS 17.4</mark> when uploading <mark className="bg-error/20 text-error px-1 rounded">large raw files</mark>. Please patch ASAP. Completely broken for client shoots."
                  </p>
<div className="flex items-center gap-space-xs mt-1">
<span className="px-1.5 py-0.5 rounded bg-error/15 text-error font-mono-metric text-[10px] uppercase font-bold tracking-wider">#Crash</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-mono-metric text-[10px]">#MemoryLeak</span>
<span className="px-1.5 py-0.5 rounded bg-primary-container/20 text-primary font-mono-metric text-[10px] flex items-center gap-0.5">
<span className="material-symbols-outlined text-[11px]">bolt</span>AI Draft Ready
                    </span>
</div>
</div>
</td>
<td className="py-3.5 px-space-sm font-mono-metric text-mono-metric text-on-surface-variant">
<div className="flex flex-col">
<span className="text-on-surface font-semibold">v2.4.0 (b490)</span>
<span className="text-[11px]">14 mins ago</span>
</div>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex flex-col gap-1">
<span className="px-2 py-0.5 rounded bg-surface-container text-tertiary font-body-sm text-[11px] font-medium w-fit">
                    Stability · Upload Pipeline
                  </span>
<span className="font-label-caps text-[10px] text-on-surface-variant">Cluster: #ERR-RAW-408</span>
</div>
</td>
<td className="py-3.5 px-space-sm">
<span className="px-2 py-1 rounded-full bg-error-container/30 text-error font-mono-metric text-[10px] font-bold uppercase inline-flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                  Needs Reply
                </span>
</td>
<td className="py-3.5 px-space-sm text-right" onclick="event.stopPropagation()">
<div className="flex items-center justify-end gap-1">
<button className="p-1.5 rounded-lg bg-primary-container text-on-primary-container hover:bg-primary transition-colors" title="Quick Copilot Reply">
<span className="material-symbols-outlined text-[16px]">reply</span>
</button>
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-bright text-on-surface-variant hover:text-on-surface transition-colors" title="Escalate Jira">
<span className="material-symbols-outlined text-[16px]">rocket_launch</span>
</button>
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-bright text-on-surface-variant hover:text-on-surface transition-colors">
<span className="material-symbols-outlined text-[16px]">more_vert</span>
</button>
</div>
</td>
</tr>
{/* ROW 2: Sarah M. (Delight / 5 Stars) */}
<tr className="hover:bg-surface-container transition-colors group cursor-pointer" onclick="openCopilotDrawer('Sarah M.', 'Export speed delight', 'The new export feature saved our team hours of manual reporting. Flawless update!', 'iOS 17.3', 'v2.4.0')">
<td className="py-3.5 px-space-sm text-center" onclick="event.stopPropagation()">
<input className="w-3.5 h-3.5 rounded bg-surface-container-lowest accent-primary" type="checkbox"/>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex items-center gap-space-xs">
<div className="w-7 h-7 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-bold text-body-sm">
                    SM
                  </div>
<div className="flex flex-col">
<span className="font-medium text-on-surface">Sarah M.</span>
<span className="font-label-caps text-[10px] text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[13px] text-on-surface">phone_iphone</span>
                      App Store · UK
                    </span>
</div>
</div>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex flex-col gap-1">
<div className="flex text-tertiary" title="5 out of 5 stars">
<span className="material-symbols-outlined text-[15px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[15px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[15px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[15px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[15px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
</div>
<span className="inline-flex items-center gap-1 font-label-caps text-[10px] text-tertiary font-semibold">
                    High Delight (+0.94)
                  </span>
</div>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex flex-col gap-0.5 max-w-xl">
<span className="font-title-md text-[13px] font-semibold text-on-surface">
                    Flawless update - reporting workflow transformed
                  </span>
<p className="text-on-surface-variant line-clamp-2">
                    "The new <mark className="bg-tertiary/20 text-tertiary px-1 rounded">export feature</mark> saved our team hours of manual reporting. Flawless update! Loving the real-time CSV generators."
                  </p>
<div className="flex items-center gap-space-xs mt-1">
<span className="px-1.5 py-0.5 rounded bg-tertiary/15 text-tertiary font-mono-metric text-[10px] uppercase font-bold">#FeaturePraise</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-mono-metric text-[10px]">#UXVelocity</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-sm font-mono-metric text-mono-metric text-on-surface-variant">
<div className="flex flex-col">
<span className="text-on-surface font-semibold">v2.4.0</span>
<span className="text-[11px]">1 hr ago</span>
</div>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex flex-col gap-1">
<span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-body-sm text-[11px] font-medium w-fit">
                    Reporting &amp; Data Out
                  </span>
<span className="font-label-caps text-[10px] text-on-surface-variant">Cluster: #EXPO-PRAISE</span>
</div>
</td>
<td className="py-3.5 px-space-sm">
<span className="px-2 py-1 rounded-full bg-surface-container text-tertiary font-mono-metric text-[10px] font-bold uppercase inline-flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                  Reviewed
                </span>
</td>
<td className="py-3.5 px-space-sm text-right" onclick="event.stopPropagation()">
<div className="flex items-center justify-end gap-1">
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-bright text-on-surface-variant hover:text-on-surface transition-colors" title="Thank Reviewer">
<span className="material-symbols-outlined text-[16px]">favorite</span>
</button>
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-bright text-on-surface-variant hover:text-on-surface transition-colors">
<span className="material-symbols-outlined text-[16px]">more_vert</span>
</button>
</div>
</td>
</tr>
{/* ROW 3: Daniel R. (Constructive Feature Request) */}
<tr className="hover:bg-surface-container transition-colors group cursor-pointer" onclick="openCopilotDrawer('Daniel R.', 'Keyboard shortcuts inquiry', 'Love the interface fluidity, but really hoping for keyboard shortcuts in the next minor release.', 'Android 14', 'v2.3.9')">
<td className="py-3.5 px-space-sm text-center" onclick="event.stopPropagation()">
<input className="w-3.5 h-3.5 rounded bg-surface-container-lowest accent-primary" type="checkbox"/>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex items-center gap-space-xs">
<div className="w-7 h-7 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center font-bold text-body-sm">
                    DR
                  </div>
<div className="flex flex-col">
<span className="font-medium text-on-surface">Daniel R.</span>
<span className="font-label-caps text-[10px] text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[13px] text-secondary">android</span>
                      Google Play · DE
                    </span>
</div>
</div>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex flex-col gap-1">
<div className="flex text-primary" title="4 out of 5 stars">
<span className="material-symbols-outlined text-[15px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[15px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[15px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[15px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[15px] opacity-20">star</span>
</div>
<span className="inline-flex items-center gap-1 font-label-caps text-[10px] text-primary font-semibold">
                    Positive Constructive
                  </span>
</div>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex flex-col gap-0.5 max-w-xl">
<span className="font-title-md text-[13px] font-semibold text-on-surface">
                    Fluid UI, awaiting hardware keyboard bindings
                  </span>
<p className="text-on-surface-variant line-clamp-2">
                    "Love the interface fluidity, but really hoping for <mark className="bg-primary/20 text-primary px-1 rounded">keyboard shortcuts</mark> in the next minor release when used on tablets."
                  </p>
<div className="flex items-center gap-space-xs mt-1">
<span className="px-1.5 py-0.5 rounded bg-primary-container/20 text-primary font-mono-metric text-[10px] uppercase font-bold">#FeatureRequest</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-mono-metric text-[10px]">#TabletUX</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-sm font-mono-metric text-mono-metric text-on-surface-variant">
<div className="flex flex-col">
<span className="text-on-surface font-semibold">v2.3.9</span>
<span className="text-[11px]">3 hrs ago</span>
</div>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex flex-col gap-1">
<span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-body-sm text-[11px] font-medium w-fit">
                    Platform · Input Methods
                  </span>
<span className="font-label-caps text-[10px] text-on-surface-variant">Cluster: #REQ-HOTKEYS</span>
</div>
</td>
<td className="py-3.5 px-space-sm">
<span className="px-2 py-1 rounded-full bg-surface-container text-on-surface-variant font-mono-metric text-[10px] font-bold uppercase inline-flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant"></span>
                  Pending
                </span>
</td>
<td className="py-3.5 px-space-sm text-right" onclick="event.stopPropagation()">
<div className="flex items-center justify-end gap-1">
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-bright text-on-surface-variant hover:text-on-surface transition-colors" title="Quick Reply">
<span className="material-symbols-outlined text-[16px]">reply</span>
</button>
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-bright text-on-surface-variant hover:text-on-surface transition-colors" title="Push to Backlog">
<span className="material-symbols-outlined text-[16px]">bookmark_add</span>
</button>
</div>
</td>
</tr>
{/* ROW 4: Elena Rostova (Battery Performance issue) */}
<tr className="hover:bg-surface-container transition-colors group cursor-pointer" onclick="openCopilotDrawer('Elena Rostova', 'Battery Drain 5G', 'High battery consumption during background sync over 5G. Drains 25% an hour.', 'Android 14', 'v2.4.0')">
<td className="py-3.5 px-space-sm text-center" onclick="event.stopPropagation()">
<input className="w-3.5 h-3.5 rounded bg-surface-container-lowest accent-primary" type="checkbox"/>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex items-center gap-space-xs">
<div className="w-7 h-7 rounded-full bg-surface-container-high text-secondary flex items-center justify-center font-bold text-body-sm">
                    ER
                  </div>
<div className="flex flex-col">
<span className="font-medium text-on-surface">Elena Rostova</span>
<span className="font-label-caps text-[10px] text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[13px] text-secondary">android</span>
                      Google Play · CA
                    </span>
</div>
</div>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex flex-col gap-1">
<div className="flex text-secondary-container" title="2 out of 5 stars">
<span className="material-symbols-outlined text-[15px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[15px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[15px] opacity-20">star</span>
<span className="material-symbols-outlined text-[15px] opacity-20">star</span>
<span className="material-symbols-outlined text-[15px] opacity-20">star</span>
</div>
<span className="inline-flex items-center gap-1 font-label-caps text-[10px] text-secondary-container font-semibold">
                    Negative / Bug
                  </span>
</div>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex flex-col gap-0.5 max-w-xl">
<span className="font-title-md text-[13px] font-semibold text-on-surface">
                    Extreme battery depletion in standby
                  </span>
<p className="text-on-surface-variant line-clamp-2">
                    "High <mark className="bg-secondary/20 text-secondary px-1 rounded">battery consumption</mark> during <mark className="bg-secondary/20 text-secondary px-1 rounded">background sync over 5G</mark>. Dropped 28% in 90 minutes without screen on."
                  </p>
<div className="flex items-center gap-space-xs mt-1">
<span className="px-1.5 py-0.5 rounded bg-secondary/15 text-secondary font-mono-metric text-[10px] uppercase font-bold">#Performance</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-mono-metric text-[10px]">#BatteryDrain</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-sm font-mono-metric text-mono-metric text-on-surface-variant">
<div className="flex flex-col">
<span className="text-on-surface font-semibold">v2.4.0</span>
<span className="text-[11px]">4 hrs ago</span>
</div>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex flex-col gap-1">
<span className="px-2 py-0.5 rounded bg-surface-container text-secondary font-body-sm text-[11px] font-medium w-fit">
                    Core · Power &amp; Networking
                  </span>
<span className="font-label-caps text-[10px] text-on-surface-variant">Cluster: #SYS-DRAIN-5G</span>
</div>
</td>
<td className="py-3.5 px-space-sm">
<span className="px-2 py-1 rounded-full bg-secondary-container/20 text-on-secondary-container font-mono-metric text-[10px] font-bold uppercase inline-flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Flagged for QA
                </span>
</td>
<td className="py-3.5 px-space-sm text-right" onclick="event.stopPropagation()">
<div className="flex items-center justify-end gap-1">
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-bright text-on-surface-variant hover:text-on-surface transition-colors" title="Create Jira Bug">
<span className="material-symbols-outlined text-[16px]">bug_report</span>
</button>
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-bright text-on-surface-variant hover:text-on-surface transition-colors">
<span className="material-symbols-outlined text-[16px]">more_vert</span>
</button>
</div>
</td>
</tr>
{/* ROW 5: Marcus Vance (Praise / AI Model) */}
<tr className="hover:bg-surface-container transition-colors group cursor-pointer" onclick="openCopilotDrawer('Marcus Vance', 'AI Categorization Delight', 'Best update this year. The AI categorization accuracy is uncanny.', 'iOS 17.4', 'v2.4.0')">
<td className="py-3.5 px-space-sm text-center" onclick="event.stopPropagation()">
<input className="w-3.5 h-3.5 rounded bg-surface-container-lowest accent-primary" type="checkbox"/>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex items-center gap-space-xs">
<div className="w-7 h-7 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-body-sm">
                    MV
                  </div>
<div className="flex flex-col">
<span className="font-medium text-on-surface">Marcus Vance</span>
<span className="font-label-caps text-[10px] text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[13px] text-on-surface">phone_iphone</span>
                      App Store · US
                    </span>
</div>
</div>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex flex-col gap-1">
<div className="flex text-tertiary" title="5 out of 5 stars">
<span className="material-symbols-outlined text-[15px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[15px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[15px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[15px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[15px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
</div>
<span className="inline-flex items-center gap-1 font-label-caps text-[10px] text-tertiary font-semibold">
                    Promoter (+0.98)
                  </span>
</div>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex flex-col gap-0.5 max-w-xl">
<span className="font-title-md text-[13px] font-semibold text-on-surface">
                    Best release this fiscal quarter
                  </span>
<p className="text-on-surface-variant line-clamp-2">
                    "Best update this year. The <mark className="bg-tertiary/20 text-tertiary px-1 rounded">AI categorization accuracy</mark> is uncanny. It tagged hundreds of ambiguous feedback notes in minutes."
                  </p>
<div className="flex items-center gap-space-xs mt-1">
<span className="px-1.5 py-0.5 rounded bg-tertiary/15 text-tertiary font-mono-metric text-[10px] uppercase font-bold">#Praise</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-mono-metric text-[10px]">#NLPQuality</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-sm font-mono-metric text-mono-metric text-on-surface-variant">
<div className="flex flex-col">
<span className="text-on-surface font-semibold">v2.4.0</span>
<span className="text-[11px]">5 hrs ago</span>
</div>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex flex-col gap-1">
<span className="px-2 py-0.5 rounded bg-surface-container text-tertiary font-body-sm text-[11px] font-medium w-fit">
                    Intelligence · Tagging
                  </span>
<span className="font-label-caps text-[10px] text-on-surface-variant">Cluster: #AI-ACCURACY</span>
</div>
</td>
<td className="py-3.5 px-space-sm">
<span className="px-2 py-1 rounded-full bg-surface-container text-tertiary font-mono-metric text-[10px] font-bold uppercase inline-flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                  Reviewed
                </span>
</td>
<td className="py-3.5 px-space-sm text-right" onclick="event.stopPropagation()">
<div className="flex items-center justify-end gap-1">
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-bright text-on-surface-variant hover:text-on-surface transition-colors">
<span className="material-symbols-outlined text-[16px]">more_vert</span>
</button>
</div>
</td>
</tr>
{/* ROW 6: Chloe Bennett (Billing / Urgent P0) */}
<tr className="hover:bg-surface-container transition-colors group cursor-pointer" onclick="openCopilotDrawer('Chloe Bennett', 'Double Charge on Renewal', 'Charged twice during subscription renewal. Support ticket #9921 unanswered.', 'iOS 17.3', 'v2.4.0')">
<td className="py-3.5 px-space-sm text-center" onclick="event.stopPropagation()">
<input className="w-3.5 h-3.5 rounded bg-surface-container-lowest accent-primary" type="checkbox"/>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex items-center gap-space-xs">
<div className="w-7 h-7 rounded-full bg-error-container text-error flex items-center justify-center font-bold text-body-sm">
                    CB
                  </div>
<div className="flex flex-col">
<span className="font-medium text-on-surface">Chloe Bennett</span>
<span className="font-label-caps text-[10px] text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[13px] text-on-surface">phone_iphone</span>
                      App Store · AU
                    </span>
</div>
</div>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex flex-col gap-1">
<div className="flex text-error" title="1 out of 5 stars">
<span className="material-symbols-outlined text-[15px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[15px] opacity-20">star</span>
<span className="material-symbols-outlined text-[15px] opacity-20">star</span>
<span className="material-symbols-outlined text-[15px] opacity-20">star</span>
<span className="material-symbols-outlined text-[15px] opacity-20">star</span>
</div>
<span className="inline-flex items-center gap-1 font-label-caps text-[10px] text-error font-semibold">
                    Churn Risk · Churn-High
                  </span>
</div>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex flex-col gap-0.5 max-w-xl">
<span className="font-title-md text-[13px] font-semibold text-on-surface">
                    Double billed on annual renewal with zero reply
                  </span>
<p className="text-on-surface-variant line-clamp-2">
                    "<mark className="bg-error/20 text-error px-1 rounded">Charged twice</mark> during subscription renewal. Support ticket <span className="underline text-primary">#9921</span> unanswered for 48 hours. Fix immediately."
                  </p>
<div className="flex items-center gap-space-xs mt-1">
<span className="px-1.5 py-0.5 rounded bg-error/15 text-error font-mono-metric text-[10px] uppercase font-bold">#Billing</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-mono-metric text-[10px]">#RevenueCritical</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-sm font-mono-metric text-mono-metric text-on-surface-variant">
<div className="flex flex-col">
<span className="text-on-surface font-semibold">v2.4.0</span>
<span className="text-[11px]">7 hrs ago</span>
</div>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex flex-col gap-1">
<span className="px-2 py-0.5 rounded bg-surface-container text-error font-body-sm text-[11px] font-medium w-fit">
                    Commerce · In-App Subscriptions
                  </span>
<span className="font-label-caps text-[10px] text-on-surface-variant">Cluster: #BILLING-RENEWAL</span>
</div>
</td>
<td className="py-3.5 px-space-sm">
<span className="px-2 py-1 rounded-full bg-error-container/40 text-error font-mono-metric text-[10px] font-bold uppercase inline-flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                  Escalated
                </span>
</td>
<td className="py-3.5 px-space-sm text-right" onclick="event.stopPropagation()">
<div className="flex items-center justify-end gap-1">
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-bright text-on-surface-variant hover:text-on-surface transition-colors" title="Lookup Stripe Invoice">
<span className="material-symbols-outlined text-[16px]">receipt_long</span>
</button>
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-bright text-on-surface-variant hover:text-on-surface transition-colors">
<span className="material-symbols-outlined text-[16px]">more_vert</span>
</button>
</div>
</td>
</tr>
{/* ROW 7: Liam O'Connor (UX Ergonomics) */}
<tr className="hover:bg-surface-container transition-colors group cursor-pointer" onclick="openCopilotDrawer('Liam O\'Connor', 'Navigation ergonomics', 'New navigation tab is harder to reach with one hand on Pixel 8 Pro.', 'Android 14', 'v2.3.8')">
<td className="py-3.5 px-space-sm text-center" onclick="event.stopPropagation()">
<input className="w-3.5 h-3.5 rounded bg-surface-container-lowest accent-primary" type="checkbox"/>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex items-center gap-space-xs">
<div className="w-7 h-7 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center font-bold text-body-sm">
                    LO
                  </div>
<div className="flex flex-col">
<span className="font-medium text-on-surface">Liam O'Connor</span>
<span className="font-label-caps text-[10px] text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[13px] text-secondary">android</span>
                      Google Play · IE
                    </span>
</div>
</div>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex flex-col gap-1">
<div className="flex text-on-surface-variant" title="3 out of 5 stars">
<span className="material-symbols-outlined text-[15px] text-primary" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[15px] text-primary" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[15px] text-primary" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[15px] opacity-20">star</span>
<span className="material-symbols-outlined text-[15px] opacity-20">star</span>
</div>
<span className="inline-flex items-center gap-1 font-label-caps text-[10px] text-on-surface-variant font-semibold">
                    Mixed Neutral
                  </span>
</div>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex flex-col gap-0.5 max-w-xl">
<span className="font-title-md text-[13px] font-semibold text-on-surface">
                    Reachability issue on large display flagships
                  </span>
<p className="text-on-surface-variant line-clamp-2">
                    "New <mark className="bg-surface-variant text-on-surface px-1 rounded">navigation tab</mark> is harder to reach with one hand on Pixel 8 Pro. Preferred the old bottom bar arrangement."
                  </p>
<div className="flex items-center gap-space-xs mt-1">
<span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface font-mono-metric text-[10px] uppercase font-bold">#UXDesign</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-mono-metric text-[10px]">#ThumbZone</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-sm font-mono-metric text-mono-metric text-on-surface-variant">
<div className="flex flex-col">
<span className="text-on-surface font-semibold">v2.3.8</span>
<span className="text-[11px]">8 hrs ago</span>
</div>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex flex-col gap-1">
<span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-body-sm text-[11px] font-medium w-fit">
                    Interface · Navigation
                  </span>
<span className="font-label-caps text-[10px] text-on-surface-variant">Cluster: #UI-REACHABILITY</span>
</div>
</td>
<td className="py-3.5 px-space-sm">
<span className="px-2 py-1 rounded-full bg-primary-container/20 text-primary font-mono-metric text-[10px] font-bold uppercase inline-flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  In Progress
                </span>
</td>
<td className="py-3.5 px-space-sm text-right" onclick="event.stopPropagation()">
<div className="flex items-center justify-end gap-1">
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-bright text-on-surface-variant hover:text-on-surface transition-colors" title="Quick Reply">
<span className="material-symbols-outlined text-[16px]">reply</span>
</button>
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-bright text-on-surface-variant hover:text-on-surface transition-colors">
<span className="material-symbols-outlined text-[16px]">more_vert</span>
</button>
</div>
</td>
</tr>
{/* ROW 8: Priya Patel (Enterprise Standup Integration) */}
<tr className="hover:bg-surface-container transition-colors group cursor-pointer" onclick="openCopilotDrawer('Priya Patel', 'Daily Standup Fit', 'Integrated into our daily standup review triage seamlessly. High productivity boost.', 'iOS 17.4', 'v2.4.0')">
<td className="py-3.5 px-space-sm text-center" onclick="event.stopPropagation()">
<input className="w-3.5 h-3.5 rounded bg-surface-container-lowest accent-primary" type="checkbox"/>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex items-center gap-space-xs">
<div className="w-7 h-7 rounded-full bg-surface-container-high text-tertiary flex items-center justify-center font-bold text-body-sm">
                    PP
                  </div>
<div className="flex flex-col">
<span className="font-medium text-on-surface">Priya Patel</span>
<span className="font-label-caps text-[10px] text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[13px] text-on-surface">phone_iphone</span>
                      App Store · IN
                    </span>
</div>
</div>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex flex-col gap-1">
<div className="flex text-tertiary" title="5 out of 5 stars">
<span className="material-symbols-outlined text-[15px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[15px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[15px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[15px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[15px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
</div>
<span className="inline-flex items-center gap-1 font-label-caps text-[10px] text-tertiary font-semibold">
                    Advocate (+0.96)
                  </span>
</div>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex flex-col gap-0.5 max-w-xl">
<span className="font-title-md text-[13px] font-semibold text-on-surface">
                    Essential tool for cross-functional sprint reviews
                  </span>
<p className="text-on-surface-variant line-clamp-2">
                    "Integrated into our <mark className="bg-tertiary/20 text-tertiary px-1 rounded">daily standup review triage</mark> seamlessly. Our product managers cut backlog grooming in half."
                  </p>
<div className="flex items-center gap-space-xs mt-1">
<span className="px-1.5 py-0.5 rounded bg-tertiary/15 text-tertiary font-mono-metric text-[10px] uppercase font-bold">#Workflow</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-mono-metric text-[10px]">#Enterprise</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-sm font-mono-metric text-mono-metric text-on-surface-variant">
<div className="flex flex-col">
<span className="text-on-surface font-semibold">v2.4.0</span>
<span className="text-[11px]">11 hrs ago</span>
</div>
</td>
<td className="py-3.5 px-space-sm">
<div className="flex flex-col gap-1">
<span className="px-2 py-0.5 rounded bg-surface-container text-tertiary font-body-sm text-[11px] font-medium w-fit">
                    Team · Collaboration
                  </span>
<span className="font-label-caps text-[10px] text-on-surface-variant">Cluster: #STANDUP-TRIAGE</span>
</div>
</td>
<td className="py-3.5 px-space-sm">
<span className="px-2 py-1 rounded-full bg-surface-container text-tertiary font-mono-metric text-[10px] font-bold uppercase inline-flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                  Reviewed
                </span>
</td>
<td className="py-3.5 px-space-sm text-right" onclick="event.stopPropagation()">
<div className="flex items-center justify-end gap-1">
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-bright text-on-surface-variant hover:text-on-surface transition-colors" title="Highlight Case Study">
<span className="material-symbols-outlined text-[16px]">grade</span>
</button>
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-bright text-on-surface-variant hover:text-on-surface transition-colors">
<span className="material-symbols-outlined text-[16px]">more_vert</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
{/* Pagination & Footer Strip */}
<div className="p-space-sm bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-md">
<span className="font-body-sm text-body-sm text-on-surface-variant">
            Showing <strong className="text-on-surface font-mono-metric">1 - 25</strong> of <strong className="text-on-surface font-mono-metric">24,648</strong> customer reviews
          </span>
<div className="flex items-center gap-space-2xs">
<span className="font-body-sm text-body-sm text-on-surface-variant">Rows per page:</span>
<select className="bg-surface-container text-on-surface font-body-sm text-body-sm rounded-lg px-2 py-1 outline-none">
<option>25</option>
<option>50</option>
<option>100</option>
</select>
</div>
</div>
{/* Page Selector Buttons */}
<div className="flex items-center gap-1 font-mono-metric text-mono-metric">
<button className="p-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface disabled:opacity-40 transition-colors" disabled="">
<span className="material-symbols-outlined text-[16px]">chevron_left</span>
</button>
<button className="w-7 h-7 rounded-lg bg-primary-container text-on-primary-container font-bold flex items-center justify-center">1</button>
<button className="w-7 h-7 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors flex items-center justify-center">2</button>
<button className="w-7 h-7 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors flex items-center justify-center">3</button>
<span className="px-1 text-on-surface-variant">...</span>
<button className="px-2 h-7 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors flex items-center justify-center">986</button>
<button className="p-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors">
<span className="material-symbols-outlined text-[16px]">chevron_right</span>
</button>
</div>
</div>
</div>
</div>
{/* Slide-Out / Interactive AI Copilot Quick-Reply Drawer */}
<div className="fixed bottom-4 right-4 max-w-xl w-full z-50 transition-all transform translate-y-0" id="copilot-drawer">
<div className="rounded-xl bg-surface-container-high shadow-2xl p-space-md flex flex-col gap-space-sm backdrop-blur-2xl">
{/* Drawer Header */}
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<div className="w-8 h-8 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">psychology</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-space-2xs">
<span className="font-title-md text-title-md text-on-surface font-semibold" id="drawer-reviewer-name">AI Copilot Quick Reply</span>
<span className="px-1.5 py-0.2 rounded bg-tertiary-container/30 text-tertiary font-mono-metric text-[10px] uppercase font-bold">Empathetic Tone</span>
</div>
<span className="font-label-caps text-label-caps text-on-surface-variant" id="drawer-context">Triage Target: Alex K. (iOS 17.4 · v2.4.0)</span>
</div>
</div>
<div className="flex items-center gap-1">
<button className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors" onclick="minimizeCopilotDrawer()">
<span className="material-symbols-outlined text-[18px]">close</span>
</button>
</div>
</div>
{/* Synthesis Banner */}
<div className="p-space-xs rounded-lg bg-surface-container flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
<span className="material-symbols-outlined text-primary text-[18px]">bolt</span>
<span>Matching root-cause <strong className="text-on-surface font-mono-metric">#ERR-RAW-408</strong> (HEIC/RAW buffer overflow in iOS photo picker).</span>
</div>
{/* AI Draft Textarea */}
<div className="flex flex-col gap-1">
<label className="font-label-caps text-label-caps text-on-surface-variant uppercase flex items-center justify-between">
<span>Drafted Response (Friendly &amp; Empathetic Engineer)</span>
<span className="text-tertiary font-mono-metric text-[11px]">99.2% confidence</span>
</label>
<div className="relative">
<textarea className="w-full bg-surface-container-lowest text-on-surface p-space-sm rounded-lg font-body-sm text-body-sm outline-none resize-none" id="copilot-draft-text" rows="4">Hi Alex, thanks for flagging this. Our iOS engineering team just isolated the memory spike on large RAW image uploads in v2.4.0. We have hotfix v2.4.1 in TestFlight today with the patched memory allocator. We would love to get you direct early access to verify it resolves your client workflow!</textarea>
<div className="absolute bottom-2.5 right-2.5 flex items-center gap-1">
<button className="px-2 py-0.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-mono-metric text-[10px]" title="Re-phrase shorter">Concise</button>
<button className="px-2 py-0.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-mono-metric text-[10px]" title="Re-phrase formal">Formal</button>
</div>
</div>
</div>
{/* Action Footer */}
<div className="flex items-center justify-between gap-space-xs pt-space-2xs flex-wrap">
<div className="flex items-center gap-space-2xs">
<button className="flex items-center gap-1 px-space-xs py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-highest text-on-surface font-body-sm text-body-sm transition-colors" onclick="regenerateDraft()">
<span className="material-symbols-outlined text-[16px] text-tertiary">autorenew</span>
<span>Regenerate Draft</span>
</button>
<button className="flex items-center gap-1 px-space-xs py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-highest text-on-surface font-body-sm text-body-sm transition-colors">
<span className="material-symbols-outlined text-[16px]">edit_note</span>
<span>Edit Manually</span>
</button>
</div>
<button className="flex items-center gap-space-xs px-space-md py-1.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary-container font-body-sm text-body-sm font-semibold shadow-md transition-all" onclick="sendApprovedReply()">
<span className="material-symbols-outlined text-[16px]">send</span>
<span>Approve &amp; Send to Store</span>
</button>
</div>
</div>
</div>
{/* Micro-Interactions Script */}

</div></main></div>
    </>
  );
}

