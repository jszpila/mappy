import DeckGL from "@deck.gl/react/typed";
import { type MapViewState, type LayersList } from "@deck.gl/core/typed";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { Map } from "react-map-gl/maplibre";
import { useState } from "react";
import { gasStations } from "../../data/gasStations";
import { groceryStores } from "../../data/groceryStores";
import LayerSelector from "../LayerSelector/LayerSelector";

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: -77,
  latitude: 38.9,
  zoom: 12,
};

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";

const Mappy = () => {
  const GasStationLayerName = gasStations.name;
  const GroceryStoreLayerName = groceryStores.name;
  
  const [visibleLayers, setVisibleLayers] = useState([
    GasStationLayerName,
    GroceryStoreLayerName,
  ]);

  const GasStationsLayer = new GeoJsonLayer({
    id: GasStationLayerName,
    data: gasStations,
    getPointRadius: 25,
    getFillColor: [255, 0, 0],
    pickable: true,
    visible: visibleLayers.includes(GasStationLayerName),
  });

  const GroceryStoresLayer = new GeoJsonLayer({
    id: GroceryStoreLayerName,
    data: groceryStores,
    getPointRadius: 25,
    getFillColor: [0, 0, 255],
    pickable: true,
    visible: visibleLayers.includes(GroceryStoreLayerName),
  });

  const [layers, setLayers] = useState<LayersList>([
    GasStationsLayer,
    GroceryStoresLayer,
  ]);

  function handleLayerSelect(layerId: string, isChecked: boolean) {
    console.log(`Layer ${layerId} is now ${isChecked ? "enabled" : "disabled"}`);
  
    setVisibleLayers((prevVisibleLayerIds) => {
      if (prevVisibleLayerIds.includes(layerId)) {
        return prevVisibleLayerIds.filter((id) => id !== layerId);
      } else {
        return [...visibleLayers, layerId];
      }
    });
  }

  return (
    <>
      <LayerSelector onSelectLayer={handleLayerSelect} />
      <DeckGL
        layers={layers}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
      >
        <Map reuseMaps mapStyle={MAP_STYLE} />
      </DeckGL>
    </>
  );
};

export default Mappy;
