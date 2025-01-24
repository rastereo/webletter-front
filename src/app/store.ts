import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from '@entities/user';
import { webletterListReducer } from '@entities/webletterList';
import { searchConfigReducers } from '@entities/searchConfig';

const store = configureStore({
  reducer: {
    user: userReducer,
    webletterList: webletterListReducer,
    searchConfig: searchConfigReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
