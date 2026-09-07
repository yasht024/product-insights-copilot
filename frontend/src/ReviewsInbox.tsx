import { useEffect, useMemo, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { apiClient, type Review } from './api/client';
import { useToast } from './components/Toast';

const workspaceId = 'ws_1';

function formatDate(value: string | null): string {
  if (!value) return 'Unknown date';
  const normalized = /(?:Z|[+-]\d\d:\d\d)$/.test(value) ? value : `${value}Z`;
  return new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(normalized));
}

function statusClass(status: string): string {
  switch (status.toLowerCase()) {
    case 'reviewed':
    case 'replied':
      return 'bg-emerald-500/15 text-emerald-300';
    case 'flagged':
      return 'bg-amber-500/15 text-amber-300';
    case 'archived':
      return 'bg-zinc-700/60 text-zinc-400';
    default:
      return 'bg-indigo-500/15 text-indigo-300';
  }
}

export default function ReviewsInbox() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(new Set());
  const [draftText, setDraftText] = useState('');
  const [draftTone, setDraftTone] = useState<'concise' | 'formal'>('concise');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const limit = [25, 50, 100].includes(Number(searchParams.get('limit')))
    ? Number(searchParams.get('limit'))
    : 25;
  const queryString = searchParams.toString();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['reviews', workspaceId, queryString],
    queryFn: () => apiClient.getReviews(workspaceId, searchParams),
  });
  const { data: summary, isLoading: isSummaryLoading } = useQuery({
    queryKey: ['reviewSummary', workspaceId, queryString],
    queryFn: () => apiClient.getReviewSummary(workspaceId, searchParams),
  });

  const bulkActionMutation = useMutation({
    mutationFn: ({ ids, status }: { ids: string[]; status: string }) =>
      apiClient.bulkAction(workspaceId, ids, 'mark_status', status),
    onSuccess: async (result, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['reviews', workspaceId] }),
        queryClient.invalidateQueries({ queryKey: ['reviewSummary', workspaceId] }),
      ]);
      setSelectedRowIds(new Set());
      addToast({
        type: 'success',
        title: `${variables.status} reviews`,
        message: `${result.updated_count} ${result.updated_count === 1 ? 'review was' : 'reviews were'} updated.`,
      });
    },
    onError: () => addToast({ type: 'error', title: 'Update failed', message: 'The selected reviews could not be updated.' }),
  });

  const draftMutation = useMutation({
    mutationFn: ({ reviewId, tone }: { reviewId: string; tone: 'concise' | 'formal' }) =>
      apiClient.generateDraft(workspaceId, reviewId, tone),
    onSuccess: (result) => setDraftText(result.draft),
    onError: () => {
      setDraftText('');
      addToast({ type: 'error', title: 'Draft unavailable', message: 'A reply suggestion could not be generated.' });
    },
  });

  useEffect(() => {
    const focusSearch = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', focusSearch);
    return () => window.removeEventListener('keydown', focusSearch);
  }, []);

  const totalPages = Math.max(1, Math.ceil((data?.total || 0) / limit));
  const firstResult = data?.total ? (page - 1) * limit + 1 : 0;
  const lastResult = data?.total ? Math.min(page * limit, data.total) : 0;
  const allPageRowsSelected = Boolean(data?.items.length) && data!.items.every((review) => selectedRowIds.has(review.id));
  const selectedIds = useMemo(
    () => (data?.items || []).filter((review) => selectedRowIds.has(review.id)).map((review) => review.id),
    [data?.items, selectedRowIds],
  );

  const updateParams = (updates: Record<string, string | null>) => {
    setSelectedRowIds(new Set());
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      Object.entries(updates).forEach(([key, value]) => {
        if (!value || value.startsWith('All ')) next.delete(key);
        else next.set(key, value);
      });
      return next;
    });
  };

  const handleFilterChange = (key: string, value: string) => updateParams({ [key]: value, page: '1' });
  const changePage = (nextPage: number) => updateParams({ page: String(Math.min(totalPages, Math.max(1, nextPage))) });

  const toggleRow = (id: string) => {
    setSelectedRowIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (!data?.items.length) return;
    setSelectedRowIds(allPageRowsSelected ? new Set() : new Set(data.items.map((review) => review.id)));
  };

  const openReply = (review: Review, tone: 'concise' | 'formal' = 'concise') => {
    setSelectedReview(review);
    setDraftText('');
    setDraftTone(tone);
    draftMutation.mutate({ reviewId: review.id, tone });
  };

  const regenerateDraft = (tone: 'concise' | 'formal') => {
    if (!selectedReview) return;
    setDraftTone(tone);
    draftMutation.mutate({ reviewId: selectedReview.id, tone });
  };

  const copyDraft = async () => {
    if (!draftText) return;
    await navigator.clipboard.writeText(draftText);
    addToast({ type: 'success', title: 'Draft copied', message: 'The reply suggestion is ready to paste into the store console.' });
  };

  return (
    <main className="mx-auto flex w-full max-w-[1600px] flex-col gap-5 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-indigo-400">Stored reviews</span>
            <span className="font-mono text-xs text-zinc-500">Groww · iOS and Android</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100 lg:text-3xl">Reviews Inbox</h1>
          <p className="mt-1 max-w-3xl text-sm text-zinc-400">Search, review, export, and update the customer reviews currently stored in this workspace.</p>
        </div>
        <button type="button" onClick={() => { window.location.href = apiClient.getExportUrl(workspaceId, searchParams); }} className="flex w-fit items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-indigo-500/50 hover:text-white">
          <span className="material-symbols-outlined text-[17px]">download</span>
          Export filtered CSV
        </button>
      </header>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="Filtered review summary">
        {[
          { label: 'Matching reviews', value: summary?.total.toLocaleString() ?? '—', detail: `${summary?.ios || 0} iOS · ${summary?.android || 0} Android`, icon: 'inbox', color: 'text-indigo-400' },
          { label: 'Unread', value: summary?.unread.toLocaleString() ?? '—', detail: 'Within current filters', icon: 'mark_email_unread', color: 'text-sky-400' },
          { label: '1-star reviews', value: summary?.one_star.toLocaleString() ?? '—', detail: 'Within current filters', icon: 'warning', color: 'text-rose-400' },
          { label: 'Average rating', value: summary?.average_rating == null ? '—' : `${summary.average_rating.toFixed(1)} / 5`, detail: 'Within current filters', icon: 'star', color: 'text-amber-400' },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">{item.label}</div>
              <div className="mt-1 font-mono text-xl font-bold text-zinc-100">{isSummaryLoading ? '…' : item.value}</div>
              <div className="mt-1 text-xs text-zinc-500">{item.detail}</div>
            </div>
            <span className={`material-symbols-outlined ${item.color}`}>{item.icon}</span>
          </div>
        ))}
      </section>

      {Boolean(summary?.excluded_non_store) && (
        <div className="flex items-start gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-xs leading-relaxed text-amber-200">
          <span className="material-symbols-outlined text-[17px]">verified</span>
          <span><strong>{summary?.excluded_non_store.toLocaleString()}</strong> known demo or legacy non-Groww rows are excluded from the inbox and dashboard calculations.</span>
        </div>
      )}

      <section className="flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
        <div className="flex flex-col gap-2 xl:flex-row">
          <div className="relative min-w-0 flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-zinc-500">search</span>
            <input ref={searchInputRef} value={searchParams.get('q') || ''} onChange={(event) => handleFilterChange('q', event.target.value)} className="w-full rounded-lg border border-transparent bg-zinc-950 py-2.5 pl-10 pr-16 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-indigo-500" placeholder="Search review text…" />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">Ctrl K</kbd>
          </div>
          <div className="flex flex-wrap gap-2">
            <select aria-label="Platform" value={searchParams.get('platform') || 'All Platforms'} onChange={(event) => handleFilterChange('platform', event.target.value)} className="rounded-lg bg-zinc-950 px-3 py-2.5 text-sm text-zinc-200 outline-none focus:ring-1 focus:ring-indigo-500">
              <option>All Platforms</option><option value="iOS">iOS</option><option value="Android">Android</option>
            </select>
            <select aria-label="Version" value={searchParams.get('version') || 'All Versions'} onChange={(event) => handleFilterChange('version', event.target.value)} className="max-w-48 rounded-lg bg-zinc-950 px-3 py-2.5 text-sm text-zinc-200 outline-none focus:ring-1 focus:ring-indigo-500">
              <option>All Versions</option>
              {data?.available_versions.map((version) => <option key={version}>{version}</option>)}
            </select>
            <select aria-label="Rating" value={searchParams.get('rating') || 'All Ratings'} onChange={(event) => handleFilterChange('rating', event.target.value)} className="rounded-lg bg-zinc-950 px-3 py-2.5 text-sm text-zinc-200 outline-none focus:ring-1 focus:ring-indigo-500">
              <option>All Ratings</option>
              {[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} stars</option>)}
            </select>
            <select aria-label="Status" value={searchParams.get('status') || 'All Statuses'} onChange={(event) => handleFilterChange('status', event.target.value)} className="rounded-lg bg-zinc-950 px-3 py-2.5 text-sm text-zinc-200 outline-none focus:ring-1 focus:ring-indigo-500">
              <option>All Statuses</option>
              {data?.available_statuses.map((status) => <option key={status}>{status}</option>)}
            </select>
            <select aria-label="Review date range" value={searchParams.get('days') || 'All time'} onChange={(event) => handleFilterChange('days', event.target.value)} className="rounded-lg bg-zinc-950 px-3 py-2.5 text-sm text-zinc-200 outline-none focus:ring-1 focus:ring-indigo-500">
              <option>All time</option><option value="1">Last 1 day</option><option value="2">Last 2 days</option><option value="7">Last 7 days</option><option value="30">Last 30 days</option><option value="90">Last 90 days</option><option value="365">Last year</option>
            </select>
            <label className="flex items-center gap-2 rounded-lg bg-zinc-950 px-3 py-2 text-xs text-zinc-500">
              More than
              <input aria-label="Minimum review word count" type="number" min={0} max={100} value={searchParams.get('min_words') ?? '8'} onChange={(event) => handleFilterChange('min_words', String(Math.min(100, Math.max(0, Number(event.target.value) || 0))))} className="w-12 rounded border border-zinc-700 bg-zinc-900 px-1.5 py-1 text-center font-mono text-zinc-200 outline-none focus:border-indigo-500" />
              words
            </label>
            <button type="button" onClick={() => { setSelectedRowIds(new Set()); setSearchParams(new URLSearchParams()); }} className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white" title="Reset all filters">
              <span className="material-symbols-outlined text-[18px]">restart_alt</span> Reset
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800 pt-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-zinc-300">
            <input type="checkbox" checked={allPageRowsSelected} onChange={toggleAll} className="h-4 w-4 accent-indigo-500" />
            {selectedIds.length} selected on this page
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { status: 'Reviewed', icon: 'done_all' },
              { status: 'Flagged', icon: 'flag' },
              { status: 'Archived', icon: 'archive' },
            ].map((action) => (
              <button key={action.status} type="button" disabled={!selectedIds.length || bulkActionMutation.isPending} onClick={() => bulkActionMutation.mutate({ ids: selectedIds, status: action.status })} className="flex items-center gap-1.5 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40">
                <span className="material-symbols-outlined text-[16px]">{action.icon}</span>{action.status}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/50 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] border-collapse text-left text-sm">
            <thead className="bg-zinc-900 text-[11px] uppercase tracking-wider text-zinc-500">
              <tr>
                <th className="w-12 px-4 py-3 text-center"><span className="sr-only">Select</span></th>
                <th className="min-w-52 px-4 py-3">Reviewer and store</th>
                <th className="w-36 px-4 py-3">Rating</th>
                <th className="min-w-96 px-4 py-3">Review</th>
                <th className="w-40 px-4 py-3">Version and date</th>
                <th className="w-28 px-4 py-3">Status</th>
                <th className="w-24 px-4 py-3 text-right">Reply</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {isLoading ? (
                <tr><td colSpan={7} className="px-4 py-14 text-center text-zinc-500">Loading reviews…</td></tr>
              ) : isError ? (
                <tr><td colSpan={7} className="px-4 py-14 text-center text-rose-300">Reviews could not be loaded. Confirm that the local API is running.</td></tr>
              ) : !data?.items.length ? (
                <tr><td colSpan={7} className="px-4 py-14 text-center text-zinc-500">No stored reviews match these filters.</td></tr>
              ) : data.items.map((review) => (
                <tr key={review.id} className="bg-zinc-950/20 text-zinc-300 transition-colors hover:bg-zinc-900/70">
                  <td className="px-4 py-3 text-center"><input aria-label={`Select review ${review.id}`} type="checkbox" checked={selectedRowIds.has(review.id)} onChange={() => toggleRow(review.id)} className="h-4 w-4 accent-indigo-500" /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${review.rating <= 2 ? 'bg-rose-500/15 text-rose-300' : review.rating >= 4 ? 'bg-emerald-500/15 text-emerald-300' : 'bg-zinc-800 text-zinc-300'}`}>{(review.author || 'AN').slice(0, 2).toUpperCase()}</div>
                      <div className="min-w-0"><div className="truncate font-medium text-zinc-200">{review.author || 'Anonymous'}</div><div className="truncate text-xs text-zinc-500">{review.platform}</div></div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}><span className="font-mono font-semibold text-amber-300">{review.rating}.0</span><span className="text-amber-400">★</span></div></td>
                  <td className="px-4 py-3"><p className="line-clamp-3 max-w-2xl leading-relaxed text-zinc-400" title={review.text}>{review.text}</p></td>
                  <td className="px-4 py-3"><div className="font-mono text-xs text-zinc-300">{review.version || 'Unknown'}</div><div className="mt-1 text-xs text-zinc-500">{formatDate(review.created_at)}</div></td>
                  <td className="px-4 py-3"><span className={`inline-flex rounded-full px-2 py-1 font-mono text-[10px] font-bold uppercase ${statusClass(review.status)}`}>{review.status}</span></td>
                  <td className="px-4 py-3 text-right"><button type="button" onClick={() => openReply(review)} className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-indigo-500/15 hover:text-indigo-300" title="Create reply suggestion"><span className="material-symbols-outlined text-[18px]">reply</span></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="flex flex-col items-center justify-between gap-3 border-t border-zinc-800 bg-zinc-900/70 px-4 py-3 sm:flex-row">
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
            <span>Showing <strong className="font-mono text-zinc-300">{firstResult}–{lastResult}</strong> of <strong className="font-mono text-zinc-300">{data?.total.toLocaleString() || 0}</strong></span>
            <label className="flex items-center gap-2">Rows <select value={limit} onChange={(event) => updateParams({ limit: event.target.value, page: '1' })} className="rounded-md bg-zinc-800 px-2 py-1 text-zinc-200 outline-none"><option value={25}>25</option><option value={50}>50</option><option value={100}>100</option></select></label>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" disabled={page <= 1} onClick={() => changePage(page - 1)} className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white disabled:opacity-30"><span className="material-symbols-outlined text-[18px]">chevron_left</span></button>
            <span className="min-w-28 text-center font-mono text-xs text-zinc-400">Page {Math.min(page, totalPages)} of {totalPages}</span>
            <button type="button" disabled={page >= totalPages} onClick={() => changePage(page + 1)} className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white disabled:opacity-30"><span className="material-symbols-outlined text-[18px]">chevron_right</span></button>
          </div>
        </footer>
      </section>

      {selectedReview && (
        <aside className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:w-[36rem]" aria-label="Reply suggestion">
          <div className="flex max-h-[calc(100vh-6rem)] flex-col gap-4 overflow-y-auto rounded-2xl border border-zinc-700 bg-zinc-900/95 p-5 shadow-2xl backdrop-blur-xl">
            <div className="flex items-start justify-between gap-3">
              <div><div className="font-semibold text-zinc-100">Reply suggestion</div><div className="mt-0.5 text-xs text-zinc-500">For {selectedReview.platform} · {selectedReview.rating}★</div></div>
              <button type="button" onClick={() => setSelectedReview(null)} className="rounded-lg p-1 text-zinc-500 hover:bg-zinc-800 hover:text-white" aria-label="Close reply"><span className="material-symbols-outlined text-[18px]">close</span></button>
            </div>
            <blockquote className="line-clamp-3 rounded-lg border-l-2 border-indigo-500 bg-zinc-950/70 p-3 text-xs leading-relaxed text-zinc-400">{selectedReview.text}</blockquote>
            <div className="flex gap-2">
              {(['concise', 'formal'] as const).map((tone) => <button key={tone} type="button" disabled={draftMutation.isPending} onClick={() => regenerateDraft(tone)} className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize ${draftTone === tone ? 'bg-indigo-500/20 text-indigo-300' : 'bg-zinc-800 text-zinc-400 hover:text-white'}`}>{tone}</button>)}
            </div>
            <textarea value={draftText} onChange={(event) => setDraftText(event.target.value)} disabled={draftMutation.isPending} rows={6} placeholder={draftMutation.isPending ? 'Generating suggestion…' : 'Edit the reply before copying it.'} className="w-full resize-y rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-sm leading-relaxed text-zinc-200 outline-none focus:border-indigo-500 disabled:opacity-60" />
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-zinc-500">Review and edit before publishing.</span>
              <button type="button" disabled={!draftText || draftMutation.isPending} onClick={copyDraft} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-40"><span className="material-symbols-outlined text-[17px]">content_copy</span>Copy draft</button>
            </div>
          </div>
        </aside>
      )}
    </main>
  );
}
