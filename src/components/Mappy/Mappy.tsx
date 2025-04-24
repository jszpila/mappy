import DeckGL from "@deck.gl/react/typed";
import {type MapViewState, type LayersList, PickingInfo } from "@deck.gl/core/typed";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { Map } from "react-map-gl/maplibre";
import { useState } from "react";
import LayerSelector from "../LayerSelector/LayerSelector";
import Popup from "../Popup/Popup";
import { LayerConfig } from "../../const/layer";

// TODO:
// - [ ] type GasStation, GroceryStore
// - [ ] use react-map-gl's Popup instead of custom Popup
// - [ ] use icons for map markers
// - [ ] clean up

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: -77,
  latitude: 38.9,
  zoom: 12,
};

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";

const Mappy = () => {
  const { GasStationsLayerConfig, GroceryStoresLayerConfig } = LayerConfig;

  const [visibleLayers, setVisibleLayers] = useState<string[]>([
    GasStationsLayerConfig.id,
    GroceryStoresLayerConfig.id,
  ]);

  // TODO: type GasStations and GroceryStores
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
    const prevVisibleLayerIds = visibleLayers;
    const newVisibleLayers = isChecked
      ? [...prevVisibleLayerIds, layerId]
      : prevVisibleLayerIds.filter((id) => id !== layerId);

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

    setSelectedLocation(null);
    setVisibleLayers([...newVisibleLayers]);

    // FIXME: documentation specifically states *not* to do this, having trouble with alternate approaches
    //    https://deck.gl/docs/api-reference/core/layer#visible
    setLayers([...updatedLayers]);
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
        <Map reuseMaps mapStyle={MAP_STYLE} />
      </DeckGL>
      {selectedLocation && (
        <Popup
          location={selectedLocation}
          x={popupPosition.x}
          y={popupPosition.y}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
};

export default Mappy;
