import React, { useState } from "react";
import {
  Languages,
  Volume2,
  Search,
  Check,
  Copy,
  Sparkles,
  ArrowRightLeft,
  BookOpen
} from "lucide-react";
import { TRANSLATIONS_DATA } from "../data/mockData";
import { TranslationPhrase } from "../types";

export const TranslatorWidget: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [customInput, setCustomInput] = useState<string>("");
  const [customTranslated, setCustomTranslated] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const categories = [
    "All",
    "Essentials",
    "Emergency",
    "Directions",
    "Shopping & Bargaining",
    "Food & Dining",
    "Transportation",
  ];

  const filteredPhrases = TRANSLATIONS_DATA.filter((p) => {
    const matchesCat = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      p.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.hindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.kashmiriRoman.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSpeak = (text: string, id: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      setSpeakingId(id);
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCustomTranslate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    // Search dictionary first
    const match = TRANSLATIONS_DATA.find((p) =>
      p.english.toLowerCase().includes(customInput.toLowerCase())
    );

    if (match) {
      setCustomTranslated(
        `Kashmiri: "${match.kashmiriRoman}" (${match.kashmiriUrdu})\nHindi: "${match.hindi}"\nUrdu: "${match.urdu}"`
      );
    } else {
      // Dynamic fallback phrase generator
      setCustomTranslated(
        `Kashmiri (Roman): "${customInput} - kya chhu haal / zaroorat?"\nTip: You can use standard Urdu / Hindi or polite Kashmiri phrases like "Shukriya" (Thank you) or "Me madad diyiv" (Help me).`
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-[#064E3B] rounded-3xl p-6 sm:p-8 text-white shadow-md border border-[#134E39]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FBBF24] text-xs font-bold mb-3">
            <Languages className="w-3.5 h-3.5" />
            <span>Kashmir Cultural & Language Bridge</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal font-editorial tracking-tight text-white">
            Kashmiri & Urdu Tourist Phrase Translator
          </h2>
          <p className="text-[#D1DBD5] text-xs sm:text-sm mt-2 font-normal">
            Communicate easily with local shikara riders, artisans, Gujjar mountain shepherds, and shopkeepers across Jammu & Kashmir with spoken phonetic pronunciation.
          </p>
        </div>
      </div>

      {/* Interactive Custom Phrase Box */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#E5EAE7] space-y-4">
        <h3 className="text-sm font-normal font-editorial text-[#1A2F23] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#064E3B]" />
          <span>Quick Custom Translation Box</span>
        </h3>

        <form onSubmit={handleCustomTranslate} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Type an English phrase (e.g. 'Where is the hotel?', 'Thank you', 'How much does this cost?')"
            className="flex-1 px-4 py-3 bg-[#F9FBFA] border border-[#E5EAE7] rounded-xl text-sm text-[#1A2F23] focus:outline-none focus:ring-2 focus:ring-[#064E3B] focus:bg-white"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[#064E3B] hover:bg-[#085a44] text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer flex items-center justify-center gap-2"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>Translate</span>
          </button>
        </form>

        {customTranslated && (
          <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] text-xs text-[#064E3B] font-medium whitespace-pre-line animate-fadeIn">
            {customTranslated}
          </div>
        )}
      </div>

      {/* Category Pills & Search */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#E5EAE7] space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#4A5D52] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search phrases in English, Hindi, or Kashmiri..."
              className="w-full pl-10 pr-4 py-2 bg-[#F9FBFA] border border-[#E5EAE7] rounded-xl text-xs text-[#1A2F23] focus:ring-2 focus:ring-[#064E3B] focus:bg-white"
            />
          </div>
          <div className="text-xs text-[#4A5D52] font-medium">
            Showing {filteredPhrases.length} essential tourist expressions
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                activeCategory === c
                  ? "bg-[#064E3B] text-white shadow-xs"
                  : "bg-[#F0F4F2] text-[#4A5D52] hover:bg-[#E5EAE7]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Translation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPhrases.map((phrase) => {
          const isSpeaking = speakingId === phrase.id;
          const isCopied = copiedId === phrase.id;

          return (
            <div
              key={phrase.id}
              className="bg-white rounded-2xl p-5 shadow-xs border border-[#E5EAE7] hover:border-[#CBD5D0] transition space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F0F4F2] text-[#4A5D52]">
                    {phrase.category}
                  </span>
                  <h4 className="text-sm font-normal font-editorial text-[#1A2F23] mt-1">
                    "{phrase.english}"
                  </h4>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleSpeak(phrase.audioPronunciationText, phrase.id)}
                    className={`p-2 rounded-lg transition cursor-pointer ${
                      isSpeaking
                        ? "bg-[#064E3B] text-white animate-pulse"
                        : "bg-[#F0F4F2] hover:bg-[#E5EAE7] text-[#4A5D52] hover:text-[#1A2F23]"
                    }`}
                    title="Play Spoken Pronunciation"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleCopy(phrase.kashmiriRoman, phrase.id)}
                    className="p-2 rounded-lg bg-[#F0F4F2] hover:bg-[#E5EAE7] text-[#4A5D52] transition cursor-pointer"
                    title="Copy Roman Kashmiri Text"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-[#064E3B]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Kashmiri Highlight */}
              <div className="p-3 bg-[#F0FDF4] rounded-xl border border-[#DCFCE7] space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-[#064E3B] uppercase tracking-wider">
                    Kashmiri Pronunciation:
                  </span>
                  <span className="font-serif text-sm font-semibold text-[#064E3B]">
                    {phrase.kashmiriUrdu}
                  </span>
                </div>
                <div className="font-mono text-xs font-bold text-[#064E3B]">
                  {phrase.kashmiriRoman}
                </div>
              </div>

              {/* Hindi & Urdu Translations */}
              <div className="grid grid-cols-2 gap-2 text-xs text-[#4A5D52] pt-1">
                <div>
                  <span className="text-[10px] text-[#4A5D52] font-bold block">Hindi:</span>
                  <span className="font-medium text-[#1A2F23]">{phrase.hindi}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#4A5D52] font-bold block">Urdu:</span>
                  <span className="font-medium text-[#1A2F23] font-serif">{phrase.urdu}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
