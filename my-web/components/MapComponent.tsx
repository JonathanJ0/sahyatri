'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for different tourist statuses
const createCustomIcon = (color: string) => {
  return new L.DivIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color:${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const icons = {
  safe: createCustomIcon('#10B981'),
  warning: createCustomIcon('#F59E0B'),
  danger: createCustomIcon('#EF4444'),
  inactive: createCustomIcon('#6B7280'),
};

interface Tourist {
  id: string;
  name: string;
  location: [number, number];
  status: 'safe' | 'warning' | 'danger' | 'inactive';
  lastSeen: string;
  safetyScore: number;
  emergencyContacts: string[];
}

interface MapComponentProps {
  tourists: Tourist[];
  selectedTourist: Tourist | null;
  onTouristSelect: (tourist: Tourist) => void;
}

// Component to handle map updates when selected tourist changes
function MapUpdater({ selectedTourist }: { selectedTourist: Tourist | null }) {
  const map = useMap();

  useEffect(() => {
    if (selectedTourist) {
      map.setView(selectedTourist.location, 15);
    }
  }, [selectedTourist, map]);

  return null;
}

export default function MapComponent({ tourists, selectedTourist, onTouristSelect }: MapComponentProps) {
  // Default center - India
  const defaultCenter: [number, number] = [20.5937, 78.9629];
  const defaultZoom = 6;

  return (
    <div className="w-full h-full">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {tourists.map((tourist) => (
          <Marker
            key={tourist.id}
            position={tourist.location}
            icon={icons[tourist.status]}
            eventHandlers={{
              click: () => onTouristSelect(tourist),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-gray-900">{tourist.name}</h3>
                <div className="mt-2 space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">Status:</span> 
                    <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${
                      tourist.status === 'safe' ? 'bg-green-100 text-green-800' :
                      tourist.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      tourist.status === 'danger' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {tourist.status}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Safety Score:</span> {tourist.safetyScore}/10
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Last Seen:</span> {tourist.lastSeen}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Location:</span> {tourist.location[0].toFixed(4)}, {tourist.location[1].toFixed(4)}
                  </p>
                </div>
                <div className="mt-3">
                  <button
                    onClick={() => onTouristSelect(tourist)}
                    className="w-full bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        
        <MapUpdater selectedTourist={selectedTourist} />
      </MapContainer>
    </div>
  );
}
