import React, { useState } from 'react';
import { Play, CheckCircle2, Loader2, X } from 'lucide-react';

interface CategorizeReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CategorizeReviewsModal({ isOpen, onClose }: CategorizeReviewsModalProps) {
  const [isCategorizing, setIsCategorizing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  if (!isOpen) return null;

  const handleStart = () => {
    setIsCategorizing(true);
    setProgress(0);
    setIsComplete(false);

    // Simulate categorization progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCategorizing(false);
          setIsComplete(true);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800/60">
          <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
            <Play className="w-5 h-5 text-indigo-400" />
            Categorize Pending Reviews
          </h2>
          <button 
            onClick={onClose} 
            className="p-1.5 text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-zinc-400">
              This will run the <span className="text-indigo-400 font-mono text-xs">GPT-4o Insights v3</span> model on all uncategorized reviews to classify them by intent, sentiment, and product area.
            </p>
            <div className="flex justify-between items-center text-xs font-mono mt-2 bg-zinc-950 p-3 rounded-lg border border-zinc-800">
              <span className="text-zinc-400">Pending Reviews</span>
              <span className="text-zinc-100 font-bold">2,758</span>
            </div>
          </div>

          {!isCategorizing && !isComplete && (
            <div className="flex flex-col gap-4 bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/60">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-300">Date Range Filter</label>
                <select className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 transition-colors">
                  <option>Today</option>
                  <option>Yesterday</option>
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>Custom Date Range</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-300">Review Count Limit</label>
                <select className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 transition-colors">
                  <option>Top 50</option>
                  <option>Top 100</option>
                  <option>Top 500</option>
                  <option>All in selected date range</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-300">Smart Sorting</label>
                <select className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 transition-colors">
                  <option>Newest First</option>
                  <option>Lowest Rated First</option>
                  <option>Highest Rated First</option>
                  <option>Random Sample</option>
                </select>
              </div>
            </div>
          )}

          {isCategorizing && (
            <div className="flex flex-col gap-3 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-indigo-400 flex items-center gap-2">
                  <Loader2 className="w-3 h-3 animate-spin" /> Processing...
                </span>
                <span className="text-indigo-300">{Math.min(progress, 100)}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-zinc-950/80 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300" 
                  style={{ width: `${Math.min(progress, 100)}%` }}
                ></div>
              </div>
            </div>
          )}

          {isComplete && (
            <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold text-emerald-400">Categorization Complete</h3>
                <p className="text-xs text-emerald-500/80">Successfully processed 2,758 reviews.</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-5 border-t border-zinc-800/60 flex justify-end gap-3 bg-zinc-900/50">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            {isComplete ? 'Close' : 'Cancel'}
          </button>
          {!isComplete && (
            <button 
              onClick={handleStart}
              disabled={isCategorizing}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCategorizing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Categorizing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Start Pipeline
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
