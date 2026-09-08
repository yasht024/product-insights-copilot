/* oxlint-disable react/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { Check, Crown, KeyRound, LockKeyhole, ShieldCheck, Sparkles, X } from 'lucide-react';
import { apiClient, ownerSession, type AccessStatus } from '../api/client';

interface AccessContextValue {
  status: AccessStatus;
  isLoading: boolean;
  canWrite: boolean;
  openAccess: () => void;
}

const viewerStatus: AccessStatus = {
  role: 'viewer',
  permissions: { scrape: false, manage_reviews: false, premium_tools: false },
  team_access: 'owner_only',
};

const AccessContext = createContext<AccessContextValue | null>(null);

function AccessDialog({
  open,
  status,
  onClose,
  onVerified,
}: {
  open: boolean;
  status: AccessStatus;
  onClose: () => void;
  onVerified: (status: AccessStatus) => void;
}) {
  const [accessKey, setAccessKey] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!open) return null;

  const verify = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await apiClient.verifyOwnerAccess(accessKey.trim());
      ownerSession.save(accessKey.trim());
      const next = await apiClient.getAccessStatus();
      onVerified(next);
      setAccessKey('');
    } catch (cause) {
      ownerSession.clear();
      setError(cause instanceof Error ? cause.message : 'Access could not be verified.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const signOut = () => {
    ownerSession.clear();
    onVerified(viewerStatus);
  };

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/75 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="access-title">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-indigo-400/20 bg-zinc-950 shadow-2xl shadow-indigo-950/50">
        <div className="relative overflow-hidden border-b border-zinc-800 px-6 py-6">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="rounded-2xl bg-indigo-500/15 p-3 text-indigo-300"><Crown className="h-6 w-6" /></span>
              <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-300">Pro workspace</p><h2 id="access-title" className="mt-1 text-xl font-bold text-white">{status.role === 'owner' ? 'Owner access is active' : 'Unlock owner controls'}</h2></div>
            </div>
            <button type="button" onClick={onClose} aria-label="Close access dialog" className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-800 hover:text-white"><X className="h-5 w-5" /></button>
          </div>
        </div>

        {status.role === 'owner' ? (
          <div className="space-y-5 p-6">
            <div className="flex gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
              <div><p className="font-semibold text-emerald-200">Only you can make changes</p><p className="mt-1 text-sm leading-6 text-zinc-400">Scraping, review actions, Ideation, Reporting, and Settings are unlocked for this browser session.</p></div>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
              <p className="text-sm font-semibold text-zinc-200">Give anyone else permission?</p>
              <div className="mt-3 flex items-center justify-between gap-4">
                <div><p className="text-sm text-zinc-300">No — owner only</p><p className="text-xs text-zinc-500">No collaborator keys are enabled. Access stays private until you choose otherwise.</p></div>
                <span className="rounded-full bg-emerald-500/15 p-2 text-emerald-300"><Check className="h-4 w-4" /></span>
              </div>
            </div>
            <div className="flex justify-end gap-3"><button type="button" onClick={signOut} className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800">Leave owner mode</button><button type="button" onClick={onClose} className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-500">Continue</button></div>
          </div>
        ) : (
          <form onSubmit={verify} className="space-y-5 p-6">
            <p className="text-sm leading-6 text-zinc-400">Anyone can explore live insights. Scraping and premium tools require the private owner key.</p>
            <label className="block"><span className="text-sm font-medium text-zinc-200">Owner access key</span><div className="relative mt-2"><KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" /><input type="password" autoFocus minLength={12} required value={accessKey} onChange={(event) => setAccessKey(event.target.value)} placeholder="Enter your private key" className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-10 pr-4 text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-indigo-500" /></div></label>
            {error && <p role="alert" className="rounded-xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p>}
            <div className="rounded-xl bg-zinc-900/60 px-4 py-3 text-xs leading-5 text-zinc-500">Team access is disabled. The owner decides before any collaborator receives permission.</div>
            <div className="flex justify-end gap-3"><button type="button" onClick={onClose} className="rounded-xl px-4 py-2 text-sm font-medium text-zinc-400 hover:bg-zinc-900">Keep browsing</button><button type="submit" disabled={isSubmitting || accessKey.trim().length < 12} className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50">{isSubmitting ? 'Verifying…' : 'Unlock workspace'}</button></div>
          </form>
        )}
      </div>
    </div>
  );
}

export function AccessProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AccessStatus>(viewerStatus);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    let active = true;
    apiClient.getAccessStatus().then((next) => { if (active) setStatus(next); }).catch(() => { if (active) setStatus(viewerStatus); }).finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, []);

  const openAccess = useCallback(() => setDialogOpen(true), []);
  const value = useMemo(() => ({ status, isLoading, canWrite: status.permissions.scrape, openAccess }), [status, isLoading, openAccess]);
  return <AccessContext.Provider value={value}>{children}<AccessDialog open={dialogOpen} status={status} onClose={() => setDialogOpen(false)} onVerified={(next) => { setStatus(next); setDialogOpen(false); }} /></AccessContext.Provider>;
}

export function useAccess() {
  const context = useContext(AccessContext);
  if (!context) throw new Error('useAccess must be used within AccessProvider');
  return context;
}

export function PremiumGate({ feature, children }: { feature: string; children: ReactNode }) {
  const { status, openAccess } = useAccess();
  if (status.permissions.premium_tools) return children;
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div inert aria-hidden="true" className="pointer-events-none select-none opacity-30 blur-[1.5px]">{children}</div>
      <div className="absolute inset-0 flex items-start justify-center bg-gradient-to-b from-zinc-950/30 via-zinc-950/75 to-zinc-950 p-5 pt-20 sm:pt-28">
        <section className="w-full max-w-xl rounded-3xl border border-indigo-400/20 bg-zinc-950/95 p-7 text-center shadow-2xl shadow-indigo-950/50 backdrop-blur-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-300"><LockKeyhole className="h-7 w-7" /></div>
          <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-300"><Sparkles className="h-3.5 w-3.5" />Available on Pro</div>
          <h1 className="mt-4 text-2xl font-bold text-white">Unlock {feature}</h1>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-400">Preview the workspace, then unlock owner-approved actions, saved changes, and premium workflows.</p>
          <div className="mt-5 grid gap-2 text-left text-sm text-zinc-300 sm:grid-cols-2">{['Owner-controlled access', 'Live review data', 'Protected write actions', 'Private workspace tools'].map((item) => <div key={item} className="flex items-center gap-2 rounded-xl bg-zinc-900/70 px-3 py-2"><Check className="h-4 w-4 text-emerald-400" />{item}</div>)}</div>
          <button type="button" onClick={openAccess} className="mt-6 w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500">Unlock with owner access</button>
          <p className="mt-3 text-xs text-zinc-600">Access is owner-only. No purchase or permission is granted automatically.</p>
        </section>
      </div>
    </div>
  );
}
