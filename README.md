# rn-mapbox-autocomplete

A powerful and customizable Mapbox Places autocomplete component for React Native applications.

## Features

- 🔍 Real-time place search using Mapbox Geocoding API
- 🎨 Fully customizable styling
- 🔧 Custom input component support
- 🌍 Multi-language support
- 📱 Cross-platform (iOS & Android)
- ⚡ TypeScript support
- 🎯 Configurable search types (country, region, place, etc.)
- 📍 Optional location icons
- 🏷️ "Powered by Mapbox" attribution

## Installation

```sh
npm install rn-mapbox-autocomplete
```

Or with Yarn:

```sh
yarn add rn-mapbox-autocomplete
```

## Prerequisites

You'll need a Mapbox access token. Get one for free at [Mapbox](https://www.mapbox.com/).

## Basic Usage

```tsx
import React from 'react';
import { View, Alert } from 'react-native';
import MapboxAutocomplete, { MapboxFeature } from 'rn-mapbox-autocomplete';

export default function App() {
  const handleLocationSelect = (location: MapboxFeature) => {
    Alert.alert(
      'Location Selected',
      `${location.place_name}\nLat: ${location.center[1]}\nLng: ${location.center[0]}`
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <MapboxAutocomplete
        accessToken="YOUR_MAPBOX_ACCESS_TOKEN"
        placeholder="Search for places..."
        onLocationSelect={handleLocationSelect}
      />
    </View>
  );
}
```

## Advanced Usage

```tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapboxAutocomplete, { MapboxFeature } from 'rn-mapbox-autocomplete';

export default function App() {
  const handleLocationSelect = (location: MapboxFeature) => {
    console.log('Selected:', location);
  };

  const handleSearchChange = (query: string) => {
    console.log('Searching:', query);
  };

  return (
    <View style={styles.container}>
      <MapboxAutocomplete
        accessToken="YOUR_MAPBOX_ACCESS_TOKEN"
        placeholder="Buscar ubicación..."
        language="es"
        types={['country', 'region', 'place']}
        limit={8}
        maxHeight={250}
        showLocationIcon={true}
        showPoweredBy={true}
        onLocationSelect={handleLocationSelect}
        onSearchChange={handleSearchChange}
        inputStyle={styles.input}
        resultsContainerStyle={styles.results}
        resultItemStyle={styles.resultItem}
        resultItemTextStyle={}
        loadingContainerStyle={}
        loadingTextStyle={}
        poweredByContainerStyle={}
        poweredByRowStyle={}
        poweredByTextStyle={}
        poweredByBoldTextStyle={}
        mapboxLogoStyle={}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#2196f3',
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 16,
  },
  results: {
    backgroundColor: '#fff',
    borderColor: '#2196f3',
    borderRadius: 10,
  },
  resultItem: {
    paddingVertical: 15,
  },
});
```

## Custom Input Component

You can provide your own custom input component for maximum flexibility:

```tsx
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import MapboxAutocomplete, { CustomInputProps } from 'rn-mapbox-autocomplete';

export default function App() {
  const CustomSearchInput = ({ value, onChangeText, placeholder }: CustomInputProps) => (
    <TextInput
      style={styles.customInput}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      autoCapitalize="none"
      autoCorrect={false}
    />
  );

  return (
    <View style={styles.container}>
      <MapboxAutocomplete
        accessToken="YOUR_MAPBOX_ACCESS_TOKEN"
        placeholder="Enter location..."
        customInput={CustomSearchInput}
        onLocationSelect={(location) => {
          console.log('Selected:', location.place_name);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  customInput: {
    height: 50,
    borderColor: '#ff9800',
    borderWidth: 2,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#fff3e0',
  },
});
```

## React Native Paper Integration or Others input libreries

You can easily integrate with React Native Paper components or Others input libreries for a Material Design look:

```tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PaperProvider, TextInput as TextInputPaper } from 'react-native-paper';
import MapboxAutocomplete, { CustomInputProps } from 'rn-mapbox-autocomplete';

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <MapboxAutocomplete
          accessToken="YOUR_MAPBOX_ACCESS_TOKEN"
          placeholder="Search location..."
          customInput={({ value, onChangeText, placeholder }: CustomInputProps) => (
            <TextInputPaper
              mode="outlined"
              label="Search Location"
              value={value}
              onChangeText={onChangeText}
              placeholder={placeholder}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.paperInput}
            />
          )}
          onLocationSelect={(location) => {
            console.log('Selected:', location.place_name);
          }}
          resultsContainerStyle={styles.resultsContainer}
          maxHeight={200}
        />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  paperInput: {
    backgroundColor: 'white',
  },
  resultsContainer: {
    marginTop: 5,
  },
});
```

### Important Notes for React Native Paper

1. **PaperProvider Required**: Always wrap your app with `PaperProvider` for proper theming
2. **Background Color**: Set `backgroundColor: 'white'` on the TextInput for proper outline visibility
3. **Results Container Margin**: Add `marginTop` to `resultsContainerStyle` for proper spacing with outlined inputs

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accessToken` | `string` | **Required** | Your Mapbox access token |
| `placeholder` | `string` | `"Search place"` | Input placeholder text |
| `language` | `string` | `"en"` | Search language (ISO 639-1) |
| `types` | `string[]` | `["country", "region", "place"]` | Place types to search |
| `limit` | `number` | `5` | Maximum number of results |
| `maxHeight` | `number` | `300` | Maximum height of results container |
| `showLocationIcon` | `boolean` | `true` | Show location icon in results |
| `showPoweredBy` | `boolean` | `true` | Show "Powered by Mapbox" attribution |
| `customInput` | `(props: CustomInputProps) => ReactElement` | `undefined` | Custom input component renderer |
| `onLocationSelect` | `(location: MapboxFeature) => void` | `undefined` | Callback when location is selected |
| `onSearchChange` | `(query: string) => void` | `undefined` | Callback when search query changes |

### Styling Props

| Prop | Type | Description |
|------|------|-------------|
| `style` | `ViewStyle` | Container style |
| `inputStyle` | `TextStyle` | Input field style |
| `resultsContainerStyle` | `ViewStyle` | Results container style |
| `resultItemStyle` | `ViewStyle` | Individual result item style |
| `locationIconSource` | `ImageSourcePropType` | Custom location icon |
| `locationIconStyle` | `ImageStyle` | Location icon style |
| `loadingContainerStyle` | `ViewStyle` | Style for the loading container |
| `loadingTextStyle` | `TextStyle` | Style for the loading text |
| `poweredByContainerStyle` | `ViewStyle` | Style for the "Powered by Mapbox" container |
| `poweredByRowStyle` | `ViewStyle` | Style for the "Powered by Mapbox" row |
| `poweredByTextStyle` | `TextStyle` | Style for the "Powered by" text |
| `poweredByBoldTextStyle` | `TextStyle` | Style for the "Mapbox" bold text |
| `mapboxLogoStyle` | `ImageStyle` | Style for the Mapbox logo |
| `resultItemTextStyle` | `TextStyle` | Style for the "result Item by" text |

### Types

```tsx
interface MapboxFeature {
  id: string;
  place_name: string;
  center: [number, number]; // [longitude, latitude]
  context?: Array<{ id: string; text: string }>;
  properties?: {
    category?: string;
  };
}

interface CustomInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}
```

### Available Place Types

- `country` - Countries
- `region` - States, provinces, territories
- `postcode` - Postal codes
- `district` - Districts, boroughs
- `place` - Cities, towns, villages
- `locality` - Neighborhoods, suburbs
- `neighborhood` - Local neighborhoods
- `address` - Street addresses
- `poi` - Points of interest

## Utility Functions

You can also use the search function directly:

```tsx
import { searchMapboxPlaces } from 'rn-mapbox-autocomplete';

const searchPlaces = async () => {
  const results = await searchMapboxPlaces(
    'New York',
    'YOUR_ACCESS_TOKEN',
    'en',
    ['place'],
    5
  );
  console.log(results);
};
```

## Example Project

Check out the example project in the `example` folder for a complete implementation.

To run the example:

```sh
cd example
npm install
# For iOS
npx react-native run-ios
# For Android
npx react-native run-android
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with ❤️ and [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
