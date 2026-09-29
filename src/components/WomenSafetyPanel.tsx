import React from "react";
import {
  ShieldAlert,
  PhoneCall,
  Lock,
  HeartHandshake,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Car,
  Hotel
} from "lucide-react";
import { UserProfile } from "../types";

interface WomenSafetyPanelProps {
  user: UserProfile | null;
  onOpenSOS: () => void;
}

export const WomenSafetyPanel: React.FC<WomenSafetyPanelProps> = ({ user, onOpenSOS }) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#064E3B] rounded-3xl p-6 sm:p-8 text-white shadow-md border border-[#134E39]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FBBF24] text-xs font-bold mb-3">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Dedicated Women & Solo Traveler Safety Desk</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal font-editorial tracking-tight text-white">
            Women & Solo Traveler Safety Guide (J&K)
          </h2>
          <p className="text-[#D1DBD5] text-sm mt-2 leading-relaxed">
            Jammu & Kashmir is known for its warm hospitality, with thousands of solo female travelers visiting every year. Follow these state-verified protocols for added peace of mind.
          </p>
        </div>
      </div>

      {/* Emergency Hotlines Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <a
          href="tel:181"
          className="p-5 bg-white text-[#1A2F23] rounded-2xl shadow-xs hover:border-[#991B1B] border border-[#E5EAE7] transition flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-[#991B1B]">24x7 Women Helpline</span>
            <PhoneCall className="w-5 h-5 text-[#991B1B] group-hover:scale-110 transition" />
          </div>
          <div className="my-3">
            <div className="text-3xl font-bold font-mono text-[#991B1B]">181</div>
            <div className="text-xs text-[#4A5D52] mt-0.5">Direct J&K State Women Cell</div>
          </div>
          <span className="text-[11px] font-bold text-[#991B1B] group-hover:underline">Tap to Call Instantly →</span>
        </a>

        <a
          href="tel:112"
          className="p-5 bg-white text-[#1A2F23] rounded-2xl shadow-xs hover:border-[#064E3B] border border-[#E5EAE7] transition flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-[#064E3B]">Police Emergency</span>
            <PhoneCall className="w-5 h-5 text-[#064E3B] group-hover:scale-110 transition" />
          </div>
          <div className="my-3">
            <div className="text-3xl font-bold font-mono text-[#064E3B]">112</div>
            <div className="text-xs text-[#4A5D52] mt-0.5">Quick Response PCR Srinagar/Jammu</div>
          </div>
          <span className="text-[11px] font-bold text-[#064E3B] group-hover:underline">Tap to Dial Police →</span>
        </a>

        <a
          href="tel:+911942455512"
          className="p-5 bg-white text-[#1A2F23] rounded-2xl shadow-xs hover:border-[#D97706] border border-[#E5EAE7] transition flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-[#D97706]">Tourist Police</span>
            <PhoneCall className="w-5 h-5 text-[#D97706] group-hover:scale-110 transition" />
          </div>
          <div className="my-3">
            <div className="text-lg font-bold font-mono text-[#1A2F23]">0194-2455512</div>
            <div className="text-xs text-[#4A5D52] mt-0.5">TRC Srinagar Tourist Police Desk</div>
          </div>
          <span className="text-[11px] font-bold text-[#D97706] group-hover:underline">Tourist Assistance →</span>
        </a>
      </div>

      {/* Safety Protocols Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cab & Commute Safety */}
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#E5EAE7] space-y-4">
          <h3 className="text-sm font-bold text-[#1A2F23] flex items-center gap-2">
            <Car className="w-4 h-4 text-[#064E3B]" />
            <span>Transport & Taxi Safety Recommendations</span>
          </h3>
          <ul className="space-y-3 text-xs text-[#4A5D52]">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#064E3B] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#1A2F23]">Prepaid Union Cabs:</strong> Always book airport and inter-district taxis at registered TRC (Tourist Reception Centre) or airport prepaid counters. Take a photo of the vehicle number plate.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#064E3B] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#1A2F23]">Live Location Sharing:</strong> Share your live WhatsApp or Google Maps tracking with a family member before starting mountain passes (like Tangmarg or Betaab Valley).
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#064E3B] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#1A2F23]">Daylight Travel:</strong> Plan long road journeys (Srinagar to Gulmarg, Pahalgam, or Sonamarg) to conclude before 6:30 PM, especially in winter.
              </span>
            </li>
          </ul>
        </div>

        {/* Accommodation & Local Etiquette */}
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#E5EAE7] space-y-4">
          <h3 className="text-sm font-bold text-[#1A2F23] flex items-center gap-2">
            <Hotel className="w-4 h-4 text-[#064E3B]" />
            <span>Stays & Cultural Etiquette</span>
          </h3>
          <ul className="space-y-3 text-xs text-[#4A5D52]">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#064E3B] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#1A2F23]">Verified Houseboats:</strong> In Dal Lake and Nigeen Lake, choose houseboats registered with J&K Tourism Department. Ask for the owner’s TRC license number.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#064E3B] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#1A2F23]">Religious Shrine Modesty:</strong> At Hazratbal Shrine, Jamia Masjid, and Shankaracharya Temple, carry a scarf to cover your head and wear modest clothing covering knees and shoulders.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#064E3B] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#1A2F23]">Licensed Mountain Guides:</strong> When hiring trekking guides or pony handlers at Pahalgam/Gulmarg, verify their J&K Tourism registered identity badge.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
