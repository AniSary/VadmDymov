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
    labelStyle={styles.placeLabel}
    contentStyle={{ height: 50 }}
  >
    {item.tytul}
  </Button>
));

export default function HomeScreen() {
  const { miejsca } = useContext(PlacesContext);
  const navigation = useNavigation();

  const handleItemPress = useCallback(
    (id) => {
      navigation.navigate('PlaceDetails', { placeId: id });
    },
    [navigation]
  );

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={[styles.container, { width: screenWidth > 400 ? 380 : '100%' }]}>
      <Text style={styles.header}>Moje Miejsca</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('AddPlace')}
        style={styles.addButton}
        labelStyle={{ fontSize: 16 }}
      >
        Dodaj nowe miejsce
      </Button>
      <FlatList
        data={miejsca}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlaceItem item={item} onPress={handleItemPress} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  addButton: {
    marginBottom: 20,
    borderRadius: 8,
    paddingVertical: 6,
  },
  list: {
    gap: 10,
  },
  placeItem: {
    marginVertical: 5,
    borderRadius: 6,
    borderColor: '#6200ee',
    borderWidth: 1,
  },
  placeLabel: {
    color: '#6200ee',
    fontSize: 16,
  },
});
