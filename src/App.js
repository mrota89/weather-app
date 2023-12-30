import React, { useState, useEffect, useCallback, useRef } from 'react';
import { API_KEY, API_BASE_URL } from './api/config'
import CurrentWeather from './components/CurrentWeather';
import SearchCity from './components/SearchCity';
import Sidebar from './components/Sidebar';
import WeatherList from './components/WeatherList';
import UseFetch from './hooks/UseFetch';
import axios from 'axios';
import './App.css';

const App = () => {
  const firstUpdate = useRef(true);
  const [locationList, setLocationList] = useState(() => JSON.parse(localStorage.getItem("locationStorage")) || []);
  const { weatherResponse, error, loading, getWeather } = UseFetch();

  const onSearch = useCallback((city) => {
    getWeather(city);
  }, [getWeather]);

  const addLocationToList = useCallback(async (location) => {
    try {
      const cityGeoCoding = await axios.get(`${API_BASE_URL}/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`);

      if (cityGeoCoding["data"][0]) {
        const dataCityGeoCoding = cityGeoCoding["data"][0];
        const localNames = dataCityGeoCoding['local_names'];
        const cityName = ('local_names' in dataCityGeoCoding && 'it' in localNames) ? localNames['it'] : dataCityGeoCoding['name'];

        if (cityName.toUpperCase() === location) {
          setLocationList((prev) => [...prev, location]);
        } else {
          return alert([`Attenzione! Forse intendevi questa località: ${cityName.toUpperCase()}`]);
        }
      } else {
        return alert(["Attenzione! La località inserita non esiste!"]);
      }
    } catch {
      alert(["Oops! Qualcosa è andato storto :/"]);
    }
  }, []);

  const removeLocationAtIndex = useCallback((index) => {
    setLocationList((prev) => prev.filter((_, i) => i !== index));
  }, []);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    localStorage.setItem("locationStorage", JSON.stringify(locationList));
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
            <span>Oops!<br />Qualcosa è andato storto :( <br />{error.message}</span>
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

      {weatherResponse != null && (
        <>
          <CurrentWeather actualWeather={weatherResponse['data']['current']} />
          <WeatherList weathers={weatherResponse['data']['daily']} />
        </>
      )}

      {weatherResponse == null && (
        <div className="welcome-page">
          <h1>InfoWeather.com</h1>
        </div>
      )}
    </div>
  );
};

export default App;