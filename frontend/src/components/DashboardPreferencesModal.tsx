import { SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';

export interface DashboardPreferences {
  showVolume: boolean;
  showRating: boolean;
  showAdvocacy: boolean;
  advocateMin: number;
  criticMax: number;
  minimumWords: number;
}

interface DashboardPreferencesModalProps {
  isOpen: boolean;
  preferences: DashboardPreferences;
  onClose: () => void;
  onSave: (preferences: DashboardPreferences) => void;
}

export default function DashboardPreferencesModal({
  isOpen,
  preferences,
  onClose,
  onSave,
}: DashboardPreferencesModalProps) {
  const [draft, setDraft] = useState(preferences);

  if (!isOpen) return null;

  const hasVisibleMetric = draft.showVolume || draft.showRating || draft.showAdvocacy;

  const toggle = (key: 'showVolume' | 'showRating' | 'showAdvocacy') => {
    setDraft((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800 p-5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-zinc-100">Customize dashboard metrics</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col gap-6 p-6">
          <fieldset className="flex flex-col gap-3">
            <legend className="mb-2 text-sm font-semibold text-zinc-200">Metrics to display</legend>
            {[
              ['showVolume', 'Review volume', 'Number of unique imported reviews'],
              ['showRating', 'Average rating', 'Arithmetic mean and median of store ratings'],
              ['showAdvocacy', 'Rating advocacy', 'Advocate percentage minus critic percentage'],
            ].map(([key, label, description]) => (
              <label key={key} className="flex cursor-pointer items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-950/50 p-3">
                <input
                  type="checkbox"
                  checked={draft[key as keyof Pick<DashboardPreferences, 'showVolume' | 'showRating' | 'showAdvocacy'>]}
                  onChange={() => toggle(key as 'showVolume' | 'showRating' | 'showAdvocacy')}
                  className="mt-1 accent-indigo-500"
                />
                <span className="flex flex-col">
                  <span className="text-sm font-medium text-zinc-200">{label}</span>
                  <span className="text-xs text-zinc-500">{description}</span>
                </span>
              </label>
            ))}
          </fieldset>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-zinc-300">
              Advocate rating starts at
              <select value={draft.advocateMin} onChange={(event) => setDraft((current) => ({ ...current, advocateMin: Number(event.target.value) }))} className="rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-indigo-500">
                <option value={4}>4 stars</option>
                <option value={5}>5 stars</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm text-zinc-300">
              Critic rating ends at
              <select value={draft.criticMax} onChange={(event) => setDraft((current) => ({ ...current, criticMax: Number(event.target.value) }))} className="rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-indigo-500">
                <option value={1}>1 star</option>
                <option value={2}>2 stars</option>
                <option value={3}>3 stars</option>
              </select>
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm text-zinc-300">
            Only calculate metrics from reviews with more than this many words
            <input type="number" min={0} max={100} step={1} value={draft.minimumWords} onChange={(event) => setDraft((current) => ({ ...current, minimumWords: Math.min(100, Math.max(0, Number(event.target.value) || 0)) }))} className="rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-indigo-500" />
            <span className="text-xs text-zinc-500">Use 0 to include every real store review. This setting affects volume, ratings, and advocacy together.</span>
          </label>

          <p className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-3 text-xs leading-5 text-zinc-400">
            Rating advocacy is not survey NPS. It is calculated only from app-store ratings: advocate share − critic share. Ratings between your two thresholds are neutral.
          </p>

          {!hasVisibleMetric && <p role="alert" className="text-sm text-rose-300">Keep at least one metric visible.</p>}
        </div>

        <div className="flex justify-end gap-3 border-t border-zinc-800 p-5">
          <button type="button" onClick={onClose} className="rounded-xl px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800">Cancel</button>
          <button type="button" disabled={!hasVisibleMetric} onClick={() => onSave(draft)} className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50">Save preferences</button>
        </div>
      </div>
    </div>
  );
}
