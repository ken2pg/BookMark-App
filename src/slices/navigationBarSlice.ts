import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type navigationBarState = {
  isOpenMenuDialog: boolean;
  footerButtonNumber: number;
};

const initialState: navigationBarState = {
  isOpenMenuDialog: true,
  footerButtonNumber: 0,
};

export const navigationBarSlice = createSlice({
  name: 'navigationBar',
  initialState,
  reducers: {
    OpenMenuDrower: (state) => {
      state.isOpenMenuDialog = true;
    },
    CloseMenuDrower: (state) => {
      state.isOpenMenuDialog = false;
    },
    changefooterButtonNumber: (state, action: PayloadAction<number>) => {
      state.footerButtonNumber = action.payload;
    },
  },
});
