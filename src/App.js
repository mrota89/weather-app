import React from 'react';
import SearchCity from './components/SearchCity';
import CurrentWeather from './components/CurrentWeather';
import './App.css';
import UseFetch from './hooks/UseFetch';
import {API_KEY, API_BASE_URL} from './api/config'
import WeatherList from './components/WeatherList';

const App = () => {
  const {obj, error, loading, setUrl} = UseFetch();
  console.log(obj)

  // error handling and loading
  const getContent = () => {
    if(error) {
      return <h2>Oops, qualcosa è andato storto: {error.message}</h2>
    } else if(!Object.keys(obj).length > 0 && loading) {
      return <h2>LOADING...</h2>
    } else if(!Object.keys(obj).length > 0){
      return null
    } else {
      return <WeatherList weathers={obj.data.list} />
    }
  };

  return (
    <div className="m-container">
      <SearchCity onSearch={(city) => setUrl(`${API_BASE_URL}/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=it`)} />
      <CurrentWeather/>
      {getContent()}
    </div>
  );
};

export default App;