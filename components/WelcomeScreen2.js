// SignUpScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const SignUpScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../assets/LogoMusico.png')}
        />
        <Text style={styles.subheading}>Just keep on vibin’</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.buttonTextLight}>Sign up</Text>
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

        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>
      </View>
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
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    color: '#ffffffbf',
    width: 204,
    height: 64,
  },
  subheading: {
    color: '#ffffff80',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 20,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 100,
    width: '80%',
  },
  button: {
    backgroundColor: '#ffffffbf',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonTextLight: {
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
    marginBottom: 16,
  },
  buttonIcon: {
    marginRight: 16,
    width: 40,
    height: 40,
  },
  buttonTextDark: {
    color: '#ffffffbf',
    fontSize: 16,
    fontWeight: '700',
  },
  loginText: {
    color: '#ffffffbf',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default SignUpScreen;
