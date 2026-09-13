import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* Future routes: /login, /register, etc. */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
