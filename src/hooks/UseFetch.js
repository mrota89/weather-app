import { useState, useCallback } from 'react';
import axios from 'axios';
import { API_KEY, API_BASE_URL } from '../api/config'

const useFetch = () => {
  const [weatherResponse, setWeatherResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const getWeather = useCallback(async (city) => {
    setError(undefined);
    try {
      setLoading(true);

      //ottengo longitudine e latitudine della città ricercata
      const cityGeoCoding = await axios.get(`${API_BASE_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
      const dataCityGeoCoding = cityGeoCoding["data"][0];

      if (dataCityGeoCoding) {

        const lat = dataCityGeoCoding['lat'];
        const lon = dataCityGeoCoding['lon'];
        const country = dataCityGeoCoding['country'];
        const localNames = dataCityGeoCoding['local_names'];
        const cityName = ('local_names' in dataCityGeoCoding && 'it' in localNames) ? localNames['it'] : dataCityGeoCoding['name'];
        const weatherData = await axios.get(`${API_BASE_URL}data/3.0/onecall?lat=${lat}&lon=${lon}&lang=it&units=metric&exclude=minutely,hourly,alerts&appid=${API_KEY}`);

        if (cityName.toUpperCase() === city.toUpperCase()) {
          weatherData['data']['current'].country = country;
          weatherData['data']['current'].name = cityName;
          setLoading(false);
          setWeatherResponse(weatherData);

        } else {
          setLoading(false);
          return alert([`Attenzione! Forse intendevi questa località: ${cityName.toUpperCase()}`]);
        }

      } else {
        setLoading(false);
        return alert(['Attenzione! La località inserita non esiste!']);
      }

    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }, []);

  return {
    weatherResponse,
    error,
    loading,
    getWeather,
  };
};

export default useFetch;
