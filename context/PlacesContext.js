import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values'; // нужен для генерации UUID
import uuid from 'react-native-uuid'; // правильный импорт

export const PlacesContext = createContext();

export const PlacesProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);

  // Загрузка сохранённых мест при старте приложения
  useEffect(() => {
    const loadPlaces = async () => {
      try {
        const saved = await AsyncStorage.getItem('places');
        if (saved) {
          setPlaces(JSON.parse(saved));
          console.log("✅ Places restored from AsyncStorage");
        }
      } catch (err) {
        console.log('❌ Error loading places:', err.message);
      }
    };

    loadPlaces();
  }, []);

  // Добавление нового места
  const addPlace = async (title, description, location) => {
    const newPlace = {
      id: uuid.v4(),
      title,
      description,
      coordinates: location,
      date: new Date().toLocaleString(),
    };

    const updatedPlaces = [newPlace, ...places];
    setPlaces(updatedPlaces);

    try {
      await AsyncStorage.setItem('places', JSON.stringify(updatedPlaces));
      console.log("💾 Place saved locally");
    } catch (err) {
      console.log('❌ Error saving place:', err.message);
    }
  };

  const deletePlace = async (id) => {
    try {
      const updated = places.filter((p) => p.id !== id);
      setPlaces(updated);
      await AsyncStorage.setItem('places', JSON.stringify(updated));
      console.log('🗑️ Place deleted:', id);
    } catch (err) {
      console.log('❌ Error deleting place:', err.message);
    }
  };

  return (
    <PlacesContext.Provider value={{ places, addPlace, deletePlace }}>
      {children}
    </PlacesContext.Provider>
  );
};
