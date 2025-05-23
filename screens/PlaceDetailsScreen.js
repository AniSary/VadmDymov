import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PlacesContext } from '../context/PlacesContext';

export default function PlaceDetailsScreen({ route }) {
  const { miejsca } = useContext(PlacesContext);
  const { placeId } = route.params;

  const miejsce = miejsca.find((m) => m.id === placeId);

  if (!miejsce) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Nie znaleziono miejsca.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{miejsce.tytul}</Text>
      <Text style={styles.desc}>{miejsce.opis}</Text>
      <Text>📍 Szerokość: {miejsce.wspolrzedne.lat}</Text>
      <Text>📍 Długość: {miejsce.wspolrzedne.lng}</Text>
      <Text>📅 Data dodania: {miejsce.data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  title: { fontWeight: 'bold', fontSize: 20, marginBottom: 10 },
  desc: { fontSize: 16, marginBottom: 10 },
  error: { fontSize: 18, color: 'crimson', textAlign: 'center' },
});
