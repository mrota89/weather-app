import { useState, useCallback } from 'react';
import axios from 'axios';
import { API_KEY, API_BASE_URL } from '../api/config'

const useFetch = (firstUrl, secondUrl) => {
  const [arrayResponses, setArrayResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeather = useCallback(async (city) => {
    const urls = [
      `${API_BASE_URL}/data/2.5/forecast/daily?q=${city}&cnt=6&appid=${API_KEY}&units=metric&lang=it`,
      `${API_BASE_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=it`
    ];

    setError(false);
    try {
      let firstResponse = {};
      let secondResponse = {};

      if (urls[0] !== undefined && urls[1] !== undefined) {
        setLoading(true);

        //salvo le response...
        firstResponse = await axios.get(urls[0]);
        secondResponse = await axios.get(urls[1]);

        setLoading(false);

        //...e le pusho in un array
        const responses = [];
        responses.push(firstResponse, secondResponse);

        //salvo messaggio per mostrarlo all'utente nella error page 
        if (firstResponse['data']['message'] >= 400 || firstResponse['data']['message'] >= 500) {
          setError(firstResponse['data']['message']);
        }
        //setto l'array popolato nella variabile di stato
        setArrayResponses(responses);
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }, []);

  return {
    arrayResponses,
    error,
    loading,
    getWeather,
  };
};

export default useFetch;
