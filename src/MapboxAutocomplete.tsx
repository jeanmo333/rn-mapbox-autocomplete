import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import type {
  MapboxFeature,
  MapboxAutocompleteProps,
} from './RnMapboxAutocomplete';
import { searchMapboxPlaces } from './RnMapboxAutocomplete';

const MapboxAutocomplete: React.FC<MapboxAutocompleteProps> = ({
  accessToken,
  placeholder = 'Search place',
  language = 'en',
  types = ['country', 'region', 'place'],
  limit = 5,
  onLocationSelect,
  onSearchChange,
  style,
  inputStyle,
  resultsContainerStyle,
  resultItemStyle,
  showPoweredBy = true,
  maxHeight = 300,
  showLocationIcon = true,
  locationIconSource,
  locationIconStyle,
  customInput,

  resultItemTextStyle,
  loadingContainerStyle,
  loadingTextStyle,
  poweredByContainerStyle,
  poweredByRowStyle,
  poweredByTextStyle,
  poweredByBoldTextStyle,
  mapboxLogoStyle,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MapboxFeature[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPlaces = async (text: string) => {
    setQuery(text);
    onSearchChange?.(text);

    if (text.length < 2) {
      setResults([]);
      return;
    }

    try {
      setIsLoading(true);
      const searchResults = await searchMapboxPlaces(
        text,
        accessToken,
        language,
        types,
        limit
      );
      setResults(searchResults);
    } catch (error) {
      console.error('Error fetching places:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = (item: MapboxFeature) => {
    setQuery(item.place_name);
    setResults([]);
    onLocationSelect?.(item);
  };

  const renderLocationItem = ({
    item,
    index,
  }: {
    item: MapboxFeature;
    index: number;
  }) => (
    <TouchableOpacity
      style={[
        styles.resultItem,
        resultItemStyle,
        index === results.length - 1 ? {} : styles.resultItemBorder,
      ]}
      onPress={() => handleLocationSelect(item)}
    >
      {showLocationIcon && (
        <Image
          source={locationIconSource || require('./assets/localizacion.png')}
          style={[styles.locationIcon, locationIconStyle]}
        />
      )}
      <Text style={[styles.resultItemText, resultItemTextStyle]}>
        {item.place_name}
      </Text>
    </TouchableOpacity>
  );

  const renderInput = () => {
    if (customInput) {
      return customInput({
        value: query,
        onChangeText: fetchPlaces,
        placeholder,
      });
    }

    return (
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        value={query}
        onChangeText={fetchPlaces}
        autoCapitalize="none"
        autoCorrect={false}
      />
    );
  };

  return (
    <View style={[styles.container, style]}>
      {renderInput()}

      {(results.length > 0 || isLoading) && (
        <View
          style={[
            styles.resultsContainer,
            { maxHeight },
            resultsContainerStyle,
          ]}
        >
          {isLoading ? (
            <View style={[styles.loadingContainer, loadingContainerStyle]}>
              <Text style={[styles.loadingText, loadingTextStyle]}>
                Searching...
              </Text>
            </View>
          ) : (
            <>
              <FlatList
                data={results}
                keyExtractor={(item) => item.id}
                renderItem={renderLocationItem}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              />
              {showPoweredBy && (
                <View
                  style={[styles.poweredByContainer, poweredByContainerStyle]}
                >
                  <View style={[styles.poweredByRow, poweredByRowStyle]}>
                    <Text style={[styles.poweredByText, poweredByTextStyle]}>
                      Powered by{' '}
                      <Text
                        style={[styles.poweredByBold, poweredByBoldTextStyle]}
                      >
                        Mapbox
                      </Text>
                    </Text>
                    <Image
                      source={require('./assets/logo-mapbox.jpg')}
                      style={[styles.mapboxLogo, mapboxLogoStyle]}
                    />
                  </View>
                </View>
              )}
            </>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
    resizeMode: 'contain',
  },
  resultsContainer: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultItemText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  poweredByContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 10,
    paddingRight: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  poweredByText: {
    fontSize: 15,
    color: '#666',
  },
  poweredByBold: {
    fontWeight: '600',
    color: '#333',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  poweredByRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapboxLogo: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
    resizeMode: 'contain',
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
  },
});

export default MapboxAutocomplete;
