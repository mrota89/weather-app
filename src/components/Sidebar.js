import React, { useState, useEffect } from 'react';
import './css/Sidebar.css';
import { slide as Menu } from 'react-burger-menu';
import LocationListForm from './LocationListForm';
import LocationList from './LocationList';

//sidebar contenete form e lista per gestione città preferite
const Sidebar = () => {
  //esclude numeri e carratteri speciali
  const regexLocationName = new RegExp(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1\u0027\u203e]*$/g);
    
  //setto variabile di stato con dati presi dal locationStorage. Se non ci sono dati, allora array vuoto
  const [locationList, setLocationList] = useState(() => {
    const savedLocation = localStorage.getItem("locationStorage");
    const parsedArray = JSON.parse(savedLocation);
    return parsedArray || [];
  });

  //all'input utente, salva nel localStorage del browser la lista delle città preferite
  useEffect(() => { 
    localStorage.setItem("locationStorage",JSON.stringify(locationList))
  },[locationList]);

  return (
    <Menu>
        <h4>I tuoi preferiti</h4>
        <h5>Puoi salvare un massimo di cinque località</h5>
        <LocationListForm saveLocation={locationName => {
          if(locationName.length >0 && regexLocationName.test(locationName)) {
            const trimmedLocationName = locationName.trim().toUpperCase();
            //attivazione alert su controllo input utente
            if(locationList.includes(trimmedLocationName)) {
              return alert(["Attenzione! città già presente nella lista"])
            } else if (locationList.length === 5) {
              return alert(["Attenzione! Puoi salvare al massimo cinque città"])
            } else {
              setLocationList([...locationList, trimmedLocationName]);
            }
          }
        }} 
      />

      {locationList.length > 0 && <LocationList locationList={locationList}
          //escludo dalla lista esistente l'elemento eliminato
          deleteLocation={locationId => {
              const newLocationList = locationList.filter((_,index) => index !== locationId);
              setLocationList(newLocationList);
            }
          }
      />}
    </Menu>
  );
};

export default Sidebar;