import React from "react";
import {
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Tag,
  Info,
  ExternalLink,
  ShieldAlert
} from "lucide-react";
import { ScamAlertItem } from "../types";

interface ScamAlertCardProps {
  scam: ScamAlertItem;
}

export const ScamAlertCard: React.FC<ScamAlertCardProps> = ({ scam }) => {
  const getSeverityBadge = () => {
    switch (scam.severity) {
      case "HIGH":
        return "bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]";
      case "MEDIUM":
        return "bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]";
      case "LOW":
        return "bg-[#F0FDF4] text-[#064E3B] border-[#DCFCE7]";
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#E5EAE7] hover:border-[#CBD5D0] transition space-y-4">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F0F4F2] text-[#4A5D52]">
              {scam.category}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getSeverityBadge()}`}>
              Risk: {scam.severity}
            </span>
          </div>
          <h3 className="font-normal font-editorial text-base sm:text-lg text-[#1A2F23] leading-snug">
            {scam.title}
          </h3>
        </div>
      </div>

      {/* Warning Sign Box */}
      <div className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E]">
        <strong className="flex items-center gap-1.5 font-bold mb-1 text-[#78350F]">
          <AlertTriangle className="w-4 h-4 text-[#D97706]" />
          <span>Warning Signs / Modus Operandi:</span>
        </strong>
        <p className="leading-relaxed">{scam.warningSign}</p>
      </div>

      {/* What To Do Checklist */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-[#1A2F23] uppercase tracking-wider block">
          Protective Actions & Verification Steps:
        </span>
        <ul className="space-y-1.5 text-xs text-[#4A5D52]">
          {scam.whatToDo.map((step, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#064E3B] shrink-0 mt-0.5" />
              <span className="leading-relaxed text-[#1A2F23]">{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Official Precaution & Benchmark Price */}
      <div className="pt-3 border-t border-[#E5EAE7] grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 bg-[#F0FDF4] rounded-xl border border-[#DCFCE7] text-[#064E3B]">
          <span className="text-[10px] font-bold uppercase tracking-wider block text-[#064E3B]">
            Govt. Certified Precaution
          </span>
          <p className="text-[11px] mt-0.5 font-medium">{scam.officialPrecaution}</p>
        </div>

        {scam.officialRateGuideline && (
          <div className="p-2.5 bg-[#F9FBFA] rounded-xl border border-[#E5EAE7] text-[#1A2F23]">
            <span className="text-[10px] font-bold uppercase tracking-wider block text-[#4A5D52]">
              Fair Benchmark Price
            </span>
            <p className="text-[11px] mt-0.5 font-bold text-[#1A2F23]">{scam.officialRateGuideline}</p>
          </div>
        )}
      </div>
    </div>
  );
};
