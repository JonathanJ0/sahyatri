import Layout from '../components/Layout';
import { Users, AlertTriangle, Clock, Shield, TrendingUp, MapPin } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      name: 'Total Tourists',
      value: '1,247',
      change: '+12%',
      changeType: 'increase',
      icon: Users,
      color: 'blue'
    },
    {
      name: 'Active Alerts',
      value: '3',
      change: '-2',
      changeType: 'decrease',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      name: 'Inactive Tourists',
      value: '23',
      change: '+5%',
      changeType: 'increase',
      icon: Clock,
      color: 'yellow'
    },
    {
      name: 'Safety Score',
      value: '8.7/10',
      change: '+0.3',
      changeType: 'increase',
      icon: Shield,
      color: 'green'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'alert',
      message: 'Tourist John Doe entered high-risk zone near Cave 3',
      time: '2 minutes ago',
      severity: 'high'
    },
    {
      id: 2,
      type: 'sos',
      message: 'SOS activated by Sarah Wilson in Forest Area',
      time: '15 minutes ago',
      severity: 'critical'
    },
    {
      id: 3,
      type: 'checkin',
      message: 'Digital ID verified for 25 new tourists at Airport',
      time: '1 hour ago',
      severity: 'low'
    },
    {
      id: 4,
      type: 'anomaly',
      message: 'Unusual movement pattern detected for Mike Johnson',
      time: '2 hours ago',
      severity: 'medium'
    }
  ];

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tourist Safety Dashboard</h1>
          <p className="text-gray-600 mt-2">Real-time monitoring and incident response system</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                    <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className={`h-4 w-4 ${
                    stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                  }`} />
                  <span className={`text-sm font-medium ml-1 ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last hour</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="px-6 py-4">
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                        activity.severity === 'critical' ? 'bg-red-500' :
                        activity.severity === 'high' ? 'bg-orange-500' :
                        activity.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <div className="ml-4 flex-1">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6 space-y-4">
                <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  View Emergency Alerts
                </button>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Generate E-FIR
                </button>
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Verify Digital ID
                </button>
                <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Export Reports
                </button>
              </div>
            </div>

            {/* Safety Zones */}
            <div className="bg-white rounded-lg shadow mt-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Safety Zones</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-sm text-gray-900">High Risk Zones</span>
                    </div>
                    <span className="text-sm font-medium text-red-600">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-yellow-500 mr-2" />
                      <span className="text-sm text-gray-900">Medium Risk Zones</span>
                    </div>
                    <span className="text-sm font-medium text-yellow-600">7</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-900">Safe Zones</span>
                    </div>
                    <span className="text-sm font-medium text-green-600">15</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
