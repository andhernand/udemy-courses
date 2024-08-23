import { useState, useEffect } from 'react';

const useFetch = (url, initialData) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    var response = fetch(url, { method: 'GET' });

    response
      .then(async (statusResp) => {
        let resp;

        if (statusResp.ok) {
          try {
            resp = await statusResp.clone().json();
            return resp;
          } catch (e) {
            console.log(e);
            resp = await statusResp.text();
            return resp;
          }
        } else {
          throw new Error('Error occured');
        }
      })
      .then((res) => {
        setData(res);
        setError(false);
      })
      .catch(() => {
        setData(null);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
