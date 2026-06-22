import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { SUPPORTED_LANGUAGES } from '@/constants/Languages';
import { AppSettings } from '@/types';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const [settings, setSettings] = useState<AppSettings>({
    language: 'en',
    enableLocationTracking: true,
    enableNotifications: true,
    emergencyMode: false,
    theme: 'auto',
  });
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);

  const handleSettingChange = async (key: keyof AppSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    try {
      await AsyncStorage.setItem('appSettings', JSON.stringify(newSettings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const handleLanguageSelect = (languageCode: string) => {
    handleSettingChange('language', languageCode);
    setShowLanguagePicker(false);
  };

  const handleEmergencyModeToggle = () => {
    Alert.alert(
      'Emergency Mode',
      'Emergency mode will share your location continuously and send alerts to emergency contacts. Enable only in critical situations.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Enable', 
          style: 'destructive',
          onPress: () => handleSettingChange('emergencyMode', !settings.emergencyMode)
        },
      ]
    );
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will remove all your personal information, emergency contacts, and settings. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear Data', 
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              Alert.alert('Data Cleared', 'All data has been removed successfully.');
            } catch (error) {
              console.error('Error clearing data:', error);
              Alert.alert('Error', 'Failed to clear data.');
            }
          }
        },
      ]
    );
  };

  const getCurrentLanguage = () => {
    return SUPPORTED_LANGUAGES.find(lang => lang.code === settings.language) || SUPPORTED_LANGUAGES[0];
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
            Profile & Settings
          </Text>
          <Text style={[styles.subtitle, { color: Colors[colorScheme ?? 'light'].icon }]}>
            Manage your account and preferences
          </Text>
        </View>

        {/* User Info */}
        <View style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
          <View style={styles.userInfo}>
            <View style={[styles.avatar, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}>
              <IconSymbol name="person.circle.fill" size={40} color="white" />
            </View>
            <View style={styles.userDetails}>
              <Text style={[styles.userName, { color: Colors[colorScheme ?? 'light'].text }]}>
                Tourist User
              </Text>
              <Text style={[styles.userEmail, { color: Colors[colorScheme ?? 'light'].icon }]}>
                user@example.com
              </Text>
            </View>
          </View>
        </View>

        {/* App Settings */}
        <View style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            App Settings
          </Text>
          
          {/* Language Setting */}
          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => setShowLanguagePicker(!showLanguagePicker)}
          >
            <View style={styles.settingInfo}>
              <IconSymbol name="globe" size={24} color={Colors[colorScheme ?? 'light'].primary} />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Language
                </Text>
                <Text style={[styles.settingDescription, { color: Colors[colorScheme ?? 'light'].icon }]}>
                  {getCurrentLanguage().nativeName}
                </Text>
              </View>
            </View>
            <IconSymbol name="chevron.right" size={20} color={Colors[colorScheme ?? 'light'].icon} />
          </TouchableOpacity>

          {/* Language Picker */}
          {showLanguagePicker && (
            <View style={styles.languagePicker}>
              {SUPPORTED_LANGUAGES.map((language) => (
                <TouchableOpacity
                  key={language.code}
                  style={[
                    styles.languageOption,
                    settings.language === language.code && { backgroundColor: Colors[colorScheme ?? 'light'].secondary }
                  ]}
                  onPress={() => handleLanguageSelect(language.code)}
                >
                  <Text style={[styles.languageName, { color: Colors[colorScheme ?? 'light'].text }]}>
                    {language.nativeName}
                  </Text>
                  <Text style={[styles.languageCode, { color: Colors[colorScheme ?? 'light'].icon }]}>
                    {language.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Location Tracking */}
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <IconSymbol name="location.fill" size={24} color={Colors[colorScheme ?? 'light'].primary} />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Location Tracking
                </Text>
                <Text style={[styles.settingDescription, { color: Colors[colorScheme ?? 'light'].icon }]}>
                  Allow app to track your location for safety
                </Text>
              </View>
            </View>
            <Switch
              value={settings.enableLocationTracking}
              onValueChange={(value) => handleSettingChange('enableLocationTracking', value)}
              trackColor={{ false: Colors[colorScheme ?? 'light'].border, true: Colors[colorScheme ?? 'light'].primary }}
              thumbColor={settings.enableLocationTracking ? Colors[colorScheme ?? 'light'].background : Colors[colorScheme ?? 'light'].icon}
            />
          </View>

          {/* Notifications */}
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <IconSymbol name="bell.fill" size={24} color={Colors[colorScheme ?? 'light'].primary} />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Notifications
                </Text>
                <Text style={[styles.settingDescription, { color: Colors[colorScheme ?? 'light'].icon }]}>
                  Receive safety alerts and updates
                </Text>
              </View>
            </View>
            <Switch
              value={settings.enableNotifications}
              onValueChange={(value) => handleSettingChange('enableNotifications', value)}
              trackColor={{ false: Colors[colorScheme ?? 'light'].border, true: Colors[colorScheme ?? 'light'].primary }}
              thumbColor={settings.enableNotifications ? Colors[colorScheme ?? 'light'].background : Colors[colorScheme ?? 'light'].icon}
            />
          </View>

          {/* Emergency Mode */}
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <IconSymbol name="exclamationmark.triangle.fill" size={24} color={Colors[colorScheme ?? 'light'].emergency} />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Emergency Mode
                </Text>
                <Text style={[styles.settingDescription, { color: Colors[colorScheme ?? 'light'].icon }]}>
                  Continuous location sharing and alerts
                </Text>
              </View>
            </View>
            <Switch
              value={settings.emergencyMode}
              onValueChange={handleEmergencyModeToggle}
              trackColor={{ false: Colors[colorScheme ?? 'light'].border, true: Colors[colorScheme ?? 'light'].emergency }}
              thumbColor={settings.emergencyMode ? Colors[colorScheme ?? 'light'].background : Colors[colorScheme ?? 'light'].icon}
            />
          </View>
        </View>

        {/* Privacy & Security */}
        <View style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Privacy & Security
          </Text>
          
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <IconSymbol name="shield.fill" size={24} color={Colors[colorScheme ?? 'light'].primary} />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Data Privacy
                </Text>
                <Text style={[styles.settingDescription, { color: Colors[colorScheme ?? 'light'].icon }]}>
                  View privacy policy and data usage
                </Text>
              </View>
            </View>
            <IconSymbol name="chevron.right" size={20} color={Colors[colorScheme ?? 'light'].icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <IconSymbol name="gear" size={24} color={Colors[colorScheme ?? 'light'].primary} />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Security Settings
                </Text>
                <Text style={[styles.settingDescription, { color: Colors[colorScheme ?? 'light'].icon }]}>
                  Manage app security and permissions
                </Text>
              </View>
            </View>
            <IconSymbol name="chevron.right" size={20} color={Colors[colorScheme ?? 'light'].icon} />
          </TouchableOpacity>
        </View>

        {/* About */}
        <View style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            About
          </Text>
          
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <IconSymbol name="info.circle.fill" size={24} color={Colors[colorScheme ?? 'light'].primary} />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                  App Version
                </Text>
                <Text style={[styles.settingDescription, { color: Colors[colorScheme ?? 'light'].icon }]}>
                  1.0.0
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <IconSymbol name="heart.fill" size={24} color={Colors[colorScheme ?? 'light'].primary} />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Support
                </Text>
                <Text style={[styles.settingDescription, { color: Colors[colorScheme ?? 'light'].icon }]}>
                  Get help and contact support
                </Text>
              </View>
            </View>
            <IconSymbol name="chevron.right" size={20} color={Colors[colorScheme ?? 'light'].icon} />
          </TouchableOpacity>
        </View>

        {/* Danger Zone */}
        <View style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].danger }]}>
            Danger Zone
          </Text>
          
          <TouchableOpacity
            style={[styles.dangerButton, { borderColor: Colors[colorScheme ?? 'light'].danger }]}
            onPress={handleClearData}
          >
            <IconSymbol name="xmark.circle.fill" size={24} color={Colors[colorScheme ?? 'light'].danger} />
            <Text style={[styles.dangerButtonText, { color: Colors[colorScheme ?? 'light'].danger }]}>
              Clear All Data
            </Text>
          </TouchableOpacity>
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
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
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
  languagePicker: {
    marginTop: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
  },
  languageCode: {
    fontSize: 14,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 10,
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});
