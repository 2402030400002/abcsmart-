import React, { useState, useEffect } from "react";
import {
  AlertOctagon,
  PhoneCall,
  MapPin,
  Send,
  Volume2,
  VolumeX,
  X,
  ShieldCheck,
  CheckCircle,
  Copy,
  Flame,
  Hospital,
  Shield,
  LifeBuoy
} from "lucide-react";
import { emergencyService, GeolocationData } from "../services/emergencyService";
import { UserProfile } from "../types";

interface SOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
}

export const SOSModal: React.FC<SOSModalProps> = ({ isOpen, onClose, user }) => {
  const [step, setStep] = useState<"confirm" | "active">("confirm");
  const [location, setLocation] = useState<GeolocationData | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [sirenPlaying, setSirenPlaying] = useState(false);
  const [copiedLocation, setCopiedLocation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep("confirm");
      setLoadingLocation(true);
      emergencyService.getCurrentLocation().then((loc) => {
        setLocation(loc);
        setLoadingLocation(false);
      });
    } else {
      if (sirenPlaying) {
        emergencyService.stopSirenAudio();
        setSirenPlaying(false);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleActivate = () => {
    setStep("active");
  };

  const handleToggleSiren = () => {
    if (sirenPlaying) {
      emergencyService.stopSirenAudio();
      setSirenPlaying(false);
    } else {
      emergencyService.startSirenAudio();
      setSirenPlaying(true);
    }
  };

  const handleCopyCoordinates = () => {
    if (location) {
      const str = `Latitude: ${location.lat.toFixed(5)}, Longitude: ${location.lng.toFixed(5)} (Accuracy: ~${location.accuracy}m)`;
      navigator.clipboard.writeText(str);
      setCopiedLocation(true);
      setTimeout(() => setCopiedLocation(false), 2500);
    }
  };

  const emergencyContacts = [
    { name: "Unified J&K Police Control", number: "112", icon: Shield, desc: "Police, Fire, Quick Response" },
    { name: "Ambulance Network (108 J&K)", number: "108", icon: Hospital, desc: "Advanced Life Support & Oxygen" },
    { name: "Women's Safety Helpline", number: "181", icon: LifeBuoy, desc: "24x7 Dedicated Women Distress Desk" },
    { name: "Tourist Police Srinagar", number: "+911942455512", icon: ShieldCheck, desc: "TRC Tourist Protection Force" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A2F23]/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-[#E5EAE7]">
        {/* Header Ribbon */}
        <div className="bg-[#991B1B] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#7F1D1D] rounded-xl">
              <AlertOctagon className="w-6 h-6 animate-pulse text-white" />
            </div>
            <div>
              <h2 className="text-lg font-normal font-editorial tracking-tight">SmartSafar Emergency SOS</h2>
              <p className="text-xs text-[#FEE2E2] font-medium">Jammu & Kashmir Rapid Tourist Response</p>
            </div>
          </div>
          <button
            onClick={() => {
              if (sirenPlaying) emergencyService.stopSirenAudio();
              onClose();
            }}
            className="text-[#FEE2E2] hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {step === "confirm" ? (
            <div className="text-center py-4 space-y-6">
              <div className="w-20 h-20 bg-[#FEF2F2] text-[#991B1B] rounded-full flex items-center justify-center mx-auto border border-[#FECACA] shadow-inner animate-bounce">
                <AlertOctagon className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-xl font-normal font-editorial text-[#1A2F23] mb-2">
                  Activate Emergency Assistance Protocol?
                </h3>
                <p className="text-sm text-[#4A5D52] max-w-md mx-auto leading-relaxed">
                  This protocol prepares your live coordinates, enables direct one-touch helplines, launches the emergency distress broadcast, and can trigger an audible beacon.
                </p>
              </div>

              <div className="p-3 bg-[#FFFBEB] rounded-xl border border-[#FDE68A] text-[#92400E] text-xs text-left flex items-start gap-2.5">
                <span className="text-base font-bold">⚠️</span>
                <div>
                  <strong>Demo Mode Notice:</strong> In this demonstration platform, live emergency calls and SMS links are prepared locally. No unauthorized automated 911/112 dispatches will occur without your confirmation.
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl border border-[#E5EAE7] text-[#4A5D52] font-semibold hover:bg-[#F9FBFA] transition cursor-pointer text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleActivate}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#991B1B] hover:bg-[#7F1D1D] text-white font-bold shadow-xs transition cursor-pointer text-sm flex items-center justify-center gap-2"
                >
                  <AlertOctagon className="w-4 h-4" />
                  <span>ACTIVATE SOS</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Emergency Status Banner */}
              <div className="p-3.5 bg-[#FEF2F2] border border-[#FECACA] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#991B1B] animate-ping"></span>
                  <div>
                    <span className="text-xs font-bold text-[#991B1B] uppercase tracking-wider block">
                      Emergency Assistance Activated (Demo Mode)
                    </span>
                    <span className="text-[11px] text-[#7F1D1D]">Stay calm and follow the protocols below</span>
                  </div>
                </div>
                <button
                  onClick={handleToggleSiren}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition ${
                    sirenPlaying
                      ? "bg-[#991B1B] text-white animate-pulse"
                      : "bg-[#F0F4F2] text-[#1A2F23] hover:bg-[#E5EAE7]"
                  }`}
                >
                  {sirenPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>{sirenPlaying ? "Mute Siren" : "Test Siren"}</span>
                </button>
              </div>

              {/* Live Location Card */}
              <div className="p-4 bg-[#F9FBFA] rounded-xl border border-[#E5EAE7] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1A2F23]">
                    <MapPin className="w-4 h-4 text-[#064E3B]" />
                    <span>Your Current GPS Coordinates</span>
                  </div>
                  <button
                    onClick={handleCopyCoordinates}
                    className="text-xs font-semibold text-[#064E3B] hover:text-[#085a44] flex items-center gap-1 cursor-pointer"
                  >
                    {copiedLocation ? <CheckCircle className="w-3.5 h-3.5 text-[#064E3B]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLocation ? "Copied!" : "Copy Coordinates"}</span>
                  </button>
                </div>
                {loadingLocation ? (
                  <p className="text-xs text-[#4A5D52] italic">Acquiring high-precision GPS satellite fix...</p>
                ) : location ? (
                  <div>
                    <div className="font-mono text-sm font-bold text-[#1A2F23] bg-white p-2 rounded-lg border border-[#E5EAE7]">
                      {location.lat.toFixed(5)}° N, {location.lng.toFixed(5)}° E
                    </div>
                    <p className="text-[11px] text-[#4A5D52] mt-1">
                      Estimated Accuracy: ±{location.accuracy} meters • Kashmir Valley Region
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-[#4A5D52]">Location approximated to Srinagar District Centre</p>
                )}
              </div>

              {/* Direct Emergency Contacts */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#1A2F23] uppercase tracking-wider block">
                  Tap to Dial Official Authorities
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {emergencyContacts.map((c) => {
                    const Icon = c.icon;
                    return (
                      <a
                        key={c.name}
                        href={`tel:${c.number}`}
                        className="p-3 bg-white hover:bg-[#FEF2F2] border border-[#E5EAE7] hover:border-[#FECACA] rounded-xl transition flex flex-col justify-between group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <Icon className="w-4 h-4 text-[#4A5D52] group-hover:text-[#991B1B]" />
                          <span className="text-xs font-mono font-bold text-[#991B1B] bg-[#FEF2F2] px-1.5 py-0.5 rounded border border-[#FECACA]">
                            {c.number}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-[#1A2F23] line-clamp-1">{c.name}</div>
                        <div className="text-[10px] text-[#4A5D52] line-clamp-1">{c.desc}</div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Emergency Contact SMS Trigger */}
              {user && user.emergencyContactPhone && location && (
                <div className="pt-1">
                  <a
                    href={emergencyService.generateEmergencySMSUrl(
                      user.emergencyContactPhone,
                      location,
                      user.fullName
                    )}
                    className="w-full py-3 px-4 rounded-xl bg-[#064E3B] hover:bg-[#085a44] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition"
                  >
                    <Send className="w-4 h-4 text-[#FBBF24]" />
                    <span>Send SOS SMS to {user.emergencyContactName} ({user.emergencyContactPhone})</span>
                  </a>
                </div>
              )}

              {/* Deactivate */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    if (sirenPlaying) emergencyService.stopSirenAudio();
                    onClose();
                  }}
                  className="w-full py-2.5 text-center text-xs font-semibold text-[#4A5D52] hover:text-[#1A2F23] cursor-pointer"
                >
                  Deactivate SOS & Return to App
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
