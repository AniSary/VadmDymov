# PlacesApp — Aplikacja mobilna React Native

Aplikacja stworzona w React Native (Expo), umożliwiająca użytkownikom dodawanie, przeglądanie, udostępnianie i usuwanie własnych miejsc z obsługą trybu offline. Projekt spełnia 14 z 15 kryteriów zaliczeniowych.

## Technologie

- React Native z Expo
- Context API
- AsyncStorage
- React Navigation
- React Native Paper
- Expo Camera
- ESLint i Prettier

## Kryteria projektu

### 1. Architektura aplikacji
W projekcie zastosowano Context API jako wzorzec architektoniczny. Plik `PlacesContext.js` zarządza globalnym stanem aplikacji. Kod jest modularny, czytelny i zgodny z zaleceniami React.

### 2. Obsługa różnych rozmiarów i orientacji ekranu
Interfejs użytkownika został zbudowany przy użyciu Flexboxa oraz jednostek względnych. Widoki skalują się poprawnie na różnych rozdzielczościach i orientacjach ekranu.

### 3. Jakość kodu
Projekt zawiera konfigurację ESLint i Prettier (`.eslintrc.js`, `prettierrc`). Styl kodu jest jednolity, a struktura plików przejrzysta.

### 4. Testy jednostkowe
Pominięto na potrzeby projektu.

### 5. Dokumentacja kodu i projektu
Projekt zawiera niniejszy plik README z pełnym opisem działania. Kod jest częściowo skomentowany, a logika uporządkowana.

### 6. Integracja z natywnymi funkcjami urządzenia
Aplikacja wykorzystuje:
- kamerę (moduł Expo Camera) do robienia zdjęć miejsc
- lokalne przechowywanie danych (AsyncStorage) do utrwalania dodanych miejsc

### 7. Zarządzanie asynchronicznymi operacjami
Dane zapisywane i odczytywane są asynchronicznie przy użyciu `async/await`. Przykłady znajdują się w `PlacesContext.js`.

### 8. Nawigacja między ekranami
Nawigacja została zrealizowana z użyciem `React Navigation`. Obsługiwane jest przekazywanie parametrów (`route.params`) między ekranami.

### 9. Wydajność aplikacji
Do renderowania listy miejsc użyto `FlatList`, co zapewnia optymalną wydajność przy większej liczbie elementów. Stan zarządzany jest centralnie, bez zbędnych rerenderów.

### 10. Styl i UI/UX
Aplikacja posiada spójny i przejrzysty interfejs. Do stylizacji wykorzystano `React Native Paper` oraz własne style z zachowaniem jednolitego schematu wizualnego.

### 11. Obsługa stanu aplikacji
Stan aplikacji przechowywany jest w Context API. `PlacesProvider` dostarcza dane i funkcje (`addPlace`, `deletePlace`) do komponentów potomnych.

### 12. Obsługa błędów i sytuacji wyjątkowych
Wszystkie operacje na danych (`AsyncStorage`, udostępnianie, usuwanie) są zabezpieczone blokami `try/catch`, a błędy logowane do konsoli.

### 13. Tryb offline
Dane są zapisywane w `AsyncStorage`, dzięki czemu aplikacja działa również bez połączenia z internetem. Miejsca są przywracane przy starcie aplikacji.

### 14. Bezpieczeństwo
W projekcie nie są przechowywane wrażliwe dane. AsyncStorage używane jest wyłącznie do nieszkodliwych informacji (tytuł, opis, lokalizacja). Nie występują bezpośrednie połączenia z API ani dane logowania.

### 15. Deployment i budowanie aplikacji
Projekt zawiera pliki `eas.json`, `app.json` i inne potrzebne do kompilacji w środowisku Expo. Aplikacja może być zbudowana za pomocą EAS Build na Androida lub iOS.

## Uruchomienie projektu


Zeskanuj kod QR w aplikacji Expo Go lub uruchom w emulatorze.

## Struktura folderów

- `screens/` – ekrany aplikacji
- `context/` – globalny stan i logika miejsc
- `navigation/` – konfiguracja nawigacji
- `assets/` – ikony i zasoby graficzne

## Kontakt

Autor: [Vadym Dymov]  
Repozytorium: [https://github.com/AniSary/VadmDymov]

