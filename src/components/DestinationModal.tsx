import React from "react";
import {
  X,
  MapPin,
  ShieldCheck,
  Calendar,
  Compass,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Phone,
  Hospital,
  Shield,
  Navigation,
  Sparkles
} from "lucide-react";
import { Destination } from "../types";

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  onPlanTripTo: (name: string) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  onPlanTripTo,
}) => {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1A2F23]/70 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#E5EAE7] flex flex-col my-auto">
        {/* Scenic Banner Header */}
        <div className="relative h-64 sm:h-80 shrink-0 bg-[#1A2F23]">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A2F23]/95 via-[#1A2F23]/40 to-transparent"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Destination Title Overlay */}
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#064E3B] text-white shadow-xs flex items-center gap-1 border border-[#134E39]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FBBF24]" />
                <span>Safety Rating: {destination.safetyScore}/100</span>
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/20">
                {destination.altitude}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-normal font-editorial tracking-tight flex items-center gap-2">
              <span>{destination.name}</span>
              {destination.kashmiriName && (
                <span className="font-editorial text-lg text-[#FBBF24]">({destination.kashmiriName})</span>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-[#D1DBD5] mt-1 italic">
              {destination.tagline}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Overview */}
          <div>
            <h3 className="text-sm font-bold text-[#1A2F23] uppercase tracking-wider mb-2">
              Destination Overview
            </h3>
            <p className="text-sm text-[#4A5D52] leading-relaxed">
              {destination.description}
            </p>
          </div>

          {/* Key Attractions */}
          <div>
            <h3 className="text-sm font-bold text-[#1A2F23] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D97706]" />
              <span>Must-Visit Attractions & Sights</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {destination.attractions.map((att, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-[#F9FBFA] border border-[#E5EAE7] text-xs font-medium text-[#1A2F23] flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#064E3B] shrink-0" />
                  <span>{att}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Safety & Local Precautions Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Things to Avoid */}
            <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] space-y-2">
              <h4 className="text-xs font-bold text-[#991B1B] uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-[#991B1B]" />
                <span>Things to Avoid & Scams</span>
              </h4>
              <ul className="space-y-2 text-xs text-[#7F1D1D]">
                {destination.thingsToAvoid.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#991B1B] font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Local Tips */}
            <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] space-y-2">
              <h4 className="text-xs font-bold text-[#064E3B] uppercase tracking-wider flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-[#064E3B]" />
                <span>Local Insider Advice</span>
              </h4>
              <ul className="space-y-2 text-xs text-[#064E3B]">
                {destination.localTips.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#064E3B] font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Estimated Budget Daily */}
          <div className="p-4 rounded-xl bg-[#F9FBFA] border border-[#E5EAE7]">
            <h4 className="text-xs font-bold text-[#1A2F23] uppercase tracking-wider mb-2">
              Average Daily Budget Per Person (Excluding Long Intercity Cabs)
            </h4>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-2.5 bg-white rounded-xl border border-[#E5EAE7]">
                <span className="text-[10px] text-[#4A5D52] font-bold uppercase block">Budget</span>
                <span className="font-mono text-sm font-bold text-[#1A2F23]">
                  ₹{destination.estimatedDailyBudget.budget.toLocaleString()}
                </span>
              </div>
              <div className="p-2.5 bg-[#F0FDF4] rounded-xl border border-[#DCFCE7]">
                <span className="text-[10px] text-[#064E3B] font-bold uppercase block">Comfort</span>
                <span className="font-mono text-sm font-bold text-[#064E3B]">
                  ₹{destination.estimatedDailyBudget.moderate.toLocaleString()}
                </span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-[#E5EAE7]">
                <span className="text-[10px] text-[#4A5D52] font-bold uppercase block">Luxury</span>
                <span className="font-mono text-sm font-bold text-[#1A2F23]">
                  ₹{destination.estimatedDailyBudget.luxury.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Nearby Emergency Network */}
          <div className="p-4 rounded-xl bg-[#1A2F23] text-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#FBBF24] uppercase tracking-wider">
                Emergency & Health Infrastructure
              </span>
              <span className="text-[11px] text-[#D1DBD5] font-mono">
                {destination.coordinates.lat.toFixed(4)}° N, {destination.coordinates.lng.toFixed(4)}° E
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 text-[#E5EAE7]">
                <Hospital className="w-4 h-4 text-[#F87171] shrink-0" />
                <span>{destination.nearbyHospitals[0]}</span>
              </div>
              <div className="flex items-center gap-2 text-[#E5EAE7]">
                <Shield className="w-4 h-4 text-[#34D399] shrink-0" />
                <span>{destination.nearestPoliceStation}</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                onClose();
                onPlanTripTo(destination.name);
              }}
              className="flex-1 py-3 px-4 bg-[#064E3B] hover:bg-[#085a44] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Create AI Itinerary for {destination.name}</span>
            </button>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${destination.coordinates.lat},${destination.coordinates.lng}`}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 bg-[#F0F4F2] hover:bg-[#E5EAE7] text-[#1A2F23] font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition"
            >
              <Navigation className="w-4 h-4 text-[#4A5D52]" />
              <span>Open in Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
