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
      const coords = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      };

      dodajMiejsce(title, description, coords);
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Błąd', 'Nie udało się pobrać lokalizacji');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TextInput
          mode="outlined"
          label="Nazwa miejsca"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="Opis (opcjonalnie)"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
          style={styles.input}
        />
        <Button mode="contained" onPress={handleSave}>
          Zapisz miejsce
        </Button>
      </View>
    </ScrollView>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    width: screenWidth > 400 ? 380 : '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    gap: 20,
  },
  input: {
    fontSize: 16,
  },
});
