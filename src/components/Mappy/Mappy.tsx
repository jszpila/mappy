import DeckGL from "@deck.gl/react/typed";
import {
  type MapViewState,
  PickingInfo,
} from "@deck.gl/core/typed";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { Map } from "react-map-gl/maplibre";
import { useState } from "react";
import LayerSelector from "../LayerSelector/LayerSelector";
import { LayerConfig } from "../../const/layer";
import { GasStation, GroceryStore } from "../../interfaces";
import Popup from "../Popup/Popup";

import "maplibre-gl/dist/maplibre-gl.css";

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

  const handleLocationClick = ({object}: PickingInfo) => {
    // NOTE: close popup if same location is clicked
    if (selectedLocation && object 
      && selectedLocation.geometry.coordinates === object.geometry.coordinates
    ) {
      setSelectedLocation(undefined);
    } else if (object) {
      setSelectedLocation(object as GasStation | GroceryStore);
    }
  };

  const layers = [
    visibleLayers.includes(GasStationsLayerConfig.id) && 
      new GeoJsonLayer({
        id: GasStationsLayerConfig.id,
        data: GasStationsLayerConfig.data,
        getPointRadius: 25,
        getFillColor: [255, 0, 0],
        pickable: true,
        onClick: handleLocationClick,
      }),
    visibleLayers.includes(GroceryStoresLayerConfig.id) &&
      new GeoJsonLayer({
        id: GroceryStoresLayerConfig.id,
        data: GroceryStoresLayerConfig.data,
        getPointRadius: 25,
        getFillColor: [0, 0, 255],
        pickable: true,
        onClick: handleLocationClick,
      }),
  ];

  function handleLayerSelect(layerId: string, isChecked: boolean) {
    const newVisibleLayers = isChecked
      ? [...visibleLayers, layerId]
      : visibleLayers.filter((id) => id !== layerId);

    setSelectedLocation(undefined);
    setVisibleLayers([...newVisibleLayers]);
  }

  return (
    <>
      <LayerSelector
        onSelectLayer={handleLayerSelect}
        visibleLayers={visibleLayers}
      />
      {/* 
        FIXME: popup is displaying under map markers, resulting in improper display & extra click handling logic.
          Research how to rectify conflicting examples of interleave intregation mode.
          https://deck.gl/docs/developer-guide/base-maps/using-with-maplibre
      */}
      <DeckGL
        layers={layers}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        getCursor={({ isHovering }) => (isHovering ? "pointer" : "crosshair")}
        // NOTE: close popup if click outside of a location
        onClick={(info) => {
          !info.object && setSelectedLocation(undefined);
        }}
      >
        <Map reuseMaps mapStyle={MAP_STYLE} >
        {selectedLocation && (
          <Popup
            location={selectedLocation}
            closeHandler={() => setSelectedLocation(undefined)}
          />
        )}
        </Map>
      </DeckGL>
    </>
  );
};

export default Mappy;
