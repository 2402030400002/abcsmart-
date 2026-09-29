import React, { useState } from "react";
import {
  ShieldAlert,
  Compass,
  MapPin,
  Route,
  PhoneCall,
  CalendarCheck,
  AlertTriangle,
  Languages,
  User,
  Menu,
  X,
  Sparkles,
  Wifi,
  WifiOff,
  Calculator,
  Mountain,
  Users
} from "lucide-react";
import { Language, UserProfile } from "../types";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSOS: () => void;
  onOpenAI: () => void;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  user: UserProfile | null;
  isOffline: boolean;
  onToggleOffline: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSOS,
  onOpenAI,
  currentLanguage,
  onLanguageChange,
  user,
  isOffline,
  onToggleOffline,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "Home", icon: Compass },
    { id: "explore", label: "Explore", icon: MapPin },
    { id: "planner", label: "Trip Planner", icon: CalendarCheck },
    { id: "safety", label: "Safety & SOS", icon: ShieldAlert },
    { id: "roads", label: "Road Status", icon: Route },
    { id: "map", label: "Nearby Map", icon: MapPin },
    { id: "scams", label: "Scam Alerts", icon: AlertTriangle },
    { id: "translator", label: "Translator", icon: Languages },
    { id: "budget", label: "Budget", icon: Calculator },
    { id: "treks", label: "Treks", icon: Mountain },
    { id: "community", label: "Reports", icon: Users },
  ];

  const languages: Array<{ code: Language; label: string; native: string }> = [
    { code: "en", label: "English", native: "English" },
    { code: "hi", label: "Hindi", native: "हिन्दी" },
    { code: "ur", label: "Urdu", native: "اردو" },
    { code: "ks", label: "Kashmiri", native: "کٲشُر" },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5EAE7] shadow-xs">
      {/* Top emergency & offline notification ribbon */}
      {isOffline && (
        <div className="bg-[#D97706] text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-[#B45309]">
          <WifiOff className="w-3.5 h-3.5" />
          <span>Offline Mode Active: Showing cached destinations, safety directories, and local emergency guides.</span>
          <button
            onClick={onToggleOffline}
            className="underline hover:text-amber-100 font-bold ml-2 cursor-pointer"
          >
            Reconnect Online
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Brand */}
          <div
            id="brand-logo"
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#064E3B] flex items-center justify-center text-white shadow-sm group-hover:bg-[#043d2e] transition-colors duration-200">
              <ShieldAlert className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#FBBF24]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-[#064E3B] font-editorial text-[22px]">
                  Smart<span className="text-[#1A2F23]">Safar</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-[#F0FDF4] text-[#064E3B] border border-[#DCFCE7]">
                  Official Guide
                </span>
              </div>
              <p className="text-[11px] text-[#4A5D52] font-medium hidden sm:block">
                Smart Tourist Safety & Assistance
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.slice(0, 7).map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "bg-[#064E3B] text-white shadow-xs"
                      : "text-[#4A5D52] hover:text-[#064E3B] hover:bg-[#F0F4F2]"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#FBBF24]" : "text-[#4A5D52]"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* More Menu Dropdown for remaining links */}
            <div className="relative group">
              <button
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#4A5D52] hover:text-[#064E3B] hover:bg-[#F0F4F2] flex items-center gap-1 cursor-pointer"
              >
                <span>More</span>
                <span className="text-[10px]">▼</span>
              </button>
              <div className="absolute right-0 mt-1 w-48 bg-white border border-[#E5EAE7] rounded-xl shadow-lg py-1.5 hidden group-hover:block group-focus-within:block z-50">
                {navLinks.slice(7).map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full px-4 py-2 text-left text-xs font-medium flex items-center gap-2.5 cursor-pointer ${
                        isActive ? "bg-[#F0FDF4] text-[#064E3B] font-bold" : "text-[#1A2F23] hover:bg-[#F0F4F2]"
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#064E3B]" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Live Network Pill */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-[#F0F4F2] rounded-full text-xs font-semibold text-[#064E3B] border border-[#E5EAE7]">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span>Network: Active</span>
            </div>

            {/* AI Assistant Quick Trigger */}
            <button
              id="header-ai-btn"
              onClick={onOpenAI}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#064E3B] text-white shadow-xs hover:bg-[#043d2e] transition cursor-pointer"
              title="Ask SmartSafar AI Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FBBF24]" />
              <span>Ask AI</span>
            </button>

            {/* Offline Mode Toggle Button */}
            <button
              id="offline-toggle-btn"
              onClick={onToggleOffline}
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer flex items-center gap-1 ${
                isOffline
                  ? "bg-amber-50 text-[#D97706] border-amber-300"
                  : "bg-white text-[#4A5D52] border-[#E5EAE7] hover:bg-[#F0F4F2]"
              }`}
              title={isOffline ? "Currently in Offline Mode" : "Switch to Offline Simulation"}
            >
              {isOffline ? <WifiOff className="w-3.5 h-3.5 text-[#D97706]" /> : <Wifi className="w-3.5 h-3.5 text-[#4A5D52]" />}
              <span className="hidden md:inline">{isOffline ? "Offline" : "Online"}</span>
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                id="language-selector-btn"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-[#E5EAE7] text-[#1A2F23] hover:bg-[#F0F4F2] transition flex items-center gap-1 text-xs font-medium cursor-pointer bg-white"
                title="Change Language"
              >
                <Languages className="w-3.5 h-3.5 text-[#4A5D52]" />
                <span className="uppercase font-bold text-[11px]">{currentLanguage}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-[#E5EAE7] rounded-xl shadow-xl py-1 z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        onLanguageChange(l.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between cursor-pointer ${
                        currentLanguage === l.code
                          ? "bg-[#F0FDF4] text-[#064E3B] font-bold"
                          : "text-[#1A2F23] hover:bg-[#F0F4F2]"
                      }`}
                    >
                      <span>{l.label}</span>
                      <span className="text-[#4A5D52] font-normal">{l.native}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile / Dashboard Link */}
            <button
              id="user-profile-btn"
              onClick={() => handleNavClick("dashboard")}
              className={`flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer ${
                activeTab === "dashboard" || activeTab === "auth"
                  ? "bg-[#064E3B] text-white border-[#064E3B]"
                  : "bg-white text-[#1A2F23] border-[#E5EAE7] hover:bg-[#F0F4F2]"
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-[#D97706] text-white flex items-center justify-center text-[10px] font-bold">
                {user ? user.fullName.charAt(0).toUpperCase() : "U"}
              </div>
              <span className="hidden sm:inline font-semibold">
                {user ? user.fullName.split(" ")[0] : "Account"}
              </span>
            </button>

            {/* High-Visibility Emergency SOS Button */}
            <button
              id="emergency-sos-header-btn"
              onClick={onOpenSOS}
              className="bg-[#DC2626] hover:bg-red-700 text-white font-black text-xs sm:text-xs px-3.5 sm:px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer border border-red-700"
              title="Activate Emergency Tourist SOS Protocol"
            >
              <PhoneCall className="w-3.5 h-3.5 text-white" />
              <span className="tracking-wider uppercase">SOS</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-[#4A5D52] hover:bg-[#F0F4F2] transition cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#E5EAE7] bg-white px-4 pt-3 pb-6 space-y-1 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => {
                onOpenAI();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-[#064E3B] text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#FBBF24]" />
              <span>Ask SmartSafar AI</span>
            </button>
            <button
              onClick={() => {
                onOpenSOS();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-[#DC2626] text-white text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>EMERGENCY SOS</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2.5 rounded-lg text-xs font-medium flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-[#F0FDF4] text-[#064E3B] font-bold border border-[#DCFCE7]"
                      : "text-[#1A2F23] hover:bg-[#F0F4F2]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#064E3B]" : "text-[#4A5D52]"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
