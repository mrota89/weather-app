import React, { useEffect } from 'react';
import SearchCity from './components/SearchCity';
import CurrentWeather from './components/CurrentWeather';
import './App.css';
import UseFetch from './hooks/UseFetch';
import {API_KEY, API_BASE_URL} from './api/config'
import WeatherList from './components/WeatherList';

const App = () => {
  const {obj, error, loading, setUrls} = UseFetch();
  console.log(obj);

  // error handling and loading
  const getContent = () => {
    if(error) {
       return <h2>Oops, qualcosa è andato storto: {error.message}</h2>
    } else if(!obj.length > 0 && loading) {
      return <h2>LOADING...</h2>
    } else if(!obj.length > 0){
      return (
        <div className='welcome-page'>
          <h1>InfoWeather.com</h1>
          <SearchCity onSearch={(city) => setUrls([
            `${API_BASE_URL}/data/2.5/forecast/daily?q=${city}&cnt=6&appid=${API_KEY}&units=metric&lang=it`, 
            `${API_BASE_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=it`
          ])}/>
        </div>
      )
    } else {
      const actualWeather = obj[1]['data'];
      const fiveDaysForecast = obj[0]['data']['list'];
      return (
        <>
          <CurrentWeather actualWeather={actualWeather}/>
          <WeatherList weathers={fiveDaysForecast} />
        </>
      )
    }
  };

  return (
    <div className="m-container">
      {obj.length > 0 && <SearchCity onSearch={(city) => setUrls([
        `${API_BASE_URL}/data/2.5/forecast/daily?q=${city}&cnt=6&appid=${API_KEY}&units=metric&lang=it`, 
        `${API_BASE_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=it`
      ])}/>}
      
      {getContent()}
    </div>
  );
};

export default App;