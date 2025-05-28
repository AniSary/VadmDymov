import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { PlacesContext } from '../context/PlacesContext';

export default function PlaceDetailsScreen({ route }) {
  const { placeId } = route.params;
  const { miejsca } = useContext(PlacesContext);
  const place = miejsca.find((m) => m.id === placeId);

  if (!place) {
    return (
      <View style={styles.container}>
        <Text>Miejsce nie znalezione</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>{place.tytul}</Text>
        <Text>{place.opis}</Text>
        <Text style={styles.coord}>
          Lokalizacja: {place.wspolrzedne.lat.toFixed(4)}, {place.wspolrzedne.lng.toFixed(4)}
        </Text>
        <Text style={styles.date}>Dodano: {place.data}</Text>
      </View>
    </ScrollView>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    elevation: 2,
    width: screenWidth > 400 ? 380 : '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  coord: {
    marginTop: 10,
    fontStyle: 'italic',
  },
  date: {
    marginTop: 5,
    color: '#888',
  },
});
