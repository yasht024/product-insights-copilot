import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver';
import {
  apiClient,
  type WordCloudSentiment,
  type WordCloudTerm,
} from './api/client';

const workspaceId = 'ws_1';

function polarityLabel(value: number): string {
  if (value >= 0.25) return 'Positive';
  if (value <= -0.25) return 'Negative';
  return 'Mixed';
}

function termClasses(value: number): string {
  if (value >= 0.25) {
    return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20';
  }
  if (value <= -0.25) {
    return 'border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20';
  }
  return 'border-indigo-500/25 bg-indigo-500/10 text-indigo-200 hover:bg-indigo-500/20';
}

function reviewLink(term: string, days: number, platform: string): string {
  const params = new URLSearchParams({ q: term, days: String(days), min_words: '0' });
  if (platform !== 'All Platforms') params.set('platform', platform);
  return `/reviews-inbox?${params}`;
}

function MetricCard({ label, value, detail, tone = 'text-zinc-100' }: {
  label: string;
  value: string;
  detail: string;
  tone?: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{label}</p>
      <p className={`mt-2 truncate text-2xl font-semibold ${tone}`}>{value}</p>
      <p className="mt-1 truncate text-xs text-zinc-500">{detail}</p>
    </div>
  );
}

export default function WordCloud() {
  const [days, setDays] = useState(30);
  const [platform, setPlatform] = useState('All Platforms');
  const [sentiment, setSentiment] = useState<WordCloudSentiment>('all');
  const [minFrequency, setMinFrequency] = useState(5);
  const [selectedTermName, setSelectedTermName] = useState<string | null>(null);

  const { data, isLoading, isFetching, isError, error, refetch, dataUpdatedAt } = useQuery({
    queryKey: ['wordCloud', workspaceId, days, platform, sentiment, minFrequency],
    queryFn: () => apiClient.getWordCloud(
      workspaceId,
      days,
      platform,
      sentiment,
      minFrequency,
    ),
    refetchInterval: 30_000,
    staleTime: 20_000,
  });

  const terms = data?.terms ?? [];
  const selectedTerm = terms.find((term) => term.term === selectedTermName) ?? terms[0] ?? null;
  const maxMentions = terms[0]?.mentions ?? 1;
  const updatedLabel = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'Connecting';
  const termRows = terms.slice(0, 12);

  function exportLexicon() {
    if (!terms.length) return;
    const quote = (value: string | number | boolean | null) =>
      `"${String(value ?? '').replaceAll('"', '""')}"`;
    const rows = [
      ['term', 'type', 'mentions', 'polarity', 'average_rating', 'velocity_percent', 'new'],
      ...terms.map((term) => [
        term.term,
        term.kind,
        term.mentions,
        term.polarity,
        term.average_rating,
        term.velocity_percent,
        term.is_new,
      ]),
    ];
    const csv = rows.map((row) => row.map(quote).join(',')).join('\r\n');
    saveAs(
      new Blob([csv], { type: 'text/csv;charset=utf-8' }),
      `word-cloud-${days}d-${sentiment}.csv`,
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-[1600px] flex-col gap-5 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 xl:flex-row xl:items-end">
        <div className="max-w-3xl">
          <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded border border-indigo-500/25 bg-indigo-500/10 px-2 py-0.5 font-semibold uppercase tracking-wider text-indigo-300">Live review language</span>
            <span className="flex items-center gap-1 text-zinc-500"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Updated {updatedLabel}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100 lg:text-3xl">Word Cloud &amp; Topics</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Frequent words and adjacent phrases extracted directly from stored customer reviews.
            Each review counts once per term, so repeated words cannot inflate a topic.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => void refetch()} disabled={isFetching} className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-200 hover:border-indigo-500/50 disabled:opacity-50">
            {isFetching ? 'Refreshing…' : 'Refresh now'}
          </button>
          <button type="button" onClick={exportLexicon} disabled={!terms.length} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50">Export CSV</button>
        </div>
      </header>

      <section className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3" aria-label="Word cloud filters">
        <label className="flex items-center gap-2 text-xs text-zinc-400">Window
          <select value={days} onChange={(event) => setDays(Number(event.target.value))} className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200">
            <option value={7}>Last 7 days</option><option value={30}>Last 30 days</option><option value={90}>Last 90 days</option><option value={365}>Last year</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-xs text-zinc-400">Platform
          <select value={platform} onChange={(event) => setPlatform(event.target.value)} className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200">
            <option>All Platforms</option><option>iOS</option><option>Android</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-xs text-zinc-400">Sentiment
          <select value={sentiment} onChange={(event) => setSentiment(event.target.value as WordCloudSentiment)} className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200">
            <option value="all">All ratings</option><option value="positive">Positive · 4–5 stars</option><option value="neutral">Neutral · 3 stars</option><option value="negative">Negative · 1–2 stars</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-xs text-zinc-400">Minimum mentions
          <select value={minFrequency} onChange={(event) => setMinFrequency(Number(event.target.value))} className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200">
            <option value={2}>2+</option><option value={5}>5+</option><option value={10}>10+</option><option value={25}>25+</option><option value={50}>50+</option>
          </select>
        </label>
      </section>

      {isError && (
        <section className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-5 text-sm text-rose-200" role="alert">
          {error instanceof Error ? error.message : 'The live word cloud could not be loaded.'}
        </section>
      )}

      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4" aria-label="Word cloud summary">
        <MetricCard label="Reviews analyzed" value={isLoading ? '…' : (data?.review_count ?? 0).toLocaleString()} detail={`${days}-day window · ${platform}`} />
        <MetricCard label="Distinct terms" value={isLoading ? '…' : (data?.distinct_terms ?? 0).toLocaleString()} detail={`At least ${minFrequency} review mentions`} />
        <MetricCard label="Most positive" value={data?.top_positive?.term ?? 'No signal'} detail={data?.top_positive ? `${data.top_positive.mentions} mentions · ${data.top_positive.average_rating.toFixed(1)}★` : 'Try a wider window'} tone="text-emerald-300" />
        <MetricCard label="Top friction" value={data?.top_negative?.term ?? 'No signal'} detail={data?.top_negative ? `${data.top_negative.mentions} mentions · ${data.top_negative.average_rating.toFixed(1)}★` : 'Try a wider window'} tone="text-rose-300" />
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div><h2 className="font-semibold text-zinc-100">Live term cloud</h2><p className="text-xs text-zinc-500">Size shows review mentions; color shows average star rating.</p></div>
            <span className="text-xs tabular-nums text-zinc-500">Top {terms.length}</span>
          </div>
          <div className="flex min-h-[360px] flex-wrap content-center items-center justify-center gap-3 rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-5">
            {isLoading && <span className="text-sm text-zinc-500">Extracting terms from reviews…</span>}
            {!isLoading && !terms.length && !isError && (
              <div className="text-center"><p className="font-medium text-zinc-300">No terms meet this threshold</p><p className="mt-1 text-sm text-zinc-500">Lower the minimum mentions or widen the date window.</p></div>
            )}
            {terms.map((term) => {
              const scale = 0.78 + Math.sqrt(term.mentions / maxMentions) * 0.72;
              const isSelected = selectedTerm?.term === term.term;
              return (
                <button key={`${term.kind}-${term.term}`} type="button" onClick={() => setSelectedTermName(term.term)} className={`rounded-full border px-3 py-1.5 font-medium transition-transform hover:scale-105 ${termClasses(term.polarity)} ${isSelected ? 'ring-2 ring-white/40' : ''}`} style={{ fontSize: `${scale}rem` }} aria-label={`${term.term}, ${term.mentions} mentions, ${polarityLabel(term.polarity)}`}>
                  {term.term}<span className="ml-2 text-[0.68em] opacity-60 tabular-nums">{term.mentions}</span>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Selected term</p>
          {selectedTerm ? (
            <div className="mt-3 flex h-[calc(100%-1.5rem)] flex-col">
              <h2 className="text-2xl font-semibold text-zinc-100">{selectedTerm.term}</h2>
              <p className="mt-1 text-xs uppercase tracking-wide text-zinc-500">{selectedTerm.kind}</p>
              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-zinc-950/70 p-3"><dt className="text-xs text-zinc-500">Mentions</dt><dd className="mt-1 font-semibold tabular-nums text-zinc-100">{selectedTerm.mentions}</dd></div>
                <div className="rounded-lg bg-zinc-950/70 p-3"><dt className="text-xs text-zinc-500">Avg rating</dt><dd className="mt-1 font-semibold tabular-nums text-zinc-100">{selectedTerm.average_rating.toFixed(1)}★</dd></div>
                <div className="rounded-lg bg-zinc-950/70 p-3"><dt className="text-xs text-zinc-500">Polarity</dt><dd className="mt-1 font-semibold tabular-nums text-zinc-100">{selectedTerm.polarity > 0 ? '+' : ''}{selectedTerm.polarity.toFixed(2)}</dd></div>
                <div className="rounded-lg bg-zinc-950/70 p-3"><dt className="text-xs text-zinc-500">vs prior</dt><dd className="mt-1 font-semibold tabular-nums text-zinc-100">{selectedTerm.is_new ? 'New' : selectedTerm.velocity_percent == null ? '—' : `${selectedTerm.velocity_percent > 0 ? '+' : ''}${selectedTerm.velocity_percent}%`}</dd></div>
              </dl>
              <blockquote className="mt-5 line-clamp-6 border-l-2 border-indigo-500/50 pl-3 text-sm leading-6 text-zinc-400">“{selectedTerm.sample_review}”</blockquote>
              <Link to={reviewLink(selectedTerm.term, days, platform)} className="mt-auto inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500">View matching reviews</Link>
            </div>
          ) : <p className="mt-3 text-sm text-zinc-500">Choose a term to inspect its review evidence.</p>}
        </aside>
      </section>

      <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50">
        <div className="border-b border-zinc-800 px-5 py-4"><h2 className="font-semibold text-zinc-100">Top terms</h2><p className="text-xs text-zinc-500">Ranked by the number of reviews that mention each term.</p></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-zinc-950/60 text-xs uppercase tracking-wide text-zinc-500"><tr><th className="px-5 py-3">Term</th><th className="px-4 py-3">Type</th><th className="px-4 py-3 text-right">Mentions</th><th className="px-4 py-3 text-right">Rating</th><th className="px-4 py-3 text-right">Change</th><th className="px-5 py-3 text-right">Evidence</th></tr></thead>
            <tbody className="divide-y divide-zinc-800">
              {termRows.map((term: WordCloudTerm) => (
                <tr key={`row-${term.kind}-${term.term}`} className="hover:bg-zinc-800/30">
                  <td className="px-5 py-3 font-medium text-zinc-200">{term.term}</td><td className="px-4 py-3 text-zinc-500">{term.kind}</td><td className="px-4 py-3 text-right tabular-nums text-zinc-300">{term.mentions}</td><td className="px-4 py-3 text-right tabular-nums text-zinc-300">{term.average_rating.toFixed(1)}★</td><td className="px-4 py-3 text-right tabular-nums text-zinc-400">{term.is_new ? 'New' : term.velocity_percent == null ? '—' : `${term.velocity_percent > 0 ? '+' : ''}${term.velocity_percent}%`}</td><td className="px-5 py-3 text-right"><Link to={reviewLink(term.term, days, platform)} className="text-indigo-300 hover:text-indigo-200">View reviews</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data?.truncated && <p className="border-t border-zinc-800 px-5 py-3 text-xs text-amber-300">For responsiveness, this view analyzes the 10,000 newest matching reviews.</p>}
      </section>
    </main>
  );
}
