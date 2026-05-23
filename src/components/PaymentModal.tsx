import React, { useState } from 'react';
import { X, UploadCloud, Check } from 'lucide-react';
import { Listing } from '../types';

interface PaymentModalProps {
  listing: Listing;
  onClose: () => void;
  onPaymentSuccess?: () => void;
}

export function PaymentModal({ listing, onClose, onPaymentSuccess }: PaymentModalProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0f0f16] border border-white/10 rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white z-10"
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
                            if (onPaymentSuccess) onPaymentSuccess();
                            onClose();
                          }, 2000);
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
  );
}
