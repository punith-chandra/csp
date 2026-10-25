import React, { useEffect, useState } from 'react';
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
  const [language, setLanguage] = useState(() => window.localStorage.getItem('foodpure-language') === 'te' ? 'te' : 'en');
  const [selectedFoodForAI, setSelectedFoodForAI] = useState('');
  const [presentationOpen, setPresentationOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = language === 'te' ? 'te' : 'en';
  }, [language]);

  const handleLanguageChange = (nextLanguage) => {
    const next = nextLanguage === 'te' ? 'te' : 'en';
    window.localStorage.setItem('foodpure-language', next);
    document.documentElement.lang = next;
    setLanguage(next);
  };

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
          language={language}
          onLanguageChange={handleLanguageChange}
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
    <div className={`min-h-screen bg-[#f8fafc] text-[#1e293b] flex flex-col font-sans selection:bg-brand-accent selection:text-white ${language === 'te' ? 'font-telugu' : ''}`}>
      {/* Sticky Navigation */}
      <Navbar 
        onOpenPresentation={() => setPresentationOpen(true)} 
        onSwitchToChatboard={() => setViewMode('chatboard')}
        language={language}
        onLanguageChange={handleLanguageChange}
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
          language={language}
          onCheckFoodClick={() => {
            setViewMode('chatboard');
          }}
          onExploreClick={() => {
            const el = document.getElementById('categories');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Safety Disclaimer Banner */}
        <SafetyDisclaimer language={language} />

        {/* Food Safety AI Interactive Assistant */}
        <FoodSafetyAI 
          initialFood={selectedFoodForAI} 
          onSelectCategory={handleSelectCategory}
          language={language}
        />

        {/* Food Categories Directory & Modals */}
        <FoodCategories 
          onSelectFoodForAI={handleSelectFoodForAI}
          language={language}
        />

        {/* Community Impact & Field Survey Dashboard */}
        <Dashboard language={language} />

        {/* Awareness Activities Showcase */}
        <AwarenessActivities language={language} />

        {/* Meet Our Team (All 7 Members & Guide) */}
        <MeetTheTeam language={language} />

        {/* About Project & Tanuku Roadmap */}
        <AboutProject language={language} />

        {/* Trusted Regulatory Sources */}
        <TrustedSources language={language} />
      </main>

      {/* College Project Presentation Modal Deck */}
      <PresentationMode 
        isOpen={presentationOpen} 
        onClose={() => setPresentationOpen(false)} 
      />

      {/* Comprehensive Institutional Footer */}
      <Footer 
        language={language}
        onOpenPresentation={() => setPresentationOpen(true)} 
      />
    </div>
  );
}
