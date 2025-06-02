import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { v4 as uuidv4 } from 'react-native-uuid';

export const PlacesContext = createContext();

export const PlacesProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);

  // 🔄 Load data from AsyncStorage on app start
  useEffect(() => {
    const loadPlaces = async () => {
      try {
        const saved = await AsyncStorage.getItem('places');
        if (saved) {
          setPlaces(JSON.parse(saved));
          console.log('✅ Restored places from AsyncStorage');
        }
      } catch (err) {
        console.log('❌ Error loading places:', err.message);
      }
    };

    loadPlaces();
  }, []);

  // 🔐 Save securely (e.g., last added title)
  const storeSecurely = async (key, value) => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.log('❌ SecureStore error:', err.message);
    }
  };

  // ➕ Add place and save to AsyncStorage and SecureStore
  const addPlace = async (title, description, location) => {
    const newPlace = {
      id: uuidv4(),
      title,
      description,
      coordinates: location,
      date: new Date().toLocaleString(),
    };

    const updatedPlaces = [newPlace, ...places];
    setPlaces(updatedPlaces);

    try {
      await AsyncStorage.setItem('places', JSON.stringify(updatedPlaces));
      console.log('💾 Place saved offline');
      await storeSecurely('last-place', title); // Optional secure storage
    } catch (err) {
      console.log('❌ Error saving to AsyncStorage or SecureStore:', err.message);
    }
  };

  return (
    <PlacesContext.Provider value={{ places, addPlace }}>
      {children}
    </PlacesContext.Provider>
  );
};
