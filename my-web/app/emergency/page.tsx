'use client';

import { useState } from 'react';
import Layout from '../../components/Layout';
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Clock, 
  User, 
  CheckCircle, 
  XCircle, 
  Send,
  Download,
  Filter,
  Search
} from 'lucide-react';

interface EmergencyAlert {
  id: string;
  type: 'sos' | 'panic' | 'zone_alert' | 'anomaly';
  touristId: string;
  touristName: string;
  location: [number, number];
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  emergencyContacts: string[];
  assignedOfficer?: string;
  notes?: string;
}

export default function EmergencyPage() {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([
    {
      id: '1',
      type: 'sos',
      touristId: '3',
      touristName: 'Mike Johnson',
      location: [25.5941, 85.1376],
      timestamp: '2024-01-15 14:30:25',
      status: 'active',
      severity: 'critical',
      description: 'SOS button activated in forest area. Tourist may be in distress.',
      emergencyContacts: ['+91-9876543213', '+91-9876543214'],
      assignedOfficer: 'Officer Rajesh Kumar'
    },
    {
      id: '2',
      type: 'zone_alert',
      touristId: '1',
      touristName: 'John Doe',
      location: [27.1751, 78.0421],
      timestamp: '2024-01-15 14:25:10',
      status: 'acknowledged',
      severity: 'high',
      description: 'Tourist entered high-risk zone near Cave 3. Restricted area violation.',
      emergencyContacts: ['+91-9876543210', '+91-9876543211'],
      assignedOfficer: 'Officer Priya Singh'
    },
    {
      id: '3',
      type: 'anomaly',
      touristId: '4',
      touristName: 'Emma Davis',
      location: [23.0225, 72.5714],
      timestamp: '2024-01-15 13:45:30',
      status: 'resolved',
      severity: 'medium',
      description: 'Unusual movement pattern detected. Tourist deviated from planned route.',
      emergencyContacts: ['+91-9876543215'],
      assignedOfficer: 'Officer Amit Patel'
    },
    {
      id: '4',
      type: 'panic',
      touristId: '5',
      touristName: 'Raj Patel',
      location: [26.2006, 92.9376],
      timestamp: '2024-01-15 12:15:45',
      status: 'acknowledged',
      severity: 'high',
      description: 'Panic button activated. Tourist reported feeling unsafe in current location.',
      emergencyContacts: ['+91-9876543216']
    }
  ]);

  const [selectedAlert, setSelectedAlert] = useState<EmergencyAlert | null>(null);
  const [filters, setFilters] = useState({
    status: 'all',
    severity: 'all',
    type: 'all',
    search: ''
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'acknowledged': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sos': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'panic': return <Phone className="h-5 w-5 text-orange-600" />;
      case 'zone_alert': return <MapPin className="h-5 w-5 text-yellow-600" />;
      case 'anomaly': return <User className="h-5 w-5 text-blue-600" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-600" />;
    }
  };

  const updateAlertStatus = (alertId: string, newStatus: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: newStatus as any }
        : alert
    ));
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filters.status !== 'all' && alert.status !== filters.status) return false;
    if (filters.severity !== 'all' && alert.severity !== filters.severity) return false;
    if (filters.type !== 'all' && alert.type !== filters.type) return false;
    if (filters.search && !alert.touristName.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Emergency Alerts</h1>
          <p className="text-gray-600 mt-2">Real-time emergency monitoring and incident response</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                <p className="text-2xl font-bold text-red-600">
                  {alerts.filter(a => a.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Acknowledged</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {alerts.filter(a => a.status === 'acknowledged').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-green-600">
                  {alerts.filter(a => a.status === 'resolved').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Phone className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total Today</p>
                <p className="text-2xl font-bold text-blue-600">{alerts.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alerts List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Emergency Alerts</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                    <option value="acknowledged">Acknowledged</option>
                    <option value="resolved">Resolved</option>
                  </select>
                  
                  <select
                    value={filters.severity}
                    onChange={(e) => setFilters({...filters, severity: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Severity</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="sos">SOS</option>
                    <option value="panic">Panic</option>
                    <option value="zone_alert">Zone Alert</option>
                    <option value="anomaly">Anomaly</option>
                  </select>
                </div>
              </div>

              {/* Alerts List */}
              <div className="divide-y divide-gray-200">
                {filteredAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    onClick={() => setSelectedAlert(alert)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${
                      selectedAlert?.id === alert.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          {getTypeIcon(alert.type)}
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-gray-900">{alert.touristName}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                              {alert.severity}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                              {alert.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        {alert.status === 'active' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateAlertStatus(alert.id, 'acknowledged');
                            }}
                            className="bg-yellow-600 text-white px-3 py-1 rounded text-xs hover:bg-yellow-700 transition-colors"
                          >
                            Acknowledge
                          </button>
                        )}
                        {alert.status === 'acknowledged' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateAlertStatus(alert.id, 'resolved');
                            }}
                            className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                          >
                            Resolve
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alert Details */}
          <div className="lg:col-span-1">
            {selectedAlert ? (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Alert Details</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Tourist Information</h4>
                      <p className="text-sm text-gray-600">Name: {selectedAlert.touristName}</p>
                      <p className="text-sm text-gray-600">ID: {selectedAlert.touristId}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Alert Details</h4>
                      <p className="text-sm text-gray-600">Type: {selectedAlert.type.replace('_', ' ').toUpperCase()}</p>
                      <p className="text-sm text-gray-600">Severity: {selectedAlert.severity}</p>
                      <p className="text-sm text-gray-600">Status: {selectedAlert.status}</p>
                      <p className="text-sm text-gray-600">Time: {selectedAlert.timestamp}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Location</h4>
                      <p className="text-sm text-gray-600">
                        {selectedAlert.location[0].toFixed(4)}, {selectedAlert.location[1].toFixed(4)}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Emergency Contacts</h4>
                      <div className="space-y-1">
                        {selectedAlert.emergencyContacts.map((contact, index) => (
                          <div key={index} className="flex items-center">
                            <Phone className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm">{contact}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {selectedAlert.assignedOfficer && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Assigned Officer</h4>
                        <p className="text-sm text-gray-600">{selectedAlert.assignedOfficer}</p>
                      </div>
                    )}
                    
                    <div className="space-y-2 pt-4">
                      <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center">
                        <Send className="h-4 w-4 mr-2" />
                        Send Emergency Response
                      </button>
                      <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Generate E-FIR
                      </button>
                      <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Contact Tourist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Select an alert to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
