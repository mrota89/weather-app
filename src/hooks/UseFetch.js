import { useEffect, useState} from 'react';
import axios from 'axios';

const useFetch = (firstUrl, secondUrl) => {
  const [obj, setObj] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [urls, setUrls] = useState([firstUrl, secondUrl]);

  useEffect(() => {
   

    const fetchObj = async () => {
      try {
        setLoading(true);

        let firstResponse = null;
        let secondResponse = null;

        if(urls[0] !== undefined && urls[1] !== undefined) {

          firstResponse  = await axios.get(urls[0]);
          secondResponse  = await axios.get(urls[1]);

          const responses = [];
          responses.push(firstResponse, secondResponse);

          setLoading(false);

          if (firstResponse['data']['message'] >= 400) {
            setError(firstResponse['data']['message']);
            return;
          }
          setObj(responses);
        }
        setLoading(false);
    
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };

    fetchObj();
  }, [urls]);

  return {
    obj,
    error,
    loading,
    setUrls
  };
};

export default useFetch;
