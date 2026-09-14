import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ChatBubble from './components/ChatBubble';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', color: '#F8FAFC', background: '#050816', minHeight: '100vh', textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>Sedang memuat ulang komponen...</h2>
          <button
            onClick={() => { this.setState({ hasError: false }); window.location.reload(); }}
            style={{ padding: '10px 20px', borderRadius: '8px', background: '#2DD4BF', color: '#050816', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
          >
            Muat Ulang Halaman
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Initial landing page on root path */}
          <Route path="/" element={<Landing />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<Dashboard />} />
          <Route path="/cv-builder" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
        <ChatBubble />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;


