import {useStore} from '../store';
import {getRequest, postRequest} from './request';

const url = 'https://raptor-trading.herokuapp.com/';
// const url = 'http://localhost:8080/';

export async function addUser(username, email, avatar) {
  const password = useStore.getState().password;
  const response = await postRequest(url + 'users/add', {
    name: username,
    email: email,
    avatar: avatar,
    password: password,
  });
  return response;
}

export async function loginUser(email, password) {
  const response = await postRequest(url + 'users/login', {
    email: email,
    password: password,
  });
  return response;
}

export async function getUsers() {
  const response = await getRequest(url + 'users');
  if (response && response.status) {
    return response.data;
  }

  return null;
}

export async function getCoins() {
  const response = await getRequest(url + 'coins');
  if (response && response.status) {
    return response.data;
  }
  return null;
}

export async function getCoinPrices() {
  const response = await getRequest(url + 'coins/prices');
  if (response && response.status) {
    return response.data;
  }
  return null;
}

export async function getTransactions() {
  const response = await getRequest(url + 'transaction');
  if (response && response.status) {
    return response.data;
  }
  return null;
}

export async function addTransaction(
  username,
  transType,
  coinId,
  coinCount,
  price,
  fee,
  time,
) {
  const password = useStore.getState().password;
  const response = await postRequest(url + 'transaction/add', {
    username: username,
    transType: transType,
    coinId: coinId,
    coinCount: coinCount,
    price: price,
    fee: fee,
    time: time,
    password: password,
  });
  return response;
}

export async function getFundTransfers() {
  const response = await getRequest(url + 'fund/list');
  if (response && response.status) {
    return response.data;
  }
  return null;
}

export async function addFundTransfer(
  username,
  transType,
  amount,
  fee,
  donation,
  time,
) {
  const password = useStore.getState().password;
  const response = await postRequest(url + 'fund/transfer', {
    username: username,
    transType: transType,
    amount: amount,
    donation: donation,
    fee: fee,
    time: time,
    password: password,
  });
  return response;
}
