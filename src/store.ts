import create, {GetState, SetState} from 'zustand';
import {persist} from 'zustand/middleware';
import {
  getCoinPrices,
  getCoins,
  getFundTransfers,
  getTransactions,
  getUsers,
} from './api/api';

import {Coin, FundTransfer, Transaction, User, UserCred} from './types';

interface Store {
  password: string | null;
  setPassword: (pass: string) => void;

  userCred: UserCred | null;
  setUserCred: (cred: UserCred | null) => void;

  users: User[];
  loadUsers: () => void;

  coins: Coin[];
  loadCoins: () => void;

  coinPrices: any;
  loadCoinPrices: () => void;

  transactions: Transaction[];
  loadTransactions: () => void;

  fundTransfers: FundTransfer[];
  loadFundTransfers: () => void;
}

export const useStore = create<Store, SetState<Store>, GetState<Store>>(
  persist(
    (set, get) => ({
      password: null,
      setPassword: (pass: string) => set({password: pass}),

      userCred: null,
      setUserCred: (cred: UserCred | null) => set({userCred: cred}),

      users: [],
      loadUsers: async () => {
        const data = await getUsers();
        data && set({users: data});
      },

      coins: [],
      loadCoins: async () => {
        const data = await getCoins();
        data && set({coins: data});
      },

      coinPrices: [],
      loadCoinPrices: async () => {
        const data = await getCoinPrices();
        data && set({coinPrices: data});
      },

      transactions: [],
      loadTransactions: async () => {
        const data = await getTransactions();
        data &&
          get().transactions.length != data.length &&
          set({transactions: data});
      },

      fundTransfers: [],
      loadFundTransfers: async () => {
        const data = await getFundTransfers();
        data && set({fundTransfers: data});
      },
    }),
    {name: 'main-storage'},
  ),
);
