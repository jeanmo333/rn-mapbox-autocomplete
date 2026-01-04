import type { ImageSourcePropType } from 'react-native';
import type { ReactElement } from 'react';

export interface MapboxFeature {
  id: string;
  place_name: string;
  center: [number, number]; // [lng, lat]
  context?: Array<{ id: string; text: string }>;
  properties?: {
    category?: string;
  };
}

export interface CustomInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export interface MapboxAutocompleteProps {
  accessToken: string;
  placeholder?: string;
  language?: string;
  types?: string[];
  limit?: number;
  country?: string;
  debounceDelay?: number;
  onLocationSelect?: (location: MapboxFeature) => void;
  onSearchChange?: (query: string) => void;
  style?: object;
  inputStyle?: object;
  resultsContainerStyle?: object;
  resultItemStyle?: object;
  showPoweredBy?: boolean;
  maxHeight?: number;
  showLocationIcon?: boolean;
  locationIconSource?: ImageSourcePropType;
  locationIconStyle?: object;
  customInput?: (props: CustomInputProps) => ReactElement;

  resultItemTextStyle?: object;
  loadingContainerStyle?: object;
  loadingTextStyle?: object;
  poweredByContainerStyle?: object;
  poweredByRowStyle?: object;
  poweredByTextStyle?: object;
  poweredByBoldTextStyle?: object;
  mapboxLogoStyle?: object;
}

export const searchMapboxPlaces = async (
  query: string,
  accessToken: string,
  language: string = 'en',
  types: string[] = [],
  limit: number = 5,
  country?: string
): Promise<MapboxFeature[]> => {
  if (query.length < 2) return [];

  try {
    const typesParam = types.length > 0 ? `&types=${types.join(',')}` : '';
    const countryParam = country ? `&country=${country}` : '';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      query
    )}.json?access_token=${accessToken}&limit=${limit}&language=${language}${typesParam}${countryParam}`;

    const response = await fetch(url);
    const data = await response.json();

    return data.features || [];
  } catch (error) {
    console.error('Mapbox search error:', error);
    return [];
  }
};
