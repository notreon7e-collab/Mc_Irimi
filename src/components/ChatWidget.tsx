import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, ShieldCheck, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user' | 'system';
  text: string;
}

export function ChatWidget({ isOpen, onClose }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initial greeting sequence when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initSequence = async () => {
        setMessages([{ id: '1', sender: 'system', text: 'Secure Escrow Chat Initialized. End-to-end encryption enabled.' }]);
        
        await new Promise(r => setTimeout(r, 1000));
        setMessages(prev => [...prev, { 
          id: '2', 
          sender: 'ai', 
          text: 'Hello! I am your AI Escrow Agent. I have received the notification that your payment proof was submitted and verified.' 
        }]);

        await new Promise(r => setTimeout(r, 1500));
        setMessages(prev => [...prev, { 
          id: '3', 
          sender: 'ai', 
          text: 'I am securely fetching the login credentials (Gmail ID and Password) for your purchased account...' 
        }]);

        await new Promise(r => setTimeout(r, 2000));
        setMessages(prev => [...prev, { 
          id: '4', 
          sender: 'ai', 
          text: 'Credentials secured! \n\nEmail: user_transfer_992@gmail.com\nPassword: NexusSecurePass2026!\n\nPlease log in to check the account. Do not change the password until you have verified all details.' 
        }]);
      };
      initSequence();
    }
  }, [isOpen, messages.length]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = { id: Date.now().toString(), sender: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'I am monitoring your secure transfer. Let me know once you have successfully logged in and verified the account, and I will finalize the escrow release.'
      }]);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-[#0f0f16] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-[300]"
        >
          {/* Header */}
          <div className="bg-[#12121a] border-b border-white/10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-500/30">
                  <ShieldCheck className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#12121a] rounded-full"></div>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm flex items-center gap-2">
                  AI Escrow Agent
                  <Lock className="w-3 h-3 text-emerald-400" />
                </h3>
                <span className="text-emerald-400 text-xs font-medium">Online & Secure</span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#050507]">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                {msg.sender === 'system' ? (
                  <div className="w-full text-center my-2">
                    <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-500/20">
                      {msg.text}
                    </span>
                  </div>
                ) : (
                  <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-indigo-600 text-white rounded-br-sm' 
                      : 'bg-[#1a1a24] border border-white/5 text-slate-200 rounded-bl-sm whitespace-pre-wrap'
                  }`}>
                    {msg.text}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-[#12121a] border-t border-white/10">
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..." 
                className="flex-1 bg-[#0a0a0f] border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="p-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-slate-500 text-center mt-2 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" /> End-to-end encrypted transfer
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
