import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FileText, Mail, Send, X, Plus, LockKeyhole, RefreshCw, Download, ExternalLink } from 'lucide-react';
import { apiClient, type PulseReport, type DeliveryAction } from '../api/client';
import { useAccess } from './access';

const control = 'w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-indigo-400 disabled:opacity-50';
const button = 'inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-200 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40';

export default function ReportComposer() {
  const { canWrite, openAccess } = useAccess();
  const [days, setDays] = useState(70);
  const [platform, setPlatform] = useState('All Platforms');
  const [generatedReport, setReport] = useState<PulseReport | null>(null);
  const latestReport = useQuery({
    queryKey: ['latestPublicReport'],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    queryFn: () => apiClient.getLatestPublicReport('ws_1'),
    retry: false,
    staleTime: 60_000,
  });
  const report = generatedReport ?? latestReport.data ?? null;
  const [recipients, setRecipients] = useState<string[]>([]);
  const [recipientInput, setRecipientInput] = useState('');
  const [message, setMessage] = useState('');
  const [documentInput, setDocumentInput] = useState<string | null>(null);
  const [documentUrl, setDocumentUrl] = useState('');
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [confirmSend, setConfirmSend] = useState(false);
  const sender = useQuery({
    queryKey: ['mailSender'],
    queryFn: () => apiClient.getMailSender(),
    retry: false,
    staleTime: 60_000,
  });
  const senderLabel = sender.data?.masked_email || (sender.isLoading ? 'Loading sender…' : 'Workspace Gmail account');
  const capabilities = useQuery({
    queryKey: ['reportCapabilities', canWrite],
    queryFn: () => apiClient.getReportCapabilities('ws_1'),
    enabled: canWrite,
    retry: false,
    staleTime: 60_000,
  });
  const documentId = documentInput ?? capabilities.data?.document_id ?? '';
  const changedFilters = report && (report.days !== days || report.platform !== platform);
  const canDeliver = canWrite && !!generatedReport && !busy && !changedFilters;

  function addRecipients(): boolean {
    const incoming = recipientInput.split(/[,;\s]+/).map(value => value.trim()).filter(Boolean);
    if (incoming.some(value => !/^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/.test(value))) {
      setError('Enter email addresses, separated by commas, spaces, or new lines.');
      return false;
    }
    const next = [...recipients];
    for (const email of incoming) {
      if (!next.some(value => value.toLowerCase() === email.toLowerCase())) next.push(email);
    }
    if (next.length > 50) { setError('You can add up to 50 recipients.'); return false; }
    setRecipients(next); setRecipientInput(''); setConfirmSend(false); setError('');
    return true;
  }

  async function generate() {
    setBusy('generate'); setError(''); setNotice(''); setConfirmSend(false);
    try {
      setReport(await apiClient.generateReport('ws_1', days, platform));
      setDocumentUrl('');
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Could not generate the report.'); }
    finally { setBusy(null); }
  }

  async function deliver(action: DeliveryAction) {
    if (!report || !canDeliver) return;
    if (action !== 'docs' && recipientInput.trim()) {
      if (addRecipients()) setError('Review the recipient tags, then choose the delivery action again.');
      return;
    }
    setBusy(action); setError(''); setNotice('');
    try {
      const result = await apiClient.deliverReport('ws_1', report.id, action, recipients,
        action === 'docs' ? documentId : undefined, action === 'docs' ? '' : message);
      if (result.document_url) setDocumentUrl(result.document_url);
      setNotice(action === 'docs' ? 'Weekly pulse appended to Google Docs.'
        : action === 'draft' ? `Gmail draft created for ${result.recipients.length} recipient(s). Open Gmail Drafts to review it.`
        : `Email sent to ${result.recipients.join(', ')}.`);
      setConfirmSend(false);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Delivery could not be confirmed.'); }
    finally { setBusy(null); }
  }

  function download() {
    if (!report) return;
    const url = URL.createObjectURL(new Blob([report.content], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = `Groww-Weekly-Pulse-${report.period_end}.txt`; anchor.click();
    URL.revokeObjectURL(url);
  }

  return <div className="space-y-6">
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div><div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-300"><FileText size={16} /> Weekly product pulse</div>
        <h1 className="text-2xl font-bold text-zinc-100 sm:text-3xl">Turn feedback into next steps</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">Top themes, three real user quotes, and three action ideas. Share the same one-page report by email and Google Docs.</p>
      </div>
      <span className="flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-2 text-xs text-indigo-200"><LockKeyhole size={14} /> {canWrite ? 'Owner delivery enabled' : 'Owner sends and publishes'}</span>
    </header>

    {!canWrite && <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-4 text-sm text-zinc-300">
      <p>Read the latest report below, or prepare a message and recipient tags. Actions marked with a lock require owner access. Your composition stays in this page until you leave.</p>
      <button className={button} onClick={openAccess}><LockKeyhole size={16} /> Owner access</button>
    </div>}

    {error && <div role="alert" className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200">{error}</div>}
    {notice && <div role="status" className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">{notice}</div>}

    <div className="grid items-start gap-6 lg:grid-cols-[minmax(320px,0.85fr)_minmax(0,1.4fr)]">
      <div className="space-y-5">
        <section className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
          <h2 className="flex items-center gap-2 font-semibold text-zinc-100">{!canWrite && <LockKeyhole size={16} />} 1. Build the weekly report</h2>
          <div className="grid grid-cols-2 gap-3">
            <label className="space-y-2 text-xs text-zinc-400"><span>Review window</span><select className={control} value={days} disabled={!canWrite || !!busy} onChange={e => { setDays(Number(e.target.value)); setConfirmSend(false); }}><option value={56}>Last 8 weeks</option><option value={70}>Last 10 weeks</option><option value={84}>Last 12 weeks</option></select></label>
            <label className="space-y-2 text-xs text-zinc-400"><span>Platform</span><select className={control} value={platform} disabled={!canWrite || !!busy} onChange={e => { setPlatform(e.target.value); setConfirmSend(false); }}><option>All Platforms</option><option value="iOS">App Store</option><option value="Android">Google Play</option></select></label>
          </div>
          <p className="text-xs leading-5 text-zinc-500">Uses imported reviews from the selected window. Identifying information and duplicate reviews are excluded. Quotes preserve the original wording.</p>
          <button className={`${button} w-full border-indigo-500/40 bg-indigo-600 text-white hover:bg-indigo-500`} disabled={!canWrite || !!busy} title={!canWrite ? 'Only the owner can regenerate this report' : undefined} onClick={generate}>{canWrite ? <RefreshCw size={16} className={busy === 'generate' ? 'animate-spin' : ''} /> : <LockKeyhole size={16} />}{busy === 'generate' ? 'Building report…' : report ? 'Regenerate report' : 'Generate report'}</button>
          {canWrite && changedFilters && <p role="status" className="text-xs text-amber-300">Regenerate to apply the new filters before delivering.</p>}
          {canWrite && report && !generatedReport && !changedFilters && <p className="text-xs text-zinc-400">Regenerate to prepare a fresh report for sending or publishing.</p>}
        </section>

        <section className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
          <h2 className="flex items-center gap-2 font-semibold text-zinc-100"><Mail size={18} className="text-indigo-300" /> 2. Compose &amp; tag recipients</h2>
          <label className="block space-y-2 text-xs text-zinc-400"><span>From</span><input className={control} type="text" value={senderLabel} readOnly aria-describedby="report-sender-help" /></label>
          <p id="report-sender-help" className="text-xs leading-5 text-zinc-500">{sender.data?.masked_email ? 'Sender address is hidden for privacy. Changing accounts requires reconnecting Gmail on the MCP server.' : sender.isLoading ? 'Checking sender details…' : 'The mail connection does not provide its sender address. The owner needs to confirm it.'}</p>
          <label htmlFor="report-recipients" className="block text-xs text-zinc-400">To — one or more email addresses</label>
          <div className="flex gap-2"><input id="report-recipients" className={control} type="text" inputMode="email" value={recipientInput} disabled={!!busy} placeholder="alex@company.com, team@company.com" onChange={e => { setRecipientInput(e.target.value); setConfirmSend(false); }} onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addRecipients(); } }} /><button className={button} disabled={!!busy || !recipientInput.trim()} aria-label="Add recipients" onClick={addRecipients}><Plus size={16} /></button></div>
          <div className="flex flex-wrap gap-2" aria-label="Selected recipients">{recipients.map(email => <span key={email} className="inline-flex max-w-full items-center gap-2 break-all rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1.5 text-xs text-indigo-200">{email}<button disabled={!!busy} aria-label={`Remove ${email}`} onClick={() => { setRecipients(recipients.filter(value => value !== email)); setConfirmSend(false); }}><X size={14} /></button></span>)}</div>
          <label className="block space-y-2 text-xs text-zinc-400"><span>Your message (optional)</span><textarea className={`${control} min-h-28 resize-y`} maxLength={2000} disabled={!!busy} value={message} onChange={e => { setMessage(e.target.value); setConfirmSend(false); }} placeholder="Hi team, here is this week's Groww product pulse…" /></label>
          <p className="text-xs text-zinc-500">The complete weekly report is included below your message. All To recipients can see each other.</p>
          <div className="flex flex-wrap gap-2">
            <button className={button} disabled={!canDeliver || !capabilities.data?.draft || !recipients.length} title={!canWrite ? 'Owner access required' : undefined} onClick={() => deliver('draft')}>{canWrite ? <Mail size={16} /> : <LockKeyhole size={16} />}{busy === 'draft' ? 'Creating…' : 'Create Gmail draft'}</button>
            <button className={`${button} border-indigo-500/40 bg-indigo-600 text-white hover:bg-indigo-500`} disabled={!canDeliver || !capabilities.data?.send || !recipients.length || !!recipientInput.trim()} title={!canWrite ? 'Owner access required' : undefined} onClick={() => setConfirmSend(true)}>{canWrite ? <Send size={16} /> : <LockKeyhole size={16} />}Review &amp; send</button>
          </div>
          {confirmSend && <div className="space-y-3 rounded-xl border border-amber-400/30 bg-amber-500/5 p-4" role="group" aria-label="Confirm email delivery"><p className="text-sm text-zinc-200">Send the message and complete report shown in the preview to <strong>{recipients.join(', ')}</strong>?</p><div className="flex flex-wrap gap-2"><button className={`${button} bg-indigo-600 text-white`} disabled={!!busy} onClick={() => deliver('send')}>{busy === 'send' ? 'Sending…' : `Send now to ${recipients.length} recipient(s)`}</button><button className={button} disabled={!!busy} onClick={() => setConfirmSend(false)}>Cancel</button></div></div>}
          {notice.includes('draft created') && <a className="inline-flex items-center gap-2 text-sm text-indigo-300" href="https://mail.google.com/mail/u/0/#drafts" target="_blank" rel="noreferrer">Open Gmail drafts <ExternalLink size={14} /></a>}
        </section>

        <section className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
          <h2 className="flex items-center gap-2 font-semibold text-zinc-100"><FileText size={18} className="text-indigo-300" /> 3. Publish to Google Docs</h2>
          <label className="block space-y-2 text-xs text-zinc-400"><span>Destination Google Doc URL or ID</span><input className={control} value={documentId} disabled={!canWrite || !!busy} onChange={e => setDocumentInput(e.target.value)} placeholder="https://docs.google.com/document/d/…/edit" /></label>
          <p className="text-xs leading-5 text-zinc-500">Appends the weekly pulse to the chosen document. The connected Google account must have edit access. After publishing, emails also include the Doc link.</p>
          <button className={button} disabled={!canDeliver || !capabilities.data?.docs || !documentId.trim()} title={!canWrite ? 'Owner access required' : undefined} onClick={() => deliver('docs')}>{canWrite ? <FileText size={16} /> : <LockKeyhole size={16} />}{busy === 'docs' ? 'Publishing…' : 'Publish to Google Docs'}</button>
          {documentUrl && <a className="flex items-center gap-2 text-sm text-emerald-300" href={documentUrl} target="_blank" rel="noreferrer">Open published report <ExternalLink size={14} /></a>}
        </section>
        {canWrite && <div className="space-y-2 px-1 text-xs text-zinc-500"><p>{capabilities.isFetching ? 'Checking Docs and Gmail connection…' : capabilities.error?.message || capabilities.data?.error || `Connected capabilities: ${[capabilities.data?.docs && 'Google Docs', capabilities.data?.draft && 'Gmail drafts', capabilities.data?.send && 'Gmail sending'].filter(Boolean).join(', ') || 'None'}`}</p><button disabled={capabilities.isFetching} className="text-indigo-300 hover:underline" onClick={() => capabilities.refetch()}>Retry connection</button></div>}
      </div>

      <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/60 lg:sticky lg:top-6">
        <div className="flex items-center justify-between gap-3 border-b border-zinc-800 p-5"><div><h2 className="font-semibold text-zinc-100">Email &amp; report preview</h2><p className="mt-1 text-xs text-zinc-500">{report ? `${report.word_count} / 250 report words · ${report.review_count.toLocaleString()} eligible reviews` : latestReport.isLoading ? 'Loading the latest report…' : 'The latest report will appear here once the owner generates it.'}</p></div><button aria-label="Download report as text" className={button} disabled={!report} onClick={download}><Download size={16} /></button></div>
        <div className="space-y-3 border-b border-zinc-800 p-5 text-sm"><p className="break-words text-zinc-400"><span className="text-zinc-600">From: </span>{senderLabel}</p><p className="break-words text-zinc-400"><span className="text-zinc-600">To: </span>{recipients.join(', ') || 'Add recipient tags'}</p><p className="text-zinc-300"><span className="text-zinc-600">Subject: </span>{report?.title || 'Groww Weekly Product Pulse'}</p>{message && <p className="whitespace-pre-wrap break-words pt-2 text-zinc-300">{message}</p>}</div>
        {report ? <article aria-label="Weekly product pulse report" className="m-4 space-y-6 rounded-xl bg-white p-6 text-zinc-900 sm:m-5 sm:p-8">
          {!canWrite && <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700"><LockKeyhole size={13} /> Read-only report · Visible to everyone</span>}
          <header className="border-b border-zinc-200 pb-5"><p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Groww · Weekly product pulse</p><h3 className="mt-2 text-xl font-bold">What users care about</h3><p className="mt-2 text-xs text-zinc-500">{report.period_start} to {report.period_end} · {report.platform}</p><p className="mt-2 text-sm">{(report.source_review_count ?? report.review_count + report.excluded_count).toLocaleString()} imported reviews · {report.review_count.toLocaleString()} eligible · Average rating {report.average_rating}/5</p></header>
          <section><h4 className="mb-3 text-sm font-bold">Top themes</h4><ol className="space-y-2">{report.themes.map((theme, index) => <li key={theme.label} className="text-sm"><strong>{index + 1}. {theme.label}</strong><span className="text-zinc-500"> — {theme.count.toLocaleString()} reviews ({theme.share}%)</span></li>)}</ol></section>
          <section><h4 className="mb-3 text-sm font-bold">Anonymous user quotes</h4><div className="space-y-3">{report.quotes.map((quote, index) => <blockquote key={index} className="border-l-2 border-indigo-300 pl-3 text-sm leading-6">“{quote.text}” <span className="text-xs text-zinc-500">({quote.rating}/5)</span></blockquote>)}</div></section>
          <section><h4 className="mb-3 text-sm font-bold">Three action ideas</h4><ol className="list-decimal space-y-2 pl-4 text-sm leading-6">{report.actions.map(action => <li key={action}>{action}</li>)}</ol></section>
        </article> : <div className="px-6 py-20 text-center"><FileText className="mx-auto mb-4 text-zinc-600" size={40} /><h3 className="text-lg font-semibold text-zinc-300">A concise report, grounded in real reviews</h3><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-500">{latestReport.isLoading ? 'Loading the latest saved report…' : latestReport.error ? 'The report could not be loaded. Please retry.' : canWrite ? 'Choose an 8–12 week review window and generate your pulse. The preview uses stored review data.' : 'The owner has not generated a report yet. Once available, everyone can read it here.'}</p></div>}
        {latestReport.isError && !report && <button className={`${button} m-5`} onClick={() => latestReport.refetch()}>Retry loading report</button>}
        {documentUrl && <p className="break-all px-5 pb-4 text-xs text-indigo-300">Included in email: <a href={documentUrl} target="_blank" rel="noreferrer" className="underline">{documentUrl}</a></p>}
        {report && <p className="px-5 pb-5 text-xs leading-5 text-zinc-500">{report.method}. {report.cluster_count} themes identified; up to three highlighted. {report.excluded_count} duplicate or ineligible reviews excluded.</p>}
      </section>
    </div>
  </div>;
}
