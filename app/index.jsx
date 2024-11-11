import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

export default function App() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [buttonAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(buttonAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Animated Icon with Title */}
      <View style={styles.titleContainer}>
        <AntDesign name="playcircleo" size={36} color="#f56e0f" style={styles.icon} />
        <Text style={styles.title}>Ashira World</Text>
      </View>

      {/* Animated Button */}
      <Animated.View style={{ transform: [{ scale: buttonAnim }] }}>
        <TouchableOpacity
          style={styles.button}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Link href="/home" style={styles.buttonText}>Start Listening</Link>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>by Shir Gabrielle Caserial</Text>
        <Text style={styles.footerText}>© 2024 Ashira World. All rights reserved.</Text>
      </View>

      <StatusBar style="light" />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151419',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#fbfbfb',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: '#f56e0f',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 25,
    shadowColor: '#1b1b1e',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  buttonText: {
    color: '#fbfbfb',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 15,
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerText: {
    color: '#878787',
    fontSize: 14,
  },
});
