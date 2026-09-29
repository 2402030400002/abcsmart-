import React, { useState } from "react";
import {
  ShieldAlert,
  Compass,
  Sparkles,
  Route,
  PhoneCall,
  CalendarCheck,
  Search,
  ChevronRight,
  AlertTriangle,
  Heart,
  MapPin,
  Mountain,
  Users,
  Languages,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  Flame
} from "lucide-react";
import {
  DESTINATIONS_DATA,
  ROAD_STATUS_DATA,
  SCAM_ALERTS_DATA,
  EMERGENCY_CONTACTS_DATA,
  WEATHER_DATA,
} from "../data/mockData";
import { DestinationCard } from "./DestinationCard";
import { Destination } from "../types";

interface HomeViewProps {
  onNavigate: (tab: string) => void;
  onOpenSOS: () => void;
  onOpenAI: () => void;
  onSelectDestination: (dest: Destination) => void;
  savedDestinations: string[];
  onToggleSaveDestination: (id: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenSOS,
  onOpenAI,
  onSelectDestination,
  savedDestinations,
  onToggleSaveDestination,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDestinations = DESTINATIONS_DATA.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-10">
      {/* Real-time Status Alert Ribbon */}
      <div className="bg-white text-[#1A2F23] rounded-2xl p-3.5 shadow-xs border border-[#E5EAE7] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="px-2.5 py-1 rounded-full bg-[#064E3B] text-[#FBBF24] font-bold text-[10px] tracking-wider uppercase shrink-0">
            Live Bulletin
          </span>
          <span className="text-[#4A5D52] truncate">
            🛣️ <strong className="text-[#1A2F23]">NH-44 Highway:</strong> OPEN • 🚠 <strong className="text-[#1A2F23]">Gulmarg Gondola:</strong> Operating Phase 1 & 2 • ☀️ <strong className="text-[#1A2F23]">Srinagar:</strong> 14°C Pleasant
          </span>
        </div>
        <button
          onClick={() => onNavigate("roads")}
          className="text-[#064E3B] hover:text-[#043d2e] font-bold shrink-0 flex items-center gap-1 hover:underline cursor-pointer text-xs"
        >
          <span>Check All Passes</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Hero Banner Section */}
      <div className="relative rounded-3xl overflow-hidden bg-[#064E3B] text-white min-h-[460px] sm:min-h-[500px] flex items-center shadow-md border border-[#134E39]">
        {/* Background Scenic Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1920&q=80"
            alt="Kashmir Valley & Shikaras on Dal Lake"
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#064E3B] via-[#064E3B]/90 to-[#064E3B]/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#064E3B] via-transparent to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl px-6 sm:px-12 py-10 sm:py-14 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-emerald-100 border border-white/20 text-xs font-semibold backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-[#FBBF24]" />
            <span>Official Tourist Safety & Travel Companion • Jammu & Kashmir</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal font-editorial tracking-tight leading-[1.08] text-white">
            Explore Kashmir with{" "}
            <span className="italic text-[#FBBF24]">Confidence & Peace of Mind</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#D1DBD5] leading-relaxed max-w-2xl font-normal">
            Real-time alpine highway telemetry, Gemini AI trip curation, emergency SOS rapid dispatch, certified fair-price guidelines, and local dialect translator.
          </p>

          {/* Quick Search Bar */}
          <div className="relative max-w-xl">
            <Search className="w-4 h-4 text-[#4A5D52] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Srinagar, Gulmarg Gondola, Pahalgam, Hospitals, Taxis..."
              className="w-full pl-11 pr-28 py-3 sm:py-3.5 bg-white text-[#1A2F23] placeholder:text-[#6B7F73] rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FBBF24] shadow-md border border-[#E5EAE7]"
            />
            <button
              onClick={() => onNavigate("explore")}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#064E3B] hover:bg-[#043d2e] text-white rounded-lg text-xs font-bold transition shadow-xs cursor-pointer border border-[#134E39]"
            >
              Explore
            </button>
          </div>

          {/* Action Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={onOpenSOS}
              className="px-4 py-2 rounded-lg bg-[#DC2626] hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition cursor-pointer border border-red-700"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Emergency SOS</span>
            </button>
            <button
              onClick={onOpenAI}
              className="px-4 py-2 rounded-lg bg-white text-[#064E3B] text-xs font-bold flex items-center gap-1.5 shadow-xs hover:bg-[#F0F4F2] transition cursor-pointer border border-[#E5EAE7]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Ask AI Guide</span>
            </button>
            <button
              onClick={() => onNavigate("planner")}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md transition cursor-pointer border border-white/20"
            >
              <CalendarCheck className="w-3.5 h-3.5 text-[#FBBF24]" />
              <span>AI Trip Planner</span>
            </button>
            <button
              onClick={() => onNavigate("roads")}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md transition cursor-pointer border border-white/20"
            >
              <Route className="w-3.5 h-3.5 text-[#FBBF24]" />
              <span>Passes Status</span>
            </button>
            <button
              onClick={() => onNavigate("budget")}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md transition cursor-pointer border border-white/20"
            >
              <Calculator className="w-3.5 h-3.5 text-[#FBBF24]" />
              <span>Fair Price Guide</span>
            </button>
          </div>
        </div>
      </div>

      {/* Safety Index & Key Highlights Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#E5EAE7] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#4A5D52] uppercase tracking-wider">Tourist Safety Index</span>
            <ShieldCheck className="w-5 h-5 text-[#064E3B]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#1A2F23]">
            94<span className="text-[#064E3B] text-lg">/100</span>
          </div>
          <p className="text-xs text-[#4A5D52]">
            Active tourist police checkpoints & 24x7 TRC assistance desk.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#E5EAE7] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#4A5D52] uppercase tracking-wider">Highway Condition</span>
            <Route className="w-5 h-5 text-[#064E3B]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#1A2F23]">
            NH-44 <span className="text-[#064E3B] text-xs font-bold px-2 py-0.5 rounded-full bg-[#F0FDF4] border border-[#DCFCE7]">OPEN</span>
          </div>
          <p className="text-xs text-[#4A5D52]">
            Jammu-Srinagar two-way light motor vehicle traffic flowing smoothly.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#E5EAE7] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#4A5D52] uppercase tracking-wider">Women Safety Helpline</span>
            <Lock className="w-5 h-5 text-[#064E3B]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#1A2F23]">
            181 <span className="text-xs text-[#4A5D52] font-medium">Toll Free</span>
          </div>
          <p className="text-xs text-[#4A5D52]">
            Prepaid taxi verification & certified family homestays network.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#E5EAE7] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#4A5D52] uppercase tracking-wider">Unified Emergency</span>
            <PhoneCall className="w-5 h-5 text-[#DC2626]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#DC2626]">
            112 <span className="text-xs text-[#4A5D52] font-normal">All J&K</span>
          </div>
          <p className="text-xs text-[#4A5D52]">
            Single-tap emergency SOS dispatches coordinates and local assistance.
          </p>
        </div>
      </div>

      {/* Featured Destinations Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-[#064E3B] uppercase tracking-wider block mb-1">
              Curated Valley Destinations
            </span>
            <h2 className="text-2xl sm:text-3xl font-normal font-editorial text-[#1A2F23] tracking-tight">
              Iconic Locations & Safety Ratings
            </h2>
          </div>
          <button
            onClick={() => onNavigate("explore")}
            className="text-xs font-bold text-[#064E3B] hover:text-[#043d2e] flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>View All Destinations</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.slice(0, 6).map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              isSaved={savedDestinations.includes(dest.id)}
              onToggleSave={onToggleSaveDestination}
              onSelect={onSelectDestination}
            />
          ))}
        </div>
      </div>

      {/* Fair Pricing & Anti-Scam Spotlight */}
      <div className="bg-[#064E3B] rounded-3xl p-6 sm:p-10 text-white shadow-md border border-[#134E39] space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FBBF24] text-xs font-bold mb-2">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Consumer Protection & Authenticity</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-normal font-editorial tracking-tight">
              Fair Trade Guidelines & Anti-Scam Protection
            </h3>
            <p className="text-[#D1DBD5] text-xs sm:text-sm mt-1 max-w-2xl font-normal">
              Avoid overcharging, unauthorized middlemen, and fake saffron or pashmina shawls with our verified government rate charts.
            </p>
          </div>

          <button
            onClick={() => onNavigate("scams")}
            className="px-5 py-2.5 rounded-xl bg-[#FBBF24] hover:bg-[#f59e0b] text-[#1A2F23] font-bold text-xs shadow-xs transition cursor-pointer shrink-0"
          >
            Open Scam Alert Guide
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {SCAM_ALERTS_DATA.slice(0, 3).map((scam) => (
            <div
              key={scam.id}
              onClick={() => onNavigate("scams")}
              className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition cursor-pointer space-y-2"
            >
              <div className="flex justify-between items-center text-[11px] text-[#FBBF24] font-bold">
                <span>{scam.category}</span>
                <span className="px-2 py-0.5 rounded-full bg-black/20 text-xs">Risk: {scam.severity}</span>
              </div>
              <h4 className="text-sm font-bold text-white line-clamp-1">{scam.title}</h4>
              <p className="text-xs text-[#D1DBD5] line-clamp-2">{scam.warningSign}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
