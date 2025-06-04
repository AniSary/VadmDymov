import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './navigation/AppNavigator';
import { PlacesProvider } from './context/PlacesContext';
import { Provider as PaperProvider } from 'react-native-paper';
import { Text } from 'react-native';

// 🛡️ Error Boundary для защиты от UI-крэшей
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Text style={{ margin: 20, fontSize: 18, color: 'red' }}>Wystąpił nieoczekiwany błąd.</Text>;
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <PaperProvider>
      <PlacesProvider>
        <ErrorBoundary>
          <NavigationContainer>
            <AppNavigator />
            <StatusBar style="auto" />
          </NavigationContainer>
        </ErrorBoundary>
      </PlacesProvider>
    </PaperProvider>
  );
}
