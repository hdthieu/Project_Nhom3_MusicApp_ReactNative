// LoginScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const LoginScreen = ({navigation}) => {
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
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#0000004f"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomePlayer')}>
        <Text style={styles.buttonText}>Login</Text>
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
    alignItems: "center"
  },
  logo: {
    color: '#ffffffbf',
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
