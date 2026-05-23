import React, { useState } from 'react';
import { View, Listing } from '../types';
import { ShieldCheck, Filter, ChevronDown, ArrowLeft, Search, ShoppingCart, Plus, Trash2 } from 'lucide-react';
import { DUMMY_LISTINGS } from '../data';
import { motion } from 'motion/react';
import { PaymentModal } from '../components/PaymentModal';
import { AddListingModal } from '../components/AddListingModal';

interface MarketplaceProps {
  setCurrentView: (view: View) => void;
  setSelectedListing: (id: string) => void;
  onPaymentSuccess?: () => void;
  listings: Listing[];
  isAdmin: boolean;
  onUpdateListing: (id: string, updates: Partial<Listing>) => void;
  onAddListing: (listing: Listing) => void;
  onDeleteListing: (id: string) => void;
}

export function Marketplace({ setCurrentView, setSelectedListing, onPaymentSuccess, listings, isAdmin, onUpdateListing, onAddListing, onDeleteListing }: MarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(5);
  const [selectedPaymentListingId, setSelectedPaymentListingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editPrice, setEditPrice] = useState<number>(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredListings = listings.filter(listing => 
    listing.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    listing.rareSkins.some(skin => skin.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const visibleListings = filteredListings.slice(0, displayCount);
  const selectedPaymentListing = listings.find(l => l.id === selectedPaymentListingId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={() => setCurrentView('HOME')}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>
      <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="bg-[#0a0a0f] border border-white/5 rounded-xl p-5 sticky top-24">
          <div className="flex items-center gap-2 mb-6 text-white font-bold pb-4 border-b border-white/10">
            <Filter className="w-5 h-5" />
            Filters
          </div>

          <div className="space-y-6">
            {/* Price Filter */}
            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Price Range</h3>
              <div className="flex items-center gap-2">
                <input type="number" placeholder="Min" className="w-full bg-[#12121a] border border-white/5 rounded-md p-2 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none" />
                <span className="text-slate-500">-</span>
                <input type="number" placeholder="Max" className="w-full bg-[#12121a] border border-white/5 rounded-md p-2 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none" />
              </div>
            </div>

            {/* Rank Filter */}
            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Current Rank</h3>
              <div className="relative">
                <select className="w-full bg-slate-950 border border-slate-800 rounded-md p-2 text-sm text-white appearance-none focus:ring-1 focus:ring-indigo-500 outline-none">
                  <option>Any Rank</option>
                  <option>Mythic Immortal</option>
                  <option>Mythic Glory</option>
                  <option>Mythic Honor</option>
                  <option>Mythic</option>
                  <option>Legend / Epic</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Quick Filters */}
            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Account Features</h3>
              <div className="space-y-2">
                {['High Winrate', 'Limited Edition Skins', 'Epic Rank', 'Grandmaster', 'Legends Skin', 'Collab Skins', 'Max Emblem'].map(feature => (
                  <label key={feature} className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="form-checkbox bg-[#12121a] border-white/10 text-indigo-600 rounded focus:ring-indigo-500 focus:ring-offset-[#0a0a0f]" />
                    <span className="text-sm text-slate-400 group-hover:text-slate-300">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

             {/* Emblems Filter */}
             <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Max Emblems</h3>
               <div className="relative">
                <select className="w-full bg-slate-950 border border-slate-800 rounded-md p-2 text-sm text-white appearance-none focus:ring-1 focus:ring-indigo-500 outline-none">
                  <option>Any</option>
                  <option>9/9 Maxed</option>
                  <option>5+ Maxed</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
              </div>
            </div>

            <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-md transition-colors text-sm mt-4">
              Apply Filters
            </button>
          </div>
        </div>
      </aside>

      {/* Listings Area */}
      <main className="flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end mb-6 gap-4">
          <div>
             <div className="flex items-center gap-4 mb-2">
               <h1 className="text-2xl font-display font-bold text-white">Available Accounts</h1>
               {isAdmin && (
                 <button 
                   onClick={() => setIsAddModalOpen(true)}
                   className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/20 rounded text-sm font-bold transition-colors"
                 >
                   <Plus className="w-4 h-4" />
                   Add New
                 </button>
               )}
             </div>
             <p className="text-sm text-slate-400">Showing {filteredListings.length} verified listings.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input 
                type="text" 
                placeholder="Search accounts or skins..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#0a0a0f] border border-white/5 rounded-md pl-9 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none w-64"
              />
            </div>
            <div className="relative">
              <select className="bg-[#0a0a0f] border border-white/5 rounded-md pl-3 pr-8 py-2 text-sm text-white appearance-none focus:ring-1 focus:ring-indigo-500 outline-none">
                 <option>Sort by: Newest</option>
                 <option>Price: Low to High</option>
                 <option>Price: High to Low</option>
                 <option>Win Rate: Highest</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {visibleListings.map((listing, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={listing.id}
              className="bg-[#0f0f16] border border-white/5 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all flex flex-col sm:flex-row group cursor-pointer"
            >
              <div className="w-full sm:w-64 h-48 sm:h-auto shrink-0 relative overflow-hidden">
                <img src={listing.featuredImageUrl} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f16] via-transparent to-transparent sm:hidden"></div>
                <div className="absolute top-3 left-3 bg-[#0f0f16]/80 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-white border border-white/10">
                  {listing.rank}
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    {editingId === listing.id ? (
                      <div className="flex-1 mr-4">
                        <input 
                          type="text" 
                          value={editTitle}
                          onChange={e => setEditTitle(e.target.value)}
                          className="w-full bg-[#12121a] border border-white/20 rounded p-1 text-white mb-2"
                        />
                      </div>
                    ) : (
                      <h2 className="text-lg font-bold text-white leading-tight pr-4">{listing.title}</h2>
                    )}
                    
                    <div className="flex flex-col items-end">
                      {editingId === listing.id ? (
                        <div className="flex items-center gap-1 mb-1">
                           <span className="text-indigo-400 font-bold">₹</span>
                           <input 
                             type="number" 
                             value={editPrice}
                             onChange={e => setEditPrice(Number(e.target.value))}
                             className="w-24 bg-[#12121a] border border-white/20 rounded p-1 text-indigo-400 font-bold text-right"
                           />
                        </div>
                      ) : (
                        <span className="text-xl font-bold text-indigo-400 shrink-0 mb-1">₹{listing.price.toLocaleString('en-IN')}</span>
                      )}
                      
                      {listing.rating && !editingId && (
                        <div className="flex items-center gap-1 text-xs">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-amber-400"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                          <span className="text-amber-400 font-bold">{listing.rating.toFixed(1)}</span>
                          <span className="text-slate-500">({listing.reviews?.length || 0})</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <span className="text-slate-500">Win Rate:</span>
                      <span className="font-medium text-emerald-400">{listing.stats.winRate}%</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <span className="text-slate-500">Heroes:</span>
                      <span className="font-medium">{listing.stats.heroesCount}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <span className="text-slate-500">Skins:</span>
                      <span className="font-medium text-fuchsia-400">{listing.stats.skinsCount}</span>
                    </div>
                  </div>
                  
                  {listing.rareSkins.length > 0 && (
                     <div className="mt-4 flex flex-wrap gap-2">
                        {listing.rareSkins.map(skin => (
                           <span key={skin} className="px-2 py-1 bg-white/5 text-slate-300 text-[10px] rounded border border-white/5">
                             {skin}
                           </span>
                        ))}
                     </div>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                  <div className="flex items-center gap-2">
                    {listing.isVerified ? (
                      <>
                        <ShieldCheck className="w-5 h-5 text-emerald-500" />
                        <span className="text-xs font-medium text-emerald-500 tracking-wide uppercase">Verified Safe</span>
                      </>
                    ) : (
                      <span className="text-xs font-medium text-slate-500 tracking-wide uppercase">Pending Verification</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {isAdmin && (
                      editingId === listing.id ? (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onUpdateListing(listing.id, { title: editTitle, price: editPrice });
                            setEditingId(null);
                          }}
                          className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-sm font-bold rounded flex items-center transition-colors"
                        >
                          Save
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingId(listing.id);
                              setEditTitle(listing.title);
                              setEditPrice(listing.price);
                            }}
                            className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 text-sm font-bold rounded transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm('Are you sure you want to delete this account?')) {
                                onDeleteListing(listing.id);
                              }
                            }}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded transition-colors"
                            title="Delete Listing"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )
                    )}
                    <button 
                      onClick={() => {
                        setSelectedListing(listing.id);
                        setCurrentView('DETAILS');
                      }}
                      className="px-4 py-2 bg-indigo-600/10 hover:bg-indigo-600/30 text-indigo-400 text-sm font-bold rounded transition-colors"
                    >
                      View Details
                    </button>
                    {!isAdmin && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPaymentListingId(listing.id);
                        }}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded flex items-center gap-2 transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Buy Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {displayCount < filteredListings.length && (
          <div className="mt-8 flex justify-center">
            <button 
              onClick={() => setDisplayCount(prev => prev + 5)}
              className="px-8 py-3 bg-[#12121a] hover:bg-[#1a1a24] border border-white/10 text-white text-sm font-bold rounded-lg transition-colors shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-500/30"
            >
              Load More Accounts
            </button>
          </div>
        )}
      </main>
      </div>

      {selectedPaymentListing && (
        <PaymentModal 
          listing={selectedPaymentListing} 
          onClose={() => setSelectedPaymentListingId(null)} 
          onPaymentSuccess={onPaymentSuccess}
        />
      )}

      {isAdmin && (
        <AddListingModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
          onAdd={onAddListing} 
        />
      )}
    </div>
  );
}
