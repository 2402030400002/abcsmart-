import React, { useState } from "react";
import {
  MapPin,
  ShieldCheck,
  Compass,
  Calendar,
  IndianRupee,
  ChevronRight,
  Heart,
  Info,
  CheckCircle2,
  AlertTriangle,
  Hospital,
  Shield
} from "lucide-react";
import { Destination } from "../types";

interface DestinationCardProps {
  destination: Destination;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelect: (destination: Destination) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  isSaved,
  onToggleSave,
  onSelect,
}) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#E5EAE7] shadow-xs hover:shadow-md hover:border-[#CBD5D0] transition-all duration-300 flex flex-col">
      {/* Scenic Photo Container */}
      <div className="relative h-52 sm:h-60 overflow-hidden bg-slate-900">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A2F23]/90 via-[#1A2F23]/25 to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#064E3B] text-white backdrop-blur-md border border-[#134E39] flex items-center gap-1 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FBBF24]" />
            <span>Safety: {destination.safetyScore}/100</span>
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(destination.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition cursor-pointer ${
              isSaved
                ? "bg-[#DC2626] text-white shadow-md"
                : "bg-black/40 text-white hover:bg-black/60"
            }`}
            title={isSaved ? "Remove from saved trips" : "Save destination"}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? "fill-white" : ""}`} />
          </button>
        </div>

        {/* Bottom Image Info */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <div className="flex items-center gap-1.5 text-xs text-[#FBBF24] font-medium">
            <MapPin className="w-3.5 h-3.5" />
            <span>{destination.district}, {destination.region}</span>
            {destination.distanceFromSrinagarKm > 0 && (
              <span>• {destination.distanceFromSrinagarKm} km from Srinagar</span>
            )}
          </div>
          <h3 className="text-xl font-normal font-editorial tracking-tight mt-0.5 flex items-center gap-2">
            <span>{destination.name}</span>
            {destination.kashmiriName && (
              <span className="font-normal text-sm opacity-80 font-serif">
                ({destination.kashmiriName})
              </span>
            )}
          </h3>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <p className="text-xs font-semibold text-[#064E3B] italic mb-1.5">
            "{destination.tagline}"
          </p>
          <p className="text-xs text-[#4A5D52] line-clamp-2 leading-relaxed font-normal">
            {destination.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {destination.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#F0F4F2] text-[#4A5D52]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Highlights Info Grid */}
        <div className="pt-3 border-t border-[#E5EAE7] grid grid-cols-2 gap-2 text-[11px] text-[#4A5D52]">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#064E3B] shrink-0" />
            <span className="truncate">{destination.bestTime.split("(")[0]}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#064E3B] shrink-0" />
            <span className="truncate">{destination.altitude}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onSelect(destination)}
          className="w-full py-2.5 px-4 rounded-xl bg-[#064E3B] hover:bg-[#043d2e] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer border border-[#134E39]"
        >
          <span>Explore Safety & Guide</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#FBBF24]" />
        </button>
      </div>
    </div>
  );
};
