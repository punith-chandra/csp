import React from 'react';
import { ExternalLink, ShieldCheck, CheckCircle2, BookOpen, Globe } from 'lucide-react';

export default function TrustedSources() {
  const sources = [
    {
      name: "FSSAI (Food Safety & Standards Authority of India)",
      type: "Apex National Regulatory Body",
      icon: "🇮🇳",
      desc: "Statutory authority established under the Food Safety and Standards Act, 2006. Publisher of the official 'DART' (Detect Adulteration with Rapid Test) compendium.",
      url: "https://www.fssai.gov.in",
      badge: "National Standard"
    },
    {
      name: "WHO (World Health Organization)",
      type: "Global Public Health Agency",
      icon: "🌐",
      desc: "Specialized UN agency publishing global guidelines on foodborne diseases, toxic chemical contaminants, and microbial food safety thresholds.",
      url: "https://www.who.int/news-room/fact-sheets/detail/food-safety",
      badge: "International Standard"
    },
    {
      name: "FAO / Codex Alimentarius Commission",
      type: "United Nations Food Standards",
      icon: "🌾",
      desc: "Joint FAO/WHO international food standards, codes of practice, and guidelines protecting consumer health and fair trade.",
      url: "https://www.fao.org/fao-who-codexalimentarius/",
      badge: "Codex Standard"
    },
    {
      name: "AGMARK (Directorate of Marketing & Inspection)",
      type: "Government of India Quality Seal",
      icon: "🛡️",
      desc: "Certification mark employed on agricultural products in India, assuring conformity to statutory grades for ghee, spices, honey, and oils.",
      url: "https://dmi.gov.in",
      badge: "Quality Certification"
    },
    {
      name: "CSIR-CFTRI (Central Food Technological Research Institute)",
      type: "Premier Research Institution (Mysore)",
      icon: "🔬",
      desc: "India's premier CSIR food science and technology laboratory conducting advanced analytical research into adulterants, food processing, and packaging.",
      url: "https://cftri.res.in",
      badge: "Scientific Lab"
    },
    {
      name: "National Institute of Nutrition (ICMR-NIN, Hyderabad)",
      type: "Apex Nutrition Research Body",
      icon: "🧬",
      desc: "Indian Council of Medical Research institute publishing dietary guidelines, safe nutrient limits, and toxicological safety profiles for Indian consumers.",
      url: "https://www.nin.res.in",
      badge: "Clinical Safety"
    }
  ];

  return (
    <section id="sources" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-brand-primary text-xs font-bold uppercase tracking-wider mb-3">
            <Globe className="w-4 h-4 text-emerald-600" />
            Verified Authorities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            Trusted Food Safety Sources
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Our AI assistant and educational modules derive information strictly from authenticated government departments, multilateral bodies, and peer-reviewed laboratories.
          </p>
        </div>

        {/* 6 Source Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sources.map((src) => (
            <div
              key={src.name}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft hover:shadow-hover-card transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:border-emerald-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-1 bg-slate-50 rounded-xl group-hover:scale-110 transition-transform">
                    {src.icon}
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {src.badge}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-brand-dark group-hover:text-brand-primary transition-colors">
                  {src.name}
                </h3>
                
                <span className="text-[11px] font-semibold text-brand-teal block mt-0.5">
                  {src.type}
                </span>

                <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                  {src.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400">
                  Official Portal
                </span>

                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-brand-dark hover:text-brand-primary border border-slate-200 hover:border-emerald-300 text-xs font-bold transition-all"
                >
                  <span>Visit Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
