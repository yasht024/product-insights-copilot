import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Info, SlidersHorizontal, Star } from 'lucide-react';
import { apiClient } from './api/client';
import DashboardPreferencesModal, {
  type DashboardPreferences,
} from './components/DashboardPreferencesModal';

const PREFERENCES_KEY = 'product-insights-dashboard-preferences';
const VIEW_DAYS_KEY = 'product-insights-dashboard-view-days';
const DEFAULT_PREFERENCES: DashboardPreferences = {
  showVolume: true,
  showRating: true,
  showAdvocacy: true,
  advocateMin: 5,
  criticMax: 3,
  minimumWords: 0,
};

function loadPreferences(): DashboardPreferences {
  try {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    return stored ? { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) } : DEFAULT_PREFERENCES;
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

function formatReviewDate(value: string | null | undefined): string {
  if (!value) return 'No imported reviews';
  return new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

function MetricInfo({ label, children, align = 'right' }: { label: string; children: string; align?: 'left' | 'right' }) {
  return (
    <details className="relative z-10">
      <summary className="flex cursor-pointer list-none rounded-md p-1 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" aria-label={`About ${label}`}>
        <Info className="h-4 w-4" />
      </summary>
      <div className={`absolute top-7 z-20 w-[min(16rem,calc(100vw-2rem))] rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-left text-xs font-normal normal-case leading-relaxed tracking-normal text-zinc-300 shadow-xl ${align === 'left' ? 'left-0' : 'right-0'}`}>
        {children}
      </div>
    </details>
  );
}

function signed(value: number): string {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}`;
}

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const platform = searchParams.get('platform') || 'All Platforms';
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [preferences, setPreferences] = useState(loadPreferences);
  const [viewDays, setViewDays] = useState(() => {
    const stored = Number(localStorage.getItem(VIEW_DAYS_KEY));
    return Number.isInteger(stored) && stored >= 1 && stored <= 365 ? stored : 30;
  });
  const [viewDaysInput, setViewDaysInput] = useState(String(viewDays));
  const workspaceId = 'ws_1';

  const { data: metrics, isLoading, isError } = useQuery({
    queryKey: ['dashboardMetrics', workspaceId, platform, preferences.advocateMin, preferences.criticMax, preferences.minimumWords, viewDays],
    queryFn: () => apiClient.getDashboardMetrics(workspaceId, {
      platform,
      advocateMin: preferences.advocateMin,
      criticMax: preferences.criticMax,
      days: viewDays,
      minWords: preferences.minimumWords,
    }),
  });

  const iosPercent = metrics?.total_reviews
    ? ((metrics.ios_reviews / metrics.total_reviews) * 100).toFixed(1)
    : '0.0';
  const androidPercent = metrics?.total_reviews
    ? ((metrics.android_reviews / metrics.total_reviews) * 100).toFixed(1)
    : '0.0';
  const hasReviews = Boolean(metrics?.total_reviews);

  const savePreferences = (next: DashboardPreferences) => {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(next));
    setPreferences(next);
    setIsPreferencesOpen(false);
  };

  const applyViewDays = (value: number) => {
    const next = Math.min(365, Math.max(1, Math.round(value || 1)));
    setViewDays(next);
    setViewDaysInput(String(next));
    localStorage.setItem(VIEW_DAYS_KEY, String(next));
  };

  return (
    <>
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="rounded border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-indigo-400">Database metrics</span>
              <span className="text-xs text-zinc-600">•</span>
              <span className="font-mono text-xs text-zinc-400">{platform}</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-100 lg:text-3xl">Executive Dashboard</h1>
            <p className="mt-0.5 text-sm text-zinc-400">Every value below is calculated from the reviews currently stored in this workspace.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 rounded-xl border border-zinc-700 bg-zinc-900 p-1" aria-label="Dashboard date range">
              {[1, 2, 7, 30].map((days) => (
                <button key={days} type="button" onClick={() => applyViewDays(days)} className={`rounded-lg px-2.5 py-1.5 font-mono text-xs transition-colors ${viewDays === days ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}>
                  {days === 7 ? '1W' : days === 30 ? '1M' : `${days}D`}
                </button>
              ))}
              <div className="relative ml-1">
                <input type="number" min={1} max={365} value={viewDaysInput} onChange={(event) => setViewDaysInput(event.target.value)} onBlur={() => applyViewDays(Number(viewDaysInput))} onKeyDown={(event) => { if (event.key === 'Enter') applyViewDays(Number(viewDaysInput)); }} aria-label="Custom dashboard days" className="w-20 rounded-lg border border-zinc-700 bg-zinc-950 py-1.5 pl-2 pr-8 font-mono text-xs text-zinc-100 outline-none focus:border-indigo-500" />
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-zinc-500">days</span>
              </div>
            </div>
            <button type="button" onClick={() => setIsPreferencesOpen(true)} className="flex w-fit items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-indigo-500/50 hover:text-white">
              <SlidersHorizontal className="h-4 w-4" /> Customize metrics
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-xs text-zinc-400">
          <span className="flex items-center gap-1">
            <MetricInfo label="data coverage" align="left">These dates and counts describe verified Groww store reviews currently stored locally that match the selected date, platform, and optional word-count filters. Changing the view does not scrape again.</MetricInfo>
            Data coverage
          </span>
          <span>Selected window: <strong className="text-zinc-200">last {viewDays} {viewDays === 1 ? 'day' : 'days'}</strong></span>
          <span>Text length: <strong className="text-zinc-200">{preferences.minimumWords ? `more than ${preferences.minimumWords} words` : 'all reviews'}</strong></span>
          <span><strong className="text-zinc-200">{metrics?.total_reviews.toLocaleString() || 0}</strong> matching unique reviews</span>
          <span>{formatReviewDate(metrics?.oldest_review_at)} → {formatReviewDate(metrics?.newest_review_at)}</span>
          <span>Source: verified store-review rows</span>
        </div>

        {isError && <div role="alert" className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">Dashboard metrics could not be calculated. Confirm that the API is running and try again.</div>}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {preferences.showVolume && (
            <section className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/70 p-6 shadow-xl backdrop-blur-md transition-all hover:border-zinc-700/80">
              <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-indigo-500/10 blur-2xl" />
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400">Review volume</span>
                  <MetricInfo label="review volume">The number of unique review IDs stored for the selected platform and date window. Duplicate IDs are skipped during scraping.</MetricInfo>
                </div>
                <div className="mt-3 font-mono text-3xl font-bold tracking-tight text-zinc-100 lg:text-4xl">{isLoading ? '…' : metrics?.total_reviews.toLocaleString() || 0}</div>
                <p className="mt-2 text-xs text-zinc-500">Unique reviews in the last {viewDays} {viewDays === 1 ? 'day' : 'days'} · {platform}</p>
              </div>
              <div className="mt-6 flex flex-col gap-2 border-t border-zinc-800/60 pt-4">
                <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
                  <span>Store split</span>
                  <span className="text-zinc-200">{metrics?.ios_reviews.toLocaleString() || 0} iOS · {metrics?.android_reviews.toLocaleString() || 0} Android</span>
                </div>
                <div className="flex h-2 w-full gap-0.5 overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full rounded-l-full bg-indigo-500" style={{ width: `${iosPercent}%` }} title={`iOS: ${iosPercent}%`} />
                  <div className="h-full rounded-r-full bg-purple-500" style={{ width: `${androidPercent}%` }} title={`Android: ${androidPercent}%`} />
                </div>
              </div>
            </section>
          )}

          {preferences.showRating && (
            <section className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/70 p-6 shadow-xl backdrop-blur-md transition-all hover:border-zinc-700/80">
              <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-amber-500/10 blur-2xl" />
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400">Average store rating</span>
                  <MetricInfo label="average store rating">The arithmetic mean of the 1–5 star ratings in the selected platform and date window. Store averages below always compare iOS and Android over the same date window.</MetricInfo>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-mono text-3xl font-bold tracking-tight text-zinc-100 lg:text-4xl">{isLoading ? '…' : hasReviews ? metrics?.average_rating.toFixed(1) : '—'}</span>
                  {hasReviews && <span className="text-sm font-medium text-zinc-500">/ 5.0</span>}
                </div>
                <p className="mt-2 text-xs text-zinc-500">Mean across {metrics?.total_reviews.toLocaleString() || 0} reviews</p>
              </div>
              <div className="mt-6 flex flex-col gap-3 border-t border-zinc-800/60 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400" aria-label={hasReviews ? `${metrics?.average_rating} out of 5 stars` : 'No ratings in this window'}>
                    {[1, 2, 3, 4, 5].map((rating) => <Star key={rating} className={`h-4 w-4 ${hasReviews && rating <= Math.round(metrics?.average_rating || 0) ? 'fill-amber-400' : 'text-amber-400/30'}`} />)}
                  </div>
                  <span className="font-mono text-xs text-zinc-400">Median {hasReviews ? metrics?.median_rating.toFixed(1) : '—'}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 rounded-lg bg-zinc-950/60 p-2.5 text-center font-mono text-[11px]">
                  <div><div className="text-zinc-500">iOS</div><div className="mt-0.5 text-zinc-200">{metrics?.ios_average_rating?.toFixed(1) ?? '—'}</div></div>
                  <div><div className="text-zinc-500">Android</div><div className="mt-0.5 text-zinc-200">{metrics?.android_average_rating?.toFixed(1) ?? '—'}</div></div>
                  <div title="iOS average minus Android average"><div className="text-zinc-500">iOS − Android</div><div className={`mt-0.5 ${metrics?.store_rating_difference == null ? 'text-zinc-200' : metrics.store_rating_difference > 0 ? 'text-emerald-400' : metrics.store_rating_difference < 0 ? 'text-rose-400' : 'text-zinc-200'}`}>{metrics?.store_rating_difference == null ? '—' : `${signed(metrics.store_rating_difference)} pts`}</div></div>
                </div>
              </div>
            </section>
          )}

          {preferences.showAdvocacy && (
            <section className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/70 p-6 shadow-xl backdrop-blur-md transition-all hover:border-zinc-700/80">
              <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-emerald-500/10 blur-2xl" />
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400">Rating advocacy</span>
                  <MetricInfo label="rating advocacy">Rating advocacy = 100 × (advocates − critics) ÷ all matching reviews. It ranges from −100 to +100. This is a star-rating proxy, not NPS, which requires a 0–10 recommendation survey.</MetricInfo>
                </div>
                <div className="mt-3 font-mono text-3xl font-bold tracking-tight text-zinc-100 lg:text-4xl">{isLoading ? '…' : hasReviews ? signed(metrics?.rating_advocacy_score || 0) : '—'}</div>
                <p className="mt-2 text-xs text-zinc-500">Advocates ≥ {preferences.advocateMin}★ minus critics ≤ {preferences.criticMax}★</p>
              </div>
              <div className="mt-6 flex flex-col gap-2 border-t border-zinc-800/60 pt-4">
                <div className="flex h-2 w-full gap-0.5 overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full rounded-l-full bg-emerald-500" style={{ width: `${metrics?.advocates_percent || 0}%` }} />
                  <div className="h-full bg-amber-500" style={{ width: `${metrics?.neutral_percent || 0}%` }} />
                  <div className="h-full rounded-r-full bg-rose-500" style={{ width: `${metrics?.critics_percent || 0}%` }} />
                </div>
                <div className="flex items-center justify-between gap-2 font-mono text-[10px] text-zinc-400 sm:text-[11px]">
                  <span>{metrics?.advocates_percent || 0}% advocates ({metrics?.advocates_count || 0})</span>
                  <span>{metrics?.neutral_percent || 0}% neutral ({metrics?.neutral_count || 0})</span>
                  <span>{metrics?.critics_percent || 0}% critics ({metrics?.critics_count || 0})</span>
                </div>
              </div>
            </section>
          )}
        </div>

      </main>

      <DashboardPreferencesModal isOpen={isPreferencesOpen} preferences={preferences} onClose={() => setIsPreferencesOpen(false)} onSave={savePreferences} />
    </>
  );
}
