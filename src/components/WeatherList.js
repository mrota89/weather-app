import React from 'react'
import WeatherCard from './WeatherCard'
import './css/WeatherList.css';

/*sezione inferiore della pagina principale 
contenente le previsioni per i 5 giorni sucessivi 
alla data attuale */
const WeatherList = ({weathers}) => {
    
    const slicedForecast = weathers.slice(1,6);

    return (
        <>
        <h4 className="text-center wmb-2">Previsioni per i prossimi 5 giorni</h4>
        <div className="weather-list">
            {slicedForecast.map(({dt, temp, weather}) => (
                <div className="weather-card" key={dt}>
                    <WeatherCard 
                        temp_max={Math.round(temp.max)} 
                        temp_min={Math.round(temp.min)} 
                        dt={dt} 
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