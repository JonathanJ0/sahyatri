'use client';

import { useState } from 'react';
import Layout from '../../components/Layout';
import { 
  Users, 
  Search, 
  Filter, 
  Eye, 
  Phone, 
  MapPin, 
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Download,
  UserCheck
} from 'lucide-react';

interface Tourist {
  id: string;
  name: string;
  nationality: string;
  passportNumber: string;
  phoneNumber: string;
  email: string;
  status: 'active' | 'warning' | 'danger' | 'inactive';
  safetyScore: number;
  currentLocation: [number, number];
  locationName: string;
  lastSeen: string;
  emergencyContacts: string[];
  digitalIdStatus: 'active' | 'expired' | 'pending';
  checkInDate: string;
  checkOutDate?: string;
  tripItinerary: string[];
}

export default function TouristsPage() {
  const [tourists, setTourists] = useState<Tourist[]>([
    {
      id: 'T-001',
      name: 'John Doe',
      nationality: 'USA',
      passportNumber: 'A12345678',
      phoneNumber: '+1-555-0123',
      email: 'john.doe@email.com',
      status: 'active',
      safetyScore: 8.5,
      currentLocation: [27.1751, 78.0421],
      locationName: 'Taj Mahal, Agra',
      lastSeen: '2 minutes ago',
      emergencyContacts: ['+91-9876543210', '+91-9876543211'],
      digitalIdStatus: 'active',
      checkInDate: '2024-01-10',
      tripItinerary: ['Agra', 'Delhi', 'Jaipur']
    },
    {
      id: 'T-002',
      name: 'Sarah Wilson',
      nationality: 'UK',
      passportNumber: 'B87654321',
      phoneNumber: '+44-20-7946-0958',
      email: 'sarah.wilson@email.com',
      status: 'warning',
      safetyScore: 6.2,
      currentLocation: [26.1445, 91.7362],
      locationName: 'Guwahati, Assam',
      lastSeen: '5 minutes ago',
      emergencyContacts: ['+91-9876543212'],
      digitalIdStatus: 'active',
      checkInDate: '2024-01-12',
      tripItinerary: ['Guwahati', 'Shillong', 'Cherrapunji']
    },
    {
      id: 'T-003',
      name: 'Mike Johnson',
      nationality: 'Canada',
      passportNumber: 'C11223344',
      phoneNumber: '+1-416-555-0199',
      email: 'mike.johnson@email.com',
      status: 'danger',
      safetyScore: 3.1,
      currentLocation: [25.5941, 85.1376],
      locationName: 'Patna, Bihar',
      lastSeen: '15 minutes ago',
      emergencyContacts: ['+91-9876543213', '+91-9876543214'],
      digitalIdStatus: 'active',
      checkInDate: '2024-01-08',
      tripItinerary: ['Patna', 'Bodh Gaya']
    },
    {
      id: 'T-004',
      name: 'Emma Davis',
      nationality: 'Australia',
      passportNumber: 'D55667788',
      phoneNumber: '+61-2-9374-4000',
      email: 'emma.davis@email.com',
      status: 'inactive',
      safetyScore: 7.8,
      currentLocation: [23.0225, 72.5714],
      locationName: 'Ahmedabad, Gujarat',
      lastSeen: '2 hours ago',
      emergencyContacts: ['+91-9876543215'],
      digitalIdStatus: 'expired',
      checkInDate: '2024-01-05',
      checkOutDate: '2024-01-15',
      tripItinerary: ['Ahmedabad', 'Gandhinagar']
    },
    {
      id: 'T-005',
      name: 'Raj Patel',
      nationality: 'India',
      passportNumber: 'E99887766',
      phoneNumber: '+91-9876543216',
      email: 'raj.patel@email.com',
      status: 'active',
      safetyScore: 9.1,
      currentLocation: [26.2006, 92.9376],
      locationName: 'Tezpur, Assam',
      lastSeen: '1 minute ago',
      emergencyContacts: ['+91-9876543217'],
      digitalIdStatus: 'active',
      checkInDate: '2024-01-14',
      tripItinerary: ['Tezpur', 'Kaziranga']
    }
  ]);

  const [selectedTourist, setSelectedTourist] = useState<Tourist | null>(null);
  const [filters, setFilters] = useState({
    status: 'all',
    digitalIdStatus: 'all',
    search: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'danger': return 'bg-red-100 text-red-800 border-red-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDigitalIdStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSafetyScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    if (score >= 4) return 'text-orange-600';
    return 'text-red-600';
  };

  const filteredTourists = tourists.filter(tourist => {
    if (filters.status !== 'all' && tourist.status !== filters.status) return false;
    if (filters.digitalIdStatus !== 'all' && tourist.digitalIdStatus !== filters.digitalIdStatus) return false;
    if (filters.search && !tourist.name.toLowerCase().includes(filters.search.toLowerCase()) && 
        !tourist.passportNumber.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tourists Management</h1>
          <p className="text-gray-600 mt-2">Comprehensive tourist information and monitoring</p>
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
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {tourists.filter(t => t.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Warning</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {tourists.filter(t => t.status === 'warning').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <XCircle className="h-8 w-8 text-red-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">In Danger</p>
                <p className="text-2xl font-bold text-red-600">
                  {tourists.filter(t => t.status === 'danger').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tourists List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Tourists List</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search tourists..."
                      value={filters.search}
                      onChange={(e) => setFilters({...filters, search: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="warning">Warning</option>
                    <option value="danger">Danger</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  
                  <select
                    value={filters.digitalIdStatus}
                    onChange={(e) => setFilters({...filters, digitalIdStatus: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All ID Status</option>
                    <option value="active">Active ID</option>
                    <option value="expired">Expired ID</option>
                    <option value="pending">Pending ID</option>
                  </select>
                </div>
              </div>

              {/* Tourists List */}
              <div className="divide-y divide-gray-200">
                {filteredTourists.map((tourist) => (
                  <div
                    key={tourist.id}
                    onClick={() => setSelectedTourist(tourist)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${
                      selectedTourist?.id === tourist.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <UserCheck className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-gray-900">{tourist.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(tourist.status)}`}>
                              {tourist.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{tourist.nationality} • {tourist.passportNumber}</p>
                          <p className="text-sm text-gray-600">{tourist.locationName}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className={`text-sm font-medium ${getSafetyScoreColor(tourist.safetyScore)}`}>
                              Safety: {tourist.safetyScore}/10
                            </span>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{tourist.lastSeen}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDigitalIdStatusColor(tourist.digitalIdStatus)}`}>
                              ID: {tourist.digitalIdStatus}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
                          <Eye className="h-3 w-3" />
                        </button>
                        <button className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors">
                          <Phone className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tourist Details */}
          <div className="lg:col-span-1">
            {selectedTourist ? (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Tourist Details</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Personal Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Name:</span>
                          <span className="text-sm font-medium">{selectedTourist.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Nationality:</span>
                          <span className="text-sm font-medium">{selectedTourist.nationality}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Passport:</span>
                          <span className="text-sm font-medium">{selectedTourist.passportNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Phone:</span>
                          <span className="text-sm font-medium">{selectedTourist.phoneNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Email:</span>
                          <span className="text-sm font-medium">{selectedTourist.email}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Status & Safety</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTourist.status)}`}>
                            {selectedTourist.status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Safety Score:</span>
                          <span className={`text-sm font-medium ${getSafetyScoreColor(selectedTourist.safetyScore)}`}>
                            {selectedTourist.safetyScore}/10
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Last Seen:</span>
                          <span className="text-sm font-medium">{selectedTourist.lastSeen}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Digital ID:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDigitalIdStatusColor(selectedTourist.digitalIdStatus)}`}>
                            {selectedTourist.digitalIdStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Location</h4>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{selectedTourist.locationName}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {selectedTourist.currentLocation[0].toFixed(4)}, {selectedTourist.currentLocation[1].toFixed(4)}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Emergency Contacts</h4>
                      <div className="space-y-1">
                        {selectedTourist.emergencyContacts.map((contact, index) => (
                          <div key={index} className="flex items-center">
                            <Phone className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm">{contact}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Trip Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Check-in:</span>
                          <span className="text-sm font-medium">{selectedTourist.checkInDate}</span>
                        </div>
                        {selectedTourist.checkOutDate && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Check-out:</span>
                            <span className="text-sm font-medium">{selectedTourist.checkOutDate}</span>
                          </div>
                        )}
                        <div>
                          <span className="text-sm text-gray-600">Itinerary:</span>
                          <div className="mt-1 space-y-1">
                            {selectedTourist.tripItinerary.map((location, index) => (
                              <div key={index} className="flex items-center">
                                <MapPin className="h-3 w-3 text-gray-400 mr-1" />
                                <span className="text-sm">{location}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 pt-4">
                      <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        View Timeline
                      </button>
                      <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Contact Tourist
                      </button>
                      <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                        Update Information
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Select a tourist to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
