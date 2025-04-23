export enum Layer {
  GroceryStores = "Grocery_Store_Locations",
  GasStations = "Gas_Stations",
}

export const layerNames: Record<Layer, string> = {
  [Layer.GroceryStores]: "Grocery Stores",
  [Layer.GasStations]: "Gas Stations",
};
