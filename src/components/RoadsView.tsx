import React, { useState } from "react";
import {
  Route,
  CloudSun,
  Thermometer,
  Wind,
  Droplets,
  AlertTriangle,
  RefreshCw,
  Search,
  CheckCircle2
} from "lucide-react";
import { ROAD_STATUS_DATA, WEATHER_DATA } from "../data/mockData";
import { RoadStatusCard } from "./RoadStatusCard";

export const RoadsView: React.FC = () => {
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const filteredRoads = ROAD_STATUS_DATA.filter((r) => {
    const matchesFilter = filter === "ALL" || r.status === filter;
    const matchesSearch =
      r.route.toLowerCase().includes(search.toLowerCase()) ||
      r.from.toLowerCase().includes(search.toLowerCase()) ||
      r.to.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-[#064E3B] rounded-3xl p-6 sm:p-8 text-white shadow-md border border-[#134E39]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FBBF24] text-xs font-bold mb-3">
            <Route className="w-3.5 h-3.5" />
            <span>Traffic Control Unit & Border Roads Organization (BRO)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal font-editorial tracking-tight text-white">
            Highway & Mountain Pass Real-Time Telemetry
          </h2>
          <p className="text-[#D1DBD5] text-xs sm:text-sm mt-2 font-normal">
            Live updates on NH-44 Jammu-Srinagar National Highway, Zojila Pass to Ladakh, Mughal Road, Sinthan Pass, and local tourist corridors.
          </p>
        </div>
      </div>

      {/* Live Weather Forecast Cards Row */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#1A2F23] flex items-center gap-2">
            <CloudSun className="w-4 h-4 text-[#D97706]" />
            <span>Current Valley Weather & Road Surface Advisories</span>
          </h3>
          <span className="text-xs text-[#4A5D52]">Updated hourly</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WEATHER_DATA.map((w) => (
            <div
              key={w.location}
              className="bg-white rounded-2xl p-5 shadow-xs border border-[#E5EAE7] space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-[#1A2F23] text-sm">{w.location}</h4>
                  <span className="text-xs text-[#4A5D52]">{w.condition}</span>
                </div>
                <div className="font-bold text-xl text-[#064E3B]">{w.temperature}</div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-[#4A5D52] pt-2 border-t border-[#E5EAE7]">
                <div className="flex items-center gap-1">
                  <Wind className="w-3.5 h-3.5 text-[#064E3B]" />
                  <span>{w.wind}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-[#064E3B]" />
                  <span>Rain: {w.rainProbability}</span>
                </div>
              </div>

              <p className="text-[11px] text-[#4A5D52] font-normal bg-[#F9FBFA] p-2.5 rounded-xl border border-[#E5EAE7]">
                {w.advisory}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#E5EAE7] space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex items-center gap-2">
            {["ALL", "OPEN", "CAUTION", "CLOSED"].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  filter === s
                    ? "bg-[#064E3B] text-white shadow-xs"
                    : "bg-[#F0F4F2] text-[#4A5D52] hover:bg-[#E5EAE7]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#4A5D52] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search highway or pass name..."
              className="w-full pl-10 pr-4 py-2 bg-[#F9FBFA] border border-[#E5EAE7] rounded-xl text-xs text-[#1A2F23] focus:ring-2 focus:ring-[#064E3B] focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Road Status Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRoads.map((road) => (
          <RoadStatusCard key={road.id} item={road} />
        ))}
      </div>
    </div>
  );
};
