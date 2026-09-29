import React from "react";
import {
  ShieldAlert,
  PhoneCall,
  MapPin,
  ExternalLink,
  Lock,
  Compass,
  FileText,
  AlertTriangle
} from "lucide-react";

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenSOS: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSOS }) => {
  return (
    <footer className="bg-[#0A2E23] text-[#CBD5D0] border-t border-[#134E39] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#064E3B] border border-[#1B5E48] flex items-center justify-center text-white shadow-sm">
                <ShieldAlert className="w-5.5 h-5.5 text-[#FBBF24]" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white font-editorial">
                Smart<span className="text-[#FBBF24]">Safar</span>
              </span>
            </div>
            <p className="text-xs text-[#9BB3A6] leading-relaxed">
              Official smart tourist safety, live alpine highway telemetry, certified vendor verification, and emergency response for travelers visiting Jammu & Kashmir.
            </p>
            <div className="pt-2">
              <button
                id="footer-sos-btn"
                onClick={onOpenSOS}
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition cursor-pointer border border-red-700"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Launch Emergency Protocol</span>
              </button>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#FBBF24]" />
              <span>Explore Platform</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-[#9BB3A6]">
              <li>
                <button
                  onClick={() => onNavigate("explore")}
                  className="hover:text-white transition cursor-pointer hover:translate-x-1 duration-150 inline-block text-left"
                >
                  Destination Directory & Altitude Maps
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("planner")}
                  className="hover:text-white transition cursor-pointer hover:translate-x-1 duration-150 inline-block text-left"
                >
                  AI Custom Itinerary Planner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("roads")}
                  className="hover:text-white transition cursor-pointer hover:translate-x-1 duration-150 inline-block text-left"
                >
                  Live Highway & Pass Status (NH-44 / Zojila)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("budget")}
                  className="hover:text-white transition cursor-pointer hover:translate-x-1 duration-150 inline-block text-left"
                >
                  Fair Price & Budget Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("scams")}
                  className="hover:text-white transition cursor-pointer hover:translate-x-1 duration-150 inline-block text-left"
                >
                  Scam Awareness & GI Authenticity Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("treks")}
                  className="hover:text-white transition cursor-pointer hover:translate-x-1 duration-150 inline-block text-left"
                >
                  Himalayan Trekking & Altitude Safety
                </button>
              </li>
            </ul>
          </div>

          {/* Official Helplines & Safety */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#FBBF24]" />
              <span>Official Helplines (J&K)</span>
            </h3>
            <ul className="space-y-2 text-xs text-[#9BB3A6]">
              <li className="flex justify-between items-center py-1 border-b border-[#134E39]">
                <span>Unified Emergency</span>
                <span className="font-mono text-[#FBBF24] font-bold">112</span>
              </li>
              <li className="flex justify-between items-center py-1 border-b border-[#134E39]">
                <span>Tourist Police Srinagar</span>
                <span className="font-mono text-emerald-300 font-bold">0194-2455512</span>
              </li>
              <li className="flex justify-between items-center py-1 border-b border-[#134E39]">
                <span>Women Safety Helpline</span>
                <span className="font-mono text-[#FBBF24] font-bold">181</span>
              </li>
              <li className="flex justify-between items-center py-1 border-b border-[#134E39]">
                <span>Ambulance Network</span>
                <span className="font-mono text-emerald-300 font-bold">108</span>
              </li>
              <li className="flex justify-between items-center py-1 border-b border-[#134E39]">
                <span>SMHS Hospital Emergency</span>
                <span className="font-mono text-emerald-300 font-bold">0194-2504114</span>
              </li>
            </ul>
          </div>

          {/* Legal & Safety Disclaimer */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#FBBF24]" />
              <span>Safety Advisory</span>
            </h3>
            <div className="p-3.5 rounded-xl bg-[#072018] border border-[#134E39] text-[11px] text-[#9BB3A6] space-y-2">
              <p>
                <strong>Advisory Note:</strong> Road closures and weather alerts are sourced from traffic police bulletins. For remote mountain passes, verify conditions at local checkpoints.
              </p>
              <div className="flex items-center gap-1.5 text-emerald-300 pt-1 font-semibold">
                <Lock className="w-3.5 h-3.5" />
                <span>Encrypted Local Storage Persistence</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 mt-6 border-t border-[#134E39] flex flex-col sm:flex-row items-center justify-between text-xs text-[#9BB3A6] gap-4">
          <div>
            © 2026 SmartSafar. Built for travelers exploring Jammu & Kashmir.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate("safety")} className="hover:text-white transition cursor-pointer">
              Safety Charter
            </button>
            <button onClick={() => onNavigate("translator")} className="hover:text-white transition cursor-pointer">
              Language Center
            </button>
            <button onClick={() => onNavigate("community")} className="hover:text-white transition cursor-pointer">
              Incident Reporting
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
