import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Mic, MicOff, Sparkles, Send, Trash2, Clock, 
  RotateCcw, Shield, Layers, HelpCircle, ArrowRight, Bot, User 
} from 'lucide-react';
import FoodResultCard from './FoodResultCard';
import NonFoodCard from './NonFoodCard';
import { analyzeFoodItem, sendChatMessage, getRecentSearches } from '../services/api';

export default function FoodSafetyAI({ initialFood = '', onSelectCategory }) {
  const [query, setQuery] = useState(initialFood);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0); // 0: Idle, 1: Analyzing, 2: Checking sources, 3: Preparing info
  const [result, setResult] = useState(null);
  const [searches, setSearches] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [chatMode, setChatMode] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const resultsRef = useRef(null);

  const suggestionChips = [
    { name: 'Milk', icon: '🥛' },
    { name: 'Turmeric', icon: '🌶️' },
    { name: 'Chilli Powder', icon: '🌶️' },
    { name: 'Honey', icon: '🍯' },
    { name: 'Sugar', icon: '🍚' },
    { name: 'Ghee', icon: '🧈' },
    { name: 'Edible Oil', icon: '🛢️' },
    { name: 'Rice', icon: '🌾' },
  ];

  const popularCategories = [
    { name: 'Dairy Products', icon: '🥛', count: 'Milk, Ghee, Paneer' },
    { name: 'Spices & Condiments', icon: '🌶️', count: 'Turmeric, Chilli, Pepper' },
    { name: 'Sweeteners', icon: '🍯', count: 'Honey, Sugar, Jaggery' },
    { name: 'Edible Oils', icon: '🛢️', count: 'Mustard, Sunflower, Palm' },
    { name: 'Grains & Pulses', icon: '🌾', count: 'Rice, Wheat, Dal' },
    { name: 'Beverages', icon: '☕', count: 'Tea, Coffee' },
  ];

  useEffect(() => {
    loadSearches();
  }, []);

  useEffect(() => {
    if (initialFood) {
      setQuery(initialFood);
      handleAnalyze(initialFood);
    }
  }, [initialFood]);

  const loadSearches = async () => {
    try {
      const data = await getRecentSearches();
      setSearches(data);
    } catch (e) {
      console.warn(e);
    }
  };

  const handleAnalyze = async (foodToTest = null) => {
    const targetFood = (foodToTest !== null ? foodToTest : query).trim();
    if (!targetFood) return;

    setLoading(true);
    setResult(null);

    // Multi-step animated progress simulation
    setLoadingStep(1); // 🔍 Analyzing Food...
    await new Promise((r) => setTimeout(r, 600));

    setLoadingStep(2); // 🌐 Checking trusted sources...
    await new Promise((r) => setTimeout(r, 650));

    setLoadingStep(3); // 🤖 Preparing Food Safety Information...
    await new Promise((r) => setTimeout(r, 600));

    try {
      const data = await analyzeFoodItem(targetFood);
      setResult(data);
      loadSearches();

      // Reset chat context to new food
      setChatMessages([
        {
          role: 'assistant',
          content: data.isFood 
            ? `I have analyzed ${data.foodName}. What specific aspect would you like to know more about? You can ask about health risks, certified brands, or testing precautions.`
            : `I noticed "${targetFood}" is not a food item. Please ask me about edible items like Milk, Honey, or Spices.`
        }
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingStep(0);
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please type your query.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setQuery(speechText);
      handleAnalyze(speechText);
    };

    recognition.start();
  };

  const handleChatSend = async (messageText = null) => {
    const textToSend = (messageText || chatInput).trim();
    if (!textToSend) return;

    const newHistory = [...chatMessages, { role: 'user', content: textToSend }];
    setChatMessages(newHistory);
    setChatInput('');
    setChatLoading(true);

    try {
      const currentFoodName = result?.foodName || query || null;
      const response = await sendChatMessage(textToSend, currentFoodName, newHistory);
      setChatMessages([...newHistory, { role: 'assistant', content: response.reply }]);
    } catch (err) {
      setChatMessages([...newHistory, { 
        role: 'assistant', 
        content: "Unable to retrieve food safety response right now. Please verify your connection or try again." 
      }]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleClearSearches = () => {
    setSearches([]);
  };

  return (
    <section id="ai-assistant" className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-emerald-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-brand-primary text-xs font-bold uppercase tracking-wider mb-3">
            <Bot className="w-4 h-4 text-emerald-700" />
            AI-Powered Food Safety Engine
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            Food Safety AI
          </h2>
          <p className="mt-2 text-base sm:text-lg text-slate-600">
            Your Food Adulteration Awareness Assistant. Instant inspection, laboratory comparison, and safe purchasing recommendations.
          </p>
        </div>

        {/* Main Interface Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar (Categories, Recent Searches, Popular Items) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Recent Searches */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 font-bold text-sm text-brand-dark">
                  <Clock className="w-4 h-4 text-brand-teal" />
                  <span>Recent Searches</span>
                </div>
                {searches.length > 0 && (
                  <button
                    onClick={handleClearSearches}
                    className="text-[11px] font-semibold text-rose-500 hover:text-rose-700 flex items-center gap-1 transition-colors"
                    title="Clear history"
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear
                  </button>
                )}
              </div>

              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {searches.length > 0 ? (
                  searches.slice(0, 8).map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setQuery(item.food_name);
                        handleAnalyze(item.food_name);
                      }}
                      className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-emerald-50 text-left text-xs font-medium text-slate-700 transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="group-hover:text-brand-primary">{item.food_name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 group-hover:text-emerald-600 font-semibold">
                        Check ➔
                      </span>
                    </button>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 py-3 text-center">No recent searches yet.</p>
                )}
              </div>
            </div>

            {/* Food Categories Quick Selector */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft">
              <div className="flex items-center gap-2 font-bold text-sm text-brand-dark mb-3">
                <Layers className="w-4 h-4 text-brand-primary" />
                <span>Browse Categories</span>
              </div>

              <div className="space-y-2">
                {popularCategories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => onSelectCategory && onSelectCategory(cat.name)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-emerald-300 bg-slate-50/70 hover:bg-emerald-50/50 text-left transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{cat.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-brand-dark group-hover:text-brand-primary">
                          {cat.name}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {cat.count}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>

            {/* Safety Assurance Note */}
            <div className="bg-emerald-900 text-emerald-50 rounded-2xl p-5 shadow-soft border border-emerald-800">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-emerald-300 mb-2">
                <Shield className="w-4 h-4" />
                <span>Verified Awareness Standards</span>
              </div>
              <p className="text-xs text-emerald-100/90 leading-relaxed">
                Knowledge indexed directly from the <strong>FSSAI DART manual</strong>, <strong>WHO food guidelines</strong>, and <strong>Codex Alimentarius</strong>. Laboratory testing remains mandatory for scientific confirmation.
              </p>
            </div>

          </div>

          {/* Main Area: Chat & Search Interface */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Search Input Box Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-premium">
              <label htmlFor="food-search-input" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Enter Food Item to Analyze
              </label>

              <div className="relative flex items-center">
                <div className="absolute left-4 text-slate-400">
                  <Search className="w-5 h-5 text-emerald-600" />
                </div>

                <input
                  id="food-search-input"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                  placeholder="Enter a food item e.g. Milk, Turmeric, Honey, Sugar..."
                  className="w-full pl-12 pr-28 py-4 text-sm sm:text-base font-medium rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all shadow-inner"
                />

                <div className="absolute right-2.5 flex items-center gap-1">
                  <button
                    onClick={handleVoiceInput}
                    type="button"
                    title={isListening ? "Listening..." : "Search with Voice"}
                    className={`p-2.5 rounded-lg transition-all ${
                      isListening ? 'bg-rose-500 text-white animate-pulse' : 'text-slate-400 hover:text-brand-primary hover:bg-slate-100'
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => handleAnalyze()}
                    disabled={loading || !query.trim()}
                    className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-brand-primary to-brand-teal hover:from-brand-dark hover:to-brand-primary disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm transition-all"
                  >
                    Analyze
                  </button>
                </div>
              </div>

              {/* Suggestion Chips */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 mr-1">Quick Select:</span>
                {suggestionChips.map((chip) => (
                  <button
                    key={chip.name}
                    onClick={() => {
                      setQuery(chip.name);
                      handleAnalyze(chip.name);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 border border-slate-200/80 text-xs font-semibold text-slate-700 transition-all hover:scale-105"
                  >
                    <span>{chip.icon}</span>
                    <span>{chip.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Multi-Stage Animated Loading Screen */}
            {loading && (
              <div className="bg-white rounded-2xl border border-emerald-200 p-8 shadow-premium text-center animate-fadeIn">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
                  <Sparkles className="w-8 h-8 animate-spin" />
                </div>

                <div className="space-y-3 max-w-sm mx-auto">
                  {/* Step 1 */}
                  <div className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                    loadingStep === 1 ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200' : 'text-slate-400 text-xs'
                  }`}>
                    <span className="text-base">🔍</span>
                    <span>Analyzing Food Query...</span>
                    {loadingStep === 1 && <span className="ml-auto text-emerald-600 animate-pulse font-mono text-xs">Processing</span>}
                  </div>

                  {/* Step 2 */}
                  <div className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                    loadingStep === 2 ? 'bg-teal-50 text-teal-900 font-bold border border-teal-200' : 'text-slate-400 text-xs'
                  }`}>
                    <span className="text-base">🌐</span>
                    <span>Checking Trusted Sources (FSSAI, WHO)...</span>
                    {loadingStep === 2 && <span className="ml-auto text-teal-600 animate-pulse font-mono text-xs">Retrieving</span>}
                  </div>

                  {/* Step 3 */}
                  <div className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                    loadingStep === 3 ? 'bg-emerald-100 text-emerald-950 font-bold border border-emerald-300' : 'text-slate-400 text-xs'
                  }`}>
                    <span className="text-base">🤖</span>
                    <span>Preparing Food Safety Information...</span>
                    {loadingStep === 3 && <span className="ml-auto text-emerald-700 animate-pulse font-mono text-xs">Synthesizing</span>}
                  </div>
                </div>

                <p className="mt-5 text-xs text-slate-400">
                  Formulating preliminary awareness guidelines under FSSAI protocols...
                </p>
              </div>
            )}

            {/* Result Area */}
            <div ref={resultsRef}>
              {result && !loading && (
                <>
                  {result.isFood ? (
                    <FoodResultCard 
                      data={result} 
                      onAskFollowUp={(question) => {
                        setChatMode(true);
                        handleChatSend(question);
                      }} 
                    />
                  ) : (
                    <NonFoodCard 
                      data={result} 
                      onSelectSuggestion={(food) => {
                        setQuery(food);
                        handleAnalyze(food);
                      }} 
                    />
                  )}
                </>
              )}
            </div>

            {/* Interactive Follow-Up Chat Experience */}
            {result && !loading && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-premium">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-brand-primary" />
                    <h3 className="font-extrabold text-brand-dark text-base">
                      Have Questions About {result.foodName || 'This Food'}?
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400">Multi-Turn AI Assistant</span>
                </div>

                {/* Chat Messages Log */}
                <div className="space-y-3 mb-4 max-h-72 overflow-y-auto pr-1">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex gap-3 text-xs sm:text-sm ${
                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 text-xs font-bold">
                          AI
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-brand-primary text-white rounded-tr-none'
                            : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none whitespace-pre-line'
                        }`}
                      >
                        {msg.content}
                      </div>
                      {msg.role === 'user' && (
                        <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 text-xs font-bold">
                          You
                        </div>
                      )}
                    </div>
                  ))}

                  {chatLoading && (
                    <div className="flex gap-2 items-center text-xs text-slate-400 py-1">
                      <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">AI</div>
                      <div className="bg-slate-100 p-2.5 rounded-xl flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Follow-up Quick Suggestion Buttons */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {[
                    "What are the health risks?",
                    "How can I buy safer versions?",
                    "What should I check on the packaging?",
                    "Is there a simple home check method?"
                  ].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => handleChatSend(chip)}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-900 border border-slate-200 transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                {/* Chat Input Box */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                    placeholder="Ask Food Safety AI a follow-up question..."
                    className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                  />
                  <button
                    onClick={() => handleChatSend()}
                    disabled={chatLoading || !chatInput.trim()}
                    className="px-4 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-xs flex items-center gap-1.5 disabled:opacity-40 transition-colors"
                  >
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
