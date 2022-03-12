import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import optionApi from '../../admin/redux/api/option.api';
import timerApi from '../../admin/redux/api/timer.api';
import loginReducer from './features/login.slice';

export const store = configureStore({
  reducer: {
    [timerApi.reducerPath]: timerApi.reducer,
    [optionApi.reducerPath]: optionApi.reducer,
    login: loginReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware();
    return [...middlewares, timerApi.middleware, optionApi.middleware];
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
