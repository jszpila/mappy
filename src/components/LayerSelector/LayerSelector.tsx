import { useState } from "react";
import { layerNames } from "../../const/layer";

import "./LayerSelector.css";

interface IProps {
  onSelectLayer: (layerName: string, isChecked: boolean) => void;
  // layers: Record<string, boolean>;
}

const LayerSelector = ({ onSelectLayer }: IProps) => {
  // TODO: revisit layer toggle handling (maybe layer structure should be different)
  const [itemIsChecked, setItemIsChecked] = useState<boolean[]>(
    Array.from(Object.keys(layerNames).map(() => true))
  );

  function handleChange({target}: React.ChangeEvent<HTMLInputElement>) {
    const layer = target.id;
    const isChecked = target.checked;
    const checkedItems = [...itemIsChecked];
    checkedItems[Object.keys(layerNames).indexOf(layer)] = isChecked;

    setItemIsChecked(checkedItems);
    onSelectLayer(layer, isChecked);
  }

  return (
    <div className="layer-selector">
      <h2 className="layer-selector__title">Show me...</h2>
      <ul className="layer-selector__list">
        {Object.entries(layerNames).map(([id, name], index) => (
          <li key={id} className="layer-selector__item">
            <label htmlFor={id}>
              <input type="checkbox" 
                checked={itemIsChecked[index]}
                id={id} 
                onChange={handleChange} />
              {name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LayerSelector;
