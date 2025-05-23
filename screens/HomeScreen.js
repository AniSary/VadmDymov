import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PlacesContext } from '../context/PlacesContext';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { miejsca } = useContext(PlacesContext);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.placeItem}
      onPress={() => navigation.navigate('PlaceDetails', { placeId: item.id })}
    >
      <Text style={styles.title}>{item.tytul}</Text>
      <Text style={styles.subtitle}>{item.opis}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Button title="Dodaj miejsce" onPress={() => navigation.navigate('AddPlace')} />

      {miejsca.length === 0 ? (
        <Text style={styles.empty}>Brak miejsc.</Text>
      ) : (
        <FlatList
          data={miejsca}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  placeItem: {
    padding: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginTop: 10,
  },
  title: { fontWeight: 'bold', fontSize: 16 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 5 },
  empty: { textAlign: 'center', marginTop: 20, fontSize: 16 },
});
