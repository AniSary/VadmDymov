import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { PlacesContext } from '../context/PlacesContext';

const PlaceDetailsScreen = () => {
  const route = useRoute();
  const { miejsca } = useContext(PlacesContext);
  const { placeId } = route.params;

  const place = miejsca.find(p => p.id === placeId);

  if (!place) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Miejsce nie znalezione</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{place.tytul}</Text>
      <Text style={styles.description}>{place.opis}</Text>
      {place.wspolrzedne && (
        <Text style={styles.coordinates}>
          📍 {place.wspolrzedne.lat.toFixed(4)}, {place.wspolrzedne.lng.toFixed(4)}
        </Text>
      )}
      <Text style={styles.date}>{place.data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  description: {
    fontSize: 16,
    marginBottom: 12,
    color: '#34495e',
  },
  coordinates: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#95a5a6',
  },
});

export default PlaceDetailsScreen;
