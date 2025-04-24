import { gasStations } from "../data/gasStations"
import { groceryStores } from "../data/groceryStores"
import gasStation from "../assets/gas-station.svg"
import groceryStore from "../assets/store.svg"

export const LayerConfig = {
  GasStationsLayerConfig: {
    id: gasStations.name,
    displayName: "Gas Stations",
    color: [0, 0, 255],
    icon: gasStation,
    data: gasStations,
  },
  GroceryStoresLayerConfig: {
    id: groceryStores.name,
    color: [255, 0, 0],
    displayName: "Grocery Stores",
    icon: groceryStore,
    data: groceryStores,
  },
};
