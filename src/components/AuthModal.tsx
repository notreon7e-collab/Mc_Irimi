import React, { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onLogin?: (email: string) => void;
}

export function AuthModal({ isOpen, onClose, initialMode = 'login', onLogin }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setEmailError('');
    }
  }, [isOpen, initialMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');

    // Admin login bypasses all validations and skips password checks
    if (email.toLowerCase() === 'admin@nexus.com') {
      if (onLogin) onLogin(email);
      onClose();
      return;
    }

    // AI Simulated Verification
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1200)); // Simulate network/AI check delay

    // Verify it's a valid Google email
    const isGmail = email.toLowerCase().endsWith('@gmail.com');
    const hasValidLength = email.split('@')[0]?.length > 3;

    if (!isGmail || !hasValidLength) {
      setEmailError('Email does not exist or is not linked to Google.');
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    if (onLogin) onLogin(email);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#0f0f16] border border-white/10 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                {mode === 'login' 
                  ? 'Sign in to buy, sell, and manage your MLBB accounts.' 
                  : 'Join NexusMarket to trade securely with escrow protection.'}
              </p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {mode === 'register' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Username</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="NexusTrader" 
                        className="w-full bg-[#12121a] border border-white/5 rounded-lg py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow" 
                      />
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="player@example.com" 
                      className={`w-full bg-[#12121a] border ${emailError ? 'border-red-500' : 'border-white/5'} rounded-lg py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow`}
                    />
                  </div>
                  {emailError && (
                    <p className="text-red-400 text-xs mt-1">{emailError}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    {mode === 'login' ? 'Password' : 'New Password'}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="w-full bg-[#12121a] border border-white/5 rounded-lg py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow" 
                    />
                  </div>
                </div>

                {mode === 'register' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input 
                        type="password" 
                        placeholder="••••••••" 
                        className="w-full bg-[#12121a] border border-white/5 rounded-lg py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow" 
                      />
                    </div>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors mt-2"
                >
                  {isLoading ? 'Verifying Details...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
                </button>
              </form>

              <div className="mt-6 text-center">
                <span className="text-slate-400 text-sm">
                  {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                </span>
                <button 
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  className="ml-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
                >
                  {mode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
