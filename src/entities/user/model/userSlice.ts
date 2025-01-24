import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '@/types';

const initialState: IUser = {
  isVerified: false,
  isDarkMode: false,
  name: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isVerified = true;
      state.name = action.payload;
    },
    logout: (state) => {
      state.isVerified = false;
      state.name = '';
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { login, logout, setName, setDarkMode } = userSlice.actions;

export default userSlice.reducer;
