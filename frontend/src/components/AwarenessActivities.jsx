import React from 'react';
import { 
  ClipboardList, Megaphone, Users, Store, FileText, 
  FlaskConical, MessageSquareHeart, Sparkles, CheckCircle2 
} from 'lucide-react';
import { t } from '../i18n';

export default function AwarenessActivities({ language = 'en' }) {
  const activities = [
    {
      icon: <ClipboardList className="w-6 h-6 text-emerald-600" />,
      title: 'Community Survey',
      badge: '250+ Households',
      desc: 'Conducted systematic field surveys across diverse demographic areas in Tanuku to evaluate citizen awareness of common adulteration threats.',
      color: 'border-emerald-200 hover:border-emerald-400',
    },
    {
      icon: <Megaphone className="w-6 h-6 text-teal-600" />,
      title: 'Awareness Programs',
      badge: 'Interactive Sessions',
      desc: 'Organized neighborhood educational briefings explaining health hazards linked to synthetic dyes, lead chromate, and diluted cooking oils.',
      color: 'border-teal-200 hover:border-teal-400',
    },
    {
      icon: <Users className="w-6 h-6 text-brand-primary" />,
      title: 'Resident Interaction',
      badge: 'Door-to-Door',
      desc: 'Engaged with homemakers, parents, and elder residents to demystify complex nutrition labels, FSSAI numbers, and AGMARK seals.',
      color: 'border-emerald-200 hover:border-emerald-400',
    },
    {
      icon: <Store className="w-6 h-6 text-amber-600" />,
      title: 'Shopkeeper / Vendor Interaction',
      badge: '42 Local Merchants',
      desc: 'Held discussions with local grocery merchants, milk vendors, and spice sellers regarding safe procurement and hygienic storage standards.',
      color: 'border-amber-200 hover:border-amber-400',
    },
    {
      icon: <FileText className="w-6 h-6 text-indigo-600" />,
      title: 'Pamphlet Distribution',
      badge: '500+ Distributed',
      desc: 'Designed and distributed informative visual bilingual flyers outlining simple rapid test methods and official consumer grievance channels.',
      color: 'border-indigo-200 hover:border-indigo-400',
    },
    {
      icon: <FlaskConical className="w-6 h-6 text-emerald-600" />,
      title: 'Simple Awareness Demonstrations',
      badge: '12 Live Demos',
      desc: 'Demonstrated harmless preliminary checks—such as the water settling test for chilli powder and iodine starch test for milk samples.',
      color: 'border-emerald-200 hover:border-emerald-400',
    },
    {
      icon: <MessageSquareHeart className="w-6 h-6 text-rose-600" />,
      title: 'Feedback Collection',
      badge: 'Continuous',
      desc: 'Logged community reactions, measured change in awareness level, and recorded constructive input for student project evaluation.',
      color: 'border-rose-200 hover:border-rose-400',
    },
  ];

  return (
    <section id="activities" className={`py-16 sm:py-24 bg-white border-t border-slate-100 ${language === 'te' ? 'font-telugu' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-brand-primary text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            {t(language, 'Field Implementation')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            {t(language, 'Community Awareness Activities')}
          </h2>
          <p className="mt-2 text-base text-slate-600">
            {t(language, 'A comprehensive overview of on-ground awareness campaigns executed by our 7-member student team in Tanuku and nearby urban areas.')}
          </p>
        </div>

        {/* 7 Activity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {activities.map((act, idx) => (
            <div
              key={act.title}
              className={`bg-slate-50/70 hover:bg-white rounded-2xl p-6 border ${act.color} shadow-sm hover:shadow-hover-card transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    {act.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-brand-dark">
                    {t(language, act.badge)}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-brand-dark group-hover:text-brand-primary transition-colors">
                  {t(language, act.title)}
                </h3>

                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {t(language, act.desc)}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{t(language, 'Field Executed')}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
