import {getRequest} from './request';

const url = 'https://raptor-trading.herokuapp.com/';

export async function getUsers() {
  const response = await getRequest(url + 'users');
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
