import React, { useContext, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PlacesContext } from '../context/PlacesContext';
import { Button } from 'react-native-paper';

const PlaceItem = React.memo(({ item, onPress }) => (
  <Button
    mode="outlined"
    style={styles.placeItem}
    onPress={() => onPress(item.id)}
  >
    {item.tytul}
  </Button>
));

export default function HomeScreen() {
  const { miejsca } = useContext(PlacesContext);
  const navigation = useNavigation();

  const handleItemPress = useCallback((id) => {
    navigation.navigate('PlaceDetails', { placeId: id });
  }, [navigation]);

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={[styles.container, { width: screenWidth > 400 ? 380 : '100%' }]}>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('AddPlace')}
        style={styles.addButton}
        buttonColor="#6200ee"
        textColor="#fff"
      >
        Dodaj miejsce
      </Button>

      {miejsca.length === 0 ? (
        <Text style={styles.empty}>Brak zapisanych miejsc</Text>
      ) : (
        <FlatList
          data={miejsca}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PlaceItem item={item} onPress={handleItemPress} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignSelf: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  addButton: {
    marginBottom: 20,
  },
  placeItem: {
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});
