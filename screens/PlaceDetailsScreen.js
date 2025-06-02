import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { PlacesContext } from '../context/PlacesContext';

const PlaceDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { placeId } = route.params;
  const { places } = useContext(PlacesContext);

  const place = places.find(p => p.id === placeId);
  if (!place) return <Text style={styles.error}>Place not found</Text>;

  const hasValidCoordinates =
    place.coordinates &&
    typeof place.coordinates.lat === 'number' &&
    typeof place.coordinates.lng === 'number';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{place.name || place.title}</Text>
      <Text style={styles.description}>{place.description}</Text>
      {hasValidCoordinates && (
        <Text style={styles.coords}>
          Lat: {place.coordinates.lat.toFixed(4)} | Lng: {place.coordinates.lng.toFixed(4)}
        </Text>
      )}
      <Button
        mode="contained"
        onPress={() => navigation.goBack()}
        style={styles.backButton}
        labelStyle={styles.backButtonText}
      >
        ← Back
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 14,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  coords: {
    fontSize: 14,
    color: '#777',
    marginTop: 10,
  },
  backButton: {
    marginTop: 30,
    borderRadius: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'red',
    fontSize: 18,
  },
});

export default PlaceDetailsScreen;
