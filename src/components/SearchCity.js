import React, {useState} from 'react';
import './css/SearchCity.css';

const SearchCity = ({onSearch}) => {

  const [city, setCity] = useState('');

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
          placeholder="Il meteo della tua città..."
          onChange={(event) => setCity(
            event.target.value
          )}
          value={city}
        />
      </form>
      <button className="card-box-shadow" onClick={() => onSearch(city)}>Cerca</button>
    </div>
  );
};

export default SearchCity;