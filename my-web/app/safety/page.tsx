'use client';

import { useState } from 'react';
import Layout from '../../components/Layout';
import { 
  Shield, 
  MapPin, 
  AlertTriangle, 
  CheckCircle, 
  Settings, 
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Eye
} from 'lucide-react';

interface SafetyZone {
  id: string;
  name: string;
  type: 'high_risk' | 'medium_risk' | 'low_risk' | 'restricted' | 'safe';
  center: [number, number];
  radius: number; // in meters
  description: string;
  restrictions: string[];
  alertLevel: 'low' | 'medium' | 'high' | 'critical';
  touristCount: number;
  lastIncident?: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
}

export default function SafetyZonesPage() {
  const [zones, setZones] = useState<SafetyZone[]>([
    {
      id: 'SZ-001',
      name: 'Cave Complex 3',
      type: 'high_risk',
      center: [27.1751, 78.0421],
      radius: 500,
      description: 'Deep cave system with limited visibility and difficult terrain',
      restrictions: ['No entry after sunset', 'Guide required', 'Emergency equipment mandatory'],
      alertLevel: 'critical',
      touristCount: 12,
      lastIncident: '2024-01-15 14:30:25',
      isActive: true,
      createdBy: 'Safety Officer Rajesh',
      createdAt: '2024-01-10 09:00:00'
    },
    {
      id: 'SZ-002',
      name: 'Forest Trail Alpha',
      type: 'medium_risk',
      center: [26.1445, 91.7362],
      radius: 1000,
      description: 'Mountain forest trail with wildlife encounters possible',
      restrictions: ['Stay on marked paths', 'No solo hiking', 'Carry communication device'],
      alertLevel: 'high',
      touristCount: 8,
      lastIncident: '2024-01-15 13:45:30',
      isActive: true,
      createdBy: 'Forest Ranger Priya',
      createdAt: '2024-01-12 14:15:00'
    },
    {
      id: 'SZ-003',
      name: 'Lake Shore Area',
      type: 'low_risk',
      center: [23.0225, 72.5714],
      radius: 300,
      description: 'Popular recreational area with basic safety measures',
      restrictions: ['No swimming after dark', 'Life jackets recommended'],
      alertLevel: 'medium',
      touristCount: 45,
      isActive: true,
      createdBy: 'Lake Manager Amit',
      createdAt: '2024-01-08 11:20:00'
    },
    {
      id: 'SZ-004',
      name: 'Military Restricted Zone',
      type: 'restricted',
      center: [25.5941, 85.1376],
      radius: 2000,
      description: 'Government restricted area - no civilian access',
      restrictions: ['No entry permitted', 'Immediate alert if breached'],
      alertLevel: 'critical',
      touristCount: 0,
      lastIncident: '2024-01-15 12:30:45',
      isActive: true,
      createdBy: 'Security Officer Kumar',
      createdAt: '2024-01-05 16:45:00'
    },
    {
      id: 'SZ-005',
      name: 'Visitor Center Plaza',
      type: 'safe',
      center: [26.2006, 92.9376],
      radius: 150,
      description: 'Main visitor area with full facilities and security',
      restrictions: [],
      alertLevel: 'low',
      touristCount: 120,
      isActive: true,
      createdBy: 'Visitor Manager Patel',
      createdAt: '2024-01-14 08:30:00'
    }
  ]);

  const [selectedZone, setSelectedZone] = useState<SafetyZone | null>(null);
  const [filters, setFilters] = useState({
    type: 'all',
    alertLevel: 'all',
    search: ''
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'high_risk': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium_risk': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low_risk': return 'bg-green-100 text-green-800 border-green-200';
      case 'restricted': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'safe': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'high_risk': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'medium_risk': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'low_risk': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'restricted': return <Shield className="h-5 w-5 text-purple-600" />;
      case 'safe': return <CheckCircle className="h-5 w-5 text-blue-600" />;
      default: return <MapPin className="h-5 w-5 text-gray-600" />;
    }
  };

  const toggleZoneStatus = (zoneId: string) => {
    setZones(zones.map(zone => 
      zone.id === zoneId 
        ? { ...zone, isActive: !zone.isActive }
        : zone
    ));
  };

  const filteredZones = zones.filter(zone => {
    if (filters.type !== 'all' && zone.type !== filters.type) return false;
    if (filters.alertLevel !== 'all' && zone.alertLevel !== filters.alertLevel) return false;
    if (filters.search && !zone.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Safety Zones Management</h1>
              <p className="text-gray-600 mt-2">Geofenced safety zones and risk area monitoring</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Add New Zone
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total Zones</p>
                <p className="text-2xl font-bold text-gray-900">{zones.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">High Risk</p>
                <p className="text-2xl font-bold text-red-600">
                  {zones.filter(z => z.type === 'high_risk').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Active Zones</p>
                <p className="text-2xl font-bold text-green-600">
                  {zones.filter(z => z.isActive).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Tourists in Zones</p>
                <p className="text-2xl font-bold text-purple-600">
                  {zones.reduce((sum, zone) => sum + zone.touristCount, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Zones List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Safety Zones</h3>
              </div>

              {/* Filters */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search zones..."
                      value={filters.search}
                      onChange={(e) => setFilters({...filters, search: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="high_risk">High Risk</option>
                    <option value="medium_risk">Medium Risk</option>
                    <option value="low_risk">Low Risk</option>
                    <option value="restricted">Restricted</option>
                    <option value="safe">Safe</option>
                  </select>
                  
                  <select
                    value={filters.alertLevel}
                    onChange={(e) => setFilters({...filters, alertLevel: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Alert Levels</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              {/* Zones List */}
              <div className="divide-y divide-gray-200">
                {filteredZones.map((zone) => (
                  <div
                    key={zone.id}
                    onClick={() => setSelectedZone(zone)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${
                      selectedZone?.id === zone.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          {getTypeIcon(zone.type)}
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-gray-900">{zone.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(zone.type)}`}>
                              {zone.type.replace('_', ' ')}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAlertLevelColor(zone.alertLevel)}`}>
                              {zone.alertLevel}
                            </span>
                            {!zone.isActive && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Inactive
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{zone.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span>Radius: {zone.radius}m</span>
                            <span>Tourists: {zone.touristCount}</span>
                            {zone.lastIncident && (
                              <span>Last Incident: {zone.lastIncident.split(' ')[0]}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleZoneStatus(zone.id);
                          }}
                          className={`px-3 py-1 rounded text-xs transition-colors ${
                            zone.isActive 
                              ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
                              : 'bg-green-600 text-white hover:bg-green-700'
                          }`}
                        >
                          {zone.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
                          <Eye className="h-3 w-3" />
                        </button>
                        <button className="bg-gray-600 text-white px-3 py-1 rounded text-xs hover:bg-gray-700 transition-colors">
                          <Edit className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Zone Details */}
          <div className="lg:col-span-1">
            {selectedZone ? (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Zone Details</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Basic Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Name:</span>
                          <span className="text-sm font-medium">{selectedZone.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Type:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedZone.type)}`}>
                            {selectedZone.type.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Alert Level:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAlertLevelColor(selectedZone.alertLevel)}`}>
                            {selectedZone.alertLevel}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            selectedZone.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {selectedZone.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Location & Coverage</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Center:</span>
                          <span className="text-sm font-medium">
                            {selectedZone.center[0].toFixed(4)}, {selectedZone.center[1].toFixed(4)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Radius:</span>
                          <span className="text-sm font-medium">{selectedZone.radius}m</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Tourists:</span>
                          <span className="text-sm font-medium">{selectedZone.touristCount}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                      <p className="text-sm text-gray-600">{selectedZone.description}</p>
                    </div>
                    
                    {selectedZone.restrictions.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Restrictions</h4>
                        <div className="space-y-1">
                          {selectedZone.restrictions.map((restriction, index) => (
                            <div key={index} className="flex items-start">
                              <AlertTriangle className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-600">{restriction}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedZone.lastIncident && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Last Incident</h4>
                        <p className="text-sm text-gray-600">{selectedZone.lastIncident}</p>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Management</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Created By:</span>
                          <span className="text-sm font-medium">{selectedZone.createdBy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Created:</span>
                          <span className="text-sm font-medium">{selectedZone.createdAt.split(' ')[0]}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 pt-4">
                      <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        View on Map
                      </button>
                      <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Manage Restrictions
                      </button>
                      <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                        View Incidents
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Select a safety zone to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
