import React from 'react';
import LocationList from './LocationList';
import LocationListForm from './LocationListForm';
import { slide as Menu } from 'react-burger-menu';
import './css/Sidebar.css';

//sidebar contenete form e lista per gestione città preferite
const Sidebar = ({ locationList, addLocationToList, removeLocationAtIndex }) => {
  return (
    <Menu>
      <h4>I tuoi preferiti</h4>
      <small>Puoi salvare un massimo di cinque località</small>
      <small>Troverai le località nei suggerimenti della barra di ricerca</small>
      <LocationListForm saveLocation={locationName => {
        if (locationName.length > 0) {
          const trimmedLocationName = locationName.trim().toUpperCase();
          //attivazione alert su controllo input utente
          if (locationList.includes(trimmedLocationName)) {
            return alert(["Attenzione! città già presente nella lista"]);
          } else if (locationList.length === 5) {
            return alert(["Attenzione! Puoi salvare al massimo cinque città"]);
          } else {
            addLocationToList(trimmedLocationName);
          }
        }
      }}
      />

      {locationList.length > 0 && <LocationList locationList={locationList}
        //escludo dalla lista esistente l'elemento eliminato
        deleteLocation={locationId => removeLocationAtIndex(locationId)}
      />}
    </Menu>
  );
};

export default Sidebar;