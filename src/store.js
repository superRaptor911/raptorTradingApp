import create from 'zustand';
import {persist} from 'zustand/middleware';
import {getCoinPrices, getCoins, getUsers} from './api/api';

let store = set => ({
  count: 0,
  addCount: () => set(state => ({count: state.count + 1})),
  users: null,
  loadUsers: async () => {
    const data = await getUsers();
    return set({users: data});
  },

  coins: null,
  loadCoins: async () => {
    const data = await getCoins();
    return set({coins: data});
  },

  coinPrices: null,
  loadCoinPrices: async () => {
    const data = await getCoinPrices();
    return set({coinPrices: data});
  },
});

store = persist(store);
export const useStore = create(store);
