import React, { useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';

interface ReportGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReportGeneratorModal({ isOpen, onClose }: ReportGeneratorModalProps) {
  const [platform, setPlatform] = useState('All Platforms');
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [includeReviews, setIncludeReviews] = useState(true);
  const [includeVectors, setIncludeVectors] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleGenerateImage = async () => {
    if (!reportRef.current) return;
    try {
      setIsGenerating(true);
      const dataUrl = await htmlToImage.toPng(reportRef.current, { quality: 1.0, pixelRatio: 2 });
      saveAs(dataUrl, `Executive_Report_${platform.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.png`);
    } catch (error) {
      console.error('Failed to generate image', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-surface-container-low border border-card-border rounded-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden shadow-2xl max-h-[90vh]">
        
        {/* Configuration Sidebar */}
        <div className="w-full md:w-80 bg-surface-container-lowest border-r border-card-border p-5 flex flex-col gap-6 overflow-y-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-on-surface">Generate Report</h2>
            <button onClick={onClose} className="p-1 text-on-surface-variant hover:text-on-surface rounded hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Platform Selection</label>
              <select 
                value={platform} 
                onChange={(e) => setPlatform(e.target.value)}
                className="bg-surface-container border border-card-border rounded-xl p-2 text-sm text-on-surface focus:outline-none focus:border-primary"
              >
                <option>All Platforms</option>
                <option>iOS Only</option>
                <option>Android Only</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Timeframe</label>
              <select 
                value={dateRange} 
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-surface-container border border-card-border rounded-xl p-2 text-sm text-on-surface focus:outline-none focus:border-primary"
              >
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>Year to Date</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-card-border/60">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Include Sections</label>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-on-surface">
                <input type="checkbox" checked={includeReviews} onChange={(e) => setIncludeReviews(e.target.checked)} className="accent-primary w-4 h-4" />
                Raw Reviews Highlights
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-on-surface">
                <input type="checkbox" checked={includeVectors} onChange={(e) => setIncludeVectors(e.target.checked)} className="accent-primary w-4 h-4" />
                Friction Vectors
              </label>
            </div>
          </div>
          
          <div className="mt-auto pt-6">
            <button 
              onClick={handleGenerateImage}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-container text-white font-semibold text-sm shadow-md transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isGenerating ? 'hourglass_empty' : 'image'}
              </span>
              <span>{isGenerating ? 'Generating...' : 'Export as PNG'}</span>
            </button>
          </div>
        </div>

        {/* Live Preview Area */}
        <div className="flex-1 bg-surface p-6 overflow-y-auto flex items-start justify-center">
          <div 
            ref={reportRef}
            className="w-full max-w-[800px] bg-white text-black p-8 rounded-none shadow-sm flex flex-col gap-6 font-sans relative"
            style={{ minHeight: '600px' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-4 border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-[24px]">psychology</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight text-gray-900">Executive Dossier</span>
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Insights Copilot Enterprise</span>
                </div>
              </div>
              <div className="text-right flex flex-col">
                <span className="text-sm font-semibold text-gray-900">{platform}</span>
                <span className="text-xs text-gray-500 font-mono">{dateRange} • Generated {new Date().toLocaleDateString()}</span>
              </div>
            </div>

            {/* KPI Summary */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Avg Sentiment</span>
                <span className="text-3xl font-bold text-gray-900">4.42</span>
                <span className="text-xs text-green-600 font-semibold mt-1">+0.38 vs prior</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Reviews Analyzed</span>
                <span className="text-3xl font-bold text-gray-900">12,480</span>
                <span className="text-xs text-indigo-600 font-semibold mt-1">100% Synthesized</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">ARR Risk Mitigated</span>
                <span className="text-3xl font-bold text-red-600">$142k</span>
                <span className="text-xs text-gray-500 font-semibold mt-1">Cross 42 accounts</span>
              </div>
            </div>

            {/* AI Summary */}
            <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-xl">
              <h3 className="text-sm font-bold text-indigo-900 mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                AI Executive Summary
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Enterprise cohort retention stabilized during this period following the resolution of camera crash anomalies. The emergency hotfix restored 94.2% of detractor sentiment. However, persistent billing UX friction continues to jeopardize remaining pipeline ARR. Immediate attention is recommended for the checkout and invoice export flows.
              </p>
            </div>

            {includeVectors && (
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-2">Top Friction Vectors</h3>
                <div className="flex items-start gap-3 bg-red-50 p-3 rounded-lg border border-red-100">
                  <span className="material-symbols-outlined text-red-600">warning</span>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Camera Permissions & SDK Latency</h4>
                    <p className="text-xs text-gray-700 mt-1">40 enterprise warehouse scanners blocked during initial v2.4 migration.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                  <span className="material-symbols-outlined text-yellow-600">loop</span>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">SAML SSO Session Timeout Loop</h4>
                    <p className="text-xs text-gray-700 mt-1">Floor supervisors forced to re-authenticate every 2 hours via Okta.</p>
                  </div>
                </div>
              </div>
            )}

            {includeReviews && (
              <div className="flex flex-col gap-3 mt-2">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-2">Sample Detractor Telemetry</h3>
                <div className="flex flex-col gap-2">
                  <blockquote className="border-l-4 border-gray-300 pl-3 py-1 text-sm text-gray-600 italic">
                    "Since the last update, exporting large CSVs for our billing department just spins forever. Please fix this."
                  </blockquote>
                  <blockquote className="border-l-4 border-gray-300 pl-3 py-1 text-sm text-gray-600 italic">
                    "App keeps asking me to log in through Okta multiple times a shift. Extremely frustrating on the warehouse floor."
                  </blockquote>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
