import React from 'react';
import { Shield, Sparkles, Heart, ArrowUp, GraduationCap } from 'lucide-react';

export default function Footer({ onOpenPresentation }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-dark text-slate-300 pt-16 pb-12 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-emerald-800/60">
          
          {/* Brand & Project Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-teal flex items-center justify-center text-xl text-white shadow-md">
                🌱
              </div>
              <div>
                <span className="text-base font-black text-white tracking-tight block">
                  AI-Powered Food Safety & Purity
                </span>
                <span className="text-xs text-brand-accent font-medium">
                  Food Adulteration & Purity Analysis
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              An AI-powered Community Service Project developed to empower households and local vendors with scientifically grounded food safety awareness.
            </p>

            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-200">
              <p className="font-bold text-white">“Know Your Food. Protect Your Health.”</p>
            </div>
          </div>

          {/* Academic Institution & Department */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Institution</span>
            </div>
            
            <h4 className="text-sm font-extrabold text-white">
              Sri Vasavi Engineering College (Autonomous)
            </h4>
            <p className="text-xs text-slate-400">
              Department of Computer Science and Engineering
            </p>
            <p className="text-xs text-slate-400">
              Pedatadepalli, Tanuku, West Godavari District, Andhra Pradesh - 534101
            </p>

            <div className="pt-2 text-xs text-emerald-300">
              <strong>Project Guide: </strong>
              <span className="text-white font-medium">Mr. Syed Akheel Hassan Gori</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
              Quick Navigation
            </span>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a href="#ai-assistant" className="hover:text-brand-accent transition-colors">
                  ➔ Food Safety AI Assistant
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-brand-accent transition-colors">
                  ➔ Food Categories Matrix
                </a>
              </li>
              <li>
                <a href="#impact" className="hover:text-brand-accent transition-colors">
                  ➔ Community Survey & Impact
                </a>
              </li>
              <li>
                <a href="#activities" className="hover:text-brand-accent transition-colors">
                  ➔ Awareness Activities
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-brand-accent transition-colors">
                  ➔ Meet Our Team (7 Members)
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-brand-accent transition-colors">
                  ➔ About Project & Tanuku Roadmap
                </a>
              </li>
              <li>
                <a href="#sources" className="hover:text-brand-accent transition-colors">
                  ➔ Trusted Regulatory Sources
                </a>
              </li>
            </ul>
          </div>

          {/* Student Team Roll Numbers */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
              Team Roll Numbers (CSE)
            </span>
            <div className="text-[11px] space-y-1.5 text-slate-300">
              <div>• P. Punith Chandra – <span className="font-mono text-emerald-300">24A81A05G9</span></div>
              <div>• M. Durga Prasad – <span className="font-mono text-emerald-300">24A81A05G2</span></div>
              <div>• D. Hemanth – <span className="font-mono text-emerald-300">24A81A05D8</span></div>
              <div>• N. Arun Teja – <span className="font-mono text-emerald-300">24A81A05G6</span></div>
              <div>• K. Jay Vardhan – <span className="font-mono text-emerald-300">24A81A05F9</span></div>
              <div>• R. Santhosh – <span className="font-mono text-emerald-300">24A81A05H4</span></div>
              <div>• M. Prasannakumar – <span className="font-mono text-emerald-300">24A81A05G1</span></div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenPresentation}
                className="w-full py-2 px-3 text-xs font-bold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all text-center shadow-sm"
              >
                Open Review Presentation
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} AI-Powered Food Safety and Purity Analysis. Sri Vasavi Engineering College (Autonomous), Department of CSE.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 text-xs font-semibold transition-colors border border-emerald-800"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
