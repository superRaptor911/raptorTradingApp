import {useStore} from '../store';
import {getRequest, postRequest} from './request';

const url = 'https://raptor-trading.herokuapp.com/';
// const url = 'http://localhost:8080/';

const getUsername = email => {
  const users = useStore.getState().users;
  for (const i of users) {
    if (i.email === email) {
      return i.name;
    }
  }
};

export async function WazirxPlaceOrder(coinId, transType, coinCount, price) {
  const userCred = useStore.getState().userCred;
  const response = await postRequest(url + 'wazirx/add', {
    username: getUsername(userCred.email),
    password: userCred.password,
    coinId: coinId,
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

export async function WazirxCancelOrder(coinId, orderId) {
  const userCred = useStore.getState().userCred;
  const response = await postRequest(url + 'wazirx/cancel', {
    username: getUsername(userCred.email),
    password: userCred.password,
    coinId: coinId,
    orderId: orderId,
  });
  return response;
}

export async function WazirxGetCoinHistory(coinId, period = 60, limit = 50) {
  // const timestamp = parseInt(new Date().getTime() / 1000) - 100;
  const addr = `https://x.wazirx.com/api/v2/k?market=${coinId}&period=${period}&limit=${limit}`;
  const response = await getRequest(addr);
  return response;
}

export async function StopLossBotListRules() {
  const userCred = useStore.getState().userCred;
  const response = await postRequest(url + 'wazirx/stoplossbotlistrules', {
    username: getUsername(userCred.email),
    password: userCred.password,
  });
  return response;
}

export async function StopLossBotAddRule(
  isEnabled,
  coinId,
  price,
  count,
  transType,
) {
  const userCred = useStore.getState().userCred;
  const response = await postRequest(url + 'wazirx/stoplossbotaddrule', {
    username: getUsername(userCred.email),
    password: userCred.password,
    coinId: coinId,
    price: price,
    count: count,
    isEnabled: isEnabled,
    transType: transType,
  });
  return response;
}

export async function StopLossBotEditRule(
  isEnabled,
  id,
  coinId,
  price,
  count,
  transType,
) {
  const userCred = useStore.getState().userCred;
  const response = await postRequest(url + 'wazirx/stoplossboteditrule', {
    username: getUsername(userCred.email),
    password: userCred.password,
    id: id,
    coinId: coinId,
    price: price,
    count: count,
    isEnabled: isEnabled,
    transType: transType,
  });
  return response;
}

export async function StopLossBotDeleteRule(id) {
  const userCred = useStore.getState().userCred;
  const response = await postRequest(url + 'wazirx/stoplossbotdeleterule', {
    username: getUsername(userCred.email),
    password: userCred.password,
    id: id,
  });
  return response;
}
