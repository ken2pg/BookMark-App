import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { firebaseStore } from '../../config/fbConfig';
import { auth, firestore } from 'firebase';
import Router from 'next/router';
import build from 'next/dist/build';

export type userInfoState = {
  Email: string;
  password: string;
  userId: number;
  userName: string;
  serialFolderNumber: number;
  serialNumber: number;
};

const initialState: userInfoState = {
  Email: '',
  password: '',
  userId: 0,
  userName: '',
  serialFolderNumber: 0,
  serialNumber: 0,
};

export const fetchGetUserInfo = createAsyncThunk(
  'userInfo/fetchGetUserInfo',
  async (payload: string) => {
    let userList = new Array<userInfoState>();
    try {
      await firebaseStore
        .collection('user')
        .where('Email', '==', payload)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((i) => {
            const category = i.data();
            userList.push({
              Email: category['Email'],
              password: '',
              userId: category['userId'],
              userName: category['userName'],
              serialFolderNumber: category['serialFolderNumber'],
              serialNumber: category['serialNumber'],
            });
          });
        })
        .catch((err) => {
          throw new Error(err.message);
        });
      return await userList;
    } catch (error) {
      await console.log(error);
    }
  }
);

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setInitialState: (state) => {
      state.Email = initialState.Email;
      state.password = initialState.password;
      state.serialFolderNumber = initialState.serialFolderNumber;
      state.serialNumber = initialState.serialNumber;
      state.userId = initialState.userId;
      state.userName = initialState.userName;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetUserInfo.pending, () => {});
    builder.addCase(fetchGetUserInfo.fulfilled, (state, action) => {
      state.Email = action.payload[0].Email;
      state.serialFolderNumber = action.payload[0].serialFolderNumber;
      state.serialNumber = action.payload[0].serialNumber;
      state.userId = action.payload[0].userId;
      state.userName = action.payload[0].userName;
      console.log(action.payload[0]);
    });
    builder.addCase(fetchGetUserInfo.rejected, () => {});
  },
});
