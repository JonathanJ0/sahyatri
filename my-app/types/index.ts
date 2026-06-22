export interface Tourist {
  id: string;
  name: string;
  email: string;
  phone: string;
  passportNumber?: string;
  aadhaarNumber?: string;
  emergencyContacts: EmergencyContact[];
  tripItinerary: TripItinerary;
  digitalId: string;
  safetyScore: number;
  isActive: boolean;
  lastLocation?: Location;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  isPrimary: boolean;
}

export interface TripItinerary {
  id: string;
  startDate: Date;
  endDate: Date;
  destinations: Destination[];
  accommodation?: string;
  purpose: string;
}

export interface Destination {
  id: string;
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  plannedDate: Date;
  isVisited: boolean;
}

export interface Location {
  latitude: number;
  longitude: number;
  timestamp: Date;
  accuracy?: number;
}

export interface DangerZone {
  id: string;
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  radius: number; // in meters
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  description: string;
}

export interface SafetyAlert {
  id: string;
  touristId: string;
  type: 'geo_fence' | 'sos' | 'inactivity' | 'deviation' | 'anomaly';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  location?: Location;
  timestamp: Date;
  isResolved: boolean;
}

export interface SafetyScore {
  score: number; // 0-100
  factors: {
    locationSafety: number;
    timeOfDay: number;
    areaFamiliarity: number;
    emergencyContacts: number;
    recentActivity: number;
  };
  lastUpdated: Date;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export interface AppSettings {
  language: string;
  enableLocationTracking: boolean;
  enableNotifications: boolean;
  emergencyMode: boolean;
  theme: 'light' | 'dark' | 'auto';
}
