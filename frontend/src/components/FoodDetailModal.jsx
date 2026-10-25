import React from 'react';
import { 
  X, CheckCircle2, AlertTriangle, ShieldCheck, ShoppingCart, 
  Package, ExternalLink, Bot, Sparkles, Info 
} from 'lucide-react';

export default function FoodDetailModal({ food, onClose, onAnalyzeInAI }) {
  if (!food) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-1.5 bg-emerald-50 rounded-xl border border-emerald-200">
              {food.icon || '🥗'}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {food.category || 'General Food'}
                </span>
                <span className="text-[11px] font-semibold text-slate-500">
                  FSSAI Monitored
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-brand-dark mt-0.5">
                {food.foodName || food.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Action CTA */}
          <div className="bg-gradient-to-r from-emerald-800 to-brand-primary p-4 rounded-xl text-white flex items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-sm">Want custom AI insights?</h4>
              <p className="text-xs text-emerald-100">Run a complete instant adulteration awareness check.</p>
            </div>
            <button
              onClick={() => {
                onClose();
                onAnalyzeInAI(food.foodName || food.name);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white text-brand-dark hover:bg-emerald-50 text-xs font-bold rounded-lg shadow-sm transition-all shrink-0"
            >
              <Bot className="w-4 h-4 text-brand-primary" />
              <span>Analyze with AI</span>
            </button>
          </div>

          {/* Possible Adulterants */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4">
            <h4 className="font-bold text-amber-900 text-sm flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Possible Adulterants
            </h4>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-700">
              {food.adulterants && food.adulterants.length > 0 ? (
                food.adulterants.map((item, idx) => <li key={idx}>{item}</li>)
              ) : (
                <li>Common low-grade fillers or water dilution</li>
              )}
            </ul>
          </div>

          {/* Why Adulteration Happens */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h4 className="font-bold text-brand-dark text-sm flex items-center gap-2 mb-1.5">
              <Info className="w-4 h-4 text-brand-teal" />
              Why Adulteration Happens
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {food.whyAdulterated || "To artificially boost merchant profit margins by cutting expensive raw ingredients with cheaper, substandard, or synthetic alternatives."}
            </p>
          </div>

          {/* Preliminary Awareness Check */}
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-4">
            <h4 className="font-bold text-emerald-950 text-sm flex items-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Preliminary Awareness Check
            </h4>
            <p className="text-xs font-bold text-emerald-900 mb-1">
              Method: {food.testMethod || "Water clarity and physical texture check"}
            </p>
            {food.testProcedure && (
              <pre className="text-xs text-slate-700 bg-white/80 p-2.5 rounded-lg border border-emerald-100 font-sans whitespace-pre-line mb-2">
                {food.testProcedure}
              </pre>
            )}
            <p className="text-xs text-slate-700">
              <strong>Observation: </strong>{food.observation || "Pure foods show standard settling and natural coloration."}
            </p>
            <div className="mt-2 text-[11px] font-semibold text-amber-800 bg-amber-100/60 p-2 rounded border border-amber-200">
              ⚠️ Preliminary awareness check only. Laboratory testing is required for scientific confirmation.
            </div>
          </div>

          {/* Safe Buying & Storage Tips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <h4 className="font-bold text-brand-dark text-xs flex items-center gap-1.5 mb-2">
                <ShoppingCart className="w-4 h-4 text-brand-primary" />
                Safe Buying Tips
              </h4>
              <ul className="text-xs text-slate-600 space-y-1">
                {(food.safeTips || ["Check FSSAI licensing", "Look for AGMARK seals", "Avoid loose powders"]).map((t, idx) => (
                  <li key={idx}>• {t}</li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <h4 className="font-bold text-brand-dark text-xs flex items-center gap-1.5 mb-2">
                <Package className="w-4 h-4 text-brand-teal" />
                Storage Tips
              </h4>
              <ul className="text-xs text-slate-600 space-y-1">
                {(food.storageTips || ["Store in clean airtight jars", "Keep away from humidity"]).map((t, idx) => (
                  <li key={idx}>• {t}</li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
