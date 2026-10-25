import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SafetyDisclaimer from './components/SafetyDisclaimer';
import FoodSafetyAI from './components/FoodSafetyAI';
import FoodCategories from './components/FoodCategories';
import Dashboard from './components/Dashboard';
import AwarenessActivities from './components/AwarenessActivities';
import MeetTheTeam from './components/MeetTheTeam';
import AboutProject from './components/AboutProject';
import TrustedSources from './components/TrustedSources';
import Footer from './components/Footer';
import PresentationMode from './components/PresentationMode';
import AIChatBoard from './components/AIChatBoard';

export default function App() {
  // 'chatboard' (ChatGPT interface matching screenshot) or 'showcase' (Full project website)
  const [viewMode, setViewMode] = useState('chatboard');
  const [selectedFoodForAI, setSelectedFoodForAI] = useState('');
  const [presentationOpen, setPresentationOpen] = useState(false);

  const handleSelectFoodForAI = (foodName) => {
    setSelectedFoodForAI(foodName);
    setViewMode('chatboard');
  };

  const handleSelectCategory = (categoryName) => {
    const element = document.getElementById('categories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If user is in full ChatGPT Chatboard mode
  if (viewMode === 'chatboard') {
    return (
      <div className="h-screen w-screen overflow-hidden">
        <AIChatBoard 
          initialQuery={selectedFoodForAI}
          onSwitchToProjectView={() => setViewMode('showcase')}
          onOpenPresentation={() => setPresentationOpen(true)}
        />

        {/* Presentation Modal is also accessible in Chatboard mode */}
        <PresentationMode 
          isOpen={presentationOpen} 
          onClose={() => setPresentationOpen(false)} 
        />
      </div>
    );
  }

  // If user is in College Project Showcase mode
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] flex flex-col font-sans selection:bg-brand-accent selection:text-white">
      {/* Sticky Navigation */}
      <Navbar 
        onOpenPresentation={() => setPresentationOpen(true)} 
        onSwitchToChatboard={() => setViewMode('chatboard')}
        isChatboardActive={viewMode === 'chatboard'}
      />

      <main className="flex-1">
        {/* Floating Quick Switcher to FoodPure AI Chatboard */}
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setViewMode('chatboard')}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-700 hover:from-black hover:to-emerald-900 text-white font-extrabold text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all border border-emerald-400/40"
          >
            <span className="text-base">🛡️</span>
            <span>Open AI Food Safety & Purity Chat</span>
          </button>
        </div>

        {/* Hero Section */}
        <HeroSection 
          onCheckFoodClick={() => {
            setViewMode('chatboard');
          }}
          onExploreClick={() => {
            const el = document.getElementById('categories');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Safety Disclaimer Banner */}
        <SafetyDisclaimer />

        {/* Food Safety AI Interactive Assistant */}
        <FoodSafetyAI 
          initialFood={selectedFoodForAI} 
          onSelectCategory={handleSelectCategory}
        />

        {/* Food Categories Directory & Modals */}
        <FoodCategories 
          onSelectFoodForAI={handleSelectFoodForAI}
        />

        {/* Community Impact & Field Survey Dashboard */}
        <Dashboard />

        {/* Awareness Activities Showcase */}
        <AwarenessActivities />

        {/* Meet Our Team (All 7 Members & Guide) */}
        <MeetTheTeam />

        {/* About Project & Tanuku Roadmap */}
        <AboutProject />

        {/* Trusted Regulatory Sources */}
        <TrustedSources />
      </main>

      {/* College Project Presentation Modal Deck */}
      <PresentationMode 
        isOpen={presentationOpen} 
        onClose={() => setPresentationOpen(false)} 
      />

      {/* Comprehensive Institutional Footer */}
      <Footer 
        onOpenPresentation={() => setPresentationOpen(true)} 
      />
    </div>
  );
}
