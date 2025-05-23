import React, { useState, createContext } from 'react';
import uuid from 'react-native-uuid';

export const PlacesContext = createContext();

export const PlacesProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);

  const addPlace = (title, description, location) => {
    const newPlace = {
      id: uuid.v4(),
      title,
      description,
      location,
      date: new Date().toISOString()
    };
    setPlaces(current => [newPlace, ...current]);
  };

  return (
    <PlacesContext.Provider value={{ places, addPlace }}>
      {children}
    </PlacesContext.Provider>
  );
};
