import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomeView } from "./components/HomeView";
import { ExploreView } from "./components/ExploreView";
import { TripPlannerView } from "./components/TripPlannerView";
import { SafetyView } from "./components/SafetyView";
import { RoadsView } from "./components/RoadsView";
import { MapExplorer } from "./components/MapExplorer";
import { ScamsView } from "./components/ScamsView";
import { TranslatorWidget } from "./components/TranslatorWidget";
import { BudgetCalculator } from "./components/BudgetCalculator";
import { TreksView } from "./components/TreksView";
import { CommunityReports } from "./components/CommunityReports";
import { UserProfileView } from "./components/UserProfileView";
import { SOSModal } from "./components/SOSModal";
import { AIAssistantModal } from "./components/AIAssistantModal";
import { DestinationModal } from "./components/DestinationModal";
import {
  getStoredUser,
  saveUser,
  toggleSavedDestination,
} from "./services/authService";
import { Language, UserProfile, Destination } from "./types";
import { DESTINATIONS_DATA } from "./data/mockData";

export function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [isSOSOpen, setIsSOSOpen] = useState<boolean>(false);
  const [isAIOpen, setIsAIOpen] = useState<boolean>(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isOffline, setIsOffline] = useState<boolean>(false);

  useEffect(() => {
    // Load initial user state
    const stored = getStoredUser();
    setUser(stored);

    // Check browser online status
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleToggleSaveDestination = (id: string) => {
    const updated = toggleSavedDestination(id);
    if (user) {
      const updatedUser = { ...user, savedDestinations: updated };
      setUser(updatedUser);
    }
  };

  const handleOpenDestination = (dest: Destination) => {
    setSelectedDestination(dest);
  };

  const handlePlanTripTo = (name: string) => {
    setActiveTab("planner");
  };

  const handleToggleOffline = () => {
    setIsOffline((prev) => !prev);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomeView
            onNavigate={setActiveTab}
            onOpenSOS={() => setIsSOSOpen(true)}
            onOpenAI={() => setIsAIOpen(true)}
            onSelectDestination={handleOpenDestination}
            savedDestinations={user?.savedDestinations || []}
            onToggleSaveDestination={handleToggleSaveDestination}
          />
        );
      case "explore":
        return (
          <ExploreView
            onSelectDestination={handleOpenDestination}
            savedDestinations={user?.savedDestinations || []}
            onToggleSaveDestination={handleToggleSaveDestination}
          />
        );
      case "planner":
        return <TripPlannerView />;
      case "safety":
        return <SafetyView onOpenSOS={() => setIsSOSOpen(true)} user={user} />;
      case "roads":
        return <RoadsView />;
      case "map":
        return <MapExplorer />;
      case "scams":
        return <ScamsView />;
      case "translator":
        return <TranslatorWidget />;
      case "budget":
        return <BudgetCalculator />;
      case "treks":
        return <TreksView />;
      case "community":
        return <CommunityReports />;
      case "dashboard":
      case "auth":
        return (
          <UserProfileView
            user={user}
            onUpdateUser={(updated) => setUser(updated)}
            onNavigate={setActiveTab}
            onSelectDestination={handleOpenDestination}
          />
        );
      default:
        return (
          <HomeView
            onNavigate={setActiveTab}
            onOpenSOS={() => setIsSOSOpen(true)}
            onOpenAI={() => setIsAIOpen(true)}
            onSelectDestination={handleOpenDestination}
            savedDestinations={user?.savedDestinations || []}
            onToggleSaveDestination={handleToggleSaveDestination}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FBFA] text-[#1A2F23] selection:bg-emerald-100 selection:text-[#064E3B] font-sans">
      {/* Primary Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSOS={() => setIsSOSOpen(true)}
        onOpenAI={() => setIsAIOpen(true)}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        user={user}
        isOffline={isOffline}
        onToggleOffline={handleToggleOffline}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {renderActiveTab()}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={setActiveTab}
        onOpenSOS={() => setIsSOSOpen(true)}
      />

      {/* Modals */}
      <SOSModal
        isOpen={isSOSOpen}
        onClose={() => setIsSOSOpen(false)}
        user={user}
      />

      <AIAssistantModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
      />

      <DestinationModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onPlanTripTo={handlePlanTripTo}
      />

      {/* Floating Action Button for AI Guide (Bottom Right) */}
      <button
        id="floating-ai-assistant-btn"
        onClick={() => setIsAIOpen(true)}
        className="fixed bottom-6 right-6 z-30 px-4 py-3 rounded-full bg-[#064E3B] text-white shadow-xl hover:bg-[#043d2e] hover:scale-105 transition-all duration-300 flex items-center gap-2.5 cursor-pointer border border-[#134E39] group"
        title="Ask SmartSafar AI Assistant"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FBBF24] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FBBF24]"></span>
        </span>
        <span className="text-xs font-bold tracking-wide">Ask AI Guide</span>
      </button>
    </div>
  );
}

export default App;
