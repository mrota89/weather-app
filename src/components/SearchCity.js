import React, {useState} from 'react';
import './css/SearchCity.css';

const SearchCity = ({onSearch}) => {
    const [city, setCity] = useState('');

    return (
      <div className="search-bar">
        <input
          placeholder="Città"
          onChange={(event) => setCity(event.target.value)}
          value={city}
        />
        <button onClick={() => onSearch(city)}>Cerca</button>
      </div>
    );
  };

export default SearchCity;