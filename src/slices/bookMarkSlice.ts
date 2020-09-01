import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { bookMark } from '#/types/bookMark';

export type bookMarkState = {
  newBookMark: bookMark;
  bookMarks: bookMark[];
  isCreate: boolean;
};

export const initialState: bookMarkState = {
  newBookMark: {
    userId: 0,
    folderId: 0,
    bookMarkId: 0,
    siteName: '',
    siteURL: '',
    date: '',
    isEdit: false,
  },
  bookMarks: new Array<bookMark>(
    {
      userId: 0,
      folderId: 0,
      bookMarkId: 0,
      siteName: 'github',
      siteURL: ' https://github.com',
      date: '2020/08/31',
      isEdit: false,
    },
    {
      userId: 0,
      folderId: 0,
      bookMarkId: 0,
      siteName: 'github',
      siteURL: ' https://github.com',
      date: '2020/08/31',
      isEdit: false,
    }
  ),
  isCreate: false,
};

export const bookMarkSlice = createSlice({
  name: 'bookMark',
  initialState,
  reducers: {
    inputName(state, action: PayloadAction<string>) {
      state.newBookMark.siteName = action.payload;
    },
    addBookMark(state) {
      state.newBookMark.bookMarkId++;
      state.bookMarks = [state.newBookMark, ...state.bookMarks];
    },
    startCreateBookMark(state) {
      state.newBookMark['siteName'] = initialState.newBookMark.siteName;
      state.isCreate = true;
    },
    endCreateBookMark(state) {
      state.isCreate = false;
    },
  },
});
