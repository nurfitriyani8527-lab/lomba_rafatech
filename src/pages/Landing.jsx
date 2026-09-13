import React from 'react';
import { Link } from 'react-router-dom';
import { hero, floatingCards } from '../data/mockLanding';
import { motion } from 'framer-motion';

const Landing = () => {
  return (
    <main className="landing-page relative min-h-screen" style={{ background: '#050816' }}>
      {/* Gradient blobs background */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <section className="hero-section flex flex-col md:flex-row items-center justify-between container mx-auto px-6 py-20 z-10 relative">
        <div className="text-center md:text-left max-w-lg">
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: '#4F7CFF' }}>
            Your Career.<br />
            <span className="gradient-text">Understood by AI.</span>
          </h1>
          <p className="text-lg mb-8" style={{ color: '#CBD5E1' }}>{hero.sub}</p>
          <div className="space-x-4">
            <Link to="/upload" className="btn-primary">{hero.ctaPrimary}</Link>
            <Link to="/cv-builder" className="btn-secondary">{hero.ctaSecondary}</Link>
          </div>
        </div>
        <div className="cards-grid mt-12 md:mt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {floatingCards.map((card, idx) => (
            <motion.div
              key={idx}
              className="glass-primary p-4 rounded-2xl shadow-lg"
              whileHover={{ y: -5, boxShadow: '0 10px 15px rgba(0,0,0,0.2)' }}
            >
              <h3 className="font-semibold mb-2" style={{ color: '#4F7CFF' }}>{card.title}</h3>
              {card.role && (
                <p className="text-sm mb-1">{card.role} • {card.level}</p>
              )}
              {card.confidence && (
                <p className="text-sm mb-1">Confidence: {card.confidence}%</p>
              )}
              {card.skills && (
                <p className="text-xs mb-1">Skills: {card.skills.join(', ')}</p>
              )}
              {card.opportunities && (
                <p className="text-xs">Opportunities: {card.opportunities}</p>
              )}
              {card.percent && (
                <p className="text-sm">{card.percent}% Match</p>
              )}
              {card.count && (
                <p className="text-sm">{card.count} Skills Identified</p>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Landing;
