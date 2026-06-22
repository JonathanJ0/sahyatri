'use client';

import { useState } from 'react';
import Layout from '../../components/Layout';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  MapPin, 
  Calendar,
  Download,
  Filter
} from 'lucide-react';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');

  // Mock data for charts
  const touristFlowData = [
    { name: 'Jan', tourists: 1200, alerts: 15 },
    { name: 'Feb', tourists: 1900, alerts: 23 },
    { name: 'Mar', tourists: 3000, alerts: 45 },
    { name: 'Apr', tourists: 2780, alerts: 38 },
    { name: 'May', tourists: 1890, alerts: 25 },
    { name: 'Jun', tourists: 2390, alerts: 32 },
  ];

  const safetyScoreData = [
    { name: 'Week 1', score: 8.2 },
    { name: 'Week 2', score: 8.5 },
    { name: 'Week 3', score: 8.1 },
    { name: 'Week 4', score: 8.8 },
    { name: 'Week 5', score: 8.9 },
    { name: 'Week 6', score: 8.7 },
  ];

  const alertTypesData = [
    { name: 'SOS Alerts', value: 35, color: '#EF4444' },
    { name: 'Zone Violations', value: 28, color: '#F59E0B' },
    { name: 'Anomalies', value: 42, color: '#3B82F6' },
    { name: 'Panic Buttons', value: 15, color: '#8B5CF6' },
  ];

  const zoneRiskData = [
    { name: 'High Risk Zones', alerts: 45, tourists: 120 },
    { name: 'Medium Risk Zones', alerts: 28, tourists: 340 },
    { name: 'Low Risk Zones', alerts: 8, tourists: 890 },
  ];

  const hourlyActivityData = [
    { hour: '00:00', tourists: 45, alerts: 2 },
    { hour: '02:00', tourists: 32, alerts: 1 },
    { hour: '04:00', tourists: 28, alerts: 0 },
    { hour: '06:00', tourists: 56, alerts: 1 },
    { hour: '08:00', tourists: 234, alerts: 3 },
    { hour: '10:00', tourists: 456, alerts: 5 },
    { hour: '12:00', tourists: 567, alerts: 8 },
    { hour: '14:00', tourists: 623, alerts: 12 },
    { hour: '16:00', tourists: 589, alerts: 9 },
    { hour: '18:00', tourists: 445, alerts: 6 },
    { hour: '20:00', tourists: 234, alerts: 4 },
    { hour: '22:00', tourists: 123, alerts: 2 },
  ];

  const topLocationsData = [
    { location: 'Taj Mahal', tourists: 456, alerts: 3, risk: 'Low' },
    { location: 'Cave Complex', tourists: 234, alerts: 12, risk: 'High' },
    { location: 'Forest Trail', tourists: 189, alerts: 8, risk: 'Medium' },
    { location: 'Mountain Peak', tourists: 123, alerts: 5, risk: 'Medium' },
    { location: 'Lake Area', tourists: 345, alerts: 2, risk: 'Low' },
  ];

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-2">Tourist safety insights and trends</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Tourists</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
                <p className="text-sm text-green-600">+12% from last week</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Alerts</p>
                <p className="text-2xl font-bold text-gray-900">89</p>
                <p className="text-sm text-red-600">-8% from last week</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Safety Score</p>
                <p className="text-2xl font-bold text-gray-900">8.7/10</p>
                <p className="text-sm text-green-600">+0.3 from last week</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Zones</p>
                <p className="text-2xl font-bold text-gray-900">25</p>
                <p className="text-sm text-gray-600">3 high risk</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Tourist Flow & Alerts */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Tourist Flow vs Alerts</h3>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={touristFlowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tourists" fill="#3B82F6" name="Tourists" />
                <Bar dataKey="alerts" fill="#EF4444" name="Alerts" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Safety Score Trend */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Safety Score Trend</h3>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={safetyScoreData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[7, 10]} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#10B981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Alert Types Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Alert Types Distribution</h3>
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={alertTypesData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {alertTypesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Zone Risk Analysis */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Zone Risk Analysis</h3>
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={zoneRiskData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="alerts" stackId="1" stroke="#EF4444" fill="#EF4444" />
                <Area type="monotone" dataKey="tourists" stackId="2" stroke="#3B82F6" fill="#3B82F6" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hourly Activity & Top Locations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Hourly Activity */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Hourly Activity Pattern</h3>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hourlyActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="tourists" stroke="#3B82F6" name="Tourists" />
                <Line type="monotone" dataKey="alerts" stroke="#EF4444" name="Alerts" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Locations */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Top Tourist Locations</h3>
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {topLocationsData.map((location, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{location.location}</p>
                    <p className="text-sm text-gray-600">{location.tourists} tourists • {location.alerts} alerts</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      location.risk === 'High' ? 'bg-red-100 text-red-800' :
                      location.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {location.risk} Risk
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Insights */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Key Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Positive Trends</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Safety score improved by 0.3 points</li>
                <li>• Alert response time reduced by 15%</li>
                <li>• Tourist satisfaction increased to 92%</li>
              </ul>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">Areas of Concern</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Cave Complex showing high alert frequency</li>
                <li>• Peak hours (2-4 PM) have higher incidents</li>
                <li>• Weekend activities need monitoring</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Recommendations</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Increase patrols in Cave Complex</li>
                <li>• Implement additional safety measures</li>
                <li>• Enhance communication during peak hours</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
