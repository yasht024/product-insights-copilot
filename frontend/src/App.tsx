import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastProvider } from './components/Toast';
import { AccessProvider, PremiumGate } from './components/access';

const Layout = lazy(() => import('./Layout'));
const Dashboard = lazy(() => import('./Dashboard'));
const ReviewsInbox = lazy(() => import('./ReviewsInbox'));
const Analytics = lazy(() => import('./Analytics'));
const WordCloud = lazy(() => import('./WordCloud'));
const Ideation = lazy(() => import('./Ideation'));
const Reporting = lazy(() => import('./Reporting'));
const Settings = lazy(() => import('./Settings'));

function AppLoadingState() {
  return (
    <div className="grid min-h-screen place-items-center bg-background text-on-surface">
      <div className="flex items-center gap-3 text-sm text-on-surface-variant" role="status">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        Loading workspace…
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AccessProvider>
          <Router>
            <Suspense fallback={<AppLoadingState />}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/reviews-inbox" element={<ReviewsInbox />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/word-cloud" element={<WordCloud />} />
                <Route path="/ideation" element={<PremiumGate feature="Ideation"><Ideation /></PremiumGate>} />
                <Route path="/reporting" element={<Reporting />} />
                <Route path="/settings" element={<PremiumGate feature="Settings"><Settings /></PremiumGate>} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Route>
            </Routes>
            </Suspense>
          </Router>
        </AccessProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;

