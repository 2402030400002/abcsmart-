import React from "react";
import {
  ShieldAlert,
  PhoneCall,
  HeartPulse,
  ThermometerSnowflake,
  LifeBuoy,
  CheckCircle2,
  AlertTriangle,
  Hospital,
  Shield,
  FileText,
  Lock,
  ChevronRight
} from "lucide-react";
import { EMERGENCY_CONTACTS_DATA } from "../data/mockData";
import { WomenSafetyPanel } from "./WomenSafetyPanel";
import { UserProfile } from "../types";

interface SafetyViewProps {
  onOpenSOS: () => void;
  user: UserProfile | null;
}

export const SafetyView: React.FC<SafetyViewProps> = ({ onOpenSOS, user }) => {
  return (
    <div className="space-y-10">
      {/* Top Banner with Red Emergency SOS Trigger */}
      <div className="bg-[#991B1B] rounded-3xl p-6 sm:p-8 text-white shadow-md border border-[#7F1D1D] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FEE2E2] text-xs font-bold">
            <ShieldAlert className="w-4 h-4 animate-bounce" />
            <span>Kashmir 24x7 Rapid Tourist Protection</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-normal font-editorial tracking-tight text-white">
            Safety, Health & Emergency Response Hub
          </h2>
          <p className="text-[#FEE2E2] text-xs sm:text-sm leading-relaxed">
            One-touch emergency dispatch, official police contacts, high-altitude health protocols, and women traveler safety resources.
          </p>
        </div>

        <button
          id="safety-hub-sos-trigger"
          onClick={onOpenSOS}
          className="px-6 py-4 rounded-xl bg-white text-[#991B1B] hover:bg-[#FEF2F2] font-bold text-sm shadow-xs flex items-center justify-center gap-2 transition transform hover:scale-105 cursor-pointer shrink-0 animate-sos-pulse"
        >
          <PhoneCall className="w-5 h-5 text-[#991B1B]" />
          <span>ACTIVATE EMERGENCY SOS</span>
        </button>
      </div>

      {/* Official State Helplines Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-normal font-editorial text-[#1A2F23] flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-[#064E3B]" />
            <span>Official Government Helplines (Jammu & Kashmir)</span>
          </h3>
          <span className="text-xs text-[#4A5D52] font-medium">All numbers toll-free / 24x7</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EMERGENCY_CONTACTS_DATA.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl p-5 shadow-xs border border-[#E5EAE7] hover:border-[#CBD5D0] transition flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F0F4F2] text-[#4A5D52]">
                    {c.category}
                  </span>
                  <span className="text-[10px] font-bold text-[#064E3B] bg-[#F0FDF4] px-2 py-0.5 rounded border border-[#DCFCE7]">
                    {c.is24x7 ? "24x7 Active" : "Day Service"}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#1A2F23]">{c.serviceName}</h4>
                <p className="text-xs text-[#4A5D52] mt-0.5">{c.department} • {c.location}</p>
              </div>

              <a
                href={`tel:${c.number}`}
                className="w-full py-2.5 px-3 rounded-xl bg-[#064E3B] hover:bg-[#085a44] text-white font-mono font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#FBBF24]" />
                <span>Call {c.number}</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* High-Altitude Health & AMS Protocols */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-[#E5EAE7] space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-[#E5EAE7]">
          <div className="p-2 bg-[#F0FDF4] text-[#064E3B] rounded-xl border border-[#DCFCE7]">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-normal font-editorial text-[#1A2F23]">
              High-Altitude Acclimatization & Acute Mountain Sickness (AMS)
            </h3>
            <p className="text-xs text-[#4A5D52]">
              Essential for visitors heading to Gulmarg Apharwat Peak (12,293 ft), Sonamarg, Zojila Pass, or high Himalayan treks.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#F9FBFA] border border-[#E5EAE7] space-y-2">
            <h4 className="text-xs font-bold text-[#1A2F23] uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-[#D97706]" />
              <span>Recognize AMS Symptoms</span>
            </h4>
            <ul className="text-xs text-[#4A5D52] space-y-1">
              <li>• Throbbing headache & dizziness</li>
              <li>• Shortness of breath on mild exertion</li>
              <li>• Loss of appetite & nausea</li>
              <li>• Fatigue & interrupted sleep</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] space-y-2">
            <h4 className="text-xs font-bold text-[#064E3B] uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#064E3B]" />
              <span>Preventive Rules</span>
            </h4>
            <ul className="text-xs text-[#064E3B] space-y-1">
              <li>• Drink 3-4 liters of water daily</li>
              <li>• Avoid alcohol & heavy meals on day 1</li>
              <li>• Ascend gradually (rest 1 night in Srinagar)</li>
              <li>• Carry portable oxygen canister at Gulmarg Phase 2</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] space-y-2">
            <h4 className="text-xs font-bold text-[#991B1B] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-[#991B1B]" />
              <span>Emergency Action</span>
            </h4>
            <ul className="text-xs text-[#7F1D1D] space-y-1">
              <li>• Descend immediately to lower altitude</li>
              <li>• Visit Medical Aid Kiosk at Gondola Base</li>
              <li>• Contact SMHS / Bone & Joint Hospital</li>
              <li>• Oxygen support available at all TRC centers</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Dedicated Women & Solo Traveler Safety Panel */}
      <WomenSafetyPanel user={user} onOpenSOS={onOpenSOS} />
    </div>
  );
};
