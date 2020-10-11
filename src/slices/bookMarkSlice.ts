import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { bookMark } from '#/types/bookMark';
import BookMark from '#/components/bookMark/bookMark';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { firebaseStore } from '../../config/fbConfig';

export type bookMarkState = {
  newBookMark: bookMark;
  memoDialog: bookMark;
  bookMarks: bookMark[];
  searchBookMarks: bookMark[];
  isCreate: boolean;
  editSaveFolder: bookMark;
  inputText: string;
  searchText: string;
  serialNumbers: number;
};

export const initialState: bookMarkState = {
  newBookMark: {
    userId: 1,
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
  searchBookMarks: new Array<bookMark>(),
  isCreate: false,
  editSaveFolder: {
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
  searchText: '',
  inputText: '',
  serialNumbers: 0,
};

//API

//bookmarkの通し番号を返すAPI
export const fetchSerialNumber = createAsyncThunk('bookMark/fetchSerialNumber', async () => {
  let serialNumber: number;
  await firebaseStore
    .collection('user')
    .where('userId', '==', 1)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((i) => {
        //i自体は1つしか取らない
        serialNumber = i.data()['serialNumber'];
        // console.log(serialNumber);
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
      .doc('1')
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
      .collection('user')
      .doc('1')
      .collection('bookMark')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((i) => {
          const caregory = i.data();
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
        .collection('user')
        .doc(payload.userId.toString())
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

export const fetchEditBookMark = createAsyncThunk(
  'bookMark/fetchEditBookMark',
  async (payload: bookMark, thunkAPI) => {
    try {
      await firebaseStore
        .collection('user')
        .doc(payload.userId.toString())
        .collection('bookMark')
        .doc(payload.bookMarkId.toString())
        .update({
          // userId: payload.userId,
          // folderId: payload.folderId,
          // bookMarkId: payload.bookMarkId,
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

//Delete機能
export const fetchDeleteBookMark = createAsyncThunk(
  'bookMark/fetchDeleteBookMark',
  async (payload: bookMark, thunkAPI) => {
    try {
      await firebaseStore
        .collection('user')
        .doc(payload.userId.toString())
        .collection('bookMark')
        .doc(payload.bookMarkId.toString())
        .delete()
        .then(() => {
          console.log('BookMark successfully deleted!');
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
      state.bookMarks = [state.newBookMark, ...state.bookMarks];
    },
    startCreateBookMark(state) {
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
      state.editSaveFolder = state.bookMarks.find(
        (bookMark) => bookMark.bookMarkId === action.payload
      );
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
      state.editSaveFolder.isEdit = false;
    },
    changeBookMark: (state) => {
      state.bookMarks = [
        ...state.bookMarks.map((bookMark) =>
          bookMark.isEdit
            ? {
                ...bookMark,
                siteName: state.editSaveFolder.siteName,
                siteURL: state.editSaveFolder.siteURL,
                memo: state.editSaveFolder.memo,
              }
            : { ...bookMark }
        ),
      ];
    },
    inputEditName: (state, action: PayloadAction<string>) => {
      state.editSaveFolder.siteName = action.payload;
    },
    inputEditURL: (state, action: PayloadAction<string>) => {
      state.editSaveFolder.siteURL = action.payload;
    },
    inputEditMemo: (state, action: PayloadAction<string>) => {
      state.editSaveFolder.memo = action.payload;
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
      state.memoDialog.isMemoOpen = false;
    },
    inputSearchText: (state, action: PayloadAction<string>) => {
      state.inputText = action.payload;
      // state.searchText = action.payload;
    },
    searchOutput: (state) => {
      //空白を削除
      state.searchText = state.inputText;
      state.searchText = state.searchText.replace(/[ ,　]/g, '');
      state.searchBookMarks = state.bookMarks.filter((bookMark) => {
        const siteName = bookMark.siteName.replace(/[ ,　]/g, '');
        if (siteName.indexOf(state.searchText) !== -1) {
          return true;
        } else {
          return false;
        }
      });
    },
    allSearchTextDelete: (state) => {
      state.inputText = '';
      state.searchText = '';
    },

    initialSetState: (state, action: PayloadAction<bookMark[]>) => {
      // console.log(action.payload);
    },
  },
  //非同期処理
  extraReducers: (builder) => {
    //fetchSerialNumber
    builder.addCase(fetchSerialNumber.pending, () => {});
    builder.addCase(fetchSerialNumber.fulfilled, (state, action) => {
      // state.newBookMark.bookMarkId = action.payload;
      state.serialNumbers = action.payload;
      // console.log(action.payload);
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
      state.bookMarks = initialState.bookMarks;
      state.bookMarks = state.bookMarks.concat(action.payload);
    });
    builder.addCase(fetchInitialState.rejected, () => {});

    //fetchAddBookMark
    builder.addCase(fetchAddBookMark.pending, () => {});
    builder.addCase(fetchAddBookMark.fulfilled, () => {});
    builder.addCase(fetchAddBookMark.rejected, () => {});

    //fetchEditBookMark
    builder.addCase(fetchEditBookMark.pending, () => {});
    builder.addCase(fetchEditBookMark.fulfilled, () => {});
    builder.addCase(fetchEditBookMark.rejected, () => {});

    //fetchDeleteBookMark
    builder.addCase(fetchDeleteBookMark.pending, () => {});
    builder.addCase(fetchDeleteBookMark.fulfilled, () => {});
    builder.addCase(fetchDeleteBookMark.rejected, () => {});
  },
});
