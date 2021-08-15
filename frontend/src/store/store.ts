import { createStore, applyMiddleware, compose, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import characterReducer from './characterReducer';
import uiReducer from './uiReducer';
import userReducer from './userReducer';

const middleware = [thunk];

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const reducers = combineReducers({
  character: characterReducer,
  user: userReducer,
  ui: uiReducer
})

const store = createStore(reducers, {}, enhancer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;