import {useEffect, useState} from "react"
import {serverAddress} from "../Utility";
import useFetch from "./useFetch"

const useServerResponse = (targetFile, targetData, responseKey)=> {
  const [target, ] = useState({uri: `${serverAddress}/${targetFile}`, data: targetData});
  const serverResponse = useFetch(target);
  const [responseData, setResponseData] = useState();

  useEffect(() => {
    if (serverResponse.error.error) {
      console.log("Error::useServerResponse::Failed to get responseData");
    }
    else if (serverResponse.data) {
      if (serverResponse.data.result) {
        setResponseData(serverResponse.data[responseKey]);
      }
      else {
        console.log("Error::useServerResponse::Server Error " + serverResponse.data.err);
      }
    }
  }, [serverResponse.data, serverResponse.error])

  return responseData;
}

export default useServerResponse
