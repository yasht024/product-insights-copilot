import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import ReviewsInbox from './ReviewsInbox';
import Categories from './Categories';
import Analytics from './Analytics';
import WordCloud from './WordCloud';
import Ideation from './Ideation';
import Reporting from './Reporting';
import Settings from './Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inbox" element={<ReviewsInbox />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/wordcloud" element={<WordCloud />} />
        <Route path="/ideation" element={<Ideation />} />
        <Route path="/reporting" element={<Reporting />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
