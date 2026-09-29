import React, { useState } from "react";
import {
  Search,
  Filter,
  MapPin,
  ShieldCheck,
  Calendar,
  Sparkles
} from "lucide-react";
import { DESTINATIONS_DATA } from "../data/mockData";
import { DestinationCard } from "./DestinationCard";
import { Destination } from "../types";

interface ExploreViewProps {
  onSelectDestination: (dest: Destination) => void;
  savedDestinations: string[];
  onToggleSaveDestination: (id: string) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  onSelectDestination,
  savedDestinations,
  onToggleSaveDestination,
}) => {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");

  const regions = ["All", "Kashmir Valley", "Jammu Division", "Ladakh Border Frontier"];
  const tags = ["All", "Lakes", "Snow", "Skiing", "Meadows", "Heritage", "Ponies", "Gardens", "Offbeat"];

  const filtered = DESTINATIONS_DATA.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.district.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = selectedRegion === "All" || d.region === selectedRegion;
    const matchesTag = selectedTag === "All" || d.tags.includes(selectedTag);
    return matchesSearch && matchesRegion && matchesTag;
  });

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-[#064E3B] rounded-3xl p-6 sm:p-8 text-white shadow-md border border-[#134E39]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FBBF24] text-xs font-bold mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Kashmir Valley & Mountain Districts</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal font-editorial tracking-tight text-white">
            Destinations Directory & Safety Ratings
          </h2>
          <p className="text-[#D1DBD5] text-xs sm:text-sm mt-2 font-normal">
            Detailed guides for every major tourist destination in Jammu & Kashmir with verified safety scores, emergency hospital contacts, local tips, and things to avoid.
          </p>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#E5EAE7] space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-[#4A5D52] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by destination name, district, or attraction..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#F9FBFA] border border-[#E5EAE7] rounded-xl text-xs text-[#1A2F23] focus:ring-2 focus:ring-[#064E3B] focus:bg-white"
            />
          </div>
          <div className="text-xs text-[#4A5D52] font-medium">
            Showing <strong className="text-[#1A2F23]">{filtered.length}</strong> verified tourist destinations
          </div>
        </div>

        {/* Region & Tag Pills */}
        <div className="space-y-2 pt-2 border-t border-[#E5EAE7]">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="font-bold text-[#4A5D52] whitespace-nowrap">Region:</span>
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRegion(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  selectedRegion === r
                    ? "bg-[#064E3B] text-white shadow-xs"
                    : "bg-[#F0F4F2] text-[#4A5D52] hover:bg-[#E5EAE7]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="font-bold text-[#4A5D52] whitespace-nowrap">Experience:</span>
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTag(t)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer whitespace-nowrap ${
                  selectedTag === t
                    ? "bg-[#064E3B] text-white"
                    : "bg-[#F0F4F2] text-[#4A5D52] hover:bg-[#E5EAE7]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((dest) => (
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
  );
};
