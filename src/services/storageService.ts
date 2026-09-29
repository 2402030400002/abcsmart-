import { GeneratedItinerary } from "../types";

const SAVED_ITINERARIES_KEY = "smartsafar_saved_itineraries";
const OFFLINE_PACK_KEY = "smartsafar_offline_pack_downloaded";

export function getSavedItineraries(): GeneratedItinerary[] {
  try {
    const raw = localStorage.getItem(SAVED_ITINERARIES_KEY) || localStorage.getItem("safekashmir_saved_itineraries");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveItinerary(itinerary: GeneratedItinerary): void {
  try {
    const list = getSavedItineraries();
    const updated = [itinerary, ...list.filter((i) => i.id !== itinerary.id)];
    localStorage.setItem(SAVED_ITINERARIES_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to save itinerary:", err);
  }
}

export function deleteItinerary(id: string): void {
  try {
    const list = getSavedItineraries();
    const updated = list.filter((i) => i.id !== id);
    localStorage.setItem(SAVED_ITINERARIES_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to delete itinerary:", err);
  }
}

export function isOfflinePackCached(): boolean {
  return localStorage.getItem(OFFLINE_PACK_KEY) === "true";
}

export function setOfflinePackCached(status: boolean): void {
  localStorage.setItem(OFFLINE_PACK_KEY, status ? "true" : "false");
}
