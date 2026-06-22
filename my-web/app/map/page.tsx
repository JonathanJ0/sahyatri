'use client';

import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import dynamic from 'next/dynamic';
import { MapPin, Users, AlertTriangle, Filter, Search } from 'lucide-react';

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import('../../components/MapComponent'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">Loading map...</div>
});

interface Tourist {
  id: string;
  name: string;
  location: [number, number];
  status: 'safe' | 'warning' | 'danger' | 'inactive';
  lastSeen: string;
  safetyScore: number;
  emergencyContacts: string[];
}

export default function TouristMap() {
  const [tourists, setTourists] = useState<Tourist[]>([]);
  const [filteredTourists, setFilteredTourists] = useState<Tourist[]>([]);
  const [selectedTourist, setSelectedTourist] = useState<Tourist | null>(null);
  const [filters, setFilters] = useState({
    status: 'all',
    search: ''
  });

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockTourists: Tourist[] = [
      {
        id: '1',
        name: 'John Doe',
        location: [27.1751, 78.0421], // Agra, India
        status: 'safe',
        lastSeen: '2 minutes ago',
        safetyScore: 8.5,
        emergencyContacts: ['+91-9876543210', '+91-9876543211']
      },
      {
        id: '2',
        name: 'Sarah Wilson',
        location: [26.1445, 91.7362], // Guwahati, Assam
        status: 'warning',
        lastSeen: '5 minutes ago',
        safetyScore: 6.2,
        emergencyContacts: ['+91-9876543212']
      },
      {
        id: '3',
        name: 'Mike Johnson',
        location: [25.5941, 85.1376], // Patna, Bihar
        status: 'danger',
        lastSeen: '15 minutes ago',
        safetyScore: 3.1,
        emergencyContacts: ['+91-9876543213', '+91-9876543214']
      },
      {
        id: '4',
        name: 'Emma Davis',
        location: [23.0225, 72.5714], // Ahmedabad, Gujarat
        status: 'inactive',
        lastSeen: '2 hours ago',
        safetyScore: 7.8,
        emergencyContacts: ['+91-9876543215']
      },
      {
        id: '5',
        name: 'Raj Patel',
        location: [26.2006, 92.9376], // Tezpur, Assam
        status: 'safe',
        lastSeen: '1 minute ago',
        safetyScore: 9.1,
        emergencyContacts: ['+91-9876543216']
      }
    ];
    
    setTourists(mockTourists);
    setFilteredTourists(mockTourists);
  }, []);

  // Filter tourists based on search and status
  useEffect(() => {
    let filtered = tourists;
    
    if (filters.status !== 'all') {
      filtered = filtered.filter(tourist => tourist.status === filters.status);
    }
    
    if (filters.search) {
      filtered = filtered.filter(tourist => 
        tourist.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    setFilteredTourists(filtered);
  }, [filters, tourists]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'danger': return 'text-red-600 bg-red-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusCount = (status: string) => {
    return tourists.filter(t => t.status === status).length;
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tourist Map</h1>
          <p className="text-gray-600 mt-2">Real-time location tracking and monitoring</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total Tourists</p>
                <p className="text-2xl font-bold text-gray-900">{tourists.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-green-600"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Safe</p>
                <p className="text-2xl font-bold text-green-600">{getStatusCount('safe')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-yellow-600"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Warning</p>
                <p className="text-2xl font-bold text-yellow-600">{getStatusCount('warning')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Danger</p>
                <p className="text-2xl font-bold text-red-600">{getStatusCount('danger')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters and Tourist List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Tourists</h3>
              </div>
              
              {/* Search and Filters */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tourists..."
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent "
                  />
                </div>
                
                <div className="flex items-center">
                  <Filter className="h-4 w-4 text-gray-400 mr-2" />
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="safe">Safe</option>
                    <option value="warning">Warning</option>
                    <option value="danger">Danger</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Tourist List */}
              <div className="max-h-96 overflow-y-auto">
                {filteredTourists.map((tourist) => (
                  <div
                    key={tourist.id}
                    onClick={() => setSelectedTourist(tourist)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                      selectedTourist?.id === tourist.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{tourist.name}</p>
                        <p className="text-sm text-gray-500">{tourist.lastSeen}</p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tourist.status)}`}>
                        {tourist.status}
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Safety Score: {tourist.safetyScore}/10</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Interactive Map</h3>
                <p className="text-sm text-gray-600">Click on markers to view tourist details</p>
              </div>
              <div className="h-96">
                <MapComponent 
                  tourists={filteredTourists}
                  selectedTourist={selectedTourist}
                  onTouristSelect={setSelectedTourist}
                />
              </div>
            </div>

            {/* Tourist Details Panel */}
            {selectedTourist && (
              <div className="mt-6 bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Tourist Details</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Basic Information</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Name</p>
                          <p className="font-medium">{selectedTourist.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Status</p>
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTourist.status)}`}>
                            {selectedTourist.status}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Safety Score</p>
                          <p className="font-medium">{selectedTourist.safetyScore}/10</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Last Seen</p>
                          <p className="font-medium">{selectedTourist.lastSeen}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Emergency Contacts</h4>
                      <div className="space-y-2">
                        {selectedTourist.emergencyContacts.map((contact, index) => (
                          <div key={index} className="flex items-center">
                            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm">{contact}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 space-y-2">
                        <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                          Send Emergency Alert
                        </button>
                        <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          View Timeline
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
