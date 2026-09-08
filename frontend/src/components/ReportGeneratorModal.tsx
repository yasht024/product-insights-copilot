import ReportComposer from './ReportComposer';

export default function ReportGeneratorModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Weekly report">
    <div className="mx-auto my-8 max-w-6xl rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <button onClick={onClose} className="mb-4 rounded-lg border border-zinc-700 px-4 py-2 text-zinc-300">Close</button>
      <ReportComposer />
    </div>
  </div>;
}
