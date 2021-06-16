import {useEffect, useState} from "react"
import {serverAddress} from "../Utility";
import useFetch from "./useFetch"

const usePricingData = () => {
  const [target, setTarget] = useState({uri:  `${serverAddress}/coin.php`, data: {type: "prices" , firstFetch: true}});
  const serverResponse = useFetch(target);
  const [pricingData , setPricingData ] = useState();

  useEffect(() => {
    if (serverResponse.error.error) {
      console.log("Error::usePricingData::Failed to get pricing data");
    }
    else if (serverResponse.data) {
      if (serverResponse.data.result) {
        setPricingData(serverResponse.data.coins);
        // setStorage("pricingData", serverResponse.data.coins);
      }
      else {
        console.log("Error::usePricingData::Server Error " + serverResponse.data.err);
      }
    }
  }, [serverResponse.data, serverResponse.error])

  return pricingData;
}

export default usePricingData
