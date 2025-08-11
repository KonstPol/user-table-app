import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { User } from '../../models/user';
import type { UserState } from '../../models/store';

const initialState: UserState = {
  users: [],
};

export const userStoreSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    ascSortingUsersByProperty(state, action: PayloadAction<keyof User>) {
      const key = action.payload;

      state.users = [...state.users].sort((a: User, b: User) => a[key].localeCompare(b[key]));
    },
    descSortinUsersByProperty(state, action: PayloadAction<keyof User>) {
      const key = action.payload;

      state.users = [...state.users].sort((a: User, b: User) => b[key].localeCompare(a[key]));
    },
  },
});

export const storeActions = userStoreSlice.actions;
