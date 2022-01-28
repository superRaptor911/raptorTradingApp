import {getUsernameFromEmail} from '../components/helper';
import {useStore} from '../store';
import {getRequest, postRequest} from './request';

const url = 'https://raptor-trading.herokuapp.com/';
// const url = 'http://localhost:8080/';

export async function WazirxPlaceOrder(
  coinId: string,
  transType: string,
  coinCount: number,
  price: number,
) {
  const userCred = useStore.getState().userCred;
  if (userCred) {
    const response = await postRequest(url + 'wazirx/add', {
      username: getUsernameFromEmail(userCred.email),
      password: userCred.password,
      coinId: coinId,
      coinCount: coinCount,
      price: price,
      transType: transType,
    });
    return response;
  }
  return null;
}

export async function wazirxGetTransactions() {
  const userCred = useStore.getState().userCred;
  if (userCred) {
    const response = await postRequest(url + 'wazirx/list', {
      username: getUsernameFromEmail(userCred.email),
      password: userCred.password,
    });
    return response;
  }
  return null;
}

export async function WazirxCancelOrder(coinId: string, orderId: string) {
  const userCred = useStore.getState().userCred;
  if (userCred) {
    const response = await postRequest(url + 'wazirx/cancel', {
      username: getUsernameFromEmail(userCred.email),
      password: userCred.password,
      coinId: coinId,
      orderId: orderId,
    });
    return response;
  }
  return null;
}

export async function WazirxGetCoinHistory(
  coinId: string,
  period = 60,
  limit = 50,
) {
  // const timestamp = parseInt(new Date().getTime() / 1000) - 100;
  const addr = `https://x.wazirx.com/api/v2/k?market=${coinId}&period=${period}&limit=${limit}`;
  const response = await getRequest(addr);
  return response;
}

export async function StopLossBotListRules() {
  const userCred = useStore.getState().userCred;
  if (userCred) {
    const response = await postRequest(url + 'wazirx/stoplossbotlistrules', {
      username: getUsernameFromEmail(userCred.email),
      password: userCred.password,
    });
    return response;
  }
  return null;
}

export async function StopLossBotAddRule(
  isEnabled: boolean,
  coinId: string,
  price: number,
  count: number,
  transType: string,
  condition: string,
) {
  const userCred = useStore.getState().userCred;
  if (userCred) {
    const response = await postRequest(url + 'wazirx/stoplossbotaddrule', {
      username: getUsernameFromEmail(userCred.email),
      password: userCred.password,
      coinId: coinId,
      price: price,
      count: count,
      isEnabled: isEnabled,
      transType: transType,
      condition: condition,
    });
    return response;
  }
  return null;
}

export async function StopLossBotEditRule(
  isEnabled: boolean,
  id: string,
  coinId: string,
  price: number,
  count: number,
  transType: string,
  condition: string,
) {
  const userCred = useStore.getState().userCred;
  if (userCred) {
    const response = await postRequest(url + 'wazirx/stoplossboteditrule', {
      username: getUsernameFromEmail(userCred.email),
      password: userCred.password,
      id: id,
      coinId: coinId,
      price: price,
      count: count,
      isEnabled: isEnabled,
      transType: transType,
      condition: condition,
    });
    return response;
  }
  return null;
}

export async function StopLossBotDeleteRule(id: string) {
  const userCred = useStore.getState().userCred;
  if (userCred) {
    const response = await postRequest(url + 'wazirx/stoplossbotdeleterule', {
      username: getUsernameFromEmail(userCred.email),
      password: userCred.password,
      id: id,
    });
    return response;
  }
  return null;
}
