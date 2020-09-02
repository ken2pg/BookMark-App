import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { bookMark } from '#/types/bookMark';

export type bookMarkState = {
  newBookMark: bookMark;
  bookMarks: bookMark[];
  isCreate: boolean;
  editSiteName: string;
  editSiteUrl: string;
  editMemo: string;
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
    isMemoOpen: false,
    memo: '',
  },
  bookMarks: new Array<bookMark>({
    userId: 0,
    folderId: 0,
    bookMarkId: 0,
    siteName: 'github',
    siteURL: ' https://github.com',
    date: '2020/08/31',
    isEdit: false,
    isMemoOpen: false,
    memo: 'This is Github site!',
  }),
  isCreate: false,
  editSiteName: '',
  editSiteUrl: '',
  editMemo: '',
};

export const bookMarkSlice = createSlice({
  name: 'bookMark',
  initialState,
  reducers: {
    inputName(state, action: PayloadAction<string>) {
      state.newBookMark.siteName = action.payload;
    },
    inputURL(state, action: PayloadAction<string>) {
      state.newBookMark.siteURL = action.payload;
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
    startEditBookMark(state, action: PayloadAction<number>) {
      state.bookMarks = [
        ...state.bookMarks.map((bookMark) =>
          bookMark.bookMarkId === action.payload
            ? { ...bookMark, isEdit: true }
            : { ...bookMark, isEdit: false }
        ),
      ];
      const editSaveFolder = state.bookMarks.find(
        (bookMark) => bookMark.bookMarkId === action.payload
      );
      state.editSiteName = editSaveFolder.siteName;
      state.editSiteUrl = editSaveFolder.siteURL;
    },
    endEditBookMark: (state) => {
      state.bookMarks = [
        ...state.bookMarks.map((bookMark) =>
          bookMark.isEdit
            ? {
                ...bookMark,
                isEdit: false,
              }
            : { ...bookMark, isEdit: false }
        ),
      ];
    },
    changeBookMark: (state) => {
      state.bookMarks = [
        ...state.bookMarks.map((bookMark) =>
          bookMark.isEdit
            ? { ...bookMark, siteName: state.editSiteName, siteURL: state.editSiteUrl }
            : { ...bookMark }
        ),
      ];
    },
    inputEditName: (state, action: PayloadAction<string>) => {
      state.editSiteName = action.payload;
    },
    inputEditURL: (state, action: PayloadAction<string>) => {
      state.editSiteUrl = action.payload;
    },
    deleteBookMark: (state, action: PayloadAction<number>) => {
      state.bookMarks = [
        ...state.bookMarks.filter((bookMark) => bookMark.bookMarkId !== action.payload),
      ];
    },
    openMemoDialog: (state, action: PayloadAction<bookMark>) => {
      state.bookMarks = [
        ...state.bookMarks.map((bookMark) =>
          bookMark.bookMarkId === action.payload.bookMarkId
            ? { ...bookMark, isMemoOpen: true }
            : { ...bookMark, isMemoOpen: false }
        ),
      ];
    },
    closeMemoDialog: (state) => {
      state.bookMarks = [
        ...state.bookMarks.map((bookMark) =>
          bookMark.isMemoOpen ? { ...bookMark, isMemoOpen: false } : { ...bookMark, isEdit: false }
        ),
      ];
    },
  },
});
