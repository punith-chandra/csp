import React from 'react';
import { XCircle, ArrowRight, HelpCircle, Sparkles } from 'lucide-react';

export default function NonFoodCard({ data, onSelectSuggestion }) {
  const suggestions = [
    { name: 'Milk', icon: '🥛' },
    { name: 'Turmeric', icon: '🌶️' },
    { name: 'Honey', icon: '🍯' },
    { name: 'Sugar', icon: '🍚' },
    { name: 'Ghee', icon: '🧈' },
    { name: 'Edible Oil', icon: '🛢️' },
    { name: 'Rice', icon: '🌾' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-rose-200/90 shadow-premium overflow-hidden animate-fadeIn">
      <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-rose-700 text-white p-6 sm:p-7">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl shrink-0">
            ❌
          </div>
          <div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-rose-100">
              Validation Notice
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight mt-1">
              Not a Food Item
            </h2>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="bg-rose-50/70 border border-rose-100 rounded-xl p-5 mb-6 text-slate-700 text-sm leading-relaxed">
          <p className="font-semibold text-rose-950 text-base mb-1">
            "{data?.foodName || 'Entered Query'}" is recognized as a non-food object.
          </p>
          <p className="text-slate-600">
            Food Safety AI exclusively conducts adulteration awareness and safety evaluation for human edible food products. We do not attempt adulteration analysis on non-food objects, electronic gadgets, appliances, or materials.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
            <span>Please try checking one of these common food items:</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {suggestions.map((item) => (
              <button
                key={item.name}
                onClick={() => onSelectSuggestion && onSelectSuggestion(item.name)}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-emerald-400 bg-slate-50 hover:bg-emerald-50/60 font-semibold text-xs sm:text-sm text-brand-dark transition-all group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-primary group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
