import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ChatBubble from './components/ChatBubble';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Directly enter Dashboard as requested by user */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/upload" element={<Dashboard />} />
        <Route path="/cv-builder" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <ChatBubble />
    </BrowserRouter>
  );
}

export default App;


