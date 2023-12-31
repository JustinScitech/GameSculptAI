import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage.jsx';
import CreationPage from './Pages/CreationPage.jsx';
import ResultsPage from './Pages/ResultsPage.jsx';
import TeamPage from './Pages/TeamPage.jsx';
import InstructionsPage from './Pages/InstructionsPage.jsx';
import GalleriesPage from './Pages/GalleriesPage.jsx';


import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreationPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/instructions" element={<InstructionsPage />} />
        <Route path="/galleries" element={<GalleriesPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
