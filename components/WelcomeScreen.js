// SignUpScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../assets/LogoMusico.png')}
        />
      </View>

      <Text style={styles.welcome}>WELCOME</Text>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('WelcomeScreen2')}>
        <Text style={styles.nextButtonText}>Next</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    color: '#ffffffbf',
    width: 204,
    height: 64,
  },
  welcome: {
    fontSize: 36,
    color: '#ffffff80',
    fontWeight: '500',
    marginBottom: 100,
  },
  nextButton: {
    position: 'absolute',
    bottom: 80,
    width: 296,
    height: 56,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default WelcomeScreen;
