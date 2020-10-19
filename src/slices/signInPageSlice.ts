import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from 'firebase';
import Router from 'next/router';

export type signInPageState = {
  email: string;
  password: string;
  showPassword: boolean;
  isLogin: boolean;
  userEmail: string;
  userId: number;
};

const initialState: signInPageState = {
  email: '',
  password: '',
  showPassword: false,
  isLogin: false,
  userEmail: '',
  userId: 0,
};
export const fetchSingIn = createAsyncThunk(
  'signIn/fetchSingIn',
  async (payload: signInPageState) => {
    const data = { sucess: '', email: payload.email, userId: payload.userId };
    await auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        data.sucess = 'success';
      })
      .catch((err) => {
        if (err['code'] === 'auth/network-request-failed') {
          alert('インターネットが繋がっていません');
        } else {
          alert('パスワードもしくはメールアドレスが間違っています！');
        }
      });

    return data;
  }
);

export const signInSlice = createSlice({
  name: 'signIn',
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
    signOut: (state) => {
      state.email = initialState.email;
      state.isLogin = initialState.isLogin;
      state.password = initialState.password;
      state.showPassword = initialState.showPassword;
      state.userEmail = initialState.userEmail;
      state.userId = initialState.userId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSingIn.pending, () => {});
    builder.addCase(fetchSingIn.fulfilled, (state, action) => {
      if (action.payload.sucess === 'success') {
        state.isLogin = true;
        state.userId = action.payload.userId;
        state.userEmail = action.payload.email;
        Router.push({ pathname: './application' });
      }
    });
    builder.addCase(fetchSingIn.rejected, () => {});
  },
});
