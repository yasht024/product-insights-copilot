import { CheckCircle2, Database, Loader2, X } from 'lucide-react';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { apiClient, apiMode, type SyncResult } from '../api/client';
import { useToast } from './toast-context';

interface ScrapeReviewsModalProps {
  isOpen: boolean;
  initialDays?: number;
  onClose: () => void;
}

export default function ScrapeReviewsModal({ isOpen, onClose, initialDays = 30 }: ScrapeReviewsModalProps) {
  const [days, setDays] = useState(String(initialDays));
  const [maxReviewsPerStore, setMaxReviewsPerStore] = useState(200);
  const [isScraping, setIsScraping] = useState(false);
  const [result, setResult] = useState<SyncResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  if (!isOpen) return null;

  const parsedDays = Number(days);
  const isValid = Number.isInteger(parsedDays) && parsedDays >= 1 && parsedDays <= 365;

  const handleScrape = async () => {
    if (!isValid) {
      setErrorMessage('Enter a whole number between 1 and 365.');
      return;
    }

    setIsScraping(true);
    setErrorMessage('');
    setResult(null);
    try {
      const syncResult = await apiClient.syncFeeds('ws_1', parsedDays, maxReviewsPerStore);
      setResult(syncResult);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['dashboardMetrics'] }),
        queryClient.invalidateQueries({ queryKey: ['analytics'] }),
        queryClient.invalidateQueries({ queryKey: ['reviews'] }),
        queryClient.invalidateQueries({ queryKey: ['reviewSummary'] }),
        queryClient.invalidateQueries({ queryKey: ['syncStatus'] }),
      ]);
      addToast({
        type: syncResult.status === 'success' ? 'success' : 'info',
        title: 'Review scrape complete',
        message: `Imported ${syncResult.new_reviews} reviews from the last ${parsedDays} days.`,
      });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Review scraping failed.');
    } finally {
      setIsScraping(false);
    }
  };

  const handleClose = () => {
    if (isScraping) return;
    setResult(null);
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800 p-5">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-zinc-100">{apiMode === 'demo' ? 'Public demo data' : 'Scrape recent reviews'}</h2>
          </div>
          <button type="button" onClick={handleClose} disabled={isScraping} aria-label="Close" className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white disabled:opacity-50">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col gap-5 p-6">
          <p className="text-sm text-zinc-400">
            {apiMode === 'demo' ? 'This hosted demo uses a synthetic, privacy-safe dataset so every dashboard works without exposing a database or API. Run the project locally or connect a hosted API to import current store reviews.' : 'Import public Groww reviews from Google Play and the Apple App Store. Existing review IDs are skipped, so increasing the limit later imports only the remaining reviews.'}
          </p>

          {apiMode !== 'demo' && !result && (
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-2 text-sm font-medium text-zinc-200">
                How many past days should we scrape?
                <div className="relative">
                  <input
                    type="number"
                    min={1}
                    max={365}
                    step={1}
                    value={days}
                    onChange={(event) => setDays(event.target.value)}
                    disabled={isScraping}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 pr-16 text-zinc-100 outline-none transition-colors focus:border-indigo-500 disabled:opacity-60"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-500">days</span>
                </div>
                <span className="text-xs font-normal text-zinc-500">Choose between 1 and 365 days.</span>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-zinc-200">
                Most recent reviews to inspect per store
                <select value={maxReviewsPerStore} onChange={(event) => setMaxReviewsPerStore(Number(event.target.value))} disabled={isScraping} className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none transition-colors focus:border-indigo-500 disabled:opacity-60">
                  <option value={50}>Latest 50</option>
                  <option value={100}>Latest 100</option>
                  <option value={200}>Latest 200</option>
                  <option value={500}>Latest 500</option>
                </select>
                <span className="text-xs font-normal leading-relaxed text-zinc-500">Applied separately to Google Play and Apple App Store. Older reviews and existing review IDs are skipped. Choose a higher limit later to inspect further back.</span>
              </label>
            </div>
          )}

          {apiMode !== 'demo' && isScraping && (
            <div className="flex items-center gap-3 rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-4 text-sm text-indigo-300">
              <Loader2 className="h-5 w-5 animate-spin" />
              Inspecting up to {maxReviewsPerStore} reviews per store from the last {parsedDays} days…
            </div>
          )}

          {apiMode !== 'demo' && result && (
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
              <div className="mb-3 flex items-center gap-2 text-emerald-300">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-semibold">Imported {result.new_reviews} new reviews</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs text-zinc-400">
                <span>Google Play</span><span className="text-right tabular-nums text-zinc-200">{result.source_counts.google_play}</span>
                <span>Apple App Store</span><span className="text-right tabular-nums text-zinc-200">{result.source_counts.apple_app_store}</span>
                <span>Existing duplicates skipped</span><span className="text-right tabular-nums text-zinc-200">{result.duplicate_counts.google_play + result.duplicate_counts.apple_app_store}</span>
              </div>
              {result.errors.length > 0 && (
                <p className="mt-3 border-t border-zinc-700/60 pt-3 text-xs text-amber-300">{result.errors.join('. ')}.</p>
              )}
            </div>
          )}

          {apiMode !== 'demo' && errorMessage && <div role="alert" className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">{errorMessage}</div>}
        </div>

        <div className="flex justify-end gap-3 border-t border-zinc-800 bg-zinc-900/50 p-5">
          <button type="button" onClick={handleClose} disabled={isScraping} className="rounded-xl px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white disabled:opacity-50">
            {apiMode === 'demo' || result ? 'Close' : 'Cancel'}
          </button>
          {apiMode !== 'demo' && !result && (
            <button type="button" onClick={handleScrape} disabled={isScraping || !isValid} className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-600/20 transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50">
              {isScraping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Database className="h-4 w-4" />}
              {isScraping ? 'Scraping…' : 'Run scrape'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
