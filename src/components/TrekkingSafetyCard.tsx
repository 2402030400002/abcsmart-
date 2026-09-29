import React from "react";
import {
  Mountain,
  AlertTriangle,
  Clock,
  Compass,
  CheckCircle2,
  Phone,
  FileCheck,
  ShieldCheck
} from "lucide-react";
import { TrekkingRouteItem } from "../types";

interface TrekkingSafetyCardProps {
  trek: TrekkingRouteItem;
}

export const TrekkingSafetyCard: React.FC<TrekkingSafetyCardProps> = ({ trek }) => {
  const getDifficultyColor = () => {
    switch (trek.difficulty) {
      case "EASY": return "bg-[#F0FDF4] text-[#064E3B] border-[#DCFCE7]";
      case "MODERATE": return "bg-[#EFF6FF] text-[#1E40AF] border-[#DBEAFE]";
      case "DIFFICULT": return "bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]";
      case "EXTREME": return "bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]";
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#E5EAE7] hover:border-[#CBD5D0] transition space-y-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5EAE7]">
        <div>
          <div className="flex items-center gap-2">
            <Mountain className="w-5 h-5 text-[#064E3B]" />
            <h3 className="font-normal font-editorial text-base sm:text-lg text-[#1A2F23]">{trek.name}</h3>
          </div>
          <p className="text-xs text-[#4A5D52] mt-0.5">
            Base: <strong>{trek.baseLocation}</strong> • Max Altitude: <strong>{trek.maxAltitude}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor()}`}>
            {trek.difficulty}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F0F4F2] text-[#4A5D52]">
            {trek.durationDays} Days
          </span>
        </div>
      </div>

      {/* Permits & Best Season */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 bg-[#F9FBFA] rounded-xl border border-[#E5EAE7]">
          <span className="text-[10px] font-bold uppercase text-[#4A5D52] block">Required Permits</span>
          <p className="text-[#1A2F23] font-medium mt-0.5">{trek.permitsRequired}</p>
        </div>
        <div className="p-3 bg-[#F9FBFA] rounded-xl border border-[#E5EAE7]">
          <span className="text-[10px] font-bold uppercase text-[#4A5D52] block">Optimal Season</span>
          <p className="text-[#1A2F23] font-medium mt-0.5">{trek.bestSeason}</p>
        </div>
      </div>

      {/* Safety Advisories */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-[#1A2F23] uppercase tracking-wider block">
          Altitude & Terrain Safety Rules
        </span>
        <ul className="space-y-1.5 text-xs text-[#4A5D52]">
          {trek.safetyTips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#064E3B] shrink-0 mt-0.5" />
              <span className="text-[#1A2F23]">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Emergency Rescue Contact */}
      <div className="pt-3 border-t border-[#E5EAE7] flex items-center justify-between text-xs text-[#4A5D52]">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#064E3B]" />
          <span>Mountain Rescue Helpline:</span>
        </div>
        <a
          href={`tel:${trek.rescueContact}`}
          className="font-mono font-bold text-[#064E3B] bg-[#F0FDF4] px-2 py-0.5 rounded border border-[#DCFCE7] hover:underline"
        >
          {trek.rescueContact}
        </a>
      </div>
    </div>
  );
};
