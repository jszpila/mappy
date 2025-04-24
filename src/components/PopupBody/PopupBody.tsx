import React from 'react';
import storeIcon from '../../assets/store.svg';
import gasStationIcon from '../../assets/gas-station.svg';
import { GasStation, GroceryStore } from "../../interfaces";

import './PopupBody.css';

interface IProps {
  location: GasStation | GroceryStore | undefined;
}

const PopupBody = ({ location }: IProps) => {
  if (!location) return null;

  // NOTE: doing some minor sniffing to handle slight differences in data & display
  const isGasStation = location.properties.NAME !== undefined;
  
  const title = isGasStation 
    ? location.properties.NAME 
    : location.properties.STORENAME;
  
  const address = location.properties.ADDRESS;
  const phone = location.properties.PHONE 
    ? location.properties.PHONE.toString().replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') 
    : 'N/A';
  
  const additionalInfo = isGasStation 
    ? { pumps: location.properties.NUMBER_OF_PUMPS || 'N/A' }
    : { zipcode: location.properties.ZIPCODE || 'N/A' };

  return (
    <div className="popup-body">
      <h3 className="popup-body__title">
        {
          isGasStation 
            ? <img src={gasStationIcon} alt="Gas Station" className="popup-body__icon popup-body__icon--gas-station" /> 
            : <img src={storeIcon} alt="Grocery Store" className="popup-body__icon popup-body__icon--grocery-store" />
        }
        {title}</h3>
      <div className="popup-body__content">
        <ul className="popup-body__details">
          <li>
            <span className="popup-body__label">Type:</span>
            {isGasStation ? 'Gas Station' : 'Grocery Store'}
          </li>
          <li>
            <span className="popup-body__label">Address:</span>
            {address}
          </li>
          <li>
            <span className="popup-body__label">Phone:</span>
            {phone}
          </li>
          {isGasStation ? (
            <li>
              <span className="popup-body__label">Number of Pumps:</span>
              {additionalInfo.pumps}
            </li>
          ) : (
            <li>
              <span className="popup-body__label">Zipcode:</span>
              {additionalInfo.zipcode}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PopupBody;