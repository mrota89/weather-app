import React from 'react';
import SearchCity from './components/SearchCity';
import CurrentWeather from './components/CurrentWeather';
import Sidebar from './components/Sidebar';
import './App.css';
import UseFetch from './hooks/UseFetch';
import {API_KEY, API_BASE_URL} from './api/config'
import WeatherList from './components/WeatherList';

const App = () => {
  const {arrayResponses, error, loading, setUrls} = UseFetch();
  const reloadPage = () =>{
    setTimeout(()=> {window.location.reload()}, 8000);
  }

  const getContent = () => {
    if(error) {
      //avvio setTimeout per reload della pagina in caso di errore
      reloadPage();
      return (
        <div className="error-page">
          <h3>
            Oops!<br/>Qualcosa è andato storto:<br/>{error.message}.<br/>
            <small>Entro pochi secondi sarai indirizzato alla homepage</small>
          </h3>
        </div> 
      )
      
    } else if(arrayResponses.length > 0 && loading) {
      //mostra schermata di caricamento durante chiamata ajax
      return ( 
        <div className="welcome-page"> 
          <h3>Sto chiamando l'uomo del meteo...</h3>
        </div>
      )
    } else if(!arrayResponses.length > 0) {
      //carica pagina di welcome quando arrayResponses è vuoto
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
      //carica contenuto risposta chiamata ajax e mostra la pagina principale
      const actualWeather = arrayResponses[1]['data'];
      const fiveDaysForecast = arrayResponses[0]['data']['list'];
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
      {arrayResponses.length > 0 && <SearchCity onSearch={(city) => setUrls([
        `${API_BASE_URL}/data/2.5/forecast/daily?q=${city}&cnt=6&appid=${API_KEY}&units=metric&lang=it`, 
        `${API_BASE_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=it`
      ])}/>}
      
      {getContent()}
    </div>
  );
};

export default App;