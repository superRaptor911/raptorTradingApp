import create from 'zustand';
import {persist} from 'zustand/middleware';
import {
  getCoinPrices,
  getCoins,
  getFundTransfers,
  getTransactions,
  getUsers,
} from './api/api';

let store = set => ({
  count: 0,
  addCount: () => set(state => ({count: state.count + 1})),

  password: null,
  setPassword: pass => set({password: pass}),

  users: null,
  loadUsers: async () => {
    const data = await getUsers();
    data && set({users: data});
  },

  coins: null,
  loadCoins: async () => {
    const data = await getCoins();
    data && set({coins: data});
  },

  coinPrices: null,
  loadCoinPrices: async () => {
    const data = await getCoinPrices();
    data && set({coinPrices: data});
  },

  transactions: null,
  loadTransactions: async () => {
    const data = await getTransactions();
    data && set({transactions: data});
  },

  fundTransfers: null,
  loadFundTransfers: async () => {
    const data = await getFundTransfers();
    data && set({fundTransfers: data});
  },
});

store = persist(store);
export const useStore = create(store);
