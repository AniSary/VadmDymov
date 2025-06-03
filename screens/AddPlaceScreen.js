import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import * as Location from 'expo-location';
import { PlacesContext } from '../context/PlacesContext';

const AddPlaceScreen = () => {
  const [tytul, setTytul] = useState('');
  const [opis, setOpis] = useState('');
  const [lokalizacja, setLokalizacja] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { dodajMiejsce } = useContext(PlacesContext);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('❌ Brak zgody na dostęp do lokalizacji');
          setLoading(false);
          return;
        }

        const pos = await Location.getCurrentPositionAsync({});
        setLokalizacja({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        console.log('📍 Lokalizacja pobrana:', pos.coords);
      } catch (error) {
        console.log('❌ Błąd lokalizacji:', error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAddPlace = () => {
    if (tytul.trim()) {
      dodajMiejsce(tytul, opis, lokalizacja);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dodaj miejsce</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#4a90e2" style={{ marginTop: 20 }} />
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Tytuł"
            placeholderTextColor="#999"
            value={tytul}
            onChangeText={setTytul}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Opis"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            value={opis}
            onChangeText={setOpis}
          />
          <Button
            mode="contained"
            onPress={handleAddPlace}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            Zapisz
          </Button>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fefefe',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 10,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default AddPlaceScreen;
