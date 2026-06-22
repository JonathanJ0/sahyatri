import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import * as Haptics from 'expo-haptics';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { SafetyScore, Location as LocationType } from '@/types';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [safetyScore, setSafetyScore] = useState<SafetyScore>({
    score: 85,
    factors: {
      locationSafety: 80,
      timeOfDay: 90,
      areaFamiliarity: 75,
      emergencyContacts: 95,
      recentActivity: 85,
    },
    lastUpdated: new Date(),
  });
  const [currentLocation, setCurrentLocation] = useState<LocationType | null>(null);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
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

  const handleSOSPress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    Alert.alert(
      'SOS Alert',
      'Emergency services and your emergency contacts will be notified immediately.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Send SOS', style: 'destructive', onPress: sendSOSAlert },
      ]
    );
  };

  const sendSOSAlert = () => {
    // TODO: Implement SOS alert functionality
    console.log('SOS Alert sent!');
  };

  const getSafetyScoreColor = (score: number) => {
    if (score >= 80) return Colors[colorScheme ?? 'light'].safe;
    if (score >= 60) return Colors[colorScheme ?? 'light'].medium;
    return Colors[colorScheme ?? 'light'].danger;
  };

  const getSafetyScoreText = (score: number) => {
    if (score >= 80) return 'Safe';
    if (score >= 60) return 'Moderate';
    return 'High Risk';
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
            SAHYATRI
          </Text>
          <Text style={[styles.subtitle, { color: Colors[colorScheme ?? 'light'].icon }]}>
            Stay safe during your travels
          </Text>
        </View>

        {/* Safety Score Card */}
        <View style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
          <LinearGradient
            colors={[getSafetyScoreColor(safetyScore.score), getSafetyScoreColor(safetyScore.score) + '20']}
            style={styles.safetyScoreGradient}
          >
            <View style={styles.safetyScoreContent}>
              <Text style={styles.safetyScoreLabel}>Safety Score</Text>
              <Text style={styles.safetyScoreValue}>{safetyScore.score}</Text>
              <Text style={styles.safetyScoreText}>{getSafetyScoreText(safetyScore.score)}</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Quick Actions
          </Text>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}
              onPress={handleSOSPress}
            >
              <View style={[styles.sosButton, { backgroundColor: Colors[colorScheme ?? 'light'].emergency }]}>
                <IconSymbol name="exclamationmark.triangle.fill" size={24} color="white" />
              </View>
              <Text style={[styles.actionButtonText, { color: Colors[colorScheme ?? 'light'].text }]}>
                SOS Alert
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}
              onPress={() => setIsTracking(!isTracking)}
            >
              <View style={[styles.trackingButton, { backgroundColor: isTracking ? Colors[colorScheme ?? 'light'].safe : Colors[colorScheme ?? 'light'].icon }]}>
                <IconSymbol name="location.fill" size={24} color="white" />
              </View>
              <Text style={[styles.actionButtonText, { color: Colors[colorScheme ?? 'light'].text }]}>
                {isTracking ? 'Stop Tracking' : 'Start Tracking'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Location Info */}
        {currentLocation && (
          <View style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
            <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
              Current Location
            </Text>
            <Text style={[styles.locationText, { color: Colors[colorScheme ?? 'light'].icon }]}>
              Lat: {currentLocation.latitude.toFixed(6)}
            </Text>
            <Text style={[styles.locationText, { color: Colors[colorScheme ?? 'light'].icon }]}>
              Lng: {currentLocation.longitude.toFixed(6)}
            </Text>
            <Text style={[styles.locationText, { color: Colors[colorScheme ?? 'light'].icon }]}>
              Accuracy: {currentLocation.accuracy?.toFixed(0)}m
            </Text>
          </View>
        )}

        {/* Safety Factors */}
        <View style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Safety Factors
          </Text>
          {Object.entries(safetyScore.factors).map(([factor, score]) => (
            <View key={factor} style={styles.factorRow}>
              <Text style={[styles.factorLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                {factor.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </Text>
              <View style={styles.scoreBar}>
                <View
                  style={[
                    styles.scoreFill,
                    {
                      width: `${score}%`,
                      backgroundColor: getSafetyScoreColor(score),
                    },
                  ]}
                />
              </View>
              <Text style={[styles.factorScore, { color: Colors[colorScheme ?? 'light'].icon }]}>
                {score}
              </Text>
            </View>
          ))}
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
  safetyScoreGradient: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  safetyScoreContent: {
    alignItems: 'center',
  },
  safetyScoreLabel: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  safetyScoreValue: {
    fontSize: 48,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  safetyScoreText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
  quickActions: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sosButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  trackingButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  locationText: {
    fontSize: 14,
    marginBottom: 5,
  },
  factorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  factorLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  scoreBar: {
    flex: 2,
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginHorizontal: 10,
  },
  scoreFill: {
    height: '100%',
    borderRadius: 4,
  },
  factorScore: {
    fontSize: 14,
    fontWeight: '600',
    minWidth: 30,
    textAlign: 'right',
  },
});
