import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { folder } from '#/types/folder';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { firebaseStore } from '../../config/fbConfig';

export type sideBarState = {
  folder: folder;
  editFolderName: string;
  saveFolder: folder[];
  isCreate: boolean;
  selectId: number;
  sirialFolderNumber: number;
};

export const initialState: sideBarState = {
  folder: {
    userId: 0,
    folderId: 0,
    folderName: '',
    folderColor: 'Red',
    isEdit: false,
    isSelect: false,
  },
  editFolderName: '',
  saveFolder: new Array<folder>(),
  isCreate: false,
  selectId: 0,
  sirialFolderNumber: 0,
};

//bookmarkFolderの通し番号を取得するAPI
export const fetchSerialFolderNumber = createAsyncThunk(
  'bookMark/fetchSerialFolderNumber',
  async () => {
    let serialFolderNumber: number;
    await firebaseStore
      .collection('user')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((i) => {
          //i自体は1つしか取らない
          serialFolderNumber = i.data()['serialFolderNumber'];
          // console.log(serialFolderNumber);
        });
      })
      .catch((err) => {
        throw new Error(err.message);
      });
    return serialFolderNumber;
  }
);

//bookmarkFolderの通し番号をpushするAPI
export const fetchEditSerialFolderNumber = createAsyncThunk(
  'bookMark/fetchEditSerialFolderNumber',
  async (payload: number) => {
    await firebaseStore
      .collection('user')
      .doc('LWMacJ1P7fRLW597ZGNb')
      .update({ serialFolderNumber: payload })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
);

//folderデータの取得
export const fetchInitialFolderState = createAsyncThunk(
  'bookMark/fetchInitialFolderState',
  async (thunkAPI) => {
    let bookMarkFolderList = new Array<folder>();
    await firebaseStore
      .collection('bookMarkFolder')
      .where('userId', '==', 0)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((i) => {
          const category = i.data();
          bookMarkFolderList.push({
            userId: category['userId'],
            folderId: category['folderId'],
            folderName: category['folderName'],
            folderColor: category['folderColor'],
            isEdit: false,
            isSelect: false,
          });
        });
      })
      .catch((err) => {
        throw new Error(err.message);
      });
    return await bookMarkFolderList;
  }
);

export const fetchAddBookFolderMark = createAsyncThunk(
  'bookMark/fetchAddBookFolderMark',
  async (payload: folder, thunkAPI) => {
    try {
      await firebaseStore
        .collection('bookMarkFolder')
        .doc(payload.folderId.toString())
        .set({
          userId: payload.userId,
          folderId: payload.folderId,
          folderName: payload.folderName,
          folderColor: payload.folderColor,
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
export const sideBarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    newFolder(state) {
      // state.folder=
    },
    inputName(state, action: PayloadAction<string>) {
      state.folder.folderName = action.payload;
    },
    addFolder(state) {
      // state.folder.folderId++;
      state.saveFolder = [state.folder, ...state.saveFolder];
    },
    startCreateFolder: (state) => {
      state.sirialFolderNumber = state.sirialFolderNumber + 1;
      state.folder['folderId'] = state.sirialFolderNumber;
      state.folder['folderName'] = initialState.folder.folderName;
      state.isCreate = true;
    },
    cancelCreateFolder: (state) => {
      state.isCreate = false;
      state.sirialFolderNumber = state.sirialFolderNumber - 1;
      state.folder['folderId'] = state.sirialFolderNumber;
    },
    endCreateFolder: (state) => ({
      ...state,
      isCreate: false,
    }),
    editFolder: (state, action: PayloadAction<string>) => ({
      ...state,
      folder: { ...state.folder, folderName: action.payload },
    }),
    deleteFolder: (state, action: PayloadAction<number>) => {
      state.saveFolder = [
        ...state.saveFolder.filter((folder) => folder.folderId !== action.payload),
      ];
    },
    startEditFolder: (state, action: PayloadAction<number>) => {
      state.saveFolder = [
        ...state.saveFolder.map((savefolder) =>
          savefolder.folderId === action.payload
            ? { ...savefolder, isEdit: true }
            : { ...savefolder, isEdit: false }
        ),
      ];
      const editSaveFolder = state.saveFolder.find((folder) => folder.folderId === action.payload);
      state.editFolderName = editSaveFolder.folderName;
    },
    endEditFolder: (state) => {
      state.saveFolder = [
        ...state.saveFolder.map((savefolder) =>
          savefolder.isEdit
            ? {
                ...savefolder,
                isEdit: false,
              }
            : { ...savefolder, isEdit: false }
        ),
      ];
    },
    changeFolderName: (state, action: PayloadAction<string>) => {
      state.saveFolder = [
        ...state.saveFolder.map((savefolder) =>
          savefolder.isEdit ? { ...savefolder, folderName: action.payload } : { ...savefolder }
        ),
      ];
    },
    inputEditName: (state, action: PayloadAction<string>) => {
      state.editFolderName = action.payload;
    },
    selectFolder: (state, action: PayloadAction<number>) => {
      state.saveFolder.map((savefolder) => {
        if (savefolder.folderId === action.payload) {
          savefolder.isSelect = true;
          state.selectId = savefolder.folderId;
        } else {
          savefolder.isSelect = false;
        }
      });
      // ? { ...savefolder, isSelect: true }
      // : { ...savefolder, isSelect: false }
    },
  },
  extraReducers: (builder) => {
    //fetchSerialFolderNumber
    builder.addCase(fetchSerialFolderNumber.pending, () => {});
    builder.addCase(fetchSerialFolderNumber.fulfilled, (state, action) => {
      state.sirialFolderNumber = action.payload;
    });
    builder.addCase(fetchSerialFolderNumber.rejected, () => {});

    //fetchEditSerialFolderNumber
    builder.addCase(fetchEditSerialFolderNumber.pending, () => {});
    builder.addCase(fetchEditSerialFolderNumber.fulfilled, () => {});
    builder.addCase(fetchEditSerialFolderNumber.rejected, () => {});

    //fetchInitialState
    builder.addCase(fetchInitialFolderState.pending, () => {});
    builder.addCase(fetchInitialFolderState.fulfilled, (state, action) => {
      state.saveFolder = state.saveFolder.concat(action.payload);
    });
    builder.addCase(fetchInitialFolderState.rejected, () => {});

    //fetchAddBookFolderMark
    builder.addCase(fetchAddBookFolderMark.pending, () => {});
    builder.addCase(fetchAddBookFolderMark.fulfilled, () => {});
    builder.addCase(fetchAddBookFolderMark.rejected, () => {});
  },
});
