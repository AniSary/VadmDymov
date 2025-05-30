import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Button, Share } from 'react-native';
import { PlacesContext } from '../context/PlacesContext';

export default function PlaceDetailsScreen({ route }) {
  const { placeId } = route.params;
  const { miejsca } = useContext(PlacesContext);
  const place = miejsca.find((m) => m.id === placeId);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `📍 ${place.tytul}\n\n${place.opis}\n\nLokalizacja: ${place.wspolrzedne.lat.toFixed(4)}, ${place.wspolrzedne.lng.toFixed(4)}`
      });
    } catch (error) {
      console.error('❌ Błąd udostępniania:', error.message);
    }
  };

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
        <Text style={styles.description}>{place.opis}</Text>
        <Text>Lokalizacja: {place.wspolrzedne.lat.toFixed(4)}, {place.wspolrzedne.lng.toFixed(4)}</Text>
        <View style={styles.button}>
          <Button title="Udostępnij" onPress={handleShare} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 32,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
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
  button: {
    marginTop: 16,
  },
});
