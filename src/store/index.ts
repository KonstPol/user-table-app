import { configureStore } from '@reduxjs/toolkit';

import { userStoreSlice } from './users/users';

const store = configureStore({
  reducer: userStoreSlice.reducer,
});

export default store;
