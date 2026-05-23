import React from 'react';
import { View } from '../types';
import { motion } from 'motion/react';
import { Flame, ShieldCheck, ArrowRight, Trophy, Star, Zap, Search } from 'lucide-react';
import heroSplash from '../assets/images/hero_character_splash_1779523307099.png';

interface HomeProps {
  setCurrentView: (view: View) => void;
}

export function Home({ setCurrentView }: HomeProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="relative rounded-3xl overflow-hidden bg-[#12121a] p-10 py-16 md:py-24 border border-white/5 z-10 text-center">
          <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-30 md:opacity-100 pointer-events-none overflow-hidden rounded-r-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[#12121a] via-[#12121a]/80 to-transparent z-10 hidden md:block"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-[#12121a]/80 to-transparent z-10 md:hidden"></div>
            <img 
              src={heroSplash} 
              alt="Hero Character" 
              className="w-full h-full object-cover object-top md:object-right-top"
            />
          </div>
          <div className="absolute top-0 left-0 w-full md:w-1/2 h-full bg-gradient-to-r from-[#12121a] via-indigo-900/10 to-transparent flex items-center justify-start pl-10 pointer-events-none z-10"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
              Level Up <span className="text-indigo-500 italic">Instantly</span>.<br className="hidden md:block"/> Trade Securely.
            </h1>
            <p className="mt-4 text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              The premium marketplace to buy and sell verified MLBB accounts with <strong className="text-white">100% Escrow Protection</strong>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setCurrentView('MARKETPLACE')}
                className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-indigo-400 transition-colors shadow-lg shadow-indigo-500/10"
              >
                ⚔️ Browse Accounts
              </button>
              <button 
                onClick={() => setCurrentView('SELL')}
                className="px-8 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
              >
                💰 Sell Account
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Special Offers Banner */}
      <section className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 border-y border-amber-500/10 relative overflow-hidden group cursor-pointer" onClick={() => setCurrentView('MARKETPLACE')}>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-amber-500/20 p-2 rounded-full hidden md:block">
                <Flame className="w-6 h-6 text-amber-500 animate-pulse" />
              </div>
              <p className="font-medium text-amber-50.">
                <span className="font-bold text-amber-400">FLASH SALE:</span> Get up to 20% off on Mythical Glory accounts with Max Emblems.
              </p>
            </div>
            <span className="text-sm font-bold text-amber-400 flex items-center gap-1 group-hover:gap-2 transition-all">
              View Deals <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </section>

      {/* Shop Categories Menu */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold text-white mb-4">Explore the Marketplace</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Find the exact account you need to dominate the battlefield.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Browse by Rank */}
          <div className="bg-[#0f0f16] border border-white/5 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6">
              <Trophy className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Browse by Rank</h3>
            <ul className="space-y-3">
              {['Mythic Glory+', 'Mythic & Honor', 'Legend & Epic', 'Smurf Accounts'].map((item) => (
                <li key={item}>
                  <button onClick={() => setCurrentView('MARKETPLACE')} className="text-slate-400 hover:text-white flex items-center justify-between w-full group">
                    <span>{item}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Browse by Rare Skins */}
          <div className="bg-[#0f0f16] border border-white/5 rounded-2xl p-6 hover:border-fuchsia-500/50 transition-colors">
            <div className="w-12 h-12 bg-fuchsia-500/10 rounded-xl flex items-center justify-center mb-6">
              <Star className="w-6 h-6 text-fuchsia-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Browse by Rare Skins</h3>
            <ul className="space-y-3">
              {['ALL Skins', 'Collector Skins', 'Legend & Prime', 'Limited Collabs (JJK, DBZ...)', 'Squad Sets'].map((item) => (
                <li key={item}>
                  <button onClick={() => setCurrentView('MARKETPLACE')} className="text-slate-400 hover:text-white flex items-center justify-between w-full group">
                    <span>{item}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Browse by Account Type */}
          <div className="bg-[#0f0f16] border border-white/5 rounded-2xl p-6 hover:border-cyan-500/50 transition-colors">
            <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Browse by Account Type</h3>
            <ul className="space-y-3">
              {['Maxed Accounts', 'High Win Rate (80%+)', 'Budget Picks', 'Ready to Play'].map((item) => (
                <li key={item}>
                  <button onClick={() => setCurrentView('MARKETPLACE')} className="text-slate-400 hover:text-white flex items-center justify-between w-full group">
                    <span>{item}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Features */}
          <div className="bg-[#0f0f16] border border-white/5 rounded-2xl p-6 hover:border-emerald-500/50 transition-colors">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Account Features</h3>
            <ul className="space-y-3">
              {['High Winrate', 'Limited Edition Skins', 'Epic Rank', 'Grandmaster', 'Legends Skin', 'Collab Skins', 'Max Emblem'].map((item) => (
                <li key={item}>
                  <button onClick={() => setCurrentView('MARKETPLACE')} className="text-slate-400 hover:text-white flex items-center justify-between w-full group">
                    <span>{item}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold text-white mb-4">Trusted by Thousands of Players</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Real reviews from our verified buyers and sellers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Review 1 */}
          <div className="bg-[#0f0f16] border border-white/5 rounded-2xl p-8 flex flex-col relative">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">"Safest place to buy a stacked MLBB account"</h3>
            <p className="text-slate-400 text-sm leading-relaxed flex-grow italic mb-6">
              "I was looking for an account with the All-Star and Aspirants skins but was terrified of getting pulled back. The Nexus Market middleman walked me through the entire Gmail and Moonton account securement process. Got full access in under 15 minutes. 10/10 recommend!"
            </p>
            <div className="mt-auto">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-white text-sm">Sky_Granger</span>
                <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-sm border border-emerald-500/20">
                  <ShieldCheck className="w-3 h-3" /> Verified Buyer
                </span>
              </div>
              <div className="px-3 py-2 bg-[#12121a] rounded border border-white/5 text-xs text-slate-500 font-mono">
                Traded: Mythical Glory | 150+ Skins | KoF Chou
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="bg-[#0f0f16] border border-white/5 rounded-2xl p-8 flex flex-col relative">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">"Smooth cash out for my Mythical Immortal account"</h3>
            <p className="text-slate-400 text-sm leading-relaxed flex-grow italic mb-6">
              "Sold my main account here because I don't have time to play anymore. The buyer deposited the funds into the Nexus Escrow, the admin verified my account details, and I got paid instantly via Crypto/E-wallet. Easiest trade ever."
            </p>
             <div className="mt-auto">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-white text-sm">LemonFanboy</span>
                <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-sm border border-emerald-500/20">
                  <ShieldCheck className="w-3 h-3" /> Verified Seller
                </span>
              </div>
              <div className="px-3 py-2 bg-[#12121a] rounded border border-white/5 text-xs text-slate-500 font-mono">
                Traded: Mythic Immortal | ALL HEROES | 510 Skins
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className="bg-[#0f0f16] border border-white/5 rounded-2xl p-8 flex flex-col relative">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">"Excellent Support Team"</h3>
            <p className="text-slate-400 text-sm leading-relaxed flex-grow italic mb-6">
              "There was a slight issue with the Moonton secondary verification code during the transfer, but the Nexus support team stepped in on Discord immediately and resolved it. Super professional service."
            </p>
             <div className="mt-auto">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-white text-sm">Aamon_Main</span>
                <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-sm border border-emerald-500/20">
                  <ShieldCheck className="w-3 h-3" /> Verified Buyer
                </span>
              </div>
              <div className="px-3 py-2 bg-[#12121a] rounded border border-white/5 text-xs text-slate-500 font-mono">
                Traded: Mythic Honor | Budget Smurf | Lightborn
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-400 mb-4">Want to see live vouches? Check out our #vouches channel on our Official Discord!</p>
          <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-lg transition-colors">
            View Live Discord Vouches <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
      
      {/* Escrow Guarantee */}
      <section className="bg-[#0a0a0f] border-t border-white/5 py-16 mt-auto">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <ShieldCheck className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">100% Escrow Protection</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Your money is held securely until you receive and verify the account details. Never worry about scams again. Our middlemen monitor every transaction 24/7.
            </p>
         </div>
      </section>

    </div>
  );
}
