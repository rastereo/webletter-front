import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IWebletter } from '@types';

interface IWebletterListSlice {
  list: IWebletter[];
  isInitialLoadData: boolean;
  count: number;
  totalCount: number;
}

const initialState: IWebletterListSlice = {
  list: [],
  isInitialLoadData: false,
  count: 0,
  totalCount: 0,
};

export const webletterListSlice = createSlice({
  name: 'webLetterList',
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<IWebletter[]>) => {
      state.list = action.payload;
      state.count = action.payload.length;
    },
    setIsInitialLoadData: (state, action: PayloadAction<boolean>) => {
      state.isInitialLoadData = action.payload;
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
  },
});

export const { setList, setTotalCount, setIsInitialLoadData } = webletterListSlice.actions;
export default webletterListSlice.reducer;
