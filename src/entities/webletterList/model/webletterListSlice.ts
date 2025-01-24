import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IWebletter } from '@/types';

interface IWebletterListSlice {
  list: IWebletter[];
  count: number;
  totalCount: number;
}

const initialState: IWebletterListSlice = {
  list: [],
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
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
  },
});

export const { setList, setTotalCount } = webletterListSlice.actions;
export default webletterListSlice.reducer;
