import React, { useState } from 'react';
import './css/SearchCity.css';

//component con input per ricerca delle informazioni meteo
const SearchCity = ({ onSearch, locationList }) => {
  const [city, setCity] = useState('');

  //esclude numeri e carratteri speciali
  const regexLocationName = new RegExp(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1\u0027\u203e]*$/g);
  return (
    <div className="search-bar">
      <form
        onSubmit={event => {
          event.preventDefault();
          if (city.length > 0) {
            onSearch(city);
          }
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
            const input = event.target.value;
            if (regexLocationName.test(input)) {
              setCity(input);
            } else {
              alert(["Attenzione: non sono ammessi numeri e caratteri speciali"])
            }
          }}
        />
        <datalist id="location-list">
          {locationList.map((location, index) => (
            <option value={location} key={index.toString()} />
          ))}
        </datalist>
      </form>
      <button disabled={city.length > 0 ? false : true} onClick={() => onSearch(city)}>
        Cerca
      </button>
    </div>
  );
};

export default SearchCity;