'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

function RobotAvatar({ size = 40, animated = false }: { size?: number; animated?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={animated ? { animation: 'robotFloat 3s ease-in-out infinite' } : undefined}
    >
      {/* Antenna */}
      <line x1="32" y1="4" x2="32" y2="14" stroke="#00C896" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="3" r="3" fill="#00C896">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
      {/* Head */}
      <rect x="10" y="14" width="44" height="32" rx="8" fill="#112240" stroke="#0066FF" strokeWidth="1.5" />
      {/* Eyes */}
      <ellipse cx="22" cy="28" rx="6" ry="6" fill="#0A1628">
        <animate attributeName="fill" values="#0A1628;#00C896;#0A1628" dur="3s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="42" cy="28" rx="6" ry="6" fill="#0A1628">
        <animate attributeName="fill" values="#0A1628;#00C896;#0A1628" dur="3s" repeatCount="indefinite" />
      </ellipse>
      <circle cx="22" cy="28" r="3" fill="#00C896">
        <animate attributeName="r" values="3;2;3" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="42" cy="28" r="3" fill="#00C896">
        <animate attributeName="r" values="3;2;3" dur="2s" repeatCount="indefinite" />
      </circle>
      {/* Mouth */}
      <rect x="20" y="37" width="24" height="4" rx="2" fill="#0066FF" opacity="0.8" />
      <rect x="22" y="38" width="4" height="2" rx="1" fill="#3385FF">
        <animate attributeName="opacity" values="1;0.3;1" dur="0.8s" repeatCount="indefinite" />
      </rect>
      <rect x="30" y="38" width="4" height="2" rx="1" fill="#3385FF">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="0.8s" repeatCount="indefinite" />
      </rect>
      <rect x="38" y="38" width="4" height="2" rx="1" fill="#3385FF">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
      </rect>
      {/* Ears */}
      <rect x="4" y="22" width="6" height="12" rx="3" fill="#112240" stroke="#0066FF" strokeWidth="1" />
      <rect x="54" y="22" width="6" height="12" rx="3" fill="#112240" stroke="#0066FF" strokeWidth="1" />
      {/* Neck */}
      <rect x="26" y="46" width="12" height="6" rx="2" fill="#0A1628" stroke="#0066FF" strokeWidth="1" />
    </svg>
  )
}

function TypingDots() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '4px 0' }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#00C896',
            display: 'inline-block',
            animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hey there! 👋 I'm RASTA-BOT, your AI assistant for Rasta Infotech. Ask me anything about our services, placements, or IT solutions!" },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasNew, setHasNew] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  useEffect(() => {
    if (open) {
      setHasNew(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  async function sendMessage() {
    const text = input.trim()
    if (!text || loading) return

    const userMessage: Message = { role: 'user', content: text }
    const updated = [...messages, userMessage]
    setMessages(updated)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      })
      const data = await res.json()
      setMessages([...updated, { role: 'assistant', content: data.reply || data.error }])
    } catch {
      setMessages([...updated, { role: 'assistant', content: 'Connection lost. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <>
      <style>{`
        @keyframes robotFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-8px); opacity: 1; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,200,150,0.4), 0 0 20px rgba(0,102,255,0.3); }
          50% { box-shadow: 0 0 0 12px rgba(0,200,150,0), 0 0 40px rgba(0,102,255,0.5); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes messageIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes badgePop {
          0% { transform: scale(0); }
          70% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        .chat-message { animation: messageIn 0.3s ease-out forwards; }
        .chat-window { animation: slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .robot-btn { animation: pulseGlow 2.5s ease-in-out infinite; }
        .chat-input:focus { outline: none; box-shadow: 0 0 0 2px #0066FF, 0 0 12px rgba(0,102,255,0.3); }
        .send-btn:hover:not(:disabled) { background: linear-gradient(135deg, #00C896, #00a87d); transform: scale(1.05); }
        .send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .send-btn { transition: all 0.2s ease; }
      `}</style>

      {/* Floating robot button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="robot-btn"
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 9999,
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)',
          border: '2px solid #0066FF',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s ease',
        }}
        aria-label="Toggle chat"
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00C896" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <RobotAvatar size={42} animated />
        )}
        {hasNew && !open && (
          <span style={{
            position: 'absolute',
            top: -4,
            right: -4,
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: '#00C896',
            border: '2px solid #0A1628',
            fontSize: 10,
            color: '#0A1628',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'badgePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}>1</span>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div
          className="chat-window"
          style={{
            position: 'fixed',
            bottom: 100,
            right: 24,
            zIndex: 9998,
            width: 380,
            maxWidth: 'calc(100vw - 48px)',
            background: 'linear-gradient(180deg, #0D1F3C 0%, #0A1628 100%)',
            borderRadius: 20,
            border: '1px solid rgba(0,102,255,0.3)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,102,255,0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            maxHeight: '70vh',
          }}
        >
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #112240 0%, #0D1F3C 100%)',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            borderBottom: '1px solid rgba(0,102,255,0.2)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Animated scan line */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(transparent 40%, rgba(0,102,255,0.05) 50%, transparent 60%)',
              animation: 'scanline 3s linear infinite',
              pointerEvents: 'none',
            }} />
            <div style={{
              background: 'linear-gradient(135deg, #0066FF22, #00C89622)',
              border: '1px solid rgba(0,200,150,0.3)',
              borderRadius: '50%',
              padding: 6,
              flexShrink: 0,
            }}>
              <RobotAvatar size={36} animated />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 15, letterSpacing: 0.3 }}>RASTA-BOT</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                <span style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#00C896',
                  boxShadow: '0 0 6px #00C896',
                  display: 'inline-block',
                  animation: 'pulseGlow 2s ease-in-out infinite',
                }} />
                <span style={{ color: '#00C896', fontSize: 11, fontWeight: 500 }}>Online · Rasta Infotech AI</span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#8892A4',
                transition: 'all 0.2s',
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(0,102,255,0.3) transparent',
          }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className="chat-message"
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-end',
                  gap: 8,
                }}
              >
                {msg.role === 'assistant' && (
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0066FF22, #00C89622)',
                    border: '1px solid rgba(0,200,150,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <RobotAvatar size={22} />
                  </div>
                )}
                <div style={{
                  maxWidth: '76%',
                  padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  color: '#FFFFFF',
                  ...(msg.role === 'user'
                    ? {
                        background: 'linear-gradient(135deg, #0066FF, #3385FF)',
                        boxShadow: '0 4px 12px rgba(0,102,255,0.3)',
                      }
                    : {
                        background: 'rgba(17,34,64,0.9)',
                        border: '1px solid rgba(0,102,255,0.2)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                      }),
                }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-message" style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0066FF22, #00C89622)',
                  border: '1px solid rgba(0,200,150,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <RobotAvatar size={22} animated />
                </div>
                <div style={{
                  padding: '10px 16px',
                  borderRadius: '18px 18px 18px 4px',
                  background: 'rgba(17,34,64,0.9)',
                  border: '1px solid rgba(0,102,255,0.2)',
                }}>
                  <TypingDots />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick suggestions */}
          {messages.length === 1 && (
            <div style={{ padding: '0 16px 12px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['Our services', 'Placement programs', 'Contact us'].map((s) => (
                <button
                  key={s}
                  onClick={() => { setInput(s); setTimeout(() => inputRef.current?.focus(), 0) }}
                  style={{
                    padding: '5px 12px',
                    borderRadius: 20,
                    background: 'rgba(0,102,255,0.1)',
                    border: '1px solid rgba(0,102,255,0.3)',
                    color: '#3385FF',
                    fontSize: 11.5,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: '12px 16px',
            borderTop: '1px solid rgba(0,102,255,0.15)',
            display: 'flex',
            gap: 10,
            background: 'rgba(10,22,40,0.8)',
          }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              disabled={loading}
              className="chat-input"
              style={{
                flex: 1,
                background: 'rgba(17,34,64,0.8)',
                border: '1px solid rgba(0,102,255,0.25)',
                borderRadius: 12,
                padding: '10px 14px',
                color: '#FFFFFF',
                fontSize: 13.5,
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.2s',
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="send-btn"
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #00C896, #00a87d)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,200,150,0.3)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" fill="white" stroke="none" />
              </svg>
            </button>
          </div>

          {/* Footer */}
          <div style={{
            padding: '6px 16px 10px',
            textAlign: 'center',
            fontSize: 10.5,
            color: '#8892A4',
            background: 'rgba(10,22,40,0.8)',
          }}>
            Powered by <span style={{ color: '#0066FF' }}>Rasta Infotech AI</span> · LLaMA 3.3 70B
          </div>
        </div>
      )}
    </>
  )
}
