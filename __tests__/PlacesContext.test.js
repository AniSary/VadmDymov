// __tests__/PlacesContext.test.js
import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { PlacesProvider, PlacesContext } from '../context/PlacesContext';

const wrapper = ({ children }) => <PlacesProvider>{children}</PlacesProvider>;

describe('PlacesContext', () => {
  it('dodaje miejsce poprawnie', async () => {
    const { result } = renderHook(() => React.useContext(PlacesContext), { wrapper });

    await act(async () => {
      await result.current.dodajMiejsce('Testowe miejsce', 'Opis', { lat: 0, lng: 0 });
    });

    expect(result.current.miejsca.length).toBe(1);
    expect(result.current.miejsca[0].tytul).toBe('Testowe miejsce');
  });
});
