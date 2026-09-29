import { UserProfile, Language } from "../types";

const AUTH_USER_KEY = "smartsafar_user_profile";
const AUTH_TOKEN_KEY = "smartsafar_auth_token";

export const DEFAULT_USER: UserProfile = {
  id: "user-default-101",
  fullName: "Aarav Sharma",
  email: "aarav.traveler@example.com",
  mobileNumber: "+91-9876543210",
  emergencyContactName: "Pooja Sharma (Sister)",
  emergencyContactPhone: "+91-9876500112",
  emergencyContactRelation: "Sister",
  preferredLanguage: "en",
  bloodGroup: "O+",
  medicalConditions: "None",
  savedDestinations: ["gulmarg", "pahalgam", "doodhpathri"],
  currentTrip: {
    destination: "Kashmir Valley Grand Circuit",
    startDate: "2026-08-20",
    endDate: "2026-08-26",
    travelers: 2
  }
};

export function getStoredUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY) || localStorage.getItem("safekashmir_user_profile");
    if (!raw) {
      // Seed default user for demo ease
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(DEFAULT_USER));
      return DEFAULT_USER;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_USER;
  }
}

export function saveUser(profile: UserProfile): void {
  try {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error("Failed to save user profile to localStorage", err);
  }
}

export function loginUser(email: string, _password?: string): { success: boolean; user: UserProfile } {
  let user = getStoredUser();
  if (!user || user.email !== email) {
    user = {
      ...DEFAULT_USER,
      email,
      fullName: email.split("@")[0].replace(".", " ").replace(/\b\w/g, l => l.toUpperCase()) || "Traveler"
    };
  }
  localStorage.setItem(AUTH_TOKEN_KEY, "mock_token_" + Date.now());
  saveUser(user);
  return { success: true, user };
}

export function registerUser(data: {
  fullName: string;
  email: string;
  mobileNumber: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation?: string;
  preferredLanguage?: Language;
}): UserProfile {
  const newUser: UserProfile = {
    id: `user-${Date.now()}`,
    fullName: data.fullName,
    email: data.email,
    mobileNumber: data.mobileNumber,
    emergencyContactName: data.emergencyContactName,
    emergencyContactPhone: data.emergencyContactPhone,
    emergencyContactRelation: data.emergencyContactRelation || "Primary Contact",
    preferredLanguage: data.preferredLanguage || "en",
    savedDestinations: ["srinagar", "gulmarg"],
    currentTrip: {
      destination: "Srinagar & Gulmarg 4-Day Tour",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + 4 * 86400000).toISOString().split("T")[0],
      travelers: 2
    }
  };

  localStorage.setItem(AUTH_TOKEN_KEY, "mock_token_" + Date.now());
  saveUser(newUser);
  return newUser;
}

export function logoutUser(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return Boolean(localStorage.getItem(AUTH_TOKEN_KEY));
}

export function toggleSavedDestination(destinationId: string): string[] {
  const user = getStoredUser() || DEFAULT_USER;
  const set = new Set(user.savedDestinations || []);
  if (set.has(destinationId)) {
    set.delete(destinationId);
  } else {
    set.add(destinationId);
  }
  const updated = Array.from(set);
  user.savedDestinations = updated;
  saveUser(user);
  return updated;
}
