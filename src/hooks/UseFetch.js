import { useEffect, useState} from 'react';
import axios from 'axios';

const useFetch = (initialUrl) => {
  const [obj, setObj] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
   

    const fetchObj = async () => {
      try {
        if(!url) return;
        setLoading(true);
        
        const response  = await axios.get(url);
        setLoading(false);
        if(response.data.cod >= 400) {
            setError(response.data.message);
            return;
        }
        setObj(response);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };

    fetchObj();
  }, [url]);

  return {
    obj,
    error,
    loading,
    setUrl
  };
};

export default useFetch;