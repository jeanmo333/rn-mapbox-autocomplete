import { StyleSheet, View, Text, Alert, TextInput } from 'react-native';
import { PaperProvider, TextInput as TextInputPaper } from 'react-native-paper';
import MapboxAutocomplete from 'rn-mapbox-autocomplete';
import type { MapboxFeature, CustomInputProps } from 'rn-mapbox-autocomplete';

const MAPBOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

// Componente separado para evitar el warning de React
const CustomTextInput = ({
  value,
  onChangeText,
  placeholder,
}: CustomInputProps) => (
  <TextInput
    style={styles.customInputComponent}
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    autoCapitalize="none"
    autoCorrect={false}
  />
);

// Componente separado para Paper Input
const PaperTextInput = ({
  value,
  onChangeText,
  placeholder,
}: CustomInputProps) => (
  <TextInputPaper
    mode="outlined"
    value={value}
    label="Search Location"
    onChangeText={onChangeText}
    placeholder={placeholder}
    autoCapitalize="none"
    autoCorrect={false}
    style={styles.paperInput}
  />
);

export default function App() {
  const handleLocationSelect = (location: MapboxFeature) => {
    console.log('Selected location:', JSON.stringify(location, null, 2));
    Alert.alert(
      'Location Selected',
      `${location.place_name}\nLat: ${location.center[1]}\nLng: ${location.center[0]}`
    );
  };

  const handleSearchChange = (_query: string) => {
    // console.log('Search query:', query);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Mapbox Autocomplete Example</Text>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Basic Usage</Text>
          <MapboxAutocomplete
            accessToken={MAPBOX_ACCESS_TOKEN}
            debounceDelay={1000}
            country="US"
            types={['address']}
            placeholder="Search for places..."
            language="en"
            onLocationSelect={handleLocationSelect}
            onSearchChange={handleSearchChange}
            maxHeight={250}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Custom Style</Text>
          <MapboxAutocomplete
            accessToken={MAPBOX_ACCESS_TOKEN}
            country="CL"
            types={['address']}
            placeholder="Buscar ubicación..."
            language="es"
            // types={['country', 'region', 'place']}
            limit={5}
            onLocationSelect={handleLocationSelect}
            inputStyle={styles.customInput}
            resultsContainerStyle={styles.customResults}
            maxHeight={200}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Custom Input Component</Text>
          <MapboxAutocomplete
            accessToken={MAPBOX_ACCESS_TOKEN}
            country="CL"
            types={['address']}
            placeholder="Custom input placeholder..."
            onLocationSelect={handleLocationSelect}
            customInput={CustomTextInput}
            maxHeight={200}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>
            Custom Input react native paper Component
          </Text>
          <MapboxAutocomplete
            accessToken={MAPBOX_ACCESS_TOKEN}
            country="CL"
            types={['address']}
            placeholder="Placeholder paper"
            onLocationSelect={handleLocationSelect}
            resultsContainerStyle={styles.customResultsPaper}
            customInput={PaperTextInput}
            maxHeight={200}
          />
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 100,
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
  customInputComponent: {
    height: 50,
    borderColor: '#ff9800',
    borderWidth: 2,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#fff3e0',
    color: '#e65100',
  },
  customResultsPaper: {
    marginTop: 5,
  },
  paperInput: {
    backgroundColor: 'white',
  },
});
