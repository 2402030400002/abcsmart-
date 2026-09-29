import React, { useState } from "react";
import {
  AlertTriangle,
  ShieldCheck,
  Tag,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  QrCode,
  Flame,
  Search
} from "lucide-react";
import { SCAM_ALERTS_DATA } from "../data/mockData";
import { ScamAlertCard } from "./ScamAlertCard";

export const ScamsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = [
    "All",
    "Pashmina & Handicrafts",
    "Gondola Ticketing",
    "Saffron & Dry Fruits",
    "Pony & Horse Rides",
    "Shikara & Houseboats",
    "Taxi & Transport",
  ];

  const filtered = SCAM_ALERTS_DATA.filter((s) => {
    const matchCat = selectedCategory === "All" || s.category === selectedCategory;
    const matchSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.warningSign.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-[#064E3B] rounded-3xl p-6 sm:p-8 text-white shadow-md border border-[#134E39]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FBBF24] text-xs font-bold mb-3">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Fair Trade & Consumer Verification</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal font-editorial tracking-tight text-white">
            Scam Awareness & GI Authenticity Verification
          </h2>
          <p className="text-[#D1DBD5] text-xs sm:text-sm mt-2 font-normal">
            Learn how to verify authentic Kashmiri GI-tagged Pashmina and saffron, avoid touts and fake ticket counters, and understand standard government-fixed tariffs.
          </p>
        </div>
      </div>

      {/* GI Authenticity Verification Interactive Guide */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-[#E5EAE7] space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-[#E5EAE7]">
          <div className="p-2 bg-[#F0FDF4] text-[#064E3B] rounded-xl border border-[#DCFCE7]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-normal font-editorial text-[#1A2F23]">
              How to Verify 100% Genuine Kashmiri Pashmina & Saffron
            </h3>
            <p className="text-xs text-[#4A5D52]">
              Jammu & Kashmir Craft Development Institute (CDI) testing guidelines.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#F9FBFA] border border-[#E5EAE7] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1A2F23] uppercase">
              <QrCode className="w-4 h-4 text-[#064E3B]" />
              <span>1. Scan GI Micro-Barcode</span>
            </div>
            <p className="text-xs text-[#4A5D52] leading-relaxed">
              Every genuine Kashmiri handloom Pashmina is tagged with a non-removable, tamper-evident GI label containing an individualized QR code verified at <strong>kashmirhandicrafts.in</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F9FBFA] border border-[#E5EAE7] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1A2F23] uppercase">
              <Flame className="w-4 h-4 text-[#D97706]" />
              <span>2. Pure Pashmina Burn Test</span>
            </div>
            <p className="text-xs text-[#4A5D52] leading-relaxed">
              Genuine pashmina wool smells like burnt hair when singed and crumbles into soft ash. Synthetic polyester fibers smell like plastic and melt into hard beads.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F9FBFA] border border-[#E5EAE7] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1A2F23] uppercase">
              <Sparkles className="w-4 h-4 text-[#064E3B]" />
              <span>3. Pure Saffron (Mongra) Test</span>
            </div>
            <p className="text-xs text-[#4A5D52] leading-relaxed">
              Genuine saffron takes 10–15 minutes in lukewarm water to slowly turn the water golden yellow (never red). The thread retains its crimson shape and does not disintegrate.
            </p>
          </div>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#E5EAE7] space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none w-full sm:w-auto">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  selectedCategory === c
                    ? "bg-[#064E3B] text-white shadow-xs"
                    : "bg-[#F0F4F2] text-[#4A5D52] hover:bg-[#E5EAE7]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#4A5D52] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search alert topics..."
              className="w-full pl-10 pr-4 py-2 bg-[#F9FBFA] border border-[#E5EAE7] rounded-xl text-xs text-[#1A2F23] focus:ring-2 focus:ring-[#064E3B] focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Scams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((scam) => (
          <ScamAlertCard key={scam.id} scam={scam} />
        ))}
      </div>
    </div>
  );
};
