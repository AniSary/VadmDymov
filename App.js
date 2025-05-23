import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';
import { PlacesProvider } from './context/PlacesContext';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <PlacesProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PlacesProvider>
    </>
  );
}
