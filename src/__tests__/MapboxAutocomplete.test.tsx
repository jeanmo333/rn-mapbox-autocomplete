import { render } from '@testing-library/react-native';
import type { MapboxAutocompleteProps } from '../RnMapboxAutocomplete';
import MapboxAutocomplete from '../MapboxAutocomplete';

// Mock the fetch function for Mapbox API calls
global.fetch = jest.fn();

// Mock the image assets
jest.mock('../assets/localizacion.png', () => 'mocked-location-icon');
jest.mock('../assets/logo-mapbox.jpg', () => 'mocked-mapbox-logo');

const mockProps: MapboxAutocompleteProps = {
  accessToken: 'test-token',
  onLocationSelect: jest.fn(),
};

describe('MapboxAutocomplete', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders MapboxAutocomplete component', () => {
    const { getByPlaceholderText } = render(
      <MapboxAutocomplete {...mockProps} placeholder="Search places..." />
    );

    expect(getByPlaceholderText('Search places...')).toBeTruthy();
  });

  test('renders with default placeholder when none provided', () => {
    const { getByPlaceholderText } = render(
      <MapboxAutocomplete {...mockProps} />
    );

    // Usando el placeholder por defecto correcto
    expect(getByPlaceholderText('Search place')).toBeTruthy();
  });

  test('applies custom input style', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByPlaceholderText } = render(
      <MapboxAutocomplete
        {...mockProps}
        placeholder="Test"
        inputStyle={customStyle}
      />
    );

    const input = getByPlaceholderText('Test');
    expect(input.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining(customStyle)])
    );
  });
});
