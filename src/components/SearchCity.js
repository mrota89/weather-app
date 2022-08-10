import React, {useState, useEffect} from 'react';
import './css/SearchCity.css';

//component con input per ricerca delle informazioni meteo
const SearchCity = ({onSearch, dataLocationList}) => {
  const [city, setCity] = useState('');
  const [locationList, setLocationList] = useState([]);

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
          placeholder="Cerca località..."
          autoComplete="off"
          list="location-list"
          value={city}
          onChange={(event) => setCity(
            event.target.value
          )}
        />
        <datalist id="location-list">
          {dataLocationList.map((location, index) => (
            <option value={location} key={index.toString()}/>
          ))}
        </datalist>
      </form>
      <button className="card-box-shadow" onClick={() => onSearch(city)}>Cerca</button>
    </div>
  );
};

export default SearchCity;