import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type sideBarState = {
  folder: {
    userId: number;
    folderId: number;
    folderName: string;
    folderColor: string;
    isEdit: boolean;
  };
};

export const initialState: sideBarState = {
  folder: {
    userId: 0,
    folderId: 0,
    folderName: '',
    folderColor: '',
    isEdit: false,
  },
};

export const sideBarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    addFolder: (state, action: PayloadAction<sideBarState>) => ({
      ...state,
      ...action.payload,
    }),
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
