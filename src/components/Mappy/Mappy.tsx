import DeckGL from "@deck.gl/react/typed";
import {type MapViewState, type LayersList, PickingInfo } from "@deck.gl/core/typed";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { Map } from "react-map-gl/maplibre";
import { useState } from "react";
import { gasStations } from "../../data/gasStations";
import { groceryStores } from "../../data/groceryStores";
import LayerSelector from "../LayerSelector/LayerSelector";
import Popup from "../Popup/Popup";

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

  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // FIXME: popup position on zoom or scroll
  const handleLocationClick = (info: PickingInfo) => {
    if (info.object) {
      setSelectedLocation(info.object);
      setPopupPosition({
        x: info.x,
        y: info.y,
      });
    }
  };

  const handleClosePopup = () => {
    setSelectedLocation(null);
  };

  const GasStationsLayer = new GeoJsonLayer({
    id: GasStationLayerName,
    data: gasStations,
    getPointRadius: 25,
    getFillColor: [255, 0, 0],
    pickable: true,
    visible: visibleLayers.includes(GasStationLayerName),
    onClick: handleLocationClick,
  });

  const GroceryStoresLayer = new GeoJsonLayer({
    id: GroceryStoreLayerName,
    data: groceryStores,
    getPointRadius: 25,
    getFillColor: [0, 0, 255],
    pickable: true,
    visible: visibleLayers.includes(GroceryStoreLayerName),
    onClick: handleLocationClick,
  });

  const [layers, setLayers] = useState<LayersList>([
    GasStationsLayer,
    GroceryStoresLayer,
  ]);

  function handleLayerSelect(layerId: string, isChecked: boolean) {
    // FIXME: documentation specifically states *not* to do this, having trouble with alternate approaches
    //    https://deck.gl/docs/api-reference/core/layer#visible
    setVisibleLayers((prevVisibleLayerIds) => {
      const newVisibleLayers = isChecked
        ? [...prevVisibleLayerIds, layerId]
        : prevVisibleLayerIds.filter((id) => id !== layerId);

      const updatedLayers = [
        new GeoJsonLayer({
          id: GasStationLayerName,
          data: gasStations,
          getPointRadius: 25,
          getFillColor: [255, 0, 0],
          pickable: true,
          visible: newVisibleLayers.includes(GasStationLayerName),
          onClick: handleLocationClick,
        }),
        new GeoJsonLayer({
          id: GroceryStoreLayerName,
          data: groceryStores,
          getPointRadius: 25,
          getFillColor: [0, 0, 255],
          pickable: true,
          visible: newVisibleLayers.includes(GroceryStoreLayerName),
          onClick: handleLocationClick,
        }),
      ];

      setLayers(updatedLayers);
      return newVisibleLayers;
    });

    setSelectedLocation(null);
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
      {selectedLocation && (
        <Popup
          feature={selectedLocation}
          x={popupPosition.x}
          y={popupPosition.y}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
};

export default Mappy;
