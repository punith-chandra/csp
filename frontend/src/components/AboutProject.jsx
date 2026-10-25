import React from 'react';
import { 
  Info, Target, MapPin, Compass, ArrowRight, 
  CheckCircle2, Sparkles, BookOpen, HeartHandshake 
} from 'lucide-react';

export default function AboutProject() {
  const timelineSteps = [
    {
      title: "1. Research & Synthesis",
      desc: "Curated official standards from FSSAI DART, WHO, and CSIR-CFTRI research publications.",
      icon: "📚",
      status: "Completed"
    },
    {
      title: "2. Community Survey",
      desc: "Administered questionnaires across 250+ households and 42 grocery merchants in Tanuku.",
      icon: "📋",
      status: "Completed"
    },
    {
      title: "3. Awareness Activities",
      desc: "Conducted public demonstrations of simple home checks and distributed 500+ flyers.",
      icon: "📢",
      status: "Completed"
    },
    {
      title: "4. Food Safety Education",
      desc: "Educated consumers on AGMARK certifications, FSSAI seals, and proper food storage.",
      icon: "🎓",
      status: "Completed"
    },
    {
      title: "5. Feedback Collection",
      desc: "Logged citizen inquiries and measured quantifiable knowledge improvement post-sessions.",
      icon: "📊",
      status: "Completed"
    },
    {
      title: "6. Project Outcome & AI Platform",
      desc: "Deployed the full-stack AI Assistant 'Food Safety AI' to preserve long-term impact.",
      icon: "🚀",
      status: "Active"
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-brand-primary text-xs font-bold uppercase tracking-wider mb-3">
            <HeartHandshake className="w-4 h-4 text-emerald-600" />
            Institutional Mission
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            About AI-Powered Food Safety and Purity Analysis
          </h2>
          <p className="mt-2 text-base text-slate-600">
            A comprehensive Community Service Project (CSP) initiated by Computer Science & Engineering students to protect public health through grassroots food adulteration awareness and AI technology.
          </p>
        </div>

        {/* 2 Column Objective & Location Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Objective Card */}
          <div className="bg-gradient-to-br from-emerald-50/70 via-white to-slate-50 rounded-2xl p-6 sm:p-8 border border-emerald-200/80 shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-brand-primary flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-brand-dark">
                Project Objectives
              </h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Demystify adulteration risks in daily dietary staples including milk, spices, edible oils, and sweeteners.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Empower consumers with simple, non-toxic preliminary awareness checks that can be performed safely at home.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Educate citizens on reading food packaging, recognizing AGMARK/FSSAI credentials, and avoiding unhygienic loose supplies.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Combine on-ground community surveys with modern AI tools to ensure accessible, 24/7 food safety guidance for all.</span>
              </li>
            </ul>
          </div>

          {/* Location & Context Card */}
          <div className="bg-gradient-to-br from-teal-50/60 via-white to-slate-50 rounded-2xl p-6 sm:p-8 border border-teal-200/80 shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-brand-teal flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-brand-dark">
                Location & Demographic Focus
              </h3>
            </div>
            
            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                <strong>Geographic Focus: </strong>Tanuku and contiguous urban/semi-urban mandals in West Godavari District, Andhra Pradesh.
              </p>
              <p>
                <strong>Community Target: </strong>Residential colonies, weekly local vegetable markets (rythu bazaars), small grocery stores (kirana shops), school communities, and apartment associations.
              </p>
              <p>
                <strong>Key Rationale: </strong>Rapid urbanization and reliance on decentralized loose grocery supply chains in regional towns highlight the urgent need for consumer awareness regarding synthetic adulterants.
              </p>
            </div>
          </div>

        </div>

        {/* Project Timeline Section */}
        <div className="bg-slate-50 rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-premium">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-300">
              Structured Roadmap
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-brand-dark mt-2">
              Community Service Project Timeline
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {timelineSteps.map((step, idx) => (
              <div 
                key={step.title}
                className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm relative group hover:border-emerald-400 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{step.icon}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {step.status}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-brand-dark mb-1.5 group-hover:text-brand-primary transition-colors">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
