import React, { useState } from 'react';
import { View } from '../types';
import { ChevronDown, ChevronUp, MessageCircle, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    q: 'How does escrow work?',
    a: 'When you purchase an account, your payment is held securely by NexusMarket. The seller is notified to hand over the account credentials. Once you log in, verify the stats (like skins, rank, and heroes), and change the Moonton email to your own, you confirm the delivery. Only then are funds released to the seller.'
  },
  {
    q: 'What is Anti-Retrieval Insurance?',
    a: 'Anti-Retrieval Insurance is an optional add-on during checkout. It guarantees that if the account is ever recovered by the original owner within a specified timeframe (up to lifetime depending on the tier), NexusMarket will provide a full refund or an equivalent replacement account.'
  },
  {
    q: 'How long does delivery take?',
    a: 'Delivery is typically instantaneous for accounts labeled "Instant Delivery" as our system holds the verified credentials. For manual handovers, sellers have up to 24 hours to provide the details, but the average time is under 2 hours.'
  },
  {
    q: 'Can I change the Moonton email immediately?',
    a: 'Yes. Every account listed on NexusMarket is required to have a changeable Moonton email or come with the original email account attached. You will receive instructions on how to secure it post-purchase.'
  }
];

interface SupportProps {
  setCurrentView: (view: View) => void;
}

export function Support({ setCurrentView }: SupportProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <button 
        onClick={() => setCurrentView('HOME')}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-display font-bold text-white mb-4">Support & FAQ</h1>
        <p className="text-lg text-slate-400">Everything you need to know about trading securely.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* FAQ Section */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[#0a0a0f] border border-white/5 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                >
                  <span className="font-semibold text-white">{faq.q}</span>
                  {openIndex === i ? (
                    <ChevronUp className="w-5 h-5 text-indigo-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 text-slate-400 text-sm leading-relaxed border-t border-white/10 mt-2">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Status */}
        <div className="md:col-span-1">
           <div className="bg-indigo-900/10 border border-indigo-500/20 rounded-2xl p-6 text-center sticky top-24">
             <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                <MessageCircle className="w-8 h-8 text-indigo-400" />
                <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-[#12121a] rounded-full"></span>
             </div>
             <h3 className="text-xl font-bold text-white mb-2">Live Help</h3>
             <p className="text-sm text-indigo-200/70 mb-6">Our middleman agents are currently online and ready to assist.</p>
             <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
               💬 Start Live Chat
             </button>
             <p className="text-xs text-slate-500 mt-4">Available 24/7</p>
           </div>
        </div>

      </div>
    </div>
  );
}
