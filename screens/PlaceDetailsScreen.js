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
        message: `📍 ${place.tytul}\n\n${place.opis}\n\nLokalizacja: ${place.wspolrzedne.lat.toFixed(4)}, ${place.wspolrzedne.lng.toFixed(4)}`,
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
        <Text>{place.opis}</Text>
        <Text style={styles.coord}>
          Lokalizacja: {place.wspolrzedne.lat.toFixed(4)}, {place.wspolrzedne.lng.toFixed(4)}
        </Text>
        <Text style={styles.date}>Dodano: {place.data}</Text>

        <View style={{ marginTop: 20 }}>
          <Button title="📤 Udostępnij to miejsce" onPress={handleShare} />
        </View>
      </View>
    </ScrollView>
  );
}
