import {useEffect, useState} from "react"
import useServerResponse from "./useServerResponse";


function computeProfit(coinName, coinId, transctionHistory, pricing) {
  let investment = 0;
  let coinCount = 0;
  let profit = 0;
  let percent = 0;

  if (pricing && transctionHistory) {
    for (let i of transctionHistory) {
      if (i.coin === coinName) {
        if (i.transType == 1) {
          investment += i.cost * i.coinCount + parseFloat(i.fee);
          coinCount += parseFloat(i.coinCount);
        }
        else {
          investment -= i.cost * i.coinCount;
          investment += parseFloat(i.fee);
          coinCount -= parseFloat(i.coinCount);
        }
      }
    }


    investment = Math.max(investment, 0);
    let coin = pricing[coinId];
    if (coin) {
      profit = coin.last * coinCount - investment;
      percent = profit / investment * 100;
    }
  }
  return {investment: investment.toFixed(2),profit: profit.toFixed(2), percent: percent.toFixed(2)};
}


function applyCoinPrice(data, pricing, transctionHistory) {
  let newUserCoins = [];
    for (let i of data) {
      let profitDict = computeProfit(i.coinInfo.name, i.coin, transctionHistory, pricing);
      i.profit = profitDict.profit;
      i.percent = profitDict.percent;
      i.investment = profitDict.investment;
      newUserCoins.push(i);
    }

  return newUserCoins;
}

const useUserCoinData = (username, pricingData, transctionHistory) => {
  const userCoins = useServerResponse('userCoins.php', {type: 'info', name: username}, 'userCoins');
  const [userCoinsWithCurrentPrice, setUserCoinsWithCurrentPrice] = useState();

  useEffect(() => {
    if (pricingData && transctionHistory) {
      setUserCoinsWithCurrentPrice(applyCoinPrice(userCoins, pricingData, transctionHistory));
    }
    else {
      setUserCoinsWithCurrentPrice(userCoins);
    }
  }, [userCoins, pricingData, transctionHistory]);

  return userCoinsWithCurrentPrice;
}

export default useUserCoinData
