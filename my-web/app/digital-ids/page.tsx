'use client';

import { useState } from 'react';
import Layout from '../../components/Layout';
import { 
  UserCheck, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  Shield,
  Phone,
  Mail,
  Calendar,
  MapPin,
  AlertTriangle
} from 'lucide-react';

interface DigitalID {
  id: string;
  touristId: string;
  name: string;
  passportNumber: string;
  nationality: string;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'suspended' | 'pending';
  verificationLevel: 'basic' | 'enhanced' | 'premium';
  emergencyContacts: string[];
  tripItinerary: string[];
  kycStatus: 'verified' | 'pending' | 'failed';
  lastLocation: [number, number];
  createdAt: string;
  issuedBy: string;
}

export default function DigitalIDsPage() {
  const [ids, setIds] = useState<DigitalID[]>([
    {
      id: 'DID-001',
      touristId: 'T-001',
      name: 'John Doe',
      passportNumber: 'A12345678',
      nationality: 'USA',
      issueDate: '2024-01-10',
      expiryDate: '2024-02-10',
      status: 'active',
      verificationLevel: 'enhanced',
      emergencyContacts: ['+91-9876543210', '+91-9876543211'],
      tripItinerary: ['Agra', 'Delhi', 'Jaipur'],
      kycStatus: 'verified',
      lastLocation: [27.1751, 78.0421],
      createdAt: '2024-01-10 09:30:00',
      issuedBy: 'Delhi Airport'
    },
    {
      id: 'DID-002',
      touristId: 'T-002',
      name: 'Sarah Wilson',
      passportNumber: 'B87654321',
      nationality: 'UK',
      issueDate: '2024-01-12',
      expiryDate: '2024-02-12',
      status: 'active',
      verificationLevel: 'premium',
      emergencyContacts: ['+91-9876543212'],
      tripItinerary: ['Guwahati', 'Shillong', 'Cherrapunji'],
      kycStatus: 'verified',
      lastLocation: [26.1445, 91.7362],
      createdAt: '2024-01-12 14:15:00',
      issuedBy: 'Guwahati Airport'
    },
    {
      id: 'DID-003',
      touristId: 'T-003',
      name: 'Mike Johnson',
      passportNumber: 'C11223344',
      nationality: 'Canada',
      issueDate: '2024-01-08',
      expiryDate: '2024-02-08',
      status: 'suspended',
      verificationLevel: 'basic',
      emergencyContacts: ['+91-9876543213', '+91-9876543214'],
      tripItinerary: ['Patna', 'Bodh Gaya'],
      kycStatus: 'pending',
      lastLocation: [25.5941, 85.1376],
      createdAt: '2024-01-08 11:20:00',
      issuedBy: 'Patna Airport'
    },
    {
      id: 'DID-004',
      touristId: 'T-004',
      name: 'Emma Davis',
      passportNumber: 'D55667788',
      nationality: 'Australia',
      issueDate: '2024-01-05',
      expiryDate: '2024-02-05',
      status: 'expired',
      verificationLevel: 'enhanced',
      emergencyContacts: ['+91-9876543215'],
      tripItinerary: ['Ahmedabad', 'Gandhinagar'],
      kycStatus: 'verified',
      lastLocation: [23.0225, 72.5714],
      createdAt: '2024-01-05 16:45:00',
      issuedBy: 'Ahmedabad Airport'
    }
  ]);

  const [selectedID, setSelectedID] = useState<DigitalID | null>(null);
  const [filters, setFilters] = useState({
    status: 'all',
    verificationLevel: 'all',
    kycStatus: 'all',
    search: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      case 'suspended': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getKYCStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVerificationLevelColor = (level: string) => {
    switch (level) {
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'enhanced': return 'bg-blue-100 text-blue-800';
      case 'basic': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const updateIDStatus = (id: string, newStatus: string) => {
    setIds(ids.map(idItem => 
      idItem.id === id 
        ? { ...idItem, status: newStatus as any }
        : idItem
    ));
  };

  const filteredIDs = ids.filter(id => {
    if (filters.status !== 'all' && id.status !== filters.status) return false;
    if (filters.verificationLevel !== 'all' && id.verificationLevel !== filters.verificationLevel) return false;
    if (filters.kycStatus !== 'all' && id.kycStatus !== filters.kycStatus) return false;
    if (filters.search && !id.name.toLowerCase().includes(filters.search.toLowerCase()) && 
        !id.passportNumber.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Digital ID Management</h1>
          <p className="text-gray-600 mt-2">Blockchain-based tourist identity verification and management</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total IDs</p>
                <p className="text-2xl font-bold text-gray-900">{ids.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Active IDs</p>
                <p className="text-2xl font-bold text-green-600">
                  {ids.filter(id => id.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Verified KYC</p>
                <p className="text-2xl font-bold text-purple-600">
                  {ids.filter(id => id.kycStatus === 'verified').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Expired IDs</p>
                <p className="text-2xl font-bold text-red-600">
                  {ids.filter(id => id.status === 'expired').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* IDs List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Digital IDs</h3>
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
                      placeholder="Search by name or passport..."
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
                    <option value="expired">Expired</option>
                    <option value="suspended">Suspended</option>
                    <option value="pending">Pending</option>
                  </select>
                  
                  <select
                    value={filters.verificationLevel}
                    onChange={(e) => setFilters({...filters, verificationLevel: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Levels</option>
                    <option value="basic">Basic</option>
                    <option value="enhanced">Enhanced</option>
                    <option value="premium">Premium</option>
                  </select>
                  
                  <select
                    value={filters.kycStatus}
                    onChange={(e) => setFilters({...filters, kycStatus: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All KYC</option>
                    <option value="verified">Verified</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>

              {/* IDs List */}
              <div className="divide-y divide-gray-200">
                {filteredIDs.map((id) => (
                  <div
                    key={id.id}
                    onClick={() => setSelectedID(id)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${
                      selectedID?.id === id.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <UserCheck className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-gray-900">{id.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(id.status)}`}>
                              {id.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Passport: {id.passportNumber}</p>
                          <p className="text-sm text-gray-600">Nationality: {id.nationality}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVerificationLevelColor(id.verificationLevel)}`}>
                              {id.verificationLevel}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getKYCStatusColor(id.kycStatus)}`}>
                              KYC: {id.kycStatus}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        {id.status === 'active' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateIDStatus(id.id, 'suspended');
                            }}
                            className="bg-yellow-600 text-white px-3 py-1 rounded text-xs hover:bg-yellow-700 transition-colors"
                          >
                            Suspend
                          </button>
                        )}
                        {id.status === 'suspended' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateIDStatus(id.id, 'active');
                            }}
                            className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                          >
                            Activate
                          </button>
                        )}
                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
                          <Eye className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ID Details */}
          <div className="lg:col-span-1">
            {selectedID ? (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">ID Details</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Personal Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Name:</span>
                          <span className="text-sm font-medium">{selectedID.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Passport:</span>
                          <span className="text-sm font-medium">{selectedID.passportNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Nationality:</span>
                          <span className="text-sm font-medium">{selectedID.nationality}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">ID Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">ID Number:</span>
                          <span className="text-sm font-medium">{selectedID.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedID.status)}`}>
                            {selectedID.status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Verification Level:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVerificationLevelColor(selectedID.verificationLevel)}`}>
                            {selectedID.verificationLevel}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">KYC Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getKYCStatusColor(selectedID.kycStatus)}`}>
                            {selectedID.kycStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Validity Period</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Issued:</span>
                          <span className="text-sm font-medium">{selectedID.issueDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Expires:</span>
                          <span className="text-sm font-medium">{selectedID.expiryDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Issued By:</span>
                          <span className="text-sm font-medium">{selectedID.issuedBy}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Emergency Contacts</h4>
                      <div className="space-y-1">
                        {selectedID.emergencyContacts.map((contact, index) => (
                          <div key={index} className="flex items-center">
                            <Phone className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm">{contact}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Trip Itinerary</h4>
                      <div className="space-y-1">
                        {selectedID.tripItinerary.map((location, index) => (
                          <div key={index} className="flex items-center">
                            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm">{location}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2 pt-4">
                      <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        View Blockchain Record
                      </button>
                      <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Verify Identity
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
                <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Select a Digital ID to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
