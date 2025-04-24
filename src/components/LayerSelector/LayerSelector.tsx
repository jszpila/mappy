import { LayerConfig } from "../../const/layer";

import "./LayerSelector.css";

interface IProps {
  onSelectLayer: (layerName: string, isChecked: boolean) => void;
  visibleLayers: string[];
}

const LayerSelector = ({ onSelectLayer, visibleLayers }: IProps) => {
  function handleChange({target}: React.ChangeEvent<HTMLInputElement>) {
    const {id, checked} = target;
    onSelectLayer(id, checked);
  }

  return (
    <div className="layer-selector">
      <h2 className="layer-selector__title">Show me...</h2>
      <ul className="layer-selector__list">
        {Object.entries(LayerConfig).map(([layerName, layerConfig]) => (
          <li key={layerConfig.id} className="layer-selector__item">
            <label htmlFor={layerConfig.id}>
              <input
                type="checkbox"
                id={layerConfig.id}
                onChange={handleChange}

                checked={visibleLayers.includes(layerConfig.id)}
              />
              <img
                src={layerConfig.icon}
                alt={layerConfig.displayName}
                className="layer-selector__icon"
              />
              {layerConfig.displayName}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LayerSelector;
