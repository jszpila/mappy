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

  // TODO: implement transform to enforce more consistent structure
  const isGasStation = location.properties.NAME !== undefined;
  
  const title = isGasStation 
    ? location.properties.NAME 
    : location.properties.STORENAME;
  
  const address = location.properties.ADDRESS;
  const phone = location.properties.PHONE;
  const formattedPhone = phone.toString().replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  
  const additionalInfo = isGasStation 
    ? { pumps: location.properties.NUMBER_OF_PUMPS || 'N/A' }
    : { zipcode: location.properties.ZIPCODE || 'N/A' };

  const icon = isGasStation ? gasStationIcon : storeIcon;

  return (
    <div className="popup-body">
      <h3 className="popup-body__title">
        {
          <img src={icon} alt={isGasStation ? "Gas Station" : "Grocery Store"} className="popup-body__icon"/>
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
            <a href={`tel:+1${phone}`}>{formattedPhone}</a>
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