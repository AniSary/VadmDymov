import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { PlacesContext } from '../context/PlacesContext';

const PlaceDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { placeId } = route.params;
  const { places } = useContext(PlacesContext);

  const place = places.find(p => p.id === placeId);
  if (!place) return <Text style={styles.error}>Место не найдено</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{place.name}</Text>
      <Text style={styles.description}>{place.description}</Text>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Назад</Text>
      </TouchableOpacity>
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
  backButton: {
    marginTop: 30,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#4a90e2',
    alignItems: 'center',
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
