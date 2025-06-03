import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { PlacesContext } from '../context/PlacesContext';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { miejsca } = useContext(PlacesContext);

  const renderPlace = ({ item }) => (
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('PlaceDetails', { placeId: item.id })}
      style={styles.card}
      labelStyle={styles.cardText}
    >
      {item.tytul}
    </Button>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Places</Text>
      <FlatList
        data={miejsca}
        renderItem={renderPlace}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate('AddPlace')}
        style={styles.addButton}
        labelStyle={styles.addButtonText}
      >
        + Add Place
      </Button>
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
    marginBottom: 12,
    borderRadius: 16,
  },
  cardText: {
    fontSize: 16,
    paddingVertical: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 12,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default HomeScreen;
