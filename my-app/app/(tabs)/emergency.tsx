import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import * as Haptics from 'expo-haptics';
import * as SMS from 'expo-sms';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { EmergencyContact, Location as LocationType } from '@/types';

export default function EmergencyScreen() {
  const colorScheme = useColorScheme();
  const [currentLocation, setCurrentLocation] = useState<LocationType | null>(null);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    {
      id: '1',
      name: 'Emergency Services',
      phone: '100',
      relationship: 'Police',
      isPrimary: true,
    },
    {
      id: '2',
      name: 'Medical Emergency',
      phone: '108',
      relationship: 'Ambulance',
      isPrimary: false,
    },
    {
      id: '3',
      name: 'Fire Department',
      phone: '101',
      relationship: 'Fire',
      isPrimary: false,
    },
  ]);
  const [customContacts, setCustomContacts] = useState<EmergencyContact[]>([]);
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(0);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isSOSActive && sosCountdown > 0) {
      interval = setInterval(() => {
        setSosCountdown((prev) => prev - 1);
      }, 1000);
    } else if (sosCountdown === 0 && isSOSActive) {
      sendSOSAlert();
    }
    return () => clearInterval(interval);
  }, [isSOSActive, sosCountdown]);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required for emergency services.');
        return;
      }
      
      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timestamp: new Date(),
        accuracy: location.coords.accuracy || undefined,
      });
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const handleSOSPress = () => {
    Alert.alert(
      'SOS Alert',
      'This will send your location to emergency services and your emergency contacts. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Send SOS', 
          style: 'destructive', 
          onPress: () => {
            setIsSOSActive(true);
            setSosCountdown(3);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          }
        },
      ]
    );
  };

  const sendSOSAlert = async () => {
    try {
      setIsSOSActive(false);
      setSosCountdown(0);
      
      // Send location to emergency services
      const locationMessage = currentLocation 
        ? `Emergency SOS Alert!\nLocation: https://maps.google.com/?q=${currentLocation.latitude},${currentLocation.longitude}\nTime: ${new Date().toLocaleString()}`
        : 'Emergency SOS Alert!\nLocation: Unable to determine current location';

      // Send SMS to emergency contacts
      const allContacts = [...emergencyContacts, ...customContacts];
      const phoneNumbers = allContacts.map(contact => contact.phone);
      
      if (phoneNumbers.length > 0) {
        const isAvailable = await SMS.isAvailableAsync();
        if (isAvailable) {
          await SMS.sendSMSAsync(phoneNumbers, locationMessage);
        }
      }

      // Call primary emergency contact
      const primaryContact = allContacts.find(contact => contact.isPrimary);
      if (primaryContact) {
        await Linking.openURL(`tel:${primaryContact.phone}`);
      }

      Alert.alert('SOS Sent', 'Emergency services and your contacts have been notified.');
    } catch (error) {
      console.error('Error sending SOS:', error);
      Alert.alert('Error', 'Failed to send SOS alert. Please try calling emergency services directly.');
    }
  };

  const handleCallContact = async (contact: EmergencyContact) => {
    try {
      await Linking.openURL(`tel:${contact.phone}`);
    } catch (error) {
      console.error('Error calling contact:', error);
      Alert.alert('Error', 'Failed to make call');
    }
  };

  const handleAddContact = () => {
    Alert.prompt(
      'Add Emergency Contact',
      'Enter contact name',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Add', 
          onPress: (name: string | undefined) => {
            if (name) {
              Alert.prompt(
                'Add Phone Number',
                'Enter phone number',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { 
                    text: 'Add', 
                    onPress: (phone: string | undefined) => {
                      if (phone) {
                        const newContact: EmergencyContact = {
                          id: Date.now().toString(),
                          name: name,
                          phone: phone,
                          relationship: 'Contact',
                          isPrimary: false,
                        };
                        setCustomContacts([...customContacts, newContact]);
                      }
                    }
                  },
                ],
                'plain-text'
              );
            }
          }
        },
      ],
      'plain-text'
    );
  };

  const getLocationShareLink = () => {
    if (currentLocation) {
      return `https://maps.google.com/?q=${currentLocation.latitude},${currentLocation.longitude}`;
    }
    return 'Location not available';
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
            Emergency Services
          </Text>
          <Text style={[styles.subtitle, { color: Colors[colorScheme ?? 'light'].icon }]}>
            Quick access to emergency help
          </Text>
        </View>

        {/* SOS Button */}
        <View style={styles.sosContainer}>
          <TouchableOpacity
            style={styles.sosButton}
            onPress={handleSOSPress}
            disabled={isSOSActive}
          >
            <LinearGradient
              colors={isSOSActive ? ['#ff4444', '#cc0000'] : ['#dc2626', '#b91c1c']}
              style={styles.sosGradient}
            >
              <View style={styles.sosContent}>
                {isSOSActive ? (
                  <>
                    <Text style={styles.sosCountdown}>{sosCountdown}</Text>
                    <Text style={styles.sosText}>Sending...</Text>
                  </>
                ) : (
                  <>
                    <IconSymbol name="exclamationmark.triangle.fill" size={40} color="white" />
                    <Text style={styles.sosText}>SOS</Text>
                    <Text style={styles.sosSubtext}>Emergency Alert</Text>
                  </>
                )}
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Emergency Contacts */}
        <View style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
              Emergency Contacts
            </Text>
            <TouchableOpacity onPress={handleAddContact}>
              <IconSymbol name="plus" size={24} color={Colors[colorScheme ?? 'light'].primary} />
            </TouchableOpacity>
          </View>
          
          {[...emergencyContacts, ...customContacts].map((contact) => (
            <TouchableOpacity
              key={contact.id}
              style={styles.contactItem}
              onPress={() => handleCallContact(contact)}
            >
              <View style={styles.contactInfo}>
                <View style={[styles.contactIcon, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}>
                  <IconSymbol name="phone.fill" size={20} color="white" />
                </View>
                <View style={styles.contactDetails}>
                  <Text style={[styles.contactName, { color: Colors[colorScheme ?? 'light'].text }]}>
                    {contact.name}
                  </Text>
                  <Text style={[styles.contactRelationship, { color: Colors[colorScheme ?? 'light'].icon }]}>
                    {contact.relationship}
                  </Text>
                </View>
              </View>
              <Text style={[styles.contactPhone, { color: Colors[colorScheme ?? 'light'].primary }]}>
                {contact.phone}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Location Info */}
        <View style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Current Location
          </Text>
          
          {currentLocation ? (
            <View>
              <View style={styles.locationRow}>
                <IconSymbol name="location.fill" size={20} color={Colors[colorScheme ?? 'light'].primary} />
                <Text style={[styles.locationText, { color: Colors[colorScheme ?? 'light'].text }]}>
                  {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
                </Text>
              </View>
              
              <TouchableOpacity
                style={styles.shareLocationButton}
                onPress={() => Linking.openURL(getLocationShareLink())}
              >
                <IconSymbol name="paperplane.fill" size={20} color="white" />
                <Text style={styles.shareLocationText}>Share Location</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.noLocationContainer}>
              <IconSymbol name="location.fill" size={40} color={Colors[colorScheme ?? 'light'].icon} />
              <Text style={[styles.noLocationText, { color: Colors[colorScheme ?? 'light'].icon }]}>
                Location not available
              </Text>
              <TouchableOpacity
                style={[styles.refreshButton, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}
                onPress={getCurrentLocation}
              >
                <Text style={styles.refreshButtonText}>Refresh Location</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Emergency Tips */}
        <View style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Emergency Tips
          </Text>
          
          <View style={styles.tipItem}>
            <IconSymbol name="info.circle.fill" size={20} color={Colors[colorScheme ?? 'light'].primary} />
            <Text style={[styles.tipText, { color: Colors[colorScheme ?? 'light'].text }]}>
              Stay calm and assess the situation
            </Text>
          </View>
          
          <View style={styles.tipItem}>
            <IconSymbol name="info.circle.fill" size={20} color={Colors[colorScheme ?? 'light'].primary} />
            <Text style={[styles.tipText, { color: Colors[colorScheme ?? 'light'].text }]}>
              Use SOS button for immediate help
            </Text>
          </View>
          
          <View style={styles.tipItem}>
            <IconSymbol name="info.circle.fill" size={20} color={Colors[colorScheme ?? 'light'].primary} />
            <Text style={[styles.tipText, { color: Colors[colorScheme ?? 'light'].text }]}>
              Keep your phone charged and accessible
            </Text>
          </View>
          
          <View style={styles.tipItem}>
            <IconSymbol name="info.circle.fill" size={20} color={Colors[colorScheme ?? 'light'].primary} />
            <Text style={[styles.tipText, { color: Colors[colorScheme ?? 'light'].text }]}>
              Know your emergency contact numbers
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
  sosContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  sosButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  sosGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosContent: {
    alignItems: 'center',
  },
  sosCountdown: {
    fontSize: 48,
    color: 'white',
    fontWeight: 'bold',
  },
  sosText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },
  sosSubtext: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  contactRelationship: {
    fontSize: 14,
  },
  contactPhone: {
    fontSize: 16,
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  locationText: {
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
  shareLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  shareLocationText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  noLocationContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  noLocationText: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  refreshButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
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
