import React from 'react';
import './css/CurrentWeather.css';

//sezione superiore della pagina principale contenente la situazione meteo del giorno
const CurrentWeather = ({actualWeather}) => {
  const main = actualWeather.main;
  const weather = actualWeather.weather;
  const date = new Date(actualWeather.dt * 1000);
  
  return (
    <>
      <h4 className="text-center wmb-2 wmt-2">
        Oggi - {date.toLocaleDateString()}
      </h4>
      <div className="current-weather">
        <div className="weather-left card-box-shadow">

          <h3 className="info name">
            {actualWeather.name}
          </h3>

          <h1 className="info">
            {Math.round(main.temp)} °C
          </h1>

          <div className="description">
            <h4 className="info">
              {weather[0].description}
            </h4>
            <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="weather-icon"/>
          </div>
        </div>

        <div className="weather-right card-box-shadow">
          <div className="parameters">
              <h5>Temp. perc.</h5>
              <h5>Umidità</h5>
              <h5>Vento</h5>
              <h5>Press. atm.</h5>
              <h5>Temp. Max</h5>
              <h5>Temp. Min</h5>
          </div>

          <div className="value">
              <h5>{Math.round(main.feels_like)} °C</h5>
              <h5>{main.humidity} %</h5>
              <h5>{Math.round(actualWeather.wind.speed)} km/h</h5>
              <h5>{main.pressure} hPa</h5>
              <h5>{Math.round(main.temp_max)} °C</h5>
              <h5>{Math.round(main.temp_min)} °C</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentWeather;