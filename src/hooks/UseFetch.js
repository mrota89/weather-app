import { useEffect, useState} from 'react';
import axios from 'axios';

const useFetch = (firstUrl, secondUrl) => {
  const [arrayResponses, setArrayResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [urls, setUrls] = useState([firstUrl, secondUrl]);

  useEffect(() => {
    
    const fetchArrayResponses = async () => {
      try {
        setLoading(true);

        let firstResponse = {};
        let secondResponse = {};

        if(urls[0] !== undefined && urls[1] !== undefined) {

          //salvo le response...
          firstResponse  = await axios.get(urls[0]);
          secondResponse  = await axios.get(urls[1]);

          //...e le pusho in un array
          const responses = [];
          responses.push(firstResponse, secondResponse);

          setLoading(false);

          //se cod errore >= 400, salvo messaggio per mostrarlo all'utente nella error page 
          if (firstResponse['data']['message'] >= 400) {
            setError(firstResponse['data']['message']);
          }
          //setto l'array popolato nella variabile di stato
          setArrayResponses(responses);
        }
        setLoading(false);
    
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };

    fetchArrayResponses();
  }, [urls]);

  return {
    arrayResponses,
    error,
    loading,
    setUrls
  };
};

export default useFetch;
