import create from 'zustand';
// import {persist} from 'zustand/middleware';

let store = set => ({
  selectedTab: 0,
  setSelectedTab: tabId => set({selectedTab: tabId}),

  selectedCoinId: null,
  setSelectedCoinId: coinId => set({selectedCoinId: coinId}),
});

// store = persist(store);
export const useTradingMenuStore = create(store);
