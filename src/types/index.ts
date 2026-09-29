export type Language = "en" | "hi" | "ur" | "ks";

export interface Destination {
  id: string;
  name: string;
  kashmiriName?: string;
  tagline: string;
  description: string;
  region: "Kashmir Valley" | "Jammu Region" | "Ladakh Frontier" | "North Kashmir";
  district: string;
  altitude: string;
  bestTime: string;
  safetyLevel: "Safe & Open" | "High Altitude Advisory" | "Permit Needed" | "Winter Caution";
  safetyScore: number; // 1-100
  imageUrl: string;
  tags: Array<"Nature" | "Adventure" | "Culture" | "Family" | "Religious" | "Budget" | "Winter Snow">;
  attractions: string[];
  thingsToAvoid: string[];
  localTips: string[];
  estimatedDailyBudget: {
    budget: number;
    moderate: number;
    luxury: number;
  };
  nearbyHospitals: string[];
  nearestPoliceStation: string;
  distanceFromSrinagarKm: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface RoadStatusItem {
  id: string;
  route: string;
  from: string;
  to: string;
  distanceKm: number;
  status: "OPEN" | "CAUTION" | "CLOSED";
  lastUpdated: string;
  reason: string;
  advisories: string[];
  alternateRoute?: string;
  vehicleRestrictions?: string;
  emergencyContact: string;
}

export interface WeatherItem {
  location: string;
  temperature: string;
  condition: string;
  wind: string;
  rainProbability: string;
  advisory: string;
}

export interface EmergencyContactItem {
  id: string;
  category: "Police" | "Ambulance" | "Fire" | "Tourist Assistance" | "Women Safety" | "Disaster Management" | "Rescue";
  serviceName: string;
  service?: string;
  department: string;
  description?: string;
  location: string;
  number: string;
  alternateNumber?: string;
  is24x7: boolean;
  available?: string;
  priority: number;
  address?: string;
}

export interface ServiceFacility {
  id: string;
  name: string;
  category: "Hospitals" | "Police Stations" | "Pharmacies" | "ATMs" | "Fuel Stations" | "Tourist Information" | "Hotels" | "Restaurants";
  address: string;
  district: string;
  distanceKm: number;
  phone: string;
  isOpen: boolean;
  timings: string;
  lat: number;
  lng: number;
  rating?: number;
  features?: string[];
}

export interface ScamAlertItem {
  id: string;
  title: string;
  category: "Shopping" | "Transportation" | "Activity" | "Accommodation" | "Guide / Permit";
  severity: "LOW" | "MEDIUM" | "HIGH";
  warningSign: string;
  scamDescription: string;
  whatToDo: string[];
  officialPrecaution: string;
  officialRateGuideline?: string;
}

export interface TranslationPhrase {
  id: string;
  category: "Essentials" | "Directions" | "Emergency" | "Shopping & Bargaining" | "Food & Dining" | "Transportation";
  english: string;
  hindi: string;
  urdu: string;
  kashmiriUrdu: string;
  kashmiriRoman: string;
  audioPronunciationText: string;
}

export interface TrekkingRouteItem {
  id: string;
  name: string;
  difficulty: "Easy" | "Moderate" | "Challenging" | "Hard / High Alpine";
  distanceKm: number;
  durationDays: string;
  maxAltitudeMeters: number;
  maxAltitudeFt: string;
  baseCamp: string;
  bestSeason: string;
  weatherWarning: string;
  requiredPreparation: string[];
  safetyTips: string[];
  permitRequired: boolean;
  permitDetails: string;
  highlights: string[];
  imageUrl: string;
}

export interface HotelStayItem {
  id: string;
  name: string;
  type: "Houseboat" | "Heritage Hotel" | "Eco Resort" | "Homestay" | "Budget Inn";
  location: string;
  district: string;
  priceRange: string;
  pricePerNightINR: number;
  rating: number;
  reviewsCount: number;
  amenities: string[];
  safetyFeatures: string[];
  imageUrl: string;
  contactNumber: string;
  verifiedBySmartSafar: boolean;
}

export interface WeatherAlertItem {
  id: string;
  severity: "CRITICAL (RED)" | "WARNING (AMBER)" | "ADVISORY (YELLOW)" | "NORMAL (GREEN)";
  type: "Weather" | "Road" | "Safety" | "Travel / Aviation";
  location: string;
  dateTime: string;
  title: string;
  description: string;
  actionRequired: string;
  source: string;
}

export interface CommunityIncidentReport {
  id: string;
  type: "Road blockage" | "Scam" | "Unsafe area" | "Lost item" | "Medical issue" | "Other";
  location: string;
  description: string;
  dateTime: string;
  imageUrl?: string;
  status: "verified" | "investigating" | "resolved";
  votes: number;
  reportedBy: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  preferredLanguage: Language;
  bloodGroup?: string;
  medicalConditions?: string;
  savedDestinations: string[];
  currentTrip?: {
    destination: string;
    startDate: string;
    endDate: string;
    travelers: number;
  };
}

export interface ItineraryDay {
  day: number;
  title: string;
  location: string;
  activities: string[];
  safetyTips: string;
  stay: string;
  food: string;
  transport: string;
}

export interface GeneratedItinerary {
  id: string;
  title: string;
  createdAt: string;
  days: number | ItineraryDay[];
  destination: string;
  travelers: number;
  budget?: string;
  travelStyle: string;
  estimatedTotalCost?: string;
  estimatedCost?: string;
  daysPlan?: ItineraryDay[];
}
