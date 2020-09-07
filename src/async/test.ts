// import { bookMark } from '../types/bookMark';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { firebaseStore } from '../../config/fbConfig';

export const fetchTest = createAsyncThunk('test/fetchTest', async (thunkAPI) => {
  try {
    await firebaseStore
      .collection('test')
      .add({
        createdAt: new Date(),
      })
      .catch((err) => {
        throw new Error(err.message);
      });
    const success = { sucess: 'success' };
    return { success };
  } catch (error) {
    return { error };
  }
});
const testSlice = createSlice({
  name: 'test',
  initialState: 0,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTest.pending, (state, action) => {});
    builder.addCase(fetchTest.fulfilled, (state, action) => {});
    builder.addCase(fetchTest.rejected, (state, action) => {});
    // [fetchTest.pending.type]: (state, action) => {},
    // // action.payloadにissuesが入っている
    // [fetchTest.fulfilled.type]: (state, action) => {},
    // [fetchTest.rejected.type]: (state, action) => {},
  },
});

export default testSlice;
