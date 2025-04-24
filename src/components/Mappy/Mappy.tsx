import DeckGL from "@deck.gl/react/typed";
import {
  type MapViewState,
  type LayersList,
  PickingInfo,
} from "@deck.gl/core/typed";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { Map, Popup } from "react-map-gl/maplibre";
import { useState } from "react";
import LayerSelector from "../LayerSelector/LayerSelector";
import { LayerConfig } from "../../const/layer";
import { GasStation, GroceryStore } from "../../interfaces";
import PopupBody from "../PopupBody/PopupBody";

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: -77,
  latitude: 38.9,
  zoom: 12,
  bearing: 0,
  pitch: 0,
};

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";

const Mappy = () => {
  const { GasStationsLayerConfig, GroceryStoresLayerConfig } = LayerConfig;

  const [visibleLayers, setVisibleLayers] = useState<string[]>([
    GasStationsLayerConfig.id,
    GroceryStoresLayerConfig.id,
  ]);

  const [selectedLocation, setSelectedLocation] = useState<
    GasStation | GroceryStore | undefined
  >(undefined);

  const handleLocationClick = (info: PickingInfo) => {
    if (info.object) {
      setSelectedLocation(info.object as GasStation | GroceryStore);
    }
  };

  const handleClosePopup = () => {
    setSelectedLocation(undefined);
  };

  const [layers, setLayers] = useState<LayersList>([
    new GeoJsonLayer({
      id: GasStationsLayerConfig.id,
      data: GasStationsLayerConfig.data,
      getPointRadius: 25,
      getFillColor: [255, 0, 0],
      pickable: true,
      visible: visibleLayers.includes(GasStationsLayerConfig.id),
      onClick: handleLocationClick,
    }),
    new GeoJsonLayer({
      id: GroceryStoresLayerConfig.id,
      data: GroceryStoresLayerConfig.data,
      getPointRadius: 25,
      getFillColor: [0, 0, 255],
      pickable: true,
      visible: visibleLayers.includes(GroceryStoresLayerConfig.id),
      onClick: handleLocationClick,
    }),
  ]);

  function handleLayerSelect(layerId: string, isChecked: boolean) {
    const newVisibleLayers = isChecked
      ? [...visibleLayers, layerId]
      : visibleLayers.filter((id) => id !== layerId);

    const updatedLayers = [
      new GeoJsonLayer({
        id: GasStationsLayerConfig.id,
        data: GasStationsLayerConfig.data,
        getPointRadius: 25,
        getFillColor: [255, 0, 0],
        pickable: true,
        visible: newVisibleLayers.includes(GasStationsLayerConfig.id),
        onClick: handleLocationClick,
      }),
      new GeoJsonLayer({
        id: GroceryStoresLayerConfig.id,
        data: GroceryStoresLayerConfig.data,
        getPointRadius: 25,
        getFillColor: [0, 0, 255],
        pickable: true,
        visible: newVisibleLayers.includes(GroceryStoresLayerConfig.id),
        onClick: handleLocationClick,
      }),
    ];

    setVisibleLayers(newVisibleLayers);
    setLayers(updatedLayers);
  }

  return (
    <>
      <LayerSelector
        onSelectLayer={handleLayerSelect}
        visibleLayers={visibleLayers}
      />
      <DeckGL
        layers={layers}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
      >
        <Map reuseMaps mapStyle={MAP_STYLE}>
          {selectedLocation && (
            <Popup
              anchor="top"
              longitude={selectedLocation.geometry.coordinates[0]}
              latitude={selectedLocation.geometry.coordinates[1]}
              closeButton={true}
              onClose={handleClosePopup}
            >
              <PopupBody location={selectedLocation} />
            </Popup>
          )}
        </Map>
      </DeckGL>
    </>
  );
};

export default Mappy;
