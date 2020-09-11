import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { bookMark } from '#/types/bookMark';
// import BookMark from '#/components/bookMark';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { firebaseStore } from '../../config/fbConfig';
import { auth } from 'firebase';
import Router from 'next/router';
import build from 'next/dist/build';

export type signInPageState = {
  email: string;
  password: string;
  showPassword: boolean;
};

const initialState: signInPageState = {
  email: '',
  password: '',
  showPassword: false,
};
export const fetchSingIn = createAsyncThunk(
  'signIn/fetchSingIn',
  async (payload: signInPageState) => {
    await auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        const set = (key: string, value: string) => localStorage.setItem(key, value);
        set('isSignIn', 'true');
        Router.push({ pathname: './' });
      })
      .catch((err) => {
        alert(err);
      });
    const success = { sucess: 'success' };
    await console.log(success);
  }
);

export const signInSlice = createSlice({
  name: 'signIN',
  initialState,
  reducers: {
    inputEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    inputPassWord: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    switchShowPassword: (state) => {
      state.showPassword = !state.showPassword;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSingIn.pending, () => {});
    builder.addCase(fetchSingIn.fulfilled, () => {});
    builder.addCase(fetchSingIn.rejected, () => {});
  },
});
