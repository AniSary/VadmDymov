import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import AddPlaceScreen from '../screens/AddPlaceScreen';
import PlaceDetailsScreen from '../screens/PlaceDetailsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#6200ee' },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Lista Miejsc' }}
      />
      <Stack.Screen
        name="AddPlace"
        component={AddPlaceScreen}
        options={{ title: 'Dodaj Miejsce' }}
      />
      <Stack.Screen
        name="PlaceDetails"
        component={PlaceDetailsScreen}
        options={{ title: 'Szczegóły Miejsca' }}
      />
    </Stack.Navigator>
  );
}
