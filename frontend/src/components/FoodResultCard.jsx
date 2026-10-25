import React from 'react';
import { 
  CheckCircle2, AlertTriangle, ShieldCheck, ShoppingCart, 
  Package, ExternalLink, Info, Sparkles, MessageSquare 
} from 'lucide-react';

export default function FoodResultCard({ data, onAskFollowUp }) {
  if (!data) return null;

  const foodQuery = encodeURIComponent(data.foodName || 'food');
  const foodImageUrl = `https://source.unsplash.com/featured/1200x800/?${foodQuery}`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-premium overflow-hidden transition-all duration-300">
      <div className="relative bg-slate-100">
        <img
          src={foodImageUrl}
          alt={data.foodName}
          className="h-56 w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-slate-900/10 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-700 backdrop-blur-sm">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Recognized Food Item
            </div>
            {data.category && (
              <div className="mt-2 inline-flex rounded-full bg-slate-900/70 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                {data.category}
              </div>
            )}
          </div>
          <button
            onClick={() => onAskFollowUp && onAskFollowUp(`Tell me more about safe buying tips for ${data.foodName}`)}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-800 shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            Ask AI
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          {data.foodName}
        </h2>
        
        {/* Possible Adulterants */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-5">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-base mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3>Possible Adulterants</h3>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700">
            {data.adulterants && data.adulterants.length > 0 ? (
              data.adulterants.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-white/70 p-2 rounded-lg border border-amber-100">
                  <span className="text-amber-600 font-bold">•</span>
                  <span className="font-medium">{item}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-500 italic">No common industrial adulterants reported in this class.</li>
            )}
          </ul>
        </div>

        {/* Why Adulteration May Occur */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-2 text-brand-dark font-bold text-base mb-2">
            <Info className="w-5 h-5 text-brand-teal" />
            <h3>Why Adulteration May Occur</h3>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {data.whyAdulterated || "Adulteration often occurs for economic exploitation—diluting volume with cheaper substitutes or introducing colorants to mimic premium product grades."}
          </p>
        </div>

        {/* Possible Health Concerns */}
        <div className="bg-rose-50/60 border border-rose-200/70 rounded-xl p-5">
          <div className="flex items-center gap-2 text-rose-950 font-bold text-base mb-3">
            <ShieldCheck className="w-5 h-5 text-rose-600" />
            <h3>Possible Health Concerns</h3>
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            {data.healthRisks && data.healthRisks.length > 0 ? (
              data.healthRisks.map((risk, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span>{risk}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-500">General digestive concerns if contaminated water or unhygienic fillers are consumed.</li>
            )}
          </ul>
        </div>

        {/* Awareness Check (Preliminary method) */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-5 sm:p-6 relative">
          <div className="flex items-center gap-2 text-brand-dark font-bold text-base mb-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <h3>Preliminary Awareness Check</h3>
          </div>
          
          <div className="text-sm font-semibold text-emerald-900 mb-2">
            Method: {data.testMethod || "Visual and Physical Inspection"}
          </div>

          {data.testProcedure && (
            <div className="bg-white/80 p-3.5 rounded-lg border border-emerald-100 text-xs sm:text-sm text-slate-700 font-mono whitespace-pre-line mb-3">
              {data.testProcedure}
            </div>
          )}

          <div className="bg-white p-3.5 rounded-lg border border-emerald-200 text-sm text-slate-800">
            <span className="font-bold text-brand-dark">Expected Observation: </span>
            <span>{data.observation || "Pure samples exhibit uniform dissolution and natural coloration."}</span>
          </div>

          {/* Mandatory Critical Disclaimer */}
          <div className="mt-4 flex items-start gap-2.5 p-3 rounded-lg bg-amber-100/60 border border-amber-300 text-amber-950 text-xs leading-relaxed font-semibold">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>
              IMPORTANT: This is only a preliminary awareness check. Laboratory testing is required for scientific confirmation. Do not consume or handle suspicious substances during testing.
            </span>
          </div>
        </div>

        {/* Grid for Safe Buying Tips & Storage Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Safe Buying Tips */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <div className="flex items-center gap-2 text-brand-dark font-bold text-base mb-3">
              <ShoppingCart className="w-5 h-5 text-brand-primary" />
              <h3>Safe Buying Tips</h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {data.safeTips && data.safeTips.length > 0 ? (
                data.safeTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{tip}</span>
                  </li>
                ))
              ) : (
                <li>Verify FSSAI license, packaging integrity, and expiry dates.</li>
              )}
            </ul>
          </div>

          {/* Storage Tips */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <div className="flex items-center gap-2 text-brand-dark font-bold text-base mb-3">
              <Package className="w-5 h-5 text-brand-teal" />
              <h3>Storage & Handling Tips</h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {data.storageTips && data.storageTips.length > 0 ? (
                data.storageTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold">✓</span>
                    <span>{tip}</span>
                  </li>
                ))
              ) : (
                <li>Keep sealed in a cool, dry place away from direct moisture and sun.</li>
              )}
            </ul>
          </div>

        </div>

        {/* Sources / References with Clickable Links */}
        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
              <ExternalLink className="w-4 h-4 text-brand-primary" />
              <span>Reliable Regulatory & Scientific Sources:</span>
            </div>
            <span className="text-xs text-slate-400">Verified official standards</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {data.sources && data.sources.length > 0 ? (
              data.sources.map((src, idx) => (
                <a
                  key={idx}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-xs font-semibold text-brand-primary hover:text-brand-dark transition-colors"
                >
                  <span>{src.name}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))
            ) : (
              <a
                href="https://www.fssai.gov.in/dart/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-xs font-semibold text-brand-primary"
              >
                <span>FSSAI DART Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
