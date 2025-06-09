import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { PlacesContext } from '../context/PlacesContext';
import { View, Text, ScrollView, Share, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function PlaceDetailsScreen({ route }) {
  const { place } = route.params;
  const navigation = useNavigation();
  const { deletePlace } = useContext(PlacesContext);

  const handleDelete = () => {
    deletePlace(place.id);
    navigation.goBack();
  };

  if (!place) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Nie znaleziono miejsca</Text>
      </View>
    );
  }

  const handleShare = async () => {
    try {
      const message = `
📍 Miejsce: ${place.title}
📝 Opis: ${place.description}
📍 Lokalizacja: ${
        typeof place.coordinates?.lat === 'number' && typeof place.coordinates?.lng === 'number'
          ? `${place.coordinates.lat.toFixed(4)}, ${place.coordinates.lng.toFixed(4)}`
          : 'Brak danych'
      }
🕒 Dodano: ${place.date}
`;
      await Share.share({ message });
    } catch (error) {
      console.log('❌ Błąd przy udostępnianiu:', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{place.title}</Text>
      <Text style={styles.description}>{place.description}</Text>
      <Text style={styles.coords}>
        Lokalizacja:{' '}
        {typeof place.coordinates?.lat === 'number' && typeof place.coordinates?.lng === 'number'
          ? `${place.coordinates.lat.toFixed(4)}, ${place.coordinates.lng.toFixed(4)}`
          : 'Brak danych'}
      </Text>
      <Text style={styles.date}>Dodano: {place.date}</Text>

      <Button
        mode="contained"
        onPress={handleShare}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Udostępnij
      </Button>

      <Button
        mode="contained"
        onPress={handleDelete}
        style={{ marginTop: 16, backgroundColor: '#d32f2f' }}
      >
        Usuń miejsce
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    marginBottom: 12,
  },
  coords: {
    fontSize: 14,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#6200ee',
    paddingVertical: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
