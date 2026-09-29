import React from "react";
import {
  Mountain,
  Compass,
  CheckCircle2,
  AlertTriangle,
  HeartHandshake,
  ShieldCheck
} from "lucide-react";
import { TREKKING_ROUTES_DATA } from "../data/mockData";
import { TrekkingSafetyCard } from "./TrekkingSafetyCard";

export const TreksView: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-[#064E3B] rounded-3xl p-6 sm:p-8 text-white shadow-md border border-[#134E39]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FBBF24] text-xs font-bold mb-3">
            <Mountain className="w-3.5 h-3.5" />
            <span>Himalayan Mountain Safety & Trek Protocols</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal font-editorial tracking-tight text-white">
            Kashmir Alpine Treks & Expedition Safety
          </h2>
          <p className="text-[#D1DBD5] text-xs sm:text-sm mt-2 font-normal">
            Safety itineraries, permit requirements, high-altitude acclimation checkpoints, and mountain rescue contacts for famous Himalayan trails like Kashmir Great Lakes and Tarsar Marsar.
          </p>
        </div>
      </div>

      {/* Trekking Safety Rules Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-[#E5EAE7] space-y-4">
        <h3 className="text-base font-normal font-editorial text-[#1A2F23] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#064E3B]" />
          <span>Mandatory Trekker Safety Checklist</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#1A2F23]">
          <div className="p-4 bg-[#F9FBFA] rounded-xl border border-[#E5EAE7] space-y-1.5">
            <strong className="text-[#064E3B] block">1. Mandatory Registration</strong>
            <p className="text-[#4A5D52]">Register with J&K Tourism Department / Sonamarg Army Base Camp before entering alpine trails.</p>
          </div>
          <div className="p-4 bg-[#F9FBFA] rounded-xl border border-[#E5EAE7] space-y-1.5">
            <strong className="text-[#064E3B] block">2. Leave No Trace</strong>
            <p className="text-[#4A5D52]">Carry back all plastic wraps, foil wrappers, and batteries. Protect fragile high-altitude alpine lakes.</p>
          </div>
          <div className="p-4 bg-[#F9FBFA] rounded-xl border border-[#E5EAE7] space-y-1.5">
            <strong className="text-[#064E3B] block">3. Weather Window</strong>
            <p className="text-[#4A5D52]">Never cross high passes (like Gadsar Pass at 13,800 ft) during heavy rain or electrical storms.</p>
          </div>
        </div>
      </div>

      {/* Trek Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TREKKING_ROUTES_DATA.map((trek) => (
          <TrekkingSafetyCard key={trek.id} trek={trek} />
        ))}
      </div>
    </div>
  );
};
