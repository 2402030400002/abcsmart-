import React from "react";
import {
  Route,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Car,
  Phone,
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import { RoadStatusItem } from "../types";

interface RoadStatusCardProps {
  item: RoadStatusItem;
}

export const RoadStatusCard: React.FC<RoadStatusCardProps> = ({ item }) => {
  const getStatusBadge = () => {
    switch (item.status) {
      case "OPEN":
        return {
          bg: "bg-[#F0FDF4] text-[#064E3B] border-[#DCFCE7]",
          icon: CheckCircle2,
          label: "OPEN / ALL TRAFFIC",
          dotColor: "bg-emerald-600",
        };
      case "CAUTION":
        return {
          bg: "bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]",
          icon: AlertTriangle,
          label: "CAUTION / REGULATED",
          dotColor: "bg-amber-500",
        };
      case "CLOSED":
        return {
          bg: "bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]",
          icon: XCircle,
          label: "CLOSED / RESTRICTED",
          dotColor: "bg-red-600",
        };
    }
  };

  const badge = getStatusBadge();
  const Icon = badge.icon;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#E5EAE7] hover:border-[#CBD5D0] transition space-y-4">
      {/* Top Route & Status Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5EAE7]">
        <div>
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${badge.dotColor} animate-ping`}></span>
            <h3 className="font-normal font-editorial text-base sm:text-lg text-[#1A2F23]">{item.route}</h3>
          </div>
          <p className="text-xs text-[#4A5D52] mt-0.5">
            {item.from} <ArrowRight className="inline w-3 h-3 text-[#4A5D52]" /> {item.to} ({item.distanceKm} km)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${badge.bg}`}
          >
            <Icon className="w-4 h-4" />
            <span>{badge.label}</span>
          </span>
        </div>
      </div>

      {/* Real-time description */}
      <div className="p-3.5 rounded-xl bg-[#F9FBFA] border border-[#E5EAE7] text-xs text-[#1A2F23] leading-relaxed">
        <strong className="text-[#064E3B] block mb-1">Current Condition:</strong>
        {item.reason}
      </div>

      {/* Advisories List */}
      {item.advisories && item.advisories.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-[#4A5D52] uppercase tracking-wider block">
            Traveler Advisories & Safety Requirements
          </span>
          <ul className="space-y-1 text-xs text-[#4A5D52]">
            {item.advisories.map((adv, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-[#064E3B] font-bold">•</span>
                <span>{adv}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Alternate Route & Vehicle info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
        {item.vehicleRestrictions && (
          <div className="p-2.5 bg-[#F9FBFA] rounded-xl border border-[#E5EAE7]">
            <span className="text-[10px] font-bold text-[#4A5D52] uppercase block">Vehicle Permitted</span>
            <span className="text-[#1A2F23] font-medium">{item.vehicleRestrictions}</span>
          </div>
        )}
        {item.alternateRoute && (
          <div className="p-2.5 bg-[#F9FBFA] rounded-xl border border-[#E5EAE7]">
            <span className="text-[10px] font-bold text-[#4A5D52] uppercase block">Alternate Route</span>
            <span className="text-[#1A2F23] font-medium">{item.alternateRoute}</span>
          </div>
        )}
      </div>

      {/* Footer Timings & Contact */}
      <div className="pt-3 border-t border-[#E5EAE7] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#4A5D52]">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#4A5D52]" />
          <span>Last Bulletin: <strong className="text-[#1A2F23]">{item.lastUpdated}</strong></span>
        </div>

        <div className="flex items-center gap-1.5 text-[#064E3B] font-semibold">
          <Phone className="w-3.5 h-3.5 text-[#064E3B]" />
          <span>{item.emergencyContact}</span>
        </div>
      </div>
    </div>
  );
};
