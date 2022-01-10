import create from 'zustand';
// import {persist} from 'zustand/middleware';

let store = set => ({
  selectedTab: 0,
  setSelectedTab: tabId => set({selectedTab: tabId}),

  selectedCoinId: null,
  setSelectedCoinId: coinId => set({selectedCoinId: coinId}),

  side: 'SELL',
  setSide: s => set({side: s}),

  transactionPlaceMessage: null,
  setTransPlaceMessage: msg => set({transactionPlaceMessage: msg}),
});

// store = persist(store);
export const useTradingStore = create(store);
