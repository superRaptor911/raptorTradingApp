import {useStore} from '../store';
import {getRequest, postRequest} from './request';

// const url = 'https://raptor-trading.herokuapp.com/';
const url = 'http://localhost:8080/';

const getUsername = email => {
  const users = useStore.getState().users;
  for (const i of users) {
    if (i.email === email) {
      return i.name;
    }
  }
};

export async function WazirxPlaceOrder(coin, transType, coinCount, price) {
  const userCred = useStore.getState().userCred;
  const response = await postRequest(url + 'wazirx/add', {
    username: getUsername(userCred.email),
    password: userCred.password,
    coin: coin,
    coinCount: coinCount,
    price: price,
    transType: transType,
  });
  return response;
}

export async function wazirxGetTransactions() {
  const userCred = useStore.getState().userCred;
  if (userCred) {
    const response = await postRequest(url + 'wazirx/list', {
      username: getUsername(userCred.email),
      password: userCred.password,
    });
    return response;
  }
  return null;
}
