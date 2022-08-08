import React from 'react'
import WeatherCard from './WeatherCard'
import './css/WeatherList.css';

const WeatherList = ({weathers}) => {

    //verifico il giorno corrente e filtro l'array in ingresso per ottenere lista previsioni dei 5 giorni successivi
    const getCurrentDate = () => {
        let today = new Date();
        let dd = String(today.getDate());
        let mm = String(today.getMonth() + 1);
        let yyyy = today.getFullYear();

        return today = dd + '/' + mm + '/' + yyyy;
    }
    const currentDate = getCurrentDate();
    console.log(currentDate)
    const filteredForecast = weathers.filter((item) =>new Date(item.dt * 1000).toLocaleDateString() !== currentDate)

    return (
        <>
        <h4 className="text-center wmb-2">Previsioni per i prossimi 5 giorni</h4>
        <div className="weather-list">
            {filteredForecast.map(({dt, temp, weather}) => (
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