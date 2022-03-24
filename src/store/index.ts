import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import {configureStore } from "@reduxjs/toolkit";
import { wrapStore } from 'webext-redux';
import localforage from 'localforage';
import thunk from 'redux-thunk';

import historyReducer from './historyReducer';
import settingsReducer from './settingsReducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const config = {
    key: "root",
    storage: localforage
};

const rootReducer = combineReducers({
    history: historyReducer,
    settings: settingsReducer,
});

const reducer = persistReducer(config, rootReducer);

const store = configureStore({
    reducer: reducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    }).concat(thunk),
});

// wrapStore(store, {
//     portName: 'ABH_STORE',
// });

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;