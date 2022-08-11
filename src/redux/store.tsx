import initializers from './initializers';
import { configureStore } from '@reduxjs/toolkit';
import { PreloadedState, Store } from 'redux';
import logger from 'redux-logger';
import auth from './auth/authReducers';
import algorand from './algorand/algorandReducers';

let store: Store;

export function configureReduxStores(preloadedState?: PreloadedState<any>) {
  const reducer = {
    auth: auth,
    algorand: algorand,
  };
  store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
  });

  for (const initializer of initializers) {
    initializer(store);
  }

  return store;
}

export default function getStore() {
  return store;
}

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
