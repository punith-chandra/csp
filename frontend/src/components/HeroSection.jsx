import React from 'react';
import { ArrowRight, Search, ShieldCheck, Sparkles } from 'lucide-react';
import { t } from '../i18n';

export default function HeroSection({ onCheckFoodClick, onExploreClick, language = 'en' }) {
  const highlights = [
    { title: 'AI Food Check', text: 'Evaluate common items like milk, oil, honey and spices in seconds.' },
    { title: 'Public Awareness', text: 'Educate people on adulteration risks and safer buying habits.' },
    { title: 'Community Impact', text: 'Bring together data, insights and practical action for better health.' },
  ];

  return (
    <section id="home" className={`relative overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-20 ${language === 'te' ? 'font-telugu' : ''}`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-100 via-white to-amber-50/70"></div>
      <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-emerald-100/50 blur-3xl" aria-hidden="true" />
      <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-amber-100/50 blur-3xl" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-[11px] font-medium text-emerald-700 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Sri Vasavi Engineering College • CSE Department • Tanuku
          </div>
        </div>

        <div className="text-center max-w-4xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">{t(language, 'Community Service Project')}</p>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.04em] text-slate-900 leading-tight">
            {t(language, 'AI-Powered Food Safety and Purity Analysis')}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
            {t(language, 'Food adulteration detection, purity analysis, and consumer health awareness powered by AI and community insight.')}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onCheckFoodClick}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors"
            >
              <Search className="w-4 h-4" />
              {t(language, 'Check a Food Item')}
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-emerald-200 hover:text-emerald-700 transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              {t(language, 'Explore Food Safety')}
            </button>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-3 inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                {t(language, item.title)}
              </div>
              <p className="text-sm leading-6 text-slate-600">{t(language, item.text)}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            ['65%', 'Aware'],
            ['35%', 'Need Awareness'],
            ['7', 'Team Members'],
            ['1', 'Project'],
          ].map(([value, label]) => (
            <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
              <div className="text-2xl font-black text-slate-900">{value}</div>
              <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">{t(language, label)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
