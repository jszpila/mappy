import React from 'react';
import storeIcon from '../../assets/store.svg';
import gasStationIcon from '../../assets/gas-station.svg';

import './Popup.css';

interface IProps {
  // FIXME: create GasStation, GroceryStore types
  feature: any;
  x: number;
  y: number;
  onClose: () => void;
}

const Popup = ({ feature, x, y, onClose }: IProps) => {
  if (!feature) return null;

  // NOTE: doing some minor sniffing to handle slight differences in data & display
  const isGasStation = feature.properties.NAME !== undefined;
  
  const title = isGasStation 
    ? feature.properties.NAME 
    : feature.properties.STORENAME;
  
  const address = feature.properties.ADDRESS;
  const phone = feature.properties.PHONE 
    ? feature.properties.PHONE.toString().replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') 
    : 'N/A';
  
  const additionalInfo = isGasStation 
    ? { pumps: feature.properties.NUMBER_OF_PUMPS || 'N/A' }
    : { zipcode: feature.properties.ZIPCODE || 'N/A' };

  return (
    <div className="popup" style={{ left: x, top: y }}>
      <button className="popup__close" onClick={onClose}>×</button>
      <h3 className="popup__title">
        {
          isGasStation 
            ? <img src={gasStationIcon} alt="Gas Station" className="popup__icon popup__icon--gas-station" /> 
            : <img src={storeIcon} alt="Grocery Store" className="popup__icon popup__icon--grocery-store" />
        }
        {title}</h3>
      <div className="popup__content">
        <ul className="popup__details">
          <li>
            <span className="popup__label">Type:</span>
            {isGasStation ? 'Gas Station' : 'Grocery Store'}
          </li>
          <li>
            <span className="popup__label">Address:</span>
            {address}
          </li>
          <li>
            <span className="popup__label">Phone:</span>
            {phone}
          </li>
          {isGasStation ? (
            <li>
              <span className="popup__label">Number of Pumps:</span>
              {additionalInfo.pumps}
            </li>
          ) : (
            <li>
              <span className="popup__label">Zipcode:</span>
              {additionalInfo.zipcode}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Popup;