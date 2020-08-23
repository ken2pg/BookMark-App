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
      // const newFolder: folder = action.payload;
      state.folder.folderId++;
      // console.log(state.folder.folderId);
      state.saveFolder = [state.folder, ...state.saveFolder];
      state.folder = initialState.folder;
    },
    startEditFolder: (state) => ({
      ...state,
      folder: { ...state.folder, isEdit: true },
    }),
    endEditFolder: (state) => ({
      ...state,
      folder: { ...state.folder, isEdit: false },
    }),
    editFolder: (state, action: PayloadAction<string>) => ({
      ...state,
      folder: { ...state.folder, folderName: action.payload },
    }),
  },
});
