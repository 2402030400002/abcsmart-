import React, { useState, useEffect } from "react";
import {
  Users,
  AlertCircle,
  PlusCircle,
  ThumbsUp,
  Clock,
  MapPin,
  CheckCircle2,
  Filter,
  Send,
  Sparkles
} from "lucide-react";
import {
  fetchCommunityIncidents,
  submitCommunityIncident,
  upvoteIncident,
} from "../services/incidentService";
import { CommunityIncidentReport } from "../types";

export const CommunityReports: React.FC = () => {
  const [incidents, setIncidents] = useState<CommunityIncidentReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("All");

  // Form State
  const [formType, setFormType] = useState("Road blockage");
  const [formLocation, setFormLocation] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadIncidents();
  }, []);

  const loadIncidents = async () => {
    setLoading(true);
    const data = await fetchCommunityIncidents();
    setIncidents(data);
    setLoading(false);
  };

  const handleVote = async (id: string) => {
    const updatedCount = await upvoteIncident(id);
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === id ? { ...inc, votes: inc.votes + 1 } : inc))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formLocation.trim() || !formDescription.trim()) return;

    setSubmitting(true);
    const res = await submitCommunityIncident({
      type: formType,
      location: formLocation,
      description: formDescription,
    });

    if (res.success) {
      setIncidents((prev) => [res.incident, ...prev]);
      setFormLocation("");
      setFormDescription("");
      setShowModal(false);
    }
    setSubmitting(false);
  };

  const filtered = incidents.filter(
    (item) => selectedType === "All" || item.type === selectedType
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#064E3B] rounded-3xl p-6 sm:p-8 text-white shadow-md border border-[#134E39] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FBBF24] text-xs font-bold mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Real-time Crowd-Sourced Tourist Intelligence</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal font-editorial tracking-tight text-white">
            Community Safety & Road Reports
          </h2>
          <p className="text-[#D1DBD5] text-xs sm:text-sm mt-2 font-normal">
            Stay updated with live reports from fellow travelers, local taxi union members, and regional volunteers on road blockages, weather slush, and scam attempts.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-3.5 bg-[#FBBF24] hover:bg-[#F59E0B] text-[#1A2F23] font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report Safety Incident</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {["All", "Road blockage", "Scam", "Medical issue", "Weather hazard", "Other"].map(
          (type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                selectedType === type
                  ? "bg-[#064E3B] text-white shadow-xs"
                  : "bg-white text-[#4A5D52] hover:bg-[#F0F4F2] border border-[#E5EAE7]"
              }`}
            >
              {type}
            </button>
          )
        )}
      </div>

      {/* Incident List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((inc) => (
          <div
            key={inc.id}
            className="bg-white rounded-2xl p-5 shadow-xs border border-[#E5EAE7] flex flex-col justify-between space-y-4 hover:border-[#CBD5D0] transition"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F0F4F2] text-[#4A5D52]">
                  {inc.type}
                </span>
                <span className="text-[10px] font-bold text-[#064E3B] bg-[#F0FDF4] border border-[#DCFCE7] px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#064E3B]" />
                  <span>{inc.status}</span>
                </span>
              </div>

              <div className="flex items-start gap-1.5 text-xs font-bold text-[#1A2F23] mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#064E3B] shrink-0 mt-0.5" />
                <span>{inc.location}</span>
              </div>

              <p className="text-xs text-[#4A5D52] leading-relaxed line-clamp-3">
                {inc.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#E5EAE7] flex items-center justify-between text-xs text-[#4A5D52]">
              <div className="flex items-center gap-1 text-[11px]">
                <Clock className="w-3 h-3 text-[#4A5D52]" />
                <span>{inc.dateTime}</span>
              </div>

              <button
                onClick={() => handleVote(inc.id)}
                className="px-2.5 py-1 rounded-lg bg-[#F9FBFA] hover:bg-[#F0FDF4] border border-[#E5EAE7] text-[#1A2F23] hover:text-[#064E3B] font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                title="Upvote verified report"
              >
                <ThumbsUp className="w-3.5 h-3.5 text-[#064E3B]" />
                <span>{inc.votes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Submitting New Incident */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A2F23]/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 space-y-4 border border-[#E5EAE7]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAE7]">
              <h3 className="font-normal font-editorial text-[#1A2F23] text-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#064E3B]" />
                <span>Submit Safety / Road Report</span>
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#4A5D52] hover:text-[#1A2F23] text-xs font-bold cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#1A2F23] block mb-1">Incident Category</label>
                <select
                  value={formType}
                  onChange={(e) => setFormType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F9FBFA] border border-[#E5EAE7] rounded-xl text-xs font-medium text-[#1A2F23] focus:ring-2 focus:ring-[#064E3B]"
                >
                  <option value="Road blockage">Road blockage / Snow / Landslide</option>
                  <option value="Scam">Scam / Unauthorized Ticket Seller</option>
                  <option value="Medical issue">Medical Help Kiosk / Oxygen Availability</option>
                  <option value="Weather hazard">Weather hazard / Fog / Icy Road</option>
                  <option value="Other">Other Tourist Alert</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#1A2F23] block mb-1">Exact Location / Landmark</label>
                <input
                  type="text"
                  required
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  placeholder="e.g. Tangmarg Market near Taxi stand, Gulmarg Road"
                  className="w-full px-3 py-2.5 bg-[#F9FBFA] border border-[#E5EAE7] rounded-xl text-xs text-[#1A2F23] focus:ring-2 focus:ring-[#064E3B]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2F23] block mb-1">Description & Details</label>
                <textarea
                  required
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Describe the situation clearly to assist incoming tourists and vehicles..."
                  className="w-full px-3 py-2 bg-[#F9FBFA] border border-[#E5EAE7] rounded-xl text-xs text-[#1A2F23] focus:ring-2 focus:ring-[#064E3B]"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#E5EAE7] text-[#4A5D52] font-bold hover:bg-[#F9FBFA] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#085a44] text-white font-bold shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? "Publishing..." : "Publish Report"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
