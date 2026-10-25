import React, { useState } from 'react';
import { Layers, ArrowRight, ShieldCheck, Sparkles, Search } from 'lucide-react';
import FoodDetailModal from './FoodDetailModal';
import { t } from '../i18n';

export default function FoodCategories({ onSelectFoodForAI, language = 'en' }) {
  const [selectedFood, setSelectedFood] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categoriesData = [
    {
      id: 'dairy',
      categoryName: 'Dairy Products',
      icon: '🥛',
      desc: 'High risk of water dilution, detergent, and starch admixture.',
      foods: [
        {
          name: 'Milk',
          icon: '🥛',
          category: 'Dairy Products',
          adulterants: ['Water', 'Starch', 'Urea', 'Detergent'],
          testMethod: 'Iodine Starch Check & Slip Test',
          observation: 'Blue tint indicates starch; quick run-off indicates water.'
        },
        {
          name: 'Ghee',
          icon: '🧈',
          category: 'Dairy Products',
          adulterants: ['Vanaspati', 'Mashed Potato', 'Animal Tallow'],
          testMethod: 'Palm Heat & Baudouin Check',
          observation: 'Pure ghee melts in seconds on skin; Vanaspati remains thick.'
        },
        {
          name: 'Paneer',
          icon: '🧀',
          category: 'Dairy Products',
          adulterants: ['Starch', 'Synthetic Milk Curds'],
          testMethod: 'Boil & Iodine Drop Check',
          observation: 'Turns blue upon iodine if starch is mixed.'
        }
      ]
    },
    {
      id: 'spices',
      categoryName: 'Spices & Condiments',
      icon: '🌶️',
      desc: 'Prone to industrial dyes (Metanil yellow, Sudan red) and brick dust.',
      foods: [
        {
          name: 'Turmeric Powder',
          icon: '🌶️',
          category: 'Spices & Condiments',
          adulterants: ['Metanil Yellow', 'Lead Chromate', 'Chalk Powder'],
          testMethod: 'Water Settling & Acid Check',
          observation: 'Pure settles clear; fake dye turns water magenta-pink with acid.'
        },
        {
          name: 'Chilli Powder',
          icon: '🌶️',
          category: 'Spices & Condiments',
          adulterants: ['Brick Powder', 'Sudan Dyes', 'Sawdust'],
          testMethod: 'Water Dispersion & Finger Grit Check',
          observation: 'Brick settles fast and feels gritty/abrasive between fingertips.'
        },
        {
          name: 'Black Pepper',
          icon: '🧂',
          category: 'Spices & Condiments',
          adulterants: ['Dried Papaya Seeds', 'Exhausted Berries'],
          testMethod: 'Alcohol / Water Floatation Test',
          observation: 'Papaya seeds float; genuine heavy peppercorns sink.'
        }
      ]
    },
    {
      id: 'oils',
      categoryName: 'Edible Oils',
      icon: '🛢️',
      desc: 'Adulteration with hazardous Argemone oil or cheap mineral oils.',
      foods: [
        {
          name: 'Edible Oil',
          icon: '🛢️',
          category: 'Edible Oils',
          adulterants: ['Argemone Oil', 'Mineral Oil', 'Recycled Rancid Fats'],
          testMethod: 'Cold Refrigeration & Nitric Acid Indication',
          observation: 'Pure single oils stay clear; impure palm fractions solidify cloudy.'
        },
        {
          name: 'Mustard Oil',
          icon: '🛢️',
          category: 'Edible Oils',
          adulterants: ['Argemone mexicana seed oil'],
          testMethod: 'Laboratory Nitric Acid Ring Check',
          observation: 'Crimson-red interface ring indicates argemone toxicity.'
        }
      ]
    },
    {
      id: 'sweeteners',
      categoryName: 'Sweeteners',
      icon: '🍯',
      desc: 'High Fructose Corn Syrups, inverted rice syrups, and chalk.',
      foods: [
        {
          name: 'Honey',
          icon: '🍯',
          category: 'Sweeteners',
          adulterants: ['High Fructose Corn Syrup', 'Invert Sugar Syrup'],
          testMethod: 'Water Immersion & Cotton Wick Flame Check',
          observation: 'Pure honey sinks in one lump without dissolving immediately.'
        },
        {
          name: 'Sugar',
          icon: '🍚',
          category: 'Sweeteners',
          adulterants: ['Chalk Powder', 'Washing Soda', 'Urea'],
          testMethod: 'Water Dissolution & Acid Effervescence',
          observation: 'Chalk forms cloudy white sediment; washing soda bubbles.'
        }
      ]
    },
    {
      id: 'grains',
      categoryName: 'Grains & Pulses',
      icon: '🌾',
      desc: 'Mineral talc coatings, artificial dyes (Kesari dal / metanil yellow).',
      foods: [
        {
          name: 'Rice',
          icon: '🌾',
          category: 'Grains & Pulses',
          adulterants: ['Talc / Chalk Polish', 'Mineral Oil Coating'],
          testMethod: 'Water Wash Cloudiness & Flame Check',
          observation: 'Talc wash produces heavy milky white chalky sediment.'
        },
        {
          name: 'Toor Dal (Arhar)',
          icon: '🥣',
          category: 'Grains & Pulses',
          adulterants: ['Kesari Dal (Lathyrus sativus)', 'Metanil Yellow'],
          testMethod: 'Warm Water Dissolution Check',
          observation: 'Bright yellow artificial dye bleeds into warm water rapidly.'
        }
      ]
    },
    {
      id: 'beverages',
      categoryName: 'Beverages',
      icon: '☕',
      desc: 'Used recycled tea leaves, iron filings, chicory excess.',
      foods: [
        {
          name: 'Tea Leaves',
          icon: '🍵',
          category: 'Beverages',
          adulterants: ['Exhausted Dyed Leaves', 'Iron Filings'],
          testMethod: 'Wet Filter Paper & Magnet Check',
          observation: 'Artificial dye stains wet paper; magnet pulls iron filings.'
        },
        {
          name: 'Coffee Powder',
          icon: '☕',
          category: 'Beverages',
          adulterants: ['Undeclared Chicory Root', 'Roasted Date Seeds'],
          testMethod: 'Cold Water Sprinkle Float Check',
          observation: 'Pure coffee floats; chicory sinks fast leaving brown streaks.'
        }
      ]
    },
    {
      id: 'fruits',
      categoryName: 'Fruits & Vegetables',
      icon: '🍎',
      desc: 'Industrial calcium carbide ripening, paraffin wax coatings, malachite green.',
      foods: [
        {
          name: 'Green Peas',
          icon: '🫛',
          category: 'Fruits & Vegetables',
          adulterants: ['Malachite Green Chemical Dye'],
          testMethod: 'Warm Water Separation Check',
          observation: 'Pure peas keep natural hue; artificial dye stains water deep green.'
        },
        {
          name: 'Apples',
          icon: '🍎',
          category: 'Fruits & Vegetables',
          adulterants: ['Non-food Paraffin Wax Coating'],
          testMethod: 'Gentle Blade Scraping Check',
          observation: 'White waxy flakes come off when gently scraped.'
        }
      ]
    },
    {
      id: 'packaged',
      categoryName: 'Packaged Foods',
      icon: '📦',
      desc: 'Insoluble rock dust, uniodized bulk substitution, counterfeit branding.',
      foods: [
        {
          name: 'Table Salt',
          icon: '🧂',
          category: 'Packaged Foods',
          adulterants: ['Chalk Powder', 'White Stone Grit'],
          testMethod: 'Water Dissolution Clarity Test',
          observation: 'Pure salt dissolves completely transparent; chalk settles cloudy.'
        }
      ]
    }
  ];

  const filteredCategories = activeCategory === 'All' 
    ? categoriesData 
    : categoriesData.filter(c => c.categoryName.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section id="categories" className={`py-16 sm:py-24 bg-white border-t border-slate-100 ${language === 'te' ? 'font-telugu' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-brand-primary text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-4 h-4 text-emerald-600" />
            {t(language, 'Classified Food Matrix')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            {t(language, 'Food Categories & Common Adulterants')}
          </h2>
          <p className="mt-2 text-base text-slate-600">
            {t(language, 'Browse across 8 major food product categories. Click any card to view detailed safety parameters, common adulterants, and preliminary identification methods.')}
          </p>

          {/* Filter Bar */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {['All', 'Dairy', 'Spices', 'Oils', 'Sweeteners', 'Grains', 'Beverages'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-brand-dark'
                }`}
              >
                {t(language, cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="space-y-10">
          {filteredCategories.map((category) => (
            <div key={category.id} className="bg-slate-50/60 rounded-2xl p-6 sm:p-8 border border-slate-200/80">
              
              {/* Category Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-2xl">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-brand-dark">
                      {t(language, category.categoryName)}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {t(language, category.desc)}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-brand-teal bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                  {category.foods.length} {t(language, 'Monitored Items')}
                </span>
              </div>

              {/* Food Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.foods.map((food) => (
                  <div
                    key={food.name}
                    className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-3xl p-1 bg-slate-50 rounded-lg group-hover:scale-110 transition-transform">
                          {food.icon}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {t(language, 'Awareness Guide')}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-brand-dark group-hover:text-brand-primary transition-colors">
                        {t(language, food.name)}
                      </h4>

                      <div className="mt-2.5 space-y-1.5 text-xs">
                        <div className="text-slate-500">
                          <strong className="text-amber-800">{t(language, 'Adulterants:')} </strong>
                          {food.adulterants.map((adulterant) => t(language, adulterant)).join(', ')}
                        </div>
                        <div className="text-slate-600 line-clamp-2">
                          <strong className="text-brand-dark">{t(language, 'Test:')} </strong>
                          {t(language, food.testMethod)}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedFood(food)}
                        className="text-xs font-bold text-brand-teal hover:text-brand-dark flex items-center gap-1 transition-colors"
                      >
                        <span>{t(language, 'View Details')}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onSelectFoodForAI && onSelectFoodForAI(food.name)}
                        className="text-[11px] font-bold text-white bg-brand-primary hover:bg-brand-dark px-2.5 py-1 rounded-lg transition-colors"
                      >
                        {t(language, 'AI Check')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Modal */}
      {selectedFood && (
        <FoodDetailModal
          food={selectedFood}
          onClose={() => setSelectedFood(null)}
          onAnalyzeInAI={(foodName) => {
            setSelectedFood(null);
            if (onSelectFoodForAI) onSelectFoodForAI(foodName);
          }}
        />
      )}
    </section>
  );
}
