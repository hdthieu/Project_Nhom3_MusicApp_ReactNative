// LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert, ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux'; // Import useDispatch để dispatch action
import { setUser } from './Redux/UserSlice'; // Import action setUser
import IPConfig from './IPConfig';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch(); // Khởi tạo useDispatch
  const { baseUrl } = IPConfig();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Fetch users from the backend
      const response = await fetch(`${baseUrl}/users`);
      const users = await response.json();

      // Find the user with the matching username and password
      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        // Fetch the list of downloaded songs for the user
        const downloadedSongsResponse = await fetch(
          `${baseUrl}/user/${user.id}/downloaded-songs`
        );
        const downloadedSongs = await downloadedSongsResponse.json();

        // Dispatch action to store user and downloaded songs in Redux
        dispatch(setUser({ user, downloadedSongs }));

        // Navigate to the HomePlayer screen
        navigation.navigate('HomePlayer');
      } else {
        Alert.alert('Login Failed', 'Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../assets/LogoMusico.png')}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="User Name"
          placeholderTextColor="#0000004f"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#0000004f"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary}>
        <Image
          source={require('../assets/bi_phone.png')}
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonTextDark}>Continue with Phone Number</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary}>
        <Image
          source={require('../assets/Google.png')}
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonTextDark}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 50,
    alignItems: 'center',
  },
  logo: {
    width: 204,
    height: 64,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    width: '80%',
    marginBottom: 16,
  },
  buttonText: {
    color: '#000000bf',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffffffbf',
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 25,
    width: '80%',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonIcon: {
    marginRight: 16,
    width: 24,
    height: 24,
  },
  buttonTextDark: {
    color: '#ffffffbf',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default LoginScreen;
