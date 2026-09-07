import React from 'react';
import Layout from './Layout';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import ReviewsInbox from './ReviewsInbox';
import Analytics from './Analytics';
import WordCloud from './WordCloud';
import Ideation from './Ideation';
import Reporting from './Reporting';
import Settings from './Settings';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastProvider } from './components/Toast';

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/reviews-inbox" element={<ReviewsInbox />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/word-cloud" element={<WordCloud />} />
              <Route path="/ideation" element={<Ideation />} />
              <Route path="/reporting" element={<Reporting />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Routes>
        </Router>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;

