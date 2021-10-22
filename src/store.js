import create from 'zustand';
import {persist} from 'zustand/middleware';
import {getUsers} from './api/api';

let store = set => ({
  count: 0,
  addCount: () => set(state => ({count: state.count + 1})),
  users: null,
  loadUsers: async () => {
    const data = await getUsers();
    return set({users: data});
  },
});

store = persist(store);
export const useStore = create(store);
