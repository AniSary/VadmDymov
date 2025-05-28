import React, { useState, useContext } from 'react';
import { View, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { PlacesContext } from '../context/PlacesContext';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper';

export default function AddPlaceScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { dodajMiejsce } = useContext(PlacesContext);
  const navigation = useNavigation();

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Błąd', 'Wprowadź nazwę miejsca');
      return;
    }

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Brak dostępu', 'Nie przyznano uprawnień do lokalizacji');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      await dodajMiejsce(title, description, {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });

      navigation.goBack();
    } catch (err) {
      Alert.alert('Błąd', err.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        <TextInput
          label="Tytuł"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Opis"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          multiline
          style={styles.input}
        />
        <Button
          mode="contained"
          onPress={handleSave}
          style={styles.button}
          buttonColor="#6200ee"
        >
          Zapisz
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 2,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
});
