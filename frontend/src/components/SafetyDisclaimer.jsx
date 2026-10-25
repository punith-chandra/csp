import React from 'react';
import { ShieldAlert, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function SafetyDisclaimer() {
  return (
    <div className="bg-amber-50/80 border-y border-amber-200/80 py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Official Safety & Legal Disclaimer
              </span>
              <span className="text-[10px] font-semibold bg-amber-200/70 text-amber-950 px-2 py-0.5 rounded-full">
                Preliminary Awareness Only
              </span>
            </div>
            <p className="text-xs text-amber-950/80 leading-relaxed max-w-4xl">
              <strong>Food Safety AI</strong> provides awareness-oriented educational information based on accessible standards (FSSAI, WHO, FAO). 
              Simple household checks may only indicate a <em>possible</em> adulteration issue and <strong>cannot confirm</strong> adulteration scientifically. 
              Accredited laboratory testing is required for reliable legal confirmation. 
              <strong>Do not consume or handle suspicious substances during testing.</strong>
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <a
            href="https://www.fssai.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 transition-colors shadow-sm"
          >
            <span>FSSAI Official Portal</span>
            ➔
          </a>
        </div>

      </div>
    </div>
  );
}
