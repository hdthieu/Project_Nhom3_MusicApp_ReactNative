// SignUpScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import IPConfig from './IPConfig';
import MiniPlayer from './MiniPlayer';
import { useNavigation } from '@react-navigation/native';
const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const { baseUrl } = IPConfig();
  const navigation = useNavigation();
  const handleSignUp = async () => {
    // Kiểm tra mật khẩu có trùng khớp không
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Kiểm tra email hợp lệ (sử dụng regex)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email address');
      return;
    }

    // Kiểm tra số điện thoại hợp lệ (ví dụ, 10 chữ số cho số điện thoại Việt Nam)
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    if (!phoneRegex.test(phone)) {
      alert('Invalid phone number');
      return;
    }

    // Dữ liệu gửi lên server
    const userData = {
      username,
      password,
      email,
      phone,
    };

    try {
      const response = await fetch(`${baseUrl}/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Sign up successful');
        navigation.navigate('LoginScreen');
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      alert('An error occurred while signing up');
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
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          placeholderTextColor="#0000004f"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#0000004f"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#0000004f"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
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
    top: 80,
  },
  logo: {
    color: '#ffffffbf',
    width: 204,
    height: 64,
  },
  inputContainer: {
    width: '80%',
    marginVertical: 20,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    width: '80%',
    marginTop: 32,
  },
  buttonText: {
    color: '#000000bf',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default SignUpScreen;
