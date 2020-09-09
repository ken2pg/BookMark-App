import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { bookMark } from '#/types/bookMark';
import BookMark from '#/components/bookMark';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { firebaseStore } from '../../config/fbConfig';

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
  serialNumbers: number;
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
  bookMarks: new Array<bookMark>(),
  // {
  //   userId: 0,
  //   folderId: 0,
  //   bookMarkId: 0,
  //   siteName: 'github',
  //   siteURL: ' https://github.com',
  //   date: '2020/08/31',
  //   isEdit: false,
  //   isMemoOpen: false,
  //   memo: 'This is Github site!',
  // }
  searchBookMarks: new Array<bookMark>(),
  isCreate: false,
  editSiteName: '',
  editSiteUrl: '',
  editMemo: '',
  searchText: '',
  serialNumbers: 0,
};

//API

//bookmarkの通し番号を返すAPI
export const fetchSerialNumber = createAsyncThunk('bookMark/fetchSerialNumber', async () => {
  let serialNumber: number;
  await firebaseStore
    .collection('user')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((i) => {
        //i自体は1つしか取らない
        serialNumber = i.data()['serialNumber'];
        console.log(serialNumber);
      });
    })
    .catch((err) => {
      throw new Error(err.message);
    });
  return serialNumber;
});

//bookmarkの通し番号をpushするAPI
export const fetchEditSerialNumber = createAsyncThunk(
  'bookMark/fetchEditSerialNumber',
  async (payload: number) => {
    await firebaseStore
      .collection('user')
      .doc('LWMacJ1P7fRLW597ZGNb')
      .update({ serialNumber: payload })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
);

export const fetchInitialState = createAsyncThunk(
  'bookMark/fetchInitialState',
  async (thunkAPI) => {
    let bookMarkList = new Array<bookMark>();
    await firebaseStore
      .collection('bookMark')
      .where('userId', '==', 0)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((i) => {
          // console.log(i.id, '=>', i.data());
          //  console.log(i.data()['folderId']);
          const caregory = i.data();
          // bookMarkSlice.actions.initialSetState(i.data());
          bookMarkList.push({
            userId: caregory['userId'],
            folderId: caregory['folderId'],
            bookMarkId: caregory['bookMarkId'],
            siteName: caregory['siteName'],
            siteURL: caregory['siteURL'],
            date: '2020/08/31',
            isEdit: false,
            isMemoOpen: false,
            memo: caregory['memo'],
          });
          // console.log(bookMarkList);
          // return bookMarkList;
          // bookMarkSlice.actions.initialSetState(bookMarkList);
        });
      })
      .catch((err) => {
        throw new Error(err.message);
      });
    return await bookMarkList;
    // const success = { sucess: 'success' };
    // return {
    //   success,
    // };
  }
);

export const fetchAddBookMark = createAsyncThunk(
  'bookMark/fetchAddBookMark',
  async (payload: bookMark, thunkAPI) => {
    try {
      await firebaseStore
        .collection('bookMark')
        .doc(payload.bookMarkId.toString())
        .set({
          userId: payload.userId,
          folderId: payload.folderId,
          bookMarkId: payload.bookMarkId,
          siteName: payload.siteName,
          siteURL: payload.siteURL,
          memo: payload.memo,
        })
        .catch((err) => {
          throw new Error(err.message);
        });
      const success = { sucess: 'success' };
      await console.log(success);
    } catch (error) {
      await console.log(error);
    }
  }
);

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
      // state.newBookMark.bookMarkId++;
      // console.log(state.newBookMark.bookMarkId);
      state.bookMarks = [state.newBookMark, ...state.bookMarks];
    },
    startCreateBookMark(state) {
      // if (state.bookMarks.length) {
      //   state.newBookMark['bookMarkId'] = state.bookMarks[0].bookMarkId;
      // }
      state.serialNumbers = state.serialNumbers + 1;
      state.newBookMark['bookMarkId'] = state.serialNumbers;
      state.newBookMark['siteName'] = initialState.newBookMark.siteName;
      state.newBookMark['siteURL'] = initialState.newBookMark.siteURL;
      state.newBookMark['memo'] = initialState.newBookMark.memo;
      state.isCreate = true;
    },
    endCreateBookMark(state) {
      state.isCreate = false;
    },

    cancelCreateBookMark(state) {
      state.isCreate = false;
      state.serialNumbers = state.serialNumbers - 1;
      state.newBookMark['bookMarkId'] = state.serialNumbers;
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
    allSearchTextDelete: (state) => {
      state.searchText = '';
    },

    initialSetState: (state, action: PayloadAction<bookMark[]>) => {
      console.log(action.payload);
    },
  },
  //非同期処理
  extraReducers: (builder) => {
    //fetchSerialNumber
    builder.addCase(fetchSerialNumber.pending, () => {});
    builder.addCase(fetchSerialNumber.fulfilled, (state, action) => {
      // state.newBookMark.bookMarkId = action.payload;
      state.serialNumbers = action.payload;
      console.log(action.payload);
    });
    builder.addCase(fetchSerialNumber.rejected, () => {});

    //fetchEditSerialNumber
    builder.addCase(fetchEditSerialNumber.pending, () => {});
    builder.addCase(fetchEditSerialNumber.fulfilled, () => {});
    builder.addCase(fetchEditSerialNumber.rejected, () => {});

    //fetchInitialState
    builder.addCase(fetchInitialState.pending, () => {});
    builder.addCase(fetchInitialState.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.bookMarks = state.bookMarks.concat(action.payload);
    });
    builder.addCase(fetchInitialState.rejected, () => {});

    //fetchAddBookMark
    builder.addCase(fetchAddBookMark.pending, () => {});
    builder.addCase(fetchAddBookMark.fulfilled, () => {});
    builder.addCase(fetchAddBookMark.rejected, () => {});
  },
});
