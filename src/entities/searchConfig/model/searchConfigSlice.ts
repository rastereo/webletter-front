import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IFirstAndLastDate, ISelectedFilter } from '@types';

interface ISearchConfigState {
  exhibitionSelectList: string[];
  langSelectList: string[];
  rangeDate: IFirstAndLastDate;
  selectedFilter: ISelectedFilter;
  isStartCounter: boolean
}

const initialState: ISearchConfigState = {
  exhibitionSelectList: [],
  langSelectList: [],
  rangeDate: {
    first_upload_date: '',
    last_upload_date: '',
  },
  selectedFilter: {
    exhibition: '',
    title: '',
    lang: '',
    startDate: '',
    endDate: '',
  },
  isStartCounter: true,
};

export const searchConfigSlice = createSlice({
  name: 'searchConfig',
  initialState,
  reducers: {
    setExhibitionSelectList: (state, action: PayloadAction<string[]>) => {
      state.exhibitionSelectList = action.payload;
    },
    setLangSelectList: (state, action: PayloadAction<string[]>) => {
      state.langSelectList = action.payload;
    },
    setRangeDate: (state, action: PayloadAction<IFirstAndLastDate>) => {
      state.rangeDate = action.payload;
    },
    setSelectedFilter: (state, action: PayloadAction<ISelectedFilter>) => {
      state.selectedFilter = action.payload;
    },
    setIsStartCounter: (state, action: PayloadAction<boolean>) => {
      state.isStartCounter = action.payload;
    },
  },
});

export const {
  setExhibitionSelectList,
  setLangSelectList,
  setRangeDate,
  setSelectedFilter,
  setIsStartCounter,
} = searchConfigSlice.actions;
export default searchConfigSlice.reducer;
