export interface AddressResponse {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: AddressDetails;
}

export interface AddressDetails {
  road?: string;
  suburb?: string;
  neighbourhood?: string;
  city?: string;
  state?: string;
  country?: string;
  postcode?: string;
}

export interface Coords {
  lat: number;
  long: number;
}

export interface FavoriteLocation {
  id: string;
  name: string;
  address: string;
  coords: [number, number];
}