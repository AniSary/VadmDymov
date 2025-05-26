import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

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

  // 🔐 Zapis bezpieczny przy użyciu SecureStore
  const zapiszBezpiecznie = async (klucz, wartosc) => {
    try {
      await SecureStore.setItemAsync(klucz, wartosc);
    } catch (err) {
      console.log("❌ Błąd SecureStore:", err.message);
    }
  };

  // ➕ Dodawanie miejsca + zapis do AsyncStorage i SecureStore
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
      await zapiszBezpiecznie('ostatnie-miejsce', tytul); // 🔐 Bezpieczne przechowanie
    } catch (err) {
      console.log('❌ Błąd zapisu do AsyncStorage lub SecureStore:', err.message);
    }
  };

  return (
    <PlacesContext.Provider value={{ miejsca, dodajMiejsce }}>
      {children}
    </PlacesContext.Provider>
  );
};
