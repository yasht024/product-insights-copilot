import React from 'react';

export default function Settings() {
  return (
    <>
      
{/* Persistent Sidebar */}
<aside className="fixed left-0 top-0 h-full w-sidebar-w bg-surface-container-lowest/95 border-r border-surface-container-high/40 backdrop-blur-xl z-50 flex flex-col justify-between py-space-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
<div className="flex flex-col gap-space-md">
{/* Workspace Brand */}
<div className="px-space-md flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<div className="w-8 h-8 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container font-title-lg text-title-lg shadow-sm">
<span className="material-symbols-outlined text-[18px]">psychology</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md font-semibold text-on-surface tracking-tight">Insights Copilot</span>
<span className="font-label-caps text-label-caps text-on-surface-variant">v2.4 Enterprise</span>
</div>
</div>
</div>
{/* Workspace Selector */}
<div className="px-space-md">
<button className="w-full flex items-center justify-between px-space-sm py-space-xs rounded-xl bg-surface-container-low hover:bg-surface-container border border-surface-container-highest/40 text-on-surface-variant hover:text-on-surface transition-colors">
<div className="flex items-center gap-space-xs overflow-hidden">
<span className="material-symbols-outlined text-[18px] text-tertiary">layers</span>
<span className="font-body-sm text-body-sm font-medium text-on-surface truncate">Acme Mobile App</span>
</div>
<span className="material-symbols-outlined text-[16px] text-on-surface-variant">unfold_more</span>
</button>
</div>
{/* Navigation Items */}
<nav className="flex flex-col gap-space-2xs px-space-sm">
<a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" href="#">
<span className="material-symbols-outlined text-[20px]">grid_view</span>
<span className="font-body-md text-body-md">Dashboard</span>
</a>
<a className="flex items-center justify-between px-space-sm py-space-xs text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors rounded-xl" href="#">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-[20px]">inbox</span>
<span className="font-body-md text-body-md">Reviews Inbox</span>
</div>
<span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-mono-metric text-mono-metric text-[11px]">24</span>
</a>
<a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" href="#">
<span className="material-symbols-outlined text-[20px]">monitoring</span>
<span className="font-body-md text-body-md">Analytics</span>
</a>
<a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" href="#">
<span className="material-symbols-outlined text-[20px]">category</span>
<span className="font-body-md text-body-md">Categories</span>
</a>
<a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" href="#">
<span className="material-symbols-outlined text-[20px]">cloud</span>
<span className="font-body-md text-body-md">Word Cloud</span>
</a>
<a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" href="#">
<span className="material-symbols-outlined text-[20px]">lightbulb</span>
<span className="font-body-md text-body-md">Ideation</span>
</a>
<a className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" href="#">
<span className="material-symbols-outlined text-[20px]">description</span>
<span className="font-body-md text-body-md">Reporting</span>
</a>
{/* Settings ACTIVE with Indigo Accent */}
<a aria-current="page" className="flex items-center gap-space-sm px-space-sm py-space-xs bg-primary-container text-on-primary-container font-semibold rounded-xl shadow-sm transition-colors" href="#">
<span className="material-symbols-outlined text-[20px]">settings</span>
<span className="font-body-md text-body-md">Settings</span>
</a>
</nav>
</div>
{/* Bottom Profile */}
<div className="px-space-md pt-space-sm border-t border-surface-container-high/40">
<div className="p-space-xs rounded-xl bg-surface-container-low border border-surface-container-highest/30 flex items-center justify-between">
<div className="flex items-center gap-space-xs overflow-hidden">
<div className="relative shrink-0">
<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
<span className="material-symbols-outlined text-[18px]">person</span>
</div>
<span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-surface-container-low"></span>
</div>
<div className="flex flex-col overflow-hidden">
<span className="font-body-sm text-body-sm font-medium text-on-surface truncate">Dev Lead</span>
<span className="font-label-caps text-label-caps text-emerald-400 truncate">Online</span>
</div>
</div>
<button className="text-on-surface-variant hover:text-on-surface p-space-2xs rounded hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
</div>
</aside>
{/* Main View Area */}
<div className="pl-sidebar-w">
{/* Top Header Bar */}
<header className="fixed top-0 left-sidebar-w right-0 h-16 bg-surface-container-lowest/80 border-b border-surface-container-high/40 backdrop-blur-xl z-40">
<div className="h-16 w-full px-space-xl flex items-center justify-between gap-space-md">
{/* Breadcrumb & Save Indicator */}
<div className="flex items-center gap-space-md">
<div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
<span className="material-symbols-outlined text-[16px]">corporate_fare</span>
<span className="hover:text-on-surface cursor-pointer">Workspace</span>
<span className="text-outline-variant">/</span>
<span className="text-on-surface font-medium">Settings</span>
</div>
<div className="h-4 w-px bg-surface-container-highest"></div>
<div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-container-low border border-surface-container-highest/40">
<span className="w-2 h-2 rounded-full bg-emerald-400"></span>
<span className="font-mono-metric text-mono-metric text-[12px] text-on-surface-variant">All changes autosaved</span>
</div>
</div>
{/* Top Right Actions */}
<div className="flex items-center gap-space-sm">
<a className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container-high border border-surface-container-highest/40 text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm font-medium transition-colors" href="#">
<span className="material-symbols-outlined text-[16px]">menu_book</span>
<span>Documentation</span>
</a>
<button className="p-2 text-on-surface-variant hover:text-on-surface rounded-xl hover:bg-surface-container-high border border-transparent hover:border-surface-container-highest/40 transition-colors" title="Help &amp; Support">
<span className="material-symbols-outlined text-[20px]">help</span>
</button>
<div className="h-4 w-px bg-surface-container-highest"></div>
<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
<span className="material-symbols-outlined text-[18px]">person</span>
</div>
</div>
</div>
</header>
{/* Main Content Body */}
<main className="w-full pt-16 bg-surface min-h-screen">
<div className="p-space-xl max-w-5xl mx-auto flex flex-col gap-space-xl pb-24">
{/* Page Header */}
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pt-space-xs pb-space-xs border-b border-surface-container-high/40">
<div className="flex flex-col gap-1">
<h1 className="font-title-lg text-2xl font-semibold text-on-surface tracking-tight">Settings</h1>
<p className="font-body-sm text-body-sm text-on-surface-variant max-w-2xl">
              Manage your organization preferences, member access, API keys, connected integrations, and AI Copilot engine parameters.
            </p>
</div>
<div className="flex items-center gap-space-xs shrink-0">
<button className="px-space-md py-2 rounded-xl bg-transparent hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm font-medium transition-colors border border-surface-container-highest/50" type="button">
              Reset to Defaults
            </button>
<button className="flex items-center gap-1.5 px-space-md py-2 rounded-xl bg-primary text-on-primary font-body-sm text-body-sm font-semibold shadow-sm hover:bg-primary-fixed transition-all" type="button">
<span className="material-symbols-outlined text-[18px]">check</span>
<span>Save Changes</span>
</button>
</div>
</div>
{/* Secondary Navigation Sub-tabs */}
<div className="flex items-center gap-1 border-b border-surface-container-high/50 pb-px overflow-x-auto">
<button className="px-space-md py-2 text-on-surface font-medium border-b-2 border-primary-container text-body-sm whitespace-nowrap">
            General
          </button>
<button className="px-space-md py-2 text-on-surface-variant hover:text-on-surface border-b-2 border-transparent hover:border-surface-container-highest font-medium text-body-sm transition-colors whitespace-nowrap">
            Workspace &amp; Team
          </button>
<button className="px-space-md py-2 text-on-surface-variant hover:text-on-surface border-b-2 border-transparent hover:border-surface-container-highest font-medium text-body-sm transition-colors whitespace-nowrap">
            Integrations &amp; Sources
          </button>
<button className="px-space-md py-2 text-on-surface-variant hover:text-on-surface border-b-2 border-transparent hover:border-surface-container-highest font-medium text-body-sm transition-colors whitespace-nowrap">
            AI Model &amp; Guardrails
          </button>
<button className="px-space-md py-2 text-on-surface-variant hover:text-on-surface border-b-2 border-transparent hover:border-surface-container-highest font-medium text-body-sm transition-colors whitespace-nowrap">
            API Keys &amp; Webhooks
          </button>
<button className="px-space-md py-2 text-on-surface-variant hover:text-on-surface border-b-2 border-transparent hover:border-surface-container-highest font-medium text-body-sm transition-colors whitespace-nowrap">
            Billing &amp; Usage
          </button>
<button className="px-space-md py-2 text-on-surface-variant hover:text-on-surface border-b-2 border-transparent hover:border-surface-container-highest font-medium text-body-sm transition-colors whitespace-nowrap">
            Audit Logs
          </button>
</div>
{/* Section A: Workspace & General Profile */}
<section className="rounded-xl border border-surface-container-high bg-surface-container-lowest/70 overflow-hidden shadow-sm">
<div className="p-space-lg border-b border-surface-container-high/60 flex flex-col gap-1">
<h2 className="font-title-md text-title-md font-semibold text-on-surface">Workspace Profile</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Update the public brand identity and default regional attributes for this workspace.</p>
</div>
<div className="p-space-lg flex flex-col gap-space-lg">
{/* Logo area */}
<div className="flex items-center gap-space-lg">
<div className="w-16 h-16 rounded-2xl bg-surface-container-high border border-surface-container-highest flex items-center justify-center text-primary-container shrink-0">
<span className="material-symbols-outlined text-[32px]">layers</span>
</div>
<div className="flex flex-col gap-2">
<div className="flex items-center gap-space-xs">
<button className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface text-body-sm font-medium border border-surface-container-highest/60 transition-colors" type="button">
                    Upload new
                  </button>
<button className="px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-error text-body-sm transition-colors" type="button">
                    Remove
                  </button>
</div>
<span className="font-body-sm text-[12px] text-on-surface-variant">Recommended 256x256 PNG or SVG. Max 2MB.</span>
</div>
</div>
{/* Form fields grid */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<div className="flex flex-col gap-1.5">
<label className="font-body-sm text-body-sm font-medium text-on-surface">Workspace Name</label>
<input className="bg-surface-container-low border border-surface-container-highest/60 rounded-lg px-3 py-2 text-on-surface text-body-sm focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors" type="text" value="Acme Mobile App"/>
</div>
<div className="flex flex-col gap-1.5">
<label className="font-body-sm text-body-sm font-medium text-on-surface">Workspace Slug</label>
<div className="flex items-center rounded-lg border border-surface-container-highest/60 bg-surface-container-low overflow-hidden focus-within:border-primary-container focus-within:ring-1 focus-within:ring-primary-container">
<input className="bg-transparent border-0 px-3 py-2 text-on-surface text-body-sm focus:ring-0 w-full" type="text" value="acme-mobile-app"/>
<span className="pr-3 text-on-surface-variant font-mono-metric text-mono-metric text-[12px]">.copilot.ai</span>
</div>
</div>
<div className="flex flex-col gap-1.5">
<label className="font-body-sm text-body-sm font-medium text-on-surface">Primary Contact Email</label>
<input className="bg-surface-container-low border border-surface-container-highest/60 rounded-lg px-3 py-2 text-on-surface text-body-sm focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors" type="email" value="devlead@acmecorp.internal"/>
</div>
<div className="flex flex-col gap-1.5">
<label className="font-body-sm text-body-sm font-medium text-on-surface">Default Timezone</label>
<div className="relative">
<select className="w-full bg-surface-container-low border border-surface-container-highest/60 rounded-lg px-3 py-2 text-on-surface text-body-sm appearance-none focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors cursor-pointer">
<option selected="">UTC-05:00 Eastern Time (US &amp; Canada)</option>
<option>UTC-08:00 Pacific Time (US &amp; Canada)</option>
<option>UTC+00:00 Coordinated Universal Time (UTC)</option>
<option>UTC+01:00 Central European Time (Frankfurt)</option>
<option>UTC+08:00 Singapore / Hong Kong Standard</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-2.5 text-on-surface-variant pointer-events-none text-[18px]">expand_more</span>
</div>
</div>
</div>
</div>
<div className="px-space-lg py-3 bg-surface-container-low/50 border-t border-surface-container-high/60 flex items-center justify-between text-body-sm">
<span className="text-on-surface-variant text-[13px]">Changes are visible to all members of Acme Mobile App workspace.</span>
<button className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-medium border border-surface-container-highest/50 transition-colors" type="button">
              Save Profile
            </button>
</div>
</section>
{/* Section B: Copilot AI Synthesis & Model Configuration */}
<section className="rounded-xl border border-surface-container-high bg-surface-container-lowest/70 overflow-hidden shadow-sm">
<div className="p-space-lg border-b border-surface-container-high/60 flex flex-col gap-1">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary-container text-[20px]">psychology</span>
<h2 className="font-title-md text-title-md font-semibold text-on-surface">Copilot AI Synthesis &amp; Model Configuration</h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Configure generative inference routing, citation grounding, and automated triage heuristics.</p>
</div>
<div className="p-space-lg flex flex-col gap-space-lg">
{/* Model selector */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md items-start">
<div className="flex flex-col">
<label className="font-body-sm text-body-sm font-medium text-on-surface">Model Provider &amp; Version</label>
<span className="text-on-surface-variant text-[12px]">Determines semantic accuracy, latency, and reasoning depth.</span>
</div>
<div className="md:col-span-2">
<div className="relative">
<select className="w-full bg-surface-container-low border border-surface-container-highest/60 rounded-lg px-3 py-2 text-on-surface text-body-sm appearance-none focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors cursor-pointer">
<option selected="">Anthropic Claude 3.5 Sonnet (Recommended — Highest verbatim fidelity)</option>
<option>OpenAI GPT-4o (High-throughput multithreaded synthesis)</option>
<option>Google Gemini 1.5 Pro (Ultra-large contextual memory buffer)</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-2.5 text-on-surface-variant pointer-events-none text-[18px]">expand_more</span>
</div>
</div>
</div>
<div className="h-px w-full bg-surface-container-high/50"></div>
{/* Hallucination & Citation Strictness Switch */}
<div className="flex items-start justify-between gap-space-md">
<div className="flex flex-col gap-0.5">
<div className="flex items-center gap-2">
<span className="font-body-sm text-body-sm font-medium text-on-surface">Hallucination &amp; Citation Strictness</span>
<span className="px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-mono-metric text-[11px]">Strict Mode</span>
</div>
<p className="text-on-surface-variant text-[13px] max-w-xl">
                  Require strict 100% citation grounding against raw review verbatims before surfacing insights. Suppresses ungrounded speculative recommendations.
                </p>
</div>
{/* Active toggle switch */}
<label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
<input checked="" className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-primary-container after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
</label>
</div>
<div className="h-px w-full bg-surface-container-high/50"></div>
{/* Confidence & Auto-Triage Threshold Slider */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md items-center">
<div className="flex flex-col">
<label className="font-body-sm text-body-sm font-medium text-on-surface">Confidence &amp; Auto-Triage Cutoff</label>
<span className="text-on-surface-variant text-[12px]">Signals below this score require human engineering review.</span>
</div>
<div className="md:col-span-2 flex items-center gap-space-md">
<input className="w-full accent-primary cursor-pointer" max="99" min="50" type="range" value="85"/>
<div className="px-3 py-1 rounded-lg bg-surface-container-low border border-surface-container-highest/60 font-mono-metric text-mono-metric text-primary font-semibold text-sm shrink-0">
                  85%
                </div>
</div>
</div>
<div className="h-px w-full bg-surface-container-high/50"></div>
{/* Autonomous Summarization Cadence */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md items-start">
<div className="flex flex-col">
<label className="font-body-sm text-body-sm font-medium text-on-surface">Summarization Cadence</label>
<span className="text-on-surface-variant text-[12px]">Frequency of automated Copilot executive rollups.</span>
</div>
<div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-space-xs">
<label className="p-3 rounded-lg border border-surface-container-highest/50 bg-surface-container-low hover:bg-surface-container flex flex-col gap-1 cursor-pointer transition-colors">
<div className="flex items-center justify-between">
<span className="font-body-sm text-body-sm font-medium text-on-surface">Hourly Real-time</span>
<input className="accent-primary" name="cadence" type="radio"/>
</div>
<span className="text-[11px] text-on-surface-variant">Continuous streaming rollup</span>
</label>
<label className="p-3 rounded-lg border border-primary-container/70 bg-primary-container/10 flex flex-col gap-1 cursor-pointer transition-colors">
<div className="flex items-center justify-between">
<span className="font-body-sm text-body-sm font-medium text-on-surface">Daily Digest</span>
<input checked="" className="accent-primary" name="cadence" type="radio"/>
</div>
<span className="text-[11px] text-primary">08:00 UTC batch generation</span>
</label>
<label className="p-3 rounded-lg border border-surface-container-highest/50 bg-surface-container-low hover:bg-surface-container flex flex-col gap-1 cursor-pointer transition-colors">
<div className="flex items-center justify-between">
<span className="font-body-sm text-body-sm font-medium text-on-surface">Weekly Summary</span>
<input className="accent-primary" name="cadence" type="radio"/>
</div>
<span className="text-[11px] text-on-surface-variant">Every Monday 09:00 UTC</span>
</label>
</div>
</div>
</div>
<div className="px-space-lg py-3 bg-surface-container-low/50 border-t border-surface-container-high/60 flex items-center justify-end">
<button className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-medium border border-surface-container-highest/50 text-body-sm transition-colors" type="button">
              Save AI Parameters
            </button>
</div>
</section>
{/* Section C: Connected Data Integrations (Proper SaaS Connected Apps List) */}
<section className="rounded-xl border border-surface-container-high bg-surface-container-lowest/70 overflow-hidden shadow-sm">
<div className="p-space-lg border-b border-surface-container-high/60 flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
<div className="flex flex-col gap-1">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary text-[20px]">hub</span>
<h2 className="font-title-md text-title-md font-semibold text-on-surface">Connected Data Integrations</h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Manage external telemetry streams, issue trackers, and customer feedback conduits.</p>
</div>
<button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-container text-on-primary-container hover:bg-primary text-body-sm font-semibold transition-colors shrink-0 shadow-sm" type="button">
<span className="material-symbols-outlined text-[16px]">add</span>
<span>Connect New Source</span>
</button>
</div>
<div className="divide-y divide-surface-container-high/50">
{/* Integration 1: Apple App Store */}
<div className="p-space-md sm:px-space-lg flex items-center justify-between gap-space-md hover:bg-surface-container-low/40 transition-colors">
<div className="flex items-center gap-space-md">
<div className="w-10 h-10 rounded-xl bg-surface-container-high border border-surface-container-highest/60 flex items-center justify-center text-tertiary shrink-0">
<span className="material-symbols-outlined text-[22px]">phone_iphone</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-body-md text-body-md font-medium text-on-surface">Apple App Store Connect</span>
<span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-high font-mono-metric text-[11px] text-tertiary border border-surface-container-highest/50">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                      Connected • Synced 4m ago
                    </span>
</div>
<span className="text-[12px] text-on-surface-variant">iOS &amp; iPadOS Global Reviews • 4,120 reviews/week</span>
</div>
</div>
<div className="flex items-center gap-2 shrink-0">
<button className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface text-body-sm font-medium border border-surface-container-highest/50 transition-colors" type="button">
                  Configure
                </button>
<button className="p-1.5 text-on-surface-variant hover:text-on-surface rounded-lg hover:bg-surface-container transition-colors" title="More options" type="button">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
</div>
{/* Integration 2: Google Play Console */}
<div className="p-space-md sm:px-space-lg flex items-center justify-between gap-space-md hover:bg-surface-container-low/40 transition-colors">
<div className="flex items-center gap-space-md">
<div className="w-10 h-10 rounded-xl bg-surface-container-high border border-surface-container-highest/60 flex items-center justify-center text-primary shrink-0">
<span className="material-symbols-outlined text-[22px]">android</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-body-md text-body-md font-medium text-on-surface">Google Play Console</span>
<span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-high font-mono-metric text-[11px] text-emerald-400 border border-surface-container-highest/50">
<span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Connected • Real-time SSE
                    </span>
</div>
<span className="text-[12px] text-on-surface-variant">Android Production Feed • Google Cloud Pub/Sub Hook</span>
</div>
</div>
<div className="flex items-center gap-2 shrink-0">
<button className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface text-body-sm font-medium border border-surface-container-highest/50 transition-colors" type="button">
                  Configure
                </button>
<button className="p-1.5 text-on-surface-variant hover:text-on-surface rounded-lg hover:bg-surface-container transition-colors" title="More options" type="button">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
</div>
{/* Integration 3: Zendesk Support */}
<div className="p-space-md sm:px-space-lg flex items-center justify-between gap-space-md hover:bg-surface-container-low/40 transition-colors">
<div className="flex items-center gap-space-md">
<div className="w-10 h-10 rounded-xl bg-surface-container-high border border-surface-container-highest/60 flex items-center justify-center text-secondary shrink-0">
<span className="material-symbols-outlined text-[22px]">support_agent</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-body-md text-body-md font-medium text-on-surface">Zendesk Enterprise</span>
<span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-high font-mono-metric text-[11px] text-tertiary border border-surface-container-highest/50">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                      Connected • High priority tickets
                    </span>
</div>
<span className="text-[12px] text-on-surface-variant">Escalation ingest channel • 890 tickets/month</span>
</div>
</div>
<div className="flex items-center gap-2 shrink-0">
<button className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface text-body-sm font-medium border border-surface-container-highest/50 transition-colors" type="button">
                  Configure
                </button>
<button className="p-1.5 text-on-surface-variant hover:text-on-surface rounded-lg hover:bg-surface-container transition-colors" title="More options" type="button">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
</div>
{/* Integration 4: Linear Issue Tracker */}
<div className="p-space-md sm:px-space-lg flex items-center justify-between gap-space-md hover:bg-surface-container-low/40 transition-colors">
<div className="flex items-center gap-space-md">
<div className="w-10 h-10 rounded-xl bg-surface-container-high border border-surface-container-highest/60 flex items-center justify-center text-primary shrink-0">
<span className="material-symbols-outlined text-[22px]">bug_report</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-body-md text-body-md font-medium text-on-surface">Linear Workspace</span>
<span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-high font-mono-metric text-[11px] text-tertiary border border-surface-container-highest/50">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                      Connected • Two-Way Sync
                    </span>
</div>
<span className="text-[12px] text-on-surface-variant">Automated P0/P1 Bug Drafts • Target: #eng-mobile</span>
</div>
</div>
<div className="flex items-center gap-2 shrink-0">
<button className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface text-body-sm font-medium border border-surface-container-highest/50 transition-colors" type="button">
                  Configure
                </button>
<button className="p-1.5 text-on-surface-variant hover:text-on-surface rounded-lg hover:bg-surface-container transition-colors" title="More options" type="button">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
</div>
{/* Integration 5: Slack Alerts & Digests */}
<div className="p-space-md sm:px-space-lg flex items-center justify-between gap-space-md hover:bg-surface-container-low/40 transition-colors">
<div className="flex items-center gap-space-md">
<div className="w-10 h-10 rounded-xl bg-surface-container-high border border-surface-container-highest/60 flex items-center justify-center text-tertiary shrink-0">
<span className="material-symbols-outlined text-[22px]">chat</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-body-md text-body-md font-medium text-on-surface">Slack Workspace</span>
<span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-high font-mono-metric text-[11px] text-tertiary border border-surface-container-highest/50">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                      Connected • Bot Active
                    </span>
</div>
<span className="text-[12px] text-on-surface-variant">Channel: #exec-product-sync • Daily 09:00 EST</span>
</div>
</div>
<div className="flex items-center gap-2 shrink-0">
<button className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface text-body-sm font-medium border border-surface-container-highest/50 transition-colors" type="button">
                  Configure
                </button>
<button className="p-1.5 text-on-surface-variant hover:text-on-surface rounded-lg hover:bg-surface-container transition-colors" title="More options" type="button">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
</div>
{/* Integration 6: Snowflake Data Lake */}
<div className="p-space-md sm:px-space-lg flex items-center justify-between gap-space-md hover:bg-surface-container-low/40 transition-colors">
<div className="flex items-center gap-space-md">
<div className="w-10 h-10 rounded-xl bg-surface-container-high border border-surface-container-highest/60 flex items-center justify-center text-primary shrink-0">
<span className="material-symbols-outlined text-[22px]">database</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-body-md text-body-md font-medium text-on-surface">Snowflake Data Lakehouse</span>
<span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-high font-mono-metric text-[11px] text-tertiary border border-surface-container-highest/50">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                      Connected • Hourly Batch
                    </span>
</div>
<span className="text-[12px] text-on-surface-variant">Lakehouse Target: prod_analytics.feedback • 1.28M rows synched</span>
</div>
</div>
<div className="flex items-center gap-2 shrink-0">
<button className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface text-body-sm font-medium border border-surface-container-highest/50 transition-colors" type="button">
                  Configure
                </button>
<button className="p-1.5 text-on-surface-variant hover:text-on-surface rounded-lg hover:bg-surface-container transition-colors" title="More options" type="button">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
</div>
</div>
</section>
{/* Section D: Security, Privacy & Compliance Controls */}
<section className="rounded-xl border border-surface-container-high bg-surface-container-lowest/70 overflow-hidden shadow-sm">
<div className="p-space-lg border-b border-surface-container-high/60 flex flex-col gap-1">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[20px]">shield</span>
<h2 className="font-title-md text-title-md font-semibold text-on-surface">Security, Privacy &amp; Compliance Controls</h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Ensure adherence to enterprise GDPR, HIPAA, and SOC-2 Type II data residency mandates.</p>
</div>
<div className="p-space-lg flex flex-col gap-space-lg">
{/* Automated PII Scrubbing Switch */}
<div className="flex items-start justify-between gap-space-md">
<div className="flex flex-col gap-0.5">
<div className="flex items-center gap-2">
<span className="font-body-sm text-body-sm font-medium text-on-surface">Automated PII Scrubbing</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container-high font-mono-metric text-[11px] text-primary border border-surface-container-highest/50">Zero Leaks Detected</span>
</div>
<p className="text-on-surface-variant text-[13px] max-w-xl">
                  Automatically redact credit cards, emails, phone numbers, and SSNs before sending customer review data to external LLM inference gateways.
                </p>
</div>
<label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
<input checked="" className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-primary-container after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
</label>
</div>
<div className="h-px w-full bg-surface-container-high/50"></div>
{/* Retention & Residency Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<div className="flex flex-col gap-1.5">
<label className="font-body-sm text-body-sm font-medium text-on-surface">Data Retention Period</label>
<div className="relative">
<select className="w-full bg-surface-container-low border border-surface-container-highest/60 rounded-lg px-3 py-2 text-on-surface text-body-sm appearance-none focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors cursor-pointer">
<option selected="">365 days (Enterprise Standard)</option>
<option>90 days (Compliance Minimized)</option>
<option>Indefinite (Archive Mode)</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-2.5 text-on-surface-variant pointer-events-none text-[18px]">expand_more</span>
</div>
<span className="text-[12px] text-on-surface-variant">Telemetry older than this will be permanently purged from cold storage.</span>
</div>
<div className="flex flex-col gap-1.5">
<label className="font-body-sm text-body-sm font-medium text-on-surface">SOC-2 Data Residency &amp; Cloud Region</label>
<div className="relative">
<select className="w-full bg-surface-container-low border border-surface-container-highest/60 rounded-lg px-3 py-2 text-on-surface text-body-sm appearance-none focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors cursor-pointer">
<option selected="">US-East (N. Virginia — AWS us-east-1)</option>
<option>EU-West (Frankfurt — AWS eu-central-1)</option>
<option>AP-Southeast (Singapore — AWS ap-southeast-1)</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-2.5 text-on-surface-variant pointer-events-none text-[18px]">expand_more</span>
</div>
<span className="text-[12px] text-on-surface-variant">All vector embeddings and cache tables reside strictly in this geographical perimeter.</span>
</div>
</div>
</div>
<div className="px-space-lg py-3 bg-surface-container-low/50 border-t border-surface-container-high/60 flex items-center justify-between text-body-sm">
<span className="text-on-surface-variant text-[13px]">Certified SOC-2 Type II &amp; ISO-27001 verified environment.</span>
<button className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-medium border border-surface-container-highest/50 transition-colors" type="button">
              Save Security Policy
            </button>
</div>
</section>
{/* Section E: Danger Zone */}
<section className="rounded-xl border border-red-500/30 bg-red-950/10 overflow-hidden shadow-sm">
<div className="p-space-lg border-b border-red-500/20 flex flex-col gap-1">
<div className="flex items-center gap-2 text-red-400">
<span className="material-symbols-outlined text-[20px]">warning</span>
<h2 className="font-title-md text-title-md font-semibold">Danger Zone</h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Irreversible operational actions that affect ongoing model inferences and telemetry persistence.</p>
</div>
<div className="p-space-lg flex flex-col gap-space-lg divide-y divide-red-500/20">
{/* Action 1: Re-index Embeddings */}
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pt-space-xs first:pt-0">
<div className="flex flex-col gap-0.5">
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Re-index All Vector Embeddings</span>
<p className="text-[13px] text-on-surface-variant max-w-xl">
                  Flushes the current vector cluster and recomputes all feedback embeddings using the primary inference LLM. This may take up to 45 minutes of processing time.
                </p>
</div>
<button className="px-3.5 py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-red-300 hover:text-red-200 border border-red-500/30 text-body-sm font-medium transition-colors shrink-0" type="button">
                Re-index Vectors
              </button>
</div>
{/* Action 2: Delete Workspace */}
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pt-space-md">
<div className="flex flex-col gap-0.5">
<span className="font-body-sm text-body-sm font-semibold text-red-400">Delete Workspace &amp; Data</span>
<p className="text-[13px] text-on-surface-variant max-w-xl">
                  Permanently deletes Acme Mobile App workspace, all connected review integrations, historical embeddings, and member seats. This action cannot be undone.
                </p>
</div>
<button className="px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-body-sm font-semibold transition-colors shrink-0 shadow-sm" type="button">
                Delete Workspace
              </button>
</div>
</div>
</section>
</div>
</main>
</div>

    </>
  );
}

