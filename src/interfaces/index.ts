export interface LocationProperties {
  name: string;
  [key: string]: any; // to allow for arbitrary attributes
}

export interface LocationGeometry {
  type: "Point";
  coordinates: [number, number]; // [long, lat]
}

export interface GasStation {
  type: "Feature";
  geometry: LocationGeometry;
  properties: LocationProperties;
}

export interface GroceryStore {
  type: "Feature";
  geometry: LocationGeometry;
  properties: LocationProperties;
}

export interface GeoJsonData<T> {
  type: "FeatureCollection";
  features: T[];
}
