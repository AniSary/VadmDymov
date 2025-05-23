import React, { useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PlacesContext } from '../context/PlacesContext';

export default function HomeScreen() {
  const { miejsca } = useContext(PlacesContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View>
            <Button title="Dodaj miejsce" onPress={() => navigation.navigate('AddPlace')} />
            {miejsca.length === 0 && (
              <Text style={styles.emptyText}>Brak zapisanych miejsc</Text>
            )}
          </View>
        }
        data={miejsca}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('PlaceDetails', { placeId: item.id })}>
            <View style={styles.placeItem}>
              <Text style={styles.placeTitle}>{item.tytul}</Text>
              <Text>{item.opis}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: screenWidth > 400 ? 380 : '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    flex: 1,
  },
  emptyText: {
    marginTop: 20,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  placeItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  placeTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
