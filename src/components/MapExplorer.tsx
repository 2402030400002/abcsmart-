import React, { useState, useEffect } from "react";
import {
  Hospital,
  Shield,
  Pill,
  CreditCard,
  Fuel,
  Info,
  Hotel,
  Utensils,
  MapPin,
  Phone,
  Clock,
  Navigation,
  Search,
  ExternalLink,
  Filter
} from "lucide-react";
import { SERVICE_FACILITIES_DATA, DESTINATIONS_DATA } from "../data/mockData";
import { ServiceFacility } from "../types";

export const MapExplorer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFacility, setSelectedFacility] = useState<ServiceFacility | null>(
    SERVICE_FACILITIES_DATA[0]
  );
  const [mapCenter, setMapCenter] = useState({ lat: 34.0837, lng: 74.7973 }); // Srinagar

  const categories = [
    { id: "All", label: "All Facilities", icon: Filter },
    { id: "Hospitals", label: "Hospitals", icon: Hospital },
    { id: "Police Stations", label: "Police", icon: Shield },
    { id: "Pharmacies", label: "Pharmacies", icon: Pill },
    { id: "ATMs", label: "ATMs", icon: CreditCard },
    { id: "Fuel Stations", label: "Fuel Stations", icon: Fuel },
    { id: "Tourist Information", label: "Tourist Info", icon: Info },
  ];

  const filteredFacilities = SERVICE_FACILITIES_DATA.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Hospitals": return Hospital;
      case "Police Stations": return Shield;
      case "Pharmacies": return Pill;
      case "ATMs": return CreditCard;
      case "Fuel Stations": return Fuel;
      case "Tourist Information": return Info;
      default: return MapPin;
    }
  };

  const handleSelectFacility = (fac: ServiceFacility) => {
    setSelectedFacility(fac);
    setMapCenter({ lat: fac.lat, lng: fac.lng });
  };

  return (
    <div className="space-y-6">
      {/* Search & Category Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hospitals, police, ATMs by name or district..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
            />
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Showing <strong>{filteredFacilities.length}</strong> verified tourist facilities in J&K
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((c) => {
            const Icon = c.icon;
            const isSelected = selectedCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer ${
                  isSelected
                    ? "bg-emerald-800 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-amber-300" : "text-slate-500"}`} />
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Interactive Map View + Facility List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Map Visualizer Column */}
        <div className="lg:col-span-7 bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden flex flex-col h-[520px]">
          {/* Map Controls Ribbon */}
          <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span className="font-bold">Interactive Geographic View</span>
              <span className="text-slate-400 text-[11px] hidden sm:inline">
                (Center: {mapCenter.lat.toFixed(3)}° N, {mapCenter.lng.toFixed(3)}° E)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-[11px] text-emerald-300 font-medium">GPS Telemetry Active</span>
            </div>
          </div>

          {/* Map Render Canvas / OpenStreetMap Tile Simulation */}
          <div className="relative flex-1 bg-slate-100 overflow-hidden flex items-center justify-center p-4">
            {/* Background topographic terrain mockup */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            {/* Embedded interactive map iframe with OSM coordinates */}
            <iframe
              title="Jammu and Kashmir OpenStreetMap"
              className="w-full h-full border-0 rounded-xl"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapCenter.lng - 0.25}%2C${mapCenter.lat - 0.15}%2C${mapCenter.lng + 0.25}%2C${mapCenter.lat + 0.15}&layer=mapnik&marker=${mapCenter.lat}%2C${mapCenter.lng}`}
            />

            {/* Floating selected item card over map */}
            {selectedFacility && (
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {selectedFacility.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      ~{selectedFacility.distanceKm} km from Center
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">{selectedFacility.name}</h4>
                  <p className="text-xs text-slate-600 line-clamp-1">{selectedFacility.address}</p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href={`tel:${selectedFacility.phone}`}
                    className="flex-1 sm:flex-initial px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedFacility.lat},${selectedFacility.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-initial px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <Navigation className="w-3.5 h-3.5 text-amber-400" />
                    <span>Navigate</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Facility Directory Column */}
        <div className="lg:col-span-5 space-y-3 max-h-[520px] overflow-y-auto pr-1">
          {filteredFacilities.map((facility) => {
            const Icon = getCategoryIcon(facility.category);
            const isSelected = selectedFacility?.id === facility.id;

            return (
              <div
                key={facility.id}
                onClick={() => handleSelectFacility(facility)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-emerald-50/80 border-emerald-500 shadow-md ring-1 ring-emerald-400"
                    : "bg-white border-slate-200 hover:border-emerald-300 hover:shadow-xs"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`p-2 rounded-lg ${
                        isSelected ? "bg-emerald-700 text-white" : "bg-slate-100 text-emerald-800"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {facility.name}
                      </h4>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {facility.district} • {facility.distanceKm} km away
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      facility.isOpen
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {facility.isOpen ? "Open 24x7" : "Closed"}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mb-3 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{facility.address}</span>
                </p>

                {facility.features && facility.features.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {facility.features.map((f, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-medium"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="text-slate-500 flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {facility.timings}
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${facility.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 hover:underline"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{facility.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredFacilities.length === 0 && (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
              <Info className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">No facilities matching your search.</p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="text-xs text-emerald-700 font-bold hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
