import {useStore} from '../store';
import {getRequest, postRequest} from './request';

// export const serverUrl = 'https://raptor-trading.herokuapp.com/';
export const serverUrl = 'https://raptor-trading-server.onrender.com/';
// const url = 'http://localhost:8080/';

export interface API_Response {
  status: boolean;
  data?: any;
  message?: string;
}

export async function addCoin(name: string, id: string, avatar: string) {
  const password = useStore.getState().password;
  const response: API_Response | null = await postRequest(
    serverUrl + 'coins/add',
    {
      name: name,
      id: id,
      avatar: avatar,
      password: password,
    },
  );
  return response;
}

export async function addUser(username: string, email: string, avatar: string) {
  const password = useStore.getState().password;
  const response: API_Response | null = await postRequest(
    serverUrl + 'users/add',
    {
      name: username,
      email: email,
      avatar: avatar,
      password: password,
    },
  );
  return response;
}

export async function loginUser(email: string, password: string) {
  const response: API_Response | null = await postRequest(
    serverUrl + 'users/login',
    {
      email: email,
      password: password,
    },
  );
  return response;
}

export async function getUsers() {
  const response: API_Response | null = await getRequest(serverUrl + 'users');
  if (response && response.status) {
    return response.data;
  }

  return null;
}

export async function getCoins() {
  const response: API_Response | null = await getRequest(serverUrl + 'coins');
  if (response && response.status) {
    return response.data;
  }
  return null;
}

export async function getCoinPrices() {
  const response: API_Response | null = await getRequest(
    serverUrl + 'coins/prices',
  );
  if (response && response.status) {
    return response.data;
  }
  return null;
}

export async function getTransactions() {
  const response: API_Response | null = await getRequest(
    serverUrl + 'transaction',
  );
  if (response && response.status) {
    return response.data;
  }
  return null;
}

export async function addTransaction(
  username: string,
  transType: string,
  coinId: string,
  coinCount: number,
  price: number,
  fee: number,
  time: Date,
  force = false,
) {
  const password = useStore.getState().password;
  const response: API_Response | null = await postRequest(
    serverUrl + 'transaction/add',
    {
      username: username,
      transType: transType,
      coinId: coinId,
      coinCount: coinCount,
      price: price,
      fee: fee,
      time: time,
      password: password,
      force: force,
    },
  );
  return response;
}

export async function getFundTransfers() {
  const response: API_Response | null = await getRequest(
    serverUrl + 'fund/list',
  );
  if (response && response.status) {
    return response.data;
  }
  return null;
}

export async function addFundTransfer(
  username: string,
  transType: string,
  amount: number,
  fee: number,
  donation: number,
  time: Date,
) {
  const password = useStore.getState().password;
  const response: API_Response | null = await postRequest(
    serverUrl + 'fund/transfer',
    {
      username: username,
      transType: transType,
      amount: amount,
      donation: donation,
      fee: fee,
      time: time,
      password: password,
    },
  );
  return response;
}
