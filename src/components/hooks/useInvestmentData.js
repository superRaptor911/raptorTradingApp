import {useEffect, useState} from "react"
import {serverAddress} from "../Utility";
import useFetch from "./useFetch"


function getUserInfo(transctionList, pricing) {
  if (!transctionList) {
    return [];
  }
  let dict = {};
  for (let t of transctionList) {
    dict[t.username] = {
      name: t.username,
      avatar: t.userAvatar,
      investment: parseFloat(t.investment).toFixed(2),
      amount: parseFloat(t.amount).toFixed(2),
      value: parseFloat(t.amount),
      profit: 0,
      percent: 0
    };
     let str = "0";
    dict[t.username].investment = Math.max(dict[t.username].investment, 0);
    if (pricing) {
      for (let i of t.coins) {
        let coin = pricing[i.coin];
        if (coin) {
          dict[t.username].value += coin.last * i.count;
          str = str + " + " + coin.last * i.count;
        }
      }

      dict[t.username].profit = dict[t.username].value - dict[t.username].investment;
      dict[t.username].percent = (dict[t.username].value / dict[t.username].investment ) * 100 - 100;
      dict[t.username].profit = dict[t.username].profit.toFixed(2);
      dict[t.username].percent = dict[t.username].percent.toFixed(2);
      dict[t.username].value = dict[t.username].value.toFixed(2);
    }
  }

  let arr = [];

  for (let key in dict) {
    arr.push(dict[key]);
  }
  return arr;
}


const useInvestmentData = (pricingData) => {
  const [target, ] = useState({uri:  `${serverAddress}/transction.php`, data: {type: "investmentNcoins"}});
  const serverResponse = useFetch(target);
  const [investmentData, setInvestmentData] = useState();

  useEffect(() => {
    if (serverResponse.error.error) {
      console.log("Error::useInvestmentData::Failed to get pricing data");
    }
    else if (serverResponse.data) {
      if (serverResponse.data.result) {
        setInvestmentData(getUserInfo(serverResponse.data.data, pricingData));
      }
      else {
        console.log("Error::useInvestmentData::Server Error " + serverResponse.data.err);
      }
    }
  }, [serverResponse.data, serverResponse.error, pricingData])

  return investmentData;
}

export default useInvestmentData
