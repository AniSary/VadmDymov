import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { PlacesContext } from '../context/PlacesContext';

const AddPlaceScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();
  const { addPlace } = useContext(PlacesContext);

  const handleAddPlace = () => {
    if (name.trim()) {
      addPlace({ name, description });
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Place</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        placeholderTextColor="#999"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />
      <Button
        mode="contained"
        onPress={handleAddPlace}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        Save
      </Button>
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 10,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default AddPlaceScreen;
