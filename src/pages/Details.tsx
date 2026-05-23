import React, { useState } from 'react';
import { Listing, View } from '../types';
import { ShieldCheck, ArrowLeft, ShieldAlert, Check, ShoppingCart, Info, X, UploadCloud, Star, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

interface DetailsProps {
  id: string;
  setCurrentView: (view: View) => void;
  onPaymentSuccess?: () => void;
  listingItem?: Listing;
  isAdmin?: boolean;
  onUpdateListing?: (id: string, updates: Partial<Listing>) => void;
}

export function Details({ id, setCurrentView, onPaymentSuccess, listingItem, isAdmin, onUpdateListing }: DetailsProps) {
  // Synchronize state with parent props if it changes
  const [listing, setListing] = useState(listingItem!);
  React.useEffect(() => {
    if (listingItem) setListing(listingItem);
  }, [listingItem]);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editPrice, setEditPrice] = useState<number>(0);
  const [isPurchased, setIsPurchased] = useState(false);
  
  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto p-8 text-center text-white">
        Listing not found.
        <button onClick={() => setCurrentView('MARKETPLACE')} className="block mx-auto mt-4 text-indigo-400 underline">Back to Marketplace</button>
      </div>
    );
  }

  const submitReview = () => {
    if (!newReviewComment.trim()) return;
    
    const newReview = {
      id: `r-${Date.now()}`,
      user: 'Guest User', // Or a dynamically fetched logged in user name
      rating: newReviewRating,
      comment: newReviewComment,
      date: 'Just now'
    };

    const updatedReviews = [newReview, ...(listing.reviews || [])];
    const newAvgRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
    
    setListing({
      ...listing,
      reviews: updatedReviews,
      rating: Number(newAvgRating.toFixed(1))
    });
    
    setNewReviewComment('');
    setNewReviewRating(5);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={() => setCurrentView('MARKETPLACE')}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Listings
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Image */}
          <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#12121a] aspect-video relative">
            <img src={listing.featuredImageUrl} alt={listing.title} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 bg-[#0a0a0f]/80 backdrop-blur-md px-3 py-1.5 rounded-md text-sm font-bold text-white border border-white/10">
              {listing.rank}
            </div>
          </div>
          
          {/* Title & Description */}
          <div>
            <div className="flex items-center justify-between mb-4">
              {isEditing ? (
                <input 
                  type="text" 
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full text-3xl font-display font-bold bg-[#12121a] border border-white/20 rounded p-2 text-white"
                />
              ) : (
                <h1 className="text-3xl font-display font-bold text-white">{listing.title}</h1>
              )}
              {isAdmin && (
                <div className="ml-4 shrink-0">
                  {isEditing ? (
                    <button 
                      onClick={() => {
                        if (onUpdateListing) onUpdateListing(listing.id, { title: editTitle, price: editPrice });
                        setIsEditing(false);
                      }}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-sm font-bold rounded transition-colors"
                    >
                      Save Changes
                    </button>
                  ) : (
                    <button 
                      onClick={() => {
                        setEditTitle(listing.title);
                        setEditPrice(listing.price);
                        setIsEditing(true);
                      }}
                      className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-500 text-sm font-bold rounded transition-colors"
                    >
                      Edit Listing
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="bg-[#0a0a0f] border border-white/5 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Account Description</h3>
              <p className="text-slate-400 leading-relaxed text-sm whitespace-pre-wrap">
                {listing.description}
              </p>
            </div>
          </div>

          {/* Stats Sheet */}
          <div className="bg-[#0a0a0f] border border-white/5 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-6">Verified Statistics</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#12121a] border border-white/5 rounded-lg p-4 text-center">
                 <span className="block text-2xl font-bold text-emerald-400 mb-1">{listing.stats.winRate}%</span>
                 <span className="text-xs text-slate-500 uppercase tracking-wide">Win Rate</span>
              </div>
              <div className="bg-[#12121a] border border-white/5 rounded-lg p-4 text-center">
                 <span className="block text-2xl font-bold text-white mb-1">{listing.stats.heroesCount}</span>
                 <span className="text-xs text-slate-500 uppercase tracking-wide">Heroes</span>
              </div>
              <div className="bg-[#12121a] border border-white/5 rounded-lg p-4 text-center">
                 <span className="block text-2xl font-bold text-fuchsia-400 mb-1">{listing.stats.skinsCount}</span>
                 <span className="text-xs text-slate-500 uppercase tracking-wide">Skins</span>
              </div>
              <div className="bg-[#12121a] border border-white/5 rounded-lg p-4 text-center">
                 <span className="block text-2xl font-bold text-amber-400 mb-1">{listing.stats.maxEmblems}/9</span>
                 <span className="text-xs text-slate-500 uppercase tracking-wide">Max Emblems</span>
              </div>
            </div>
          </div>

          {/* Rare Skins Highlight */}
          {listing.rareSkins.length > 0 && (
             <div className="bg-[#0a0a0f] border border-white/5 rounded-xl p-6">
               <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Rare Skins Owned</h3>
               <div className="flex flex-wrap gap-3">
                  {listing.rareSkins.map(skin => (
                    <div key={skin} className="flex items-center gap-2 px-3 py-2 bg-[#12121a] border border-amber-500/30 rounded-md text-slate-200 text-sm">
                      <StarIcon className="w-4 h-4 text-amber-400 shrink-0" />
                      {skin}
                    </div>
                  ))}
               </div>
             </div>
          )}

          {/* Ratings & Reviews Section */}
          <div className="bg-[#0a0a0f] border border-white/5 rounded-xl p-6">
             <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-indigo-400" />
                  Account Ratings & Reviews
                </h3>
                {listing.rating && (
                   <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                     <StarIcon className="w-4 h-4 text-amber-400" />
                     <span className="text-indigo-300 font-bold text-sm">{listing.rating.toFixed(1)} / 5.0</span>
                   </div>
                )}
             </div>

             {/* Add Review Form */}
             <div className="bg-[#12121a] border border-white/5 rounded-xl p-5 mb-8">
               <h4 className="text-sm font-semibold text-slate-300 mb-3">Leave a rating</h4>
               <div className="flex items-center gap-1 mb-4">
                 {[1, 2, 3, 4, 5].map((star) => (
                   <button 
                     key={star} 
                     onClick={() => setNewReviewRating(star)}
                     className="focus:outline-none"
                   >
                     <StarIcon className={`w-6 h-6 ${star <= newReviewRating ? 'text-amber-400' : 'text-slate-600'} hover:scale-110 transition-transform`} />
                   </button>
                 ))}
               </div>
               <textarea 
                 value={newReviewComment}
                 onChange={(e) => setNewReviewComment(e.target.value)}
                 placeholder="Share your experience with this account or seller..."
                 className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg p-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 h-24 resize-none mb-3"
               />
               <button 
                 onClick={submitReview}
                 disabled={!newReviewComment.trim()}
                 className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-lg transition-colors"
               >
                 Submit Review
               </button>
             </div>

             {/* Review List */}
             <div className="space-y-4">
               {listing.reviews && listing.reviews.length > 0 ? (
                 listing.reviews.map(review => (
                   <div key={review.id} className="bg-[#12121a] border border-white/5 rounded-xl p-5">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-bold text-slate-200 block text-sm">{review.user}</span>
                          <span className="text-xs text-slate-500">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-0.5">
                           {[...Array(5)].map((_, i) => (
                             <StarIcon key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-amber-400' : 'text-slate-700'}`} />
                           ))}
                        </div>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed mt-2 italic">"{review.comment}"</p>
                   </div>
                 ))
               ) : (
                 <p className="text-slate-500 text-sm text-center py-4">No reviews yet. Be the first to rate this account!</p>
               )}
             </div>
          </div>

        </div>

        {/* Sidebar / Checkout */}
        <div className="lg:col-span-1">
          <div className="bg-[#0f0f16] border border-white/5 rounded-2xl p-6 sticky top-24">
            
            <div className="mb-6 flex justify-between items-end border-b border-white/10 pb-6">
              <span className="text-slate-400 text-sm">Asking Price</span>
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">₹</span>
                  <input 
                    type="number" 
                    value={editPrice}
                    onChange={(e) => setEditPrice(Number(e.target.value))}
                    className="w-32 bg-[#12121a] border border-white/20 rounded p-2 text-2xl font-bold text-white text-right"
                  />
                </div>
              ) : (
                <span className="text-4xl font-bold text-white">₹{listing.price.toLocaleString('en-IN')}</span>
              )}
            </div>

            {/* Security Checklist */}
            <div className="mb-8 space-y-3">
               <div className="flex items-start gap-3">
                 <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                 <div>
                   <p className="text-sm font-medium text-slate-200">Zero Ban History</p>
                   <p className="text-xs text-slate-500">Account has no previous infractions.</p>
                 </div>
               </div>
               <div className="flex items-start gap-3">
                 <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                 <div>
                   <p className="text-sm font-medium text-slate-200">Moonton Email Changeable</p>
                   <p className="text-xs text-slate-500">You will secure it with your own email.</p>
                 </div>
               </div>
               <div className="flex items-start gap-3">
                 <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                 <div>
                   <p className="text-sm font-medium text-slate-200">Socials Unlinked</p>
                   <p className="text-xs text-slate-500">No FB, VK, or TikTok bounds attached.</p>
                 </div>
               </div>
            </div>

            {isPurchased && (listing.sellerPhone || listing.sellerWhatsapp) && (
              <div className="mb-8 space-y-4">
                <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-2">Seller Contact Unlocked</h3>
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 space-y-3">
                  {listing.sellerPhone && (
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wide">Phone Number</p>
                      <p className="text-emerald-300 font-bold">{listing.sellerPhone}</p>
                    </div>
                  )}
                  {listing.sellerWhatsapp && (
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wide">WhatsApp</p>
                      <a href={listing.sellerWhatsapp.startsWith('http') ? listing.sellerWhatsapp : `https://${listing.sellerWhatsapp}`} target="_blank" rel="noopener noreferrer" className="text-emerald-300 font-bold underline">
                        {listing.sellerWhatsapp}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!isAdmin && !isPurchased && (
              <button 
                onClick={() => setShowPaymentModal(true)}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl flex flex-col items-center justify-center gap-1 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-600/20 mb-4"
              >
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Secure Buyout via Escrow</span>
                </div>
                <span className="text-[10px] font-medium text-indigo-200 uppercase tracking-widest">(UPI Only - GPay, PhonePe, Paytm)</span>
              </button>
            )}
            
            <div className="flex items-start gap-2 bg-[#12121a] border border-white/5 rounded-lg p-3">
              <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0" />
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong className="text-slate-300">NexusMarket Guard:</strong> Funds are held in escrow until you successfully log in and secure the account. 100% money-back guarantee on fraudulent listings.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0f0f16] border border-white/10 rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl relative">
            <button 
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="p-6 text-center border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Complete Payment</h2>
              <p className="text-sm text-slate-400 mt-1">Scan QR code using any UPI App</p>
            </div>
            <div className="p-6 flex flex-col items-center">
               <div className="bg-white p-3 rounded-xl mb-4">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi%3A%2F%2Fpay%3Fpa%3Dshbubaneshori%40okhdfcbank%26pn%3DSurjakanta" alt="UPI QR Code" className="w-48 h-48 object-contain mix-blend-multiply" />
               </div>
               <p className="text-white font-bold text-lg mb-1">Surjakanta</p>
               <p className="text-slate-400 text-sm mb-6">UPI ID: shbubaneshori@okhdfcbank</p>
               <div className="w-full bg-[#12121a] border border-white/5 rounded-xl p-4 flex justify-between items-center mb-6">
                 <span className="text-slate-400">Total Amount</span>
                 <span className="text-xl font-bold text-indigo-400">₹{listing.price.toLocaleString('en-IN')}</span>
               </div>

               {!isSubmitted ? (
                 <div className="w-full">
                   <h3 className="text-sm font-semibold text-slate-300 mb-3 text-left">Upload Payment Proof</h3>
                   <div className="border-2 border-dashed border-white/10 hover:border-indigo-500/50 rounded-xl p-6 text-center transition-colors cursor-pointer group relative overflow-hidden">
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              setIsUploading(true);
                              setTimeout(() => {
                                setIsUploading(false);
                                setIsSubmitted(true);
                                setTimeout(() => {
                                  setShowPaymentModal(false);
                                  setIsPurchased(true); // Mark as purchased internally
                                  if (onPaymentSuccess) onPaymentSuccess();
                                  setIsSubmitted(false); // Reset for next time
                                }, 2000); // Wait 2s to show success message before closing and opening chat
                              }, 1500);
                            }
                          }}
                        />
                      <div className="flex flex-col items-center pointer-events-none">
                        <UploadCloud className="w-8 h-8 text-slate-500 group-hover:text-indigo-400 mb-2 transition-colors" />
                        <span className="text-sm text-slate-300 font-medium">Click to upload screenshot</span>
                        <span className="text-xs text-slate-500 mt-1">JPEG, PNG, JPG</span>
                      </div>
                   </div>
                   {isUploading && (
                     <div className="mt-4 flex items-center justify-center gap-2 text-indigo-400">
                       <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                       <span className="text-sm font-medium">Uploading proof...</span>
                     </div>
                   )}
                 </div>
               ) : (
                 <div className="w-full bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5 text-center">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Check className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">Verifying Payment</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">Your payment screenshot has been uploaded. Support will verify it shortly and release the credentials.</p>
                 </div>
               )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Simple internal icon for stars
function StarIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
