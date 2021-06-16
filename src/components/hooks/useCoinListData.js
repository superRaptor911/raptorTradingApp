import {useEffect, useState} from "react"
import {serverAddress} from "../Utility";
import useFetch from "./useFetch"

const useCoinListData = () => {
  const [target, setTarget] = useState({uri:  `${serverAddress}/coin.php`, data: {type: "list"}});
  const serverResponse = useFetch(target);
  const [coinListData, setCoinListData] = useState();

  useEffect(() => {
    if (serverResponse.error.error) {
      console.log("Error::useCoinListData::Failed to get pricing data");
    }
    else if (serverResponse.data) {
      if (serverResponse.data.result) {
        setCoinListData(serverResponse.data.coins);
        // setStorage("pricingData", serverResponse.data.coins);
      }
      else {
        console.log("Error::useCoinListData::Server Error " + serverResponse.data.err);
      }
    }
  }, [serverResponse.data, serverResponse.error])

  return coinListData;
}

export default useCoinListData
