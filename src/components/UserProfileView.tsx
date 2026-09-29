import React, { useState } from "react";
import {
  User,
  Phone,
  Shield,
  Heart,
  Calendar,
  MapPin,
  Download,
  CheckCircle2,
  Trash2,
  Edit2,
  Save,
  AlertCircle,
  Sparkles,
  WifiOff,
  LogOut
} from "lucide-react";
import { UserProfile, GeneratedItinerary } from "../types";
import { saveUser, logoutUser } from "../services/authService";
import {
  getSavedItineraries,
  deleteItinerary,
  isOfflinePackCached,
  setOfflinePackCached,
} from "../services/storageService";
import { DESTINATIONS_DATA } from "../data/mockData";

interface UserProfileViewProps {
  user: UserProfile | null;
  onUpdateUser: (u: UserProfile) => void;
  onNavigate: (tab: string) => void;
  onSelectDestination: (dest: any) => void;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  user,
  onUpdateUser,
  onNavigate,
  onSelectDestination,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(
    user || {
      id: "u-default",
      fullName: "Aarav Sharma",
      email: "aarav@example.com",
      mobileNumber: "+91-9876543210",
      emergencyContactName: "Pooja Sharma",
      emergencyContactPhone: "+91-9876500112",
      emergencyContactRelation: "Sister",
      bloodGroup: "O+",
      medicalConditions: "None",
      savedDestinations: ["gulmarg", "pahalgam"],
    }
  );

  const [savedItineraries, setSavedItineraries] = useState<GeneratedItinerary[]>(
    getSavedItineraries()
  );
  const [offlineDownloaded, setOfflineDownloaded] = useState(isOfflinePackCached());
  const [downloadingOffline, setDownloadingOffline] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    saveUser(formData);
    onUpdateUser(formData);
    setIsEditing(false);
  };

  const handleDeleteItinerary = (id: string) => {
    deleteItinerary(id);
    setSavedItineraries(getSavedItineraries());
  };

  const handleDownloadOfflinePack = () => {
    setDownloadingOffline(true);
    setTimeout(() => {
      setOfflinePackCached(true);
      setOfflineDownloaded(true);
      setDownloadingOffline(false);
    }, 1200);
  };

  const savedDestinationsList = DESTINATIONS_DATA.filter((d) =>
    formData.savedDestinations?.includes(d.id)
  );

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-[#064E3B] rounded-3xl p-6 sm:p-8 text-white shadow-md border border-[#134E39] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FBBF24] text-xs font-bold mb-2">
            <User className="w-3.5 h-3.5" />
            <span>Verified Tourist Profile</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal font-editorial tracking-tight text-white">
            {formData.fullName}
          </h2>
          <p className="text-[#D1DBD5] text-xs mt-1">
            {formData.email} • {formData.mobileNumber}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer border border-white/20"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Profile Details & Emergency Contact */}
        <div className="lg:col-span-6 space-y-6">
          {/* Profile Form Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-[#E5EAE7] space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAE7]">
              <h3 className="font-normal font-editorial text-lg text-[#1A2F23] flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#064E3B]" />
                <span>Safety & Medical Info</span>
              </h3>
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-[#1A2F23] block mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F9FBFA] border border-[#E5EAE7] rounded-xl text-xs text-[#1A2F23] focus:ring-2 focus:ring-[#064E3B]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-[#1A2F23] block mb-1">Mobile Number</label>
                    <input
                      type="text"
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F9FBFA] border border-[#E5EAE7] rounded-xl text-xs text-[#1A2F23] focus:ring-2 focus:ring-[#064E3B]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#1A2F23] block mb-1">Blood Group</label>
                    <input
                      type="text"
                      value={formData.bloodGroup || ""}
                      onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                      placeholder="e.g. O+, B+, A+"
                      className="w-full px-3 py-2 bg-[#F9FBFA] border border-[#E5EAE7] rounded-xl text-xs text-[#1A2F23] focus:ring-2 focus:ring-[#064E3B]"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E5EAE7]">
                  <span className="text-[11px] font-bold text-[#991B1B] uppercase tracking-wider block mb-2">
                    Emergency Contact (Alerted during SOS)
                  </span>
                  <div className="space-y-3">
                    <div>
                      <label className="font-bold text-[#1A2F23] block mb-1">Contact Name & Relation</label>
                      <input
                        type="text"
                        value={formData.emergencyContactName}
                        onChange={(e) =>
                          setFormData({ ...formData, emergencyContactName: e.target.value })
                        }
                        placeholder="e.g. Pooja Sharma (Sister)"
                        className="w-full px-3 py-2 bg-[#F9FBFA] border border-[#E5EAE7] rounded-xl text-xs text-[#1A2F23] focus:ring-2 focus:ring-[#064E3B]"
                        required
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#1A2F23] block mb-1">Emergency Phone Number</label>
                      <input
                        type="text"
                        value={formData.emergencyContactPhone}
                        onChange={(e) =>
                          setFormData({ ...formData, emergencyContactPhone: e.target.value })
                        }
                        placeholder="+91-XXXXXXXXXX"
                        className="w-full px-3 py-2 bg-[#F9FBFA] border border-[#E5EAE7] rounded-xl text-xs text-[#1A2F23] focus:ring-2 focus:ring-[#064E3B]"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#064E3B] hover:bg-[#085a44] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Traveler Profile</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-[#F9FBFA] rounded-xl border border-[#E5EAE7]">
                    <span className="text-[10px] text-[#4A5D52] font-bold uppercase block">Phone</span>
                    <span className="font-semibold text-[#1A2F23]">{formData.mobileNumber}</span>
                  </div>
                  <div className="p-3 bg-[#F9FBFA] rounded-xl border border-[#E5EAE7]">
                    <span className="text-[10px] text-[#4A5D52] font-bold uppercase block">Blood Group</span>
                    <span className="font-semibold text-[#1A2F23]">{formData.bloodGroup || "Not specified"}</span>
                  </div>
                </div>

                {/* Emergency Contact Highlight Card */}
                <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#991B1B] uppercase tracking-wider">
                      Primary SOS Contact
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FEE2E2] text-[#991B1B]">
                      Active
                    </span>
                  </div>
                  <div className="text-sm font-bold text-[#1A2F23]">
                    {formData.emergencyContactName}
                  </div>
                  <div className="font-mono text-xs text-[#991B1B] font-bold">
                    {formData.emergencyContactPhone}
                  </div>
                  <p className="text-[11px] text-[#4A5D52] pt-1">
                    This number will receive your GPS coordinates automatically if you activate the Emergency SOS beacon.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Offline Cache Card */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#E5EAE7] space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <WifiOff className="w-5 h-5 text-[#064E3B]" />
                <h3 className="font-normal font-editorial text-lg text-[#1A2F23]">
                  Offline Safety Pack
                </h3>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  offlineDownloaded
                    ? "bg-[#F0FDF4] text-[#064E3B] border border-[#DCFCE7]"
                    : "bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A]"
                }`}
              >
                {offlineDownloaded ? "Downloaded" : "Not Downloaded"}
              </span>
            </div>

            <p className="text-xs text-[#4A5D52] leading-relaxed">
              Download emergency hospital contacts, Kashmiri phrase translations, and road helpline numbers so they remain fully accessible in remote valley areas with zero network connectivity.
            </p>

            <button
              onClick={handleDownloadOfflinePack}
              disabled={downloadingOffline || offlineDownloaded}
              className="w-full py-3 px-4 bg-[#064E3B] hover:bg-[#085a44] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-60 shadow-xs"
            >
              {offlineDownloaded ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#FBBF24]" />
                  <span>Offline Safety Pack Cached Locally</span>
                </>
              ) : downloadingOffline ? (
                <span>Caching Local Safety Directories...</span>
              ) : (
                <>
                  <Download className="w-4 h-4 text-[#FBBF24]" />
                  <span>Download Kashmir Offline Safety Pack (2.4 MB)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Saved Itineraries & Saved Destinations */}
        <div className="lg:col-span-6 space-y-6">
          {/* Saved Itineraries */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-[#E5EAE7] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAE7]">
              <h3 className="font-normal font-editorial text-lg text-[#1A2F23] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#064E3B]" />
                <span>Saved Travel Itineraries ({savedItineraries.length})</span>
              </h3>
              <button
                onClick={() => onNavigate("planner")}
                className="text-xs text-[#064E3B] font-bold hover:underline cursor-pointer"
              >
                + Plan New Trip
              </button>
            </div>

            {savedItineraries.length > 0 ? (
              <div className="space-y-3">
                {savedItineraries.map((itin) => (
                  <div
                    key={itin.id}
                    className="p-4 rounded-xl bg-[#F9FBFA] border border-[#E5EAE7] flex items-center justify-between gap-3"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-[#1A2F23]">{itin.title}</h4>
                      <p className="text-[11px] text-[#4A5D52]">
                        {itin.days} Days • Created {itin.createdAt} • {itin.estimatedTotalCost}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteItinerary(itin.id)}
                      className="p-2 text-[#4A5D52] hover:text-[#991B1B] transition cursor-pointer"
                      title="Delete itinerary"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-[#F9FBFA] rounded-xl text-center space-y-2 text-xs text-[#4A5D52]">
                <p>No customized itineraries saved yet.</p>
                <button
                  onClick={() => onNavigate("planner")}
                  className="font-bold text-[#064E3B] hover:underline cursor-pointer"
                >
                  Generate your first AI itinerary
                </button>
              </div>
            )}
          </div>

          {/* Saved Destinations */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-[#E5EAE7] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAE7]">
              <h3 className="font-normal font-editorial text-lg text-[#1A2F23] flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#D97706]" />
                <span>Saved Destinations ({savedDestinationsList.length})</span>
              </h3>
              <button
                onClick={() => onNavigate("explore")}
                className="text-xs text-[#064E3B] font-bold hover:underline cursor-pointer"
              >
                Browse All
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {savedDestinationsList.map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => onSelectDestination(dest)}
                  className="p-3 bg-[#F9FBFA] hover:bg-[#F0FDF4] rounded-xl border border-[#E5EAE7] hover:border-[#CBD5D0] transition cursor-pointer flex items-center gap-3"
                >
                  <img
                    src={dest.imageUrl}
                    alt={dest.name}
                    className="w-12 h-12 rounded-lg object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#1A2F23] truncate">{dest.name}</h4>
                    <span className="text-[10px] text-[#4A5D52] block truncate">{dest.district}</span>
                    <span className="text-[10px] text-[#064E3B] font-semibold">Safety: {dest.safetyScore}/100</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
