import { useEffect, useState } from 'react';
import axios from 'axios';

const useAjax = () => {

  const [options, request] = useState({});
  const [response, setResponse] = useState({});

  useEffect(() => {
    async function ajax() {
      const res = options.url && await axios(options);
      if(res) {
        setResponse(res.data.results);
      }
    }
    ajax();
  }, [options])

  return [request, response];
}

export default useAjax;