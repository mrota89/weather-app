import React, {useState, useEffect} from 'react';
import './css/SearchCity.css';

//component con input per ricerca delle informazioni meteo
const SearchCity = ({onSearch}) => {
  const [city, setCity] = useState('');
  const [locationList, setLocationList] = useState([]);

  //esclude numeri e carratteri speciali
  const regexLocationName = new RegExp(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1\u0027\u203e]*$/g);
  
  /*aggiorna "in tempo reale" il datalist ad ogni 
  modifica della lista località preferite*/
  useEffect(() => { 
    setInterval(() => {
      const locations = JSON.parse(localStorage.getItem("locationStorage"));
      if (locations) {
        setLocationList(locations);
      }
    }, 50);
  },[]);

  return (
    <div className="search-bar">
      <form
        onSubmit={event => {
          event.preventDefault();
          onSearch(city);
          setCity('');
        }}
      >
        <input
          className="card-box-shadow"
          placeholder="Cerca una località..."
          autoComplete="off"
          list="location-list"
          value={city}
          onChange={(event) => {
            //controllo input utente
            if(regexLocationName.test(event.target.value)) {
              /*aggiungo questo controllo perchè l'api del meteo 
              restituisce solo i dati per la città di Rome (Stati Uniti)
              (e da italiano mi sentivo offeso)
              */
              if(event.target.value.toLowerCase() === "roma") {
                setCity("Roma capitale");
              } else {
                setCity(event.target.value);
              }
            } else{
              alert(["Attenzione: non sono ammessi numeri e caratteri speciali"])
            }
          }}
        />
        <datalist id="location-list">
          {locationList.map((location, index) => (
            <option value={location} key={index.toString()}/>
          ))}
        </datalist>
      </form>
      <button className="card-box-shadow" onClick={() => onSearch(city)}>Cerca</button>
    </div>
  );
};

export default SearchCity;