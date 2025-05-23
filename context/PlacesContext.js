import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PlacesContext = createContext();

export const PlacesProvider = ({ children }) => {
  const [miejsca, setMiejsca] = useState([]);

  // 🔄 Wczytywanie danych z AsyncStorage przy starcie aplikacji
  useEffect(() => {
    const wczytajMiejsca = async () => {
      try {
        const zapisane = await AsyncStorage.getItem('miejsca');
        if (zapisane) {
          setMiejsca(JSON.parse(zapisane));
          console.log("✅ Przywrócono miejsca z AsyncStorage");
        }
      } catch (err) {
        console.log('❌ Błąd przy wczytywaniu miejsc:', err.message);
      }
    };

    wczytajMiejsca();
  }, []);

  // ➕ Dodawanie miejsca + zapis do AsyncStorage
  const dodajMiejsce = async (tytul, opis, lokalizacja) => {
    const nowe = {
      id: Date.now().toString(),
      tytul,
      opis,
      wspolrzedne: lokalizacja,
      data: new Date().toLocaleString(),
    };

    const zaktualizowane = [nowe, ...miejsca];
    setMiejsca(zaktualizowane);

    try {
      await AsyncStorage.setItem('miejsca', JSON.stringify(zaktualizowane));
      console.log("💾 Miejsce zapisane offline");
    } catch (err) {
      console.log('❌ Błąd zapisu do AsyncStorage:', err.message);
    }
  };

  return (
    <PlacesContext.Provider value={{ miejsca, dodajMiejsce }}>
      {children}
    </PlacesContext.Provider>
  );
};
