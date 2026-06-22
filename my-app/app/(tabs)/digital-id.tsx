import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Tourist } from '@/types';

export default function DigitalIdScreen() {
  const colorScheme = useColorScheme();
  const [tourist, setTourist] = useState<Partial<Tourist>>({
    name: '',
    email: '',
    phone: '',
    passportNumber: '',
    aadhaarNumber: '',
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [digitalId, setDigitalId] = useState<string>('');

  const handleImagePicker = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Camera roll permission is required to select a photo.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleCameraCapture = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Camera permission is required to take a photo.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error capturing image:', error);
      Alert.alert('Error', 'Failed to capture image');
    }
  };

  const handleRegister = async () => {
    if (!tourist.name || !tourist.email || !tourist.phone) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    if (!profileImage) {
      Alert.alert('Missing Photo', 'Please add a profile photo.');
      return;
    }

    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      
      // Generate a mock digital ID (in real app, this would be blockchain-generated)
      const generatedId = `TSM-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      setDigitalId(generatedId);
      setIsRegistered(true);
      
      Alert.alert('Registration Successful', 'Your digital tourist ID has been created successfully!');
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Registration Failed', 'Failed to create digital ID. Please try again.');
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      'Select Photo',
      'Choose how you want to add your photo',
      [
        { text: 'Camera', onPress: handleCameraCapture },
        { text: 'Photo Library', onPress: handleImagePicker },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  if (isRegistered) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
              Digital Tourist ID
            </Text>
            <Text style={[styles.subtitle, { color: Colors[colorScheme ?? 'light'].icon }]}>
              Your blockchain-verified identity
            </Text>
          </View>

          {/* Digital ID Card */}
          <View style={[styles.idCard, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
            <View style={styles.idHeader}>
              <IconSymbol name="checkmark.circle.fill" size={24} color={Colors[colorScheme ?? 'light'].safe} />
              <Text style={[styles.verifiedText, { color: Colors[colorScheme ?? 'light'].safe }]}>
                VERIFIED
              </Text>
            </View>
            
            <View style={styles.idContent}>
              <View style={styles.profileSection}>
                {profileImage && (
                  <Image source={{ uri: profileImage }} style={styles.profileImage} />
                )}
                <View style={styles.profileInfo}>
                  <Text style={[styles.name, { color: Colors[colorScheme ?? 'light'].text }]}>
                    {tourist.name}
                  </Text>
                  <Text style={[styles.idNumber, { color: Colors[colorScheme ?? 'light'].icon }]}>
                    ID: {digitalId}
                  </Text>
                </View>
              </View>

              <View style={styles.detailsSection}>
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: Colors[colorScheme ?? 'light'].icon }]}>
                    Email:
                  </Text>
                  <Text style={[styles.detailValue, { color: Colors[colorScheme ?? 'light'].text }]}>
                    {tourist.email}
                  </Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: Colors[colorScheme ?? 'light'].icon }]}>
                    Phone:
                  </Text>
                  <Text style={[styles.detailValue, { color: Colors[colorScheme ?? 'light'].text }]}>
                    {tourist.phone}
                  </Text>
                </View>
                
                {tourist.passportNumber && (
                  <View style={styles.detailRow}>
                    <Text style={[styles.detailLabel, { color: Colors[colorScheme ?? 'light'].icon }]}>
                      Passport:
                    </Text>
                    <Text style={[styles.detailValue, { color: Colors[colorScheme ?? 'light'].text }]}>
                      {tourist.passportNumber}
                    </Text>
                  </View>
                )}
                
                {tourist.aadhaarNumber && (
                  <View style={styles.detailRow}>
                    <Text style={[styles.detailLabel, { color: Colors[colorScheme ?? 'light'].icon }]}>
                      Aadhaar:
                    </Text>
                    <Text style={[styles.detailValue, { color: Colors[colorScheme ?? 'light'].text }]}>
                      {tourist.aadhaarNumber}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Features */}
          <View style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
            <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
              Digital ID Features
            </Text>
            
            <View style={styles.featureItem}>
              <IconSymbol name="shield.fill" size={20} color={Colors[colorScheme ?? 'light'].primary} />
              <Text style={[styles.featureText, { color: Colors[colorScheme ?? 'light'].text }]}>
                Blockchain-verified identity
              </Text>
            </View>
            
            <View style={styles.featureItem}>
              <IconSymbol name="checkmark.circle.fill" size={20} color={Colors[colorScheme ?? 'light'].primary} />
              <Text style={[styles.featureText, { color: Colors[colorScheme ?? 'light'].text }]}>
                Tamper-proof records
              </Text>
            </View>
            
            <View style={styles.featureItem}>
              <IconSymbol name="clock.fill" size={20} color={Colors[colorScheme ?? 'light'].primary} />
              <Text style={[styles.featureText, { color: Colors[colorScheme ?? 'light'].text }]}>
                Valid for trip duration only
              </Text>
            </View>
            
            <View style={styles.featureItem}>
              <IconSymbol name="person.badge.key.fill" size={20} color={Colors[colorScheme ?? 'light'].primary} />
              <Text style={[styles.featureText, { color: Colors[colorScheme ?? 'light'].text }]}>
                Quick verification by authorities
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
            Create Digital ID
          </Text>
          <Text style={[styles.subtitle, { color: Colors[colorScheme ?? 'light'].icon }]}>
            Register for blockchain-verified tourist identity
          </Text>
        </View>

        {/* Profile Photo */}
        <View style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Profile Photo
          </Text>
          
          <TouchableOpacity style={styles.photoContainer} onPress={showImagePickerOptions}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.photoPreview} />
            ) : (
              <View style={[styles.photoPlaceholder, { backgroundColor: Colors[colorScheme ?? 'light'].input }]}>
                <IconSymbol name="camera.fill" size={40} color={Colors[colorScheme ?? 'light'].icon} />
                <Text style={[styles.photoText, { color: Colors[colorScheme ?? 'light'].icon }]}>
                  Add Photo
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Personal Information */}
        <View style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Personal Information
          </Text>
          
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
              Full Name *
            </Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: Colors[colorScheme ?? 'light'].input,
                color: Colors[colorScheme ?? 'light'].text,
                borderColor: Colors[colorScheme ?? 'light'].border,
              }]}
              value={tourist.name}
              onChangeText={(text) => setTourist({ ...tourist, name: text })}
              placeholder="Enter your full name"
              placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
              Email Address *
            </Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: Colors[colorScheme ?? 'light'].input,
                color: Colors[colorScheme ?? 'light'].text,
                borderColor: Colors[colorScheme ?? 'light'].border,
              }]}
              value={tourist.email}
              onChangeText={(text) => setTourist({ ...tourist, email: text })}
              placeholder="Enter your email"
              placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
              Phone Number *
            </Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: Colors[colorScheme ?? 'light'].input,
                color: Colors[colorScheme ?? 'light'].text,
                borderColor: Colors[colorScheme ?? 'light'].border,
              }]}
              value={tourist.phone}
              onChangeText={(text) => setTourist({ ...tourist, phone: text })}
              placeholder="Enter your phone number"
              placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Identity Documents */}
        <View style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Identity Documents (Optional)
          </Text>
          
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
              Passport Number
            </Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: Colors[colorScheme ?? 'light'].input,
                color: Colors[colorScheme ?? 'light'].text,
                borderColor: Colors[colorScheme ?? 'light'].border,
              }]}
              value={tourist.passportNumber}
              onChangeText={(text) => setTourist({ ...tourist, passportNumber: text })}
              placeholder="Enter passport number"
              placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
              Aadhaar Number
            </Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: Colors[colorScheme ?? 'light'].input,
                color: Colors[colorScheme ?? 'light'].text,
                borderColor: Colors[colorScheme ?? 'light'].border,
              }]}
              value={tourist.aadhaarNumber}
              onChangeText={(text) => setTourist({ ...tourist, aadhaarNumber: text })}
              placeholder="Enter Aadhaar number"
              placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Register Button */}
        <TouchableOpacity
          style={[styles.registerButton, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>Create Digital ID</Text>
        </TouchableOpacity>
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
  photoContainer: {
    alignItems: 'center',
  },
  photoPreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  photoText: {
    marginTop: 8,
    fontSize: 14,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
  },
  registerButton: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  idCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  idHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  verifiedText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  idContent: {
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  idNumber: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  detailsSection: {
    width: '100%',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  featureText: {
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
});
