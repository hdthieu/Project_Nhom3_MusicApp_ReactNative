import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setUser } from './Redux/UserSlice'; // Import action nếu cần

// Header của Profile
const ProfileHeader = () => (
  <View style={styles.header}>
    <Text style={styles.title}>My Profile</Text>
    <TouchableOpacity style={styles.editButton}>
      <Image
        source={require('../assets/mdi-account-music-outline.png')}
        style={styles.editIcon}
      />
      <Text style={styles.editText}>Edit</Text>
    </TouchableOpacity>
  </View>
);

// Thông tin người dùng
const ProfileInfo = ({ user }) => {
  if (!user) return <Text>Loading...</Text>; // Hiển thị Loading nếu chưa có dữ liệu

  return (
    <View style={styles.infoContainer}>
      <View style={styles.profilePicContainer}>
        <Image
          source={{ uri: user.profile.avatar }}
          style={styles.profilePic}
        />
        <Text style={styles.profileName}>{user.profile.displayName}</Text>
      </View>
      <View style={styles.contactDetails}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.detail}>{user.email}</Text>
        <Text style={styles.label}>Phone Number</Text>
        <Text style={styles.detail}>{user.phone}</Text>
      </View>
    </View>
  );
};

// Danh sách cài đặt
const SettingsList = ({ onLogout }) => {
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
      <Text style={styles.settingsTitle}>Others</Text>
      <TouchableOpacity onPress={onLogout} style={styles.settingItem}>
        <Text style={styles.settingText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

// Thanh điều hướng
const NavigationBar = ({ navigation }) => (
  <View style={styles.navContainer}>
    <TouchableOpacity
      onPress={() => navigation.navigate('HomePlayer')}
      style={styles.navItem}>
      <Image
        source={require('../assets/footerHome.png')}
        style={styles.navIcon}
      />
      <Text style={styles.navText}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => navigation.navigate('SearchScreen')}
      style={styles.navItem}>
      <Image source={require('../assets/frame.png')} style={styles.navIcon} />
      <Text style={styles.navText}>Search</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => navigation.navigate('YourLibrary')}
      style={styles.navItem}>
      <Image
        source={require('../assets/footerLibrary.png')}
        style={styles.navIcon}
      />
      <Text style={styles.navText}>Your Library</Text>
    </TouchableOpacity>
  </View>
);

// Màn hình Profile chính
const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.currentUser); // Lấy dữ liệu người dùng từ Redux Store

  const handleLogout = () => {
    dispatch(setUser({ user: null, downloadedSongs: [] })); // Đặt lại dữ liệu người dùng khi đăng xuất
    navigation.navigate('LoginScreen'); // Điều hướng về trang Home khi đăng xuất
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0d0d0d' }}>
      <ProfileHeader />
      <ProfileInfo user={user} />
      <ScrollView
        style={styles.container}
        showsHorizontalScrollIndicator={false}>
        <SettingsList onLogout={handleLogout} />
      </ScrollView>
      <NavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d0d0d' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16,
  },
  title: { fontSize: 24, fontWeight: '500', color: '#ffffffbf' },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffffbf',
    padding: 6,
    borderRadius: 25,
  },
  editIcon: { width: 16, height: 16, marginRight: 4 },
  editText: { fontSize: 12, color: '#000000bf' },
  infoContainer: { margin: 16 },
  profilePicContainer: { alignItems: 'center', marginBottom: 16 },
  profilePic: { width: 88, height: 88, borderRadius: 50 },
  profileName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffffbf',
  },
  contactDetails: {},
  label: { fontSize: 16, color: '#ffffffff', marginBottom: 4 },
  detail: { fontSize: 12, color: '#ffffff80', marginBottom: 16 },
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
  settingText: { fontSize: 16, color: '#ffffffbf' },
  settingDetail: { fontSize: 12, color: '#ffffffff' },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff33',
    paddingTop: 5,
    paddingBottom: 10,
  },
  navItem: { alignItems: 'center' },
  navIcon: { width: 24, height: 24, marginBottom: 4 },
  navText: { fontSize: 10, fontWeight: '700', color: '#ffffffbf' },
});

export default ProfileScreen;
