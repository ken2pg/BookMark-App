import {
  configureStore,
  getDefaultMiddleware,
  EnhancedStore,
  combineReducers,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { sideBarSlice } from './slices/sideBarSlice';
import { sideBarState } from './slices/sideBarSlice';

const rootReducer = combineReducers({
  sideBar: sideBarSlice.reducer,
});

// const preloadedState = () => {
//   return { sideBar: sideBarState };
// };

// export type RootState = {
//   sideBar: sideBarState;
// };

export type RootState = ReturnType<typeof rootReducer>;

export const createStore = (): EnhancedStore => {
  const middlewares = [...getDefaultMiddleware()];
  //const middlewares = [...getDefaultMiddleware(), logger];

  return configureStore({
    reducer: rootReducer,
    middleware: middlewares,
    devTools: process.env.NODE_ENV !== 'production',
  });
};
