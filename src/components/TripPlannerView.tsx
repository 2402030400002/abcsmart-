import React, { useState } from "react";
import {
  Sparkles,
  Calendar,
  Users,
  MapPin,
  Compass,
  CheckCircle2,
  Bookmark,
  Share2,
  Clock,
  ShieldCheck,
  Hotel,
  Utensils,
  Car,
  ChevronRight,
  Download,
  Printer
} from "lucide-react";
import { generateTripPlan } from "../services/aiService";
import { saveItinerary, getSavedItineraries } from "../services/storageService";
import { GeneratedItinerary, ItineraryDay } from "../types";

export const TripPlannerView: React.FC = () => {
  const [startLocation, setStartLocation] = useState("Srinagar International Airport (SXR)");
  const [destination, setDestination] = useState("Kashmir Grand Circuit (Srinagar, Gulmarg, Pahalgam)");
  const [days, setDays] = useState(4);
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState("Moderate (₹4,500/day)");
  const [travelStyle, setTravelStyle] = useState("Family & Leisure");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([
    "Gulmarg Gondola",
    "Dal Lake Shikara",
    "Mughal Gardens",
    "Wazwan Dining"
  ]);

  const [loading, setLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedItinerary | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const activityOptions = [
    "Gulmarg Gondola",
    "Dal Lake Shikara",
    "Mughal Gardens",
    "Wazwan Dining",
    "Pahalgam Betaab Valley",
    "Sonamarg Thajiwas Glacier",
    "Doodhpathri Meadows",
    "Alpine Trekking & Camping",
    "Apple Orchard & Saffron Walk",
    "Old City Srinagar Heritage Walk"
  ];

  const handleToggleActivity = (act: string) => {
    setSelectedActivities((prev) =>
      prev.includes(act) ? prev.filter((a) => a !== act) : [...prev, act]
    );
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await generateTripPlan({
        startLocation,
        destination,
        days,
        travelers,
        budget,
        travelStyle,
        activities: selectedActivities
      });

      const newItinerary: GeneratedItinerary = {
        id: `plan-${Date.now()}`,
        title: `${days}-Day ${travelStyle} in ${destination.split("(")[0]}`,
        destination,
        days,
        travelers,
        budget,
        travelStyle,
        estimatedTotalCost: res.estimatedCost,
        createdAt: new Date().toLocaleDateString(),
        daysPlan: res.plan || [
          {
            day: 1,
            title: "Arrival in Srinagar & Sunset Shikara on Dal Lake",
            location: "Srinagar",
            activities: [
              "Airport reception & prepaid cab transfer to lakeside stay",
              "Visit historic Nishat & Shalimar Mughal Gardens",
              "Private 1-hour sunset Shikara ride across Dal Lake to Char Chinar",
              "Traditional 7-course Kashmiri Wazwan feast"
            ],
            safetyTips: "Prepaid taxi slips only at Airport TRC counter. Keep postpaid SIM active.",
            stay: "Nigeen Lake Luxury Heritage Houseboat",
            food: "Ahdoos Restaurant (Boulevard)",
            transport: "Tourist Union Sedan Cab"
          },
          {
            day: 2,
            title: "Snow-Capped Peaks & Gondola in Gulmarg",
            location: "Gulmarg",
            activities: [
              "Scenic morning drive through Tangmarg pine groves",
              "Gulmarg Gondola Phase 1 & 2 Ascent to Apharwat Peak (12,293 ft)",
              "Snow sledging, alpine meadow walk, and historic St. Mary's Church",
              "Hot Kashmiri saffron Kahwa with roasted almonds at Highland Park"
            ],
            safetyTips: "Book Gondola exclusively via official portal. Wear insulated snow boots.",
            stay: "Pine Palace Resort or Gulmarg Meadow Inn",
            food: "Highland Park Restaurant",
            transport: "4x4 Snow Chain Cab from Tangmarg"
          },
          {
            day: 3,
            title: "Valley of Shepherds: Betaab & Aru Valleys in Pahalgam",
            location: "Pahalgam",
            activities: [
              "Drive along the turquoise Lidder River with stop at Pampore saffron fields",
              "Explore iconic Betaab Valley and scenic pine meadows of Aru Valley",
              "Riverside trout fishing stroll and local walnut woodcraft browsing"
            ],
            safetyTips: "Use official Prepaid Pony Counter at Pahalgam Tourist Club.",
            stay: "Lidder Riverside Chalet",
            food: "Trout Beat Pahalgam",
            transport: "Tourist Union Registered Taxi"
          },
          {
            day: 4,
            title: "Old City Heritage Walk & Departure",
            location: "Srinagar",
            activities: [
              "Visit historic Jamia Masjid & Shah-e-Hamdan wooden architecture",
              "Authentic GI-certified Pashmina & Saffron souvenir shopping",
              "Departure transfer to Srinagar International Airport with memories"
            ],
            safetyTips: "Reach Srinagar Airport at least 2.5 hours prior to domestic departure.",
            stay: "Departure",
            food: "Mughal Darbar Srinagar",
            transport: "Prepaid Airport Cab"
          }
        ].slice(0, days)
      };

      setGeneratedPlan(newItinerary);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToOffline = () => {
    if (generatedPlan) {
      saveItinerary(generatedPlan);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-[#064E3B] rounded-3xl p-6 sm:p-8 text-white shadow-md border border-[#134E39]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FBBF24] text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Powered Smart Travel Planner</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal font-editorial tracking-tight text-white">
            Custom Kashmir Itinerary & Safety Planner
          </h2>
          <p className="text-[#D1DBD5] text-xs sm:text-sm mt-2 font-normal">
            Generate customized, weather-aware, scam-free travel itineraries tailored for families, couples, and adventurers with realistic travel times and official pricing.
          </p>
        </div>
      </div>

      {/* Input Parameters Form */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-[#E5EAE7]">
        <form onSubmit={handleGenerate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Start Location */}
            <div>
              <label className="text-xs font-bold text-[#1A2F23] block mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#064E3B]" /> Start Location
              </label>
              <select
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F9FBFA] border border-[#E5EAE7] rounded-xl text-xs text-[#1A2F23] font-medium focus:ring-2 focus:ring-[#064E3B]"
              >
                <option value="Srinagar International Airport (SXR)">Srinagar Airport (SXR)</option>
                <option value="TRC Tourist Reception Centre Srinagar">TRC Tourist Reception Centre Srinagar</option>
                <option value="Jammu Tawi Railway Station">Jammu Tawi Railway Station</option>
                <option value="Katra / Vaishno Devi Base">Katra / Vaishno Devi</option>
              </select>
            </div>

            {/* Destination Focus */}
            <div>
              <label className="text-xs font-bold text-[#1A2F23] block mb-1.5 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#064E3B]" /> Destination Circuit
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F9FBFA] border border-[#E5EAE7] rounded-xl text-xs text-[#1A2F23] font-medium focus:ring-2 focus:ring-[#064E3B]"
              >
                <option value="Kashmir Grand Circuit (Srinagar, Gulmarg, Pahalgam)">
                  Grand Circuit (Srinagar + Gulmarg + Pahalgam)
                </option>
                <option value="Alpine Wonderland (Gulmarg & Sonamarg)">
                  Alpine Wonderland (Gulmarg + Sonamarg)
                </option>
                <option value="Meadow Escapes (Pahalgam & Doodhpathri)">
                  Meadow Escapes (Pahalgam + Doodhpathri)
                </option>
                <option value="Offbeat Frontier (Gurez Valley & Yusmarg)">
                  Offbeat Frontier (Gurez Valley + Yusmarg)
                </option>
                <option value="Romantic Houseboat & Lakes Experience">
                  Srinagar Lake Stays & Gardens
                </option>
              </select>
            </div>

            {/* Travel Style */}
            <div>
              <label className="text-xs font-bold text-[#1A2F23] block mb-1.5 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#064E3B]" /> Travel Persona
              </label>
              <select
                value={travelStyle}
                onChange={(e) => setTravelStyle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F9FBFA] border border-[#E5EAE7] rounded-xl text-xs text-[#1A2F23] font-medium focus:ring-2 focus:ring-[#064E3B]"
              >
                <option value="Family & Leisure">Family with Children / Seniors</option>
                <option value="Honeymoon & Romantic">Honeymoon & Romantic Couples</option>
                <option value="Adventure & Trekking">Adventure, Skiing & Trekking</option>
                <option value="Solo & Photography">Solo Traveler / Photography Enthusiast</option>
                <option value="Budget Backpacker">Budget Backpacker</option>
              </select>
            </div>
          </div>

          {/* Sliders for Days and Travelers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold text-[#1A2F23]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#064E3B]" /> Duration:
                </span>
                <span className="font-mono text-[#064E3B] bg-[#F0F4F2] px-2 py-0.5 rounded font-bold">
                  {days} Days / {days - 1} Nights
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={8}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full accent-[#064E3B] h-2 bg-[#E5EAE7] rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold text-[#1A2F23]">
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#064E3B]" /> Group Size:
                </span>
                <span className="font-mono text-[#064E3B] bg-[#F0F4F2] px-2 py-0.5 rounded font-bold">
                  {travelers} {travelers === 1 ? "Traveler" : "Travelers"}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={12}
                value={travelers}
                onChange={(e) => setTravelers(Number(e.target.value))}
                className="w-full accent-[#064E3B] h-2 bg-[#E5EAE7] rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Activity Pills Toggle */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-[#1A2F23] block">
              Include Specific Attractions & Experiences:
            </label>
            <div className="flex flex-wrap gap-2">
              {activityOptions.map((act) => {
                const isSelected = selectedActivities.includes(act);
                return (
                  <button
                    key={act}
                    type="button"
                    onClick={() => handleToggleActivity(act)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-[#064E3B] text-white shadow-xs"
                        : "bg-[#F0F4F2] text-[#4A5D52] hover:bg-[#E5EAE7]"
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#FBBF24]" />}
                    <span>{act}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-[#064E3B] hover:bg-[#043d2e] text-white font-bold text-xs shadow-xs transition cursor-pointer flex items-center justify-center gap-2 border border-[#134E39]"
            >
              <Sparkles className="w-4 h-4 text-[#FBBF24]" />
              <span>{loading ? "Generating Smart Kashmir Itinerary..." : "Generate AI Kashmir Itinerary"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Generated Itinerary Display */}
      {generatedPlan && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-[#E5EAE7] space-y-6">
          {/* Plan Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#E5EAE7]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F0FDF4] text-[#064E3B] border border-[#DCFCE7]">
                  {generatedPlan.travelStyle}
                </span>
                <span className="text-xs text-[#4A5D52]">
                  {generatedPlan.days} Days • {generatedPlan.travelers} Travelers
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-normal font-editorial text-[#1A2F23]">
                {generatedPlan.title}
              </h3>
              <p className="text-xs text-[#064E3B] font-semibold mt-1">
                Estimated Fair Budget: {generatedPlan.estimatedTotalCost}
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleSaveToOffline}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#F0F4F2] hover:bg-[#E5EAE7] text-[#064E3B] font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer border border-[#E5EAE7]"
              >
                <Bookmark className="w-4 h-4" />
                <span>{savedSuccess ? "Saved Offline!" : "Save Offline"}</span>
              </button>
              <button
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl bg-[#F0F4F2] hover:bg-[#E5EAE7] text-[#1A2F23] font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer border border-[#E5EAE7]"
              >
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </button>
            </div>
          </div>

          {/* Day by Day Cards */}
          <div className="space-y-4">
            {generatedPlan.daysPlan.map((day) => (
              <div
                key={day.day}
                className="p-5 sm:p-6 rounded-xl bg-[#F9FBFA] border border-[#E5EAE7] hover:border-[#CBD5D0] transition space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#064E3B] text-white font-bold flex items-center justify-center text-xs shadow-xs shrink-0">
                      Day {day.day}
                    </div>
                    <div>
                      <h4 className="text-base font-normal font-editorial text-[#1A2F23]">
                        {day.title}
                      </h4>
                      <span className="text-xs text-[#064E3B] font-semibold flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {day.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Activities List */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold text-[#4A5D52] uppercase tracking-wider block">
                    Planned Sights & Experiences:
                  </span>
                  <ul className="space-y-1 text-xs text-[#1A2F23]">
                    {day.activities.map((act, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#064E3B] shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Safety Tips Ribbon */}
                {day.safetyTips && (
                  <div className="p-3 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <div>
                      <strong>Safety Protocol:</strong> {day.safetyTips}
                    </div>
                  </div>
                )}

                {/* Stay, Food, Transport */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-xs border-t border-[#E5EAE7]">
                  {day.stay && (
                    <div className="flex items-center gap-1.5 text-[#4A5D52]">
                      <Hotel className="w-3.5 h-3.5 text-[#064E3B] shrink-0" />
                      <span className="truncate"><strong>Stay:</strong> {day.stay}</span>
                    </div>
                  )}
                  {day.food && (
                    <div className="flex items-center gap-1.5 text-[#4A5D52]">
                      <Utensils className="w-3.5 h-3.5 text-[#064E3B] shrink-0" />
                      <span className="truncate"><strong>Dining:</strong> {day.food}</span>
                    </div>
                  )}
                  {day.transport && (
                    <div className="flex items-center gap-1.5 text-[#4A5D52]">
                      <Car className="w-3.5 h-3.5 text-[#064E3B] shrink-0" />
                      <span className="truncate"><strong>Transport:</strong> {day.transport}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
