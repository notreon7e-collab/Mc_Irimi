import React from 'react';
import { View } from '../types';
import { Shield, ShoppingCart, Tag, HelpCircle, LogIn, Menu, X, Sword, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AuthModal } from './AuthModal';

interface NavbarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  onLogin?: (email: string) => void;
  onLogout?: () => void;
  isAdmin?: boolean;
  currentUser?: string | null;
}

export function Navbar({ currentView, setCurrentView, onLogin, onLogout, isAdmin, currentUser }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [authMode, setAuthMode] = React.useState<'login' | 'register'>('login');

  const navItems: { label: string; view: View; icon: React.ReactNode }[] = [
    { label: 'Buy Accounts', view: 'MARKETPLACE', icon: <ShoppingCart className="w-4 h-4" /> },
    { label: 'Sell an Account', view: 'SELL', icon: <Tag className="w-4 h-4" /> },
    { label: 'Support', view: 'SUPPORT', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0f] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setCurrentView('HOME')}
          >
            <div className="w-8 h-8 bg-indigo-600 rounded rotate-45 group-hover:bg-indigo-500 transition-colors flex items-center justify-center">
              <Sword className="w-4 h-4 text-white -rotate-45" />
            </div>
            <span className="font-display font-bold text-xl tracking-tighter text-white">
              Nexus<span className="text-indigo-400">Market</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setCurrentView(item.view)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
                    currentView === item.view
                      ? 'text-white'
                      : 'text-slate-300 hover:text-indigo-400'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4 border-l border-white/10 pl-8">
              {isAdmin ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-500 text-sm font-bold rounded-lg border border-amber-500/20">
                    <Shield className="w-4 h-4" />
                    Admin Mode
                  </div>
                  <button 
                    onClick={onLogout}
                    title="Disable Admin Mode"
                    className="p-2 text-slate-400 hover:bg-white/5 hover:text-white rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : currentUser ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 text-sm font-bold rounded-lg border border-indigo-500/20">
                    <User className="w-4 h-4" />
                    {currentUser.split('@')[0]}
                  </div>
                  <button 
                    onClick={onLogout}
                    title="Log Out"
                    className="p-2 text-slate-400 hover:bg-white/5 hover:text-white rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }}
                  className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-lg transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Login / Register
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-slate-800 bg-slate-900"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setCurrentView(item.view);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 px-3 py-3 rounded-md text-base font-medium ${
                    currentView === item.view
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
              <hr className="border-slate-800 my-2" />
              {isAdmin ? (
                <div className="flex flex-col gap-2">
                  <div className="flex w-full items-center justify-between px-3 py-3 rounded-md text-base font-medium text-amber-500 bg-amber-500/10 border border-amber-500/20">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5" />
                      Admin Mode
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                        if(onLogout) onLogout();
                        setIsMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-red-400 hover:bg-slate-800 hover:text-red-300"
                  >
                    <LogOut className="w-5 h-5" />
                    Disable Admin Mode
                  </button>
                </div>
              ) : currentUser ? (
                <div className="flex flex-col gap-2">
                  <div className="flex w-full items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
                    <User className="w-5 h-5" />
                    {currentUser.split('@')[0]}
                  </div>
                  <button 
                    onClick={() => {
                        if(onLogout) onLogout();
                        setIsMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-red-400 hover:bg-slate-800 hover:text-red-300"
                  >
                    <LogOut className="w-5 h-5" />
                    Log Out
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }}
                  className="flex w-full items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <LogIn className="w-5 h-5" />
                  Login / Register
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode} 
        onLogin={onLogin}
      />
    </nav>
  );
}
