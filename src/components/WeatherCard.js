import React from 'react';
import './css/WeatherCard.css';

const WeatherCard = ({dt, temp_min, temp_max, main, icon}) => {
  const date = new Date(dt * 1000);
  return (
    <div className="weather-card-content">
      <div className="card-title">
        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`}/>
        <h5 className="text-center">{date.toLocaleDateString('it-IT', {weekday: 'long'})}</h5>
        <h5 className="text-center wmy-1">{date.toLocaleDateString()}</h5>
      </div>
      <div className="card-body">
        <h5 className="text-center">{main}</h5>
        <h5 className="text-center wmy-1">T.Max: {temp_max} °C</h5>
        <h5 className="text-center">T.Min: {temp_min} °C</h5>
      </div>
    </div>
  );
};

export default WeatherCard;