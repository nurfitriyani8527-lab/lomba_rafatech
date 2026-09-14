import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import csRobotWebm from '../assets/cs-robot.webm';
import robotCsWebm from '../assets/robot-cs.webm';
import {
  Bot,
  Sparkles,
  X,
  Send,
  MessageSquare,
  RotateCcw,
  User,
  Zap,
  Lightbulb,
  FileText,
  Briefcase,
  ChevronDown
} from 'lucide-react';

// Recommended Quick Prompts
const QUICK_PROMPTS = [
  { icon: FileText, text: 'Gimana cara bikin CV tembus ATS?' },
  { icon: Briefcase, text: 'Rekomendasi karir untuk Fresh Grad?' },
  { icon: Lightbulb, text: 'Cara tahu gap skill dari deskripsi loker?' },
  { icon: Zap, text: 'Tips hadapi wawancara kerja teknis?' },
];

// Initial Welcome Message
const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'ai',
    text: 'Halo! Aku **CareerAI Assistant**. Siap bantuin kamu analisis CV, persiapan interview, atau merencanakan arah karirmu.\n\nAda yang bisa aku bantu hari ini?',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
];

// Contextual Mock AI Responder (Ready to be swapped with real API / Gemini API)
const generateMockAIResponse = (userText) => {
  const query = userText.toLowerCase();

  if (query.includes('ats') || query.includes('cv')) {
    return `**Tips CV Tembus Sistem ATS (Applicant Tracking System):**\n\n1. **Gunakan Format Standard**: Pakai font bersih seperti Arial / Inter, dan hindari tabel rumit atau grafik di CV.\n2. **Kata Kunci Spesifik**: Masukkan kata kunci teknis dari deskripsi pekerjaan targetmu.\n3. **Fokus pada Pencapaian (Quantifiable Results)**: Tulis *"Meningkatkan performa web sebesar 40%"* dibanding sekadar *"Membuat web"*.\n\n*Kamu juga bisa manfaatkan fitur **AI CV Evaluator** di platform kami untuk skor otomatis!*`;
  }

  if (query.includes('fresh grad') || query.includes('karir') || query.includes('rekomendasi')) {
    return `**Panduan Karir Fresh Graduate 2026:**\n\n1. **Identifikasi Core Skill**: Petakan keahlian utama (Hard Skills) & soft skills kamu.\n2. **Bangun Portofolio Nyata**: Projek nyata / case study jauh lebih dihargai dibanding teori.\n3. **Coba AI Career Matcher**: Unggah CV-mu di platform ini untuk dicocokkan otomatis dengan 500+ peluang karir terkini!`;
  }

  if (query.includes('gap') || query.includes('loker') || query.includes('skill')) {
    return `**Analisis Gap Skill:**\n\nPlatform CareerAI bisa membandingkan **CV kamu vs Deskripsi Loker** secara instan! Kamu akan mendapatkan:\n- Persentase kecocokan (Match Score)\n- Skill yang belum kamu miliki\n- Rekomendasi modul belajar gratis untuk menutup gap tersebut.`;
  }

  if (query.includes('interview') || query.includes('wawancara')) {
    return `**Tips Hadapi Interview Teknis & HR:**\n\n- **Gunakan Metode STAR**: (Situation, Task, Action, Result) saat menceritakan pengalaman.\n- **Riset Perusahaan**: Pahami produk & tantangan utama industri mereka.\n- **Siapkan Pertanyaan**: Tanyakan tentang budaya tim & ekspektasi 3 bulan pertama.`;
  }

  return `Terima kasih atas pertanyaannya!\n\nSebagai **CareerAI Assistant**, aku bisa membantumu menganalisis relevansi CV, memberikan roadmap keahlian, dan mencocokkan profilmu dengan lowongan terbaik.\n\nCobalah gunakan tombol **"Cek CV Sekarang"** di landing page untuk hasil analisis terstruktur!`;
};

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTeaser, setShowTeaser] = useState(true);
  const messagesEndRef = useRef(null);

  // Auto scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setShowTeaser(false);
    }
  }, [messages, isOpen, isTyping]);

  // Handle Send Message
  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      time,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // =========================================================================
    // INTEGRATION POINT UNTUK REAL AI API (Gemini API / Custom Backend)
    // -------------------------------------------------------------------------
    // Contoh implementasi API nyata nanti:
    // fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message: text }) })
    //   .then(res => res.json())
    //   .then(data => { ... })
    // =========================================================================

    // Simulate AI Response delay
    setTimeout(() => {
      const aiReplyText = generateMockAIResponse(text);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiReplyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
    setIsTyping(false);
  };

  return (
    <>
      {/* Floating Widget Positioner */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
        
        {/* Teaser Bubble (Showed before opening chat) */}
        <AnimatePresence>
          {showTeaser && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 5 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(true)}
              style={{
                position: 'absolute',
                bottom: '70px',
                right: '0px',
                width: 'max-content',
                maxWidth: '260px',
                padding: '10px 14px',
                background: 'rgba(15, 23, 42, 0.9)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(79, 124, 255, 0.4)',
                borderRadius: '16px 16px 4px 16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(79,124,255,0.2)',
                color: '#F8FAFC',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.4) 0%, rgba(79, 124, 255, 0.4) 100%)',
                  border: '1px solid rgba(45, 212, 191, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 0 12px rgba(45, 212, 191, 0.4)',
                  overflow: 'hidden',
                }}
              >
                <video
                  src={csRobotWebm}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: '32px',
                    height: '32px',
                    objectFit: 'contain',
                    mixBlendMode: 'screen',
                    filter: 'brightness(1.5) contrast(1.35) drop-shadow(0 0 8px rgba(255, 255, 255, 0.95))',
                    pointerEvents: 'none',
                  }}
                />
              </div>
              <div>
                <span style={{ fontWeight: 600, display: 'block', fontSize: '12px', color: '#2DD4BF' }}>
                  CareerAI Bot
                </span>
                <span style={{ color: '#CBD5E1', fontSize: '12px' }}>Tanya seputar CV & Karir!</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTeaser(false);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  padding: '2px',
                  marginLeft: '4px',
                }}
              >
                <X size={12} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Popup Box with 3D MacBook Unfolding Opening Animation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.25,
                rotateX: -35,
                rotateY: 8,
                y: 80,
                transformOrigin: 'bottom right',
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateX: 0,
                rotateY: 0,
                y: 0,
                transition: {
                  type: 'spring',
                  stiffness: 300,
                  damping: 24,
                  mass: 0.75,
                },
              }}
              exit={{
                opacity: 0,
                scale: 0.3,
                rotateX: -25,
                y: 50,
                transition: { duration: 0.2, ease: 'easeIn' },
              }}
              style={{
                position: 'absolute',
                bottom: '76px',
                right: '0',
                width: 'calc(100vw - 32px)',
                maxWidth: '400px',
                height: '560px',
                maxHeight: 'calc(100vh - 120px)',
                background: 'rgba(11, 17, 33, 0.94)',
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
                border: '1px solid rgba(45, 212, 191, 0.35)',
                borderRadius: '24px',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 50px rgba(20, 184, 166, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: '16px 20px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ position: 'relative' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.35) 0%, rgba(79, 124, 255, 0.35) 100%)',
                        border: '1px solid rgba(45, 212, 191, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 18px rgba(20, 184, 166, 0.45)',
                        overflow: 'hidden',
                      }}
                    >
                      <video
                        src={robotCsWebm}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{
                          width: '42px',
                          height: '42px',
                          objectFit: 'contain',
                          mixBlendMode: 'screen',
                          filter: 'brightness(1.5) contrast(1.35) drop-shadow(0 0 10px rgba(255, 255, 255, 0.95))',
                          pointerEvents: 'none',
                        }}
                      />
                    </div>
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-2px',
                        right: '-2px',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: '#2DD4BF',
                        border: '2.5px solid #0B1121',
                        boxShadow: '0 0 8px #2DD4BF',
                      }}
                    />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#F8FAFC' }}>
                        CareerAI Assistant
                      </h4>
                      <Sparkles size={13} color="#4F7CFF" />
                    </div>
                    <span style={{ fontSize: '11px', color: '#94A3B8' }}>AI Karir • Online & Siap Bantu</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    onClick={handleResetChat}
                    title="Reset Obrolan"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      padding: '6px',
                      color: '#94A3B8',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#F8FAFC')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
                  >
                    <RotateCcw size={15} />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    title="Tutup Chat"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      padding: '6px',
                      color: '#94A3B8',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#F8FAFC')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Message Body Area */}
              <div
                style={{
                  flex: 1,
                  padding: '16px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        gap: '8px',
                        maxWidth: '86%',
                        flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                      }}
                    >
                      {/* Avatar */}
                      <div
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '8px',
                          background:
                            msg.sender === 'user'
                              ? 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)'
                              : 'linear-gradient(135deg, #4F7CFF 0%, #22D3EE 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      >
                        {msg.sender === 'user' ? (
                          <User size={14} color="#FFF" />
                        ) : (
                          <Bot size={14} color="#FFF" />
                        )}
                      </div>

                      {/* Bubble Text */}
                      <div
                        style={{
                          padding: '10px 14px',
                          borderRadius:
                            msg.sender === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                          background:
                            msg.sender === 'user'
                              ? 'linear-gradient(135deg, #4F7CFF 0%, #4338CA 100%)'
                              : 'rgba(255, 255, 255, 0.05)',
                          border:
                            msg.sender === 'user'
                              ? '1px solid rgba(79, 124, 255, 0.4)'
                              : '1px solid rgba(255, 255, 255, 0.09)',
                          color: '#F8FAFC',
                          fontSize: '13px',
                          lineHeight: '1.5',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                        }}
                      >
                        {msg.text}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: '10px',
                        color: '#64748B',
                        marginTop: '4px',
                        paddingLeft: msg.sender === 'ai' ? '34px' : '0',
                        paddingRight: msg.sender === 'user' ? '34px' : '0',
                      }}
                    >
                      {msg.time}
                    </span>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
                  >
                    <div
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #4F7CFF 0%, #22D3EE 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Bot size={14} color="#FFF" />
                    </div>
                    <div
                      style={{
                        padding: '10px 14px',
                        borderRadius: '4px 16px 16px 16px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.09)',
                        display: 'flex',
                        gap: '4px',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ fontSize: '11px', color: '#94A3B8', marginRight: '6px' }}>
                        AI berpikir
                      </span>
                      <motion.div
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                        style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#4F7CFF' }}
                      />
                      <motion.div
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                        style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#6366F1' }}
                      />
                      <motion.div
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                        style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#8B5CF6' }}
                      />
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts Bar (Showed when message count is low) */}
              {messages.length <= 2 && (
                <div
                  style={{
                    padding: '0 12px 10px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                  }}
                >
                  {QUICK_PROMPTS.map((prompt, idx) => {
                    const IconComp = prompt.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(prompt.text)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '20px',
                          padding: '6px 12px',
                          color: '#CBD5E1',
                          fontSize: '11px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          textAlign: 'left',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(79, 124, 255, 0.15)';
                          e.currentTarget.style.borderColor = 'rgba(79, 124, 255, 0.4)';
                          e.currentTarget.style.color = '#F8FAFC';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                          e.currentTarget.style.color = '#CBD5E1';
                        }}
                      >
                        <IconComp size={12} color="#4F7CFF" />
                        <span>{prompt.text}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Input Area */}
              <div
                style={{
                  padding: '12px 14px',
                  background: 'rgba(15, 23, 42, 0.95)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ketik pertanyaan karirmu..."
                    disabled={isTyping}
                    style={{
                      flex: 1,
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      padding: '10px 14px',
                      color: '#F8FAFC',
                      fontSize: '13px',
                      outline: 'none',
                      transition: 'all 0.2s',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'rgba(79, 124, 255, 0.6)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '12px',
                      background: inputValue.trim() && !isTyping
                        ? 'linear-gradient(135deg, #4F7CFF 0%, #6366F1 100%)'
                        : 'rgba(255, 255, 255, 0.08)',
                      border: 'none',
                      color: '#FFF',
                      cursor: inputValue.trim() && !isTyping ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: inputValue.trim() && !isTyping ? '0 0 15px rgba(79, 124, 255, 0.4)' : 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    <Send size={16} />
                  </button>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    fontSize: '10px',
                    color: '#64748B',
                  }}
                >
                  <Sparkles size={10} color="#4F7CFF" />
                  <span>Ditenagai oleh CareerAI Intelligence Engine</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Trigger Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '20px',
            background: isOpen
              ? 'linear-gradient(135deg, #334155 0%, #1E293B 100%)'
              : 'linear-gradient(135deg, #4F7CFF 0%, #6366F1 50%, #8B5CF6 100%)',
            border: '1.5px solid rgba(255, 255, 255, 0.35)',
            boxShadow: isOpen
              ? '0 10px 25px rgba(0, 0, 0, 0.5)'
              : '0 10px 30px rgba(79, 124, 255, 0.6), 0 0 25px rgba(45, 212, 191, 0.5)',
            color: '#FFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            outline: 'none',
            overflow: 'hidden',
          }}
        >
          {isOpen ? (
            <ChevronDown size={28} />
          ) : (
            <>
              <video
                src={csRobotWebm}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: '52px',
                  height: '52px',
                  objectFit: 'contain',
                  mixBlendMode: 'screen',
                  pointerEvents: 'none',
                  filter: 'brightness(1.5) contrast(1.35) drop-shadow(0 0 10px rgba(255, 255, 255, 0.95))',
                }}
              />
              {/* Pulse Glow ring */}
              <span
                style={{
                  position: 'absolute',
                  inset: '-3px',
                  borderRadius: '23px',
                  border: '2px solid rgba(45, 212, 191, 0.6)',
                  animation: 'pulseGlow 2s infinite',
                  pointerEvents: 'none',
                }}
              />
            </>
          )}
        </motion.button>
      </div>

      <style>{`
        @keyframes pulseGlow {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.12);
            opacity: 0.2;
          }
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
        }
      `}</style>
    </>
  );
}
