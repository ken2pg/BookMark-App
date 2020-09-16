import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
// import { bookMark } from '#/types/bookMark';
// import BookMark from '#/components/bookMark';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { firebaseStore } from '../../config/fbConfig';
import { auth } from 'firebase';
import Router from 'next/router';
import build from 'next/dist/build';
import { fetchGetUserInfo, userInfoSlice } from './userInfoSlice';

export type signInPageState = {
  email: string;
  password: string;
  showPassword: boolean;
  isLogin: boolean;
  userEmail: string;
  userId: number;
  // isFirstRenderSideBar: boolean;
  // isFirstRenderBookMark: boolean;
};

const initialState: signInPageState = {
  email: '',
  password: '',
  showPassword: false,
  isLogin: false,
  userEmail: '',
  userId: 0,
  // isFirstRenderSideBar: true,
  // isFirstRenderBookMark: true,
};
export const fetchSingIn = createAsyncThunk(
  'signIn/fetchSingIn',
  async (payload: signInPageState) => {
    const data = { sucess: '', email: payload.email, userId: payload.userId };
    await auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        data.sucess = 'success';
        // firebaseStore
        //   .collection('user')
        //   .where('Email', '==', payload)
        //   .get()
        //   .then((querySnapshot) => {
        //     querySnapshot.forEach((i) => {
        //       data.sucess = 'success';
        //       const category = i.data();
        //       data.userId = category['userId'];
        //     });
        //   });
      })
      .catch((err) => {
        alert(err);
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
    // firstRenderSideBar: (state) => {
    //   state.isFirstRenderSideBar = false;
    // },
    // firstRenderBookMark: (state) => {
    //   state.isFirstRenderBookMark = false;
    // },
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
