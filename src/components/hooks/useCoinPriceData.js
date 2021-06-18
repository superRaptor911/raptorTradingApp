import {useEffect, useState} from "react"
import {serverAddress} from "../Utility";
import useFetch from "./useFetch"


const useCoinPriceData = (updateDelay = 3000) => {
  const [target, setTarget] = useState({uri: `${serverAddress}/coin.php`, data: {type: "prices"}});
  const serverResponse = useFetch(target);
  const [responseData, setResponseData] = useState();
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setTarget({uri: `${serverAddress}/coin.php`, data: {type: "prices"}});
    }, updateDelay);
    return () => clearTimeout(timer);
  }, [target, updateDelay]);

  useEffect(() => {
    if (serverResponse.error.error) {
      console.log("Error::useServerResponse::Failed to get responseData");
    }
    else if (serverResponse.data) {
      if (serverResponse.data.result) {
        setResponseData(serverResponse.data.coins);
      }
      else {
        console.log("Error::useServerResponse::Server Error " + serverResponse.data.err);
      }
    }
  }, [serverResponse.data, serverResponse.error])

  return responseData;
}

export default useCoinPriceData
