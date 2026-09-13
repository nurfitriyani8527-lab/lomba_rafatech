import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="glass-primary fixed top-0 left-0 w-full z-10 backdrop-blur-md" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '0' }}>
    <div className="container mx-auto flex items-center justify-between py-4 px-6">
      <Link to="/" className="text-2xl font-bold" style={{ color: '#4F7CFF' }}>
        CareerAI
      </Link>
      <nav className="space-x-6">
        <Link to="/login" className="nav-link" style={{ color: '#F8FAFC' }}>Login</Link>
        <Link to="/register" className="nav-link" style={{ color: '#F8FAFC' }}>Register</Link>
      </nav>
    </div>
  </header>
);

export default Header;
