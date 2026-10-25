import React, { useState, useEffect } from 'react';
import { Shield, Menu, X, Bot, Languages } from 'lucide-react';
import { t } from '../i18n';

export default function Navbar({ onOpenPresentation, onNavigate, onSwitchToChatboard, language = 'en', onLanguageChange }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Categories', href: '#categories' },
    { name: 'Impact', href: '#impact' },
    { name: 'Team', href: '#team' },
    { name: 'About', href: '#about' },
  ];

  const handleLinkClick = (href) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (onNavigate) onNavigate(href.replace('#', ''));
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl ${
        isScrolled ? 'bg-white/95 border-b border-slate-200 py-3 shadow-lg shadow-slate-900/5' : 'bg-white/85 py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleLinkClick('#home'); }}
            className="flex items-center gap-3 group"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-brand-primary text-white shadow-sm">
              <span className="text-lg">🌱</span>
              <Shield className="w-3.5 h-3.5 text-white absolute -top-1 -right-1 fill-white/80" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold tracking-tight text-slate-900">
                  {t(language, 'AI Food Safety & Purity')}
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full bg-emerald-100 text-emerald-700">
                  {t(language, 'Official')}
                </span>
              </div>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
              >
                {t(language, link.name)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onLanguageChange?.(language === 'en' ? 'te' : 'en')}
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800 shadow-sm transition hover:border-emerald-400 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              aria-label={language === 'en' ? 'Switch language to Telugu' : 'Switch language to English'}
              title={language === 'en' ? 'తెలుగులో చూపించు' : 'Show in English'}
            >
              <Languages className="h-4 w-4" />
              <span>{language === 'en' ? 'తెలుగు' : 'English'}</span>
            </button>
            <button
              onClick={onSwitchToChatboard}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
            >
              <Bot className="w-4 h-4 text-emerald-600" />
              {t(language, 'AI Chat')}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-slate-700 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-3 shadow-sm">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className="text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                {t(language, link.name)}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                onLanguageChange?.(language === 'en' ? 'te' : 'en');
                setMobileMenuOpen(false);
              }}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-800"
            >
              <Languages className="h-4 w-4" />
              {language === 'en' ? 'తెలుగు' : 'English'}
            </button>
            <button
              onClick={onSwitchToChatboard}
              className="mt-2 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg"
            >
              <Bot className="w-4 h-4 text-emerald-600" />
              {t(language, 'AI Chat')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
