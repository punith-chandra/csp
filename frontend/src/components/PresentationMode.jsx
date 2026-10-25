import React, { useState } from 'react';
import { 
  X, ChevronLeft, ChevronRight, Presentation, Award, 
  CheckCircle2, Bot, Users, Target, Shield, Sparkles 
} from 'lucide-react';

export default function PresentationMode({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "AI-POWERED FOOD SAFETY AND PURITY ANALYSIS",
      subtitle: "Adulteration Detection & Certified Household Test Methods",
      category: "Title Slide",
      content: (
        <div className="text-center py-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-brand-primary text-xs font-bold uppercase tracking-wider">
            Community Service Project (CSP)
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-brand-dark">
            “AI-POWERED FOOD SAFETY AND PURITY ANALYSIS”
          </h2>
          <p className="text-base sm:text-lg font-bold text-brand-teal">
            Food Adulteration Detection & Certified Safety Assistant
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-xl mx-auto text-left space-y-2 text-xs sm:text-sm text-slate-700">
            <div><strong>Institution: </strong>Sri Vasavi Engineering College (Autonomous)</div>
            <div><strong>Department: </strong>Computer Science and Engineering</div>
            <div><strong>Project Guide: </strong>Mr. Syed Akheel Hassan Gori</div>
            <div><strong>Project Location: </strong>Tanuku and surrounding urban areas, Andhra Pradesh</div>
            <div><strong>Team Size: </strong>7 Student Researchers & Engineers</div>
          </div>
        </div>
      )
    },
    {
      title: "Problem Statement & Need",
      subtitle: "Why Food Adulteration Awareness Matters",
      category: "Context",
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-700">
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-950">
            <h4 className="font-bold text-sm mb-1">Critical Challenge:</h4>
            <p>
              Food adulteration in essential staples (milk, turmeric, chilli powder, cooking oils, honey) poses acute and chronic public health hazards ranging from gastrointestinal ulcers to organ damage and carcinogen ingestion.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-brand-dark block mb-1">Lack of Simple Awareness:</span>
              Citizens rarely know harmless household tests to detect adulterants before consuming food.
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-brand-dark block mb-1">Reliance on Uncertified Sources:</span>
              Unregulated loose groceries are widely purchased without checking FSSAI or AGMARK seals.
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Project Objectives",
      subtitle: "Four Pillars of the Community Service Initiative",
      category: "Objectives",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <span className="font-bold text-brand-dark text-sm block mb-1">1. Educational Outreach</span>
            Educate 250+ citizens in Tanuku regarding common adulterants, why adulteration occurs, and realistic health concerns.
          </div>
          <div className="p-4 bg-teal-50 rounded-xl border border-teal-200">
            <span className="font-bold text-brand-dark text-sm block mb-1">2. Practical Demonstrations</span>
            Demonstrate harmless rapid preliminary checks (water tests, starch iodine tests, magnet checks) safe for home use.
          </div>
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
            <span className="font-bold text-brand-dark text-sm block mb-1">3. Vendor Engagement</span>
            Engage with 42 local shopkeepers and dairy sellers regarding safe procurement and hygienic packaging.
          </div>
          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
            <span className="font-bold text-brand-dark text-sm block mb-1">4. AI-Powered Platform</span>
            Develop an intelligent web assistant integrating FSSAI standards and RAG to offer 24/7 food safety consultation.
          </div>
        </div>
      )
    },
    {
      title: "Community Survey Findings (Tanuku)",
      subtitle: "Empirical Data from 250 Households",
      category: "Survey Data",
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-700">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-emerald-100/70 border border-emerald-300 rounded-xl">
              <div className="text-3xl font-black text-brand-primary">65%</div>
              <div className="font-bold text-brand-dark mt-1">Participants Aware</div>
              <div className="text-[11px] text-slate-600">Aware of adulteration issues generally</div>
            </div>
            <div className="p-4 bg-amber-100/70 border border-amber-300 rounded-xl">
              <div className="text-3xl font-black text-amber-700">35%</div>
              <div className="font-bold text-brand-dark mt-1">Needed Awareness</div>
              <div className="text-[11px] text-slate-600">Benefited from project education</div>
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
            <div>• 48% of participants were unaware of simple identification methods prior to demonstrations.</div>
            <div>• 42% lacked knowledge on the meaning of AGMARK and FSSAI standards on packaged goods.</div>
            <div>• 70%+ had never filed a grievance regarding substandard groceries.</div>
          </div>
        </div>
      )
    },
    {
      title: "AI & RAG System Architecture",
      subtitle: "Retrieval-Augmented Generation for Trustworthy Answers",
      category: "Technology",
      content: (
        <div className="space-y-3 text-xs text-slate-700">
          <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-xl overflow-x-auto">
            USER ➔ REACT FRONTEND ➔ FASTAPI BACKEND ➔ FOOD ITEM VALIDATION ➔ RAG RETRIEVER (FSSAI/WHO DB) ➔ LLM / GEMINI ➔ STRUCTURED JSON ➔ FRONTEND RESULT CARD
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="block text-brand-dark text-xs mb-1">Frontend</strong>
              React.js, Tailwind CSS, Lucide icons, Chart.js analytics.
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="block text-brand-dark text-xs mb-1">Backend & DB</strong>
              Python FastAPI, SQLite database, Pydantic data schemas.
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="block text-brand-dark text-xs mb-1">AI & RAG Engine</strong>
              FSSAI DART knowledge indexing, Google Gemini integration with strict safety disclaimers.
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Team Contributions",
      subtitle: "Sri Vasavi Engineering College (Autonomous)",
      category: "Project Team",
      content: (
        <div className="space-y-3 text-xs text-slate-700">
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl font-bold text-brand-dark">
            Faculty Guide: Mr. Syed Akheel Hassan Gori (Dept of CSE)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
              <strong>1. P. Punith Chandra (24A81A05G9):</strong> Project Coordinator
            </div>
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
              <strong>2. M. Durga Prasad (24A81A05G2):</strong> Research & Documentation
            </div>
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
              <strong>3. D. Hemanth (24A81A05D8):</strong> Backend & AI Integration
            </div>
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
              <strong>4. N. Arun Teja (24A81A05G6):</strong> Frontend Development
            </div>
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
              <strong>5. K. Jay Vardhan (24A81A05F9):</strong> Data & Survey Analysis
            </div>
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
              <strong>6. R. Santhosh (24A81A05H4):</strong> Testing & Validation
            </div>
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 sm:col-span-2">
              <strong>7. M. Prasannakumar (24A81A05G1):</strong> UI/UX & Presentation
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Slide Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-primary">
            <Presentation className="w-4 h-4" />
            <span>COLLEGE PROJECT PRESENTATION MODE</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500">
              Slide {currentSlide + 1} of {slides.length}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Body */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
          <div className="mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-teal bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
              {slides[currentSlide].category}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-brand-dark mt-2">
              {slides[currentSlide].title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              {slides[currentSlide].subtitle}
            </p>
          </div>

          <div className="mt-4">
            {slides[currentSlide].content}
          </div>
        </div>

        {/* Slide Navigation Controls */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
            disabled={currentSlide === 0}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous Slide
          </button>

          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentSlide === idx ? 'w-6 bg-brand-primary' : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1))}
            disabled={currentSlide === slides.length - 1}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-primary hover:bg-brand-dark disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            Next Slide
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
