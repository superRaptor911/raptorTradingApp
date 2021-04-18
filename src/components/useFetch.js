import {useState, useEffect} from 'react';

const useFetch = (target) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState({error: false, msg: ""});

  useEffect(() =>{
    const abortCont = new AbortController();
    if (target.uri !== "") {
      fetch(target.uri, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(target.data),
        signal: abortCont.signal
      })
        .then(res => {
          if (!res.ok) {
            console.log("useFetch::could not fetch data");
            abortCont.abort();
            throw Error("Could not fetch data");
          }
          return res.json();
        })
        .then(data => {
          setError({error: false, msg:""});
          setData(data);
          setLoading(false);
        })
        .catch(err => {
          if (err.name === 'AbortError') {
            console.log("Aborting.....");
            setError({error: true, msg: err.message});
          } else {
            console.log("err.....");
            setError({error: true, msg: err.message});
            setLoading(false);
          }
        });
    }
    return () => abortCont.abort();
  }, [target]);
  return {data, isLoading, error};
}

export default useFetch;
