import React from 'react'
import WeatherCard from './WeatherCard'
import './css/WeatherList.css';

const WeatherList = ({weathers}) => {

    //verifico il giorno corrente e filtro l'array in ingresso per ottenere lista previsioni dei 5 giorni successivi
    const today = new Date().getDate();
    const filteredForecast = weathers.filter((item) =>item.dt_txt.includes("12:00:00") && !item.dt_txt.substr(8).includes(today))

    return (
        <>
        <h5 className="text-center wmb-2">Previsioni per i prossimi 5 giorni</h5>
        <div className="weather-list">
            {filteredForecast.map(({dt_txt, main, weather}) => (
                <div className="weather-card" key={dt_txt}>
                <WeatherCard 
                    temp_max={main.temp_max} 
                    temp_min={main.temp_min} 
                    dt={dt_txt} 
                    main={weather[0].description} 
                    icon={weather[0].icon} 
                    />
                </div>
            ))} 
        </div>
        </>
    )
}

export default WeatherList;