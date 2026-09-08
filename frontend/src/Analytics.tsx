import { useMemo, useState, type ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { AlertCircle, BarChart3, Download, RefreshCw, Star, TrendingDown, TrendingUp } from 'lucide-react';
import { apiClient, type AnalyticsData, type AnalyticsGranularity } from './api/client';

const GRANULARITIES: { value: AnalyticsGranularity; label: string }[] = [
  { value: 'daily', label: 'Daily' }, { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' }, { value: 'quarterly', label: 'Quarterly' },
];
const RANGES = [30, 60, 90, 180, 365];
const TOOLTIP_STYLE = { background: '#18181b', border: '1px solid #3f3f46', borderRadius: 12, color: '#f4f4f5', fontSize: 12 };

function compact(value: number) {
  return new Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1 }).format(value);
}

function signed(value: number | null, suffix = '') {
  return value == null ? 'No prior-period data' : `${value > 0 ? '+' : ''}${value.toFixed(1)}${suffix}`;
}

function dateLabel(value: string, granularity: AnalyticsGranularity) {
  const date = new Date(`${value}T00:00:00`);
  if (granularity === 'daily') return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(date);
  if (granularity === 'monthly') return new Intl.DateTimeFormat(undefined, { month: 'short', year: '2-digit' }).format(date);
  if (granularity === 'quarterly') return `Q${Math.floor(date.getMonth() / 3) + 1} ${String(date.getFullYear()).slice(-2)}`;
  return `W/O ${new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(date)}`;
}

function dateTimeLabel(value: string) {
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value.endsWith('Z') ? value : `${value}Z`));
}

function KpiCard({ label, value, detail, change, positive, icon }: {
  label: string; value: string; detail: string; change: string; positive?: boolean; icon: ReactNode;
}) {
  return <article className="flex min-h-40 flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/70 p-5 shadow-lg">
    <div className="flex items-start justify-between gap-3"><div><p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">{label}</p><p className="mt-2 text-3xl font-bold tracking-tight text-zinc-100">{value}</p><p className="mt-1 text-xs text-zinc-500">{detail}</p></div><span className="rounded-xl bg-indigo-500/10 p-2.5 text-indigo-400">{icon}</span></div>
    <div className={`mt-4 flex items-center gap-1.5 border-t border-zinc-800 pt-3 text-xs font-medium ${positive === true ? 'text-emerald-400' : positive === false ? 'text-rose-400' : 'text-zinc-400'}`}>{positive === true ? <TrendingUp className="h-3.5 w-3.5" /> : positive === false ? <TrendingDown className="h-3.5 w-3.5" /> : null}{change}</div>
  </article>;
}

function LoadingState() {
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" role="status">{[1, 2, 3, 4].map((item) => <div key={item} className="h-40 animate-pulse rounded-2xl border border-zinc-800 bg-zinc-900"><div className="m-5 h-3 w-28 rounded bg-zinc-800" /><div className="mx-5 mt-6 h-9 w-24 rounded bg-zinc-800" /></div>)}<span className="sr-only">Loading live analytics…</span></div>;
}

function exportAnalytics(data: AnalyticsData) {
  const rows = [['Period', 'iOS reviews', 'Android reviews', 'Total reviews', 'Average rating', 'Critical review %'], ...data.series.map((point) => [point.period, point.ios, point.android, point.total, point.average_rating ?? '', point.critical_percent])];
  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\r\n');
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  link.download = `review-analytics-${data.days}d-${data.granularity}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

export default function Analytics() {
  const [searchParams] = useSearchParams();
  const platform = searchParams.get('platform') || 'All Platforms';
  const [days, setDays] = useState(90);
  const [granularity, setGranularity] = useState<AnalyticsGranularity>('weekly');
  const { data, error, isLoading, isFetching, isError, refetch, dataUpdatedAt } = useQuery({
    queryKey: ['analytics', 'ws_1', days, granularity, platform],
    queryFn: () => apiClient.getAnalytics('ws_1', days, granularity, platform),
    refetchInterval: 30_000, retry: 1,
  });
  const chartData = useMemo(() => data?.series.map((point) => ({ ...point, label: dateLabel(point.period, granularity) })) ?? [], [data, granularity]);
  const distribution = useMemo(() => data ? [5, 4, 3, 2, 1].map((rating) => ({
    rating: `${rating} star`, count: data.rating_distribution[String(rating) as '1' | '2' | '3' | '4' | '5'], fill: rating >= 4 ? '#10b981' : rating === 3 ? '#f59e0b' : '#f43f5e',
  })) : [], [data]);

  return <main className="mx-auto flex w-full max-w-[1500px] flex-col gap-6 p-4 sm:p-6 lg:p-8">
    <header className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
      <div><div className="mb-2 flex items-center gap-2 text-xs text-zinc-500"><span className={`h-2 w-2 rounded-full ${isError ? 'bg-rose-500' : 'bg-emerald-500'}`} /><span>{isError ? 'Review service offline' : 'Live database · refreshes every 30 seconds'}</span></div><h1 className="text-2xl font-bold tracking-tight text-zinc-100 lg:text-3xl">Analytics &amp; Trends</h1><p className="mt-1 max-w-3xl text-sm text-zinc-400">Review volume, ratings, platform mix, and version performance computed from imported store reviews.</p></div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex rounded-xl border border-zinc-800 bg-zinc-900 p-1" aria-label="Analytics granularity">{GRANULARITIES.map((option) => <button key={option.value} type="button" onClick={() => setGranularity(option.value)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${granularity === option.value ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}>{option.label}</button>)}</div>
        <select aria-label="Analytics date range" value={days} onChange={(event) => setDays(Number(event.target.value))} className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-indigo-500">{RANGES.map((range) => <option key={range} value={range}>Last {range} days</option>)}</select>
        <button type="button" onClick={() => void refetch()} disabled={isFetching} className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800 disabled:opacity-50"><RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />{isFetching ? 'Refreshing' : 'Refresh'}</button>
        <button type="button" onClick={() => data && exportAnalytics(data)} disabled={!data} className="flex items-center gap-2 rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-40"><Download className="h-4 w-4" />Export CSV</button>
      </div>
    </header>

    {isError && <div role="alert" className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-5 text-sm text-rose-300"><div className="flex gap-3"><AlertCircle className="mt-0.5 h-5 w-5 shrink-0" /><div><p className="font-semibold">Analytics could not be refreshed</p><p className="mt-1">{error.message}</p>{data && <p className="mt-1 text-rose-300/70">The last successful result remains visible.</p>}</div></div><button type="button" onClick={() => void refetch()} className="rounded-lg border border-rose-400/30 px-4 py-2 font-medium">Retry</button></div>}
    {isLoading && <LoadingState />}
    {data && <>
      <div className="flex flex-wrap gap-x-5 gap-y-2 rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-xs text-zinc-400"><span><strong className="text-zinc-200">{platform}</strong></span><span>{data.total_reviews.toLocaleString()} reviews in the last {days} days</span><span>Coverage: {data.oldest_review_at ? dateTimeLabel(data.oldest_review_at) : 'No matching reviews'}{data.newest_review_at ? ` → ${dateTimeLabel(data.newest_review_at)}` : ''}</span><span className="ml-auto">Updated {new Date(dataUpdatedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' })}</span></div>
      {data.total_reviews === 0 ? <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center"><BarChart3 className="mx-auto h-9 w-9 text-zinc-600" /><h2 className="mt-4 text-lg font-semibold text-zinc-100">No reviews in this analytics window</h2><p className="mt-1 text-sm text-zinc-400">Choose a longer range, change the platform filter, or scrape recent reviews.</p></div> : <>
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Review volume" value={data.total_reviews.toLocaleString()} detail={`${data.reviews_per_day.toLocaleString()} reviews per day`} change={`${signed(data.velocity_change_percent, '%')} vs prior ${days} days`} positive={data.velocity_change_percent == null ? undefined : data.velocity_change_percent >= 0} icon={<BarChart3 className="h-5 w-5" />} />
          <KpiCard label="Average rating" value={data.average_rating == null ? '—' : `${data.average_rating.toFixed(2)} ★`} detail={data.previous_average_rating == null ? 'No prior rating baseline' : `${data.previous_average_rating.toFixed(2)} ★ in prior period`} change={`${signed(data.rating_change, ' pts')} vs prior period`} positive={data.rating_change == null ? undefined : data.rating_change >= 0} icon={<Star className="h-5 w-5" />} />
          <KpiCard label="Critical reviews" value={`${data.critical_percent.toFixed(1)}%`} detail={`${data.critical_reviews.toLocaleString()} reviews rated 1–3 stars`} change={`${signed(data.critical_change_points, ' pts')} vs prior period`} positive={data.critical_change_points == null ? undefined : data.critical_change_points <= 0} icon={<AlertCircle className="h-5 w-5" />} />
          <KpiCard label="Platform mix" value={`${data.ios_reviews.toLocaleString()} / ${data.android_reviews.toLocaleString()}`} detail="iOS / Android reviews" change={`${(data.ios_reviews / data.total_reviews * 100).toFixed(1)}% iOS · ${(data.android_reviews / data.total_reviews * 100).toFixed(1)}% Android`} icon={<TrendingUp className="h-5 w-5" />} />
        </section>

        <section className="grid gap-4 xl:grid-cols-5">
          <article className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 xl:col-span-3"><div><h2 className="font-semibold text-zinc-100">Review volume by platform</h2><p className="mt-1 text-xs text-zinc-500">{granularity[0].toUpperCase() + granularity.slice(1)} review counts in the selected window</p></div><div className="mt-5 h-80" aria-label="Review volume chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData} margin={{ left: -12, right: 10 }}><defs><linearGradient id="iosFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6366f1" stopOpacity={0.4}/><stop offset="100%" stopColor="#6366f1" stopOpacity={0}/></linearGradient><linearGradient id="androidFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a855f7" stopOpacity={0.35}/><stop offset="100%" stopColor="#a855f7" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="#27272a" vertical={false} /><XAxis dataKey="label" stroke="#71717a" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} minTickGap={24} /><YAxis stroke="#71717a" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={compact} /><Tooltip contentStyle={TOOLTIP_STYLE} /><Area type="monotone" dataKey="ios" name="iOS" stroke="#818cf8" fill="url(#iosFill)" strokeWidth={2} /><Area type="monotone" dataKey="android" name="Android" stroke="#c084fc" fill="url(#androidFill)" strokeWidth={2} /></AreaChart></ResponsiveContainer></div><div className="mt-3 flex gap-5 text-xs text-zinc-400"><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-indigo-400" />iOS</span><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-purple-400" />Android</span></div></article>
          <article className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 xl:col-span-2"><div><h2 className="font-semibold text-zinc-100">Rating trend</h2><p className="mt-1 text-xs text-zinc-500">Average star rating and critical-review share</p></div><div className="mt-5 h-80" aria-label="Rating trend chart"><ResponsiveContainer width="100%" height="100%"><LineChart data={chartData} margin={{ left: -18, right: 12 }}><CartesianGrid stroke="#27272a" vertical={false} /><XAxis dataKey="label" stroke="#71717a" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} minTickGap={24} /><YAxis yAxisId="rating" domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} stroke="#71717a" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} /><YAxis yAxisId="critical" orientation="right" domain={[0, 100]} hide /><Tooltip contentStyle={TOOLTIP_STYLE} /><Line yAxisId="rating" type="monotone" dataKey="average_rating" name="Average rating" stroke="#10b981" strokeWidth={2.5} connectNulls dot={{ r: 3 }} /><Line yAxisId="critical" type="monotone" dataKey="critical_percent" name="Critical %" stroke="#f43f5e" strokeWidth={2} strokeDasharray="5 4" dot={false} /></LineChart></ResponsiveContainer></div><div className="mt-3 flex gap-5 text-xs text-zinc-400"><span className="flex items-center gap-2"><i className="h-0.5 w-4 bg-emerald-500" />Average rating</span><span className="flex items-center gap-2"><i className="h-0.5 w-4 bg-rose-500" />Critical share</span></div></article>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5"><h2 className="font-semibold text-zinc-100">Rating distribution</h2><p className="mt-1 text-xs text-zinc-500">Exact counts from the selected review set</p><div className="mt-5 h-64" aria-label="Rating distribution chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={distribution} layout="vertical" margin={{ left: 4, right: 12 }}><CartesianGrid stroke="#27272a" horizontal={false} /><XAxis type="number" stroke="#71717a" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={compact} /><YAxis type="category" dataKey="rating" width={46} stroke="#a1a1aa" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} /><Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: '#27272a55' }} /><Bar dataKey="count" name="Reviews" radius={[0, 6, 6, 0]}>{distribution.map((entry) => <Cell key={entry.rating} fill={entry.fill} />)}</Bar></BarChart></ResponsiveContainer></div></article>
          <article className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70"><div className="p-5"><h2 className="font-semibold text-zinc-100">Version performance</h2><p className="mt-1 text-xs text-zinc-500">Most reviewed app versions in this window</p></div>{data.versions.length ? <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-y border-zinc-800 bg-zinc-950/50 text-[10px] uppercase tracking-wider text-zinc-500"><tr><th className="px-5 py-3">Version</th><th className="px-5 py-3 text-right">Reviews</th><th className="px-5 py-3 text-right">Avg rating</th><th className="px-5 py-3">Share</th></tr></thead><tbody className="divide-y divide-zinc-800/70">{data.versions.map((version) => <tr key={version.version} className="text-zinc-300"><td className="px-5 py-3 font-medium text-zinc-100">{version.version}</td><td className="px-5 py-3 text-right tabular-nums">{version.reviews.toLocaleString()}</td><td className="px-5 py-3 text-right tabular-nums">{version.average_rating.toFixed(2)} ★</td><td className="min-w-32 px-5 py-3"><div className="h-1.5 overflow-hidden rounded-full bg-zinc-800"><div className="h-full rounded-full bg-indigo-500" style={{ width: `${version.reviews / data.total_reviews * 100}%` }} /></div></td></tr>)}</tbody></table></div> : <p className="px-5 pb-5 text-sm text-zinc-500">No version metadata is available in this window.</p>}</article>
        </section>
      </>}
    </>}
  </main>;
}
