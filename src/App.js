import React from 'react';
import SearchCity from './components/SearchCity';
import CurrentWeather from './components/CurrentWeather';
import Sidebar from './components/Sidebar';
import './App.css';
import UseFetch from './hooks/UseFetch';
import {API_KEY, API_BASE_URL} from './api/config'
import WeatherList from './components/WeatherList';

const App = () => {
  const {obj, error, loading, setUrls} = UseFetch();

  // error handling and loading
  const getContent = () => {
    if(error) {
      return (
      <div className="error-page">
        <h3>Oops!<br/>Qualcosa è andato storto:<br/>{error.message}</h3>
      </div> ) 
    } else if(obj.length > 0 && loading) {
      return ( 
        <div className="welcome-page"> 
          <h3>Sto chiamando l'uomo del meteo...</h3>
        </div>
      )
    } else if(!obj.length > 0) {
      return(
        <div className="welcome-page">
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
    <div className="m-container card-box-shadow">
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'}/>
      {obj.length > 0 && <SearchCity onSearch={(city) => setUrls([
        `${API_BASE_URL}/data/2.5/forecast/daily?q=${city}&cnt=6&appid=${API_KEY}&units=metric&lang=it`, 
        `${API_BASE_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=it`
      ])}/>}
      
      {getContent()}
    </div>
  );
};

export default App;