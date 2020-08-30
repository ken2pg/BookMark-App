import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { folder } from '#/types/folder';

export type sideBarState = {
  folder: folder;
  editFolderName: string;
  saveFolder: folder[];
  isCreate: boolean;
};

export const initialState: sideBarState = {
  folder: {
    userId: 0,
    folderId: 0,
    folderName: '',
    folderColor: 'Red',
    isEdit: false,
  },
  editFolderName: '',
  saveFolder: new Array<folder>({
    userId: 0,
    folderId: 0,
    folderName: 'sample1',
    folderColor: 'Red',
    isEdit: false,
  }),
  isCreate: false,
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
      isCreate: true,
    }),
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
  },
});
