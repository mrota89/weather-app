import React from 'react';
import './css/CurrentWeather.css';

const CurrentWeather = ({dt, temp_min, temp_max, main, icon}) => {
  // create a date object with Date class constructor
  const date = new Date(dt);
  return (
    <div className="current-weather">
      
      <div className="weather-left">
        <h3 className="info">
            Roma
        </h3>

        <h1 className="info">
            30 °C
        </h1>

        <h3 className="info">
            Nuvoloso
        </h3>
      </div>

      <div className="weather-right">
        <div className="parameters">
            <h5>Temperatura perc.</h5>
            <h5>Umidità</h5>
            <h5>Vento</h5>
            <h5>Visibilità</h5>
            <h5>Max</h5>
            <h5>Min</h5>
        </div>

        <div className="value">
            <h5>32.6 °C</h5>
            <h5>50%</h5>
            <h5>13.5 km/h</h5>
            <h5>10 km</h5>
            <h5>32.7 °C</h5>
            <h5>28.9 °C</h5>
        </div>
        
      </div>
    </div>
  );
};

export default CurrentWeather;