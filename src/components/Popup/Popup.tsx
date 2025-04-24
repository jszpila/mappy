import React from 'react';
import { Popup as MLPopup } from "react-map-gl/maplibre";
import storeIcon from '../../assets/store.svg';
import gasStationIcon from '../../assets/gas-station.svg';
import { GasStation, GroceryStore } from "../../interfaces";

import './Popup.css';

// FIXME: popup is showing under map markers - looks weird & prevents interactions 
//   Investigate interleaved vs overlaid approaches
//   Note that below examples provide a general guide but contain multiple type errors in implementation
//   https://deck.gl/docs/developer-guide/base-maps/using-with-maplibre

interface IProps {
  location: GasStation | GroceryStore | undefined;
  closeHandler: () => void;
}

const Popup = ({ location, closeHandler }: IProps) => {
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
    <MLPopup
      longitude={location.geometry.coordinates[0]}
      latitude={location.geometry.coordinates[1]}
      closeButton={true}
      maxWidth="360px"
      closeOnClick={true}
      onClose={closeHandler}
      offset={[0, -15]}
    >
      <div className="popup-body">
        <h3 className="popup-body__title">
          {
            <img
              src={icon}
              alt={isGasStation ? "Gas Station" : "Grocery Store"}
              className="popup-body__icon"
            />
          }
          {title}
        </h3>
        <div className="popup-body__content">
          <ul className="popup-body__details">
            <li>
              <span className="popup-body__label">Type:</span>
              {isGasStation ? "Gas Station" : "Grocery Store"}
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
    </MLPopup>
  );
};

export default Popup;