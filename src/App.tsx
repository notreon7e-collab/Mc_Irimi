import React, { useState } from 'react';
import { View } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Marketplace } from './pages/Marketplace';
import { Sell } from './pages/Sell';
import { Details } from './pages/Details';
import { Support } from './pages/Support';
import { ChatWidget } from './components/ChatWidget';
import { DUMMY_LISTINGS } from './data';
import { Listing } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('HOME');
  const [selectedListing, setSelectedListing] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [listings, setListings] = useState<Listing[]>(DUMMY_LISTINGS);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const handleUpdateListing = (id: string, updates: Partial<Listing>) => {
    setListings(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const handleAddListing = (newListing: Listing) => {
    setListings(prev => [newListing, ...prev]);
  };

  const handleDeleteListing = (id: string) => {
    setListings(prev => prev.filter(l => l.id !== id));
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setCurrentUser(null);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView, selectedListing]);

  return (
    <div className="min-h-screen flex flex-col bg-[#050507] text-slate-300 font-sans overflow-hidden">
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        onLogin={(email) => {
          if (email === 'admin@nexus.com') {
            setIsAdmin(true);
            setCurrentUser(email);
          } else {
            setCurrentUser(email);
          }
        }}
        onLogout={handleLogout}
        isAdmin={isAdmin}
        currentUser={currentUser}
      />
      
      <main className="flex-grow flex flex-col">
        {currentView === 'HOME' && (
          <Home setCurrentView={setCurrentView} />
        )}
        
        {currentView === 'MARKETPLACE' && (
          <Marketplace 
            setCurrentView={setCurrentView} 
            setSelectedListing={setSelectedListing} 
            onPaymentSuccess={() => setIsChatOpen(true)}
            listings={listings}
            isAdmin={isAdmin}
            onUpdateListing={handleUpdateListing}
            onAddListing={handleAddListing}
            onDeleteListing={handleDeleteListing}
          />
        )}
        
        {currentView === 'SELL' && (
          <Sell setCurrentView={setCurrentView} onAddListing={handleAddListing} />
        )}
        
        {currentView === 'DETAILS' && selectedListing && (
          <Details 
            id={selectedListing} 
            setCurrentView={setCurrentView} 
            onPaymentSuccess={() => setIsChatOpen(true)}
            listingItem={listings.find(l => l.id === selectedListing)}
            isAdmin={isAdmin}
            onUpdateListing={handleUpdateListing}
          />
        )}
        
        {currentView === 'SUPPORT' && (
          <Support setCurrentView={setCurrentView} />
        )}
      </main>

      <Footer />
      
      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
