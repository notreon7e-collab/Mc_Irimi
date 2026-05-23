import React, { useState, useRef } from 'react';
import { View, Listing } from '../types';
import { UploadCloud, CheckCircle2, ArrowLeft, X } from 'lucide-react';
import { motion } from 'motion/react';
import sellBgImage from '../assets/images/sell_background_1779524403938.png';

interface SellProps {
  setCurrentView: (view: View) => void;
  onAddListing: (listing: Listing) => void;
}

export function Sell({ setCurrentView, onAddListing }: SellProps) {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [rank, setRank] = useState('Mythic');
  const [winRate, setWinRate] = useState<number | ''>('');
  const [heroes, setHeroes] = useState<number | ''>('');
  const [skins, setSkins] = useState<number | ''>('');
  const [price, setPrice] = useState<number | ''>('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [sellerWhatsapp, setSellerWhatsapp] = useState('');
  const [selectedRareSkins, setSelectedRareSkins] = useState<string[]>([]);
  
  const rareSkinOptions = ['Collector', 'Legend', 'Prime', 'M-World Series', 'KOF Series', 'Jujutsu Kaisen', 'Transformers', 'Aspirants', 'Zodiac'];

  const toggleRareSkin = (skin: string) => {
    setSelectedRareSkins(prev => 
      prev.includes(skin) ? prev.filter(s => s !== skin) : [...prev, skin]
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setImages(prev => [...prev, ...newFiles]);
      
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!price || !heroes || !skins || !winRate) {
      alert("Please fill all required fields before publishing.");
      return;
    }

    const title = `${rank} | ${heroes} Heroes | ${skins} Skins ${selectedRareSkins.length > 0 ? '| ' + selectedRareSkins[0] + ' & more' : ''}`;
    
    const newListing: Listing = {
      id: `sell-${Date.now()}`,
      title,
      price: Number(price),
      rank,
      stats: {
        winRate: Number(winRate),
        heroesCount: Number(heroes),
        skinsCount: Number(skins),
        maxEmblems: 9,
      },
      isVerified: false,
      featuredImageUrl: imagePreviews.length > 0 ? imagePreviews[0] : 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop',
      galleryUrls: imagePreviews.slice(1),
      rareSkins: selectedRareSkins,
      description: 'Player listed account pending verification.',
      sellerPhone,
      sellerWhatsapp,
    };
    
    onAddListing(newListing);
    setCurrentView('MARKETPLACE');
  };

  return (
    <div className="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex flex-col">
      {/* Background Section Layout */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center lg:bg-fixed opacity-30 pointer-events-none" 
        style={{ backgroundImage: `url(${sellBgImage})` }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#050507]/80 via-[#050507]/95 to-[#050507] pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full mx-auto">
        <button 
          onClick={() => setCurrentView('HOME')}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-display font-bold text-white mb-4">Turn Your MLBB Grind Into Cash</h1>
        <p className="text-lg text-slate-400">List your account safely on NexusMarket. Our escrow protects both you and the buyer.</p>
      </div>

      <div className="bg-[#0f0f16] border border-white/5 rounded-2xl p-6 sm:p-10">
        <form className="space-y-8" onSubmit={handleSubmit}>
          
          {/* Step 1: Basic Info */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="bg-indigo-600 text-white text-sm w-6 h-6 flex items-center justify-center rounded-full">1</span>
              Account Statistics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Current Rank</label>
                  <select 
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                    className="w-full bg-[#12121a] border border-white/5 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="Mythic Immortal">Mythic Immortal</option>
                    <option value="Mythic Glory">Mythic Glory</option>
                    <option value="Mythic Honor">Mythic Honor</option>
                    <option value="Mythic">Mythic</option>
                    <option value="Legend">Legend</option>
                    <option value="Epic">Epic</option>
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Overall Win Rate (%)</label>
                  <input type="number" step="0.1" value={winRate} onChange={e => setWinRate(Number(e.target.value) || '')} placeholder="e.g. 65.5" required className="w-full bg-[#12121a] border border-white/5 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Heroes Unlocked</label>
                  <input type="number" value={heroes} onChange={e => setHeroes(Number(e.target.value) || '')} placeholder="Total Heroes" required className="w-full bg-[#12121a] border border-white/5 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Total Skins</label>
                  <input type="number" value={skins} onChange={e => setSkins(Number(e.target.value) || '')} placeholder="Total Skins" required className="w-full bg-[#12121a] border border-white/5 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
            </div>
          </div>

          <hr className="border-white/10" />

          {/* Step 2: Rare Skins */}
          <div>
             <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="bg-indigo-600 text-white text-sm w-6 h-6 flex items-center justify-center rounded-full">2</span>
              Highlight Rare Skins
            </h2>
            <p className="text-sm text-slate-400 mb-4">Select categories you own to attract buyers.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {rareSkinOptions.map(skin => (
                <label key={skin} className={`flex items-center gap-2 p-3 bg-[#12121a] border ${selectedRareSkins.includes(skin) ? 'border-indigo-500' : 'border-white/5'} rounded-lg cursor-pointer hover:border-slate-600 transition-colors`}>
                  <input 
                    type="checkbox" 
                    checked={selectedRareSkins.includes(skin)}
                    onChange={() => toggleRareSkin(skin)}
                    className="form-checkbox bg-[#0a0a0f] border-white/10 text-indigo-600 rounded focus:ring-indigo-500 focus:ring-offset-[#12121a]" 
                  />
                  <span className="text-sm text-slate-300 select-none">{skin}</span>
                </label>
              ))}
            </div>
          </div>

          <hr className="border-white/10" />

          {/* Step 3: Media */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="bg-indigo-600 text-white text-sm w-6 h-6 flex items-center justify-center rounded-full">3</span>
              Upload Proof
            </h2>
            <div 
              className="border-2 border-dashed border-white/10 rounded-xl p-10 text-center hover:bg-white/5 hover:border-white/20 transition-colors cursor-pointer relative group"
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadCloud className="w-10 h-10 text-slate-500 mx-auto mb-4 group-hover:text-indigo-400 transition-colors" />
              <p className="text-slate-300 font-medium mb-1">Click to upload screenshots</p>
              <p className="text-xs text-slate-500">Include profile page, skin gallery, and emblem matrix (Max 5MB each)</p>
              <input 
                type="file" 
                multiple 
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            
            {imagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-black/50">
                    <img src={preview} alt={`Upload preview ${index + 1}`} className="w-full h-full object-cover" />
                    <button 
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500/80 hover:bg-red-500 text-white rounded-full transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <hr className="border-white/10" />

          {/* Step 4: Contact Details */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="bg-indigo-600 text-white text-sm w-6 h-6 flex items-center justify-center rounded-full">4</span>
              Seller Contact Details
            </h2>
            <p className="text-sm text-slate-400 mb-4">Provide your details so the buyer can contact you after a successful purchase.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Phone Number</label>
                  <input type="tel" value={sellerPhone} onChange={e => setSellerPhone(e.target.value)} placeholder="e.g. +91 98765 43210" required className="w-full bg-[#12121a] border border-white/5 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">WhatsApp Number / Link</label>
                  <input type="text" value={sellerWhatsapp} onChange={e => setSellerWhatsapp(e.target.value)} placeholder="wa.me/XXXXXXXXXX" className="w-full bg-[#12121a] border border-white/5 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
            </div>
          </div>

          <hr className="border-white/10" />

          {/* Step 5: Account Security */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="bg-indigo-600 text-white text-sm w-6 h-6 flex items-center justify-center rounded-full">5</span>
              Account Security (Escrow Dropoff)
            </h2>
            <p className="text-sm text-slate-400 mb-4 bg-indigo-500/10 border border-indigo-500/20 p-3 rounded-lg flex items-start gap-2">
               <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
               <span>Provide your Moonton login details. These are held securely in our vault and <strong>only released to the buyer after successful payment is confirmed</strong>.</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Moonton Email Address</label>
                  <input type="email" placeholder="example@gmail.com" className="w-full bg-[#12121a] border border-white/5 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Moonton Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-[#12121a] border border-white/5 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
            </div>
          </div>

          <hr className="border-white/10" />

           {/* Step 6: Pricing */}
           <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="bg-indigo-600 text-white text-sm w-6 h-6 flex items-center justify-center rounded-full">6</span>
              Set Your Price
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 max-w-sm">
               <div className="relative flex-1">
                 <span className="absolute left-4 top-3.5 text-slate-400 font-bold">₹</span>
                 <input type="number" value={price} onChange={e => setPrice(Number(e.target.value) || '')} required placeholder="0" className="w-full bg-[#12121a] border border-white/5 rounded-lg py-3 pl-8 pr-4 text-white font-bold text-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
            </div>
            <p className="text-sm text-slate-500 mt-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              NexusMarket takes a flat 10% commission on successful sales.
            </p>
          </div>

          <div className="mt-8 pt-6">
            <button type="submit" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
              🚀 Publish Listing
            </button>
          </div>

        </form>
      </div>
      </div>
    </div>
  );
}
