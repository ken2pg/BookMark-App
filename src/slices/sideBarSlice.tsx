import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { folder } from '#/types/folder';

export type sideBarState = {
  folder: folder;
  saveFolder: folder[];
};

export const initialState: sideBarState = {
  folder: {
    userId: 0,
    folderId: 0,
    folderName: '',
    folderColor: 'Red',
    isEdit: false,
  },
  saveFolder: new Array<folder>({
    userId: 0,
    folderId: 0,
    folderName: 'sample1',
    folderColor: 'Red',
    isEdit: false,
  }),
};

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
      state.folder.folderId++;
      state.saveFolder = [state.folder, ...state.saveFolder];
      // state.folder.folderColor = initialState.folder.folderColor;
      // state.folder.folderName = initialState.folder.folderName;
      // state.folder.isEdit = initialState.folder.isEdit;
    },
    startCreateFolder: (state) => ({
      ...state,
      folder: { ...state.folder, isEdit: true },
    }),
    endCreateFolder: (state) => ({
      ...state,
      folder: { ...state.folder, isEdit: false },
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
  },
});
