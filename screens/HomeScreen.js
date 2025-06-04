import React, { useState, useContext, useCallback } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Dimensions } from 'react-native';
import { PlacesContext } from '../context/PlacesContext';
import { Button, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const { places } = useContext(PlacesContext);
  const navigation = useNavigation();
  const [filter, setFilter] = useState('');

  console.log("🏠 HomeScreen got places:", places); // отладка

  const filteredPlaces = places.filter((place) =>
    place.title.toLowerCase().includes(filter.toLowerCase())
  );

  const renderItem = useCallback(({ item }) => (
    <View style={styles.placeItem}>
      <Text style={styles.placeTitle}>{item.title}</Text>
      <Text numberOfLines={2} style={styles.placeDescription}>{item.description}</Text>
      <Button
        mode="outlined"
        style={styles.detailsButton}
        onPress={() => navigation.navigate('PlaceDetails', { place: item })}
      >
        Szczegóły
      </Button>
    </View>
  ), [places]); // ✅ теперь обновляется при изменении

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista miejsc</Text>

      <TextInput
        style={styles.input}
        placeholder="Szukaj według tytułu"
        value={filter}
        onChangeText={setFilter}
      />

      {filteredPlaces.length === 0 ? (
        <Text style={styles.emptyText}>Brak miejsc do wyświetlenia</Text>
      ) : (
        <FlatList
          data={filteredPlaces}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}

      <FAB
        icon="plus"
        label="Dodaj"
        style={styles.fab}
        onPress={() => navigation.navigate('AddPlace')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fefefe',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 20,
    textAlign: 'center',
  },
  placeItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  placeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  placeDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  detailsButton: {
    alignSelf: 'flex-start',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 16,
    bottom: 16,
    backgroundColor: '#6200ee',
  },
});

export default HomeScreen;
