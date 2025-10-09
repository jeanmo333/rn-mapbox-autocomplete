import { StyleSheet, View, Text, Alert } from 'react-native';
import MapboxAutocomplete from 'rn-mapbox-autocomplete';
import type { MapboxFeature } from 'rn-mapbox-autocomplete';

// Reemplaza con tu token real de Mapbox
const MAPBOX_ACCESS_TOKEN = '';

export default function App() {
  const handleLocationSelect = (location: MapboxFeature) => {
    console.log('Selected location:', location);
    Alert.alert(
      'Location Selected',
      `${location.place_name}\nLat: ${location.center[1]}\nLng: ${location.center[0]}`
    );
  };

  const handleSearchChange = (query: string) => {
    console.log('Search query:', query);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapbox Autocomplete Example</Text>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Basic Usage</Text>
        <MapboxAutocomplete
          accessToken={MAPBOX_ACCESS_TOKEN}
          placeholder="Search for places..."
          language="en"
          // locationIconSource={require('./assets/logo-mapbox.jpg')}
          onLocationSelect={handleLocationSelect}
          onSearchChange={handleSearchChange}
          maxHeight={250}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Custom Style</Text>
        <MapboxAutocomplete
          accessToken={MAPBOX_ACCESS_TOKEN}
          placeholder="Buscar ubicación..."
          language="es"
          types={['country', 'region', 'place']}
          limit={5}
          onLocationSelect={handleLocationSelect}
          inputStyle={styles.customInput}
          resultsContainerStyle={styles.customResults}
          maxHeight={200}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  section: {
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#666',
  },
  customInput: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
    borderWidth: 2,
    borderRadius: 10,
  },
  customResults: {
    borderColor: '#2196f3',
    backgroundColor: '#f3f9ff',
  },
});
