import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import IPConfig from './IPConfig';
import { useNavigation } from '@react-navigation/native';
const ProfileHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>My Profile</Text>
      <TouchableOpacity style={styles.editButton}>
        <Image
          source={{ uri: './assets/material-symbols-edit.svg' }}
          style={styles.editIcon}
        />
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

const ProfileInfo = ({ users }) => {
  if (users.length === 0) {
    return <Text>Loading...</Text>; 
  }

  return (
    <View style={styles.infoContainer}>
      <View style={styles.profilePicContainer}>
        <Image
          source={{ uri: users[0].profile.avatar }} 
          style={styles.profilePic}
        />
        <Text style={styles.profileName}>{users[0].profile.displayName}</Text>
      </View>
      <View style={styles.contactDetails}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.detail}>{users[0].email}</Text> 
        <Text style={styles.label}>Phone Number</Text>
        <Text style={styles.detail}>{users[0].phone}</Text> 
      </View>
    </View>
  );
};


const SettingsList = () => {
  const settings = [
    { id: '1', title: 'Music Language(s)', detail: 'English, Tamil' },
    { id: '2', title: 'Streaming Quality', detail: 'HD' },
    { id: '3', title: 'Download Quality', detail: 'HD' },
  ];

  return (
    <View style={styles.settingsContainer}>
      <Text style={styles.settingsTitle}>Settings</Text>
      {settings.map((setting) => (
        <TouchableOpacity key={setting.id} style={styles.settingItem}>
          <Text style={styles.settingText}>{setting.title}</Text>
          <Text style={styles.settingDetail}>{setting.detail}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingText}>Connect a Device</Text>
        <Text style={styles.settingDetail}>
          <Image source={require('../assets/navigate_next.png')} />
        </Text>
      </TouchableOpacity>
      <Text style={styles.settingsTitle}>Others</Text>
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingText}>Help & Support</Text>
        <Text style={styles.settingDetail}>
          <Image source={require('../assets/navigate_next.png')} />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingText}>Log out</Text>
        <Text style={styles.settingDetail}>
          <Image source={require('../assets/navigate_next.png')} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const NavigationBar = () => {
  const items = [
    { id: '1', name: 'Home', icon: './assets/home.svg' },
    { id: '2', name: 'Search', icon: './assets/frame.svg' },
    { id: '3', name: 'Your Library', icon: './assets/library-music.svg' },
  ];

  return (
    <View style={styles.navContainer}>
      {items.map((item) => (
        <TouchableOpacity key={item.id} style={styles.navItem}>
          <Image source={{ uri: item.icon }} style={styles.navIcon} />
          <Text style={styles.navText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
const ProfileScreen = () => {
  const { baseUrl } = IPConfig();
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${baseUrl}/users`);
        const data = await response.json();
        setUsers(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [baseUrl]);
  return (
    <View style={{ flex: 1, backgroundColor: '#0d0d0d' }}>
      <ProfileHeader />
      <ProfileInfo users={users} />
      <ScrollView
        style={styles.container}
        showsHorizontalScrollIndicator={false}>
        <SettingsList />
      </ScrollView>
      <NavigationBar />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#ffffffbf',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffffbf',
    padding: 6,
    borderRadius: 25,
  },
  editIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  editText: {
    fontSize: 12,
    color: '#000000bf',
  },
  infoContainer: { margin: 16 },
  profilePicContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profilePic: {
    width: 88,
    height: 88,
    borderRadius: 50,
  },
  profileName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffffbf',
  },
  contactDetails: {},
  label: {
    fontSize: 16,
    color: '#ffffffff',
    marginBottom: 4,
  },
  detail: {
    fontSize: 12,
    color: '#ffffff80',
    marginBottom: 16,
  },
  settingsContainer: { marginHorizontal: 16 },
  settingsTitle: {
    fontSize: 24,
    fontWeight: '500',
    color: '#ffffffbf',
    marginBottom: 16,
  },
  settingItem: {
    padding: 16,
    backgroundColor: '#0000001f',
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  settingText: {
    fontSize: 16,
    color: '#ffffffbf',
  },
  settingDetail: {
    fontSize: 12,
    color: '#ffffffff',
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff33',
    paddingTop: 5,
    paddingBottom: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  navText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ffffffbf',
  },
});

export default ProfileScreen;
