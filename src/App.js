import React, { useState, useEffect, useCallback, useRef } from 'react';

import CurrentWeather from './components/CurrentWeather';
import SearchCity from './components/SearchCity';
import Sidebar from './components/Sidebar';
import WeatherList from './components/WeatherList';
import UseFetch from './hooks/UseFetch';
import './App.css';

const App = () => {
  const firstUpdate = useRef(true);
  const [locationList, setLocationList] = useState(() => JSON.parse(localStorage.getItem("locationStorage")) || []);
  const { arrayResponses, error, loading, getWeather } = UseFetch();

  const onSearch = useCallback((city) => {
    getWeather(city);
  }, [getWeather]);

  const addLocationToList = useCallback((location) => {
    console.log("adding location " + location);
    setLocationList((prev) => [...prev, location]);
  }, []);

  const removeLocationAtIndex = useCallback((index) => {
    console.log("removing location " + index);
    setLocationList((prev) => prev.filter((_, i) => i !== index));
  }, []);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    console.log(locationList);
    localStorage.setItem("locationStorage", JSON.stringify(locationList))
    console.log("localstorage aggiornato")
  }, [locationList]);

  return (
    <div className="m-container card-box-shadow">
      <Sidebar
        locationList={locationList}
        addLocationToList={addLocationToList}
        removeLocationAtIndex={removeLocationAtIndex}
        pageWrapId={'page-wrap'}
        outerContainerId={'outer-container'}
      />

      <SearchCity locationList={locationList} onSearch={onSearch} />

      {error && (
        <div className="error-page">
          <h3>
            <span>Oops!<br />Qualcosa è andato storto:<br />{error.message}.</span>
            <br />
            <button onClick={() => window.location.reload()}>Torna alla homepage</button>
          </h3>
        </div>
      )}

      {loading && (
        <div className="welcome-page">
          <h3>Sto chiamando l'uomo del meteo...</h3>
        </div>
      )}

      {arrayResponses.length > 0 && (
        <>
          <CurrentWeather actualWeather={arrayResponses[1]['data']} />
          <WeatherList weathers={arrayResponses[0]['data']['list']} />
        </>
      )}

      {arrayResponses.length === 0 && (
        <div className="welcome-page">
          <h1>InfoWeather.com</h1>
        </div>
      )}
    </div>
  );
};

export default App;