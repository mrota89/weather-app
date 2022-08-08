import React, {useState} from 'react';
import './css/SearchCity.css';

const SearchCity = ({onSearch}) => {
    const [city, setCity] = useState('');
    const onEnter = (event) => {
      if (event.keyCode === 13) {
        onSearch(city);
      }
    };

    return (
      <div className="search-bar">
        <input
          placeholder="Città"
          onChange={(event) => setCity(event.target.value)}
          onKeyDown={onEnter}
          value={city}
        />
        <button onClick={() => onSearch(city)}>Cerca</button>
      </div>
    );
  };

export default SearchCity;