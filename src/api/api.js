import {getRequest} from './request';

// const url = 'https://raptor-trading.herokuapp.com/';
const url = 'http://localhost:8080/';

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
