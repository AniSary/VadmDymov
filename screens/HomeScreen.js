import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PlacesContext } from '../context/PlacesContext';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { places, fetchPlaces } = useContext(PlacesContext);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const renderPlace = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PlaceDetails', { placeId: item.id })}
    >
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Места</Text>
      <FlatList
        data={places}
        renderItem={renderPlace}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddPlace')}
      >
        <Text style={styles.addButtonText}>+ Добавить место</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  list: {
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    color: '#222',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#4a90e2',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
