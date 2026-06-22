import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import * as Location from 'expo-location';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { DangerZone, Location as LocationType } from '@/types';

export default function SafetyScreen() {
  const colorScheme = useColorScheme();
  // Dynamically require maps only on native to avoid web codegen errors
  let Maps: any = null;
  if (Platform.OS !== 'web') {
    try {
      Maps = require('react-native-maps');
    } catch (e) {
      Maps = null;
    }
  }
  const MapView = Maps ? (Maps.default as any) : null;
  const Marker = Maps ? (Maps.Marker as any) : null;
  const Circle = Maps ? (Maps.Circle as any) : null;
  const [currentLocation, setCurrentLocation] = useState<LocationType | null>(null);
  const [dangerZones, setDangerZones] = useState<DangerZone[]>([
    {
      id: '1',
      name: 'High Risk Area - Forest',
      coordinates: { latitude: 28.6139, longitude: 77.2090 },
      radius: 1000,
      riskLevel: 'high',
      description: 'Dense forest area with limited connectivity',
    },
    {
      id: '2',
      name: 'Restricted Zone - Government Area',
      coordinates: { latitude: 28.6140, longitude: 77.2100 },
      radius: 500,
      riskLevel: 'critical',
      description: 'Government restricted area',
    },
  ]);
  const [geoFencingEnabled, setGeoFencingEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required for safety monitoring.');
        return;
      }
      
      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timestamp: new Date(),
        accuracy: location.coords.accuracy ?? 0,
      });
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return Colors[colorScheme ?? 'light'].safe;
      case 'medium': return Colors[colorScheme ?? 'light'].medium;
      case 'high': return Colors[colorScheme ?? 'light'].danger;
      case 'critical': return Colors[colorScheme ?? 'light'].emergency;
      default: return Colors[colorScheme ?? 'light'].icon;
    }
  };

  const checkDangerZoneProximity = (location: LocationType) => {
    return dangerZones.some(zone => {
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        zone.coordinates.latitude,
        zone.coordinates.longitude
      );
      return distance <= zone.radius;
    });
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
            Safety Monitor
          </Text>
          <Text style={[styles.subtitle, { color: Colors[colorScheme ?? 'light'].icon }]}>
            Real-time safety monitoring and alerts
          </Text>
        </View>

        {/* Map View */}
        <View style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Safety Map
          </Text>
          <View style={styles.mapContainer}>
            {!MapView ? (
              <View style={[styles.map, { alignItems: 'center', justifyContent: 'center' }]}>
                <Text style={{ color: Colors[colorScheme ?? 'light'].icon }}>
                  Map preview is unavailable in this runtime. Use a development build with react-native-maps installed.
                </Text>
              </View>
            ) : (
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: currentLocation?.latitude || 28.6139,
                  longitude: currentLocation?.longitude || 77.2090,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                showsUserLocation={true}
                showsMyLocationButton={true}
              >
                {/* Current Location Marker */}
                {currentLocation && Marker && (
                  <Marker
                    coordinate={{
                      latitude: currentLocation.latitude,
                      longitude: currentLocation.longitude,
                    }}
                    title="Your Location"
                    description="Current position"
                  />
                )}

                {/* Danger Zone Markers and Circles */}
                {dangerZones.map((zone) => (
                  <React.Fragment key={zone.id}>
                    {Marker && (
                      <Marker
                      coordinate={zone.coordinates}
                      title={zone.name}
                      description={zone.description}
                      pinColor={getRiskLevelColor(zone.riskLevel)}
                      />
                    )}
                    {Circle && (
                      <Circle
                      center={zone.coordinates}
                      radius={zone.radius}
                      strokeColor={getRiskLevelColor(zone.riskLevel)}
                      fillColor={getRiskLevelColor(zone.riskLevel) + '20'}
                      strokeWidth={2}
                      />
                    )}
                  </React.Fragment>
                ))}
              </MapView>
            )}
          </View>
        </View>

        {/* Safety Settings */}
        <View style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Safety Settings
          </Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <IconSymbol name="shield.fill" size={24} color={Colors[colorScheme ?? 'light'].primary} />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Geo-fencing Alerts
                </Text>
                <Text style={[styles.settingDescription, { color: Colors[colorScheme ?? 'light'].icon }]}>
                  Get notified when entering danger zones
                </Text>
              </View>
            </View>
            <Switch
              value={geoFencingEnabled}
              onValueChange={setGeoFencingEnabled}
              trackColor={{ false: Colors[colorScheme ?? 'light'].border, true: Colors[colorScheme ?? 'light'].primary }}
              thumbColor={geoFencingEnabled ? Colors[colorScheme ?? 'light'].background : Colors[colorScheme ?? 'light'].icon}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <IconSymbol name="bell.fill" size={24} color={Colors[colorScheme ?? 'light'].primary} />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Push Notifications
                </Text>
                <Text style={[styles.settingDescription, { color: Colors[colorScheme ?? 'light'].icon }]}>
                  Receive safety alerts and updates
                </Text>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: Colors[colorScheme ?? 'light'].border, true: Colors[colorScheme ?? 'light'].primary }}
              thumbColor={notificationsEnabled ? Colors[colorScheme ?? 'light'].background : Colors[colorScheme ?? 'light'].icon}
            />
          </View>
        </View>

        {/* Danger Zones List */}
        <View style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Known Danger Zones
          </Text>
          
          {dangerZones.map((zone) => (
            <View key={zone.id} style={styles.dangerZoneItem}>
              <View style={[styles.riskIndicator, { backgroundColor: getRiskLevelColor(zone.riskLevel) }]} />
              <View style={styles.zoneInfo}>
                <Text style={[styles.zoneName, { color: Colors[colorScheme ?? 'light'].text }]}>
                  {zone.name}
                </Text>
                <Text style={[styles.zoneDescription, { color: Colors[colorScheme ?? 'light'].icon }]}>
                  {zone.description}
                </Text>
                <Text style={[styles.zoneDistance, { color: Colors[colorScheme ?? 'light'].icon }]}>
                  Risk Level: {zone.riskLevel.toUpperCase()} • Radius: {zone.radius}m
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Safety Tips */}
        <View style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Safety Tips
          </Text>
          
          <View style={styles.tipItem}>
            <IconSymbol name="info.circle.fill" size={20} color={Colors[colorScheme ?? 'light'].primary} />
            <Text style={[styles.tipText, { color: Colors[colorScheme ?? 'light'].text }]}>
              Keep your emergency contacts updated
            </Text>
          </View>
          
          <View style={styles.tipItem}>
            <IconSymbol name="info.circle.fill" size={20} color={Colors[colorScheme ?? 'light'].primary} />
            <Text style={[styles.tipText, { color: Colors[colorScheme ?? 'light'].text }]}>
              Share your location with trusted contacts
            </Text>
          </View>
          
          <View style={styles.tipItem}>
            <IconSymbol name="info.circle.fill" size={20} color={Colors[colorScheme ?? 'light'].primary} />
            <Text style={[styles.tipText, { color: Colors[colorScheme ?? 'light'].text }]}>
              Avoid traveling alone in high-risk areas
            </Text>
          </View>
          
          <View style={styles.tipItem}>
            <IconSymbol name="info.circle.fill" size={20} color={Colors[colorScheme ?? 'light'].primary} />
            <Text style={[styles.tipText, { color: Colors[colorScheme ?? 'light'].text }]}>
              Keep your phone charged and accessible
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  mapContainer: {
    height: 250,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 15,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
  },
  dangerZoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  riskIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 15,
  },
  zoneInfo: {
    flex: 1,
  },
  zoneName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  zoneDescription: {
    fontSize: 14,
    marginBottom: 2,
  },
  zoneDistance: {
    fontSize: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  tipText: {
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
});
