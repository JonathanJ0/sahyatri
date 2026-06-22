'use client';

import { useState } from 'react';
import Layout from '../../components/Layout';
import { 
  Clock, 
  MapPin, 
  Search, 
  Filter, 
  User, 
  Calendar,
  Navigation,
  AlertTriangle,
  CheckCircle,
  Phone,
  Download
} from 'lucide-react';

interface TimelineEvent {
  id: string;
  touristId: string;
  touristName: string;
  timestamp: string;
  location: [number, number];
  locationName: string;
  eventType: 'checkin' | 'checkout' | 'movement' | 'alert' | 'sos' | 'anomaly';
  description: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  metadata?: {
    speed?: number;
    direction?: string;
    duration?: string;
    distance?: number;
  };
}

export default function TimelinePage() {
  const [selectedTourist, setSelectedTourist] = useState<string>('');
  const [timeRange, setTimeRange] = useState('24h');
  const [eventType, setEventType] = useState('all');

  const tourists = [
    { id: 'T-001', name: 'John Doe', status: 'active' },
    { id: 'T-002', name: 'Sarah Wilson', status: 'active' },
    { id: 'T-003', name: 'Mike Johnson', status: 'warning' },
    { id: 'T-004', name: 'Emma Davis', status: 'inactive' },
    { id: 'T-005', name: 'Raj Patel', status: 'active' },
  ];

  const timelineEvents: TimelineEvent[] = [
    {
      id: 'E-001',
      touristId: 'T-001',
      touristName: 'John Doe',
      timestamp: '2024-01-15 14:30:25',
      location: [27.1751, 78.0421],
      locationName: 'Taj Mahal, Agra',
      eventType: 'alert',
      description: 'Entered high-risk zone near Cave 3',
      severity: 'high',
      metadata: {
        speed: 5.2,
        direction: 'North',
        duration: '15 minutes'
      }
    },
    {
      id: 'E-002',
      touristId: 'T-001',
      touristName: 'John Doe',
      timestamp: '2024-01-15 14:15:10',
      location: [27.1748, 78.0425],
      locationName: 'Taj Mahal Complex',
      eventType: 'checkin',
      description: 'Checked in at Taj Mahal entrance',
      severity: 'low',
      metadata: {
        duration: '2 hours'
      }
    },
    {
      id: 'E-003',
      touristId: 'T-002',
      touristName: 'Sarah Wilson',
      timestamp: '2024-01-15 14:25:30',
      location: [26.1445, 91.7362],
      locationName: 'Guwahati City Center',
      eventType: 'sos',
      description: 'SOS button activated in forest area',
      severity: 'critical',
      metadata: {
        duration: '30 minutes'
      }
    },
    {
      id: 'E-004',
      touristId: 'T-002',
      touristName: 'Sarah Wilson',
      timestamp: '2024-01-15 13:45:15',
      location: [26.1440, 91.7365],
      locationName: 'Forest Trail Entrance',
      eventType: 'checkin',
      description: 'Started forest trail hike',
      severity: 'low',
      metadata: {
        duration: '40 minutes'
      }
    },
    {
      id: 'E-005',
      touristId: 'T-003',
      touristName: 'Mike Johnson',
      timestamp: '2024-01-15 12:30:45',
      location: [25.5941, 85.1376],
      locationName: 'Patna Railway Station',
      eventType: 'anomaly',
      description: 'Unusual movement pattern detected - deviated from planned route',
      severity: 'medium',
      metadata: {
        speed: 8.5,
        direction: 'East',
        distance: 15.2
      }
    },
    {
      id: 'E-006',
      touristId: 'T-004',
      touristName: 'Emma Davis',
      timestamp: '2024-01-15 10:20:30',
      location: [23.0225, 72.5714],
      locationName: 'Ahmedabad Hotel',
      eventType: 'checkout',
      description: 'Checked out from hotel',
      severity: 'low'
    },
    {
      id: 'E-007',
      touristId: 'T-005',
      touristName: 'Raj Patel',
      timestamp: '2024-01-15 09:15:20',
      location: [26.2006, 92.9376],
      locationName: 'Tezpur Market',
      eventType: 'movement',
      description: 'Regular movement in market area',
      severity: 'low',
      metadata: {
        speed: 3.2,
        direction: 'South'
      }
    }
  ];

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'checkin': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'checkout': return <CheckCircle className="h-5 w-5 text-blue-600" />;
      case 'movement': return <Navigation className="h-5 w-5 text-gray-600" />;
      case 'alert': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'sos': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'anomaly': return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      default: return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredEvents = timelineEvents.filter(event => {
    if (selectedTourist && event.touristId !== selectedTourist) return false;
    if (eventType !== 'all' && event.eventType !== eventType) return false;
    return true;
  });

  const groupedEvents = filteredEvents.reduce((groups, event) => {
    const date = event.timestamp.split(' ')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(event);
    return groups;
  }, {} as Record<string, TimelineEvent[]>);

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tourist Timeline</h1>
          <p className="text-gray-600 mt-2">Individual tourist location history and activity tracking</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Tourist</label>
              <select
                value={selectedTourist}
                onChange={(e) => setSelectedTourist(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Tourists</option>
                {tourists.map((tourist) => (
                  <option key={tourist.id} value={tourist.id}>
                    {tourist.name} ({tourist.status})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Events</option>
                <option value="checkin">Check-in</option>
                <option value="checkout">Check-out</option>
                <option value="movement">Movement</option>
                <option value="alert">Alert</option>
                <option value="sos">SOS</option>
                <option value="anomaly">Anomaly</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Activity Timeline</h3>
            <p className="text-sm text-gray-600">Showing {filteredEvents.length} events</p>
          </div>
          
          <div className="p-6">
            {Object.keys(groupedEvents).length === 0 ? (
              <div className="text-center py-12">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No events found for the selected criteria</p>
              </div>
            ) : (
              <div className="space-y-8">
                {Object.entries(groupedEvents).map(([date, events]) => (
                  <div key={date}>
                    <div className="flex items-center mb-4">
                      <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                      <h4 className="text-lg font-medium text-gray-900">{date}</h4>
                      <span className="ml-2 text-sm text-gray-500">({events.length} events)</span>
                    </div>
                    
                    <div className="relative">
                      {/* Timeline line */}
                      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                      
                      <div className="space-y-6">
                        {events.map((event, index) => (
                          <div key={event.id} className="relative flex items-start">
                            {/* Timeline dot */}
                            <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center">
                              {getEventIcon(event.eventType)}
                            </div>
                            
                            {/* Event content */}
                            <div className="ml-6 flex-1">
                              <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <h5 className="font-medium text-gray-900">{event.touristName}</h5>
                                      <span className="text-sm text-gray-500">•</span>
                                      <span className="text-sm text-gray-500">{event.timestamp.split(' ')[1]}</span>
                                      {event.severity && (
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(event.severity)}`}>
                                          {event.severity}
                                        </span>
                                      )}
                                    </div>
                                    
                                    <div className="flex items-center text-sm text-gray-600 mb-2">
                                      <MapPin className="h-4 w-4 mr-1" />
                                      <span>{event.locationName}</span>
                                      <span className="mx-2">•</span>
                                      <span>{event.location[0].toFixed(4)}, {event.location[1].toFixed(4)}</span>
                                    </div>
                                    
                                    <p className="text-gray-700 mb-3">{event.description}</p>
                                    
                                    {event.metadata && (
                                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                        {event.metadata.speed && (
                                          <div>
                                            <span className="text-gray-500">Speed:</span>
                                            <span className="ml-1 font-medium">{event.metadata.speed} km/h</span>
                                          </div>
                                        )}
                                        {event.metadata.direction && (
                                          <div>
                                            <span className="text-gray-500">Direction:</span>
                                            <span className="ml-1 font-medium">{event.metadata.direction}</span>
                                          </div>
                                        )}
                                        {event.metadata.duration && (
                                          <div>
                                            <span className="text-gray-500">Duration:</span>
                                            <span className="ml-1 font-medium">{event.metadata.duration}</span>
                                          </div>
                                        )}
                                        {event.metadata.distance && (
                                          <div>
                                            <span className="text-gray-500">Distance:</span>
                                            <span className="ml-1 font-medium">{event.metadata.distance} km</span>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="flex space-x-2 ml-4">
                                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
                                      View on Map
                                    </button>
                                    {event.eventType === 'sos' && (
                                      <button className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors">
                                        Emergency Response
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
