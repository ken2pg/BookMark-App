import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { bookMark } from '#/types/bookMark';
import BookMark from '#/components/bookMark';

export type bookMarkState = {
  newBookMark: bookMark;
  memoDialog: bookMark;
  bookMarks: bookMark[];
  searchBookMarks: bookMark[];
  isCreate: boolean;
  editSiteName: string;
  editSiteUrl: string;
  editMemo: string;
  searchText: string;
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
  memoDialog: {
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
  searchBookMarks: new Array<bookMark>(),
  isCreate: false,
  editSiteName: '',
  editSiteUrl: '',
  editMemo: '',
  searchText: '',
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
    inputMemo(state, action: PayloadAction<string>) {
      state.newBookMark.memo = action.payload;
    },
    addBookMark(state) {
      state.newBookMark.bookMarkId++;
      state.bookMarks = [state.newBookMark, ...state.bookMarks];
    },
    startCreateBookMark(state) {
      state.newBookMark['siteName'] = initialState.newBookMark.siteName;
      state.newBookMark['siteURL'] = initialState.newBookMark.siteURL;
      state.newBookMark['memo'] = initialState.newBookMark.memo;
      state.isCreate = true;
    },
    endCreateBookMark(state) {
      state.isCreate = false;
    },
    selectId(state, action: PayloadAction<number>) {
      state.newBookMark['folderId'] = action.payload;
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
      state.editMemo = editSaveFolder.memo;
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
            ? {
                ...bookMark,
                siteName: state.editSiteName,
                siteURL: state.editSiteUrl,
                memo: state.editMemo,
              }
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
    inputEditMemo: (state, action: PayloadAction<string>) => {
      state.editMemo = action.payload;
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
      state.bookMarks.map((BookMark) => {
        if (BookMark.isMemoOpen) {
          state.memoDialog = BookMark;
        }
      });
    },
    closeMemoDialog: (state) => {
      state.bookMarks = [
        ...state.bookMarks.map((bookMark) =>
          bookMark.isMemoOpen
            ? { ...bookMark, isMemoOpen: false }
            : { ...bookMark, isMemoOpen: false }
        ),
      ];
    },
    inputSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    // searchOutput: (state) => {
    //   state.searchBookMarks = state.bookMarks.filter(
    //     (bookMark) => bookMark.siteName === state.searchText
    //   );
    // },
    searchOutput: (state) => {
      //空白を削除
      state.searchText = state.searchText.replace(/[ ,　]/g, '');
      state.searchBookMarks = state.bookMarks.filter(
        (bookMark) => bookMark.siteName.indexOf(state.searchText) !== -1
      );
    },
  },
});
