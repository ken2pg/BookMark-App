import {
  configureStore,
  getDefaultMiddleware,
  EnhancedStore,
  combineReducers,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { sideBarSlice } from './slices/sideBarSlice';
import { bookMarkSlice } from './slices/bookMarkSlice';
import { signInSlice } from './slices/signInPageSlice';
import { userInfoSlice } from './slices/userInfoSlice';

const rootReducer = combineReducers({
  sideBar: sideBarSlice.reducer,
  bookMark: bookMarkSlice.reducer,
  signIn: signInSlice.reducer,
  userInfo: userInfoSlice.reducer,
  // test: testSlice.reducer,
});

// const preloadedState = () => {
//   return { sideBar: sideBarState };
// };

// export type RootState = {
//   sideBar: sideBarState;
// };

export type RootState = ReturnType<typeof rootReducer>;

const middlewares = [...getDefaultMiddleware()];
// export const createStore = (): EnhancedStore => {
//   const middlewares = [...getDefaultMiddleware()];
//   //const middlewares = [...getDefaultMiddleware(), logger];

//   return configureStore({
//     reducer: rootReducer,
//     middleware: middlewares,
//     devTools: process.env.NODE_ENV !== 'production',
//   });
// };
export default configureStore({
  reducer: rootReducer,
  middleware: middlewares,
  devTools: process.env.NODE_ENV !== 'production',
});
