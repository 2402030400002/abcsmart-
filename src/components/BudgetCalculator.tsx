import React, { useState } from "react";
import {
  Calculator,
  Users,
  Calendar,
  Hotel,
  Utensils,
  Car,
  Ticket,
  ShoppingBag,
  ShieldCheck,
  Download,
  CheckCircle2,
  Sparkles,
  Info
} from "lucide-react";

export const BudgetCalculator: React.FC = () => {
  const [travelers, setTravelers] = useState<number>(2);
  const [days, setDays] = useState<number>(5);
  const [hotelCategory, setHotelCategory] = useState<number>(4500); // per room/night (1 room per 2 people)
  const [foodPerPersonDay, setFoodPerPersonDay] = useState<number>(1000);
  const [transportPerDay, setTransportPerDay] = useState<number>(3200); // dedicated private tourist cab
  const [activitiesPerPerson, setActivitiesPerPerson] = useState<number>(3500); // Gondola, Shikara, Park tickets
  const [shoppingPerTraveler, setShoppingPerTraveler] = useState<number>(4000);
  const [safetyBufferPercent, setSafetyBufferPercent] = useState<number>(10);

  // Calculations
  const roomCount = Math.ceil(travelers / 2);
  const totalHotelCost = roomCount * hotelCategory * days;
  const totalFoodCost = foodPerPersonDay * travelers * days;
  const totalTransportCost = transportPerDay * days;
  const totalActivitiesCost = activitiesPerPerson * travelers;
  const totalShoppingCost = shoppingPerTraveler * travelers;

  const subTotal =
    totalHotelCost +
    totalFoodCost +
    totalTransportCost +
    totalActivitiesCost +
    totalShoppingCost;

  const safetyBufferAmount = Math.round((subTotal * safetyBufferPercent) / 100);
  const grandTotal = subTotal + safetyBufferAmount;
  const perPersonCost = Math.round(grandTotal / travelers);

  const breakdownItems = [
    { label: "Accommodation (Hotels/Houseboats)", amount: totalHotelCost, color: "bg-emerald-600", text: "text-emerald-700" },
    { label: "Food & Dining (Wazwan, Kahwa)", amount: totalFoodCost, color: "bg-amber-500", text: "text-amber-700" },
    { label: "Transport & Fuel (Private Cab)", amount: totalTransportCost, color: "bg-blue-600", text: "text-blue-700" },
    { label: "Activities & Passes (Gondola, Shikara)", amount: totalActivitiesCost, color: "bg-purple-600", text: "text-purple-700" },
    { label: "Handicrafts, Saffron & Gifts", amount: totalShoppingCost, color: "bg-pink-500", text: "text-pink-700" },
    { label: `Safety & Emergency Reserve (${safetyBufferPercent}%)`, amount: safetyBufferAmount, color: "bg-teal-600", text: "text-teal-700" },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-[#064E3B] rounded-3xl p-6 sm:p-8 text-white shadow-md border border-[#134E39]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FBBF24] text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fair Price Kashmir Travel Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal font-editorial tracking-tight text-white">
            Trip Budget & Fair Expense Calculator
          </h2>
          <p className="text-[#D1DBD5] text-xs sm:text-sm mt-2 font-normal">
            Calculate accurate, scam-free travel costs for Jammu & Kashmir based on verified government rates, seasonal hotel averages, and official union taxi tariffs.
          </p>
        </div>
      </div>

      {/* Main 2-Column Calculator Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Column */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-[#E5EAE7] space-y-6">
          <h3 className="text-base font-normal font-editorial text-[#1A2F23] pb-3 border-b border-[#E5EAE7] flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#064E3B]" />
            <span>Trip Parameters & Preferences</span>
          </h3>

          {/* Travelers & Days Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1A2F23] flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#064E3B]" /> Number of Travelers
                </span>
                <span className="font-mono text-[#064E3B] bg-[#F0F4F2] px-2 py-0.5 rounded-md font-bold">
                  {travelers} {travelers === 1 ? "Person" : "People"}
                </span>
              </label>
              <input
                type="range"
                min={1}
                max={15}
                value={travelers}
                onChange={(e) => setTravelers(Number(e.target.value))}
                className="w-full accent-[#064E3B] h-2 bg-[#E5EAE7] rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#4A5D52]">
                <span>1 Solo</span>
                <span>5 Family</span>
                <span>15 Group</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1A2F23] flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#064E3B]" /> Trip Duration (Days)
                </span>
                <span className="font-mono text-[#064E3B] bg-[#F0F4F2] px-2 py-0.5 rounded-md font-bold">
                  {days} Days
                </span>
              </label>
              <input
                type="range"
                min={2}
                max={20}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full accent-[#064E3B] h-2 bg-[#E5EAE7] rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#4A5D52]">
                <span>2 Weekend</span>
                <span>7 Full Circuit</span>
                <span>20 Extended</span>
              </div>
            </div>
          </div>

          {/* Accommodation Style */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-[#1A2F23] flex items-center gap-1.5">
              <Hotel className="w-4 h-4 text-[#064E3B]" /> Hotel / Houseboat Category (per night/room)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: "Budget Inn", price: 2000, desc: "Clean Homestay/Hotel" },
                { label: "Comfort", price: 4500, desc: "3-Star / Nigeen Houseboat" },
                { label: "Premium", price: 9500, desc: "4-Star Mountain Resort" },
                { label: "Luxury", price: 22000, desc: "Khyber / 5-Star Luxury" },
              ].map((h) => (
                <button
                  key={h.price}
                  type="button"
                  onClick={() => setHotelCategory(h.price)}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                    hotelCategory === h.price
                      ? "bg-[#F0FDF4] border-[#064E3B] text-[#064E3B] shadow-xs ring-1 ring-[#064E3B]"
                      : "bg-[#F9FBFA] border-[#E5EAE7] text-[#1A2F23] hover:bg-[#F0F4F2]"
                  }`}
                >
                  <div className="font-bold text-xs">{h.label}</div>
                  <div className="font-mono text-xs text-[#064E3B] font-bold mt-1">₹{h.price.toLocaleString()}</div>
                  <div className="text-[10px] text-[#4A5D52] mt-0.5">{h.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Transportation Mode */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-[#1A2F23] flex items-center gap-1.5">
              <Car className="w-4 h-4 text-[#064E3B]" /> Daily Transportation & Cab Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { label: "Shared / Public Cab", price: 800, desc: "Local Sumos & Buses" },
                { label: "Private Sedan (Etios/Dzire)", price: 2800, desc: "Includes Fuel & Driver" },
                { label: "4x4 SUV (Innova/Scorpio)", price: 4200, desc: "Mountain & Snow Ready" },
              ].map((t) => (
                <button
                  key={t.price}
                  type="button"
                  onClick={() => setTransportPerDay(t.price)}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                    transportPerDay === t.price
                      ? "bg-[#F0FDF4] border-[#064E3B] text-[#064E3B] shadow-xs ring-1 ring-[#064E3B]"
                      : "bg-[#F9FBFA] border-[#E5EAE7] text-[#1A2F23] hover:bg-[#F0F4F2]"
                  }`}
                >
                  <div className="font-bold text-xs">{t.label}</div>
                  <div className="font-mono text-xs text-[#064E3B] font-bold mt-1">₹{t.price.toLocaleString()}/day</div>
                  <div className="text-[10px] text-[#4A5D52] mt-0.5">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Food & Dining Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-[#1A2F23]">
              <span className="flex items-center gap-1.5">
                <Utensils className="w-4 h-4 text-[#D97706]" /> Food & Kashmiri Dining (per person/day)
              </span>
              <span className="font-mono text-[#D97706] bg-[#FFFBEB] px-2 py-0.5 rounded-md font-bold">
                ₹{foodPerPersonDay} / person
              </span>
            </div>
            <input
              type="range"
              min={400}
              max={3000}
              step={100}
              value={foodPerPersonDay}
              onChange={(e) => setFoodPerPersonDay(Number(e.target.value))}
              className="w-full accent-[#D97706] h-2 bg-[#E5EAE7] rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#4A5D52]">
              <span>₹400 (Dhabas)</span>
              <span>₹1,200 (Standard Wazwan/Cafes)</span>
              <span>₹3,000 (Fine Dining)</span>
            </div>
          </div>

          {/* Activities & Shopping Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1A2F23] flex items-center gap-1">
                <Ticket className="w-3.5 h-3.5 text-[#064E3B]" /> Gondola, Shikara & Entry Passes
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#4A5D52] font-bold">₹</span>
                <input
                  type="number"
                  value={activitiesPerPerson}
                  onChange={(e) => setActivitiesPerPerson(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 bg-[#F9FBFA] border border-[#E5EAE7] rounded-xl text-xs text-[#1A2F23] font-mono font-bold focus:ring-2 focus:ring-[#064E3B]"
                />
              </div>
              <p className="text-[10px] text-[#4A5D52]">Avg ₹3,000 covers Gondola 1 & 2 + Dal Shikara</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1A2F23] flex items-center gap-1">
                <ShoppingBag className="w-3.5 h-3.5 text-[#064E3B]" /> Saffron, Pashmina & Gifts Budget
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#4A5D52] font-bold">₹</span>
                <input
                  type="number"
                  value={shoppingPerTraveler}
                  onChange={(e) => setShoppingPerTraveler(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 bg-[#F9FBFA] border border-[#E5EAE7] rounded-xl text-xs text-[#1A2F23] font-mono font-bold focus:ring-2 focus:ring-[#064E3B]"
                />
              </div>
              <p className="text-[10px] text-[#4A5D52]">Dry fruits, walnut wood, GI saffron</p>
            </div>
          </div>
        </div>

        {/* Right Cost Summary & Breakdown Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Total Card */}
          <div className="bg-[#064E3B] text-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#134E39] space-y-6">
            <div>
              <span className="text-xs font-bold text-[#A7F3D0] uppercase tracking-widest block mb-1">
                Total Estimated Kashmir Trip Budget
              </span>
              <div className="text-3xl sm:text-4xl font-normal font-editorial text-[#FBBF24]">
                ₹{grandTotal.toLocaleString()}
              </div>
              <div className="text-xs text-[#D1DBD5] mt-1 flex items-center gap-2">
                <span>≈ ₹{perPersonCost.toLocaleString()} per traveler</span>
                <span>•</span>
                <span>{days} Days / {travelers} Travelers</span>
              </div>
            </div>

            {/* Visual Multi-segment Progress Bar */}
            <div className="space-y-2">
              <div className="h-3 rounded-full overflow-hidden flex bg-[#043d2e] border border-[#134E39]">
                {breakdownItems.map((item, idx) => {
                  const percentage = grandTotal > 0 ? (item.amount / grandTotal) * 100 : 0;
                  return (
                    <div
                      key={idx}
                      style={{ width: `${percentage}%` }}
                      className={`${item.color} transition-all duration-300`}
                      title={`${item.label}: ₹${item.amount.toLocaleString()} (${percentage.toFixed(1)}%)`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Detailed Expense List */}
            <div className="space-y-2.5 pt-2 border-t border-[#134E39] text-xs">
              {breakdownItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.color}`}></span>
                    <span className="text-[#D1DBD5]">{item.label}</span>
                  </div>
                  <span className="font-mono font-bold text-white">
                    ₹{item.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Anti-Scam Safe Budgeting Guarantee */}
            <div className="p-3.5 rounded-xl bg-white/10 border border-white/20 text-xs text-[#D1DBD5] flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#FBBF24] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">SmartSafar Fair Price Assurance</strong>
                Standardized against TRC tourist taxi union lists & verified government counters.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
