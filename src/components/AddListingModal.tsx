import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Listing } from '../types';

interface AddListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (listing: Listing) => void;
}

export function AddListingModal({ isOpen, onClose, onAdd }: AddListingModalProps) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [winRate, setWinRate] = useState<number | ''>('');
  const [heroes, setHeroes] = useState<number | ''>('');
  const [skins, setSkins] = useState<number | ''>('');
  const [rank, setRank] = useState('Mythic Glory');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !winRate || !heroes || !skins) return;

    const newListing: Listing = {
      id: `l-new-${Date.now()}`,
      title,
      price: Number(price),
      stats: {
        winRate: Number(winRate),
        heroesCount: Number(heroes),
        skinsCount: Number(skins),
        maxEmblems: 9,
      },
      isVerified: true,
      rank,
      featuredImageUrl: imagePreview || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop',
      galleryUrls: [],
      description: 'Newly added premium account.',
      rareSkins: [],
      sellerId: 'admin',
      createdAt: new Date().toISOString(),
    };

    onAdd(newListing);
    onClose();
    
    // reset form
    setTitle('');
    setPrice('');
    setWinRate('');
    setHeroes('');
    setSkins('');
    setRank('Mythic Glory');
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#050507]/80 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[#0f0f16] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#12121a]">
              <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-400" />
                Add New Account
              </h2>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Listing Title</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Mythic Glory | All KOF Skins" 
                    className="w-full bg-[#12121a] border border-white/5 rounded-lg py-2 px-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Price (₹)</label>
                    <input 
                      type="number" 
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      placeholder="e.g. 4500" 
                      className="w-full bg-[#12121a] border border-white/5 rounded-lg py-2 px-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Win Rate (%)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={winRate}
                      onChange={(e) => setWinRate(Number(e.target.value))}
                      placeholder="e.g. 68.5" 
                      className="w-full bg-[#12121a] border border-white/5 rounded-lg py-2 px-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Heroes Count</label>
                    <input 
                      type="number" 
                      value={heroes}
                      onChange={(e) => setHeroes(Number(e.target.value))}
                      placeholder="e.g. 120" 
                      className="w-full bg-[#12121a] border border-white/5 rounded-lg py-2 px-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Skins Count</label>
                    <input 
                      type="number" 
                      value={skins}
                      onChange={(e) => setSkins(Number(e.target.value))}
                      placeholder="e.g. 250" 
                      className="w-full bg-[#12121a] border border-white/5 rounded-lg py-2 px-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Rank</label>
                    <select 
                      value={rank}
                      onChange={(e) => setRank(e.target.value)}
                      className="w-full bg-[#12121a] border border-white/5 rounded-lg py-2 px-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option value="Mythic Glory">Mythic Glory</option>
                      <option value="Mythic Honor">Mythic Honor</option>
                      <option value="Mythic">Mythic</option>
                      <option value="Legend">Legend</option>
                      <option value="Epic">Epic</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Cover Image</label>
                    <div className="relative w-full h-[42px] bg-[#12121a] border border-white/5 rounded-lg flex items-center px-4 overflow-hidden">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <span className="text-sm text-slate-400 truncate">
                        {imageFile ? imageFile.name : 'Choose an image...'}
                      </span>
                    </div>
                  </div>
                </div>

                {imagePreview && (
                  <div className="w-full h-32 rounded-lg overflow-hidden border border-white/10 mt-2 bg-black/50">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                  </div>
                )}

                <div className="pt-4 border-t border-white/10">
                  <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Publish Listing
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
