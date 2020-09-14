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
  isLogin: boolean;
  userEmail: string;
  isFirstRenderSideBar: boolean;
  isFirstRenderBookMark: boolean;
};

const initialState: signInPageState = {
  email: '',
  password: '',
  showPassword: false,
  isLogin: false,
  userEmail: '',
  isFirstRenderSideBar: true,
  isFirstRenderBookMark: true,
};
export const fetchSingIn = createAsyncThunk(
  'signIn/fetchSingIn',
  async (payload: signInPageState) => {
    const data = { sucess: '', email: payload.email };
    await auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        // const set = (key: string, value: string) => sessionStorage.setItem(key, value);
        // set('isSignIn', 'true');
        // set('Email', payload.email);
        data.sucess = 'success';
        // Router.push({ pathname: './application' });
      })
      .catch((err) => {
        alert(err);
      });
    return await data;
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
    firstRenderSideBar: (state) => {
      state.isFirstRenderSideBar = false;
    },
    firstRenderBookMark: (state) => {
      state.isFirstRenderBookMark = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSingIn.pending, () => {});
    builder.addCase(fetchSingIn.fulfilled, (state, action) => {
      if (action.payload.sucess === 'success') {
        state.isLogin = true;
        state.userEmail = action.payload.email;
        Router.push({ pathname: './application' });
      }
    });
    builder.addCase(fetchSingIn.rejected, () => {});
  },
});
